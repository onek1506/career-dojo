'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import type { SlideProps } from './types';

export default function Slide10Cliffhanger({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} label="Lektion abschließen" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium text-is-text-primary leading-tight">
            Da war noch was: Die drei Statements sind verbunden.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Das ist die wichtigste Erkenntnis im ganzen Accounting.
          </p>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 flex flex-col gap-3">
          <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary leading-relaxed">
            Net Income aus der GuV → fließt in den CFS (oben) UND in Retained Earnings der Bilanz. Das Final-Cash aus dem CFS → entspricht der Cash-Veränderung in der Bilanz.
          </p>
          <p className="font-[family-name:var(--font-is-sans)] text-base text-is-accent">
            Diese drei Links verstehen = Lektion 4.
          </p>
        </div>

        <MarcusNote
          tone={tone}
          body="Du hast jetzt alle drei Statements einzeln. In Lektion 4 schauen wir, wie sie zusammenspielen. Das ist die häufigste und wichtigste Frage in IB-Interviews. Mach Lektion 4 direkt danach."
        />
      </div>
    </LessonLayout>
  );
}
