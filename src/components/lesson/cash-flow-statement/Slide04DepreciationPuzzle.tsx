'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import type { SlideProps } from './types';

export default function Slide04DepreciationPuzzle({ currentStep, totalSteps, onBack, onNext, tone }: SlideProps) {
  const [revealed, setRevealed] = useState(false);

  const onReveal = () => {
    if (revealed) return;
    playRevealSound();
    setRevealed(true);
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
      footer={<LessonFooterCTA onClick={handleNext} disabled={!revealed} icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Das Depreciation-Puzzle.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Eine der häufigsten Fragen im Interview.
          </p>
        </div>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-3">
          <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
            Schritt 1 — Die Frage
          </span>
          <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary leading-relaxed">
            D&amp;A ist eine non-cash Ausgabe. Trotzdem beeinflusst sie den Cash-Bestand. Wie kann das sein?
          </p>
        </div>

        {!revealed && (
          <button
            type="button"
            onClick={onReveal}
            className="self-start min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-md bg-is-bg-secondary border border-is-bg-border text-is-text-secondary hover:text-is-text-primary hover:border-is-text-muted transition-all duration-200 font-[family-name:var(--font-is-mono)] text-sm"
          >
            Erklärung zeigen <ArrowRight size={14} />
          </button>
        )}

        <AnimatePresence>
          {revealed && (
            <motion.div
              key="rev"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5"
            >
              <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-3">
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
                  Schritt 2 — Die Antwort
                </span>
                <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3 mt-1">
                  <FlowBox text="D&A senkt Pre-Tax Income" />
                  <Arrow />
                  <FlowBox text="Niedrigeres Taxable Income" />
                  <Arrow />
                  <FlowBox text="Weniger Steuern gezahlt" highlight />
                </div>
                <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary leading-relaxed mt-2">
                  D&amp;A selbst ist non-cash — aber Steuern sind cash. Weil D&amp;A die Steuerlast senkt, bleibt mehr Cash. Das ist der Mechanismus.
                </p>
              </div>

              <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5">
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider mb-3 block">
                  Zahlenbeispiel
                </span>
                <pre className="font-[family-name:var(--font-is-mono)] text-xs sm:text-sm text-is-text-primary whitespace-pre overflow-x-auto leading-relaxed">
{`Ohne D&A:  Pre-Tax Income €100M × 40% Steuer = €40M Steuern → €60M Cash
Mit D&A:   Pre-Tax Income €90M  × 40% Steuer = €36M Steuern → €54M Cash

Differenz: €4M mehr Cash durch €10M D&A`}
                </pre>
              </div>

              <div className="bg-is-bg-secondary border-l-2 border-is-accent rounded-r-lg p-4">
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-accent uppercase tracking-wider">
                  Walk-Through-Regel
                </span>
                <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary mt-1">
                  Mit dieser Art von Fragen immer in dieser Reihenfolge: 1. Income Statement → 2. Cash Flow Statement → 3. Balance Sheet.
                </p>
              </div>

              <MarcusNote
                tone={tone}
                body='Diese Frage kommt in fast jedem Interview. Wer sagt "D&A ist non-cash, also kein Effekt auf Cash" hat nicht verstanden, dass Steuern cash sind. Merkregel: Non-cash ≠ kein Steuereffekt.'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}

function FlowBox({ text, highlight }: { text: string; highlight?: boolean }) {
  return (
    <div
      className={[
        'flex-1 min-h-[60px] flex items-center justify-center text-center px-3 py-2 rounded-md border',
        'font-[family-name:var(--font-is-mono)] text-xs sm:text-sm',
        highlight
          ? 'border-is-accent bg-is-accent-muted text-is-text-primary'
          : 'border-is-bg-border bg-is-bg-tertiary text-is-text-primary',
      ].join(' ')}
    >
      {text}
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center self-center text-is-text-muted">
      <span className="hidden sm:inline">→</span>
      <span className="sm:hidden">↓</span>
    </div>
  );
}
