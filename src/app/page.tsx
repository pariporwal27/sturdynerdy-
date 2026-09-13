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
  Printer,
  ArrowRight,
  ArrowDown,
  Cpu,
  FileCheck2,
  FileSpreadsheet,
  Sigma
} from 'lucide-react';
import { 
  UploadedStudyMaterial, 
  OutputMode, 
  StructuredOutput, 
  WorkflowStep,
  ExtractionStats
} from '@/lib/types';
import { StudyDeskBackground } from '@/components/StudyDeskBackground';
import { StudyDeskScene3D } from '@/components/StudyDeskScene3D';
import { HowItWorksTimeline } from '@/components/HowItWorksTimeline';
import { StudyTrayUpload } from '@/components/StudyTrayUpload';
import { DocumentMergeShowcase } from '@/components/DocumentMergeShowcase';
import { NotebookPreviewShowcase } from '@/components/NotebookPreviewShowcase';

import { DigitalNotebookResult } from '@/components/DigitalNotebookResult';
import { ProcessingFlowModal } from '@/components/ProcessingFlowModal';

export default function SturdyNerdyApp() {
  const [workflowStep, setWorkflowStep] = useState<WorkflowStep>('upload');
  const [materials, setMaterials] = useState<UploadedStudyMaterial[]>([]);
  const [stats, setStats] = useState<ExtractionStats>({
    filesUploaded: 0,
    pagesProcessed: 0,
    charactersExtracted: 0,
    wordsExtracted: 0,
  });

  const [selectedMode, setSelectedMode] = useState<OutputMode>('quick_summary');
  const [structuredOutput, setStructuredOutput] = useState<StructuredOutput | null>(null);

  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [isApiDone, setIsApiDone] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [pendingOutput, setPendingOutput] = useState<StructuredOutput | null>(null);

  const handleAddMaterials = (
    newItems: UploadedStudyMaterial[],
    newStats: ExtractionStats
  ) => {
    setMaterials(newItems);
    setStats(newStats);
  };

  const handleRemoveMaterial = (id: string) => {
    setMaterials((prev) => {
      const updated = prev.filter((m) => m.id !== id);
      setStats({
        filesUploaded: updated.length,
        pagesProcessed: updated.reduce((s, m) => s + m.pageCount, 0),
        charactersExtracted: updated.reduce((s, m) => s + m.charCount, 0),
        wordsExtracted: updated.reduce((s, m) => s + m.wordCount, 0),
      });
      return updated;
    });
  };

  const handleClearAll = () => {
    setMaterials([]);
    setStats({
      filesUploaded: 0,
      pagesProcessed: 0,
      charactersExtracted: 0,
      wordsExtracted: 0,
    });
  };

  const handleProceedToAnalyze = () => {
    if (materials.length === 0) return;
    setWorkflowStep('analyzed');
    document.getElementById('workspace')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerate = async (modeToGenerate = selectedMode) => {
    if (materials.length === 0) return;

    // Validate extracted text
    const totalChars = materials.reduce((s, m) => s + (m.charCount || 0), 0);
    if (totalChars === 0) {
      alert('Error: Extracted text length is zero. Please upload files with readable text.');
      return;
    }

    setSelectedMode(modeToGenerate);
    setIsProcessingModalOpen(true);
    setIsApiDone(false);
    setApiError(null);
    setPendingOutput(null);

    try {
      const res = await fetch('/api/study/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materials: materials.map((m) => ({
            name: m.name,
            type: m.type,
            content: m.content,
            pageCount: m.pageCount,
            charCount: m.charCount,
            wordCount: m.wordCount,
          })),
          mode: modeToGenerate,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || `Gemini API returned error HTTP ${res.status}`);
      }

      const newOutput: StructuredOutput = {
        id: `output-${Date.now()}`,
        mode: modeToGenerate,
        createdAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        materials: materials.map((m) => ({
          name: m.name,
          type: m.type,
          wordCount: m.wordCount,
          pageCount: m.pageCount,
          charCount: m.charCount,
        })),
        stats,
        quickSummary: modeToGenerate === 'quick_summary' ? result.data : undefined,
        revisionNotes: modeToGenerate === 'revision_notes' ? result.data : undefined,
      };

      setPendingOutput(newOutput);
      setIsApiDone(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error during note generation';
      setApiError(msg);
    }
  };

  const handleProcessingComplete = () => {
    setIsProcessingModalOpen(false);
    if (pendingOutput) {
      setStructuredOutput(pendingOutput);
      setWorkflowStep('output');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDismissError = () => {
    setIsProcessingModalOpen(false);
    setApiError(null);
  };

  const handleSwitchMode = async (newMode: OutputMode) => {
    if (newMode === selectedMode && structuredOutput) return;
    await handleGenerate(newMode);
  };

  const handleStartNew = () => {
    setWorkflowStep('upload');
    setMaterials([]);
    setStats({
      filesUploaded: 0,
      pagesProcessed: 0,
      charactersExtracted: 0,
      wordsExtracted: 0,
    });
    setStructuredOutput(null);
    setPendingOutput(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-[#FAF8F3] text-[#121C2B] font-sans selection:bg-[#EAEFF7] selection:text-[#1B2A47]">
      {/* Calm Watermarked Study Desk Background */}
      <StudyDeskBackground />

      {/* Top Navigation Bar (Non-Printable) */}
      <header className="h-20 border-b border-[#EAE5D9]/80 bg-[#FAF8F3]/90 backdrop-blur-md px-6 sm:px-12 flex items-center justify-between shrink-0 sticky top-0 z-40 print:hidden">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#1B2A47] text-white flex items-center justify-center font-heading text-lg font-bold shadow-2xs">
            SN
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-xl text-[#121C30] tracking-tight">
                SturdyNerdy
              </span>
              <span className="text-[10px] font-mono font-medium px-2.5 py-0.5 rounded bg-[#EFF5F1] text-[#365045] border border-[#D0DFD6]">
                Study Desk
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#808D9F] hidden sm:block">
              From lecture chaos to study clarity.
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-4 sm:gap-6 text-sm font-mono text-[#5A6B7D]">
          {workflowStep === 'output' ? (
            <button
              onClick={handleStartNew}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-[#1B2A47] font-semibold transition-all shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>New Study Session</span>
            </button>
          ) : (
            <>
              <a href="#how-it-works" className="hidden md:inline hover:text-[#121C30] transition-colors">
                How It Works
              </a>
              <a href="#transformation" className="hidden lg:inline hover:text-[#121C30] transition-colors">
                Synthesis
              </a>
              <a href="#preview" className="hidden md:inline hover:text-[#121C30] transition-colors">
                Preview
              </a>
              <a
                href="#workspace"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B2A47] hover:bg-[#121C30] text-white text-xs sm:text-sm font-semibold transition-all shadow-desk hover:shadow-desk-elevated"
              >
                <span>Upload Materials</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </>
          )}
        </nav>
      </header>

      {/* ============================================================= */}
      {/* IF GENERATED: SHOW FULL STUDENT REVISION NOTEBOOK             */}
      {/* ============================================================= */}
      {workflowStep === 'output' && structuredOutput ? (
        <main className="flex-1 relative z-10 p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto w-full">
          <DigitalNotebookResult
            output={structuredOutput}
            onSwitchMode={handleSwitchMode}
            onStartNew={handleStartNew}
          />
        </main>
      ) : (
        /* ============================================================= */
        /* EDITORIAL SCROLLABLE STORYTELLING EXPERIENCE                 */
        /* ============================================================= */
        <main className="flex-1 relative z-10">
          {/* ----------------------------------------------------------- */}
          {/* SECTION 1: HERO                                             */}
          {/* ----------------------------------------------------------- */}
          <section className="relative min-h-[90vh] lg:min-h-[96vh] flex items-center py-16 sm:py-24 px-6 sm:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
              {/* Left Column: Hero Statement, Value & CTA */}
              <div className="lg:col-span-6 xl:col-span-6 space-y-8">
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EFF5F1] text-[#365045] border border-[#D0DFD6] text-xs font-mono font-medium">
                  <Sparkles className="w-4 h-4 text-[#4A6B5D]" />
                  <span>Calm Academic Study Workspace</span>
                </div>

                {/* Hero Heading: 72–96px on Desktop */}
                <h1 className="font-heading font-bold text-5xl sm:text-7xl lg:text-[80px] xl:text-[94px] text-[#121C30] tracking-tight leading-[0.98]">
                  Turn lecture <br />
                  chaos into <br />
                  study clarity.
                </h1>

                {/* Hero Description */}
                <p className="text-xl sm:text-2xl lg:text-[25px] text-[#47586E] font-serif leading-relaxed max-w-xl">
                  Drop messy slides, dense textbook chapters, and lab notes into your digital workspace. 
                  SturdyNerdy extracts the real text and generates student-friendly revision notes and quick summaries.
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <a
                    href="#workspace"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1B2A47] hover:bg-[#121C30] text-white text-base font-semibold transition-all shadow-desk hover:shadow-desk-elevated font-mono"
                  >
                    <span>Open Study Tray</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  <a
                    href="#how-it-works"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl border border-[#EAE5D9] bg-white hover:bg-[#FAF8F4] text-[#1B2A47] text-base font-medium transition-all shadow-2xs font-mono"
                  >
                    <span>See How It Works</span>
                  </a>
                </div>

                {/* Assurance Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-mono text-[#5A6B7D]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
                    Real Text Extraction
                  </span>
                  <span className="text-[#DDD6C3]">·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
                    Zero Placeholder Content
                  </span>
                  <span className="text-[#DDD6C3]">·</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A6B5D]" />
                    Exam-Friendly Notes
                  </span>
                </div>
              </div>

              {/* Right Column: 3D Study Desk */}
              <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center">
                <div className="w-full max-w-[680px]">
                  <StudyDeskScene3D />
                </div>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 2: HOW IT WORKS                                     */}
          {/* ----------------------------------------------------------- */}
          <div id="how-it-works">
            <HowItWorksTimeline />
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 3: INTERACTIVE TRANSFORMATION                       */}
          {/* ----------------------------------------------------------- */}
          <div id="transformation">
            <DocumentMergeShowcase />
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 4: UPLOAD WORKSPACE (Large, Centered, Dedicated)   */}
          {/* ----------------------------------------------------------- */}
          <section id="workspace" className="relative py-28 lg:py-36 px-4 sm:px-6 max-w-5xl mx-auto">
            {/* Dedicated Section Header */}
            <div className="text-center space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#EAE5D9] text-xs font-mono text-[#5A6B7D] uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5 text-[#1B2A47]" />
                <span>Section 04 · Your Study Tray</span>
              </div>

              <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#121C30] tracking-tight leading-[1.08]">
                Upload Your Study Materials
              </h2>

              <p className="text-lg sm:text-xl text-[#5A6B7D] font-serif leading-relaxed max-w-2xl mx-auto">
                Drop your actual PDF lecture slides, DOCX handouts, or PPTX presentation decks into the tray. 
                Text and formulas are extracted directly from your files.
              </p>
            </div>

            {/* If in 'analyzed' mode: Select between Mode A and Mode B */}
            {workflowStep === 'analyzed' ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#EAE5D9] shadow-desk-elevated space-y-8 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#EAE5D9] pb-4 gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-2xl text-[#121C30]">
                      Choose Output Format
                    </h3>
                    <p className="font-mono text-xs text-[#808D9F] mt-0.5">
                      Extracted {stats.charactersExtracted.toLocaleString()} characters across {materials.length} file(s).
                    </p>
                  </div>
                  <button
                    onClick={() => setWorkflowStep('upload')}
                    className="text-xs font-mono text-[#808D9F] hover:text-[#121C30] underline self-start sm:self-auto"
                  >
                    ← Back to files
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mode A: Quick Summary */}
                  <div
                    onClick={() => setSelectedMode('quick_summary')}
                    className={`p-6 sm:p-8 rounded-3xl border-2 cursor-pointer transition-all ${
                      selectedMode === 'quick_summary'
                        ? 'border-[#1B2A47] bg-[#FAF8F3] shadow-desk'
                        : 'border-[#EAE5D9] bg-white hover:border-[#DDD6C3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#1B2A47] uppercase tracking-wider">
                        Mode A
                      </span>
                      {selectedMode === 'quick_summary' && (
                        <CheckCircle2 className="w-5 h-5 text-[#1B2A47]" />
                      )}
                    </div>
                    <div className="font-heading font-bold text-2xl text-[#121C30] mb-2">
                      Quick Summary
                    </div>
                    <p className="text-sm text-[#5A6B7D] leading-relaxed font-serif">
                      A concise student-friendly summary. Extracts main topic, core concepts, key takeaways, definitions, and essential formulas. Maximum 1 page.
                    </p>
                  </div>

                  {/* Mode B: Revision Notes */}
                  <div
                    onClick={() => setSelectedMode('revision_notes')}
                    className={`p-6 sm:p-8 rounded-3xl border-2 cursor-pointer transition-all ${
                      selectedMode === 'revision_notes'
                        ? 'border-[#4A6B5D] bg-[#EFF5F1]/50 shadow-desk'
                        : 'border-[#EAE5D9] bg-white hover:border-[#DDD6C3]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#4A6B5D] uppercase tracking-wider">
                        Mode B
                      </span>
                      {selectedMode === 'revision_notes' && (
                        <CheckCircle2 className="w-5 h-5 text-[#4A6B5D]" />
                      )}
                    </div>
                    <div className="font-heading font-bold text-2xl text-[#121C30] mb-2">
                      Revision Notes
                    </div>
                    <p className="text-sm text-[#5A6B7D] leading-relaxed font-serif">
                      Structured revision notes for exam prep. Uses clear headings, subtopics, clean bullet points, definitions, formulas, and high-yield exam tips.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={() => handleGenerate(selectedMode)}
                    className="px-10 py-4 rounded-2xl bg-[#1B2A47] hover:bg-[#121C30] text-white font-mono font-bold text-base transition-all shadow-desk hover:shadow-desk-elevated active:scale-[0.99]"
                  >
                    Generate {selectedMode === 'quick_summary' ? 'Quick Summary' : 'Revision Notes'} →
                  </button>
                </div>
              </div>
            ) : (
              /* Physical Desk Tray Component */
              <StudyTrayUpload
                materials={materials}
                stats={stats}
                onAddMaterials={handleAddMaterials}
                onRemoveMaterial={handleRemoveMaterial}
                onProceedToAnalyze={handleProceedToAnalyze}
                onClearAll={handleClearAll}
              />
            )}
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 5: OUTPUT PREVIEW                                   */}
          {/* ----------------------------------------------------------- */}
          <div id="preview">
            <NotebookPreviewShowcase />
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 6: MINIMAL FEATURES (Maximum 4 Cards)               */}
          {/* ----------------------------------------------------------- */}
          <section className="relative py-28 lg:py-36 px-6 sm:px-12 max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-20">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F2] border border-[#EAE5D9] text-xs font-mono text-[#5A6B7D] uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B5D]" />
                <span>Section 06 · Principles of Design</span>
              </div>

              <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-[#121C30] tracking-tight leading-[1.08]">
                Built for deep study. <br />
                Not for superficial chats.
              </h2>

              <p className="text-lg sm:text-xl text-[#5A6B7D] font-serif leading-relaxed max-w-2xl mx-auto">
                Engineered with strict scope discipline so you spend your time studying, not debugging conversational prompts.
              </p>
            </div>

            {/* Exactly 4 Clean Editorial Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE5D9] shadow-desk hover:shadow-desk-elevated transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF0F8] text-[#1B2A47] flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C30]">
                  Single-Flow Focus
                </h3>
                <p className="text-base sm:text-lg text-[#47586E] font-serif leading-relaxed">
                  No chatbots, no flashcard bloat, and no attendance trackers. SturdyNerdy excels at one critical workflow: transforming messy course materials into structured understanding.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE5D9] shadow-desk hover:shadow-desk-elevated transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#EFF5F1] text-[#4A6B5D] flex items-center justify-center">
                  <Sigma className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C30]">
                  Mathematical Invariants
                </h3>
                <p className="text-base sm:text-lg text-[#47586E] font-serif leading-relaxed">
                  Every formula is parsed into native KaTeX LaTeX equations. Step-by-step derivations preserve rigor with clear variable ledgers and boundary constraints.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE5D9] shadow-desk hover:shadow-desk-elevated transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF1E6] text-[#C5A059] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C30]">
                  Content-Aware Synthesis
                </h3>
                <p className="text-base sm:text-lg text-[#47586E] font-serif leading-relaxed">
                  Zero pre-baked templates. The parser extracts the exact laws, definitions, and theorems from your specific files to ensure unique, syllabus-accurate notes.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EAE5D9] shadow-desk hover:shadow-desk-elevated transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] text-[#1B2A47] flex items-center justify-center">
                  <Printer className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#121C30]">
                  Print-Ready PDF Architecture
                </h3>
                <p className="text-base sm:text-lg text-[#47586E] font-serif leading-relaxed">
                  Pre-configured print stylesheets adapt your notes to standard letter/A4 pages. Avoid orphaned lines and awkward page splits with one-click export.
                </p>
              </div>
            </div>
          </section>

          {/* ----------------------------------------------------------- */}
          {/* SECTION 7: FINAL CTA                                        */}
          {/* ----------------------------------------------------------- */}
          <section className="relative py-28 lg:py-36 px-6 sm:px-12 max-w-5xl mx-auto text-center space-y-8">
            <div className="w-16 h-16 rounded-3xl bg-[#1B2A47] text-white flex items-center justify-center font-heading text-2xl font-bold mx-auto shadow-desk">
              SN
            </div>

            <h2 className="font-heading font-bold text-4xl sm:text-6xl lg:text-7xl text-[#121C30] tracking-tight leading-[1.05]">
              Bring clarity to your next study session.
            </h2>

            <p className="text-xl sm:text-2xl text-[#5A6B7D] font-serif leading-relaxed max-w-2xl mx-auto">
              Drop your lecture files into the study tray and experience clean, student-crafted revision notes.
            </p>

            <div className="pt-4">
              <a
                href="#workspace"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#1B2A47] hover:bg-[#121C30] text-white font-mono font-bold text-base sm:text-lg transition-all shadow-desk hover:shadow-desk-elevated"
              >
                <span>Enter Study Workspace</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>
        </main>
      )}

      {/* Footer (Non-Printable) */}
      <footer className="relative z-10 border-t border-[#EAE5D9] bg-[#FAF8F3] py-8 px-6 sm:px-12 text-xs font-mono text-[#808D9F] print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-sm text-[#121C30]">SturdyNerdy</span>
            <span>— From lecture chaos to study clarity.</span>
          </div>
          <span>Single-Workflow Academic Architecture · Real Document Extraction</span>
        </div>
      </footer>

      {/* Real Multi-Stage Processing Flow Modal with Debugging Logs */}
      <ProcessingFlowModal
        isOpen={isProcessingModalOpen}
        materials={materials}
        mode={selectedMode}
        isApiDone={isApiDone}
        apiError={apiError}
        onComplete={handleProcessingComplete}
        onDismissError={handleDismissError}
      />
    </div>
  );
}
