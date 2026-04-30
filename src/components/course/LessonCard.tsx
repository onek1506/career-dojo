'use client';

import { CheckCircle2, Play, Lock, ChevronRight } from 'lucide-react';
import type { LessonEntry } from '@/lib/home/lesson-registry';
import type { LessonState } from '@/lib/course/course-utils';

interface LessonCardProps {
  lesson: LessonEntry;
  state: LessonState;
  onClick: () => void;
}

export default function LessonCard({ lesson, state, onClick }: LessonCardProps) {
  if (state === 'completed') {
    return (
      <div className="flex items-center gap-3 bg-is-bg-secondary border border-is-bg-border rounded-xl p-4">
        <CheckCircle2 size={20} className="text-is-success shrink-0" aria-hidden />
        <span className="font-[family-name:var(--font-is-serif)] text-base sm:text-lg text-is-text-secondary flex-1">
          {lesson.title}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          +{lesson.xp} XP
        </span>
      </div>
    );
  }

  if (state === 'locked') {
    return (
      <div
        className="flex items-center gap-3 bg-is-bg-secondary border border-is-bg-border/50 rounded-xl p-4 opacity-40"
        aria-disabled="true"
      >
        <Lock size={20} className="text-is-text-muted shrink-0" aria-hidden />
        <span className="font-[family-name:var(--font-is-sans)] text-base text-is-text-muted">
          {lesson.title}
        </span>
      </div>
    );
  }

  // active
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 bg-is-bg-secondary border border-is-accent rounded-xl p-4 text-left transition-all duration-200 hover:border-is-accent-hover shadow-[0_0_16px_rgba(255,107,0,0.15)] cursor-pointer min-h-[44px]"
    >
      <Play size={20} className="text-is-accent shrink-0" aria-hidden />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="font-[family-name:var(--font-is-serif)] text-base sm:text-lg text-is-text-primary">
          {lesson.title}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted">
          {lesson.duration} Min · +{lesson.xp} XP
        </span>
      </div>
      <ChevronRight size={16} className="text-is-accent shrink-0" aria-hidden />
    </button>
  );
}
