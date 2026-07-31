// K2 Lektion 13 — written directly (no team draft was produced before the
// spend-limit cutoff). Same K2 grammar/voice as the ported lessons.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK E · LBO';

export const k2LboMechanik: MicroLessonData = {
  id: 'k2-lbo-2-mechanik',
  module: MODULE,
  titleDe: 'LBO-Mechanik',
  topicTag: 'lbo',
  nextPath: '/lesson/k2-fit-1-story',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'LBO-Mechanik',
      subtitle: 'Block E · LBO',
      marcus: {
        subject: 'Re: Von den drei Sätzen zur Rechnung',
        body: 'Struktur, Motor, drei Treiber — die Eintrittsfrage sitzt. Jetzt die Rechnung dahinter: ein kompletter Paper-LBO auf Papier, wie er in fast jedem PE- oder Leveraged-Finance-Interview verlangt wird.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Der Wortlaut',
      paragraphs: [
        "**'Walk me through a simple paper LBO.'** Kein Modell, kein Excel — nur Kopfrechnen in fünf Schritten, von Entry bis Exit.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Entry und Sources & Uses',
      paragraphs: [
        'Entry: EBITDA 50 Mio. €, Einstiegs-Multiple 10,0x — Kaufpreis (Enterprise Value) = 50 × 10 = **500**.',
        'Finanzierung, vereinfachtes Sources & Uses: 60 % Debt = 300, Rest Eigenkapital = **200**. Der Kaufpreis wird komplett durch diese beiden Quellen gedeckt.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Betriebsjahre und Exit',
      paragraphs: [
        'Über die Haltedauer von fünf Jahren wächst das EBITDA von 50 auf **70**, und die Firma tilgt aus ihrem Cashflow Schulden von 300 auf **100**.',
        'Exit zum selben Multiple (10,0x — die konservative Annahme, weil sie keine Marktverbesserung unterstellt): Exit-EV = 70 × 10 = **700**. Davon die Restschuld 100 abziehen: Exit-Equity = 700 − 100 = **600**.',
        'Return: Money Multiple = 600 / 200 = **3,0x**, das entspricht nach der Faustregel aus der letzten Lektion rund **25 % IRR**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Der Paper-LBO in fünf Schritten',
      paragraphs: [
        "**1.** 'Entry EV: EBITDA times entry multiple — 50 times 10 is 500.'",
        "**2.** 'Sources and uses: 60 percent debt, 300, and 200 of equity.'",
        "**3.** 'Over five years, EBITDA grows to 70 and debt is paid down to 100 from cash flow.'",
        "**4.** 'Exit EV at the same multiple: 70 times 10 is 700 — minus 100 of remaining debt is 600 of exit equity.'",
        "**5.** 'That's a 3.0x on the 200 of equity, roughly 25 percent IRR.'",
        'Fünf Schritte, eine Rechenkette. Wer sie in dieser Reihenfolge aufsagt, hat den Paper-LBO bestanden.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l13-equity',
      prompt: 'EBITDA 50, Entry-Multiple 10,0x, 60 % Debt-Finanzierung. Wie hoch ist der Equity-Einsatz?',
      options: ['200', '300', '500', '100'],
      correctIndex: 0,
      solution: 'EV = 50×10 = 500; Debt = 500×0,6 = 300; Equity = 500−300 = 200.',
      marcusCorrect: 'Korrekt. Kaufpreis 500, davon 300 Debt — bleiben 200 Equity.',
      marcusWrong: 'Erst der Kaufpreis: 50 × 10 = 500. Davon 60 % Debt: 300. Der Rest ist Equity: 500 − 300 = 200.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l13-exit-equity',
      prompt: 'Exit-EBITDA 70, Exit-Multiple 10,0x, Restschuld 100. Exit-Equity?',
      options: ['600', '700', '500', '800'],
      correctIndex: 0,
      solution: 'Exit-EV = 70×10 = 700; Exit-Equity = 700−100 = 600.',
      marcusCorrect: 'Ja. 700 Exit-EV minus 100 Restschuld — 600 für die Eigenkapitalgeber.',
      marcusWrong: 'Erst der Exit-EV: 70 × 10 = 700. Davon die Restschuld abziehen: 700 − 100 = 600. Das ist Exit-Equity, nicht der volle Firmenwert.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l13-mom',
      prompt: 'Equity-Einsatz 200, Exit-Equity 600. Money Multiple und ungefährer IRR über fünf Jahre?',
      options: ['3,0x ≈ 25 %', '2,0x ≈ 15 %', '3,5x ≈ 30 %', '2,5x ≈ 20 %'],
      correctIndex: 0,
      solution: '600/200 = 3,0x → Faustwert ≈ 25% IRR über 5 Jahre.',
      marcusCorrect: 'Korrekt. 600 durch 200 — 3,0x, und der Faustwert dafür ist rund 25 % IRR.',
      marcusWrong: '600 / 200 = 3,0x. Der Faustwert für 3,0x über fünf Jahre ist rund 25 % IRR — das Schwesterpaar 2,0x läge bei rund 15 %.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Die Restschuld beim Exit vergessen',
      paragraphs: [
        'Der häufigste Paper-LBO-Fehler: beim Exit die **Restschuld vergessen abzuziehen** und den vollen Exit-EV von 700 als Equity-Return ausgeben. Das wäre ein 3,5x statt 3,0x — falsch, weil die Bank ihre 100 zuerst zurückbekommt, nicht die Eigenkapitalgeber.',
        'Merk dir die Reihenfolge: Exit-EV gehört allen Kapitalgebern. Erst die Restschuld abziehen, dann bleibt das, was den Eigentümern gehört.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 13 abgeschlossen.',
      marcus: {
        subject: 'Re: LBO-Block komplett',
        body: 'Entry, Sources & Uses, Betriebsjahre, Exit, Return — der komplette Paper-LBO sitzt. Als Nächstes wechseln wir das Thema komplett: die Fit-Fragen, angefangen mit deinem eigenen Lebenslauf.',
      },
      next: { title: 'Walk me through your CV', meta: '7 Min · +35 XP' },
    },
  ],
};
