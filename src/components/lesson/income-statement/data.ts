// ============================================================
// Income Statement Lesson — static lesson data
// ============================================================

export type WaterfallStep = {
  type: 'start' | 'minus' | 'sum';
  label: string;
  de: string;
  value: number;
  barWidth: number; // percentage, 0-100, relative to revenue (max)
  section: 'operative' | 'finanz' | 'staat';
  highlighted?: boolean;
  tooltip: string;
};

export const waterfallSteps: WaterfallStep[] = [
  {
    type: 'start',
    label: 'Revenue',
    de: 'Umsatzerlöse',
    value: 200,
    barWidth: 100,
    section: 'operative',
    tooltip: 'Alle Erlöse aus dem Verkauf von Produkten und Dienstleistungen — vor jeglichen Abzügen.',
  },
  {
    type: 'minus',
    label: '− COGS',
    de: 'Herstellungskosten',
    value: -120,
    barWidth: 60,
    section: 'operative',
    tooltip: 'Direkte Kosten der Produktion: Material, Fertigungslöhne, Maschinenstunden.',
  },
  {
    type: 'sum',
    label: '= Gross Profit',
    de: 'Bruttoergebnis',
    value: 80,
    barWidth: 40,
    section: 'operative',
    tooltip: 'Was nach den direkten Produktionskosten übrig bleibt — Indikator für Pricing Power.',
  },
  {
    type: 'minus',
    label: '− SG&A',
    de: 'Vertriebs-/Verw.',
    value: -40,
    barWidth: 20,
    section: 'operative',
    tooltip: 'Vertriebs- und Verwaltungskosten: Gehälter, Marketing, Büro.',
  },
  {
    type: 'sum',
    label: '= EBITDA',
    de: 'Op. Erg. vor D&A',
    value: 40,
    barWidth: 20,
    section: 'operative',
    tooltip: 'Operative Profitabilität ohne Kapitalstruktur und Abschreibungen.',
  },
  {
    type: 'minus',
    label: '− D&A',
    de: 'Abschreibungen',
    value: -10,
    barWidth: 5,
    section: 'operative',
    tooltip: 'Abschreibungen auf Sachanlagen + Amortisation immaterieller Werte.',
  },
  {
    type: 'sum',
    label: '= EBIT',
    de: 'Operatives Ergebn.',
    value: 30,
    barWidth: 15,
    section: 'operative',
    tooltip: 'Operatives Ergebnis nach Abschreibungen — realistischer als EBITDA.',
  },
  {
    type: 'minus',
    label: '− Interest',
    de: 'Zinsaufwand',
    value: -5,
    barWidth: 2.5,
    section: 'finanz',
    tooltip: 'Zinsaufwand auf Fremdkapital — abhängig von Verschuldung und Zinssatz.',
  },
  {
    type: 'sum',
    label: '= EBT',
    de: 'Erg. vor Steuern',
    value: 25,
    barWidth: 12.5,
    section: 'finanz',
    tooltip: 'Ergebnis vor Steuern — Bemessungsgrundlage für die Steuerlast.',
  },
  {
    type: 'minus',
    label: '− Taxes',
    de: 'Steuern',
    value: -7,
    barWidth: 3.5,
    section: 'staat',
    tooltip: 'Effektive Steuerlast (Körperschaft + Gewerbe in DE: ~30%).',
  },
  {
    type: 'sum',
    label: '= Net Income',
    de: 'Jahresüberschuss',
    value: 18,
    barWidth: 9,
    section: 'staat',
    highlighted: true,
    tooltip: 'Was am Ende für die Aktionäre übrig bleibt — die "Bottom Line".',
  },
];

export type MarginItem = {
  key: 'gross' | 'ebitda' | 'ebit' | 'net';
  label: string;
  value: number;
  abs: string;
  highlighted?: boolean;
  explanation: string;
};

export const margins: MarginItem[] = [
  {
    key: 'gross',
    label: 'Gross Margin',
    value: 40,
    abs: '€40M',
    highlighted: true,
    explanation:
      'Was nach den direkten Produktionskosten übrig bleibt. Hoher Wert = Pricing Power oder günstige Produktion.',
  },
  {
    key: 'ebitda',
    label: 'EBITDA Margin',
    value: 20,
    abs: '€20M',
    explanation:
      'Profitabilität ohne Kapitalstruktur und Abschreibungen. Lieblings-Kennzahl von PE-Funds, weil branchenübergreifend vergleichbar.',
  },
  {
    key: 'ebit',
    label: 'Operating Margin',
    value: 15,
    abs: '€15M',
    explanation:
      'Operative Profitabilität nach Abschreibungen. Realistischer als EBITDA, weil CapEx-Realität reflektiert wird.',
  },
  {
    key: 'net',
    label: 'Net Margin',
    value: 9,
    abs: '€9M',
    explanation:
      'Was am Ende für die Aktionäre übrig bleibt. Final Score nach allen Abzügen.',
  },
];

export type ProTip = {
  tag: 'STRATEGY' | 'WARNING' | 'MISTAKE';
  body: string;
};

export const proTips: ProTip[] = [
  {
    tag: 'STRATEGY',
    body: "Wenn ein MD fragt 'Walk me through the income statement', fang immer bei Revenue an, nicht bei Net Income. Top-down zeigt, dass du das System verstehst. Bottom-up zeigt, dass du Kennzahlen auswendig gelernt hast.",
  },
  {
    tag: 'WARNING',
    body: "Wenn du EBITDA nennst, nenne immer im selben Atemzug, was es ausblendet: CapEx, Zinsen, Steuern, Working Capital. Sonst springt der MD darauf an: 'And what's wrong with EBITDA?' – und du stehst im Regen.",
  },
  {
    tag: 'MISTAKE',
    body: 'Verwechsle nie Brutto- mit Operativer Marge. Klassischer 1st-Year-Fehler. Brutto = nur direkte Kosten weg. Operativ = auch Vertrieb und Verwaltung weg.',
  },
];

export const sortQuizCorrectOrder = [
  'Revenue',
  'Gross Profit',
  'SG&A',
  'EBITDA',
  'EBIT',
  'Net Income',
] as const;

export const sortQuizInitialOrder = [
  'SG&A',
  'Net Income',
  'Revenue',
  'EBIT',
  'Gross Profit',
  'EBITDA',
];

export const ebitdaWords = {
  correct: ['Interest', 'Taxes', 'Depreciation', 'Amortization'] as const,
  distractors: ['Income', 'Dividends', 'Equity', 'Inventory'] as const,
};
