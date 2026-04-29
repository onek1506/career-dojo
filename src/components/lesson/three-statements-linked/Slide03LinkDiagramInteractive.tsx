'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import LessonFooterCTA from '../LessonFooterCTA';
import MarcusNote from '../MarcusNote';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { linkDiagram } from './data';
import type { SlideProps } from './types';

export default function Slide03LinkDiagramInteractive({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  tone,
}: SlideProps) {
  const [openLink, setOpenLink] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const allSeen = seen.size === linkDiagram.links.length;

  const onLinkClick = (id: string) => {
    setOpenLink((prev) => {
      const next = prev === id ? null : id;
      if (next) {
        playRevealSound();
        setSeen((s) => new Set(s).add(id));
      }
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
            Die Verbindungen visualisiert.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] text-is-text-secondary">
            Tippe auf jeden Link, um die Verbindung zu verstehen.
          </p>
        </div>

        {/* Three statement boxes — vertical stack on mobile, row on desktop */}
        <div className="flex flex-col md:flex-row gap-3">
          {linkDiagram.statements.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1, ease: 'easeOut' }}
              className={[
                'flex-1 bg-is-bg-secondary border-2 rounded-xl p-4 flex flex-col gap-2',
                s.borderColor,
              ].join(' ')}
            >
              <span className={`font-[family-name:var(--font-is-mono)] text-[10px] uppercase tracking-wider ${s.textColor}`}>
                {s.label}
              </span>
              <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                {s.labelDe}
              </span>
              <div className="mt-1 pt-2 border-t border-is-bg-border">
                <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
                  Schlüssel
                </span>
                <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-primary">
                  {s.keyItem}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Clickable link list */}
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
            Vier Verbindungen
          </span>
          <ul className="flex flex-col gap-2">
            {linkDiagram.links.map((link, i) => {
              const fromStatement = linkDiagram.statements.find((s) => s.id === link.from);
              const toStatement = linkDiagram.statements.find((s) => s.id === link.to);
              const isOpen = openLink === link.id;
              const wasSeen = seen.has(link.id);
              return (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
                  className="flex flex-col gap-2"
                >
                  <button
                    type="button"
                    onClick={() => onLinkClick(link.id)}
                    aria-expanded={isOpen}
                    className={[
                      'min-h-[44px] flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-is-bg-secondary border text-left',
                      'transition-all duration-200 hover:bg-is-bg-tertiary',
                      isOpen ? 'border-is-accent' : wasSeen ? 'border-is-text-muted' : 'border-is-bg-border',
                    ].join(' ')}
                  >
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className={`font-[family-name:var(--font-is-mono)] text-[10px] uppercase tracking-wider ${fromStatement?.textColor}`}>
                        {fromStatement?.labelDe}
                      </span>
                      <span className="text-is-text-muted">→</span>
                      <span className={`font-[family-name:var(--font-is-mono)] text-[10px] uppercase tracking-wider ${toStatement?.textColor}`}>
                        {toStatement?.labelDe}
                      </span>
                      <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-primary ml-1">
                        · {link.label}
                      </span>
                    </div>
                    <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted">
                      {wasSeen ? '✓' : '+'}
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
                        <div className="bg-is-bg-tertiary border border-is-bg-border rounded-md p-3 pr-9 relative">
                          <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
                            {link.explanation}
                          </p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenLink(null);
                            }}
                            className="absolute top-2 right-2 p-1 text-is-text-muted hover:text-is-text-primary"
                            aria-label="Schließen"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <AnimatePresence>
          {allSeen && (
            <motion.div
              key="marc"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MarcusNote
                tone={tone}
                body="Diese vier Verbindungen sind das Herz von Accounting. Wenn du sie verstehst, kannst du jede Walk-Through-Frage systematisch beantworten."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LessonLayout>
  );
}
