// ============================================================
// Signup-gate trigger — shown once, right after the 3rd completed
// lesson IN WHATEVER CATEGORY THE USER STARTED (k1, k2 or k3 — a user
// can self-place directly into k2/k3, so this can't be hardcoded to
// k1 like it originally was), to a logged-out user. Never shown again
// automatically after that (the user can still sign up later via
// /profile or the header link).
// ============================================================

const GATE_SHOWN_KEY = 'career-dojo-signup-gate-shown';
const LESSONS_REQUIRED = 3;

export function hasSeenSignupGate(): boolean {
  if (typeof window === 'undefined') return true;
  return window.localStorage.getItem(GATE_SHOWN_KEY) === '1';
}

export function markSignupGateSeen(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(GATE_SHOWN_KEY, '1');
}

/** Extracts the 'k1' / 'k2' / 'k3' prefix from a lesson id, or null for anything else. */
export function categoryPrefixOf(lessonId: string): string | null {
  const match = lessonId.match(/^(k[1-3])-/);
  return match ? match[1] : null;
}

export function countCompletedInCategory(completedLessons: string[], category: string): number {
  return new Set(completedLessons.filter((id) => id.startsWith(`${category}-`))).size;
}

export function shouldShowSignupGate(
  finishedLessonId: string,
  completedLessons: string[],
  isAuthenticated: boolean,
): boolean {
  if (isAuthenticated) return false;
  if (hasSeenSignupGate()) return false;
  const category = categoryPrefixOf(finishedLessonId);
  if (!category) return false;
  return countCompletedInCategory(completedLessons, category) >= LESSONS_REQUIRED;
}
