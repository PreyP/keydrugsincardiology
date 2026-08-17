import { NavLink } from 'react-router-dom'
import { conditions, categories } from '../data/conditions.js'
import { HeartPulse, Home, Book, ClipboardCheck, Timer, Pill } from './Icons.jsx'

const catOrder = ['ischemic', 'rhythm', 'pump']

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

export default function Sidebar({ open, onNavigate, onOpenSearch }) {
  const byCat = catOrder.map((cat) => ({
    cat,
    label: categories[cat].label,
    items: conditions.filter((c) => c.category === cat),
  }))

  return (
    <aside className={`sidebar ${open ? 'open' : ''}`} onClick={onNavigate}>
      <div className="sidebar__brand">
        <span className="sidebar__logo">
          <HeartPulse size={20} />
        </span>
        <span>
          <span className="sidebar__title">Key Drugs in Cardiology</span>
          <br />
          <span className="sidebar__subtitle">Learning module</span>
        </span>
      </div>

      <button
        className="search-trigger"
        onClick={(e) => { e.stopPropagation(); onOpenSearch && onOpenSearch() }}
      >
        <span>Search</span>
        <kbd className="search-trigger__kbd">{isMac ? '⌘' : 'Ctrl'} K</kbd>
      </button>

      <NavLink to="/" end className="nav-link">
        <span className="nav-link__icon"><Home size={17} /></span> Overview
      </NavLink>
      <NavLink to="/drugs" className="nav-link">
        <span className="nav-link__icon"><Pill size={17} /></span> Drug library
      </NavLink>
      <NavLink to="/test" className="nav-link">
        <span className="nav-link__icon"><Timer size={17} /></span> Test my knowledge
      </NavLink>

      {byCat.map(({ cat, label, items }) => (
        <div key={cat}>
          <div className="nav-section-label">{label}</div>
          {items.map((c) => (
            <NavLink key={c.id} to={`/learn/${c.id}`} className="nav-link">
              <span className="nav-link__icon"><Book size={16} /></span>
              {c.shortName}
            </NavLink>
          ))}
        </div>
      ))}

      <div className="nav-section-label">Practice</div>
      <NavLink to="/practice" className="nav-link">
        <span className="nav-link__icon"><ClipboardCheck size={16} /></span> Work through cases
      </NavLink>
    </aside>
  )
}
