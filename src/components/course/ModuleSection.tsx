'use client';

import LessonCard from './LessonCard';
import ModuleProgressBar from './ModuleProgressBar';
import { getLessonState, type ModuleGroup } from '@/lib/course/course-utils';

interface ModuleSectionProps {
  module: ModuleGroup;
  completedIds: string[];
  onLessonClick: (route: string) => void;
}

export default function ModuleSection({ module, completedIds, onLessonClick }: ModuleSectionProps) {
  return (
    <section>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
          {module.moduleLabel}
        </span>
        <span className="font-[family-name:var(--font-is-mono)] text-sm text-is-text-secondary tabular-nums">
          {module.completedCount} / {module.totalCount}
        </span>
      </div>
      <ModuleProgressBar completed={module.completedCount} total={module.totalCount} />

      <div className="flex flex-col gap-3">
        {module.lessons.map((lesson, i) => {
          const state = getLessonState(lesson.id, i, module.lessons, completedIds);
          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              state={state}
              onClick={() => onLessonClick(lesson.route)}
            />
          );
        })}
      </div>
    </section>
  );
}
