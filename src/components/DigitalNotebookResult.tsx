'use client';

import React, { useState } from 'react';
import { 
  Printer, 
  Copy, 
  Check, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  BookOpen, 
  FileSpreadsheet, 
  CheckCircle2, 
  Sigma, 
  Zap, 
  AlertCircle,
  HelpCircle,
  Layers,
  FileCheck2
} from 'lucide-react';
import { StructuredOutput, OutputMode } from '@/lib/types';
import { TextWithMath, MathRenderer } from './ui/MathRenderer';

interface DigitalNotebookResultProps {
  output: StructuredOutput;
  onSwitchMode: (newMode: OutputMode) => void;
  onStartNew: () => void;
}

export function DigitalNotebookResult({
  output,
  onSwitchMode,
  onStartNew,
}: DigitalNotebookResultProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    let md = '';

    if (output.mode === 'quick_summary' && output.quickSummary) {
      const q = output.quickSummary;
      md = `# Quick Summary: ${q.mainTopic}\n\n`;
      md += `## Overview\n${q.summary}\n\n`;
      md += `## Core Concepts\n${q.coreConcepts.map((c) => `- ${c}`).join('\n')}\n\n`;
      md += `## Key Takeaways\n${q.keyTakeaways.map((t) => `- ${t}`).join('\n')}\n\n`;
      if (q.importantDefinitions && q.importantDefinitions.length > 0) {
        md += `## Important Definitions\n${q.importantDefinitions
          .map((d) => `**${d.term}**: ${d.definition}`)
          .join('\n')}\n\n`;
      }
      if (q.importantFormulas && q.importantFormulas.length > 0) {
        md += `## Important Formulas\n${q.importantFormulas
          .map((f) => `### ${f.name}\n$$${f.formula}$$\n${f.explanation || ''}`)
          .join('\n\n')}\n\n`;
      }
    } else if (output.revisionNotes) {
      const r = output.revisionNotes;
      md = `# Revision Notes: ${r.title}\n**Subject**: ${r.subjectOrTopic}\n\n`;
      r.sections.forEach((s) => {
        md += `## ${s.heading}\n\n`;
        s.subtopics.forEach((sub) => {
          md += `### ${sub.subheading}\n`;
          sub.keyPoints.forEach((kp) => {
            md += `- ${kp}\n`;
          });
          md += '\n';
        });
        if (s.examOrientedNotes && s.examOrientedNotes.length > 0) {
          md += `**Exam-Oriented Notes**:\n${s.examOrientedNotes.map((n) => `> ${n}`).join('\n')}\n\n`;
        }
      });
      if (r.quickExamTips && r.quickExamTips.length > 0) {
        md += `## Quick Exam Tips\n${r.quickExamTips.map((tip) => `- ${tip}`).join('\n')}\n`;
      }
    }

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const summary = output.quickSummary;
  const revision = output.revisionNotes;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-24">
      {/* Top Action Bar (Non-Printable) */}
      <div className="bg-white rounded-2xl border border-[#EAE5D9] p-4 sm:p-5 shadow-desk flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        {/* Mode Toggle Switcher */}
        <div 
          role="tablist" 
          aria-label="Notebook view mode switcher"
          className="flex items-center bg-[#FAF8F3] p-1 rounded-xl border border-[#EAE5D9]"
        >
          <button
            role="tab"
            aria-selected={output.mode === 'quick_summary'}
            aria-label="Switch to Quick Summary view"
            onClick={() => onSwitchMode('quick_summary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] ${
              output.mode === 'quick_summary'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'text-[#5A6B7D] hover:text-[#121C2B]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Quick Summary
          </button>
          <button
            role="tab"
            aria-selected={output.mode === 'revision_notes'}
            aria-label="Switch to Revision Notes view"
            onClick={() => onSwitchMode('revision_notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] ${
              output.mode === 'revision_notes'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'text-[#5A6B7D] hover:text-[#121C2B]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Revision Notes
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            aria-label="Copy notes to clipboard as Markdown"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-xs font-mono text-[#121C2B] transition-colors shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47]"
            title="Copy as Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#4A6B5D]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={handlePrint}
            aria-label="Export or print notes as PDF"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B2A47] hover:bg-[#121C30] text-white text-xs font-mono font-semibold transition-all shadow-desk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] focus-visible:ring-offset-2"
            title="Export as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export as PDF</span>
          </button>

          <button
            onClick={onStartNew}
            aria-label="Upload new materials and start new session"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-[#8595AB] hover:text-[#121C2B] text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47]"
            title="Upload new materials"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">New Upload</span>
          </button>
        </div>
      </div>

      {/* Extraction Verification Badge Ribbon (Non-Printable) */}
      <div className="bg-[#FAF8F3] border border-[#EAE5D9] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#5A6B7D] print:hidden">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
          <span>
            Synthesized from <strong>{output.materials.length} uploaded file(s)</strong>:
          </span>
          <span className="text-[#8595AB]">
            {output.materials.map((m) => m.name).join(', ')}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#455770]">
          <span>{output.stats.pagesProcessed} pages processed</span>
          <span>•</span>
          <span>{output.stats.charactersExtracted.toLocaleString()} characters extracted</span>
        </div>
      </div>

      {/* ============================================================= */}
      {/* MAIN NOTEBOOK SHEET (Print-Ready Clean Design)                */}
      {/* ============================================================= */}
      <div className="bg-white rounded-3xl border border-[#E2DACB] shadow-desk-elevated p-8 sm:p-12 space-y-8 text-[#121C2B] print:border-none print:shadow-none print:p-0">
        {/* =========================================================== */}
        {/* MODE A: QUICK SUMMARY VIEW (Maximum 1 Page)                 */}
        {/* =========================================================== */}
        {output.mode === 'quick_summary' && summary && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="border-b border-[#EAE5D9] pb-6 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider">
                <FileSpreadsheet className="w-4 h-4" />
                Quick Revision Summary
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#121C2B] tracking-tight">
                {summary.mainTopic}
              </h1>
            </div>

            {/* Overview / Core Summary */}
            <div className="p-6 rounded-2xl bg-[#FAF8F3] border border-[#EAE5D9] space-y-2">
              <div className="font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider">
                Overview & Core Concept
              </div>
              <TextWithMath
                text={summary.summary}
                className="text-base sm:text-lg text-[#243347] font-serif leading-relaxed"
              />
            </div>

            {/* Core Concepts */}
            {summary.coreConcepts && summary.coreConcepts.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#121C2B]">
                  Core Concepts
                </h2>
                <div className="grid grid-cols-1 gap-2.5">
                  {summary.coreConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-[#EAE5D9] shadow-2xs"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#EFF5F1] text-[#4A6B5D] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <TextWithMath text={concept} className="text-sm text-[#334155] leading-relaxed flex-1" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {summary.keyTakeaways && summary.keyTakeaways.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#121C2B]">
                  Key Takeaways
                </h2>
                <ul className="space-y-2">
                  {summary.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-[#EFF5F1] border border-[#D0DFD6] text-xs sm:text-sm text-[#244234]"
                    >
                      <span className="text-[#4A6B5D] font-bold mt-0.5">✔</span>
                      <TextWithMath text={takeaway} className="leading-relaxed flex-1" />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Important Definitions */}
            {summary.importantDefinitions && summary.importantDefinitions.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#121C2B]">
                  Important Definitions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {summary.importantDefinitions.map((def, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-[#EAE5D9] shadow-2xs space-y-1.5"
                    >
                      <div className="font-mono text-xs font-bold text-[#1B2A47]">
                        {def.term}
                      </div>
                      <TextWithMath text={def.definition} className="text-xs text-[#5A6B7D] leading-relaxed" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Important Formulas */}
            {summary.importantFormulas && summary.importantFormulas.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#121C2B]">
                  Important Formulas
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {summary.importantFormulas.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAF8F3] border border-[#EAE5D9] space-y-2"
                    >
                      <div className="font-mono text-xs font-bold text-[#1B2A47]">
                        {f.name}
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-[#EAE5D9] overflow-x-auto text-center font-mono text-sm">
                        <MathRenderer formula={f.formula} block={true} />
                      </div>
                      {f.explanation && (
                        <p className="text-xs text-[#5A6B7D] leading-relaxed">
                          {f.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================== */}
        {/* MODE B: REVISION NOTES VIEW (Exam-Oriented Headings)        */}
        {/* =========================================================== */}
        {output.mode === 'revision_notes' && revision && (
          <div className="space-y-10 animate-fadeIn">
            {/* Header */}
            <div className="border-b border-[#EAE5D9] pb-6 space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#4A6B5D] uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                Structured Revision Notes
              </div>
              <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#121C2B] tracking-tight">
                {revision.title}
              </h1>
              <div className="font-mono text-xs text-[#5A6B7D]">
                Course Topic: <span className="font-semibold text-[#121C2B]">{revision.subjectOrTopic}</span>
              </div>
            </div>

            {/* Structured Sections */}
            {revision.sections && revision.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-6 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#1B2A47] text-white flex items-center justify-center font-mono text-xs font-bold">
                    {sIdx + 1}
                  </span>
                  <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C2B]">
                    {section.heading}
                  </h2>
                </div>

                {/* Subtopics */}
                <div className="space-y-5 pl-2 sm:pl-4">
                  {section.subtopics && section.subtopics.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      className="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-2xs space-y-4"
                    >
                      <h3 className="font-heading font-bold text-lg text-[#1B2A47]">
                        {sub.subheading}
                      </h3>

                      {/* Bullet Points */}
                      {sub.keyPoints && sub.keyPoints.length > 0 && (
                        <ul className="space-y-2 text-sm text-[#334155]">
                          {sub.keyPoints.map((kp, kpIdx) => (
                            <li key={kpIdx} className="flex items-start gap-2.5">
                              <span className="text-[#4A6B5D] font-bold mt-1">›</span>
                              <TextWithMath text={kp} className="leading-relaxed flex-1" />
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Inline Definitions */}
                      {sub.definitions && sub.definitions.length > 0 && (
                        <div className="p-3.5 bg-[#FAF8F3] rounded-xl border border-[#EAE5D9] space-y-2">
                          <div className="font-mono text-xs font-bold text-[#1B2A47] uppercase">
                            Key Definitions
                          </div>
                          {sub.definitions.map((d, dIdx) => (
                            <div key={dIdx} className="text-xs text-[#243347]">
                              <strong className="font-semibold text-[#121C2B]">{d.term}: </strong>
                              <TextWithMath text={d.definition} className="inline" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Formulas */}
                      {sub.formulas && sub.formulas.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {sub.formulas.map((f, fIdx) => (
                            <div key={fIdx} className="p-3 bg-[#FAF8F3] rounded-xl border border-[#EAE5D9]">
                              <div className="font-mono text-xs font-bold text-[#1B2A47] mb-1">
                                {f.name}
                              </div>
                              <MathRenderer formula={f.formula} block={true} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Exam-Oriented Notes */}
                {section.examOrientedNotes && section.examOrientedNotes.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
                    <div className="font-mono text-xs font-bold text-[#B45309] flex items-center gap-1.5 uppercase">
                      <Zap className="w-3.5 h-3.5" />
                      Exam-Oriented Notes
                    </div>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#92400E]">
                      {section.examOrientedNotes.map((note, nIdx) => (
                        <li key={nIdx} className="flex items-start gap-2">
                          <span>•</span>
                          <TextWithMath text={note} className="flex-1 leading-relaxed" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            {/* Quick Exam Tips */}
            {revision.quickExamTips && revision.quickExamTips.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#EFF5F1] border border-[#D0DFD6] space-y-3">
                <div className="font-mono text-xs font-bold text-[#365045] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
                  Final Revision & Test Day Checklist
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-[#284036]">
                  {revision.quickExamTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold">✓</span>
                      <TextWithMath text={tip} className="flex-1 leading-relaxed" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
