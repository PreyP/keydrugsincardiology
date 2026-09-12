import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { comparisons } from '../data/comparisons.js'
import ComparisonTable from '../components/ComparisonTable.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { scrollBehavior } from '../lib/motion.js'

export default function CompareView() {
  const location = useLocation()

  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (!id) return
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
        el.classList.add('flash-highlight')
        setTimeout(() => el.classList.remove('flash-highlight'), 1600)
      }
    }, 60)
    return () => clearTimeout(t)
  }, [location.hash])

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">Comparisons</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>Comparisons</h1>
      <p className="lead">
        The same tables already shown inline on the relevant condition pages, collected here for
        the decisions that trip students up: which anticoagulant, which calcium channel blocker,
        rate versus rhythm, and the pillars of heart failure therapy. Each table links back to the
        conditions it belongs to.
      </p>

      {comparisons.map((t) => (
        <div id={t.id} key={t.id} style={{ scrollMarginTop: '90px', marginTop: '1.5rem' }}>
          <ComparisonTable table={t} showRelated />
        </div>
      ))}
    </div>
  )
}
