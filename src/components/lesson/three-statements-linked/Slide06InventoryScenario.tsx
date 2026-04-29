'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { inventoryWalkthrough } from './data';
import type { SlideProps } from './types';

export default function Slide06InventoryScenario({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  tone,
}: SlideProps) {
  const [revealedSteps, setRevealedSteps] = useState(0);
  const totalRevealable = inventoryWalkthrough.steps.length;
  const allRevealed = revealedSteps >= totalRevealable;

  const onReveal = () => {
    if (revealedSteps >= totalRevealable) return;
    playRevealSound();
    setRevealedSteps((s) => s + 1);
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
      footer={<LessonFooterCTA onClick={handleNext} disabled={!allRevealed} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent tracking-wider uppercase">
            Bonus-Szenario
          </span>
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium text-is-text-primary leading-snug">
            Apple kauft Inventory mit Cash.
          </h2>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary">
          {inventoryWalkthrough.scenario}
        </div>

        <div className="flex flex-col gap-3">
          {inventoryWalkthrough.steps.map((s, i) => {
            const isVisible = i < revealedSteps;
            if (!isVisible) return null;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
                    Schritt {s.step}
                  </span>
                  <span className={`font-[family-name:var(--font-is-mono)] text-sm ${s.statementColor} uppercase tracking-wider`}>
                    {s.statement}
                  </span>
                </div>
                <div className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary">
                  {s.action}
                </div>
                <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                  {s.effect}
                </p>
              </motion.div>
            );
          })}
        </div>

        {!allRevealed && (
          <button
            type="button"
            onClick={onReveal}
            className="self-start min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-md bg-is-bg-secondary border border-is-bg-border text-is-text-secondary hover:text-is-text-primary hover:border-is-text-muted transition-all duration-200 font-[family-name:var(--font-is-mono)] text-sm"
          >
            Nächsten Schritt zeigen <ArrowRight size={14} />
          </button>
        )}

        <AnimatePresence>
          {allRevealed && (
            <motion.div
              key="m"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MarcusNote
                tone={tone}
                body="Inventory-Veränderungen sind ein Klassiker im Interview. Asset steigt → Cash sinkt. Es gibt keinen Net Income-Effekt. Punkt."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
