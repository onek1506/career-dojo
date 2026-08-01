// K3 Lektion 4 — Beta, Unlevering/Relevering, Kapitalstruktur-Effekte.
// Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK B · VALUATION';

export const k3ValWaccDeep: MicroLessonData = {
  id: 'k3-val-2-wacc-deep',
  module: MODULE,
  titleDe: 'WACC, unter der Haube',
  topicTag: 'dcf',
  nextPath: '/lesson/k3-val-3-terminal-value-deep',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'WACC, unter der Haube',
      subtitle: 'Block B · Valuation, Advanced',
      marcus: {
        subject: 'Re: Woher kommt das Beta eigentlich?',
        body: 'CAPM plug-and-chug konntest du schon — Beta, risikofreier Zins, Marktrisikoprämie, fertig. Woher das Beta kommt, wenn du keine Aktienkurshistorie hast, weil die Firma privat ist? Das ist die Frage, die zeigt, ob du es verstanden hast oder nur nachgerechnet hast.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l4-diagnose',
      prompt: 'Ein Comp hat Levered Beta 2,0, D/E 1,5, Steuersatz 33,3 %. Unlevered Beta?',
      options: ['1,0', '1,5', '1,33', '2,0'],
      correctIndex: 0,
      solution: 'Hamada: βu = βL / [1 + (1−t)×D/E] = 2,0 / [1 + 0,667×1,5] = 2,0 / 2,0 = 1,0.',
      marcusCorrect: 'Richtig, im Kopf gerechnet. Weiter zum eigentlichen Verfahren.',
      marcusWrong: 'βu = βL / [1 + (1−t)×(D/E)] = 2,0 / [1 + 0,667×1,5] = 2,0 / 2,0 = 1,0. Nächste zwei Slides holen die Herleitung nach.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Unlevern: Kapitalstruktur rausrechnen',
      paragraphs: [
        'Ein börsennotierter Comp hat sein eigenes Beta, das dessen Kapitalstruktur mit einpreist — mehr Schulden, mehr Aktienrisiko, höheres Beta. Um nur das Geschäftsrisiko zu isolieren, rechnest du die Fremdfinanzierung raus.',
        'Formel (Hamada): **βu = βL / [1 + (1−t)×(D/E)]**. Das Ergebnis, das Unlevered Beta, ist das reine Business-Risiko, unabhängig davon, wie der Comp finanziert ist.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Relevern: mit der eigenen Struktur',
      paragraphs: [
        'Umgekehrte Formel: **βL = βu × [1 + (1−t)×(D/E)]**. Beispiel: Unlevered Beta 1,0, Ziel-D/E 0,5, Steuersatz 30 %.',
        'βL = 1,0 × [1 + 0,7×0,5] = 1,0 × 1,35 = **1,35**. Das ist das Beta, das du für DEIN CAPM verwendest — nicht das des Comps.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l4-refresh-check',
      prompt: 'Unlevered Beta 1,0, D/E 1,0, Steuersatz 20 %. Relevered Beta?',
      options: ['1,8', '1,5', '1,2', '2,0'],
      correctIndex: 0,
      solution: 'βL = 1,0 × [1 + 0,8×1,0] = 1,0 × 1,8 = 1,8.',
      marcusCorrect: 'Sitzt. Weiter zum vollständigen Verfahren.',
      marcusWrong: 'βL = βu × [1 + (1−t)×D/E] = 1,0 × [1 + 0,8×1,0] = 1,8.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Das vollständige Verfahren',
      paragraphs: [
        "Die Frage, die das alles zusammenbindet: **'How do you calculate beta for a private company?'** Antwort in drei Schritten: Nimm mehrere börsennotierte Comps. Unlever jedes einzelne Beta mit dessen eigener Kapitalstruktur. Bilde den Durchschnitt der Unlevered Betas — das ist das reine Branchenrisiko.",
        'Dann relevere diesen Durchschnitt mit der Ziel-Kapitalstruktur — nicht der der Comps, sondern der des Unternehmens, das du bewertest (bei einer LBO-Bewertung: die geplante Post-Deal-Struktur). Das Ergebnis ist dein CAPM-taugliches Beta.',
        'Stillschweigende Annahme in der Standardformel: Das Beta der Schulden wird als null angenommen — Fremdkapital gilt als praktisch risikofrei aus Beta-Sicht. Eine Vereinfachung, aber die, die in fast jedem Modell verwendet wird.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Warum mehr Schulden nicht automatisch weniger WACC bedeutet',
      paragraphs: [
        'Steigt D/E, steigt βL — mehr Hebel, mehr Aktienrisiko, höhere Cost of Equity. Das reine Geschäftsrisiko (βu) bleibt gleich, aber die Aktionäre verlangen mehr Rendite für das zusätzliche Risiko.',
        'Deckt sich mit dem Punkt aus dem Grundgerüst: Mehr Fremdkapital senkt WACC nur bis zu einem gewissen Grad, dank Tax Shield. Ab einem gewissen Verschuldungsgrad zieht der steigende Risikoaufschlag bei Eigen- UND Fremdkapital stärker als der Steuervorteil — WACC steigt wieder.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l4-drill1',
      prompt: 'Levered Beta 1,8, D/E 1,0, Steuersatz 20 %. Unlevered Beta?',
      options: ['1,0', '1,44', '1,5', '1,8'],
      correctIndex: 0,
      solution: 'βu = 1,8 / [1 + 0,8×1,0] = 1,8 / 1,8 = 1,0.',
      marcusCorrect: 'Korrekt. Gleiche Formel, andere Zahlen.',
      marcusWrong: 'βu = βL / [1 + (1−t)×D/E] = 1,8 / [1 + 0,8×1,0] = 1,8 / 1,8 = 1,0.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l4-drill2',
      prompt: 'Unlevered Beta 0,9, D/E 2,0, Steuersatz 25 %. Relevered Beta?',
      options: ['2,25', '1,8', '2,0', '1,35'],
      correctIndex: 0,
      solution: 'βL = 0,9 × [1 + 0,75×2,0] = 0,9 × 2,5 = 2,25.',
      marcusCorrect: 'Richtig. Höherer Hebel, deutlich höheres Beta.',
      marcusWrong: 'βL = βu × [1 + (1−t)×D/E] = 0,9 × [1 + 0,75×2,0] = 0,9 × 2,5 = 2,25.',
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: 'Levered Betas direkt mitteln',
      paragraphs: [
        'Die Falle: den Durchschnitt der rohen, gemeldeten Levered Betas der Comps nehmen und direkt in CAPM einsetzen — ohne zu unlevern. Klingt nach einer Abkürzung. Ist ein Kategoriefehler.',
        'Comps haben unterschiedliche Kapitalstrukturen. Ihre Levered Betas sind nicht vergleichbar, bevor du die Finanzierung rausrechnest. Ein Comp mit hohem D/E hat ein aufgeblähtes Beta, das nichts mit dem tatsächlichen Geschäftsrisiko zu tun hat — und zieht deinen Durchschnitt in eine Richtung, die nichts mit deiner Zielfirma zu tun hat.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l4-drill3',
      prompt: 'Unlevered Beta 1,0, Steuersatz 30 %, Ziel-Levered-Beta 1,7. Welches D/E wurde verwendet?',
      options: ['1,0', '0,7', '1,7', '1,3'],
      correctIndex: 0,
      solution: '1,7 = 1,0×[1+0,7×(D/E)] → 0,7 = 0,7×(D/E) → D/E = 1,0.',
      marcusCorrect: 'Korrekt — rückwärts genauso zuverlässig wie vorwärts.',
      marcusWrong: 'Formel umstellen: 1,7 = 1,0×[1+0,7×(D/E)]. 0,7 = 0,7×(D/E). D/E = 1,0.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn die Debt-Beta-Annahme kippt',
      paragraphs: [
        'Die Standardformel setzt Debt Beta = 0 — eine vernünftige Annahme bei solider Bonität. Bei stark gehebelten oder notleidenden Comps ist das Fremdkapital selbst riskant genug, dass diese Annahme wackelt: Die Kreditgeber tragen dann spürbares Ausfallrisiko, und ein Debt Beta ungleich null wäre technisch korrekter.',
        'Für die meisten Interviews reicht die Standardannahme. Zu wissen, wann sie bricht, ist der Unterschied zwischen jemandem, der die Formel kennt, und jemandem, der versteht, wofür sie steht.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 04 abgeschlossen.',
      marcus: {
        subject: 'Re: Beta ist kein Zufallswert mehr',
        body: 'Unlevern, relevern, die Kapitalstruktur-Effekte auf WACC — kein Blackbox-Input mehr. Als Nächstes der Wertblock, der beim DCF fast immer dominiert: der Terminal Value, diesmal mit Sensitivität und Sanity Checks.',
      },
      next: { title: 'Terminal Value, unter Druck getestet', meta: '9 Min · +45 XP' },
    },
  ],
};
