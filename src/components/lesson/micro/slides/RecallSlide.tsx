'use client';

import { useState } from 'react';
import LessonLayout from '../../LessonLayout';
import MarcusNote from '../../MarcusNote';
import { playClickSound } from '@/lib/sounds';
import type { RecallSlide as RecallSlideData } from '../types';
import type { RecallHardness } from '@/lib/mastery/config';

export type SelfRating = 'knew' | 'partial' | 'unknown';

interface Props {
  slide: RecallSlideData;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  hardness: RecallHardness;
  onRecall: (rating: SelfRating) => void;
}

const RATING_LABELS: Record<SelfRating, string> = {
  knew: 'Wusste ich',
  partial: 'Halb',
  unknown: 'Nicht',
};

const RATING_FEEDBACK: Record<SelfRating, string> = {
  knew: 'Sitzt. Kommt später wieder, mit mehr Abstand.',
  partial: 'Fast — das kommt bald nochmal, etwas näher dran.',
  unknown: 'Kein Problem, dafür ist Wiederholung da. Kommt morgen wieder.',
};

export default function RecallSlide({
  slide,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  hardness,
  onRecall,
}: Props) {
  const [scratch, setScratch] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [rating, setRating] = useState<SelfRating | null>(null);

  const showHint = hardness === 'supported' && Boolean(slide.hint);

  const handleReveal = () => {
    playClickSound();
    setRevealed(true);
  };

  const handleRate = (r: SelfRating) => {
    playClickSound();
    setRating(r);
    onRecall(r);
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  let footer: React.ReactNode = null;
  if (rating) {
    footer = (
      <button
        type="button"
        onClick={handleNext}
        className="w-full min-h-[44px] py-3 sm:py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] bg-is-accent text-is-bg-primary hover:bg-is-accent-hover transition-all duration-200"
      >
        Weiter
      </button>
    );
  } else if (!revealed) {
    footer = (
      <button
        type="button"
        onClick={handleReveal}
        className="w-full min-h-[44px] py-3 sm:py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] bg-is-accent text-is-bg-primary hover:bg-is-accent-hover transition-all duration-200"
      >
        Antwort zeigen
      </button>
    );
  }

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={footer}>
      <div className="flex flex-col gap-5">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          Wiederholung
        </span>

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          {slide.prompt}
        </h2>

        {showHint && (
          <div className="bg-is-bg-secondary border border-is-bg-border rounded-md p-3">
            <p className="font-[family-name:var(--font-is-mono)] text-xs sm:text-sm text-is-text-secondary leading-relaxed">
              {slide.hint}
            </p>
          </div>
        )}

        {!revealed && (
          <textarea
            value={scratch}
            onChange={(e) => setScratch(e.target.value)}
            placeholder="Deine Antwort — nur für dich, wird nicht bewertet oder gespeichert."
            rows={4}
            className="w-full p-4 rounded-lg bg-is-bg-secondary border border-is-bg-border font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary placeholder:text-is-text-muted outline-none focus:border-is-accent transition-colors duration-200 resize-none"
          />
        )}

        {revealed && (
          <div className="bg-is-bg-secondary border border-is-accent rounded-md p-4 flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent tracking-wider uppercase">
              Musterantwort
            </span>
            <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary leading-relaxed">
              {slide.modelAnswer}
            </p>
          </div>
        )}

        {revealed && !rating && (
          <div className="flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
              Wie gut wusstest du das?
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(RATING_LABELS) as SelfRating[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRate(r)}
                  className="py-3 min-h-[44px] rounded-lg border border-is-bg-border bg-is-bg-secondary font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary hover:border-is-accent hover:bg-is-accent-muted transition-all duration-200"
                >
                  {RATING_LABELS[r]}
                </button>
              ))}
            </div>
          </div>
        )}

        {rating && <MarcusNote tone="gentle" body={RATING_FEEDBACK[rating]} />}
      </div>
    </LessonLayout>
  );
}
