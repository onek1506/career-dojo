// ============================================================
// Micro-lesson engine — data-driven, one-concept-per-slide.
// Reuses the income-statement "is-" design system and Marcus voice,
// but renders entirely from a MicroLessonData object so new lessons
// are authored as data, not as bespoke React components.
// ============================================================

export type QuizResult = {
  correct: boolean;
  attempts: number; // 1 = first try, 2 = second try
  xpEarned: number;
  countsForStreak: boolean; // true only when correct AND attempts === 1
};

export interface MarcusBlock {
  subject?: string;
  body: string;
}

// --- Slide variants ------------------------------------------------------

export interface HookSlide {
  kind: 'hook';
  module: string; // "MODUL 01 · ACCOUNTING"
  title: string; // serif headline
  subtitle?: string;
  marcus: MarcusBlock;
  stats: { duration: string; xp: string; difficulty: string };
  outcomes: string[];
}

export interface ConceptSlide {
  kind: 'concept';
  eyebrow?: string; // small mono uppercase label
  heading: string; // serif
  paragraphs: string[]; // sans body; supports **bold**
  mono?: string; // optional monospace block (e.g. the P&L staircase)
  marcus?: MarcusBlock;
}

export interface MiniCheckSlide {
  kind: 'minicheck';
  id: string; // unique quiz key within the lesson
  prompt: string; // question (serif)
  options: string[];
  correctIndex: number;
  solution: string; // shown after submitting (the "Rechenweg")
  marcusCorrect: string;
  marcusWrong: string; // hint shown after the first wrong attempt
  baseXp?: number; // default 10
}

export interface SummarySlide {
  kind: 'summary';
  eyebrow?: string;
  heading: string;
  points: string[]; // bullet lines; supports **bold**
  formula?: string; // optional accent formula box
  marcus?: MarcusBlock;
}

export interface RetentionSlide {
  kind: 'retention';
  doneLabel: string; // "Lektion 01 abgeschlossen."
  marcus: MarcusBlock;
  next?: { tag?: string; title: string; meta: string };
}

export type MicroSlide =
  | HookSlide
  | ConceptSlide
  | MiniCheckSlide
  | SummarySlide
  | RetentionSlide;

// --- Lesson container ----------------------------------------------------

export interface MicroLessonData {
  id: string; // must match the ib-content lesson id + the /lesson/<id> route
  module: string; // side-panel module label
  titleDe: string; // side-panel lesson title
  nextPath: string; // route pushed from the retention hub's "next" CTA
  slides: MicroSlide[];
}

export interface MicroRetentionResults {
  totalXp: number;
  accuracy: number;
  elapsedSeconds: number;
  correctCount: number;
  totalCount: number;
}
