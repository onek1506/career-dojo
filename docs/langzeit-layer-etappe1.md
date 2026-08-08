# Langzeit-Layer Etappe 1 — Spaced-Repetition-Motor + Active-Recall-Format

## 1. Ist-Analyse

### 1.1 Was heute in quiz_attempts/concept_mastery landet

**Nichts.** Beide Tabellen existieren seit der ursprünglichen Supabase-Migration (Tabellen + RLS +
Grants stehen), aber kein Code schreibt je hinein — der einzige Treffer im gesamten `src`-Baum ist
ein Kommentar in `sync.ts`: *"`concept_mastery` / `quiz_attempts` are wired in SCHRITT 2."* Das ist
jetzt dieser Auftrag.

Aktuell landet ein Quiz-Ergebnis nur hier:
- `MicroLesson.tsx` → `handleAnswer()` ruft `recordWeakAreaAnswer(data.topicTag, result.correct)`
  auf — schreibt in `localStorage['career-dojo-weak-areas']`, ein simpler `{tag: {correct, wrong}}`-
  Zähler. **Wird von keinem UI-Screen gelesen** (bereits im K2-Begriffs-Audit dieser Session
  festgestellt) — totes Feature, exakt wie hier.
- `useStore().recordQuizAnswer()` / `recordAnswer()` — zählt nur globale Trefferquote
  (`totalQuestionsAnswered`/`totalCorrectAnswers`) und füttert das ALTE, an die `data/content`-Welt
  gebundene SM-2-System (`reviewCards`, `/review`-Seite) — unabhängig von den K1/K2/K3-Micro-Lessons.

Schema (bereits angelegt, migration 0001):
```
concept_mastery: user_id, concept_tag, correct_count, wrong_count, status, last_attempt_at, next_due_at
quiz_attempts:   id, user_id, question_id, lesson_id, concept_tag, correct, attempt_number, answered_at
```

### 1.2 Konzept-Tag-Granularität — VORAUSSETZUNG NICHT ERFÜLLT

`topicTag` sitzt auf **Lesson-Ebene** (`MicroLessonData.topicTag`), nicht auf der einzelnen Frage.
Die Werte sind Block-grob: `dcf`, `ma`, `lbo`, `ev-equity`, `three-statements`, `fit`, `mixed`,
`accounting-advanced`, `brainteasers`, `market-pitch`. Beispiel: `k2-val-2-wacc.ts` UND
`k2-val-3-terminal-value.ts` tragen beide `topicTag: 'dcf'` — WACC und Terminal Value sind für den
Motor nicht unterscheidbar. Kein `conceptTag`-Feld existiert auf `MiniCheckSlide` (bestätigt: schon
im K2-Begriffs-Audit als Lücke notiert, nie gebaut).

**Konsequenz für den Motor:** er startet mit Block-Granularität (`dcf` statt `wacc`) — funktional
korrekt, aber weniger präzise: eine falsche WACC-Antwort macht den ganzen `dcf`-Topf "fällig",
nicht nur WACC. Der Motor selbst braucht dafür keine Schema-Änderung — `concept_tag` ist eine freie
Text-Spalte. Die Verfeinerung ist ein **separater, späterer Content-Schritt**: ein optionales
`conceptTag`-Feld auf `MiniCheckSlide` (und künftig `RecallSlide`), das den Lesson-`topicTag`
überschreibt, wenn gesetzt. Die Aufnahme-Logik liest deshalb von Anfang an
`slide.conceptTag ?? data.topicTag` — sobald einzelne Fragen eigene Tags bekommen, wird der Motor
automatisch feiner, ohne Code-Änderung am Motor selbst.

### 1.3 Kategorie-Quelle

`profiles.entry_category` (Migration 0003, aus dem Onboarding-Auftrag) trägt `'k1'|'k2'|'k3'|'k4'`.
Der Motor liest sie einmal pro Nutzer; fehlt sie (Alt-Nutzer ohne Onboarding, oder `k4`), fällt er
auf `k2` zurück — die mittlere, neutralste Einstellung.

---

## 2. Der Spacing-Algorithmus (Stufen-Modell, kein SM-2)

