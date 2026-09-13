'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  Sigma,
  Zap,
  Bookmark
} from 'lucide-react';

export function DocumentMergeShowcase() {
  const [mergeState, setMergeState] = useState<'separate' | 'converging' | 'unified'>('converging');

  // Auto-cycle through states every 4 seconds if untouched
  useEffect(() => {
    const timer = setInterval(() => {
      setMergeState(prev => {
        if (prev === 'separate') return 'converging';
        if (prev === 'converging') return 'unified';
        return 'separate';
      });
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] py-28 lg:py-36 flex flex-col items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#EAE5D9]/40 via-[#FAF1E6]/50 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto px-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#EAE5D9] text-xs font-mono text-[#5A6B7D] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>Section 03 · Dynamic Synthesis</span>
        </div>

        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#121C30] tracking-tight leading-[1.08]">
          Watch scattered sources <br />
          fuse into singular understanding.
        </h2>

        <p className="text-lg sm:text-xl text-[#5A6B7D] font-serif leading-relaxed max-w-2xl mx-auto">
          Disparate PDF lecture slides, dense DOCX textbook chapters, and PPTX seminar decks 
          cross-reference their mutual invariants to generate one cohesive study master.
        </p>

        {/* Interactive State Controls */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setMergeState('separate')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              mergeState === 'separate'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#FAF8F4]'
            }`}
          >
            1. Scattered Files
          </button>
          <button
            onClick={() => setMergeState('converging')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              mergeState === 'converging'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#FAF8F4]'
            }`}
          >
            2. Cross-Referencing
          </button>
          <button
            onClick={() => setMergeState('unified')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              mergeState === 'unified'
                ? 'bg-[#1B2A47] text-white shadow-2xs'
                : 'bg-white text-[#5A6B7D] border border-[#EAE5D9] hover:bg-[#FAF8F4]'
            }`}
          >
            3. Unified Master Note
          </button>
        </div>
      </div>

      {/* Visual Transformation Canvas */}
      <div className="relative w-full max-w-5xl h-[480px] sm:h-[520px] flex items-center justify-center px-4">
        {/* ========================================================= */}
        {/* CARD 1: PDF SLIDES (Left Card) */}
        {/* ========================================================= */}
        <div
          style={{
            transform: 
              mergeState === 'separate'
                ? 'translate3d(-260px, -20px, 0px) rotate(-6deg) scale(1)'
                : mergeState === 'converging'
                ? 'translate3d(-90px, 10px, 0px) rotate(-2deg) scale(0.92)'
                : 'translate3d(0px, 0px, 0px) scale(0)',
            opacity: mergeState === 'unified' ? 0 : 1,
            transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="absolute w-64 sm:w-72 p-5 rounded-2xl bg-white border border-[#DDD6C3] shadow-desk pointer-events-none"
        >
          <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-[#EBF0F8] text-[#1B2A47] font-mono text-[11px] font-bold">
                PDF
              </span>
              <span className="font-mono text-xs font-bold text-[#121C30] truncate">
                Lecture_04.pdf
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#808D9F]">48 slides</span>
          </div>
          <div className="space-y-2 text-xs text-[#5A6B7D]">
            <div className="font-serif font-bold text-sm text-[#121C30]">
              Gradient Descent & Hessians
            </div>
            <p className="line-clamp-2 text-[11px] text-[#808D9F]">
              Partial derivatives over quadratic error surfaces with non-convex saddle points.
            </p>
            <div className="p-2 rounded-lg bg-[#FAF8F4] font-mono text-[10px] text-[#1B2A47]">
              ∇f(x) = J_F^T · e
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 2: DOCX TEXTBOOK (Center / Floating Card) */}
        {/* ========================================================= */}
        <div
          style={{
            transform: 
              mergeState === 'separate'
                ? 'translate3d(0px, 40px, 0px) rotate(1deg) scale(1)'
                : mergeState === 'converging'
                ? 'translate3d(0px, -15px, 10px) rotate(0deg) scale(0.95)'
                : 'translate3d(0px, 0px, 0px) scale(0)',
            opacity: mergeState === 'unified' ? 0 : 1,
            transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="absolute w-64 sm:w-72 p-5 rounded-2xl bg-white border border-[#DDD6C3] shadow-desk pointer-events-none z-10"
        >
          <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-[#EFF5F1] text-[#4A6B5D] font-mono text-[11px] font-bold">
                DOCX
              </span>
              <span className="font-mono text-xs font-bold text-[#121C30] truncate">
                Chapter_08.docx
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#808D9F]">14 pages</span>
          </div>
          <div className="space-y-2 text-xs text-[#5A6B7D]">
            <div className="font-serif font-bold text-sm text-[#121C30]">
              Theorem 8.2: Convergence
            </div>
            <p className="line-clamp-2 text-[11px] text-[#808D9F]">
              If the Lipschitz constant L satisfies 0 &lt; η &lt; 2/L, the trajectory converges exponentially.
            </p>
            <div className="p-2 rounded-lg bg-[#FAF8F4] font-mono text-[10px] text-[#4A6B5D]">
              ||x_(k+1) - x*|| ≤ ρ^k ||x_0 - x*||
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 3: PPTX LAB SLIDES (Right Card) */}
        {/* ========================================================= */}
        <div
          style={{
            transform: 
              mergeState === 'separate'
                ? 'translate3d(260px, -20px, 0px) rotate(6deg) scale(1)'
                : mergeState === 'converging'
                ? 'translate3d(90px, 10px, 0px) rotate(2deg) scale(0.92)'
                : 'translate3d(0px, 0px, 0px) scale(0)',
            opacity: mergeState === 'unified' ? 0 : 1,
            transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="absolute w-64 sm:w-72 p-5 rounded-2xl bg-white border border-[#DDD6C3] shadow-desk pointer-events-none"
        >
          <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-[#FAF1E6] text-[#C5A059] font-mono text-[11px] font-bold">
                PPTX
              </span>
              <span className="font-mono text-xs font-bold text-[#121C30] truncate">
                Lab_Manual.pptx
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#808D9F]">22 slides</span>
          </div>
          <div className="space-y-2 text-xs text-[#5A6B7D]">
            <div className="font-serif font-bold text-sm text-[#121C30]">
              Empirical Benchmarks
            </div>
            <p className="line-clamp-2 text-[11px] text-[#808D9F]">
              Hyperparameter learning rate grids over Adam vs AdaGrad on standard datasets.
            </p>
            <div className="p-2 rounded-lg bg-[#FAF8F4] font-mono text-[10px] text-[#C5A059]">
              η_opt = 0.001, β_1 = 0.9
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CARD 4: UNIFIED MOLESKINE MASTER NOTEBOOK (Center Masterpiece) */}
        {/* ========================================================= */}
        <div
          style={{
            transform: 
              mergeState === 'unified'
                ? 'translate3d(0px, 0px, 40px) scale(1)'
                : mergeState === 'converging'
                ? 'translate3d(0px, 0px, -20px) scale(0.7)'
                : 'translate3d(0px, 0px, -60px) scale(0.4)',
            opacity: mergeState === 'unified' ? 1 : mergeState === 'converging' ? 0.3 : 0,
            pointerEvents: mergeState === 'unified' ? 'auto' : 'none',
            transition: 'all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          className="relative w-full max-w-2xl p-7 sm:p-9 rounded-3xl bg-[#FCFAF6] border-2 border-[#1B2A47] shadow-journal-hover z-20 space-y-5"
        >
          {/* Leather Moleskine Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE5D9] pb-4 gap-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#1B2A47]">
              <Bookmark className="w-4 h-4 text-[#1B2A47]" />
              <span>STURDYNERDY UNIFIED SYNTHESIS</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-[#EFF5F1] text-[#4A6B5D] px-2.5 py-1 rounded-md border border-[#D0DFD6]">
                3 Ingested Sources Merged
              </span>
              <span className="text-[10px] font-mono bg-[#FAF8F2] text-[#1B2A47] px-2 py-1 rounded-md border border-[#EAE5D9]">
                Print-Ready
              </span>
            </div>
          </div>

          {/* Master Note Title */}
          <div>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C30]">
              Optimization Theory & Convergence Dynamics
            </h3>
            <p className="font-serif italic text-sm text-[#5A6B7D] mt-1">
              Cross-referenced from Lecture Slides, Chapter 8, and Empirical Lab protocols.
            </p>
          </div>

          {/* Core Master Formula Box */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE5D9] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="font-mono text-[10px] font-bold text-[#808D9F] uppercase">
                Unified Invariant Law
              </div>
              <div className="font-mono text-sm text-[#1B2A47] font-semibold">
                ||x_(k+1) - x*|| ≤ (1 - ημ)^k ||x_0 - x*||
              </div>
            </div>
            <span className="text-xs font-mono text-[#4A6B5D] bg-[#EFF5F1] px-3 py-1 rounded-lg border border-[#D0DFD6] self-start sm:self-auto">
              Guaranteed Bounds
            </span>
          </div>

          {/* Takeaways Ledger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="flex items-start gap-2 p-3 rounded-xl bg-white border border-[#EAE5D9]">
              <CheckCircle2 className="w-4 h-4 text-[#4A6B5D] shrink-0 mt-0.5" />
              <span className="text-xs text-[#243347] leading-relaxed">
                Reconciles textbook theoretical proofs with practical learning rates from lab slides.
              </span>
            </div>
            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A]">
              <Zap className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <span className="text-xs text-[#92400E] leading-relaxed">
                Identifies 3 common exam traps where students fail to verify Lipschitz bounds.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
