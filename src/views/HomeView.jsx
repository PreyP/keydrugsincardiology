import { Link } from 'react-router-dom'
import { conditions, categories } from '../data/conditions.js'
import { drugClasses } from '../data/drugClasses.js'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useProgress } from '../hooks/useProgress.js'
import { useSRS } from '../hooks/useSRS.js'
import { Book, ClipboardCheck, Timer, ChevronRight, Pill, Cards, Route } from '../components/Icons.jsx'

const catOrder = ['ischemic', 'rhythm', 'pump']

export default function HomeView() {
  const { learnedCount, bestScore, isLearned } = useProgress()
  const { dueCount } = useSRS()
  const pct = Math.round((learnedCount / conditions.length) * 100)
  const nextUp = conditions.find((c) => !isLearned(c.id))

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">MEDS230 · Cardiology pharmacotherapy</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>Key Drugs in Cardiology</h1>
      <p className="lead">
        An interactive module for learning cardiology pharmacotherapy the way it is prescribed:
        organized by the condition you are treating. Review each drug class with its indications,
        dosing, side effects, and the landmark trials behind it, work a sample case, then practise
        on your own and test yourself against the clock.
      </p>

      {/* Continue / up-next banner */}
      <Link to={nextUp ? `/learn/${nextUp.id}` : '/review'} className="continue-banner card">
        <span className="continue-banner__icon"><Route size={20} /></span>
        <span className="continue-banner__text">
          <span className="continue-banner__eyebrow">{nextUp ? 'Continue learning' : 'All conditions learned'}</span>
          <strong>{nextUp ? nextUp.name : 'Keep your review deck sharp'}</strong>
        </span>
        <span className="continue-banner__go">
          {nextUp ? 'Start' : 'Review'} <ChevronRight size={16} />
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
          <Link to="/test" className="btn btn--primary btn--sm"><Timer size={15} /> Test yourself</Link>
        </div>
      </div>

      <div className="row" style={{ margin: '1.5rem 0 2rem' }}>
        <Link to="/practice" className="btn btn--primary">
          <ClipboardCheck size={17} /> Work through cases
        </Link>
        <Link to="/review" className="btn btn--ghost">
          <Cards size={17} /> Review deck{dueCount > 0 ? ` (${dueCount} due)` : ''}
        </Link>
        <Link to="/drugs" className="btn btn--ghost">
          <Pill size={17} /> Drug library
        </Link>
      </div>

      <div className="row" style={{ gap: '2.5rem', marginBottom: '2rem' }}>
        <div>
          <div className="stat-num">{conditions.length}</div>
          <div className="muted">conditions</div>
        </div>
        <div>
          <div className="stat-num">{drugClasses.length}</div>
          <div className="muted">drug classes</div>
        </div>
        <div>
          <div className="stat-num">3</div>
          <div className="muted">practice formats</div>
        </div>
      </div>

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
                    {isLearned(c.id) ? <span className="learned-dot" title="Marked learned">✓</span> : <ChevronRight size={18} />}
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
          <Book size={18} />
          <strong>How to use this module</strong>
        </div>
        <ol style={{ marginTop: '0.75rem', marginBottom: 0 }}>
          <li><strong>Learn:</strong> pick a condition to read its drug classes and a worked sample case. Hover the highlighted terms for instant definitions.</li>
          <li><strong>Practice:</strong> work through the cases with multiple choice, short-answer, and flashcard questions.</li>
          <li><strong>Test:</strong> set a timer and answer a shuffled mix, then review your score by topic.</li>
        </ol>
      </div>

      <p className="muted" style={{ fontSize: '0.82rem', marginTop: '1.5rem' }}>
        Content adapted from the Queen's MEDS230 "Key Drugs in Cardiology" lectures and DIL cases
        (Dr. Amar Thakrar). Trials marked "verify vs course refs" were added from standard references
        and should be checked against your course materials. For education only, not clinical guidance.{' '}
        <Link to="/about">Sources and content notes</Link>.
      </p>
    </div>
  )
}