Pro `(user_id, concept_tag)` ein `interval_stage` (0–5) und `next_due_at`. Drei Ergebnis-Klassen
speisen ihn — bei normalen Multiple-Choice-Minichecks binär (richtig/falsch), beim Active-Recall-
Format dreiwertig (wusste ich / halb / nicht):

| Ergebnis | Stufe | next_due_at |
|---|---|---|
| **richtig** / "wusste ich" | +1 (max 5) | Intervall der neuen Stufe, nach Kategorie |
| **halb** (nur Recall) | bleibt gleich | kurzes Intervall, nach Kategorie — weder Fortschritt noch Rückfall |
| **falsch** / "nicht" | zurück auf 0 | sehr kurz, nach Kategorie |

### Intervall-Tabellen pro Kategorie (in Tagen)

| Stufe → | 0→1 | 1→2 | 2→3 | 3→4 | 4→5 (Erhaltung, danach Deckel) |
|---|---|---|---|---|---|
| **K1** (großzügig) | 4 | 10 | 21 | 60 | 120 |
| **K2** (mittel) | 3 | 7 | 21 | 42 | 90 |
| **K3** (eng) | 1 | 3 | 7 | 14 | 28 |

K1 = viel Zeit, Intervalle strecken sich → seltener, weniger Druck. K3 = wenig Zeit, enge
Intervalle → häufiger, aggressiver drangenommen. K2 folgt genau der Stufenfolge aus dem Auftrag
("3d → 1w → 3w → 2Mo", hier leicht verfeinert auf 5 Stufen für einen sauberen Erhaltungs-Deckel).

**Falsch-Reset** (Stufe → 0):
| Kategorie | next_due_at |
|---|---|
| K1 | in 2 Tagen — Vergessen kostet keine sofortige Konfrontation |
| K2 | morgen |
| K3 | sofort (nächste Session) — "aggressive Wiedervorlage" |

**"Halb"-Fall** (nur Active Recall, Stufe bleibt):
| Kategorie | next_due_at |
|---|---|
| K1 | in 4 Tagen |
| K2 | in 3 Tagen |
| K3 | in 1 Tag |

Ab Stufe 5 ("mastered") wird bei weiterem Richtig einfach wieder das Stufe-5-Intervall gesetzt
(Erhaltungsmodus, kein weiteres Wachstum) — verhindert, dass ein Konzept sich auf Jahre hinaus
"freispacet".

---

## 3. "Welche Konzepte sind heute fällig" — die Query

```sql
select concept_tag, next_due_at, interval_stage, correct_count, wrong_count
from concept_mastery
where user_id = :uid
  and (next_due_at is null or next_due_at <= now())
order by
  -- K3: schwächste Konzepte zuerst (höchster Falsch-Anteil), dann längst überfällig
  -- K1/K2: einfach chronologisch, keine "das ist deine Schwäche"-Rangfolge
  case when :category = 'k3'
    then wrong_count::float / greatest(correct_count + wrong_count, 1)
    else 0
  end desc,
  next_due_at asc nulls first;
```

Für K3 wird also aktiv nach Schwäche sortiert (Auftrag: "aggressiver auf Schwächen"), für K1/K2
neutral nach Fälligkeit — kein zusätzlicher Leistungsdruck durch eine sichtbare "Schwäche-Liste"
(die es ohnehin nicht gibt, der Motor bleibt für den Nutzer unsichtbar).

---

## 4. Active-Recall-Datenmodell

Neuer `MicroSlide`-Kind `'recall'` (additiv zum bestehenden Union-Typ `hook | concept | minicheck |
summary | retention`):

```ts
export interface RecallSlide {
  kind: 'recall';
  id: string;              // eindeutig, = quiz_attempts.question_id
  conceptTag?: string;     // überschreibt data.topicTag, wenn gesetzt (siehe 1.2)
  prompt: string;          // nackte Frage, keine Optionen
  modelAnswer: string;     // erscheint nach "Antwort zeigen"
  hint?: string;           // NUR für K1 gerendert (siehe unten) — Stichwort-Gerüst
}
```

