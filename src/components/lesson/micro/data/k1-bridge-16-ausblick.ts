// K1 closing bridge — ported verbatim from docs/k2-lesson-content.md.
// K1 Marcus tone (patient); presents K2 as a situational offer.

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 03 · INTERVIEW';

export const k1Bridge16: MicroLessonData = {
  id: 'k1-bridge-16-ausblick',
  module: MODULE,
  titleDe: 'Rückblick & Ausblick',
  nextPath: '/lesson/k2-acc-1-bridge',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Rückblick & Ausblick',
      subtitle: 'K1, Abschluss',
      marcus: {
        subject: 'Re: Einmal zurückschauen',
        body: 'Bevor du weiterziehst, schau einmal zurück. Du liest jetzt alle drei Finanzberichte. Du weißt, warum Gewinn und Geld nicht dasselbe sind. Du kennst den Unterschied zwischen Enterprise und Equity Value, und du weißt, wie du über dich selbst sprichst. Das ist ein echtes Fundament — und die wenigsten in deinem Semester haben es.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'EIN EHRLICHES WORT',
      heading: 'Verstehen und Abrufen sind zwei Dinge',
      paragraphs: [
        'Ein ehrliches Wort dazu: Verstehen und im Interview unter Druck abrufen sind zwei verschiedene Dinge. Was du hier gebaut hast, ist das Verstehen.',
        'Im echten Gespräch kommt Tempo dazu, Nachfragen, Englisch. Das ist kein Grund zur Sorge — es ist einfach der nächste Schritt, wenn er dran ist.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER ZWEITE PFAD',
      heading: 'Wann das Interview-Training dran ist',
      paragraphs: [
        'Deshalb gibt es hier einen zweiten Pfad: das Interview-Training. Dort wird nicht mehr erklärt, sondern gefragt — so wie ein Analyst im Call fragt.',
        'Der richtige Zeitpunkt dafür ist nicht heute, nur weil du hier fertig bist. Der richtige Zeitpunkt ist, wenn du anfängst, dich zu bewerben. Wenn ein Call näher rückt. Dann komm zurück und starte dort.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 16 abgeschlossen.',
      marcus: {
        subject: 'Re: Fundament steht',
        body: 'Bis dahin: dranbleiben, ab und zu wiederholen. Du bist früh dran, und genau das ist dein Vorteil.',
      },
      next: { title: 'Interview-Training', meta: 'wenn es soweit ist' },
    },
  ],
};
