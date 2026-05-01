'use client';

import ChoiceCard from './ChoiceCard';
import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';
import type { OnboardingMotivation } from '@/lib/onboarding/state';

const OPTIONS: { value: OnboardingMotivation; label: string }[] = [
  { value: 'geld', label: 'Das Geld, ehrlich gesagt' },
  { value: 'lernkurve', label: 'Die Lernkurve und der Prestige' },
  { value: 'netzwerk', label: 'Das Netzwerk und die Karriereperspektiven' },
  { value: 'unsicher', label: 'Bin nicht sicher — will erstmal sehen, was das ist' },
];

export default function Screen04({ state, update, navigateTo }: ScreenProps) {
  const ready = state.motivation !== null;

  return (
    <OnboardingShell
      step={3}
      showBack
      onBack={() => navigateTo(3)}
      footer={
        <button
          type="button"
          disabled={!ready}
          onClick={() => navigateTo(5)}
          className={`w-full rounded px-5 py-4 text-base font-semibold transition-colors ${
            ready
              ? 'bg-[var(--accent-streak)] text-black hover:brightness-110'
              : 'cursor-not-allowed bg-[var(--border)] text-[var(--text-muted)]'
          }`}
        >
          Weiter →
        </button>
      }
    >
      <h2 className="font-[family-name:var(--font-instrument)] text-[clamp(1.8rem,4vw,2.5rem)] leading-tight tracking-tight text-[var(--text-primary)]">
        Was reizt dich am IB?
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
        {OPTIONS.map((opt) => (
          <ChoiceCard
            key={opt.value}
            selected={state.motivation === opt.value}
            onClick={() => update({ motivation: opt.value })}
          >
            <div className="text-base font-semibold text-[var(--text-primary)]">{opt.label}</div>
          </ChoiceCard>
        ))}
      </div>
    </OnboardingShell>
  );
}
