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
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="sturdy-grid"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="#1B2A47"
              strokeWidth="0.65"
            />
            <circle cx="0" cy="0" r="0.8" fill="#1B2A47" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sturdy-grid)" />
      </svg>

      {/* Watermarked Study Desk Motif 1: Open Notebook (Top-Right) */}
      <div className="absolute top-[6%] right-[5%] w-64 h-48 text-[#1B2A47] animate-breathe-slow will-change-transform">
        <svg viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="1">
          {/* Left page */}
          <path d="M 20 20 C 60 18, 90 22, 100 28 L 100 135 C 90 128, 60 125, 20 127 Z" />
          {/* Right page */}
          <path d="M 180 20 C 140 18, 110 22, 100 28 L 100 135 C 110 128, 140 125, 180 127 Z" />
          {/* Ruled lines */}
          <line x1="32" y1="44" x2="88" y2="45" strokeDasharray="2 3" />
          <line x1="32" y1="62" x2="88" y2="63" strokeDasharray="2 3" />
          <line x1="32" y1="80" x2="88" y2="81" strokeDasharray="2 3" />
          <line x1="32" y1="98" x2="88" y2="99" strokeDasharray="2 3" />
          <line x1="112" y1="45" x2="168" y2="44" strokeDasharray="2 3" />
          <line x1="112" y1="63" x2="168" y2="62" strokeDasharray="2 3" />
          <line x1="112" y1="81" x2="168" y2="80" strokeDasharray="2 3" />
          <line x1="112" y1="99" x2="168" y2="98" strokeDasharray="2 3" />
        </svg>
      </div>

      {/* Watermarked Study Desk Motif 2: Drafting Compass & Geometry Arc (Bottom-Left) */}
      <div className="absolute bottom-[8%] left-[4%] w-56 h-56 text-[#4A6B5D] animate-breathe-offset will-change-transform">
        <svg viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="1">
          <line x1="80" y1="20" x2="35" y2="135" />
          <line x1="80" y1="20" x2="125" y2="135" />
          <circle cx="80" cy="20" r="6" />
          <circle cx="80" cy="20" r="2.5" fill="currentColor" />
          <path d="M 45 110 A 55 55 0 0 1 115 110" strokeDasharray="2 2" />
        </svg>
      </div>

      {/* Watermarked Study Desk Motif 3: Mathematical Integrals & Sigma (Mid-Left) */}
      <div className="absolute top-[35%] left-[3%] w-44 h-40 text-[#1B2A47] animate-breathe-slow will-change-transform">
        <svg viewBox="0 0 120 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="20" y="10" width="70" height="85" rx="2" strokeDasharray="3 3" />
          <text
            x="32"
            y="55"
            fontSize="26"
            fontFamily="serif"
            fill="currentColor"
            stroke="none"
          >
            ∫
          </text>
          <text
            x="50"
            y="50"
            fontSize="12"
            fontFamily="serif"
            fill="currentColor"
            stroke="none"
          >
            f(x) dx
          </text>
          <text
            x="35"
            y="80"
            fontSize="18"
            fontFamily="serif"
            fill="currentColor"
            stroke="none"
          >
            ∑ a_n
          </text>
        </svg>
      </div>

      {/* Watermarked Study Desk Motif 4: Drafting Scale Ruler (Bottom-Right) */}
      <div className="absolute bottom-[6%] right-[6%] w-64 h-24 text-[#8C6D3F] animate-breathe-offset will-change-transform">
        <svg viewBox="0 0 180 60" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="5" y="25" width="170" height="24" rx="2" />
          {[15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165].map((x, i) => (
            <line
              key={x}
              x1={x}
              y1={25}
              x2={x}
              y2={i % 2 === 0 ? 38 : 32}
            />
          ))}
          <text
            x="145"
            y="18"
            fontSize="18"
            fontFamily="serif"
            fill="currentColor"
            stroke="none"
          >
            Δ
          </text>
        </svg>
      </div>
    </div>
  );
}
