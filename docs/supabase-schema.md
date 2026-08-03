# Supabase-Schema & Migrationsplan (SCHRITT 0)

## 1. Env-Check (Build-Zeit)

**Ergebnis: Lücke gefunden.** `.env.example` listet die richtigen Namen (`NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, dazu `SUPABASE_SERVICE_ROLE_KEY` als dritte, optionale Zeile).
`.env.local` existiert bereits — aber **alle fünf Werte darin sind leer**, inklusive der beiden
Supabase-Variablen.

Das heißt konkret:
- **Vercel** (Produktion/Preview-Deploys): laut dir bereits korrekt gesetzt — nicht mein Problem, nicht meine Aktion.
- **Lokal** (mein Dev-Server für die Browser-Verifikation in SCHRITT 1/2): **fehlt komplett.** Ohne
  Werte in `.env.local` kann ich hier weder den Supabase-Client verbinden noch Auth/RLS im Preview
  testen.

**Ich brauche von dir:** trag den `NEXT_PUBLIC_SUPABASE_URL`- und den `NEXT_PUBLIC_SUPABASE_ANON_KEY`-
Wert (den `sb_publishable_...`-Key) aus Vercel in deine lokale `.env.local` ein — das sind Frontend-
Keys, RLS-geschützt, kein Geheimnis-Risiko. Den Secret Key brauche ich für SCHRITT 1/2 nicht und
trage ihn nirgends ein.

Ich baue laut Auftrag nichts ins Leere — SCHRITT 1 startet erst, wenn das steht. Der Rest von
SCHRITT 0 (Ist-Zustand, Schema, Migrationsplan) ist unabhängig davon fertig.

## 2. Ist-Zustand: aktuelle localStorage-Speicherung

Drei unabhängige, unverbundene localStorage-Speicher, plus ein totes Feature:

### 2.1 `career-dojo-progress` (Haupt-Store, `src/lib/store.ts`, via `useStore()`)
Ein flaches `UserProgress`-Objekt, **bereits kategorieübergreifend** (K1/K2/K3-IDs liegen gemischt
in einem Array, kein Split pro Kategorie):
- `completedLessons: string[]` — Lesson-IDs wie `k2-val-2-wacc`, direkt aus der Micro-Lesson-Registry.
- `completedQuizzes: Record<lessonId, {score, bestScore, attempts}>` — **Lesson-Granularität**, nicht Frage-Granularität.
- `xp`, `streak`, `longestStreak`, `lastActiveDate`, `lessonsCompletedToday`, `dailyGoal`, `language`,
  `onboardingComplete`, `selectedLevel`, `selectedTrack`, `username`, `totalQuestionsAnswered`,
  `totalCorrectAnswers`, `aiTutorMessages`, `soundEnabled`, `theme`.
- `reviewCards: ReviewCard[]` — ein **vollständiges SM-2-Spaced-Repetition-System** (`src/lib/spaced-repetition.ts`),
  das aber **nur an die alte `data/content`-Lessonwelt (PE/VC/Consulting-Tracks) angebunden ist**
  (`/review`-Seite, `src/lib/use-review-stats.ts`, `getAllLessons()`). Die K1/K2/K3-Micro-Lessons
  erzeugen **keine** `reviewCards` — `MicroLesson.tsx` ruft `recordAnswer`/SM-2 nirgends auf.
- `wrongAnswersToday`, `lastReviewDate` — gehören zum SM-2-System, gleiche Einschränkung.

### 2.2 `career-dojo-weak-areas` (`src/lib/weak-areas.ts`)
Separater Key, simple `Record<topicTag, {correct, wrong}>`. Wird bei **jeder** K1/K2/K3-Minicheck-
Antwort geschrieben (`MicroLesson.tsx:86`, `recordWeakAreaAnswer(data.topicTag, result.correct)`).

**Fund, der deinen Verdacht bestätigt:** `getWeakestTopics()` — die einzige Lesefunktion dieses
Moduls — wird **im gesamten Code nirgends aufgerufen.** Der Tracker schreibt seit dem K2-Launch
fleißig mit, aber kein Screen liest ihn je aus. Totes Feature, exakt wie du vermutet hast.

**Wichtiger Granularitäts-Fund:** `topicTag` sitzt auf `MicroLessonData` (Lesson-Ebene), nicht auf
der einzelnen `MiniCheckSlide` (Frage-Ebene). Die aktuellen Tags sind Block-Level:
`three-statements`, `ev-equity`, `dcf`, `ma`, `lbo`, `fit`, `mixed` — **WACC, Terminal Value und
Unlevered-FCF-Fragen tragen alle denselben Tag `dcf`.** Für die Mastery-Tabelle willst du laut
Auftrag aber genau `wacc`, `terminal-value`, `accretion-dilution` als eigene Tags. Das erfordert in
SCHRITT 2 ein neues, optionales `conceptTag`-Feld direkt auf `MiniCheckSlide` (Fallback: Lesson-
`topicTag`), gesetzt für die K2/K3-Minichecks — genau das, was dein Auftrag mit „Verdrahte ihn mit
den bestehenden K2/K3-Quizzes (Konzept-Tags an Fragen)" ohnehin verlangt. Das ist eine reine
Metadaten-Ergänzung (kein sichtbarer Text ändert sich), fällt für mich nicht unter „Lektions-Inhalte
nicht verändern".

### 2.3 `career_dojo_profile` (`src/lib/onboarding/profile.ts`)
Dritter, wieder eigenständiger Key. Marcus-Onboarding-Profil: `status`, `interviewGoal`, `timeFrame`,
`explorerMotivation`, `knowledge.{balance,ebitda,dcf}`, `skillProfile` (A/B/C), `learningTime`,
`streakStarted`, `interviewDate`, `onboardingCompletedAt`.

### 2.4 Soft-Gate-/Account-Anlage-Flow nach K1-Lektion-3 — **existiert nicht**
Ich habe gezielt danach gesucht (Grep über `gate`, `paywall`, `account`, `auth`, `register`, plus
Glob über Komponentennamen): **es gibt aktuell keinerlei Account- oder Auth-Flow im Code.** Das
einzig ähnliche ist `ComingSoonModal.tsx` — eine reine „Warteliste per E-Mail"-Komponente für
unfertige Features, kein Login/Signup. Es gibt auch keinen bestehenden Gate-Trigger nach der
dritten K1-Lektion. Das war offenbar geplant, aber nie gebaut.

**Korrektur zum Auftrag:** SCHRITT 1 „stellt den bestehenden Flow auf Supabase-Auth um" — es gibt
nichts umzustellen, ich baue den Auth-/Signup-Screen und den Trigger-Punkt (nach Abschluss der 3.
K1-Lektion, `completedLessons` enthält die ersten drei `k1-*`-IDs) neu, im bestehenden Design.

## 3. Schema-Entwurf

Vier Tabellen. Grund-Prinzip: **eine** Struktur pro Belang, kategorieübergreifend, weil alle
Lesson-/Concept-IDs im Code schon global eindeutig sind (`k1-`/`k2-`/`k3-`-Präfix) — kein Grund,
pro Kategorie zu splitten.

```sql
-- ============================================================
-- 1. profiles — 1:1 mit auth.users, Onboarding + Store-Singleton-Felder
-- ============================================================
create table public.profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  username           text,
  language           text not null default 'de',
  selected_track     text not null default 'ib',
  theme              text not null default 'dark',
  sound_enabled      boolean not null default true,
  daily_goal         int not null default 3,
  xp                 int not null default 0,
  streak             int not null default 0,
  longest_streak     int not null default 0,
  last_active_date   date,
  lessons_completed_today int not null default 0,
  total_questions_answered int not null default 0,
  total_correct_answers    int not null default 0,
  -- Marcus-Onboarding (aus career_dojo_profile)
  skill_profile      text,              -- 'A' | 'B' | 'C'
  interview_goal     text,
  time_frame         text,
  explorer_motivation text,
  learning_time      text,
  interview_date     date,
  onboarding_completed_at timestamptz,
  knowledge          jsonb not null default '{}'::jsonb, -- {balance, ebitda, dcf}
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- ============================================================
-- 2. lesson_progress — kategorieübergreifend, ersetzt completedLessons[] + completedQuizzes{}
-- ============================================================
create table public.lesson_progress (
  user_id       uuid not null references auth.users(id) on delete cascade,
  lesson_id     text not null,           -- z.B. 'k2-val-2-wacc'
  completed_at  timestamptz not null default now(),
  xp_earned     int not null default 0,
  best_score    int,                     -- Prozent, aus completedQuizzes.bestScore
  attempts      int not null default 1,
  primary key (user_id, lesson_id)
);

-- ============================================================
-- 3. concept_mastery — pro Konzept-Tag, kategorieübergreifend vererbbar
-- ============================================================
create table public.concept_mastery (
  user_id         uuid not null references auth.users(id) on delete cascade,
  concept_tag     text not null,         -- z.B. 'wacc', 'terminal-value', 'accretion-dilution'
  correct_count   int not null default 0,
  wrong_count     int not null default 0,
  status          text not null default 'learning', -- 'learning' | 'mastered' | 'due'
  last_attempt_at timestamptz,
  next_due_at     timestamptz,           -- Spacing: now() + N Tage, sobald 'mastered'
  primary key (user_id, concept_tag)
);

-- ============================================================
-- 4. quiz_attempts — Append-only Log, Grundlage für Konsequenz & Spacing
-- ============================================================
create table public.quiz_attempts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  question_id    text not null,          -- MiniCheckSlide.id, z.B. 'k2-l7-wacc'
  lesson_id      text not null,
  concept_tag    text not null,
  correct        boolean not null,
  attempt_number int not null default 1, -- 1 = erster Versuch (zählt für Streak/XP)
  answered_at    timestamptz not null default now()
);
create index quiz_attempts_user_concept_idx on public.quiz_attempts (user_id, concept_tag, answered_at desc);
```

### Warum diese vier Tabellen die drei Kern-Anforderungen erfüllen

| Anforderung | Wie |
|---|---|
| **Persistenz** | `profiles` + `lesson_progress` bilden 1:1 den heutigen `useStore`-Zustand ab (minus `reviewCards`, die beim alten SM-2-System bleiben, s.u.) — überlebt Gerätewechsel, weil sie an `auth.uid()` hängen, nicht an einen Browser. |
| **Cross-Category-Wissensprofil** | `lesson_progress.lesson_id` und `concept_mastery.concept_tag` sind flache Textspalten ohne Kategorie-Split — ein K3-Screen kann genau dieselbe Query stellen wie ein K1-Screen. |
| **Weak-Area-Vererbung** | `concept_mastery` ist die EINE Tabelle für alle Kategorien. Ein Nutzer, der `wacc` in K2 gemeistert hat, hat beim Eintritt in K3 bereits `status='mastered'` für `wacc` stehen — K3 kann das direkt lesen, ohne eigene Tracking-Logik. |

**Bewusst nicht neu gebaut:** `reviewCards`/SM-2 bleiben, wie sie sind, an die alte
`data/content`-Welt gebunden (PE/VC/Consulting, `/review`-Seite) — das ist ein **separates,
funktionierendes System**, das dieser Auftrag nicht anfasst. Der neue Konzept-Tracker (SCHRITT 2)
ist bewusst ein einfacheres, paralleles System nur für die K1/K2/K3-Minichecks, mit simplem
N-Tage-Intervall statt SM-2 — genau wie im Auftrag gefordert ("KEINE komplexe SRS-Engine").

## 4. RLS-Policies (Entwurf, wird in SCHRITT 1 als Migration abgelegt)

```sql
alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.concept_mastery enable row level security;
alter table public.quiz_attempts enable row level security;

