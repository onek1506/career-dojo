// ============================================================
// Signup-gate trigger — shown once, right after the 3rd completed
// K1 lesson, to a logged-out user. Never shown again automatically
// after that (the user can still sign up later via /profile).
// ============================================================

const GATE_SHOWN_KEY = 'career-dojo-signup-gate-shown';
const K1_LESSONS_REQUIRED = 3;

export function hasSeenSignupGate(): boolean {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem(GATE_SHOWN_KEY) === '1';
}

export function markSignupGateSeen(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(GATE_SHOWN_KEY, '1');
}

export function countCompletedK1Lessons(completedLessons: string[]): number {
  return new Set(completedLessons.filter((id) => id.startsWith('k1-'))).size;
}

export function shouldShowSignupGate(
  finishedLessonId: string,
  completedLessons: string[],
  isAuthenticated: boolean,
): boolean {
  if (isAuthenticated) return false;
  if (hasSeenSignupGate()) return false;
  if (!finishedLessonId.startsWith('k1-')) return false;
  return countCompletedK1Lessons(completedLessons) >= K1_LESSONS_REQUIRED;
}
