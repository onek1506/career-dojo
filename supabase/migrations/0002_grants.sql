-- ============================================================
-- Fix: "permission denied for table X" for the authenticated role.
--
-- RLS policies control WHICH ROWS a role may touch once it already has
-- table-level access — they are not a substitute for the base GRANTs.
-- Migration 0001 created the tables and the RLS policies but never
-- granted the `authenticated` role table-level privileges, so every
-- client-side read/write (PostgREST, running as `authenticated`) was
-- rejected before RLS was even evaluated. The on-signup trigger still
-- worked because it runs `security definer` (as the function owner),
-- which bypasses both grants and RLS.
-- ============================================================

grant usage on schema public to authenticated;

grant select, insert, update, delete on public.profiles        to authenticated;
grant select, insert, update, delete on public.lesson_progress  to authenticated;
grant select, insert, update, delete on public.concept_mastery  to authenticated;
grant select, insert, update, delete on public.quiz_attempts    to authenticated;
