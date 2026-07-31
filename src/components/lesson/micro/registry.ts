// Central lookup: lesson id → micro-lesson data. The lesson route
// (/lesson/[id]) renders <MicroLesson> for any id present here.
// New micro-lessons only need to be added to this map.

import type { MicroLessonData } from './types';
import { incomeStatementMicroLessons } from './data/income-statement-micro';
import { k1OrientSpielfeld } from './data/k1-orient-1-spielfeld';
import { k1IncomeStatementT1 } from './data/k1-income-statement-t1';
import { k1IncomeStatementT2 } from './data/k1-acc-2-income-statement';
import { k1BalanceSheetT1 } from './data/k1-acc-3-balance-sheet';
import { k1BalanceSheetT2 } from './data/k1-acc-4-balance-sheet';
import { k1CashFlowT1 } from './data/k1-acc-5-cash-flow';
import { k1CashFlowT2 } from './data/k1-acc-6-cash-flow';
import { k1ThreeStatements } from './data/k1-acc-7-three-statements';
import { k1WorkingCapital } from './data/k1-acc-8-working-capital';
import { k1ValWasIstWert } from './data/k1-val-1-was-ist-wert';
import { k1EvEquityT1 } from './data/k1-val-2-ev-equity';
import { k1EvEquityT2 } from './data/k1-val-3-ev-equity';
import { k1ValMethoden } from './data/k1-val-4-methoden';
import { k1SoftWhyIb } from './data/k1-soft-1-why-ib';
import { k1SoftWhyBankWhyYou } from './data/k1-soft-2-why-bank-why-you';
import { k1SoftSpringWeek } from './data/k1-soft-3-spring-week';

// Standalone Kategorie-1 tree (k1- prefixed ids). K2/K3 trees come later.
const k1Lessons: MicroLessonData[] = [
  k1OrientSpielfeld,
  k1IncomeStatementT1,
  k1IncomeStatementT2,
  k1BalanceSheetT1,
  k1BalanceSheetT2,
  k1CashFlowT1,
  k1CashFlowT2,
  k1ThreeStatements,
  k1WorkingCapital,
  k1ValWasIstWert,
  k1EvEquityT1,
  k1EvEquityT2,
  k1ValMethoden,
  k1SoftWhyIb,
  k1SoftWhyBankWhyYou,
  k1SoftSpringWeek,
];

const ALL: MicroLessonData[] = [...incomeStatementMicroLessons, ...k1Lessons];

export const MICRO_LESSONS: Record<string, MicroLessonData> = Object.fromEntries(
  ALL.map((lesson) => [lesson.id, lesson]),
);

export function getMicroLesson(id: string): MicroLessonData | undefined {
  return MICRO_LESSONS[id];
}
