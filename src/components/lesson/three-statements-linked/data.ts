// ============================================================
// Lesson 04 — Three Statements Linked (the most important lesson)
// ============================================================

import type { SkillProfile } from '@/lib/onboarding/profile';

export type TrackConfig = {
  slidesToShow: number[];
  duration: number;
};

export const lessonMeta = {
  id: 'acc-4-three-statements-linked',
  title: 'Die drei Statements verlinkt',
  titleEn: 'The 3 Statements – How They Link',
  module: 'MODUL 01 · ACCOUNTING',
  duration: 10,
  xp: 40,
  difficulty: 2,
  prerequisite: 'acc-3-cash-flow-statement',
  trackConfig: {
    A: { slidesToShow: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11], duration: 8 },
    B: { slidesToShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], duration: 10 },
    C: { slidesToShow: [1, 3, 4, 5, 6, 7, 8, 9, 10, 11], duration: 8 },
  } satisfies Record<SkillProfile, TrackConfig>,
} as const;

export const learningOutcomes = [
  'Die drei direkten Links zwischen den Statements erklären',
  'Die Standard-Walk-Through-Antwort auswendig können',
  'Szenarien durchrechnen: Was ändert sich wenn X passiert?',
];

export type LinkOverview = {
  number: string;
  title: string;
  description: string;
  fromStatement: string;
  toStatements: string[];
  textColor: string;
};

export const threeLinks: LinkOverview[] = [
  {
    number: '01',
    title: 'Net Income → CFS + Bilanz',
    description: 'Net Income aus der GuV fließt an die Spitze des Cash Flow Statements UND in Retained Earnings der Bilanz.',
    fromStatement: 'GuV',
    toStatements: ['CFS', 'Bilanz'],
    textColor: 'text-is-accent',
  },
  {
    number: '02',
    title: 'Working Capital Changes → CFS',
    description: 'Veränderungen an Bilanz-Positionen (AR, Inventory, AP) erscheinen als Working-Capital-Anpassungen im Cash Flow from Operations.',
    fromStatement: 'Bilanz',
    toStatements: ['CFS'],
    textColor: 'text-is-gold',
  },
  {
    number: '03',
    title: 'Finales Cash → Bilanz',
    description: 'Die Net Change in Cash am Ende des CFS entspricht der Veränderung der Cash-Position in der Bilanz. Cash ist das "Plug".',
    fromStatement: 'CFS',
    toStatements: ['Bilanz'],
    textColor: 'text-is-success',
  },
];

export type DiagramStatement = {
  id: 'is' | 'cfs' | 'bs';
  label: string;
  labelDe: string;
  borderColor: string;
  textColor: string;
  keyItem: string;
};

export type DiagramLink = {
  id: string;
  from: 'is' | 'cfs' | 'bs';
  to: 'is' | 'cfs' | 'bs';
  label: string;
  explanation: string;
};

export const linkDiagram: { statements: DiagramStatement[]; links: DiagramLink[] } = {
  statements: [
    {
      id: 'is',
      label: 'Income Statement',
      labelDe: 'GuV',
      borderColor: 'border-is-accent',
      textColor: 'text-is-accent',
      keyItem: 'Net Income',
    },
    {
      id: 'cfs',
      label: 'Cash Flow Statement',
      labelDe: 'Kapitalflussrechnung',
      borderColor: 'border-is-gold',
      textColor: 'text-is-gold',
      keyItem: 'Net Change in Cash',
    },
    {
      id: 'bs',
      label: 'Balance Sheet',
      labelDe: 'Bilanz',
      borderColor: 'border-is-success',
      textColor: 'text-is-success',
      keyItem: 'Cash + Retained Earnings',
    },
  ],
  links: [
    {
      id: 'ni-cfs',
      from: 'is',
      to: 'cfs',
      label: 'Net Income',
      explanation: 'Net Income aus der GuV fließt als erste Zeile in den Cash Flow Statement.',
    },
    {
      id: 'ni-bs',
      from: 'is',
      to: 'bs',
      label: 'Net Income → RE',
      explanation: 'Net Income erhöht Retained Earnings in der Bilanz (minus Dividenden).',
    },
    {
      id: 'wc-cfs',
      from: 'bs',
      to: 'cfs',
      label: 'Working Capital Δ',
      explanation: 'Veränderungen in Current Assets/Liabilities der Bilanz erscheinen als WC-Anpassungen im CFO.',
    },
    {
      id: 'cash-bs',
      from: 'cfs',
      to: 'bs',
      label: 'Net Change in Cash',
      explanation: 'Der finale Cash-Wert aus dem CFS = Veränderung der Cash-Position in der Bilanz. Cash ist das "Plug".',
    },
  ],
};

