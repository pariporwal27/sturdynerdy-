'use client';

import React, { useEffect, useState } from 'react';
import { 
  Loader2, 
  Check, 
  Sparkles, 
  BookOpen,
  Layers,
  FileSpreadsheet,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { OutputMode, UploadedStudyMaterial } from '@/lib/types';

interface ProcessingFlowModalProps {
  isOpen: boolean;
  materials: UploadedStudyMaterial[];
  mode: OutputMode;
  onComplete: () => void;
}

const PIPELINE_STEPS = [
  { id: 1, label: 'Reading Documents', desc: 'Parsing text and mathematical structures from files' },
  { id: 2, label: 'Extracting Concepts', desc: 'Isolating fundamental claims, theorems, and definitions' },
  { id: 3, label: 'Identifying Topics', desc: 'Cross-referencing terminology across multi-source corpus' },
  { id: 4, label: 'Building Structure', desc: 'Organizing syllabus units, comparison tables, and edge cases' },
  { id: 5, label: 'Writing Notes', desc: 'Typesetting LaTeX equations and drafting executive takeaways' },
  { id: 6, label: 'Finalizing Output', desc: 'Compiling publication-ready journal format & PDF pagination' },
];

export function ProcessingFlowModal({
  isOpen,
  materials,
  mode,
  onComplete,
}: ProcessingFlowModalProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(10);
  const [transformStage, setTransformStage] = useState<'converge' | 'merged' | 'opened'>('converge');

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIdx(0);
      setProgress(10);
      setTransformStage('converge');
      return;
    }

    // Progress counter
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 98) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8 + 5);
      });
    }, 380);

    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // Step index mapped to 6 steps
    const step = Math.min(5, Math.floor((progress / 100) * 6));
    setCurrentStepIdx(step);

    if (progress < 45) {
      setTransformStage('converge');
    } else if (progress < 85) {
      setTransformStage('merged');
    } else {
      setTransformStage('opened');
    }

    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [progress, isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1320]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF8F3] rounded-3xl border border-[#E8E2D2] shadow-desk-elevated max-w-lg w-full p-6 sm:p-8 space-y-6 overflow-hidden relative">
        {/* Leather Notebook Binding Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1B2A47] via-[#4A6B5D] to-[#C5A059]" />

        {/* Cinematic Notes Generation Visual Transformation */}
        <div className="relative h-28 rounded-2xl bg-[#F5F1E6] border border-[#E8E2D2] flex items-center justify-center overflow-hidden">
          {/* Subtle notebook ruled background inside stage */}
          <div className="absolute inset-0 notebook-ruled opacity-20" />

          {transformStage === 'converge' && (
            <div className="flex items-center gap-3 animate-fadeIn">
              <div className="w-10 h-12 rounded-md bg-white border border-[#E8E2D2] shadow-desk flex items-center justify-center font-mono text-[9px] font-bold text-[#1B2A47] transform -rotate-6 animate-pulse">
                PDF
              </div>
              <div className="w-10 h-12 rounded-md bg-white border border-[#CFDDD5] shadow-desk flex items-center justify-center font-mono text-[9px] font-bold text-[#4A6B5D] transform translate-y-1">
                DOC
              </div>
              <div className="w-10 h-12 rounded-md bg-white border border-[#E9D8B4] shadow-desk flex items-center justify-center font-mono text-[9px] font-bold text-[#8C6D3F] transform rotate-6 animate-pulse">
                PPT
              </div>
            </div>
          )}

          {transformStage === 'merged' && (
            <div className="flex flex-col items-center space-y-1 animate-fadeIn">
              <div className="w-14 h-16 rounded-md bg-[#1B2A47] border border-[#C5A059] shadow-journal flex items-center justify-center text-[#C5A059] transform scale-105">
                <BookOpen className="w-6 h-6 animate-pulse" />
              </div>
              <span className="font-serif text-[10px] text-[#1B2A47] font-bold">
                Synthesizing Unified Journal...
              </span>
            </div>
          )}

          {transformStage === 'opened' && (
            <div className="flex items-center gap-1.5 bg-white p-2.5 rounded-xl border border-[#C5A059] shadow-desk animate-fadeIn">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <div className="text-left">
                <div className="font-serif font-bold text-xs text-[#121C2B]">
                  {mode === 'one_glance_summary' ? 'One-Glance Exam Sheet' : 'Comprehensive Revision Notes'}
                </div>
                <div className="text-[9px] font-mono text-[#4A6B5D]">
                  Structured & Ready to Study
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Header Title */}
        <div className="text-center space-y-1">
          <h3 className="font-serif font-bold text-xl text-[#121C2B]">
            SturdyNerdy Study Desk
          </h3>
          <p className="text-xs font-mono text-[#60728B]">
            Synthesizing {materials.length} uploaded files into structured notes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#60728B]">
            <span>Synthesis Pipeline</span>
            <span className="font-bold text-[#1B2A47]">{progress}%</span>
          </div>
          <div className="w-full bg-[#E8E2D2] h-2 rounded-full overflow-hidden p-0.5">
            <div
              style={{ width: `${progress}%` }}
              className="bg-gradient-to-r from-[#1B2A47] to-[#4A6B5D] h-full rounded-full transition-all duration-300 ease-out"
            />
          </div>
        </div>

        {/* The 6-Step Pipeline */}
        <div className="space-y-2.5 bg-white p-4 rounded-2xl border border-[#E8E2D2] shadow-desk">
          {PIPELINE_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIdx || progress >= 100;
            const isCurrent = idx === currentStepIdx && progress < 100;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 transition-opacity duration-300 ${
                  idx > currentStepIdx ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono transition-colors ${
                    isDone
                      ? 'bg-[#4A6B5D] text-white'
                      : isCurrent
                      ? 'bg-[#1B2A47] text-white'
                      : 'bg-[#E8E2D2] text-[#8595AB]'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-3 h-3" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    step.id
                  )}
                </div>

                <div className="min-w-0 flex-1 flex items-baseline justify-between">
                  <div
                    className={`font-serif text-xs font-bold ${
                      isCurrent ? 'text-[#1B2A47]' : isDone ? 'text-[#121C2B]' : 'text-[#8595AB]'
                    }`}
                  >
                    {step.label}
                  </div>
                  <span className="text-[10px] font-mono text-[#8595AB] truncate ml-2">
                    {step.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
