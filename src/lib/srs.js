/*
 * Pure spaced-repetition scheduling logic (SM-2 flavoured), separated from the
 * React hook so it can be unit tested in isolation.
 */
export const DAY = 86_400_000
export const MIN_EASE = 1.3

export function schedule(prev, grade, now = Date.now()) {
  let { ease = 2.5, intervalDays = 0, reps = 0, lapses = 0 } = prev || {}

  if (grade === 'again') {
    ease = Math.max(MIN_EASE, ease - 0.2)
    return { ease, intervalDays: 0, reps: 0, lapses: lapses + 1, due: now + 60_000 }
  }
  if (grade === 'hard') {
    ease = Math.max(MIN_EASE, ease - 0.15)
    intervalDays = reps === 0 ? 1 : Math.max(1, intervalDays * 1.2)
    reps += 1
  } else if (grade === 'easy') {
    ease = ease + 0.15
    intervalDays = reps === 0 ? 3 : Math.max(1, intervalDays * ease * 1.3)
    reps += 1
  } else {
    intervalDays = reps === 0 ? 1 : Math.max(1, intervalDays * ease)
    reps += 1
  }
  intervalDays = Math.round(intervalDays)
  return { ease, intervalDays, reps, lapses, due: now + intervalDays * DAY }
}
