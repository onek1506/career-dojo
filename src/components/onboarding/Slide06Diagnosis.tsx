'use client';

import { ArrowRight } from 'lucide-react';
import OnboardingLayout from './OnboardingLayout';
import LessonFooterCTA from '@/components/lesson/LessonFooterCTA';
import MarcusNote from '@/components/lesson/MarcusNote';
import { getDiagnosticData, MARCUS_DIAGNOSIS_TEXTS } from '@/lib/onboarding/profile';
import type { OnboardingSlideProps } from './types';

export default function Slide06Diagnosis({
  currentStep,
  totalSteps,
  profile,
  onBack,
  onNext,
}: OnboardingSlideProps) {
  const data = getDiagnosticData(profile);
  const skill = profile.skillProfile ?? 'B';
  const marcus = MARCUS_DIAGNOSIS_TEXTS[skill];

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      footer={<LessonFooterCTA onClick={onNext} label="Plan annehmen" icon={<ArrowRight size={16} />} />}
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary leading-tight">
          Hier ist meine Einschätzung.
        </h2>

        <div className="bg-is-bg-secondary border border-is-bg-border rounded-xl p-5 sm:p-6 font-[family-name:var(--font-is-mono)] text-sm">
          <div className="flex flex-col gap-2.5">
            <Row label="PROFIL" value={data.profileLabel} />
            <Row label="ZIELINTERVIEW" value={data.goalLabel} />
            <Row label="ZEITFENSTER" value={data.timeFrameLabel} />
            <Row label="WISSENSSTAND" value={data.knowledgeDescription} />
          </div>
          <hr className="my-5 border-is-bg-border" />
          <div className="text-[10px] text-is-text-muted uppercase tracking-wider mb-3">
            Empfohlener Lernplan
          </div>
          <div className="flex flex-col gap-2.5">
            <Row label="Tägliche Übungszeit" value={`${data.dailyMinutes} Min`} accent />
            <Row label="Lektionen bis Interview-ready" value={String(data.lessonsCount)} accent />
            <Row label="Erste Lektion" value="Income Statement" accent />
          </div>
        </div>

        <MarcusNote tone="sharp" subject={marcus.subject} body={marcus.body} />
      </div>
    </OnboardingLayout>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
      <span className="text-is-text-secondary truncate">{label}</span>
      <span className={accent ? 'text-is-accent text-right' : 'text-is-text-primary text-right'}>
        {value}
      </span>
    </div>
  );
}
