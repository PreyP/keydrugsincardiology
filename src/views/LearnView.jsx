import { useParams, Link } from 'react-router-dom'
import { conditionById, categories } from '../data/conditions.js'
import { drugClassById } from '../data/drugClasses.js'
import DrugClassCard from '../components/DrugClassCard.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import RichText from '../components/RichText.jsx'
import { useProgress } from '../hooks/useProgress.js'
import { ClipboardCheck, Timer } from '../components/Icons.jsx'

export default function LearnView() {
  const { conditionId } = useParams()
  const condition = conditionById[conditionId]
  const { isLearned, toggleLearned } = useProgress()

  if (!condition) {
    return (
      <div className="content">
        <div className="empty-note">Condition not found. Pick one from the sidebar.</div>
      </div>
    )
  }

  const cat = categories[condition.category]
  const learned = isLearned(condition.id)

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">{cat.label}</span>
        <div className="topbar__spacer" />
        <button
          className={`btn btn--sm ${learned ? 'btn--primary' : 'btn--ghost'}`}
          onClick={() => toggleLearned(condition.id)}
        >
          {learned ? 'Learned' : 'Mark as learned'}
        </button>
        <ThemeToggle />
      </div>

      <h1>{condition.name}</h1>
      <RichText as="p" className="lead">{condition.overview}</RichText>

      {condition.mnemonic && (
        <div className="card" style={{ padding: '1.1rem 1.35rem', marginBottom: '1.5rem' }}>
          <span className="tag">Mnemonic</span>
          <div style={{ fontWeight: 600, fontSize: '1.15rem', margin: '0.45rem 0 0.25rem' }}>
            {condition.mnemonic.label}
          </div>
          <RichText as="p" className="muted">{condition.mnemonic.expansion}</RichText>
        </div>
      )}

      {/* Sample case */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Sample case</h2>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginTop: 0 }}>{condition.sampleCase.title}</h3>
          <div className="case-vignette">
            <div className="case-vignette__label">History</div>
            <RichText>{condition.sampleCase.vignette}</RichText>
          </div>
          {condition.sampleCase.exam && (
            <div className="case-vignette">
              <div className="case-vignette__label">Exam and workup</div>
              <RichText>{condition.sampleCase.exam}</RichText>
            </div>
          )}
          <div className="stack">
            {condition.sampleCase.walkthrough.map((step, i) => (
              <div key={i}>
                <p style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{step.prompt}</p>
                <div className="explain" style={{ marginTop: 0 }}>
                  <RichText>{step.answer}</RichText>
                </div>
              </div>
            ))}
          </div>
          <div className="row" style={{ marginTop: '1.25rem' }}>
            <Link to={`/practice/${condition.id}`} className="btn btn--primary btn--sm">
              <ClipboardCheck size={15} /> Test yourself on this case
            </Link>
          </div>
        </div>
      </section>

      {/* Drug classes */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Drug classes for {condition.shortName}</h2>
        <p className="muted" style={{ marginTop: '-0.4rem' }}>
          Hover the highlighted terms for quick definitions. Expand each section for dosing, side
          effects, and the trials behind the decisions.
        </p>
        {condition.drugClassIds.map((id) => {
          const drug = drugClassById[id]
          if (!drug) return null
          return <DrugClassCard key={id} drug={drug} currentConditionId={condition.id} />
        })}
      </section>

      <div className="row">
        <Link to={`/practice/${condition.id}`} className="btn btn--primary">
          <ClipboardCheck size={17} /> Practise {condition.shortName} cases
        </Link>
        <Link to="/test" className="btn btn--ghost">
          <Timer size={17} /> Timed test
        </Link>
      </div>
    </div>
  )
}
