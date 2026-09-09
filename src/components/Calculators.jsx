import { useId, useState } from 'react'
import { Check } from './Icons.jsx'

/*
 * Interactive clinical risk calculators for atrial fibrillation.
 * Educational decision-support only, not a substitute for clinical judgement or
 * current guidelines.
 */

function Toggle({ on, points, label, onClick }) {
  return (
    <button type="button" className={`calc-row ${on ? 'is-on' : ''}`} onClick={onClick} aria-pressed={on}>
      <span className="calc-row__check" aria-hidden="true">{on ? <Check size={15} /> : null}</span>
      <span className="calc-row__label">{label}</span>
      <span className="calc-row__pts">+{points}</span>
    </button>
  )
}

/* A small single-select segmented control with radio semantics. */
function SegGroup({ label, value, options, onChange }) {
  const labelId = useId()
  function onKeyDown(e) {
    const i = options.findIndex(([v]) => v === value)
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      onChange(options[(i + 1) % options.length][0])
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      onChange(options[(i - 1 + options.length) % options.length][0])
    }
  }
  return (
    <div className="calc-seg">
      <span className="calc-seg__label" id={labelId}>{label}</span>
      <div className="calc-seg__opts" role="radiogroup" aria-labelledby={labelId} onKeyDown={onKeyDown}>
        {options.map(([v, l, p]) => (
          <button
            key={v}
            type="button"
            className={`seg ${value === v ? 'is-on' : ''}`}
            role="radio"
            aria-checked={value === v}
            tabIndex={value === v ? 0 : -1}
            onClick={() => onChange(v)}
          >
            {l} <span className="seg__pts">+{p}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------------- CHA2DS2-VASc ---------------- */
export function Cha2ds2VascCalc() {
  const [age, setAge] = useState('lt65') // lt65 | 65to74 | ge75
  const [female, setFemale] = useState(false)
  const [f, setF] = useState({ chf: false, htn: false, dm: false, stroke: false, vasc: false })
  const t = (k) => setF((s) => ({ ...s, [k]: !s[k] }))

  const agePts = age === 'ge75' ? 2 : age === '65to74' ? 1 : 0
  const score =
    (f.chf ? 1 : 0) + (f.htn ? 1 : 0) + (f.dm ? 1 : 0) + (f.stroke ? 2 : 0) +
    (f.vasc ? 1 : 0) + agePts + (female ? 1 : 0)

  let level = 'low'
  let text = 'Low risk. Anticoagulation generally not required.'
  if (score >= 2) { level = 'high'; text = 'Oral anticoagulation is recommended.' }
  else if (score === 1) { level = 'mid'; text = female ? 'Female sex alone: still low risk.' : 'Consider oral anticoagulation.' }

  return (
    <div className="calc card">
      <div className="calc__head">
        <h3 className="calc__title">CHA<sub>2</sub>DS<sub>2</sub>-VASc</h3>
        <p className="calc__blurb">Stroke risk in atrial fibrillation, to guide anticoagulation.</p>
      </div>
      <div className="calc__rows">
        <Toggle on={f.chf} points={1} label="Congestive heart failure / LV dysfunction" onClick={() => t('chf')} />
        <Toggle on={f.htn} points={1} label="Hypertension" onClick={() => t('htn')} />
        <Toggle on={f.dm} points={1} label="Diabetes mellitus" onClick={() => t('dm')} />
        <Toggle on={f.stroke} points={2} label="Prior stroke, TIA, or thromboembolism" onClick={() => t('stroke')} />
        <Toggle on={f.vasc} points={1} label="Vascular disease (MI, PAD, aortic plaque)" onClick={() => t('vasc')} />
        <SegGroup
          label="Age"
          value={age}
          options={[['lt65', '< 65', 0], ['65to74', '65 to 74', 1], ['ge75', '≥ 75', 2]]}
          onChange={setAge}
        />
        <Toggle on={female} points={1} label="Sex category: female" onClick={() => setFemale((v) => !v)} />
      </div>
      <div className={`calc__result calc__result--${level}`} role="status" aria-live="polite">
        <span className="calc__score">{score}</span>
        <span className="calc__interp">{text}</span>
      </div>
    </div>
  )
}

/* ---------------- HAS-BLED ---------------- */
export function HasBledCalc() {
  const [f, setF] = useState({
    htn: false, renal: false, liver: false, stroke: false, bleed: false,
    labile: false, elderly: false, drugs: false, alcohol: false,
  })
  const t = (k) => setF((s) => ({ ...s, [k]: !s[k] }))
  const score = Object.values(f).filter(Boolean).length

  let level = 'low'
  let text = 'Lower bleeding risk.'
  if (score >= 3) { level = 'high'; text = 'High bleeding risk: address modifiable factors and review regularly.' }
  else if (score === 2) { level = 'mid'; text = 'Intermediate bleeding risk.' }

  return (
    <div className="calc card">
      <div className="calc__head">
        <h3 className="calc__title">HAS-BLED</h3>
        <p className="calc__blurb">Bleeding risk on anticoagulation. A high score flags factors to modify, not a reason to withhold.</p>
      </div>
      <div className="calc__rows">
        <Toggle on={f.htn} points={1} label="Hypertension (uncontrolled, SBP > 160)" onClick={() => t('htn')} />
        <Toggle on={f.renal} points={1} label="Abnormal renal function" onClick={() => t('renal')} />
        <Toggle on={f.liver} points={1} label="Abnormal liver function" onClick={() => t('liver')} />
        <Toggle on={f.stroke} points={1} label="Prior stroke" onClick={() => t('stroke')} />
        <Toggle on={f.bleed} points={1} label="Bleeding history or predisposition" onClick={() => t('bleed')} />
        <Toggle on={f.labile} points={1} label="Labile INR (if on warfarin)" onClick={() => t('labile')} />
        <Toggle on={f.elderly} points={1} label="Elderly (> 65)" onClick={() => t('elderly')} />
        <Toggle on={f.drugs} points={1} label="Drugs that predispose to bleeding" onClick={() => t('drugs')} />
        <Toggle on={f.alcohol} points={1} label="Alcohol excess" onClick={() => t('alcohol')} />
      </div>
      <div className={`calc__result calc__result--${level}`} role="status" aria-live="polite">
        <span className="calc__score">{score}</span>
        <span className="calc__interp">{text}</span>
      </div>
    </div>
  )
}
