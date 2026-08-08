-- ============================================================
-- Post-login goal commitment (Phase 5b). Freiwillig, überspringbar —
-- captured once right after the soft-gate login, purely to let a
-- future feature show a personalized path. No university/grade data.
-- ============================================================

alter table public.profiles add column if not exists goal text;
alter table public.profiles add column if not exists goal_timeframe text;
