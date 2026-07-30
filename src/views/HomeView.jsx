import { Link } from 'react-router-dom'
import { conditions, categories } from '../data/conditions.js'
import { drugClasses } from '../data/drugClasses.js'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { Book, ClipboardCheck, Timer, ChevronRight } from '../components/Icons.jsx'

const catOrder = ['ischemic', 'rhythm', 'pump']

export default function HomeView() {
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
        organized by the condition you are treating. For each condition, review the drug classes
        with their indications, dosing, side effects, and the landmark trials behind them, work a
        sample case, then practise on your own and test yourself against the clock.
      </p>

      <div className="row" style={{ margin: '1.5rem 0 2rem' }}>
        <Link to="/practice" className="btn btn--primary">
          <ClipboardCheck size={17} /> Work through cases
        </Link>
        <Link to="/test" className="btn btn--ghost">
          <Timer size={17} /> Test my knowledge
        </Link>
      </div>

      <div className="row" style={{ gap: '2rem', marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800 }}>{conditions.length}</div>
          <div className="muted">conditions</div>
        </div>
        <div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800 }}>{drugClasses.length}</div>
          <div className="muted">drug classes</div>
        </div>
        <div>
          <div style={{ fontSize: '1.9rem', fontWeight: 800 }}>3</div>
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
                  style={{ padding: '1.1rem 1.25rem', textDecoration: 'none', color: 'inherit' }}
                >
                  <div className="row" style={{ justifyContent: 'space-between' }}>
                    <strong>{c.name}</strong>
                    <ChevronRight size={18} />
                  </div>
                  <p className="muted" style={{ margin: '0.4rem 0 0', fontSize: '0.88rem' }}>
                    {c.oneLiner}
                  </p>
                  <div style={{ marginTop: '0.6rem' }}>
                    <span className="tag">{c.drugClassIds.length} drug classes</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <div className="card" style={{ padding: '1.25rem 1.35rem', marginTop: '1rem' }}>
        <div className="row" style={{ gap: '0.6rem' }}>
          <Book size={18} />
          <strong>How to use this module</strong>
        </div>
        <ol style={{ marginTop: '0.75rem', marginBottom: 0 }}>
          <li><strong>Learn:</strong> pick a condition to read its drug classes and a worked sample case.</li>
          <li><strong>Practice:</strong> work through the cases with multiple choice, short-answer, and flashcard questions.</li>
          <li><strong>Test:</strong> set a timer and answer a shuffled mix, then review your score by topic.</li>
        </ol>
      </div>

      <p className="muted" style={{ fontSize: '0.8rem', marginTop: '1.5rem' }}>
        Content adapted from the Queen's MEDS230 "Key Drugs in Cardiology" lectures and DIL cases
        (Dr. Amar Thakrar). Trials marked "verify vs course refs" were added from standard references
        and should be checked against your course materials. For education only, not clinical guidance.
      </p>
    </div>
  )
}
