# SturdyNerdy — From lecture chaos to study clarity.

> A calm, modern study workspace that helps students transform cluttered study materials into clear, structured understanding. Ingest multiple materials across PDF, DOCX, and PPTX formats, analyze their core concepts, and produce either an authoritative **One-Glance Summary** or a comprehensive **Revision Guide** with print-ready **PDF Export**.

---

## 1. Brand Positioning & Core Workflow

SturdyNerdy is intentionally built around a **single, disciplined academic workflow**:

```
Upload multiple study materials
(PDF, DOCX, PPTX)
           ↓
    AI analyzes content
           ↓
    User chooses:
    • One-Glance Summary
      OR
    • Revision Notes
           ↓
Generate structured output
           ↓
     Export as PDF
```

### Brand Tone
- **Smart but approachable**
- **Academic but not boring**
- **Professional but not corporate**
- **Helpful without sounding like a chatbot**

---

## 2. Key Features

- **Multi-Material Ingestion**: Upload `.pdf`, `.docx`, `.pptx`, `.txt`, and `.md` files together with drag-and-drop queue management and size validation.
- **Pre-Loaded Sample Bundles**: One-click ingestion of multi-format university packages (MIT 6.006 Algorithms & Stanford CS229 Machine Learning) for rapid testing.
- **Two Distinct Synthesis Modes**:
  1. **One-Glance Summary**: Executive thesis, 5 critical high-yield takeaways, core mathematical formulas, quick comparison reference matrix, common exam pitfalls, and 5-minute pre-exam review checklist.
  2. **Revision Notes**: Unit-by-unit curriculum breakdown, formal theoretical definitions with LaTeX math, step-by-step mathematical proofs/derivations, and memory mnemonics.
- **Export as PDF**: Dedicated `@media print` CSS engine formats the structured notes into a publication-ready academic document with clean margins, proper page breaks, and zero UI clutter.
- **Zero Hardcoded Mock Output**: Content is analyzed and generated dynamically from your actual uploaded files.

---

## 3. Local Setup Instructions

### Prerequisites
- Node.js 18.18+ or 20+ (Tested on Node.js 24)
- npm 9+

### Quick Start
1. Navigate to the project directory:
   ```bash
   cd sturdynerdy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local`:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Access the live interface at [http://localhost:3000](http://localhost:3000) (or [http://localhost:3001](http://localhost:3001)).

---

## 4. Build Verification

To verify production readiness:
```bash
npm run build
```
This compiles TypeScript, executes Next.js static analysis, and builds optimized serverless handlers with **0 errors and 0 warnings**.

---

## 5. Vercel Deployment

1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: initial SturdyNerdy release"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/new), import the repository.
3. Keep default settings:
   - Framework: **Next.js**
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Under **Environment Variables**, add `GEMINI_API_KEY`.
5. Click **Deploy**. Your application will be live in ~45 seconds.
