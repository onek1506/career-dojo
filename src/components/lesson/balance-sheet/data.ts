// ============================================================
// Lesson 02 — Balance Sheet
// ============================================================

import type { SkillProfile } from '@/lib/onboarding/profile';

export type TrackConfig = {
  slidesToShow: number[];
  duration: number;
};

export const lessonMeta = {
  id: 'acc-2-balance-sheet',
  title: 'Balance Sheet',
  titleDe: 'Bilanz',
  module: 'MODUL 01 · ACCOUNTING',
  duration: 8,
  xp: 30,
  difficulty: 1,
  prerequisite: 'acc-1-income-statement',
  trackConfig: {
    A: { slidesToShow: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13], duration: 6 },
    B: { slidesToShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13], duration: 8 },
    C: { slidesToShow: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13], duration: 6 },
  } satisfies Record<SkillProfile, TrackConfig>,
} as const;

export type ThreeSection = {
  id: 'assets' | 'liabilities' | 'equity';
  label: string;
  labelDe: string;
  tag: string;
  examples: string[];
  borderColor: string;
  textColor: string;
};

export const threeSections: ThreeSection[] = [
  {
    id: 'assets',
    label: 'ASSETS',
    labelDe: 'Vermögenswerte',
    tag: 'Was die Firma hat',
    examples: ['Cash', 'Accounts Receivable', 'Inventory', 'PP&E', 'Goodwill'],
    borderColor: 'border-is-accent',
    textColor: 'text-is-text-primary',
  },
  {
    id: 'liabilities',
    label: 'LIABILITIES',
    labelDe: 'Verbindlichkeiten',
    tag: 'Was die Firma schuldet',
    examples: ['Accounts Payable', 'Accrued Expenses', 'Debt'],
    borderColor: 'border-is-error',
    textColor: 'text-is-error',
  },
  {
    id: 'equity',
    label: "SHAREHOLDERS' EQUITY",
    labelDe: 'Eigenkapital',
    tag: 'Was den Aktionären gehört',
    examples: ['Common Stock', 'Retained Earnings', 'APIC'],
    borderColor: 'border-is-success',
    textColor: 'text-is-success',
  },
];

export type PositionItem = { label: string; tooltip: string };
export type PositionGroup = { group: string; items: PositionItem[] };

export const balanceSheetPositions: {
  assets: PositionGroup[];
  liabilitiesAndEquity: PositionGroup[];
} = {
  assets: [
    {
      group: 'CURRENT ASSETS',
      items: [
        {
          label: 'Cash',
          tooltip: 'Bargeld und sofort verfügbare Mittel. Der wichtigste Single-Posten — zeigt die sofortige Liquidität.',
        },
        {
          label: 'Accounts Receivable',
          tooltip: 'Was Kunden noch schulden. Ware geliefert, Geld noch nicht erhalten. Zu hohes AR kann auf schwache Zahlungsmoral hinweisen.',
        },
        {
          label: 'Inventory',
          tooltip: 'Vorräte: Rohstoffe, halbfertige und fertige Produkte. Relevant für Produktionsfirmen, irrelevant für Software.',
        },
      ],
    },
    {
      group: 'NON-CURRENT ASSETS',
      items: [
        {
          label: 'PP&E',
          tooltip: 'Plants, Property & Equipment — Maschinen, Gebäude, Fahrzeuge. Wird abgeschrieben (Depreciation), deshalb sinkt PP&E jedes Jahr.',
        },
        {
          label: 'Goodwill',
          tooltip: 'Entsteht nur bei Übernahmen. Premium, den Käufer über den Buchwert zahlt. Nicht amortisierbar, kann aber impaired werden.',
        },
        {
          label: 'Intangibles',
          tooltip: 'Marken, Patente, Kundenbeziehungen. Werden amortisiert — ähnlich wie PP&E abgeschrieben, nur für immaterielle Werte.',
        },
      ],
    },
  ],
  liabilitiesAndEquity: [
    {
      group: 'CURRENT LIABILITIES',
      items: [
        {
          label: 'Accounts Payable',
          tooltip: 'Was die Firma noch an Lieferanten schuldet. Spiegel von Accounts Receivable — hier ist die Firma der Schuldner.',
        },
        {
          label: 'Accrued Expenses',
          tooltip: 'Aufgelaufene Kosten — Gehälter, Zinsen, Steuern, die noch nicht bezahlt wurden, aber schon angefallen sind.',
        },
        {
          label: 'Short-Term Debt',
          tooltip: 'Schulden, die in weniger als 12 Monaten fällig sind. Viel davon ohne ausreichend Cash: kritisches Warnsignal.',
        },
      ],
    },
    {
      group: 'LONG-TERM LIABILITIES',
      items: [
        {
          label: 'Long-Term Debt',
          tooltip: 'Anleihen, Bankdarlehen mit Laufzeit über 1 Jahr. Die größte Verbindlichkeit bei den meisten Unternehmen.',
        },
      ],
    },
    {
      group: "SHAREHOLDERS' EQUITY",
      items: [
        {
          label: 'Common Stock',
          tooltip: 'Nennwert der ausgegebenen Aktien. In der Praxis meist eine sehr kleine Zahl.',
        },
        {
          label: 'Retained Earnings',
          tooltip: 'Kumulierte einbehaltene Gewinne seit Gründung minus alle Dividenden. Wächst jedes Jahr, wenn die Firma profitabel ist.',
        },
        {
          label: 'Additional Paid-in Capital',
          tooltip: 'Betrag den Aktionäre über den Nennwert zahlten. Enthält auch Stock-Based Compensation.',
        },
      ],
    },
  ],
};

