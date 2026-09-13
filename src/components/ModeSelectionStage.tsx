'use client';

import React from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { OutputMode } from '@/lib/types';

export interface ModeSelectionStageProps {
  selectedMode: OutputMode;
  onSelectMode: (mode: OutputMode) => void;
  onGenerate: (mode: OutputMode) => void;
  onBackToFiles: () => void;
  totalCharacters?: number;
  totalFiles?: number;
}

export function ModeSelectionStage({
  selectedMode,
  onSelectMode,
  onGenerate,
  onBackToFiles,
  totalCharacters = 0,
  totalFiles = 0,
}: ModeSelectionStageProps) {
  return (
    <div 
      role="region" 
      aria-label="Choose output format mode"
      className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EAE5D9] shadow-desk-elevated space-y-8 animate-fadeIn"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE5D9] pb-4 gap-3">
        <div>
          <h3 className="font-heading font-bold text-2xl text-[#121C30]">
            Choose Output Format
          </h3>
          <p className="font-mono text-xs text-[#808D9F] mt-0.5">
            Extracted {totalCharacters.toLocaleString()} characters across {totalFiles} file(s).
          </p>
        </div>
        <button
          onClick={onBackToFiles}
          aria-label="Back to uploaded files"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#808D9F] hover:text-[#121C30] underline self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] rounded"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to files</span>
        </button>
      </div>

      <div 
        role="radiogroup" 
        aria-label="Select study notes synthesis mode"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Mode A: Quick Summary */}
        <div
          role="radio"
          aria-checked={selectedMode === 'quick_summary'}
          aria-label="Quick Summary mode: concise overview with main topic, key takeaways, and definitions"
          tabIndex={0}
          onClick={() => onSelectMode('quick_summary')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectMode('quick_summary');
            }
          }}
          className={`p-6 sm:p-8 rounded-3xl border-2 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] focus-visible:ring-offset-2 ${
            selectedMode === 'quick_summary'
              ? 'border-[#1B2A47] bg-[#FAF8F3] shadow-desk'
              : 'border-[#EAE5D9] bg-white hover:border-[#DDD6C3]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider">
              Mode A
            </span>
            {selectedMode === 'quick_summary' && (
              <CheckCircle2 className="w-5 h-5 text-[#1B2A47]" data-testid="summary-selected-icon" />
            )}
          </div>
          <h4 className="font-heading font-bold text-2xl text-[#121C30] mb-2">
            Quick Summary
          </h4>
          <p className="text-sm text-[#5A6B7D] leading-relaxed font-serif">
            A concise student-friendly summary. Extracts main topic, core concepts, key takeaways, definitions, and essential formulas. Maximum 1 page.
          </p>
        </div>

        {/* Mode B: Revision Notes */}
        <div
          role="radio"
          aria-checked={selectedMode === 'revision_notes'}
          aria-label="Revision Notes mode: comprehensive exam prep notes with headings, derivations, and formulas"
          tabIndex={0}
          onClick={() => onSelectMode('revision_notes')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelectMode('revision_notes');
            }
          }}
          className={`p-6 sm:p-8 rounded-3xl border-2 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A6B5D] focus-visible:ring-offset-2 ${
            selectedMode === 'revision_notes'
              ? 'border-[#4A6B5D] bg-[#EFF5F1]/50 shadow-desk'
              : 'border-[#EAE5D9] bg-white hover:border-[#DDD6C3]'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-xs font-bold text-[#4A6B5D] uppercase tracking-wider">
              Mode B
            </span>
            {selectedMode === 'revision_notes' && (
              <CheckCircle2 className="w-5 h-5 text-[#4A6B5D]" data-testid="revision-selected-icon" />
            )}
          </div>
          <h4 className="font-heading font-bold text-2xl text-[#121C30] mb-2">
            Revision Notes
          </h4>
          <p className="text-sm text-[#5A6B7D] leading-relaxed font-serif">
            Structured revision notes for exam prep. Uses clear headings, subtopics, clean bullet points, definitions, formulas, and high-yield exam tips.
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button
          onClick={() => onGenerate(selectedMode)}
          aria-label={`Generate ${selectedMode === 'quick_summary' ? 'Quick Summary' : 'Revision Notes'}`}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-[#1B2A47] hover:bg-[#121C30] text-white font-mono font-bold text-base transition-all shadow-desk hover:shadow-desk-elevated active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] focus-visible:ring-offset-2"
        >
          <span>Generate {selectedMode === 'quick_summary' ? 'Quick Summary' : 'Revision Notes'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
