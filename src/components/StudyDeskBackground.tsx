'use client';

import React from 'react';

export function StudyDeskBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 contain-strict"
    >
      {/* Delicate Notebook Grid Texture */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="sturdy-grid"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="#1B2A47"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sturdy-grid)" />
      </svg>

      {/* 1. Exactly ONE Book Illustration (Faint Warm Slate) */}
      <div className="absolute top-[14%] right-[7%] w-56 h-40 text-[#1B2A47]/40 animate-breathe-slow will-change-transform">
        <svg viewBox="0 0 200 140" fill="none" stroke="currentColor" strokeWidth="0.9">
          {/* Spine & Pages */}
          <path d="M 24 28 C 64 24, 92 28, 100 34 L 100 126 C 92 120, 64 116, 24 118 Z" />
          <path d="M 176 28 C 136 24, 108 28, 100 34 L 100 126 C 108 120, 136 116, 176 118 Z" />
          {/* Subtle page lines */}
          <line x1="36" y1="50" x2="88" y2="51" strokeDasharray="2 3" opacity="0.6" />
          <line x1="36" y1="68" x2="88" y2="69" strokeDasharray="2 3" opacity="0.6" />
          <line x1="36" y1="86" x2="88" y2="87" strokeDasharray="2 3" opacity="0.6" />
          <line x1="112" y1="51" x2="164" y2="50" strokeDasharray="2 3" opacity="0.6" />
          <line x1="112" y1="69" x2="164" y2="68" strokeDasharray="2 3" opacity="0.6" />
          <line x1="112" y1="87" x2="164" y2="86" strokeDasharray="2 3" opacity="0.6" />
        </svg>
      </div>

      {/* 2. Exactly ONE Geometric Sketch (Drafting Circle & Tangent, Faint Sage) */}
      <div className="absolute bottom-[16%] left-[6%] w-48 h-48 text-[#4A6B5D]/40 animate-breathe-offset will-change-transform">
        <svg viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="0.85">
          <circle cx="80" cy="80" r="55" strokeDasharray="3 3" />
          <circle cx="80" cy="80" r="2" fill="currentColor" />
          <line x1="20" y1="135" x2="140" y2="25" />
          <circle cx="120" cy="45" r="4" />
        </svg>
      </div>

      {/* 3. Exactly ONE Notebook Element (Vertical Margin Line & Binder Perforations) */}
      <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-px bg-[#E2DACB]/70 will-change-transform">
        <div className="absolute top-[20%] -left-1.5 w-3 h-3 rounded-full border border-[#D5CABB] bg-[#FBF9F4]" />
        <div className="absolute top-[50%] -left-1.5 w-3 h-3 rounded-full border border-[#D5CABB] bg-[#FBF9F4]" />
        <div className="absolute top-[80%] -left-1.5 w-3 h-3 rounded-full border border-[#D5CABB] bg-[#FBF9F4]" />
      </div>
    </div>
  );
}
