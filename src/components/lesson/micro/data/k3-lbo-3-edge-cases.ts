// K3 Lektion 11 — Dividend Recaps, Add-ons/Multiple Arbitrage, Zirkularität,
// closing "bad LBO candidate" callback. Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK D · LBO';

export const k3LboEdgeCases: MicroLessonData = {
  id: 'k3-lbo-3-edge-cases',
  module: MODULE,
  titleDe: 'Die unbequemen LBO-Fragen',
  topicTag: 'lbo',
  nextPath: '/lesson/k3-brain-1-teasers',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Die unbequemen LBO-Fragen',
      subtitle: 'Block D · LBO, Advanced',
      marcus: {
        subject: 'Re: Der Rest des Werkzeugkastens',
        body: 'Drei Dinge, die in einem Superday gern als Nachfrage kommen, gerade weil sie nicht im Standardgerüst stehen: Dividend Recaps, Add-ons, und die Frage, die die meisten kalt erwischt — wie du mit Zirkularität im Modell umgehst. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l11-diagnose',
      prompt: 'Eine Plattform wurde zu 8,0x EBITDA gekauft. Sie erwirbt ein Add-on zu 6,0x. Was passiert mit dem geblendeten (kombinierten) Einstiegsmultiple?',
      options: [
        'Es sinkt, näher an das günstigere Add-on-Multiple',
        'Es steigt',
        'Es bleibt bei 8,0x',
        'Es wird zum Mittelwert der beiden Firmen unabhängig vom EBITDA',
      ],
      correctIndex: 0,
      solution: 'Ein günstiger zugekaufter Betrieb zieht das gewichtete Gesamtmultiple nach unten.',
      marcusCorrect: 'Richtig, sofort erkannt. Weiter zu Dividend Recaps und Zirkularität.',
      marcusWrong: 'Das Add-on wird günstiger eingekauft als die Plattform selbst — das drückt das EBITDA-gewichtete Gesamtmultiple nach unten, näher an das Add-on-Multiple. Genau das ist Multiple Arbitrage.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Was Add-ons sind',
      paragraphs: [
        'Ein Add-on (Bolt-on) ist ein kleinerer Zukauf, den die bereits im PE-Portfolio befindliche Plattform während der Haltedauer selbst tätigt — anorganisches Wachstum, eine gängige „Buy-and-Build"-Strategie.',
        'Add-ons werden oft zu NIEDRIGEREN Multiples eingekauft als die Plattform selbst gekostet hat — kleinere Firmen haben typischerweise geringere Multiples als etablierte Plattformen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Multiple Arbitrage im Detail',
      paragraphs: [
        'Plattform: EBITDA 50, gekauft zu 8,0x → Kosten 400. Add-on: EBITDA 10, gekauft zu 6,0x → Kosten 60. Kombinierte Kosten 460, kombiniertes EBITDA 60 → geblendetes Multiple ≈ **7,67x**, deutlich unter der ursprünglichen 8,0x.',
        'Verkauft man beim Exit die kombinierte Einheit zum unveränderten Plattform-Multiple von 8,0x auf 60 EBITDA: Exit-EV = **480**. Wert allein aus dem Arbitrage-Effekt: 480−460 = **20** — ganz ohne Wachstum oder Schuldentilgung.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l11-refresh-check',
      prompt: 'Plattform zu 10,0x, EBITDA 60 (Kosten 600). Add-on zu 7,0x, EBITDA 15 (Kosten 105). Geblendetes Multiple?',
      options: ['≈9,4x', '≈8,5x', '≈10,0x', '≈7,0x'],
      correctIndex: 0,
      solution: 'Kombinierte Kosten 705, kombiniertes EBITDA 75. 705/75 = 9,4x.',
      marcusCorrect: 'Sauber. Immer kombinierte Kosten durch kombiniertes EBITDA.',
      marcusWrong: 'Kombinierte Kosten = 600+105 = 705. Kombiniertes EBITDA = 60+15 = 75. Geblendetes Multiple = 705/75 = 9,4x — unter der ursprünglichen 10,0x.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Dividend Recaps',
      paragraphs: [
        'Ein Dividend Recap: Das Portfoliounternehmen nimmt zusätzliches Fremdkapital auf — nicht für einen weiteren Zukauf, sondern um eine Sonderdividende an den PE-Fonds auszuschütten. Der Fonds bekommt Kapital zurück, lange vor dem eigentlichen Exit.',
        'Der Effekt auf den IRR: Cash früher zurückzubekommen hebt die annualisierte Rendite, selbst wenn der spätere Exit-Erlös dadurch etwas niedriger ausfällt — genau die Zeit-Logik aus der letzten Lektion, nur diesmal aktiv herbeigeführt statt nur beobachtet. Der Preis dafür: Das Unternehmen wird wieder stärker gehebelt, mehr Risiko für die verbleibende Haltedauer.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Zirkularität — der Klassiker unter den unbequemen Fragen',
      paragraphs: [
        "Die Frage, die fast jeden kalt erwischt: **'How do you deal with circular references in an LBO model?'** Das Problem: Zinsen hängen vom Schuldenstand ab, der Schuldenstand hängt vom verfügbaren Cash ab, der verfügbare Cash hängt von den Zinsen ab — ein geschlossener Kreis.",
        'Zwei Standardantworten: Entweder einen expliziten Zirkularitäts-Schalter in Excel einbauen (iterative Berechnung aktivieren), oder die Zinsen bewusst auf Basis des Schuldenstands zu BEGINN der Periode berechnen statt auf Basis des Durchschnitts oder Endstands — das durchbricht den Kreis rechnerisch, auf Kosten geringfügiger Präzision.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l11-circularity-check',
      prompt: 'Welcher Ansatz vermeidet die Zirkularität zwischen Zinsen und Cashflow bereits durch die Modellkonstruktion, ohne einen Excel-Schalter zu brauchen?',
      options: [
        'Zinsen auf Basis des Schuldenstands zu Periodenbeginn berechnen',
        'Zinsen auf Basis des Durchschnitts aus Anfangs- und Endstand berechnen',
        'Zinsen komplett ignorieren',
        'Nur die Steuerlast anpassen',
      ],
      correctIndex: 0,
      solution: 'Beginn-Stand ist bereits bekannt, bevor die Periode gerechnet wird — kein Kreis nötig.',
      marcusCorrect: 'Richtig. Die pragmatische Lösung, die im Interview sofort überzeugt.',
      marcusWrong: 'Der Schuldenstand zu Periodenbeginn ist bereits bekannt, bevor irgendetwas anderes berechnet wird — Zinsen darauf zu basieren durchbricht den Kreis, ohne einen Excel-Schalter zu brauchen. Durchschnitts- oder Endstand-basierte Zinsen erzeugen die Zirkularität erst.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Auf die Zirkularitäts-Frage keine Antwort haben',
      paragraphs: [
        'Die eigentliche Falle hier ist nicht ein Rechenfehler — es ist Schweigen. Wer die Zirkularitäts-Frage noch nie gehört hat, wirkt, als hätte er nie selbst ein LBO-Modell gebaut, nur die fertige Struktur auswendig gelernt.',
        'Die Standardantwort sitzt: Zinsen auf den Beginn-Stand rechnen als pragmatische Lösung nennen, den Excel-Zirkularitäts-Schalter als Alternative erwähnen. Zwei Sätze reichen — aber sie müssen kommen, ohne zu zögern.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l11-drill1',
      prompt: 'Warum macht ein Fonds einen Dividend Recap, obwohl er das Unternehmen dadurch stärker verschuldet?',
      options: [
        'Um Kapital früher an die Investoren zurückzugeben und den IRR zu heben',
        'Weil Dividenden steuerfrei sind',
        'Um das Unternehmen für einen Add-on vorzubereiten',
        'Weil Banken das verlangen',
      ],
      correctIndex: 0,
      solution: 'Frühere Cash-Rückflüsse heben den annualisierten IRR, auch wenn das Risiko durch mehr Leverage steigt.',
      marcusCorrect: 'Richtig. Zeit-Logik, aktiv herbeigeführt.',
      marcusWrong: 'Ein Dividend Recap gibt Kapital früher an die Fondsinvestoren zurück — das hebt den annualisierten IRR, selbst wenn der spätere Exit-Erlös dadurch etwas geringer ausfällt. Der Preis: höheres Risiko durch mehr Verschuldung.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l11-drill2',
      prompt: 'Plattform zu 12,0x, EBITDA 40 (Kosten 480). Add-on zu 9,0x, EBITDA 8 (Kosten 72). Wert allein aus der Multiple Arbitrage, wenn beim Exit zum unveränderten Plattform-Multiple (12,0x) auf das kombinierte EBITDA (48) verkauft wird?',
      options: ['24', '20', '30', '15'],
      correctIndex: 0,
      solution: 'Kombinierte Kosten=552. Exit-EV=48×12=576. Arbitrage-Wert=576−552=24.',
      marcusCorrect: 'Korrekt. Reiner Multiple-Effekt, ganz ohne Wachstum.',
      marcusWrong: 'Kombinierte Kosten = 480+72 = 552. Exit-EV = 48×12 = 576. Wert aus der Arbitrage allein = 576−552 = 24.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Was einen schlechten LBO-Kandidaten ausmacht',
      paragraphs: [
        'Der Gegenpol zur guten LBO-Kandidatur aus den Grundlagen: zyklische, unvorhersehbare Cashflows, hoher laufender CapEx-Bedarf, bereits hohe bestehende Verschuldung, kein klarer Weg zur Entschuldung, kein belastbarer Wettbewerbsvorteil.',
        'Wer diese Liste im Kopf hat, kann jede „ist das ein gutes LBO-Target?"-Frage sofort strukturiert beantworten — egal, welche Branche als Beispiel kommt.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 11 abgeschlossen.',
      marcus: {
        subject: 'Re: LBO-Block abgeschlossen',
        body: 'Multiple Arbitrage, Dividend Recaps, Zirkularität sauber beantwortet — der LBO-Block ist komplett. Als Nächstes ein Themenwechsel: klassische Brain Teaser, strukturiert statt geraten gelöst.',
      },
      next: { title: 'Brain Teaser, strukturiert gelöst', meta: '8 Min · +40 XP' },
    },
  ],
};
