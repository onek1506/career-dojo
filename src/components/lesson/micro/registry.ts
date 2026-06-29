// Central lookup: lesson id → micro-lesson data. The lesson route
// (/lesson/[id]) renders <MicroLesson> for any id present here.
// New micro-lessons only need to be added to this map.

import type { MicroLessonData } from './types';
import { incomeStatementMicroLessons } from './data/income-statement-micro';

const ALL: MicroLessonData[] = [...incomeStatementMicroLessons];

export const MICRO_LESSONS: Record<string, MicroLessonData> = Object.fromEntries(
  ALL.map((lesson) => [lesson.id, lesson]),
);

export function getMicroLesson(id: string): MicroLessonData | undefined {
  return MICRO_LESSONS[id];
}
