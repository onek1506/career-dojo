// ============================================================
// Kategorie 1 — Lektion 04: Balance Sheet, Teil 1
// Same coffee shop. Budget: ONE new hard term chain, Bilanz -> Assets.
// (Liabilities & Equity are Lektion 05, not anticipated here.)
// Callback from Teil 2 (Net Income 20). The espresso machine (bought on the
// credit whose interest appeared in Teil 2) is the anchor asset.
// Easy early-win quiz. One new term per slide.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1BalanceSheetT1: MicroLessonData = {
  id: 'k1-acc-3-balance-sheet',
  module: MODULE,
  titleDe: 'Balance Sheet, Teil 1',
  nextPath: '/lesson/k1-acc-4-balance-sheet',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Balance Sheet, Teil 1',
      subtitle: 'Was dein Laden besitzt',
      marcus: {
        subject: 'Re: Ein neuer Bericht',
        body: 'Letztes Mal hast du die ganze GuV zu Ende gerechnet: von 100 € Umsatz bis 20 € Net Income. Jetzt legen wir die GuV kurz zur Seite und stellen eine ganz andere Frage: Was besitzt dein Kaffeeladen eigentlich? Derselbe Laden, ein neuer Blick.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'FILM UND FOTO',
      heading: 'Die Bilanz ist ein Foto',
      paragraphs: [
        'Die GuV war wie ein **Film**: Sie zeigt, was über einen Zeitraum passiert ist, von Umsatz bis Gewinn.',
        'Der zweite große Bericht ist wie ein **Foto** an einem einzigen Tag. Er heißt **Balance Sheet**, auf Deutsch die Bilanz, und zeigt einen Moment: Was ist gerade da?',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Was der Laden besitzt',
      paragraphs: [
        'Schau dich in deinem Laden um. Da steht die **Espressomaschine**. Im Regal liegt ein **Vorrat an Kaffeebohnen**. In der Kasse ist **Bargeld**.',
        'All diese Dinge, die dein Laden besitzt, heißen **Assets** (auf Deutsch Aktiva oder Vermögenswerte). Es ist alles, was einen Wert hat und dir gehört.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Nicht alle Assets sind gleich',
      paragraphs: [
        'Manche Assets werden schnell wieder zu Geld: das Bargeld in der Kasse ist schon Geld, die Kaffeebohnen verkaufst du in Tagen.',
        'Andere bleiben lange: die Espressomaschine nutzt du jahrelang. Beide sind Assets. Sie sind nur unterschiedlich schnell verfügbar.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l4-asset',
      prompt: 'Was davon ist ein Asset deines Kaffeeladens?',
      options: [
        'Die Espressomaschine',
        'Der Kredit bei der Bank',
        'Die Stromrechnung für nächsten Monat',
        'Ein Werbespruch auf Instagram',
      ],
      correctIndex: 0,
      solution: 'Ein Asset ist etwas mit Wert, das der Laden besitzt. Die Espressomaschine gehört dir. Der Kredit ist dagegen Geld, das du schuldest (dazu bald mehr).',
      marcusCorrect: 'Genau. Die Maschine gehört dir und hat einen Wert, also ist sie ein Asset.',
      marcusWrong: 'Kein Stress. Frag dich: Besitzt der Laden das Ding? Die Maschine ja. Der Kredit ist geliehenes Geld, kein Besitz. Schau nochmal.',
    },
    {
      kind: 'concept',
      eyebrow: 'EINE OFFENE FRAGE',
      heading: 'Woher kam das Geld dafür?',
      paragraphs: [
        'Deine Assets stehen auf einer Seite der Bilanz, sozusagen die Liste dessen, was da ist.',
        'Aber eine Frage bleibt offen: Woher kam das Geld, um die Espressomaschine zu kaufen? Aus deiner eigenen Tasche, oder von der Bank? Genau das ist die andere Seite der Bilanz. Die schauen wir uns als Nächstes an.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 04 abgeschlossen.',
      marcus: {
        subject: 'Re: Erste Seite der Bilanz',
        body: 'Gut gemacht. Du weißt jetzt: Die Bilanz ist ein Foto, und Assets sind alles, was dein Laden besitzt, von der Espressomaschine bis zum Bargeld. In der nächsten Lektion klären wir, woher das Geld dafür kam. Kein Stress, ein Schritt nach dem anderen.',
      },
      next: { title: 'Lektion 05: Balance Sheet, Teil 2', meta: '8 Min · +30 XP' },
    },
  ],
};
