// K2 Lektion 2 — ported verbatim from docs/k2-lesson-content.md (10 slides).
// Working-capital linkage drill at a software company (~200 Mio. €), tax 30 %.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK A · ACCOUNTING';

export const k2AccDrill: MicroLessonData = {
  id: 'k2-acc-2-three-statements-drill',
  module: MODULE,
  titleDe: 'Verknüpfungsfragen im Drill',
  topicTag: 'three-statements',
  nextPath: '/lesson/k2-acc-3-edge-cases',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Verknüpfungsfragen im Drill',
      subtitle: 'Block A · Accounting',
      marcus: {
        subject: 'Re: Neue Kulisse',
        body: 'Neue Kulisse: ein Softwareanbieter, rund 200 Mio. € Umsatz. Die Depreciation-Frage aus Lektion 1 ist das Aufwärmen — danach kommen die Verknüpfungsfragen: Lagerbestand, Vorauszahlungen, offene Rechnungen. Alles dieselbe Disziplin: drei Berichte, eine Bewegung, saubere Vorzeichen.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Typischer Wortlaut im Call',
      paragraphs: [
        "Typischer Wortlaut im Call: **'Inventory goes up by 10, paid in cash. Walk me through the statements.'** Bevor du rechnest, brauchst du die eine Regel, die alle diese Fragen trägt.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die Working-Capital-Regel',
      paragraphs: [
        'Die Regel: **Steigt ein operatives Asset, fließt Cash ab. Steigt eine operative Verbindlichkeit, fließt Cash zu.** Warum: Ein wachsendes Lager bindet Geld, eine Vorauszahlung deines Kunden bringt Geld, bevor du lieferst.',
        "Für Inventory +10 in bar heißt das: GuV — nichts, verkauft ist noch nichts. Cash Flow — operativ minus 10. Bilanz — Inventory +10, Cash −10, Aktivseite netto null, nichts weiter passiert. Unspektakulär, und genau deshalb ein beliebter Einstieg: Wer hier 'Revenue' erwähnt, ist raus.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Das Gerüst für jede Working-Capital-Frage',
      paragraphs: [
        'Das Gerüst für jede Working-Capital-Frage, drei Sätze:',
        "**1.** 'No impact on the income statement — nothing was sold.'",
        "**2.** 'On the cash flow statement, the inventory increase is a use of cash — operating cash flow down 10.'",
        "**3.** 'On the balance sheet, inventory up 10, cash down 10 — assets unchanged in total, everything balances.'",
        'Der erste Satz ist der wichtigste. Er zeigt, dass du GuV und Cash sauber trennst.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l2-deferred',
      prompt: 'Ein Kunde zahlt 12 Mio. € Jahreslizenz komplett im Voraus. Was passiert im Moment der Zahlung?',
      options: [
        'GuV nichts, Cash +12, Deferred Revenue +12',
        'Revenue +12, Cash +12',
        'GuV nichts, Cash +12, Equity +12',
        'Revenue +12, Deferred Revenue +12',
      ],
      correctIndex: 0,
      solution: 'Zahlung ohne Leistung: Cash +12, Deferred Revenue (Liability) +12, kein Umsatz.',
      marcusCorrect: 'Korrekt. Geld da, Leistung nicht — also Verbindlichkeit, kein Umsatz. Revenue kommt erst über die zwölf Monate.',
      marcusWrong: 'Umsatz entsteht bei Leistung, nicht bei Zahlung. Die 12 landen als Deferred Revenue auf der Passivseite — eine Schuld in Arbeitsleistung.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l2-ar',
      prompt: 'Die Firma stellt eine Rechnung über 20 Mio. €, der Kunde hat noch nicht gezahlt. Steuersatz 30 %. Was macht der operative Cash Flow?',
      options: ['−6', '+14', '+20', '0'],
      correctIndex: 0,
      solution: 'NI = 20 × 0,7 = +14; AR +20 ist ein Cash-Abfluss: 14 − 20 = −6.',
      marcusCorrect: 'Gut. NI +14, aber Accounts Receivable +20 frisst mehr, als der Gewinn bringt: −6. Umsatz ohne Zahlung kostet erstmal Cash — die Steuern zahlst du trotzdem.',
      marcusWrong: 'Der Weg: NI = 20 × 0,7 = +14. Forderungen +20 sind ein Cash-Abfluss im Working Capital. 14 − 20 = −6.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l2-collect',
      prompt: 'Im Folgequartal zahlt der Kunde die 20 Mio. €. Was passiert jetzt?',
      options: [
        'GuV nichts, Cash +20, AR −20',
        'Revenue +20, Cash +20',
        'GuV nichts, Cash +20, Equity +20',
        'Cash +20, Deferred Revenue −20',
      ],
      correctIndex: 0,
      solution: 'Der Umsatz war schon gebucht — jetzt tauscht nur AR gegen Cash.',
      marcusCorrect: 'Ja. Der Umsatz war schon gebucht — jetzt wandelt sich nur die Forderung in Cash.',
      marcusWrong: 'Der Umsatz ist längst in der GuV. Jetzt tauscht die Aktivseite: AR runter, Cash rauf. Sonst nichts.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l2-sellthrough',
      prompt: 'Das Lager von vorhin (10 Mio. €) wird für 20 Mio. € verkauft, bar bezahlt. Steuersatz 30 %. Operativer Cash Flow?',
      options: ['+17', '+7', '+20', '+10'],
      correctIndex: 0,
      solution: 'NI = (20 − 10) × 0,7 = +7; Lagerabbau +10: OCF +17.',
      marcusCorrect: 'Korrekt. NI = (20 − 10) × 0,7 = +7, dazu der Lagerabbau +10 im Working Capital: +17.',
      marcusWrong: 'Zwei Effekte: Gewinn nach Steuern +7 und das Inventory sinkt um 10 — ein freigesetzter Cash-Posten. 7 + 10 = 17.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Vorzeichen unter Zeitdruck',
      paragraphs: [
        "Die Falle bei Working-Capital-Fragen sind die Vorzeichen unter Zeitdruck. Der Klassiker: 'Inventory steigt, also steigt mein Cash Flow' — falsch herum gedacht, passiert unter Stress ständig. Zweiter Klassiker: Revenue buchen, sobald irgendwo Geld auftaucht. Die Reihenfolge Leistung → Umsatz, Zahlung → Cash sind zwei getrennte Spuren.",
        'Wenn du unsicher bist, sag die Regel innerlich auf: operatives Asset rauf, Cash runter. Das rettet dich in jeder Variante.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 02 abgeschlossen.',
      marcus: {
        subject: 'Re: Eine Regel, alle Varianten',
        body: 'Drei Varianten, eine Regel. Nächste Lektion wird es unangenehm: Abschreiber, Verkäufe mit Gewinn, und was passiert, wenn es keine Steuern zu sparen gibt.',
      },
      next: { title: 'Die fiesen Varianten', meta: '8 Min · +45 XP' },
    },
  ],
};
