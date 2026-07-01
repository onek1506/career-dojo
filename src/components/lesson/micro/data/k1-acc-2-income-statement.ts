// ============================================================
// Kategorie 1 — Lektion 03: Income Statement, Teil 2
// Continues the coffee-shop story from Teil 1 (starts at the 35 € after OpEx).
// One new term per slide: EBIT -> Interest -> Taxes -> Net Income.
// Easy early-win quizzes (K1). Ends with a SOFT GATE milestone slide that
// frames securing progress via installing the app (the real mechanism in
// this project; there is no account system).
// Number world: EBIT 35, Interest 5 -> 30, Taxes 10 -> Net Income 20.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1IncomeStatementT2: MicroLessonData = {
  id: 'k1-acc-2-income-statement',
  module: MODULE,
  titleDe: 'Income Statement, Teil 2',
  nextPath: '/lesson/k1-acc-3-balance-sheet',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Income Statement, Teil 2',
      subtitle: 'Die letzten Stufen bis zum echten Gewinn',
      marcus: {
        subject: 'Re: Weiter bei 35 €',
        body: 'Letztes Mal warst du bei 35 € angekommen: das, was nach Produktkosten und Betriebskosten übrig war. Heute gehen wir die letzten Stufen bis ganz nach unten. Immer noch derselbe Kaffeeladen, immer noch in Ruhe.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Deine 35 € haben einen Namen',
      paragraphs: [
        'Diese 35 € sind der Gewinn aus deinem reinen Geschäft: nach den Zutaten, nach Miete und Marketing.',
        'Der Name dafür ist **EBIT** (Earnings Before Interest and Taxes), also der Gewinn vor Zinsen und Steuern. Merk dir: EBIT zeigt, wie gut der Laden **als Geschäft** läuft.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'WARUM DAS NÜTZLICH IST',
      heading: 'EBIT vergleicht Läden fair',
      paragraphs: [
        'Stell dir zwei Kaffeeläden vor, die gleich gut laufen. Der eine hat einen Kredit, der andere nicht.',
        'Beim EBIT sind Zinsen noch **nicht** abgezogen. Deshalb kann man mit EBIT beide Läden fair vergleichen, ohne dass der Kredit das Bild verzerrt.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l3-ebit-name',
      prompt: 'Wie heißt der Gewinn aus dem reinen Geschäft, vor Zinsen und Steuern?',
      options: ['EBIT', 'Revenue', 'COGS', 'Gross Profit'],
      correctIndex: 0,
      solution: 'EBIT = Earnings Before Interest and Taxes: der Gewinn vor Zinsen und Steuern. In deinem Laden sind das 35 €.',
      marcusCorrect: 'Genau. Dein Zwischenergebnis von 35 € heißt EBIT. Ein Begriff mehr, den du sicher draufhast.',
      marcusWrong: 'Kein Stress. Revenue war ganz oben, COGS und Gross Profit kamen davor. Der Gewinn vor Zinsen und Steuern heißt EBIT. Schau nochmal.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Jetzt kommen die Zinsen',
      paragraphs: [
        'Für die Espressomaschine hast du einen kleinen Kredit aufgenommen. Die Bank will dafür **5 €** Zinsen.',
        'Diese Kosten für geliehenes Geld heißen **Interest** (Zinsaufwand). Ziehst du sie ab, bleiben von 35 € noch **30 €**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Und der Staat will auch etwas',
      paragraphs: [
        'Auf den Gewinn zahlst du Steuern, sagen wir **10 €**.',
        'Diese heißen **Taxes** (Steuern). Nach ihnen bleiben von 30 € noch **20 €** übrig. Fast am Ziel.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Was am Ende wirklich übrig bleibt',
      paragraphs: [
        'Diese letzten **20 €** gehören dir. Das ist der echte Gewinn, ganz unten in der GuV.',
        'Der Name dafür ist **Net Income** (Jahresüberschuss), oft auch Bottom Line genannt. Von 100 € Umsatz sind 20 € echter Gewinn geworden.',
      ],
      mono: `Revenue (Umsatz)          100
− COGS (Produktkosten)   − 40
Gross Profit (Brutto)      60
− OpEx (Betriebskosten)  − 25
EBIT                       35
− Interest (Zinsen)      −  5
− Taxes (Steuern)        − 10
Net Income (Überschuss)    20`,
    },
    {
      kind: 'minicheck',
      id: 'k1-l3-net-income',
      prompt: 'EBIT 35 €, Zinsen 5 €, Steuern 10 €. Wie hoch ist das Net Income?',
      options: ['20 €', '30 €', '50 €', '25 €'],
      correctIndex: 0,
      solution: 'Net Income = EBIT − Zinsen − Steuern = 35 − 5 − 10 = 20 €.',
      marcusCorrect: 'Perfekt. 35 minus 5 minus 10 macht 20. Du hast gerade eine komplette GuV zu Ende gerechnet.',
      marcusWrong: 'Kein Stress. Zwei Abzüge nacheinander: erst Zinsen (35 − 5 = 30), dann Steuern (30 − 10). Schau nochmal.',
    },
    {
      kind: 'concept',
      eyebrow: 'MEILENSTEIN',
      heading: 'Du liest jetzt eine ganze GuV',
      paragraphs: [
        'Halt kurz inne: Du hast gerade ein komplettes Income Statement gelesen, von Revenue ganz oben bis Net Income ganz unten. Das können erstaunlich viele Bewerber nicht sauber.',
        'Dieser Fortschritt liegt bisher nur auf diesem Gerät. Wenn du CareerDojo als App installierst, bleibt dein Stand gesichert, auch offline. Ganz ohne Konto.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 03 abgeschlossen.',
      marcus: {
        subject: 'Re: GuV komplett',
        body: 'Die erste große Hürde ist geschafft: Du kennst die ganze GuV, von 100 € Umsatz bis 20 € Net Income. Als Nächstes wechseln wir den Bericht und schauen, was dein Laden eigentlich besitzt. Immer noch derselbe Kaffeeladen. Aber das hat Zeit.',
      },
      next: { title: 'Lektion 04: Balance Sheet, Teil 1', meta: '8 Min · +30 XP' },
    },
  ],
};
