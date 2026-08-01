// K3 Lektion 13 — "pitch me a stock" structure + a reusable framework for
// discussing real current deals (deliberately no fabricated "current" facts
// — the lesson coaches the learner to apply the framework to whatever is
// actually happening at their own interview, rather than presenting a
// invented deal as if it were real). Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK E · MARKT & PITCH';

export const k3MarketWhyNow: MicroLessonData = {
  id: 'k3-market-1-why-now',
  module: MODULE,
  titleDe: 'Eine Aktie pitchen, Deals einordnen',
  topicTag: 'market-pitch',
  nextPath: '/lesson/k3-fit-1-tough-behavioral',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Eine Aktie pitchen, Deals einordnen',
      subtitle: 'Block E · Markt & Pitch',
      marcus: {
        subject: "Re: 'Pitch me a stock'",
        body: "Zwei Fragen, die in fast jedem Superday fallen: 'Pitch me a stock' und eine Frage zu einem aktuellen Deal. Beide testen dieselbe Fähigkeit — eine These strukturiert aufbauen, nicht einfach Fakten aufzählen. Testfrage zuerst.",
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l13-diagnose',
      prompt: "'Pitch me a stock.' Was solltest du als Allererstes nennen, vor allen Details?",
      options: [
        'Deine Empfehlung (Buy/Sell) und den Zeithorizont',
        'Den exakten aktuellen Kurs',
        'Ein vollständiges DCF-Modell',
        'Die komplette Unternehmensgeschichte',
      ],
      correctIndex: 0,
      solution: 'Empfehlung und Horizont zuerst geben allem Folgenden einen Rahmen.',
      marcusCorrect: 'Richtig, sofort. Weiter zur vollständigen Struktur.',
      marcusWrong: 'Ohne Empfehlung und Zeithorizont weiß der Zuhörer nicht, worauf die folgenden Details hinauslaufen. Erst die Position, dann die Begründung.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Warum die Reihenfolge zählt',
      paragraphs: [
        'Ein Pitch ohne klare Empfehlung am Anfang zwingt den Zuhörer, die ganze Zeit zu raten, worauf du hinauswillst. Ein Interviewer, der zwei Minuten zuhört, ohne zu wissen, ob du Buy oder Sell sagst, hat schon abgeschaltet.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die vollständige Struktur, kurz',
      paragraphs: [
        'Sechs Elemente, in dieser Reihenfolge: Empfehlung + Horizont. Ein Satz zum Geschäft. Die These (2–3 Gründe, warum der Markt falsch liegt). Bewertungsstütze. Katalysator + Timing. Ehrliche Gegenargumente.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l13-refresh-check',
      prompt: "Welche Eröffnung eines Pitches ist stärker?",
      options: [
        "'Ich empfehle Kauf, 12–18 Monate Horizont, weil...'",
        "'Also, die Firma stellt X her und wurde vor 40 Jahren gegründet...'",
        'Beide gleich stark',
        'Kommt auf den Interviewer an',
      ],
      correctIndex: 0,
      solution: 'Empfehlung und Horizont zuerst gibt sofort Orientierung.',
      marcusCorrect: 'Genau. Position zuerst, Begründung danach.',
      marcusWrong: "Die zweite Eröffnung liefert Fakten, aber keine Position — der Zuhörer weiß erst spät, worauf es hinausläuft. 'Ich empfehle Kauf, 12–18 Monate' gibt sofort einen Rahmen.",
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Ein vollständiges Beispiel, anonymisiert',
      paragraphs: [
        'Firma X, ein mittelgroßes Unternehmen, handelt zu 12x Forward-P/E gegenüber einem Peer-Durchschnitt von 15x. Aktueller Kurs bei EPS 5: 12×5 = 60. EPS wächst 15 % pro Jahr → nächstes Jahr EPS 5,75.',
        'These: Rerating auf nur 14x (immer noch unter dem Peer-Durchschnitt von 15x) auf das nächste EPS ergibt einen Zielkurs von 5,75×14 = **80,5** — Upside von rund **34 %**, ohne dass der Markt überhaupt vollständig zum Peer-Niveau aufschließen muss.',
        'Diese Struktur — Bewertungsdifferenz zu Peers, plus Wachstum, plus konservatives Rerating — ist das Grundgerüst der meisten Pitches, unabhängig von der konkreten Branche.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l13-numeric-check',
      prompt: 'Firma Y: aktuell 10x Forward-P/E, Peer-Durchschnitt 13x, EPS heute 4, wächst 12 %. Rerating auf 12x auf das nächste EPS — Zielkurs?',
      options: ['≈53,8', '≈48,0', '≈44,8', '≈52,0'],
      correctIndex: 0,
      solution: 'Nächstes EPS = 4×1,12 = 4,48. Zielkurs = 4,48×12 = 53,76 ≈ 53,8.',
      marcusCorrect: 'Korrekt. Gleiche Struktur, andere Zahlen.',
      marcusWrong: 'Nächstes EPS = 4×1,12 = 4,48. Zielkurs bei 12x = 4,48×12 = 53,76 ≈ 53,8 — ein moderates Rerating, immer noch unter dem Peer-Durchschnitt von 13x.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Aktuelle Deals einordnen — die Struktur, die du mitbringst',
      paragraphs: [
        'Für die Frage zu einem aktuellen Deal gibt es kein festes Beispiel, das man auswendig lernen kann — die Antwort hängt davon ab, was gerade real passiert, wenn dein Interview stattfindet. Das musst du selbst recherchieren: die 2–3 Deals oder Markttrends, die für die Gruppe relevant sind, bei der du dich bewirbst.',
        'Was sich NICHT ändert, ist die Struktur, mit der du jeden Deal einordnest: Fakten zuerst (wer, was, wie viel, wann). Dann die strategische Logik aus Sicht beider Parteien — warum ergibt der Deal für Käufer UND Verkäufer Sinn? Dann deine eigene Einschätzung, ob es ein guter Deal ist, mit Begründung. Und wenn möglich: die Verbindung zu einem größeren Markttrend.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Nur mit Bewertung argumentieren, ohne Katalysator',
      paragraphs: [
        'Die Falle: einen Pitch nur auf „die Aktie ist billig" stützen, ohne zu sagen, WAS den Markt dazu bringen soll, das zu erkennen und den Kurs neu zu bewerten.',
        'Billige Aktien können auf unbestimmte Zeit billig bleiben, ohne einen Auslöser. Ein Interviewer, der „warum jetzt?" fragt, testet genau diesen Punkt — nicht ob du eine Bewertungslücke findest, sondern ob du weißt, was sie schließt.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l13-drill1',
      prompt: 'Ein Pitch, der nur sagt „die Aktie ist unterbewertet gegenüber Peers", ohne einen Katalysator zu nennen — was fehlt?',
      options: [
        'Ein Grund, warum sich die Bewertungslücke JETZT schließen sollte',
        'Nichts, Bewertung allein reicht',
        'Eine noch genauere Bewertungsmethode',
        'Eine höhere Peer-Anzahl',
      ],
      correctIndex: 0,
      solution: 'Ohne Katalysator bleibt unklar, warum der Markt die Lücke gerade jetzt schließen sollte.',
      marcusCorrect: 'Richtig. Bewertung allein ist keine These, nur eine Beobachtung.',
      marcusWrong: 'Eine Bewertungslücke ist eine Beobachtung, keine These. Es fehlt der Katalysator — der konkrete Grund, warum sich diese Lücke gerade jetzt schließen sollte, nicht irgendwann.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l13-drill2',
      prompt: 'Der Interviewer fragt nach einem aktuellen Deal, den du nicht gut kennst. Beste Reaktion?',
      options: [
        'Ehrlich sagen, dass du diesen Deal nicht im Detail verfolgt hast, und stattdessen die allgemeine Dynamik ähnlicher Deals einordnen oder gezielt nachfragen',
        'Details erfinden, die plausibel klingen',
        'Das Thema wechseln, ohne es anzusprechen',
        'Sagen, dass solche Fragen unfair sind',
      ],
      correctIndex: 0,
      solution: 'Ehrlichkeit plus ein alternativer, kompetenter Beitrag wirkt stärker als geratene oder erfundene Details.',
      marcusCorrect: 'Richtig. Ehrlichkeit plus ein kompetenter Zusatzbeitrag schlägt jede geratene Antwort.',
      marcusWrong: 'Erfundene Details fliegen fast immer auf, sobald nachgehakt wird. Ehrlich zugeben, dass du den spezifischen Deal nicht kennst, und stattdessen die allgemeine Logik ähnlicher Deals einordnen oder gezielt nachfragen, wirkt kompetenter als ein Bluff.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Ohne vorbereiteten Pitch dastehen',
      paragraphs: [
        'Hab immer ein bis zwei Aktien parat, die du wirklich gut kennst — im Idealfall eine, die du selbst verfolgt, gehalten oder für ein Projekt analysiert hast. „Pitch me a stock" ohne jede Vorbereitung zu beantworten ist möglich, aber deutlich schwächer als ein Pitch, den du wirklich durchdacht hast.',
        'Das Ziel dieser Lektion ist nicht, dir eine Aktie zu geben, die du auswendig lernst — Märkte ändern sich, dieser Pitch wäre in sechs Monaten veraltet. Das Ziel ist die Struktur, die du auf deine EIGENE, aktuelle Idee anwendest.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 13 abgeschlossen.',
      marcus: {
        subject: 'Re: Struktur statt auswendig gelernter Fakten',
        body: 'Empfehlung zuerst, These mit Katalysator, ehrliche Reaktion auf unbekannte Deals — diese Struktur bleibt gültig, egal was gerade am Markt passiert. Als Nächstes: die Behavioral-Fragen, bei denen die meisten Kandidaten straucheln.',
      },
      next: { title: 'Die harten Behavioral-Fragen', meta: '9 Min · +45 XP' },
    },
  ],
};
