// K2 Lektion 16 — written directly (no team draft was produced before the
// spend-limit cutoff). Mixed mock: reuses exact numbers from lessons 1, 4,
// 5, 8, 10, 13 as specified in the writer brief. No new concepts.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK F · FIT & MOCK';

export const k2MockMixed: MicroLessonData = {
  id: 'k2-mock-1-mixed',
  module: MODULE,
  titleDe: 'Der Mixed Mock',
  topicTag: 'mixed',
  nextPath: '/course',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Der Mixed Mock',
      subtitle: 'Block F · Fit & Mock',
      marcus: {
        subject: 'Re: Keine Vorwarnung',
        body: '30 Minuten, ein Analyst, keine Vorwarnung, in welcher Reihenfolge die Themen kommen — genau das simulieren wir. Sechs Fragen, quer durch alles, was du in diesem Pfad gebaut hast. Kein neuer Stoff, nur Tempo.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k2-l16-q1',
      prompt: 'Abschreibung +10, Steuersatz 40 %. Was macht das Cash?',
      options: ['+4', '−10', '−6', '0'],
      correctIndex: 0,
      solution: 'NI −6, Add-back +10: Cash +4.',
      marcusCorrect: 'Korrekt. Die Standardfrage aus Lektion 1 — NI −6, plus 10 zurück, Cash +4.',
      marcusWrong: 'NI sinkt um 10 × (1 − 0,4) = 6. Im Cash Flow die 10 zurückaddieren: −6 + 10 = +4.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l16-q2',
      prompt: 'Market Cap 500, Debt 200, Cash 50. Enterprise Value?',
      options: ['650', '750', '450', '350'],
      correctIndex: 0,
      solution: '500 + 200 − 50 = 650.',
      marcusCorrect: 'Ja. Die Brücke aus Lektion 4 — Debt dazu, Cash weg: 650.',
      marcusWrong: 'EV = Equity + Debt − Cash = 500 + 200 − 50 = 650.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l16-q3',
      prompt: 'Welche Größe gehört zum Enterprise Value, nicht zum Equity Value?',
      options: ['EBITDA', 'Net Income', 'EPS', 'Dividende je Aktie'],
      correctIndex: 0,
      solution: 'EBITDA steht vor Zinsen, gehört allen Kapitalgebern — EV-Ebene.',
      marcusCorrect: 'Korrekt. Vor Zinsen, allen Kapitalgebern zugehörig — EBITDA passt zu EV.',
      marcusWrong: 'Alles vor Zinsen — Revenue, EBITDA, EBIT — gehört zur EV-Ebene. Net Income, EPS und Dividenden stehen nach Zinsen und gehören zur Equity-Ebene.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l16-q4',
      prompt: 'Letzter FCF 50, g 2 %, WACC 7 %. Terminal Value nach Gordon Growth?',
      options: ['1.020', '1.000', '714', '2.550'],
      correctIndex: 0,
      solution: '50×1,02 / (0,07−0,02) = 51 / 0,05 = 1.020.',
      marcusCorrect: 'Ja. Die Formel aus Lektion 8 — 51 durch 0,05: 1.020.',
      marcusWrong: 'Erst den FCF ein Jahr weiterwachsen lassen: 50 × 1,02 = 51. Dann durch WACC minus g: 51 / 0,05 = 1.020.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l16-q5',
      prompt: 'All-Stock-Deal. Der Acquirer hat ein höheres P/E als das Target. Was ist die naheliegende Tendenz für das Pro-forma-EPS?',
      options: ['Tendenziell accretive', 'Tendenziell dilutive', 'Immer neutral', 'Nicht bestimmbar ohne Steuersatz'],
      correctIndex: 0,
      solution: 'Bei reinen Stock-Deals gilt die P/E-Faustregel: höheres Acquirer-P/E kauft niedrigeres Target-P/E → accretive.',
      marcusCorrect: 'Korrekt. Bei All-Stock greift die P/E-Faustregel aus Lektion 10 — höher kauft niedriger, tendenziell accretive.',
      marcusWrong: 'Bei reinen Stock-Deals gilt: höheres Acquirer-P/E kauft niedrigeres Target-P/E — das ist tendenziell accretive. Bei Cash- oder Debt-Finanzierung gilt diese Faustregel nicht mehr.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l16-q6',
      prompt: 'Exit-EV 700, Restschuld 100, Equity-Einsatz 200. Money Multiple?',
      options: ['3,0x', '3,5x', '2,5x', '2,0x'],
      correctIndex: 0,
      solution: 'Exit-Equity = 700 − 100 = 600; MoM = 600 / 200 = 3,0x.',
      marcusCorrect: 'Ja. Exit-Equity 600 aus Lektion 13, geteilt durch 200 Einsatz — 3,0x.',
      marcusWrong: 'Erst die Restschuld abziehen: 700 − 100 = 600 Exit-Equity. Dann durch den Einsatz: 600 / 200 = 3,0x.',
    },
    {
      kind: 'concept',
      eyebrow: 'NACH DEM MOCK',
      heading: 'Wie man aus einem Mock lernt',
      paragraphs: [
        'Ein Mock bringt nur etwas, wenn danach etwas passiert. Notiere dir, welche Fragen gezögert haben, nicht nur welche falsch waren — Zögern ist im echten Call genauso ein Signal wie ein Fehler.',
        'Geh dann gezielt zurück zur Lektion des schwächsten Themas und wiederhole nur die Drills dort, nicht den ganzen Block. Der Weak-Area-Tracker zählt für jedes Thema mit — er zeigt dir, wo sich das am meisten lohnt.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 16 abgeschlossen.',
      marcus: {
        subject: 'Re: Der ganze Pfad in sechs Fragen',
        body: 'Drei Statements, EV-Brücke, Multiples, DCF, M&A, LBO — sechs Fragen, ein Durchgang durch den ganzen Pfad. Von hier aus: schwache Themen gezielt wiederholen, dann noch einmal drillen.',
      },
      next: { title: 'Zurück zur Übersicht', meta: 'Schwache Themen wiederholen' },
    },
  ],
};
