import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: "#FCFAF6",
          100: "#FBF9F4",
          200: "#F5F2E9",
          300: "#ECE7DA",
          400: "#DDD6C3",
          500: "#C4BAA3",
        },
        desk: {
          paper: "#FBF9F4",
          surface: "#FFFFFF",
          card: "#FAF8F2",
          border: "#EAE5D9",
          "border-dark": "#D8D1C0",
        },
        navy: {
          light: "#EAEFF7",
          DEFAULT: "#1B2A47",
          dark: "#121C30",
          muted: "#354A6B",
        },
        slate: {
          DEFAULT: "#2C3E50",
          muted: "#5A6B7C",
        },
        sage: {
          light: "#EFF5F1",
          DEFAULT: "#4A6B5D",
          dark: "#365045",
          border: "#D0DFD6",
        },
        ochre: {
          light: "#FDF8F0",
          DEFAULT: "#8C6D3F",
          dark: "#684E27",
          border: "#EADBCA",
        },
        ink: {
          50: "#F0F2F5",
          100: "#D9DDE3",
          200: "#B3BAC5",
          300: "#808D9F",
          400: "#5A6B7D",
          500: "#3D4E60",
          600: "#2B3A4C",
          700: "#212D3B",
          800: "#1A232E",
          900: "#0F161E",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "Space Grotesk", "-apple-system", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        desk: "0 1px 3px rgba(0, 0, 0, 0.03), 0 2px 8px rgba(27, 42, 71, 0.04)",
        "desk-card": "0 2px 10px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.02)",
        "desk-elevated": "0 8px 24px rgba(27, 42, 71, 0.06), 0 2px 6px rgba(0, 0, 0, 0.03)",
        sheet: "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(27, 42, 71, 0.05)",
      },
      animation: {
        'breathe-slow': 'breathe 22s ease-in-out infinite alternate',
        'breathe-offset': 'breatheOffset 26s ease-in-out infinite alternate',
      },
      keyframes: {
        breathe: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0.04' },
          '100%': { transform: 'translate3d(0, -8px, 0)', opacity: '0.065' },
        },
        breatheOffset: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0.05' },
          '100%': { transform: 'translate3d(0, 6px, 0)', opacity: '0.035' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
