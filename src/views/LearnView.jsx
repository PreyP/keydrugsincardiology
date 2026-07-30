import { useParams, Link } from 'react-router-dom'
import { conditionById, categories } from '../data/conditions.js'
import { drugClassById } from '../data/drugClasses.js'
import DrugClassCard from '../components/DrugClassCard.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { ClipboardCheck } from '../components/Icons.jsx'

export default function LearnView() {
  const { conditionId } = useParams()
  const condition = conditionById[conditionId]

  if (!condition) {
    return (
      <div className="content">
        <div className="empty-note">Condition not found. Pick one from the sidebar.</div>
      </div>
    )
  }

  const cat = categories[condition.category]

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">{cat.label}</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>{condition.name}</h1>
      <p className="lead">{condition.overview}</p>

      {condition.mnemonic && (
        <div className="card" style={{ padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
          <span className="tag">Mnemonic</span>
          <div style={{ fontWeight: 800, fontSize: '1.05rem', margin: '0.4rem 0 0.25rem' }}>
            {condition.mnemonic.label}
          </div>
          <p className="muted" style={{ margin: 0 }}>{condition.mnemonic.expansion}</p>
        </div>
      )}

      {/* Sample case */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Sample case</h2>
        <div className="card" style={{ padding: '1.35rem' }}>
          <h3 style={{ marginTop: 0 }}>{condition.sampleCase.title}</h3>
          <div className="case-vignette">
            <div className="case-vignette__label">History</div>
            {condition.sampleCase.vignette}
          </div>
          {condition.sampleCase.exam && (
            <div className="case-vignette">
              <div className="case-vignette__label">Exam and workup</div>
              {condition.sampleCase.exam}
            </div>
          )}
          <div className="stack">
            {condition.sampleCase.walkthrough.map((step, i) => (
              <div key={i}>
                <p style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{step.prompt}</p>
                <div className="explain" style={{ marginTop: 0 }}>{step.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drug classes */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Drug classes for {condition.shortName}</h2>
        <p className="muted" style={{ marginTop: '-0.4rem' }}>
          Expand each section for dosing, side effects, and the trials behind the decisions.
        </p>
        {condition.drugClassIds.map((id) => {
          const drug = drugClassById[id]
          if (!drug) return null
          return <DrugClassCard key={id} drug={drug} />
        })}
      </section>

      <div className="row">
        <Link to={`/practice/${condition.id}`} className="btn btn--primary">
          <ClipboardCheck size={17} /> Practise {condition.shortName} cases
        </Link>
      </div>
    </div>
  )
}
