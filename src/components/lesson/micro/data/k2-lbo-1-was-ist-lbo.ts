// K2 Lektion 12 — ported verbatim from docs/k2-sections/12-k2-lbo-1-was-ist-lbo.md (11 slides).

import type { MicroLessonData } from '../types';

const MODULE = 'K2 · BLOCK E · LBO';

export const k2LboWasIst: MicroLessonData = {
  id: 'k2-lbo-1-was-ist-lbo',
  module: MODULE,
  titleDe: 'Was ein LBO ist',
  topicTag: 'lbo',
  nextPath: '/lesson/k2-lbo-2-mechanik',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Was ein LBO ist',
      subtitle: 'Block E · LBO',
      marcus: {
        subject: 'Re: Neues Terrain',
        body: 'Neues Terrain: Private Equity. Die LBO-Frage kommt nicht nur im PE-Interview — sobald M&A oder Leveraged Finance im Gespräch fällt, taucht sie auch im Banking-Call auf. Sie ist die Eintrittskarte: Wer sie sauber beantwortet, klingt, als hätte er verstanden, wovon die Branche lebt. Heute zerlegen wir sie — Struktur, Hebel, und die drei Quellen, aus denen der Return tatsächlich kommt.',
      },
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FRAGE',
      heading: 'Zwei Prüfungen in einer Frage',
      paragraphs: [
        "Im Original: **'What is an LBO and why does leverage boost returns?'** Zwei Prüfungen in einer Frage. Die erste: Kennst du die Struktur? Die zweite, wichtigere: Hast du verstanden, warum dieses Modell überhaupt existiert?",
        'Eine auswendig gelernte Definition beantwortet nur die erste Hälfte — auf die zweite wartet der Interviewer.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die Maschine',
      paragraphs: [
        'Die Struktur: Eine PE-Firma kauft ein Unternehmen und finanziert den Kaufpreis überwiegend mit Fremdkapital — typisch 50 bis 70 %. Nur der Rest kommt als Eigenkapital aus dem Fonds.',
        'Der Punkt, den viele falsch erzählen: Die Schulden liegen danach nicht beim Fonds, sondern beim gekauften Unternehmen selbst — es bedient und tilgt sie aus dem eigenen operativen Cashflow. Nach rund fünf Jahren der Exit: Verkauf an einen Strategen, an den nächsten Fonds oder an die Börse.',
        'Die Hebel-Intuition passt in einen Satz: Wer ein Haus mit 80 % Hypothek kauft und der Hauswert steigt um 10 %, hat sein Eigenkapital um 50 % gesteigert.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE TIEFE',
      heading: 'Die drei Return-Treiber',
      paragraphs: [
        'Woher kommt der Return beim Exit? Aus genau drei Quellen — und der Interviewer erwartet alle drei. **Eins, Debt Paydown:** Jeder getilgte Euro Schulden gehört rechnerisch den Eigentümern; bei unverändertem Firmenwert wächst das Eigenkapital still mit. **Zwei, EBITDA-Wachstum:** Das Unternehmen verdient mehr, also ist es beim Verkauf mehr wert. **Drei, Multiple Expansion:** Der nächste Käufer zahlt einen höheren Multiple — der unzuverlässigste der drei, weil er am Markt hängt und nicht an der eigenen Arbeit.',
        'Dazu zwei Faustwerte, die jeder am Tisch im Kopf hat: **2,0x** auf das Eigenkapital über fünf Jahre entspricht rund **15 % IRR**, **3,0x** rund **25 %**.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE MUSTERANTWORT',
      heading: 'Der LBO in drei Sätzen',
      paragraphs: [
        'So sagst du es in rund 30 Sekunden auf — drei Sätze, keine Lehrbuchdefinition:',
        "**1. Die Struktur:** 'A PE firm buys a company using mostly debt — typically 50 to 70 percent of the purchase price — so the equity check stays small.'",
        "**2. Der Motor:** 'The company itself services and repays that debt out of its own cash flows over a holding period of around five years.'",
        "**3. Der Return:** 'At exit, returns come from three drivers — debt paydown, EBITDA growth and multiple expansion — and they all land on that small equity base, which is why leverage boosts returns.'",
        "Struktur, Motor, Treiber. Der dritte Satz beantwortet das 'why' gleich mit — genau die Hälfte, an der die meisten vorbeireden.",
      ],
    },
    {
      kind: 'minicheck',
      id: 'k2-l12-lever',
      prompt: 'Kaufpreis 100 Mio. €, davon 80 % fremdfinanziert. Beim Exit ist das Unternehmen 10 % mehr wert; Schulden unverändert, Zinsen ignorieren wir. Um wie viel Prozent ist das Eigenkapital gestiegen?',
      options: ['+50 %', '+10 %', '+20 %', '+80 %'],
      correctIndex: 0,
      solution: 'Equity Start 100−80=20; Exit-Wert 110−80=30; Zuwachs 10/20=+50%.',
      marcusCorrect: 'Korrekt. Der Zuwachs von 10 landet komplett auf der Equity-Basis von 20: von 20 auf 30. Die Bank will nur ihre 80 zurück.',
      marcusWrong: 'Equity am Anfang: 100 − 80 = 20. Wert +10 → Eigenkapital 110 − 80 = 30. Von 20 auf 30 sind +50 %. Der Firmenwert stieg um 10 %, das Eigenkapital um das Fünffache — das ist der Hebel.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l12-check',
      prompt: 'Kaufpreis 100 Mio. €, 70 % Fremdkapital. Wie groß ist der Equity-Scheck des Fonds — und warum ist das für den Return zentral?',
      options: [
        'Der spätere Wertzuwachs fällt komplett auf diese kleinere Basis (30 Mio. €)',
        '70 Mio. € — der Fonds trägt immer den größeren Teil',
        '30 Mio. € — weil weniger Eigenkapital die Zinslast senkt',
        '100 Mio. € — die Schulden kommen zusätzlich obendrauf',
      ],
      correctIndex: 0,
      solution: 'Equity = Kaufpreis − Debt = 100 − 70 = 30. Kleinere Basis, gleicher Zuwachs → stärkerer Hebel.',
      marcusCorrect: 'Korrekt. Kaufpreis = Fremd- plus Eigenkapital: 100 − 70 = 30. Je höher der Kreditanteil, desto kleiner der Scheck — und desto stärker hebelt derselbe Wertzuwachs.',
      marcusWrong: 'Das Fremdkapital finanziert einen Teil des Kaufpreises, es kommt nicht obendrauf: 100 − 70 = 30 Mio. €. Und die Zinslast hängt an den Schulden, nicht am Eigenkapital. Zentral ist die kleine Basis, auf der der gesamte Zuwachs landet.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l12-drivers',
      prompt: "'Name the three return drivers in an LBO.' Welcher Begriff gehört NICHT in die Antwort?",
      options: ['Höhere Zinskosten', 'Debt Paydown', 'EBITDA-Wachstum', 'Multiple Expansion'],
      correctIndex: 0,
      solution: 'Zinsen sind Kosten, kein Return-Treiber.',
      marcusCorrect: 'Korrekt. Zinsen sind der Preis des Hebels, kein Treiber — sie stehen auf der Kostenseite der Rechnung.',
      marcusWrong: 'Die drei Treiber sind Debt Paydown, EBITDA-Wachstum und Multiple Expansion. Höhere Zinskosten erzeugen keinen Return — sie fressen ihn.',
    },
    {
      kind: 'minicheck',
      id: 'k2-l12-irr',
      prompt: 'Ein Fonds macht aus seinem Eigenkapital in fünf Jahren das Dreifache — ein 3,0x. Welcher IRR entspricht das ungefähr?',
      options: ['rund 25 %', 'rund 15 %', 'rund 40 %', 'rund 60 %'],
      correctIndex: 0,
      solution: 'Faustwerte: 2,0x/5J ≈ 15% IRR; 3,0x/5J ≈ 25% IRR.',
      marcusCorrect: 'Korrekt. 3,0x über fünf Jahre ≈ 25 % IRR — und das Schwesterpaar dazu: 2,0x ≈ 15 %. Beide Werte kommen im Gespräch ohne Taschenrechner.',
      marcusWrong: 'Die Faustwerte für fünf Jahre Haltedauer: 2,0x ≈ 15 % IRR, 3,0x ≈ 25 %. Zur Einordnung: 60 % pro Jahr über fünf Jahre wäre fast eine Verzehnfachung, kein 3,0x.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Nicht jedes Unternehmen ist ein gutes Target',
      paragraphs: [
        "Die Falle ist der Umkehrschluss: 'Wenn Leverage Returns hebelt, macht Leverage jedes Unternehmen zum guten LBO-Target.' Nein. Der Hebel wirkt in beide Richtungen, und er muss jedes Quartal bedient werden.",
        'Ein gutes Target braucht deshalb drei Eigenschaften: **stabile, planbare Cashflows** — die Bank will ihre Zinsen auch im schwachen Jahr sehen. **Wenig CapEx-Bedarf** — jeder Euro, der zwingend in Maschinen fließt, fehlt bei der Tilgung. Und daraus folgend: **die Fähigkeit, die Schulden tatsächlich abzutragen.**',
        "Ein zyklisches Unternehmen mit Investitionsstau und 70 % Fremdkapital ist kein LBO — das ist eine Insolvenz mit Anlauf. Wer im Interview 'leverage boosts returns' sagt, ohne diese Bedingungen zu nennen, hat die halbe Antwort. Der Interviewer merkt es.",
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 12 abgeschlossen.',
      marcus: {
        subject: 'Re: Die Eintrittsfrage sitzt',
        body: 'Struktur, Motor, drei Treiber, zwei Faustwerte — die LBO-Eintrittsfrage sitzt. In der nächsten Lektion wird gerechnet: Sources & Uses, Tilgung, Exit — die Mechanik hinter den drei Sätzen.',
      },
      next: { title: 'LBO-Mechanik', meta: '8 Min · +50 XP' },
    },
  ],
};
