// K3 Lektion 9 — der volle LBO über den Paper-LBO hinaus: jährlicher Cash
// Sweep, compounding delever, Debt-Tranchen. Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK D · LBO';

export const k3LboFullModel: MicroLessonData = {
  id: 'k3-lbo-1-full-model',
  module: MODULE,
  titleDe: 'Der vollständige LBO',
  topicTag: 'lbo',
  nextPath: '/lesson/k3-lbo-2-returns-drivers',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Der vollständige LBO',
      subtitle: 'Block D · LBO, Advanced',
      marcus: {
        subject: 'Re: Der Paper-LBO war eine Abkürzung',
        body: 'Entry-EV, Exit-EV, fertig — der Paper-LBO nimmt die Schuldentilgung als geschätzte Pauschale an. Der echte Mechanismus läuft Jahr für Jahr, und die Zinslast verändert sich mit jedem Jahr. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l9-diagnose',
      prompt: 'Anfangsschuld 300. Nach Zinsen und Steuern stehen 20 für die Tilgung zur Verfügung. Schuldenstand am Jahresende?',
      options: ['280', '300', '320', '260'],
      correctIndex: 0,
      solution: 'Endstand = Anfangsschuld − verfügbarer Cash = 300 − 20 = 280.',
      marcusCorrect: 'Richtig, der Kernmechanismus sitzt. Weiter zum Compounding-Effekt.',
      marcusWrong: 'Der verfügbare Cash tilgt direkt die Schuld: 300 − 20 = 280. Genau das ist der Cash Sweep. Nächste Slides holen die Herleitung nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Der Cash-Sweep-Mechanismus',
      paragraphs: [
        'Jedes Jahr: Vorsteuer-Cashflow vor Zinsen, minus Zinsen auf die AKTUELLE Schuld, minus Steuern auf das Ergebnis danach — was übrig bleibt, tilgt die Schuld. Der neue, niedrigere Schuldenstand ist die Basis für die Zinsberechnung im nächsten Jahr.',
        'Der Paper-LBO überspringt das und schätzt die Tilgung über die ganze Haltedauer pauschal. Der volle Mechanismus rechnet Jahr für Jahr — und genau das wird in der Nachfrage geprüft.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Ein Jahr im Detail',
      paragraphs: [
        'Anfangsschuld 240, Vorsteuer-Cashflow (vor Zinsen) 40, Zinssatz 10 %, Steuersatz 25 %. Zinsen = 240×0,10 = 24. Ergebnis nach Zinsen = 40−24 = 16. Steuern = 16×0,25 = 4.',
        'Verfügbar für Tilgung = 16−4 = **12**. Neuer Schuldenstand = 240−12 = **228**.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l9-refresh-check',
      prompt: 'Anfangsschuld 200, Vorsteuer-Cashflow 30, Zinssatz 8 %, Steuersatz 30 %. Schuldenstand am Jahresende?',
      options: ['190,2', '186', '194', '184'],
      correctIndex: 0,
      solution: 'Zinsen=200×0,08=16. Nach Zinsen=30−16=14. Steuer=14×0,3=4,2. Tilgung=14−4,2=9,8. Endstand=200−9,8=190,2.',
      marcusCorrect: 'Sauber. Gleiche Kette, andere Zahlen.',
      marcusWrong: 'Zinsen = 200×0,08 = 16. Nach Zinsen = 30−16 = 14. Steuer = 14×0,3 = 4,2. Tilgung = 14−4,2 = 9,8. Endstand = 200−9,8 = 190,2.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Der Compounding-Effekt über zwei Jahre',
      paragraphs: [
        'Genau das, was der Paper-LBO verdeckt: Jahr 1 (wie oben) endet bei 228 Schuld, Tilgung 12. Jahr 2, bei gleichbleibendem Vorsteuer-Cashflow von 40: Zinsen = 228×0,10 = 22,8. Nach Zinsen = 40−22,8 = 17,2. Steuer = 17,2×0,25 = 4,3. Tilgung = 17,2−4,3 = **12,9**.',
        'Die Tilgung stieg von 12,0 auf 12,9 — obwohl der operative Cashflow konstant blieb. Der einzige Grund: niedrigere Schuld, niedrigere Zinsen, mehr Cash übrig für Tilgung. Das ist der sich selbst verstärkende Entschuldungseffekt, den ein Paper-LBO nicht zeigt.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Mehrere Tranchen',
      paragraphs: [
        'Reale LBOs finanzieren sich selten mit nur einer Schuldart. **Senior Debt**: niedrigerer Zinssatz, höchste Priorität, bekommt den Cash Sweep zuerst, oft mit Pflichttilgung.',
        '**Subordinated/Mezzanine Debt**: höherer Zinssatz, nachrangig, oft ohne Pflichttilgung. Manchmal mit **PIK-Zinsen** (Payment-in-Kind) — die Zinsen werden nicht bar gezahlt, sondern dem Schuldenstand zugeschlagen. Das schont die Liquidität für die vorrangigen Gläubiger, lässt die Mezzanine-Schuld aber wachsen statt zu schrumpfen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l9-year2-check',
      prompt: 'Anfangsschuld 150, Vorsteuer-Cashflow 25, Zinssatz 10 %, Steuersatz 20 %. Schuldenstand am Jahresende?',
      options: ['142', '145', '138', '150'],
      correctIndex: 0,
      solution: 'Zinsen=150×0,1=15. Nach Zinsen=25−15=10. Steuer=10×0,2=2. Tilgung=10−2=8. Endstand=150−8=142.',
      marcusCorrect: 'Korrekt. Immer dieselbe Kette: Zinsen, Steuer, Tilgung, neuer Stand.',
      marcusWrong: 'Zinsen = 150×0,1 = 15. Nach Zinsen = 25−15 = 10. Steuer = 10×0,2 = 2. Tilgung = 10−2 = 8. Endstand = 150−8 = 142.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Zinsen als Konstante über die Jahre behandeln',
      paragraphs: [
        'Die Falle: die Zinslast für die gesamte Haltedauer als eine flache, gleichbleibende Zahl behandeln — genau die Vereinfachung, die der Paper-LBO implizit trifft, wenn man sie unreflektiert übernimmt.',
        'Zinsen werden JEDES Jahr auf den AKTUELLEN Schuldenstand neu berechnet. Wer das nicht mitrechnet, unterschätzt die Tilgung in späteren Jahren systematisch — und genau danach fragt ein Interviewer, der prüfen will, ob du den Mechanismus verstanden hast oder nur die Abkürzung kennst.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l9-drill1',
      prompt: 'Nimmt der jährliche Cash-Sweep-Betrag über die Haltedauer eines Deals tendenziell zu oder ab, bei sonst gleichen Bedingungen?',
      options: [
        'Zu — sinkende Schuld senkt die Zinslast, mehr Cash bleibt für Tilgung',
        'Ab — die Firma hat weniger übrig zu verteilen',
        'Bleibt konstant',
        'Kommt ausschließlich auf das EBITDA-Wachstum an',
      ],
      correctIndex: 0,
      solution: 'Sinkende Zinslast bei konstantem operativem Cashflow lässt den Tilgungsbetrag jedes Jahr steigen.',
      marcusCorrect: 'Richtig. Genau der Compounding-Effekt von eben, jetzt als Prinzip formuliert.',
      marcusWrong: 'Mit sinkender Schuld sinkt die Zinslast — bei gleichbleibendem operativem Cashflow bleibt dadurch mehr für die Tilgung übrig. Der Cash-Sweep-Betrag steigt also typischerweise Jahr für Jahr.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l9-drill2',
      prompt: 'Anfangsschuld 100, Vorsteuer-Cashflow 20, Zinssatz 10 %, Steuersatz 20 %. Schuldenstand am Jahresende?',
      options: ['92', '90', '94', '88'],
      correctIndex: 0,
      solution: 'Zinsen=100×0,1=10. Nach Zinsen=20−10=10. Steuer=10×0,2=2. Tilgung=10−2=8. Endstand=100−8=92.',
      marcusCorrect: 'Sauber. Dieselbe Kette, kleinere Zahlen.',
      marcusWrong: 'Zinsen = 100×0,1 = 10. Nach Zinsen = 20−10 = 10. Steuer = 10×0,2 = 2. Tilgung = 10−2 = 8. Endstand = 100−8 = 92.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn der Cashflow die Zinsen nicht deckt',
      paragraphs: [
        'Reicht der operative Cashflow nicht, um Zinsen und Pflichttilgung zu decken, droht ein Covenant-Bruch — die Kreditverträge setzen meist eine Mindest-Zinsdeckung voraus (Interest Coverage Ratio, oft EBITDA/Zinsen über 2,0x–3,0x).',
        'Ein sorgfältig strukturierter LBO plant deshalb einen Puffer ein. Ein Deal, der die Zinsdeckung schon im Base Case knapp erreicht, ist ein Warnsignal, kein solides Modell.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 09 abgeschlossen.',
      marcus: {
        subject: 'Re: Jenseits des Paper-LBOs',
        body: 'Cash Sweep Jahr für Jahr, der Compounding-Effekt, Tranchen mit PIK-Option — das ist der Mechanismus hinter der Paper-LBO-Abkürzung. Als Nächstes: wie sich der Return tatsächlich zusammensetzt, IRR gegen MOIC, und die Value Creation Bridge.',
      },
      next: { title: 'IRR, MOIC und die Value Creation Bridge', meta: '9 Min · +50 XP' },
    },
  ],
};
