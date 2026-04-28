'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import {
  calculateSkillProfile,
  type BalanceAnswer,
  type DcfAnswer,
  type EbitdaAnswer,
} from '@/lib/onboarding/profile';
import type { OnboardingSlideProps } from './types';

interface QuestionOption<T extends string> {
  id: T;
  label: string;
}

const BALANCE_OPTIONS: QuestionOption<BalanceAnswer>[] = [
  { id: 'wrong', label: 'Was eine Firma in einem Zeitraum verdient hat' },
  { id: 'correct', label: 'Was eine Firma zu einem Stichtag besitzt und schuldet' },
  { id: 'wrong', label: 'Wie viel Cash eine Firma generiert' },
  { id: 'never_heard', label: 'Habe ich noch nie gehört' },
];

const EBITDA_OPTIONS: QuestionOption<EbitdaAnswer>[] = [
  { id: 'correct', label: 'Earnings Before Interest, Taxes, Depreciation and Amortization' },
  { id: 'wrong', label: 'Estimated Business Income Tax Deduction Allowance' },
  { id: 'wrong', label: 'European Business Tax Indicator' },
  { id: 'never_heard', label: 'Habe ich noch nie gehört' },
];

const DCF_OPTIONS: QuestionOption<DcfAnswer>[] = [
  { id: 'multiple', label: 'Ja, mehrfach' },
  { id: 'once', label: 'Einmal, war kompliziert' },
  { id: 'know_it', label: 'Nein, aber ich weiß was es ist' },
  { id: 'never_heard', label: 'Habe ich noch nie gehört' },
];

export default function Slide05KnowledgeCheck({
  currentStep,
  totalSteps,
  profile,
  updateProfile,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  // Index-based local state because the same answer key (e.g. "wrong")
  // appears on multiple options — index distinguishes them visually.
  const [balanceIdx, setBalanceIdx] = useState<number | null>(profile.knowledge.balance ? findIndex(BALANCE_OPTIONS, profile.knowledge.balance) : null);
  const [ebitdaIdx, setEbitdaIdx] = useState<number | null>(profile.knowledge.ebitda ? findIndex(EBITDA_OPTIONS, profile.knowledge.ebitda) : null);
  const [dcfIdx, setDcfIdx] = useState<number | null>(profile.knowledge.dcf ? findIndex(DCF_OPTIONS, profile.knowledge.dcf) : null);

  const allAnswered = balanceIdx !== null && ebitdaIdx !== null && dcfIdx !== null;

  const handleSubmit = () => {
    if (!allAnswered) return;
    const knowledge = {
      balance: BALANCE_OPTIONS[balanceIdx].id,
      ebitda: EBITDA_OPTIONS[ebitdaIdx].id,
      dcf: DCF_OPTIONS[dcfIdx].id,
    };
    const skillProfile = calculateSkillProfile(knowledge);
    updateProfile({ knowledge, skillProfile });
    onNext();
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleSubmit} label="Auswerten" disabled={!allAnswered} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-lg p-4">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
            Marcus Hart
          </span>
          <p className="font-[family-name:var(--font-is-sans)] italic text-is-text-primary mt-1.5">
            Drei kurze Fragen — damit ich dich nicht mit Sachen langweile, die du schon kannst.
          </p>
        </div>

        <KnowledgeQuestion
          title="Was zeigt eine Bilanz?"
          options={BALANCE_OPTIONS}
          selectedIndex={balanceIdx}
          onSelect={setBalanceIdx}
        />
        <KnowledgeQuestion
          title="Wofür steht EBITDA?"
          options={EBITDA_OPTIONS}
          selectedIndex={ebitdaIdx}
          onSelect={setEbitdaIdx}
        />
        <KnowledgeQuestion
          title="Hast du schon mal ein DCF-Modell in Excel gebaut?"
          options={DCF_OPTIONS}
          selectedIndex={dcfIdx}
          onSelect={setDcfIdx}
        />
      </div>
    </OnboardingLayout>
  );
}

function KnowledgeQuestion<T extends string>({
  title,
  options,
  selectedIndex,
  onSelect,
}: {
  title: string;
  options: QuestionOption<T>[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-[family-name:var(--font-is-serif)] text-lg sm:text-xl text-is-text-primary leading-snug">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              className={[
                'min-h-[44px] px-4 py-3 rounded-md text-left text-sm transition-all duration-200',
                isSelected
                  ? 'border border-is-accent bg-is-accent-muted text-is-text-primary'
                  : 'border border-is-bg-border bg-is-bg-secondary text-is-text-primary hover:bg-is-bg-tertiary',
              ].join(' ')}
              aria-pressed={isSelected}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function findIndex<T extends string>(options: QuestionOption<T>[], answer: T): number | null {
  const idx = options.findIndex((o) => o.id === answer);
  return idx >= 0 ? idx : null;
}
