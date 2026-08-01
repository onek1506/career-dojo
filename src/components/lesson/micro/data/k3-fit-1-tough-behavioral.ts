// K3 Lektion 14 — the hard behavioral questions: failure, conflict,
// leadership without authority. Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK F · FIT & SUPERDAY';

export const k3FitToughBehavioral: MicroLessonData = {
  id: 'k3-fit-1-tough-behavioral',
  module: MODULE,
  titleDe: 'Die harten Behavioral-Fragen',
  topicTag: 'fit',
  nextPath: '/lesson/k3-fit-2-why-fulltime',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Die harten Behavioral-Fragen',
      subtitle: 'Block F · Fit & Superday',
      marcus: {
        subject: 'Re: Versagen, Konflikt, Führung ohne Titel',
        body: '„Tell me about your CV" konntest du strukturiert erzählen. Jetzt die drei Fragen, an denen die meisten scheitern, weil sie ihre Geschichten nicht ehrlich genug wählen: ein echtes Versagen, ein echter Konflikt, echte Führung ohne formale Autorität. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l14-diagnose',
      prompt: "Bei 'Tell me about a time you failed' — worauf sollte der Result-Teil vor allem eingehen?",
      options: [
        'Was du gelernt hast, belegt mit einem konkreten Beispiel, wie du es seitdem anders machst',
        'Wie du das Versagen möglichst kleinredest',
        'Wer sonst noch schuld war',
        'Das Versagen selbst, ohne Auflösung',
      ],
      correctIndex: 0,
      solution: 'Echtes Lernen, belegt mit Anwendung, ist das, was den Result-Teil trägt.',
      marcusCorrect: 'Richtig, sofort. Weiter zur vollständigen Struktur.',
      marcusWrong: 'Der Result-Teil trägt das eigentliche Gewicht der Antwort: was du daraus gelernt hast, belegt durch ein zweites, kurzes Beispiel, das zeigt, dass die Lektion wirklich saß. Kleinreden oder Schuldzuweisung wirkt beides schwach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'STAR, kurz',
      paragraphs: [
        'Situation, Task, Action, Result. Situation und Task knapp halten — der Kontext ist nur der Rahmen. Action ist der Kern: was du konkret getan hast. Result trägt bei Versagensfragen das meiste Gewicht.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die Fake-Failure-Falle',
      paragraphs: [
        "'Ich bin manchmal zu perfektionistisch' ist keine Versagensgeschichte — es ist eine Stärke, als Schwäche verkleidet. Interviewer erkennen dieses Muster sofort, es ist eines der bekanntesten Ausweichmanöver überhaupt.",
        'Ein echtes Versagen hat eine reale Konsequenz: eine verpasste Deadline, ein Fehler, der jemand anderen zusätzliche Arbeit gekostet hat, eine falsche Einschätzung mit sichtbarer Folge.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l14-refresh-check',
      prompt: 'Welche Eröffnung ist ein echtes Versagen, keine verkleidete Stärke?',
      options: [
        "'Ich habe die Dauer einer Aufgabe unterschätzt, mein Teamleiter musste kurz vor der Deadline einspringen.'",
        "'Ich habe mich zu sehr um Details gekümmert und dadurch Zeit verloren.'",
        'Beide gleich stark',
        'Keine von beiden ist als Antwort geeignet',
      ],
      correctIndex: 0,
      solution: 'Konkrete Fehleinschätzung mit realer Konsequenz — echtes Versagen, keine verkleidete Stärke.',
      marcusCorrect: 'Genau. Konkrete Konsequenz statt getarntem Kompliment.',
      marcusWrong: "Die zweite Formulierung ist die klassische Fake-Failure-Falle — eine Stärke im Versagens-Kostüm. Die erste hat eine reale, konkrete Konsequenz: jemand anderes musste einspringen.",
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Gerüst für die Versagensfrage',
      paragraphs: [
        'Situation: [ein konkretes Projekt oder eine konkrete Verantwortung]. Task: [was von dir erwartet wurde]. Action: [was du tatsächlich getan hast — und an welcher Stelle genau es schiefging]. Result: [die tatsächliche Konsequenz] plus [was du konkret geändert hast, mit einem zweiten kurzen Beispiel, das zeigt, dass die Lektion wirklich saß].',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Gerüst für Konflikt und Führung ohne Titel',
      paragraphs: [
        "Konflikt: Der Fehler, den die meisten machen, ist die Geschichte als 'ich hatte recht, und sie haben es am Ende eingesehen' zu erzählen. Der Fokus muss auf dem PROZESS liegen — zuhören, gemeinsame Basis finden, sich auf das geteilte Ziel konzentrieren. Interviewer testen emotionale Reife, nicht wer am Ende recht hatte.",
        "Führung ohne Autorität: Die Falle hier ist eine Geschichte zu wählen, die auf einem formalen Titel beruht ('als Teamkapitän...') — das beantwortet die Frage nicht. Es geht um Einfluss OHNE Titel: durch Fachwissen überzeugen, Eigeninitiative bei einem gemeinsamen Problem zeigen, Vertrauen aufbauen.",
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l14-conflict-check',
      prompt: 'Welche Result-Formulierung wirkt bei einer Konfliktgeschichte stärker?',
      options: [
        "'Wir haben eine Lösung gefunden, die beide Anliegen berücksichtigt hat, und das Projekt wurde pünktlich fertig.'",
        "'Ich hatte recht, und am Ende haben sie das auch eingesehen.'",
        'Beide gleich stark',
        'Keine von beiden gehört in eine Antwort',
      ],
      correctIndex: 0,
      solution: 'Fokus auf gemeinsame Lösung statt „ich hatte recht" — zeigt Prozesskompetenz.',
      marcusCorrect: 'Richtig. Prozess und gemeinsames Ergebnis, nicht wer gewonnen hat.',
      marcusWrong: "'Ich hatte recht' testet nicht das, was die Frage eigentlich prüft — Zusammenarbeit. Die erste Formulierung zeigt einen echten Lösungsprozess mit einem konkreten, geteilten Ergebnis.",
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Die verkleidete Stärke als Versagen verkaufen',
      paragraphs: [
        'Die Falle dieser ganzen Lektion, noch einmal zugespitzt: eine getarnte Stärke als Versagen präsentieren. Es ist eines der bekanntesten Muster in der Interview-Vorbereitung — und genau deshalb erkennen es erfahrene Interviewer sofort und werten es negativ, nicht neutral.',
        'Ein echtes, kleineres Versagen mit ehrlicher Reflexion schlägt jede polierte Fake-Story. Interviewer suchen Selbstreflexion, nicht Makellosigkeit.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l14-drill1',
      prompt: 'Welche Eröffnung vermeidet korrekt, sich auf einen formalen Titel zu stützen, bei der Führungsfrage?',
      options: [
        "'Ich habe gemerkt, dass niemand die Initiative ergriff, also habe ich das Problem strukturiert und das Team überzeugt, meinen Ansatz zu testen.'",
        "'Als Kapitän meiner Mannschaft habe ich die Aufstellung entschieden.'",
        'Beide gleich stark',
        'Keine von beiden passt zur Frage',
      ],
      correctIndex: 0,
      solution: 'Einfluss durch Initiative und Überzeugung, ohne formale Position, trifft genau den Kern der Frage.',
      marcusCorrect: 'Richtig. Genau das, was die Frage eigentlich testet — Einfluss ohne Titel.',
      marcusWrong: "Die Kapitäns-Geschichte beruht auf formaler Autorität — genau das, was die Frage NICHT sehen will. Die erste Formulierung zeigt Einfluss durch Initiative und Überzeugungskraft, ganz ohne Titel.",
    },
    {
      kind: 'minicheck',
      id: 'k3-l14-drill2',
      prompt: 'Welche Eröffnung ist ein echtes Versagen, keine verkleidete Stärke?',
      options: [
        "'Ich habe eine wichtige Interessengruppe bei einem Projekt übersehen und musste die Planung kurzfristig überarbeiten.'",
        "'Ich arbeite manchmal zu viele Überstunden, weil ich mich so für Projekte einsetze.'",
        'Beide gleich stark',
        'Keine von beiden ist geeignet',
      ],
      correctIndex: 0,
      solution: 'Konkreter Fehler mit realer Konsequenz — kein getarntes Kompliment.',
      marcusCorrect: 'Korrekt. Konkrete, ehrliche Konsequenz.',
      marcusWrong: 'Die zweite Formulierung ist wieder die Fake-Failure-Falle — Fleiß als Schwäche getarnt. Die erste hat eine echte Konsequenz: übersehene Interessengruppe, kurzfristige Überarbeitung.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: "Wenn dir keine 'große' Geschichte einfällt",
      paragraphs: [
        'Die Skala ist relativ. Niemand erwartet eine dramatische Katastrophe — ein kleinerer, echter Fehler mit ehrlicher Reflexion wird oft sogar bevorzugt gegenüber einer konstruiert wirkenden „großen" Geschichte.',
        'Denk an JEDES Projekt, auch ein kleines, bei dem etwas nicht nach Plan lief. Die Größe der Geschichte zählt weniger als die Ehrlichkeit der Reflexion.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 14 abgeschlossen.',
      marcus: {
        subject: 'Re: Ehrliche Geschichten schlagen polierte',
        body: 'Fake-Failure erkannt und vermieden, Konflikt als Prozess erzählt, Führung ohne Titel sauber abgegrenzt. Als Nächstes: Why Full-Time, Why this Group, und die Lateral-Story für Quereinsteiger.',
      },
      next: { title: 'Why Full-Time, Why this Group', meta: '9 Min · +45 XP' },
    },
  ],
};
