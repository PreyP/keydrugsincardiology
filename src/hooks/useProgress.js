import { useState, useEffect, useCallback } from 'react'

/*
 * Lightweight learner progress in localStorage:
 *   learned: { [conditionId]: true }
 *   bestScore: number (best test percentage)
 * A storage event listener keeps multiple open views in sync.
 */
const KEY = 'kdc-progress'

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { learned: {}, bestScore: 0 }
  } catch {
    return { learned: {}, bestScore: 0 }
  }
}

export function useProgress() {
  const [state, setState] = useState(read)

  useEffect(() => {
    const onStorage = (e) => e.key === KEY && setState(read())
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const persist = useCallback((next) => {
    setState(next)
    localStorage.setItem(KEY, JSON.stringify(next))
  }, [])

  const toggleLearned = useCallback(
    (id) => {
      const next = { ...state, learned: { ...state.learned } }
      if (next.learned[id]) delete next.learned[id]
      else next.learned[id] = true
      persist(next)
    },
    [state, persist],
  )

  const recordScore = useCallback(
    (pct) => {
      if (pct > (state.bestScore || 0)) persist({ ...state, bestScore: pct })
    },
    [state, persist],
  )

  return {
    learned: state.learned,
    learnedCount: Object.keys(state.learned).length,
    bestScore: state.bestScore || 0,
    isLearned: (id) => !!state.learned[id],
    toggleLearned,
    recordScore,
  }
}
