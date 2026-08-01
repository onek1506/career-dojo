// K3 Lektion 10 — IRR vs. MOIC, Value Creation Bridge. Speed-Run, skip: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK D · LBO';

export const k3LboReturnsDrivers: MicroLessonData = {
  id: 'k3-lbo-2-returns-drivers',
  module: MODULE,
  titleDe: 'IRR, MOIC und die Value Creation Bridge',
  topicTag: 'lbo',
  nextPath: '/lesson/k3-lbo-3-edge-cases',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'IRR, MOIC und die Value Creation Bridge',
      subtitle: 'Block D · LBO, Advanced',
      marcus: {
        subject: 'Re: Zwei Kennzahlen, ein Ergebnis, zwei Geschichten',
        body: 'MOIC sagt, um welchen Faktor sich das Geld vermehrt hat. IRR sagt, wie schnell. Beides aus demselben Deal, und sie können sehr unterschiedliche Bilder zeichnen. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l10-diagnose',
      prompt: 'Fonds A erzielt 2,5x MOIC in 3 Jahren. Fonds B erzielt ebenfalls 2,5x MOIC, aber in 6 Jahren. Welcher hat den höheren IRR?',
      options: ['Fonds A', 'Fonds B', 'Beide identisch', 'Kommt auf den Einstiegsmultiple an'],
      correctIndex: 0,
      solution: 'Gleiches MOIC über kürzere Zeit annualisiert sich zu deutlich höherem IRR.',
      marcusCorrect: 'Richtig, ohne zu rechnen. Weiter zur vollständigen Bridge.',
      marcusWrong: 'MOIC ignoriert Zeit komplett, IRR annualisiert. 2,5x in 3 Jahren ≈ 36 % IRR, 2,5x in 6 Jahren ≈ 16 % IRR — gleicher Multiple, sehr unterschiedliches Tempo.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Was IRR wirklich misst',
      paragraphs: [
        'MOIC (Multiple of Invested Capital) ist simpel: Exit-Erlös geteilt durch eingesetztes Kapital. Zeit spielt keine Rolle. IRR dagegen ist die annualisierte Rendite — sie bestraft eine lange Haltedauer, selbst bei gleichem MOIC.',
        'Formel für die Umrechnung: IRR ≈ MOIC^(1/Jahre) − 1.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die genauen Zahlen',
      paragraphs: [
        '2,5x über 3 Jahre: 2,5^(1/3) − 1 ≈ 1,357 − 1 = **35,7 %**. 2,5x über 6 Jahre: 2,5^(1/6) − 1 ≈ 1,165 − 1 = **16,5 %**.',
        'Gleicher MOIC, mehr als doppelt so hoher IRR bei der Hälfte der Zeit. Wer nur nach MOIC filtert, übersieht diesen Unterschied komplett.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l10-refresh-check',
      prompt: 'Bekannte Faustregel: 3,0x über 5 Jahre entspricht ungefähr welcher IRR?',
      options: ['≈25 %', '≈15 %', '≈35 %', '≈45 %'],
      correctIndex: 0,
      solution: 'Standard-Faustregel: 2,0x/5 Jahre ≈ 15 %, 3,0x/5 Jahre ≈ 25 %.',
      marcusCorrect: 'Sitzt noch.',
      marcusWrong: 'Die Standard-Faustregel: 2,0x über 5 Jahre ≈ 15 % IRR, 3,0x über 5 Jahre ≈ 25 % IRR.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Die Value Creation Bridge — vollständig zerlegt',
      paragraphs: [
        'Entry: EBITDA 50, Multiple 8,0x → EV 400. Finanzierung 60 % Debt (240), Equity 160. Exit nach 5 Jahren: EBITDA 70, Multiple 9,0x → Exit-EV 630. Schuld auf 100 getilgt → Exit-Equity 630−100 = **530**.',
        'Gesamte Wertschöpfung: 530−160 = **370**. Zerlegt in drei Treiber:',
        '**Schuldentilgung**: Anfangsschuld − Endschuld = 240−100 = **140**. **EBITDA-Wachstum** (zum Entry-Multiple bewertet): (70−50)×8,0 = **160**. **Multiple Expansion** (auf das Exit-EBITDA bewertet): (9,0−8,0)×70 = **70**.',
        'Summe: 140+160+70 = **370** — deckt sich exakt mit der Gesamtwertschöpfung. Das ist die Struktur, die ein Interviewer sehen will, wenn er „walk me through the value creation bridge" fragt.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l10-bridge-check',
      prompt: 'Entry: EBITDA 50, 8,0x. Exit: EBITDA 65, 8,5x, Exit-Schuld 120 (Anfangsschuld 240). Beitrag aus EBITDA-Wachstum zur Wertschöpfung?',
      options: ['120', '150', '90', '160'],
      correctIndex: 0,
      solution: 'EBITDA-Wachstum zum Entry-Multiple: (65−50)×8,0 = 15×8 = 120.',
      marcusCorrect: 'Korrekt. Immer zum ENTRY-Multiple bewertet, nicht zum Exit-Multiple.',
      marcusWrong: 'EBITDA-Wachstum wird zum Entry-Multiple bewertet: (65−50)×8,0 = 15×8 = 120.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Multiple Expansion als verlässlichen Treiber einplanen',
      paragraphs: [
        'Die Falle: im Interview so tun, als wäre „wir verkaufen zu einem höheren Multiple" ein solider, planbarer Teil der Return-These. Erfahrene Investoren sehen das anders.',
        'Multiple Expansion hängt vom Markt zum Exit-Zeitpunkt ab — außerhalb der Kontrolle des Fonds. Seriöse Deal-Modelle unterstellen konservativ ein FLACHES oder sogar rückläufiges Multiple und stützen sich primär auf Schuldentilgung und EBITDA-Wachstum — die beiden Treiber, die operativ beeinflussbar sind.',
        'Wer im Interview stark auf Multiple Expansion setzt, signalisiert fehlendes Risikoverständnis — genau das, was diese Frage eigentlich testet.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l10-drill1',
      prompt: 'Welche zwei Treiber gelten als am ehesten kontrollierbar und werden von erfahrenen Investoren bevorzugt als Basis für die Return-These genutzt?',
      options: [
        'Schuldentilgung und EBITDA-Wachstum',
        'Multiple Expansion und Schuldentilgung',
        'Nur Multiple Expansion',
        'Keiner ist wirklich kontrollierbar',
      ],
      correctIndex: 0,
      solution: 'Schuldentilgung und operatives Wachstum sind beeinflussbar, Multiple Expansion ist marktabhängig.',
      marcusCorrect: 'Richtig. Die zwei Treiber, die man selbst in der Hand hat.',
      marcusWrong: 'Schuldentilgung und EBITDA-Wachstum lassen sich operativ beeinflussen. Multiple Expansion hängt vom Marktumfeld beim Exit ab — außerhalb der Kontrolle des Fonds.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l10-drill2',
      prompt: 'Entry: EBITDA 40, 6,0x, Debt 150, Equity 90. Exit: EBITDA 55, 7,0x, Exit-Debt 60. Beitrag aus Schuldentilgung zur Wertschöpfung?',
      options: ['90', '85', '95', '80'],
      correctIndex: 0,
      solution: 'Schuldentilgung = 150−60 = 90.',
      marcusCorrect: 'Sauber, die einfachste der drei Komponenten.',
      marcusWrong: 'Schuldentilgungs-Beitrag = Anfangsschuld − Endschuld = 150 − 60 = 90.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn sich die Haltedauer verlängert',
      paragraphs: [
        'Zurück zum Diagnose-Beispiel: 2,5x MOIC. Über 3 Jahre ≈36 % IRR, über 6 Jahre ≈16 %. Zieht sich der Exit weiter auf 10 Jahre, bei gleichem 2,5x: IRR ≈ 2,5^(1/10)−1 ≈ **9,6 %**.',
        'Derselbe Erfolg, gemessen am Multiple — aber der IRR fällt von 36 % auf unter 10 %, nur durch Zeit. Zeit ist der stille Renditekiller, den MOIC allein nicht zeigt.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 10 abgeschlossen.',
      marcus: {
        subject: 'Re: Return-Treiber, sauber zerlegt',
        body: 'IRR gegen MOIC, die vollständige Value Creation Bridge, und warum Multiple Expansion kein Plan ist. Als Nächstes die unbequemen LBO-Fragen: Dividend Recaps, Add-ons, und der Klassiker aller Modellierungsfragen — Zirkularität.',
      },
      next: { title: 'Die unbequemen LBO-Fragen', meta: '9 Min · +50 XP' },
    },
  ],
};
