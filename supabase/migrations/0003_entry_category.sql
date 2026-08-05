-- ============================================================
-- Onboarding self-placement: which lesson tree a user starts in.
-- `selected_track` already means IB/PE/VC/Consulting (top-level course
-- track) — this is a separate axis: k1/k2/k3/k4 within the IB track.
-- ============================================================

alter table public.profiles add column if not exists entry_category text;
