// ============================================================
// User-State aggregator for the new app-shell screens
// ============================================================
// Combines the marcus onboarding profile (skillProfile, interviewDate)
// with the existing useStore-managed progress (xp, streak, completed
// lessons) into one read-only snapshot. The existing store key is
// `career-dojo-progress` with a hyphen — do not change it.

import { getProfile, type SkillProfile } from '@/lib/onboarding/profile';

const PROGRESS_STORAGE_KEY = 'career-dojo-progress';

export interface UserState {
  skillProfile: SkillProfile | null;
  streakDays: number;
  lastActiveDate: string | null;
  interviewDate: string | null;
  completedLessons: string[];
  totalXp: number;
  currentLevel: number;
}

interface RawProgress {
  completedLessons?: string[];
  xp?: number;
  streak?: number;
  lastActiveDate?: string;
}

function readProgress(): RawProgress {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as RawProgress;
  } catch {
    return {};
  }
}

export function getUserState(): UserState {
  const profile = getProfile();
  const progress = readProgress();
  const totalXp = progress.xp ?? 0;
  return {
    skillProfile: profile.skillProfile,
    streakDays: progress.streak ?? 0,
    lastActiveDate: progress.lastActiveDate ?? null,
    interviewDate: profile.interviewDate ?? null,
    completedLessons: progress.completedLessons ?? [],
    totalXp,
    currentLevel: calculateLevel(totalXp),
  };
}

export function calculateLevel(xp: number): number {
  if (xp < 200) return 1;
  if (xp < 500) return 2;
  if (xp < 1000) return 3;
  if (xp < 2000) return 4;
  return 5;
}

export function getNextLevelXp(currentLevel: number): number {
  const thresholds = [200, 500, 1000, 2000, Infinity];
  return thresholds[currentLevel - 1] ?? Infinity;
}

export function getDaysUntilInterview(interviewDate: string | null): number | null {
  if (!interviewDate) return null;
  const target = new Date(interviewDate).getTime();
  if (Number.isNaN(target)) return null;
  const diff = target - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export type StreakStatus = 'active' | 'at_risk' | 'broken';

export function getStreakStatus(lastActiveDate: string | null): StreakStatus {
  if (!lastActiveDate) return 'broken';
  const daysSince = Math.floor(
    (Date.now() - new Date(lastActiveDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSince === 0) return 'active';
  if (daysSince === 1) return 'at_risk';
  return 'broken';
}