**Ablauf:** Frage → Freitextfeld (rein gedanklich, wird nicht ausgewertet/gespeichert, nur
Denkhilfe) → "Antwort zeigen" → Musterantwort erscheint → drei Buttons "Wusste ich" / "Halb" /
"Nicht" → Klick schreibt `quiz_attempts` (mit `self_rating`) und aktualisiert `concept_mastery`
über dieselbe Motor-Funktion, die auch normale Minichecks füttert.

**Recall-Härte nach Kategorie** (Etappe-2-UI baut hierauf, aber das Datenmodell trägt es schon):
- **K1:** `hint` wird angezeigt (Stichwort-Gerüst, z.B. bei einer WACC-Frage: "Denk an: Eigenkapital-
  und Fremdkapitalkosten, gewichtet"). Näher am Wiedererkennen.
- **K2:** `hint` existiert im Datenmodell, wird aber nicht gerendert — nackte Frage, aber ohne
  Zeitdruck-Framing.
- **K3:** `hint` wird nie gerendert, unabhängig davon ob gesetzt. Nackte Frage, zeitnahes Framing.

---

## 5. Neue Felder (additiv, nichts Bestehendes ändert sich)

```sql
alter table public.concept_mastery add column if not exists interval_stage int not null default 0;
alter table public.concept_mastery add column if not exists partial_count int not null default 0;

alter table public.quiz_attempts add column if not exists self_rating text; -- 'knew' | 'partial' | 'unknown', nur bei Recall-Antworten gesetzt
```

- `concept_mastery.status` (existiert bereits, `text`) wird auf zwei Werte vereinfacht genutzt:
  `'learning'` (Stufe < 5) / `'mastered'` (Stufe 5). Der dritte bisherige Wert `'due'` wird nicht
  mehr geschrieben — Fälligkeit ist immer live aus `next_due_at` berechnet, nie ein gespeicherter
  Zustand (der würde sofort veralten).
- `correct_count`/`wrong_count` (existieren bereits) bleiben wie sie sind und zählen weiter jede
  Antwort — Grundlage für die K3-Schwäche-Sortierung in Abschnitt 3.
- `quiz_attempts.correct` (existiert bereits) bleibt bei Recall-Antworten belegt:
  `true` bei "wusste ich", `false` bei "halb" und "nicht" — für jeden Code, der nur grob
  richtig/falsch braucht. `self_rating` trägt die feinere Dreiteilung, die der Motor tatsächlich
  auswertet.

## 6. Geteilte Motor-Funktion

Eine Funktion `recordConceptAttempt(userId, conceptTag, questionId, lessonId, outcome, category)`
mit `outcome: 'correct' | 'partial' | 'wrong'` — wird sowohl von normalen Minicheck-Antworten
(`outcome` immer `correct`/`wrong`, nie `partial`) als auch von Active-Recall-Selbstbewertungen
aufgerufen. Ein Ort für die Stufenlogik aus Abschnitt 2, kein Doppelcode.

`MicroLesson.tsx`s `handleAnswer()` ruft diese Funktion zusätzlich zum bestehenden
`recordWeakAreaAnswer()`-Aufruf auf (der bleibt vorerst unangetastet, da er noch für eine mögliche
spätere Aufräum-Runde steht, aber nicht Teil dieses Auftrags ist).

## 7. Verifikations-Harness für Etappe 1 (kein Vorgriff auf Etappe 2)

Etappe 2 baut die echte Tagessession-UI. Um den Akzeptanztest (Punkt 3/4: Recall-Slide im echten
Browser sehen) hier zu erfüllen, ohne diese UI vorzuziehen, baue ich einen **einzigen minimalen
Test-Screen** (klar als Verifikations-Hilfsmittel markiert, kein designtes Feature): eine Route, die
eine feste Recall-Frage für ein fälliges Konzept rendert, die neue `RecallSlideView`-Komponente
nutzt und nach Bewertung Supabase aktualisiert. Wird durch Etappe 2 ersetzt/entfernt.

---

**STOPP.** Das ist der komplette SCHRITT-0-Umfang. Ich baue weder Motor noch UI, bevor du das Design
hier abgenommen hast — insbesondere die konkreten Intervall-Zahlen (Abschnitt 2) und die
Verifikations-Harness-Entscheidung (Abschnitt 7) sind Punkte, die du anders wollen könntest.
