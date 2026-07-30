import { useEffect, useState } from 'react'
import { Sun, Moon } from './Icons.jsx'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'light',
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('kdc-theme', theme)
  }, [theme])

  return (
    <button
      className="icon-btn"
      onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title="Toggle theme"
    >
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
