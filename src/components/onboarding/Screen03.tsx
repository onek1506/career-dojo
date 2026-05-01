'use client';

import ChoiceCard from './ChoiceCard';
import OnboardingShell from './OnboardingShell';
import type { ScreenProps } from './types';
import type { OnboardingProfil } from '@/lib/onboarding/state';

interface ProfilOption {
  value: OnboardingProfil;
  rank: string;
  title: string;
  desc: string;
}

const OPTIONS: ProfilOption[] = [
  { value: 'entdecker', rank: '01', title: 'ENTDECKER', desc: 'Ich überlege noch, ob IB überhaupt mein Ding ist.' },
  { value: 'einsteiger', rank: '02', title: 'EINSTEIGER', desc: 'Ich weiß, dass ich es will — aber keine Ahnung, wo anfangen.' },
  { value: 'bewerber', rank: '03', title: 'BEWERBER', desc: 'Ich bewerbe mich aktiv — Spring Week, Summer, Off-Cycle.' },
  { value: 'profi', rank: '04', title: 'PROFI', desc: 'Ich habe Praktikum-Erfahrung und drille gezielt für nächste Interviews.' },
];

export default function Screen03({ state, update, navigateTo }: ScreenProps) {
  const ready = state.profil !== null;

  return (
    <OnboardingShell
      step={2}
      showBack
      onBack={() => navigateTo(2)}
      footer={
        <button
          type="button"
          disabled={!ready}
          onClick={() => navigateTo(4)}
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
        Wo stehst du gerade?
      </h2>
      <p className="mt-3 text-[var(--text-secondary)]">
        Sei ehrlich — das hilft mir, dich richtig einzuschätzen.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {OPTIONS.map((opt) => (
          <ChoiceCard
            key={opt.value}
            selected={state.profil === opt.value}
            onClick={() => update({ profil: opt.value })}
          >
            <div className="font-[family-name:var(--font-jetbrains)] text-xs tracking-[0.08em] text-[var(--accent-streak)]">
              {opt.rank}
            </div>
            <div className="mt-1.5 text-base font-semibold text-[var(--text-primary)]">{opt.title}</div>
            <div className="mt-1 text-sm text-[var(--text-secondary)]">{opt.desc}</div>
          </ChoiceCard>
        ))}
      </div>
    </OnboardingShell>
  );
}
