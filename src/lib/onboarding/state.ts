// 11-screen onboarding state, persisted alongside the legacy
// career_dojo_profile (see ./profile.ts). The legacy profile drives the
// rest of the app (home, lessons, course utils); on completion this
// module bridges into it so downstream consumers keep working.

export type OnboardingProfil = 'entdecker' | 'einsteiger' | 'bewerber' | 'profi';
export type OnboardingMotivation = 'geld' | 'lernkurve' | 'netzwerk' | 'unsicher';
export type OnboardingQuizAntwort = string | null;
export type OnboardingLernzeit = 'morgens' | 'mittag' | 'abends' | 'flexibel';

export interface OnboardingState {
  currentScreen: number;
  profil: OnboardingProfil | null;
  motivation: OnboardingMotivation | null;
  quiz1: OnboardingQuizAntwort;
  quiz2: OnboardingQuizAntwort;
  quiz3: OnboardingQuizAntwort;
  lernzeit: OnboardingLernzeit | null;
  completed: boolean;
}

const STORAGE_KEY = 'careerdojo_onboarding';

export const defaultState: OnboardingState = {
  currentScreen: 1,
  profil: null,
  motivation: null,
  quiz1: null,
  quiz2: null,
  quiz3: null,
  lernzeit: null,
  completed: false,
};

export function loadOnboardingState(): OnboardingState {
  if (typeof window === 'undefined') return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
  } catch {
    return defaultState;
  }
}

export function saveOnboardingState(state: OnboardingState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage might be disabled (private mode) — best-effort only.
  }
}

export function clearOnboardingState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

const Q1_CORRECT = 'Was eine Firma zu einem Stichtag besitzt und schuldet';
const Q2_CORRECT = 'Earnings Before Interest, Taxes, Depreciation and Amortization';
const Q3_UNKNOWN = 'Habe ich noch nie gehört';

export function getWissensstand(
  q1: string | null,
  q2: string | null,
  q3: string | null,
): string {
  const richtig = [
    q1 === Q1_CORRECT,
    q2 === Q2_CORRECT,
    q3 !== null && q3 !== Q3_UNKNOWN,
  ].filter(Boolean).length;
  if (richtig === 3) return 'Fortgeschritten, gezielter Drill nötig';
  if (richtig >= 1) return 'Grundlagen vorhanden';
  return 'Neueinsteiger';
}

const PROFIL_LABELS: Record<OnboardingProfil, string> = {
  entdecker: 'Entdecker-Modus',
  einsteiger: 'Einsteiger-Drill',
  bewerber: 'Bewerber-Sprint',
  profi: 'Profi-Drill',
};

export function getProfilLabel(profil: OnboardingProfil | null): string {
  return profil ? PROFIL_LABELS[profil] : 'Individuell';
}

const MOTIVATION_TARGETS: Record<OnboardingMotivation, string> = {
  geld: 'Bulge-Bracket Front Office',
  lernkurve: 'Bulge-Bracket / Elite Boutique',
  netzwerk: 'Bulge-Bracket Network Track',
  unsicher: 'Spring Week Erkundung',
};

export function getZielinterview(motivation: OnboardingMotivation | null): string {
  return motivation ? MOTIVATION_TARGETS[motivation] : 'Wird im Profil geschärft';
}

const LERNZEIT_LABELS: Record<OnboardingLernzeit, { range: string; reminder: string }> = {
  morgens: { range: '7:00–9:00', reminder: '07:30 Uhr' },
  mittag: { range: '12:00–13:00', reminder: '12:15 Uhr' },
  abends: { range: '20:00–22:00', reminder: '20:30 Uhr' },
  flexibel: { range: '', reminder: '' },
};

export function getLernzeitMeta(lernzeit: OnboardingLernzeit | null) {
  return lernzeit ? LERNZEIT_LABELS[lernzeit] : null;
}
