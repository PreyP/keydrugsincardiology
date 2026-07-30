import { useState } from 'react'
import { ChevronRight } from './Icons.jsx'

export default function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="accordion">
      <button
        className="accordion__btn"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {title}
        <span className="accordion__chev"><ChevronRight size={18} /></span>
      </button>
      {open && <div className="accordion__panel">{children}</div>}
    </div>
  )
}
