// Central lookup: lesson id → micro-lesson data. The lesson route
// (/lesson/[id]) renders <MicroLesson> for any id present here.
// New micro-lessons only need to be added to this map.

import type { MicroLessonData } from './types';
import { incomeStatementMicroLessons } from './data/income-statement-micro';
import { k1IntroSpielfeld } from './data/k1-intro-spielfeld';
import { k1IncomeStatementT1 } from './data/k1-income-statement-t1';

// Standalone Kategorie-1 tree (k1- prefixed ids). K2/K3 trees come later.
const k1Lessons: MicroLessonData[] = [k1IntroSpielfeld, k1IncomeStatementT1];

const ALL: MicroLessonData[] = [...incomeStatementMicroLessons, ...k1Lessons];

export const MICRO_LESSONS: Record<string, MicroLessonData> = Object.fromEntries(
  ALL.map((lesson) => [lesson.id, lesson]),
);

export function getMicroLesson(id: string): MicroLessonData | undefined {
  return MICRO_LESSONS[id];
}
