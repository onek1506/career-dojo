# K2 Fachbegriffs-Audit

Alle 16 K2-Lektionen (`k2-acc-1-bridge` bis `k2-mock-1-mixed`) wurden in Reihenfolge gegen
folgende Regel geprüft: **"eingeführt"** heißt, es gibt VOR der ersten Benutzung einen
`concept`-Slide, der den Begriff explizit definiert und einordnet. Ein Begriff, der nur als
Antwortoption, in einer Quiz-Prompt oder im Feedback auftaucht, gilt als NICHT eingeführt —
auch wenn das Feedback ihn nachträglich erklärt.

Basisvokabular, das durchgängig sauber aus K1 stammt und in K2 nirgends neu erklärt werden muss
(Revenue, EBIT, Net Income, Cash, Debt, Bilanz/GuV/Cash-Flow-Statement, Enterprise Value als
Konzept an sich), taucht hier nicht als eigene Zeile auf — nur Begriffe, die entweder komplett neu
sind oder deren erste zentrale K2-Benutzung eine Prüfung wert ist.

**Goodwill** kommt in keiner der 16 K2-Lektionen vor (weder benutzt noch erklärt) — kein
Audit-Fund, keine Aktion nötig. Der Begriff taucht offenbar erst in K3 auf.

## Tabelle

| Begriff | zuerst benutzt in (Lektion/Slide) | vorher eingeführt? (ja/nein/halbherzig) | Schweregrad |
|---|---|---|---|
| Deferred Revenue | `k2-acc-2-three-statements-drill`, Slide 5 (Minicheck `k2-l2-deferred`, als Antwortoption) | nein | Hoch |
| Accounts Receivable / AR | `k2-acc-2-three-statements-drill`, Slide 6 (Minicheck `k2-l2-ar`, Begriff erst im Feedback genannt; Slide 7 nutzt bereits die nackte Abkürzung „AR") | nein | Mittel |
| NOL (Net Operating Loss) | `k2-acc-3-edge-cases`, Slide 7 (Concept „DIE TIEFE" — kurzer Ein-Satz-Gloss direkt vor dem zugehörigen Minicheck) | ja (knapp, aber vorhanden) | — |
| Enterprise Value / Equity Value / Market Cap (als EV-Brücke) | `k2-ev-1-drill`, Slide 3 (Concept „DIE TIEFE" leitet die Brücke her) — K1 kennt EV/Equity bereits (`k1-val-2/3-ev-equity`) | ja (in K2 selbst nochmal hergeleitet) | — |
| EBITDA | `k2-ev-2-multiples`, Slide 1 (Hook: „Firma A EV800/EBITDA100") | nein | Hoch |
| EPS (Earnings Per Share) | `k2-ev-2-multiples`, Slide 4 (Concept „DIE TIEFE" — nur als Beispielzahl „Kurs 60€/EPS 5€", keine Formel) | nein | Hoch |
| P/E (Price/Earnings) | `k2-ev-2-multiples`, Slide 4 (gleiche Stelle wie EPS — Ratio wird vorgerechnet, aber EPS-Baustein bleibt unerklärt) | halbherzig | Mittel |
| Price/Book | `k2-ev-2-multiples`, Slide 9 (Concept „DIE FRAGE" — Banken/Versicherungen-Kontext, nur beiläufig genannt) | nein | Niedrig |
| Unlevered Free Cash Flow | `k2-val-1-dcf-mechanik`, Slide 3 (Concept „DIE TIEFE" definiert alle 5 Bausteine vor dem ersten Minicheck) | ja | — |
| NOPAT | `k2-val-1-dcf-mechanik`, Slide 3 (parenthetisch aufgelöst: „NOPAT (Net Operating Profit After Tax)") | ja | — |
| D&A (Depreciation & Amortization) | `k2-val-1-dcf-mechanik`, Slide 3 („Plus D&A 20" — Depreciation aus L1 bekannt, „Amortization"-Anteil nirgends erklärt) | halbherzig | Niedrig |
| CapEx | `k2-val-1-dcf-mechanik`, Slide 3 („Minus CapEx 30, weil echt Geld kostet" — kein echter Definitionssatz, was CapEx umfasst) | halbherzig | Mittel |
| WACC | `k2-val-2-wacc`, Slide 3 (Concept „DIE TIEFE" — vollständige Herleitung aus Cost of Equity/Debt vor dem ersten Minicheck) | ja | — |
| CAPM | `k2-val-2-wacc`, Slide 3 (Formel direkt mitgeliefert: risikofrei + Beta × Marktrisikoprämie) | ja | — |
| Beta | `k2-val-2-wacc`, Slide 3 (nur als Zahl „Beta 1,2" in die CAPM-Formel eingesetzt — nie erklärt, was Beta misst) | nein | Hoch |
| Tax Shield | `k2-val-2-wacc`, Slide 3 (explizit benannt und in einem Satz definiert) | ja | — |
| Terminal Value / Gordon Growth / Exit Multiple | `k2-val-3-terminal-value`, Slide 3 (Concept „DIE TIEFE" — beide Methoden mit Formel vor dem ersten Minicheck) | ja | — |
| Net Debt | `k2-val-4-dcf-interview`, Slide 4 (Concept „DIE TIEFE" — „Net Debt abziehen", nie explizit als Debt − Cash benannt, obwohl die Einzelteile aus L4 bekannt sind) | halbherzig | Niedrig |
| Accretion / Dilution | `k2-ma-1-accretion-dilution`, Slide 3 (Concept „DIE TIEFE" — vollständig hergeleitet vor dem ersten Minicheck) | ja | — |
| Sources & Uses | `k2-lbo-2-mechanik`, Slide 3 (Concept „DIE TIEFE", als Überschrift/Label — Konzept nur über die Beispielzahlen sichtbar, nie als Framework benannt) | halbherzig | Niedrig |
| IRR | `k2-lbo-1-was-ist-lbo`, Slide 4 (Concept „DIE TIEFE" — nur als Faustwert-Paar „3,0x ≈ 25% IRR", nie konzeptionell erklärt, was IRR misst) | nein | Hoch |
| Money Multiple (MOIC) | `k2-lbo-1-was-ist-lbo`, Slide 4 (als „2,0x"/„3,0x" verwendet, bevor die Formel Exit-Equity/Einsatz erst in `k2-lbo-2-mechanik` Slide 4 gezeigt wird) | nein (bei Erstbenutzung) | Mittel |

## Kurz-Fazit

- **Bereits sauber (keine Aktion nötig):** WACC, Terminal Value, Unlevered FCF, Accretion/Dilution,
  CAPM, Tax Shield, NOPAT, NOL, EV/Equity-Brücke. Die vom Auftrag namentlich genannten Sorgenkinder
  WACC, Terminal Value und Accretion/Dilution sind in der Praxis bereits gut eingeführt.
- **Echte Lücken (nein):** Deferred Revenue, EBITDA, EPS, Beta, IRR, Money Multiple/MOIC,
  Price/Book, Accounts Receivable.
- **Halbherzig / K1-Auffrischung sinnvoll:** P/E (hängt an EPS), D&A, CapEx, Net Debt,
  Sources & Uses.
- **Nicht vorhanden, keine Aktion:** Goodwill (kommt in K2 gar nicht vor).

Damit ist SCHRITT 1 abgeschlossen. Ich warte auf deine Freigabe, welche der oben markierten
Begriffe Einführungs-Slides bekommen sollen, bevor SCHRITT 2 beginnt.
