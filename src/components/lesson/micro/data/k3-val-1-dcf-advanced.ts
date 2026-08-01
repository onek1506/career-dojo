// K3 Lektion 3 — DCF finesse: unlevered vs. levered FCF, mid-year
// convention (incl. the TV-consistency trap). Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK B · VALUATION';

export const k3ValDcfAdvanced: MicroLessonData = {
  id: 'k3-val-1-dcf-advanced',
  module: MODULE,
  titleDe: 'DCF, die Feinheiten',
  topicTag: 'dcf',
  nextPath: '/lesson/k3-val-2-wacc-deep',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'DCF, die Feinheiten',
      subtitle: 'Block B · Valuation, Advanced',
      marcus: {
        subject: 'Re: Das Grundgerüst reicht nicht mehr',
        body: '„Walk me through a DCF" konntest du schon in Runde eins. Jetzt kommt die Nachfrage, die zeigt, ob du es wirklich verstehst: Unlevered oder Levered? Und diskontierst du zum Jahresende oder zur Jahresmitte? Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l3-diagnose',
      prompt: 'EBIT 100, Steuersatz 30 %, Zinsaufwand 10. Um wie viel liegt der Unlevered Free Cash Flow höher als der Levered Free Cash Flow (D&A, CapEx, ΔNWC identisch in beiden)?',
      options: ['7', '10', '3', '13'],
      correctIndex: 0,
      solution: 'Unlevered startet bei EBIT×(1−t), Levered bei NI (nach Zinsen). Differenz = Zinsaufwand nach Steuern = 10×0,7 = 7.',
      marcusCorrect: 'Richtig, sofort erkannt. Weiter zur Mid-Year Convention.',
      marcusWrong: 'Der Unterschied zwischen den beiden ist exakt der Zinsaufwand nach Steuern: 10 × (1 − 0,3) = 7. Alles andere kürzt sich raus. Nächste Slides holen die Herleitung nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Unlevered FCF',
      paragraphs: [
        'Unlevered FCF gehört allen Kapitalgebern — Eigen- und Fremdkapital zusammen. Startpunkt ist EBIT, nicht Net Income, weil Zinsen noch nicht abgezogen sind.',
        'Formel: EBIT × (1 − Steuersatz) + D&A − CapEx − ΔNWC. Diskontiert wird mit dem WACC, das Ergebnis ist der Enterprise Value.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Levered FCF — und die Rechnung im Detail',
      paragraphs: [
        'Levered FCF gehört nur den Eigenkapitalgebern — nach Zinsen und nach planmäßiger Schuldentilgung. Startpunkt ist Net Income. Diskontiert wird mit Cost of Equity, das Ergebnis ist direkt der Equity Value.',
        'Am Beispiel: EBIT 100, Zinsen 10, EBT 90, Steuersatz 30 % → Steuern 27, Net Income 63. Unlevered FCF = 100×0,7 + D&A − CapEx − ΔNWC = 70 + Rest. Levered FCF = 63 + derselbe Rest.',
        'Differenz: 70 − 63 = **7** — exakt der Zinsaufwand nach Steuern (10 × 0,7). Kein Zufall: Unlevered ignoriert Zinsen komplett, Levered zieht sie nach Steuern ab. Der Rest der Formel ist in beiden identisch.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l3-refresh-check',
      prompt: 'EBIT 200, Steuersatz 25 %, Zinsaufwand 20. Differenz zwischen Unlevered und Levered FCF?',
      options: ['15', '20', '5', '25'],
      correctIndex: 0,
      solution: 'Zinsaufwand nach Steuern: 20 × 0,75 = 15.',
      marcusCorrect: 'Genau. Skaliert unverändert.',
      marcusWrong: 'Immer derselbe Handgriff: Zinsaufwand × (1 − Steuersatz) = 20 × 0,75 = 15.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Mid-Year Convention',
      paragraphs: [
        'Standard-DCF unterstellt, dass jeder Cashflow exakt am Jahresende ankommt — Diskontfaktor 1/(1+WACC)^n. Realistisch verteilt sich der Cashflow über das Jahr, im Schnitt also zur Jahresmitte.',
        'Die Mid-Year Convention korrigiert das: Diskontfaktor 1/(1+WACC)^(n−0,5). Beispiel: CF 50, WACC 10 %, Jahr 1. Standard: 50/1,10 = 45,45. Mid-Year: 50/1,10^0,5 = 47,68. Der Wert steigt leicht, weil ein halbes Jahr weniger diskontiert wird.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l3-midyear',
      prompt: 'CF 80, WACC 12 %, Jahr 1. Barwert unter Mid-Year Convention (gerundet)?',
      options: ['75,6', '71,4', '80,0', '68,0'],
      correctIndex: 0,
      solution: '80 / 1,12^0,5 = 80 / 1,0583 ≈ 75,6.',
      marcusCorrect: 'Korrekt. Ein halbes Jahr weniger Diskontierung, entsprechend höherer Barwert.',
      marcusWrong: 'Diskontfaktor mit n−0,5: 1,12^0,5 ≈ 1,0583. 80 / 1,0583 ≈ 75,6 — höher als der Standard-Barwert 80/1,12 ≈ 71,4.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Mid-Year Convention auf die falsche Terminal Value anwenden',
      paragraphs: [
        'Die Falle: Mid-Year Convention blind auf ALLES anwenden, inklusive Terminal Value — ohne zu prüfen, welche TV-Methode gerade läuft.',
        '**Gordon Growth TV**: konsistent, wird ebenfalls mit n−0,5 diskontiert — sie ist selbst eine Summe künftiger Cashflows, die über das Jahr verteilt ankommen.',
        '**Exit Multiple TV**: nicht mit Mid-Year diskontieren. Ein Exit Multiple unterstellt einen Verkauf zum Jahresende — ein einzelner Transaktionszeitpunkt, kein verteilter Cashflow. Hier bleibt der volle Diskontfaktor n stehen.',
        'Wer die Mid-Year Convention pauschal auf beide TV-Methoden anwendet, überschätzt den Wert bei der Exit-Multiple-Variante systematisch — und genau das wird abgefragt, wenn ein Interviewer beide Methoden im selben Modell verlangt.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l3-tv-trap',
      prompt: 'Ein Modell nutzt Mid-Year Convention für die expliziten Cashflows und einen Exit-Multiple-Terminal-Value. Wie wird der Terminal Value diskontiert?',
      options: [
        'Mit dem vollen Diskontfaktor n, ohne Mid-Year-Korrektur',
        'Mit n − 0,5, wie die übrigen Cashflows',
        'Gar nicht diskontiert',
        'Mit n − 1',
      ],
      correctIndex: 0,
      solution: 'Exit Multiple unterstellt Verkauf zum Jahresende — voller Diskontfaktor n, keine Mid-Year-Anpassung.',
      marcusCorrect: 'Richtig. Der Exit ist ein Zeitpunkt, kein verteilter Cashflow — deshalb keine Korrektur.',
      marcusWrong: 'Exit Multiple = ein Verkauf zu einem Stichtag, Jahresende. Kein verteilter Cashflow, also kein Mid-Year-Diskontfaktor — der Terminal Value bleibt bei vollem n. Nur Gordon-Growth-TV bekommt n−0,5.',
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 03 abgeschlossen.',
      marcus: {
        subject: 'Re: Grundgerüst mit Feinschliff',
        body: 'Unlevered gegen Levered sauber hergeleitet, Mid-Year Convention korrekt angewendet — inklusive der Stelle, an der sie nicht hingehört. Als Nächstes der WACC selbst: Beta, Unlevering, Relevering.',
      },
      next: { title: 'WACC, unter der Haube', meta: '9 Min · +45 XP' },
    },
  ],
};
