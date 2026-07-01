# K1 Gold-Standard — Stilvorlage

> Extrahiert aus den zwei Referenz-Lektionen (`k1-intro-spielfeld`, `k1-acc-1-income-statement`)
> sowie der stilgleichen Income-Statement-Teil-2-Lektion (`acc-1c-ebit`, "GuV: EBIT bis Net Income").
> **Diese Vorlage ist die Messlatte.** Im Zweifel gilt: „Sieht dieser Slide aus wie ein Slide aus
> Lektion 1/2?" — wenn nein, ist er nicht fertig.

---

## 0. Technische Grundlage (Engine-Mapping)

Die Lektionen sind **datengetriebene `MicroLessonData`-Objekte** (eine Datei pro Lektion unter
`src/components/lesson/micro/data/`), gerendert von der Micro-Lesson-Engine. Registrierung in
`src/components/lesson/micro/registry.ts` (Route `/lesson/<id>`) und in `src/lib/home/lesson-registry.ts`.

Die Spec nennt Slide-Typen `concept | example | quiz | retention_hub`. Die Engine kennt vier echte Kinds:

| Spec-Begriff | Engine-`kind` | Bemerkung |
|---|---|---|
| (Hook/Intro) | `hook` | Erster Slide, mit Marcus-Mail |
| concept | `concept` | Reines Konzept ODER Beispiel — unterschieden durch `eyebrow` |
| example | `concept` mit `eyebrow: 'BEISPIEL · DEIN KAFFEELADEN'` (+ optional `mono`) | Kein eigener Kind |
| quiz | `minicheck` | Early-Win-Quiz mit `marcusCorrect`/`marcusWrong` |
| retention_hub | `retention` | Abschluss-Hub |

Es gibt **kein `summary`-Slide** (bewusst entfernt). Es gibt **keine Stats-Box und keine
„Was du nach dieser Lektion verstehst"-Liste** im Hook (bewusst entfernt).