create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "own lesson progress" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own concept mastery" on public.concept_mastery
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own quiz attempts" on public.quiz_attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

## 5. Migrationsstrategie (bestehender localStorage-Stand → erstes Login)

Ziel: kein Tester verliert Fortschritt, wenn er sich erstmals einloggt.

1. Beim ersten erfolgreichen Login/Signup prüft der Client einen lokalen Flag
   (`localStorage['career-dojo-migrated']`, Wert = die eingeloggte `user.id`).
2. Fehlt der Flag für diesen Nutzer: liest den Client alle drei bestehenden localStorage-Keys
   (`career-dojo-progress`, `career-dojo-weak-areas`, `career_dojo_profile`) und führt einen
   **einmaligen Bulk-Upsert** aus:
   - `completedLessons[]` → je eine Zeile in `lesson_progress` (`completed_at` = `lastActiveDate`
     als bester verfügbarer Näherungswert, da kein Pro-Lesson-Zeitstempel lokal existiert — das ist
     ein bewusster Präzisionsverlust, den ich dir hier transparent mache).
   - `completedQuizzes{}` → merged in dieselben `lesson_progress`-Zeilen (`best_score`, `attempts`).
   - `career-dojo-weak-areas` (`{tag: {correct, wrong}}`) → Seed für `concept_mastery` auf der
     **alten** Tag-Granularität (Block-Level) — sobald SCHRITT 2 feinere `conceptTag`s einführt,
     laufen die neuen Tags separat und sauber weiter, die migrierten Alt-Tags bleiben als
     historische Zeilen stehen (kein Datenverlust, kein Zwang zur Rückwirkung).
   - `career-dojo-progress` Singleton-Felder + `career_dojo_profile` → ein `upsert` in `profiles`.
