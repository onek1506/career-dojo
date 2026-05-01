'use client';

import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';

export default function Screen11({ complete }: ScreenProps) {
  return (
    <OnboardingShell
      step={9}
      footer={
        <>
          <button
            type="button"
            onClick={complete}
            className="w-full rounded bg-[var(--accent-streak)] px-5 py-4 text-base font-semibold text-black transition-colors hover:brightness-110"
          >
            Lektion starten →
          </button>
          <p className="mt-3 text-center text-xs text-[var(--text-secondary)]">
            Nach dieser Lektion schaltest du Lektion 2 frei.
          </p>
        </>
      }
    >
      <h1 className="font-[family-name:var(--font-instrument)] text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
        Tag 1 beginnt jetzt.
      </h1>

      <article className="mt-7 rounded border border-[var(--border)] bg-[var(--bg-card)] px-6 py-7">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          Deine erste Lektion
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-instrument)] text-2xl font-semibold text-[var(--text-primary)]">
          Income Statement
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">Gewinn- und Verlustrechnung (GuV)</p>

        <div className="my-5 h-px bg-[var(--border)]" />

        <div className="flex items-center gap-5">
          <span className="text-sm font-semibold text-[var(--text-primary)]">6 MIN</span>
          <span className="font-[family-name:var(--font-instrument)] text-base font-semibold text-[var(--accent-streak)]">
            +25 XP
          </span>
          <span className="rounded-full bg-[rgba(255,107,53,0.12)] px-2.5 py-1 text-xs font-medium text-[var(--accent-streak)]">
            Einsteiger
          </span>
        </div>
      </article>

      <p className="mt-6 text-center text-sm italic text-[var(--text-secondary)]">
        Sechs Minuten. Dann hast du Tag 1 deines Streaks.
      </p>
    </OnboardingShell>
  );
}
