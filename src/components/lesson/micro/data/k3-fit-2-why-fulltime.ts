// K3 Lektion 15 — Why Full-Time/why this group, lateral story, internship
// reflection. Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK F · FIT & SUPERDAY';

export const k3FitWhyFulltime: MicroLessonData = {
  id: 'k3-fit-2-why-fulltime',
  module: MODULE,
  titleDe: 'Why Full-Time, Why this Group',
  topicTag: 'fit',
  nextPath: '/lesson/k3-mock-1-superday',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Why Full-Time, Why this Group',
      subtitle: 'Block F · Fit & Superday',
      marcus: {
        subject: 'Re: Nach dem Praktikum wird die Frage präziser',
        body: '„Why IB" hattest du in K2 im Griff. Beim Full-Time-Interview wird sie präziser: Why THIS group, was hat dich das Praktikum gelehrt, und falls du quereinsteigst — was ist deine Lateral-Story? Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l15-diagnose',
      prompt: "Full-Time-Interview: 'Why this group?' (z. B. TMT, Healthcare, FIG). Was ist die schwächste mögliche Antwort?",
      options: [
        "'Ich habe keine starke Präferenz, ich nehme, was verfügbar ist.'",
        'Ein spezifischer, recherchierter Grund, der zu den typischen Deal-Typen der Gruppe passt',
        'Ein Grund, der an ein konkretes Projekt aus dem Praktikum anknüpft',
        'Eine Verbindung zu vorherigem Studieninhalt oder Erfahrung',
      ],
      correctIndex: 0,
      solution: 'Keine Präferenz zu zeigen signalisiert fehlendes echtes Interesse.',
      marcusCorrect: 'Richtig, sofort. Weiter zur vollständigen Struktur.',
      marcusWrong: 'Keine Präferenz zu zeigen liest sich als fehlendes echtes Interesse an genau dieser Rolle — ein echtes, reales Warnsignal. Alle anderen Optionen zeigen konkrete, recherchierte Substanz.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Warum Gruppen-Recherche jetzt zählt',
      paragraphs: [
        'Bei K2s „Why IB" ging es um die Branche allgemein. Beim Full-Time-Angebot geht es um die konkrete Gruppe — Industriecoverage oder Produktgruppe —, in der du landen sollst. Hier zählt echte, spezifische Kenntnis der Gruppe, nicht generisches Interesse an Investment Banking.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Die 3-Teile-Struktur',
      paragraphs: [
        'Konkretes Wissen über die typischen Deal-Arten und den aktuellen Fokus der Gruppe — zeigt echte Recherche. Persönlicher Bezug — Studieninhalt, frühere Erfahrung, echtes intellektuelles Interesse an dem Sektor. Was du der Gruppe konkret mitbringst.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l15-refresh-check',
      prompt: 'Welche „Why this group"-Antwort ist stärker?',
      options: [
        "'Die Gruppe arbeitet an genau den Deal-Typen, die mich fachlich am meisten interessieren, und mein Studienschwerpunkt passt dazu.'",
        "'Die Gruppe hat einen guten Ruf.'",
        'Beide gleich stark',
        'Kommt auf den Interviewer an',
      ],
      correctIndex: 0,
      solution: 'Konkrete, recherchierte Verbindung schlägt einen generischen Ruf-Verweis.',
      marcusCorrect: 'Genau. Konkret und recherchiert statt generisch.',
      marcusWrong: "'Guter Ruf' ist generisch und könnte auf jede Gruppe zutreffen. Die erste Antwort zeigt konkretes Wissen und eine echte persönliche Verbindung.",
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Die Lateral-Story',
      paragraphs: [
        'Für Quereinsteiger (aus einer anderen Bank, Consulting, oder einer ganz anderen Branche): den Wechsel direkt ansprechen, nicht ausweichen. Dann den ROTEN FADEN erklären — was an deinem bisherigen Weg UND an IB dich reizt, ist konsistent (analytische Tiefe, Kundenarbeit, Deal-getriebene Arbeit) — statt den alten Job schlechtzureden.',
        'Und zeigen, dass du die Anforderungen von IB wirklich verstehst (Tempo, Arbeitszeiten) — das beweist, dass es kein naiver „Gras ist grüner"-Wechsel ist, sondern eine informierte Entscheidung.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Praktikums-Reflexion',
      paragraphs: [
        'Ein konkreter, echter Moment oder eine konkrete Aufgabe, die dir wirklich etwas beigebracht hat — nicht „ich habe so viel gelernt" ohne Substanz. Wie dieser Moment eine SPEZIFISCHE Präferenz geformt hat — die Verbindung zurück zu „Why this group" schließen. Und eine ehrliche, konstruktiv formulierte Anerkennung von etwas, das schwerer oder anders war als erwartet.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l15-reflection-check',
      prompt: 'Welche Praktikums-Reflexion ist stärker?',
      options: [
        "'Ein Projekt zur Marktanalyse hat mir gezeigt, wie viel Tiefe in der Sektor-Recherche steckt — genau das hat mein Interesse an dieser Gruppe konkretisiert.'",
        "'Ich habe unglaublich viel gelernt, alle im Team waren super nett.'",
        'Beide gleich stark',
        'Keine von beiden gehört in eine Antwort',
      ],
      correctIndex: 0,
      solution: 'Konkreter Moment plus daraus geformte Präferenz schlägt eine generische Aussage.',
      marcusCorrect: 'Richtig. Konkret und mit einer klaren Konsequenz verknüpft.',
      marcusWrong: "'Super nett' und 'viel gelernt' sind ohne Substanz. Die erste Antwort nennt einen konkreten Moment und verbindet ihn direkt mit einer geformten Präferenz.",
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: "Das 'Gras ist grüner'-Framing",
      paragraphs: [
        "Die Falle bei der Lateral-Story: den alten Job oder Arbeitgeber schlechtreden, statt den roten Faden zu erklären. Interviewer lesen das als Warnsignal: 'Wird diese Person in zwei Jahren genauso über uns sprechen, wenn sie weiterzieht?'",
        'Die stärkere Version erklärt, was an beiden Wegen konsistent ist — nicht, was am alten Weg schlecht war.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l15-drill1',
      prompt: 'Welche Lateral-Story-Eröffnung vermeidet die „Gras ist grüner"-Falle?',
      options: [
        "'Was mich an meiner bisherigen Rolle gereizt hat — analytische Tiefe, Kundenarbeit — finde ich in IB in noch konzentrierterer Form.'",
        "'Meine alte Firma war nicht das Richtige für mich, deshalb wechsle ich.'",
        'Beide gleich stark',
        'Keine von beiden passt',
      ],
      correctIndex: 0,
      solution: 'Roter Faden statt Abwertung des vorherigen Wegs.',
      marcusCorrect: 'Korrekt. Konsistenz statt Abwertung.',
      marcusWrong: "'War nicht das Richtige' liest sich wie eine Abwertung, kein roter Faden. Die erste Formulierung zeigt, was an beiden Wegen konsistent ist.",
    },
    {
      kind: 'minicheck',
      id: 'k3-l15-drill2',
      prompt: 'Welche „Why this group"-Antwort ist stärker?',
      options: [
        "'Ich habe während des Praktikums an einem Projekt gearbeitet, das genau den Deal-Typ dieser Gruppe abbildet, und das hat mein Interesse konkret bestätigt.'",
        "'Diese Gruppe klingt spannend.'",
        'Beide gleich stark',
        'Kommt auf die Gruppe an',
      ],
      correctIndex: 0,
      solution: 'Konkrete Erfahrung mit direktem Bezug schlägt eine vage Aussage.',
      marcusCorrect: 'Sauber. Erfahrung statt Bauchgefühl.',
      marcusWrong: "'Klingt spannend' zeigt keine Substanz. Die erste Antwort verankert das Interesse in einer konkreten, erlebten Erfahrung.",
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn du noch keine klare Präferenz hast',
      paragraphs: [
        'Ehrlich zuzugeben, dass sich deine Präferenz noch formt, ist völlig in Ordnung — solange du sie mit KRITERIEN rahmst: „Ich fühle mich zu Gruppen mit X und Y hingezogen, und ich lerne gerade, welche konkrete Gruppe am besten passt" statt reiner Gleichgültigkeit.',
        'Das zeigt echtes Engagement, auch ohne eine fertige Antwort.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 15 abgeschlossen.',
      marcus: {
        subject: 'Re: Fit-Block abgeschlossen',
        body: 'Gruppen-Recherche, Lateral-Story mit rotem Faden, Praktikums-Reflexion mit Substanz — der Fit-Block ist komplett. Als Nächstes der Abschluss: ein Mixed Mock, unter Druck, quer durch den ganzen K3-Pfad.',
      },
      next: { title: 'Der Mixed Mock', meta: '8 Min · +50 XP' },
    },
  ],
};
