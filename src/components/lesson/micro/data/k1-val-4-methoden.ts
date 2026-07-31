// ============================================================
// Kategorie 1 — Lektion 12: Drei Wege zum Wert (Bewertungsmethoden)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 12, 9 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// Analogy world: the sale of an apartment (Wohnung) — one everyday analogy
// per method, no mechanics, no WACC, no terminal value.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 02 · BEWERTUNG';

export const k1ValMethoden: MicroLessonData = {
  id: 'k1-val-4-methoden',
  module: MODULE,
  titleDe: 'Drei Wege zum Wert',
  nextPath: '/lesson/k1-soft-1-why-ib',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Drei Wege zum Wert',
      subtitle: 'Bewertungsmethoden',
      marcus: {
        subject: 'Re: Wie kommt man auf die Zahl?',
        body: 'Du weißt jetzt, dass Wert vom künftigen Gewinn kommt. Aber wie kommt man auf eine konkrete Zahl? Es gibt drei Wege. Ich zeig dir jeden an etwas, das du kennst: dem Verkauf einer Wohnung.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'METHODE 1 · DIE WOHNUNG',
      heading: 'Weg eins: Comparable Companies',
      paragraphs: [
        'Weg eins: Du schaust, wofür *ähnliche* Wohnungen im selben Viertel gerade verkauft werden. Vergleichbare Objekte, heutiger Marktpreis.',
        'Bei Firmen heißt das **Comparable Companies** — man schaut, wie ähnliche Firmen an der Börse bewertet sind.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'METHODE 2 · DIE WOHNUNG',
      heading: 'Weg zwei: Precedent Transactions',
      paragraphs: [
        'Weg zwei: Du schaust, was für ähnliche Wohnungen *tatsächlich bezahlt* wurde, als sie letztes Jahr den Besitzer wechselten. Echte vergangene Deals.',
        'Bei Firmen: **Precedent Transactions** — was wurde bei früheren Übernahmen wirklich gezahlt.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l12-precedent',
      prompt: 'Was schaut sich Precedent Transactions an?',
      options: [
        'Was bei früheren echten Verkäufen gezahlt wurde',
        'Heutige Börsenkurse',
        'Das Inventar',
      ],
      correctIndex: 0,
      solution: 'Precedent Transactions schaut auf frühere echte Deals: was bei Übernahmen wirklich gezahlt wurde.',
      marcusCorrect: 'Genau. Vergangene echte Deals als Maßstab.',
      marcusWrong: 'Fast — Precedent Transactions schaut zurück: was bei früheren Übernahmen wirklich gezahlt wurde. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'METHODE 3 · DIE WOHNUNG',
      heading: 'Weg drei: DCF',
      paragraphs: [
        'Weg drei ist der gründlichste: Du rechnest aus, wie viel Miete die Wohnung in den nächsten Jahren einbringt, und wie viel dieser künftige Ertrag *heute* wert ist.',
        'Bei Firmen heißt das **DCF** — man schätzt den künftigen Gewinn und rechnet ihn auf heute zurück.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l12-dcf',
      prompt: 'Welche Methode schaut auf den künftigen Ertrag selbst?',
      options: ['DCF', 'Comparable Companies', 'Precedent Transactions'],
      correctIndex: 0,
      solution: 'DCF schätzt den künftigen Gewinn und rechnet ihn auf heute zurück.',
      marcusCorrect: 'Richtig. DCF rechnet vom künftigen Gewinn zurück auf heute.',
      marcusWrong: 'Fast — Comparables und Precedents vergleichen mit anderen, nur DCF rechnet den künftigen Gewinn selbst auf heute zurück. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Drei Wege, ein Ziel',
      paragraphs: [
        'Der Kern, drei Wege: **Vergleichbare Firmen heute (Comparables). Frühere echte Deals (Precedents). Der künftige Gewinn, auf heute gerechnet (DCF).** Mehr musst du jetzt noch nicht können — nur wissen, dass es sie gibt.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'MEILENSTEIN',
      heading: 'Das Bewertungskapitel im Griff',
      paragraphs: [
        'Damit hast du das Bewertungskapitel im Griff — auf einem Level, das viele erst nach dem ersten Praktikum haben. Was jetzt kommt, ist eine andere Art von Vorbereitung: die Fragen über *dich*.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 12 abgeschlossen.',
      marcus: {
        subject: 'Re: Drei Wege zum Wert',
        body: 'Jetzt kennst du die drei Wege zum Wert: Comparable Companies, Precedent Transactions und DCF. Mehr als wissen, dass es sie gibt, brauchst du im Moment nicht. Als Nächstes kommt eine andere Art von Vorbereitung: die Frage, warum du eigentlich ins Investment Banking willst.',
      },
      next: { title: 'Die wichtigste Frage im Interview: Warum IB?', meta: '6 Min · +25 XP' },
    },
  ],
};
