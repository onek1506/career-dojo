// K2 Lektion 8 — written directly (no team draft was produced before the
// spend-limit cutoff). Same K2 grammar/voice as the ported lessons.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK C · VALUATION';

export const k2ValTerminalValue: MicroLessonData = {
  id: 'k2-val-3-terminal-value',
  module: MODULE,
  titleDe: 'Terminal Value',
  topicTag: 'dcf',
  nextPath: '/lesson/k2-val-4-dcf-interview',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Terminal Value',
      subtitle: 'Block C · Valuation',
      marcus: {
        subject: 'Re: Der größte Wertblock',
        body: 'FCF 50, WACC 7,4 % — beide Bausteine stehen. Aber ein DCF projiziert nur fünf Jahre, und ein Unternehmen lebt länger. Was danach kommt, steckt in einer einzigen Zahl: dem Terminal Value. Meistens ist er der größte Teil des gesamten Werts.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Der Wortlaut',
      paragraphs: [
        "**'How do you calculate terminal value?'** Zwei Methoden werden erwartet, nicht eine. Wer nur eine kennt, hat die Frage halb beantwortet.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Zwei Methoden',
      paragraphs: [
        '**Gordon Growth:** unterstellt ewiges, konstantes Wachstum ab Jahr fünf. Letzter FCF 50, Wachstumsrate g 2 %, WACC 7 %: TV = 50 × 1,02 / (0,07 − 0,02) = 51 / 0,05 = **1.020**.',
        '**Exit Multiple:** unterstellt, dass die Firma in Jahr fünf zu einem Marktmultiple verkauft wird. EBITDA Jahr 5 = 120, Multiple 8,0x: TV = 120 × 8 = **960**.',
        'Gordon rechnet mit ewigem Wachstum, Exit Multiple mit heutiger Marktlogik. Beide Werte sollten zueinander passen — weichen sie stark ab, ist eine der Annahmen unrealistisch. Dieser Cross-Check ist selbst ein gutes Interview-Argument.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Beide Methoden in zwei Sätzen',
      paragraphs: [
        "**'With Gordon growth, I take the final year's free cash flow, grow it one more year, and divide by WACC minus the growth rate.'**",
        "**'With an exit multiple, I apply a market multiple — like EV/EBITDA — to the final year's metric, based on what similar companies trade at.'**",
        'Zwei Sätze, zwei Methoden — genau das erwartet die Frage.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l8-gordon',
      prompt: 'Letzter FCF 50, g 2 %, WACC 7 %. Terminal Value nach Gordon Growth?',
      options: ['1.020', '1.000', '714', '2.550'],
      correctIndex: 0,
      solution: 'TV = 50×1,02 / (0,07−0,02) = 51 / 0,05 = 1.020.',
      marcusCorrect: 'Korrekt. 51 geteilt durch 0,05 — 1.020.',
      marcusWrong: 'Erst den FCF ein Jahr weiterwachsen lassen: 50 × 1,02 = 51. Dann durch WACC minus g teilen: 51 / (0,07 − 0,02) = 51 / 0,05 = 1.020.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l8-exit',
      prompt: 'EBITDA Jahr 5 = 120, Exit-Multiple 8,0x. Terminal Value?',
      options: ['960', '1.020', '15', '128'],
      correctIndex: 0,
      solution: 'TV = 120 × 8 = 960.',
      marcusCorrect: 'Ja. 120 mal 8 — 960. Marktlogik statt Wachstumsformel.',
      marcusWrong: 'Exit Multiple ist eine reine Multiplikation: EBITDA × Multiple = 120 × 8 = 960.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l8-g-limit',
      prompt: 'Welche Bedingung MUSS die Wachstumsrate g bei Gordon Growth erfüllen?',
      options: [
        'g muss kleiner als WACC sein',
        'g muss größer als WACC sein',
        'g muss gleich dem EBITDA-Wachstum sein',
        'g spielt für die Formel keine Rolle',
      ],
      correctIndex: 0,
      solution: 'Bei g ≥ WACC wird der Nenner null oder negativ — die Formel bricht.',
      marcusCorrect: 'Korrekt. Und realistisch bleibt g meist nah am langfristigen BIP-Wachstum, rund 2–3 %.',
      marcusWrong: 'Der Nenner ist WACC minus g. Ist g gleich oder größer als der WACC, wird der Nenner null oder negativ — die Formel liefert Unsinn oder explodiert.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'g ≥ WACC und der vergessene Diskontfaktor',
      paragraphs: [
        'Die häufigste Katastrophe: g wird gleich oder größer als der WACC gesetzt — die Formel explodiert oder liefert eine negative Zahl. Sofortiger Fail, weil es zeigt, dass die Formel nur auswendig gelernt, nicht verstanden ist.',
        'Der zweite Fehler: den Terminal Value am Ende vergessen zu diskontieren. Er steht in Jahr fünf, nicht heute — wer ihn ungebremst zum Barwert der ersten fünf Jahre addiert, überschätzt den Firmenwert massiv.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 08 abgeschlossen.',
      marcus: {
        subject: 'Re: Alle Bausteine stehen',
        body: 'FCF 50, WACC 7,4 %, Terminal Value 1.020 — jeder Baustein für den kompletten DCF steht jetzt einzeln. Als Nächstes fügen wir sie zusammen: die Prüfungsfrage des Blocks, "walk me through a DCF".',
      },
      next: { title: 'Walk me through a DCF', meta: '8 Min · +50 XP' },
    },
  ],
};
