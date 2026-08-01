// K3 Lektion 7 — voller Merger-Modell-Walkthrough: Synergien (tax-effected),
// Goodwill-Mechanik. Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK C · M&A';

export const k3MaAccretionDilutionDeep: MicroLessonData = {
  id: 'k3-ma-1-accretion-dilution-deep',
  module: MODULE,
  titleDe: 'Der volle Merger-Walkthrough',
  topicTag: 'ma',
  nextPath: '/lesson/k3-ma-2-deal-structure',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Der volle Merger-Walkthrough',
      subtitle: 'Block C · M&A, Advanced',
      marcus: {
        subject: 'Re: Finanzierung war nur die halbe Rechnung',
        body: 'Cash, Stock, Debt, EPS-Effekt — das sitzt. Was K2 ausgelassen hat: Synergien, die das Ergebnis verzerren können, wenn du sie falsch behandelst. Und Goodwill, der bei jedem Deal entsteht und in keiner K2-Lektion vorkam. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l7-diagnose',
      prompt: 'Acquirer NI 100, 50 Mio. Aktien (EPS 2,00). Target NI 30. Finanzierungskosten nach Steuern: 18. Vorsteuer-Synergien 10, Steuersatz 30 %. Pro-forma-EPS?',
      options: ['2,38', '2,44', '2,24', '2,60'],
      correctIndex: 0,
      solution: 'Kombiniertes NI = 100+30−18+10×0,7 = 130−18+7 = 119. EPS = 119/50 = 2,38.',
      marcusCorrect: 'Richtig, mit Steuereffekt sofort mitgedacht. Weiter zum kompletten Modell.',
      marcusWrong: 'Synergien müssen versteuert werden wie jedes andere Ergebnis: 10×0,7=7. Kombiniertes NI = 100+30−18+7 = 119. EPS = 119/50 = 2,38. Nächste Slides holen das nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Was schon bekannt ist',
      paragraphs: [
        'Kombiniertes Net Income = Acquirer-NI + Target-NI − Finanzierungskosten (nach Steuern) ± neue Aktien im Nenner. Das ist der K2-Kern.',
        'Neu dazu kommt eine dritte Position: Synergien. Sie werden addiert — aber genau wie Zinsen und wie jede andere GuV-Position müssen sie nach Steuern gerechnet werden.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die Rechnung im Detail',
      paragraphs: [
        'Acquirer NI 100, Target NI 30, Finanzierungskosten nach Steuern 18, Vorsteuer-Synergien 10, Steuersatz 30 %.',
        'Synergien nach Steuern: 10×(1−0,3) = 7. Kombiniertes NI = 100 + 30 − 18 + 7 = **119**. Bei 50 Mio. Aktien: EPS = 119/50 = **2,38** — accretive gegenüber der Standalone-EPS von 2,00.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l7-refresh-check',
      prompt: 'Acquirer NI 100, Target NI 25, 60 Mio. Aktien. Finanzierungskosten (nach Steuern) 15. Vorsteuer-Synergien 20, Steuersatz 20 %. Pro-forma-EPS?',
      options: ['2,10', '2,20', '1,92', '2,35'],
      correctIndex: 0,
      solution: 'Synergien nach Steuern: 20×0,8=16. Kombiniertes NI = 100+25−15+16 = 126. EPS = 126/60 = 2,10.',
      marcusCorrect: 'Sauber. Gleiche Struktur, andere Zahlen.',
      marcusWrong: 'Synergien nach Steuern: 20×0,8=16. Kombiniertes NI = 100+25−15+16 = 126. EPS = 126/60 = 2,10.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Ein vollständiges Beispiel, Cash und Debt gemischt',
      paragraphs: [
        "Realistischer Fall: Kaufpreis 500, davon 400 Fremdkapital zu 6 % (nach Steuern 16,8 bei 30 % Steuersatz) plus 100 aus eigener Kasse (entgangener Zins 2 %, nach Steuern 1,4). Vorsteuer-Synergien 20, Steuersatz 30 % → nach Steuern 14.",
        'Kombiniertes NI = 100 + 30 − 16,8 − 1,4 + 14 = **125,8**. Aktienzahl unverändert bei 50 Mio. (reine Cash-/Debt-Finanzierung). Pro-forma-EPS = 125,8/50 = **2,52** — deutlich accretive.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Goodwill — was bei jedem Deal entsteht',
      paragraphs: [
        'Kaufpreis (Equity) 500. Target-Buchwert des Eigenkapitals 200, darin bereits 30 alter Goodwill enthalten. Anlagevermögen wird auf den fairen Wert hochgeschrieben: Write-Up 50.',
        'Formel: **Goodwill = Kaufpreis − (Target-Buchwert − alter Goodwill) − Write-Up.** Der alte Goodwill wird zuerst rausgerechnet, weil er beim Deal wertlos wird und durch neuen Goodwill ersetzt wird.',
        'Eingesetzt: 500 − (200−30) − 50 = 500 − 170 − 50 = **280**. Das ist der neue Goodwill, der in der Bilanz des kombinierten Unternehmens landet.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l7-goodwill-check',
      prompt: 'Kaufpreis 350, Target-Buchwert des Eigenkapitals 150 (darin 20 alter Goodwill), Write-Up 30. Neuer Goodwill?',
      options: ['190', '170', '200', '220'],
      correctIndex: 0,
      solution: 'Goodwill = 350 − (150−20) − 30 = 350 − 130 − 30 = 190.',
      marcusCorrect: 'Korrekt. Alten Goodwill zuerst rausrechnen, dann den Write-Up.',
      marcusWrong: 'Goodwill = Kaufpreis − (Buchwert − alter Goodwill) − Write-Up = 350 − (150−20) − 30 = 350 − 130 − 30 = 190.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Alten Goodwill vergessen rauszurechnen',
      paragraphs: [
        'Die Falle: den vollen Target-Buchwert verwenden, ohne den darin enthaltenen alten Goodwill vorher abzuziehen. Wer das tut, rechnet: Kaufpreis − vollerBuchwert − Write-Up.',
        'Der Effekt: Das Ergebnis liegt um genau den Betrag des alten Goodwill zu NIEDRIG. Am Beispiel: 500 − 200 − 50 = 250 statt korrekt 280 — ein Fehler von exakt 30, dem alten Goodwill. Klein wirkender Fehler, große Signalwirkung im Interview.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l7-drill1',
      prompt: 'Wenn du vergisst, den alten Goodwill vor der Rechnung abzuziehen — ist dein neuer Goodwill dann zu hoch oder zu niedrig?',
      options: ['Zu niedrig, um genau den alten Goodwill', 'Zu hoch', 'Unverändert', 'Kommt auf den Steuersatz an'],
      correctIndex: 0,
      solution: 'Du subtrahierst effektiv den vollen Buchwert statt Buchwert-minus-alterGoodwill — das zieht zu viel ab.',
      marcusCorrect: 'Richtig. Genau der Fehler, der im Interview sofort auffällt.',
      marcusWrong: 'Ohne den alten Goodwill vorher abzuziehen, subtrahierst du zu viel vom Kaufpreis — das Ergebnis liegt zu niedrig, exakt um den Betrag des alten Goodwill.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l7-drill2',
      prompt: 'Kaufpreis 600, Target-Buchwert des Eigenkapitals 250 (darin 40 alter Goodwill), Write-Up 60. Neuer Goodwill?',
      options: ['330', '310', '350', '290'],
      correctIndex: 0,
      solution: 'Goodwill = 600 − (250−40) − 60 = 600 − 210 − 60 = 330.',
      marcusCorrect: 'Sauber, dieselbe Sequenz.',
      marcusWrong: 'Goodwill = 600 − (250−40) − 60 = 600 − 210 − 60 = 330.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn der Kaufpreis unter dem fairen Nettovermögen liegt',
      paragraphs: [
        'Seltener, aber real: Liegt der Kaufpreis UNTER dem fairen Wert des Nettovermögens, entsteht kein Goodwill, sondern ein „Bargain Purchase Gain" — negativer Goodwill, der sofort und vollständig als Gewinn in der GuV erfasst wird, statt aktiviert zu werden.',
        'Kommt meist bei Notverkäufen oder Zwangsveräußerungen vor. Selten gefragt, aber wer die Existenz kennt, zeigt, dass er das Prinzip versteht, nicht nur die Formel für den Normalfall.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 07 abgeschlossen.',
      marcus: {
        subject: 'Re: Synergien und Goodwill sitzen',
        body: 'Synergien tax-effected, Goodwill mit korrekter Reihenfolge, die Bargain-Purchase-Ausnahme im Kopf. Als Nächstes: wie man die Finanzierung selbst optimiert — Mix statt Einzelmethode, Steuereffekte, Earnouts.',
      },
      next: { title: 'Deal-Struktur optimieren', meta: '9 Min · +45 XP' },
    },
  ],
};
