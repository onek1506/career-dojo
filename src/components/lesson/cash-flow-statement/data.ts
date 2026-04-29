// ============================================================
// Lesson 03 — Cash Flow Statement
// ============================================================

import type { SkillProfile } from '@/lib/onboarding/profile';

export type TrackConfig = {
  slidesToShow: number[];
  duration: number;
};

export const lessonMeta = {
  id: 'acc-3-cash-flow-statement',
  title: 'Cash Flow Statement',
  titleDe: 'Kapitalflussrechnung',
  module: 'MODUL 01 · ACCOUNTING',
  duration: 8,
  xp: 30,
  difficulty: 2,
  prerequisite: 'acc-2-balance-sheet',
  trackConfig: {
    A: { slidesToShow: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11], duration: 6 },
    B: { slidesToShow: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11], duration: 8 },
    C: { slidesToShow: [1, 3, 4, 5, 6, 7, 8, 9, 11], duration: 6 },
  } satisfies Record<SkillProfile, TrackConfig>,
} as const;

export const learningOutcomes = [
  'Warum das CFS der ehrlichste Bericht ist',
  'Die drei Sektionen und was sie zeigen',
  'Warum Net Income ≠ Cash ist',
];

export type WhatIsCard = {
  id: 'guv' | 'cfs';
  iconName: 'TrendingUp' | 'DollarSign';
  title: string;
  subtitle: string;
  reveal: string;
  isCorrect: boolean;
};

export const whatIsCards: WhatIsCard[] = [
  {
    id: 'guv',
    iconName: 'TrendingUp',
    title: 'GuV: +€10M Net Income',
    subtitle: 'Sieht gut aus',
    reveal:
      'Aber: Vielleicht wurde davon €8M noch nicht bezahlt (Accounts Receivable). Tatsächlicher Cash: nur €2M.',
    isCorrect: false,
  },
  {
    id: 'cfs',
    iconName: 'DollarSign',
    title: 'CFS: +€2M Cash from Ops',
    subtitle: 'Die Wahrheit',
    reveal:
      'Das ist, was wirklich auf dem Konto gelandet ist. Profitable Firma, aber fast kein Cash. Gefährlich.',
    isCorrect: true,
  },
];

export type CFSSection = {
  number: string;
  label: string;
  abbr: string;
  labelDe: string;
  description: string;
  examples: string[];
  borderColor: string;
  textColor: string;
  insight: string;
};

export const cfsSections: CFSSection[] = [
  {
    number: '01',
    label: 'Cash Flow from Operations',
    abbr: 'CFO',
    labelDe: 'Operativer Cashflow',
    description:
      'Beginnt mit Net Income. Addiert nicht-cash Aufwendungen (D&A, SBC) zurück. Adjustiert für Working-Capital-Veränderungen.',
    examples: ['+ Depreciation & Amortization', '+ Stock-Based Compensation', '± Changes in Working Capital'],
    borderColor: 'border-is-accent',
    textColor: 'text-is-accent',
    insight: 'Das Wichtigste. Zeigt, ob das Kerngeschäft Cash generiert.',
  },
  {
    number: '02',
    label: 'Cash Flow from Investing',
    abbr: 'CFI',
    labelDe: 'Investitions-Cashflow',
    description: 'Zeigt Käufe und Verkäufe von langfristigen Assets.',
    examples: ['− Capital Expenditures (CapEx)', '+ Verkauf von Assets', '− Akquisitionen'],
    borderColor: 'border-is-gold',
    textColor: 'text-is-gold',
    insight: 'Meist negativ — Firmen investieren mehr als sie durch Asset-Verkäufe einnehmen. Das ist normal.',
  },
  {
    number: '03',
    label: 'Cash Flow from Financing',
    abbr: 'CFF',
    labelDe: 'Finanzierungs-Cashflow',
    description: 'Zeigt Transaktionen mit Kapitalgebern — Aktionären und Gläubigern.',
    examples: ['+ Neue Schulden aufgenommen', '− Schulden zurückgezahlt', '− Dividenden gezahlt', '+ Aktien ausgegeben'],
    borderColor: 'border-is-success',
    textColor: 'text-is-success',
    insight: 'Positiv = Firma nimmt Geld auf. Negativ = Firma zahlt zurück oder kauft Aktien zurück.',
  },
];

export type NonCashItem = {
  label: string;
  section: 'CFO' | 'CFI' | 'CFF';
  direction: '+' | '−' | '±';
  reason: string;
};

export const nonCashItems: NonCashItem[] = [
  {
    label: 'Depreciation & Amortization',
    section: 'CFO',
    direction: '+',
    reason: 'Non-cash Aufwand — kein Cash abgeflossen, deshalb zurückaddiert.',
  },
  {
    label: 'Stock-Based Compensation',
    section: 'CFO',
    direction: '+',
    reason: 'Non-cash — Mitarbeiter bekommen Aktien statt Cash. Trotzdem Aufwand in der GuV.',
  },
  {
    label: 'Capital Expenditures (CapEx)',
    section: 'CFI',
    direction: '−',
    reason: 'Kauf von PP&E — echter Cash-Abfluss, erscheint aber nicht in der GuV (wird kapitalisiert).',
  },
  {
    label: 'Changes in Working Capital',
    section: 'CFO',
    direction: '±',
    reason: 'Asset steigt → Cash sinkt. Liability steigt → Cash steigt. Gegenläufige Logik.',
  },
];

