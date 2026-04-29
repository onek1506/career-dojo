'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight } from 'lucide-react';
import LessonLayout from '../LessonLayout';
import { playClickSound } from '@/lib/sounds';
import { proTips, type ProTip } from './data';
import type { SlideProps } from './types';

const TAG_COLORS: Record<ProTip['tagColor'], { text: string; dot: string }> = {
  accent: { text: 'text-is-accent', dot: 'bg-is-accent' },
  gold: { text: 'text-is-gold', dot: 'bg-is-gold' },
  success: { text: 'text-is-success', dot: 'bg-is-success' },
};

export default function Slide09ProTips({ currentStep, totalSteps, onBack, onNext }: SlideProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const isLast = activeIndex === proTips.length - 1;

  const handleAction = () => {
    if (!emblaApi) return;
    playClickSound();
    if (isLast) {
      onNext();
      return;
    }
    emblaApi.scrollNext();
  };

  const footer = (
    <button
      type="button"
      onClick={handleAction}
      className="w-full min-h-[44px] flex items-center justify-center gap-2 py-3 sm:py-4 rounded-lg bg-is-accent text-is-bg-primary font-semibold font-[family-name:var(--font-is-sans)] hover:bg-is-accent-hover transition-all duration-200"
    >
      {isLast ? 'Quiz starten' : 'Nächster Tipp'}
      <ArrowRight size={16} />
    </button>
  );

  return (
    <LessonLayout currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} footer={footer}>
      <div className="flex flex-col gap-5 sm:gap-6">
        <h2 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl font-medium text-is-text-primary leading-tight">
          Drei Pro-Tipps zur Bilanz.
        </h2>

        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex">
            {proTips.map((tip) => {
              const color = TAG_COLORS[tip.tagColor];
              return (
                <div key={tip.tag} className="min-w-0 flex-[0_0_100%] px-2">
                  <article className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 min-h-[200px] flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${color.dot}`} aria-hidden />
                      <span className={`font-[family-name:var(--font-is-mono)] text-xs uppercase tracking-wider ${color.text}`}>
                        {tip.tag}
                      </span>
                    </div>
                    <p className="font-[family-name:var(--font-is-sans)] text-base text-is-text-primary leading-relaxed flex-1 italic">
                      {tip.body}
                    </p>
                    <div className="flex items-center gap-2 pt-3 border-t border-is-bg-border">
                      <div
                        aria-hidden
                        className="flex items-center justify-center w-6 h-6 rounded-full border border-is-accent text-is-text-primary text-[9px] font-[family-name:var(--font-is-mono)] tracking-wider"
                        style={{ background: 'var(--is-bg-tertiary)' }}
                      >
                        MH
                      </div>
                      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
                        — Marcus Hart
                      </span>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Tipp-Auswahl">
          {proTips.map((tip, i) => (
            <button
              key={tip.tag}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Tipp ${i + 1}: ${tip.tag}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={[
                'h-2 rounded-full transition-all duration-200 min-w-[8px] min-h-[8px]',
                i === activeIndex ? 'w-6 bg-is-accent' : 'w-2 bg-is-bg-border',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </LessonLayout>
  );
}
