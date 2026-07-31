# Lektion 4 — EV und Equity im Drill · `k2-ev-1-drill`

**Trackt:** `ev-equity` · Kopfrechnen-Lektion mit wechselnden Beispielfirmen, alle Zahlen in Mio. €.
Kein Steuersatz nötig — in dieser Lektion wird nur umgerechnet.

**Slide 1 — Hook** · *Themenwechsel: von Accounting zu Bewertung* (hook)
> Marcus: "Neuer Block, neues Tempo. Nach den drei Statements dreht der Interviewer fast immer auf Bewertung — und Bewertung beginnt fast immer mit derselben Brücke: Enterprise Value gegen Equity Value. Das ist keine Verständnisfrage mehr, das ist Kopfrechnen auf Zeit. Der Interviewer stellt drei, vier Varianten hintereinander und hört, ob du zögerst. Heute läuft genau das: die Brücke hin, die Brücke zurück, bis sie automatisch geht."

**Slide 2 — DIE FRAGE** (concept)
> Marcus: "Der Einstieg fällt im Original so: **'What's the difference between enterprise value and equity value?'** Und direkt danach, ohne Pause: **'Calculate enterprise value given the following.'** Definitionen hast du — die will hier niemand hören. Der Interviewer will die Besitzlogik: Welcher Wert gehört wem, und warum wandern Schulden und Cash über die Brücke? Wer das begründen kann, rechnet die Varianten danach fast nebenbei."

**Slide 3 — DIE TIEFE: warum plus Debt, warum minus Cash** (concept)
> Marcus: "Denk es als Übernahme. Equity Value — bei einer börsennotierten Firma die Market Cap — ist der Preis für alle Aktien: das, was den Aktionären gehört. Wer die ganze Firma kauft, übernimmt aber auch ihre Schulden — die muss er bedienen oder ablösen, sie erhöhen den wahren Kaufpreis. Das Cash dagegen bekommt er mit und kann es direkt gegenrechnen — es senkt den wahren Kaufpreis. Also: **EV = Equity Value + Debt − Cash.** Deshalb der Name: Enterprise Value ist der Wert des Betriebs für alle Kapitalgeber zusammen, Eigen- und Fremdkapital. Equity Value ist derselbe Betrieb, aber nur aus Sicht der Aktionäre."

**Slide 4 — DIE MUSTERANTWORT-STRUKTUR** (concept)
> Marcus: "In 30 Sekunden aufgesagt, drei Sätze:
> **1.** 'Equity value is the value of the business attributable to shareholders only — for a public company, that's the market cap.'
> **2.** 'Enterprise value is the value of the core operations to all investors — both equity and debt holders.'
> **3.** 'To bridge between the two, you add debt and subtract cash — a buyer assumes the debt, but the cash comes with the company.'
> Der dritte Satz ist der wichtigste: Er beantwortet die Nachfrage 'Why do you subtract cash?' gleich mit, bevor sie gestellt wird."

**Slide 5 — DRILL, Variante 1: hin** (quiz)
> Marcus (Intro im Slide): "Jetzt die Brücke in Zahlen. Kopfrechnen, kein Zettel — im Call hast du auch keinen."
> Quiz: "Market Cap 500, Debt 200, Cash 50. Enterprise Value?" → 650 ✓ / 750 / 450 / 350
> Richtig: "Korrekt. 500 + 200 − 50 = 650. Weiter."
> Falsch: "Die Brücke: 500 + 200 − 50 = 650. Debt kommt dazu, Cash geht weg — in dieser Richtung immer."

**Slide 6 — DRILL, Variante 2 (rückwärts)** (quiz)
> Marcus (Intro im Slide): "Jetzt rückwärts — so prüft der Interviewer, ob du die Formel verstanden hast oder nur auswendig kannst."
> Quiz: "EV 800, Debt 300, Cash 100. Equity Value?" → 600 ✓ / 400 / 1000 / 500
> Richtig: "Ja. 800 − 300 + 100 = 600. Rückwärts drehen sich beide Vorzeichen."
> Falsch: "Richtung wechseln heißt Vorzeichen wechseln: Equity = EV − Debt + Cash = 800 − 300 + 100 = 600."

**Slide 7 — DRILL, Variante 3: ab Aktienkurs** (quiz)
> Marcus (Intro im Slide): "Letzte Stufe: Im echten Call bekommst du die Market Cap selten serviert. Du bekommst Kurs und Aktienzahl."
> Quiz: "Aktienkurs 20 €, 30 Mio. Aktien ausstehend. Debt 150, Cash 50. Enterprise Value?" → 700 ✓ / 600 / 800 / 500
> Richtig: "Sauber. 20 × 30 = 600 Market Cap, plus 150, minus 50 — 700."
> Falsch: "Erst die Market Cap: 20 × 30 = 600. Dann die Brücke: 600 + 150 − 50 = 700. Zwei Schritte, keine Abkürzung."

**Slide 8 — DIE FALLE** (concept)
> Marcus: "Und jetzt die Frage, an der dieser Block aussortiert: **'If a company raises 100 of debt, what happens to enterprise value?'** Der Reflex sagt: Debt steigt, also EV plus 100. Der Reflex ist falsch. Die 100 verschwinden ja nicht — nach der Aufnahme liegen sie als Cash auf dem Konto. Debt +100, Cash +100, Net Debt netto null: **EV unverändert.** Die Logik dahinter: EV misst den Wert des Betriebs, und der ändert sich nicht dadurch, wie die Firma finanziert ist. Wer reflexhaft '+100' sagt, hat die Formel auswendig gelernt. Wer 'unchanged' sagt und es begründen kann, hat sie verstanden — und genau diesen Unterschied testet die Frage."

**Slide 9 — DRILL: die Debt-Falle** (quiz)
> Quiz: "Eine Firma nimmt 100 Mio. € Fremdkapital auf, das Geld bleibt auf dem Konto. Was macht der Enterprise Value?" → Unverändert ✓ / +100 / −100 / +200
> Richtig: "Korrekt. Debt +100, Cash +100 — in der Brücke hebt sich beides auf. Der Betrieb ist keinen Euro mehr wert."
> Falsch: "Rechne die Brücke: Debt +100 und Cash +100. In EV = Equity + Debt − Cash heben sich die beiden auf. Finanzierung ändert den Betriebswert nicht."

**Slide 10 — Retention Hub** (retention_hub)
> Marcus: "Brücke hin, Brücke zurück, Debt-Falle entschärft — das ist das Fundament für alles, was mit Multiples kommt. Nächste Lektion bauen wir darauf: EV/EBITDA gegen P/E, und wann welches Multiple das richtige ist."
> Cards: "Zurück zum Home · Fortschritt gespeichert" / "Weiter · EV/EBITDA vs. P/E"
