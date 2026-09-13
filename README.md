# SturdyNerdy

> **Academic‑Journal‑styled AI notebook** – a production‑ready, hackathon‑winning web app built with Next.js, React, TailwindCSS, and TypeScript.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Running Locally](#running-locally)
- [Production Build & Deployment](#production-build--deployment)
- [License](#license)

## Demo
- **Live URL**: https://sturdynerdy.vercel.app/  *(make sure the Vercel project is linked to this repo – see deployment section)*
- The **Journal badge** has been removed, and the layout uses tighter vertical spacing for a cleaner look.

## Features
- **Academic‑Journal UI** – mimics a scholarly article with sections, headings, and KaTeX‑rendered formulas.
- **Multi‑tab notebook** – Summary, Derivations, Formula Rulebook, and Sticky Exam Traps.
- **PDF/Docx/PPTX extraction engine** – ingest documents and surface structured notes.
- **Live debug logs** – real‑time debugging information displayed in the UI.
- **Responsive & Accessible** – Tailwind utilities ensure mobile‑first design.
- **Built‑in print styling** – enables PDF export of notebook pages.

## Tech Stack
| Layer | Tool |
|-------|------|
| Framework | **Next.js 14** (latest) |
| Language | **TypeScript** |
| UI | **React**, **TailwindCSS**, **lucide‑react** |
| Math Rendering | **KaTeX** via custom `MathRenderer` component |
| Document Parsing | **pdf‑js**, **docx**, **pptx** libraries |
| Deployment | **Vercel** (git‑connected) |
| Version Control | **GitHub** |

## Getting Started
1. **Clone the repo**
   ```bash
   git clone https://github.com/pariporwal27/sturdynerdy.git
   cd sturdynerdy
   ```
2. **Install dependencies** (requires Node ≥18)
   ```bash
   npm ci   # or `npm install`
   ```
3. **Set up environment variables** (if you add API keys for PDF/Docx parsing)
   - Create a `.env.local` file based on `.env.example`.
   - Example:
   ```
   NEXT_PUBLIC_ANALYTICS_ID=your‑id
   ```

## Running Locally
```bash
npm run dev   # starts on http://localhost:3001 (port 3000 may be busy)
```
- The app hot‑reloads on changes.
- Verify that the **NotebookPreviewShowcase** component displays correctly (no “Journal” badge, tighter spacing).

## Production Build & Deployment
1. **Upgrade dependencies** (already done in the repo):
   ```bash
   npm install next@latest react@latest react-dom@latest
   ```
2. **Build**
   ```bash
   npm run build   # should succeed without JSX errors
   ```
3. **Deploy to Vercel**
   - Create a Vercel project (or use the existing `sturdynerdy` project).
   - Link the GitHub repo under **Git Integration** → **Connect Repository** → select `pariporwal27/sturdynerdy` (branch `main`).
   - Vercel will run `npm run build` automatically and publish to `https://sturdynerdy.vercel.app/`.
   - If you have a custom domain, point it to the Vercel deployment.

## License
This project is licensed under the **MIT License** – feel free to use, modify, and distribute.

---
*Built with ❤️ for the 2026 Hackathon.*
