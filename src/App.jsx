import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import SearchPalette from './components/SearchPalette.jsx'
import { Menu, HeartPulse } from './components/Icons.jsx'
import HomeView from './views/HomeView.jsx'
import LearnView from './views/LearnView.jsx'
import PracticeView from './views/PracticeView.jsx'
import TestView from './views/TestView.jsx'
import DrugLibraryView from './views/DrugLibraryView.jsx'
import ReviewView from './views/ReviewView.jsx'
import CompareView from './views/CompareView.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)
  const location = useLocation()

  // Close overlays whenever the route changes.
  useEffect(() => {
    setSearchOpen(false)
    setMenuOpen(false)
  }, [location])

  // Global Cmd/Ctrl+K opens search.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app">
      <div className="mobile-header">
        <button className="icon-btn menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
        <span className="sidebar__logo" style={{ width: 30, height: 30 }}>
          <HeartPulse size={18} />
        </span>
        <strong style={{ fontSize: '0.9rem' }}>Key Drugs in Cardiology</strong>
        <div style={{ marginLeft: 'auto' }}>
          <ThemeToggle />
        </div>
      </div>

      {menuOpen && <div className="scrim" onClick={closeMenu} />}
      <Sidebar open={menuOpen} onNavigate={closeMenu} onOpenSearch={() => setSearchOpen(true)} />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/learn/:conditionId" element={<LearnView />} />
          <Route path="/drugs" element={<DrugLibraryView />} />
          <Route path="/practice" element={<PracticeView />} />
          <Route path="/practice/:conditionId" element={<PracticeView />} />
          <Route path="/test" element={<TestView />} />
          <Route path="/review" element={<ReviewView />} />
          <Route path="/compare" element={<CompareView />} />
        </Routes>
      </main>

      <SearchPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
