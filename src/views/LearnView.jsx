import { useParams, Link } from 'react-router-dom'
import { conditions, conditionById, categories } from '../data/conditions.js'
import { drugClassById } from '../data/drugClasses.js'
import DrugClassCard from '../components/DrugClassCard.jsx'
import ComparisonTable from '../components/ComparisonTable.jsx'
import ThemeToggle from '../components/ThemeToggle.jsx'
import RichText from '../components/RichText.jsx'
import { comparisonsForCondition } from '../data/comparisons.js'
import { conditionDiagrams } from '../components/Diagrams.jsx'
import { Cha2ds2VascCalc, HasBledCalc } from '../components/Calculators.jsx'

const conditionCalculators = {
  'atrial-fibrillation': [Cha2ds2VascCalc, HasBledCalc],
}
import { useProgress } from '../hooks/useProgress.js'
import { ClipboardCheck, Timer, ChevronRight } from '../components/Icons.jsx'

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
  const idx = conditions.findIndex((c) => c.id === condition.id)
  const next = conditions[idx + 1] || null
  const tables = comparisonsForCondition(condition.id)
  const diagrams = conditionDiagrams[condition.id] || []
  const calculators = conditionCalculators[condition.id] || []

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

      <div className="stepper">
        <span className="stepper__step is-current"><span className="stepper__dot">1</span> Learn</span>
        <span className="stepper__line" />
        <Link to={`/practice/${condition.id}`} className="stepper__step"><span className="stepper__dot">2</span> Practise</Link>
        <span className="stepper__line" />
        <Link to="/test" className="stepper__step"><span className="stepper__dot">3</span> Test</Link>
      </div>

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

      {diagrams.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2>How it works</h2>
          {diagrams.map((D, i) => <D key={i} />)}
        </section>
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

      {calculators.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2>Clinical tools</h2>
          <p className="muted" style={{ marginTop: '-0.4rem' }}>
            Interactive risk scores for education. Not a substitute for current guidelines or clinical judgement.
          </p>
          {calculators.map((C, i) => <C key={i} />)}
        </section>
      )}

      {tables.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2>Compare</h2>
          {tables.map((t) => (
            <ComparisonTable key={t.id} table={t} />
          ))}
        </section>
      )}

      <div className="row">
        <Link to={`/practice/${condition.id}`} className="btn btn--primary">
          <ClipboardCheck size={17} /> Practise {condition.shortName} cases
        </Link>
        <Link to="/test" className="btn btn--ghost">
          <Timer size={17} /> Timed test
        </Link>
      </div>

      {next && (
        <Link to={`/learn/${next.id}`} className="next-condition card">
          <span>
            <span className="next-condition__eyebrow">Next condition</span>
            <strong>{next.name}</strong>
          </span>
          <ChevronRight size={20} />
        </Link>
      )}
    </div>
  )
}
