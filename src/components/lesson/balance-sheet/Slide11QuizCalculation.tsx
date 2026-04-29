'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playStreakSound } from '@/lib/sounds';
import { calculateQuizXp } from '@/lib/lesson/xp';
import { quiz2 } from './data';
import { priorStreakFor, type SlideProps } from './types';

const BASE_XP = 10;

type State = 'idle' | 'submitted-wrong-1' | 'submitted-wrong-2' | 'submitted-correct';

export default function Slide11QuizCalculation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  quizResults,
  tone,
}: SlideProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [state, setState] = useState<State>('idle');
  const [solvedOnAttempt, setSolvedOnAttempt] = useState<1 | 2 | null>(null);

  const isCorrect = state === 'submitted-correct';
  const isWrongFirst = state === 'submitted-wrong-1';
  const isWrongFinal = state === 'submitted-wrong-2';
  const isResolved = isCorrect || isWrongFinal;
  const showHint = isResolved || isWrongFirst;
  const priorStreak = priorStreakFor('q2', quizResults);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = quiz2.options.find((o) => o.id === selected)?.correct === true;
    if (correct) {
      const attempts: 1 | 2 = state === 'submitted-wrong-1' ? 2 : 1;
      const xpInfo = calculateQuizXp(true, attempts, BASE_XP);
      playCorrectSound();
      if (xpInfo.countsForStreak) window.setTimeout(() => playStreakSound(), 250);
      setSolvedOnAttempt(attempts);
      setState('submitted-correct');
      onAnswer?.('q2', { correct: true, attempts, ...xpInfo });
    } else if (state === 'idle') {
      playWrongSound();
      setState('submitted-wrong-1');
    } else {
      const xpInfo = calculateQuizXp(false, 2, BASE_XP);
      playWrongSound();
      setState('submitted-wrong-2');
      onAnswer?.('q2', { correct: false, attempts: 2, ...xpInfo });
    }
  };

  const handleRetry = () => setSelected(null);
  const handleNext = () => {
    playClickSound();
    onNext();
  };

  let ctaLabel: string;
  let ctaAction: () => void;
  let ctaDisabled = false;
  if (isResolved) {
    ctaLabel = 'Weiter';
    ctaAction = handleNext;
  } else if (isWrongFirst) {
    if (selected) {
      ctaLabel = 'Antwort prüfen';
      ctaAction = handleSubmit;
    } else {
      ctaLabel = 'Nochmal versuchen';
      ctaAction = handleRetry;
      ctaDisabled = true;
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
      {isResolved && <ArrowRight size={16} />}
    </button>
  );

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={footer}>
      <div className="flex flex-col gap-5">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          {quiz2.header}
        </span>

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          {quiz2.question}
        </h2>

        <div className="flex flex-col gap-2">
          {quiz2.options.map((opt) => {
            const isSelected = selected === opt.id;
            const wasSubmittedWrong = (isWrongFirst || isWrongFinal) && isSelected;
            let stateClass = 'border-is-bg-border hover:bg-is-bg-tertiary';
            if (isCorrect && opt.correct) stateClass = 'border-is-success bg-is-success-muted';
            else if (isCorrect) stateClass = 'border-is-bg-border opacity-60';
            else if (isWrongFinal) {
              if (opt.correct) stateClass = 'border-is-success bg-is-success-muted';
              else if (wasSubmittedWrong) stateClass = 'border-is-error bg-is-error-muted';
              else stateClass = 'border-is-bg-border opacity-60';
            } else if (isWrongFirst && wasSubmittedWrong)
              stateClass = 'border-is-error bg-is-error-muted';
            else if (isSelected) stateClass = 'border-is-text-primary';

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => !isResolved && setSelected(opt.id)}
                disabled={isResolved}
                className={[
                  'flex items-center gap-4 p-4 min-h-[44px] rounded-lg bg-is-bg-secondary border text-left',
                  'transition-all duration-200 cursor-pointer disabled:cursor-default',
                  stateClass,
                ].join(' ')}
              >
                <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted w-4 shrink-0">
                  {opt.id}
                </span>
                <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary tabular-nums">
                  {opt.label}
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
                  Rechenweg <span className="text-is-text-primary">{quiz2.workingOut}</span>
                </p>
              </div>

              {isCorrect && (
                <>
                  <MarcusNote tone={tone} body={quiz2.feedback.correct} />
                  {solvedOnAttempt === 1 ? (
                    <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
                      <span aria-hidden className="text-is-accent">🔥</span>
                      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                        {priorStreak + 1} in Folge richtig · Quiz abgeschlossen
                      </span>
                    </div>
                  ) : (
                    <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                      Beim zweiten Versuch geschafft · +5 XP
                    </span>
                  )}
                </>
              )}

              {isWrongFirst && <MarcusNote tone={tone} subject="Re: Beim zweiten Mal" body={quiz2.feedback.wrong} />}

              {isWrongFinal && (
                <>
                  <MarcusNote tone={tone} body="Kein Problem. Schau dir den Rechenweg oben an." />
                  <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-error">
                    <span aria-hidden className="text-is-error">🔥</span>
                    <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-error">
                      0 · Streak unterbrochen
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
