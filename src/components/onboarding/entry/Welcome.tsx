'use client';

import { useState } from 'react';
import OnboardingLayout from '../OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import MarcusNote from '@/components/lesson/MarcusNote';
import type { OnboardingSlideProps } from '../types';

export default function Welcome({ currentStep, totalSteps, onNext }: OnboardingSlideProps) {
  const [introOpen, setIntroOpen] = useState(false);

  return (
    <OnboardingLayout currentStep={currentStep} totalSteps={totalSteps} showProgress={false} footer={
      <LessonFooterCTA onClick={onNext} label="Los geht's" />
    }>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted tracking-wider uppercase">
            Career-Dojo
          </span>
          <h1 className="font-[family-name:var(--font-is-serif)] text-3xl sm:text-4xl text-is-text-primary leading-tight">
            Investment-Banking-Interviews trainieren, in kleinen Schritten.
          </h1>
        </div>

        <div className="relative">
          <MarcusNote
            subject="Re: Bevor wir loslegen"
            body="Die meisten fallen im IB-Interview nicht durch, weil sie dumm sind — sondern weil ihnen niemand gezeigt hat, wie man die Fragen wirklich beantwortet. Genau das machen wir hier."
          />
          <button
            type="button"
            onClick={() => setIntroOpen(true)}
            aria-label="Wer ist Marcus Hart?"
            className="is-info-pulse-once absolute -top-2 -right-2 w-7 h-7 rounded-full border border-is-accent flex items-center justify-center bg-is-bg-primary text-is-accent font-[family-name:var(--font-is-mono)] text-xs hover:bg-is-accent-muted transition-colors duration-200"
          >
            i
          </button>
        </div>
      </div>

      {introOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 px-4"
          onClick={() => setIntroOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-is-bg-border bg-is-bg-secondary p-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div
                aria-hidden
                className="flex items-center justify-center w-10 h-10 rounded-full border border-is-accent text-is-text-primary text-xs font-[family-name:var(--font-is-mono)] tracking-wider shrink-0"
                style={{ background: 'var(--is-bg-tertiary)' }}
              >
                MH
              </div>
              <div>
                <div className="font-[family-name:var(--font-is-serif)] text-lg text-is-text-primary leading-tight">
                  Marcus Hart
                </div>
                <div className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
                  Dein Coach durch die Vorbereitung
                </div>
              </div>
            </div>

            <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary leading-relaxed">
              Marcus begleitet dich durch jede Lektion — er stellt die Fragen, gibt Feedback,
              nennt die Fallen. Sein Ton ist direkt und ehrlich, keine Schönfärberei: wenn eine
              Antwort nicht sitzt, sagt er das, und warum. Er erwartet nicht, dass du alles
              weißt — nur, dass du dranbleibst.
            </p>

            <button
              type="button"
              onClick={() => setIntroOpen(false)}
              className="self-start font-[family-name:var(--font-is-mono)] text-xs text-is-accent hover:underline"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </OnboardingLayout>
  );
}
