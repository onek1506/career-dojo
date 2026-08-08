'use client';

// ============================================================
// TEMPORARY verification harness for the spaced-repetition engine
// (Langzeit-Layer Etappe 1, docs/langzeit-layer-etappe1.md §7).
// Not a designed feature — Etappe 2 replaces this with the real mixed
// daily-session UI. Exists only to prove the motor + recall slide work
// end to end against real Supabase data, without needing dashboard
// round-trips: it fetches and displays the raw concept_mastery rows
// itself.
// ============================================================

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/supabase/AuthProvider';
import { getSupabaseClient } from '@/lib/supabase/client';
import { getProfile, saveProfile, type EntryCategory } from '@/lib/onboarding/profile';
import { recordConceptAttempt } from '@/lib/mastery/engine';
import { toMasteryCategory, RECALL_HARDNESS } from '@/lib/mastery/config';
import RecallSlide from '@/components/lesson/micro/slides/RecallSlide';

const QUIZ_TEST_TAG = 'test-wacc-quiz';
const RECALL_TEST_TAG = 'test-wacc-recall';

const RECALL_DEMO = {
  kind: 'recall' as const,
  id: 'test-recall-wacc',
  conceptTag: RECALL_TEST_TAG,
  prompt: 'Equity 600, Debt 400, Cost of Equity 10 %, Cost of Debt 5 %, Steuersatz 30 %. WACC?',
  modelAnswer: '0,6 × 10 % + 0,4 × 5 % × (1 − 0,3) = 6 % + 1,4 % = 7,4 %.',
  hint: 'Denk an: gewichteter Mix aus Eigenkapital- und Fremdkapitalkosten, Fremdkapital nach Steuern.',
};

interface Row {
  concept_tag: string;
  interval_stage: number;
  correct_count: number;
  wrong_count: number;
  partial_count: number;
  status: string;
  next_due_at: string | null;
  last_attempt_at: string | null;
}

export default function MasteryTestPage() {
  const { user, loading } = useAuth();
  const [category, setCategory] = useState<EntryCategory>('k2');
  const [rows, setRows] = useState<Row[]>([]);
  const [recallKey, setRecallKey] = useState(0);

  useEffect(() => {
    setCategory(getProfile().entryCategory ?? 'k2');
  }, []);

  const setTestCategory = (c: EntryCategory) => {
    saveProfile({ entryCategory: c });
    setCategory(c);
  };

  const refresh = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase || !user) return;
    const { data, error } = await supabase
      .from('concept_mastery')
      .select('concept_tag, interval_stage, correct_count, wrong_count, partial_count, status, next_due_at, last_attempt_at')
      .eq('user_id', user.id)
      .in('concept_tag', [QUIZ_TEST_TAG, RECALL_TEST_TAG]);
    if (error) {
      console.error(error);
      return;
    }
    setRows((data ?? []) as Row[]);
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const simulateQuiz = async (correct: boolean) => {
    if (!user) return;
    await recordConceptAttempt({
      userId: user.id,
      conceptTag: QUIZ_TEST_TAG,
      questionId: `test-quiz-${Date.now()}`,
      lessonId: 'dev-mastery-test',
      outcome: correct ? 'correct' : 'wrong',
      category: toMasteryCategory(category),
    });
    await refresh();
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}>
        <div className="text-center flex flex-col gap-3">
          <p className="font-[family-name:var(--font-is-sans)]">Dieser Test-Screen braucht einen Login.</p>
          <Link href="/auth/gate" className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent">
            Anmelden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8" style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}>
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div>
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-error uppercase tracking-wider">
            Temporär — Etappe-1-Verifikation, kein Feature
          </span>
          <h1 className="font-[family-name:var(--font-is-serif)] text-2xl">Mastery-Motor testen</h1>
          <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted mt-1">{user.email}</p>
        </div>

        <section className="flex flex-col gap-3">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
            Test-Kategorie (schreibt lokal profiles.entry_category)
          </span>
          <div className="flex gap-2">
            {(['k1', 'k2', 'k3'] as EntryCategory[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setTestCategory(c)}
                className={[
                  'px-4 py-2 rounded-lg border font-[family-name:var(--font-is-mono)] text-sm',
                  category === c ? 'border-is-accent bg-is-accent-muted' : 'border-is-bg-border',
                ].join(' ')}
              >
                {c.toUpperCase()} {RECALL_HARDNESS[toMasteryCategory(c)]}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
            Quiz-Pfad ({QUIZ_TEST_TAG})
          </span>
          <div className="flex gap-2">
            <button type="button" onClick={() => simulateQuiz(true)} className="px-4 py-2 rounded-lg bg-is-accent text-is-bg-primary font-[family-name:var(--font-is-sans)] text-sm">
              Richtig beantwortet
            </button>
            <button type="button" onClick={() => simulateQuiz(false)} className="px-4 py-2 rounded-lg border border-is-error text-is-error font-[family-name:var(--font-is-sans)] text-sm">
              Falsch beantwortet
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
            Recall-Pfad ({RECALL_TEST_TAG})
          </span>
          <div className="border border-is-bg-border rounded-lg overflow-hidden">
            <RecallSlide
              key={recallKey}
              slide={RECALL_DEMO}
              currentStep={1}
              totalSteps={1}
              onBack={() => {}}
              onNext={() => {
                setRecallKey((k) => k + 1);
                void refresh();
              }}
              hardness={RECALL_HARDNESS[toMasteryCategory(category)]}
              onRecall={(rating) => {
                void recordConceptAttempt({
                  userId: user.id,
                  conceptTag: RECALL_TEST_TAG,
                  questionId: RECALL_DEMO.id,
                  lessonId: 'dev-mastery-test',
                  outcome: rating === 'knew' ? 'correct' : rating === 'partial' ? 'partial' : 'wrong',
                  category: toMasteryCategory(category),
                  selfRating: rating,
                }).then(() => refresh());
              }}
            />
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
              concept_mastery (live aus Supabase)
            </span>
            <button type="button" onClick={() => refresh()} className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent">
              Aktualisieren
            </button>
          </div>
          <div className="overflow-x-auto border border-is-bg-border rounded-lg">
            <table className="w-full text-xs font-[family-name:var(--font-is-mono)]">
              <thead>
                <tr className="border-b border-is-bg-border text-is-text-muted">
                  <th className="text-left p-2">concept_tag</th>
                  <th className="text-left p-2">stage</th>
                  <th className="text-left p-2">status</th>
                  <th className="text-left p-2">correct/wrong/partial</th>
                  <th className="text-left p-2">next_due_at</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.concept_tag} className="border-b border-is-bg-border last:border-0">
                    <td className="p-2">{r.concept_tag}</td>
                    <td className="p-2">{r.interval_stage}</td>
                    <td className="p-2">{r.status}</td>
                    <td className="p-2">{r.correct_count}/{r.wrong_count}/{r.partial_count}</td>
                    <td className="p-2">{r.next_due_at}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="p-2 text-is-text-muted" colSpan={5}>Noch keine Attempts.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
