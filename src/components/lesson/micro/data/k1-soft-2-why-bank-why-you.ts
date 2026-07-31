// ============================================================
// Kategorie 1 — Lektion 14: Warum diese Bank, warum du? (Soft Skills 2)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 14, 7 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 03 · INTERVIEW';

export const k1SoftWhyBankWhyYou: MicroLessonData = {
  id: 'k1-soft-2-why-bank-why-you',
  module: MODULE,
  titleDe: 'Warum diese Bank, warum du?',
  nextPath: '/lesson/k1-soft-3-spring-week',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Warum diese Bank, warum du?',
      subtitle: 'Soft Skills, Teil 2',
      marcus: {
        subject: 'Re: Zwei verwandte Fragen',
        body: "'Warum IB' hast du im Griff. Es gibt zwei enge Verwandte, die fast immer folgen: 'Warum genau *unsere* Bank?' und 'Warum sollten wir *dich* nehmen?' Beide mit derselben Logik lösbar.",
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE · WARUM DIESE BANK',
      heading: 'Konkret vor abstrakt',
      paragraphs: [
        "'Warum diese Bank' testet, ob du dich wirklich vorbereitet hast. Schwach: 'Ihr seid eine Top-Adresse.' Stark: etwas Konkretes — ein Deal, den sie begleitet haben, ein Team-Schwerpunkt, jemand, mit dem du gesprochen hast.",
        'Ein einziges echtes Detail schlägt zehn Superlative.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l14-why-bank',
      prompt: "Was ist die stärkere Antwort auf 'Warum diese Bank'?",
      options: [
        'Ein konkreter Deal oder Team, der dich interessiert',
        "'Ihr seid die Besten'",
        "'Ihr zahlt gut'",
      ],
      correctIndex: 0,
      solution: 'Ein konkretes Detail — ein Deal oder ein Team — zeigt echte Vorbereitung.',
      marcusCorrect: 'Genau. Konkretes Wissen zeigt echtes Interesse.',
      marcusWrong: 'Fast — Superlative kann jeder sagen, ein konkretes Detail zeigt echte Vorbereitung. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE · WARUM DU',
      heading: 'Eine Einladung',
      paragraphs: [
        "'Warum du' klingt einschüchternd, ist aber eine Einladung. Du musst nicht der Beste der Welt sein.",
        'Du zeigst zwei, drei Dinge, die zum Job passen — verlässlich unter Druck, schnelle Auffassung, ein relevantes Erlebnis — und belegst sie mit einem kurzen Beispiel statt mit Behauptungen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l14-belegen',
      prompt: "Wie belegst du 'Ich arbeite gut unter Druck'?",
      options: [
        'Mit einem kurzen konkreten Beispiel',
        'Indem du es einfach behauptest',
        'Gar nicht',
      ],
      correctIndex: 0,
      solution: 'Ein kurzes konkretes Beispiel belegt die Aussage — eine Behauptung allein nicht.',
      marcusCorrect: 'Richtig. Ein Beispiel überzeugt, eine Behauptung nicht.',
      marcusWrong: 'Fast — behaupten kann jeder, erst ein kurzes konkretes Beispiel macht es glaubwürdig. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Zwei Fragen, eine Logik',
      paragraphs: [
        "Der Kern: **Bei 'Warum diese Bank' gewinnt ein konkretes Detail. Bei 'Warum du' gewinnt ein belegtes Beispiel statt einer Behauptung.**",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 14 abgeschlossen.',
      marcus: {
        subject: 'Re: Beide Fragen gelöst',
        body: "Zwei Fragen, dieselbe Logik: Bei 'Warum diese Bank' zählt ein konkretes Detail, bei 'Warum du' ein belegtes Beispiel. Als Nächstes schauen wir uns in Ruhe an, wie so eine Spring Week eigentlich abläuft.",
      },
      next: { title: 'Wie so eine Spring Week eigentlich abläuft', meta: '5 Min · +20 XP' },
    },
  ],
};
