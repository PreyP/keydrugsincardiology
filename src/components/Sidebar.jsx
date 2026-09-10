import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { conditions, categories } from '../data/conditions.js'
import HowToUse from './HowToUse.jsx'
import { Home, Book, ClipboardCheck, Timer, Pill, Compare } from './Icons.jsx'

const catOrder = ['ischemic', 'rhythm', 'pump']

const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '')

export default function Sidebar({ open, onNavigate, onOpenSearch }) {
  const navRef = useRef(null)
  const byCat = catOrder.map((cat) => ({
    cat,
    label: categories[cat].label,
    items: conditions.filter((c) => c.category === cat),
  }))

  // When the drawer is closed on a narrow screen it is translated off-canvas but
  // still in the DOM; `inert` keeps its links out of the tab order and the
  // accessibility tree until it opens.
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const apply = () => {
      const offCanvas = window.matchMedia('(max-width: 860px)').matches && !open
      el.inert = offCanvas
    }
    apply()
    window.addEventListener('resize', apply)
    return () => window.removeEventListener('resize', apply)
  }, [open])

  // Keep focus inside the drawer while it is open on mobile.
  function trapFocus(e) {
    if (e.key !== 'Tab' || !window.matchMedia('(max-width: 860px)').matches) return
    const focusable = navRef.current?.querySelectorAll('a[href], button:not([disabled])')
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <nav
      ref={navRef}
      className={`sidebar ${open ? 'open' : ''}`}
      aria-label="Primary"
      onClick={onNavigate}
      onKeyDown={trapFocus}
    >
      <div className="sidebar__brand">
        <span>
          <span className="sidebar__title">Key Drugs in Cardiology</span>
          <br />
          <span className="sidebar__subtitle">Learning module</span>
        </span>
      </div>
      <HowToUse />

      <button
        className="search-trigger"
        onClick={(e) => { e.stopPropagation(); onOpenSearch && onOpenSearch() }}
      >
        <span>Search</span>
        <kbd className="search-trigger__kbd">{isMac ? '⌘' : 'Ctrl'} K</kbd>
      </button>

      <NavLink to="/" end className="nav-link">
        <span className="nav-link__icon" aria-hidden="true"><Home size={17} /></span> Overview
      </NavLink>
      <NavLink to="/drugs" className="nav-link">
        <span className="nav-link__icon" aria-hidden="true"><Pill size={17} /></span> Drug library
      </NavLink>
      <NavLink to="/compare" className="nav-link">
        <span className="nav-link__icon" aria-hidden="true"><Compare size={17} /></span> Comparisons
      </NavLink>
      <NavLink to="/test" className="nav-link">
        <span className="nav-link__icon" aria-hidden="true"><Timer size={17} /></span> Test my knowledge
      </NavLink>

      {byCat.map(({ cat, label, items }) => (
        <div key={cat}>
          <div className="nav-section-label">{label}</div>
          {items.map((c) => (
            <NavLink key={c.id} to={`/learn/${c.id}`} className="nav-link">
              <span className="nav-link__icon" aria-hidden="true"><Book size={16} /></span>
              {c.shortName}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="nav-section-label">Practice</div>
      <NavLink to="/practice" className="nav-link">
        <span className="nav-link__icon" aria-hidden="true"><ClipboardCheck size={16} /></span> Work through cases
      </NavLink>
    </nav>
  )
}
