-- ============================================================
-- CareerDojo — initial cross-category progress schema
-- See docs/supabase-schema.md for the full design rationale.
-- ============================================================

-- ============================================================
-- 1. profiles — 1:1 with auth.users, onboarding + store singleton fields
-- ============================================================
create table public.profiles (
  id                       uuid primary key references auth.users(id) on delete cascade,
  username                 text,
  language                 text not null default 'de',
  selected_track           text not null default 'ib',
  theme                    text not null default 'dark',
  sound_enabled            boolean not null default true,
  daily_goal               int not null default 3,
  xp                       int not null default 0,
  streak                   int not null default 0,
  longest_streak           int not null default 0,
  last_active_date         date,
  lessons_completed_today  int not null default 0,
  total_questions_answered int not null default 0,
  total_correct_answers    int not null default 0,
  -- Marcus onboarding (formerly career_dojo_profile in localStorage)
  skill_profile            text,
  interview_goal           text,
  time_frame                text,
  explorer_motivation      text,
  learning_time            text,
  interview_date           date,
  onboarding_completed_at  timestamptz,
  knowledge                jsonb not null default '{}'::jsonb,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- ============================================================
-- 2. lesson_progress — cross-category, replaces completedLessons[] + completedQuizzes{}
-- ============================================================
create table public.lesson_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  lesson_id    text not null,
  completed_at timestamptz not null default now(),
  xp_earned    int not null default 0,
  best_score   int,
  attempts     int not null default 1,
  primary key (user_id, lesson_id)
);

-- ============================================================
-- 3. concept_mastery — per concept tag, cross-category, inheritable
-- ============================================================
create table public.concept_mastery (
  user_id         uuid not null references auth.users(id) on delete cascade,
  concept_tag     text not null,
  correct_count   int not null default 0,
  wrong_count     int not null default 0,
  status          text not null default 'learning', -- 'learning' | 'mastered' | 'due'
  last_attempt_at timestamptz,
  next_due_at     timestamptz,
  primary key (user_id, concept_tag)
);

-- ============================================================
-- 4. quiz_attempts — append-only log, basis for consequence & spacing
-- ============================================================
create table public.quiz_attempts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  question_id    text not null,
  lesson_id      text not null,
  concept_tag    text not null,
  correct        boolean not null,
  attempt_number int not null default 1,
  answered_at    timestamptz not null default now()
);
create index quiz_attempts_user_concept_idx on public.quiz_attempts (user_id, concept_tag, answered_at desc);

-- ============================================================
-- Row Level Security — each user only ever sees their own rows.
-- The project has RLS enabled by default for new tables, so without
-- these policies every access fails closed; write them explicitly.
-- ============================================================
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

-- ============================================================
-- Auto-create a profile row on signup, so the client never has to
-- worry about an INSERT racing a SELECT right after auth.
-- ============================================================
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
