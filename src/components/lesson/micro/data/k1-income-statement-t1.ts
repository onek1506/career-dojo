// ============================================================
// Kategorie 1 — Lektion 02: Income Statement, Teil 1
// Starts the coffee-shop story (the red thread through lessons 2-9).
// One new term per slide: Income Statement -> Revenue -> COGS ->
// Gross Profit -> OpEx. Concept -> example -> application per the
// three-layer pattern. Mini-quizzes are deliberately easy (early win).
// Number world: Revenue 100, COGS 40, Gross Profit 60, OpEx 25 -> 35.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1IncomeStatementT1: MicroLessonData = {
  id: 'k1-acc-1-income-statement',
  module: MODULE,
  titleDe: 'Income Statement, Teil 1',
  nextPath: '/lesson/k1-acc-2-income-statement',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Income Statement, Teil 1',
      subtitle: 'Vom Umsatz zum ersten Gewinn, an einem Kaffeeladen',
      marcus: {
        subject: 'Re: Der erste Bericht',
        body: 'Im Spielfeld hast du gesehen, warum Banken im Interview Technik prüfen. Jetzt fangen wir damit an, ganz ruhig. Stell dir vor, du verkaufst Kaffee. Du nimmst 100 € ein. Heißt das, du hast 100 € verdient? Genau diese Frage führt uns durch die ganze Lektion.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DER ERSTE BERICHT',
      heading: 'Das Income Statement erzählt eine Geschichte',
      paragraphs: [
        'Der erste der drei großen Finanzberichte heißt **Income Statement**, auf Deutsch die Gewinn- und Verlustrechnung oder kurz GuV.',
        'Er erzählt eine einzige Geschichte: Ganz oben steht, was reinkommt. Dann wird Schritt für Schritt abgezogen. Ganz unten steht, was übrig bleibt.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Ganz oben steht der Umsatz',
      paragraphs: [
        'Du verkaufst den ganzen Tag Kaffee und nimmst dabei **100 €** ein.',
        'Diese 100 € sind dein **Revenue**, auf Deutsch der Umsatz. Das ist die oberste Zeile der GuV, bevor irgendetwas abgezogen wurde.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Die direkten Kosten des Produkts',
      paragraphs: [
        'Damit du den Kaffee verkaufen konntest, brauchtest du Bohnen, Milch und Becher. Die haben dich zusammen **40 €** gekostet.',
        'Diese direkten Produktkosten heißen **COGS** (Cost of Goods Sold). Wichtig: Es sind nur die Kosten, die direkt im Becher stecken.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Was nach den Produktkosten bleibt',
      paragraphs: [
        '100 € sind reingekommen, 40 € für die Zutaten sind weg. Was bleibt? **60 €**.',
        'Diese 60 € heißen **Gross Profit**, auf Deutsch Bruttogewinn. Das ist die erste echte Stufe deiner GuV.',
      ],
      mono: `Revenue (Umsatz)         100
− COGS (Produktkosten)  −  40
─────────────────────────────
Gross Profit (Brutto)     60`,
    },
    {
      kind: 'minicheck',
      id: 'k1-l2-gross-profit',
      prompt: 'Dein Kaffeeladen: 100 € Umsatz, 40 € COGS. Wie hoch ist der Bruttogewinn?',
      options: ['60 €', '140 €', '40 €', '100 €'],
      correctIndex: 0,
      solution: 'Bruttogewinn = Umsatz − COGS = 100 − 40 = 60 €.',
      marcusCorrect: 'Genau. 100 rein, 40 weg, 60 bleibt. Du hast gerade deinen ersten Bruttogewinn berechnet.',
      marcusWrong: 'Kein Stress. Bruttogewinn ist Umsatz minus COGS: 100 − 40. Schau nochmal.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Kosten, die nicht im Becher stecken',
      paragraphs: [
        'Dein Laden hat noch andere Kosten: die **Miete**, ein bisschen **Marketing**, vielleicht eine Aushilfe. Sagen wir zusammen **25 €**.',
        'Diese laufenden Betriebskosten heißen **OpEx** (Operating Expenses). Sie halten den Laden am Laufen, stecken aber in keinem einzelnen Kaffee.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Eine Stufe tiefer',
      paragraphs: [
        'Ziehen wir die OpEx vom Bruttogewinn ab: 60 € minus 25 € macht **35 €**.',
        'Du bist dem echten Gewinn ein gutes Stück näher. Wie es von hier nach ganz unten weitergeht, kommt in der nächsten Lektion.',
      ],
      mono: `Gross Profit (Brutto)     60
− OpEx (Betriebskosten)  −  25
─────────────────────────────
= Zwischenergebnis        35`,
    },
    {
      kind: 'minicheck',
      id: 'k1-l2-after-opex',
      prompt: 'Bruttogewinn 60 €, OpEx 25 €. Was bleibt übrig?',
      options: ['35 €', '85 €', '25 €', '60 €'],
      correctIndex: 0,
      solution: 'Bruttogewinn − OpEx = 60 − 25 = 35 €.',
      marcusCorrect: 'Sauber. 60 minus 25 macht 35. Stufe für Stufe baust du die GuV selbst.',
      marcusWrong: 'OpEx werden vom Bruttogewinn abgezogen: 60 − 25. Probier es nochmal.',
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 02 abgeschlossen.',
      marcus: {
        subject: 'Re: Erste Stufen sitzen',
        body: 'Stark. Du kennst jetzt Revenue, COGS, Bruttogewinn und OpEx, und du hast den Weg von 100 € bis 35 € selbst gerechnet. In der nächsten Lektion gehen wir die letzten Stufen bis zum echten Gewinn ganz unten. Aber das hat Zeit.',
      },
      next: { title: 'Lektion 03: Income Statement, Teil 2', meta: '9 Min · +40 XP' },
    },
  ],
};
