import { describe, it, expect } from 'vitest'
import { schedule, DAY } from '../lib/srs.js'

describe('srs schedule', () => {
  const now = 1_000_000_000_000

  it('sends "again" back within the session and lowers ease', () => {
    const s = schedule({ ease: 2.5, intervalDays: 10, reps: 3 }, 'again', now)
    expect(s.intervalDays).toBe(0)
    expect(s.reps).toBe(0)
    expect(s.lapses).toBe(1)
    expect(s.ease).toBeCloseTo(2.3)
    expect(s.due).toBe(now + 60_000)
  })

  it('gives a new card a 1-day interval on "good"', () => {
    const s = schedule(undefined, 'good', now)
    expect(s.intervalDays).toBe(1)
    expect(s.reps).toBe(1)
    expect(s.due).toBe(now + DAY)
  })

  it('grows the interval by ease on subsequent "good" reviews', () => {
    const s = schedule({ ease: 2.5, intervalDays: 10, reps: 2 }, 'good', now)
    expect(s.intervalDays).toBe(25) // 10 * 2.5
  })

  it('pushes "easy" further out than "good"', () => {
    const good = schedule({ ease: 2.5, intervalDays: 10, reps: 2 }, 'good', now)
    const easy = schedule({ ease: 2.5, intervalDays: 10, reps: 2 }, 'easy', now)
    expect(easy.intervalDays).toBeGreaterThan(good.intervalDays)
  })

  it('never lets ease fall below the floor', () => {
    let s = { ease: 1.35, intervalDays: 5, reps: 1 }
    for (let i = 0; i < 5; i++) s = schedule(s, 'again', now)
    expect(s.ease).toBeGreaterThanOrEqual(1.3)
  })
})
