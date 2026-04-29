'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { cfsSections } from './data';
import type { SlideProps } from './types';

export default function Slide03ThreeSections({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
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
            Drei Sektionen, eine Wahrheit.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Tippe eine Sektion an für die Details.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {cfsSections.map((s, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={s.abbr} className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(i)}
                  aria-expanded={isOpen}
                  className={[
                    'min-h-[44px] flex items-center justify-between gap-3 bg-is-bg-secondary border-l-2 rounded-r-lg p-4 text-left',
                    'transition-all duration-200 hover:bg-is-bg-tertiary',
                    s.borderColor,
                    isOpen ? 'bg-is-bg-tertiary' : '',
                  ].join(' ')}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className={`font-[family-name:var(--font-is-mono)] text-xs ${s.textColor} tracking-wider`}>
                        {s.number}
                      </span>
                      <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary tracking-wider uppercase">
                        {s.label}
                      </span>
                      <span className={`font-[family-name:var(--font-is-mono)] text-xs ${s.textColor}`}>
                        ({s.abbr})
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                      {s.labelDe}
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
                      <div className="bg-is-bg-tertiary border border-is-bg-border rounded-md p-4 flex flex-col gap-2">
                        <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                          {s.description}
                        </p>
                        <ul className="flex flex-col gap-1 mt-1">
                          {s.examples.map((ex) => (
                            <li key={ex} className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-primary">
                              {ex}
                            </li>
                          ))}
                        </ul>
                        <p className="font-[family-name:var(--font-is-sans)] text-xs text-is-text-muted italic mt-1">
                          {s.insight}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 flex flex-col items-center gap-1 font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary">
          <span>Net Change in Cash = CFO + CFI + CFF</span>
          <span className="text-xs text-is-text-muted">
            Dieser Wert = Veränderung der Cash-Position in der Bilanz.
          </span>
        </div>

        <MarcusNote
          tone={tone}
          body="Reihenfolge beim Memorieren: Operations (Kerngeschäft), Investing (Wachstum), Financing (Kapitalstruktur). In dieser Reihenfolge gehen auch die meisten Analysten vor."
        />
      </div>
    </LessonLayout>
  );
}
