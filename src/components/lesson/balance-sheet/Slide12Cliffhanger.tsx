'use client';

import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import type { SlideProps } from './types';

export default function Slide12Cliffhanger({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
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
            Da war noch etwas: PP&amp;E und Depreciation.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Den hast du in der Bilanz gesehen. Hier ein Vorgeschmack.
          </p>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 flex flex-col gap-3">
          <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary leading-relaxed">
            PP&amp;E sinkt jedes Jahr durch Abschreibungen (Depreciation). Das erscheint nicht nur in der Bilanz, sondern auch in der GuV als Aufwand und im Cash Flow Statement als non-cash Add-back.
          </p>
          <p className="font-[family-name:var(--font-is-sans)] text-base text-is-accent">
            Das ist der erste direkte Link zwischen den drei Berichten.
          </p>
        </div>

        <MarcusNote
          tone={tone}
          body="PP&E und Depreciation sind der Dreh- und Angelpunkt zwischen Bilanz, GuV und Cash Flow. Wenn du das einmal wirklich verstehst, macht alles andere Sinn. Lektion 3 und 4 widmen sich genau diesem Link."
        />
      </div>
    </LessonLayout>
  );
}
