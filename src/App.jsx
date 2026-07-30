import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import ThemeToggle from './components/ThemeToggle.jsx'
import { Menu, HeartPulse } from './components/Icons.jsx'
import HomeView from './views/HomeView.jsx'
import LearnView from './views/LearnView.jsx'
import PracticeView from './views/PracticeView.jsx'
import TestView from './views/TestView.jsx'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

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
      <Sidebar open={menuOpen} onNavigate={closeMenu} />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/learn/:conditionId" element={<LearnView />} />
          <Route path="/practice" element={<PracticeView />} />
          <Route path="/practice/:conditionId" element={<PracticeView />} />
          <Route path="/test" element={<TestView />} />
        </Routes>
      </main>
    </div>
  )
}
