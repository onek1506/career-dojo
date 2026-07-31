// ============================================================
// Kategorie 1 — Lektion 08: Geld, das im Laden feststeckt (Working Capital)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 8, 8 slides).
// Marcus teaching text, quiz question/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// Closes the Accounting block; next lesson opens the valuation chapter.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1WorkingCapital: MicroLessonData = {
  id: 'k1-acc-8-working-capital',
  module: MODULE,
  titleDe: 'Geld, das im Laden feststeckt',
  nextPath: '/lesson/k1-val-1-was-ist-wert',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Geld, das im Laden feststeckt',
      subtitle: 'Working Capital',
      marcus: {
        subject: 'Re: Gewinn, aber kein Geld übrig?',
        body: 'Zum Abschluss des Buchhaltungsteils eine Idee, die kein Lehrbuch gut erklärt — ich schon. Manchmal hat ein Laden Gewinn, aber trotzdem nie Geld übrig. Wie kann das sein?',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'BEISPIEL · DEIN KAFFEELADEN',
      heading: 'Zwei Dinge binden dein Geld',
      paragraphs: [
        'Zwei Dinge binden dein Geld, ohne dass du es merkst.',
        'Erstens: Kunden, die auf Rechnung kaufen und noch nicht gezahlt haben — dein Geld steckt bei ihnen. Zweitens: dein Bohnenlager — du hast für die Bohnen schon bezahlt, aber noch keinen Kaffee daraus verkauft.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER BEGRIFF',
      heading: 'Gebundenes Geld: Working Capital',
      paragraphs: [
        'Dieses Geld, das im täglichen Betrieb gebunden ist — in offenen Rechnungen und im Lager — nennt man **Working Capital**. Grob: das Geld, das dein Laden zum Laufen braucht, das aber gerade nicht frei verfügbar ist.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l8-gebundenes-geld',
      prompt: 'Was bindet dein Geld?',
      options: ['Bohnen im Lager, für die du schon gezahlt hast', 'Gewinn', 'Deine gute Laune'],
      correctIndex: 0,
      solution: 'Gebunden ist Geld, das schon ausgegeben ist, aber noch keinen Umsatz gebracht hat: die bezahlten Bohnen im Lager.',
      marcusCorrect: 'Genau. Bezahlt, aber noch nicht zu Umsatz geworden — Geld steckt fest.',
      marcusWrong: 'Fast — gebunden ist Geld, das du schon ausgegeben hast, das aber noch keinen Umsatz gebracht hat. Die bezahlten Bohnen im Lager sind genau so ein Fall. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'WARUM ES ZÄHLT',
      heading: 'Profitabel und trotzdem knapp',
      paragraphs: [
        'Deshalb kann ein profitabler Laden knapp bei Kasse sein: Zu viel Geld steckt in unbezahlten Rechnungen und vollen Regalen. Ein gut geführtes Geschäft hält dieses gebundene Geld klein.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER KERN',
      heading: 'Working Capital in einem Satz',
      paragraphs: [
        'Der Kern: **Working Capital ist das Geld, das im laufenden Betrieb gebunden ist. Viel davon kann selbst einen profitablen Laden knapp machen.**',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'MEILENSTEIN',
      heading: 'Halt kurz inne',
      paragraphs: [
        'Das war der letzte Baustein der Buchhaltung. Halt kurz inne: Du liest jetzt alle drei Finanzdokumente, verstehst wie sie zusammenhängen, und weißt warum Gewinn und Geld nicht dasselbe sind.',
        'Vor acht Lektionen war das eine fremde Welt.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 08 abgeschlossen.',
      marcus: {
        subject: 'Re: Buchhaltung komplett',
        body: 'Working Capital kennst du jetzt: das Geld, das im laufenden Betrieb gebunden ist. Damit ist der Buchhaltungsteil abgeschlossen. Als Nächstes beginnt ein neues Kapitel: Was ist ein Unternehmen eigentlich wert?',
      },
      next: { title: 'Ein neues Kapitel: Was ist ein Unternehmen wert?', meta: '6 Min · +25 XP' },
    },
  ],
};
