'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw } from 'lucide-react';
import LessonLayout from '../../LessonLayout';
import MarcusNote from '../../MarcusNote';
import {
  playClickSound,
  playCorrectSound,
  playWrongSound,
  playStreakSound,
} from '@/lib/sounds';
import { shuffle } from '@/lib/utils/shuffle';
import { calculateQuizXp } from '../xp';
import { rich } from '../rich';
import type { MiniCheckContent, MiniCheckSlide as MiniCheckSlideData, QuizResult } from '../types';

interface Props {
  slide: MiniCheckSlideData;
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onAnswer: (key: string, result: QuizResult) => void;
  priorStreak: number;
  quizIndex: number; // 1-based position among mini-checks
  quizTotal: number;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'] as const;

type State = 'idle' | 'wrong-1' | 'wrong-final' | 'correct';

function resolveContent(slide: MiniCheckSlideData): MiniCheckContent {
  if (slide.generate) return slide.generate();
  return {
    prompt: slide.prompt ?? '',
    options: slide.options ?? [],
    correctIndex: slide.correctIndex ?? 0,
    solution: slide.solution ?? '',
  };
}

export default function MiniCheckSlide({
  slide,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onAnswer,
  priorStreak,
  quizIndex,
  quizTotal,
}: Props) {
  const baseXp = slide.baseXp ?? 10;
  const hasMarcus = Boolean(slide.marcusCorrect || slide.marcusWrong);

  // Resolve the question once per mount (randomized generators stay stable
  // for the lifetime of the slide), then shuffle answer positions.
  const [{ content, options, correctPos }] = useState(() => {
    const c = resolveContent(slide);
    const indexed = c.options.map((text, originalIndex) => ({ text, originalIndex }));
    const shuffled = shuffle(indexed);
    const correctPos = shuffled.findIndex((o) => o.originalIndex === c.correctIndex);
    return { content: c, options: shuffled, correctPos };
  });

  const [selected, setSelected] = useState<number | null>(null);
  const [state, setState] = useState<State>('idle');
  const [solvedOnAttempt, setSolvedOnAttempt] = useState<1 | 2 | null>(null);

  const isCorrect = state === 'correct';
  const isWrongFirst = state === 'wrong-1';
  const isWrongFinal = state === 'wrong-final';
  const isResolved = isCorrect || isWrongFinal;
  const showHint = isResolved || isWrongFirst;

  const handleSubmit = () => {
    if (selected === null) return;
    const correct = selected === correctPos;
    if (correct) {
      const attempts: 1 | 2 = state === 'wrong-1' ? 2 : 1;
      const xpInfo = calculateQuizXp(true, attempts, baseXp);
      playCorrectSound();
      if (xpInfo.countsForStreak) window.setTimeout(() => playStreakSound(), 250);
      setSolvedOnAttempt(attempts);
      setState('correct');
      onAnswer(slide.id, { correct: true, attempts, ...xpInfo });
    } else if (state === 'idle') {
      playWrongSound();
      setState('wrong-1');
    } else {
      const xpInfo = calculateQuizXp(false, 2, baseXp);
      playWrongSound();
      setState('wrong-final');
      onAnswer(slide.id, { correct: false, attempts: 2, ...xpInfo });
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
  let ctaArrow = false;
  if (isResolved) {
    ctaLabel = 'Weiter';
    ctaAction = handleNext;
    ctaArrow = true;
  } else if (isWrongFirst) {
    if (selected !== null) {
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
    ctaDisabled = selected === null;
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
      {isWrongFirst && selected !== null ? <RotateCcw size={14} /> : null}
      {ctaLabel}
      {ctaArrow && <ArrowRight size={16} />}
    </button>
  );

  const xpShown = isWrongFirst || isWrongFinal ? Math.floor(baseXp / 2) : baseXp;

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={footer}>
      <div className="flex flex-col gap-5">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
          Frage {quizIndex} / {quizTotal} · +{xpShown} XP
        </span>

        <h2 className="font-[family-name:var(--font-is-serif)] text-xl sm:text-3xl font-medium text-is-text-primary leading-tight">
          {content.prompt}
        </h2>

        <div className="flex flex-col gap-2">
          {options.map((opt, pos) => {
            const letter = LETTERS[pos];
            const isSelected = selected === pos;
            const wasSubmitted = (isWrongFirst || isWrongFinal) && isSelected;
            const isCorrectOpt = pos === correctPos;

            let stateClass = 'border-is-bg-border hover:bg-is-bg-tertiary';
            if (isCorrect && isCorrectOpt) {
              stateClass = 'border-is-success bg-is-success-muted';
            } else if (isCorrect) {
              stateClass = 'border-is-bg-border opacity-60';
            } else if (isWrongFinal) {
              if (isCorrectOpt) stateClass = 'border-is-success bg-is-success-muted';
              else if (wasSubmitted) stateClass = 'border-is-error bg-is-error-muted';
              else stateClass = 'border-is-bg-border opacity-60';
            } else if (isWrongFirst && wasSubmitted) {
              stateClass = 'border-is-error bg-is-error-muted';
            } else if (isSelected) {
              stateClass = 'border-is-text-primary';
            }

            return (
              <button
                key={pos}
                type="button"
                onClick={() => !isResolved && setSelected(pos)}
                disabled={isResolved}
                className={[
                  'flex items-center gap-4 p-4 min-h-[44px] rounded-lg bg-is-bg-secondary border text-left',
                  'transition-all duration-200 cursor-pointer disabled:cursor-default',
                  stateClass,
                ].join(' ')}
              >
                <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-muted w-4 shrink-0">
                  {letter}
                </span>
                <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary">
                  {opt.text}
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
                  {content.solution}
                </p>
              </div>

              {isCorrect && (
                <>
                  {slide.marcusCorrect && <MarcusNote tone="gentle" body={rich(slide.marcusCorrect)} />}
                  {solvedOnAttempt === 1 ? (
                    <div className="self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-is-bg-secondary border border-is-bg-border">
                      <span aria-hidden className="text-is-accent">🔥</span>
                      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                        {priorStreak + 1} in Folge richtig
                      </span>
                    </div>
                  ) : (
                    <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                      Beim zweiten Versuch geschafft · +{Math.floor(baseXp / 2)} XP
                    </span>
                  )}
                </>
              )}

              {isWrongFirst &&
                (slide.marcusWrong ? (
                  <MarcusNote tone="gentle" subject="Re: Beim zweiten Mal" body={rich(slide.marcusWrong)} />
                ) : (
                  <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                    Schau dir den Rechenweg an und probier es nochmal.
                  </span>
                ))}

              {isWrongFinal && (
                <>
                  {hasMarcus && (
                    <MarcusNote
                      tone="gentle"
                      body="Kein Problem, das verstehst du jetzt fürs nächste Mal. Weiter geht's."
                    />
                  )}
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
