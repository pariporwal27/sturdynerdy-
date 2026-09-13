'use client';

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  FileText, 
  Cpu, 
  Check, 
  BookOpen, 
  Layers,
  Terminal
} from 'lucide-react';
import { OutputMode, UploadedStudyMaterial } from '@/lib/types';

interface ProcessingFlowModalProps {
  isOpen: boolean;
  materials: UploadedStudyMaterial[];
  mode: OutputMode;
  isApiDone: boolean;
  apiError: string | null;
  onComplete: () => void;
  onDismissError: () => void;
}

interface LogEntry {
  step: number;
  label: string;
  detail: string;
  status: 'pending' | 'active' | 'done';
}

export function ProcessingFlowModal({
  isOpen,
  materials,
  mode,
  isApiDone,
  apiError,
  onComplete,
  onDismissError,
}: ProcessingFlowModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const totalChars = materials.reduce((sum, m) => sum + (m.charCount || 0), 0);
  const totalPages = materials.reduce((sum, m) => sum + (m.pageCount || 1), 0);

  // Debugging steps required by user
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      step: 1,
      label: 'File uploaded',
      detail: `${materials.length} file(s) staged into memory`,
      status: 'pending',
    },
    {
      step: 2,
      label: 'Text extracted',
      detail: `${totalChars.toLocaleString()} characters extracted across ${totalPages} pages/slides`,
      status: 'pending',
    },
    {
      step: 3,
      label: 'Gemini request sent',
      detail: `Sending ${mode === 'quick_summary' ? 'Quick Summary' : 'Revision Notes'} prompt to Gemini model`,
      status: 'pending',
    },
    {
      step: 4,
      label: 'Gemini response received',
      detail: 'Synthesizing response and validating JSON schema',
      status: 'pending',
    },
    {
      step: 5,
      label: 'Notes generated',
      detail: 'Formatting student revision sheet with LaTeX math',
      status: 'pending',
    },
  ]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(1);
      return;
    }

    // Step 1: File uploaded (immediate)
    setLogs((prev) =>
      prev.map((l) => (l.step === 1 ? { ...l, status: 'done' } : l.step === 2 ? { ...l, status: 'active' } : l))
    );

    // Step 2: Text extracted (at 400ms)
    const t1 = setTimeout(() => {
      setLogs((prev) =>
        prev.map((l) =>
          l.step <= 2 ? { ...l, status: 'done' } : l.step === 3 ? { ...l, status: 'active' } : l
        )
      );
      setCurrentStep(3);
    }, 500);

    return () => clearTimeout(t1);
  }, [isOpen]);

  // When API response arrives
  useEffect(() => {
    if (!isOpen) return;

    if (isApiDone && !apiError) {
      // Mark steps 3, 4, 5 as done
      setLogs((prev) =>
        prev.map((l) =>
          l.step <= 4 ? { ...l, status: 'done' } : { ...l, status: 'active' }
        )
      );
      setCurrentStep(4);

      const t2 = setTimeout(() => {
        setLogs((prev) => prev.map((l) => ({ ...l, status: 'done' })));
        setCurrentStep(5);

        const t3 = setTimeout(() => {
          onComplete();
        }, 600);
        return () => clearTimeout(t3);
      }, 400);

      return () => clearTimeout(t2);
    }
  }, [isApiDone, apiError, isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1320]/65 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#E8E2D2] shadow-desk-elevated max-w-lg w-full p-6 sm:p-8 space-y-6 overflow-hidden relative">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1B2A47]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#EAE5D9] pb-4">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4A6B5D] animate-pulse" />
              <h3 className="font-heading font-bold text-xl text-[#121C2B]">
                Generating Study Notes
              </h3>
            </div>
            <p className="font-mono text-xs text-[#8595AB]">
              Processing actual uploaded lecture content
            </p>
          </div>

          <span className="text-xs font-mono font-medium px-3 py-1 rounded-full bg-[#FAF8F3] border border-[#EAE5D9] text-[#1B2A47]">
            {mode === 'quick_summary' ? 'Mode A: Summary' : 'Mode B: Revision'}
          </span>
        </div>

        {/* If an error occurs, display it clearly */}
        {apiError ? (
          <div className="p-5 bg-red-50 border border-red-200 rounded-2xl space-y-3 animate-fadeIn">
            <div className="font-mono text-xs font-bold text-red-700 uppercase flex items-center gap-2">
              <span>Generation Error</span>
            </div>
            <p className="text-xs font-serif text-red-900 leading-relaxed">
              {apiError}
            </p>
            <button
              onClick={onDismissError}
              className="px-4 py-2 rounded-xl bg-red-700 text-white font-mono text-xs font-semibold hover:bg-red-800 transition-colors"
            >
              Close & Return to Tray
            </button>
          </div>
        ) : (
          /* Real Activity Debugging Log (User Requirement) */
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#455770]">
              <Terminal className="w-3.5 h-3.5 text-[#1B2A47]" />
              <span>Live Generation Pipeline</span>
            </div>

            <div className="space-y-2.5 bg-[#FAF8F3] border border-[#EAE5D9] rounded-2xl p-4">
              {logs.map((log) => (
                <div
                  key={log.step}
                  className={`flex items-start gap-3 text-xs transition-opacity duration-300 ${
                    log.status === 'pending'
                      ? 'opacity-40'
                      : log.status === 'active'
                      ? 'opacity-100 font-semibold'
                      : 'opacity-90'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {log.status === 'done' ? (
                      <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
                    ) : log.status === 'active' ? (
                      <Loader2 className="w-4 h-4 text-[#1B2A47] animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#CBD5E1] bg-white" />
                    )}
                  </div>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="font-mono text-xs font-bold text-[#121C2B]">
                      {log.status === 'done' && '✓ '}
                      {log.label}
                    </div>
                    <div className="text-[11px] font-sans text-[#64748B] truncate">
                      {log.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Extracted Stats Snapshot */}
            <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-[#8595AB] px-1">
              <span>{materials.length} file(s) in payload</span>
              <span>•</span>
              <span>{totalPages} page(s)</span>
              <span>•</span>
              <span>{totalChars.toLocaleString()} characters</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
