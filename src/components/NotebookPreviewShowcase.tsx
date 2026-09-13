'use client';

import React, { useState } from 'react';
import { 
  Bookmark, 
  Sparkles, 
  Sigma, 
  AlertTriangle, 
  CheckCircle2, 
  Printer, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { MathRenderer } from './ui/MathRenderer';

export function NotebookPreviewShowcase() {
  const [activeTab, setActiveTab] = useState<'summary' | 'derivations' | 'formulas' | 'traps'>('summary');

  return (
    <section className="relative py-28 lg:py-36 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#EAE5D9] text-xs font-mono text-[#5A6B7D] uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5 text-[#1B2A47]" />
          <span>Section 05 · The Final Artifact</span>
        </div>

        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#121C30] tracking-tight leading-[1.08]">
          Crafted like a luxury <br />
          academic journal.
        </h2>

        <p className="text-lg sm:text-xl text-[#5A6B7D] font-serif leading-relaxed max-w-2xl mx-auto">
          No robotic AI walls of text. Every output is rendered into a structured digital notebook 
          with leather spine trim, tabbed sections, KaTeX equations, and print-ready PDF styling.
        </p>

        {/* Notebook Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'summary'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#FAF8F4]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            1. One-Glance Summary
          </button>
          <button
            onClick={() => setActiveTab('derivations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'derivations'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#FAF8F4]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            2. In-Depth Derivations
          </button>
          <button
            onClick={() => setActiveTab('formulas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'formulas'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#FAF8F4]'
            }`}
          >
            <Sigma className="w-3.5 h-3.5" />
            3. Formula Rulebook
          </button>
          <button
            onClick={() => setActiveTab('traps')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'traps'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#FAF8F4]'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
            4. Sticky Exam Traps
          </button>
        </div>
      </div>

      {/* Large Notebook Display Shell */}
      <div className="relative rounded-3xl bg-white border border-[#E2DACB] shadow-journal-hover overflow-hidden">
        {/* Leather Spine with Stitching (Left Edge) */}
        <div className="absolute top-0 bottom-0 left-0 w-5 sm:w-7 bg-gradient-to-r from-[#2C241E] via-[#3D322A] to-[#4D3F35] border-r border-[#635345] shadow-inner flex flex-col items-center justify-between py-10 z-10">
          <div className="w-1 h-8 rounded-full bg-[#C5A059]/40" />
          <div className="w-1 h-8 rounded-full bg-[#C5A059]/40" />
          <div className="w-1 h-8 rounded-full bg-[#C5A059]/40" />
          <div className="w-1 h-8 rounded-full bg-[#C5A059]/40" />
        </div>

        {/* Notebook Inner Ruled Margin Line */}
        <div className="absolute top-0 bottom-0 left-16 sm:left-24 w-px bg-[#E8C4C4]/40 pointer-events-none z-10" />

        {/* Notebook Page Body */}
        <div className="pl-12 sm:pl-28 pr-6 sm:pr-12 py-10 sm:py-14 bg-[#FCFAF6] min-h-[500px]">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE5D9] pb-6 mb-8 gap-3">
            <div>
              <div className="font-mono text-[11px] text-[#808D9F] uppercase tracking-widest">
                SturdyNerdy Course Synthesis · Preview Mode
              </div>
              <h3 className="font-heading font-bold text-2xl sm:text-4xl text-[#121C30] mt-1">
                Distributed Consensus & Raft Invariants
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#FAF8F2] border border-[#EAE5D9] text-[#5A6B7D]">
                CS-440 · Exam Ready
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-lg bg-[#1B2A47] text-white font-medium flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" /> PDF Ready
              </span>
            </div>
          </div>

          {/* TAB 1: SUMMARY PREVIEW */}
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-2xs">
                <div className="font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider mb-2">
                  Executive Thesis
                </div>
                <p className="font-serif italic text-base sm:text-lg text-[#243347] leading-relaxed">
                  &ldquo;Distributed consensus cannot guarantee both safety and liveness under unconstrained network partitions (FLP Impossibility). Raft sacrifices total liveness during election splits to preserve absolute state machine safety.&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] space-y-2">
                  <div className="font-mono text-xs font-bold text-[#4A6B5D] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    High-Yield Rule #1
                  </div>
                  <p className="text-xs sm:text-sm text-[#47586E] leading-relaxed">
                    Leader Completeness: If a log entry is committed in a given term, that entry will be present in the logs of the leaders for all higher-numbered terms.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] space-y-2">
                  <div className="font-mono text-xs font-bold text-[#4A6B5D] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    High-Yield Rule #2
                  </div>
                  <p className="text-xs sm:text-sm text-[#47586E] leading-relaxed">
                    Election Safety: At most one candidate can be elected leader in a given election term, strictly requiring a majority quorum of \(\lfloor N/2 \rfloor + 1\).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DERIVATIONS PREVIEW */}
          {activeTab === 'derivations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-white border border-[#EAE5D9] shadow-2xs space-y-3">
                <div className="font-mono text-xs font-bold text-[#1B2A47] flex items-center gap-2">
                  <Sigma className="w-4 h-4 text-[#1B2A47]" />
                  Derivation: Quorum Overlap Probability & Fault Tolerance
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-[#47586E] font-serif leading-relaxed">
                  <p>Given total cluster size \(N = 2f + 1\), any two quorums \(Q_1, Q_2\) have size \(f + 1\).</p>
                  <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE5D9] font-mono text-xs text-center my-2">
                    <MathRenderer formula="|Q_1 \cap Q_2| \ge (f + 1) + (f + 1) - (2f + 1) = 1" block={true} />
                  </div>
                  <p className="font-sans font-medium text-xs text-[#4A6B5D] bg-[#EFF5F1] p-2.5 rounded-lg border border-[#D0DFD6]">
                    Conclusion: By Pigeonhole Principle, any two majorities intersect in at least one node containing the latest committed log entry.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FORMULA RULEBOOK PREVIEW */}
          {activeTab === 'formulas' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] space-y-3">
                <div className="font-mono text-xs font-bold text-[#1B2A47]">
                  Byzantine Fault Tolerance Bound
                </div>
                <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE5D9] text-center">
                  <MathRenderer formula="N \ge 3f + 1" block={true} />
                </div>
                <p className="text-xs text-[#808D9F]">
                  Maximum malicious or arbitrary nodes tolerable while preserving Byzantine consistency.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#EAE5D9] space-y-3">
                <div className="font-mono text-xs font-bold text-[#1B2A47]">
                  Crash-Fault Quorum Size
                </div>
                <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE5D9] text-center">
                  <MathRenderer formula="Q_{crash} = \left\lfloor \frac{N}{2} \right\rfloor + 1" block={true} />
                </div>
                <p className="text-xs text-[#808D9F]">
                  Minimum voting server consensus required for leader term progression.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: STICKY EXAM TRAPS PREVIEW */}
          {activeTab === 'traps' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeIn">
              <div className="p-6 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] shadow-desk transform -rotate-1 space-y-2">
                <div className="font-mono text-xs font-bold text-[#B45309] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Trap 1: Counting Committed Entries
                </div>
                <p className="text-xs sm:text-sm text-[#92400E] leading-relaxed">
                  Never commit an entry from a prior term by counting replicas alone. A leader can only commit an entry from its CURRENT term, which automatically commits prior entries indirectly.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] shadow-desk transform rotate-1 space-y-2">
                <div className="font-mono text-xs font-bold text-[#B45309] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Trap 2: Split Vote Stalls
                </div>
                <p className="text-xs sm:text-sm text-[#92400E] leading-relaxed">
                  Assuming fixed heartbeat timers prevent election loops. Randomized election timeouts (150ms–300ms) are strictly necessary to break split-vote symmetry.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
