// ============================================================
// Kategorie 1 — Lektion 05: Gewinn ist nicht Geld (Cash Flow Teil 1)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 5, 9 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// Coffee canon: Net Income 20; Verkauf auf Rechnung 100; Espressomaschine 50.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1CashFlowT1: MicroLessonData = {
  id: 'k1-acc-5-cash-flow',
  module: MODULE,
  titleDe: 'Gewinn ist nicht Geld',
  nextPath: '/lesson/k1-acc-6-cash-flow',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Gewinn ist nicht Geld',
      subtitle: 'Cash Flow, Teil 1',
      marcus: {
        subject: 'Re: 20 € mehr in der Kasse?',
        body: 'Dein Laden hat dieses Jahr 20 € Gewinn gemacht. Heißt das, du hast 20 € mehr in der Kasse? Klingt logisch. Ist aber nicht immer so — und der Grund dafür bringt erstaunlich viele Bewerber ins Straucheln.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Verkauf auf Rechnung',
      paragraphs: [
        'Stell dir vor, du verkaufst Kaffee an ein Büro nebenan für 100 €. Auf Rechnung — sie zahlen erst nächsten Monat.',
        'In deinem Gewinn zählt der Verkauf schon *heute*. Aber das Geld? Ist noch nicht da.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER UNTERSCHIED',
      heading: 'Zwei verschiedene Momente',
      paragraphs: [
        'Da ist er, der Unterschied: **Gewinn** entsteht, wenn du etwas verkaufst. **Cash** — echtes Geld — bewegt sich erst, wenn tatsächlich bezahlt wird. Das ist oft nicht derselbe Moment.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l5-auf-rechnung',
      prompt: 'Du verkaufst auf Rechnung. Was hast du sofort?',
      options: ['Gewinn, aber noch kein Cash', 'Beides', 'Nur Cash'],
      correctIndex: 0,
      solution: 'Der Verkauf zählt sofort im Gewinn, das Geld kommt erst später.',
      marcusCorrect: 'Genau. Der Verkauf zählt, das Geld kommt später.',
      marcusWrong: 'Fast — beim Verkauf auf Rechnung zählt der Gewinn sofort, das Geld kommt aber erst nächsten Monat. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Geld weg, Gewinn fast unberührt',
      paragraphs: [
        'Es geht auch umgekehrt. Du kaufst die große Espressomaschine für 50 € — bar bezahlt. Dein Cash ist sofort 50 € weniger.',
        'Aber in deinem Gewinn taucht das kaum auf, weil eine Maschine ja jahrelang hält. Geld weg, Gewinn fast unberührt.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l5-zeitpunkte',
      prompt: 'Warum reicht der Gewinn nicht, um zu wissen wie viel Geld du hast?',
      options: [
        'Weil Geld zu anderen Zeitpunkten fließt als der Gewinn entsteht',
        'Weil Gewinn immer falsch ist',
        'Gar nicht, Gewinn = Geld',
      ],
      correctIndex: 0,
      solution: 'Gewinn entsteht beim Verkauf, Geld fließt oft zu einem anderen Zeitpunkt.',
      marcusCorrect: 'Richtig. Deshalb reicht die GuV allein nicht — man braucht den Blick aufs echte Geld.',
      marcusWrong: 'Fast — Gewinn entsteht beim Verkauf, das Geld fließt oft zu einem anderen Zeitpunkt. Deshalb reicht der Gewinn allein nicht. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Ein Satz',
      paragraphs: [
        'Der ganze Kern, ein Satz: **Gewinn zeigt, ob dein Geschäft funktioniert. Cash zeigt, ob gerade Geld da ist. Beides ist nicht dasselbe.**',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUSBLICK',
      heading: 'Das dritte Dokument',
      paragraphs: [
        'Weil das so wichtig ist, gibt es ein eigenes drittes Dokument, das nur das echte Geld verfolgt. Wie das aufgebaut ist, siehst du als Nächstes — in drei einfachen Schubladen.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 05 abgeschlossen.',
      marcus: {
        subject: 'Re: Gewinn ist nicht Geld',
        body: 'Du weißt jetzt, warum Gewinn und Cash nicht dasselbe sind: Der Verkauf zählt sofort, das Geld bewegt sich oft erst später. Als Nächstes schauen wir uns das Dokument an, das nur das echte Geld verfolgt, mit seinen drei Schubladen. Aber das hat Zeit.',
      },
      next: { title: 'Die drei Schubladen des Geldflusses', meta: '8 Min · +30 XP' },
    },
  ],
};
