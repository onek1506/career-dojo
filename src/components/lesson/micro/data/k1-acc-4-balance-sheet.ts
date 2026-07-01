// ============================================================
// Kategorie 1 — Lektion 04: Woher das Geld kam (Balance Sheet Teil 2)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 4, 12 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// No marcusWrong is authored in the source, so none is invented.
// Coffee canon: Maschine 50 + Kasse 20 = Assets 70; Liabilities 30; Equity 40.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1BalanceSheetT2: MicroLessonData = {
  id: 'k1-acc-4-balance-sheet',
  module: MODULE,
  titleDe: 'Woher das Geld kam',
  // L5 (Cash Flow Teil 1) is built in a later batch; point at the course
  // overview until then so the retention hub never dead-ends.
  nextPath: '/course',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Woher das Geld kam',
      subtitle: 'Balance Sheet, Teil 2',
      marcus: {
        subject: 'Re: Woher kam das Geld?',
        body: 'Letztes Mal die offene Frage: Deine Espressomaschine kostet 50 €. Woher kam das Geld? Es gibt nur zwei Möglichkeiten. Die schauen wir uns jetzt an.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Möglichkeit eins: geliehen',
      paragraphs: [
        'Möglichkeit eins: Du hast dir Geld geliehen. Dein Bankkredit über 30 € zum Beispiel. Das ist Geld, das nicht wirklich dir gehört — du musst es zurückzahlen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Geliehenes Geld: Liabilities',
      paragraphs: [
        'Geliehenes Geld, das du zurückzahlen musst, heißt **Liabilities** — Verbindlichkeiten. Dein Bankkredit ist eine Liability. Einfach: eine Schuld.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l4-liability',
      prompt: 'Was ist eine Liability?',
      options: ['Der Bankkredit über 30 €', 'Die Espressomaschine', 'Das Bargeld'],
      correctIndex: 0,
      solution: 'Eine Liability ist geliehenes Geld, das du zurückzahlen musst. Der Bankkredit gehört dazu.',
      marcusCorrect: 'Genau. Ein Kredit muss zurück — das macht ihn zur Schuld.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Möglichkeit zwei: eigenes Geld',
      paragraphs: [
        'Möglichkeit zwei: Du hast eigenes Geld reingesteckt. Erspartes, das du selbst investiert hast. Das musst du niemandem zurückzahlen — es ist deins.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Dein eigenes Geld: Equity',
      paragraphs: [
        'Dein eigenes Geld im Laden heißt **Equity** — Eigenkapital. Der Teil, der wirklich dir gehört, nachdem alle Schulden bezahlt sind.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l4-equity',
      prompt: 'Was musst du NICHT zurückzahlen?',
      options: ['Equity', 'Liabilities'],
      correctIndex: 0,
      solution: 'Equity ist dein eigenes Geld und bleibt deins. Liabilities sind Schulden und gehen zurück.',
      marcusCorrect: 'Richtig. Equity ist dein eigenes Geld. Schulden gehen zurück, dein Anteil bleibt.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE GLEICHUNG',
      heading: 'Warum es immer aufgeht',
      paragraphs: [
        'Und jetzt kommt etwas Schönes. Jeder Euro deiner Assets kam aus einer dieser zwei Quellen — geliehen oder eigenes Geld. Es gibt keine dritte. Also gilt immer: **Was du besitzt = was du schuldest + was dir gehört.**',
        'Assets = Liabilities + Equity. Deshalb heißt es Bilanz — es ist immer im Gleichgewicht.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Rechne kurz mit',
      paragraphs: [
        'Rechne kurz mit: Deine Assets sind Maschine 50 plus Kasse 20, macht 70. Davon sind 30 geliehen (Liabilities). Bleiben 40, die dir gehören (Equity). 30 + 40 = 70.',
        'Es geht auf. Es geht *immer* auf.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l4-equity-calc',
      prompt: 'Assets 70, Liabilities 30. Wie viel Equity?',
      options: ['40', '100', '30'],
      correctIndex: 0,
      solution: 'Equity = Assets − Liabilities = 70 − 30 = 40.',
      marcusCorrect: 'Sauber. Was übrig bleibt nach den Schulden, gehört dir.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Immer ausgeglichen',
      paragraphs: [
        'Der ganze Kern: **Alles was du besitzt, ist entweder geliehen oder deins. Genau deshalb ist eine Bilanz immer ausgeglichen.**',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 04 abgeschlossen.',
      marcus: {
        subject: 'Re: Bilanz komplett',
        body: 'Jetzt kennst du beide Seiten der Bilanz: was der Laden besitzt (Assets) und woher das Geld kam (Liabilities und Equity). Und du weißt, warum sie immer aufgeht. Als Nächstes: warum Gewinn nicht dasselbe ist wie Geld.',
      },
      next: { title: 'Warum Gewinn nicht gleich Geld ist', meta: '7 Min · +25 XP' },
    },
  ],
};
