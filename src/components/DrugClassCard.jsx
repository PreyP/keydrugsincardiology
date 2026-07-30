import Accordion from './Accordion.jsx'

function SideEffect({ item }) {
  const text = typeof item === 'string' ? item : item.text
  const caution = typeof item === 'object' && item.caution
  return (
    <li style={caution ? { color: 'var(--caution)', fontWeight: 600 } : undefined}>
      {text}
      {caution && <span className="tag" style={{ marginLeft: 6 }}>caution</span>}
    </li>
  )
}

export default function DrugClassCard({ drug, defaultOpen = false }) {
  return (
    <div className="card">
      <div className="card__head">
        <span className="drug-badge">{drug.monogram}</span>
        <div>
          <h3 className="card__title">{drug.name}</h3>
          <p className="card__sub">{drug.examples.join(' · ')}</p>
        </div>
      </div>

      <div className="section section--indication">
        <span className="section__label">Indications</span>
        <ul>
          {drug.indications.map((ind, i) => (
            <li key={i}>{ind}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <span className="section__label" style={{ color: 'var(--text-soft)', background: 'var(--surface-2)' }}>
          Mechanism
        </span>
        <p style={{ margin: 0 }}>{drug.mechanism}</p>
      </div>

      <Accordion title="Dosing (reference)" defaultOpen={defaultOpen}>
        <div className="section--dosing" style={{ padding: 0 }}>
          <ul>
            {drug.dosing.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
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
              <p className="trial__take">{t.takeaway}</p>
            </div>
          ))}
        </Accordion>
      )}

      {drug.pearls && drug.pearls.length > 0 && (
        <div className="section section--trial">
          <span className="section__label">Pearls</span>
          <ul>
            {drug.pearls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