export type WalkthroughStep = {
  step: number;
  statement: string;
  statementColor: string;
  action: string;
  effect: string;
};

export const depreciationWalkthrough = {
  scenario: 'Depreciation steigt um €10M. Steuerrate: 40%.',
  steps: [
    {
      step: 1,
      statement: 'Income Statement',
      statementColor: 'text-is-accent',
      action: 'Depreciation +€10M',
      effect: 'Operating Income −€10M → Pre-Tax Income −€10M → Net Income −€6M (nach 40% Steuer)',
    },
    {
      step: 2,
      statement: 'Cash Flow Statement',
      statementColor: 'text-is-gold',
      action: 'Net Income −€6M, D&A Add-back +€10M',
      effect: 'CFO: −€6M + €10M = +€4M. Net Change in Cash: +€4M.',
    },
    {
      step: 3,
      statement: 'Balance Sheet',
      statementColor: 'text-is-success',
      action: 'PP&E −€10M, Cash +€4M',
      effect: 'Assets: −€6M gesamt. Equity: Retained Earnings −€6M. Beide Seiten: −€6M. ✓ Balanciert.',
    },
  ] satisfies WalkthroughStep[],
};

export const inventoryWalkthrough = {
  scenario: 'Apple kauft €10M Inventory mit Cash. Noch keine Verkäufe.',
  steps: [
    {
      step: 1,
      statement: 'Income Statement',
      statementColor: 'text-is-accent',
      action: 'Keine Änderung',
      effect:
        'Inventory-Kosten erscheinen erst in der GuV, wenn es verkauft wird (als COGS). Häufiger Fehler: Inventory-Kauf als COGS verbuchen — falsch.',
    },
    {
      step: 2,
      statement: 'Cash Flow Statement',
      statementColor: 'text-is-gold',
      action: 'Inventory steigt um €10M',
      effect: 'Asset steigt → CFO −€10M. Net Change in Cash: −€10M. Asset steigt → Cash sinkt.',
    },
    {
      step: 3,
      statement: 'Balance Sheet',
      statementColor: 'text-is-success',
      action: 'Inventory +€10M, Cash −€10M',
      effect:
        'Assets bleiben gleich. Bilanz balanciert. ✓ Kein Net Income, kein Equity-Effekt — nur ein Asset tauscht gegen ein anderes.',
    },
  ] satisfies WalkthroughStep[],
};

export type ProTip = {
  tag: string;
  tagColor: 'accent' | 'gold' | 'success';
  body: string;
};

export const proTips: ProTip[] = [
  {
    tag: 'STANDARD-ANTWORT',
    tagColor: 'accent',
    body: '"How do the 3 statements link together?" — Musterlösung: Net Income aus der GuV fließt in den CFS und in Retained Earnings der Bilanz. Working Capital Changes verbinden Bilanz und CFS. Das finale Cash aus dem CFS entspricht der Cash-Veränderung in der Bilanz.',
  },
  {
    tag: 'WARNUNG',
    tagColor: 'gold',
    body: 'Bei Walk-Through-Fragen: Nie mit der Bilanz anfangen. Immer IS → CFS → BS. Die Bilanz ist der "Check" am Ende. Wer dort anfängt, verwirrt sich selbst und den Interviewer.',
  },
  {
    tag: 'FORTGESCHRITTEN',
    tagColor: 'success',
    body: 'Bei komplexeren Szenarien (Debt Write-Down, Goodwill Impairment) bleibt die Reihenfolge gleich. Nur der IS-Effekt ist manchmal kontraintuitiv. Beispiel: Liability Write-Down = Gain in der GuV. Das kommt in Lektion 5.',
  },
];

export type QuizOption = { id: string; label: string; correct: boolean };

export const quiz1 = {
  header: 'Frage 1 / 2 · +15 XP',
  question: 'Wohin fließt Net Income aus der GuV direkt? (Mehrere Antworten möglich)',
  type: 'multi-select' as const,
  options: [
    { id: 'A', label: 'In den Cash Flow from Operations (oben)', correct: true },
    { id: 'B', label: 'In die Retained Earnings der Bilanz', correct: true },
    { id: 'C', label: 'Direkt in Cash der Bilanz', correct: false },
    { id: 'D', label: 'In Revenue der nächsten GuV', correct: false },
  ] satisfies QuizOption[],
  feedback: {
    allCorrect:
      'Genau. Net Income fließt gleichzeitig in den CFS (als Startpunkt) und in Retained Earnings der Bilanz. Das ist der zentrale Link zwischen allen drei Statements.',
    partial:
      'Fast. Net Income fließt in den CFS (oben) UND in Retained Earnings. Nicht direkt in Cash — Cash wird erst am Ende des CFS berechnet.',
    wrong:
      'Net Income hat zwei direkte Verbindungen: erstens zur Spitze des CFS, zweitens zu Retained Earnings in der Bilanz.',
  },
};

