// K2 Lektion 14 — written directly (no team draft was produced before the
// spend-limit cutoff). Same K2 grammar/voice as the ported lessons.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK F · FIT & MOCK';

export const k2FitStory: MicroLessonData = {
  id: 'k2-fit-1-story',
  module: MODULE,
  titleDe: 'Walk me through your CV',
  topicTag: 'fit',
  nextPath: '/lesson/k2-fit-2-why-und-tough',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Walk me through your CV',
      subtitle: 'Block F · Fit & Mock',
      marcus: {
        subject: 'Re: Andere Art von Vorbereitung',
        body: 'Ab jetzt geht es nicht mehr um Zahlen, sondern um dich. Deine Bewerbungen laufen — Zeit für die andere Hälfte des Interviews. Die Eröffnungsfrage in fast jedem Gespräch: dein eigener Lebenslauf, in 90 Sekunden erzählt.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Der Wortlaut',
      paragraphs: [
        "**'Walk me through your CV'** oder **'Tell me about yourself.'** Der Interviewer hat deinen Lebenslauf vor sich — er will keine Nacherzählung. Er testet, ob du auswählen und priorisieren kannst.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die 90-Sekunden-Struktur',
      paragraphs: [
        'Drei Teile: **Erstens, ein Anker-Satz** — wer du bist, in einem Satz, ohne Floskeln. **Zweitens, zwei bis drei Stationen**, chronologisch, jede mit einem konkreten Beleg und einem roten Faden Richtung IB — nicht der komplette CV, sondern eine Auswahl.',
        '**Drittens ein Schluss:** warum jetzt, warum dieser Schritt. Regel für alle drei Teile: **jede Behauptung bekommt einen Ein-Satz-Beleg.** "Ich bin analytisch" ohne Beispiel ist eine leere Zeile.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Das Gerüst zum Selbstbefüllen',
      paragraphs: [
        "**Anker:** 'I'm a [Semester]-Semester [Studiengang] student who got hooked on finance through [konkreter Auslöser].'",
        "**Station 1:** '[Praktikum/Projekt] — I worked on [konkrete Aufgabe], which taught me [Erkenntnis].'",
        "**Station 2:** '[Zweite Station] — that's where I first got exposed to [IB-naher Bezug].'",
        "**Schluss:** 'That combination of [X] and [Y] is why I'm now focused on breaking into investment banking.'",
        'Vier Zeilen, eigene Inhalte einsetzen — das ist die Vorlage, keine Fertiglösung.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l14-opener',
      prompt: 'Welcher Einstieg ist stärker?',
      options: [
        'Ein Anker-Satz mit konkretem Auslöser für das Interesse an Finance',
        "'Ich bin 22 und studiere Betriebswirtschaftslehre im vierten Semester.'",
        'Direkt mit der Schulzeit beginnen',
        'Mit den Hobbys beginnen, um sympathisch zu wirken',
      ],
      correctIndex: 0,
      solution: 'Ein Anker-Satz mit Substanz schlägt reine Fakten, die schon im CV stehen.',
      marcusCorrect: 'Genau. Alter und Semester stehen längst im CV — ein Anker-Satz mit echtem Auslöser zeigt dagegen, dass du selbst reflektiert hast.',
      marcusWrong: 'Alter und Studiengang liest der Interviewer selbst vom CV ab. Der Anker-Satz muss etwas liefern, das dort nicht steht: warum genau du, warum genau das.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l14-cut',
      prompt: 'Welche Station gehört eher NICHT in die 90-Sekunden-Version?',
      options: [
        'Ein Detail ohne erkennbaren IB-Bezug',
        'Ein Praktikum mit konkreter Aufgabe und Erkenntnis',
        'Eine Station mit rotem Faden Richtung Finance',
        'Der Schlusssatz zum "Warum jetzt"',
      ],
      correctIndex: 0,
      solution: 'Auswahl statt Vollständigkeit — nur Stationen mit erkennbarem Bezug gehören rein.',
      marcusCorrect: 'Richtig. 90 Sekunden reichen nicht für Vollständigkeit — jede Station muss ihren Platz verdienen.',
      marcusWrong: 'Die Frage testet Auswahl, nicht Vollständigkeit. Ein Detail ohne roten Faden kostet Zeit, ohne etwas zu belegen — es fliegt raus.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l14-tell',
      prompt: 'Woran erkennt ein Interviewer, dass die CV-Antwort auswendig gelernt statt verstanden ist?',
      options: [
        'Am Tempo und der Monotonie des Vortrags',
        'An der Anzahl genannter Praktika',
        'Daran, dass Zahlen vorkommen',
        'Das lässt sich nicht erkennen',
      ],
      correctIndex: 0,
      solution: 'Auswendiggelerntes klingt gleichförmig, ohne natürliche Betonung.',
      marcusCorrect: 'Korrekt. Ein monotoner, zu schneller Vortrag ohne Pausen verrät Auswendiglernen sofort — auch wenn der Inhalt stimmt.',
      marcusWrong: 'Inhalt kann stimmen und trotzdem auffallen: gleichförmiges Tempo, keine natürlichen Betonungen, keine Pausen zum Nachdenken. Das Ohr merkt es vor dem Kopf.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Die Fünf-Minuten-Nacherzählung',
      paragraphs: [
        'Die Falle dieser Frage: den kompletten Lebenslauf chronologisch nacherzählen, von der Schulzeit bis heute. Der Interviewer hat den CV vor sich — er testet Auswahl und Priorisierung, nicht Vollständigkeit.',
        'Jede Minute, die du in Stationen ohne IB-Bezug investierst, ist eine Minute, die für den roten Faden fehlt. Wer nach 90 Sekunden fertig ist und dabei drei fokussierte Stationen genannt hat, hat mehr gesagt als jemand, der fünf Minuten braucht.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 14 abgeschlossen.',
      marcus: {
        subject: 'Re: Der Anker steht',
        body: 'Anker-Satz, Stationen mit Beleg, roter Faden, Schluss — die CV-Frage hast du strukturiert. Als Nächstes zwei enge Verwandte: Why IB und Why diese Bank, plus die unangenehmen Nachfragen.',
      },
      next: { title: 'Why IB und die unangenehmen Fragen', meta: '7 Min · +35 XP' },
    },
  ],
};
