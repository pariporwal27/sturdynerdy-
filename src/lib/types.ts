export type MaterialType = 'pdf' | 'docx' | 'pptx' | 'text';

export interface UploadedStudyMaterial {
  id: string;
  name: string;
  size: number;
  type: MaterialType;
  content: string;
  status: 'ready' | 'processing' | 'error';
  wordCount: number;
  pageCount?: number;
  errorMessage?: string;
  isSample?: boolean;
}

export interface AnalysisOverview {
  totalMaterials: number;
  totalWords: number;
  estimatedReadingTimeMinutes: number;
  identifiedSubject: string;
  academicLevel: string;
  coreThemes: string[];
  detectedFormulasCount: number;
}

export type OutputMode = 'one_glance_summary' | 'revision_notes';

export interface OneGlanceSummary {
  title: string;
  executiveThesis: string;
  highYieldTakeaways: string[];
  coreFormulasAndDefinitions: {
    termOrLaw: string;
    formulaOrRule: string;
    context: string;
  }[];
  quickComparisonTable: {
    title: string;
    headers: string[];
    rows: string[][];
  };
  criticalExamPitfalls: string[];
  fiveMinuteReviewChecklist: string[];
}

export interface RevisionUnit {
  unitNumber: number;
  unitTitle: string;
  formalDefinitions: {
    term: string;
    definition: string;
    latexFormula?: string;
  }[];
  inDepthExplanation: string;
  stepByStepDerivations?: {
    title: string;
    steps: string[];
    conclusion: string;
    latex?: string;
  }[];
  commonMisconceptions: string[];
  highYieldExamTips: string[];
}

export interface RevisionNotes {
  title: string;
  courseOrSubject: string;
  overview: string;
  units: RevisionUnit[];
  formulaSheet: {
    name: string;
    latex: string;
    explanation: string;
    variables: string[];
  }[];
  memoryAidsAndMnemonics: {
    title: string;
    mnemonic: string;
    description: string;
  }[];
}

export interface StructuredOutput {
  id: string;
  mode: OutputMode;
  createdAt: string;
  materials: { name: string; type: MaterialType; wordCount: number }[];
  oneGlance?: OneGlanceSummary;
  revisionNotes?: RevisionNotes;
}

export type WorkflowStep = 'upload' | 'analyzed' | 'output';
