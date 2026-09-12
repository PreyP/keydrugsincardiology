import { Link } from 'react-router-dom'
import { conditions, conditionById, categories } from '../data/conditions.js'
import { drugClasses } from '../data/drugClasses.js'
import ThemeToggle from '../components/ThemeToggle.jsx'
import FeedbackForm from '../components/FeedbackForm.jsx'
import { useProgress } from '../hooks/useProgress.js'
import { Book, ClipboardCheck, Timer, ChevronRight, Pill, Route, Check } from '../components/Icons.jsx'

const catOrder = ['ischemic', 'rhythm', 'pump']

function readLast() {
  try {
    const v = JSON.parse(localStorage.getItem('kdc-last'))
    return v && v.path ? v : null
  } catch {
    return null
  }
}

function conditionFromPath(path) {
  const m = /^\/(?:learn|practice)\/([^#/]+)/.exec(path || '')
  return m ? conditionById[m[1]] : null
}

export default function HomeView() {
  const { learnedCount, bestScore, isLearned } = useProgress()
  const pct = Math.round((learnedCount / conditions.length) * 100)
  const nextUp = conditions.find((c) => !isLearned(c.id))

  // A-02: resume the last learn/practice page if there is one.
  const last = readLast()
  const lastCond = last && conditionFromPath(last.path)
  const resumeTo = last ? last.path : nextUp ? `/learn/${nextUp.id}` : '/test'
  const resumeEyebrow = last ? 'Continue where you left off' : nextUp ? 'Continue learning' : 'All conditions learned'
  const resumeLabel = last
    ? (lastCond ? lastCond.name : 'Resume')
    : nextUp
    ? nextUp.name
    : 'Put it to the test'

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">MEDS230 · Cardiology pharmacotherapy</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>Key Drugs in Cardiology</h1>
      <p className="byline">
        This module was created by Prey Patel and Md Riaz Mahmud (MD Class of 2028) with support
        from Dr. Amar Thakrar.
      </p>
      <p className="lead">
        An interactive module for learning cardiology pharmacotherapy the way it is prescribed:
        organized by the condition you are treating. Review each drug class with its indications,
        dosing, side effects, and the landmark trials behind it, work a sample case, then practise
        on your own and test yourself against the clock.
      </p>

      {/* Continue / up-next banner */}
      <Link to={resumeTo} className="continue-banner card">
        <span className="continue-banner__icon" aria-hidden="true"><Route size={20} /></span>
        <span className="continue-banner__text">
          <span className="continue-banner__eyebrow">{resumeEyebrow}</span>
          <strong>{resumeLabel}</strong>
        </span>
        <span className="continue-banner__go">
          {last ? 'Resume' : nextUp ? 'Start' : 'Test'} <ChevronRight size={16} aria-hidden="true" />
        </span>
      </Link>

      {/* Progress strip */}
      <div className="progress-strip card">
        <div className="progress-strip__ring" style={{ '--p': `${pct * 3.6}deg` }}>
          <span>{pct}%</span>
        </div>
        <div className="progress-strip__stats">
          <div>
            <strong>{learnedCount} of {conditions.length}</strong>
            <span className="muted"> conditions marked learned</span>
          </div>
          <div>
            <strong>{bestScore}%</strong>
            <span className="muted"> best test score</span>
          </div>
        </div>
        <div className="progress-strip__cta">
          <Link to="/test" className="btn btn--primary btn--sm"><Timer size={15} aria-hidden="true" /> Test yourself</Link>
        </div>
      </div>

      <div className="row" style={{ margin: '1.5rem 0 1.75rem' }}>
        <Link to="/practice" className="btn btn--primary">
          <ClipboardCheck size={17} aria-hidden="true" /> Work through cases
        </Link>
        <Link to="/drugs" className="btn btn--ghost">
          <Pill size={17} aria-hidden="true" /> Drug library
        </Link>
      </div>

      <p className="muted" style={{ margin: '0 0 2.25rem' }}>
        {drugClasses.length} drug classes across {conditions.length} conditions, each one to learn,
        practise, and test.
      </p>

      {catOrder.map((cat) => {
        const items = conditions.filter((c) => c.category === cat)
        if (items.length === 0) return null
        return (
          <section key={cat} style={{ marginBottom: '2rem' }}>
            <h2>{categories[cat].label}</h2>
            <div className="grid-cards">
              {items.map((c) => (
                <Link
                  key={c.id}
                  to={`/learn/${c.id}`}
                  className="card"
                  style={{ padding: '1.2rem 1.35rem', textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>{c.name}</strong>
                    {isLearned(c.id)
                      ? <span className="learned-dot"><Check size={14} aria-hidden="true" /><span className="sr-only">Marked learned</span></span>
                      : <ChevronRight size={18} aria-hidden="true" />}
                  </div>
                  <p className="muted" style={{ margin: '0.45rem 0 0', fontSize: '0.92rem' }}>
                    {c.oneLiner}
                  </p>
                  <div style={{ marginTop: '0.7rem' }}>
                    <span className="tag">{c.drugClassIds.length} drug classes</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <div className="card" style={{ padding: '1.35rem 1.5rem', marginTop: '1rem' }}>
        <div className="row" style={{ gap: '0.6rem' }}>
          <Book size={18} aria-hidden="true" />
          <strong>How this module fits together</strong>
        </div>
        <p className="muted" style={{ margin: '0.6rem 0 0' }}>
          It's one set of content, organized two ways. The condition pages are where the teaching
          happens; the sidebar mirrors that below.
        </p>
        <ol style={{ marginTop: '0.9rem', marginBottom: 0 }}>
          <li>
            <strong>Learn by condition</strong> — start here. Open a condition and its page has
            everything for it in one place: the drug classes to use, the relevant comparison
            tables, and a worked sample case. Hover the highlighted terms for instant definitions.
          </li>
          <li>
            <strong>Practice & test</strong> — work graded cases for that condition, then use
            the timed test to check yourself across everything and see what to revisit.
          </li>
          <li>
            <strong>Drug library & Comparisons are a lookup, not new content</strong> — they
            hold the exact same drug cards and tables already shown on the condition pages, just
            A–Z instead of by condition. Use them when you already know what you want and don't
            need the clinical context around it.
          </li>
        </ol>
      </div>

      <div style={{ marginTop: '1.75rem' }}>
        <FeedbackForm context="module" />
      </div>

      <p className="muted" style={{ fontSize: '0.82rem', marginTop: '1.5rem' }}>
        Content adapted from the Queen's MEDS230 "Key Drugs in Cardiology" lectures and DIL cases
        (Dr. Amar Thakrar). For education only, not clinical guidance.{' '}
        <Link to="/about">Sources and content notes</Link>.
      </p>
    </div>
  )
}
