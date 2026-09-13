export type MaterialType = 'pdf' | 'docx' | 'pptx' | 'text';

export interface UploadedStudyMaterial {
  id: string;
  name: string;
  size: number;
  type: MaterialType;
  content: string;
  status: 'ready' | 'processing' | 'error';
  wordCount: number;
  pageCount: number;
  charCount: number;
  errorMessage?: string;
}

export interface ExtractionStats {
  filesUploaded: number;
  pagesProcessed: number;
  charactersExtracted: number;
  wordsExtracted: number;
}

export type OutputMode = 'quick_summary' | 'revision_notes';

export interface QuickSummaryOutput {
  mainTopic: string;
  summary: string;
  coreConcepts: string[];
  keyTakeaways: string[];
  importantDefinitions: {
    term: string;
    definition: string;
  }[];
  importantFormulas?: {
    name: string;
    formula: string;
    explanation?: string;
  }[];
}

export interface RevisionSubtopic {
  subheading: string;
  keyPoints: string[];
  concepts?: string[];
  definitions?: {
    term: string;
    definition: string;
  }[];
  formulas?: {
    name: string;
    formula: string;
  }[];
}

export interface RevisionSection {
  heading: string;
  subtopics: RevisionSubtopic[];
  examOrientedNotes: string[];
}

export interface RevisionNotesOutput {
  title: string;
  subjectOrTopic: string;
  sections: RevisionSection[];
  quickExamTips: string[];
}

export interface StructuredOutput {
  id: string;
  mode: OutputMode;
  createdAt: string;
  materials: {
    name: string;
    type: MaterialType;
    wordCount: number;
    pageCount: number;
    charCount: number;
  }[];
  stats: ExtractionStats;
  quickSummary?: QuickSummaryOutput;
  revisionNotes?: RevisionNotesOutput;
  rawMarkdown?: string;
}

export interface ProcessingLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export type WorkflowStep = 'upload' | 'analyzed' | 'output';
