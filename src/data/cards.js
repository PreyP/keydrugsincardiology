/*
 * Review-deck cards for spaced repetition.
 *
 * The static deck is every flashcard defined in the conditions, given a stable
 * id so the SRS scheduler can track it across sessions. Missed multiple-choice
 * questions are added dynamically at runtime (see useSRS) and are not listed here.
 */

import { conditions } from './conditions.js'

export function buildStaticCards() {
  const cards = []
  for (const c of conditions) {
    for (const pc of c.practiceCases || []) {
      pc.questions.forEach((q, i) => {
        if (q.type === 'flash') {
          cards.push({
            id: `flash:${pc.id}:${i}`,
            front: q.front,
            back: q.back,
            conditionId: c.id,
            kind: 'flash',
          })
        }
      })
    }
  }
  return cards
}

export const staticCards = buildStaticCards()
export const staticCardById = Object.fromEntries(staticCards.map((c) => [c.id, c]))
