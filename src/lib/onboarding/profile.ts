// ============================================================
// Marcus Onboarding — user profile persisted to localStorage
// ============================================================
// Lives alongside the existing useStore (which holds track / language /
// XP / streak). The Marcus onboarding diagnoses skill level and learning
// preferences in 9 slides; this file owns the schema + helpers.

export type UserStatus = 'explorer' | 'starter' | 'applicant' | 'pro';
export type InterviewGoal = 'spring_week' | 'summer' | 'full_time' | 'off_cycle' | 'unclear';
export type TimeFrame = '2_weeks' | '1_2_months' | '3_6_months' | 'more_6_months' | 'none';
export type ExplorerMotivation = 'money' | 'learning' | 'network' | 'unsure';
export type LearningTime = 'morning' | 'lunch' | 'evening' | 'flexible';
export type SkillProfile = 'A' | 'B' | 'C'; // A=Beginner, B=BWL-Vorkenntnisse, C=Profi-Drill

export type KnowledgeAnswer<T extends string> = T | null;
export type BalanceAnswer = 'correct' | 'wrong' | 'never_heard';
export type EbitdaAnswer = 'correct' | 'wrong' | 'never_heard';
export type DcfAnswer = 'multiple' | 'once' | 'know_it' | 'never_heard';

export interface UserProfile {
  status: UserStatus | null;
  interviewGoal: InterviewGoal | null;
  timeFrame: TimeFrame | null;
  explorerMotivation: ExplorerMotivation | null;
  knowledge: {
    balance: KnowledgeAnswer<BalanceAnswer>;
    ebitda: KnowledgeAnswer<EbitdaAnswer>;
    dcf: KnowledgeAnswer<DcfAnswer>;
  };
  skillProfile: SkillProfile | null;
  learningTime: LearningTime | null;
  streakStarted: string | null;
  onboardingCompletedAt: string | null;
}

export const STORAGE_KEY = 'career_dojo_profile';

export function getEmptyProfile(): UserProfile {
  return {
    status: null,
    interviewGoal: null,
    timeFrame: null,
    explorerMotivation: null,
    knowledge: { balance: null, ebitda: null, dcf: null },
    skillProfile: null,
    learningTime: null,
    streakStarted: null,
    onboardingCompletedAt: null,
  };
}

export function getProfile(): UserProfile {
  if (typeof window === 'undefined') return getEmptyProfile();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getEmptyProfile();
    const parsed = JSON.parse(raw) as Partial<UserProfile>;
    return { ...getEmptyProfile(), ...parsed, knowledge: { ...getEmptyProfile().knowledge, ...(parsed.knowledge ?? {}) } };
  } catch {
    return getEmptyProfile();
  }
}

export function saveProfile(partial: Partial<UserProfile>): UserProfile {
  if (typeof window === 'undefined') return { ...getEmptyProfile(), ...partial } as UserProfile;
  const current = getProfile();
  const merged: UserProfile = {
    ...current,
    ...partial,
    knowledge: { ...current.knowledge, ...(partial.knowledge ?? {}) },
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // localStorage might be disabled (private mode); profile lives only in
    // memory for this session.
  }
  return merged;
}

/**
 * Compute the skill profile from the three knowledge-check answers.
 * - C: already comfortable with DCF (more than once)
 * - A: at least two "never_heard" answers
 * - C: both balance and ebitda correct AND knows DCF (once or know_it)
 * - B: default
 */
export function calculateSkillProfile(knowledge: UserProfile['knowledge']): SkillProfile {
  if (knowledge.dcf === 'multiple') return 'C';

  const correctCount = [knowledge.balance === 'correct', knowledge.ebitda === 'correct'].filter(Boolean).length;
  const neverHeardCount = [
    knowledge.balance === 'never_heard',
    knowledge.ebitda === 'never_heard',
    knowledge.dcf === 'never_heard',
  ].filter(Boolean).length;

  if (neverHeardCount >= 2) return 'A';
  if (correctCount === 2 && (knowledge.dcf === 'once' || knowledge.dcf === 'know_it')) return 'C';
  return 'B';
}

