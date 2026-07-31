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

// The guided path (/course, home "next lesson", onboarding) is the K1
// beginner tree exclusively — one coherent coffee-shop story from the
// Spielfeld to the Spring Week. The legacy lessons (acc-1-income-statement,
// balance-sheet, cash-flow-statement, three-statements-linked, ...) remain
// reachable via the skill tree and their routes, but are no longer mixed
// into the guided module list, where they broke the story after lesson 2.
export const LESSON_REGISTRY: LessonEntry[] = [
  {
    id: 'k1-orient-1-spielfeld',
    title: 'Das Spielfeld',
    titleDe: 'Das Spielfeld',
    route: '/lesson/k1-orient-1-spielfeld',
    duration: 7,
    xp: 20,
    module: 'MODUL 00 · ORIENTIERUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-1-income-statement',
    title: 'Income Statement, Teil 1',
    titleDe: 'Income Statement, Teil 1',
    route: '/lesson/k1-acc-1-income-statement',
    duration: 9,
    xp: 35,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-2-income-statement',
    title: 'Income Statement, Teil 2',
    titleDe: 'Income Statement, Teil 2',
    route: '/lesson/k1-acc-2-income-statement',
    duration: 9,
    xp: 40,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-3-balance-sheet',
    title: 'Was der Laden besitzt',
    titleDe: 'Was der Laden besitzt',
    route: '/lesson/k1-acc-3-balance-sheet',
    duration: 8,
    xp: 30,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-4-balance-sheet',
    title: 'Woher das Geld kam',
    titleDe: 'Woher das Geld kam',
    route: '/lesson/k1-acc-4-balance-sheet',
    duration: 8,
    xp: 35,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-5-cash-flow',
    title: 'Gewinn ist nicht Geld',
    titleDe: 'Gewinn ist nicht Geld',
    route: '/lesson/k1-acc-5-cash-flow',
    duration: 7,
    xp: 25,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-6-cash-flow',
    title: 'Die drei Schubladen',
    titleDe: 'Die drei Schubladen',
    route: '/lesson/k1-acc-6-cash-flow',
    duration: 8,
    xp: 30,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-7-three-statements',
    title: 'Der Groschen fällt',
    titleDe: 'Der Groschen fällt',
    route: '/lesson/k1-acc-7-three-statements',
    duration: 9,
    xp: 40,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-acc-8-working-capital',
    title: 'Geld, das im Laden feststeckt',
    titleDe: 'Geld, das im Laden feststeckt',
    route: '/lesson/k1-acc-8-working-capital',
    duration: 6,
    xp: 25,
    module: 'MODUL 01 · ACCOUNTING',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-1-was-ist-wert',
    title: 'Was ist ein Unternehmen wert?',
    titleDe: 'Was ist ein Unternehmen wert?',
    route: '/lesson/k1-val-1-was-ist-wert',
    duration: 6,
    xp: 25,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-2-ev-equity',
    title: 'Ein Laden, zwei Preisschilder',
    titleDe: 'Ein Laden, zwei Preisschilder',
    route: '/lesson/k1-val-2-ev-equity',
    duration: 7,
    xp: 30,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-3-ev-equity',
    title: 'Die Brücke',
    titleDe: 'Die Brücke',
    route: '/lesson/k1-val-3-ev-equity',
    duration: 8,
    xp: 35,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-val-4-methoden',
    title: 'Drei Wege zum Wert',
    titleDe: 'Drei Wege zum Wert',
    route: '/lesson/k1-val-4-methoden',
    duration: 7,
    xp: 30,
    module: 'MODUL 02 · BEWERTUNG',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-soft-1-why-ib',
    title: 'Warum Investment Banking?',
    titleDe: 'Warum Investment Banking?',
    route: '/lesson/k1-soft-1-why-ib',
    duration: 6,
    xp: 25,
    module: 'MODUL 03 · INTERVIEW',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-soft-2-why-bank-why-you',
    title: 'Warum diese Bank, warum du?',
    titleDe: 'Warum diese Bank, warum du?',
    route: '/lesson/k1-soft-2-why-bank-why-you',
    duration: 6,
    xp: 25,
    module: 'MODUL 03 · INTERVIEW',
    trackAvailability: ['A', 'B', 'C'],
  },
  {
    id: 'k1-soft-3-spring-week',
    title: 'Wie eine Spring Week wirklich abläuft',
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
