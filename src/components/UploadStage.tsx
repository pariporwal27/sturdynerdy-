'use client';

import React, { useRef, useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  FileCheck, 
  Trash2, 
  Sparkles, 
  AlertCircle, 
  ArrowRight,
  BookOpen,
  Layers,
  FileCode,
  Info
} from 'lucide-react';
import { UploadedStudyMaterial } from '@/lib/types';
import { parseUploadedFile } from '@/lib/file-parser';
import { SAMPLE_BUNDLES, SampleBundle } from '@/lib/sample-bundles';
import { InteractiveStudyDeskHero } from './InteractiveStudyDeskHero';

interface UploadStageProps {
  materials: UploadedStudyMaterial[];
  onAddMaterials: (newMaterials: UploadedStudyMaterial[]) => void;
  onRemoveMaterial: (id: string) => void;
  onProceedToAnalyze: () => void;
  onLoadBundle: (bundle: SampleBundle) => void;
}

export function UploadStage({
  materials,
  onAddMaterials,
  onRemoveMaterial,
  onProceedToAnalyze,
  onLoadBundle,
}: UploadStageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsProcessingFiles(true);
    setUploadError(null);

    try {
      const parsed: UploadedStudyMaterial[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.size > 25 * 1024 * 1024) {
          setUploadError(`File ${file.name} exceeds the 25MB limit.`);
          continue;
        }
        const item = await parseUploadedFile(file);
        parsed.push(item);
      }

      if (parsed.length > 0) {
        onAddMaterials(parsed);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown upload error';
      setUploadError(`Failed to process files: ${msg}`);
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const totalWords = materials.reduce((acc, m) => acc + m.wordCount, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fadeIn">
      {/* Workflow Step Tracker */}
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
          Step 3: Output & PDF
        </span>
      </div>

      {/* Interactive Desk Hero */}
      <InteractiveStudyDeskHero />

      {/* Upload Error Notice */}
      {uploadError && (
        <div className="p-4 bg-red-50/80 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-800 shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button onClick={() => setUploadError(null)} className="font-mono text-xs hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative p-8 sm:p-12 rounded-2xl border-2 border-dashed text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-[#1B2A47] bg-[#EAEFF7]/50 scale-[1.01]'
            : 'border-[#DDD6C3] bg-white hover:border-[#1B2A47]/40 hover:bg-[#FAF8F4] shadow-desk'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept=".pdf,.docx,.doc,.pptx,.ppt,.txt,.md"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] border border-[#EAE5D9] flex items-center justify-center text-[#1B2A47] shadow-2xs group-hover:scale-105 transition-transform">
            <UploadCloud className="w-6 h-6 text-[#1B2A47]" />
          </div>

          <div className="space-y-1">
            <div className="font-heading font-bold text-base sm:text-lg text-[#121C30]">
              {isProcessingFiles ? 'Extracting Text & Mathematical Invariants...' : 'Drop multiple study materials here, or click to browse'}
            </div>
            <p className="text-xs font-mono text-[#808D9F]">
              PDF, DOCX, PPTX, TXT, and Markdown files supported (up to 25MB per file)
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono text-[#5A6B7D]">
            <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F2] border border-[#EAE5D9]">.pdf</span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F2] border border-[#EAE5D9]">.docx</span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#FAF8F2] border border-[#EAE5D9]">.pptx</span>
          </div>
        </div>
      </div>

      {/* Materials Queue List */}
      {materials.length > 0 && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#5A6B7D]">
              Ingested Materials ({materials.length} Items • ~{totalWords.toLocaleString()} Words)
            </span>
            <span className="text-xs font-mono text-[#4A6B5D] flex items-center gap-1 font-medium">
              <FileCheck className="w-3.5 h-3.5" /> Ready for AI Analysis
            </span>
          </div>

          <div className="divide-y divide-[#EAE5D9] bg-white rounded-xl border border-[#EAE5D9] shadow-desk overflow-hidden">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className="p-4 flex items-center justify-between gap-4 hover:bg-[#FAF8F4] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F2] border border-[#EAE5D9] flex items-center justify-center font-mono text-xs font-bold uppercase text-[#1B2A47] shrink-0">
                    {mat.type}
                  </div>
                  <div className="min-w-0">
                    <div className="font-heading font-bold text-xs sm:text-sm text-[#1A232E] truncate">
                      {mat.name}
                    </div>
                    <div className="text-[11px] font-mono text-[#808D9F] flex items-center gap-2 mt-0.5">
                      <span>{(mat.size / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span>~{mat.wordCount} words</span>
                      {mat.isSample && (
                        <>
                          <span>•</span>
                          <span className="text-[#8C6D3F] italic font-serif">Sample Bundle</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveMaterial(mat.id);
                  }}
                  className="text-[#808D9F] hover:text-red-700 p-1.5 rounded transition-colors shrink-0"
                  title="Remove Material"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onProceedToAnalyze}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#1B2A47] hover:bg-[#121C30] text-white text-xs font-mono font-semibold transition-all shadow-desk hover:shadow-desk-elevated"
            >
              Analyze {materials.length} Study Materials <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Labeled Sample Test Bundles for Demo */}
      <div className="p-5 rounded-2xl border border-[#EAE5D9] bg-[#FAF8F2]/80 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8C6D3F]" />
            <span className="font-mono text-xs font-semibold text-[#121C30] uppercase tracking-wider">
              Sample University Bundles
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#808D9F] bg-white px-2 py-0.5 rounded border border-[#EAE5D9]">
            Demonstration Mode Only
          </span>
        </div>

        <p className="text-xs font-sans text-[#5A6B7D] leading-relaxed">
          Need quick test files? Ingest complete multi-format university curriculum packages (.pdf, .docx, .pptx) in one click to test the processing pipeline.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {SAMPLE_BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              onClick={() => onLoadBundle(bundle)}
              className="p-4 rounded-xl border border-[#EAE5D9] bg-white hover:border-[#1B2A47]/40 hover:shadow-desk cursor-pointer transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading font-bold text-xs text-[#121C30] group-hover:text-[#1B2A47] transition-colors">
                  {bundle.title}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#EAEFF7] text-[#1B2A47]">
                  {bundle.materials.length} Files
                </span>
              </div>
              <p className="text-[11px] font-sans text-[#5A6B7D] line-clamp-2 leading-relaxed">
                {bundle.description}
              </p>
              <div className="text-[10px] font-mono text-[#808D9F] flex items-center justify-between pt-1 border-t border-[#FAF8F4]">
                <span>PDF + DOCX + PPTX</span>
                <span className="text-[#1B2A47] font-semibold group-hover:translate-x-0.5 transition-transform">
                  Load Sample Bundle →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
