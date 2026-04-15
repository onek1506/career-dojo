// CareerDojo — Content Types & Level Progression
// Zero track data lives here. Anything that only needs types or XP-level math
// should import from this file directly instead of `./content`, to avoid
// pulling all four tracks' lesson data into the bundle.

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  titleDe: string;
  type: 'lesson' | 'quiz' | 'calculation';
  difficulty: Difficulty;
  xpReward: number;
  estimatedMinutes: number;
  content: LessonContent;
  quiz: QuizQuestion[];
}

export interface LessonContent {
  sections: ContentSection[];
}

export interface ContentSection {
  heading: string;
  headingDe: string;
  body: string;
  bodyDe: string;
  keyTakeaway?: string;
  keyTakeawayDe?: string;
  formula?: string;
  example?: string;
  exampleDe?: string;
  tip?: string;
  tipDe?: string;
  // Detailed example — hidden by default, revealed on button click
  detailedExample?: string;
  detailedExampleDe?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionDe: string;
  type: 'multiple_choice' | 'true_false' | 'calculation' | 'fill_blank';
  options?: { text: string; textDe: string }[];
  correctAnswer: number | string;
  explanation: string;
  explanationDe: string;
  difficulty: Difficulty;
  xpReward: number;
}

export interface Unit {
  id: string;
  title: string;
  titleDe: string;
  description: string;
  descriptionDe: string;
  icon: string;
  difficulty: Difficulty;
  order: number;
  lessons: Lesson[];
  requiredXp: number;
  color: string;
}

export interface Track {
  id: string;
  title: string;
  titleDe: string;
  description: string;
  descriptionDe: string;
  units: Unit[];
}

// ============================================================
// LEVEL THRESHOLDS — HARD to reach, like real finance career progression
// ============================================================

export const LEVEL_THRESHOLDS = [
  { level: 1, xpRequired: 0, title: 'Analyst Intern', titleDe: 'Praktikant', emoji: '📋' },
  { level: 2, xpRequired: 100, title: 'Junior Analyst', titleDe: 'Junior Analyst', emoji: '📊' },
  { level: 3, xpRequired: 350, title: 'Analyst', titleDe: 'Analyst', emoji: '💼' },
  { level: 4, xpRequired: 750, title: 'Senior Analyst', titleDe: 'Senior Analyst', emoji: '📈' },
  { level: 5, xpRequired: 1500, title: 'Associate', titleDe: 'Associate', emoji: '🎯' },
  { level: 6, xpRequired: 2500, title: 'Senior Associate', titleDe: 'Senior Associate', emoji: '⚡' },
  { level: 7, xpRequired: 4000, title: 'Vice President', titleDe: 'Vice President', emoji: '🏆' },
  { level: 8, xpRequired: 6500, title: 'Director', titleDe: 'Director', emoji: '👔' },
  { level: 9, xpRequired: 10000, title: 'Managing Director', titleDe: 'Managing Director', emoji: '🦁' },
  { level: 10, xpRequired: 15000, title: 'Partner', titleDe: 'Partner', emoji: '👑' },
];

export function getLevelForXp(xp: number) {
  let current = LEVEL_THRESHOLDS[0];
  for (const threshold of LEVEL_THRESHOLDS) {
    if (xp >= threshold.xpRequired) {
      current = threshold;
    } else {
      break;
    }
  }
  const nextLevel = LEVEL_THRESHOLDS.find(t => t.xpRequired > xp);
  return {
    ...current,
    nextLevel,
    progressToNext: nextLevel
      ? (xp - current.xpRequired) / (nextLevel.xpRequired - current.xpRequired)
      : 1,
  };
}
