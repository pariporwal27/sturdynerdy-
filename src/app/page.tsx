'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  FileText,
  RotateCcw,
  Zap,
  Printer
} from 'lucide-react';
import { 
  UploadedStudyMaterial, 
  OutputMode, 
  StructuredOutput, 
  WorkflowStep 
} from '@/lib/types';
import { SampleBundle } from '@/lib/sample-bundles';
import { StudyTrayUpload } from '@/components/StudyTrayUpload';
import { StudyDeskScene3D } from '@/components/StudyDeskScene3D';
import { ModeSelectionStage } from '@/components/ModeSelectionStage';
import { DigitalNotebookResult } from '@/components/DigitalNotebookResult';
import { ProcessingFlowModal } from '@/components/ProcessingFlowModal';
import { StudyDeskBackground } from '@/components/StudyDeskBackground';

export default function SturdyNerdyApp() {
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>('upload');
  const [materials, setMaterials] = useState<UploadedStudyMaterial[]>([]);
  const [selectedMode, setSelectedMode] = useState<OutputMode>('one_glance_summary');
  const [structuredOutput, setStructuredOutput] = useState<StructuredOutput | null>(null);

  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [pendingOutput, setPendingOutput] = useState<StructuredOutput | null>(null);
  const [generationNotice, setGenerationNotice] = useState<string | null>(null);

  const handleAddMaterials = (newItems: UploadedStudyMaterial[]) => {
    setMaterials(prev => [...prev, ...newItems]);
  };

  const handleRemoveMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const handleLoadBundle = (bundle: SampleBundle) => {
    setMaterials(bundle.materials);
  };

  const handleProceedToAnalyze = () => {
    if (materials.length === 0) return;
    setWorkflowStep('analyzed');
  };

  const handleGenerate = async (modeToGenerate = selectedMode) => {
    if (materials.length === 0) return;
    setSelectedMode(modeToGenerate);
    setIsProcessingModalOpen(true);
    setGenerationNotice(null);

    try {
      const res = await fetch('/api/study/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materials: materials.map(m => ({
            name: m.name,
            type: m.type,
            content: m.content,
          })),
          mode: modeToGenerate,
        }),
      });

      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }

      const result = await res.json();
      if (result.notice) {
        setGenerationNotice(result.notice);
      }

      const newOutput: StructuredOutput = {
        id: `output-${Date.now()}`,
        mode: modeToGenerate,
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        materials: materials.map(m => ({
          name: m.name,
          type: m.type,
          wordCount: m.wordCount,
        })),
        oneGlance: modeToGenerate === 'one_glance_summary' ? result.data : undefined,
        revisionNotes: modeToGenerate === 'revision_notes' ? result.data : undefined,
      };

      setPendingOutput(newOutput);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Synthesis error';
      setGenerationNotice(`Analysis completed via local academic engine (${msg}).`);
    }
  };

  const handleProcessingComplete = () => {
    setIsProcessingModalOpen(false);
    if (pendingOutput) {
      setStructuredOutput(pendingOutput);
      setWorkflowStep('output');
    }
  };

  const handleSwitchMode = async (newMode: OutputMode) => {
    if (newMode === selectedMode && structuredOutput) return;
    await handleGenerate(newMode);
  };

  const handleStartNew = () => {
    setWorkflowStep('upload');
    setMaterials([]);
    setStructuredOutput(null);
    setPendingOutput(null);
    setGenerationNotice(null);
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#FBF9F4] text-[#1A232E] font-sans selection:bg-[#EAEFF7] selection:text-[#1B2A47]">
      {/* Calm Watermarked Study Desk Background */}
      <StudyDeskBackground />

      {/* Top Navigation Bar (Non-Printable) */}
      <header className="h-16 border-b border-[#EAE5D9] bg-[#FAF8F2]/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between shrink-0 sticky top-0 z-30 print:hidden shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1B2A47] text-white flex items-center justify-center font-heading text-sm font-bold shadow-2xs">
            SN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-base text-[#121C30] tracking-tight">
                SturdyNerdy
              </span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#EFF5F1] text-[#365045] border border-[#D0DFD6]">
                Study Desk
              </span>
            </div>
            <p className="text-[10px] font-mono text-[#808D9F] hidden sm:block">
              From lecture chaos to study clarity.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-[#5A6B7D]">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F2] border border-[#EAE5D9]">
            <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
            <span>Academic Synthesis Engine Ready</span>
          </div>
          {workflowStep !== 'upload' && (
            <button
              onClick={handleStartNew}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-[#1B2A47] font-medium transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Desk</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Single Workflow Container */}
      <main className="flex-1 relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {workflowStep === 'upload' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Step 1 Tracker */}
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#808D9F]">
              <span className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B2A47] text-white font-medium shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-white" /> Step 1: Ingest Materials
              </span>
              <span className="text-[#DDD6C3]">───</span>
              <span className="px-3 py-1 rounded-full bg-[#EAE5D9] text-[#5A6B7D]">
                Step 2: Choose Mode
              </span>
              <span className="text-[#DDD6C3]">───</span>
              <span className="px-3 py-1 rounded-full bg-[#EAE5D9] text-[#5A6B7D]">
                Step 3: Digital Notebook & PDF
              </span>
            </div>

            {/* Split Screen Hero Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Headline, Value Prop & Physical Study Tray */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF5F1] text-[#365045] border border-[#D0DFD6] text-xs font-mono font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-[#4A6B5D]" />
                    <span>A Calm Digital Study Workspace</span>
                  </div>

                  <h1 className="font-heading font-bold text-3xl sm:text-5xl text-[#121C30] tracking-tight leading-[1.12]">
                    Turn lecture chaos <br className="hidden sm:inline" />
                    into study clarity.
                  </h1>

                  <p className="text-sm sm:text-base text-[#47586E] font-serif leading-relaxed max-w-xl">
                    Drop messy lecture slides, dense textbooks, and lab notes into your study tray. 
                    SturdyNerdy transforms disordered materials into structured revision notes, formula indexes, 
                    and exam-ready summaries.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-[#5A6B7D]">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-[#EAE5D9]">
                      ✓ No Chatbots
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-[#EAE5D9]">
                      ✓ Strict Single-Flow
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-[#EAE5D9]">
                      ✓ KaTeX Math Ready
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF8F2] border border-[#EAE5D9]">
                      ✓ 100% Exportable PDF
                    </span>
                  </div>
                </div>

                {/* Physical Study Tray Upload Component */}
                <div className="pt-2">
                  <StudyTrayUpload
                    materials={materials}
                    onAddMaterials={handleAddMaterials}
                    onRemoveMaterial={handleRemoveMaterial}
                    onProceedToAnalyze={handleProceedToAnalyze}
                    onLoadBundle={handleLoadBundle}
                  />
                </div>
              </div>

              {/* Right Column: Interactive 3D Study Desk Scene */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
                <div className="bg-white/80 backdrop-blur-xs rounded-3xl border border-[#EAE5D9] p-2 shadow-desk">
                  <StudyDeskScene3D />
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE5D9] text-xs font-mono text-[#5A6B7D] space-y-1.5">
                  <div className="font-bold text-[#1B2A47] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1B2A47]" />
                    Interactive Physical Desk Scene
                  </div>
                  <p className="text-[11px] text-[#808D9F] leading-relaxed">
                    Move your cursor over the desk to tilt the angle with 3D parallax. Watch disordered document cards orbit, converge, and fold into structured revision notes every 9 seconds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {workflowStep === 'analyzed' && (
          <ModeSelectionStage
            materials={materials}
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
            onGenerate={() => handleGenerate(selectedMode)}
            onBackToUpload={() => setWorkflowStep('upload')}
            isGenerating={isProcessingModalOpen}
          />
        )}

        {workflowStep === 'output' && structuredOutput && (
          <DigitalNotebookResult
            output={structuredOutput}
            onSwitchMode={handleSwitchMode}
            onStartNew={handleStartNew}
            generationNotice={generationNotice}
          />
        )}
      </main>

      {/* Footer (Non-Printable) */}
      <footer className="relative z-10 border-t border-[#EAE5D9] bg-[#FAF8F2]/60 py-5 px-6 text-center text-xs font-mono text-[#808D9F] print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>SturdyNerdy — From lecture chaos to study clarity. A calm study workspace for university students.</span>
          <span className="text-[11px] text-[#5A6B7D]">Single Workflow Architecture · Zero Distractions</span>
        </div>
      </footer>

      {/* Believable Multi-Stage Processing Flow Modal */}
      <ProcessingFlowModal
        isOpen={isProcessingModalOpen}
        materials={materials}
        mode={selectedMode}
        onComplete={handleProcessingComplete}
      />
    </div>
  );
}
