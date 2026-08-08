-- ============================================================
-- Spaced-repetition engine (Langzeit-Layer Etappe 1) — additive only,
-- see docs/langzeit-layer-etappe1.md for the full design rationale.
-- ============================================================

alter table public.concept_mastery add column if not exists interval_stage int not null default 0;
alter table public.concept_mastery add column if not exists partial_count int not null default 0;

-- 'knew' | 'partial' | 'unknown' — set only on active-recall attempts;
-- null for ordinary multiple-choice minicheck attempts.
alter table public.quiz_attempts add column if not exists self_rating text;
