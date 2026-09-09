import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { glossaryById, glossaryRegex, termToId } from '../data/glossary.js'
import { conditionById } from '../data/conditions.js'

/* ---------- The glossary disclosure bubble ---------- */
function TermBubble({ entry, children }) {
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, above: false })
  const triggerRef = useRef(null)
  const bubbleRef = useRef(null)
  const closeTimer = useRef(null)
  const bubbleId = useId()

  const place = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const below = window.innerHeight - r.bottom
    const above = below < 220 && r.top > 220
    setPos({
      top: above ? r.top - 8 : r.bottom + 8,
      left: Math.min(Math.max(r.left, 12), window.innerWidth - 320),
      above,
    })
  }, [])

  const show = useCallback(() => {
    clearTimeout(closeTimer.current)
    place()
    setOpen(true)
  }, [place])

  const hideSoon = useCallback(() => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 140)
  }, [])

  // Don't close if focus/pointer is moving into the bubble itself.
  const hideUnlessInBubble = useCallback((e) => {
    if (bubbleRef.current && e.relatedTarget && bubbleRef.current.contains(e.relatedTarget)) return
    hideSoon()
  }, [hideSoon])

  useEffect(() => {
    if (!open) return
    const onScroll = () => setOpen(false)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const link = entry.link
  const cond = link?.type === 'condition' ? conditionById[link.id] : null
  const hasLinks = link?.type === 'drug' || cond || entry.practice

  // Tab forward from the trigger moves into the bubble's own links.
  function onTriggerKeyDown(e) {
    if (e.key === 'Tab' && !e.shiftKey && open && hasLinks) {
      const firstLink = bubbleRef.current?.querySelector('a')
      if (firstLink) {
        e.preventDefault()
        firstLink.focus()
      }
    }
  }

  // Tab past the last bubble link closes it and returns to the trigger.
  function onBubbleKeyDown(e) {
    if (e.key !== 'Tab') return
    const links = bubbleRef.current?.querySelectorAll('a')
    if (!links || links.length === 0) return
    const first = links[0]
    const last = links[links.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      setOpen(false)
      triggerRef.current?.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="term"
        aria-expanded={open}
        aria-controls={bubbleId}
        aria-describedby={open ? bubbleId : undefined}
        onMouseEnter={show}
        onMouseLeave={hideSoon}
        onFocus={show}
        onBlur={hideUnlessInBubble}
        onKeyDown={onTriggerKeyDown}
        onClick={() => (open ? setOpen(false) : show())}
      >
        {children}
      </button>
      {open &&
        createPortal(
          <div
            ref={bubbleRef}
            id={bubbleId}
            className={`bubble ${pos.above ? 'bubble--above' : ''}`}
            style={{ top: pos.top, left: pos.left, transform: pos.above ? 'translateY(-100%)' : 'none' }}
            role="group"
            aria-label={`${entry.term}: definition`}
            onMouseEnter={() => clearTimeout(closeTimer.current)}
            onMouseLeave={hideSoon}
            onBlur={hideUnlessInBubble}
            onKeyDown={onBubbleKeyDown}
          >
            <div className="bubble__term">{entry.term}</div>
            <div className="bubble__def">{entry.def}</div>
            {hasLinks && (
              <div className="bubble__links">
                {link?.type === 'drug' && (
                  <Link className="bubble__link" to={`/drugs#${link.id}`}>View drug</Link>
                )}
                {cond && (
                  <Link className="bubble__link" to={`/learn/${cond.id}`}>Go to {cond.shortName}</Link>
                )}
                {entry.practice && (
                  <Link
                    className="bubble__link"
                    to={`/practice/${entry.practice}${entry.questionId ? `#${entry.questionId}` : ''}`}
                  >
                    {entry.questionId ? 'Practise question' : 'Practise'}
                  </Link>
                )}
              </div>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}

/*
 * RichText: renders a string, wrapping the first occurrence of each glossary
 * term in a disclosure bubble. Deduped per instance so the text stays clean.
 */
export default function RichText({ children, className, as: Tag = 'span' }) {
  if (typeof children !== 'string') return <Tag className={className}>{children}</Tag>

  const text = children
  const seen = new Set()
  const parts = []
  let last = 0
  glossaryRegex.lastIndex = 0
  let m
  while ((m = glossaryRegex.exec(text)) !== null) {
    const id = termToId[m[0].toLowerCase()]
    const entry = id && glossaryById[id]
    if (!entry || seen.has(id)) continue
    seen.add(id)
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(
      <TermBubble key={`${id}-${m.index}`} entry={entry}>
        {m[0]}
      </TermBubble>,
    )
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))

  return <Tag className={className}>{parts}</Tag>
}

/* Render an array of strings as <li> items, each with bubbles. */
export function RichList({ items, className }) {
  return (
    <ul className={className}>
      {items.map((it, i) => (
        <li key={i}><RichText>{it}</RichText></li>
      ))}
    </ul>
  )
}
