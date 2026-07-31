// ============================================================
// Kategorie 1 — Lektion 07: Der Groschen fällt (Drei Statements verbunden)
// PORTED VERBATIM from docs/k1-lesson-content.md (Lektion 7, 11 slides).
// Marcus teaching text, quiz questions/options, and "Feedback richtig"
// (marcusCorrect) are verbatim. Headings, eyebrows, `solution`, retention
// marcus body, and next.meta are format scaffolding to match L1/L2.
// marcusWrong (wrong-answer feedback) is added in the encouraging K1 Marcus
// tone per the ratified convention (every quiz gets right AND wrong feedback).
// Walkthrough numbers: Abschreibung +10, Steuersatz 40% → Net Income −6,
// Cash +4, Bilanz beide Seiten −6.
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 01 · ACCOUNTING';

export const k1ThreeStatements: MicroLessonData = {
  id: 'k1-acc-7-three-statements',
  module: MODULE,
  titleDe: 'Der Groschen fällt',
  nextPath: '/lesson/k1-acc-8-working-capital',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Der Groschen fällt',
      subtitle: 'Drei Statements verbunden',
      marcus: {
        subject: 'Re: Drei Dokumente, ein System',
        body: 'Das hier ist die Lektion, nach der bei vielen der Groschen fällt. Du kennst jetzt drei Dokumente einzeln. Gleich siehst du, dass sie ein einziges System sind, das sich gegenseitig bewegt. Wir gehen das ganz langsam durch.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DAS BILD',
      heading: 'Net Income ist die Brücke',
      paragraphs: [
        'Merk dir ein Bild: Der Gewinn — Net Income — ist die Brücke. Er entsteht im ersten Dokument und fließt in die anderen beiden. Alles, was wir gleich machen, hängt an dieser einen Verbindung.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Abschreibung steigt um 10',
      paragraphs: [
        'Wir nehmen die Frage, die in echten Interviews gestellt wird — aber in Zeitlupe. Angenommen, eine Kostenposition namens Abschreibung steigt um 10. Steuersatz 40%. Was passiert? Wir gehen ein Dokument nach dem anderen. Atme durch.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'SCHRITT 1 · DIE GUV',
      heading: 'Minus 6, nicht minus 10',
      paragraphs: [
        'Nur das erste Dokument. Die Abschreibung ist eine Kostenposition, sie steigt um 10. Also sinkt dein Gewinn vor Steuern um 10. Aber: weniger Gewinn heißt weniger Steuern. Bei 40% sparst du 4. Unterm Strich sinkt dein Net Income um 6, nicht um 10.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l7-gewinn-sinkt',
      prompt: 'Kosten steigen um 10, Steuer 40%. Um wie viel sinkt der Gewinn?',
      options: ['6', '10', '4'],
      correctIndex: 0,
      solution: 'Kosten +10 drücken den Gewinn, aber 40% Steuerersparnis (4) federn ab: 10 − 4 = 6.',
      marcusCorrect: 'Sauber. Die 4 € Steuerersparnis ist genau der Punkt, an dem die meisten scheitern. Du nicht.',
      marcusWrong: 'Fast — die Kosten drücken den Gewinn um 10, aber du sparst 40% Steuern, also 4. Bleiben 6. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'SCHRITT 2 · DAS CASH',
      heading: 'Dein Geld steigt um 4',
      paragraphs: [
        'Jetzt das Geld-Dokument. Du startest mit dem gesunkenen Gewinn: minus 6. Aber Abschreibung ist gar kein echter Geldabfluss — es ist nur eine Buchung, kein Euro verlässt die Kasse. Also rechnest du die 10 wieder dazu. Minus 6 plus 10 macht plus 4. Dein Geld *steigt* um 4.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER AHA-MOMENT',
      heading: 'Gewinn runter, Geld rauf',
      paragraphs: [
        'Lies das nochmal: Dein Gewinn ist gesunken, aber dein Kontostand ist gestiegen. Wegen der Steuerersparnis. Genau dieser Moment — Gewinn runter, Geld rauf — ist das, was Accounting so vielen schwer macht. Und du hast ihn gerade verstanden.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l7-cash-steigt',
      prompt: 'Warum steigt das Geld, obwohl der Gewinn sinkt?',
      options: [
        'Weil die Abschreibung kein echter Geldabfluss ist und Steuern gespart werden',
        'Weil Gewinn immer falsch ist',
        'Zufall',
      ],
      correctIndex: 0,
      solution: 'Die Abschreibung ist nur eine Buchung ohne Geldabfluss; die Steuerersparnis bringt echtes Cash.',
      marcusCorrect: 'Genau. Kein Geld floss ab, aber Steuern wurden gespart — also mehr Cash.',
      marcusWrong: 'Fast — die Abschreibung ist nur eine Buchung, kein Euro verlässt die Kasse. Gespart werden aber echte Steuern. Schau nochmal, du hast es gleich.',
    },
    {
      kind: 'concept',
      eyebrow: 'SCHRITT 3 · DIE BILANZ',
      heading: 'Die Bilanz balanciert',
      paragraphs: [
        'Letztes Dokument, die Bilanz — und sie muss aufgehen. Auf der Besitz-Seite: dein Geld steigt um 4, deine Maschine ist durch die Abschreibung 10 weniger wert. Macht netto minus 6. Auf der anderen Seite: dein Gewinn war minus 6, also sinkt dein Anteil (Equity) um 6. Minus 6 gleich minus 6. Die Bilanz balanciert.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER MEILENSTEIN',
      heading: 'Das ist Verstehen',
      paragraphs: [
        'Geh kurz zurück und schau, was du getan hast: Du hast eine einzige Änderung durch drei verbundene Dokumente verfolgt — und alles ist aufgegangen. Das ist kein Auswendiglernen. Das ist Verstehen. Die meisten Bewerber stottern genau hier. Du wirst es nicht.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 07 abgeschlossen.',
      marcus: {
        subject: 'Re: Der Groschen ist gefallen',
        body: 'Du hast heute eine einzige Änderung durch alle drei Dokumente verfolgt: Gewinn runter, Cash rauf, Bilanz balanciert. Die drei Statements sind für dich jetzt ein System, kein Stapel einzelner Papiere. Als Nächstes wartet eine letzte, leichtere Idee zum Abschluss des Accounting-Blocks. Aber das hat Zeit.',
      },
      next: { title: 'Eine letzte, leichtere Idee zum Abschluss', meta: '6 Min · +25 XP' },
    },
  ],
};
