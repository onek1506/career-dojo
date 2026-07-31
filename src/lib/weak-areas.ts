// ============================================================
// Weak-area tracking — category-independent knowledge profile.
// Records quiz outcomes per topic tag (e.g. 'three-statements', 'dcf',
// 'lbo') across ALL lesson categories (K1/K2/...), so a later backend
// migration (Supabase) can read one shared profile instead of a
// per-category dead end. Storage: plain localStorage map.
// ============================================================

export interface WeakAreaStat {
  correct: number;
  wrong: number;
}

export type WeakAreaProfile = Record<string, WeakAreaStat>;

const STORAGE_KEY = 'career-dojo-weak-areas';

export function getWeakAreas(): WeakAreaProfile {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WeakAreaProfile) : {};
  } catch {
    return {};
  }
}

export function recordWeakAreaAnswer(topicTag: string, correct: boolean): void {
  if (typeof window === 'undefined' || !topicTag) return;
  try {
    const profile = getWeakAreas();
    const stat = profile[topicTag] ?? { correct: 0, wrong: 0 };
    if (correct) stat.correct += 1;
    else stat.wrong += 1;
    profile[topicTag] = stat;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // localStorage unavailable — tracking is best-effort.
  }
}

/** Topics sorted weakest-first (highest wrong share, min. 1 answer). */
export function getWeakestTopics(limit = 3): Array<{ tag: string; stat: WeakAreaStat }> {
  const profile = getWeakAreas();
  return Object.entries(profile)
    .map(([tag, stat]) => ({ tag, stat }))
    .filter(({ stat }) => stat.correct + stat.wrong > 0)
    .sort((a, b) => {
      const ra = a.stat.wrong / (a.stat.correct + a.stat.wrong);
      const rb = b.stat.wrong / (b.stat.correct + b.stat.wrong);
      return rb - ra;
    })
    .slice(0, limit);
}
