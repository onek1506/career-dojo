import { LESSON_REGISTRY, type LessonEntry } from '@/lib/home/lesson-registry';
import type { SkillProfile } from '@/lib/onboarding/profile';

export interface ModuleGroup {
  moduleId: string;
  moduleLabel: string;
  lessons: LessonEntry[];
  completedCount: number;
  totalCount: number;
}

export type LessonState = 'completed' | 'active' | 'locked';

export function groupLessonsByModule(
  completedIds: string[],
  skillProfile: SkillProfile | null
): ModuleGroup[] {
  const profile = skillProfile ?? 'A';
  const available = LESSON_REGISTRY.filter((l) => l.trackAvailability.includes(profile));

  const moduleMap = new Map<string, LessonEntry[]>();
  for (const lesson of available) {
    const existing = moduleMap.get(lesson.module) ?? [];
    moduleMap.set(lesson.module, [...existing, lesson]);
  }

  return Array.from(moduleMap.entries()).map(([moduleLabel, lessons]) => ({
    moduleId: moduleLabel.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    moduleLabel,
    lessons,
    completedCount: lessons.filter((l) => completedIds.includes(l.id)).length,
    totalCount: lessons.length,
  }));
}

export function getLessonState(
  lessonId: string,
  lessonIndex: number,
  allLessonsInModule: LessonEntry[],
  completedIds: string[]
): LessonState {
  if (completedIds.includes(lessonId)) return 'completed';
  const previousIds = allLessonsInModule.slice(0, lessonIndex).map((l) => l.id);
  const allPreviousDone = previousIds.every((id) => completedIds.includes(id));
  if (allPreviousDone) return 'active';
  return 'locked';
}
