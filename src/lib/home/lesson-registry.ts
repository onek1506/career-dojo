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
