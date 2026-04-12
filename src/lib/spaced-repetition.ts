// ============================================================
// CareerDojo — Spaced Repetition (real SM-2 algorithm)
// ============================================================
// Full SuperMemo-2 implementation with quality ratings 0–5.
// Anki-style 4-button interface maps to: Again(0), Hard(3),
// Good(4), Easy(5).
// ============================================================

export interface ReviewCard {
  questionId: string;
  lessonId: string;        // kept for track-based filtering
  nextReview: number;      // unix timestamp ms
  interval: number;        // days until next review
  easeFactor: number;      // EF, clamped to [1.3, ∞)
  repetitions: number;     // consecutive correct streak
  lastQuality: number;     // last quality grade 0-5
  lastReviewed: number;    // unix timestamp ms
}

/** SM-2 quality grades */
export type Quality = 0 | 1 | 2 | 3 | 4 | 5;

/** Anki-style button → SM-2 quality mapping */
export const QUALITY_AGAIN = 0 as Quality;
export const QUALITY_HARD  = 3 as Quality;
export const QUALITY_GOOD  = 4 as Quality;
export const QUALITY_EASY  = 5 as Quality;

const ONE_MINUTE_MS = 60 * 1000;
const ONE_DAY_MS    = 24 * 60 * 60 * 1000;
const MIN_EASE      = 1.3;
const DEFAULT_EASE  = 2.5;

// ============================================================
// Core SM-2 function
// ============================================================

/**
 * Apply the SM-2 algorithm to a review card with a given quality
 * rating (0-5). Returns an updated card with new interval,
 * ease factor, repetitions, and nextReview timestamp.
 *
 * SM-2 rules:
 *   q < 3 → repetitions = 0, interval = 1 day (re-learn)
 *   q >= 3:
 *     rep 0 → interval = 1 day
 *     rep 1 → interval = 6 days
 *     rep 2+ → interval = prev_interval * EF
 *   EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
 *   EF clamped to minimum 1.3
 */
export function sm2(card: ReviewCard, quality: Quality): ReviewCard {
  const now = Date.now();
  const q = quality;

  // New ease factor (SM-2 formula)
  const efDelta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  const newEase = Math.max(MIN_EASE, card.easeFactor + efDelta);

  let newInterval: number;
  let newReps: number;

  if (q < 3) {
    // Failed — reset to learning phase
    newReps = 0;
    // "Again" cards come back in 1 minute, then 10 minutes
    newInterval = 0; // special: sub-day interval handled below
    const nextMs = now + ONE_MINUTE_MS; // 1 minute for first re-learn
    return {
      ...card,
      interval: newInterval,
      easeFactor: newEase,
      repetitions: newReps,
      lastQuality: q,
      lastReviewed: now,
      nextReview: nextMs,
    };
  }

  // Passed (q >= 3)
  newReps = card.repetitions + 1;

  if (newReps === 1) {
    newInterval = 1;
  } else if (newReps === 2) {
    newInterval = 6;
  } else {
    newInterval = Math.max(1, Math.round(card.interval * newEase));
  }

  // Hard penalty: interval * 1.2 instead of full EF (like Anki)
  if (q === 3 && newReps >= 3) {
    newInterval = Math.max(1, Math.round(card.interval * 1.2));
  }

  // Easy bonus: interval * EF * 1.3 (like Anki)
  if (q === 5 && newReps >= 3) {
    newInterval = Math.max(1, Math.round(card.interval * newEase * 1.3));
  }

  return {
    ...card,
    interval: newInterval,
    easeFactor: newEase,
    repetitions: newReps,
    lastQuality: q,
    lastReviewed: now,
    nextReview: now + newInterval * ONE_DAY_MS,
  };
}

// ============================================================
// Interval label preview — shown on the 4 buttons
// ============================================================

/**
 * Compute what the interval WOULD be if the user picks a given
 * quality, and return a human-readable label.
 *
 * Examples: "1m", "10m", "1d", "6d", "2w", "1mo", "3mo"
 */
export function getIntervalLabel(card: ReviewCard, quality: Quality): string {
  const q = quality;

  if (q < 3) {
    // Again → 1 minute
    return '1m';
  }

  const efDelta = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02);
  const newEase = Math.max(MIN_EASE, card.easeFactor + efDelta);
  const newReps = card.repetitions + 1;

  let days: number;

  if (newReps === 1) {
    days = 1;
  } else if (newReps === 2) {
    days = 6;
  } else {
    days = Math.max(1, Math.round(card.interval * newEase));
  }

  // Hard penalty
  if (q === 3 && newReps >= 3) {
    days = Math.max(1, Math.round(card.interval * 1.2));
  }

  // Easy bonus
  if (q === 5 && newReps >= 3) {
    days = Math.max(1, Math.round(card.interval * newEase * 1.3));
  }

  return formatDays(days);
}

function formatDays(days: number): string {
  if (days < 1) return '<1d';
  if (days === 1) return '1d';
  if (days < 7) return `${days}d`;
  if (days < 30) {
    const weeks = Math.round(days / 7);
    return `${weeks}w`;
  }
  if (days < 365) {
    const months = Math.round(days / 30);
    return `${months}mo`;
  }
  const years = (days / 365).toFixed(1);
  return `${years}y`;
}

// ============================================================
// Create a brand-new review card
// ============================================================

/**
 * Create a fresh ReviewCard for a question the user just
 * encountered. If wrong, schedule for 1 minute (re-learn).
 * If correct, schedule for 1 day.
 */
export function createReviewCard(
  questionId: string,
  lessonId: string,
  correct: boolean,
): ReviewCard {
  const now = Date.now();
  if (correct) {
    return {
      questionId,
      lessonId,
      nextReview: now + ONE_DAY_MS,
      interval: 1,
      easeFactor: DEFAULT_EASE,
      repetitions: 1,
      lastQuality: 4, // "Good"
      lastReviewed: now,
    };
  }
  return {
    questionId,
    lessonId,
    nextReview: now + ONE_MINUTE_MS, // 1 minute for wrong answers
    interval: 0,
    easeFactor: DEFAULT_EASE,
    repetitions: 0,
    lastQuality: 0, // "Again"
    lastReviewed: now,
  };
}

// ============================================================
// Queries
// ============================================================

/**
 * Return all cards whose nextReview timestamp is in the past.
 * Optionally filter by a set of lessonIds (for track-specific review).
 */
export function getDueCards(
  cards: ReviewCard[],
  lessonIds?: Set<string>,
): ReviewCard[] {
  const now = Date.now();
  return cards.filter((c) => {
    if (c.nextReview > now) return false;
    if (lessonIds && !lessonIds.has(c.lessonId)) return false;
    return true;
  });
}

/** Sort due cards by how overdue they are (most overdue first). */
export function sortByDueness(cards: ReviewCard[]): ReviewCard[] {
  return [...cards].sort((a, b) => a.nextReview - b.nextReview);
}

/** Upsert a card — replace by questionId or append. */
export function upsertCard(
  cards: ReviewCard[],
  updated: ReviewCard,
): ReviewCard[] {
  const idx = cards.findIndex((c) => c.questionId === updated.questionId);
  if (idx === -1) return [...cards, updated];
  const copy = [...cards];
  copy[idx] = updated;
  return copy;
}
