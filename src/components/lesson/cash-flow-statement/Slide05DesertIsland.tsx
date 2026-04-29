'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playCorrectSound, playWrongSound } from '@/lib/sounds';
import type { SlideProps } from './types';

const OPTIONS = [
  { id: 'A', label: 'Income Statement', correct: false },
  { id: 'B', label: 'Balance Sheet', correct: false },
  { id: 'C', label: 'Cash Flow Statement', correct: true },
] as const;

export default function Slide05DesertIsland({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const [picked, setPicked] = useState<string | null>(null);

  const onPick = (id: string) => {
    if (picked) return;
    setPicked(id);
    if (OPTIONS.find((o) => o.id === id)?.correct) playCorrectSound();
    else playWrongSound();
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const isCorrect = picked && OPTIONS.find((o) => o.id === picked)?.correct === true;

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} disabled={!picked} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent tracking-wider uppercase">
            Klassiker
          </span>
          <p className="font-[family-name:var(--font-is-sans)] italic text-is-text-secondary">
            Die berühmteste Accounting-Frage im Interview.
          </p>
        </div>

        <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium text-is-text-primary leading-snug">
          Du bist auf einer einsamen Insel gestrandet. Du hast nur ein Dokument dabei. Welches der drei Statements nimmst du, um die finanzielle Gesundheit einer Firma zu beurteilen?
        </h2>

        <div className="flex flex-col gap-2">
          {OPTIONS.map((opt) => {
            const isPicked = picked === opt.id;
            const stateClass = !picked
              ? 'border-is-bg-border hover:bg-is-bg-tertiary'
              : opt.correct
                ? 'border-is-success bg-is-success-muted'
                : isPicked
                  ? 'border-is-error bg-is-error-muted'
                  : 'border-is-bg-border opacity-60';
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onPick(opt.id)}
                disabled={!!picked}
                className={[
                  'flex items-center gap-4 p-4 min-h-[44px] rounded-lg bg-is-bg-secondary border text-left',
                  'transition-all duration-200 cursor-pointer disabled:cursor-default',
                  stateClass,
                ].join(' ')}
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
          {picked && (
            <motion.div
              key="fb"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3"
            >
              {isCorrect ? (
                <MarcusNote
                  tone={tone}
                  body="Korrekt. Das CFS zeigt, wie viel Cash die Firma wirklich generiert — unabhängig von allen non-cash Aufwendungen. Das ist das #1 Kriterium für finanzielle Gesundheit. Wer das CFS auf der Insel hat, kann die anderen beiden rekonstruieren."
                />
              ) : (
                <MarcusNote
                  tone={tone}
                  subject="Re: Nicht optimal"
                  body="GuV und Bilanz können durch Accounting-Methoden beeinflusst werden. Das CFS nicht — hier zählt nur, was wirklich bezahlt wurde und was wirklich eingegangen ist. Das ist die ehrlichste Quelle."
                />
              )}
              <div className="bg-is-bg-secondary border border-is-bg-border rounded-md p-3">
                <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                  Bonus: &bdquo;Wenn ich 2 Statements hätte?&ldquo; → Income Statement + Balance Sheet, weil man daraus das CFS rekonstruieren kann.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
