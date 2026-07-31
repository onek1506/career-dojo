// K2 Lektion 10 — written directly (no team draft was produced before the
// spend-limit cutoff). Same K2 grammar/voice as the ported lessons.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK D · M&A';

export const k2MaAccretionDilution: MicroLessonData = {
  id: 'k2-ma-1-accretion-dilution',
  module: MODULE,
  titleDe: 'Accretion / Dilution',
  topicTag: 'ma',
  nextPath: '/lesson/k2-ma-2-drill',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Accretion / Dilution',
      subtitle: 'Block D · M&A',
      marcus: {
        subject: 'Re: Neues Terrain: M&A',
        body: 'Valuation kannst du. Neues Terrain: M&A. Die erste Frage, die dort fast immer kommt, dreht sich um eine einzige Kennzahl — EPS, Gewinn je Aktie — und ob ein Zukauf sie hebt oder senkt. Heute baust du dir die Logik dahinter selbst auf.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Der Wortlaut',
      paragraphs: [
        "**'Walk me through an accretion/dilution analysis'** oder direkter: **'Is the deal accretive or dilutive?'** Beide fragen dasselbe: Steigt oder sinkt das EPS des Käufers nach dem Zukauf?",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Accretive heißt: EPS steigt',
      paragraphs: [
        'Ausgangslage: Acquirer mit Net Income 100 Mio. €, 50 Mio. Aktien — Standalone-EPS = 100 / 50 = **2,00 €**. Target bringt 30 Mio. € Net Income mit.',
        '**Szenario All-Stock:** Acquirer gibt 20 Mio. neue Aktien aus, keine Zinskosten. Kombiniertes Net Income: 100 + 30 = 130. Neue Aktienzahl: 50 + 20 = 70. EPS = 130 / 70 = **1,86 €** — niedriger als 2,00 €, also **dilutive**.',
        '**Szenario Cash aus Kredit:** Kaufpreis 300 Mio. €, finanziert über Debt zu 5 %, Steuersatz 30 %. Zinskosten nach Steuern: 300 × 5 % × 0,7 = 10,5. Kombiniertes NI: 100 + 30 − 10,5 = 119,5. Aktienzahl bleibt bei 50. EPS = 119,5 / 50 = **2,39 €** — höher als 2,00 €, also **accretive**.',
        'Der Unterschied liegt nicht am Target — er liegt an der Finanzierung: Aktien verwässern den Nenner, Schulden kosten nur den Zins.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Drei Schritte',
      paragraphs: [
        "**1.** 'Combine net income — acquirer plus target, minus any new financing costs after tax.'",
        "**2.** 'Work out the new share count — unchanged for cash or debt, higher for stock.'",
        "**3.** 'Divide the two and compare to the acquirer's standalone EPS — higher is accretive, lower is dilutive.'",
        'Drei Schritte, ein Vergleich. Das trägt jede Variante dieser Frage.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l10-stock',
      prompt: 'Acquirer NI 100, 50 Mio. Aktien. Target-NI 30. All-Stock-Deal, 20 Mio. neue Aktien. Pro-forma-EPS?',
      options: ['1,86 €', '2,00 €', '2,60 €', '1,50 €'],
      correctIndex: 0,
      solution: '130 / 70 = 1,86 €.',
      marcusCorrect: 'Korrekt. 130 geteilt durch 70 Mio. Aktien — 1,86 €, dilutive.',
      marcusWrong: 'Kombiniertes NI: 100 + 30 = 130. Neue Aktienzahl: 50 + 20 = 70. 130 / 70 = 1,86 €. Niedriger als die 2,00 € Standalone-EPS.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l10-debt',
      prompt: 'Gleicher Deal, aber Kaufpreis 300 über Debt zu 5 %, Steuersatz 30 %, Aktienzahl bleibt 50. Pro-forma-EPS?',
      options: ['2,39 €', '2,60 €', '2,10 €', '1,95 €'],
      correctIndex: 0,
      solution: 'Zinsen nach Steuern 300×5%×0,7=10,5; NI 100+30−10,5=119,5; EPS 119,5/50=2,39.',
      marcusCorrect: 'Ja. 119,5 geteilt durch 50 Mio. Aktien — 2,39 €, accretive.',
      marcusWrong: 'Zinsen nach Steuern: 300 × 5 % × (1 − 0,3) = 10,5. NI: 100 + 30 − 10,5 = 119,5. EPS: 119,5 / 50 = 2,39 €.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l10-verdict',
      prompt: 'Standalone-EPS des Acquirers ist 2,00 €. Das Pro-forma-EPS liegt bei 1,86 €. Wie nennt man das?',
      options: ['Dilutive', 'Accretive', 'Neutral', 'Nicht bestimmbar'],
      correctIndex: 0,
      solution: 'EPS sinkt → dilutive.',
      marcusCorrect: 'Korrekt. Sinkendes EPS ist per Definition dilutive — unabhängig davon, wie gut das Target sonst passt.',
      marcusWrong: 'Accretive heißt EPS steigt, dilutive heißt EPS sinkt. 1,86 € ist weniger als 2,00 € — also dilutive.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Die P/E-Faustregel gilt nicht immer',
      paragraphs: [
        "Verbreitete Faustregel: 'Acquirer mit höherem P/E kauft Target mit niedrigerem P/E — automatisch accretive.' Das stimmt, **aber nur bei All-Stock-Deals.** Sobald Cash oder Debt im Spiel sind, zählt die Faustregel nicht mehr — dann entscheiden die Finanzierungskosten, nicht die P/E-Differenz.",
        'Wer die Regel unabhängig vom Finanzierungsweg anwendet, hat den eigentlichen Mechanismus nicht verstanden. Der Interviewer merkt genau das.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 10 abgeschlossen.',
      marcus: {
        subject: 'Re: Zwei Szenarien, eine Logik',
        body: 'Zwei Finanzierungswege, zwei EPS, eine Logik dahinter. Als Nächstes drillen wir alle drei Wege — Cash, Stock, Debt — gegeneinander, so wie es im Call als Nachfrage kommt.',
      },
      next: { title: 'Cash, Stock, Debt im Drill', meta: '7 Min · +40 XP' },
    },
  ],
};
