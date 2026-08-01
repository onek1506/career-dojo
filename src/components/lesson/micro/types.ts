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
}

export interface ConceptSlide {
  kind: 'concept';
  eyebrow?: string; // small mono uppercase label
  heading: string; // serif
  paragraphs: string[]; // sans body; supports **bold**
  mono?: string; // optional monospace block (e.g. the P&L staircase)
  marcus?: MarcusBlock;
}

export interface MiniCheckContent {
  prompt: string; // question (serif)
  options: string[];
  correctIndex: number;
  solution: string; // shown after submitting (the "Rechenweg")
}

export interface MiniCheckSlide {
  kind: 'minicheck';
  id: string; // unique quiz key within the lesson
  // Static question…
  prompt?: string;
  options?: string[];
  correctIndex?: number;
  solution?: string;
  // …or a generator for randomized, transfer-style questions (new numbers
  // each mount, computed answer + distractors). Wins over the static fields.
  generate?: () => MiniCheckContent;
  // Optional coaching note. Omitted for transfer questions, where the
  // learner is expected to reason without a hand-hold.
  marcusCorrect?: string;
  marcusWrong?: string;
  baseXp?: number; // default 10
  // Speed-run diagnosis (K3+): if answered correctly on the FIRST attempt,
  // jump straight to this slide index instead of the next slide — skips
  // the compact refresher section for learners who already know the topic.
  // Any wrong or second-try-correct answer falls through to the refresher
  // as normal. Index is 0-based into the lesson's `slides` array.
  skipIfCorrectToIndex?: number;
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
  // Weak-area topic tag (K2+): quiz results are recorded per topic in a
  // category-independent store so later categories can read the profile.
  topicTag?: string;
  slides: MicroSlide[];
}

export interface MicroRetentionResults {
  totalXp: number;
  accuracy: number;
  elapsedSeconds: number;
  correctCount: number;
  totalCount: number;
}
