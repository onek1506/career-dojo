// ============================================================
// Stats screen utilities
// ============================================================

export const LEVEL_LABELS: Record<number, { title: string; description: string }> = {
  1: { title: 'Analyst in Training', description: 'Accounting-Grundlagen im Aufbau.' },
  2: { title: 'Junior Analyst', description: 'Accounting abgeschlossen. Valuation-Einstieg.' },
  3: { title: 'Associate-Niveau', description: 'Valuation und DCF verstanden.' },
  4: { title: 'Senior Analyst', description: 'M&A und LBO-Grundlagen sitzen.' },
  5: { title: 'Interview-Ready', description: 'Vollständige technische Vorbereitung.' },
};

const QUIZ_PERFORMANCE_KEY = 'career_dojo_quiz_performance';
const XP_HISTORY_KEY = 'career_dojo_xp_history';

export const TOPIC_ORDER = [
  'Income Statement',
  'Balance Sheet',
  'Cash Flow Statement',
  'Die 3 Statements',
  'Enterprise Value',
  'Valuation',
  'DCF',
  'M&A',
  'LBO',
] as const;

export interface TopicPerformance {
  topic: string;
  score: number; // 0-100
  attempts: number;
  status: 'strong' | 'weak' | 'untested';
}

interface RawPerf {
  [topic: string]: { correct: number; total: number };
}

export function getTopicPerformance(): TopicPerformance[] {
  if (typeof window === 'undefined') {
    return TOPIC_ORDER.map((topic) => ({ topic, score: 0, attempts: 0, status: 'untested' as const }));
  }
  let data: RawPerf = {};
  try {
    const raw = window.localStorage.getItem(QUIZ_PERFORMANCE_KEY);
    if (raw) data = JSON.parse(raw) as RawPerf;
  } catch {
    /* ignore */
  }

  return TOPIC_ORDER.map((topic) => {
    const perf = data[topic];
    if (!perf || perf.total === 0) {
      return { topic, score: 0, attempts: 0, status: 'untested' as const };
    }
    const score = Math.round((perf.correct / perf.total) * 100);
    return {
      topic,
      score,
      attempts: perf.total,
      status: (score >= 80 ? 'strong' : 'weak') as 'strong' | 'weak',
    };
  });
}

export interface XpEntry {
  lessonTitle: string;
  xp: number;
  date: string;
}

export function getXpByLesson(): XpEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(XP_HISTORY_KEY);
    return raw ? (JSON.parse(raw) as XpEntry[]) : [];
  } catch {
    return [];
  }
}

export function trackQuizAnswer(topic: string, correct: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(QUIZ_PERFORMANCE_KEY);
    const data: RawPerf = raw ? (JSON.parse(raw) as RawPerf) : {};
    const current = data[topic] ?? { correct: 0, total: 0 };
    data[topic] = {
      correct: current.correct + (correct ? 1 : 0),
      total: current.total + 1,
    };
    window.localStorage.setItem(QUIZ_PERFORMANCE_KEY, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export function trackXpEarned(lessonTitle: string, xp: number): void {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(XP_HISTORY_KEY);
    const history: XpEntry[] = raw ? (JSON.parse(raw) as XpEntry[]) : [];
    history.push({ lessonTitle, xp, date: new Date().toISOString() });
    if (history.length > 30) history.shift();
    window.localStorage.setItem(XP_HISTORY_KEY, JSON.stringify(history));
  } catch {
    /* ignore */
  }
}
