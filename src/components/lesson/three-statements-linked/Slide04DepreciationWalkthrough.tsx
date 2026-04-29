'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { depreciationWalkthrough } from './data';
import type { SlideProps } from './types';

export default function Slide04DepreciationWalkthrough({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  tone,
}: SlideProps) {
  const [revealedSteps, setRevealedSteps] = useState(0);
  const totalRevealable = depreciationWalkthrough.steps.length;
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
            PDF-Frage 6
          </span>
          <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl font-medium text-is-text-primary leading-snug">
            &bdquo;Walk me through how Depreciation going up by $10 would affect the statements.&ldquo;
          </h2>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-lg p-4 font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary">
          {depreciationWalkthrough.scenario}
        </div>

        <div className="flex flex-col gap-3">
          {depreciationWalkthrough.steps.map((s, i) => {
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
            {revealedSteps === 0
              ? 'Income Statement →'
              : revealedSteps === 1
                ? 'Cash Flow Statement →'
                : 'Balance Sheet →'}
          </button>
        )}

        <AnimatePresence>
          {allRevealed && (
            <motion.div
              key="rule"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
            >
              <div className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-lg p-4">
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-accent uppercase tracking-wider">
                  Schlüsselregel
                </span>
                <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary mt-1">
                  Immer in dieser Reihenfolge: 1. Income Statement → 2. Cash Flow Statement → 3. Balance Sheet. So kannst du am Ende prüfen, ob die Bilanz balanciert.
                </p>
              </div>
              <MarcusNote
                tone={tone}
                body="Diese Frage bekommst du mit 90% Wahrscheinlichkeit im Interview. Die Antwort ist immer gleich aufgebaut. Übe sie laut — 3 Sätze pro Statement, in Reihenfolge."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
