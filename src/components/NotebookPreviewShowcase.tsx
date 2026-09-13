'use client';

import React from 'react';
import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <section className="relative py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center space-y-2 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#EAE5D9] text-xs font-mono text-[#5A6B7D] uppercase tracking-wider"></div>

        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#121C30] tracking-tight leading-[1.08]">
          Academic Journal Style
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