export type ProTip = {
  tag: string;
  tagColor: 'accent' | 'gold' | 'success';
  body: string;
};

export const proTips: ProTip[] = [
  {
    tag: 'INTERVIEW-MOVE',
    tagColor: 'accent',
    body:
      '"Walk me through the Cash Flow Statement" — fang IMMER mit Net Income an. Dann: Add back non-cash items (D&A, SBC), adjust for Working Capital changes, dann CFI und CFF. Diese Reihenfolge zeigt strukturiertes Denken.',
  },
  {
    tag: 'WARNUNG',
    tagColor: 'gold',
    body:
      'Sage nie "CapEx erscheint auf dem Income Statement" — CapEx wird kapitalisiert und erscheint als PP&E in der Bilanz, dann als D&A in der GuV. Direkt auf dem IS steht es nicht. Klassischer Fehler.',
  },
  {
    tag: 'MERKE',
    tagColor: 'success',
    body:
      'Free Cash Flow = CFO − CapEx. Das ist die meistgenutzte Zahl in Valuation. Wenn jemand "FCF" sagt, meint er das. Du brauchst CFO und CapEx aus dem CFS, um es zu berechnen.',
  },
];

export type QuizOption = { id: string; label: string; correct: boolean };

export const quiz1 = {
  header: 'Frage 1 / 2 · +10 XP',
  question: 'In welcher Sektion des Cash Flow Statements erscheint der Kauf einer neuen Fabrik (CapEx)?',
  options: [
    { id: 'A', label: 'Cash Flow from Operations', correct: false },
    { id: 'B', label: 'Cash Flow from Investing', correct: true },
    { id: 'C', label: 'Cash Flow from Financing', correct: false },
    { id: 'D', label: 'Direkt im Income Statement', correct: false },
  ] satisfies QuizOption[],
  feedback: {
    correct: {
      gentle:
        'Richtig. CapEx ist eine Investition in langfristige Assets und erscheint deshalb im CFI. In der GuV erscheint nur die jährliche Abschreibung (D&A), nicht der volle Kaufpreis.',
      sharp: 'Korrekt. CapEx = CFI. D&A davon = IS und CFO (add-back). Sauber auseinanderhalten.',
    },
    wrong:
      'CapEx ist kein Aufwand im IS (wird kapitalisiert) und keine Finanzierungstransaktion. Es ist eine Investition → Cash Flow from Investing.',
    hint: 'CapEx = Kauf von langfristigen Assets. Investitionen = CFI.',
  },
};

export const quiz2 = {
  header: 'Frage 2 / 2 · +10 XP',
  question: 'Depreciation steigt um €10M. Angenommen 40% Steuerrate. Was passiert mit dem Cash?',
  options: [
    { id: 'A', label: 'Cash sinkt um €10M', correct: false },
    { id: 'B', label: 'Cash steigt um €4M', correct: true },
    { id: 'C', label: 'Kein Effekt auf Cash', correct: false },
    { id: 'D', label: 'Cash steigt um €10M', correct: false },
  ] satisfies QuizOption[],
  workingOut:
    'IS: Operating Income −€10M → Net Income −€6M (nach 40% Steuer). CFS: Net Income −€6M, +D&A €10M add-back → CFO +€4M → Cash +€4M.',
  feedback: {
    correct:
      'Genau. D&A senkt Net Income um €6M (nach Steuern), wird aber im CFS zurückaddiert (+€10M). Netto: +€4M Cash. Der Trick: Steuereinsparung.',
    wrong:
      'Denk zweistufig: 1) D&A senkt Pre-Tax Income um €10M → Net Income sinkt um €6M (×0.6). 2) Im CFS: D&A wird zurückaddiert (+€10M). Net Change: −€6M + €10M = +€4M.',
  },
};

export const marcusTexts = {
  briefing: {
    gentle:
      'Das Cash Flow Statement ist der ehrlichste der drei Berichte. Die GuV kann durch Accounting-Tricks geschönt werden. Das CFS nicht — hier siehst du, was wirklich an Cash rein und raus geflossen ist. Heute lernst du, warum profitable Firmen trotzdem pleite gehen können.',
    sharp:
      'CFS: drei Sektionen, eine Wahrheit. Operations, Investing, Financing. Fang oben mit Net Income an, arbeitest dich durch. Die Desert-Island-Frage dazu kommt in Lektion 3.',
  },
  retentionEmail: {
    subject: 'Re: Lektion 3 — CFS verstanden',
    gentle:
      'Gut gemacht. Du weißt jetzt, dass das CFS bei Net Income startet, non-cash Items zurückaddiert und Working-Capital-Veränderungen berücksichtigt. Und du weißt, warum D&A trotz non-cash den Cash beeinflusst. In Lektion 4 verbinden wir alle drei Statements.',
    sharp:
      'CFS sitzt. Lektion 4 ist die wichtigste des ganzen Accounting-Blocks: wie alle drei Statements zusammenhängen. Dort scheitern 70% der Bewerber.',
  },
};
