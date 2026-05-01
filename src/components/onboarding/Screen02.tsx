'use client';

import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';

const REASONS = [
  'Sie cramen 4 Wochen vor dem Interview, statt täglich zu üben.',
  'Sie pauken Antworten auswendig, statt das System zu verstehen.',
  'Sie üben nie laut — und brechen unter Druck zusammen.',
];

export default function Screen02({ navigateTo }: ScreenProps) {
  return (
    <OnboardingShell
      step={1}
      showBack
      onBack={() => navigateTo(1)}
      footer={
        <button
          type="button"
          onClick={() => navigateTo(3)}
          className="w-full rounded bg-[var(--accent-streak)] px-5 py-4 text-base font-semibold text-black transition-colors hover:brightness-110"
        >
          Das passiert mir nicht →
        </button>
      }
    >
      <p className="text-xs font-medium tracking-[0.12em] text-[var(--text-secondary)]">POSTEINGANG</p>

      <article className="mt-5 rounded border border-[var(--border)] bg-[var(--bg-card)] p-6">
        <header className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--border)] font-[family-name:var(--font-jetbrains)] text-xs text-[var(--accent-streak)]">
            MH
          </div>
          <div>
            <div className="font-semibold text-[var(--text-primary)]">Marcus Hart</div>
            <div className="text-xs text-[var(--text-secondary)]">Ex-MD · Goldman Sachs · 11 Jahre</div>
          </div>
        </header>

        <p className="mt-5 text-base font-medium text-[var(--text-primary)]">
          Re: Warum die meisten Bewerber scheitern
        </p>

        <div className="my-4 h-px bg-[var(--border)]" />

        <p className="text-[0.95rem] leading-relaxed text-[var(--text-primary)]">
          In 11 Jahren habe ich über 2.000 Kandidaten interviewt. Fast alle scheitern aus denselben drei
          Gründen — keiner davon ist mangelnde Intelligenz.
        </p>

        <ul className="mt-5 space-y-3.5">
          {REASONS.map((reason) => (
            <li
              key={reason}
              className="border-l-2 border-[var(--accent-streak)] pl-3 text-sm leading-snug text-[var(--text-primary)]"
            >
              {reason}
            </li>
          ))}
        </ul>
      </article>
    </OnboardingShell>
  );
}
