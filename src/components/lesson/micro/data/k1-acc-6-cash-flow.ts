// ============================================================
// Kategorie 1 — Lektion 06: Die drei Schubladen (Cash Flow Teil 2)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 6, 11 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// Coffee canon: Espressomaschine 50 € (Investing), Bankkredit 30 € (Financing).
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1CashFlowT2: MicroLessonData = {
  id: 'k1-acc-6-cash-flow',
  module: MODULE,
  titleDe: 'Die drei Schubladen',
  nextPath: '/lesson/k1-acc-7-three-statements',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Die drei Schubladen',
      subtitle: 'Cash Flow, Teil 2',
      marcus: {
        subject: 'Re: Drei Schubladen',
        body: 'Du weißt jetzt: Gewinn und echtes Geld sind zwei Dinge. Das Dokument, das nur das Geld verfolgt, sortiert jede Geldbewegung in eine von drei Schubladen. Die schauen wir uns an — eine nach der anderen.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Schublade eins: das Tagesgeschäft',
      paragraphs: [
        'Schublade eins: das Geld aus deinem normalen Tagesgeschäft. Kunden zahlen für Kaffee, du zahlst für Bohnen und Miete. Das ganz normale Auf und Ab des Betriebs.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Das laufende Geschäft: Operating',
      paragraphs: [
        'Diese erste Schublade heißt **Operating** — das Geld aus dem laufenden Geschäft. Das Herzstück, denn hier zeigt sich, ob dein Laden aus sich heraus Geld verdient.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Schublade zwei: die Anschaffung',
      paragraphs: [
        'Schublade zwei: Geld für größere Anschaffungen. Du kaufst die Espressomaschine für 50 €. Das ist kein Tagesgeschäft — das ist eine Investition in die Zukunft deines Ladens.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Langfristige Anschaffungen: Investing',
      paragraphs: [
        'Diese Schublade heißt **Investing** — Geld für langfristige Anschaffungen. Maschinen, Ausstattung, alles was länger hält.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l6-investing',
      prompt: 'In welche Schublade gehört der Kauf der Espressomaschine?',
      options: ['Investing', 'Operating'],
      correctIndex: 0,
      solution: 'Die Maschine ist eine langfristige Anschaffung, kein Tagesgeschäft. Das ist Investing.',
      marcusCorrect: 'Genau. Eine Maschine ist eine langfristige Investition, kein Tagesgeschäft.',
      marcusWrong: 'Fast — Tagesgeschäft ist Kaffee, Bohnen, Miete. Eine Maschine ist eine langfristige Anschaffung, also Investing. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Schublade drei: die Geldgeber',
      paragraphs: [
        'Schublade drei: Geld von oder an Geldgeber. Die Bank gibt dir den Kredit über 30 € — Geld kommt rein. Später zahlst du zurück — Geld geht raus.',
        'Auch dein eigenes Erspartes, das du reinsteckst, gehört hierher.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Geld von Geldgebern: Financing',
      paragraphs: [
        'Die dritte Schublade heißt **Financing** — Geld von Kreditgebern und Eigentümern. Kredite, Rückzahlungen, eigenes Kapital.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l6-financing',
      prompt: 'Die Bank überweist dir den Kredit. Welche Schublade?',
      options: ['Financing', 'Operating', 'Investing'],
      correctIndex: 0,
      solution: 'Geld von einem Geldgeber (der Bank) gehört immer in Financing.',
      marcusCorrect: 'Richtig. Geld von einem Geldgeber — das ist immer Financing.',
      marcusWrong: 'Fast — die Bank ist ein Geldgeber, kein Kunde und keine Anschaffung. Geld von Geldgebern ist Financing. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Drei Schubladen, jeder Euro',
      paragraphs: [
        'Der ganze Kern: **Jeder Euro, der sich bewegt, gehört in eine von drei Schubladen — Tagesgeschäft (Operating), Anschaffungen (Investing), Geldgeber (Financing).**',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 06 abgeschlossen.',
      marcus: {
        subject: 'Re: Drei Schubladen sortiert',
        body: 'Jetzt kennst du die drei Schubladen, in die jede Geldbewegung gehört: Operating (Tagesgeschäft), Investing (Anschaffungen) und Financing (Geldgeber). Als Nächstes schauen wir, wie alle drei Dokumente zusammenhängen. Aber das hat Zeit.',
      },
      next: { title: 'Wie alle drei Dokumente zusammenhängen', meta: '9 Min · +40 XP' },
    },
  ],
};
