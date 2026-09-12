import { useState, useEffect } from 'react'

/*
 * A-01: a "How to use" popup explaining the two entry paths.
 * Trigger sits by the module header; opens a modal with the two ways to use the
 * module. Also opens on hover of the header (desktop) via the `hoverTarget` id.
 */
export default function HowToUse() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <button
        className="howto-trigger"
        onClick={(e) => { e.stopPropagation(); setOpen(true) }}
        aria-label="How to use this module"
        title="How to use this module"
      >
        How to use
      </button>

      {open && (
        <div className="palette-scrim" onClick={() => setOpen(false)}>
          <div className="howto" role="dialog" aria-modal="true" aria-label="How to use this module" onClick={(e) => e.stopPropagation()}>
            <div className="howto__head">
              <h3 style={{ margin: 0 }}>How to use this module</h3>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
            <p className="muted" style={{ marginTop: 0 }}>
              One set of content, organized two ways. Start with a condition — that's where the teaching happens.
            </p>
            <ol className="howto__list">
              <li>
                <strong>Learn by condition (start here).</strong> Pick a condition in the sidebar. Its page has
                everything for that condition in one place: the drug classes to use, the relevant comparison
                tables, and a worked sample case.
              </li>
              <li>
                <strong>Practise, then test.</strong> Work graded cases for that condition, then use the timed
                test to check yourself across everything and see what to revisit.
              </li>
              <li>
                <strong>Drug library and Comparisons are a lookup, not new content.</strong> They hold the exact
                same drug cards and tables already shown on the condition pages — just A–Z instead of by
                condition, for when you already know what you want and don't need the clinical context around it.
              </li>
            </ol>
            <p className="muted" style={{ fontSize: '0.86rem', marginBottom: 0 }}>
              Hover the highlighted terms anywhere for quick definitions.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
