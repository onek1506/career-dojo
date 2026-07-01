# K1-Lektionsbaum — Audit

> Stand: Branch `claude/feat-k1-lessons`. Bewertet gegen die 16-Lektionen-Sollliste und den
> `docs/k1-gold-standard.md`. **Bewusst NICHTS neu geschrieben** — reines Audit, wie beauftragt.

## Ergebnis-Tabelle

| # | Soll-ID | existiert? | tatsächliche ID | Slides | Status | Konkreter Mangel |
|---|---------|-----------|-----------------|--------|--------|------------------|
| 1 | `k1-orient-1-spielfeld` | ja | `k1-intro-spielfeld` | 9 | **GOLD** | Nur ID-Abweichung (heißt `k1-intro-spielfeld` statt `k1-orient-1-spielfeld`). Inhalt = Gold. |
| 2 | `k1-acc-1-income-statement` | ja | `k1-acc-1-income-statement` | 10 | **GOLD** | Keiner. Referenz-Lektion. Nicht anfassen. |
| 3 | `k1-acc-2-income-statement` | **nein** (im K1-Baum) | — (Gold-Inhalt liegt als `acc-1c-ebit`, Nicht-K1) | 11 | **FEHLT** | EBIT/Interest/Taxes/Net Income fehlt im K1-Baum. Gold-Version existiert ungeprefixt. Soft Gate danach noch nicht umgesetzt. |
| 4 | `k1-acc-3-balance-sheet` | nein | — | — | **FEHLT** | Assets/Aktiva am Kaffeeladen. |
| 5 | `k1-acc-4-balance-sheet` | nein | — | — | **FEHLT** | Liabilities & Equity, Grundgleichung. |
| 6 | `k1-acc-5-cash-flow` | nein | — | — | **FEHLT** | Kernidee Gewinn ≠ Cash. |
| 7 | `k1-acc-6-cash-flow` | nein | — | — | **FEHLT** | Operating/Investing/Financing. |
| 8 | `k1-acc-7-three-statements` | nein | — | — | **FEHLT** | Depreciation-+10-Walkthrough in Einzelschritten + Zwischen-Quizzes. |
| 9 | `k1-acc-8-working-capital` | nein | — | — | **FEHLT** | Working Capital sanft. |
| 10 | `k1-val-1-was-ist-wert` | nein | — | — | **FEHLT** | Grundfrage Unternehmenswert, intuitiv. |
| 11 | `k1-val-2-ev-equity` | nein | — | — | **FEHLT** | Hausanalogie, EV vs. Equity getrennt. |
| 12 | `k1-val-3-ev-equity` | nein | — | — | **FEHLT** | EV = Equity + Net Debt, Multiple-Fallen. |
| 13 | `k1-val-4-methoden` | nein | — | — | **FEHLT** | Comps / Precedents / DCF: nur WAS sie sind. |
| 14 | `k1-soft-1-why-ib` | nein | — | — | **FEHLT** | Struktur einer guten Antwort. |
| 15 | `k1-soft-2-why-bank-why-you` | nein | — | — | **FEHLT** | Why this bank / Why you. |
| 16 | `k1-soft-3-spring-week` | nein | — | — | **FEHLT** | Ruhiger Ausblick. |

**Zusammenfassung:** 2 × GOLD · 0 × SCHWACH · 14 × FEHLT.

---

## Wichtige Befunde (vor der Bauphase zu klären)

**A. Es gibt keine „schwachen" K1-Lektionen.** Die Annahme „ab Lektion 3 didaktisch zurückgefallen"
trifft auf den K1-Baum nicht zu: Lektionen 3–16 wurden im K1-Baum nie gebaut. Der frühere Lauf wurde
nach Lektion 1+2 bewusst zur Abnahme gestoppt.

**B. Quelle des „Lehrbuch-Eindrucks" ist vermutlich der Nicht-K1-Baum.** Auf master existieren
bestehende Accounting-Lektionen **ohne** `k1-`-Präfix, teils im älteren, definierenden Stil:
- `acc-1-income-statement` (GuV: Umsatz bis OpEx) und `acc-1c-ebit` (GuV: EBIT bis Net Income) —
  bereits Kaffee-/Gold-Stil.
- Bespoke-Lektionen `balance-sheet`, `cash-flow-statement`, `three-statements-linked` — eigener,
  älterer Stil, **nicht** Kaffee-durchgängig.
- Diverse Legacy-Lektionen in `ib-content.ts` (content.sections-Format).
Diese sind ein **separater Baum** und nicht Teil von K1. Sie werden hier nicht angefasst.

**C. ID-Namensschema.** Soll vs. Ist:
- Lektion 1: Soll `k1-orient-1-spielfeld`, Ist `k1-intro-spielfeld`. → Umbenennen? (betrifft Route +
  beide Registries + Callback in Lektion 2).
- Lektion 2: Soll = Ist (`k1-acc-1-income-statement`). Passt.

**D. Income Statement Teil 2 (Lektion 3).** Gold-Inhalt existiert bereits als `acc-1c-ebit`
(11 Slides, Kaffee-Stil, von den Wächtern faktisch schon auf Gold-Niveau). Empfehlung: als
`k1-acc-2-income-statement` in den K1-Baum **portieren** (kopieren + Callback/IDs anpassen),
statt neu zu schreiben. Spart Arbeit und garantiert Konsistenz.

---

## Offene Entscheidungen für die Bauphase

1. **Branch-Basis:** Die Gold-Lektionen liegen nur auf `claude/feat-k1-lessons`, nicht auf master.
   Erst nach master mergen und von master branchen (wie beim letzten Mal), oder hier weiterarbeiten?
2. **Lektion 1 umbenennen** auf `k1-orient-1-spielfeld` (Soll-Schema) — ja/nein?
3. **Lektion 3** als Port von `acc-1c-ebit` nach `k1-acc-2-income-statement` — ok?
4. **Soft Gate nach Lektion 3:** eigener Mechanismus vorhanden oder vorerst als Hinweis-Slide?
5. **Skill-Tree-Platzierung:** K1-Baum als eigene Unit „Kategorie 1" sichtbar machen, oder vorerst
   nur per Registry/Link erreichbar (wie aktuell)?
