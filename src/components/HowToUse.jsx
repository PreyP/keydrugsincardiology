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
            <p className="muted" style={{ marginTop: 0 }}>There are two ways in. Use whichever fits what you need right now.</p>
            <ol className="howto__list">
              <li>
                <strong>Go straight to a drug.</strong> Open the Drug library (or press Cmd/Ctrl+K to search)
                and jump to any drug class to read its indications, mechanism, dosing, side effects, and trials.
              </li>
              <li>
                <strong>Follow the learning journey.</strong> Pick a condition in the sidebar and work through it
                the way it is prescribed, with the relevant drugs shown inside each condition, then practise the
                cases and test yourself against the clock.
              </li>
            </ol>
            <p className="muted" style={{ fontSize: '0.86rem', marginBottom: 0 }}>
              Hover the highlighted terms anywhere for quick definitions, and use the review deck to lock in what you learn.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
