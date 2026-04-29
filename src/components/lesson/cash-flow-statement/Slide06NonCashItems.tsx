'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { nonCashItems } from './data';
import type { SlideProps } from './types';

export default function Slide06NonCashItems({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
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
            Non-Cash Items + CapEx
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Die wichtigsten Add-backs und Adjustments.
          </p>
        </div>

        <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2 font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
          <span>Position</span>
          <span>Section</span>
          <span>Richtung</span>
        </div>

        <ul className="flex flex-col gap-2">
          {nonCashItems.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <li key={item.label} className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => onToggle(i)}
                  aria-expanded={isOpen}
                  className={[
                    'min-h-[44px] grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_60px_60px] gap-3 items-center px-3 py-3 rounded-lg bg-is-bg-secondary border text-left',
                    'transition-all duration-200 hover:bg-is-bg-tertiary',
                    isOpen ? 'border-is-accent' : 'border-is-bg-border',
                  ].join(' ')}
                >
                  <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary truncate">
                    {item.label}
                  </span>
                  <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-secondary">
                    {item.section}
                  </span>
                  <span
                    className={[
                      'font-[family-name:var(--font-is-mono)] text-sm tabular-nums text-center',
                      item.direction === '+'
                        ? 'text-is-success'
                        : item.direction === '−'
                          ? 'text-is-error'
                          : 'text-is-gold',
                    ].join(' ')}
                  >
                    {item.direction}
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
                        {item.reason}
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
          body="Merke: Asset going up = Cash down. Liability going up = Cash up. Diese Gegenläufigkeit ist die häufigste Fehlerquelle im Interview."
        />
      </div>
    </LessonLayout>
  );
}
