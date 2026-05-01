'use client';

import ChoiceCard from './ChoiceCard';
import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';

const OPTIONS = [
  'Ja, mehrfach',
  'Einmal, war kompliziert',
  'Nein, aber ich weiß was es ist',
  'Habe ich noch nie gehört',
];

export default function Screen07({ state, update, navigateTo }: ScreenProps) {
  const ready = state.quiz3 !== null;

  return (
    <OnboardingShell
      step={6}
      showBack
      onBack={() => navigateTo(6)}
      footer={
        <button
          type="button"
          disabled={!ready}
          onClick={() => navigateTo(8)}
          className={`w-full rounded px-5 py-4 text-base font-semibold transition-colors ${
            ready
              ? 'bg-[var(--accent-streak)] text-black hover:brightness-110'
              : 'cursor-not-allowed bg-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          Auswerten →
        </button>
      }
    >
      <div>
        <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-secondary)]">Frage 3 von 3</p>
        <div className="mt-2 h-0.5 w-full overflow-hidden rounded bg-[var(--border)]">
          <div className="h-full bg-[var(--accent-streak)]" style={{ width: '100%' }} />
        </div>
      </div>

      <h2 className="mt-7 font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,2.5rem)] leading-tight tracking-tight text-[var(--text-primary)]">
        Hast du schon mal ein DCF-Modell in Excel gebaut?
      </h2>

      <div className="mt-6 flex flex-col gap-3">
        {OPTIONS.map((label) => (
          <ChoiceCard
            key={label}
            selected={state.quiz3 === label}
            onClick={() => update({ quiz3: label })}
          >
            <div className="text-[0.95rem] text-[var(--text-primary)]">{label}</div>
          </ChoiceCard>
        ))}
      </div>
    </OnboardingShell>
  );
}
