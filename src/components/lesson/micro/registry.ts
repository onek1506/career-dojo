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
import { k1Bridge16 } from './data/k1-bridge-16-ausblick';
import { k2AccBridge } from './data/k2-acc-1-bridge';
import { k2AccDrill } from './data/k2-acc-2-three-statements-drill';
import { k2AccEdgeCases } from './data/k2-acc-3-edge-cases';
import { k2EvDrill } from './data/k2-ev-1-drill';
import { k2EvMultiples } from './data/k2-ev-2-multiples';
import { k2ValDcfMechanik } from './data/k2-val-1-dcf-mechanik';
import { k2ValWacc } from './data/k2-val-2-wacc';
import { k2ValTerminalValue } from './data/k2-val-3-terminal-value';
import { k2ValDcfInterview } from './data/k2-val-4-dcf-interview';
import { k2MaAccretionDilution } from './data/k2-ma-1-accretion-dilution';
import { k2MaDrill } from './data/k2-ma-2-drill';
import { k2LboWasIst } from './data/k2-lbo-1-was-ist-lbo';
import { k2LboMechanik } from './data/k2-lbo-2-mechanik';
import { k2FitStory } from './data/k2-fit-1-story';
import { k2FitWhyTough } from './data/k2-fit-2-why-und-tough';
import { k2MockMixed } from './data/k2-mock-1-mixed';

// Standalone Kategorie-1 tree (k1- prefixed ids) + its closing bridge.
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
  k1Bridge16,
];

// Kategorie-2 tree (k2- prefixed ids): interview training for intermediates.
const k2Lessons: MicroLessonData[] = [
  k2AccBridge,
  k2AccDrill,
  k2AccEdgeCases,
  k2EvDrill,
  k2EvMultiples,
  k2ValDcfMechanik,
  k2ValWacc,
  k2ValTerminalValue,
  k2ValDcfInterview,
  k2MaAccretionDilution,
  k2MaDrill,
  k2LboWasIst,
  k2LboMechanik,
  k2FitStory,
  k2FitWhyTough,
  k2MockMixed,
];

const ALL: MicroLessonData[] = [...incomeStatementMicroLessons, ...k1Lessons, ...k2Lessons];

export const MICRO_LESSONS: Record<string, MicroLessonData> = Object.fromEntries(
  ALL.map((lesson) => [lesson.id, lesson]),
);

export function getMicroLesson(id: string): MicroLessonData | undefined {
  return MICRO_LESSONS[id];
}
