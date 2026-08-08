'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/supabase/AuthProvider';
import { useStore } from '@/lib/store';
import { saveProfile, type Goal, type GoalTimeframe } from '@/lib/onboarding/profile';
import { pushProfile } from '@/lib/supabase/sync';

const GOAL_OPTIONS: { id: Goal; label: string }[] = [
  { id: 'spring_week', label: 'Spring Week' },
  { id: 'summer_internship', label: 'Summer Internship' },
  { id: 'full_time', label: 'Full-Time' },
];

const TIMEFRAME_OPTIONS: { id: GoalTimeframe; label: string }[] = [
  { id: '3_months', label: 'In ~3 Monaten' },
  { id: '6_months', label: 'In ~6 Monaten' },
  { id: '1_year', label: 'In ~1 Jahr' },
  { id: 'later', label: 'Später' },
];

function GoalContent() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/course';
  const { user } = useAuth();
  const { progress } = useStore();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [timeframe, setTimeframe] = useState<GoalTimeframe | null>(null);

  const finish = () => {
    saveProfile({ goalPromptDismissedAt: new Date().toISOString() });
    router.push(next);
  };

  const handleSave = () => {
    saveProfile({
      goal,
      goalTimeframe: timeframe,
      goalPromptDismissedAt: new Date().toISOString(),
    });
    if (user) void pushProfile(user.id, progress);
    router.push(next);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div
            className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-lg p-4"
            role="note"
            aria-label="Notiz von Marcus Hart"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                aria-hidden
                className="flex items-center justify-center w-7 h-7 rounded-full border border-is-accent text-is-text-primary text-[10px] font-[family-name:var(--font-is-mono)] tracking-wider"
                style={{ background: 'var(--is-bg-tertiary)' }}
              >
                MH
              </div>
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
                From: Marcus Hart, Senior Coach
              </span>
            </div>
            <div className="font-[family-name:var(--font-is-sans)] text-is-text-primary italic leading-relaxed">
              Kurz was für dich selbst: Wenn du ein konkretes Ziel vor Augen hast, ziehst du das
              hier eher durch. Wo willst du hin?
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
              Ziel
            </span>
            <div className="flex flex-wrap gap-2">
              {GOAL_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setGoal(opt.id)}
                  className={[
                    'px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-[family-name:var(--font-is-sans)] border transition-colors duration-200',
                    goal === opt.id
                      ? 'bg-is-accent-muted border-is-accent text-is-text-primary'
                      : 'bg-is-bg-secondary border-is-bg-border text-is-text-secondary hover:border-is-text-muted',
                  ].join(' ')}
                  aria-pressed={goal === opt.id}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
              Wann geht's ungefähr los
            </span>
            <div className="flex flex-wrap gap-2">
              {TIMEFRAME_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTimeframe(opt.id)}
                  className={[
                    'px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-[family-name:var(--font-is-sans)] border transition-colors duration-200',
                    timeframe === opt.id
                      ? 'bg-is-accent-muted border-is-accent text-is-text-primary'
                      : 'bg-is-bg-secondary border-is-bg-border text-is-text-secondary hover:border-is-text-muted',
                  ].join(' ')}
                  aria-pressed={timeframe === opt.id}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <p className="font-[family-name:var(--font-is-mono)] text-[11px] text-is-text-muted leading-relaxed">
            Freiwillig. Hilft uns, dir künftig einen passenden Pfad zu deinem Ziel zu zeigen.
            Sicher gespeichert in unserer EU-Datenbank (Supabase, Frankfurt), DSGVO-konform.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleSave}
              disabled={!goal || !timeframe}
              className="flex-1 py-3 min-h-[44px] rounded-lg font-[family-name:var(--font-is-sans)] text-sm font-medium transition disabled:opacity-50"
              style={{ background: 'var(--is-accent)', color: 'var(--is-bg-primary)' }}
            >
              Speichern
            </button>
            <button
              type="button"
              onClick={finish}
              className="flex-1 py-3 min-h-[44px] rounded-lg font-[family-name:var(--font-is-sans)] text-sm font-medium border transition"
              style={{ borderColor: 'var(--is-bg-border)', color: 'var(--is-text-primary)' }}
            >
              Überspringen
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GoalCommitmentPage() {
  return (
    <Suspense fallback={null}>
      <GoalContent />
    </Suspense>
  );
}
