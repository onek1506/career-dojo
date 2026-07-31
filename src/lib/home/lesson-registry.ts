import type { SkillProfile } from '@/lib/onboarding/profile';

export interface LessonEntry {
  id: string;
  title: string;
  titleDe: string;
  route: string;
  duration: number;
  xp: number;
  module: string;
  trackAvailability: SkillProfile[];
}

export const LESSON_REGISTRY: LessonEntry[] = [
  {
    id: 'acc-1-income-statement',
    title: 'Income Statement: Revenue to OpEx',
    titleDe: 'GuV: Umsatz bis OpEx',
    route: '/lesson/acc-1-income-statement',
    duration: 9,
    xp: 35,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'acc-1c-ebit',
    title: 'Income Statement: EBIT to Net Income',
    titleDe: 'GuV: EBIT bis Net Income',
    route: '/lesson/acc-1c-ebit',
    duration: 9,
    xp: 40,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'acc-2-balance-sheet',
    title: 'Balance Sheet',
    titleDe: 'Bilanz',
    route: '/lesson/balance-sheet',
    duration: 8,
    xp: 30,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'acc-3-cash-flow-statement',
    title: 'Cash Flow Statement',
    titleDe: 'Kapitalflussrechnung',
    route: '/lesson/cash-flow-statement',
    duration: 8,
    xp: 30,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'acc-4-three-statements-linked',
    title: 'Die drei Statements verlinkt',
    titleDe: 'The 3 Statements – How They Link',
    route: '/lesson/three-statements-linked',
    duration: 10,
    xp: 40,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  // --- Kategorie 1 tree (standalone, k1- prefix). Appended so it does not
  // reorder the existing home "next lesson" flow while under review. ---
  {
    id: 'k1-orient-1-spielfeld',
    title: 'The Playing Field',
    titleDe: 'Das Spielfeld',
    route: '/lesson/k1-orient-1-spielfeld',
    duration: 7,
    xp: 20,
    module: 'MODUL 00 · ORIENTIERUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-1-income-statement',
    title: 'Income Statement, Part 1',
    titleDe: 'Income Statement, Teil 1',
    route: '/lesson/k1-acc-1-income-statement',
    duration: 9,
    xp: 35,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-2-income-statement',
    title: 'Income Statement, Part 2',
    titleDe: 'Income Statement, Teil 2',
    route: '/lesson/k1-acc-2-income-statement',
    duration: 9,
    xp: 40,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-3-balance-sheet',
    title: 'What the Shop Owns',
    titleDe: 'Was der Laden besitzt',
    route: '/lesson/k1-acc-3-balance-sheet',
    duration: 8,
    xp: 30,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-4-balance-sheet',
    title: 'Where the Money Came From',
    titleDe: 'Woher das Geld kam',
    route: '/lesson/k1-acc-4-balance-sheet',
    duration: 8,
    xp: 35,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-5-cash-flow',
    title: 'Profit Is Not Cash',
    titleDe: 'Gewinn ist nicht Geld',
    route: '/lesson/k1-acc-5-cash-flow',
    duration: 7,
    xp: 25,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-6-cash-flow',
    title: 'The Three Drawers',
    titleDe: 'Die drei Schubladen',
    route: '/lesson/k1-acc-6-cash-flow',
    duration: 8,
    xp: 30,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-7-three-statements',
    title: 'The Penny Drops',
    titleDe: 'Der Groschen fällt',
    route: '/lesson/k1-acc-7-three-statements',
    duration: 9,
    xp: 40,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-8-working-capital',
    title: 'Money Stuck in the Shop',
    titleDe: 'Geld, das im Laden feststeckt',
    route: '/lesson/k1-acc-8-working-capital',
    duration: 6,
    xp: 25,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-1-was-ist-wert',
    title: 'What Is a Company Worth?',
    titleDe: 'Was ist ein Unternehmen wert?',
    route: '/lesson/k1-val-1-was-ist-wert',
    duration: 6,
    xp: 25,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-2-ev-equity',
    title: 'One Shop, Two Price Tags',
    titleDe: 'Ein Laden, zwei Preisschilder',
    route: '/lesson/k1-val-2-ev-equity',
    duration: 7,
    xp: 30,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-3-ev-equity',
    title: 'The Bridge',
    titleDe: 'Die Brücke',
    route: '/lesson/k1-val-3-ev-equity',
    duration: 8,
    xp: 35,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-4-methoden',
    title: 'Three Ways to a Value',
    titleDe: 'Drei Wege zum Wert',
    route: '/lesson/k1-val-4-methoden',
    duration: 7,
    xp: 30,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-soft-1-why-ib',
    title: 'Why Investment Banking?',
    titleDe: 'Warum Investment Banking?',
    route: '/lesson/k1-soft-1-why-ib',
    duration: 6,
    xp: 25,
    module: 'MODUL 03 · INTERVIEW',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-soft-2-why-bank-why-you',
    title: 'Why This Bank, Why You?',
    titleDe: 'Warum diese Bank, warum du?',
    route: '/lesson/k1-soft-2-why-bank-why-you',
    duration: 6,
    xp: 25,
    module: 'MODUL 03 · INTERVIEW',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-soft-3-spring-week',
    title: 'How a Spring Week Really Works',
    titleDe: 'Wie eine Spring Week wirklich abläuft',
    route: '/lesson/k1-soft-3-spring-week',
    duration: 5,
    xp: 20,
    module: 'MODUL 03 · INTERVIEW',
    trackAvailability: ['A', 'B', 'C'],
  },
];

export function getNextLesson(
  completedIds: string[],
  skillProfile: SkillProfile | null
): LessonEntry | null {
  const profile = skillProfile ?? 'A';
  const available = LESSON_REGISTRY.filter((l) => l.trackAvailability.includes(profile));
  return available.find((l) => !completedIds.includes(l.id)) ?? null;
}

export function getLessonById(id: string): LessonEntry | undefined {
  return LESSON_REGISTRY.find((l) => l.id === id);
}
