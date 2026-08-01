// K3 Lektion 2 — three sub-topics K2 deliberately skipped: Deferred Taxes,
// Stock-Based Comp, Minority Interest. Speed-Run anatomy, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK A · ACCOUNTING';

export const k3AccEdgeCases: MicroLessonData = {
  id: 'k3-acc-2-edge-cases',
  module: MODULE,
  titleDe: 'Die ausgelassenen Themen',
  topicTag: 'accounting-advanced',
  nextPath: '/lesson/k3-val-1-dcf-advanced',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Die ausgelassenen Themen',
      subtitle: 'Block A · Accounting, Advanced',
      marcus: {
        subject: 'Re: Drei Lücken, die auffallen',
        body: 'Deferred Taxes, Stock-Based Comp, Minority Interest — drei Themen, die in keinem ersten Call vorkommen und in jedem zweiten. Wer sie nicht kennt, fällt in der zweiten Runde auf, nicht in der ersten. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l2-diagnose',
      prompt: 'Stock-Based Compensation von 10 steht in der GuV. Wie wirkt sich das auf den Free Cash Flow aus, verglichen mit dem Net Income allein?',
      options: [
        'FCF liegt 10 höher als NI allein vermuten lässt — SBC wird wie D&A zurückaddiert',
        'Kein Effekt, SBC betrifft nur die GuV',
        'FCF liegt 10 niedriger, weil SBC eine echte Cash-Auszahlung ist',
        'SBC wird nur bei Verlust der Firma zurückaddiert',
      ],
      correctIndex: 0,
      solution: 'SBC ist ein Non-Cash-Aufwand wie D&A — wird im operativen Cashflow zurückaddiert.',
      marcusCorrect: 'Richtig, ohne Zögern. Advanced-Kern, direkt.',
      marcusWrong: 'SBC senkt das Net Income, aber es fließt kein Cash ab — Aktien oder Optionen, kein Geld. Wie Abschreibung: im Cash Flow Statement zurückaddieren. Die nächsten Slides holen das kompakt nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Stock-Based Comp in einem Satz',
      paragraphs: [
        'SBC ist Vergütung in Aktien oder Optionen statt in Cash. Sie senkt das Net Income wie jeder andere Personalaufwand, kostet die Firma aber kein Geld — deshalb Add-back im Cash Flow Statement, exakt wie D&A.',
        'Der Haken, den viele übersehen: SBC ist trotzdem ein echter ökonomischer Aufwand — für die bestehenden Aktionäre. Neue Aktien oder Optionen verwässern ihren Anteil. Für FCF wird sie zurückaddiert, für die Aktienzahl in Bewertungsmodellen nicht ignoriert.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Deferred Taxes in einem Satz',
      paragraphs: [
        'Der Steueraufwand in der GuV (Book Tax) und die tatsächlich gezahlten Steuern (Cash Tax) fallen oft auseinander — meist weil die Steuerbehörde schnellere Abschreibung erlaubt als die Bücher zeigen.',
        'Ist die Cash-Steuer niedriger als die Book-Steuer, entsteht eine **Deferred Tax Liability** — eine Steuerschuld, die erst später fällig wird. Die Veränderung dieser Position wird im Cash Flow Statement angepasst, um von der Book-GuV zur echten Cash-Bewegung zu kommen.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l2-refresh-check',
      prompt: 'Die Deferred Tax Liability einer Firma steigt um 8 (Book Tax höher als Cash Tax). Wie wirkt sich das auf den operativen Cash Flow aus?',
      options: ['+8, wie ein Add-back', '−8', 'Kein Effekt', 'Nur relevant bei Verlusten'],
      correctIndex: 0,
      solution: 'Steigende DTL heißt: weniger Cash-Steuer bezahlt, als die GuV ausweist — wird zurückaddiert.',
      marcusCorrect: 'Genau. Weniger tatsächlich gezahlt, als die GuV zeigt — Add-back.',
      marcusWrong: 'Eine steigende DTL bedeutet: Die Firma hat weniger Cash-Steuer bezahlt, als die GuV suggeriert. Der fehlende Betrag wird zurückaddiert: +8.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Minority Interest — die Richtung entscheidet',
      paragraphs: [
        "Zwei Situationen, die wie dasselbe klingen und genau gegenteilig behandelt werden. Situation eins: Ein Unternehmen hält **mehr als 50 %** einer Tochtergesellschaft und konsolidiert sie **voll** — 100 % von deren Umsatz, EBITDA, allem landet in den eigenen Zahlen, obwohl der Firma nur ein Teil davon wirtschaftlich gehört. Der Anteil der außenstehenden Minderheitsaktionäre wird unterhalb des Konzern-Nettoergebnisses als eigene Zeile abgezogen.",
        "Für EV/EBITDA folgt daraus: Das EBITDA im Nenner enthält bereits 100 % der Tochter. Also muss der Enterprise Value im Zähler ebenfalls 100 % widerspiegeln — der Marktwert des Minderheitsanteils wird zum EV **addiert**, genau wie Net Debt.",
        "Situation zwei ist das Gegenteil: Eine **Minderheitsbeteiligung unter 20 %** an einer anderen Firma, nicht konsolidiert — nur eine Zeile 'Equity in Earnings' oder Dividenden tauchen in der GuV auf, kein Umsatz, kein EBITDA der Beteiligung. Diese Beteiligung ist ein nicht-operativer Vermögenswert, wie Cash. Ihr Wert wird vom Enterprise Value **abgezogen**, um nur die eigentliche operative Bewertung zu isolieren.",
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l2-mi-direction',
      prompt: 'Ein Unternehmen konsolidiert eine 70 %-Tochter voll. Wie wird der Marktwert des 30 %-Minderheitsanteils im EV/EBITDA behandelt?',
      options: [
        'Zum Enterprise Value addiert',
        'Vom Enterprise Value abgezogen',
        'Ignoriert, da unter 50 % Fremdanteil',
        'Vom EBITDA abgezogen',
      ],
      correctIndex: 0,
      solution: 'Volle Konsolidierung: EBITDA enthält 100 % der Tochter, EV muss folgen — Minderheitsanteil wird addiert.',
      marcusCorrect: 'Richtig. Volle Konsolidierung, volle Anpassung im EV.',
      marcusWrong: 'Bei voller Konsolidierung steckt 100 % der Tochter im EBITDA. Damit EV/EBITDA konsistent bleibt, addierst du den Marktwert des Minderheitsanteils zum EV — dieselbe Logik wie bei Net Debt.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l2-mi-opposite',
      prompt: 'Ein Unternehmen hält eine nicht konsolidierte 15 %-Beteiligung an einer anderen Firma. Wie wird ihr Wert im EV/EBITDA behandelt?',
      options: [
        'Vom Enterprise Value abgezogen',
        'Zum Enterprise Value addiert',
        'Zum EBITDA addiert',
        'Gar nicht berücksichtigt',
      ],
      correctIndex: 0,
      solution: 'Kein Umsatz/EBITDA der Beteiligung im eigenen EBITDA — nicht-operativer Vermögenswert wie Cash, wird abgezogen.',
      marcusCorrect: 'Korrekt — genau die Gegenrichtung zur vollen Konsolidierung.',
      marcusWrong: 'Diese Beteiligung liefert kein EBITDA in die eigene GuV — sie ist ein nicht-operativer Vermögenswert wie Cash und wird vom EV abgezogen, um die operative Bewertung sauber zu halten.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Add vs. subtract verwechseln',
      paragraphs: [
        "Die Falle ist genau diese Verwechslung: **addieren, wenn abgezogen werden muss, oder umgekehrt.** Die Eselsbrücke, die im Call trägt: Frag dich, ob das EBITDA im Nenner die fremde Firma bereits enthält.",
        "Voll konsolidiert (>50 %, Kontrolle) → EBITDA enthält sie zu 100 % → Minderheitsanteil zum EV **addieren**. Nicht konsolidiert (<20 %, keine Kontrolle) → EBITDA enthält sie gar nicht → Beteiligungswert vom EV **abziehen**. Zwischen 20 % und 50 % (Equity Method) meist ebenfalls abziehen, da auch dort kein Umsatz/EBITDA konsolidiert wird.",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 02 abgeschlossen.',
      marcus: {
        subject: 'Re: Drei Lücken geschlossen',
        body: 'SBC als Non-Cash-Add-back, Deferred Tax als Book-zu-Cash-Brücke, Minority Interest in beide Richtungen sauber sortiert. Als Nächstes der DCF jenseits des Grundgerüsts: Unlevered gegen Levered FCF, und die Mid-Year Convention.',
      },
      next: { title: 'DCF, die Feinheiten', meta: '9 Min · +45 XP' },
    },
  ],
};
