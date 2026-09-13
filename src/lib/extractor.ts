import path from 'path';
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
    const decoder = new TextDecoder('utf-8', { fatal: false });
    content = decoder.decode(new Uint8Array(buffer));
    pageCount = Math.max(1, Math.ceil(content.split(/\s+/).length / 400));
  }

  const cleanedText = content.trim();

  if (!cleanedText) {
    throw new Error(
      `No readable text could be extracted from "${filename}". Make sure the file is text-searchable (not a scanned image or empty file).`
    );
  }

  return {
    name: filename,
    type,
    size: fileSize,
    content: cleanedText,
    pageCount,
    charCount: cleanedText.length,
    wordCount: cleanedText.split(/\s+/).filter(Boolean).length,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PDF EXTRACTION
// Strategy 1: pdfjs-dist in Node.js with explicit worker path
// Strategy 2: Raw PDF text-stream parser (no worker needed)
// ─────────────────────────────────────────────────────────────────────────────

async function extractFromPdf(
  buffer: ArrayBuffer,
  filename: string
): Promise<{ text: string; pageCount: number }> {
  // ── Strategy 1: pdfjs-dist ──────────────────────────────────────────────
  try {
    const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');

    // Explicitly load and register the worker in this process
    require('pdfjs-dist/legacy/build/pdf.worker.js');
    const workerPath = path.join(
      process.cwd(),
      'node_modules',
      'pdfjs-dist',
      'legacy',
      'build',
      'pdf.worker.js'
    );
    pdfjs.GlobalWorkerOptions.workerSrc = workerPath;

    const doc = await pdfjs
      .getDocument({
        data: new Uint8Array(buffer),
        useSystemFonts: true,
        disableFontFace: true,
        isEvalSupported: false,
      })
      .promise;

    const numPages: number = doc.numPages;
    const pageTexts: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      try {
        const page = await doc.getPage(i);
        const tc = await page.getTextContent();
        const pageStr = tc.items
          .map((item: { str?: string }) => item.str || '')
          .filter(Boolean)
          .join(' ');
        if (pageStr.trim()) pageTexts.push(`[Page ${i}]\n${pageStr}`);
      } catch {
        /* skip unreadable page */
      }
    }

    const fullText = pageTexts.join('\n\n');
    if (fullText.trim()) return { text: fullText, pageCount: numPages };
  } catch (err) {
    console.warn(`[pdfjs] Failed for "${filename}", trying stream fallback:`, err);
  }

  // ── Strategy 2: raw stream fallback ─────────────────────────────────────
  const streamText = extractRawPdfStreams(buffer);
  if (streamText.trim()) {
    return {
      text: streamText,
      pageCount: Math.max(1, Math.ceil(streamText.split(/\s+/).length / 320)),
    };
  }

  throw new Error(
    `Could not extract text from "${filename}". This PDF may be a scanned image without a text layer. Please upload a text-searchable PDF or convert it to DOCX.`
  );
}

