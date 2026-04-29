'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound, playStreakSound } from '@/lib/sounds';
import { calculateQuizXp } from '@/lib/lesson/xp';
import { shuffle } from '@/lib/utils/shuffle';
import { priorStreakFor, type SlideProps } from './types';

// Slide 08 in the beginner variant: a single multiple-choice question that
// asks the most important conceptual takeaway from slide 02. The original
// drag-and-sort with 6 statements proved too hard for fresh beginners
// who had only seen the order once on slide 03.
const ANSWER_VALUES = [
  'Bilanz',
  'Gewinn- und Verlustrechnung',
  'Eigenkapitalveränderungsrechnung',
  'Kapitalflussrechnung',
] as const;
const CORRECT_VALUE = 'Gewinn- und Verlustrechnung';
const LETTERS = ['A', 'B', 'C', 'D'] as const;
const BASE_XP = 10;

type State = 'idle' | 'submitted-wrong-1' | 'submitted-wrong-2' | 'submitted-correct';

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
  const [state, setState] = useState<State>('idle');
  const [solvedOnAttempt, setSolvedOnAttempt] = useState<1 | 2 | null>(null);
  // Shuffle answer values once per mount, then assign letters A–D.
  // The correct letter is whatever position the correct value lands in,
  // so users can't memorise "the answer is always B".
  const [{ options: OPTIONS, correctLetter: CORRECT_LETTER }] = useState(() => {
    const shuffled = shuffle(ANSWER_VALUES);
    const options = shuffled.map((value, i) => ({ letter: LETTERS[i], value }));
    const correctLetter = options.find((o) => o.value === CORRECT_VALUE)!.letter;
    return { options, correctLetter };
  });

  const isCorrect = state === 'submitted-correct';
  const isWrongFirst = state === 'submitted-wrong-1';
  const isWrongFinal = state === 'submitted-wrong-2';
  const isResolved = isCorrect || isWrongFinal;
  const priorStreak = priorStreakFor('q1', quizResults);

  const handleSubmit = () => {
    if (!selected) return;
    const correct = selected === CORRECT_LETTER;
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
    setSelected(null);
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
      {ctaIcon && <ArrowRight size={16} />}
    </button>
  );

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} sidePanel={sidePanel} footer={footer}>
      <div className="flex flex-col gap-5">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          Frage 1 / 2 · {state === 'submitted-correct' ? '' : '+10 XP'}
        </span>

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          Welcher Bericht zeigt einen Zeitraum (z.B. das ganze Jahr 2024)?
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
                <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary">
                  {opt.value}
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
              <MarcusNote
                tone="gentle"
                body={<>Genau das. Diese Unterscheidung ist der wichtigste Punkt aus Lektion 1.</>}
              />
              <StreakReadout
                priorStreak={priorStreak}
                outcome={solvedOnAttempt === 1 ? 'first-try' : 'second-try'}
              />
            </motion.div>
          )}
          {isWrongFirst && (
            <motion.div
              key="wrong1"
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
          {isWrongFinal && (
            <motion.div
              key="wrong2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              <MarcusNote
                tone="gentle"
                body={<>Kein Problem, das verstehst du jetzt für nächstes Mal. Weiter geht&apos;s.</>}
              />
              <StreakReadout outcome="broken" priorStreak={priorStreak} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}

function StreakReadout({
  outcome,
  priorStreak,
}: {
  outcome: 'first-try' | 'second-try' | 'broken';
  priorStreak: number;
}) {
  if (outcome === 'first-try') {
    return (
      <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
        <span aria-hidden className="text-is-accent">🔥</span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
          {priorStreak + 1} in Folge richtig
        </span>
      </div>
    );
  }
  if (outcome === 'second-try') {
    return (
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
        Beim zweiten Versuch geschafft · +5 XP
      </span>
    );
  }
  return (
    <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-error">
      <span aria-hidden className="text-is-error">🔥</span>
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-error">
        0 · Streak unterbrochen
      </span>
    </div>
  );
}
