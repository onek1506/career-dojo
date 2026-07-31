// ============================================================
// Kategorie 1 — Lektion 11: Die Brücke (Enterprise vs. Equity Value, Teil 2)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 11, 10 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 02 · BEWERTUNG';

export const k1EvEquityT2: MicroLessonData = {
  id: 'k1-val-3-ev-equity',
  module: MODULE,
  titleDe: 'Die Brücke',
  nextPath: '/lesson/k1-val-4-methoden',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Die Brücke',
      subtitle: 'Enterprise vs. Equity Value, Teil 2',
      marcus: {
        subject: 'Re: Das Detail von letztem Mal',
        body: 'Zurück zum Haus. 500.000 € Preisschild, 200.000 € Hypothek übernommen. Jetzt das Detail von letztem Mal: Im Haus liegen 20.000 € Bargeld, die dir nach dem Kauf gehören. Ändert das, was dich das Haus *wirklich* kostet?',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DAS HAUS',
      heading: 'Der echte Preis',
      paragraphs: [
        'Ja. Wenn du nach dem Kauf 20.000 € in bar vorfindest, ist der echte Preis effektiv niedriger — du kriegst das Geld ja mit. Also ziehst du es ab. 500.000 + 200.000 − 20.000 = 680.000 €.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FORMEL',
      heading: 'Die ganze Brücke, in einer Zeile',
      paragraphs: [
        'Das ist die ganze Brücke, in einer Zeile: **Enterprise Value = Equity Value + Schulden − Cash.** Schulden *dazu*, weil du sie übernimmst. Cash *weg*, weil du es mitbekommst. Mehr ist es nicht.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l11-ev-calc',
      prompt: 'Equity 500, Schulden 200, Cash 20. Enterprise Value?',
      options: ['680', '720', '300'],
      correctIndex: 0,
      solution: 'Enterprise Value = Equity + Schulden − Cash = 500 + 200 − 20 = 680.',
      marcusCorrect: 'Genau — plus Schulden, minus Cash. Die Brücke sitzt.',
      marcusWrong: 'Fast — Schulden kommen dazu, Cash geht weg: 500 + 200 − 20. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Die Brücke an deinem Laden',
      paragraphs: [
        'Zurück zu deinem Laden: Sagen wir, der Equity Value ist 40 — dein Anteil. Dazu der Kredit von 30, minus die 20 in der Kasse. Enterprise Value = 40 + 30 − 20 = 50. Der ganze Laden als Maschine ist 50 wert.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Kennzahlen nicht mischen',
      paragraphs: [
        'Ein Punkt, der im Interview oft zur Falle wird — ich zeig ihn dir früh. Manche Kennzahlen gehören zum ganzen Betrieb, andere nur zum Eigentümer-Anteil. Man darf sie nicht mischen. Die Faustregel dahinter ist simpel.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FAUSTREGEL',
      heading: 'Vor Zinsen, nach Zinsen',
      paragraphs: [
        'Alles *vor* Zinsen — wie EBIT — gehört zum Enterprise Value, weil es allen Geldgebern zusteht. Alles *nach* Zinsen — wie Net Income — gehört zum Equity Value, weil die Bank da schon bezahlt ist. Deshalb passt EV mit EBIT zusammen, aber EV mit Net Income wäre ein Fehler.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l11-mismatch',
      prompt: 'Was passt NICHT zusammen?',
      options: [
        'Enterprise Value mit Net Income',
        'Enterprise Value mit EBIT',
        'Equity Value mit Net Income',
      ],
      correctIndex: 0,
      solution: 'Vor Zinsen (EBIT) gehört zum Enterprise Value, nach Zinsen (Net Income) zum Equity Value — EV mit Net Income mischt beide Welten.',
      marcusCorrect: 'Stark. Enterprise Value oben, Net Income unten — das mischt zwei Welten. Genau die Falle.',
      marcusWrong: 'Fast — vor Zinsen gehört zum Enterprise Value, nach Zinsen zum Equity Value. Gesucht ist das Paar, das diese Regel bricht. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Brücke und Faustregel',
      paragraphs: [
        'Der Kern: **Enterprise Value = Equity + Schulden − Cash. Und: Kennzahlen vor Zinsen gehören zum Enterprise Value, Kennzahlen nach Zinsen zum Equity Value.**',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 11 abgeschlossen.',
      marcus: {
        subject: 'Re: Die Brücke steht',
        body: 'Jetzt kennst du die Brücke: Enterprise Value = Equity Value + Schulden − Cash. Und du weißt, welche Kennzahlen zu welchem Wert gehören — vor Zinsen zum Enterprise Value, nach Zinsen zum Equity Value. Als Nächstes schauen wir uns die drei Wege an, einen konkreten Wert zu berechnen. Aber das hat Zeit.',
      },
      next: { title: 'Die drei Wege, einen Wert zu berechnen', meta: '7 Min · +30 XP' },
    },
  ],
};
