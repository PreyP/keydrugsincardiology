import { useSyncExternalStore } from 'react'
import { Sun, Moon } from './Icons.jsx'

/*
 * Theme lives in one module-level store so every ThemeToggle instance (the
 * mobile header and the in-page top bar can both be on screen at once) stays in
 * sync, and so a change in another tab is picked up. All localStorage access is
 * guarded: private-mode browsers throw on write.
 */
const KEY = 'kdc-theme'

function readInitial() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* storage unavailable */ }
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

let theme = readInitial()
const listeners = new Set()

function apply() {
  document.documentElement.setAttribute('data-theme', theme)
}
apply()

function setTheme(next) {
  theme = next
  apply()
  try { localStorage.setItem(KEY, next) } catch { /* ignore */ }
  listeners.forEach((l) => l())
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return
    const v = e.newValue === 'dark' ? 'dark' : 'light'
    if (v !== theme) {
      theme = v
      apply()
      listeners.forEach((l) => l())
    }
  })
}

function subscribe(cb) {
  listeners.add(cb)
  return () => listeners.delete(cb)
}

export default function ThemeToggle() {
  const current = useSyncExternalStore(subscribe, () => theme, () => theme)
  const nextLabel = current === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${nextLabel} mode`}
      title={`Switch to ${nextLabel} mode`}
    >
      {current === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