**Hartes Stil-Verbot:** keine Gedankenstriche („—") in der Prosa. Erlaubt sind Mathe-Minus „−"
(in `mono`/Lösungen) und Binde-Striche in Komposita („Gewinn- und Verlustrechnung").

---

## 1. Slide-Anzahl, -Typen und -Reihenfolge

**Accounting-Lektion (Referenz: `k1-acc-1-income-statement`, 10 Slides):**

1. `hook`
2. `concept` — Rahmen/Idee (z.B. „Das Income Statement erzählt eine Geschichte")
3. `concept` (Beispiel) — **Begriff 1** am Kaffee gelebt
4. `concept` (Beispiel) — **Begriff 2** am Kaffee gelebt
5. `concept` (Beispiel) — **Begriff 3**, mit `mono`-Treppe als visuelle Konsolidierung
6. `minicheck` — Early-Win auf die eben gezeigten Zahlen
7. `concept` (Beispiel) — **Begriff 4**
8. `concept` (Beispiel) — Anwendung/„eine Stufe tiefer", mit `mono`
9. `minicheck` — Early-Win
10. `retention`

**Orientierungs-Lektion (Referenz: `k1-intro-spielfeld`, 9 Slides):**

1. `hook`
2.–6. `concept` — je **eine** Orientierungs-Idee pro Slide
7. `minicheck` — Early-Win (mit Scherz-Distraktor)
8. `concept` — Abschluss-Gedanke / Brücke
9. `retention`

**Faustregeln:** 9–10 Slides. Lieber mehr kleine als wenige dichte. Mini-Checks kommen **nach**
einem Cluster neuer Begriffe, nie direkt hintereinander. Genau **ein** `retention`-Slide, am Ende.

---

## 2. Wie ein neuer Begriff eingeführt wird (das didaktische Kernmuster)

**Reihenfolge IMMER: Alltag/Zahlen zuerst → (oft) Frage → Wert → DANN das Fachwort als Label.**
Nie „Begriff X ist definiert als …". Der Begriff wird **hergeleitet, nicht verkündet.**

Belege aus dem Gold-Standard:

- Revenue: *„Du verkaufst den ganzen Tag Kaffee und nimmst dabei **100 €** ein. Diese 100 € sind
  dein **Revenue**, auf Deutsch der Umsatz."* → Situation, Zahl, dann Label.
- Gross Profit: *„100 € sind reingekommen, 40 € für die Zutaten sind weg. **Was bleibt? 60 €.**
  Diese 60 € heißen **Gross Profit**."* → Rechnung + rhetorische Frage, dann Label.
- OpEx: *„die **Miete**, ein bisschen **Marketing** … zusammen **25 €**. Diese laufenden
  Betriebskosten heißen **OpEx**."* → konkrete Beispiele, Summe, dann Label.

Pro Slide **genau ein** neuer Fachbegriff (fett per `**…**`). Der Begriff wird sofort am laufenden
Kaffee-Beispiel verankert, bevor der nächste kommt. Englischer Fachbegriff zuerst, deutsche
Entsprechung in Klammern oder nachgestellt.

---

## 3. Marcus-Stimme (Kategorie 1: geduldig, ermutigend, nie Druck)

**Satzbau:** kurze bis mittlere Sätze, direkte Anrede („du", „dein"). Konkret, ruhig, warm.
Hooks und Retention sind als **Mail vom Mentor** gebaut (`subject: 'Re: …'`).

**Tonbeispiele (so klingt er):**
- „Kein Vorwissen nötig, und keine Eile. Wir haben Zeit."
- „Niemand erwartet, dass du schon alles kannst."
- „Kein Stress. Bruttogewinn ist Umsatz minus COGS: 100 − 40. Schau nochmal."
- „Stark. … Aber das hat Zeit."
- „Diese Sprache ist lernbar. Kein Talent, kein Geheimnis."

**Interview-Bezug nur als Zukunftsbild:** „Wo du irgendwann sitzt", „so wird es mal sein",
„wenn die Frage kommt". Nie als akute Bedrohung.

**Was Marcus NIE sagt:**
- Druck/Deadline: „du musst", „morgen", „schnell", „sofort" (als Druck), „keine Zeit", „unter Druck".
- Herablassung/Zynismus: „eigentlich solltest du das wissen", Sarkasmus, Kleinreden.
- Lehrbuch-Ton / Wikipedia-Definitionen / Jargon-Dump.

---

## 4. Quiz-Bau (`minicheck`)

- **Bewusst leicht (Early-Win-Engineering).** Es benutzt Zahlen, die der Slide gerade gezeigt hat
  (z.B. 100 − 40 = 60). Der Nutzer soll gewinnen, nicht gesiebt werden.
- 4 Optionen, eine klar richtige; in Orientierungs-Lektionen darf ein Scherz-Distraktor rein
  („Mit der Beförderung zum Chef"). Optionen werden zur Laufzeit gemischt.
- **`solution`**: der Rechenweg in einer Zeile („Bruttogewinn = Umsatz − COGS = 100 − 40 = 60 €.").
- **`marcusCorrect`**: warme Bestätigung + Mechanik nochmal benennen
  („Genau. 100 rein, 40 weg, 60 bleibt.").
- **`marcusWrong`** (VERBINDLICH für jedes Quiz, L1–L15): ermutigend, ohne Tadel, kurz die
  richtige Denkweise zeigen, zum erneuten Versuch einladen. Stil: „Fast — wir ziehen ab, nicht
  dazu. Schau nochmal, du hast es gleich." Steht im Konzept ein Falsch-Feedback, wörtlich nehmen;
  steht keins, in genau diesem Ton ergänzen. Zwei-Versuch-Logik und Streak-Chip macht die Engine.
- Transfer-/Zufallsfragen (`generate`) sind für K1 **nicht** der Default — K1-Quizzes bleiben leicht.

---

## 5. Hook (Anatomie)

- `module` (Mono, Großbuchstaben): z.B. `MODUL 01 · ACCOUNTING`.
- `title` (Serif), kurz.
- `subtitle`: eine Zeile, was passiert („Vom Umsatz zum ersten Gewinn, an einem Kaffeeladen").
- `marcus.subject` „Re: …" + `marcus.body`: stellt die **zentrale Frage** der Lektion
  (z.B. „Du nimmst 100 € ein. Heißt das, du hast 100 € verdient?") und macht den Callback zur
  Vorlektion. Keine Stats-Box, keine Outcome-Liste.

## 6. Retention Hub (Anatomie)

- `doneLabel`: „Lektion 0X abgeschlossen." (Engine zeigt Ergebnis-Kreis + Accuracy/Time/XP).
- `marcus.subject` „Re: …" + `marcus.body`: **Recap** (benennt die gelernten Begriffe) +
  Vorausblick auf die nächste Lektion + Druck-Entlastung („Aber das hat Zeit.").
- `next`: `{ title: 'Lektion 0X: …', meta: 'N Min · +XX XP' }`.
- Die Engine rendert zwei Karten: primär „Jetzt starten" (EMPFOHLEN) und „Beenden" (PAUSE,
  Subtext „Streak gesichert" = **psychologische Erlaubnis aufzuhören**).

---

## 7. Psychologische Mechanik pro Slide-Typ (benannt)

| Slide-Typ | Benannte Mechanik |
|---|---|
| `hook` | **Curiosity Gap** + **Senkung der Eintrittsbarriere** (zentrale Frage, kein Jargon, „keine Eile") |
| `concept` (Idee) | **Mentales Modell / Anker** vor jeder Mechanik („erzählt eine Geschichte") |
| `concept` (Beispiel) | **Concrete-before-abstract** + **Anchoring** (Kaffee) + **Begriff hergeleitet statt verkündet** (Aha) |
| `concept` mit `mono` | **Visuelle Konsolidierung / Closure** (die Treppe als geschlossene Gestalt) |
| `minicheck` | **Early-Win-Engineering** + **Testing-Effekt**; **sanfte Fehler-Erholung** statt Sieben |
| `retention` | **Stolz-Moment** + **psychologische Erlaubnis aufzuhören** (Streak gesichert) + **Future-self framing** |

---

## 8. Kaffee-Story Zahlen-Welt (Lektionen 2–9, konsistent halten)

```
Revenue (Umsatz)          100
− COGS (Produktkosten)   − 40
Gross Profit (Brutto)      60
− OpEx (Betriebskosten)  − 25
EBIT                       35
− Interest (Zinsen)      −  5
− Taxes (Steuern)        − 10
Net Income (Überschuss)    20
```

Jede Accounting-Lektion startet mit einem **Callback** („Letztes Mal warst du bei X € …").
Bilanz-Lektionen (4–5) bleiben am **selben Kaffeeladen** (Espressomaschine = Asset,
Kredit = Liability). Nicht zu einem abstrakten Beispielunternehmen wechseln.
