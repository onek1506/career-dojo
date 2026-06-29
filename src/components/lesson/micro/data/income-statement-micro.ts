// ============================================================
// Income Statement, taught as two micro-lessons (one concept at a time).
// German-only, matching the existing bespoke accounting lessons.
// The coffee-shop narrative carries one consistent example across both:
//   Revenue 100 -> COGS 40 -> Gross Profit 60 -> OpEx 25 -> EBIT 35
//   -> Interest 5 -> Taxes 10 -> Net Income 20
//   Lesson 1: Revenue -> OpEx.   Lesson 2: EBIT -> Net Income.
// Transfer mini-checks use randomized numbers so the answer cannot be memorized.
// ============================================================

import type { MicroLessonData, MiniCheckContent } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

// --- Randomizer helpers --------------------------------------------------

function pick(min: number, max: number, step = 10): number {
  const steps = Math.floor((max - min) / step);
  return min + step * Math.floor(Math.random() * (steps + 1));
}

// Builds 4 distinct, positive options around `correct`, with `correct` at
// index 0. The slide reshuffles positions on render, so order here is moot.
function buildOptions(correct: number, tempting: number[]): { options: string[]; correctIndex: number } {
  const nums: number[] = [correct];
  for (const t of tempting) {
    if (nums.length >= 4) break;
    if (t > 0 && !nums.includes(t)) nums.push(t);
  }
  let delta = 5;
  while (nums.length < 4) {
    const cand = correct + delta;
    if (cand > 0 && !nums.includes(cand)) nums.push(cand);
    delta = delta > 0 ? -delta : -delta + 5;
  }
  return { options: nums.map((n) => `${n} €`), correctIndex: 0 };
}

// Transfer: reverse the Gross-Profit relationship to find COGS.
function genReverseCogs(): MiniCheckContent {
  const revenue = pick(150, 400);
  const cogs = pick(50, revenue - 50);
  const gross = revenue - cogs;
  return {
    prompt: `Ein Café macht ${revenue} € Umsatz und ${gross} € Bruttogewinn. Wie hoch waren die COGS?`,
    solution: `Rechenweg: COGS = Umsatz − Bruttogewinn = ${revenue} − ${gross} = ${cogs} €.`,
    ...buildOptions(cogs, [gross, revenue, revenue + gross]),
  };
}

// Transfer: two-step from the top line down past OpEx.
function genAfterOpex(): MiniCheckContent {
  const revenue = pick(250, 450);
  const cogs = pick(60, 120);
  const opex = pick(30, 70, 5);
  const result = revenue - cogs - opex;
  return {
    prompt: `Ein Laden: Umsatz ${revenue} €, COGS ${cogs} €, OpEx ${opex} €. Was bleibt nach den OpEx übrig?`,
    solution: `Rechenweg: Umsatz − COGS − OpEx = ${revenue} − ${cogs} − ${opex} = ${result} €.`,
    ...buildOptions(result, [revenue - cogs, revenue - cogs + opex, revenue - opex]),
  };
}

// Transfer: reverse the EBIT relationship to find OpEx.
function genReverseOpex(): MiniCheckContent {
  const gross = pick(120, 300);
  const opex = pick(40, gross - 40);
  const ebit = gross - opex;
  return {
    prompt: `Ein Café hat ${gross} € Bruttogewinn und ein EBIT von ${ebit} €. Wie hoch waren die OpEx?`,
    solution: `Rechenweg: OpEx = Bruttogewinn − EBIT = ${gross} − ${ebit} = ${opex} €.`,
    ...buildOptions(opex, [ebit, gross, gross + ebit]),
  };
}

// --- Lektion 01 — Umsatz bis OpEx ---------------------------------------

