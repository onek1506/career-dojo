// K2 Lektion 11 — ported verbatim from docs/k2-sections/11-k2-ma-2-drill.md (11 slides).

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK D · M&A';

export const k2MaDrill: MicroLessonData = {
  id: 'k2-ma-2-drill',
  module: MODULE,
  titleDe: 'Cash, Stock, Debt im Drill',
  topicTag: 'ma',
  nextPath: '/lesson/k2-lbo-1-was-ist-lbo',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Cash, Stock, Debt im Drill',
      subtitle: 'Block D · M&A',
      marcus: {
        subject: 'Re: Und wie finanzierst du das?',
        body: "In der letzten Lektion stand am Ende ein Pro-forma-EPS. Im echten Call ist das der Moment, in dem der Interviewer nachlegt: **'And how would you finance it?'** Gleicher Deal, gleiche Zahlen — aber ob die 300 Mio. € aus der Kasse kommen, von der Bank oder aus neuen Aktien, entscheidet darüber, ob dein EPS steigt oder fällt. Heute rechnen wir denselben Deal dreimal durch.",
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Zwei Standard-Formulierungen',
      paragraphs: [
        "Zwei Standard-Formulierungen, gleiche Prüfung: **'Why would a company pay in stock vs. cash?'** und **'Rank the financing options by cost.'** Beides fragt dasselbe ab: ob du die drei Finanzierungswege nicht nur nennen, sondern durchrechnen und ordnen kannst.",
        'Das Setup kennst du: Acquirer mit 100 Mio. € Net Income und 50 Mio. Aktien — EPS 2,00 €. Das Target bringt 30 Mio. € Net Income, der Kaufpreis liegt bei 300 Mio. €, Steuersatz 30 %. Drei Wege, diese 300 zu bezahlen — und am Ende stehen drei verschiedene EPS.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Debt und eigenes Cash — zwei Wege, gleicher Nenner',
      paragraphs: [
        'Variante eins, Debt: 300 Mio. € Kredit zu 6 % — 18 Mio. € Zinsen im Jahr, nach Steuern 12,6: 18 × (1 − 0,3). Pro-forma-Net-Income: 100 + 30 − 12,6 = 117,4. Die Aktienzahl bleibt bei 50 Mio. EPS: 117,4 / 50 = **2,35 €** — accretive.',
        'Variante zwei, eigenes Cash: kein Kredit, aber die 300 verlassen das Konto und verzinsen sich nicht mehr. Bei 2 % Anlagezins entgehen der Firma 6 Mio. € Zinsertrag, nach Steuern 4,2 — im Call heißt das foregone interest. Pro-forma: 100 + 30 − 4,2 = 125,8. EPS: 125,8 / 50 = **2,52 €** — accretive, und stärker als die Debt-Variante: 2 % entgangener Zins sind billiger als 6 % gezahlter.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'All-Stock: der dritte Weg ändert den Nenner',
      paragraphs: [
        'Variante drei, Aktien: Der Acquirer bezahlt den Kaufpreis mit 20 Mio. neuen Aktien. Keine Zinsen, kein Cash-Abfluss — das kombinierte Net Income bleibt bei vollen 130. Aber jetzt teilen es 70 Mio. Aktien statt 50: 130 / 70 = **1,86 €**. Aus 2,00 € werden 1,86 € — dilutive.',
        'Gleiches Target, gleicher Preis, und der Deal kippt trotzdem. Der Preis der Aktienfinanzierung taucht in keiner GuV-Zeile auf: Er steckt im Nenner.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die Kostenreihenfolge',
      paragraphs: [
        'Damit steht die Rangfolge, die der Interviewer hören will — im normalen Zinsumfeld: **eigenes Cash < Debt < Stock.** Entgangener Anlagezins ist meist der billigste Posten, Kreditzins liegt darüber, und Aktien sind die teuerste Option — eine "teure Währung", weil jede neue Aktie ein dauerhafter Anteil an allen künftigen Gewinnen ist.',
        'Aber die Rangfolge ist nur die halbe Antwort: Cash und Debt erhöhen den Leverage, die billigen Optionen machen die Bilanz also riskanter. Genau deshalb zahlen Firmen trotzdem in Aktien — kein Cash-Abfluss, keine neue Verschuldung, und der Verkäufer trägt das Risiko des Deals mit. Wer beides nennen kann, Kosten und Risiko, beantwortet auch die Warum-Frage.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: '30-Sekunden-Gerüst',
      paragraphs: [
        'Die 30-Sekunden-Version: Reihenfolge zuerst, dann ein Grund pro Option.',
        "**1.** 'Cheapest is usually excess cash — the only cost is the after-tax interest you stop earning on it.'",
        "**2.** 'Debt comes next — after-tax interest is a real ongoing cost, and it adds leverage.'",
        "**3.** 'Stock is usually the most expensive — new shareholders get a permanent claim on future earnings, so EPS takes the biggest hit.'",
        "Und wenn du einen Satz drauflegen willst: 'That's the pure cost ranking — but cash and debt add risk, which is why many deals end up as a mix.' Vier Sätze, und du hast beide Fragen dieser Lektion beantwortet.",
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l11-debt',
      prompt: 'Der Deal wird komplett über Debt finanziert: 300 Mio. € zu 6 %, Steuersatz 30 %. Pro-forma-EPS?',
      options: ['2,35 €', '2,52 €', '2,60 €', '1,86 €'],
      correctIndex: 0,
      solution: 'Zinsen 300×6%=18, nach Steuern 12,6. NI 100+30−12,6=117,4. EPS 117,4/50=2,35.',
      marcusCorrect: 'Korrekt. 100 + 30 − 12,6 = 117,4, geteilt durch 50 Mio. Aktien. Weiter.',
      marcusWrong: 'Der Weg: Zinsen 300 × 6 % = 18, nach Steuern 12,6. NI: 100 + 30 − 12,6 = 117,4. EPS: 117,4 / 50 = 2,35 €.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l11-cash',
      prompt: 'Gleicher Deal, komplett aus der Kasse bezahlt. Entgangener Anlagezins 2 %, Steuersatz 30 %. Pro-forma-EPS?',
      options: ['2,52 €', '2,60 €', '2,35 €', '1,86 €'],
      correctIndex: 0,
      solution: 'Foregone interest 300×2%=6, nach Steuern 4,2. NI 100+30−4,2=125,8. EPS 125,8/50=2,52.',
      marcusCorrect: 'Ja. 100 + 30 − 4,2 = 125,8, durch 50 Mio. Aktien — die stärkste der drei Varianten.',
      marcusWrong: 'Eigenes Cash ist nicht gratis: 300 × 2 % = 6 entgangener Zins, nach Steuern 4,2. NI: 125,8. EPS: 125,8 / 50 = 2,52 €.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l11-stock',
      prompt: 'Gleicher Deal, all-stock mit 20 Mio. neuen Aktien. Pro-forma-EPS — und ist der Deal accretive oder dilutive?',
      options: ['1,86 € — dilutive', '2,60 € — accretive', '1,86 € — accretive', '2,00 € — neutral'],
      correctIndex: 0,
      solution: 'NI 130 / 70 Mio. Aktien = 1,86 € < 2,00 € Standalone-EPS → dilutive.',
      marcusCorrect: 'Korrekt. 130 / 70 = 1,86 €, unter den 2,00 € vor dem Deal. Damit sitzen alle drei Rechnungen.',
      marcusWrong: 'Das Net Income steigt auf 130, aber der Nenner auf 70 Mio.: 130 / 70 = 1,86 € — weniger als 2,00 €, also dilutive. Ohne die neuen Aktien im Nenner ist jede Stock-Rechnung falsch.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Stock ist nicht gratis',
      paragraphs: [
        "Die Falle dieser Lektion ist ein Satz, der sich im Call vernünftig anhört: **'Stock ist quasi gratis — es fließt ja kein Geld.'** Messbar falsch. Kein Euro verlässt die Firma, und trotzdem fällt das EPS von 2,00 € auf 1,86 €: Verwässerung ist der Preis, und anders als ein Kredit wird eine Aktie nie zurückgezahlt.",
        'Der zweithäufigste Fehler ist dieselbe Illusion mit der Kasse: eigenes Cash für kostenlos halten und die 4,2 entgangenen Zins unterschlagen. Merk dir: **Keine der drei Finanzierungen ist gratis. Der Unterschied ist nur, ob ihr Preis in der GuV steht — oder im Nenner.**',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 11 abgeschlossen.',
      marcus: {
        subject: 'Re: Rangfolge sitzt',
        body: 'Ein Deal, drei Finanzierungen, drei EPS — die Rangfolge kannst du jetzt rechnen statt raten. Als Nächstes der Begriff, der am häufigsten fällt, ohne verstanden zu werden: der LBO.',
      },
      next: { title: 'Was ein LBO ist', meta: '7 Min · +35 XP' },
    },
  ],
};
