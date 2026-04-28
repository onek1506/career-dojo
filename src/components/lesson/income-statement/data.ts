// ============================================================
// Income Statement Lesson — beginner-friendly content
// ============================================================

export type WaterfallStep = {
  type: 'main' | 'preview';
  label: string; // German-first per Phase 3b
  en: string; // English term shown smaller
  value: number; // signed millions; bar width is computed from |value|
  highlighted?: boolean;
  tooltip: string;
  lessonHint?: string; // shown for preview rows ("Lektion X")
};

export const waterfallSteps: WaterfallStep[] = [
  {
    type: 'main',
    label: 'Umsatz',
    en: 'Revenue',
    value: 100,
    tooltip: 'Alles, was die Firma verkauft hat. Der Top-Line-Wert — bevor irgendwelche Kosten abgezogen werden.',
  },
  {
    type: 'preview',
    label: '− Herstellungskosten',
    en: 'COGS',
    value: -50,
    tooltip: 'Direkte Kosten der Produktion: Material, Fertigungslöhne, Maschinenstunden.',
    lessonHint: 'Mehr dazu in Lektion 2.',
  },
  {
    type: 'main',
    label: 'Bruttoergebnis',
    en: 'Gross Profit',
    value: 50,
    tooltip: 'Was nach den direkten Produktionskosten übrig bleibt — Indikator für Pricing Power.',
  },
  {
    type: 'preview',
    label: '− Vertrieb & Verwaltung',
    en: 'SG&A',
    value: -10,
    tooltip: 'Vertriebs- und Verwaltungskosten: Gehälter, Marketing, Büro.',
    lessonHint: 'Mehr dazu in Lektion 2.',
  },
  {
    type: 'main',
    label: 'EBITDA',
    en: 'Op. Erg. vor Abschr.',
    value: 40,
    tooltip: 'Operative Profitabilität ohne Kapitalstruktur und Abschreibungen. Lieblings-Kennzahl in der Praxis.',
  },
  {
    type: 'preview',
    label: '− Abschreibungen',
    en: 'D&A',
    value: -10,
    tooltip: 'Kosten für Maschinen und Software, die über mehrere Jahre verteilt werden.',
    lessonHint: 'Mehr dazu in Lektion 3.',
  },
  {
    type: 'main',
    label: 'EBIT',
    en: 'Operatives Ergebnis',
    value: 30,
    tooltip: 'EBITDA minus Abschreibungen. Realistisches Bild der operativen Profitabilität.',
  },
  {
    type: 'preview',
    label: '− Zinsaufwand',
    en: 'Interest',
    value: -5,
    tooltip: 'Zinsen auf Fremdkapital — abhängig von Verschuldung und Zinssatz.',
    lessonHint: 'Mehr dazu in Lektion 4.',
  },
  {
    type: 'preview',
    label: '− Steuern',
    en: 'Taxes',
    value: -7,
    tooltip: 'Effektive Steuerlast. In Deutschland ~30% (Körperschaft + Gewerbe).',
    lessonHint: 'Mehr dazu in Lektion 4.',
  },
  {
    type: 'main',
    label: 'Jahresüberschuss',
    en: 'Net Income',
    value: 18,
    highlighted: true,
    tooltip: 'Was am Ende für die Aktionäre übrig bleibt. Die "Bottom Line".',
  },
];

export type MarginItem = {
  key: 'gross' | 'net';
  label: string; // German-first
  enLabel: string;
  value: number;
  abs: string;
  highlighted?: boolean;
  explanation: string;
};

export const margins: MarginItem[] = [
  {
    key: 'gross',
    label: 'Bruttomarge',
    enLabel: 'Gross Margin',
    value: 40,
    abs: '€40M',
    highlighted: true,
    explanation:
      'Was nach den Produktionskosten übrig bleibt — im Verhältnis zum Umsatz. Apple hat hohe Bruttomargen (~40%), Walmart niedrige (~25%).',
  },
  {
    key: 'net',
    label: 'Nettomarge',
    enLabel: 'Net Margin',
    value: 9,
    abs: '€9M',
    explanation:
      'Was am Ende für die Aktionäre übrig bleibt — im Verhältnis zum Umsatz. Tech-Firmen oft 20%+, Supermärkte 2-3%.',
  },
];

export type CompanyMargin = {
  name: string;
  grossMargin: string;
  netMargin: string;
};

export const companyExamples: CompanyMargin[] = [
  { name: 'APPLE', grossMargin: '~40%', netMargin: '~25%' },
  { name: 'NETFLIX', grossMargin: '~40%', netMargin: '~15%' },
  { name: 'WALMART', grossMargin: '~25%', netMargin: '~3%' },
];

export type ProTip = {
  tag: 'LERNTIPP' | 'MERKE' | 'NÄCHSTER SCHRITT';
  body: string;
};

export const proTips: ProTip[] = [
  {
    tag: 'LERNTIPP',
    body: 'Wenn du einen englischen Begriff zum ersten Mal siehst, sag ihn dir laut vor. EBITDA = "I-bitt-da". Dein Gehirn merkt sich Dinge besser, wenn du sie hörst, nicht nur liest.',
  },
  {
    tag: 'MERKE',
    body: 'Brutto und Netto: Stell dir Brutto wie deinen Bruttogehalt vor — das, was am Anfang draufsteht. Netto ist, was am Ende auf deinem Konto landet. Bei Firmen ist das genauso.',
  },
  {
    tag: 'NÄCHSTER SCHRITT',
    body: 'In Lektion 2 schauen wir uns an, was "Aufwendungen" eigentlich sind. Spoiler: Es gibt mehr als nur Materialkosten. Bis dahin reicht es zu wissen: Aufwendungen reduzieren den Gewinn.',
  },
];
