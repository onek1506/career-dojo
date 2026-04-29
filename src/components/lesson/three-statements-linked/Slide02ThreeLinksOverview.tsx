'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import { threeLinks } from './data';
import type { SlideProps } from './types';

export default function Slide02ThreeLinksOverview({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  tone,
}: SlideProps) {
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Die drei Links im Überblick.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Es gibt drei direkte Verbindungen, die jeder IB-Analyst auswendig kennt.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {threeLinks.map((link) => (
            <li
              key={link.number}
              className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 flex flex-col gap-2"
            >
              <div className="flex items-baseline gap-3">
                <span className={`font-[family-name:var(--font-is-mono)] text-xs ${link.textColor} tracking-wider`}>
                  {link.number}
                </span>
                <span className="font-[family-name:var(--font-is-mono)] text-sm sm:text-base text-is-text-primary tracking-wider">
                  {link.title}
                </span>
              </div>
              <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                {link.description}
              </p>
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
                  {link.fromStatement}
                </span>
                <span className="text-is-text-muted">→</span>
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
                  {link.toStatements.join(' + ')}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <MarcusNote
          tone={tone}
          body="Diese drei Links musst du auf Zuruf nennen können. Fang immer beim Net Income an. Das ist der Dreh- und Angelpunkt aller drei Statements."
        />
      </div>
    </LessonLayout>
  );
}
