'use client';

import React, { useEffect, useState } from 'react';
import { 
  Loader2, 
  Check, 
  FileText, 
  Sparkles, 
  Cpu, 
  BookOpen,
  Layers,
  Compass
} from 'lucide-react';
import { OutputMode, UploadedStudyMaterial } from '@/lib/types';

interface ProcessingFlowModalProps {
  isOpen: boolean;
  materials: UploadedStudyMaterial[];
  mode: OutputMode;
  onComplete: () => void;
}

const STAGES = [
  {
    id: 1,
    title: 'Reading & Parsing Study Materials',
    description: 'Extracting clean text streams from uploaded PDF, DOCX, and PPTX files.',
  },
  {
    id: 2,
    title: 'Cross-Referencing Document Content',
    description: 'Analyzing unified corpus, headings, and conceptual dependencies.',
  },
  {
    id: 3,
    title: 'Extracting Key Concepts & Invariant Rules',
    description: 'Isolating formal definitions, mathematical formulas, and core takeaways.',
  },
  {
    id: 4,
    title: 'Structuring Academic Taxonomy',
    description: 'Building structured matrix, exam pitfalls, and syllabus units.',
  },
  {
    id: 5,
    title: 'Finalizing Print-Ready Document',
    description: 'Formatting LaTeX KaTeX equations and paginated print styles.',
  },
];

export function ProcessingFlowModal({
  isOpen,
  materials,
  mode,
  onComplete,
}: ProcessingFlowModalProps) {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStageIdx(0);
      setProgress(10);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 12 + 8);
        return Math.min(next, 98);
      });
    }, 450);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (progress < 25) setCurrentStageIdx(0);
    else if (progress < 50) setCurrentStageIdx(1);
    else if (progress < 72) setCurrentStageIdx(2);
    else if (progress < 92) setCurrentStageIdx(3);
    else setCurrentStageIdx(4);

    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [progress, isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121C30]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#FAF8F4] rounded-2xl border border-[#EAE5D9] shadow-desk-elevated max-w-lg w-full p-6 sm:p-8 space-y-6 overflow-hidden relative">
        {/* Subtle decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B2A47] via-[#4A6B5D] to-[#8C6D3F]" />

        {/* Header */}
        <div className="text-center space-y-1.5 pt-2">
          <div className="w-12 h-12 rounded-full bg-white border border-[#EAE5D9] flex items-center justify-center text-[#1B2A47] mx-auto shadow-2xs">
            <Sparkles className="w-5 h-5 text-[#4A6B5D] animate-pulse" />
          </div>
          <h3 className="font-heading font-bold text-xl text-[#121C30]">
            Synthesizing {mode === 'one_glance_summary' ? 'One-Glance Summary' : 'Revision Notes'}
          </h3>
          <p className="text-xs font-mono text-[#5A6B7D]">
            Processing {materials.length} uploaded files ({materials.map(m => m.name).join(', ')})
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#808D9F]">
            <span>Cognitive Synthesis Progress</span>
            <span className="font-bold text-[#1B2A47]">{progress}%</span>
          </div>
          <div className="w-full bg-[#EAE5D9] h-2 rounded-full overflow-hidden p-0.5">
            <div
              style={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-[#1B2A47] to-[#4A6B5D] h-full rounded-full transition-all duration-300 ease-out"
            />
          </div>
        </div>

        {/* Stages Checklist */}
        <div className="space-y-3 bg-white p-4 rounded-xl border border-[#EAE5D9] shadow-2xs">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIdx || progress >= 100;
            const isCurrent = idx === currentStageIdx && progress < 100;

            return (
              <div
                key={stage.id}
                className={`flex items-start gap-3 transition-opacity duration-300 ${
                  idx > currentStageIdx ? 'opacity-35' : 'opacity-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono transition-colors ${
                    isCompleted
                      ? 'bg-[#4A6B5D] text-white'
                      : isCurrent
                      ? 'bg-[#1B2A47] text-white'
                      : 'bg-[#EAE5D9] text-[#808D9F]'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    stage.id
                  )}
                </div>

                <div className="min-w-0">
                  <div
                    className={`font-heading text-xs font-semibold ${
                      isCurrent ? 'text-[#1B2A47]' : isCompleted ? 'text-[#121C30]' : 'text-[#808D9F]'
                    }`}
                  >
                    {stage.title}
                  </div>
                  <div className="text-[11px] font-sans text-[#5A6B7D] leading-snug">
                    {stage.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center font-mono text-[10px] text-[#808D9F]">
          Generating output strictly from your uploaded source material.
        </div>
      </div>
    </div>
  );
}
