'use client';

import React from 'react';
import { UploadCloud, Cpu, FileCheck2, BookOpen } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: UploadCloud,
    title: 'Upload Your Files',
    desc: 'Drop your PDF, DOCX, or PPTX lecture materials into the tray.',
    color: 'bg-[#EBF0F8] text-[#1B2A47]',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Text Extracted',
    desc: 'Real text, pages, and characters are read directly from every file.',
    color: 'bg-[#EFF5F1] text-[#4A6B5D]',
  },
  {
    num: '03',
    icon: FileCheck2,
    title: 'Gemini Analyses',
    desc: 'Extracted content is sent to Gemini with a student-friendly prompt.',
    color: 'bg-[#FAF1E6] text-[#C5A059]',
  },
  {
    num: '04',
    icon: BookOpen,
    title: 'Notes Generated',
    desc: 'Receive clean revision notes or a quick summary. Export as PDF.',
    color: 'bg-[#F4F1EA] text-[#1B2A47]',
  },
];

export function HowItWorksTimeline() {
  return (
    <section id="how-it-works" className="py-20 lg:py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
        <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[#121C30] tracking-tight">
          How It Works
        </h2>
        <p className="text-base sm:text-lg text-[#5A6B7D] font-serif max-w-xl mx-auto">
          Four steps from raw files to exam-ready notes.
        </p>
      </div>

      {/* 4 horizontal cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.num}
              className="bg-white border border-[#EAE5D9] rounded-2xl p-6 shadow-desk flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[#C5C2B8]">{s.num}</span>
              </div>
              <div>
                <div className="font-heading font-bold text-lg text-[#121C2B] mb-1">
                  {s.title}
                </div>
                <p className="text-sm text-[#5A6B7D] font-serif leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
