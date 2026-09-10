import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import SearchPalette from './components/SearchPalette.jsx'
import { Menu } from './components/Icons.jsx'
import HomeView from './views/HomeView.jsx'
import LearnView from './views/LearnView.jsx'
import PracticeView from './views/PracticeView.jsx'
import TestView from './views/TestView.jsx'
import DrugLibraryView from './views/DrugLibraryView.jsx'
import CompareView from './views/CompareView.jsx'
import CheatSheetView from './views/CheatSheetView.jsx'
import AboutView from './views/AboutView.jsx'
import { scrollBehavior } from './lib/motion.js'

// Human-readable names per route, for the document title and the SPA route announcer.
const ROUTE_TITLES = [
  [/^\/$/, 'Overview'],
  [/^\/learn\//, 'Learn'],
  [/^\/drugs$/, 'Drug library'],
  [/^\/practice/, 'Practice'],
  [/^\/test$/, 'Test my knowledge'],
  [/^\/compare$/, 'Comparisons'],
  [/^\/cheatsheet\//, 'Cheat sheet'],
  [/^\/about$/, 'Sources'],
]
const routeName = (path) => (ROUTE_TITLES.find(([re]) => re.test(path)) || [, 'Overview'])[1]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [routeMsg, setRouteMsg] = useState('')
  const closeMenu = () => setMenuOpen(false)
  const location = useLocation()
  const mainRef = useRef(null)
  const menuBtnRef = useRef(null)
  const firstRoute = useRef(true)

  // Close overlays whenever the route changes.
  useEffect(() => {
    setSearchOpen(false)
    setMenuOpen(false)
  }, [location])

  // Per-route document title + focus + screen-reader announcement.
  useEffect(() => {
    const name = routeName(location.pathname)
    document.title = `${name} · Key Drugs in Cardiology`
    if (firstRoute.current) {
      firstRoute.current = false
      return
    }
    setRouteMsg(`${name} page`)
    mainRef.current?.focus({ preventScroll: true })
    window.scrollTo({ top: 0, left: 0, behavior: scrollBehavior() })
  }, [location])

  // A-02: remember the last learn/practice page so "Continue learning" resumes it.
  useEffect(() => {
    const p = location.pathname
    if (/^\/(learn|practice)\/.+/.test(p)) {
      try {
        localStorage.setItem('kdc-last', JSON.stringify({ path: p + location.hash, at: Date.now() }))
      } catch {
        /* ignore */
      }
    }
  }, [location])

  // Global keyboard: Cmd/Ctrl+K toggles search, Escape closes any open overlay.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      } else if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Move focus into / out of the mobile navigation drawer as it opens and closes.
  useEffect(() => {
    if (menuOpen) {
      const firstLink = document.querySelector('.sidebar a, .sidebar button')
      firstLink?.focus()
    } else if (document.activeElement?.closest?.('.sidebar')) {
      menuBtnRef.current?.focus()
    }
  }, [menuOpen])

  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="sr-only" role="status" aria-live="polite">{routeMsg}</div>

      <header className="mobile-header">
        <button
          ref={menuBtnRef}
          className="icon-btn menu-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          <Menu />
        </button>
        <strong style={{ fontSize: '0.9rem' }}>Key Drugs in Cardiology</strong>
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </header>

      {menuOpen && <button className="scrim" aria-label="Close navigation menu" onClick={closeMenu} />}
      <Sidebar open={menuOpen} onNavigate={closeMenu} onOpenSearch={() => setSearchOpen(true)} />

      <main className="main" id="main" ref={mainRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/learn/:conditionId" element={<LearnView />} />
          <Route path="/drugs" element={<DrugLibraryView />} />
          <Route path="/practice" element={<PracticeView />} />
          <Route path="/practice/:conditionId" element={<PracticeView />} />
          <Route path="/test" element={<TestView />} />
          <Route path="/compare" element={<CompareView />} />
          <Route path="/cheatsheet/:conditionId" element={<CheatSheetView />} />
          <Route path="/about" element={<AboutView />} />
        </Routes>
      </main>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
