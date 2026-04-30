// ============================================================
// Marcus testimonials — milestone-based coach notes
// ============================================================

export interface MarcusTestimonial {
  date: string; // ISO
  completedLesson: string;
  text: string;
  milestone: number; // completed lesson count when this was generated
}

const TESTIMONIAL_TEMPLATES: Record<number, (lastLesson: string) => string> = {
  1: (lesson) =>
    `Erste Lektion durch: ${lesson}. Das war der härteste Schritt — anzufangen. Jetzt weißt du, wie diese App funktioniert. In 3 Lektionen sehen wir, ob du dabei bleibst.`,
  3: (lesson) =>
    `3 Lektionen abgeschlossen. ${lesson} war die letzte. Accounting-Basis ist da. Jetzt entscheidet sich, ob du die Disziplin hast, die Valuation-Lektionen durchzuziehen.`,
  5: () =>
    `5 Lektionen. Die meisten hören hier auf — zu viel Aufwand, zu wenig Fortschritt. Du nicht. Das wird sich auszahlen.`,
  8: () =>
    `Accounting-Block abgeschlossen. Das ist die Grundlage für alles andere. DCF, M&A, LBO — ohne das hier geht nichts. Ab jetzt wird es interessanter.`,
  12: () =>
    `Valuation-Block läuft. Du weißt jetzt, warum Precedent Transactions höher sind als Comps und wann man keinen DCF macht. 70% der Bewerber können das nicht erklären.`,
  16: () =>
    `M&A-Grundlagen sitzen. Accretion/Dilution, Synergien, Goodwill. Wenn jemand im Interview fragt "walk me through a merger model" — du kannst antworten. Die meisten können das nicht.`,
  20: () =>
    `LBO-Grundlagen dabei. Du bist jetzt in einem Bereich, den die meisten Spring-Week-Bewerber nie erreichen. Das ist dein Vorsprung.`,
};

const STORAGE_KEY = 'career_dojo_testimonials';

export function generateTestimonialIfMilestone(
  completedCount: number,
  lastLessonTitle: string
): MarcusTestimonial | null {
  const template = TESTIMONIAL_TEMPLATES[completedCount];
  if (!template) return null;
  return {
    date: new Date().toISOString(),
    completedLesson: lastLessonTitle,
    text: template(lastLessonTitle),
    milestone: completedCount,
  };
}

export function getStoredTestimonials(): MarcusTestimonial[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MarcusTestimonial[]) : [];
  } catch {
    return [];
  }
}

export function saveTestimonial(t: MarcusTestimonial): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredTestimonials();
    // De-dupe on milestone — only one testimonial per milestone.
    if (existing.some((e) => e.milestone === t.milestone)) return;
    const updated = [...existing, t];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    /* ignore */
  }
}
