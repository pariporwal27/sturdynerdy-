'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Sparkles, 
  Check, 
  BookOpen, 
  Coffee, 
  Layers,
  ArrowRight,
  Laptop,
  CheckCircle2,
  Bookmark,
  Sigma
} from 'lucide-react';

export function StudyDeskScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationPhase, setAnimationPhase] = useState<'orbit' | 'merge' | 'transformed'>('orbit');
  const [loopProgress, setLoopProgress] = useState(0);

  // 9-Second Continuous Loop: Orbit -> Merge -> Transformed Note -> Reset
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) % 9000;
      setLoopProgress(elapsed / 9000);

      if (elapsed < 4200) {
        setAnimationPhase('orbit');
      } else if (elapsed < 6200) {
        setAnimationPhase('merge');
      } else {
        setAnimationPhase('transformed');
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Cursor Parallax Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Subtle Parallax Transforms
  const tiltX = mousePos.y * -12;
  const tiltY = mousePos.x * 14;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[640px] sm:h-[700px] lg:h-[740px] rounded-3xl p-6 flex items-center justify-center select-none perspective-1000 overflow-hidden"
    >
      {/* 3D Root Stage with Cursor Parallax (Enlarged by 45%) */}
      <div
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative w-full max-w-[680px] h-[600px] preserve-3d flex items-center justify-center"
      >
        {/* Desk Mat (Physical Base) */}
        <div
          style={{
            transform: 'translateZ(-40px) rotateX(24deg)',
          }}
          className="absolute inset-x-0 bottom-4 h-[420px] rounded-3xl bg-gradient-to-b from-[#F4ECE1] to-[#E5DAC4] border border-[#D9CDB2] shadow-desk-elevated"
        >
          {/* Desk Mat Leather Stitching Line */}
          <div className="absolute inset-4 border border-dashed border-[#C5B79A] rounded-2xl opacity-60 pointer-events-none" />
          
          {/* Desk Wood Grain Texture Hint */}
          <div className="absolute bottom-4 right-6 font-mono text-[10px] uppercase tracking-widest text-[#9C8F73] font-bold">
            SturdyNerdy Study Desk · Cambridge Spec
          </div>
        </div>

        {/* Stacked University Clothbound Books (Left Desk Side) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -12 - 210}px, ${mousePos.y * -10 + 100}px, 0px)`,
            transition: 'transform 0.25s ease-out',
          }}
          className="absolute group cursor-pointer"
        >
          {/* Bottom Book (Deep Navy Clothbound) */}
          <div className="w-52 h-12 rounded-sm bg-[#1B2A47] border border-[#101B2E] shadow-desk flex items-center px-4 justify-between transform -rotate-3 group-hover:-rotate-5 group-hover:-translate-y-1 transition-transform">
            <span className="font-serif text-xs text-[#C5A059] truncate font-bold tracking-tight">
              I. Dynamic Algorithms
            </span>
            <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
          </div>

          {/* Top Book (Muted Sage Clothbound with Gold Foil) */}
          <div className="w-48 h-11 rounded-sm bg-[#4A6B5D] border border-[#344D42] shadow-desk flex items-center px-4 justify-between -mt-2.5 ml-3 transform rotate-1 group-hover:rotate-2 group-hover:-translate-y-2 transition-transform">
            <span className="font-serif text-[11px] text-[#FDF8EE] truncate font-medium tracking-tight">
              II. Statistical Learning
            </span>
            <div className="w-1.5 h-4 bg-[#C5A059]" />
          </div>
        </div>

        {/* Ceramic Coffee Mug (Right Desk Side) with Rising Steam */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -10 + 220}px, ${mousePos.y * -8 + 110}px, 20px)`,
            transition: 'transform 0.25s ease-out',
          }}
          className="absolute flex flex-col items-center pointer-events-none"
        >
          {/* Gentle Steam Vapor */}
          <div className="flex gap-1.5 mb-1 opacity-50">
            <span className="w-1 h-4 bg-[#8C6D3F] rounded-full animate-steam" />
            <span className="w-1.5 h-5 bg-[#8C6D3F] rounded-full animate-steam [animation-delay:0.4s]" />
            <span className="w-1 h-3.5 bg-[#8C6D3F] rounded-full animate-steam [animation-delay:0.8s]" />
          </div>

          {/* Ceramic Mug Body */}
          <div className="relative w-16 h-18 rounded-b-2xl rounded-t-sm bg-[#FCFAF5] border border-[#E8E2D2] shadow-desk flex items-center justify-center">
            {/* Coffee Surface Ring */}
            <div className="absolute top-2 w-12 h-4 rounded-full bg-[#593D22] border border-[#422B15]" />
            {/* Ceramic Handle */}
            <div className="absolute -right-4.5 top-3 w-5 h-10 rounded-r-xl border-2 border-l-0 border-[#E8E2D2] bg-transparent" />
            <span className="font-serif text-[10px] text-[#8C6D3F] font-bold mt-5">SN</span>
          </div>
        </div>

        {/* Sticky Notes Pinned to Desk Mat */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -8 - 110}px, ${mousePos.y * -6 + 180}px, 25px) rotate(-6deg)`,
            transition: 'transform 0.3s ease-out',
          }}
          className="absolute w-32 p-3 rounded-sm bg-[#FEF9C3] border border-[#FDE047] shadow-sticky cursor-default group hover:rotate-0 hover:scale-105 transition-all"
        >
          <div className="w-3 h-3 rounded-full bg-[#DC2626]/20 mx-auto -mt-4 mb-1.5" />
          <div className="font-sans text-[10px] font-bold text-[#854D0E] leading-tight">
            Final Exam Trap
          </div>
          <div className="text-[9px] font-sans text-[#713F12] leading-tight mt-1">
            Sign reverse at Dirichlet boundaries!
          </div>
        </div>

        {/* The Laptop / Processing Hub (Centerpiece - Scaled +40%) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 8 - 20}px, 15px) rotateX(16deg)`,
            transition: 'transform 0.22s ease-out',
          }}
          className="relative w-80 sm:w-[350px] h-60 rounded-2xl bg-[#1B2A47] border border-[#101B2E] shadow-journal p-3 flex flex-col justify-between"
        >
          {/* Laptop Screen Bezel */}
          <div className="w-full h-44 rounded-xl bg-[#0E1726] border border-[#2D3E56] p-3 flex flex-col justify-between overflow-hidden relative">
            {/* Screen Top Bar */}
            <div className="flex items-center justify-between border-b border-[#1E2D42] pb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
              </div>
              <span className="font-mono text-[9px] text-[#8595AB] font-medium tracking-wide">
                SturdyNerdy Academic Engine
              </span>
            </div>

            {/* Screen Dynamic Output Preview */}
            <div className="flex-1 flex flex-col justify-center items-center text-center p-2">
              {animationPhase === 'orbit' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#8595AB]">
                    <Layers className="w-3.5 h-3.5 text-[#4A6B5D]" /> Ready for synthesis
                  </div>
                  <div className="font-serif text-sm text-[#EDF2F8] font-medium leading-tight">
                    Ingesting Multi-Source Notes
                  </div>
                  <div className="text-[9px] font-mono text-[#4A6B5D]">
                    PDF + DOCX + PPTX orbiting
                  </div>
                </div>
              )}

              {animationPhase === 'merge' && (
                <div className="space-y-2 animate-fadeIn">
                  <Sparkles className="w-5 h-5 text-[#C5A059] mx-auto animate-pulse" />
                  <div className="font-serif text-xs text-[#EDF2F8] font-bold">
                    Cross-Referencing Invariants...
                  </div>
                  <div className="w-36 h-1.5 bg-[#1E2D42] rounded-full mx-auto overflow-hidden">
                    <div className="w-3/4 h-full bg-[#C5A059] rounded-full animate-pulse" />
                  </div>
                </div>
              )}

              {animationPhase === 'transformed' && (
                <div className="space-y-1.5 animate-fadeIn">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#4A6B5D]/20 border border-[#4A6B5D]/40 text-[#4A6B5D] text-[9px] font-mono">
                    <CheckCircle2 className="w-3 h-3" /> Synthesized
                  </div>
                  <div className="font-serif text-xs text-[#EDF2F8] font-bold truncate max-w-[200px]">
                    One-Glance Exam Sheet
                  </div>
                  <div className="font-mono text-[9px] text-[#C5A059]">
                    T(n) = O(S × C) · 5 Key Laws
                  </div>
                </div>
              )}
            </div>

            {/* Screen Bottom Bar */}
            <div className="flex items-center justify-between text-[8px] font-mono text-[#60728B] pt-1 border-t border-[#1E2D42]">
              <span>UTF-8 Ingestion</span>
              <span>100% LaTeX Compliant</span>
            </div>
          </div>

          {/* Laptop Trackpad & Palm Rest */}
          <div className="w-full h-7 rounded-b-lg bg-[#253654] flex items-center justify-center">
            <div className="w-18 h-4 rounded-xs bg-[#1E2D42] border border-[#2D3E56]" />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Orbiting & Merging Document Cards (Signature 9s Animation) */}
        {/* ------------------------------------------------------------- */}

        {/* Document 1: PDF Card */}
        <div
          style={{
            transform: animationPhase === 'merge' || animationPhase === 'transformed'
              ? `translate3d(0px, -30px, 70px) scale(${animationPhase === 'transformed' ? 0 : 0.8})`
              : `translate3d(${Math.cos(loopProgress * Math.PI * 2) * 220 + mousePos.x * 24}px, ${Math.sin(loopProgress * Math.PI * 2) * 110 + mousePos.y * 18 - 110}px, 55px)`,
            opacity: animationPhase === 'transformed' ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          }}
          className="absolute p-3.5 rounded-2xl bg-white border border-[#E8E2D2] shadow-journal w-48 flex items-center gap-3 pointer-events-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#EBF0F8] text-[#1B2A47] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
            PDF
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[11px] font-bold text-[#121C30] truncate">
              Lecture-04.pdf
            </div>
            <div className="text-[9px] font-mono text-[#808D9F]">
              42 slides · 6.2k words
            </div>
          </div>
        </div>

        {/* Document 2: DOCX Card */}
        <div
          style={{
            transform: animationPhase === 'merge' || animationPhase === 'transformed'
              ? `translate3d(0px, -30px, 70px) scale(${animationPhase === 'transformed' ? 0 : 0.8})`
              : `translate3d(${Math.cos(loopProgress * Math.PI * 2 + (Math.PI * 2) / 3) * 220 + mousePos.x * 24}px, ${Math.sin(loopProgress * Math.PI * 2 + (Math.PI * 2) / 3) * 110 + mousePos.y * 18 - 110}px, 55px)`,
            opacity: animationPhase === 'transformed' ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          }}
          className="absolute p-3.5 rounded-2xl bg-white border border-[#E8E2D2] shadow-journal w-48 flex items-center gap-3 pointer-events-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#EFF5F1] text-[#4A6B5D] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
            DOCX
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[11px] font-bold text-[#121C30] truncate">
              Textbook-Ch7.docx
            </div>
            <div className="text-[9px] font-mono text-[#808D9F]">
              Chapter summary
            </div>
          </div>
        </div>

        {/* Document 3: PPTX Card */}
        <div
          style={{
            transform: animationPhase === 'merge' || animationPhase === 'transformed'
              ? `translate3d(0px, -30px, 70px) scale(${animationPhase === 'transformed' ? 0 : 0.8})`
              : `translate3d(${Math.cos(loopProgress * Math.PI * 2 + (Math.PI * 4) / 3) * 220 + mousePos.x * 24}px, ${Math.sin(loopProgress * Math.PI * 2 + (Math.PI * 4) / 3) * 110 + mousePos.y * 18 - 110}px, 55px)`,
            opacity: animationPhase === 'transformed' ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          }}
          className="absolute p-3.5 rounded-2xl bg-white border border-[#E8E2D2] shadow-journal w-48 flex items-center gap-3 pointer-events-none"
        >
          <div className="w-9 h-9 rounded-xl bg-[#FAF1E6] text-[#C5A059] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
            PPTX
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-mono text-[11px] font-bold text-[#121C30] truncate">
              Lab-Protocol.pptx
            </div>
            <div className="text-[9px] font-mono text-[#808D9F]">
              Experimental steps
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* The Merged / Transformed Structured Note Page (Reveals on Phase 3) */}
        {/* ------------------------------------------------------------- */}
        <div
          style={{
            transform: animationPhase === 'transformed'
              ? `translate3d(0px, -40px, 90px) scale(1) rotateX(4deg)`
              : `translate3d(0px, -20px, 20px) scale(0.6)`,
            opacity: animationPhase === 'transformed' ? 1 : 0,
            pointerEvents: animationPhase === 'transformed' ? 'auto' : 'none',
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.35s ease',
          }}
          className="absolute w-[320px] sm:w-[350px] p-5 rounded-2xl bg-[#FCFAF6] border-2 border-[#1B2A47] shadow-journal-hover z-30"
        >
          {/* Note Spine Tag */}
          <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-2 mb-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#1B2A47]">
              <Bookmark className="w-3.5 h-3.5 text-[#1B2A47]" />
              <span>STURDYNERDY JOURNAL</span>
            </div>
            <span className="text-[9px] font-mono bg-[#EFF5F1] text-[#4A6B5D] px-2 py-0.5 rounded border border-[#D0DFD6]">
              Synthesized
            </span>
          </div>

          <div className="font-serif text-sm font-bold text-[#121C30] leading-snug">
            Dynamic Invariants & Convergence
          </div>

          <div className="my-2 p-2.5 rounded-xl bg-white border border-[#EAE5D9] font-mono text-[10px] text-[#1B2A47] flex items-center justify-between">
            <span className="font-serif italic font-bold">{"∑ x_i ≤ C (Convergence Bound)"}</span>
            <span className="text-[8px] text-[#808D9F]">Verified Law</span>
          </div>

          <div className="space-y-1 text-[9px] font-mono text-[#5A6B7D]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
              <span>Executive Thesis synthesized</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
              <span>4 Critical exam pitfalls highlighted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
