'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import type {
  ExplorerMotivation,
  InterviewGoal,
  TimeFrame,
} from '@/lib/onboarding/profile';
import type { OnboardingSlideProps } from './types';

const INTERVIEW_GOALS: { id: InterviewGoal; label: string }[] = [
  { id: 'spring_week', label: 'Spring Week (Februar–April)' },
  { id: 'summer', label: 'Summer Internship (Juni–August)' },
  { id: 'full_time', label: 'Full-Time Position' },
  { id: 'off_cycle', label: 'Off-Cycle / Praktikum' },
  { id: 'unclear', label: 'Noch unklar' },
];

const TIMEFRAMES: { id: TimeFrame; label: string }[] = [
  { id: '2_weeks', label: 'In den nächsten 2 Wochen' },
  { id: '1_2_months', label: 'In 1–2 Monaten' },
  { id: '3_6_months', label: 'In 3–6 Monaten' },
  { id: 'more_6_months', label: 'Mehr als 6 Monate' },
  { id: 'none', label: 'Noch keines geplant' },
];

const EXPLORER_OPTIONS: { id: ExplorerMotivation; label: string }[] = [
  { id: 'money', label: 'Das Geld, ehrlich gesagt' },
  { id: 'learning', label: 'Die Lernkurve und der Prestige' },
  { id: 'network', label: 'Das Netzwerk und Karriereperspektiven' },
  { id: 'unsure', label: 'Bin nicht sicher, will erstmal sehen, was das ist' },
];

export default function Slide04GoalSelection({
  currentStep,
  totalSteps,
  profile,
  updateProfile,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  const isExplorer = profile.status === 'explorer';

  const [goal, setGoal] = useState<InterviewGoal | null>(profile.interviewGoal);
  const [timeFrame, setTimeFrame] = useState<TimeFrame | null>(profile.timeFrame);
  const [motivation, setMotivation] = useState<ExplorerMotivation | null>(profile.explorerMotivation);

  const canContinue = isExplorer ? motivation !== null : goal !== null && timeFrame !== null;

  const handleNext = () => {
    if (!canContinue) return;
    if (isExplorer) {
      updateProfile({ explorerMotivation: motivation });
    } else {
      updateProfile({ interviewGoal: goal, timeFrame });
    }
    onNext();
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} disabled={!canContinue} icon={<ArrowRight size={16} />} />}
    >
      {isExplorer ? (
        <div className="flex flex-col gap-5 sm:gap-6">
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary leading-tight">
            Was reizt dich am IB?
          </h2>
          <OptionGrid options={EXPLORER_OPTIONS} value={motivation} onChange={setMotivation} />
        </div>
      ) : (
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-5 sm:gap-6">
            <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-4xl text-is-text-primary leading-tight">
              Worauf bereitest du dich vor?
            </h2>
            <OptionGrid options={INTERVIEW_GOALS} value={goal} onChange={setGoal} />
          </div>
          <div className="flex flex-col gap-5 sm:gap-6">
            <h3 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-2xl text-is-text-primary">
              Wann ist dein nächstes Interview?
            </h3>
            <OptionGrid options={TIMEFRAMES} value={timeFrame} onChange={setTimeFrame} />
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
}

function OptionGrid<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[];
  value: T | null;
  onChange: (next: T) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {options.map((opt) => {
        const isSelected = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
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
  );
}
