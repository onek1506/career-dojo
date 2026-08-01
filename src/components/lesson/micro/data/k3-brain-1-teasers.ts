// K3 Lektion 12 — classic brain teasers, solved with structure rather than
// financial modeling. Speed-Run, skip target: 5. New topicTag domain.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK E · BRAIN TEASERS';

export const k3BrainTeasers: MicroLessonData = {
  id: 'k3-brain-1-teasers',
  module: MODULE,
  titleDe: 'Brain Teaser, strukturiert gelöst',
  topicTag: 'brainteasers',
  nextPath: '/lesson/k3-market-1-why-now',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Brain Teaser, strukturiert gelöst',
      subtitle: 'Block E · Brain Teasers',
      marcus: {
        subject: 'Re: Es geht selten um die richtige Zahl',
        body: 'Brain Teaser prüfen selten, ob du eine Zahl kennst. Sie prüfen, ob du unter Druck strukturiert denkst, statt zu raten oder zu erstarren. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l12-diagnose',
      prompt: "'Schätze, wie viele Klavierstimmer in Chicago arbeiten.' Was ist der stärkste erste Schritt?",
      options: [
        'Die Schätzung in eine Kette nachvollziehbarer Teilschritte zerlegen',
        'Sagen, dass du es nicht weißt, und um eine andere Frage bitten',
        'Eine runde Zahl raten, ohne sie zu begründen',
        'Den Interviewer nach der tatsächlichen Zahl fragen',
      ],
      correctIndex: 0,
      solution: 'Klassisches Fermi-Problem — der Wert liegt in der nachvollziehbaren Kette, nicht im Endergebnis.',
      marcusCorrect: 'Richtig, sofort erkannt. Weiter zum härtesten Klassiker der Kategorie.',
      marcusWrong: 'Eine unbegründete Zahl zeigt nichts. Der Wert liegt in der Kette: Einwohnerzahl → Haushalte mit Klavier → Stimmfrequenz → daraus abgeleiteter Bedarf. Nächste Slides holen die Struktur nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die Grundstruktur für jeden Teaser',
      paragraphs: [
        'Vier Schritte, unabhängig vom Teaser-Typ: Die Frage laut wiederholen (verschafft Denkzeit, bestätigt das Verständnis). Den TYP erkennen — Logik-/Zählrätsel, Schätzfrage, oder kreatives/laterales Rätsel, denn der richtige Ansatz unterscheidet sich.',
        'Systematisch vorgehen statt raten. Und durchgehend LAUT denken — bewertet wird der Prozess, nicht nur das Endergebnis.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Fermi-Zerlegung am Beispiel',
      paragraphs: [
        'Klavierstimmer in Chicago: Einwohnerzahl Chicago (~2,7 Mio.) → Haushalte (~1 Mio. bei ~2,7 Personen/Haushalt) → Anteil mit Klavier (~geschätzt 3 %) → ~30.000 Klaviere → gestimmt ~einmal pro Jahr → ein Stimmer schafft ~4 pro Tag, ~1.000 pro Jahr → **~30 Klavierstimmer**.',
        'Die exakte Zahl ist unwichtig. Wichtig ist die Kette: Jede Annahme wird benannt, jeder Schritt ist nachvollziehbar. Genau das wird bewertet.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l12-refresh-check',
      prompt: "'Schätze die Anzahl der Tankstellen in Deutschland.' Stärkster erster Schritt?",
      options: [
        'Bevölkerung → Anzahl Fahrzeuge → Fahrzeuge pro Tankstelle als Kette aufbauen',
        'Direkt eine plausibel klingende Zahl nennen',
        'Sagen, dass Schätzfragen unfair sind',
        'Nach der echten Statistik fragen',
      ],
      correctIndex: 0,
      solution: 'Gleiche Fermi-Logik: Bevölkerung, Fahrzeugdichte, Versorgungsdichte als nachvollziehbare Kette.',
      marcusCorrect: 'Genau die gleiche Struktur, andere Ausgangszahl.',
      marcusWrong: 'Dieselbe Kettenlogik wie beim Klavierstimmer-Beispiel: Bevölkerung, daraus Fahrzeugzahl, daraus die Tankstellendichte ableiten. Eine unbegründete Zahl bringt nichts.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Der Klassiker: 25 Pferde, 5 Bahnen',
      paragraphs: [
        "25 Pferde, du kannst 5 gleichzeitig rennen lassen, keine Stoppuhr, nur die Reihenfolge zählt. Wie viele Rennen brauchst du minimal, um die drei schnellsten zu finden?",
        'Rennen 1–5: Die 25 Pferde in 5 Fünfergruppen aufteilen, jede Gruppe einmal rennen lassen — 5 Rennen, du kennst jetzt die Reihenfolge innerhalb jeder Gruppe.',
        'Rennen 6: Die 5 Gruppensieger gegeneinander — der Sieger davon ist das schnellste Pferd insgesamt.',
        'Rennen 7: Für Platz 2 und 3 kommen nur wenige Pferde infrage — der Zweite und Dritte aus Rennen 6, der Zweite aus der Gruppe des Siegers, und (durch Transitivität) ein Pferd aus der Gruppe des Zweitplatzierten. Diese fünf Kandidaten noch einmal gegeneinander. **Antwort: 7 Rennen.**',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l12-horses-check',
      prompt: 'Wie viele Rennen braucht die Lösung insgesamt für das 25-Pferde-Rätsel?',
      options: ['7', '5', '6', '10'],
      correctIndex: 0,
      solution: '5 Gruppenrennen + 1 Siegerrennen + 1 Ausscheidungsrennen für Platz 2/3 = 7.',
      marcusCorrect: 'Richtig. Der Klassiker unter den Klassikern.',
      marcusWrong: 'Fünf Gruppenrennen, ein Rennen der Gruppensieger, ein letztes Rennen zwischen den fünf verbliebenen Kandidaten für Platz 2 und 3. Macht 7 insgesamt.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Zu wenig oder zu viel eliminieren',
      paragraphs: [
        'Die Falle beim Pferderätsel: nach dem Siegerrennen einfach ALLE verbliebenen Pferde noch einmal rennen lassen, statt die Kandidaten für Platz 2/3 durch Transitivität sauber einzugrenzen — das braucht mehr als 7 Rennen und zeigt, dass die Eliminationslogik fehlt.',
        'Der umgekehrte Fehler: zu aggressiv eliminieren und gültige Kandidaten übersehen — dann stimmt das Ergebnis nicht mehr. Genau diese Eingrenzung, nicht das Rennen selbst, ist der Kern des Rätsels.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l12-drill1',
      prompt: "'Wie viele Golfbälle passen in einen Schulbus?' Stärkster erster Schritt?",
      options: [
        'Bus-Volumen und Golfball-Volumen getrennt schätzen, dann dividieren und Packdichte berücksichtigen',
        'Eine runde Zahl wie 10.000 nennen und weitermachen',
        'Sagen, dass die Frage keinen Sinn ergibt',
        'Nach der Bus-Größe fragen und dann raten',
      ],
      correctIndex: 0,
      solution: 'Volumenverhältnis plus Packdichte-Korrektur ist die saubere Zerlegung dieser Schätzfrage.',
      marcusCorrect: 'Richtig. Immer dieselbe Zerlegungslogik.',
      marcusWrong: 'Bus-Volumen schätzen, Golfball-Volumen schätzen, dividieren — und einen Packdichte-Faktor abziehen, weil Kugeln nie den Raum lückenlos füllen. Eine geratene Zahl ohne diesen Weg überzeugt nicht.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l12-drill2',
      prompt: 'Zwei Seile, jedes brennt in exakt 60 Minuten ab, aber ungleichmäßig. Wie misst du exakt 45 Minuten?',
      options: [
        'Ein Seil an beiden Enden anzünden, das zweite an einem Ende — sobald das erste erloschen ist (30 Min.), das zweite Ende des zweiten Seils anzünden',
        'Beide Seile gleichzeitig an einem Ende anzünden und nach 45 Minuten schauen',
        'Ein Seil in der Mitte durchschneiden und beide Hälften einzeln zählen',
        'Es ist mit ungleichmäßigem Abbrand nicht lösbar',
      ],
      correctIndex: 0,
      solution: 'Beidseitig brennend verdoppelt sich die Rate unabhängig von der Ungleichmäßigkeit: 30+15=45.',
      marcusCorrect: 'Korrekt. Beidseitiges Anzünden halbiert die Brenndauer, egal wie ungleichmäßig das Seil brennt.',
      marcusWrong: 'Seil A an beiden Enden anzünden (brennt in 30 Min. komplett ab, unabhängig von der Ungleichmäßigkeit) und gleichzeitig Seil B an einem Ende. Sobald A erloschen ist (30 Min.), das zweite Ende von B anzünden — die Restlänge brennt jetzt beidseitig in 15 Min. Total: 30+15=45.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn dir wirklich nichts einfällt',
      paragraphs: [
        'Ein leerer Kopf ist kein Notfall. Besser laut irgendeine Teilstruktur denken — Annahmen benennen, den Rätseltyp einordnen, einen ersten Ansatz vorschlagen — als schweigend zu erstarren.',
        'Bei reinen Logik-/Zählrätseln wie dem Pferderätsel zählt das korrekte Ergebnis stärker. Bei Schätz- und lateralen Rätseln zählt der Prozess fast immer mehr als die exakte Zahl.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 12 abgeschlossen.',
      marcus: {
        subject: 'Re: Struktur statt Raten',
        body: 'Fermi-Zerlegung, das Pferderätsel komplett gelöst, die Eliminationslogik verstanden. Als Nächstes ein weiterer Themenwechsel: wie man eine Aktie pitcht und aktuelle Deals einordnet.',
      },
      next: { title: 'Eine Aktie pitchen, Deals einordnen', meta: '9 Min · +45 XP' },
    },
  ],
};