3. Nach erfolgreichem Upsert wird der Migrations-Flag gesetzt. localStorage selbst wird **nicht**
   gelöscht — es bleibt der Offline-Fallback (nicht eingeloggt / kein Netz), genau wie im Auftrag
   verlangt. Lese-Priorität danach: eingeloggt + online → Supabase; sonst → localStorage.
4. Re-Login auf einem zweiten Gerät (z.B. Inkognito-Fenster desselben Testers): kein lokaler Flag
   vorhanden, aber Supabase hat bereits Zeilen für diesen `user_id` — der Client liest zuerst aus
   Supabase, merged NICHT mit dem (in diesem Fall leeren) lokalen Stand, sondern übernimmt Supabase
   als Quelle der Wahrheit. Migration läuft nur, wenn `lesson_progress` für diesen Nutzer noch leer
   ist UND lokale Daten vorhanden sind — verhindert doppeltes Aufsummieren von XP bei jedem Login.

---

**STOPP.** Das ist der komplette SCHRITT-0-Umfang: Env-Lücke, Ist-Zustand, Schema, Migrationsplan.
Zwei Dinge brauche ich von dir, bevor SCHRITT 1 beginnt:
1. Freigabe von Schema + Migrationsplan (oder Änderungswünsche).
2. Die zwei `NEXT_PUBLIC_`-Werte in deiner lokalen `.env.local`, sonst kann ich SCHRITT 1 nicht im
   Preview verifizieren.
