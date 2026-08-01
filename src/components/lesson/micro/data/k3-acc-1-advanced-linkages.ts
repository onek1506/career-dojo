// K3 Lektion 1 — Speed-Run anatomy: Eingangs-Diagnose (skip-capable) ->
// compact Auffrischung (only for those who need it) -> Advanced-Kern ->
// Fallen-Drill -> Edge Case -> Retention. K3 voice: British-dry, zero
// hand-holding, fachlich kompromisslos, never personal.
// Skip target: slide index 5 (Advanced-Kern intro).

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK A · ACCOUNTING';

export const k3AccAdvancedLinkages: MicroLessonData = {
  id: 'k3-acc-1-advanced-linkages',
  module: MODULE,
  titleDe: 'Mehrere Bewegungen gleichzeitig',
  topicTag: 'three-statements',
  nextPath: '/lesson/k3-acc-2-edge-cases',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Mehrere Bewegungen gleichzeitig',
      subtitle: 'Block A · Accounting, Advanced',
      marcus: {
        subject: 'Re: Eine Änderung reicht nicht mehr',
        body: 'Eine einzelne Positionsänderung durch die drei Statements ziehen — das ist die Einstiegshürde, nicht das Ziel. Im Full-Time-Interview kommen zwei oder drei Bewegungen gleichzeitig, und du hast keine Zeit, sie nacheinander abzuarbeiten. Erst die Testfrage. Wer sie im ersten Versuch trifft, überspringt die Auffrischung.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l1-diagnose',
      prompt: 'CapEx steigt um 20, Abschreibung steigt um 10, im selben Jahr, Steuersatz 30 %. Wie verändert sich der Cash-Bestand?',
      options: ['−17', '−10', '−20', '0'],
      correctIndex: 0,
      solution: 'Nur die Abschreibung trifft die GuV: NI −7. CFO = −7 + 10 = +3. CFI = −20. Netto: 3 − 20 = −17.',
      marcusCorrect: 'Richtig, ohne Umweg. Weiter zum Kern — die Auffrischung brauchst du nicht.',
      marcusWrong: 'CapEx berührt die GuV nicht, nur die Abschreibung. NI sinkt um 10 × 0,7 = 7. CFO = −7 + 10 (Add-back) = +3. CFI = −20 (voller Kaufpreis). Netto: 3 − 20 = −17. Nächste zwei Slides holen das nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Warum CapEx nicht in der GuV steht',
      paragraphs: [
        'Kurz und ohne Wiederholungsschleife, weil du es beim zweiten Anlauf trotzdem brauchst: CapEx ist ein Aktivtausch. Cash raus, Anlagevermögen rauf — kein Aufwand, kein GuV-Effekt.',
        'Abschreibung ist das Gegenteil: reiner GuV-Aufwand, aber nicht zahlungswirksam. Sie taucht in der GuV auf, verlässt aber nie das Konto.',
        'Zwei Bewegungen, zwei komplett verschiedene Mechaniken — genau deshalb kollidieren sie in derselben Frage.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die Rechnung im Detail',
      paragraphs: [
        'CapEx 20, Abschreibung 10, Steuersatz 30 %. GuV: Vorsteuerergebnis −10 (nur die Abschreibung), Steuern −3, Net Income −7.',
        'Cash Flow: Start bei −7, Abschreibung als Non-Cash-Posten zurück: +10 → operativer Cashflow +3. Investing: −20, der volle CapEx-Betrag.',
        'Netto-Cash-Veränderung: 3 − 20 = **−17**. Bilanz: PP&E netto +10 (20 rein, 10 raus), Cash −17, Aktiva netto −7, Gewinnrücklagen −7. Es geht auf.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l1-refresh-check',
      prompt: 'CapEx 30, Abschreibung 12, Steuersatz 25 %. Netto-Cash-Veränderung?',
      options: ['−27', '−30', '−12', '−9'],
      correctIndex: 0,
      solution: 'NI −9 (12×0,75). CFO = −9+12 = +3. CFI = −30. Netto: 3−30 = −27.',
      marcusCorrect: 'Sitzt. Weiter zum eigentlichen Thema.',
      marcusWrong: 'Dieselbe Kette: NI = −12×0,75 = −9. CFO = −9+12 = +3. CFI = −30. Netto: 3−30 = −27.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Jetzt wird kombiniert',
      paragraphs: [
        'Zwei Bewegungen sind der Aufwärmteil. Ein Interviewer, der testen will, ob du wirklich verstehst statt auswendig gelernt hast, gibt dir drei — und lässt dich raten, in welcher Reihenfolge du sie sortierst.',
        'Die Reihenfolge ist egal. Was zählt: Jede Position einzeln der richtigen Statement-Zeile zuordnen, dann addieren. Kein Trick, nur Disziplin unter Zeitdruck.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Drei Bewegungen, ein Durchgang',
      paragraphs: [
        "Frage: **'Inventory increases by 15, paid in cash. CapEx increases by 25. Depreciation increases by 12. Tax rate 25%. Walk me through the net cash impact.'**",
        'GuV-relevant ist nur die Abschreibung: Vorsteuer −12, Steuern −3, Net Income −9.',
        'Cash Flow, operativ: NI −9, plus Abschreibung zurück +12, minus die Lagerzunahme −15 (Working Capital) = **−12**. Investing: −25 (CapEx). Netto: −12 − 25 = **−37**.',
        'Bilanz: Cash −37, Inventory +15, PP&E netto +13 (25−12). Aktiva netto: −37+15+13 = −9. Gewinnrücklagen −9. Balanciert.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l1-advanced-case',
      prompt: 'Inventory +18 (bar bezahlt), CapEx +30, Abschreibung +15, Steuersatz 20 %. Operativer Cash Flow (ohne Investing)?',
      options: ['−15', '−3', '+3', '−33'],
      correctIndex: 0,
      solution: 'NI = −15×0,8 = −12. CFO = −12 + 15 − 18 = −15.',
      marcusCorrect: 'Korrekt. Drei Bewegungen, ein Durchgang, kein Zögern.',
      marcusWrong: 'NI = −15 × 0,8 = −12. Dazu die Abschreibung zurück: +15. Dann die Lagerzunahme raus: −18. −12+15−18 = −15.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: "'CapEx gleich Abschreibung — dann bleibt Cash unverändert.' Falsch.",
      paragraphs: [
        'Die Intuition, die fast jeden erwischt: Wenn CapEx genauso hoch ist wie die Abschreibung, hebt sich das doch auf — PP&E bleibt netto gleich, also bleibt auch Cash unberührt. Klingt sauber. Ist falsch.',
        'Die allgemeine Formel aus deinen bisherigen Rechnungen: **Netto-Cash-Effekt = (Abschreibung × Steuersatz) − CapEx.** Setz CapEx = Abschreibung = X ein: X×t − X = **−X×(1−t)**. Nicht null — außer der Steuersatz wäre 100 %.',
        'Der Grund: CapEx ist ein voller Vorsteuer-Cashabfluss. Die Abschreibung spart nur den Steueranteil davon. Gleiche Höhe heißt nicht gleicher Cash-Effekt — das ist der Punkt, an dem sich zeigt, ob du die Mechanik verstanden hast oder nur die Fälle auswendig kennst.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l1-drill1',
      prompt: 'CapEx 10, Abschreibung 10 (gleiche Höhe), Steuersatz 40 %. Netto-Cash-Effekt?',
      options: ['−6', '0', '−10', '+4'],
      correctIndex: 0,
      solution: 'D×t − C = 10×0,4 − 10 = 4 − 10 = −6.',
      marcusCorrect: 'Richtig — nicht null. Genau die Falle, die gerade beschrieben wurde.',
      marcusWrong: 'Formel: D×t − C. 10×0,4 − 10 = 4 − 10 = −6. Gleiche Höhe heißt nicht neutral.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l1-drill2',
      prompt: 'CapEx 20, Abschreibung 20, Steuersatz 30 %. Netto-Cash-Effekt?',
      options: ['−14', '0', '−6', '−20'],
      correctIndex: 0,
      solution: 'D×t − C = 20×0,3 − 20 = 6 − 20 = −14.',
      marcusCorrect: 'Sauber. Skaliert genauso wie erwartet.',
      marcusWrong: '20×0,3 − 20 = 6 − 20 = −14. Derselbe Mechanismus, größere Zahlen.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l1-drill3',
      prompt: 'Cash fällt um 22, Abschreibung ist 20, Steuersatz 20 %. Wie hoch ist CapEx?',
      options: ['26', '22', '18', '30'],
      correctIndex: 0,
      solution: 'D×t − C = −22 → 20×0,2 − C = −22 → 4 − C = −22 → C = 26.',
      marcusCorrect: 'Korrekt — rückwärts gerechnet genauso zuverlässig wie vorwärts.',
      marcusWrong: 'Formel umstellen: D×t − C = −22. 4 − C = −22. C = 26.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn CapEx dauerhaft unter der Abschreibung liegt',
      paragraphs: [
        'Eine Anschlussfrage, die gern kommt: Was bedeutet es, wenn CapEx über mehrere Jahre konsequent niedriger ist als die Abschreibung?',
        'Das Anlagevermögen schrumpft netto — die Firma ersetzt ihre Substanz langsamer, als sie verschleißt. Kurzfristig sieht der Free Cash Flow dadurch besser aus, weil wenig investiert wird. Das ist kein gutes Zeichen, sondern ein Warnsignal: unterinvestiert, und der heutige FCF ist nicht das, was langfristig zu erwarten ist.',
        'In einer DCF-Projektion setzt man deshalb im Terminal-Jahr meist CapEx ≈ Abschreibung an — sonst modellierst du ein Unternehmen, das sich selbst aufzehrt.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 01 abgeschlossen.',
      marcus: {
        subject: 'Re: Kombinieren statt einzeln abarbeiten',
        body: 'Zwei, drei Bewegungen gleichzeitig, die Gleichheits-Falle entschärft, das Unterinvestitions-Signal erkannt. Als Nächstes die Themen, die K2 bewusst ausgelassen hat: Deferred Taxes, Stock-Based Comp, Minority Interest.',
      },
      next: { title: 'Die ausgelassenen Themen', meta: '9 Min · +45 XP' },
    },
  ],
};
