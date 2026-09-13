import { NextRequest, NextResponse } from 'next/server';
import { 
  OutputMode, 
  QuickSummaryOutput, 
  RevisionNotesOutput, 
  UploadedStudyMaterial 
} from '@/lib/types';

export const dynamic = 'force-dynamic';

interface AnalysisRequestBody {
  materials: {
    name: string;
    type: string;
    content: string;
    pageCount?: number;
    charCount?: number;
    wordCount?: number;
  }[];
  mode: OutputMode;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AnalysisRequestBody;
    const { materials, mode } = body;

    // Validation 1: Materials array must exist and not be empty
    if (!materials || materials.length === 0) {
      return NextResponse.json(
        { error: 'No study materials provided. Please upload at least one document.' },
        { status: 400 }
      );
    }

    // Validation 2: Ensure extracted text is present and non-empty
    const totalChars = materials.reduce((acc, m) => acc + (m.content?.trim().length || 0), 0);
    if (totalChars === 0) {
      return NextResponse.json(
        { error: 'Extracted text length is zero. Please upload files with readable text.' },
        { status: 400 }
      );
    }

    // Combine extracted content with clear file sources
    const combinedCorpus = materials
      .map(
        (m, idx) =>
          `=== DOCUMENT [${idx + 1}/${materials.length}] (${m.name}) ===\n${m.content.trim()}`
      )
      .join('\n\n');

    const apiKey = process.env.GEMINI_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'GEMINI_API_KEY is not configured in .env.local. Please provide a valid Gemini API key to generate study notes.',
        },
        { status: 500 }
      );
    }

    // Call Gemini with student-friendly prompt
    const generatedData = await generateWithGemini(apiKey, combinedCorpus, mode, materials);

    return NextResponse.json({
      success: true,
      provider: 'gemini',
      mode,
      data: generatedData,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Analysis failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Executes student-friendly study note generation via Gemini.
 * Employs reliable model cascade (gemini-3.5-flash -> gemini-3.6-flash -> gemini-flash-lite-latest).
 */
async function generateWithGemini(
  apiKey: string,
  corpus: string,
  mode: OutputMode,
  materials: { name: string }[]
) {
  const fileNames = materials.map((m) => m.name).join(', ');

  let systemInstruction = '';
  let jsonSchemaDesc = '';

  if (mode === 'quick_summary') {
    systemInstruction = `You are a helpful senior student creating a concise, student-friendly quick summary for exam revision.
Rules:
- Read the provided study material and create a concise student-friendly summary.
- Extract ONLY the most important concepts, definitions, formulas, and takeaways from the uploaded documents.
- Use simple, straightforward language.
- Do NOT create research papers, executive syntheses, corporate reports, or use complex academic buzzwords.
- Maximum 1 page in length.
- If formulas exist in the material, extract them in LaTeX notation (e.g. $F = m \\times a$). If no formulas exist, return an empty array for importantFormulas.`;

    jsonSchemaDesc = `{
  "mainTopic": "Main Topic Title (derived directly from the uploaded files)",
  "summary": "2-4 sentence simple, clear overview of the content in plain language",
  "coreConcepts": [
    "Important concept 1 (plain language explanation)",
    "Important concept 2"
  ],
  "keyTakeaways": [
    "Essential takeaway 1",
    "Essential takeaway 2",
    "Essential takeaway 3"
  ],
  "importantDefinitions": [
    {
      "term": "Key Term",
      "definition": "Simple, concise definition based on the text"
    }
  ],
  "importantFormulas": [
    {
      "name": "Formula or Rule Name",
      "formula": "LaTeX formula or equation (e.g. $E = mc^2$)",
      "explanation": "What this formula computes and what variables mean"
    }
  ]
}`;
  } else {
    systemInstruction = `You are a helpful senior student generating structured revision notes for exam preparation.
Rules:
- Read the provided study material and generate structured revision notes for exam preparation.
- Use clear headings, subheadings, bullet points, definitions, formulas, and key concepts.
- Keep explanations concise and easy to revise.
- Use clean bullet points. Avoid unnecessary complexity.
- Do NOT create corporate jargon, executive summaries, or robotic walls of text.
- Group into 2 to 4 logical sections based on the actual topics found in the material.
- Include exam-oriented notes and tips for students taking a test on this material.`;

    jsonSchemaDesc = `{
  "title": "Comprehensive Revision Notes",
  "subjectOrTopic": "Subject or Topic Title from the files",
  "sections": [
    {
      "heading": "Section 1: Main Topic Area",
      "subtopics": [
        {
          "subheading": "Specific Subtopic Title",
          "keyPoints": [
            "Clear, concise bullet point 1",
            "Clear, concise bullet point 2"
          ],
          "concepts": [
            "Core concept explanation in simple terms"
          ],
          "definitions": [
            {
              "term": "Important Term",
              "definition": "Clear, direct definition"
            }
          ],
          "formulas": [
            {
              "name": "Formula Name",
              "formula": "LaTeX formula"
            }
          ]
        }
      ],
      "examOrientedNotes": [
        "High-yield exam tip or common question scenario"
      ]
    }
  ],
  "quickExamTips": [
    "Crucial test-day advice directly from this material",
    "Common mistake to watch out for"
  ]
}`;
  }

  const prompt = `${systemInstruction}

FILES PROVIDED: ${fileNames}

OUTPUT FORMAT:
Respond ONLY with a valid JSON object matching this schema (do NOT wrap in markdown ticks):
${jsonSchemaDesc}

STUDY MATERIAL CONTENT:
${corpus.slice(0, 50000)}`;

  // Model cascade: try fast & active models
  const candidateModels = [
    'gemini-3.5-flash',
    'gemini-3.6-flash',
    'gemini-flash-lite-latest',
    'gemini-3.1-flash-lite',
  ];

  let lastError: Error | null = null;

  for (const model of candidateModels) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        }),
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(
          `Gemini [${model}] HTTP ${response.status}: ${
            errorJson?.error?.message || response.statusText
          }`
        );
      }

      const json = await response.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error(`Empty response from Gemini [${model}].`);
      }

      const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch (err: unknown) {
      console.warn(`[SturdyNerdy] Model ${model} failed, trying next candidate:`, err);
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  throw new Error(
    `Failed to generate notes via Gemini API: ${lastError?.message || 'All models unavailable'}`
  );
}
