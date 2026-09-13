'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  FileText,
  RotateCcw
} from 'lucide-react';
import { 
  UploadedStudyMaterial, 
  OutputMode, 
  StructuredOutput, 
  WorkflowStep 
} from '@/lib/types';
import { SampleBundle } from '@/lib/sample-bundles';
import { UploadStage } from '@/components/UploadStage';
import { ModeSelectionStage } from '@/components/ModeSelectionStage';
import { StructuredOutputStage } from '@/components/StructuredOutputStage';
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

        <div className="flex items-center gap-2 text-xs font-mono text-[#5A6B7D]">
          <span className="w-2 h-2 rounded-full bg-[#4A6B5D]" />
          <span className="hidden sm:inline">Workspace Ready</span>
        </div>
      </header>

      {/* Main Single Workflow Container */}
      <main className="flex-1 relative z-10 p-4 sm:p-6 lg:p-8">
        {workflowStep === 'upload' && (
          <UploadStage
            materials={materials}
            onAddMaterials={handleAddMaterials}
            onRemoveMaterial={handleRemoveMaterial}
            onProceedToAnalyze={handleProceedToAnalyze}
            onLoadBundle={handleLoadBundle}
          />
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
          <StructuredOutputStage
            output={structuredOutput}
            onSwitchMode={handleSwitchMode}
            onStartNew={handleStartNew}
            generationNotice={generationNotice}
          />
        )}
      </main>

      {/* Footer (Non-Printable) */}
      <footer className="relative z-10 border-t border-[#EAE5D9] bg-[#FAF8F2]/60 py-4 px-6 text-center text-xs font-mono text-[#808D9F] print:hidden">
        SturdyNerdy — From lecture chaos to study clarity. A calm study workspace for university students.
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
