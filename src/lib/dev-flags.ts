// Centralised developer-only feature flags. Flip these for local testing.
// They are intentionally hard-coded constants (no env wiring) so it is
// obvious from a search what is currently enabled and shipped.

// When true, every lesson is reachable from the UI (course view, skill
// tree) regardless of completion state or required XP. Lets devs jump
// straight into lesson 4 without playing through 1–3 first. SHIP AS
// `false` BEFORE PUBLIC RELEASE.
export const DEV_UNLOCK_ALL = true;
