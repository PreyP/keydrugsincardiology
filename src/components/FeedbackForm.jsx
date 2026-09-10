import { useState } from 'react'

/*
 * A-05: a short student feedback form.
 *
 * With no backend attached, responses are saved to localStorage and the learner
 * sees a thank-you. To collect responses centrally, set FEEDBACK_ENDPOINT to a
 * form/collection URL (e.g. a Google Form or an API route) and the submit
 * handler will POST there as well.
 */
const FEEDBACK_ENDPOINT = null

export default function FeedbackForm({ context = 'module' }) {
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const entry = { context, rating, text: text.trim(), at: new Date().toISOString() }
    try {
      const key = 'kdc-feedback'
      const prev = JSON.parse(localStorage.getItem(key) || '[]')
      prev.push(entry)
      localStorage.setItem(key, JSON.stringify(prev))
    } catch {
      /* ignore storage errors */
    }
    if (FEEDBACK_ENDPOINT) {
      try {
        await fetch(FEEDBACK_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        })
      } catch {
        /* best effort */
      }
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="feedback card">
        <strong>Thanks for the feedback.</strong>
        <p className="muted" style={{ margin: '0.35rem 0 0' }}>It helps us improve the module.</p>
      </div>
    )
  }

  return (
    <form className="feedback card" onSubmit={submit}>
      <div className="feedback__label">Feedback</div>
      <p className="muted" style={{ marginTop: 0 }}>How did this go? Your input shapes the next version.</p>
      <div className="feedback__stars" role="radiogroup" aria-label="Rating out of 5">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            className={`feedback__star ${n <= rating ? 'on' : ''}`}
            onClick={() => setRating(n)}
            aria-label={`${n} of 5`}
            aria-pressed={n === rating}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="freetext"
        placeholder="What worked, what was confusing, what you would change (optional)."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={{ marginTop: '0.7rem' }}>
        <button className="btn btn--primary btn--sm" type="submit" disabled={rating === 0 && !text.trim()}>
          Send feedback
        </button>
      </div>
    </form>
  )
}
