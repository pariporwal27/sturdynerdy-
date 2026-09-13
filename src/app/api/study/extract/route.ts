import { NextRequest, NextResponse } from 'next/server';
import { extractDocumentContent } from '@/lib/extractor';
import { UploadedStudyMaterial } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files were uploaded. Please select at least one study material.' },
        { status: 400 }
      );
    }

    const processedMaterials: UploadedStudyMaterial[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Limit file size to 30MB
      if (file.size > 30 * 1024 * 1024) {
        errors.push(`File "${file.name}" exceeds the 30MB limit.`);
        continue;
      }

      try {
        const buffer = await file.arrayBuffer();
        const extracted = await extractDocumentContent(buffer, file.name, file.size);

        processedMaterials.push({
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: extracted.name,
          size: extracted.size,
          type: extracted.type,
          content: extracted.content,
          status: 'ready',
          wordCount: extracted.wordCount,
          pageCount: extracted.pageCount,
          charCount: extracted.charCount,
        });
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Extraction error';
        errors.push(msg);
      }
    }

    if (processedMaterials.length === 0) {
      return NextResponse.json(
        { 
          error: errors.length > 0 
            ? errors.join('; ') 
            : 'No readable text could be extracted from the uploaded files.' 
        },
        { status: 400 }
      );
    }

    const totalChars = processedMaterials.reduce((sum, m) => sum + m.charCount, 0);
    const totalWords = processedMaterials.reduce((sum, m) => sum + m.wordCount, 0);
    const totalPages = processedMaterials.reduce((sum, m) => sum + m.pageCount, 0);

    return NextResponse.json({
      success: true,
      materials: processedMaterials,
      stats: {
        filesUploaded: processedMaterials.length,
        pagesProcessed: totalPages,
        charactersExtracted: totalChars,
        wordsExtracted: totalWords,
      },
      warnings: errors.length > 0 ? errors : undefined,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error processing upload';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
