// ============================================================
// Kategorie 1 — Lektion 15: Wie eine Spring Week wirklich abläuft (Abschluss)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 15, 7 slides).
// Marcus teaching text, quiz question/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// Final lesson of the K1 path: no new terminology, calm closing arc.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 03 · INTERVIEW';

export const k1SoftSpringWeek: MicroLessonData = {
  id: 'k1-soft-3-spring-week',
  module: MODULE,
  titleDe: 'Wie eine Spring Week wirklich abläuft',
  nextPath: '/lesson/k1-orient-1-spielfeld',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Wie eine Spring Week wirklich abläuft',
      subtitle: 'Der Abschluss',
      marcus: {
        subject: 'Re: Die Spring Week',
        body: 'Zum Abschluss nehme ich dir die Nervosität vor dem, worauf du eigentlich hinarbeitest: die Spring Week. Viele stellen sich eine Woche Dauerprüfung vor. Ist es nicht. Ich sag dir, was wirklich passiert.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'WAS ES IST',
      heading: 'Ein mehrtägiges Kennenlernen',
      paragraphs: [
        'Eine Spring Week ist im Kern ein mehrtägiges Kennenlernen: Präsentationen über die Bank, kleine Workshops, Gespräche mit echten Analysten, ein paar einfache Aufgaben. Es geht weniger um dein Fachwissen — mehr darum, ob man gern mit dir im Team wäre.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'WAS ZÄHLT',
      heading: 'Interessiert, freundlich, wach',
      paragraphs: [
        'Das Beruhigende: Niemand erwartet, dass du in der Spring Week schon ein DCF baust. Erwartet wird, dass du interessiert bist, Fragen stellst, freundlich und wach wirkst. Das Fachwissen, das du hier gelernt hast, macht dich dabei einfach ruhiger als die meisten.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l15-spring-week',
      prompt: 'Worauf kommt es in einer Spring Week vor allem an?',
      options: ['Interesse zeigen und ins Team passen', 'Ein perfektes DCF bauen', 'Alle Formeln auswendig'],
      correctIndex: 0,
      solution: 'Eine Spring Week ist ein Kennenlernen. Es zählt, dass du Interesse zeigst und ins Team passt.',
      marcusCorrect: 'Genau. Es ist ein Kennenlernen, keine Klausur.',
      marcusWrong: 'Fast — eine Spring Week ist ein Kennenlernen, keine Klausur. Niemand erwartet dort ein DCF oder Formeln. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'DER BOGEN ZURÜCK',
      heading: 'Denk zurück an Lektion eins',
      paragraphs: [
        'Denk zurück an Lektion eins: \'Hast du 100 € verdient, wenn du 100 € einnimmst?\' Heute liest du Bilanzen, verstehst wie drei Dokumente zusammenhängen, kennst den Unterschied zwischen Enterprise und Equity Value und weißt, wie du über dich selbst sprichst. Das ist ein enormer Weg.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUSBLICK',
      heading: 'Früh dran ist dein Vorteil',
      paragraphs: [
        'Du bist noch früh dran — und genau das ist dein Vorteil. Wenn deine Bewerbung näher rückt, bist du längst vorbereitet, während andere erst anfangen. Bis dahin: dranbleiben, wiederholen, ruhig bleiben. Du hast ein Fundament, auf das die wenigsten in deinem Semester zugreifen können.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 15 abgeschlossen.',
      marcus: {
        subject: 'Re: Der Abschluss',
        body: 'Damit ist der Pfad abgeschlossen. Du weißt jetzt, was in einer Spring Week wirklich passiert und was dort zählt. Wenn du magst, wiederhole die Lektionen jederzeit von vorn, ganz ohne Eile.',
      },
      next: { title: 'Von vorn wiederholen', meta: 'Wissen festigen' },
    },
  ],
};
