'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { workingCapital } from './data';
import type { SlideProps } from './types';

export default function Slide08WorkingCapital({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const onToggle = (i: number) => {
    setOpenIdx((prev) => {
      const next = prev === i ? null : i;
      if (next !== null) playRevealSound();
      return next;
    });
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={handleNext} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Working Capital
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Negativ? Nicht zwingend schlecht.
          </p>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 flex flex-col gap-2 font-[family-name:var(--font-is-mono)] text-xs sm:text-sm text-is-text-secondary">
          <div className="text-is-text-primary">{workingCapital.formula1}</div>
          <div>{workingCapital.formula2}</div>
        </div>

        <ul className="flex flex-col gap-3">
          {workingCapital.scenarios.map((s, i) => {
            const isOpen = openIdx === i;
            const borderClass = s.sentiment === 'positive' ? 'border-is-success/40' : 'border-is-error/40';
            return (
              <li key={s.title} className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(i)}
                  aria-expanded={isOpen}
                  className={[
                    'min-h-[44px] flex items-center justify-between gap-3 bg-is-bg-secondary border-l-2 border rounded-r-lg p-3 text-left',
                    'transition-all duration-200 hover:bg-is-bg-tertiary',
                    borderClass,
                    isOpen ? 'bg-is-bg-tertiary' : '',
                  ].join(' ')}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="font-[family-name:var(--font-is-mono)] text-sm uppercase tracking-wider text-is-text-primary">
                      {s.title}
                    </span>
                    <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                      {s.companies}
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="bg-is-bg-tertiary border border-is-bg-border rounded-md p-3 font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                        {s.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <MarcusNote
          tone={tone}
          body='Negatives Working Capital ist eine der häufigsten Trick-Fragen. Standardantwort: "Kommt drauf an." Dann die drei Szenarien nennen. Wer einfach sagt "ist schlecht", fliegt raus.'
        />
      </div>
    </LessonLayout>
  );
}
