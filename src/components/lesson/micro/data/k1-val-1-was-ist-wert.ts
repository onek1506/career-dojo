// ============================================================
// Kategorie 1 — Lektion 09: Was ist ein Unternehmen wert? (Bewertung, die Grundfrage)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 9, 8 slides).
// Marcus teaching text, quiz question/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// No numbers introduced — pure intuition lesson opening the valuation module.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 02 · BEWERTUNG';

export const k1ValWasIstWert: MicroLessonData = {
  id: 'k1-val-1-was-ist-wert',
  module: MODULE,
  titleDe: 'Was ist ein Unternehmen wert?',
  nextPath: '/lesson/k1-val-2-ev-equity',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Was ist ein Unternehmen wert?',
      subtitle: 'Bewertung, die Grundfrage',
      marcus: {
        subject: 'Re: Welchen Preis nennst du?',
        body: 'Neues Kapitel. Stell dir vor, jemand will deinen Kaffeeladen kaufen. Welchen Preis nennst du? Nicht raten — es gibt eine Logik dahinter, und die baust du dir jetzt auf.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DEIN ERSTER INSTINKT',
      heading: 'Der erste Gedanke',
      paragraphs: [
        "Dein erster Gedanke ist vielleicht: 'Er soll zahlen, was meine Sachen wert sind' — Maschine, Vorräte, Kasse. Nicht schlecht. Aber da fehlt etwas Entscheidendes.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE EIGENTLICHE IDEE',
      heading: 'Er zahlt für die Zukunft',
      paragraphs: [
        'Ein Käufer kauft deinen Laden nicht wegen der Espressomaschine. Er kauft ihn wegen des **Gewinns, den der Laden künftig macht**. Er zahlt für die Zukunft, nicht für den Schrott im Keller.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l9-kaeufer-zahlt',
      prompt: 'Wofür zahlt ein Käufer vor allem?',
      options: [
        'Für den künftigen Gewinn des Ladens',
        'Für die alte Espressomaschine',
        'Für den Kaffeegeruch',
      ],
      correctIndex: 0,
      solution: 'Ein Käufer zahlt für den künftigen Gewinn des Ladens, nicht für das Inventar.',
      marcusCorrect: 'Genau. Sachen kann man überall kaufen. Ein laufendes, gewinnbringendes Geschäft nicht.',
      marcusWrong: 'Fast — ein Käufer zahlt für das, was der Laden künftig verdient, nicht für die Sachen darin. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE KONSEQUENZ',
      heading: 'Gleiche Möbel, anderer Wert',
      paragraphs: [
        'Daraus folgt etwas Wichtiges: Ein Laden, der viel Gewinn verspricht, ist mehr wert als einer mit denselben Möbeln, der kaum was verdient. Wert kommt vom künftigen Ertrag, nicht vom Inventar.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Das Fundament jeder Bewertung',
      paragraphs: [
        'Der Kern: **Ein Unternehmen ist so viel wert wie der Gewinn, den es in Zukunft erwarten lässt.** Das ist das Fundament jeder Bewertung, die es gibt.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUSBLICK',
      heading: 'Wo es weitergeht',
      paragraphs: [
        'Wenn Wert vom künftigen Gewinn kommt, wird es knifflig: Wie viel ist Geld *morgen* eigentlich *heute* wert? Und was, wenn der Laden noch Schulden hat? Genau da geht es weiter.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 09 abgeschlossen.',
      marcus: {
        subject: 'Re: Das Fundament steht',
        body: 'Damit steht das Fundament der Bewertung: Ein Unternehmen ist so viel wert wie der Gewinn, den es in Zukunft erwarten lässt. Als Nächstes schauen wir, warum derselbe Laden zwei Preisschilder haben kann. Aber das hat Zeit.',
      },
      next: { title: 'Ein Laden, zwei Preisschilder', meta: '7 Min · +30 XP' },
    },
  ],
};
