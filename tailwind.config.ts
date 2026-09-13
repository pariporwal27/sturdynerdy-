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
          DEFAULT: "#FAF8F3",
          light: "#FDFCF9",
          muted: "#F5F1E6",
          border: "#E8E2D2",
          dark: "#DBD3BE",
        },
        navy: {
          DEFAULT: "#1B2A47",
          dark: "#101B2E",
          deep: "#0B1320",
          light: "#EBF0F8",
          muted: "#354A6B",
        },
        sage: {
          DEFAULT: "#4A6B5D",
          dark: "#344D42",
          light: "#EFF5F1",
          border: "#CFDDD5",
        },
        gold: {
          DEFAULT: "#C5A059",
          dark: "#8C6D3F",
          light: "#FDF8EE",
          border: "#E9D8B4",
        },
        ink: {
          900: "#121C2B",
          800: "#1E2D42",
          700: "#2D3E56",
          600: "#455770",
          500: "#60728B",
          400: "#8595AB",
          300: "#B0BDCE",
          200: "#D6DFEB",
          100: "#EDF2F8",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif-display)", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        desk: "0 2px 10px rgba(18, 28, 43, 0.04), 0 1px 2px rgba(18, 28, 43, 0.02)",
        "desk-elevated": "0 14px 40px rgba(18, 28, 43, 0.09), 0 3px 10px rgba(18, 28, 43, 0.03)",
        journal: "0 10px 35px rgba(18, 28, 43, 0.08), 0 2px 6px rgba(18, 28, 43, 0.03)",
        tray: "inset 0 2px 6px rgba(18, 28, 43, 0.04), 0 4px 20px rgba(18, 28, 43, 0.04)",
        sticky: "0 6px 16px rgba(18, 28, 43, 0.07), 0 1px 3px rgba(18, 28, 43, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
