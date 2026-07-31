// K2 Lektion 1 — ported verbatim from docs/k2-lesson-content.md (10 slides).
// Coffee bridge: the only coffee appearance in K2.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK A · ACCOUNTING';

export const k2AccBridge: MicroLessonData = {
  id: 'k2-acc-1-bridge',
  module: MODULE,
  titleDe: 'Die erste echte Frage',
  topicTag: 'three-statements',
  nextPath: '/lesson/k2-acc-2-three-statements-drill',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Die erste echte Frage',
      subtitle: 'Block A · Accounting',
      marcus: {
        subject: 'Re: Quick one',
        body: "Stell dir den Moment vor: erster Call, zweite Minute, der Analyst schaut kurz von deinem CV hoch und sagt: 'Quick one.' Was dann kommt, ist die meistgestellte Technikfrage überhaupt. Heute nehmen wir sie auseinander — an einem bewusst simplen Beispiel: einem Kaffeeladen mit 100 € Umsatz und einer Espressomaschine für 50 €. Falls du unseren Grundlagen-Pfad kennst: ja, genau der Laden. Falls nicht: mehr musst du über ihn nicht wissen.",
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'So klingt sie im Original',
      paragraphs: [
        "So klingt sie im Original: **'Walk me through the three statements when depreciation goes up by 10.'** Auf Deutsch: Die Abschreibung steigt um 10 — was passiert in GuV, Cash Flow Statement und Bilanz? Steuersatz 40 %.",
        'Der Interviewer will keine Definitionen hören. Er will hören, ob du die drei Berichte in der richtigen Reihenfolge und mit sauberen Zahlen verbinden kannst.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Erster Halt: die GuV',
      paragraphs: [
        'Erster Halt, immer: die GuV. Abschreibung ist eine Kostenposition — dein Vorsteuergewinn sinkt um 10. Bei 40 % Steuersatz zahlst du 4 weniger Steuern: 10 × 0,4.',
        'Netto sinkt dein Net Income also um 6: 10 × (1 − 0,4). Die gesparte Steuer ist der Teil, den Interviewer hören wollen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Cash Flow und Bilanz',
      paragraphs: [
        'Zweiter Halt: Cash Flow Statement. Start bei Net Income: minus 6. Abschreibung ist nicht zahlungswirksam, also plus 10 zurück. Cash: plus 4.',
        'Dritter Halt: Bilanz. Aktivseite: Cash plus 4, Maschine (PP&E) minus 10 — netto minus 6. Passivseite: Gewinnrücklagen minus 6. Beide Seiten minus 6, die Bilanz geht auf.',
        'Am Kaffeeladen heißt das konkret: Die Espressomaschine ist buchhalterisch 10 weniger wert, aber in der Kasse liegen 4 mehr.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'In 30 Sekunden aufgesagt',
      paragraphs: [
        'So sagst du es in 30 Sekunden auf, ohne zu stolpern — immer dieselbe Reihenfolge, immer mit Steuereffekt:',
        "**1. Income Statement:** 'Pre-tax income falls by 10, taxes fall by 4, so net income is down 6.'",
        "**2. Cash Flow:** 'Start with net income down 6, add back the 10 of depreciation since it's non-cash — cash is up 4.'",
        "**3. Balance Sheet:** 'Cash up 4, PP&E down 10, so assets are down 6 — matched by retained earnings down 6. Balanced.'",
        'Drei Sätze, drei Berichte, fertig. Wer diese Struktur hat, kann jede Variante rechnen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l1-ni',
      prompt: 'Abschreibung +10, Steuersatz 40 %. Um wie viel ändert sich das Net Income?',
      options: ['−6', '−10', '−4', '+4'],
      correctIndex: 0,
      solution: 'NI-Effekt = −10 × (1 − 0,4) = −6.',
      marcusCorrect: 'Korrekt. 10 × (1 − 0,4). Die Steuerersparnis dämpft den Effekt.',
      marcusWrong: 'Nein. Vorsteuer −10, Steuern −4, netto −6. Der Steuersatz gehört in jede dieser Antworten.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l1-drill1',
      prompt: 'Abschreibung +20, Steuersatz 30 %. Was passiert mit dem Cash?',
      options: ['+6', '+20', '−14', '−6'],
      correctIndex: 0,
      solution: 'NI −14 (20 × 0,7), plus 20 zurück: +6.',
      marcusCorrect: 'Ja. NI −14, plus 20 zurück — Cash +6. Weiter.',
      marcusWrong: 'Nochmal der Weg: NI sinkt um 20 × 0,7 = 14. Im Cash Flow die 20 zurückaddieren: −14 + 20 = +6.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l1-drill2',
      prompt: 'Die Abschreibung sinkt um 10, Steuersatz 40 %. Was passiert mit dem Cash?',
      options: ['−4', '+4', '+6', '−10'],
      correctIndex: 0,
      solution: 'NI +6, im Cash Flow −10: netto −4.',
      marcusCorrect: 'Sauber. Alles spiegelt sich: NI +6, minus die 10 — Cash −4. Weniger Abschreibung heißt mehr Steuern, also weniger Cash.',
      marcusWrong: 'Dreh das Vorzeichen konsequent: NI +6, im Cash Flow −10 — macht −4. Weniger Abschreibung = höhere Steuerlast = weniger Cash.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Der Fehler, an dem die meisten scheitern',
      paragraphs: [
        "Die Falle bei dieser Frage ist nicht die Rechnung — es ist der Start. Die meisten fangen in der Bilanz an, verheddern sich und balancieren nichts mehr. Der zweithäufigste Fehler: die Steuerersparnis vergessen und 'Net Income minus 10' sagen. Beides fällt sofort auf.",
        'Merk dir: **Immer in der GuV starten. Immer den Steuereffekt mitnehmen. Cash steigt, wenn Abschreibung steigt** — wer das dreht, hat die Frage nicht verstanden, und genau darauf hört der Interviewer.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 01 abgeschlossen.',
      marcus: {
        subject: 'Re: Die Standardfrage sitzt',
        body: 'Damit hast du die meistgestellte Technikfrage im Griff — Struktur, Zahlen, Tempo. Ab der nächsten Lektion verlassen wir den Kaffeeladen: gleiche Mechanik, echte Firmengrößen.',
      },
      next: { title: 'Verknüpfungsfragen im Drill', meta: '8 Min · +40 XP' },
    },
  ],
};
