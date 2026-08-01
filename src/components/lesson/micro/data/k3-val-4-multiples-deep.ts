// K3 Lektion 6 — LTM/NTM, Calendarization, wann welches Multiple.
// Speed-Run, skip target: 5. topicTag reuses K2's ev-equity bucket.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK B · VALUATION';

export const k3ValMultiplesDeep: MicroLessonData = {
  id: 'k3-val-4-multiples-deep',
  module: MODULE,
  titleDe: 'Multiples, die Feinheiten',
  topicTag: 'ev-equity',
  nextPath: '/lesson/k3-ma-1-accretion-dilution-deep',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Multiples, die Feinheiten',
      subtitle: 'Block B · Valuation, Advanced',
      marcus: {
        subject: 'Re: Zähler und Nenner müssen zum selben Datum gehören',
        body: 'EV/EBITDA rechnen kannst du. Die Frage, die K2 ausgelassen hat: Welches EBITDA — vergangen oder erwartet, und aus welchem Geschäftsjahr? Zwei Comps mit unterschiedlichen Bilanzstichtagen sind erst vergleichbar, wenn du das angleichst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l6-diagnose',
      prompt: 'Ein Comp hat Bilanzstichtag 30. Juni. FY endend Juni 2024: EBITDA 100. FY endend Juni 2025: EBITDA 140. Kalenderjahr-EBITDA für 2024 (Jan–Dez)?',
      options: ['120', '100', '140', '110'],
      correctIndex: 0,
      solution: 'Jan–Jun24 = 6/12 von FY24(100)=50. Jul–Dez24 = 6/12 von FY25(140)=70. Summe: 120.',
      marcusCorrect: 'Richtig, ohne Umweg. Weiter zu LTM gegen NTM.',
      marcusWrong: 'Erste Hälfte des Kalenderjahrs fällt in FY24 (6/12 von 100 = 50), zweite Hälfte in FY25 (6/12 von 140 = 70). 50 + 70 = 120. Nächste Slides holen das nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Warum Bilanzstichtage überhaupt ein Problem sind',
      paragraphs: [
        'Dein Zielunternehmen hat Bilanzstichtag 31. Dezember. Ein Comp hat Stichtag 30. Juni. Vergleichst du beide Multiples einfach nebeneinander, vergleichst du unterschiedliche Zeiträume — sechs Monate Versatz, in volatilen Branchen relevant.',
        '**Calendarization** löst das: Du rechnest den Comp so um, als hätte er denselben Bilanzstichtag wie dein Zielunternehmen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die Gewichtungsmethode',
      paragraphs: [
        'Nimm die zwei Geschäftsjahre, die das gewünschte Kalenderjahr überlappen, und gewichte nach Monatsanteil. Aus dem Diagnose-Beispiel: 6 Monate aus FY24 (50) plus 6 Monate aus FY25 (70) = **120**.',
        'Das Prinzip skaliert auf jeden Stichtag — bei einem Bilanzstichtag im März wären es andere Monatsanteile, aber dieselbe Logik.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l6-refresh-check',
      prompt: 'Ein Comp hat Bilanzstichtag 31. März. FY endend März 2024: EBITDA 80. FY endend März 2025: EBITDA 120. Kalenderjahr-EBITDA für 2024?',
      options: ['110', '100', '90', '120'],
      correctIndex: 0,
      solution: 'Jan–Mär24 (3/12 von 80) = 20. Apr–Dez24 (9/12 von 120) = 90. Summe: 110.',
      marcusCorrect: 'Genau. Andere Monatsanteile, gleiches Prinzip.',
      marcusWrong: 'Jan–März 2024 ist der letzte Teil des FY endend März 2024: 3/12 von 80 = 20. April–Dezember 2024 ist der erste Teil des FY endend März 2025: 9/12 von 120 = 90. 20 + 90 = 110.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'LTM gegen NTM',
      paragraphs: [
        'LTM (Last Twelve Months) nutzt die tatsächlichen, vergangenen zwölf Monate. NTM (Next Twelve Months) nutzt die geschätzten nächsten zwölf Monate. Beide beziehen sich auf dasselbe Unternehmen — aber auf unterschiedliche Zahlen.',
        'Beispiel: EV konstant bei 1.000. LTM-EBITDA 100 → LTM-Multiple 10,0x. Wächst das EBITDA um 20 % → NTM-EBITDA 120 → NTM-Multiple ≈ **8,3x**. Bei gleichbleibendem EV sinkt das Multiple, weil der Nenner wächst.',
        'Für ein wachsendes Unternehmen ist das NTM-Multiple also niedriger als das LTM-Multiple — ein Punkt, den viele Kandidaten falsch herum intuitiv erwarten.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l6-ltmntm-check',
      prompt: 'EV 720, LTM-EBITDA 80 (9,0x). EBITDA wächst um 25 %. NTM-Multiple?',
      options: ['7,2x', '9,0x', '11,25x', '8,0x'],
      correctIndex: 0,
      solution: 'NTM-EBITDA = 80×1,25 = 100. NTM-Multiple = 720/100 = 7,2x.',
      marcusCorrect: 'Richtig. Wachstum drückt das Multiple, EV bleibt gleich.',
      marcusWrong: 'NTM-EBITDA = 80 × 1,25 = 100. NTM-Multiple = 720 / 100 = 7,2x — niedriger als das LTM-Multiple von 9,0x.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'LTM und NTM im selben Comp-Set mischen',
      paragraphs: [
        'Die Falle: einen Comp mit seinem LTM-Multiple zeigen und einen anderen mit seinem NTM-Multiple — beide unkommentiert nebeneinander in derselben Tabelle. Sieht aus wie ein Vergleich, ist keiner.',
        'Dieselbe Regel gilt für Calendarization: entweder alle Comps kalendarisiert, oder gar keinen. Die Grundregel dahinter ist immer identisch — jede Kennzahl im Vergleich muss auf derselben Basis stehen, sonst vergleichst du Äpfel mit Birnen und merkst es nicht.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l6-drill1',
      prompt: "Ein Unternehmen hat SINKENDES statt wachsendes EBITDA. Ist das NTM-Multiple dann höher oder niedriger als das LTM-Multiple?",
      options: [
        'Höher — kleinerer Nenner bei gleichem EV',
        'Niedriger — wie bei wachsenden Unternehmen',
        'Immer identisch',
        'Kommt auf den Steuersatz an',
      ],
      correctIndex: 0,
      solution: 'Sinkt das EBITDA, sinkt der Nenner, das Multiple steigt bei gleichem EV — genau umgekehrt zum Wachstumsfall.',
      marcusCorrect: 'Korrekt. Die Regel dreht sich mit der Richtung um — kein Automatismus, sondern eine Konsequenz aus Zähler und Nenner.',
      marcusWrong: "Die Logik von eben gilt spiegelverkehrt: sinkendes EBITDA heißt kleinerer Nenner, also höheres NTM-Multiple bei gleichem EV. 'NTM ist immer niedriger' ist eine falsche Verallgemeinerung.",
    },
    {
      kind: 'minicheck',
      id: 'k3-l6-drill2',
      prompt: 'Ein Comp hat Bilanzstichtag 30. September. FY endend Sept. 2024: EBITDA 60. FY endend Sept. 2025: EBITDA 90. Kalenderjahr-EBITDA für 2024?',
      options: ['67,5', '75', '60', '90'],
      correctIndex: 0,
      solution: 'Jan–Sep24 (9/12 von 60) = 45. Okt–Dez24 (3/12 von 90) = 22,5. Summe: 67,5.',
      marcusCorrect: 'Sauber. Neun Monate aus dem einen Jahr, drei aus dem nächsten.',
      marcusWrong: 'Jan–September 2024 ist der letzte Teil des FY endend Sept. 2024: 9/12 von 60 = 45. Oktober–Dezember 2024 ist der erste Teil des FY endend Sept. 2025: 3/12 von 90 = 22,5. 45 + 22,5 = 67,5.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Einmaleffekte in den Zahlen',
      paragraphs: [
        'Ein LTM-EBITDA kann durch einmalige Sondereffekte verzerrt sein — ein einmaliger Rechtsstreit, ein Restrukturierungsaufwand, ein Immobilienverkauf. Vor dem Vergleich normalisiert man solche Positionen raus, sonst vergleichst du die Bereinigung eines Comps mit den unbereinigten Rohzahlen eines anderen.',
        'In der Praxis: Comp-Tabellen weisen oft „Adjusted EBITDA" aus — genau aus diesem Grund, nicht aus Willkür.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 06 abgeschlossen.',
      marcus: {
        subject: 'Re: Multiples, die sich vergleichen lassen',
        body: 'Calendarization, LTM gegen NTM, die Konsistenzfalle — deine Comp-Tabellen sind jetzt tatsächlich vergleichbar. Als Nächstes wechselt das Terrain: der volle Merger-Modell-Walkthrough mit Synergien und Goodwill.',
      },
      next: { title: 'Der volle Merger-Walkthrough', meta: '9 Min · +50 XP' },
    },
  ],
};
