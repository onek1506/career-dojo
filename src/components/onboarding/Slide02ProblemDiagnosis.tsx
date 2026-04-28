'use client';

import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import type { OnboardingSlideProps } from './types';

const REASONS = [
  'Sie cramen 4 Wochen vor dem Interview, statt täglich zu üben.',
  'Sie pauken Antworten auswendig, statt das System zu verstehen.',
  'Sie üben nie laut — und brechen unter Druck im echten Gespräch.',
];

export default function Slide02ProblemDiagnosis({
  currentStep,
  totalSteps,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={onNext} label="Das passiert mir nicht" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col gap-1">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
            Marcus Hart
          </span>
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary italic">
            Ex-MD, 11 Jahre Goldman Sachs
          </span>
        </div>

        <blockquote className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl text-is-text-primary leading-snug">
          &bdquo;In 11 Jahren habe ich über 2.000 Bewerber interviewt. Die meisten scheitern aus drei Gründen, und keiner davon ist mangelnde Intelligenz.&ldquo;
        </blockquote>

        <ul className="flex flex-col gap-4 sm:gap-5 mt-2">
          {REASONS.map((reason, i) => (
            <li
              key={i}
              className="border-l-2 border-is-accent pl-4 py-1 flex flex-col gap-1"
            >
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-[family-name:var(--font-is-sans)] text-is-text-primary">
                {reason}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </OnboardingLayout>
  );
}
