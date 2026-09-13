'use client';

import React, { useRef, useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  Sparkles, 
  ArrowRight, 
  FileCheck,
  CheckCircle2,
  Paperclip,
  Layers,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { UploadedStudyMaterial } from '@/lib/types';
import { parseUploadedFile } from '@/lib/file-parser';
import { SAMPLE_BUNDLES, SampleBundle } from '@/lib/sample-bundles';

interface StudyTrayUploadProps {
  materials: UploadedStudyMaterial[];
  onAddMaterials: (newMaterials: UploadedStudyMaterial[]) => void;
  onRemoveMaterial: (id: string) => void;
  onProceedToAnalyze: () => void;
  onLoadBundle: (bundle: SampleBundle) => void;
}

export function StudyTrayUpload({
  materials,
  onAddMaterials,
  onRemoveMaterial,
  onProceedToAnalyze,
  onLoadBundle,
}: StudyTrayUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setIsProcessing(true);
    setErrorNotice(null);

    try {
      const parsed: UploadedStudyMaterial[] = [];
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        if (file.size > 25 * 1024 * 1024) {
          setErrorNotice(`File ${file.name} exceeds the 25MB limit.`);
          continue;
        }
        const item = await parseUploadedFile(file);
        parsed.push(item);
      }

      if (parsed.length > 0) {
        onAddMaterials(parsed);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setErrorNotice(`Could not parse file: ${msg}`);
    } finally {
      setIsProcessing(false);
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
    <div className="space-y-6">
      {/* Error Banner */}
      {errorNotice && (
        <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-xl flex items-center justify-between text-xs text-red-800 shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorNotice}</span>
          </div>
          <button onClick={() => setErrorNotice(null)} className="font-mono text-xs hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* The Physical Study Tray Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 border ${
          isDragging
            ? 'bg-[#F2ECE0] border-[#1B2A47] shadow-desk-elevated scale-[1.01]'
            : 'bg-[#FAF6EE] border-[#E5DEC9] hover:border-[#1B2A47]/40 shadow-tray hover:shadow-desk'
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

        {/* Brass Corner Fasteners (Tactile Desk Quality) */}
        <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />
        <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />
        <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />
        <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-[#C5A059] border border-[#8C6D3F]/50 shadow-2xs" />

        {/* Tray Interior */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D2] flex items-center justify-center text-[#1B2A47] shadow-desk group-hover:-translate-y-0.5 transition-transform">
            <Paperclip className="w-5 h-5 text-[#8C6D3F]" />
          </div>

          <div className="space-y-1">
            <div className="font-serif font-bold text-lg sm:text-xl text-[#121C2B] tracking-tight">
              {isProcessing ? 'Filing Documents into Tray...' : isDragging ? 'Drop Papers into Study Tray' : 'Drop study materials into the tray'}
            </div>
            <p className="text-xs font-sans text-[#60728B] max-w-sm mx-auto leading-relaxed">
              Place lecture slides (PPTX), course handouts (DOCX), or syllabi (PDF). Watch your papers stack together.
            </p>
          </div>

          {/* Formats Supported Badges */}
          <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#455770]">
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#E8E2D2] shadow-2xs">
              .PDF
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#E8E2D2] shadow-2xs">
              .DOCX
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white border border-[#E8E2D2] shadow-2xs">
              .PPTX
            </span>
          </div>
        </div>
      </div>

      {/* Uploaded Materials Stack (In Tray) */}
      {materials.length > 0 && (
        <div className="space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#455770] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#1B2A47]" />
              Stacked in Tray ({materials.length} files • ~{totalWords.toLocaleString()} words)
            </span>
            <span className="text-xs font-mono text-[#4A6B5D] flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready for Desk Analysis
            </span>
          </div>

          {/* Physically Stacked File Cards */}
          <div className="space-y-2.5">
            {materials.map((mat, idx) => (
              <div
                key={mat.id}
                style={{
                  transform: `translateY(${idx * -2}px)`,
                }}
                className="p-3.5 rounded-xl bg-white border border-[#E8E2D2] shadow-desk flex items-center justify-between gap-3 hover:shadow-desk-elevated transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F3] border border-[#E8E2D2] flex items-center justify-center font-mono text-[10px] font-bold text-[#1B2A47] shrink-0">
                    {mat.type.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif font-bold text-xs text-[#121C2B] truncate">
                      {mat.name}
                    </div>
                    <div className="text-[10px] font-mono text-[#8595AB] flex items-center gap-2">
                      <span>{(mat.size / 1024).toFixed(1)} KB</span>
                      <span>•</span>
                      <span>~{mat.wordCount} words</span>
                      {mat.isSample && (
                        <span className="text-[#8C6D3F] italic font-serif">University Benchmark</span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveMaterial(mat.id);
                  }}
                  className="text-[#8595AB] hover:text-red-700 p-1.5 rounded-md hover:bg-[#FAF8F3] transition-colors"
                  title="Remove from tray"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onProceedToAnalyze}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1B2A47] hover:bg-[#101B2E] text-white text-xs font-mono font-semibold transition-all shadow-desk-elevated hover:scale-[1.02] active:scale-[0.98]"
            >
              Analyze {materials.length} Study Materials <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Pre-loaded Benchmark Bundles */}
      <div className="p-4 rounded-2xl border border-[#E8E2D2] bg-[#FCFAF5] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#121C2B] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            One-Click Test Packs
          </span>
          <span className="text-[10px] font-mono text-[#8595AB]">
            Instant Multi-Format Ingest
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SAMPLE_BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              onClick={() => onLoadBundle(bundle)}
              className="p-3 rounded-xl border border-[#E8E2D2] bg-white hover:border-[#1B2A47]/40 hover:shadow-desk cursor-pointer transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-xs text-[#121C2B] group-hover:text-[#1B2A47] transition-colors truncate">
                  {bundle.title}
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#EBF0F8] text-[#1B2A47] shrink-0">
                  {bundle.materials.length} Files
                </span>
              </div>
              <p className="text-[10.5px] font-sans text-[#60728B] line-clamp-1">
                {bundle.description}
              </p>
              <div className="text-[9.5px] font-mono text-[#8C6D3F] flex items-center justify-between pt-0.5">
                <span>PDF + DOCX + PPTX</span>
                <span className="font-bold group-hover:translate-x-0.5 transition-transform">
                  Load Pack →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
