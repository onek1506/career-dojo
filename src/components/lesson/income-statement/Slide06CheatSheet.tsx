'use client';

import { useRef, useState } from 'react';
import { Download, ArrowRight, Check } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import type { SlideProps } from './types';

const CHEAT_SHEET_TEXT = `GUV CHEAT SHEET                       [01]
──────────────────────────────────────────
DIE 5 STATIONEN
Umsatz   →  Bruttoergebnis  →  EBITDA
         →  EBIT            →  Jahresüberschuss

DIE 2 MARGEN
Bruttomarge = Bruttoergebnis / Umsatz
Nettomarge  = Jahresüberschuss / Umsatz

REGEL
Marge in % zeigt, wie effizient ein
Unternehmen Geld verdient.
──────────────────────────────────────────`;

export default function Slide06CheatSheet({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  sidePanel,
}: SlideProps) {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const [exportState, setExportState] = useState<'idle' | 'busy' | 'done'>('idle');

  const handleExportPng = async () => {
    if (exportState === 'busy') return;
    const node =
      window.matchMedia('(min-width: 1024px)').matches ? desktopRef.current : mobileRef.current;
    if (!node) return;
    setExportState('busy');
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(node, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: getComputedStyle(node).getPropertyValue('background-color') || undefined,
      });
      const link = document.createElement('a');
      link.download = 'guv-cheat-sheet.png';
      link.href = dataUrl;
      link.click();
      playRevealSound();
      setExportState('done');
      window.setTimeout(() => setExportState('idle'), 1600);
    } catch (err) {
      console.error('PNG export failed', err);
      setExportState('idle');
    }
  };

  const handleNext = () => {
    playClickSound();
    onNext();
  };

  const footer = (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <button
        type="button"
        onClick={handleExportPng}
        disabled={exportState === 'busy'}
        className="flex items-center justify-center gap-2 w-full min-h-[44px] py-3 sm:py-4 rounded-lg bg-is-bg-secondary border border-is-bg-border text-is-text-primary font-semibold font-[family-name:var(--font-is-sans)] hover:bg-is-bg-tertiary hover:border-is-text-muted transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {exportState === 'done' ? <Check size={16} /> : <Download size={16} />}
        {exportState === 'busy' ? 'Exportiere…' : exportState === 'done' ? 'Gespeichert' : 'Als PNG'}
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="flex items-center justify-center gap-2 w-full min-h-[44px] py-3 sm:py-4 rounded-lg bg-is-accent text-is-bg-primary font-semibold font-[family-name:var(--font-is-sans)] hover:bg-is-accent-hover transition-all duration-200"
      >
        Weiter
        <ArrowRight size={16} />
      </button>
    </div>
  );

  return (
    <LessonLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      sidePanel={sidePanel}
      footer={footer}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Cheat Sheet
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] italic text-is-text-secondary">
            Screenshot-tauglich.
          </p>
        </div>

        {/* Mobile/tablet card */}
        <div ref={mobileRef} className="lg:hidden bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 flex flex-col gap-4">
          <h3 className="font-[family-name:var(--font-is-serif)] text-2xl text-is-text-primary text-center">
            GuV-Cheat-Sheet
          </h3>
          <div className="border-t border-is-bg-border pt-4 flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
              Reihenfolge
            </span>
            <ol className="flex flex-col gap-1.5 text-sm font-[family-name:var(--font-is-mono)] text-is-text-primary">
              <li>1. Umsatz</li>
              <li>2. Bruttoergebnis</li>
              <li>3. EBITDA</li>
              <li>4. EBIT</li>
              <li>5. Jahresüberschuss</li>
            </ol>
          </div>
          <div className="border-t border-is-bg-border pt-4 flex flex-col gap-2">
            <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-wider">
              Margen
            </span>
            <div className="flex flex-col gap-2 text-sm font-[family-name:var(--font-is-mono)] text-is-text-primary">
              <div>
                <div>Bruttomarge</div>
                <div className="text-is-text-secondary">= Bruttoergebnis / Umsatz</div>
              </div>
              <div>
                <div>Nettomarge</div>
                <div className="text-is-text-secondary">= Jahresüberschuss / Umsatz</div>
              </div>
            </div>
          </div>
          <div className="border-t border-is-bg-border pt-4">
            <p className="font-[family-name:var(--font-is-sans)] italic text-sm text-is-text-secondary leading-relaxed">
              Marge in % zeigt, wie effizient ein Unternehmen Geld verdient.
            </p>
          </div>
        </div>

        {/* Desktop terminal card */}
        <div ref={desktopRef} className="hidden lg:block bg-is-bg-secondary border border-is-bg-border rounded-xl p-6 overflow-hidden">
          <pre
            className="font-[family-name:var(--font-is-mono)] text-sm leading-relaxed text-is-text-primary whitespace-pre overflow-x-auto"
            style={{ tabSize: 4 }}
          >
{CHEAT_SHEET_TEXT}
          </pre>
        </div>
      </div>
    </LessonLayout>
  );
}
