// ============================================================
// Kategorie 1 — Lektion 01: Das Spielfeld
// Orientation lesson, zero hard finance terms. Marcus is patient and
// encouraging; interview relevance is framed as a calm future picture,
// never as pressure. Part of the standalone K1 tree (k1- id prefix).
// ============================================================

import type { MicroLessonData } from '../types';

const MODULE = 'MODUL 00 · ORIENTIERUNG';

export const k1IntroSpielfeld: MicroLessonData = {
  id: 'k1-intro-spielfeld',
  module: MODULE,
  titleDe: 'Das Spielfeld',
  nextPath: '/lesson/k1-acc-1-income-statement',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Das Spielfeld',
      subtitle: 'Was Investment Banking ist und wie der Weg dahin aussieht',
      marcus: {
        subject: 'Re: Schön, dass du da bist',
        body: 'Bevor wir über Zahlen reden, schauen wir uns in Ruhe das Spielfeld an. Was macht eine Investmentbank überhaupt? Wie kommt man rein? Und warum prüfen sie im Interview technisches Wissen? Kein Vorwissen nötig, und keine Eile. Wir haben Zeit.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE GROSSE FRAGE',
      heading: 'Was macht eine Investmentbank?',
      paragraphs: [
        'Ganz einfach gesagt: Eine Investmentbank berät Unternehmen bei den größten Geldentscheidungen ihres Lebens.',
        'Ein Konzern will eine andere Firma kaufen. Ein Familienunternehmen will verkauft werden. Ein Start-up braucht frisches Kapital. In all diesen Momenten holt man sich eine Bank dazu.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ZWEI SEITEN',
      heading: 'Firmen kaufen und verkaufen: M&A',
      paragraphs: [
        'Der größte Teil dieser Beratung dreht sich darum, Firmen zu kaufen und zu verkaufen.',
        'In der Branche nennt man das **M&A** (Mergers & Acquisitions, also Fusionen und Übernahmen). Eine Bank hilft dabei, den richtigen Preis zu finden und den Deal über die Bühne zu bringen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DEIN PLATZ DARIN',
      heading: 'Wo du irgendwann sitzt',
      paragraphs: [
        'Als Analyst bist du am Anfang derjenige, der die Analysen baut: Wie viel ist eine Firma wert? Wie sieht das Geschäft in Zahlen aus?',
        'Genau dafür lernst du hier die Grundlagen. Stück für Stück wirst du diese Sprache sprechen, ganz ohne Vorkenntnisse.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER WEG REIN · 1',
      heading: 'Es beginnt mit der Spring Week',
      paragraphs: [
        'Der erste Kontakt ist meist die **Spring Week**: ein paar Tage in der Bank, oft im ersten oder zweiten Studienjahr.',
        'Das ist bewusst niedrigschwellig. Du schaust rein, lernst Leute kennen, bekommst ein Gefühl für den Alltag. Niemand erwartet, dass du schon alles kannst.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DER WEG REIN · 2',
      heading: 'Vom Sommer zum festen Angebot',
      paragraphs: [
        'Läuft die Spring Week gut, folgt das **Summer Internship**: ein bezahltes Praktikum über den Sommer, meist rund zehn Wochen.',
        'Und überzeugst du dort, kommt am Ende oft das feste Jobangebot. So wächst aus ein paar Schnuppertagen ein Einstieg.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k1-l1-path',
      prompt: 'Womit beginnt der typische Weg in eine Investmentbank?',
      options: [
        'Mit der Spring Week',
        'Mit dem festen Jobangebot',
        'Mit dem Summer Internship',
        'Mit der Beförderung zum Chef',
      ],
      correctIndex: 0,
      solution: 'Die Reihenfolge ist: Spring Week (Reinschnuppern), dann Summer Internship, dann das feste Angebot.',
      marcusCorrect: 'Genau. Erst reinschnuppern, dann Praktikum, dann fester Job. Ein Schritt nach dem anderen.',
      marcusWrong: 'Denk an den Anfang: Man schnuppert zuerst in der Spring Week rein. Schau nochmal.',
    },
    {
      kind: 'concept',
      eyebrow: 'WARUM TECHNIK?',
      heading: 'Warum im Interview Technik drankommt',
      paragraphs: [
        'Im Interview wird dich jemand nach Bilanzen, Gewinn und Bewertung fragen. Nicht, um dich reinzulegen.',
        'Sondern weil das die tägliche Sprache des Jobs ist. Wer sie spricht, zeigt: Ich kann hier sofort mitarbeiten.',
        'Und das Beste: Diese Sprache ist lernbar. Kein Talent, kein Geheimnis. Genau das machen wir ab der nächsten Lektion.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 01 abgeschlossen.',
      marcus: {
        subject: 'Re: Spielfeld steht',
        body: 'Du kennst jetzt das Spielfeld: was eine Bank tut, wie man reinkommt und warum Technik geprüft wird. Ab der nächsten Lektion fangen wir mit dem ersten Bericht an, ganz langsam, an einem Kaffeeladen. Bis dahin.',
      },
      next: { title: 'Lektion 02: Income Statement, Teil 1', meta: '9 Min · +35 XP' },
    },
  ],
};
