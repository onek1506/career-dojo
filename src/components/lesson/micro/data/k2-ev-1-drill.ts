// K2 Lektion 4 — ported verbatim from docs/k2-sections/04-k2-ev-1-drill.md (10 slides).

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK B · EV & MULTIPLES';

export const k2EvDrill: MicroLessonData = {
  id: 'k2-ev-1-drill',
  module: MODULE,
  titleDe: 'EV und Equity im Drill',
  topicTag: 'ev-equity',
  nextPath: '/lesson/k2-ev-2-multiples',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'EV und Equity im Drill',
      subtitle: 'Block B · EV & Multiples',
      marcus: {
        subject: 'Re: Neuer Block, neues Tempo',
        body: 'Neuer Block, neues Tempo. Nach den drei Statements dreht der Interviewer fast immer auf Bewertung — und Bewertung beginnt fast immer mit derselben Brücke: Enterprise Value gegen Equity Value. Das ist keine Verständnisfrage mehr, das ist Kopfrechnen auf Zeit. Der Interviewer stellt drei, vier Varianten hintereinander und hört, ob du zögerst. Heute läuft genau das: die Brücke hin, die Brücke zurück, bis sie automatisch geht.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Der Einstieg im Original',
      paragraphs: [
        "Der Einstieg fällt im Original so: **'What's the difference between enterprise value and equity value?'** Und direkt danach, ohne Pause: **'Calculate enterprise value given the following.'**",
        'Definitionen hast du — die will hier niemand hören. Der Interviewer will die Besitzlogik: Welcher Wert gehört wem, und warum wandern Schulden und Cash über die Brücke? Wer das begründen kann, rechnet die Varianten danach fast nebenbei.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Warum plus Debt, warum minus Cash',
      paragraphs: [
        'Denk es als Übernahme. Equity Value — bei einer börsennotierten Firma die Market Cap — ist der Preis für alle Aktien: das, was den Aktionären gehört. Wer die ganze Firma kauft, übernimmt aber auch ihre Schulden — die muss er bedienen oder ablösen, sie erhöhen den wahren Kaufpreis. Das Cash dagegen bekommt er mit und kann es direkt gegenrechnen — es senkt den wahren Kaufpreis.',
        'Also: **EV = Equity Value + Debt − Cash.** Deshalb der Name: Enterprise Value ist der Wert des Betriebs für alle Kapitalgeber zusammen, Eigen- und Fremdkapital. Equity Value ist derselbe Betrieb, aber nur aus Sicht der Aktionäre.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'In 30 Sekunden, drei Sätze',
      paragraphs: [
        'In 30 Sekunden aufgesagt, drei Sätze:',
        "**1.** 'Equity value is the value of the business attributable to shareholders only — for a public company, that's the market cap.'",
        "**2.** 'Enterprise value is the value of the core operations to all investors — both equity and debt holders.'",
        "**3.** 'To bridge between the two, you add debt and subtract cash — a buyer assumes the debt, but the cash comes with the company.'",
        "Der dritte Satz ist der wichtigste: Er beantwortet die Nachfrage 'Why do you subtract cash?' gleich mit, bevor sie gestellt wird.",
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l4-ev',
      prompt: 'Market Cap 500, Debt 200, Cash 50. Enterprise Value?',
      options: ['650', '750', '450', '350'],
      correctIndex: 0,
      solution: 'EV = 500 + 200 − 50 = 650.',
      marcusCorrect: 'Korrekt. 500 + 200 − 50 = 650. Weiter.',
      marcusWrong: 'Die Brücke: 500 + 200 − 50 = 650. Debt kommt dazu, Cash geht weg — in dieser Richtung immer.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l4-equity',
      prompt: 'EV 800, Debt 300, Cash 100. Equity Value?',
      options: ['600', '400', '1000', '500'],
      correctIndex: 0,
      solution: 'Equity = EV − Debt + Cash = 800 − 300 + 100 = 600.',
      marcusCorrect: 'Ja. 800 − 300 + 100 = 600. Rückwärts drehen sich beide Vorzeichen.',
      marcusWrong: 'Richtung wechseln heißt Vorzeichen wechseln: Equity = EV − Debt + Cash = 800 − 300 + 100 = 600.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l4-shares',
      prompt: 'Aktienkurs 20 €, 30 Mio. Aktien ausstehend. Debt 150, Cash 50. Enterprise Value?',
      options: ['700', '600', '800', '500'],
      correctIndex: 0,
      solution: 'Market Cap 20 × 30 = 600; EV = 600 + 150 − 50 = 700.',
      marcusCorrect: 'Sauber. 20 × 30 = 600 Market Cap, plus 150, minus 50 — 700.',
      marcusWrong: 'Erst die Market Cap: 20 × 30 = 600. Dann die Brücke: 600 + 150 − 50 = 700. Zwei Schritte, keine Abkürzung.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Die Debt-Frage',
      paragraphs: [
        "Und jetzt die Frage, an der dieser Block aussortiert: **'If a company raises 100 of debt, what happens to enterprise value?'** Der Reflex sagt: Debt steigt, also EV plus 100. Der Reflex ist falsch. Die 100 verschwinden ja nicht — nach der Aufnahme liegen sie als Cash auf dem Konto. Debt +100, Cash +100, Net Debt netto null: **EV unverändert.**",
        "Die Logik dahinter: EV misst den Wert des Betriebs, und der ändert sich nicht dadurch, wie die Firma finanziert ist. Wer reflexhaft '+100' sagt, hat die Formel auswendig gelernt. Wer 'unchanged' sagt und es begründen kann, hat sie verstanden — und genau diesen Unterschied testet die Frage.",
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l4-debtraise',
      prompt: 'Eine Firma nimmt 100 Mio. € Fremdkapital auf, das Geld bleibt auf dem Konto. Was macht der Enterprise Value?',
      options: ['Unverändert', '+100', '−100', '+200'],
      correctIndex: 0,
      solution: 'Debt +100 und Cash +100 heben sich in der Brücke auf: EV unverändert.',
      marcusCorrect: 'Korrekt. Debt +100, Cash +100 — in der Brücke hebt sich beides auf. Der Betrieb ist keinen Euro mehr wert.',
      marcusWrong: 'Rechne die Brücke: Debt +100 und Cash +100. In EV = Equity + Debt − Cash heben sich die beiden auf. Finanzierung ändert den Betriebswert nicht.',
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 04 abgeschlossen.',
      marcus: {
        subject: 'Re: Die Brücke sitzt',
        body: 'Brücke hin, Brücke zurück, Debt-Falle entschärft — das ist das Fundament für alles, was mit Multiples kommt. Nächste Lektion bauen wir darauf: EV/EBITDA gegen P/E, und wann welches Multiple das richtige ist.',
      },
      next: { title: 'EV/EBITDA vs. P/E', meta: '7 Min · +35 XP' },
    },
  ],
};
