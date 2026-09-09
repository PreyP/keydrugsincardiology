import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import RichText, { RichList } from './RichText.jsx'
import { ChevronRight } from './Icons.jsx'
import { scrollBehavior } from '../lib/motion.js'
import { conditionsForDrug } from '../data/conditions.js'

function SideEffect({ item }) {
  const text = typeof item === 'string' ? item : item.text
  const caution = typeof item === 'object' && item.caution
  return (
    <li className={caution ? 'is-caution' : undefined}>
      <RichText>{text}</RichText>
      {caution && <span className="tag tag--caution">caution</span>}
    </li>
  )
}

/*
 * A drug class as a collapsed-by-default disclosure card. The header is a single
 * button (WAI-ARIA disclosure pattern); expanding it reveals every section flat,
 * with no nested accordions. Arriving at /drugs#<id> (a glossary deep link)
 * opens the matching card and scrolls it into view.
 */
export default function DrugClassCard({ drug, currentConditionId, initialOpen = false }) {
  const location = useLocation()
  const targetId = location.hash.replace(/^#/, '')
  const [open, setOpen] = useState(() => initialOpen || targetId === drug.id)
  const ref = useRef(null)
  const panelId = useId()
  const alsoIn = conditionsForDrug(drug.id).filter((c) => c.id !== currentConditionId)

  useEffect(() => {
    if (targetId !== drug.id) return
    setOpen(true)
    const el = ref.current
    if (!el) return
    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: scrollBehavior(), block: 'start' })
      el.classList.add('flash-highlight')
      setTimeout(() => el.classList.remove('flash-highlight'), 1600)
    }, 60)
    return () => clearTimeout(t)
  }, [targetId, drug.id])

  return (
    <article className="drug-card" id={drug.id} ref={ref}>
      <h3 className="drug-card__heading">
        <button
          type="button"
          className="drug-card__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="drug-badge" aria-hidden="true">{drug.monogram}</span>
          <span className="drug-card__id">
            <span className="drug-card__name">{drug.name}</span>
            <span className="drug-card__examples">{drug.examples.join(' · ')}</span>
            <span className="drug-card__summary" hidden={open}>{drug.indications[0]}</span>
          </span>
          <span className="drug-card__chev" aria-hidden="true"><ChevronRight size={20} /></span>
        </button>
      </h3>

      <div className="drug-card__panel" id={panelId} hidden={!open}>
        <div className="section section--indication">
          <span className="section__label">Indications</span>
          <RichList items={drug.indications} />
        </div>

        <div className="section">
          <span className="section__label section__label--plain">Mechanism</span>
          <RichText as="p" className="mech">{drug.mechanism}</RichText>
        </div>

        <div className="section section--dosing">
          <span className="section__label">Dosing (reference)</span>
          <RichList items={drug.dosing} />
        </div>

        <div className="section section--side">
          <span className="section__label">Side effects and cautions</span>
          <ul className="side-effects">
            {drug.sideEffects.map((s, i) => (
              <SideEffect key={i} item={s} />
            ))}
          </ul>
        </div>

        {drug.trials && drug.trials.length > 0 && (
          <div className="section section--trial">
            <span className="section__label">Landmark trials</span>
            <div className="trial-grid">
              {drug.trials.map((t, i) => (
                <div className="trial" key={i}>
                  <span className="trial__name">{t.name}</span>
                  <p className="trial__take"><RichText>{t.takeaway}</RichText></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {drug.pearls && drug.pearls.length > 0 && (
          <div className="section section--trial">
            <span className="section__label">Pearls</span>
            <RichList items={drug.pearls} />
          </div>
        )}

        {alsoIn.length > 0 && (
          <div className="section crossref">
            <span className="section__label section__label--plain">Also appears in</span>
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
    </article>
  )
}