export const lessonRevenueToOpex: MicroLessonData = {
  id: 'acc-1-income-statement',
  module: MODULE,
  titleDe: 'GuV: Umsatz bis OpEx',
  nextPath: '/lesson/acc-1c-ebit',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Umsatz bis Betriebskosten',
      subtitle: 'Die Gewinn- und Verlustrechnung (GuV), Teil 1',
      marcus: {
        subject: 'Re: Willkommen',
        body: 'Stell dir vor, du verkaufst Kaffee. Du nimmst 100 € ein. Heißt das, du hast 100 € verdient? Nein. Genau dieser Unterschied ist der Anfang von allem. Wir gehen die GuV von oben durch: vom Umsatz über die Produktkosten bis zu den Betriebskosten. Schritt für Schritt, keine Vorkenntnisse nötig.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE GRUNDIDEE',
      heading: 'Eine GuV erzählt eine Geschichte',
      paragraphs: [
        'Eine Gewinn- und Verlustrechnung, kurz **GuV**, erzählt eine einzige Geschichte: Ganz oben steht, was reinkommt. Ganz unten, was übrig bleibt.',
        'Oben heißt **Revenue** (Umsatz). Unten heißt **Net Income** (Jahresüberschuss). Dazwischen wird Schritt für Schritt abgezogen, wie eine Treppe nach unten.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Vom Umsatz zum Bruttogewinn',
      paragraphs: [
        'Du verkaufst Kaffee für **100 €**. Das ist dein **Revenue**, der Umsatz ganz oben in der GuV.',
        'Die Bohnen, Becher und Milch haben dich **40 €** gekostet. Das sind die **COGS** (Cost of Goods Sold), die direkten Kosten deines Produkts.',
        '100 € minus 40 € macht **60 €**. Das ist dein **Bruttoergebnis** (Gross Profit). Glückwunsch, du liest gerade die erste Stufe einer GuV.',
      ],
      mono: `Revenue (Umsatz)        100
− COGS (Herstellk.)    −  40
────────────────────────────
Gross Profit (Brutto)    60`,
      marcus: {
        body: 'Wichtig: COGS sind nur die Kosten, die direkt im Produkt stecken. Miete und Marketing kommen später. Die ignorieren wir hier bewusst noch.',
      },
    },
    {
      kind: 'minicheck',
      id: 'l1-gross-profit',
      generate: genReverseCogs,
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Kosten, die nichts mit den Bohnen zu tun haben',
      paragraphs: [
        'Dein Kaffeeladen hat Kosten, die **nichts** mit den Bohnen zu tun haben.',
        'Die **Miete** für den Laden. Dein kleines **Marketing**. Vielleicht ein **Aushilfsgehalt**.',
        'Die fallen an, egal ob du heute fünf Kaffees verkaufst oder fünfhundert.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Das sind die OpEx',
      paragraphs: [
        'Diese Kosten heißen **OpEx**, also Operating Expenses oder Betriebskosten.',
        'Merk dir den Unterschied so: Zutaten stecken **im Produkt** (das waren die COGS). OpEx halten den **Laden am Laufen**.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'l2-what-is-opex',
      prompt: 'Welche dieser Kosten ist OpEx, steckt also nicht direkt im Produkt?',
      options: [
        'Die Versicherung für den Laden',
        'Die Kaffeebohnen',
        'Die Pappbecher',
        'Die Milch',
      ],
      correctIndex: 0,
      solution:
        'OpEx halten den Laden am Laufen, stecken aber in keinem einzelnen Kaffee. Eine Ladenversicherung gehört dazu. Bohnen, Becher und Milch sind dagegen COGS.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Vom Bruttogewinn weiter nach unten',
      paragraphs: [
        'Rechnen wir weiter mit deinen **60 €** Bruttogewinn.',
        'Miete und Marketing zusammen: **25 €**. Die ziehst du ab.',
        '60 € minus 25 € macht **35 €**. Näher am echten Gewinn, aber noch nicht ganz da.',
      ],
      mono: `Gross Profit (Brutto)    60
− OpEx (Betriebsk.)     −  25
────────────────────────────
= Zwischenergebnis       35`,
    },
    {
      kind: 'minicheck',
      id: 'l2-after-opex',
      generate: genAfterOpex,
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 01 abgeschlossen.',
      marcus: {
        subject: 'Re: Obere Hälfte sitzt',
        body: 'Stark. Du liest jetzt die obere Hälfte der GuV: Umsatz, Bruttogewinn und das Ergebnis nach den Betriebskosten. In der nächsten Lektion bekommt diese Zahl einen Namen, und wir gehen bis zum echten Gewinn ganz unten.',
      },
      next: { title: 'Lektion 02: EBIT bis Net Income', meta: '9 Min · +40 XP' },
    },
  ],
};

// --- Lektion 02 — EBIT bis Net Income -----------------------------------

export const lessonEbitToNetIncome: MicroLessonData = {
  id: 'acc-1c-ebit',
  module: MODULE,
  titleDe: 'GuV: EBIT bis Net Income',
  nextPath: '/lesson/balance-sheet',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'EBIT bis Net Income',
      subtitle: 'Die GuV, Teil 2',
      marcus: {
        subject: 'Re: Bis zum echten Gewinn',
        body: 'Letztes Mal sind wir bis 35 € gekommen, nach Zutaten, Miete und Marketing. Diese 35 € haben einen eigenen Namen, und danach fehlen nur noch zwei Stufen bis zum echten Gewinn. Den ganzen Rest der GuV machen wir jetzt.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Deine 35 € heißen EBIT',
      paragraphs: [
        'Diese **35 €** sind dein **EBIT**, der Gewinn aus deinem reinen Geschäft.',
        'EBIT steht für **E**arnings **B**efore **I**nterest and **T**axes: das Ergebnis, nachdem alle laufenden Kosten weg sind, aber bevor Zinsen und Steuern reinreden.',
        'Anders gesagt: Wie gut läuft dein Kaffeeladen **als Geschäft**, ganz unabhängig von Krediten oder dem Finanzamt?',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'WARUM EINE EIGENE ZAHL?',
      heading: 'EBIT macht Geschäfte vergleichbar',
      paragraphs: [
        'Warum die Aufregung um eine Zahl? Weil EBIT zeigt, ob das **Geschäft selbst** funktioniert.',
        'Zwei Kaffeeläden können gleich gut laufen, aber einer hat einen Kredit, der andere nicht. EBIT macht sie vergleichbar, weil die Zinsen hier noch **draußen** sind.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'l3-ebit-from-gross',
      generate: genReverseOpex,
    },
    {
      kind: 'concept',
      eyebrow: 'AUSBLICK · INTERVIEW',
      heading: 'Warum EBIT im Interview zählt',
      paragraphs: [
        'Kleiner Ausblick, ganz ohne Druck: EBIT ist einer der Begriffe, die in Interviews **garantiert** fallen.',
        'Banken lieben EBIT, weil er zeigt, wie gut das Geschäft selbst läuft, unabhängig davon, wie es finanziert ist.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Erster Abzug: Zinsen',
      paragraphs: [
        'Stell dir vor, du hast für deinen Laden einen kleinen Kredit aufgenommen. Dafür zahlst du der Bank Zinsen, sagen wir **5 €**.',
        'Das sind die **Interest** (Zinskosten). Die ziehst du jetzt vom EBIT ab.',
        '35 € minus 5 € macht **30 €**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Zweiter Abzug: Steuern',
      paragraphs: [
        'Letzte Stufe: Auf deinen Gewinn zahlst du Steuern, sagen wir **10 €**.',
        'Das sind die **Taxes**. Auch die runter.',
        '30 € minus 10 € macht **20 €**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER ZIELBEGRIFF',
      heading: 'Das ist dein Net Income',
      paragraphs: [
        'Diese **20 €** sind das, was **wirklich** übrig bleibt. Dein echter Gewinn.',
        'Der Name dafür: **Net Income**, auf Deutsch der Jahresüberschuss.',
        'Im Englischen sagt man auch **Bottom Line**, wörtlich die unterste Zeile. Genau darauf ist die ganze Treppe zugelaufen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'l4-net-income',
      prompt: 'EBIT 35, Zinsen 5, Steuern 10. Wie hoch ist das Net Income?',
      options: ['20 €', '30 €', '50 €', '25 €'],
      correctIndex: 0,
      solution: 'Rechenweg: EBIT − Zinsen − Steuern = 35 − 5 − 10 = 20 €.',
      marcusCorrect: 'Genau. Runter bis zur Bottom Line. Du hast die komplette Treppe selbst gerechnet.',
      marcusWrong:
        'Zwei Abzüge nacheinander: erst Zinsen (35 − 5 = 30), dann Steuern (30 − 10). Probier es nochmal.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE GANZE TREPPE',
      heading: 'Von oben bis unten in einem Bild',
      paragraphs: ['Jede Zeile hast du einzeln gelernt. Das ist keine fremde Tabelle mehr, das ist dein Kaffeeladen:'],
      mono: `Revenue (Umsatz)           100
− COGS (Herstellk.)       −  40
─────────────────────────────────
Gross Profit (Brutto)       60
− OpEx (Betriebsk.)       −  25
─────────────────────────────────
EBIT (Betriebserg.)         35
− Interest (Zinsen)       −   5
− Taxes (Steuern)         −  10
─────────────────────────────────
Net Income (Überschuss)     20`,
      marcus: {
        body: 'Lies die Treppe einmal von oben nach unten. Was reinkommt, wird Stufe für Stufe kleiner, bis der echte Gewinn übrig bleibt.',
      },
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 02 abgeschlossen.',
      marcus: {
        subject: 'Re: GuV komplett',
        body: 'Die GuV ist durch. Das war das erste große Kapitel, und du hast es Stufe für Stufe selbst aufgebaut. Als Nächstes wartet ein neues Dokument: die Bilanz.',
      },
      next: { title: 'Bilanz: The Balance Sheet', meta: '8 Min · +30 XP' },
    },
  ],
};

export const incomeStatementMicroLessons: MicroLessonData[] = [
  lessonRevenueToOpex,
  lessonEbitToNetIncome,
];
