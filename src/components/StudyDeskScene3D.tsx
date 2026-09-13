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
  CheckCircle2
} from 'lucide-react';

export function StudyDeskScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationPhase, setAnimationPhase] = useState<'orbit' | 'merge' | 'transformed'>('orbit');
  const [loopProgress, setLoopProgress] = useState(0);

  // 9-Second Loop: Orbit -> Merge -> Transformed Note -> Reset
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
  const tiltX = mousePos.y * -14;
  const tiltY = mousePos.x * 16;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[520px] rounded-3xl p-6 flex items-center justify-center select-none perspective-1000 overflow-hidden"
    >
      {/* 3D Root Stage with Cursor Parallax */}
      <div
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
          transition: 'transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="relative w-full max-w-[480px] h-[440px] preserve-3d flex items-center justify-center"
      >
        {/* Desk Mat (Physical Base) */}
        <div
          style={{
            transform: 'translateZ(-40px) rotateX(24deg)',
          }}
          className="absolute inset-x-2 bottom-4 h-[300px] rounded-2xl bg-gradient-to-b from-[#F3ECE0] to-[#E8DEC9] border border-[#DCD0B6] shadow-desk-elevated"
        >
          {/* Desk Mat Leather Stitching Line */}
          <div className="absolute inset-3 border border-dashed border-[#C9BC9F] rounded-xl opacity-60 pointer-events-none" />
          
          {/* Desk Wood Grain Texture Hint */}
          <div className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-widest text-[#9C8F73] font-bold">
            SturdyNerdy Study Desk
          </div>
        </div>

        {/* Stacked University Clothbound Books (Left Desk Side) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -10 - 150}px, ${mousePos.y * -8 + 70}px, 0px)`,
            transition: 'transform 0.25s ease-out',
          }}
          className="absolute group cursor-pointer"
        >
          {/* Bottom Book (Deep Navy Clothbound) */}
          <div className="w-36 h-9 rounded-sm bg-[#1B2A47] border border-[#101B2E] shadow-desk flex items-center px-2.5 justify-between transform -rotate-3 group-hover:-rotate-5 group-hover:-translate-y-1 transition-transform">
            <span className="font-serif text-[10px] text-[#C5A059] truncate font-bold tracking-tight">
              I. Dynamic Algorithms
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
          </div>

          {/* Top Book (Muted Sage Clothbound with Gold Foil) */}
          <div className="w-32 h-8 rounded-sm bg-[#4A6B5D] border border-[#344D42] shadow-desk flex items-center px-2.5 justify-between -mt-2 ml-2 transform rotate-1 group-hover:rotate-2 group-hover:-translate-y-2 transition-transform">
            <span className="font-serif text-[9px] text-[#FDF8EE] truncate font-medium tracking-tight">
              II. Statistical Learning
            </span>
            <div className="w-1 h-3 bg-[#C5A059]" />
          </div>
        </div>

        {/* Ceramic Coffee Mug (Right Desk Side) with Animated Steam */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -8 + 155}px, ${mousePos.y * -6 + 75}px, 15px)`,
            transition: 'transform 0.25s ease-out',
          }}
          className="absolute flex flex-col items-center pointer-events-none"
        >
          {/* Gentle Steam Vapor */}
          <div className="flex gap-1 mb-0.5 opacity-40">
            <span className="w-1 h-3 bg-[#8C6D3F] rounded-full animate-steam" />
            <span className="w-1 h-4 bg-[#8C6D3F] rounded-full animate-steam [animation-delay:0.4s]" />
          </div>

          {/* Ceramic Mug Body */}
          <div className="relative w-12 h-14 rounded-b-xl rounded-t-sm bg-[#FCFAF5] border border-[#E8E2D2] shadow-desk flex items-center justify-center">
            {/* Coffee Surface Ring */}
            <div className="absolute top-1.5 w-9 h-3 rounded-full bg-[#593D22] border border-[#422B15]" />
            {/* Ceramic Handle */}
            <div className="absolute -right-3.5 top-2.5 w-4 h-8 rounded-r-lg border-2 border-l-0 border-[#E8E2D2] bg-transparent" />
            <span className="font-serif text-[8px] text-[#8C6D3F] font-bold mt-4">SN</span>
          </div>
        </div>

        {/* Sticky Notes Pinned to Desk Mat */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * -6 - 80}px, ${mousePos.y * -5 + 130}px, 20px) rotate(-6deg)`,
            transition: 'transform 0.3s ease-out',
          }}
          className="absolute w-24 p-2 rounded-sm bg-[#FEF9C3] border border-[#FDE047] shadow-sticky cursor-default group hover:rotate-0 hover:scale-105 transition-all"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626]/20 mx-auto -mt-3.5 mb-1" />
          <div className="font-sans text-[8px] font-bold text-[#854D0E] leading-tight">
            Final Exam
          </div>
          <div className="text-[7.5px] font-sans text-[#713F12] leading-tight mt-0.5">
            Memorize Master Theorem cases!
          </div>
        </div>

        {/* The Laptop / Processing Hub (Centerpiece) */}
        <div
          style={{
            transform: `translate3d(${mousePos.x * 6}px, ${mousePos.y * 6 - 15}px, 10px) rotateX(16deg)`,
            transition: 'transform 0.22s ease-out',
          }}
          className="relative w-64 h-48 rounded-xl bg-[#1B2A47] border border-[#101B2E] shadow-journal p-2.5 flex flex-col justify-between"
        >
          {/* Laptop Screen Bezel */}
          <div className="w-full h-36 rounded-lg bg-[#0E1726] border border-[#2D3E56] p-2 flex flex-col justify-between overflow-hidden relative">
            {/* Screen Top Bar */}
            <div className="flex items-center justify-between border-b border-[#1E2D42] pb-1">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              </div>
              <span className="font-mono text-[7px] text-[#8595AB]">
                SturdyNerdy Study Engine
              </span>
            </div>

            {/* Screen Dynamic Output Preview */}
            <div className="flex-1 flex flex-col justify-center items-center text-center p-1.5">
              {animationPhase === 'orbit' && (
                <div className="space-y-1 animate-fadeIn">
                  <div className="flex items-center justify-center gap-1 text-[8px] font-mono text-[#8595AB]">
                    <Layers className="w-3 h-3 text-[#4A6B5D]" /> Ready for synthesis
                  </div>
                  <div className="font-serif text-[10px] text-[#EDF2F8] font-medium leading-tight">
                    Ingesting Multi-Source Notes
                  </div>
                  <div className="text-[7px] font-mono text-[#4A6B5D]">
                    PDF + DOCX + PPTX orbiting
                  </div>
                </div>
              )}

              {animationPhase === 'merge' && (
                <div className="space-y-1 animate-fadeIn">
                  <Sparkles className="w-4 h-4 text-[#C5A059] mx-auto animate-pulse" />
                  <div className="font-serif text-[10px] text-[#EDF2F8] font-bold">
                    Cross-Referencing Concepts...
                  </div>
                  <div className="w-28 h-1 bg-[#1E2D42] rounded-full mx-auto overflow-hidden">
                    <div className="w-3/4 h-full bg-[#C5A059] rounded-full animate-pulse" />
                  </div>
                </div>
              )}

              {animationPhase === 'transformed' && (
                <div className="space-y-1 animate-fadeIn">
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#4A6B5D]/20 border border-[#4A6B5D]/40 text-[#4A6B5D] text-[7px] font-mono">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Synthesized
                  </div>
                  <div className="font-serif text-[10px] text-[#EDF2F8] font-bold truncate max-w-[140px]">
                    One-Glance Exam Sheet
                  </div>
                  <div className="font-mono text-[7px] text-[#C5A059]">
                    T(n) = O(S × C) • 5 Takeaways
                  </div>
                </div>
              )}
            </div>

            {/* Screen Bottom Bar */}
            <div className="flex items-center justify-between text-[6.5px] font-mono text-[#60728B] pt-0.5 border-t border-[#1E2D42]">
              <span>UTF-8 Document</span>
              <span>100% Academic</span>
            </div>
          </div>

          {/* Laptop Trackpad & Palm Rest */}
          <div className="w-full h-5 rounded-b-md bg-[#253654] flex items-center justify-center">
            <div className="w-14 h-3 rounded-xs bg-[#1E2D42] border border-[#2D3E56]" />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Orbiting & Merging Document Cards (Signature 9s Animation) */}
        {/* ------------------------------------------------------------- */}

        {/* Document 1: PDF Card */}
        <div
          style={{
            transform: animationPhase === 'merge' || animationPhase === 'transformed'
              ? `translate3d(0px, -20px, 60px) scale(${animationPhase === 'transformed' ? 0 : 0.8})`
              : `translate3d(${Math.cos(loopProgress * Math.PI * 2) * 160 + mousePos.x * 20}px, ${Math.sin(loopProgress * Math.PI * 2) * 80 + mousePos.y * 15 - 90}px, 45px)`,
            opacity: animationPhase === 'transformed' ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          }}
          className="absolute p-3 rounded-xl bg-white border border-[#E8E2D2] shadow-journal w-40 flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EBF0F8] text-[#1B2A47] font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
            PDF
          </div>
          <div className="min-w-0">
            <div className="font-serif text-[10px] text-[#121C2B] font-bold truncate">
              Lecture_Theory.pdf
            </div>
            <div className="text-[8px] font-mono text-[#8595AB]">
              Syllabus & Theorems
            </div>
          </div>
        </div>

        {/* Document 2: DOCX Card */}
        <div
          style={{
            transform: animationPhase === 'merge' || animationPhase === 'transformed'
              ? `translate3d(0px, -20px, 60px) scale(${animationPhase === 'transformed' ? 0 : 0.8})`
              : `translate3d(${Math.cos(loopProgress * Math.PI * 2 + (2 * Math.PI) / 3) * 160 + mousePos.x * 20}px, ${Math.sin(loopProgress * Math.PI * 2 + (2 * Math.PI) / 3) * 80 + mousePos.y * 15 - 90}px, 45px)`,
            opacity: animationPhase === 'transformed' ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          }}
          className="absolute p-3 rounded-xl bg-white border border-[#CFDDD5] shadow-journal w-40 flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EFF5F1] text-[#4A6B5D] font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
            DOC
          </div>
          <div className="min-w-0">
            <div className="font-serif text-[10px] text-[#121C2B] font-bold truncate">
              Recitation_Proofs.docx
            </div>
            <div className="text-[8px] font-mono text-[#8595AB]">
              State Invariants
            </div>
          </div>
        </div>

        {/* Document 3: PPTX Card */}
        <div
          style={{
            transform: animationPhase === 'merge' || animationPhase === 'transformed'
              ? `translate3d(0px, -20px, 60px) scale(${animationPhase === 'transformed' ? 0 : 0.8})`
              : `translate3d(${Math.cos(loopProgress * Math.PI * 2 + (4 * Math.PI) / 3) * 160 + mousePos.x * 20}px, ${Math.sin(loopProgress * Math.PI * 2 + (4 * Math.PI) / 3) * 80 + mousePos.y * 15 - 90}px, 45px)`,
            opacity: animationPhase === 'transformed' ? 0 : 1,
            transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease',
          }}
          className="absolute p-3 rounded-xl bg-white border border-[#E9D8B4] shadow-journal w-40 flex items-center gap-2.5 pointer-events-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FDF8EE] text-[#8C6D3F] font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
            PPT
          </div>
          <div className="min-w-0">
            <div className="font-serif text-[10px] text-[#121C2B] font-bold truncate">
              Slide_Deck.pptx
            </div>
            <div className="text-[8px] font-mono text-[#8595AB]">
              Exam Traps & Graphs
            </div>
          </div>
        </div>

        {/* The Resulting Beautiful Note Page (Reveals after merging) */}
        {animationPhase === 'transformed' && (
          <div
            style={{
              transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 10 - 65}px, 90px)`,
              transition: 'transform 0.3s ease-out',
            }}
            className="absolute w-56 p-4 rounded-xl bg-[#FCFAF5] border border-[#C5A059] shadow-desk-elevated space-y-2 animate-fadeIn pointer-events-none"
          >
            {/* Brass Ribbon Marker */}
            <div className="flex items-center justify-between border-b border-[#E8E2D2] pb-1.5">
              <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#1B2A47]">
                Synthesized Study Sheet
              </span>
              <span className="text-[8px] font-mono text-[#4A6B5D] bg-[#EFF5F1] px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>

            <div className="font-serif font-bold text-xs text-[#121C2B]">
              Optimal Substructure & Recurrence
            </div>

            <div className="font-mono text-[8.5px] text-[#4A6B5D] bg-[#EFF5F1] p-1.5 rounded border border-[#CFDDD5]">
              DP(i, w) = max(DP(i-1, w), DP(i-1, w-w_i) + v_i)
            </div>

            <div className="space-y-1 text-[7.5px] font-sans text-[#455770] pt-1">
              <div className="flex items-center gap-1 text-[#1B2A47] font-medium">
                <Check className="w-2.5 h-2.5 text-[#4A6B5D]" /> 5 Core Takeaways Formatted
              </div>
              <div className="flex items-center gap-1 text-[#1B2A47] font-medium">
                <Check className="w-2.5 h-2.5 text-[#4A6B5D]" /> Print-Ready PDF Available
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
