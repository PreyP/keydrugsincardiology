import { useParams, Link } from 'react-router-dom'
import { conditionById } from '../data/conditions.js'
import { drugClassById } from '../data/drugClasses.js'
import { comparisonsForCondition } from '../data/comparisons.js'
import ComparisonTable from '../components/ComparisonTable.jsx'
import { Print, ChevronRight } from '../components/Icons.jsx'

function Side({ item }) {
  const text = typeof item === 'string' ? item : item.text
  const caution = typeof item === 'object' && item.caution
  return <li style={caution ? { fontWeight: 600 } : undefined}>{text}{caution ? ' (caution)' : ''}</li>
}

export default function CheatSheetView() {
  const { conditionId } = useParams()
  const condition = conditionById[conditionId]
  if (!condition) return <div className="content"><div className="empty-note">Not found.</div></div>

  const tables = comparisonsForCondition(condition.id)

  return (
    <div className="content sheet">
      <div className="row no-print" style={{ justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <Link to={`/learn/${condition.id}`} className="btn btn--ghost btn--sm">Back to notes</Link>
        <button className="btn btn--primary btn--sm" onClick={() => window.print()}>
          <Print size={15} /> Print or save as PDF
        </button>
      </div>

      <div className="sheet__title">
        <h1 style={{ marginBottom: '0.15rem' }}>{condition.name}</h1>
        <p className="muted" style={{ margin: 0 }}>Key Drugs in Cardiology — one-page cheat sheet</p>
      </div>

      <p>{condition.overview}</p>
      {condition.mnemonic && (
        <p><strong>{condition.mnemonic.label}</strong> — {condition.mnemonic.expansion}</p>
      )}

      <h2 className="sheet__h2">Drug classes</h2>
      {condition.drugClassIds.map((id) => {
        const d = drugClassById[id]
        if (!d) return null
        return (
          <div className="sheet__drug" key={id}>
            <h3 className="sheet__drugname">{d.name} <span className="muted">({d.examples.join(', ')})</span></h3>
            <p className="sheet__mech">{d.mechanism}</p>
            <div className="sheet__cols">
              <div>
                <div className="sheet__label">Indications</div>
                <ul>{d.indications.map((x, i) => <li key={i}>{x}</li>)}</ul>
              </div>
              <div>
                <div className="sheet__label">Side effects</div>
                <ul>{d.sideEffects.map((s, i) => <Side key={i} item={s} />)}</ul>
              </div>
            </div>
            {d.trials && d.trials.length > 0 && (
              <p className="sheet__trials"><strong>Trials:</strong> {d.trials.map((t) => t.name).join('; ')}</p>
            )}
          </div>
        )
      })}

      {tables.length > 0 && (
        <>
          <h2 className="sheet__h2">Comparisons</h2>
          {tables.map((t) => <ComparisonTable key={t.id} table={t} />)}
        </>
      )}

      <p className="muted sheet__foot">
        Adapted from the Queen's MEDS230 lectures and DIL cases. Education only, not clinical guidance.
      </p>
    </div>
  )
}
