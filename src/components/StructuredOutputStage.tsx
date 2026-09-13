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
  AlertTriangle,
  FileCheck,
  Download,
  Info
} from 'lucide-react';
import { StructuredOutput, OutputMode } from '@/lib/types';
import { TextWithMath, MathRenderer } from './ui/MathRenderer';
import { AcademicBadge } from './ui/AcademicBadge';

interface StructuredOutputStageProps {
  output: StructuredOutput;
  onSwitchMode: (newMode: OutputMode) => void;
  onStartNew: () => void;
  generationNotice?: string | null;
}

export function StructuredOutputStage({
  output,
  onSwitchMode,
  onStartNew,
  generationNotice,
}: StructuredOutputStageProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    let md = '';
    if (output.mode === 'one_glance_summary' && output.oneGlance) {
      const g = output.oneGlance;
      md = `# ${g.title}\n\n**Executive Thesis**: ${g.executiveThesis}\n\n## High-Yield Takeaways\n${g.highYieldTakeaways.map(t => `- ${t}`).join('\n')}\n\n## Critical Exam Pitfalls\n${g.criticalExamPitfalls.map(p => `- ${p}`).join('\n')}`;
    } else if (output.revisionNotes) {
      const r = output.revisionNotes;
      md = `# ${r.title}\n**Course**: ${r.courseOrSubject}\n\n${r.overview}\n\n` + 
        r.units.map(u => `## Unit ${u.unitNumber}: ${u.unitTitle}\n\n${u.inDepthExplanation}\n`).join('\n');
    }

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const summary = output.oneGlance;
  const notes = output.revisionNotes;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-16">
      {/* Workflow Step Tracker (Non-Printable) */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#808D9F] print:hidden">
        <span className="px-3 py-1 rounded-full bg-[#EAE5D9] text-[#5A6B7D]">
          ✓ Ingested ({output.materials.length} sources)
        </span>
        <span className="text-[#DDD6C3]">───</span>
        <span className="px-3 py-1 rounded-full bg-[#EAE5D9] text-[#5A6B7D]">
          ✓ Chosen Architecture
        </span>
        <span className="text-[#DDD6C3]">───</span>
        <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B2A47] text-white font-medium shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Step 3: Structured Output & PDF
        </span>
      </div>

      {/* Action Header Bar (Non-Printable) */}
      <div className="bg-white rounded-2xl border border-[#EAE5D9] p-4 sm:p-5 shadow-desk flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        {/* Mode Switcher Toggle */}
        <div className="flex items-center bg-[#FAF8F2] p-1 rounded-xl border border-[#EAE5D9]">
          <button
            onClick={() => onSwitchMode('one_glance_summary')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              output.mode === 'one_glance_summary'
                ? 'bg-white text-[#1B2A47] font-bold shadow-2xs'
                : 'text-[#808D9F] hover:text-[#121C30]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#1B2A47]" />
            One-Glance Summary
          </button>
          <button
            onClick={() => onSwitchMode('revision_notes')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-mono rounded-lg transition-all ${
              output.mode === 'revision_notes'
                ? 'bg-white text-[#4A6B5D] font-bold shadow-2xs'
                : 'text-[#808D9F] hover:text-[#121C30]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#4A6B5D]" />
            Revision Notes
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-xs font-mono text-[#1A232E] transition-colors shadow-2xs"
            title="Copy formatted markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#4A6B5D]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Markdown'}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1B2A47] hover:bg-[#121C30] text-white text-xs font-mono font-semibold transition-all shadow-desk hover:shadow-desk-elevated"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            Export as PDF
          </button>

          <button
            onClick={onStartNew}
            className="p-2 rounded-xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-[#808D9F] hover:text-[#121C30] transition-colors"
            title="Start New Workflow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dynamic Content Notice */}
      {generationNotice && (
        <div className="p-3.5 bg-white rounded-xl border border-[#EAE5D9] shadow-2xs flex items-center justify-between text-xs text-[#3D4E60] print:hidden">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#1B2A47] shrink-0" />
            <span className="font-mono text-[11px]">{generationNotice}</span>
          </div>
          <span className="text-[10px] font-mono text-[#4A6B5D] font-medium bg-[#EFF5F1] px-2 py-0.5 rounded border border-[#D0DFD6]">
            Print Ready
          </span>
        </div>
      )}

      {/* Ingested Source Attribution Bar */}
      <div className="px-1 flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#808D9F] print:text-black">
        <span className="text-[11px] text-[#808D9F]">Extracted from your files:</span>
        {output.materials.map((m, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded bg-white border border-[#EAE5D9] text-[#1B2A47] font-medium text-[11px]"
          >
            {m.name} ({m.type.toUpperCase()})
          </span>
        ))}
      </div>

      {/* Printable Paper Document Container */}
      <div className="academic-paper bg-white rounded-2xl border border-[#EAE5D9] p-8 sm:p-12 shadow-desk space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="border-b border-[#EAE5D9] pb-6 space-y-3 print:border-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1B2A47] print:hidden" />
              <span className="font-mono text-xs text-[#808D9F] uppercase tracking-wider">
                SturdyNerdy • Academic Synthesis
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#808D9F] print:text-black">
              {output.createdAt}
            </span>
          </div>

          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C30] tracking-tight leading-snug">
            {output.mode === 'one_glance_summary' ? summary?.title : notes?.title}
          </h1>

          {output.mode === 'revision_notes' && notes?.courseOrSubject && (
            <div className="font-mono text-xs font-semibold text-[#1B2A47]">
              {notes.courseOrSubject}
            </div>
          )}
        </div>

        {/* View A: One-Glance Summary Render */}
        {output.mode === 'one_glance_summary' && summary && (
          <div className="space-y-8">
            {/* Executive Thesis */}
            <div className="p-5 rounded-xl bg-[#FAF8F2] border border-[#EAE5D9] print:bg-transparent print:border-black/30 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1B2A47] font-bold block">
                Executive Core Thesis
              </span>
              <p className="font-sans text-sm sm:text-base text-[#121C30] leading-relaxed italic">
                &quot;{summary.executiveThesis}&quot;
              </p>
            </div>

            {/* High-Yield Takeaways */}
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-[#121C30] border-b border-[#EAE5D9] pb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] print:hidden" />
                High-Yield Takeaways
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#212D3B]">
                {summary.highYieldTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <span className="font-mono text-[#1B2A47] font-bold text-xs shrink-0 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <TextWithMath text={item} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Formulas & Theoretical Rules */}
            {summary.coreFormulasAndDefinitions && summary.coreFormulasAndDefinitions.length > 0 && (
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-lg text-[#121C30] border-b border-[#EAE5D9] pb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1B2A47] print:hidden" />
                  Core Formulas & Invariant Rules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summary.coreFormulasAndDefinitions.map((f, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#FAF8F4] border border-[#EAE5D9] space-y-2 print:border-black/30"
                    >
                      <div className="font-heading font-bold text-xs text-[#121C30]">{f.termOrLaw}</div>
                      <div className="bg-white p-2.5 rounded-lg border border-[#EAE5D9] print:border-black/20">
                        <MathRenderer formula={f.formulaOrRule} block={true} />
                      </div>
                      <div className="text-[11px] font-sans text-[#5A6B7D] leading-relaxed">
                        {f.context}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Comparison Reference Matrix */}
            {summary.quickComparisonTable && (
              <div className="space-y-3">
                <h2 className="font-heading font-bold text-lg text-[#121C30] border-b border-[#EAE5D9] pb-2">
                  {summary.quickComparisonTable.title || 'Comparative Reference Matrix'}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans border border-[#EAE5D9] rounded-xl overflow-hidden">
                    <thead className="bg-[#FAF8F2] font-mono text-[11px] text-[#121C30] uppercase tracking-wider border-b border-[#EAE5D9]">
                      <tr>
                        {summary.quickComparisonTable.headers.map((h, i) => (
                          <th key={i} className="p-3 border-r border-[#EAE5D9] last:border-none">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAE5D9] font-sans">
                      {summary.quickComparisonTable.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#FAF8F4]/50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 border-r border-[#EAE5D9] last:border-none leading-relaxed">
                              <TextWithMath text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Critical Exam Pitfalls & 5-Min Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Pitfalls */}
              <div className="p-5 rounded-xl border border-red-200 bg-red-50/40 space-y-3 print:border-black/30">
                <h3 className="font-heading font-bold text-sm text-red-900 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 print:hidden" />
                  Critical Exam Pitfalls & Traps
                </h3>
                <ul className="space-y-2 text-xs font-sans text-[#212D3B]">
                  {summary.criticalExamPitfalls.map((pitfall, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✕</span>
                      <TextWithMath text={pitfall} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5-Min Review Checklist */}
              <div className="p-5 rounded-xl border border-[#D0DFD6] bg-[#EFF5F1]/50 space-y-3 print:border-black/30">
                <h3 className="font-heading font-bold text-sm text-[#365045] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] print:hidden" />
                  5-Minute Pre-Exam Checklist
                </h3>
                <ul className="space-y-2 text-xs font-sans text-[#212D3B]">
                  {summary.fiveMinuteReviewChecklist.map((chk, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-[#4A6B5D] font-bold">✓</span>
                      <TextWithMath text={chk} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* View B: Revision Notes Render */}
        {output.mode === 'revision_notes' && notes && (
          <div className="space-y-10">
            {/* Overview */}
            <div className="p-5 rounded-xl bg-[#FAF8F2] border border-[#EAE5D9] space-y-1 print:border-black/30">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#4A6B5D] font-bold block">
                Course Curriculum Synthesis
              </span>
              <p className="font-sans text-sm text-[#212D3B] leading-relaxed">
                {notes.overview}
              </p>
            </div>

            {/* Units */}
            {notes.units.map((unit) => (
              <div key={unit.unitNumber} className="space-y-6 pt-4 border-t border-[#EAE5D9] print:border-black/30">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#808D9F] block">
                    Unit 0{unit.unitNumber}
                  </span>
                  <h2 className="font-heading font-bold text-xl text-[#121C30]">
                    {unit.unitTitle}
                  </h2>
                </div>

                {/* Formal Definitions */}
                {unit.formalDefinitions && unit.formalDefinitions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1B2A47]">
                      Formal Academic Definitions
                    </h3>
                    <div className="space-y-3">
                      {unit.formalDefinitions.map((def, dIdx) => (
                        <div key={dIdx} className="p-4 rounded-xl bg-[#FAF8F4] border border-[#EAE5D9] space-y-1.5">
                          <div className="font-heading font-bold text-xs text-[#121C30]">{def.term}</div>
                          <p className="font-sans text-xs text-[#5A6B7D] leading-relaxed">
                            {def.definition}
                          </p>
                          {def.latexFormula && (
                            <div className="bg-white p-2 rounded-lg border border-[#EAE5D9] mt-2">
                              <MathRenderer formula={def.latexFormula} block={true} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* In-Depth Explanation */}
                <div className="space-y-2">
                  <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#5A6B7D]">
                    Theoretical Exposition
                  </h3>
                  <div className="text-xs sm:text-sm font-sans text-[#212D3B] leading-relaxed space-y-3">
                    <TextWithMath text={unit.inDepthExplanation} />
                  </div>
                </div>

                {/* Step-by-Step Derivations */}
                {unit.stepByStepDerivations && unit.stepByStepDerivations.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1B2A47]">
                      Step-by-Step Derivations & Invariants
                    </h3>
                    {unit.stepByStepDerivations.map((der, dIdx) => (
                      <div key={dIdx} className="p-4 rounded-xl bg-[#FAF8F2] border border-[#EAE5D9] space-y-2">
                        <div className="font-heading font-bold text-xs text-[#121C30]">{der.title}</div>
                        <ol className="space-y-1.5 text-xs font-sans text-[#212D3B] pl-4 list-decimal">
                          {der.steps.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed">
                              <TextWithMath text={step} />
                            </li>
                          ))}
                        </ol>
                        {der.latex && (
                          <div className="bg-white p-2.5 rounded-lg border border-[#EAE5D9] mt-2">
                            <MathRenderer formula={der.latex} block={true} />
                          </div>
                        )}
                        <div className="text-[11px] font-mono text-[#4A6B5D] font-medium pt-1">
                          Conclusion: {der.conclusion}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Misconceptions & Tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {unit.commonMisconceptions.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-50/40 border border-red-200 text-xs space-y-1.5">
                      <div className="font-mono font-bold text-red-800 uppercase text-[10px]">
                        Common Misconceptions
                      </div>
                      <ul className="space-y-1 text-[#212D3B]">
                        {unit.commonMisconceptions.map((m, mIdx) => (
                          <li key={mIdx} className="flex items-start gap-1.5">
                            <span className="text-red-500 font-bold">✕</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {unit.highYieldExamTips.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#EFF5F1] border border-[#D0DFD6] text-xs space-y-1.5">
                      <div className="font-mono font-bold text-[#365045] uppercase text-[10px]">
                        High-Yield Exam Tips
                      </div>
                      <ul className="space-y-1 text-[#212D3B]">
                        {unit.highYieldExamTips.map((t, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-1.5">
                            <span className="text-[#4A6B5D] font-bold">★</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Formula Reference Sheet */}
            {notes.formulaSheet && notes.formulaSheet.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#EAE5D9]">
                <h2 className="font-heading font-bold text-xl text-[#121C30]">
                  Comprehensive Formula Reference Sheet
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notes.formulaSheet.map((f, fIdx) => (
                    <div key={fIdx} className="p-4 rounded-xl bg-[#FAF8F4] border border-[#EAE5D9] space-y-2">
                      <div className="font-heading font-bold text-xs text-[#121C30]">{f.name}</div>
                      <div className="bg-white p-2.5 rounded-lg border border-[#EAE5D9]">
                        <MathRenderer formula={f.latex} block={true} />
                      </div>
                      <p className="text-[11px] font-sans text-[#5A6B7D]">{f.explanation}</p>
                      {f.variables && f.variables.length > 0 && (
                        <div className="text-[10px] font-mono text-[#808D9F] pt-1 border-t border-[#EAE5D9]">
                          {f.variables.join(' • ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Memory Aids */}
            {notes.memoryAidsAndMnemonics && notes.memoryAidsAndMnemonics.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-[#EAE5D9]">
                <h2 className="font-heading font-bold text-lg text-[#121C30]">
                  Memory Aids & Mnemonics
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {notes.memoryAidsAndMnemonics.map((m, mIdx) => (
                    <div key={mIdx} className="p-4 rounded-xl bg-[#FDF8F0] border border-[#EADBCA] space-y-1">
                      <div className="font-mono text-xs font-bold text-[#8C6D3F]">{m.mnemonic}</div>
                      <div className="font-heading font-bold text-xs text-[#121C30]">{m.title}</div>
                      <p className="text-xs font-sans text-[#5A6B7D] leading-relaxed pt-1">
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
