// K2 Lektion 7 — written directly (no team draft was produced before the
// spend-limit cutoff). Same K2 grammar/voice as the ported lessons.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK C · VALUATION';

export const k2ValWacc: MicroLessonData = {
  id: 'k2-val-2-wacc',
  module: MODULE,
  titleDe: 'WACC',
  topicTag: 'dcf',
  nextPath: '/lesson/k2-val-3-terminal-value',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'WACC',
      subtitle: 'Block C · Valuation',
      marcus: {
        subject: 'Re: Die Zahl, die K1 offenließ',
        body: 'Der Free Cash Flow steht bei 50. Jetzt der Diskontsatz dafür — die Zahl, die im Grundlagen-Pfad bewusst offenblieb, weil sie ohne Kapitalstruktur nicht funktioniert: der WACC. Heute bauen wir ihn aus zwei Teilen zusammen.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Zwei Fragen, ein Zusammenhang',
      paragraphs: [
        "Zwei Fragen, die im Call meist zusammen fallen: **'Walk me through WACC'** und **'How do you calculate cost of equity?'** Beide testen dieselbe Fähigkeit: Kannst du aus Bausteinen einen gewichteten Mittelwert bauen, statt eine Formel nur zu zitieren?",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die Bausteine',
      paragraphs: [
        'WACC ist der gewichtete Mittelwert aus Eigenkapitalkosten und Fremdkapitalkosten, gewichtet nach ihrem Marktwert-Anteil an der Gesamtfinanzierung — nicht nach Buchwerten.',
        'Cost of Equity kommt meist über CAPM: risikofreier Zins plus Beta mal Marktrisikoprämie. Beispiel: 3 % risikofrei, Beta 1,2, Marktrisikoprämie 5 % — Cost of Equity = 3 % + 1,2 × 5 % = **9 %**.',
        'Cost of Debt bekommt den **Tax Shield**: Zinsen sind steuerlich absetzbar, also zählt nur der Zins nach Steuern. Bei 5 % Zinssatz und 30 % Steuersatz: 5 % × (1 − 0,3) = 3,5 % effektiv.',
        'Warum ist Cost of Equity höher als Cost of Debt? Aktionäre stehen im Rang hinter den Gläubigern — mehr Risiko, mehr geforderte Rendite.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Die Formel als Satz',
      paragraphs: [
        "**'WACC weights the cost of equity and the after-tax cost of debt by their market-value shares of the capital structure — it's the discount rate I apply to unlevered free cash flow.'**",
        'Am eigenen Zahlenbeispiel: Equity 600, Debt 400 — macht V = 1.000. Anteile 60 % / 40 %. Cost of Equity 10 %, Cost of Debt 5 %, Steuersatz 30 %.',
        '**WACC = 0,6 × 10 % + 0,4 × 5 % × (1 − 0,3) = 6 % + 1,4 % = 7,4 %.**',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l7-wacc',
      prompt: 'Equity 600, Debt 400, Cost of Equity 10 %, Cost of Debt 5 %, Steuersatz 30 %. WACC?',
      options: ['7,4 %', '7,5 %', '8,0 %', '6,0 %'],
      correctIndex: 0,
      solution: '0,6×10% + 0,4×5%×0,7 = 6% + 1,4% = 7,4%.',
      marcusCorrect: 'Korrekt. 6 % vom Eigenkapital plus 1,4 % vom Fremdkapital nach Steuern — 7,4 %.',
      marcusWrong: 'Gewichte zuerst: 0,6 × 10 % = 6 %. Dann Debt nach Steuern: 0,4 × 5 % × 0,7 = 1,4 %. Summe: 7,4 %.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l7-capm',
      prompt: 'Risikofreier Zins 3 %, Beta 1,2, Marktrisikoprämie 5 %. Cost of Equity nach CAPM?',
      options: ['9 %', '6 %', '8 %', '10 %'],
      correctIndex: 0,
      solution: '3% + 1,2×5% = 3% + 6% = 9%.',
      marcusCorrect: 'Ja. 3 % plus 1,2 mal 5 % — 9 %. CAPM in einer Zeile.',
      marcusWrong: 'CAPM: risikofrei plus Beta mal Marktrisikoprämie. 3 % + 1,2 × 5 % = 3 % + 6 % = 9 %.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l7-wacc-up',
      prompt: 'Der WACC steigt. Was passiert mit dem DCF-Wert?',
      options: ['Er sinkt', 'Er steigt', 'Bleibt unverändert', 'Kommt auf g an'],
      correctIndex: 0,
      solution: 'Höherer Diskontsatz → kleinere Barwerte.',
      marcusCorrect: 'Korrekt. Höherer Diskontsatz, kleinere Barwerte, niedrigerer Wert — durchgängig für alle Cashflows.',
      marcusWrong: 'Der WACC ist der Abzinsungssatz. Steigt er, wird jeder künftige Euro heute weniger wert — der DCF-Wert sinkt.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Der Tax Shield und die Nachfrage',
      paragraphs: [
        'Der häufigste Fehler: den Tax Shield beim Cost of Debt vergessen und mit dem vollen Zinssatz rechnen. Fremdkapital ist steuerlich günstiger als es aussieht — genau deshalb der Faktor (1 − Steuersatz).',
        "Die klassische Nachfrage danach: **'Does more debt always lower WACC?'** Nein — nur bis zu einem Punkt. Wird eine Firma zu hoch verschuldet, steigt das Risiko für alle: Cost of Equity und Cost of Debt ziehen beide an, weil Aktionäre und Gläubiger mehr Ausfallrisiko sehen. Ab da überwiegt der Risikoeffekt den Tax-Shield-Effekt, und der WACC steigt wieder.",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 07 abgeschlossen.',
      marcus: {
        subject: 'Re: Der Diskontsatz steht',
        body: 'FCF 50, WACC 7,4 % — beide Zahlen, die den Rest des Blocks tragen. Als Nächstes der Teil, der beim DCF fast immer den größten Wertblock ausmacht: der Terminal Value.',
      },
      next: { title: 'Terminal Value', meta: '7 Min · +40 XP' },
    },
  ],
};
