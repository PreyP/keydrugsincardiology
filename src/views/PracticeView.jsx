import { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { conditions, conditionById, categories } from '../data/conditions.js'
import { simulationsForCondition } from '../data/simulations.js'
import Question from '../components/Question.jsx'
import CaseSimulator from '../components/CaseSimulator.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { Book } from '../components/Icons.jsx'

function CaseBlock({ pc }) {
  const total = pc.questions.filter((q) => q.type === 'mc').length
  const [score, setScore] = useState({ correct: 0, answered: 0 })

  function handleAnswered(isCorrect) {
    setScore((s) => ({ correct: s.correct + (isCorrect ? 1 : 0), answered: s.answered + 1 }))
  }

  return (
    <div className="card" style={{ padding: '1.35rem', marginBottom: '1.5rem' }}>
      <h3 style={{ marginTop: 0 }}>{pc.title}</h3>
      <div className="case-vignette">
        <div className="case-vignette__label">Case</div>
        {pc.vignette}
      </div>
      {total > 0 && (
        <p className="muted" style={{ fontSize: '0.85rem' }}>
          Multiple choice score: {score.correct} / {total}
          {score.answered < total ? ` (${score.answered} answered)` : ''}
        </p>
      )}
      <div className="stack">
        {pc.questions.map((q, i) => (
          <div key={i} id={q.id} style={q.id ? { scrollMarginTop: '90px' } : undefined}>
            <Question q={q} onAnswered={handleAnswered} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PracticeView() {
  const { conditionId } = useParams()
  const location = useLocation()
  const active = conditionId ? conditionById[conditionId] : null
  const list = active ? [active] : conditions

  // Scroll to and highlight a specific question when arriving via a bubble link.
  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (!id) return
    const t = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('flash-highlight')
        setTimeout(() => el.classList.remove('flash-highlight'), 1600)
      }
    }, 80)
    return () => clearTimeout(t)
  }, [location.hash, conditionId])

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">Practice</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>{active ? `Practice: ${active.name}` : 'Work through the cases'}</h1>
      <p className="lead">
        {active
          ? `Apply the ${active.shortName} pharmacology. Multiple choice questions grade instantly; short-answer and flashcard prompts let you self-check.`
          : 'Every condition has a case with mixed question formats. Multiple choice grades instantly; short-answer and flashcards are for self-assessment.'}
      </p>

      {!active && (
        <div className="row" style={{ margin: '1rem 0 1.75rem' }}>
          {conditions.map((c) => (
            <Link key={c.id} to={`/practice/${c.id}`} className="btn btn--ghost btn--sm">
              {c.shortName}
            </Link>
          ))}
        </div>
      )}

      {active && (
        <div className="row" style={{ marginBottom: '1.5rem' }}>
          <Link to={`/learn/${active.id}`} className="btn btn--ghost btn--sm">
            <Book size={15} /> Back to the {active.shortName} notes
          </Link>
          <Link to="/practice" className="btn btn--ghost btn--sm">All cases</Link>
        </div>
      )}

      {list.map((c) => {
        const sims = simulationsForCondition(c.id)
        return (
          <section key={c.id} style={{ marginBottom: '1rem' }}>
            {!active && (
              <div className="nav-section-label" style={{ margin: '0 0 0.5rem' }}>
                {categories[c.category].label} · {c.name}
              </div>
            )}
            {sims.map((s) => (
              <CaseSimulator key={s.id} sim={s} />
            ))}
            {c.practiceCases.map((pc) => (
              <CaseBlock key={pc.id} pc={pc} />
            ))}
          </section>
        )
      })}
    </div>
  )
}
