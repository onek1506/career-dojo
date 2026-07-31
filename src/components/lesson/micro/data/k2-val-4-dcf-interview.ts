// K2 Lektion 9 — ported verbatim from docs/k2-sections/09-k2-val-4-dcf-interview.md (11 slides).

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK C · VALUATION';

export const k2ValDcfInterview: MicroLessonData = {
  id: 'k2-val-4-dcf-interview',
  module: MODULE,
  titleDe: 'Walk me through a DCF',
  topicTag: 'dcf',
  nextPath: '/lesson/k2-ma-1-accretion-dilution',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Walk me through a DCF',
      subtitle: 'Block C · Valuation',
      marcus: {
        subject: 'Re: Die Prüfungsfrage des Blocks',
        body: 'Drei Lektionen lang hast du Bausteine gefertigt: Free Cash Flow, WACC, Terminal Value. Heute fügt eine einzige Frage sie zusammen — die Prüfungsfrage des gesamten Valuation-Blocks. Sie fällt in praktisch jedem Gespräch, und sie ist die eine Frage, von der du heute schon weißt, dass sie kommt. Entsprechend wenig Nachsicht gibt es für eine wacklige Antwort. Die gute Nachricht: Du besitzt bereits jedes Teil. Heute wird nur noch montiert.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Ein leeres Blatt, 60 Sekunden',
      paragraphs: [
        "Der Wortlaut ist immer derselbe: **'Walk me through a DCF.'** Keine Zahlen, keine Vorgaben — der Interviewer reicht dir ein leeres Blatt. Er will keine Theoriestunde, keine Formelsammlung, keine Herleitung des Beta.",
        'Er will hören, ob du in rund 60 Sekunden vom ersten Cashflow bis zum Wert je Aktie kommst: richtige Reihenfolge, saubere Begriffe, keine Umwege. Diese Frage testet keine Überraschung. Sie testet Vorbereitung — vier Schritte, und keiner davon ist neu für dich.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Schritt 1 und 2: Projektion und Terminal Value',
      paragraphs: [
        'Schritt eins: **Unlevered Free Cash Flows für rund fünf Jahre projizieren.** Unlevered, damit der Cashflow allen Kapitalgebern gehört und zum WACC passt — die Herleitung hast du hinter dir, unser Wert: 50 Mio. €. Fünf Jahre, weil sich weiter kaum seriös planen lässt.',
        'Schritt zwei: für alles danach ein **Terminal Value** — entweder Gordon Growth mit einer ewigen Wachstumsrate oder ein Exit Multiple. Auch der steht schon: 1.020 Mio. €. Damit ist die gesamte Zukunft der Firma erfasst — fünf explizite Jahre plus der Rest in einer einzigen Zahl.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Schritt 3 und 4: Diskontieren und die Equity-Brücke',
      paragraphs: [
        'Schritt drei: **alles mit dem WACC auf heute diskontieren** — jeden der fünf Cashflows und den Terminal Value. Der TV steht am Ende von Jahr fünf, nicht heute; er wird mitdiskontiert, sonst überschätzt du den Wert massiv. Unsere Rate kennst du: 7,4 %. Die Summe aller Barwerte ist der **Enterprise Value**.',
        'Dann der Schritt, der im Interview am häufigsten fehlt, Schritt vier, die **Equity-Brücke**: Net Debt abziehen, das Ergebnis ist der **Equity Value**. Will der Interviewer den Aktienkurs, teilst du noch durch die Aktienanzahl — Wert je Aktie. Ein DCF endet nicht beim Enterprise Value. Er endet bei der Frage, was eine Aktie wert ist.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Das 60-Sekunden-Gerüst',
      paragraphs: [
        'So sagst du es auf — vier Schritte, vier Sätze, gut 60 Sekunden:',
        "**1.** 'First, I project unlevered free cash flows for about five years.'",
        "**2.** 'Beyond that, I estimate a terminal value — either with a perpetuity growth rate or an exit multiple.'",
        "**3.** 'I discount the cash flows and the terminal value back to today at the WACC — the sum is the enterprise value.'",
        "**4.** 'To get to equity value, I subtract net debt — and dividing by the share count gives the value per share.'",
        'Mehr gehört an dieser Stelle nicht in die Antwort. Welche Wachstumsrate, welches Multiple, wie der WACC zustande kommt — das sind Nachfragen, und die beantwortest du einzeln, wenn sie kommen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l9-order',
      prompt: 'Die FCFs sind projiziert, der Terminal Value steht. Was ist der nächste Schritt?',
      options: [
        'Alles mit dem WACC auf heute diskontieren',
        'Net Debt abziehen',
        'FCFs und Terminal Value direkt aufsummieren',
        'Durch die Aktienanzahl teilen',
      ],
      correctIndex: 0,
      solution: 'Erst diskontieren (Summe = Enterprise Value), dann erst die Equity-Brücke.',
      marcusCorrect: 'Korrekt. Erst diskontieren, dann brücken — die 1.020 aus Jahr fünf sind heute weniger wert.',
      marcusWrong: 'Undiskontiert addierst du Geld aus verschiedenen Jahren — das ergibt keine Bewertung, sondern eine Zahlenkolonne. Erst jeden FCF und den TV mit 7,4 % nach heute holen; die Summe ist der Enterprise Value. Die Brücke kommt danach.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l9-bridge',
      prompt: 'Dein DCF liefert den Enterprise Value. Der Interviewer will den Wert je Aktie. Der Weg?',
      options: [
        'Net Debt abziehen, dann durch die Aktienanzahl teilen',
        'Den EV direkt durch die Aktienanzahl teilen',
        'Net Debt addieren, dann durch die Aktienanzahl teilen',
        'Den Terminal Value abziehen, dann durch die Aktienanzahl teilen',
      ],
      correctIndex: 0,
      solution: 'EV − Net Debt = Equity Value, dann / Aktienanzahl.',
      marcusCorrect: 'Ja. EV − Net Debt = Equity Value — erst der gehört den Aktionären, und nur der wird durch die Aktienzahl geteilt.',
      marcusWrong: 'Der Enterprise Value gehört allen Kapitalgebern, auch den Gläubigern. Der Weg: EV − Net Debt = Equity Value, dann geteilt durch die Aktienanzahl. Wer den EV direkt teilt, verteilt rechnerisch das Geld der Banken an die Aktionäre.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l9-wacc-sens',
      prompt: "'What happens to your valuation if the WACC goes down?'",
      options: [
        'Der Wert steigt — jeder Barwert wird größer, der TV auch',
        'Der Wert sinkt — die Cashflows werden stärker abgezinst',
        'Nur der Terminal Value ändert sich',
        'Nichts — die Cashflows selbst bleiben ja gleich',
      ],
      correctIndex: 0,
      solution: 'Kleinerer Diskontsatz → größere Barwerte über alle Jahre und TV.',
      marcusCorrect: 'Korrekt. Kleinerer Diskontsatz, größere Barwerte — über alle fünf Jahre und den TV.',
      marcusWrong: 'Der WACC ist der Abzinsungssatz: Rate runter heißt weniger Abschlag, also Barwerte rauf — für jeden FCF und den TV gleichzeitig. WACC runter = Wert rauf, ohne Ausnahme.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l9-g-sens',
      prompt: "'And if you raise the terminal growth rate?'",
      options: [
        'Der Terminal Value steigt — und zieht das Gesamtergebnis deutlich mit',
        'Der Terminal Value sinkt — mehr Wachstum, mehr Risikoabschlag',
        'Nur die fünf projizierten FCFs steigen',
        'Kaum Effekt — g wirkt nur auf die explizite Phase',
      ],
      correctIndex: 0,
      solution: 'Gordon-Nenner WACC − g wird kleiner, TV steigt, dominiert den Gesamtwert.',
      marcusCorrect: 'Ja. Im Gordon-Nenner steht WACC − g: g rauf, Nenner kleiner, TV rauf. Und weil der TV den Löwenanteil des Werts stellt, bewegt sich das Gesamtergebnis spürbar.',
      marcusWrong: 'Der Gordon-Nenner ist WACC − g. Steigt g, schrumpft der Nenner und der TV steigt — bei einem WACC von 7,4 % reagiert das kräftig. Die fünf expliziten FCFs bleiben davon unberührt.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Drei Arten zu scheitern',
      paragraphs: [
        "Drei Fallen, alle vermeidbar. **Erstens: beim Enterprise Value stehen bleiben.** Der häufigste Fehler überhaupt — das Gerüst läuft sauber bis Schritt drei, dann Stille, und der Interviewer fragt trocken: **'So what's it worth per share?'** Die Equity-Brücke gehört unaufgefordert in die Antwort.",
        "**Zweitens: Sensitivitäten nicht parat haben.** Wer bei 'WACC goes down?' erst überlegen muss, entwertet das ganze Gerüst davor. WACC runter, Wert rauf; g rauf, TV rauf — beides muss kommen wie ein Reflex.",
        "**Drittens die Nachfrage, die fast sicher kommt: 'What are the weaknesses of a DCF?'** Kein Vortrag nötig, ein Satz reicht: **'It's very sensitive to its assumptions — growth rate, WACC, the projections themselves — and the terminal value usually drives most of the result.'** Wer die Schwächen der eigenen Methode benennen kann, klingt, als hätte er sie schon benutzt. Genau diesen Eindruck willst du hinterlassen.",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 09 abgeschlossen.',
      marcus: {
        subject: 'Re: Valuation interviewfest',
        body: 'Bausteine, Zusammenbau, Sensitivitäten, Schwächen — der Valuation-Block ist damit interviewfest. Als Nächstes wechseln wir das Terrain: M&A, und die Frage, ob ein Zukauf den Gewinn je Aktie hebt oder verwässert.',
      },
      next: { title: 'Accretion / Dilution', meta: '8 Min · +45 XP' },
    },
  ],
};
