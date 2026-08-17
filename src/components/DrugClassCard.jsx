import { Link } from 'react-router-dom'
import Accordion from './Accordion.jsx'
import RichText, { RichList } from './RichText.jsx'
import { conditionsForDrug } from '../data/conditions.js'

function SideEffect({ item }) {
  const text = typeof item === 'string' ? item : item.text
  const caution = typeof item === 'object' && item.caution
  return (
    <li style={caution ? { color: 'var(--caution)', fontWeight: 600 } : undefined}>
      <RichText>{text}</RichText>
      {caution && <span className="tag tag--caution" style={{ marginLeft: 6 }}>caution</span>}
    </li>
  )
}

export default function DrugClassCard({ drug, defaultOpen = false, currentConditionId }) {
  const alsoIn = conditionsForDrug(drug.id).filter((c) => c.id !== currentConditionId)

  return (
    <div className="card" id={drug.id} style={{ scrollMarginTop: '90px' }}>
      <div className="card__head">
        <span className="drug-badge">{drug.monogram}</span>
        <div>
          <h3 className="card__title">{drug.name}</h3>
          <p className="card__sub">{drug.examples.join(' · ')}</p>
        </div>
      </div>

      <div className="section section--indication">
        <span className="section__label">Indications</span>
        <RichList items={drug.indications} />
      </div>

      <div className="section">
        <span className="section__label" style={{ color: 'var(--text-soft)', background: 'var(--surface-2)' }}>
          Mechanism
        </span>
        <RichText as="p" className="mech">{drug.mechanism}</RichText>
      </div>

      <Accordion title="Dosing (reference)" defaultOpen={defaultOpen}>
        <div className="section--dosing" style={{ padding: 0 }}>
          <RichList items={drug.dosing} />
        </div>
      </Accordion>

      <Accordion title="Side effects and cautions" defaultOpen={defaultOpen}>
        <ul>
          {drug.sideEffects.map((s, i) => (
            <SideEffect key={i} item={s} />
          ))}
        </ul>
      </Accordion>

      {drug.trials && drug.trials.length > 0 && (
        <Accordion title="Landmark trials" defaultOpen={defaultOpen}>
          {drug.trials.map((t, i) => (
            <div className="trial" key={i}>
              <span className="trial__name">{t.name}</span>
              {t.addedBeyondSource && (
                <span className="tag" style={{ marginLeft: 8 }}>verify vs course refs</span>
              )}
              <p className="trial__take"><RichText>{t.takeaway}</RichText></p>
            </div>
          ))}
        </Accordion>
      )}

      {drug.pearls && drug.pearls.length > 0 && (
        <div className="section section--trial">
          <span className="section__label">Pearls</span>
          <RichList items={drug.pearls} />
        </div>
      )}

      {alsoIn.length > 0 && (
        <div className="section crossref">
          <span className="section__label" style={{ color: 'var(--text-soft)', background: 'var(--surface-2)' }}>
            Also appears in
          </span>
          <div className="row" style={{ gap: '0.45rem' }}>
            {alsoIn.map((c) => (
              <Link key={c.id} to={`/learn/${c.id}`} className="chip-link">
                {c.shortName}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
