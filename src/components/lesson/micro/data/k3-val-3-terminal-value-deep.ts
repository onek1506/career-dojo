// K3 Lektion 5 — TV-Sensitivität, implizite Growth-Rate, Sanity Checks.
// Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK B · VALUATION';

export const k3ValTerminalValueDeep: MicroLessonData = {
  id: 'k3-val-3-terminal-value-deep',
  module: MODULE,
  titleDe: 'Terminal Value, unter Druck getestet',
  topicTag: 'dcf',
  nextPath: '/lesson/k3-val-4-multiples-deep',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Terminal Value, unter Druck getestet',
      subtitle: 'Block B · Valuation, Advanced',
      marcus: {
        subject: 'Re: Die Zahl, die den ganzen DCF trägt',
        body: 'Gordon Growth gegen Exit Multiple konntest du schon berechnen. Die Frage, die zeigt, ob du dem Ergebnis vertrauen darfst: Prüfst du deine Annahme, oder nimmst du sie einfach hin?',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l5-diagnose',
      prompt: 'Gordon-Growth-TV beträgt 850, EBITDA im Jahr 5 ist 100. Welches implizite Exit-Multiple steckt darin?',
      options: ['8,5x', '10,0x', '7,5x', '9,0x'],
      correctIndex: 0,
      solution: 'Implizites Multiple = TV / EBITDA = 850 / 100 = 8,5x.',
      marcusCorrect: 'Richtig, sofort. Weiter zur Umkehrrichtung.',
      marcusWrong: 'Implizites Multiple = TV / EBITDA_Jahr5 = 850 / 100 = 8,5x. Nächste Slides holen die Herleitung nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Gordon Growth, kurz',
      paragraphs: [
        'TV = FCF_letztesJahr × (1+g) / (WACC−g). Beispiel: FCF Jahr 5 = 50, g = 2 %, WACC = 8 %. TV = 50×1,02 / (0,08−0,02) = 51 / 0,06 = **850**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Vom TV zum impliziten Multiple',
      paragraphs: [
        'Jeder TV lässt sich als Multiple auf das EBITDA im letzten Projektionsjahr ausdrücken — einfach TV durch EBITDA teilen. Bei TV 850 und EBITDA 100: **8,5x**.',
        'Der Sinn dahinter: Ein Gordon-Growth-Ergebnis wirkt abstrakt, ein Multiple ist greifbar. 8,5x lässt sich sofort gegen echte Trading Comps prüfen — wirkt das realistisch für diese Branche, oder deutlich zu hoch?',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l5-refresh-check',
      prompt: 'FCF Jahr 5 = 45, g = 2 %, WACC = 8 %, EBITDA Jahr 5 = 85. Impliziter Exit Multiple?',
      options: ['9,0x', '8,5x', '9,5x', '8,0x'],
      correctIndex: 0,
      solution: 'TV = 45×1,02/0,06 = 45,9/0,06 = 765. 765/85 = 9,0x.',
      marcusCorrect: 'Genau. Derselbe Zweischritt.',
      marcusWrong: 'TV = 45×1,02 / 0,06 = 765. Implizites Multiple = 765 / 85 = 9,0x.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Die Umkehrrichtung: implizite Growth Rate',
      paragraphs: [
        "Genauso testbar in die andere Richtung: Du nutzt die Exit-Multiple-Methode, 12,0x auf EBITDA Jahr 5 = 100 → TV = 1.200. Welche perpetuelle Wachstumsrate steckt implizit darin?",
        'Gordon-Formel nach g auflösen: 1.200 = 50×(1+g) / (0,10−g). Umgestellt: 120 − 1.200g = 50 + 50g → 70 = 1.250g → **g ≈ 5,6 %**.',
        'Ein Exit Multiple von 12x bei diesen Annahmen unterstellt also ein ewiges Wachstum von 5,6 % — deutlich über dem, was für ein langfristiges BIP-Wachstum realistisch ist (üblich: 2–3 %). Das ist ein Warnsignal, kein Rechenfehler.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l5-implied-g-check',
      prompt: 'Ein 12x-Exit-Multiple impliziert 5,6 % ewiges Wachstum, weit über dem langfristigen BIP-Wachstum von 2–3 %. Was folgt daraus?',
      options: [
        'Der Sanity Check schlägt fehl — das Exit-Multiple ist zu optimistisch',
        'Kein Problem, hohe Multiples sind normal',
        'Der WACC muss falsch sein',
        'Die FCF-Projektion ist automatisch falsch',
      ],
      correctIndex: 0,
      solution: 'Eine implizite Wachstumsrate deutlich über dem BIP-Trend signalisiert eine zu optimistische Exit-Annahme.',
      marcusCorrect: 'Korrekt. Genau dafür macht man den Check — um solche Annahmen zu erwischen, bevor sie ins Modell wandern.',
      marcusWrong: 'Eine implizite Wachstumsrate von 5,6 % ewig ist unrealistisch hoch. Der Sanity Check schlägt fehl — das Exit-Multiple sollte überprüft, nicht das Modell drumherum angepasst werden.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Wie empfindlich der TV wirklich ist',
      paragraphs: [
        'Zurück zum Ausgangsbeispiel: FCF 50, g 2 %, WACC 8 % → TV 850. Senkst du den WACC nur um einen Prozentpunkt auf 7 %: TV = 50×1,02/(0,07−0,02) = 51/0,05 = **1.020** — ein Sprung von 20 %, aus einer einzigen Prozentpunkt-Bewegung.',
        'Erhöhst du stattdessen g um einen Punkt auf 3 % (bei WACC 8 %): TV = 50×1,03/(0,08−0,03) = 51,5/0,05 = **1.030** — ähnlich groß. Kleine Annahmen, große Wertbewegung. Genau deshalb reicht „eine Zahl berechnen" nicht — sie muss geprüft werden.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Eine Methode präsentieren, ohne sie zu prüfen',
      paragraphs: [
        'Die Falle: einen DCF-Wert aus EINER Methode vorlegen, ohne ihn gegen die andere zu spiegeln. Ein Gordon-Growth-Ergebnis ohne Blick auf das implizite Multiple. Ein Exit-Multiple-Ergebnis ohne Blick auf die implizite Wachstumsrate.',
        'Ein Senior Banker fragt genau das als Erstes: „Was für ein Multiple steckt da implizit drin, und ist das plausibel?" Wer diese Frage nicht beantworten kann, hat nur gerechnet, nicht geprüft.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l5-drill1',
      prompt: 'FCF Jahr 5 = 60, g = 5 %, WACC = 10 %, EBITDA Jahr 5 = 140. Impliziter Exit Multiple?',
      options: ['9,0x', '8,5x', '9,5x', '10,0x'],
      correctIndex: 0,
      solution: 'TV = 60×1,05/0,05 = 63/0,05 = 1.260. 1.260/140 = 9,0x.',
      marcusCorrect: 'Sauber. Gleiches Muster, größere Zahlen.',
      marcusWrong: 'TV = 60×1,05 / 0,05 = 1.260. Implizites Multiple = 1.260 / 140 = 9,0x.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l5-drill2',
      prompt: 'Exit Multiple 8,0x auf EBITDA Jahr 5 = 125 (TV = 1.000). FCF Jahr 5 = 70, WACC = 12 %. Implizite Wachstumsrate?',
      options: ['≈4,7 %', '≈2,0 %', '≈8,0 %', '≈12,0 %'],
      correctIndex: 0,
      solution: '1.000 = 70(1+g)/(0,12−g) → 120 − 1.000g = 70 + 70g → 50 = 1.070g → g ≈ 4,7 %.',
      marcusCorrect: 'Korrekt — und plausibler als das vorige Beispiel, näherungsweise im realistischen Bereich.',
      marcusWrong: 'Umstellen: 1.000×(0,12−g) = 70×(1+g). 120−1.000g = 70+70g. 50 = 1.070g. g ≈ 4,7 %.',
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 05 abgeschlossen.',
      marcus: {
        subject: 'Re: Vertrauen, aber prüfen',
        body: 'Implizites Multiple aus Gordon Growth, implizite Wachstumsrate aus Exit Multiple, die Sensitivität dazwischen — der Terminal Value ist jetzt kein Blackbox-Ergebnis mehr, sondern etwas, das du gegenprüfen kannst. Als Nächstes: Multiples selbst, mit den Feinheiten, die K2 ausgelassen hat.',
      },
      next: { title: 'Multiples, die Feinheiten', meta: '8 Min · +45 XP' },
    },
  ],
};
