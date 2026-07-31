// K2 Lektion 3 — ported verbatim from docs/k2-lesson-content.md (10 slides).
// Edge cases: write-down, asset sale with gain, NOL. Same software company, tax 40 %.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK A · ACCOUNTING';

export const k2AccEdgeCases: MicroLessonData = {
  id: 'k2-acc-3-edge-cases',
  module: MODULE,
  titleDe: 'Die fiesen Varianten',
  topicTag: 'three-statements',
  nextPath: '/lesson/k2-ev-1-drill',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Die fiesen Varianten',
      subtitle: 'Block A · Accounting',
      marcus: {
        subject: 'Re: Zweite Runde',
        body: 'Die Standardfrage kannst du. Interviewer wissen das — deshalb kommt in der zweiten Runde die Variante mit Haken: ein Abschreiber, ein Verkauf mit Gewinn, eine Firma ohne Steuerlast. Gleiche Mechanik, aber an genau drei Stellen anders, und an diesen drei Stellen wird aussortiert.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Der Abschreiber',
      paragraphs: [
        "Variante eins: **'Your company writes down an asset by 100. Walk me through the statements.'** Ein Write-down ist wie eine Abschreibung auf einen Schlag: nicht zahlungswirksam, aber gewinnwirksam.",
        'GuV: Vorsteuergewinn −100, Steuern −40, Net Income −60. Cash Flow: Start −60, die 100 zurückaddieren — Cash +40. Bilanz: Asset −100, Cash +40, Aktiva netto −60, Gewinnrücklagen −60.',
        'Dieselbe Choreografie wie bei der Abschreibung, nur größer — und mit einer Steuer-Fußnote, die gleich noch wichtig wird.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l3-writedown',
      prompt: 'Write-down von 100, Steuersatz 40 %. Was macht das Cash?',
      options: ['+40', '−100', '−60', '0'],
      correctIndex: 0,
      solution: 'NI −60, Add-back +100: Cash +40.',
      marcusCorrect: 'Korrekt. Kein Geld verlässt die Firma, aber die Steuerlast sinkt um 40.',
      marcusWrong: 'Der Write-down selbst kostet kein Geld. NI −60, plus 100 zurück: +40. Das Cash steigt — kontraintuitiv, aber genau der Punkt der Frage.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Verkauf mit Gewinn',
      paragraphs: [
        "Variante zwei, der Aufsteiger unter den Interviewfragen: **'You sell a machine with a book value of 50 for 70.'** GuV: Gain von 20, Steuern 8, Net Income +12.",
        'Cash Flow, und hier trennt sich die Spreu: Start +12, den Gain von 20 **abziehen** — er ist kein operativer Cashflow. Die vollen 70 erscheinen als Verkaufserlös im Investing-Bereich. Netto: −8 operativ, +70 investing, +62 gesamt.',
        'Bilanz: Maschine −50, Cash +62, Aktiva +12, Gewinnrücklagen +12.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Die Prüfsequenz für Sonderfälle',
      paragraphs: [
        'Merk dir für jede fiese Variante dieselbe Prüfsequenz, bevor du sprichst:',
        "**1.** 'Ist die Position zahlungswirksam oder nicht?' — bestimmt den Add-back. **2.** 'Wo gehört der echte Geldfluss hin: Operating, Investing, Financing?' **3.** 'Steuereffekt mitgenommen?'",
        "Für den Verkaufsfall klingt das aufgesagt so: **'Net income is up 12, but I remove the 20 gain from operating cash flow — the full 70 of proceeds show up in investing.'**",
        'Dieselbe Sequenz trägt auch die Spiegelvariante, die gern als Nachfrage kommt — Verkauf **unter** Buchwert: Der Loss senkt das Net Income, wird operativ zurückaddiert, und die Proceeds laufen wieder durch Investing. Wer diese drei Fragen innerlich abhakt, kann auch Varianten beantworten, die er noch nie gehört hat. Genau das testet der Interviewer.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l3-gain',
      prompt: 'Maschine, Buchwert 50, verkauft für 70, Steuersatz 40 %. Operativer Cash Flow?',
      options: ['−8', '+12', '+20', '+62'],
      correctIndex: 0,
      solution: 'NI +12, Gain −20 in Operating: −8. Die 70 laufen durch Investing.',
      marcusCorrect: 'Sauber. +12 NI, −20 Gain-Korrektur. Die 70 laufen durch Investing, nicht durch Operating.',
      marcusWrong: 'Schrittweise: NI +12. Der Gain von 20 ist im NI enthalten, gehört aber nicht in den operativen Fluss — also abziehen: −8. Die 70 stehen im Investing-Teil.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Wenn es nichts zu sparen gibt',
      paragraphs: [
        "Letzte Stufe, gern als Nachfrage: 'Und wenn die Firma keine Gewinne macht — gilt deine Steuerersparnis dann noch?' Nein. Wer keine Steuern zahlt, spart auch keine. Die Abschreibung von 10 schlägt dann voll durch: Net Income −10, Cash ±0 nach Add-back.",
        'Der Verlust wird als Verlustvortrag geparkt und mindert künftige Steuern — das Stichwort dafür ist NOL, Net Operating Loss. Mehr als diesen Satz brauchst du dazu im ersten Gespräch nicht.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l3-nol',
      prompt: 'Abschreibung +10, die Firma zahlt aktuell keine Steuern. Was macht das Cash?',
      options: ['0', '+4', '−10', '+10'],
      correctIndex: 0,
      solution: 'NI −10, Add-back +10: netto 0 — ohne Steuerlast kein Steuerschild.',
      marcusCorrect: 'Korrekt. NI −10, Add-back +10 — netto nichts. Ohne Steuerlast gibt es keinen Steuerschild.',
      marcusWrong: 'Die +4 gelten nur, wenn Steuern gespart werden. Hier: NI −10, plus 10 zurück — Cash unverändert.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Den Gain doppelt zählen',
      paragraphs: [
        'Die eine Falle, die bei Sonderfällen fast alle erwischt: **den Gain doppelt zählen.** Wer die 70 im Investing stehen lässt und die 20 im operativen Teil nicht abzieht, hat 20 zu viel Cash erzeugt — und ein Interviewer, der die Frage stellt, wartet exakt darauf.',
        "Zweite Falle: beim Write-down reflexhaft 'Cash sinkt' sagen, weil sich 'Abschreiber' nach Verlust anhört. Nicht zahlungswirksam bleibt nicht zahlungswirksam, egal wie dramatisch die Zahl ist.",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 03 abgeschlossen.',
      marcus: {
        subject: 'Re: Accounting interviewfest',
        body: 'Standardfrage, Working Capital, Sonderfälle — der Accounting-Block ist damit auf Interview-Niveau. Als Nächstes wird umgerechnet: Enterprise und Equity Value im Drill, gegen die Uhr.',
      },
      next: { title: 'EV und Equity im Drill', meta: '7 Min · +35 XP' },
    },
  ],
};
