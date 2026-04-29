'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Download, Check } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import { playClickSound, playRevealSound } from '@/lib/sounds';
import { walkthroughRule } from './data';
import type { SlideProps } from './types';

export default function Slide05WalkThroughRule({ currentStep, totalSteps, onBack, onNext }: SlideProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [exportState, setExportState] = useState<'idle' | 'busy' | 'done'>('idle');

  const handleExport = async () => {
    if (!cardRef.current || exportState === 'busy') return;
    setExportState('busy');
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: getComputedStyle(cardRef.current).getPropertyValue('background-color') || undefined,
      });
      const link = document.createElement('a');
      link.download = 'walkthrough-regel.png';
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
        onClick={handleExport}
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
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={footer}>
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
            Die Walk-Through Regel.
          </h2>
          <p className="font-[family-name:var(--font-is-sans)] italic text-is-text-secondary">
            Speicher das. Du brauchst es in jedem Interview.
          </p>
        </div>

        <div ref={cardRef} className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6">
          <pre
            className="font-[family-name:var(--font-is-mono)] text-xs sm:text-sm leading-relaxed text-is-text-primary whitespace-pre overflow-x-auto"
            style={{ tabSize: 2 }}
          >
{walkthroughRule}
          </pre>
        </div>
      </div>
    </LessonLayout>
  );
}
