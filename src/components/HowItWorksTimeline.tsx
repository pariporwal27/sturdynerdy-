'use client';

import React from 'react';
import { 
  UploadCloud, 
  Cpu, 
  Layers, 
  FileCheck2, 
  Sparkles, 
  ArrowDown,
  CheckCircle2
} from 'lucide-react';

const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Upload Raw Materials',
    subtitle: 'Drop scattered files into the physical desk tray',
    description: 'Feed in messy lecture slides, dense 50-page textbook PDF chapters, docx assignment rubrics, or pptx seminar presentations. SturdyNerdy ingests every formula, definition, and heading into a unified memory context.',
    badge: 'Multi-Source Parsing',
    icon: UploadCloud,
    accent: 'bg-[#EBF0F8] text-[#1B2A47]',
  },
  {
    step: '02',
    title: 'Analyze & Extract Invariants',
    subtitle: 'Deep semantic cross-referencing',
    description: 'The academic engine parses all materials simultaneously. It detects identical theorems expressed under different naming conventions, weeds out conversational slide clutter, and locates true underlying course principles.',
    badge: 'Zero Hallucination',
    icon: Cpu,
    accent: 'bg-[#EFF5F1] text-[#4A6B5D]',
  },
  {
    step: '03',
    title: 'Build Mathematical Architecture',
    subtitle: 'Hierarchical unit structures & formula sheets',
    description: 'Information is transformed into an orderly syllabus: core formal definitions with KaTeX LaTeX formulas, step-by-step derivations, comparative matrix tables, and high-frequency exam traps.',
    badge: 'Formal LaTeX Compliant',
    icon: Layers,
    accent: 'bg-[#FAF1E6] text-[#C5A059]',
  },
  {
    step: '04',
    title: 'Generate Print-Ready Notes',
    subtitle: 'One-Glance Summaries or Full Revision Notebooks',
    description: 'Receive an authentic digital journal with interactive tabs: Summary Sheet, Full Revision, Formula Index, and Exam Traps. Review on your laptop or export to a clean print-ready PDF with a single click.',
    badge: '1-Click Exportable',
    icon: FileCheck2,
    accent: 'bg-[#F4F1EA] text-[#1B2A47]',
  },
];

export function HowItWorksTimeline() {
  return (
    <section className="relative py-28 lg:py-36 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Section Header */}
      <div className="text-center space-y-4 mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#EAE5D9] text-xs font-mono text-[#5A6B7D] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#4A6B5D]" />
          <span>Section 02 · The Architecture</span>
        </div>

        <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#121C30] tracking-tight leading-[1.1]">
          How lecture chaos becomes <br />
          structured mastery.
        </h2>

        <p className="text-lg sm:text-xl text-[#5A6B7D] font-serif leading-relaxed max-w-2xl mx-auto">
          A disciplined, four-stage transformation pipeline designed to replace hours of manual note-taking with deep conceptual clarity.
        </p>
      </div>

      {/* Large Vertical Timeline */}
      <div className="relative">
        {/* Central Connecting Vertical Line */}
        <div className="absolute top-8 bottom-8 left-6 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#1B2A47]/30 via-[#C5A059]/40 to-[#4A6B5D]/30" />

        <div className="space-y-16 sm:space-y-24">
          {TIMELINE_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={item.step}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-8 sm:gap-16`}
              >
                {/* Central Milestone Badge */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-white border-2 border-[#1B2A47] shadow-desk flex items-center justify-center font-mono font-bold text-sm text-[#1B2A47] z-10">
                  {item.step}
                </div>

                {/* Content Card (Left or Right depending on alternating index) */}
                <div className="pl-16 sm:pl-0 sm:w-1/2">
                  <div className={`p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE5D9] shadow-desk hover:shadow-desk-elevated transition-all space-y-4 ${
                    isEven ? 'sm:mr-8' : 'sm:ml-8'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#FAF8F2] border border-[#EAE5D9] text-[#5A6B7D] font-medium">
                        {item.badge}
                      </span>
                      <div className={`w-10 h-10 rounded-xl ${item.accent} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C30]">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-[#808D9F]">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-base sm:text-lg text-[#47586E] font-serif leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Empty Spacer on other side for balanced desktop layout */}
                <div className="hidden sm:block sm:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
