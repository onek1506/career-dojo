'use client';

import { ArrowRight } from 'lucide-react';
import type { LessonEntry } from '@/lib/home/lesson-registry';

interface NextLessonCardProps {
  lesson: LessonEntry;
  onStart: () => void;
}

export default function NextLessonCard({ lesson, onStart }: NextLessonCardProps) {
  return (
    <button
      type="button"
      onClick={onStart}
      className="group w-full bg-is-bg-secondary border border-is-bg-border rounded-xl p-6 text-left transition-all duration-200 hover:border-is-accent hover:shadow-[0_0_18px_rgba(255,107,0,0.18)] cursor-pointer"
    >
      <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
        {lesson.module}
      </span>
      <h2 className="font-[family-name:var(--font-is-serif)] text-2xl sm:text-3xl text-is-text-primary mt-2 leading-tight">
        {lesson.title}
      </h2>
      <p className="font-[family-name:var(--font-is-sans)] text-sm text-is-text-secondary mt-1">
        {lesson.titleDe}
      </p>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-is-bg-border">
        <Stat label="DAUER" value={`${lesson.duration} MIN`} />
        <Stat label="XP" value={`+${lesson.xp}`} accent />
        <Stat label="MODUL" value={lesson.module.split('·').pop()?.trim() ?? ''} small />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 bg-is-accent text-is-bg-primary font-semibold py-4 rounded-lg font-[family-name:var(--font-is-sans)] transition-colors group-hover:bg-is-accent-hover">
        Lektion starten
        <ArrowRight size={16} />
      </div>
    </button>
  );
}

function Stat({ label, value, accent, small }: { label: string; value: string; accent?: boolean; small?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-[family-name:var(--font-is-mono)] text-[10px] text-is-text-muted uppercase tracking-widest">
        {label}
      </span>
      <span
        className={[
          'font-[family-name:var(--font-is-mono)] tabular-nums',
          small ? 'text-xs sm:text-sm' : 'text-base sm:text-lg',
          accent ? 'text-is-accent' : 'text-is-text-primary',
        ].join(' ')}
      >
        {value}
      </span>
    </div>
  );
}
