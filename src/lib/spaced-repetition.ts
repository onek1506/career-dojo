// ============================================================
// CareerDojo — Spaced Repetition (simplified SM-2)
// ============================================================
// Classic SuperMemo-2 variant adapted for binary correct/wrong
// grading. Each question becomes a ReviewCard with an ease
// factor and growing interval that only resets on wrong answers.
// ============================================================

export interface ReviewCard {
  questionId: string;
  lessonId: string;
  nextReview: number; // unix timestamp in ms
  interval: number; // days until next review
  easeFactor: number; // multiplier, clamped to [1.3, 2.5]
  repetitions: number; // streak of consecutive correct answers
  lastResult: 'correct' | 'wrong';
  lastReviewed: number; // unix timestamp in ms
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const MIN_EASE = 1.3;
const MAX_EASE = 2.5;
const DEFAULT_EASE = 2.0;

/**
 * Create a brand-new review card for a question that the user
 * has just encountered for the first time. If they got it right,
 * schedule it for 1 day; if wrong, schedule it for later today
 * (5 minutes) so they see it again within the session.
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
      lastResult: 'correct',
      lastReviewed: now,
    };
  }
  return {
    questionId,
    lessonId,
    nextReview: now + 5 * 60 * 1000, // 5 minutes
    interval: 0,
    easeFactor: DEFAULT_EASE - 0.2,
    repetitions: 0,
    lastResult: 'wrong',
    lastReviewed: now,
  };
}

/**
 * Update an existing review card based on whether the user
 * answered correctly. Implements simplified SM-2:
 *   - Wrong: interval resets to 1 day, ease -0.2 (clamped),
 *     repetition streak resets to 0.
 *   - Correct #1: interval = 1 day.
 *   - Correct #2: interval = 6 days.
 *   - Correct #3+: interval = previous * ease factor.
 * Ease factor stays between 1.3 and 2.5.
 */
export function calculateNextReview(
  card: ReviewCard,
  correct: boolean,
): ReviewCard {
  const now = Date.now();

  if (!correct) {
    return {
      ...card,
      interval: 1,
      easeFactor: clampEase(card.easeFactor - 0.2),
      repetitions: 0,
      nextReview: now + ONE_DAY_MS,
      lastResult: 'wrong',
      lastReviewed: now,
    };
  }

  const newReps = card.repetitions + 1;
  let newInterval: number;

  if (newReps === 1) {
    newInterval = 1;
  } else if (newReps === 2) {
    newInterval = 6;
  } else {
    // bound interval growth: multiply by ease, but clamp ease effect
    newInterval = Math.max(
      1,
      Math.round(card.interval * clampEase(card.easeFactor)),
    );
  }

  // Small ease bump for consistent correct answers
  const newEase = clampEase(card.easeFactor + 0.05);

  return {
    ...card,
    interval: newInterval,
    easeFactor: newEase,
    repetitions: newReps,
    nextReview: now + newInterval * ONE_DAY_MS,
    lastResult: 'correct',
    lastReviewed: now,
  };
}

/**
 * Return all review cards whose nextReview is in the past
 * (i.e. they are due for review right now).
 */
export function getDueCards(cards: ReviewCard[]): ReviewCard[] {
  const now = Date.now();
  return cards.filter((c) => c.nextReview <= now);
}

/**
 * Sort due cards by how overdue they are (most overdue first).
 * Used to prioritise review sessions.
 */
export function sortByDueness(cards: ReviewCard[]): ReviewCard[] {
  return [...cards].sort((a, b) => a.nextReview - b.nextReview);
}

/**
 * Upsert a card in an array of review cards — if the questionId
 * already exists, replace it; otherwise append.
 */
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

function clampEase(ease: number): number {
  return Math.max(MIN_EASE, Math.min(MAX_EASE, ease));
}
