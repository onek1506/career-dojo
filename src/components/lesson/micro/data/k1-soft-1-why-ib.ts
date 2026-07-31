// ============================================================
// Kategorie 1 — Lektion 13: Warum Investment Banking? (Soft Skills 1)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 13, 7 slides).
// Marcus teaching text, quiz question/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 03 · INTERVIEW';

export const k1SoftWhyIb: MicroLessonData = {
  id: 'k1-soft-1-why-ib',
  module: MODULE,
  titleDe: 'Warum Investment Banking?',
  nextPath: '/lesson/k1-soft-2-why-bank-why-you',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Warum Investment Banking?',
      subtitle: 'Soft Skills, Teil 1',
      marcus: {
        subject: 'Re: Die häufigste Frage',
        body: 'Ab jetzt geht es nicht mehr um Zahlen, sondern um dich. Die häufigste Frage in jedem Interview lautet: \'Warum Investment Banking?\' Klingt einfach. Ist die Frage, an der die meisten scheitern — weil sie nie darüber nachgedacht haben.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'WAS NICHT FUNKTIONIERT',
      heading: 'Zwei Antworten, die durchfallen',
      paragraphs: [
        'Zwei Antworten, die sofort durchfallen: \'Wegen des Geldes\' — ehrlich, aber zeigt nichts über dich. Und \'Ich will viel lernen\' — sagt jeder, sagt nichts.',
        'Kein Zeitdruck für dich, du hast Monate. Aber fang früh an, echter zu denken.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE STRUKTUR',
      heading: 'Drei Teile einer guten Antwort',
      paragraphs: [
        'Eine gute Antwort hat drei Teile: Erstens, *was dich fachlich reizt* — die Arbeit an echten Transaktionen. Zweitens, *was zu dir passt* — du magst Tempo, Verantwortung, steile Lernkurven. Drittens, *warum jetzt* — dein Weg hat dich hierher geführt.',
        'Diese drei Teile, ehrlich gefüllt, schlagen jede auswendig gelernte Floskel.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l13-strong-answer',
      prompt: 'Welche Antwort ist am stärksten?',
      options: [
        'Ein konkreter Grund, der zu deinem Weg passt',
        '\'Wegen des Geldes\'',
        '\'Weil alle meine Freunde das machen\'',
      ],
      correctIndex: 0,
      solution: 'Ein konkreter, persönlicher Grund überzeugt. Allgemeine oder geliehene Antworten sagen nichts über dich.',
      marcusCorrect: 'Genau. Konkret und persönlich schlägt allgemein und geliehen.',
      marcusWrong: 'Fast — die stärkste Antwort ist konkret und persönlich, nicht allgemein oder geliehen. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER DENKANSTOSS',
      heading: 'Anfangen reicht',
      paragraphs: [
        'Deine Aufgabe ist nicht, das heute perfekt zu beantworten. Sondern anzufangen, über deine echten Gründe nachzudenken.',
        'Was hat dich überhaupt hierher gebracht, in diese App? Da steckt oft schon der Kern deiner Antwort.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Konkret, persönlich, ehrlich',
      paragraphs: [
        'Der Kern: **Eine gute \'Warum IB\'-Antwort ist konkret, persönlich und ehrlich — kein auswendig gelernter Standardsatz.**',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 13 abgeschlossen.',
      marcus: {
        subject: 'Re: Deine Antwort',
        body: 'Du kennst jetzt die Struktur einer guten \'Warum IB\'-Antwort: konkret, persönlich, ehrlich. Als Nächstes kommen die zwei Fragen, die fast immer folgen: warum genau diese Bank, und warum du? Aber das hat Zeit.',
      },
      next: { title: 'Warum genau diese Bank — und warum du?', meta: '6 Min · +25 XP' },
    },
  ],
};
