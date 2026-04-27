'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playStreakSound } from '@/lib/sounds';
import { priorStreakFor, type SlideProps } from './types';

const OPTIONS = [
  { letter: 'A', value: '60%' },
  { letter: 'B', value: '40%' },
  { letter: 'C', value: '80%' },
  { letter: 'D', value: '20%' },
] as const;

const CORRECT_LETTER = 'B';

type State = 'idle' | 'submitted-wrong-1' | 'submitted-wrong-2' | 'submitted-correct';

export default function Slide09QuizCalc({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  quizResults,
  sidePanel,
}: SlideProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<State>('idle');

  const isCorrect = state === 'submitted-correct';
  const isWrongFirst = state === 'submitted-wrong-1';
  const isWrongFinal = state === 'submitted-wrong-2';
  const isResolved = isCorrect || isWrongFinal;
  const showHint = isResolved || isWrongFirst; // always once submitted
  const priorStreak = priorStreakFor('q2', quizResults);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === CORRECT_LETTER;
    if (correct) {
      const attempts = state === 'submitted-wrong-1' ? 2 : 1;
      playCorrectSound();
      window.setTimeout(() => playStreakSound(), 250);
      setState('submitted-correct');
      onAnswer?.('q2', { correct: true, attempts });
    } else if (state === 'idle') {
      playWrongSound();
      setState('submitted-wrong-1');
    } else {
      playWrongSound();
      setState('submitted-wrong-2');
      onAnswer?.('q2', { correct: false, attempts: 2 });
    }
  };

  const handleRetry = () => {
    setSelected(null);
    // keep state as wrong-1; user picks again and submits
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  let ctaLabel: string;
  let ctaAction: () => void;
  let ctaDisabled = false;
  let ctaIcon = false;
  if (isResolved) {
    ctaLabel = 'Nächste Frage';
    ctaAction = handleNext;
    ctaIcon = true;
  } else if (isWrongFirst) {
    if (selected) {
      ctaLabel = 'Antwort prüfen';
      ctaAction = handleSubmit;
    } else {
      ctaLabel = 'Nochmal versuchen';
      ctaAction = handleRetry;
      ctaDisabled = true; // wait for selection
    }
  } else {
    ctaLabel = 'Antwort prüfen';
    ctaAction = handleSubmit;
    ctaDisabled = !selected;
  }

  const footer = (
    <button
      type="button"
      onClick={ctaAction}
      disabled={ctaDisabled}
      className={[
        'w-full min-h-[44px] py-3 sm:py-4 rounded-lg font-semibold font-[family-name:var(--font-is-sans)] transition-all duration-200 flex items-center justify-center gap-2',
        ctaDisabled
          ? 'bg-is-bg-tertiary text-is-text-muted cursor-not-allowed'
          : 'bg-is-accent text-is-bg-primary hover:bg-is-accent-hover',
      ].join(' ')}
    >
      {isWrongFirst && selected ? <RotateCcw size={14} /> : null}
      {ctaLabel}
      {ctaIcon && <ArrowRight size={16} />}
    </button>
  );

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} sidePanel={sidePanel} footer={footer}>
      <div className="flex flex-col gap-5">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          Frage 2 / 2 · +{state === 'submitted-wrong-1' || state === 'submitted-wrong-2' ? 5 : 10} XP
        </span>

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          TechCo · Umsatz €200M, COGS €120M. Wie hoch ist die Bruttomarge?
        </h2>

        <div className="flex flex-col gap-2">
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.letter;
            const wasMostRecentlySubmitted =
              (isWrongFirst || isWrongFinal) && isSelected;
            const isCorrectOpt = opt.letter === CORRECT_LETTER;

            let stateClass = 'border-is-bg-border hover:bg-is-bg-tertiary';
            if (isCorrect && isCorrectOpt) {
              stateClass = 'border-is-success bg-is-success-muted';
            } else if (isCorrect) {
              stateClass = 'border-is-bg-border opacity-60';
            } else if (isWrongFinal) {
              if (isCorrectOpt) stateClass = 'border-is-success bg-is-success-muted';
              else if (wasMostRecentlySubmitted) stateClass = 'border-is-error bg-is-error-muted';
              else stateClass = 'border-is-bg-border opacity-60';
            } else if (isWrongFirst && wasMostRecentlySubmitted) {
              stateClass = 'border-is-error bg-is-error-muted';
            } else if (isSelected) {
              stateClass = 'border-is-text-primary';
            }

            const disabled = isResolved;

            return (
              <button
                key={opt.letter}
                type="button"
                onClick={() => !disabled && setSelected(opt.letter)}
                disabled={disabled}
                className={[
                  'flex items-center gap-4 p-4 min-h-[44px] rounded-lg bg-is-bg-secondary border text-left',
                  'transition-all duration-200 cursor-pointer disabled:cursor-default',
                  stateClass,
                ].join(' ')}
              >
                <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted w-4 shrink-0">
                  {opt.letter}
                </span>
                <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary tabular-nums">
                  {opt.value}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showHint && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <div className="bg-is-bg-secondary border border-is-bg-border rounded-md p-3">
                <p className="font-[family-name:var(--font-is-mono)] text-xs sm:text-sm text-is-text-secondary leading-relaxed">
                  Rechenweg <span className="text-is-text-primary">(Umsatz − COGS) / Umsatz = (200 − 120) / 200 = 80 / 200 = 40%</span>
                </p>
              </div>

              {isCorrect && (
                <>
                  <MarcusNote
                    tone="gentle"
                    body={
                      <>
                        Sehr gut. Du hast gerade deine erste Margen-Berechnung gemacht — genau so läuft das in echten Pitchbooks.
                      </>
                    }
                  />
                  <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
                    <span aria-hidden className="text-is-accent">🔥</span>
                    <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                      {priorStreak + 1} in Folge richtig · Quiz abgeschlossen
                    </span>
                  </div>
                </>
              )}

              {isWrongFirst && (
                <MarcusNote
                  tone="gentle"
                  subject="Re: Beim zweiten Mal"
                  body={
                    <>
                      Schau dir den Rechenweg oben an, dann probier&apos;s nochmal. Beim zweiten Versuch gibt&apos;s noch +5 XP.
                    </>
                  }
                />
              )}

              {isWrongFinal && (
                <MarcusNote
                  tone="gentle"
                  body={<>Kein Problem, das verstehst du jetzt für nächstes Mal. Weiter geht&apos;s.</>}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