const PROFILE_LABELS: Record<SkillProfile, string> = {
  A: 'Entdecker',
  B: 'Einsteiger',
  C: 'Profi-Drill',
};

const GOAL_LABELS: Record<InterviewGoal, string> = {
  spring_week: 'Spring Week',
  summer: 'Summer Internship',
  full_time: 'Full-Time Position',
  off_cycle: 'Off-Cycle / Praktikum',
  unclear: 'Noch unklar',
};

const TIMEFRAME_LABELS: Record<TimeFrame, string> = {
  '2_weeks': 'In den nächsten 2 Wochen',
  '1_2_months': 'In 1–2 Monaten',
  '3_6_months': 'In 3–6 Monaten',
  more_6_months: 'Mehr als 6 Monate',
  none: 'Noch keines geplant',
};

const KNOWLEDGE_DESCRIPTION: Record<SkillProfile, string> = {
  A: 'Solider Start ohne Vorkenntnisse',
  B: 'Grundlagen sitzen, Vertiefung fehlt',
  C: 'Fortgeschritten, gezielter Drill nötig',
};

const LESSONS_BY_PROFILE: Record<SkillProfile, number> = { A: 78, B: 47, C: 22 };
const DAILY_MINUTES: Record<SkillProfile, number> = { A: 30, B: 30, C: 45 };

export function getDiagnosticData(profile: UserProfile) {
  const skill = profile.skillProfile ?? 'B';
  return {
    profileLabel: PROFILE_LABELS[skill],
    goalLabel: profile.interviewGoal ? GOAL_LABELS[profile.interviewGoal] : 'Erkundung',
    timeFrameLabel: profile.timeFrame ? TIMEFRAME_LABELS[profile.timeFrame] : '—',
    knowledgeDescription: KNOWLEDGE_DESCRIPTION[skill],
    lessonsCount: LESSONS_BY_PROFILE[skill],
    dailyMinutes: DAILY_MINUTES[skill],
    weeksToTarget:
      profile.timeFrame === '2_weeks'
        ? 2
        : profile.timeFrame === '1_2_months'
          ? 6
          : profile.timeFrame === '3_6_months'
            ? 12
            : 20,
  };
}

export const MARCUS_DIAGNOSIS_TEXTS: Record<SkillProfile, { subject: string; body: string }> = {
  A: {
    subject: 'Re: Erste Einschätzung',
    body:
      'Du fängst bei Null an. Das ist okay — die meisten unterschätzen IB-Interviews und überschätzen ihr Wissen. Du machst es richtig herum. Mit 30 Minuten täglich bist du in 5 Monaten auf einem Niveau, auf dem du im First Round nicht panisch wirst. Es ist machbar. Es ist auch nicht optional — wer kürzer trainiert, fliegt zuverlässig raus.',
  },
  B: {
    subject: 'Re: Erste Einschätzung',
    body:
      'Du hast die Basics, aber dir fehlt die IB-spezifische Tiefe. Mit 30 Minuten täglich bist du in 12 Wochen auf einem Niveau, auf dem du im Summer-Interview nicht panisch wirst. Das ist machbar. Es ist auch nicht optional — wer kürzer trainiert, fliegt im First Round.',
  },
  C: {
    subject: 'Re: Erste Einschätzung',
    body:
      'Du brauchst keine Erklärung mehr, du brauchst Drill. 45 Minuten täglich, gezielt auf deine Schwachstellen. Wenn du dranbleibst, hast du in 5 Wochen einen Vorteil gegenüber 90% der anderen Bewerber — nicht durch mehr Wissen, sondern durch mehr Reps.',
  },
};

export function isOnboardingComplete(profile: UserProfile = getProfile()): boolean {
  return Boolean(profile.onboardingCompletedAt);
}
