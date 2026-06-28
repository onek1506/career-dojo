// ============================================================
// Income Statement — split into four micro-lessons (one concept at a time).
// German-only, matching the existing bespoke accounting lessons.
// The coffee-shop narrative carries one consistent example across all four:
//   Revenue 100 → COGS 40 → Gross Profit 60 → OpEx 25 → EBIT 35
//   → Interest 5 → Taxes 10 → Net Income 20
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

// --- Lektion 01 — Umsatz & Bruttogewinn ---------------------------------

export const lesson01Revenue: MicroLessonData = {
  id: 'acc-1-income-statement',
  module: MODULE,
  titleDe: 'Umsatz & Bruttogewinn',
  nextPath: '/lesson/acc-1b-opex',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Umsatz & Bruttogewinn',
      subtitle: 'Die Gewinn- und Verlustrechnung (GuV) — Teil 1',
      marcus: {
        subject: 'Re: Willkommen',
        body: 'Stell dir vor, du verkaufst Kaffee. Du nimmst 100 € ein. Heißt das, du hast 100 € verdient? Nein — und genau dieser Unterschied ist der Anfang von allem. Wir gehen das ruhig durch, Schritt für Schritt. Keine Vorkenntnisse nötig.',
      },
      stats: { duration: '5 MIN', xp: '+20', difficulty: '★☆☆☆☆' },
      outcomes: [
        'Verstehen, was eine GuV überhaupt zeigt',
        'Die Begriffe Revenue und COGS einordnen',
        'Den Bruttogewinn selbst ausrechnen',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE GRUNDIDEE',
      heading: 'Eine GuV erzählt eine Geschichte',
      paragraphs: [
        'Eine Gewinn- und Verlustrechnung — kurz **GuV** — erzählt eine einzige Geschichte: Ganz oben steht, was reinkommt. Ganz unten, was übrig bleibt.',
        'Oben heißt **Revenue** (Umsatz). Unten heißt **Net Income** (Jahresüberschuss). Dazwischen wird Schritt für Schritt abgezogen — wie eine Treppe nach unten.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Vom Umsatz zum Bruttogewinn',
      paragraphs: [
        'Du verkaufst Kaffee für **100 €**. Das ist dein **Revenue** — der Umsatz, ganz oben in der GuV.',
        'Die Bohnen, Becher und Milch haben dich **40 €** gekostet. Das sind die **COGS** (Cost of Goods Sold) — die direkten Kosten deines Produkts.',
        '100 € minus 40 € macht **60 €**. Das ist dein **Bruttoergebnis** (Gross Profit). Glückwunsch — du liest gerade die erste Stufe einer GuV.',
      ],
      mono: `Revenue (Umsatz)        100
− COGS (Herstellk.)    −  40
────────────────────────────
Gross Profit (Brutto)    60`,
      marcus: {
        body: 'Wichtig: COGS sind nur die Kosten, die direkt im Produkt stecken. Miete und Marketing kommen später — die ignorieren wir hier bewusst noch.',
      },
    },
    {
      kind: 'minicheck',
      id: 'l1-gross-profit',
      prompt: 'Revenue ist 200, COGS ist 70. Wie hoch ist der Bruttogewinn?',
      options: ['130', '270', '70', '200'],
      correctIndex: 0,
      solution: 'Rechenweg: Revenue − COGS = 200 − 70 = 130.',
      marcusCorrect: 'Genau. 200 minus 70. Du hast gerade ohne Hilfe einen Bruttogewinn berechnet.',
      marcusWrong:
        'Denk an die Richtung: Bruttogewinn ist Revenue minus COGS — wir ziehen ab, nicht dazu. Probier es nochmal.',
    },
    {
      kind: 'summary',
      eyebrow: 'ZUSAMMENFASSUNG',
      heading: 'Das nimmst du mit',
      formula: 'Gross Profit = Revenue − COGS',
      points: [
        '**Revenue** steht ganz oben — alles, was reinkommt.',
        '**COGS** sind die direkten Produktkosten (Material, Becher, Milch).',
        '**Gross Profit** ist, was nach den Produktkosten übrig bleibt.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 01 abgeschlossen.',
      marcus: {
        subject: 'Re: Erste Stufe geschafft',
        body: 'Stark. Du liest jetzt die obere Stufe jeder GuV. Als Nächstes kommen die Kosten, die nicht direkt am Produkt hängen — Miete, Marketing, Gehälter. Bis gleich.',
      },
      next: { title: 'Lektion 02 — Betriebskosten (OpEx)', meta: '5 Min · +20 XP' },
    },
  ],
};

// --- Lektion 02 — Betriebskosten (OpEx) ---------------------------------

export const lesson02Opex: MicroLessonData = {
  id: 'acc-1b-opex',
  module: MODULE,
  titleDe: 'Betriebskosten (OpEx)',
  nextPath: '/lesson/acc-1c-ebit',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Betriebskosten (OpEx)',
      subtitle: 'Die GuV — Teil 2',
      marcus: {
        subject: "Re: Weiter geht's",
        body: 'Letztes Mal hattest du 60 € Bruttogewinn übrig. Fühlt sich an wie Gewinn, oder? Ist es aber noch nicht — eine Sorte Kosten haben wir bisher komplett ignoriert.',
      },
      stats: { duration: '5 MIN', xp: '+20', difficulty: '★☆☆☆☆' },
      outcomes: [
        'Erkennen, welche Kosten nicht im Produkt stecken',
        'Den Begriff OpEx sicher einordnen',
        'Den Gewinn nach Betriebskosten berechnen',
      ],
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
        'Diese Kosten heißen **OpEx** — Operating Expenses, also Betriebskosten.',
        'Merk dir den Unterschied so: Zutaten stecken **im Produkt** (das waren die COGS). OpEx halten den **Laden am Laufen**.',
      ],
      marcus: {
        body: 'Das ist dein einziger neuer Begriff heute. Mehr musst du dir gerade nicht merken.',
      },
    },
    {
      kind: 'minicheck',
      id: 'l2-what-is-opex',
      prompt: 'Welche dieser Kosten sind OpEx — also nicht direkt im Produkt?',
      options: ['Die Ladenmiete', 'Die Kaffeebohnen', 'Die Pappbecher', 'Die Milch'],
      correctIndex: 0,
      solution:
        'OpEx halten den Laden am Laufen, stecken aber in keinem einzelnen Kaffee. Bohnen, Becher und Milch sind COGS.',
      marcusCorrect: 'Genau. Miete hält den Laden am Laufen, steckt aber in keinem einzelnen Kaffee.',
      marcusWrong:
        'Frag dich: Steckt diese Kost direkt im Produkt? Bohnen, Becher und Milch ja — die Miete nicht.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Vom Bruttogewinn weiter nach unten',
      paragraphs: [
        'Rechnen wir weiter mit deinen **60 €** Bruttogewinn.',
        'Miete und Marketing zusammen: **25 €**. Die ziehst du ab.',
        '60 € minus 25 € macht **35 €**. Näher am echten Gewinn — aber noch nicht ganz da.',
      ],
      mono: `Gross Profit (Brutto)    60
− OpEx (Betriebsk.)     −  25
────────────────────────────
= Zwischenergebnis       35`,
    },
    {
      kind: 'minicheck',
      id: 'l2-after-opex',
      prompt: 'Dein Bruttogewinn ist 60, die OpEx sind 20. Was bleibt übrig?',
      options: ['40', '80', '60', '20'],
      correctIndex: 0,
      solution: 'Rechenweg: Gross Profit − OpEx = 60 − 20 = 40.',
      marcusCorrect: 'Sauber abgezogen. Du baust die Treppe Stufe für Stufe selbst.',
      marcusWrong: 'OpEx werden vom Bruttogewinn abgezogen: 60 − 20. Probier es nochmal.',
    },
    {
      kind: 'summary',
      eyebrow: 'ZUSAMMENFASSUNG',
      heading: 'Das nimmst du mit',
      points: [
        '**OpEx** = Betriebskosten: Miete, Marketing, Gehälter.',
        'OpEx stecken **nicht** im Produkt — anders als COGS.',
        'Nach den Produktkosten kommen die **Ladenkosten**.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 02 abgeschlossen.',
      marcus: {
        subject: 'Re: Zwei Sorten Kosten',
        body: 'Geschafft. Du kennst jetzt zwei Sorten Kosten: Produktkosten (COGS) und Betriebskosten (OpEx). Das Ergebnis nach den OpEx hat übrigens einen wichtigen Namen — den lernst du als Nächstes.',
      },
      next: { title: 'Lektion 03 — EBIT', meta: '4 Min · +20 XP' },
    },
  ],
};