export type TechcoLine = { label: string; value: number };

export const techcoBilanz = {
  assets: [
    { label: 'Cash', value: 30 },
    { label: 'Accounts Rec.', value: 20 },
    { label: 'Inventory', value: 10 },
    { label: 'PP&E', value: 60 },
    { label: 'Goodwill', value: 30 },
  ] satisfies TechcoLine[],
  totalAssets: 150,
  liabilities: [
    { label: 'Accounts Payable', value: 20 },
    { label: 'Long-Term Debt', value: 50 },
  ] satisfies TechcoLine[],
  totalLiabilities: 70,
  equity: [
    { label: 'Common Stock', value: 10 },
    { label: 'Retained Earnings', value: 70 },
  ] satisfies TechcoLine[],
  totalEquity: 80,
  totalLE: 150,
};

export type EquityComponent = {
  label: string;
  formula: string | null;
  description: string;
  highlight?: boolean;
};

export const equityComponents: EquityComponent[] = [
  {
    label: 'Common Stock',
    formula: null,
    description: 'Nennwert aller ausgegebenen Aktien. In der Praxis oft winzig (z.B. $0,01 per Aktie).',
  },
  {
    label: 'Retained Earnings',
    formula: 'RE = Vorjahr-RE + Net Income − Dividenden',
    description: 'Direkte Verbindung zur GuV: Jeder Jahresüberschuss fließt hinein. Jede Dividende fließt heraus.',
    highlight: true,
  },
  {
    label: 'Additional Paid-In Capital (APIC)',
    formula: 'APIC = Alter APIC + Stock-Based Comp + Wert neuer Options',
    description: 'Bei Technologiefirmen oft sehr groß wegen hoher Stock-Based Compensation.',
  },
  {
    label: 'Treasury Stock',
    formula: null,
    description: 'Aktien, die die Firma zurückgekauft hat. Reduziert das Eigenkapital.',
  },
];

export type NegativeEquityScenario = {
  number: string;
  title: string;
  body: string;
};

export const negativeEquityScenarios: NegativeEquityScenario[] = [
  {
    number: '01',
    title: 'LBO + Dividend Recap',
    body: 'PE-Fonds hat nach dem Kauf so viel Cash als Dividende herausgezogen, dass das Eigenkapital negativ wurde. Normal im LBO-Kontext.',
  },
  {
    number: '02',
    title: 'Anhaltende Verluste',
    body: 'Wenn Retained Earnings durch jahrelange negative Net Incomes immer negativer wird. Kann auf finanzielle Schieflage hinweisen.',
  },
];

export type WorkingCapitalScenario = {
  title: string;
  companies: string;
  description: string;
  sentiment: 'positive' | 'negative';
};

export const workingCapital = {
  formula1: 'Working Capital = Current Assets − Current Liabilities',
  formula2: 'Operating Working Capital = (Current Assets − Cash) − (Current Liabilities − Debt)',
  scenarios: [
    {
      title: 'Subscriptions / Deferred Revenue',
      companies: 'Amazon, Netflix',
      description: 'Sammeln Cash im Voraus, bevor Leistung erbracht wird. Negatives WC = Stärke.',
      sentiment: 'positive',
    },
    {
      title: 'Retail-Modell',
      companies: 'Walmart, McDonald’s',
      description: 'Kunden zahlen sofort, Lieferanten werden später bezahlt. Zeichen von Verhandlungsmacht.',
      sentiment: 'positive',
    },
    {
      title: 'Finanzielle Notlage',
      companies: 'Krisenunternehmen',
      description: 'Hohe kurzfristige Schulden, kein Cash. Echtes Warnsignal.',
      sentiment: 'negative',
    },
  ] satisfies WorkingCapitalScenario[],
};

export type ProTip = {
  tag: string;
  tagColor: 'accent' | 'gold' | 'success';
  body: string;
};

