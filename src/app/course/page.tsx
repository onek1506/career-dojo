'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserState } from '@/lib/home/user-state';
import { groupLessonsByModule, type ModuleGroup } from '@/lib/course/course-utils';
import BottomNav from '@/components/home/BottomNav';
import ModuleSection from '@/components/course/ModuleSection';

export default function CoursePage() {
  const router = useRouter();
  const [modules, setModules] = useState<ModuleGroup[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const state = getUserState();
    setCompletedIds(state.completedLessons);
    setModules(groupLessonsByModule(state.completedLessons, state.skillProfile));
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-muted)' }}
      >
        <span className="font-[family-name:var(--font-is-mono)] text-sm">Lade…</span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'var(--is-bg-primary)', color: 'var(--is-text-primary)' }}
    >
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto px-6 pt-10">
          <header className="mb-8">
            <p className="font-[family-name:var(--font-is-mono)] text-xs text-is-text-muted uppercase tracking-wider">
              DEIN LERNPFAD
            </p>
            <h1 className="font-[family-name:var(--font-is-serif)] text-4xl text-is-text-primary mt-2">
              Kurs
            </h1>
          </header>

          <div className="flex flex-col gap-10">
            {modules.map((module) => (
              <ModuleSection
                key={module.moduleId}
                module={module}
                completedIds={completedIds}
                onLessonClick={(route) => router.push(route)}
              />
            ))}
          </div>
        </div>
      </main>
      <BottomNav activeTab="course" />
    </div>
  );
}
