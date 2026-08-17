import { describe, it, expect } from 'vitest'
import { conditions, conditionById } from '../data/conditions.js'
import { drugClassById } from '../data/drugClasses.js'
import { comparisons } from '../data/comparisons.js'
import { glossary } from '../data/glossary.js'
import { simulations } from '../data/simulations.js'

describe('data integrity', () => {
  it('every condition references real drug classes', () => {
    for (const c of conditions) {
      for (const id of c.drugClassIds) {
        expect(drugClassById[id], `${c.id} -> ${id}`).toBeTruthy()
      }
    }
  })

  it('every comparison relates to real conditions', () => {
    for (const t of comparisons) {
      for (const cid of t.related) expect(conditionById[cid]).toBeTruthy()
      // every row aligns to the header count
      for (const row of t.rows) expect(row.length).toBe(t.headers.length)
    }
  })

  it('glossary links point at real drugs or conditions', () => {
    for (const g of glossary) {
      if (!g.link) continue
      if (g.link.type === 'drug') expect(drugClassById[g.link.id], g.id).toBeTruthy()
      if (g.link.type === 'condition') expect(conditionById[g.link.id], g.id).toBeTruthy()
    }
  })

  it('simulation choices point at nodes that exist', () => {
    for (const s of simulations) {
      expect(s.nodes[s.start]).toBeTruthy()
      for (const [nid, node] of Object.entries(s.nodes)) {
        if (node.terminal) continue
        for (const ch of node.choices) {
          expect(s.nodes[ch.next], `${s.id}:${nid} -> ${ch.next}`).toBeTruthy()
        }
      }
    }
  })
})
