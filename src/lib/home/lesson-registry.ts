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
