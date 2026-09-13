'use client';

import React from 'react';
import { 
  FileSpreadsheet, 
  BookOpen, 
  Layers, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Cpu, 
  Clock, 
  BrainCircuit,
  FileCheck2,
  Loader2,
  FileText
} from 'lucide-react';
import { OutputMode, UploadedStudyMaterial } from '@/lib/types';

interface ModeSelectionStageProps {
  materials: UploadedStudyMaterial[];
  selectedMode: OutputMode;
  onSelectMode: (mode: OutputMode) => void;
  onGenerate: () => void;
  onBackToUpload: () => void;
  isGenerating: boolean;
}

export function ModeSelectionStage({
  materials,
  selectedMode,
  onSelectMode,
  onGenerate,
  onBackToUpload,
  isGenerating,
}: ModeSelectionStageProps) {
  const totalWords = materials.reduce((acc, m) => acc + m.wordCount, 0);
  const estMinutes = Math.max(2, Math.round(totalWords / 200));

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Workflow Step Tracker */}
      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#808D9F]">
        <button
          onClick={onBackToUpload}
          className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAE5D9] text-[#5A6B7D] hover:text-[#121C30] transition-colors"
        >
          ✓ Step 1: Ingested ({materials.length} files)
        </button>
        <span className="text-[#DDD6C3]">───</span>
        <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B2A47] text-white font-medium shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-white" /> Step 2: Choose Mode
        </span>
        <span className="text-[#DDD6C3]">───</span>
        <span className="px-3 py-1 rounded-full bg-[#EAE5D9] text-[#5A6B7D]">
          Step 3: Output & PDF
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#121C30] tracking-tight">
          Choose Synthesis Architecture
        </h1>
        <p className="text-sm font-sans text-[#5A6B7D] max-w-xl mx-auto leading-relaxed">
          {materials.length} multi-format study documents are staged. Select your preferred output format based on your study timeline.
        </p>
      </div>

      {/* Analysis Metrics Overview */}
      <div className="bg-white rounded-2xl border border-[#EAE5D9] p-5 sm:p-6 shadow-desk grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-mono text-[#808D9F] uppercase tracking-wider block">
            Corpus Size
          </span>
          <div className="font-heading font-bold text-lg text-[#121C30]">
            {totalWords.toLocaleString()} <span className="text-xs font-mono font-normal text-[#5A6B7D]">words</span>
          </div>
          <div className="text-[10px] font-mono text-[#808D9F]">{materials.length} uploaded files</div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono text-[#808D9F] uppercase tracking-wider block">
            Reading Time
          </span>
          <div className="font-heading font-bold text-lg text-[#121C30] flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#1B2A47]" />
            {estMinutes} <span className="text-xs font-mono font-normal text-[#5A6B7D]">mins</span>
          </div>
          <div className="text-[10px] font-mono text-[#808D9F]">Source documents</div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono text-[#808D9F] uppercase tracking-wider block">
            Source Formats
          </span>
          <div className="flex flex-wrap gap-1 pt-1">
            {Array.from(new Set(materials.map(m => m.type.toUpperCase()))).map((fmt) => (
              <span key={fmt} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F2] border border-[#EAE5D9] text-[#1A232E] font-medium">
                {fmt}
              </span>
            ))}
          </div>
          <div className="text-[10px] font-mono text-[#4A6B5D] font-medium">Cross-Synthesized</div>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono text-[#808D9F] uppercase tracking-wider block">
            AI Engine
          </span>
          <div className="font-heading font-bold text-base text-[#121C30] flex items-center gap-1">
            <Cpu className="w-4 h-4 text-[#4A6B5D]" />
            Dynamic NLP
          </div>
          <div className="text-[10px] font-mono text-[#808D9F]">Content-Aware Extraction</div>
        </div>
      </div>

      {/* The Two Output Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: One-Glance Summary */}
        <div
          onClick={() => onSelectMode('one_glance_summary')}
          className={`p-6 sm:p-7 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-5 ${
            selectedMode === 'one_glance_summary'
              ? 'border-[#1B2A47] bg-white shadow-desk-elevated ring-1 ring-[#1B2A47]/10'
              : 'border-[#EAE5D9] bg-white/70 hover:border-[#1B2A47]/30 hover:bg-white shadow-desk'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#EAEFF7] text-[#1B2A47] flex items-center justify-center border border-[#D5E0EF]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                selectedMode === 'one_glance_summary' ? 'bg-[#1B2A47] text-white border-[#1B2A47]' : 'border-[#DDD6C3]'
              }`}>
                {selectedMode === 'one_glance_summary' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#1B2A47] font-bold">
                Rapid Pre-Exam Synthesis
              </span>
              <h3 className="font-heading font-bold text-xl text-[#121C30] mt-1">
                One-Glance Summary
              </h3>
            </div>

            <p className="text-xs font-sans text-[#5A6B7D] leading-relaxed">
              Designed for high-density, rapid review immediately before an examination. Distills multiple files into an authoritative executive sheet.
            </p>

            <ul className="space-y-2 text-xs font-sans text-[#212D3B] pt-2 border-t border-[#EAE5D9]">
              <li className="flex items-center gap-2">
                <span className="text-[#1B2A47] font-bold font-mono">✓</span>
                <span>Executive thesis directly from uploaded files</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B2A47] font-bold font-mono">✓</span>
                <span>5 high-yield takeaways & governing formulas</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B2A47] font-bold font-mono">✓</span>
                <span>Comparative reference matrix & cheat table</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#1B2A47] font-bold font-mono">✓</span>
                <span>Critical exam pitfalls & 5-min review checklist</span>
              </li>
            </ul>
          </div>

          <div className="text-[11px] font-mono text-[#808D9F] pt-2 border-t border-[#EAE5D9]">
            Recommended: When time is limited (3-5 pages printable)
          </div>
        </div>

        {/* Option 2: Revision Notes */}
        <div
          onClick={() => onSelectMode('revision_notes')}
          className={`p-6 sm:p-7 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-5 ${
            selectedMode === 'revision_notes'
              ? 'border-[#1B2A47] bg-white shadow-desk-elevated ring-1 ring-[#1B2A47]/10'
              : 'border-[#EAE5D9] bg-white/70 hover:border-[#4A6B5D]/40 hover:bg-white shadow-desk'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#EFF5F1] text-[#4A6B5D] flex items-center justify-center border border-[#D0DFD6]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                selectedMode === 'revision_notes' ? 'bg-[#1B2A47] text-white border-[#1B2A47]' : 'border-[#DDD6C3]'
              }`}>
                {selectedMode === 'revision_notes' && <Check className="w-3.5 h-3.5" />}
              </div>
            </div>

            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#4A6B5D] font-bold">
                Exhaustive Academic Guide
              </span>
              <h3 className="font-heading font-bold text-xl text-[#121C30] mt-1">
                Revision Notes
              </h3>
            </div>

            <p className="text-xs font-sans text-[#5A6B7D] leading-relaxed">
              Comprehensive textbook-level study notes organized into clean units. Features complete formal definitions, mathematical proofs, and memory mnemonics.
            </p>

            <ul className="space-y-2 text-xs font-sans text-[#212D3B] pt-2 border-t border-[#EAE5D9]">
              <li className="flex items-center gap-2">
                <span className="text-[#4A6B5D] font-bold font-mono">✓</span>
                <span>Unit-by-unit curriculum breakdown from documents</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4A6B5D] font-bold font-mono">✓</span>
                <span>Formal definitions with LaTeX mathematical notation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4A6B5D] font-bold font-mono">✓</span>
                <span>Step-by-step analytical derivations & proofs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#4A6B5D] font-bold font-mono">✓</span>
                <span>Dedicated formula sheet & memory mnemonics</span>
              </li>
            </ul>
          </div>

          <div className="text-[11px] font-mono text-[#808D9F] pt-2 border-t border-[#EAE5D9]">
            Recommended: For deep mastery & comprehensive exam prep
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-[#EAE5D9]">
        <button
          onClick={onBackToUpload}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#5A6B7D] hover:text-[#121C30] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Uploads
        </button>

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1B2A47] hover:bg-[#121C30] text-white text-xs font-mono font-semibold transition-all shadow-desk hover:shadow-desk-elevated disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              Synthesizing Structured Output...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate {selectedMode === 'one_glance_summary' ? 'One-Glance Summary' : 'Revision Notes'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
