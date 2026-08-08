// ============================================================
// Spaced-repetition config — the ONE place to tune interval ladders,
// the wrong-answer reset, and recall hardness per category, without
// touching engine code. See docs/langzeit-layer-etappe1.md.
// ============================================================

import type { EntryCategory } from '../onboarding/profile';

export type MasteryCategory = 'k1' | 'k2' | 'k3';

/** k4 (and any missing/unset category) falls back to the neutral middle. */
export function toMasteryCategory(entryCategory: EntryCategory | string | null | undefined): MasteryCategory {
  if (entryCategory === 'k1' || entryCategory === 'k2' || entryCategory === 'k3') return entryCategory;
  return 'k2';
}

/**
 * Days to wait before a concept becomes due again, indexed by the NEW
 * interval_stage (1-5) reached after a correct answer. Stage 0 is "never
 * answered correctly yet" and has no interval of its own. Stage 5 is the
 * maintenance ceiling — further correct answers keep re-applying it
 * rather than growing the interval further.
 */
export const INTERVAL_STAGE_DAYS: Record<MasteryCategory, number[]> = {
  // index 0 unused (stage 0 has no "days"); index 1..5 = stage 1..5
  k1: [0, 3, 7, 21, 42, 90], // 3d → 1w → 3w → 6w → 3mo
  k2: [0, 2, 5, 14, 28, 56], // 2d → 5d → 2w → 4w → 8w
  k3: [0, 1, 3, 7, 14, 28], // 1d → 3d → 1w → 2w → 4w
};

export const MAX_STAGE = 5;

/** Wrong answer: same next-day reset for every category (per explicit override). */
export const WRONG_RESET_DAYS = 1;

/** "Halb" self-rating on a recall slide: stage stays put, short re-check. */
export const PARTIAL_RECHECK_DAYS = 2;

export type RecallHardness = 'supported' | 'free' | 'bare';

/** K1 gets a hint rendered; K2/K3 never see one, even if the slide has one. */
export const RECALL_HARDNESS: Record<MasteryCategory, RecallHardness> = {
  k1: 'supported',
  k2: 'free',
  k3: 'bare',
};

export function daysForStage(category: MasteryCategory, stage: number): number {
  const table = INTERVAL_STAGE_DAYS[category];
  return table[Math.min(Math.max(stage, 1), MAX_STAGE)];
}
