import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { conditions } from '../data/conditions.js'
import { drugClasses } from '../data/drugClasses.js'
import { glossary } from '../data/glossary.js'

/* Flatten everything searchable into one index. */
function buildIndex() {
  const idx = []
  for (const c of conditions) {
    idx.push({ kind: 'Condition', label: c.name, sub: c.oneLiner, to: `/learn/${c.id}`, text: `${c.name} ${c.shortName}` })
  }
  for (const d of drugClasses) {
    idx.push({ kind: 'Drug', label: d.name, sub: d.examples.join(', '), to: `/drugs#${d.id}`, text: `${d.name} ${d.shortName} ${d.examples.join(' ')}` })
  }
  for (const g of glossary) {
    idx.push({ kind: 'Term', label: g.term, sub: g.def, to: g.link?.type === 'condition' ? `/learn/${g.link.id}` : g.link?.type === 'drug' ? `/drugs#${g.link.id}` : null, text: `${g.term} ${(g.aliases || []).join(' ')}` })
  }
  return idx
}

export default function SearchPalette({ open, onClose }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const index = useMemo(buildIndex, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 20)
    }
  }, [open])

  const q = query.trim().toLowerCase()
  const results = useMemo(() => {
    if (!q) return index.filter((r) => r.kind === 'Condition')
    return index
      .filter((r) => r.text.toLowerCase().includes(q))
      .sort((a, b) => a.label.toLowerCase().indexOf(q) - b.label.toLowerCase().indexOf(q))
      .slice(0, 12)
  }, [q, index])

  useEffect(() => setActive(0), [q])

  if (!open) return null

  function go(r) {
    if (!r || !r.to) return
    onClose()
    navigate(r.to)
  }

  function onKey(e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); go(results[active]) }
    else if (e.key === 'Escape') onClose()
  }

  return (
    <div className="palette-scrim" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="palette__input"
          placeholder="Search conditions, drugs, and terms"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
        />
        <div className="palette__results">
          {results.length === 0 && <div className="palette__empty">No matches</div>}
          {results.map((r, i) => (
            <button
              key={`${r.kind}-${r.label}-${i}`}
              className={`palette__item ${i === active ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r)}
              disabled={!r.to}
            >
              <span className={`palette__kind kind--${r.kind.toLowerCase()}`}>{r.kind}</span>
              <span className="palette__label">
                <strong>{r.label}</strong>
                {r.sub && <span className="palette__sub">{r.sub}</span>}
              </span>
            </button>
          ))}
        </div>
        <div className="palette__hint">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>enter</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