function extractRawPdfStreams(buffer: ArrayBuffer): string {
  try {
    const decoder = new TextDecoder('latin1', { fatal: false });
    const raw = decoder.decode(new Uint8Array(buffer));
    const out: string[] = [];

    // Standard text operators
    const tjRe = /\(([^)]{1,500})\)\s*Tj/g;
    let m: RegExpExecArray | null;
    while ((m = tjRe.exec(raw)) !== null) {
      const t = m[1].replace(/\\n/g, ' ').replace(/\\\(/g, '(').replace(/\\\)/g, ')').trim();
      if (t.length > 1) out.push(t);
    }

    const tjArrRe = /\[([^\]]{1,2000})\]\s*TJ/g;
    let am: RegExpExecArray | null;
    while ((am = tjArrRe.exec(raw)) !== null) {
      const bits = am[1].match(/\(([^)]+)\)/g);
      bits?.forEach((b) => {
        const clean = b.slice(1, -1).trim();
        if (clean.length > 1) out.push(clean);
      });
    }

    return out.length > 5 ? out.join(' ') : '';
  } catch {
    return '';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCX EXTRACTION (mammoth)
// ─────────────────────────────────────────────────────────────────────────────

async function extractFromDocx(buffer: ArrayBuffer): Promise<{ text: string }> {
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return { text: result.value || '' };
}

// ─────────────────────────────────────────────────────────────────────────────
// PPTX EXTRACTION (JSZip)
// Handles multiple path conventions real PowerPoint files use:
//   • ppt/slides/slide1.xml  (standard OOXML)
//   • ppt\slides\slide1.xml  (Windows-style)
//   • Slides/Slide1.xml      (Google Slides export sometimes capitalises)
//   • slides/slide1.xml      (some converters drop the ppt/ prefix)
// Also falls back to extracting all <a:t> from any XML file in the archive.
// ─────────────────────────────────────────────────────────────────────────────

async function extractFromPptx(
  buffer: ArrayBuffer
): Promise<{ text: string; slideCount: number }> {
  let zip: JSZip;
  try {
    zip = await JSZip.loadAsync(buffer);
  } catch (e) {
    throw new Error(
      `Cannot read PPTX file — it may be corrupted or password-protected. (${String(e)})`
    );
  }

  const allKeys = Object.keys(zip.files).filter((k) => !zip.files[k].dir);

  // ── Pattern 1: standard ppt/slides/slideN.xml (forward slash, any case) ─
  let slidePaths = allKeys.filter((k) =>
    /slides[/\\]slide\d+\.xml$/i.test(k)
  );

  // ── Pattern 2: any XML inside a 'slides' folder ──────────────────────────
  if (slidePaths.length === 0) {
    slidePaths = allKeys.filter(
      (k) => /slides/i.test(k) && k.endsWith('.xml') && !k.includes('_rels')
    );
  }

  // ── Pattern 3: any XML file that isn't a relationship or content_types ───
  if (slidePaths.length === 0) {
    slidePaths = allKeys.filter(
      (k) =>
        k.endsWith('.xml') &&
        !k.includes('[Content_Types]') &&
        !k.includes('_rels') &&
        !k.includes('theme') &&
        !k.includes('layout') &&
        !k.includes('master')
    );
  }

  // ── Sort numerically ─────────────────────────────────────────────────────
  slidePaths.sort((a, b) => {
    const nA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
    const nB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
    return nA - nB;
  });

  if (slidePaths.length === 0) {
    // ── Fallback: Extract any text from all XML files if slide-specific extraction fails
    const allTexts: string[] = [];
    for (const k of allKeys.filter((k) => k.endsWith('.xml'))) {
      try {
        const xml = await zip.files[k].async('string');
        // Capture any text between tags, ignoring XML markup
        const textMatches = [...xml.matchAll(/>([^<]{1,500})</g)];
        textMatches.forEach((m) => {
          const t = m[1].trim();
          if (t.length > 1) allTexts.push(t);
        });
      } catch { /* skip */ }
    }
    if (allTexts.length > 0) {
      return { text: allTexts.join(' '), slideCount: 1 };
    }
    throw new Error(
      'No slide text found in the PPTX. The file may be blank, image-only, or in an unsupported format.'
    );
  }

  // ── Extract text from located slide files ───────────────────────────────
  const slidesText: string[] = [];
  for (let i = 0; i < slidePaths.length; i++) {
    try {
      const xml = await zip.files[slidePaths[i]].async('string');
      // Match any namespace-prefixed <*:t> tag (handles a:t, p:t, etc.)
      const matches = [...xml.matchAll(/<[a-z]+:t[^>]*>([^<]+)<\/[a-z]+:t>/g)];
      const text = matches.map((m) => m[1]).join(' ').trim();
      if (text) slidesText.push(`[Slide ${i + 1}]\n${text}`);
    } catch { /* skip bad slide */ }
  }

  if (slidesText.length === 0) {
    throw new Error(
      'PPTX slides were found but contained no readable text. The presentation may be image-only.'
    );
  }

  return { text: slidesText.join('\n\n'), slideCount: slidePaths.length };
}
