'use client';

import React, { useRef, useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Paperclip, 
  Layers, 
  AlertCircle,
  FileCheck2,
  BookOpen,
  Hash,
  Loader2
} from 'lucide-react';
import { UploadedStudyMaterial, ExtractionStats } from '@/lib/types';

interface StudyTrayUploadProps {
  materials: UploadedStudyMaterial[];
  stats: ExtractionStats;
  onAddMaterials: (newMaterials: UploadedStudyMaterial[], newStats: ExtractionStats) => void;
  onRemoveMaterial: (id: string) => void;
  onProceedToAnalyze: () => void;
  onClearAll: () => void;
}

export function StudyTrayUpload({
  materials,
  stats,
  onAddMaterials,
  onRemoveMaterial,
  onProceedToAnalyze,
  onClearAll,
}: StudyTrayUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractProgress, setExtractProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.doc', '.pptx', '.ppt', '.txt', '.md'];

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsExtracting(true);
    setErrorMessage(null);
    setExtractProgress(`Preparing ${fileList.length} file(s)...`);

    try {
      const formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const isSupported = ALLOWED_EXTENSIONS.some((ext) =>
          file.name.toLowerCase().endsWith(ext)
        );

        if (!isSupported) {
          setErrorMessage(
            `File "${file.name}" has an unsupported format. Please upload PDF, DOCX, PPTX, TXT, or MD files.`
          );
          setIsExtracting(false);
          return;
        }

        if (file.size > 30 * 1024 * 1024) {
          setErrorMessage(`File "${file.name}" exceeds the 30MB limit.`);
          setIsExtracting(false);
          return;
        }
        formData.append('files', file);
      }

      setExtractProgress('Extracting text, pages, and formulas from files...');

      const response = await fetch('/api/study/extract', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to extract text from uploaded files.');
      }

      const extractedItems: UploadedStudyMaterial[] = data.materials;
      const extractionStats: ExtractionStats = data.stats;

      // Update parent state
      onAddMaterials(extractedItems, extractionStats);
      setExtractProgress(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error extracting text from files';
      setErrorMessage(msg);
    } finally {
      setIsExtracting(false);
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

  return (
    <div className="space-y-6">
      {/* Real Extraction Error Banner */}
      {errorMessage && (
        <div 
          role="alert"
          className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start justify-between gap-3 text-red-900 shadow-2xs animate-fadeIn"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-red-700">
                Extraction Failed
              </div>
              <p className="text-sm font-serif leading-relaxed text-red-800">
                {errorMessage}
              </p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            aria-label="Dismiss error notification"
            className="text-xs font-mono text-red-600 hover:text-red-900 underline shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* The Physical Study Tray Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload study materials: drop files or click to browse"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-3xl p-8 sm:p-12 cursor-pointer transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] focus-visible:ring-offset-2 ${
          isDragging
            ? 'bg-[#F2ECE0] border-[#1B2A47] shadow-desk-elevated scale-[1.01]'
            : 'bg-[#FAF6EE] border-[#E5DEC9] hover:border-[#1B2A47]/40 shadow-tray hover:shadow-desk'
        }`}
      >
        <input
          type="file"
          id="study-material-file-input"
          aria-label="Select study material files"
          ref={fileInputRef}
          multiple
          accept=".pdf,.docx,.doc,.pptx,.ppt,.txt,.md"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        {/* Brass Corner Fasteners */}
        <div className="absolute top-3.5 left-3.5 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />
        <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />
        <div className="absolute bottom-3.5 left-3.5 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />
        <div className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />

        {/* Tray Interior */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8E2D2] flex items-center justify-center text-[#1B2A47] shadow-desk group-hover:-translate-y-1 transition-transform">
            {isExtracting ? (
              <Loader2 className="w-6 h-6 text-[#1B2A47] animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6 text-[#1B2A47]" />
            )}
          </div>

          <div className="space-y-1.5">
            <div className="font-serif font-bold text-xl sm:text-2xl text-[#121C2B] tracking-tight">
              {isExtracting
                ? extractProgress || 'Extracting Content...'
                : isDragging
                ? 'Release to drop files into tray'
                : 'Drop lecture slides, textbooks, or notes here'}
            </div>
            <p className="text-sm font-sans text-[#60728B] max-w-md mx-auto leading-relaxed">
              Upload your actual course materials. Supports multiple <strong>PDF</strong>, <strong>DOCX</strong>, <strong>PPTX</strong>, or <strong>TXT</strong> files.
            </p>
          </div>

          {/* Formats Supported Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono text-xs text-[#455770]">
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E8E2D2] shadow-2xs">
              PDF Documents
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E8E2D2] shadow-2xs">
              DOCX Word Handouts
            </span>
            <span className="px-3 py-1 rounded-lg bg-white border border-[#E8E2D2] shadow-2xs">
              PPTX Slide Decks
            </span>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* EXTRACTION STATISTICS DASHBOARD (Required by User)             */}
      {/* Displays: Files Uploaded, Pages Processed, Characters Extracted */}
      {/* ============================================================= */}
      {materials.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-[#E8E2D2] shadow-desk space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE5D9] pb-4">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B2A47] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4A6B5D]" />
                Content Successfully Extracted
              </div>
              <p className="text-xs font-serif text-[#60728B] mt-0.5">
                All uploaded documents have been parsed into memory and are ready for study note generation.
              </p>
            </div>

            <button
              onClick={onClearAll}
              aria-label="Clear all materials"
              className="text-xs font-mono text-[#8595AB] hover:text-red-700 underline self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded"
            >
              Clear all materials
            </button>
          </div>

          {/* 3 Prominent Stat Counters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Stat 1: Files Uploaded */}
            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EAE5D9] space-y-1">
              <div className="font-mono text-xs text-[#8595AB] uppercase tracking-wider">
                Files Uploaded
              </div>
              <div className="font-serif font-bold text-3xl text-[#121C2B]">
                {materials.length}
              </div>
              <div className="text-[11px] font-mono text-[#5A6B7D]">
                {materials.map((m) => m.type.toUpperCase()).join(', ')}
              </div>
            </div>

            {/* Stat 2: Pages Processed */}
            <div className="p-4 rounded-2xl bg-[#EFF5F1] border border-[#D0DFD6] space-y-1">
              <div className="font-mono text-xs text-[#365045] uppercase tracking-wider">
                Pages Processed
              </div>
              <div className="font-serif font-bold text-3xl text-[#284036]">
                {stats.pagesProcessed || materials.reduce((s, m) => s + m.pageCount, 0)}
              </div>
              <div className="text-[11px] font-mono text-[#4A6B5D]">
                Total document pages & slides
              </div>
            </div>

            {/* Stat 3: Characters Extracted */}
            <div className="p-4 rounded-2xl bg-[#EBF0F8] border border-[#D0DCEB] space-y-1">
              <div className="font-mono text-xs text-[#1B2A47] uppercase tracking-wider">
                Characters Extracted
              </div>
              <div className="font-serif font-bold text-3xl text-[#121C30]">
                {(stats.charactersExtracted || materials.reduce((s, m) => s + m.charCount, 0)).toLocaleString()}
              </div>
              <div className="text-[11px] font-mono text-[#5A6B7D]">
                ~{(stats.wordsExtracted || materials.reduce((s, m) => s + m.wordCount, 0)).toLocaleString()} words in corpus
              </div>
            </div>
          </div>

          {/* Extracted File Cards */}
          <div className="space-y-2.5 pt-1">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#455770] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#1B2A47]" />
              Uploaded Source Files ({materials.length})
            </div>

            <div className="space-y-2">
              {materials.map((mat) => (
                <div
                  key={mat.id}
                  className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#E8E2D2] flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white border border-[#E8E2D2] flex items-center justify-center font-mono text-xs font-bold text-[#1B2A47] shadow-2xs shrink-0">
                      {mat.type.toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="font-serif font-bold text-sm text-[#121C2B] truncate">
                        {mat.name}
                      </div>
                      <div className="text-xs font-mono text-[#8595AB] flex items-center gap-2 mt-0.5">
                        <span>{(mat.size / 1024).toFixed(1)} KB</span>
                        <span>•</span>
                        <span>{mat.pageCount} page(s)/slide(s)</span>
                        <span>•</span>
                        <span>{mat.charCount.toLocaleString()} chars</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveMaterial(mat.id)}
                    aria-label={`Remove ${mat.name} from study tray`}
                    className="text-[#8595AB] hover:text-red-700 p-2 rounded-xl hover:bg-white transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                    title={`Remove ${mat.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Proceed Action Button */}
          <div className="pt-4 flex justify-end">
            <button
              onClick={onProceedToAnalyze}
              aria-label="Choose notes mode"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-[#1B2A47] hover:bg-[#101B2E] text-white text-sm font-mono font-bold transition-all shadow-desk hover:shadow-desk-elevated active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A47] focus-visible:ring-offset-2"
            >
              <span>Choose Notes Mode</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
