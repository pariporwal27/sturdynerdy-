'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  FileSpreadsheet,
  FileCheck,
  Compass
} from 'lucide-react';

export function InteractiveStudyDeskHero() {
  const [activePreview, setActivePreview] = useState<'summary' | 'notes'>('summary');

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Brand Hero Heading */}
      <div className="text-center space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAEFF7] border border-[#D5E0EF] text-[#1B2A47] text-xs font-mono font-medium tracking-tight shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
          <span>SturdyNerdy Study Desk</span>
        </div>

        <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#121C30] tracking-tight leading-[1.15]">
          From lecture chaos to{' '}
          <span className="text-[#354A6B] italic font-serif font-normal">
            study clarity.
          </span>
        </h1>

        <p className="text-sm sm:text-base font-sans text-[#5A6B7D] max-w-2xl mx-auto leading-relaxed">
          Drop in lecture slides, course packets, and reading notes. SturdyNerdy organizes your materials into a focused{' '}
          <strong className="text-[#1A232E] font-medium">One-Glance Summary</strong> or{' '}
          <strong className="text-[#1A232E] font-medium">Revision Guide</strong>, formatted for clean printing.
        </p>
      </div>

      {/* Interactive Transformation Stage */}
      <div className="relative bg-[#FAF8F2] rounded-2xl border border-[#EAE5D9] p-6 sm:p-8 shadow-desk-card overflow-hidden">
        {/* Subtle decorative ruler top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B2A47]/30 via-[#4A6B5D]/40 to-[#8C6D3F]/30" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Scattered Study Materials */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#808D9F] font-semibold">
                Uploaded Materials
              </span>
              <span className="text-[11px] font-mono text-[#4A6B5D] font-medium">
                Multi-Format Ingestion
              </span>
            </div>

            {/* Document 1: PDF */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EAE5D9] shadow-2xs hover:shadow-desk hover:border-[#1B2A47]/30 transition-all duration-200 cursor-default flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EAEFF7] text-[#1B2A47] font-mono text-[10px] font-bold flex items-center justify-center border border-[#D5E0EF]">
                  PDF
                </div>
                <div>
                  <div className="font-heading font-bold text-xs text-[#1A232E]">
                    Lecture_Syllabus_Theory.pdf
                  </div>
                  <div className="text-[10px] font-mono text-[#808D9F]">
                    Course framework & bounds
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#4A6B5D] bg-[#EFF5F1] px-2 py-0.5 rounded border border-[#D0DFD6]">
                Ready
              </span>
            </div>

            {/* Document 2: DOCX */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EAE5D9] shadow-2xs hover:shadow-desk hover:border-[#4A6B5D]/30 transition-all duration-200 cursor-default flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#EFF5F1] text-[#4A6B5D] font-mono text-[10px] font-bold flex items-center justify-center border border-[#D0DFD6]">
                  DOC
                </div>
                <div>
                  <div className="font-heading font-bold text-xs text-[#1A232E]">
                    Recitation_Derivation_Notes.docx
                  </div>
                  <div className="text-[10px] font-mono text-[#808D9F]">
                    Analytical derivations & steps
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#4A6B5D] bg-[#EFF5F1] px-2 py-0.5 rounded border border-[#D0DFD6]">
                Ready
              </span>
            </div>

            {/* Document 3: PPTX */}
            <div className="p-3.5 rounded-xl bg-white border border-[#EAE5D9] shadow-2xs hover:shadow-desk hover:border-[#8C6D3F]/30 transition-all duration-200 cursor-default flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FDF8F0] text-[#8C6D3F] font-mono text-[10px] font-bold flex items-center justify-center border border-[#EADBCA]">
                  PPT
                </div>
                <div>
                  <div className="font-heading font-bold text-xs text-[#1A232E]">
                    Seminar_SlideDeck.pptx
                  </div>
                  <div className="text-[10px] font-mono text-[#808D9F]">
                    Key exam traps & definitions
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#4A6B5D] bg-[#EFF5F1] px-2 py-0.5 rounded border border-[#D0DFD6]">
                Ready
              </span>
            </div>
          </div>

          {/* Center Conduit */}
          <div className="lg:col-span-2 flex lg:flex-col items-center justify-center py-2 lg:py-0">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#EAE5D9] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D3F]" />
              <ArrowRight className="w-3.5 h-3.5 text-[#1B2A47]" />
            </div>
          </div>

          {/* Right: Synthesized Academic Notebook Preview */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#EAE5D9] p-4 sm:p-5 shadow-desk space-y-3">
            <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-2.5">
              <div className="flex items-center gap-1 bg-[#F5F2E9] p-0.5 rounded-md text-[11px] font-mono">
                <button
                  onClick={() => setActivePreview('summary')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePreview === 'summary'
                      ? 'bg-white text-[#1B2A47] font-bold shadow-2xs'
                      : 'text-[#808D9F] hover:text-[#1A232E]'
                  }`}
                >
                  One-Glance
                </button>
                <button
                  onClick={() => setActivePreview('notes')}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    activePreview === 'notes'
                      ? 'bg-white text-[#4A6B5D] font-bold shadow-2xs'
                      : 'text-[#808D9F] hover:text-[#1A232E]'
                  }`}
                >
                  Revision Guide
                </button>
              </div>

              <span className="text-[10px] font-mono text-[#4A6B5D] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Ready to Print
              </span>
            </div>

            {/* Preview Sheet Content */}
            {activePreview === 'summary' ? (
              <div className="space-y-2 text-xs font-sans animate-fadeIn">
                <div className="font-heading font-bold text-[#121C30] text-sm">
                  Executive Examination Synthesis
                </div>
                <div className="text-[11px] text-[#5A6B7D] leading-relaxed italic bg-[#FBF9F4] p-2.5 rounded border border-[#EAE5D9]">
                  &quot;Consolidated core thesis, comparison matrix, and 5-minute pre-exam checklist.&quot;
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#1B2A47] pt-1">
                  <span>5 Key Takeaways</span>
                  <span>Formula Matrix</span>
                  <span>Exam Pitfalls</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs font-sans animate-fadeIn">
                <div className="font-heading font-bold text-[#121C30] text-sm">
                  Structured Unit Revision Guide
                </div>
                <div className="text-[11px] font-mono text-[#4A6B5D] bg-[#EFF5F1] p-2 rounded border border-[#D0DFD6]">
                  State transitions, formal definitions & step-by-step proofs
                </div>
                <div className="text-[11px] text-[#5A6B7D] leading-relaxed">
                  Unit-by-unit syllabus organization with formula sheets and mnemonics.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