export const proTips: ProTip[] = [
  {
    tag: 'STRATEGIE',
    tagColor: 'accent',
    body: 'Wenn ein MD die Bilanz zeigt und fragt "Was fällt dir auf?", geh immer in dieser Reihenfolge: Cash und Debt zuerst (Liquidität), dann Working Capital (Kurzzeit-Gesundheit), dann Retained Earnings (historische Profitabilität).',
  },
  {
    tag: 'WARNUNG',
    tagColor: 'gold',
    body: 'Verwechsle nie Shareholders’ Equity mit Equity Value. Shareholders’ Equity ist der Buchwert aus der Bilanz. Equity Value ist der Marktwert. Bei gesunden Firmen ist Equity Value fast immer deutlich höher.',
  },
  {
    tag: 'REGEL',
    tagColor: 'success',
    body: 'Die Bilanz balanciert immer. Wenn dein Modell nicht balanciert, hast du einen Fehler — keine Ausnahme, kein "fast richtig". Das ist die eine absolute Regel in Accounting.',
  },
];

export type QuizOption = { id: string; label: string; correct: boolean };

export const quiz1 = {
  header: 'Frage 1 / 2 · +10 XP',
  question: 'Was gehört zu den Current Assets (Umlaufvermögen)?',
  options: [
    { id: 'A', label: 'Long-Term Debt', correct: false },
    { id: 'B', label: 'Accounts Receivable', correct: true },
    { id: 'C', label: 'Goodwill', correct: false },
    { id: 'D', label: 'PP&E', correct: false },
  ] satisfies QuizOption[],
  feedback: {
    correct: {
      gentle:
        'Richtig. Accounts Receivable ist ein Current Asset — wird innerhalb von 12 Monaten zu Cash. Long-Term Debt ist eine Liability, Goodwill und PP&E sind Non-Current Assets.',
      sharp:
        'Korrekt. AR = Current Asset. Goodwill und PP&E = Non-Current. Diese Klassifikation musst du blind abrufen können.',
    },
    wrong:
      'Nicht ganz. Long-Term Debt ist eine Liability. Goodwill und PP&E sind Assets, aber Non-Current. Accounts Receivable ist das einzige Current Asset hier.',
    hint: 'Current = innerhalb von 12 Monaten zu Cash konvertierbar oder fällig.',
  },
};

export const quiz2 = {
  header: 'Frage 2 / 2 · +10 XP',
  question:
    'TechCo hat Total Assets von €150M und Total Liabilities von €70M. Wie hoch ist das Shareholders’ Equity?',
  options: [
    { id: 'A', label: '€220M', correct: false },
    { id: 'B', label: '€70M', correct: false },
    { id: 'C', label: '€80M', correct: true },
    { id: 'D', label: '€150M', correct: false },
  ] satisfies QuizOption[],
  workingOut: 'Assets = Liabilities + Equity → €150M = €70M + Equity → Equity = €80M',
  feedback: {
    correct:
      'Genau. Assets = Liabilities + Equity, umgeformt: Equity = Assets − Liabilities = €150M − €70M = €80M.',
    wrong:
      'Denk an die Gleichung: Assets = Liabilities + Equity → Equity = Assets − Liabilities = €150M − €70M = €80M.',
  },
};

export const marcusTexts = {
  briefing: {
    gentle:
      'Die Bilanz zeigt, was eine Firma zu einem bestimmten Moment besitzt und was sie schuldet. Sie ist das Gegenstück zur GuV: keine Geschichte über Zeit — ein Foto an einem Stichtag. Heute lernst du lesen, was drauf ist.',
    sharp:
      'Bilanz. Drei Sektionen, eine Gleichung: Assets = Liabilities + Equity. Wenn die nicht aufgeht, ist entweder das Modell falsch oder du hast einen Fehler. Diese Lektion in 6 Minuten durch.',
  },
  retentionEmail: {
    subject: 'Re: Lektion 2 abgeschlossen',
    gentle:
      'Gut gemacht. Du verstehst jetzt den Aufbau der Bilanz — Assets, Liabilities, Equity — und weißt, warum sie immer balancieren muss. In Lektion 3 schauen wir uns das Cash Flow Statement an — den einzigen Bericht, den du auf einer einsamen Insel bräuchtest.',
    sharp:
      'Bilanz sitzt. In Lektion 3 kommt das Cash Flow Statement — das ehrlichste der drei Statements. Die Desert-Island-Frage dazu lernst du dann.',
  },
};

export const learningOutcomes = [
  'Verstehen, was die Bilanz zeigt (und was nicht)',
  'Die drei Sektionen und wichtigsten Positionen kennen',
  'Warum Assets = Liabilities + Equity immer gilt',
];