export const quiz2 = {
  header: 'Frage 2 / 2 · +15 XP',
  question: 'Inventory steigt um €10M (Cash-Kauf). Was passiert mit dem Net Income?',
  options: [
    { id: 'A', label: 'Net Income sinkt um €10M', correct: false },
    { id: 'B', label: 'Net Income sinkt um €6M', correct: false },
    { id: 'C', label: 'Kein Effekt auf Net Income', correct: true },
    { id: 'D', label: 'Net Income steigt um €10M', correct: false },
  ] satisfies QuizOption[],
  workingOut:
    'Inventory-Kauf ist keine GuV-Transaktion. Es wird erst zu COGS, wenn das Inventory verkauft wird. Solange es im Lager liegt: kein IS-Effekt.',
  feedback: {
    correct:
      'Korrekt. Inventory-Kauf ≠ Aufwand. Der Aufwand entsteht erst beim Verkauf (als COGS). Das ist einer der häufigsten Denkfehler im Interview.',
    wrong:
      'Inventory-Veränderungen berühren das Income Statement NICHT direkt. Sie erscheinen nur im Cash Flow Statement (als Working Capital Change) und der Bilanz.',
  },
};

export const quiz3 = {
  header: 'Bonus · +10 XP',
  question: 'Depreciation steigt um €10M (Steuerrate 40%). Was passiert mit der Cash-Position der Bilanz?',
  options: [
    { id: 'A', label: 'Sinkt um €10M', correct: false },
    { id: 'B', label: 'Steigt um €4M', correct: true },
    { id: 'C', label: 'Sinkt um €6M', correct: false },
    { id: 'D', label: 'Keine Veränderung', correct: false },
  ] satisfies QuizOption[],
  workingOut:
    'IS: Net Income −€6M (D&A ×0.6). CFS: −€6M + €10M Add-back = +€4M CFO. BS: Cash +€4M.',
  feedback: {
    correct:
      'Sauber durchgedacht. IS → CFS → BS in dieser Reihenfolge. Net Effekt: +€4M Cash durch Steuereinsparung.',
    wrong:
      'Geh Schritt für Schritt: IS: Net Income −€6M (−€10M × 0.6). CFS: Start mit −€6M, D&A Add-back +€10M, ergibt +€4M CFO. BS: Cash +€4M.',
  },
};

export const marcusTexts = {
  briefing: {
    gentle:
      'Das ist die wichtigste Lektion im ganzen Accounting-Block. Nicht weil sie am schwierigsten ist — sondern weil diese Verbindungen in JEDEM Interview kommen. Wenn du heute verstehst, wie Net Income durch alle drei Statements fließt, bist du besser vorbereitet als 80% der Mitbewerber.',
    sharp:
      '"How do the 3 statements link together?" — Pflichtfrage in jedem Interview. Diese Lektion bereitet dich darauf vor, sie in 60 Sekunden sauber zu beantworten. Und auf die Walk-Through-Varianten danach.',
  },
  retentionEmail: {
    subject: 'Re: Das Wichtigste verstanden',
    gentle:
      'Gut gemacht. Du weißt jetzt, wie alle drei Statements zusammenhängen und wie du systematisch Walk-Through-Fragen beantwortest. Das ist die Basis, auf der alles andere aufbaut — Valuation, DCF, M&A. In Lektion 5 vertiefst du Advanced Accounting-Szenarien.',
    sharp:
      '3-Statement-Link sitzt. Walk-Through-Fragen kannst du. In Lektion 5 kommen fortgeschrittene Szenarien: Write-Downs, Debt Issuance, Goodwill — die Sachen, die dich von 90% der Bewerber unterscheiden.',
  },
};

export const walkthroughRule = `DIE WALK-THROUGH REGEL

Schritt 1: Income Statement
  → Was ändert sich am Net Income?

Schritt 2: Cash Flow Statement
  → Add-backs? Working Capital? Net Change in Cash?

Schritt 3: Balance Sheet
  → Cash + das Equity-Plug. Balanciert es?

MERKE: Asset going up → Cash down.
       Liability going up → Cash up.`;
