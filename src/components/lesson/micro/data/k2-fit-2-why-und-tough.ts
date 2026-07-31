// K2 Lektion 15 — written directly (no team draft was produced before the
// spend-limit cutoff). Same K2 grammar/voice as the ported lessons.

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK F · FIT & MOCK';

export const k2FitWhyTough: MicroLessonData = {
  id: 'k2-fit-2-why-und-tough',
  module: MODULE,
  titleDe: 'Why IB und die unangenehmen Fragen',
  topicTag: 'fit',
  nextPath: '/lesson/k2-mock-1-mixed',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Why IB und die unangenehmen Fragen',
      subtitle: 'Block F · Fit & Mock',
      marcus: {
        subject: 'Re: Die Struktur nutzt sich ab',
        body: 'Deine CV-Antwort steht. Jetzt drei enge Verwandte: Why IB, Why diese Bank, und die Nachfragen, die niemand mag. Alle drei folgen demselben Prinzip — nur die Übung fehlt.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Why Investment Banking, why diese Bank',
      paragraphs: [
        "**'Why investment banking?'** Auf Intermediate-Niveau reicht keine Floskel mehr — 'steile Lernkurve' hat jeder Interviewer hundertmal gehört. Gefragt ist: konkreter Auslöser, ein Beleg dafür, und warum genau diese Arbeit dich reizt.",
        "**'Why our bank?'** Schwach: 'Ihr seid eine Top-Adresse.' Stark: ein konkreter Deal, ein Team-Schwerpunkt, ein Gespräch, das du geführt hast. Ein echtes Detail schlägt zehn Superlative.",
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die unangenehmen Fragen',
      paragraphs: [
        "**'Which other banks are you talking to?'** Ehrlich antworten, aber konsistent bleiben — dein Interesse an genau dieser Rolle muss glaubwürdig bleiben. Wahlloses Namedropping ohne roten Faden fällt auf.",
        "**'Why not go straight to PE?'** Ehrliche Antwort: die Ausbildung und der Dealflow im IB kommen zuerst — PE baut später darauf auf.",
        "**'Your grade in X is weak — why?'** Kurz einordnen, ohne Ausrede, dann sofort zurück zur eigenen Stärke. Keine Rechtfertigungsspirale.",
        'Das Prinzip hinter allen vieren: **Ruhe, Ehrlichkeit, kurz, zurück zur eigenen Substanz.** Der Interviewer testet die Reaktion unter Druck, nicht die perfekte Antwort.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Ein Gerüst je Frage',
      paragraphs: [
        "**Why IB:** 'It started with [Auslöser], and working on [Beleg] confirmed it — I want to be the person building the analysis, not just reading about the deal.'",
        "**Why diese Bank:** 'Specifically because of [konkretes Detail — Deal, Team, Gespräch], not just the brand.'",
        "**Which other banks:** 'I'm speaking with a few others, but this process is the one I'm most focused on right now, because [Grund].'",
        "**Schwache Note:** 'That semester was tough because of [kurze, ehrliche Einordnung] — my grades since then reflect what I'm actually capable of.'",
        'Vier kurze Gerüste, kein Vortrag. Jede Antwort passt in drei Sätze.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l15-otherbanks',
      prompt: "'Which other banks are you talking to?' — welche Antwort ist am stärksten?",
      options: [
        'Ehrlich nennen, dabei das eigene Interesse an dieser Rolle konsistent halten',
        'Ausweichen und keine Namen nennen',
        'Möglichst viele bekannte Namen aufzählen',
        'Behaupten, es gäbe nur diese eine Bank',
      ],
      correctIndex: 0,
      solution: 'Ehrlichkeit mit Konsistenz schlägt Ausweichen und Übertreibung gleichermaßen.',
      marcusCorrect: 'Genau. Ehrlich, aber mit klarem Grund, warum dieser Prozess trotzdem im Fokus steht.',
      marcusWrong: 'Ausweichen wirkt unsicher, Übertreiben unglaubwürdig. Ehrlich nennen und begründen, warum diese Rolle Priorität hat, schlägt beides.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l15-grade',
      prompt: 'Beste Reaktion auf eine schwache Note im Interview?',
      options: [
        'Kurz einordnen, ohne Ausrede, dann zur eigenen Stärke zurück',
        'Lange und detailliert rechtfertigen',
        'Die Frage ignorieren und das Thema wechseln',
        'Die Note kleinreden, als wäre sie nicht schlecht',
      ],
      correctIndex: 0,
      solution: 'Kurze, ehrliche Einordnung wirkt souveräner als jede lange Rechtfertigung.',
      marcusCorrect: 'Korrekt. Kurz, ehrlich, dann weiter — genau das zeigt Selbstsicherheit unter Druck.',
      marcusWrong: 'Eine lange Rechtfertigung wirkt defensiv, egal wie gut die Gründe sind. Kurz einordnen und zurück zur Substanz — das überzeugt.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l15-notpe',
      prompt: "'Why not go straight to PE?' — welche Antwort passt am besten?",
      options: [
        'IB liefert zuerst die Ausbildung und den Dealflow, auf denen PE später aufbaut',
        'PE interessiert mich überhaupt nicht',
        'Ich habe von PE noch nie gehört',
        'IB ist einfacher zu bekommen als PE',
      ],
      correctIndex: 0,
      solution: 'Die ehrliche, kanonische Antwort: IB als Fundament, PE als möglicher späterer Schritt.',
      marcusCorrect: 'Genau. Ehrlich und branchenüblich — niemand erwartet, dass PE für dich nicht existiert.',
      marcusWrong: 'PE zu ignorieren wirkt unglaubwürdig oder uninformiert. Die ehrliche Antwort: IB zuerst wegen Ausbildung und Dealflow, PE als möglicher nächster Schritt.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Defensiv werden oder lügen',
      paragraphs: [
        'Beide Fehler sind sofort erkennbar: **Defensiv werden** — lange rechtfertigen, ausweichen, das Thema wechseln. Und **lügen** — behaupten, es gäbe keine anderen Prozesse, oder eine Note schönreden.',
        "Wer bei der Notenfrage 60 Sekunden lang Gründe aufzählt, hat schon verloren — nicht wegen der Note, sondern wegen der Reaktion. Die Regel bleibt für alle vier Fragen dieselbe: kurz, ehrlich, zurück zur eigenen Substanz.",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 15 abgeschlossen.',
      marcus: {
        subject: 'Re: Fit-Fragen komplett',
        body: 'CV, Why IB, Why diese Bank, die unangenehmen Nachfragen — alle Standardfragen sitzen. Als Nächstes ein kompletter Mixed Mock: Technik und Fit gemischt, wie ein echtes erstes Gespräch.',
      },
      next: { title: 'Der Mixed Mock', meta: '8 Min · +50 XP' },
    },
  ],
};
