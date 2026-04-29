/**
 * Fisher-Yates shuffle. Returns a new array; does not mutate input.
 * Use inside `useState(() => shuffle(arr))` so the order is randomised
 * once at mount and stays stable for the rest of the component lifetime.
 */
export function shuffle<T>(items: readonly T[]): T[] {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