// --- Lektion 03 — EBIT ---------------------------------------------------

export const lesson03Ebit: MicroLessonData = {
  id: 'acc-1c-ebit',
  module: MODULE,
  titleDe: 'EBIT',
  nextPath: '/lesson/acc-1d-net-income',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'EBIT — der Gewinn aus dem Geschäft',
      subtitle: 'Die GuV — Teil 3',
      marcus: {
        subject: 'Re: Ein Name für deine 35 €',
        body: 'Letztes Mal sind wir bei 35 € gelandet — nach Zutaten, nach Miete und Marketing. Diese 35 € sind so wichtig, dass sie einen eigenen Namen haben. Den lernst du heute. Sonst nichts Neues.',
      },
      stats: { duration: '4 MIN', xp: '+20', difficulty: '★☆☆☆☆' },
      outcomes: [
        'Wissen, was EBIT bedeutet',
        'Verstehen, warum EBIT eine eigene Kennzahl ist',
        'EBIT von Zinsen und Steuern abgrenzen',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Deine 35 € heißen EBIT',
      paragraphs: [
        'Das ist dein **EBIT** — der Gewinn aus deinem reinen Geschäft.',
        'EBIT steht für **E**arnings **B**efore **I**nterest and **T**axes: das Ergebnis, **nachdem** alle laufenden Kosten weg sind — aber **bevor** Zinsen und Steuern reinreden.',
        'Anders gesagt: Wie gut läuft dein Kaffeeladen **als Geschäft** — ganz unabhängig von Krediten oder dem Finanzamt?',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'WARUM EINE EIGENE ZAHL?',
      heading: 'EBIT macht Geschäfte vergleichbar',
      paragraphs: [
        'Warum die Aufregung um eine Zahl? Weil EBIT zeigt, ob das **Geschäft selbst** funktioniert.',
        'Zwei Kaffeeläden können gleich gut laufen — aber einer hat einen Kredit, der andere nicht. EBIT macht sie vergleichbar, weil die Zinsen hier noch **draußen** sind.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'l3-ebit-before',
      prompt: 'Was ist beim EBIT noch nicht abgezogen?',
      options: ['Zinsen und Steuern', 'Die Miete', 'Die Zutaten (COGS)', 'Das Marketing'],
      correctIndex: 0,
      solution:
        'EBIT ist das Ergebnis vor Zinsen und Steuern. Miete, Zutaten und Marketing sind als OpEx und COGS schon abgezogen.',
      marcusCorrect: 'Genau. Miete und Zutaten sind raus. Zinsen und Steuern kommen erst noch.',
      marcusWrong:
        'EBIT = vor Zinsen und Steuern. Miete (OpEx) und Zutaten (COGS) sind oberhalb schon abgezogen.',
    },
    {
      kind: 'concept',
      eyebrow: 'AUSBLICK · INTERVIEW',
      heading: 'Warum EBIT im Interview zählt',
      paragraphs: [
        'Kleiner Ausblick, ganz ohne Druck: EBIT ist einer der Begriffe, die in Interviews **garantiert** fallen.',
        'Banken lieben EBIT, weil er zeigt, wie gut das Geschäft selbst läuft — unabhängig davon, wie es finanziert ist.',
      ],
      marcus: {
        body: 'Du musst das heute nicht perfekt können. Aber du wirst dich an deinen Kaffeeladen erinnern, wenn die Frage kommt.',
      },
    },
    {
      kind: 'summary',
      eyebrow: 'ZUSAMMENFASSUNG',
      heading: 'Das nimmst du mit',
      formula: 'EBIT = Gewinn vor Zinsen und Steuern',
      points: [
        '**EBIT** ist der Gewinn aus dem reinen Geschäft.',
        'Bei EBIT sind COGS und OpEx schon abgezogen.',
        'Zinsen und Steuern sind **noch nicht** abgezogen.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 03 abgeschlossen.',
      marcus: {
        subject: 'Re: Drei Stufen sitzen',
        body: 'Echter Meilenstein. Du liest jetzt die obere Hälfte einer GuV: Revenue, Gross Profit, EBIT. In der letzten Lektion gehen wir bis ganz nach unten — zu dem, was wirklich übrig bleibt.',
      },
      next: { title: 'Lektion 04 — Zinsen, Steuern & Net Income', meta: '5 Min · +25 XP' },
    },
  ],
};

// --- Lektion 04 — Zinsen, Steuern & Net Income --------------------------

export const lesson04NetIncome: MicroLessonData = {
  id: 'acc-1d-net-income',
  module: MODULE,
  titleDe: 'Zinsen, Steuern & Net Income',
  nextPath: '/lesson/balance-sheet',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Zinsen, Steuern & Net Income',
      subtitle: 'Die GuV — Teil 4',
      marcus: {
        subject: 'Re: Bis zum echten Gewinn',
        body: 'Du bist bei deinem EBIT — sagen wir 35 €. Fast am Ziel. Zwei letzte Stufen, dann hast du den echten Gewinn.',
      },
      stats: { duration: '5 MIN', xp: '+25', difficulty: '★★☆☆☆' },
      outcomes: [
        'Zinsen und Steuern als letzte Abzüge verstehen',
        'Den Begriff Net Income (Bottom Line) kennen',
        'Eine komplette GuV von oben bis unten lesen',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Erster Abzug: Zinsen',
      paragraphs: [
        'Stell dir vor, du hast für deinen Laden einen kleinen Kredit aufgenommen. Dafür zahlst du der Bank Zinsen — sagen wir **5 €**.',
        'Das sind die **Interest** (Zinskosten). Die ziehst du jetzt vom EBIT ab.',
        '35 € minus 5 € macht **30 €**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Zweiter Abzug: Steuern',
      paragraphs: [
        'Letzte Stufe: Auf deinen Gewinn zahlst du Steuern — sagen wir **10 €**.',
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
        'Der Name dafür: **Net Income** — auf Deutsch der Jahresüberschuss.',
        'Im Englischen sagt man auch **Bottom Line** — wörtlich die unterste Zeile. Genau darauf ist die ganze Treppe zugelaufen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'l4-net-income',
      prompt: 'EBIT 35, Zinsen 5, Steuern 10. Wie hoch ist das Net Income?',
      options: ['20', '30', '50', '25'],
      correctIndex: 0,
      solution: 'Rechenweg: EBIT − Zinsen − Steuern = 35 − 5 − 10 = 20.',
      marcusCorrect: 'Genau — runter bis zur Bottom Line. Du hast die komplette Treppe selbst gerechnet.',
      marcusWrong:
        'Zwei Abzüge nacheinander: erst Zinsen (35 − 5 = 30), dann Steuern (30 − 10). Probier es nochmal.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE GANZE TREPPE',
      heading: 'Von oben bis unten in einem Bild',
      paragraphs: ['Jede Zeile hast du einzeln gelernt. Das ist keine fremde Tabelle mehr — das ist dein Kaffeeladen:'],
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
      kind: 'summary',
      eyebrow: 'ZUSAMMENFASSUNG',
      heading: 'Das nimmst du mit',
      formula: 'Net Income = EBIT − Zinsen − Steuern',
      points: [
        '**Zinsen** und **Steuern** sind die letzten beiden Abzüge.',
        '**Net Income** (Jahresüberschuss) ist die Bottom Line.',
        'Du liest jetzt eine **komplette GuV** — von Revenue bis Net Income.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 04 abgeschlossen.',
      marcus: {
        subject: 'Re: GuV komplett',
        body: 'Die GuV ist durch. Das war das erste große Kapitel — und du hast es Stufe für Stufe selbst aufgebaut. Als Nächstes wartet ein neues Dokument: die Bilanz.',
      },
      next: { title: 'Bilanz — The Balance Sheet', meta: '8 Min · +30 XP' },
    },
  ],
};

export const incomeStatementMicroLessons: MicroLessonData[] = [
  lesson01Revenue,
  lesson02Opex,
  lesson03Ebit,
  lesson04NetIncome,
];
