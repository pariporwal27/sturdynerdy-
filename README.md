# SturdyNerdy

From lecture chaos to study clarity.

SturdyNerdy is an AI-powered student workspace that transforms scattered academic materials into structured summaries and exam-ready revision notes. Students can upload multiple study resources, and the system automatically analyzes the content to generate concise, easy-to-revise learning material.

Built for PromptWars Community 2026 under the AI Productivity & Automation challenge.

---

## Problem Statement

Students often manage information across lecture slides, handouts, notes, textbooks, and reference documents. Reviewing and organizing these materials before exams is time-consuming and inefficient.

SturdyNerdy simplifies this process by automatically extracting content from uploaded academic resources and generating structured summaries or revision notes tailored for quick learning and exam preparation.

---

## Key Features

### Multi-Format Document Support

Upload one or more files in:

- PDF
- DOCX
- PPTX

The system combines information from multiple sources into a unified study workspace.

### Quick Summary Mode

Generates:

- Main Topic
- Key Concepts
- Important Definitions
- Critical Takeaways
- Important Formulas (when available)

Ideal for rapid understanding of a topic.

### Revision Notes Mode

Creates exam-focused notes with:

- Structured Headings
- Subtopics
- Key Concepts
- Definitions
- Formula Sections
- Important Revision Points

Designed specifically for last-minute revision.

### AI-Powered Content Generation

Uses Google Gemini to analyze uploaded academic content and generate outputs based entirely on the provided material.

No pre-generated notes or placeholder content are used.

### Interactive Study Workspace

- Academic journal-inspired interface
- Responsive design
- Smooth animations and transitions
- Clean reading experience
- Print-friendly notebook layout

### Export & Print Ready

Generated notes are formatted for easy printing and PDF export.

---

## How It Works

### Step 1 – Upload Study Materials

Students upload:

- Lecture Slides
- Course Handouts
- Notes
- Academic Documents

### Step 2 – Content Extraction

The application:

- Reads uploaded files
- Extracts textual content
- Merges information from multiple resources

### Step 3 – AI Analysis

Google Gemini identifies:

- Topics
- Concepts
- Definitions
- Relationships between ideas
- Important academic content

### Step 4 – Generate Study Material

Choose between:

#### Summary Mode

Provides a concise overview of the content.

#### Revision Notes Mode

Produces structured notes optimized for exam preparation.

---

## System Architecture

```text
User Uploads Files
        │
        ▼
Document Processing Layer
(PDF / DOCX / PPTX)
        │
        ▼
Text Extraction
        │
        ▼
Google Gemini API
        │
        ▼
Summary / Notes Generation
        │
        ▼
Interactive Study Workspace
```

## Tech Stack

| Layer | Technology |
|---------|------------|
| Framework | Next.js 14 |
| Language | TypeScript |
| UI | React, TailwindCSS |
| AI | Google Gemini API |
| Document Processing | PDF, DOCX, PPTX Parsing |
| Deployment | Vercel |
| Version Control | GitHub |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/pariporwal27/sturdynerdy.git

cd sturdynerdy
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

---

## Environment Variables

Create a `.env.local` file:

```env
GEMINI_API_KEY=your_api_key
GEMINI_MODEL=gemini-2.5-flash
```

---

## Deployment

The project is deployed using Vercel.

Production URL:

https://sturdynerdy.vercel.app/

To deploy:

```bash
npm run build
```

Configure environment variables in Vercel:

```env
GEMINI_API_KEY
GEMINI_MODEL
```

Deploy through GitHub integration or the Vercel dashboard.

---

## Accessibility

- Semantic HTML
- Keyboard Navigation
- Responsive Layouts
- Accessible Color Contrast
- Screen Reader Friendly Labels

---

## Security

- Environment Variable Protection
- File Type Validation
- File Size Validation
- Secure API Communication
- No Hardcoded Secrets

---

## Future Enhancements

- AI Quiz Generation
- Flashcards
- Personalized Study Plans
- Multi-Language Support
- Collaborative Study Sessions

---

## Hackathon Submission

Challenge:

AI-Powered Student Workspace

Theme:

AI Productivity & Automation

Workflow:

```text
Study Materials
      ↓
AI Analysis
      ↓
Summary / Revision Notes
      ↓
Faster Learning & Exam Preparation
```

---

## Developed For

PromptWars Community 2026

Android Club, VIT Bhopal

Google for Developers × Hack2Skill

---

SturdyNerdy

From lecture chaos to study clarity.
