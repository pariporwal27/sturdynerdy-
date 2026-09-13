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
  AlertTriangle,
  FileCheck,
  Download,
  Info,
  Layers,
  Bookmark,
  Sigma,
  Zap,
  CheckCircle2,
  HelpCircle,
  Hash
} from 'lucide-react';
import { StructuredOutput, OutputMode } from '@/lib/types';
import { TextWithMath, MathRenderer } from './ui/MathRenderer';
import { AcademicBadge } from './ui/AcademicBadge';

interface DigitalNotebookResultProps {
  output: StructuredOutput;
  onSwitchMode: (newMode: OutputMode) => void;
  onStartNew: () => void;
  generationNotice?: string | null;
}

type NotebookTab = 'summary' | 'revision' | 'formulas' | 'traps';

export function DigitalNotebookResult({
  output,
  onSwitchMode,
  onStartNew,
  generationNotice,
}: DigitalNotebookResultProps) {
  const [activeTab, setActiveTab] = useState<NotebookTab>('summary');
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    let md = '';
    if (output.mode === 'one_glance_summary' && output.oneGlance) {
      const g = output.oneGlance;
      md = `# ${g.title}\n\n**Executive Thesis**: ${g.executiveThesis}\n\n## High-Yield Takeaways\n${g.highYieldTakeaways.map(t => `- ${t}`).join('\n')}\n\n## Critical Exam Pitfalls\n${g.criticalExamPitfalls.map(p => `- ${p}`).join('\n')}\n\n## 5-Minute Checklist\n${g.fiveMinuteReviewChecklist.map(c => `- [ ] ${c}`).join('\n')}`;
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
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-20">
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
          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Step 3: Digital Notebook & PDF
        </span>
      </div>

      {/* Action Header Bar (Non-Printable) */}
      <div className="bg-[#FAF8F2] rounded-2xl border border-[#EAE5D9] p-4 sm:p-5 shadow-desk flex flex-col lg:flex-row lg:items-center justify-between gap-4 print:hidden">
        {/* Output Mode Switcher */}
        <div className="flex items-center bg-[#EAE5D9]/60 p-1 rounded-xl border border-[#DDD6C3]">
          <button
            onClick={() => {
              onSwitchMode('one_glance_summary');
              setActiveTab('summary');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
              output.mode === 'one_glance_summary'
                ? 'bg-white text-[#1B2A47] font-bold shadow-2xs'
                : 'text-[#5A6B7D] hover:text-[#121C30]'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#1B2A47]" />
            One-Glance Summary
          </button>
          <button
            onClick={() => {
              onSwitchMode('revision_notes');
              setActiveTab('revision');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono rounded-lg transition-all ${
              output.mode === 'revision_notes'
                ? 'bg-white text-[#4A6B5D] font-bold shadow-2xs'
                : 'text-[#5A6B7D] hover:text-[#121C30]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#4A6B5D]" />
            Revision Notes
          </button>
        </div>

        {/* Notebook Physical Section Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'summary'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#F3ECE0]'
            }`}
          >
            <Bookmark className="w-3 h-3" />
            Summary Sheet
          </button>

          <button
            onClick={() => setActiveTab('revision')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'revision'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#F3ECE0]'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            Full Revision
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'formulas'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#F3ECE0]'
            }`}
          >
            <Sigma className="w-3 h-3" />
            Formula Index
          </button>

          <button
            onClick={() => setActiveTab('traps')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              activeTab === 'traps'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#F3ECE0]'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-[#D97706]" />
            Exam Traps
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-xs font-mono text-[#1A232E] transition-colors shadow-2xs"
            title="Copy as Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#4A6B5D]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1B2A47] hover:bg-[#121C30] text-white text-xs font-mono font-semibold transition-all shadow-desk hover:shadow-desk-elevated"
            title="Export as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Export as PDF</span>
          </button>

          <button
            onClick={onStartNew}
            className="p-1.5 rounded-xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-[#808D9F] hover:text-[#121C30] transition-colors"
            title="Start New Workflow"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dynamic Generation Notice Banner */}
      {generationNotice && (
        <div className="p-3 bg-white rounded-xl border border-[#EAE5D9] shadow-2xs flex items-center justify-between text-xs text-[#3D4E60] print:hidden">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#1B2A47] shrink-0" />
            <span className="font-mono text-[11px]">{generationNotice}</span>
          </div>
          <span className="text-[10px] font-mono text-[#4A6B5D] font-medium bg-[#EFF5F1] px-2 py-0.5 rounded border border-[#D0DFD6]">
            Print Ready
          </span>
        </div>
      )}

      {/* PHYSICAL NOTEBOOK CONTAINER */}
      <div className="relative rounded-3xl bg-white border border-[#E2DACB] shadow-desk-elevated overflow-hidden print:border-none print:shadow-none">
        {/* Notebook Leather Spine & Stitching (Left Accent) */}
        <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-6 bg-gradient-to-r from-[#2C241E] via-[#3D322A] to-[#4D3F35] border-r border-[#635345] shadow-inner print:hidden flex flex-col items-center justify-between py-8">
          <div className="w-1 h-6 rounded-full bg-[#C5A059]/40" />
          <div className="w-1 h-6 rounded-full bg-[#C5A059]/40" />
          <div className="w-1 h-6 rounded-full bg-[#C5A059]/40" />
          <div className="w-1 h-6 rounded-full bg-[#C5A059]/40" />
        </div>

        {/* Inner Ruled Margin Guideline */}
        <div className="absolute top-0 bottom-0 left-12 sm:left-16 w-px bg-[#E8C4C4]/40 print:hidden pointer-events-none" />

        {/* Notebook Content Page */}
        <div className="pl-8 sm:pl-20 pr-6 sm:pr-10 py-8 sm:py-12 bg-[#FCFAF6] print:bg-white print:p-0 min-h-[700px] text-[#1A232E]">
          {/* Header Metadata Ribbon */}
          <div className="border-b border-[#EAE5D9] pb-6 mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#808D9F]">
                  SturdyNerdy Academic Synthesis
                </span>
                <span className="text-[#DDD6C3]">·</span>
                <span className="font-mono text-[11px] text-[#808D9F]">
                  {output.createdAt}
                </span>
                <span className="text-[#DDD6C3]">·</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F2] border border-[#EAE5D9] text-[#5A6B7D]">
                  {output.materials.length} Ingested Source{output.materials.length !== 1 ? 's' : ''}
                </span>
              </div>

              <h1 className="font-heading font-bold text-2xl sm:text-4xl text-[#121C30] tracking-tight leading-tight">
                {summary ? summary.title : notes ? notes.title : 'Study Synthesis'}
              </h1>

              {notes?.courseOrSubject && (
                <p className="font-mono text-xs text-[#5A6B7D] mt-1.5">
                  Course Subject: <span className="font-semibold text-[#1B2A47]">{notes.courseOrSubject}</span>
                </p>
              )}
            </div>

            {/* Ingested Document Chips */}
            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 text-right print:hidden">
              {output.materials.map((m, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF8F2] border border-[#EAE5D9] text-[11px] font-mono text-[#5A6B7D]">
                  <FileText className="w-3 h-3 text-[#1B2A47]" />
                  <span className="max-w-[160px] truncate">{m.name}</span>
                  <span className="text-[10px] text-[#808D9F]">({m.wordCount}w)</span>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* TAB 1: SUMMARY SHEET VIEW */}
          {/* ========================================================= */}
          {activeTab === 'summary' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Executive Thesis Callout */}
              <div className="relative p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-desk overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#1B2A47]" />
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#1B2A47] uppercase tracking-wider mb-2">
                  <Bookmark className="w-3.5 h-3.5" />
                  Executive Thesis & Core Principle
                </div>
                <div className="text-base sm:text-lg text-[#121C30] font-serif leading-relaxed italic">
                  &ldquo;{summary?.executiveThesis || notes?.overview || 'Comprehensive academic synthesis generated from uploaded materials.'}&rdquo;
                </div>
              </div>

              {/* High-Yield Takeaways */}
              {summary?.highYieldTakeaways && summary.highYieldTakeaways.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#1B2A47] uppercase tracking-wider">
                    <Zap className="w-4 h-4 text-[#C5A059]" />
                    High-Yield Takeaways (Exam Essential)
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {summary.highYieldTakeaways.map((takeaway, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#EAE5D9] shadow-2xs hover:border-[#1B2A47]/30 transition-colors"
                      >
                        <div className="w-6 h-6 rounded-full bg-[#EFF5F1] text-[#4A6B5D] border border-[#D0DFD6] flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <TextWithMath text={takeaway} className="text-sm text-[#243347] flex-1 leading-relaxed" />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Core Comparison Matrix */}
              {summary?.quickComparisonTable && summary.quickComparisonTable.rows?.length > 0 && (
                <section className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-mono font-bold text-[#1B2A47] uppercase tracking-wider">
                    <FileSpreadsheet className="w-4 h-4 text-[#1B2A47]" />
                    {summary.quickComparisonTable.title || 'Comparative Concept Matrix'}
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-[#EAE5D9] bg-white shadow-desk">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#FAF8F2] border-b border-[#EAE5D9]">
                          {summary.quickComparisonTable.headers.map((h, i) => (
                            <th key={i} className="p-3.5 font-mono font-semibold text-[#121C30]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAE5D9]">
                        {summary.quickComparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#FAF8F4]/80 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3.5 text-[#3D4E60]">
                                <TextWithMath text={cell} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Quick Jump Link to Full Notes */}
              <div className="p-4 rounded-xl bg-[#FAF8F2] border border-[#EAE5D9] flex items-center justify-between text-xs font-mono text-[#5A6B7D] print:hidden">
                <span>Want unit-by-unit deep derivations and formal proofs?</span>
                <button
                  onClick={() => setActiveTab('revision')}
                  className="px-3 py-1.5 rounded-lg bg-[#1B2A47] text-white font-medium hover:bg-[#121C30] transition-colors"
                >
                  Open Full Revision Tab →
                </button>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: FULL REVISION NOTES VIEW */}
          {/* ========================================================= */}
          {activeTab === 'revision' && (
            <div className="space-y-10 animate-fadeIn">
              {/* Course Overview */}
              {notes?.overview && (
                <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-2xs space-y-2">
                  <div className="font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider">
                    Academic Scope & Overview
                  </div>
                  <TextWithMath text={notes.overview} className="text-sm text-[#3D4E60] leading-relaxed" />
                </div>
              )}

              {/* Units Breakdown */}
              {notes?.units && notes.units.length > 0 ? (
                notes.units.map((unit) => (
                  <article key={unit.unitNumber} className="space-y-5 border-t border-[#EAE5D9] pt-8">
                    {/* Unit Title Header */}
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-[#1B2A47] text-white font-mono text-xs font-bold">
                        Unit {unit.unitNumber}
                      </span>
                      <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#121C30]">
                        {unit.unitTitle}
                      </h2>
                    </div>

                    {/* Formal Definitions */}
                    {unit.formalDefinitions && unit.formalDefinitions.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {unit.formalDefinitions.map((def, dIdx) => (
                          <div key={dIdx} className="p-4 rounded-xl bg-white border border-[#EAE5D9] shadow-2xs space-y-1.5">
                            <div className="font-mono text-xs font-bold text-[#1B2A47] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B2A47]" />
                              {def.term}
                            </div>
                            <TextWithMath text={def.definition} className="text-xs text-[#3D4E60] leading-relaxed" />
                            {def.latexFormula && (
                              <div className="pt-2">
                                <MathRenderer formula={def.latexFormula} block={true} className="text-xs bg-[#FAF8F2] p-2 rounded-lg border border-[#EAE5D9]" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* In-Depth Explanation */}
                    <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-desk space-y-3">
                      <div className="font-mono text-xs font-semibold text-[#808D9F] uppercase tracking-wider">
                        Core Concepts & Synthesis
                      </div>
                      <TextWithMath text={unit.inDepthExplanation} className="text-sm text-[#243347] leading-relaxed space-y-3 font-serif" />
                    </div>

                    {/* Step-by-Step Derivations */}
                    {unit.stepByStepDerivations && unit.stepByStepDerivations.length > 0 && (
                      <div className="space-y-3">
                        {unit.stepByStepDerivations.map((deriv, derivIdx) => (
                          <div key={derivIdx} className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#DDD6C3] space-y-3">
                            <div className="font-mono text-xs font-bold text-[#1B2A47] flex items-center gap-2">
                              <Sigma className="w-4 h-4 text-[#1B2A47]" />
                              <span>Derivation: {deriv.title}</span>
                            </div>
                            <ol className="list-decimal list-inside space-y-2 text-xs text-[#3D4E60] font-mono">
                              {deriv.steps.map((step, sIdx) => (
                                <li key={sIdx} className="leading-relaxed pl-1">
                                  <TextWithMath text={step} className="inline" />
                                </li>
                              ))}
                            </ol>
                            {deriv.latex && (
                              <div className="bg-white p-3 rounded-xl border border-[#EAE5D9] my-2">
                                <MathRenderer formula={deriv.latex} block={true} />
                              </div>
                            )}
                            <div className="text-xs font-medium text-[#4A6B5D] bg-[#EFF5F1] p-2.5 rounded-lg border border-[#D0DFD6]">
                              <TextWithMath text={`Conclusion: ${deriv.conclusion}`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* High-Yield Exam Tips for this Unit */}
                    {unit.highYieldExamTips && unit.highYieldExamTips.length > 0 && (
                      <div className="p-4 rounded-xl bg-[#EFF5F1] border border-[#D0DFD6] space-y-2">
                        <div className="font-mono text-xs font-bold text-[#365045] flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-[#4A6B5D]" />
                          Exam Directives & Problem Tips
                        </div>
                        <ul className="space-y-1.5 text-xs text-[#284036]">
                          {unit.highYieldExamTips.map((tip, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-[#4A6B5D] font-bold">›</span>
                              <TextWithMath text={tip} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                /* Fallback if summary was generated instead of revision */
                <div className="text-center py-12 space-y-3">
                  <BookOpen className="w-8 h-8 text-[#808D9F] mx-auto" />
                  <p className="text-sm font-mono text-[#5A6B7D]">
                    This session was generated in One-Glance Summary mode.
                  </p>
                  <button
                    onClick={() => onSwitchMode('revision_notes')}
                    className="px-4 py-2 rounded-xl bg-[#1B2A47] text-white text-xs font-mono font-semibold"
                  >
                    Generate Full Revision Notes
                  </button>
                </div>
              )}

              {/* Memory Aids & Mnemonics */}
              {notes?.memoryAidsAndMnemonics && notes.memoryAidsAndMnemonics.length > 0 && (
                <section className="space-y-4 pt-6 border-t border-[#EAE5D9]">
                  <div className="font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    Memory Aids & Retention Mnemonics
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {notes.memoryAidsAndMnemonics.map((aid, idx) => (
                      <div key={idx} className="relative p-5 rounded-2xl bg-[#FFFDF5] border border-[#E8DFC5] shadow-desk space-y-2">
                        <div className="absolute top-2 right-3 font-mono text-[10px] text-[#A89874] uppercase">
                          Mnemonic
                        </div>
                        <div className="font-mono text-xs font-bold text-[#8A6D3B]">
                          {aid.title}
                        </div>
                        <div className="text-sm font-bold text-[#121C30] bg-[#FAF3DE] px-3 py-1.5 rounded-lg font-mono">
                          {aid.mnemonic}
                        </div>
                        <p className="text-xs text-[#5A6B7D] leading-relaxed">
                          {aid.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: FORMULA INDEX VIEW */}
          {/* ========================================================= */}
          {activeTab === 'formulas' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-xl bg-white border border-[#EAE5D9] flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-bold text-lg text-[#121C30]">
                    Formula & Mathematical Rulebook
                  </h2>
                  <p className="font-mono text-xs text-[#808D9F]">
                    All mathematical identities, variable definitions, and operational laws extracted from your course materials.
                  </p>
                </div>
                <Sigma className="w-6 h-6 text-[#1B2A47]" />
              </div>

              {/* Formulas from Revision Notes */}
              {notes?.formulaSheet && notes.formulaSheet.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notes.formulaSheet.map((f, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-2xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#1B2A47]">{f.name}</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#FAF8F2] border border-[#EAE5D9] text-[#808D9F]">
                          Eq. {idx + 1}
                        </span>
                      </div>

                      <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE5D9] flex items-center justify-center overflow-x-auto">
                        <MathRenderer formula={f.latex} block={true} />
                      </div>

                      <p className="text-xs text-[#5A6B7D] leading-relaxed">
                        {f.explanation}
                      </p>

                      {f.variables && f.variables.length > 0 && (
                        <div className="pt-2 border-t border-[#EAE5D9]/60">
                          <div className="font-mono text-[10px] text-[#808D9F] uppercase mb-1">
                            Variable Ledger:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {f.variables.map((v, vIdx) => (
                              <span key={vIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F4F1EA] text-[#3D4E60]">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : summary?.coreFormulasAndDefinitions && summary.coreFormulasAndDefinitions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {summary.coreFormulasAndDefinitions.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-[#EAE5D9] shadow-2xs space-y-3">
                      <div className="font-mono text-xs font-bold text-[#1B2A47]">
                        {item.termOrLaw}
                      </div>
                      <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE5D9] font-mono text-xs text-[#121C30]">
                        <TextWithMath text={item.formulaOrRule} />
                      </div>
                      <p className="text-xs text-[#5A6B7D] leading-relaxed">
                        {item.context}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 space-y-2">
                  <Sigma className="w-8 h-8 text-[#808D9F] mx-auto" />
                  <p className="text-xs font-mono text-[#808D9F]">
                    No explicit mathematical formulas identified in the current scope.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: EXAM TRAPS & CHECKLIST VIEW */}
          {/* ========================================================= */}
          {activeTab === 'traps' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Sticky Notes Grid for Pitfalls & Misconceptions */}
              <div>
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#D97706] uppercase tracking-wider mb-4">
                  <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                  Critical Exam Pitfalls & High-Frequency Misconceptions
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {(summary?.criticalExamPitfalls || [
                    'Confusing steady-state convergence with transient response.',
                    'Forgetting sign reversals when moving terms across the boundary condition.',
                    'Assuming uniform distributions without verifying boundary constraints.'
                  ]).map((pitfall, idx) => {
                    const rotations = ['-rotate-1', 'rotate-1', '-rotate-0.5', 'rotate-1.5'];
                    const rot = rotations[idx % rotations.length];

                    return (
                      <div
                        key={idx}
                        className={`relative p-5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] shadow-desk transform ${rot} hover:rotate-0 transition-transform`}
                      >
                        {/* Tape strip at top */}
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#F59E0B]/20 backdrop-blur-xs border border-[#F59E0B]/30 rounded-xs" />

                        <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-[#B45309] mb-2">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>Pitfall #{idx + 1}</span>
                        </div>

                        <TextWithMath text={pitfall} className="text-xs text-[#92400E] leading-relaxed font-sans" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5-Minute Exam Hall Checklist (Interactive) */}
              <div className="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-desk space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-4">
                  <div>
                    <div className="font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
                      5-Minute Pre-Exam Verification Checklist
                    </div>
                    <p className="text-xs font-mono text-[#808D9F] mt-0.5">
                      Tick these off in the exam hall right before test papers are handed out.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#4A6B5D] bg-[#EFF5F1] px-2.5 py-1 rounded-lg border border-[#D0DFD6]">
                    Interactive
                  </span>
                </div>

                <div className="space-y-2.5">
                  {(summary?.fiveMinuteReviewChecklist || [
                    'Verify all dimensional units match before calculating final values.',
                    'Check sign conventions on energy and work equations.',
                    'Double-check edge cases (n=0, x->inf, singular matrices).',
                    'Scan for keyword traps: "at least", "mutually exclusive", "isomorphic".'
                  ]).map((item, idx) => {
                    const itemId = `check-${idx}`;
                    const isChecked = checkedItems[itemId] || false;

                    return (
                      <div
                        key={idx}
                        onClick={() => toggleCheck(itemId)}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'bg-[#EFF5F1] border-[#A8D5BA] text-[#1E3A2F]'
                            : 'bg-[#FAF8F4] border-[#EAE5D9] text-[#243347] hover:bg-white'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isChecked ? 'bg-[#4A6B5D] border-[#4A6B5D] text-white' : 'bg-white border-[#DDD6C3]'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <TextWithMath
                          text={item}
                          className={`text-xs flex-1 ${isChecked ? 'line-through opacity-80' : ''}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Notebook Bottom Signature */}
          <div className="mt-12 pt-6 border-t border-[#EAE5D9] flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#808D9F] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
              <span>Synthesized via SturdyNerdy Academic Engine</span>
            </div>
            <span>Page 1 of 1 · Print-Ready Study Desk Format</span>
          </div>
        </div>
      </div>
    </div>
  );
}
