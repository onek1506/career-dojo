'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowRight } from 'lucide-react';
import { proTips } from './data';
import type { SlideProps } from './types';

export default function Slide07ProTips({ onCanProceed, onNext }: SlideProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    onCanProceed?.(false);
  }, [onCanProceed]);

  const isLast = activeIndex === proTips.length - 1;

  const handleAction = () => {
    if (!emblaApi) return;
    if (isLast) {
      onNext?.();
      return;
    }
    emblaApi.scrollNext();
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-[family-name:var(--font-is-serif)] text-4xl font-medium text-is-text-primary leading-tight">
        Drei Moves, die dich vom Rest abheben.
      </h2>

      <div className="overflow-hidden -mx-2" ref={emblaRef}>
        <div className="flex">
          {proTips.map((tip) => (
            <div key={tip.tag} className="min-w-0 flex-[0_0_100%] px-2">
              <article className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 min-h-[280px] flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-accent uppercase tracking-wider">
                    {tip.tag}
                  </span>
                  <div
                    aria-hidden
                    className="flex items-center justify-center w-8 h-8 rounded-full border border-is-accent text-is-text-primary text-[10px] font-[family-name:var(--font-is-mono)] tracking-wider shrink-0"
                    style={{ background: 'var(--is-bg-tertiary)' }}
                  >
                    MH
                  </div>
                </div>
                <p className="font-[family-name:var(--font-is-sans)] text-is-text-primary leading-relaxed italic">
                  {tip.body}
                </p>
              </article>
            </div>
          ))}
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
              'h-2 rounded-full transition-all duration-200',
              i === activeIndex ? 'w-6 bg-is-accent' : 'w-2 bg-is-bg-border',
            ].join(' ')}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={handleAction}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-lg bg-is-accent text-is-bg-primary font-semibold font-[family-name:var(--font-is-sans)] hover:bg-is-accent-hover transition-all duration-200"
      >
        {isLast ? 'Quiz starten' : 'Nächster Tipp'}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
