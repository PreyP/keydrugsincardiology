import { useState, useCallback, useEffect } from 'react'
import { staticCards, staticCardById } from '../data/cards.js'
import { schedule } from '../lib/srs.js'

/*
 * A small SM-2-flavoured spaced-repetition scheduler kept in localStorage.
 *
 * store = {
 *   sched: { [cardId]: { ease, intervalDays, due (ms epoch), reps, lapses } },
 *   extra: { [cardId]: { front, back, conditionId, kind } }  // missed-question cards
 * }
 *
 * A card is "due" if it has no schedule yet (new) or its due time has passed.
 * Grades: 'again' | 'hard' | 'good' | 'easy'.
 */
const KEY = 'kdc-srs'

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY))
    if (v && v.sched && v.extra) return v
  } catch {
    /* ignore */
  }
  return { sched: {}, extra: {} }
}

export function useSRS() {
  const [store, setStore] = useState(read)

  useEffect(() => {
    const onStorage = (e) => e.key === KEY && setStore(read())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const persist = useCallback((next) => {
    setStore(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }, [])

  const allCards = [
    ...staticCards,
    ...Object.entries(store.extra).map(([id, c]) => ({ id, ...c })),
  ]

  const now = Date.now()
  const isDue = (id) => {
    const s = store.sched[id]
    return !s || s.due <= now
  }

  const dueCards = allCards.filter((c) => isDue(c.id))
  const newCount = allCards.filter((c) => !store.sched[c.id]).length

  const rate = useCallback(
    (cardId, grade) => {
      const next = { ...store, sched: { ...store.sched } }
      next.sched[cardId] = schedule(store.sched[cardId], grade)
      persist(next)
    },
    [store, persist],
  )

  // Add a missed multiple-choice question as a review card (due now).
  const addMissed = useCallback(
    (card) => {
      const id = card.id
      if (store.extra[id] || staticCardById[id]) return
      const next = {
        sched: { ...store.sched },
        extra: { ...store.extra, [id]: { front: card.front, back: card.back, conditionId: card.conditionId, kind: 'missed' } },
      }
      // leave unscheduled so it counts as due/new
      persist(next)
    },
    [store, persist],
  )

  const reset = useCallback(() => persist({ sched: {}, extra: {} }), [persist])

  return {
    allCards,
    dueCards,
    dueCount: dueCards.length,
    newCount,
    totalCount: allCards.length,
    reviewedCount: Object.keys(store.sched).length,
    rate,
    addMissed,
    reset,
  }
}
