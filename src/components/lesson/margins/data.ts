// ============================================================
// Lesson 1b — Margins
// ============================================================

export type MarginItem = {
  key: 'gross' | 'net';
  label: string;
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
