// K2 Lektion 6 — written directly (no team draft was produced before the
// spend-limit cutoff). Same K2 grammar/voice as the ported lessons.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK C · VALUATION';

export const k2ValDcfMechanik: MicroLessonData = {
  id: 'k2-val-1-dcf-mechanik',
  module: MODULE,
  titleDe: 'DCF: der Maschinenraum',
  topicTag: 'dcf',
  nextPath: '/lesson/k2-val-2-wacc',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'DCF: der Maschinenraum',
      subtitle: 'Block C · Valuation',
      marcus: {
        subject: 'Re: Respekt vor dem DCF',
        body: 'Vor dem DCF haben die meisten mehr Respekt als nötig. Bevor wir WACC und Terminal Value anfassen, klären wir erstmal, was überhaupt reindiskontiert wird: der Free Cash Flow. Ohne den ist jede Formel Deko.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Der Wortlaut',
      paragraphs: [
        "So fällt sie: **'How do you calculate unlevered free cash flow?'** Keine Definitionsfrage — eine Rechenfrage. Der Interviewer will fünf Bausteine in der richtigen Reihenfolge, nicht die Wikipedia-Formel.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die fünf Bausteine',
      paragraphs: [
        'Start bei EBIT 100, Steuersatz 30 % — NOPAT (Net Operating Profit After Tax) 70. Plus D&A 20, weil nicht zahlungswirksam. Minus CapEx 30, weil echt Geld kostet. Minus Zunahme Working Capital 10, weil im Betrieb gebunden.',
        '**Unlevered Free Cash Flow: 70 + 20 − 30 − 10 = 50.**',
        'Unlevered heißt: vor Zinsen, also vor Finanzierung. Der Cashflow gehört allen Kapitalgebern gemeinsam — genau deshalb passt er zum WACC (Diskontsatz für alle Kapitalgeber) und zum Enterprise Value als Ergebnis.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Die Formel als Satz',
      paragraphs: [
        "**'Start with EBIT, tax it to get NOPAT, add back D&A since it's non-cash, subtract CapEx, and subtract the increase in net working capital — that's unlevered free cash flow.'**",
        'Ein Satz, fünf Bausteine, keine Lücke. Das ist der erste von zwei DCF-Grundpfeilern — der zweite, Diskontierung und Terminal Value, kommt in den nächsten beiden Lektionen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l6-fcf',
      prompt: 'EBIT 100, Steuersatz 30 %, D&A 20, CapEx 30, Zunahme Working Capital 10. Unlevered Free Cash Flow?',
      options: ['50', '70', '60', '40'],
      correctIndex: 0,
      solution: 'NOPAT 70 + D&A 20 − CapEx 30 − ΔWC 10 = 50.',
      marcusCorrect: 'Korrekt. 70 + 20 − 30 − 10 = 50. Fünf Bausteine, sauber addiert und abgezogen.',
      marcusWrong: 'Reihenfolge: NOPAT = 100 × (1 − 0,3) = 70. Dann +20 D&A, −30 CapEx, −10 ΔWC. 70 + 20 − 30 − 10 = 50.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l6-capex',
      prompt: 'Gleiche Ausgangslage, aber CapEx steigt auf 40. Was ist der neue FCF?',
      options: ['40', '50', '60', '30'],
      correctIndex: 0,
      solution: '70 + 20 − 40 − 10 = 40.',
      marcusCorrect: 'Ja. Zehn mehr CapEx, zehn weniger FCF — direkt eins zu eins.',
      marcusWrong: 'Nur die CapEx-Zeile ändert sich: 70 + 20 − 40 − 10 = 40. Jeder zusätzliche Investitions-Euro schlägt direkt auf den FCF durch.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l6-interest',
      prompt: 'Was gehört NICHT in die Berechnung des unlevered Free Cash Flow?',
      options: ['Zinsaufwand', 'D&A', 'CapEx', 'Working-Capital-Veränderung'],
      correctIndex: 0,
      solution: 'Zinsen gehören zu Financing — unlevered heißt vor Finanzierung.',
      marcusCorrect: 'Korrekt. Zinsen abziehen wäre levered Free Cash Flow — ein anderer Ansatz, ein anderer Diskontsatz.',
      marcusWrong: 'Zinsen betreffen die Finanzierung, nicht den operativen Cashflow. Wer sie hier abzieht, rechnet levered statt unlevered — und der DCF baut auf unlevered.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Zinsen abziehen oder D&A vergessen',
      paragraphs: [
        'Zwei Fehler disqualifizieren hier sofort: Zinsen mit reinrechnen — das ist levered FCF, passt nicht zum WACC, verzerrt den ganzen DCF. Oder D&A vergessen zurückzuaddieren — dann wird ein Buchhaltungseffekt fälschlich wie ein echter Geldabfluss behandelt.',
        'Merk dir die Grenze: Alles, was mit der Finanzierung zu tun hat, bleibt draußen. Der unlevered FCF gehört dem Geschäft, nicht dem, wer es bezahlt hat.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 06 abgeschlossen.',
      marcus: {
        subject: 'Re: Der erste Baustein steht',
        body: 'Fünf Bausteine, ein Cashflow — 50 Mio. €, dein Ausgangswert für den ganzen Block. Als Nächstes der Diskontsatz dafür: WACC, die Zahl, die im Grundlagen-Pfad bewusst offenblieb.',
      },
      next: { title: 'WACC', meta: '8 Min · +45 XP' },
    },
  ],
};
