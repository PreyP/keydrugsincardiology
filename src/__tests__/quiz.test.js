import { describe, it, expect } from 'vitest'
import { buildQuestionBank, shuffle } from '../data/quiz.js'

describe('question bank', () => {
  const bank = buildQuestionBank()

  it('is non-empty', () => {
    expect(bank.length).toBeGreaterThan(0)
  })

  it('every question has a valid answer index and a conditionId', () => {
    for (const q of bank) {
      expect(q.conditionId).toBeTruthy()
      expect(Array.isArray(q.choices)).toBe(true)
      expect(q.answer).toBeGreaterThanOrEqual(0)
      expect(q.answer).toBeLessThan(q.choices.length)
      expect(typeof q.explanation).toBe('string')
    }
  })
})

describe('shuffle', () => {
  it('preserves length and membership', () => {
    const src = [1, 2, 3, 4, 5, 6, 7, 8]
    const out = shuffle(src)
    expect(out).toHaveLength(src.length)
    expect([...out].sort()).toEqual([...src].sort())
  })

  it('does not mutate the input', () => {
    const src = [1, 2, 3]
    const copy = [...src]
    shuffle(src)
    expect(src).toEqual(copy)
  })
})
