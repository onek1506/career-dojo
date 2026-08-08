'use client';

// ============================================================
// The spaced-repetition motor: records an outcome for a (user, concept)
// pair, advances/resets its interval stage, and answers "what's due
// today for this user". Stays invisible to the learner — no algorithm
// numbers surface in the UI, callers only ever get back due/not-due
// concepts and content to show.
// ============================================================

import { getSupabaseClient } from '../supabase/client';
import { daysForStage, WRONG_RESET_DAYS, PARTIAL_RECHECK_DAYS, MAX_STAGE, type MasteryCategory } from './config';

export type AttemptOutcome = 'correct' | 'partial' | 'wrong';

export interface ConceptMasteryRow {
  concept_tag: string;
  interval_stage: number;
  correct_count: number;
  wrong_count: number;
  partial_count: number;
  status: string;
  last_attempt_at: string | null;
  next_due_at: string | null;
}

function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/** Pure function — the stage/due-date transition table. Exported for testing. */
export function computeNextState(
  currentStage: number,
  outcome: AttemptOutcome,
  category: MasteryCategory,
): { stage: number; nextDueAt: string; status: 'learning' | 'mastered' } {
  if (outcome === 'wrong') {
    return { stage: 0, nextDueAt: addDays(WRONG_RESET_DAYS), status: 'learning' };
  }
  if (outcome === 'partial') {
    return { stage: currentStage, nextDueAt: addDays(PARTIAL_RECHECK_DAYS), status: 'learning' };
  }
  // correct
  const nextStage = Math.min(currentStage + 1, MAX_STAGE);
  return {
    stage: nextStage,
    nextDueAt: addDays(daysForStage(category, nextStage)),
    status: nextStage >= MAX_STAGE ? 'mastered' : 'learning',
  };
}

/**
 * Records one quiz/recall outcome: inserts a quiz_attempts row and
 * upserts the concept_mastery row via the transition table above.
 * Fire-and-forget by convention (callers don't await the UI on it) —
 * errors are logged, never thrown into the learner's flow.
 */
export async function recordConceptAttempt(params: {
  userId: string;
  conceptTag: string;
  questionId: string;
  lessonId: string;
  outcome: AttemptOutcome;
  category: MasteryCategory;
  selfRating?: 'knew' | 'partial' | 'unknown';
}): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;
  const { userId, conceptTag, questionId, lessonId, outcome, category, selfRating } = params;

  try {
    const { data: existing, error: readError } = await supabase
      .from('concept_mastery')
      .select('interval_stage, correct_count, wrong_count, partial_count')
      .eq('user_id', userId)
      .eq('concept_tag', conceptTag)
      .maybeSingle();
    if (readError) {
      console.error('[mastery] read concept_mastery failed', readError.message);
      return;
    }

    const currentStage = existing?.interval_stage ?? 0;
    const next = computeNextState(currentStage, outcome, category);

    const attemptsForQuestion = await supabase
      .from('quiz_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('question_id', questionId);
    const attemptNumber = (attemptsForQuestion.count ?? 0) + 1;

    const [{ error: insertError }, { error: upsertError }] = await Promise.all([
      supabase.from('quiz_attempts').insert({
        user_id: userId,
        question_id: questionId,
        lesson_id: lessonId,
        concept_tag: conceptTag,
        correct: outcome !== 'wrong',
        attempt_number: attemptNumber,
        self_rating: selfRating ?? null,
      }),
      supabase.from('concept_mastery').upsert(
        {
          user_id: userId,
          concept_tag: conceptTag,
          interval_stage: next.stage,
          correct_count: (existing?.correct_count ?? 0) + (outcome === 'correct' ? 1 : 0),
          wrong_count: (existing?.wrong_count ?? 0) + (outcome === 'wrong' ? 1 : 0),
          partial_count: (existing?.partial_count ?? 0) + (outcome === 'partial' ? 1 : 0),
          status: next.status,
          last_attempt_at: new Date().toISOString(),
          next_due_at: next.nextDueAt,
        },
        { onConflict: 'user_id,concept_tag' },
      ),
    ]);
    if (insertError) console.error('[mastery] insert quiz_attempts failed', insertError.message);
    if (upsertError) console.error('[mastery] upsert concept_mastery failed', upsertError.message);
  } catch (err) {
    console.error('[mastery] recordConceptAttempt threw', err);
  }
}

export interface DueConcept {
  conceptTag: string;
  nextDueAt: string | null;
  intervalStage: number;
  correctCount: number;
  wrongCount: number;
}

/**
 * Concepts due today for this user, prioritized by category: k3 sorts
 * weakest-first among due concepts (aggressive gap-closing), k1/k2 sort
 * purely by how overdue they are — no "here's your weak spot" framing.
 */
export async function getDueConcepts(userId: string, category: MasteryCategory): Promise<DueConcept[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('concept_mastery')
      .select('concept_tag, next_due_at, interval_stage, correct_count, wrong_count')
      .eq('user_id', userId)
      .lte('next_due_at', new Date().toISOString());
    if (error) {
      console.error('[mastery] getDueConcepts failed', error.message);
      return [];
    }
    const rows = (data ?? []) as ConceptMasteryRow[];
    const sorted = [...rows].sort((a, b) => {
      if (category === 'k3') {
        const weaknessA = a.wrong_count / Math.max(a.correct_count + a.wrong_count, 1);
        const weaknessB = b.wrong_count / Math.max(b.correct_count + b.wrong_count, 1);
        if (weaknessB !== weaknessA) return weaknessB - weaknessA;
      }
      const dueA = a.next_due_at ? new Date(a.next_due_at).getTime() : 0;
      const dueB = b.next_due_at ? new Date(b.next_due_at).getTime() : 0;
      return dueA - dueB;
    });
    return sorted.map((r) => ({
      conceptTag: r.concept_tag,
      nextDueAt: r.next_due_at,
      intervalStage: r.interval_stage,
      correctCount: r.correct_count,
      wrongCount: r.wrong_count,
    }));
  } catch (err) {
    console.error('[mastery] getDueConcepts threw', err);
    return [];
  }
}
