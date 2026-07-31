// K2 Lektion 5 — ported verbatim from docs/k2-sections/05-k2-ev-2-multiples.md (11 slides).

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK B · EV & MULTIPLES';

export const k2EvMultiples: MicroLessonData = {
  id: 'k2-ev-2-multiples',
  module: MODULE,
  titleDe: 'EV/EBITDA vs. P/E',
  topicTag: 'ev-equity',
  nextPath: '/lesson/k2-val-1-dcf-mechanik',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'EV/EBITDA vs. P/E',
      subtitle: 'Block B · EV & Multiples',
      marcus: {
        subject: 'Re: Wofür Multiples da sind',
        body: 'Umrechnen kannst du jetzt. Diese Lektion zeigt, wofür ein Analyst die beiden Größen den ganzen Tag benutzt: Multiples. Zwei Firmen, gleiche Branche. Firma A ist für einen Enterprise Value von 800 Mio. € zu haben, Firma B für 900 Mio. € — beide verdienen 100 Mio. € EBITDA. Welche ist teurer? Die Rechnung ist trivial, und genau deshalb prüft der Interviewer etwas anderes: ob du weißt, welcher Zähler zu welchem Nenner gehört. An dieser Zuordnung wird aussortiert, nicht am Dividieren.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Die Zuordnungsfrage',
      paragraphs: [
        "Die Multiple-Frage fällt selten als Definitionsfrage. Sie fällt so: **'Why can't you use EV/Net Income?'** Wer Multiples nur als Liste auswendig gelernt hat, ist hier fertig — die Frage testet, ob du weißt, wem welche Zahl in der GuV gehört.",
        'Die Antwort steckt in einer einzigen Regel, und diese Regel trägt jede Multiple-Frage, die dir in einem Interview begegnen wird.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die Konsistenzregel',
      paragraphs: [
        'Die Regel: **Zähler und Nenner müssen denselben Kapitalgebern gehören.** Alles, was in der GuV vor den Zinsen steht — Revenue, EBITDA, EBIT — ist noch nicht zwischen Gläubigern und Aktionären aufgeteilt. Diese Größen erwirtschaftet das ganze Unternehmen für alle Kapitalgeber, also passen sie zum Enterprise Value.',
        'Alles nach Zinsen — Net Income, EPS — bleibt übrig, nachdem die Gläubiger bedient sind, und gehört allein den Aktionären: Es passt zum Equity Value, auf Aktienebene zum Kurs. EV/Net Income bricht die Regel — oben der Preis für das ganze Unternehmen samt Schulden, unten ein Gewinn, aus dem die Zinsen längst raus sind.',
        'Je nach Verschuldung fällt der Nenner anders aus, ohne dass sich am Geschäft irgendetwas ändert: Als Vergleichsmaßstab ist die Zahl wertlos. Den Spiegelfehler gibt es auch — Equity Value durch EBITDA. Gleiche Regel, in die andere Richtung gebrochen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: '8,0x gegen 9,0x — und was P/E misst',
      paragraphs: [
        'Jetzt mit Zahlen. Firma A: EV 800 Mio. €, EBITDA 100 Mio. € — 800 / 100 = **8,0x**. Firma B: EV 900 Mio. €, gleiches EBITDA — **9,0x**. B ist teurer bewertet: neun Euro Preis je Euro EBITDA statt acht.',
        'Und weil beide Größen vor der Finanzierung ansetzen, ist EV/EBITDA **kapitalstrukturneutral** — ob A schuldenfrei ist und B hochverschuldet, ändert an 8,0x gegen 9,0x nichts. Deshalb ist es das Standardwerkzeug für Peer-Vergleiche und M&A.',
        'Das P/E ist das saubere Gegenstück auf der Aktionärsebene: Kurs 60 €, EPS 5 € — 60 / 5 = **12x**. Zwölf Euro Preis je Euro Gewinn, der bei den Aktionären ankommt. Beide Multiples sind regelkonform, sie beantworten nur verschiedene Fragen: EV/EBITDA bepreist das Geschäft, P/E bepreist den Anteil der Aktionäre daran — nach Zinsen, nach Kapitalstruktur.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Die Konsistenzregel in zwei Sätzen',
      paragraphs: [
        "Die Antwort auf **'Why can't you use EV/Net Income?'** ist die Regel in zwei Sätzen — mehr Zeit bekommst du dafür nicht:",
        "**1.** 'Enterprise value represents all investors, so it has to sit on top of metrics before interest — revenue, EBITDA, EBIT.'",
        "**2.** 'Net income is after interest and belongs only to shareholders, so it pairs with equity value — EV over net income mixes the claims of two different investor groups.'",
        'Zwei Sätze: Regel genannt, Fehler benannt. Dieselben zwei Sätze beantworten nebenbei jede Zuordnungsfrage, die als Nachfrage kommt — und die drillen wir jetzt.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l5-calc',
      prompt: 'Firma A: EV 800 Mio. €, EBITDA 100 Mio. €. Firma B: EV 900 Mio. €, EBITDA 100 Mio. €. Was stimmt?',
      options: [
        'A liegt bei 8,0x, B bei 9,0x — B ist teurer bewertet',
        'A liegt bei 8,0x, B bei 9,0x — A ist teurer bewertet',
        'Beide sind gleich bewertet, dasselbe EBITDA',
        'Ohne Steuersatz nicht zu beantworten',
      ],
      correctIndex: 0,
      solution: '800 / 100 = 8,0x; 900 / 100 = 9,0x. Höheres Multiple = teurer.',
      marcusCorrect: 'Korrekt. 800 / 100 gegen 900 / 100 — mehr Preis für dasselbe EBITDA, B ist teurer.',
      marcusWrong: 'EV durch EBITDA: A = 800 / 100 = 8,0x, B = 900 / 100 = 9,0x. Das höhere Multiple ist die teurere Bewertung. Ein Steuersatz kommt in dieser Rechnung nicht vor.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l5-broken',
      prompt: 'Vier Kennzahlen liegen auf dem Tisch: EV/EBITDA, Kurs/EPS, EV/Revenue, EV/Net Income. Welche ist konstruktionsbedingt unbrauchbar?',
      options: ['EV/Net Income', 'EV/EBITDA', 'Kurs/EPS', 'EV/Revenue'],
      correctIndex: 0,
      solution: 'EV oben (alle Kapitalgeber), Net Income unten (nur Aktionäre) — Mismatch.',
      marcusCorrect: 'Ja. Oben alle Kapitalgeber, unten nur die Aktionäre. Die anderen drei halten die Ebenen sauber.',
      marcusWrong: 'Zieh die Zinsgrenze: Revenue und EBITDA stehen vor Zinsen — EV-Ebene. EPS steht nach Zinsen — Equity-Ebene, und der Kurs ist Equity. Nur EV/Net Income mischt die Ebenen.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l5-mirror',
      prompt: "Ein Kommilitone baut für seine Comps-Tabelle 'Equity Value / EBITDA'. Dein Urteil?",
      options: [
        'Mismatch — EBITDA steht allen Kapitalgebern zu, der Equity Value nur den Aktionären',
        'Sauber — beide Größen stehen vor Zinsen',
        'Sauber — Hauptsache, alle Firmen werden gleich gerechnet',
        'Mismatch — EBITDA ist eine Nach-Zinsen-Größe',
      ],
      correctIndex: 0,
      solution: 'Spiegelfehler zu EV/Net Income: Zähler ohne Schulden, Nenner mit.',
      marcusCorrect: 'Korrekt, der Spiegelfehler zu EV/Net Income: Der Zähler lässt die Schulden weg, im Nenner stecken sie drin.',
      marcusWrong: 'EBITDA steht vor Zinsen und gehört zur EV-Ebene. Equity Value darüber heißt: Schulden fehlen oben, stecken aber unten mit drin. Bei unterschiedlich verschuldeten Firmen verzerrt das jeden Vergleich — egal wie konsequent man es anwendet.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Wann P/E?',
      paragraphs: [
        "Meist direkt hinterher kommt: **'When would you use P/E instead of EV/EBITDA?'** Die Antwort hat zwei akzeptierte Teile. Erstens, das Pflichtbeispiel: **Banken und Versicherungen.** Dort sind Zinsen kein Finanzierungsdetail, sondern das Kerngeschäft — Zinsertrag ist Umsatz. EBITDA und EV lassen sich dort sinnvoll gar nicht abgrenzen, also bewertet man Finanzinstitute auf der Equity-Ebene, mit P/E und Price/Book.",
        'Zweitens: **wenn bewusst die Aktionärsperspektive zählt** — etwa bei Peers mit ähnlicher Kapitalstruktur, wo der Leverage-Unterschied klein ist und das P/E die schnellste, meistzitierte Größe ist. Sobald sich die Verschuldung der Vergleichsfirmen deutlich unterscheidet — oder ein Käufer das ganze Unternehmen übernimmt — führt an EV/EBITDA kein Weg vorbei.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Gleiches P/E heißt nicht gleich bewertet',
      paragraphs: [
        'Die Falle dieses Themas: **zwei Firmen mit identischem P/E für gleich bewertet halten.** Beide stehen bei 12x — sieht nach demselben Preis aus. Aber das P/E zeigt nur Kurs und Gewinn nach Zinsen; wie viel Schulden dazwischenhängen, zeigt es nicht.',
        "Die eine Firma kann schuldenfrei sein, die andere hochverschuldet — gleiches P/E, komplett anderes Risiko, komplett anderer Preis für das Geschäft dahinter. Interviewer bauen das gern als harmlosen Vergleich ein und warten, ob 'gleich bewertet' kommt.",
        "Die Antwort, die den Punkt holt: **'Same P/E doesn't mean same valuation — I'd check EV/EBITDA, because leverage distorts the comparison.'** P/E versteckt die Kapitalstruktur. EV/EBITDA rechnet sie raus — deshalb existieren beide.",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 05 abgeschlossen.',
      marcus: {
        subject: 'Re: Multiples sitzen',
        body: 'Konsistenzregel, zwei saubere Multiples, zwei kaputte — damit übersteht man jede Zuordnungsfrage und liest eine Comps-Tabelle mit dem richtigen Misstrauen. Als Nächstes der Block, vor dem die meisten zu viel Respekt haben: der DCF. Der Reihe nach, Stück für Stück.',
      },
      next: { title: 'DCF: der Maschinenraum', meta: '8 Min · +40 XP' },
    },
  ],
};
