// ============================================================
// Kategorie 1 — Lektion 10: Ein Laden, zwei Preisschilder
// (Enterprise vs. Equity Value, Teil 1)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 10, 9 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// House analogy: Preisschild 500.000 + Hypothek 200.000 = 700.000.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 02 · BEWERTUNG';

export const k1EvEquityT1: MicroLessonData = {
  id: 'k1-val-2-ev-equity',
  module: MODULE,
  titleDe: 'Ein Laden, zwei Preisschilder',
  nextPath: '/lesson/k1-val-3-ev-equity',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Ein Laden, zwei Preisschilder',
      subtitle: 'Enterprise vs. Equity Value, Teil 1',
      marcus: {
        subject: 'Re: Was kostet ein Haus wirklich?',
        body: 'Vergiss kurz den Kaffee, ich hab ein klareres Bild. Du kaufst ein Haus. Preisschild: 500.000 €. Aber auf dem Haus liegt noch eine Hypothek von 200.000 €, die du übernimmst. Frage: Was hat dich das Haus *wirklich* gekostet? Genau diese Frage steckt hinter zwei Begriffen, die ständig verwechselt werden.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Das erste Preisschild: Equity Value',
      paragraphs: [
        'Das Preisschild — die 500.000 €, die der Verkäufer einsteckt — nennt man **Equity Value**. Der Wert, der den *Eigentümern* gehört. Bei einer Firma: der Wert der Aktien.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l10-equity-value',
      prompt: 'Was ist der Equity Value beim Hauskauf?',
      options: ['Die 500.000 €, die der Verkäufer bekommt', 'Die Hypothek', 'Das Bargeld im Haus'],
      correctIndex: 0,
      solution: 'Equity Value ist der Wert, der den Eigentümern zufließt: die 500.000 € für den Verkäufer.',
      marcusCorrect: 'Genau. Equity Value ist das, was den Eigentümern zufließt.',
      marcusWrong: 'Fast — Equity Value ist das, was der Eigentümer bekommt: das Preisschild von 500.000 €. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Das zweite Preisschild: Enterprise Value',
      paragraphs: [
        'Aber du übernimmst ja auch die Hypothek von 200.000 €. Wirtschaftlich kostet dich das Haus also 500.000 plus 200.000 = 700.000 €.',
        'Dieser volle Wert des Objekts — egal wer ihn finanziert hat, du oder die Bank — heißt **Enterprise Value**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER KONTRAST',
      heading: 'Die zwei nebeneinander',
      paragraphs: [
        'Zwei Preisschilder für dasselbe Haus. **Equity Value**: was der Eigentümer bekommt. **Enterprise Value**: was das ganze Objekt wert ist, Schulden eingerechnet.',
        'Bei einer Firma ist es exakt dasselbe Prinzip.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l10-ev-schulden',
      prompt: 'Welcher Wert rechnet die Schulden mit ein?',
      options: ['Enterprise Value', 'Equity Value'],
      correctIndex: 0,
      solution: 'Enterprise Value ist der volle Wert des Objekts, Schulden eingerechnet.',
      marcusCorrect: 'Richtig. Enterprise Value ist der ganze Betrieb inklusive Schulden.',
      marcusWrong: 'Fast — Equity Value ist nur der Teil, der den Eigentümern gehört. Die Schulden stecken im Enterprise Value. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Zwei Preisschilder, ein Objekt',
      paragraphs: [
        'Der Kern: **Equity Value ist, was den Eigentümern gehört. Enterprise Value ist der ganze Betrieb, Schulden eingerechnet.** Zwei Preisschilder, ein Objekt.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUSBLICK',
      heading: 'Das Bargeld im Briefkasten',
      paragraphs: [
        'Beim Haus hab ich das Bargeld im Briefkasten unterschlagen. Das spielt nämlich auch eine Rolle — und daraus wird beim nächsten Mal eine saubere kleine Formel, die du sofort verstehst.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 10 abgeschlossen.',
      marcus: {
        subject: 'Re: Zwei Preisschilder',
        body: 'Jetzt kennst du beide Preisschilder: Equity Value ist, was den Eigentümern gehört, Enterprise Value der ganze Betrieb inklusive Schulden. Nächstes Mal bauen wir daraus die Formel, die beide verbindet. Aber das hat Zeit.',
      },
      next: { title: 'Die Brücke zwischen beiden Preisschildern', meta: '8 Min · +35 XP' },
    },
  ],
};
