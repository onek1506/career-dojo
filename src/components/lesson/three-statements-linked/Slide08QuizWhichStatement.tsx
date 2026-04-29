'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playStreakSound } from '@/lib/sounds';
import { calculateQuizXp } from '@/lib/lesson/xp';
import { quiz1 } from './data';
import { priorStreakFor, type SlideProps } from './types';

const BASE_XP = 15;

type State = 'idle' | 'submitted-wrong-1' | 'submitted-wrong-2' | 'submitted-correct';

export default function Slide08QuizWhichStatement({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  quizResults,
  tone,
}: SlideProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [state, setState] = useState<State>('idle');
  const [solvedOnAttempt, setSolvedOnAttempt] = useState<1 | 2 | null>(null);

  const isCorrect = state === 'submitted-correct';
  const isWrongFirst = state === 'submitted-wrong-1';
  const isWrongFinal = state === 'submitted-wrong-2';
  const isResolved = isCorrect || isWrongFinal;
  const priorStreak = priorStreakFor('q1', quizResults);

  const correctIds = new Set(quiz1.options.filter((o) => o.correct).map((o) => o.id));

  const evaluate = () => {
    const allCorrectSelected = [...correctIds].every((id) => selected.has(id));
    const noWrongSelected = [...selected].every((id) => correctIds.has(id));
    return allCorrectSelected && noWrongSelected;
  };

  const onToggle = (id: string) => {
    if (isResolved) return;
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    const correct = evaluate();
    if (correct) {
      const attempts: 1 | 2 = state === 'submitted-wrong-1' ? 2 : 1;
      const xpInfo = calculateQuizXp(true, attempts, BASE_XP);
      playCorrectSound();
      if (xpInfo.countsForStreak) window.setTimeout(() => playStreakSound(), 250);
      setSolvedOnAttempt(attempts);
      setState('submitted-correct');
      onAnswer?.('q1', { correct: true, attempts, ...xpInfo });
    } else if (state === 'idle') {
      playWrongSound();
      setState('submitted-wrong-1');
    } else {
      const xpInfo = calculateQuizXp(false, 2, BASE_XP);
      playWrongSound();
      setState('submitted-wrong-2');
      onAnswer?.('q1', { correct: false, attempts: 2, ...xpInfo });
    }
  };

  const handleRetry = () => {
    setState('idle');
    setSelected(new Set());
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  // Determine partial vs all-correct vs wrong feedback
  const partialMatch = !isCorrect && [...correctIds].some((id) => selected.has(id));

  let ctaLabel: string;
  let ctaAction: () => void;
  let ctaDisabled = false;
  if (isResolved) {
    ctaLabel = 'Nächste Frage';
    ctaAction = handleNext;
  } else if (isWrongFirst) {
    ctaLabel = 'Nochmal versuchen';
    ctaAction = handleRetry;
  } else {
    ctaLabel = 'Antwort prüfen';
    ctaAction = handleSubmit;
    ctaDisabled = selected.size === 0;
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
      {isWrongFirst ? <RotateCcw size={14} /> : null}
      {ctaLabel}
      {isResolved && <ArrowRight size={16} />}
    </button>
  );

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={footer}>
      <div className="flex flex-col gap-5">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          {quiz1.header}
        </span>

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          {quiz1.question}
        </h2>

        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          {selected.size} / {correctIds.size} richtige Antworten ausgewählt
        </span>

        <div className="flex flex-col gap-2">
          {quiz1.options.map((opt) => {
            const isSelected = selected.has(opt.id);
            const isCorrectOpt = opt.correct;
            let stateClass: string;
            if (!isResolved) {
              stateClass = isSelected
                ? 'border-is-accent bg-is-accent-muted'
                : 'border-is-bg-border bg-is-bg-secondary hover:bg-is-bg-tertiary';
            } else {
              if (isSelected && isCorrectOpt) stateClass = 'border-is-success bg-is-success-muted';
              else if (isSelected && !isCorrectOpt) stateClass = 'border-is-error bg-is-error-muted';
              else if (!isSelected && isCorrectOpt)
                stateClass = 'border-is-success border-dashed bg-is-bg-secondary';
              else stateClass = 'border-is-bg-border bg-is-bg-secondary opacity-60';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onToggle(opt.id)}
                disabled={isResolved}
                className={[
                  'flex items-center gap-4 p-4 min-h-[44px] rounded-lg border text-left',
                  'transition-all duration-200 cursor-pointer disabled:cursor-default',
                  stateClass,
                ].join(' ')}
                aria-pressed={isSelected}
              >
                <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted w-4 shrink-0">
                  {opt.id}
                </span>
                <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary">
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {isCorrect && (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <MarcusNote tone={tone} body={quiz1.feedback.allCorrect} />
              {solvedOnAttempt === 1 ? (
                <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
                  <span aria-hidden className="text-is-accent">🔥</span>
                  <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                    {priorStreak + 1} in Folge richtig
                  </span>
                </div>
              ) : (
                <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                  Beim zweiten Versuch geschafft · +{Math.floor(BASE_XP / 2)} XP
                </span>
              )}
            </motion.div>
          )}

          {isWrongFirst && (
            <motion.div
              key="wf"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <MarcusNote
                tone={tone}
                subject="Re: Korrektur"
                body={partialMatch ? quiz1.feedback.partial : quiz1.feedback.wrong}
              />
            </motion.div>
          )}

          {isWrongFinal && (
            <motion.div
              key="wd"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <MarcusNote tone={tone} body={quiz1.feedback.partial} />
              <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-error">
                <span aria-hidden className="text-is-error">🔥</span>
                <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-error">
                  0 · Streak unterbrochen
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
