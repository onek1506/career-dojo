'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playStreakSound } from '@/lib/sounds';
import { priorStreakFor, type SlideProps } from './types';

// Slide 08 in the beginner variant: a single multiple-choice question that
// asks the most important conceptual takeaway from slide 02. The original
// drag-and-sort with 6 statements proved too hard for fresh beginners
// who had only seen the order once on slide 03.
const OPTIONS = [
  { letter: 'A', value: 'Bilanz' },
  { letter: 'B', value: 'Gewinn- und Verlustrechnung' },
  { letter: 'C', value: 'Eigenkapitalveränderungsrechnung' },
  { letter: 'D', value: 'Kapitalflussrechnung' },
] as const;

const CORRECT_LETTER = 'B';

export default function Slide08QuizSort({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  quizResults,
  sidePanel,
}: SlideProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ letter: string; correct: boolean } | null>(null);
  const [attempts, setAttempts] = useState(0);

  const isCorrect = submitted?.correct === true;
  const isFirstTry = isCorrect && attempts === 1;
  const priorStreak = priorStreakFor('q1', quizResults);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === CORRECT_LETTER;
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    setSubmitted({ letter: selected, correct });
    if (correct) {
      playCorrectSound();
      window.setTimeout(() => playStreakSound(), 250);
      onAnswer?.('q1', { correct: true, attempts: nextAttempts });
    } else {
      playWrongSound();
      // Wrong submissions stay in 'wrong' state until the user retries,
      // they do not lock in q1 yet — beginner can correct themselves.
    }
  };

  const handleRetry = () => {
    setSubmitted(null);
    setSelected(null);
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const ctaLabel = isCorrect ? 'Nächste Frage' : submitted ? 'Nochmal versuchen' : 'Antwort prüfen';
  const ctaAction = isCorrect ? handleNext : submitted ? handleRetry : handleSubmit;
  const ctaDisabled = !isCorrect && !submitted && !selected;

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
      {ctaLabel}
      {isCorrect && <ArrowRight size={16} />}
    </button>
  );

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} sidePanel={sidePanel} footer={footer}>
      <div className="flex flex-col gap-5">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          Frage 1 / 2 · +10 XP
        </span>

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          Welcher Bericht zeigt einen Zeitraum (z.B. das ganze Jahr 2024)?
        </h2>

        <div className="flex flex-col gap-2">
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.letter;
            const isSubmittedThis = submitted?.letter === opt.letter;
            const isCorrectOpt = opt.letter === CORRECT_LETTER;

            let stateClass = 'border-is-bg-border hover:bg-is-bg-tertiary';
            if (submitted) {
              if (isCorrectOpt && submitted.correct) {
                stateClass = 'border-is-success bg-is-success-muted';
              } else if (isSubmittedThis && !submitted.correct) {
                stateClass = 'border-is-error bg-is-error-muted';
              } else {
                stateClass = 'border-is-bg-border opacity-60';
              }
            } else if (isSelected) {
              stateClass = 'border-is-text-primary';
            }

            return (
              <button
                key={opt.letter}
                type="button"
                onClick={() => !submitted && setSelected(opt.letter)}
                disabled={!!submitted}
                className={[
                  'flex items-center gap-4 p-4 min-h-[44px] rounded-lg bg-is-bg-secondary border text-left',
                  'transition-all duration-200 cursor-pointer disabled:cursor-default',
                  stateClass,
                ].join(' ')}
              >
                <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted w-4 shrink-0">
                  {opt.letter}
                </span>
                <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary">
                  {opt.value}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {submitted && submitted.correct && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <MarcusNote
                tone="gentle"
                body={<>Genau das. Diese Unterscheidung ist der wichtigste Punkt aus Lektion 1.</>}
              />
              {isFirstTry && (
                <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
                  <span aria-hidden className="text-is-accent">🔥</span>
                  <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                    {priorStreak + 1} in Folge richtig
                  </span>
                </div>
              )}
            </motion.div>
          )}
          {submitted && !submitted.correct && (
            <motion.div
              key="wrong"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MarcusNote
                tone="gentle"
                subject="Re: Kein Stress"
                body={
                  <>
                    Das verwechselt fast jeder am Anfang. Die Bilanz zeigt einen einzigen <strong className="not-italic">Stichtag</strong>. Die GuV zeigt einen <strong className="not-italic">Zeitraum</strong>. Versuch&apos;s nochmal.
                  </>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
