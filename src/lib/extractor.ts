import mammoth from 'mammoth';
import JSZip from 'jszip';
import { MaterialType } from './types';

export interface ExtractedDocument {
  name: string;
  type: MaterialType;
  size: number;
  content: string;
  pageCount: number;
  charCount: number;
  wordCount: number;
}

export function detectFileType(filename: string): MaterialType {
  const lower = filename.toLowerCase();
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.docx') || lower.endsWith('.doc')) return 'docx';
  if (lower.endsWith('.pptx') || lower.endsWith('.ppt')) return 'pptx';
  return 'text';
}

/**
 * Extracts real text content and page counts from an ArrayBuffer based on file type.
 */
export async function extractDocumentContent(
  buffer: ArrayBuffer,
  filename: string,
  fileSize: number
): Promise<ExtractedDocument> {
  const type = detectFileType(filename);
  let content = '';
  let pageCount = 1;

  if (type === 'pdf') {
    const result = await extractFromPdf(buffer, filename);
    content = result.text;
    pageCount = result.pageCount;
  } else if (type === 'docx') {
    const result = await extractFromDocx(buffer);
    content = result.text;
    pageCount = Math.max(1, Math.ceil(content.split(/\s+/).length / 350));
  } else if (type === 'pptx') {
    const result = await extractFromPptx(buffer);
    content = result.text;
    pageCount = result.slideCount;
  } else {
    // Text / Markdown file
    const decoder = new TextDecoder('utf-8', { fatal: false });
    content = decoder.decode(new Uint8Array(buffer));
    pageCount = Math.max(1, Math.ceil(content.split(/\s+/).length / 400));
  }

  const cleanedText = content.trim();

  if (!cleanedText) {
    throw new Error(
      `No readable text could be extracted from "${filename}". Please make sure the file contains real text and is not an empty document or scanned image.`
    );
  }

  const charCount = cleanedText.length;
  const wordCount = cleanedText.split(/\s+/).filter(Boolean).length;

  return {
    name: filename,
    type,
    size: fileSize,
    content: cleanedText,
    pageCount,
    charCount,
    wordCount,
  };
}

/**
 * Extracts real text from PDF files using pdfjs-dist
 */
async function extractFromPdf(
  buffer: ArrayBuffer,
  filename: string
): Promise<{ text: string; pageCount: number }> {
  try {
    const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');
    const data = new Uint8Array(buffer);

    const doc = await pdfjs.getDocument({
      data,
      useSystemFonts: true,
      disableFontFace: true,
    }).promise;

    const numPages = doc.numPages;
    const pageTexts: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      try {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent();
        const pageStr = textContent.items
          .map((item: { str?: string }) => item.str || '')
          .filter(Boolean)
          .join(' ');

        if (pageStr.trim()) {
          pageTexts.push(`[Page ${i}]\n${pageStr}`);
        }
      } catch (pageErr) {
        console.warn(`Could not extract page ${i} of ${filename}:`, pageErr);
      }
    }

    const fullText = pageTexts.join('\n\n');

    if (!fullText.trim()) {
      throw new Error(
        `PDF "${filename}" contains ${numPages} page(s) but no selectable text was found. If this is a scanned photocopy, please upload a text-searchable PDF.`
      );
    }

    return {
      text: fullText,
      pageCount: numPages,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'PDF extraction failed';
    throw new Error(`Failed to parse PDF "${filename}": ${msg}`);
  }
}

/**
 * Extracts real text from DOCX files using mammoth
 */
async function extractFromDocx(buffer: ArrayBuffer): Promise<{ text: string }> {
  try {
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    const text = result.value || '';
    return { text };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'DOCX extraction failed';
    throw new Error(`Failed to parse DOCX document: ${msg}`);
  }
}

/**
 * Extracts real slide text from PPTX files using JSZip
 */
async function extractFromPptx(
  buffer: ArrayBuffer
): Promise<{ text: string; slideCount: number }> {
  try {
    const zip = await JSZip.loadAsync(buffer);
    // Find all slide XML files
    const slidePaths = Object.keys(zip.files)
      .filter((path) => path.match(/^ppt\/slides\/slide\d+\.xml$/))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
        return numA - numB;
      });

    if (slidePaths.length === 0) {
      throw new Error('No slide XML files found inside presentation archive.');
    }

    const slidesText: string[] = [];

    for (let i = 0; i < slidePaths.length; i++) {
      const slidePath = slidePaths[i];
      const xml = await zip.files[slidePath].async('string');
      // Extract all text inside <a:t>...</a:t> tags
      const matches = [...xml.matchAll(/<a:t[^>]*>([^<]+)<\/a:t>/g)];
      const slideText = matches.map((m) => m[1]).join(' ').trim();

      if (slideText) {
        slidesText.push(`[Slide ${i + 1}]\n${slideText}`);
      }
    }

    const fullText = slidesText.join('\n\n');

    return {
      text: fullText,
      slideCount: slidePaths.length,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'PPTX extraction failed';
    throw new Error(`Failed to parse PPTX presentation: ${msg}`);
  }
}
