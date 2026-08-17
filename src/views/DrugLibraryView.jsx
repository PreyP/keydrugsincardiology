import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { drugClasses } from '../data/drugClasses.js'
import DrugClassCard from '../components/DrugClassCard.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'

export default function DrugLibraryView() {
  const [query, setQuery] = useState('')
  const location = useLocation()

  // Scroll to a drug when arriving via /drugs#drugId (from a bubble link).
  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (!id) return
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        el.classList.add('flash-highlight')
        setTimeout(() => el.classList.remove('flash-highlight'), 1600)
      }
    }, 60)
    return () => clearTimeout(t)
  }, [location.hash])

  const q = query.trim().toLowerCase()
  const list = q
    ? drugClasses.filter((d) =>
        [d.name, d.shortName, ...d.examples].join(' ').toLowerCase().includes(q),
      )
    : drugClasses

  const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">Drug library</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>Drug library</h1>
      <p className="lead">
        Every drug class in the module, A to Z. Each card links to the conditions where it is used,
        so you can move between the pharmacology and the clinical context.
      </p>

      <input
        className="search-input"
        placeholder="Filter drugs by name or example agent"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <p className="muted" style={{ fontSize: '0.9rem', margin: '0.75rem 0 1.5rem' }}>
        {sorted.length} drug {sorted.length === 1 ? 'class' : 'classes'}
      </p>

      {sorted.length === 0 ? (
        <div className="empty-note">No drugs match that search.</div>
      ) : (
        sorted.map((d) => <DrugClassCard key={d.id} drug={d} />)
      )}
    </div>
  )
}
