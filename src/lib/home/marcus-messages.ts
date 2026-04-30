import type { StreakStatus } from './user-state';

export interface MessageContext {
  streakStatus: StreakStatus;
  streakDays: number;
  daysUntilInterview: number | null;
  completedCount: number;
  lastLessonTitle?: string;
}

export function getMarcusDailyMessage(ctx: MessageContext): string {
  const { streakStatus, streakDays, daysUntilInterview, completedCount, lastLessonTitle } = ctx;

  // No interview date set
  if (daysUntilInterview === null) {
    if (streakStatus === 'broken' && completedCount > 0) {
      return `Du warst ${completedCount > 5 ? 'eine Weile' : 'kurz'} weg. Kein Problem — aber setz ein Interview-Datum. Ohne Deadline trainierst du ohne Ziel.`;
    }
    if (streakDays > 7) {
      return `${streakDays} Tage Streak ohne Interview-Datum. Gut — aber setz einen Termin, damit das Training Kontext hat.`;
    }
    return 'Fang an. Heute erste Lektion, morgen Streak. Die Frage ist nicht ob du interviewst — sondern wann.';
  }

  // Interview imminent
  if (daysUntilInterview <= 3) {
    return `${daysUntilInterview} Tag${daysUntilInterview === 1 ? '' : 'e'} bis zum Interview. Keine neuen Themen mehr. Nur wiederholen, was du kennst.`;
  }
  if (daysUntilInterview <= 14) {
    return `${daysUntilInterview} Tage. Fokus: Schwachstellen schließen. Kein breites Lernen mehr.`;
  }

  if (streakStatus === 'broken') {
    return `${daysUntilInterview} Tage bis zum Interview. Streak unterbrochen. Heute wiedereinstieg — morgen läuft er wieder.`;
  }
  if (streakStatus === 'at_risk') {
    return `Heute noch keine Lektion. ${daysUntilInterview} Tage Zeit. Streak schützen.`;
  }

  if (lastLessonTitle) {
    return `Gestern: ${lastLessonTitle}. Heute nächster Schritt. ${daysUntilInterview} Tage bis zum Interview — du bist im Plan.`;
  }
  if (streakDays >= 7) {
    return `${streakDays} Tage Streak. ${daysUntilInterview} Tage bis zum Interview. Weiter.`;
  }
  return `${daysUntilInterview} Tage bis zum Interview. Heute eine Lektion. Das ist alles was zählt.`;
}
