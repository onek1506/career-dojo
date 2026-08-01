// K3 Lektion 8 — Steuerliche Deal-Struktur (Boot-Regel), Earnouts.
// Speed-Run, skip target: 5.

import type { MicroLessonData } from '../types';

const MODULE = 'K3 · BLOCK C · M&A';

export const k3MaDealStructure: MicroLessonData = {
  id: 'k3-ma-2-deal-structure',
  module: MODULE,
  titleDe: 'Deal-Struktur optimieren',
  topicTag: 'ma',
  nextPath: '/lesson/k3-lbo-1-full-model',
  slides: [
    {
      kind: 'hook',
      module: MODULE,
      title: 'Deal-Struktur optimieren',
      subtitle: 'Block C · M&A, Advanced',
      marcus: {
        subject: 'Re: Cash-Deals sind immer steuerpflichtig',
        body: 'Cash, Stock, Debt kanntest du als Finanzierungsfrage. Es ist auch eine Steuerfrage — und zwar für den Target-Aktionär, nicht für den Käufer. Testfrage zuerst.',
      },
    },
    {
      kind: 'minicheck',
      id: 'k3-l8-diagnose',
      prompt: 'Ein Target-Aktionär hat einen Steuerbasiswert von 20 pro Aktie, der Deal zahlt 100 pro Aktie komplett in Cash, Kapitalertragsteuer 20 %. Nettoerlös nach Steuern pro Aktie?',
      options: ['84', '100', '80', '96'],
      correctIndex: 0,
      solution: 'Gewinn = 100−20=80. Steuer = 80×0,2=16. Netto = 100−16=84.',
      marcusCorrect: 'Richtig, sofort erkannt. Weiter zu gemischten Strukturen.',
      marcusWrong: 'Gewinn = 100−20 = 80. Steuer darauf = 80×0,2 = 16. Netto nach Steuern = 100−16 = 84. Bei Cash immer sofort steuerpflichtig — das ist der Ausgangspunkt.',
      skipIfCorrectToIndex: 5,
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Cash ist immer steuerpflichtig',
      paragraphs: [
        'Ein reiner Cash-Deal ist für den Target-Aktionär ein sofortiges, steuerpflichtiges Verkaufsereignis. Er realisiert seinen Gewinn (Verkaufspreis minus Basiswert) und zahlt darauf Kapitalertragsteuer — sofort, unabhängig davon, ob er das Geld reinvestiert.',
        'Ein reiner Stock-Deal kann dagegen, wenn er bestimmte Bedingungen erfüllt (u. a. „Continuity of Interest" — ein ausreichend hoher Anteil der Gegenleistung muss Aktien sein), als steuerneutrale Reorganisation gelten: Der Aktionär tauscht seine Basis in die neuen Aktien um, ohne sofort Steuern zu zahlen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'AUFFRISCHUNG',
      heading: 'Gleicher Preis, unterschiedliches Nettoergebnis',
      paragraphs: [
        'Auch bei identischem Kaufpreis unterscheidet sich das, was tatsächlich beim Aktionär ankommt: Beim Cash-Deal netto 84 (aus dem Diagnose-Beispiel), sofort verfügbar, aber sofort versteuert. Beim Stock-Deal die vollen 100 in Aktien, aber die Steuer ist nur aufgeschoben, nicht erlassen — sie fällt an, wenn er die neuen Aktien irgendwann verkauft.',
        'Das erklärt, warum Target-Aktionäre bei einem Cash-Deal oft einen höheren Preis verlangen als bei einem vergleichbaren Stock-Deal — sie kompensieren den sofortigen Steuerabzug.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l8-refresh-check',
      prompt: 'Basiswert 30, Cash-Deal-Preis 150, Kapitalertragsteuer 25 %. Nettoerlös?',
      options: ['120', '150', '112,5', '105'],
      correctIndex: 0,
      solution: 'Gewinn=150−30=120. Steuer=120×0,25=30. Netto=150−30=120.',
      marcusCorrect: 'Genau. Gleicher Mechanismus.',
      marcusWrong: 'Gewinn = 150−30 = 120. Steuer = 120×0,25 = 30. Netto nach Steuern = 150−30 = 120.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Gemischte Deals — die Boot-Regel',
      paragraphs: [
        'Realistisch sind selten reine Cash- oder reine Stock-Deals, sondern eine Mischung — genannt „Boot", wenn Cash oder anderes Nicht-Aktien-Vermögen in einen ansonsten steuerneutralen Stock-Deal gemischt wird. Die Boot-Regel: Steuerpflichtig ist nur der KLEINERE Betrag aus (a) dem gesamten realisierten Gewinn oder (b) dem erhaltenen Boot.',
        'Beispiel: Aktionär erhält 80 in Aktien plus 20 in Cash (insgesamt 100), Basiswert 20. Gesamtgewinn = 100−20=80. Boot = 20. Steuerpflichtiger Gewinn = das Kleinere von beidem = **20**. Steuer bei 20 % = **4**.',
        'Der Großteil des Gewinns (60 der 80) bleibt aufgeschoben, weil der Großteil der Gegenleistung Aktien war — genau der Vorteil, den eine gemischte Struktur bietet.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l8-boot-check',
      prompt: 'Aktionär erhält 60 in Aktien plus 40 in Cash (insgesamt 100), Basiswert 25, Steuersatz 20 %. Steuer auf die Transaktion?',
      options: ['8', '15', '20', '6'],
      correctIndex: 0,
      solution: 'Gesamtgewinn=100−25=75. Boot=40. Steuerpflichtig=Min(75,40)=40. Steuer=40×0,2=8.',
      marcusCorrect: 'Korrekt. Immer das Kleinere von Gewinn und Boot.',
      marcusWrong: 'Gesamtgewinn = 100−25 = 75. Boot = 40. Steuerpflichtiger Betrag = das Kleinere von beidem = 40. Steuer = 40×0,2 = 8.',
    },
    {
      kind: 'concept',
      eyebrow: 'ADVANCED-KERN',
      heading: 'Earnouts — den Preis an Performance koppeln',
      paragraphs: [
        'Ein Earnout ist eine bedingte Kaufpreiskomponente: Ein Grundpreis wird sofort gezahlt, ein zusätzlicher Betrag nur, wenn das Target bestimmte Ziele nach Deal-Abschluss erreicht — meist EBITDA oder Umsatz über 1–3 Jahre.',
        'Beispiel: Grundpreis 400, zusätzlich bis zu 100 Earnout, wenn das Target im ersten Jahr 50 EBITDA erreicht. Wird das Ziel erreicht, Gesamtpreis 500; sonst bleibt es bei 400.',
        'Earnouts überbrücken Bewertungslücken: Der Käufer ist skeptisch gegenüber den optimistischen Projektionen des Verkäufers, der Verkäufer ist überzeugt von ihnen. Der Earnout lässt beide Seiten Recht behalten — wenn die Projektionen stimmen.',
      ],
    },
    {
      kind: 'concept',
      eyebrow: 'DIE FALLE',
      heading: "'Stock-Deals sind immer steuerfrei' — nicht immer",
      paragraphs: [
        'Die Falle: annehmen, dass ein Deal mit Aktienkomponente automatisch komplett steuerneutral ist. Sobald Cash oder anderes Boot beigemischt wird, wird mindestens ein Teil sofort steuerpflichtig — begrenzt auf den Boot-Betrag, aber eben nicht null.',
        'Interviewer stellen diese Frage gern genau so: „Ist ein 90/10-Stock/Cash-Deal steuerfrei?" Die richtige Antwort ist nicht ja oder nein, sondern: teilweise — der Cash-Anteil (Boot) löst Steuer aus, begrenzt auf den kleineren Betrag aus Gewinn und Boot.',
      ],
    },
    {
      kind: 'minicheck',
      id: 'k3-l8-drill1',
      prompt: 'Warum akzeptiert ein Verkäufer manchmal lieber einen Earnout statt eines niedrigeren fixen Preises?',
      options: [
        'Um vom Upside zu profitieren, wenn die eigenen Projektionen eintreffen',
        'Weil Earnouts steuerlich immer günstiger sind',
        'Weil Käufer Earnouts nie kündigen können',
        'Um das Closing zu beschleunigen',
      ],
      correctIndex: 0,
      solution: 'Ein Earnout lässt den Verkäufer am tatsächlichen Erfolg teilhaben, statt ihn im Voraus zu verschenken.',
      marcusCorrect: 'Richtig. Der Verkäufer wettet auf die eigenen Zahlen — bei Erfolg zahlt sich das aus.',
      marcusWrong: 'Ein Earnout gibt dem Verkäufer die Chance, vom Upside zu profitieren, falls seine optimistischeren Projektionen eintreffen — statt einen niedrigeren Fixpreis zu akzeptieren, nur weil der Käufer skeptisch ist.',
    },
    {
      kind: 'minicheck',
      id: 'k3-l8-drill2',
      prompt: 'Aktionär erhält 90 in Aktien plus 10 in Cash (insgesamt 100), Basiswert 10, Steuersatz 25 %. Steuer auf die Transaktion?',
      options: ['2,5', '5', '22,5', '10'],
      correctIndex: 0,
      solution: 'Gesamtgewinn=100−10=90. Boot=10. Steuerpflichtig=Min(90,10)=10. Steuer=10×0,25=2,5.',
      marcusCorrect: 'Sauber. Der Boot-Betrag limitiert die Steuer, egal wie hoch der Gesamtgewinn ist.',
      marcusWrong: 'Gesamtgewinn = 100−10 = 90. Boot = 10. Steuerpflichtiger Betrag = Min(90, 10) = 10. Steuer = 10×0,25 = 2,5.',
    },
    {
      kind: 'concept',
      eyebrow: 'EDGE CASE',
      heading: 'Wenn der Käufer das Earnout-Ziel selbst verhindert',
      paragraphs: [
        'Ein realer Streitpunkt: Der Käufer trifft nach Closing Integrationsentscheidungen, die dem Target schaden — etwa das Vertriebsteam auflösen oder Investitionen kürzen — und das Earnout-Ziel wird verfehlt. War das Zufall oder Absicht?',
        'Verkäufer verhandeln deshalb oft Schutzklauseln: Der Käufer muss das Geschäft „im gewöhnlichen Geschäftsgang" weiterführen oder bestimmte Investitionsniveaus halten. Ohne solche Klauseln ist ein Earnout ein Versprechen, das der Käufer selbst kontrollieren kann.',
      ],
    },
    {
      kind: 'retention',
      doneLabel: 'Lektion 08 abgeschlossen.',
      marcus: {
        subject: 'Re: Struktur ist mehr als Finanzierung',
        body: 'Boot-Regel, Earnout-Logik, die Schutzklausel-Falle — der M&A-Block ist jetzt auf Full-Time-Tiefe. Als Nächstes ein neues Terrain: der vollständige LBO, über den Paper-LBO hinaus.',
      },
      next: { title: 'Der vollständige LBO', meta: '9 Min · +50 XP' },
    },
  ],
};
