// ============================================================
// Kategorie 1 — Lektion 03: Was der Laden besitzt (Balance Sheet Teil 1)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 3, 9 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// No marcusWrong is authored in the source, so none is invented.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1BalanceSheetT1: MicroLessonData = {
  id: 'k1-acc-3-balance-sheet',
  module: MODULE,
  titleDe: 'Was der Laden besitzt',
  nextPath: '/lesson/k1-acc-4-balance-sheet',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Was der Laden besitzt',
      subtitle: 'Balance Sheet, Teil 1',
      marcus: {
        subject: 'Re: Was besitzt dein Laden?',
        body: 'Dein Kaffeeladen macht Gewinn — das haben wir geklärt. Aber jetzt eine ganz andere Frage: Was *besitzt* dein Laden eigentlich?',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Denk kurz nach',
      paragraphs: [
        'Denk kurz nach. Da ist deine Espressomaschine, die 50 € gekostet hat. Das Bargeld in der Kasse, 20 €. Vielleicht ein Sack Bohnen im Lager. Das sind Dinge, die deinem Laden gehören und einen Wert haben.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Ein Wort dafür: Assets',
      paragraphs: [
        'Für all diese Dinge gibt es ein Wort: **Assets**. Auf Deutsch: Vermögenswerte. Ein Asset ist einfach etwas, das dein Laden besitzt und das einen Wert hat.',
        'Deine Espressomaschine ist ein Asset. Dein Bargeld ist ein Asset. Mehr steckt nicht dahinter.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l3-asset',
      prompt: 'Was davon ist ein Asset deines Kaffeeladens?',
      options: ['Die Espressomaschine', 'Der Kaffeegeruch', 'Deine gute Laune'],
      correctIndex: 0,
      solution: 'Ein Asset ist etwas mit Wert, das dein Laden besitzt. Die Espressomaschine gehört dir.',
      marcusCorrect: 'Genau. Sie gehört dir und hat einen Wert — ein klares Asset.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Nicht jedes Asset ist gleich',
      paragraphs: [
        'Kleiner Unterschied, den du sofort verstehst: Manche Assets sind Bargeld oder fast wie Bargeld — das Geld in deiner Kasse. Andere sind Dinge, die du benutzt, um Geld zu verdienen — die Espressomaschine.',
        'Beides sind Assets. Nur die eine Sorte kannst du sofort ausgeben, die andere nicht.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l3-cash-like',
      prompt: 'Was ist eher wie Bargeld?',
      options: ['Das Geld in der Kasse', 'Die Espressomaschine'],
      correctIndex: 0,
      solution: 'Bargeld kannst du sofort ausgeben. Die Maschine ist wertvoll, aber nicht sofort verfügbar.',
      marcusCorrect: 'Richtig. Die Maschine ist wertvoll, aber du kannst sie nicht einfach ausgeben.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Das reicht für heute',
      paragraphs: [
        'Der ganze Kern von heute: **Assets sind alles, was dein Laden besitzt und was einen Wert hat.** Ein neues Wort. Das reicht für heute.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUSBLICK',
      heading: 'Eine offene Frage',
      paragraphs: [
        'Eine Frage lasse ich offen — und die klären wir beim nächsten Mal: Deine Espressomaschine hat 50 € gekostet. Aber woher kam dieses Geld? Hast du es selbst reingesteckt, oder von der Bank geliehen?',
        'Genau das ist die andere Hälfte der Geschichte.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 03 abgeschlossen.',
      marcus: {
        subject: 'Re: Assets sitzen',
        body: 'Ein neues Wort sitzt: Assets, alles was dein Laden besitzt und was einen Wert hat. Als Nächstes klären wir, woher das Geld dafür kam.',
      },
      next: { title: 'Woher das Geld für die Assets kam', meta: '8 Min · +35 XP' },
    },
  ],
};
