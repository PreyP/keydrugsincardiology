import { describe, it, expect } from 'vitest'
import { glossary, glossaryRegex, termToId, glossaryById } from '../data/glossary.js'

describe('glossary', () => {
  it('has unique ids', () => {
    const ids = glossary.map((g) => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every entry has a term and a definition', () => {
    for (const g of glossary) {
      expect(g.term).toBeTruthy()
      expect(g.def.length).toBeGreaterThan(10)
    }
  })

  it('matches a known term on a word boundary', () => {
    glossaryRegex.lastIndex = 0
    const m = glossaryRegex.exec('We start an ACE inhibitor for afterload reduction.')
    expect(m).not.toBeNull()
    const id = termToId[m[0].toLowerCase()]
    expect(glossaryById[id]).toBeTruthy()
  })

  it('resolves an alias to its canonical entry', () => {
    // "LVEF" is an alias of the ejection fraction entry
    expect(termToId['lvef']).toBe('lvef')
    expect(glossaryById[termToId['lvef']].term).toMatch(/ejection fraction/i)
  })

  it('question-linked entries point at real practice conditions', () => {
    for (const g of glossary) {
      if (g.questionId) expect(g.practice).toBeTruthy()
    }
  })
})
