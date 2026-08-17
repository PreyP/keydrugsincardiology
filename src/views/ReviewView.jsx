import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSRS } from '../hooks/useSRS.js'
import { conditionById } from '../data/conditions.js'
import ThemeToggle from '../components/ThemeToggle.jsx'
import RichText from '../components/RichText.jsx'
import { Timer } from '../components/Icons.jsx'

const GRADES = [
  { key: 'again', label: 'Again', hint: '<1 min', cls: 'grade--again' },
  { key: 'hard', label: 'Hard', hint: 'sooner', cls: 'grade--hard' },
  { key: 'good', label: 'Good', hint: 'on track', cls: 'grade--good' },
  { key: 'easy', label: 'Easy', hint: 'later', cls: 'grade--easy' },
]

export default function ReviewView() {
  const { dueCards, dueCount, newCount, reviewedCount, totalCount, rate } = useSRS()

  // Snapshot the queue for this session so grading does not reshuffle under us.
  const initial = useMemo(() => dueCards, []) // eslint-disable-line react-hooks/exhaustive-deps
  const [queue, setQueue] = useState(initial)
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(0)

  const card = queue[0]

  function grade(g) {
    rate(card.id, g)
    setFlipped(false)
    setQueue((q) => {
      const [head, ...rest] = q
      // 'again' sends the card to the back of this session's queue
      return g === 'again' ? [...rest, head] : rest
    })
    if (g !== 'again') setDone((d) => d + 1)
  }

  if (!card) {
    return (
      <div className="content">
        <div className="topbar">
          <span className="pill">Review</span>
          <div className="topbar__spacer" />
          <ThemeToggle />
        </div>
        <h1>Review deck</h1>
        <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
          <div className="big-check">✓</div>
          <h3 style={{ marginBottom: '0.35rem' }}>
            {done > 0 ? 'Session complete' : 'Nothing due right now'}
          </h3>
          <p className="muted">
            {done > 0
              ? `You reviewed ${done} card${done === 1 ? '' : 's'}. Come back later for the next batch.`
              : 'New cards appear as you study, and missed test questions are added here automatically.'}
          </p>
          <div className="row" style={{ justifyContent: 'center', marginTop: '1.25rem' }}>
            <Link to="/test" className="btn btn--primary"><Timer size={16} /> Take a timed test</Link>
            <Link to="/practice" className="btn btn--ghost">Practise cases</Link>
          </div>
        </div>
        <p className="muted" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Deck: {totalCount} cards total, {reviewedCount} seen.
        </p>
      </div>
    )
  }

  const cond = conditionById[card.conditionId]

  return (
    <div className="content content--narrow">
      <div className="topbar">
        <span className="pill">Review</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.8rem' }}>Review deck</h1>
        <span className="muted">{queue.length} left</span>
      </div>
      <div className="review-meta">
        <span className="tag">{dueCount} due</span>
        <span className="tag">{newCount} new</span>
        {cond && <span className="tag">{cond.shortName}</span>}
        {card.kind === 'missed' && <span className="tag tag--caution">missed question</span>}
      </div>

      <div
        className="review-card"
        onClick={() => !flipped && setFlipped(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if ((e.key === ' ' || e.key === 'Enter') && !flipped) { e.preventDefault(); setFlipped(true) } }}
      >
        <div className="review-card__face">
          <div className="review-card__label">Prompt</div>
          <div className="review-card__front"><RichText>{card.front}</RichText></div>
        </div>
        {flipped && (
          <div className="review-card__face review-card__answer">
            <div className="review-card__label">Answer</div>
            <div className="review-card__back"><RichText>{card.back}</RichText></div>
          </div>
        )}
      </div>

      {!flipped ? (
        <button className="btn btn--primary review-reveal" onClick={() => setFlipped(true)}>
          Show answer
        </button>
      ) : (
        <div className="grade-row">
          {GRADES.map((g) => (
            <button key={g.key} className={`grade ${g.cls}`} onClick={() => grade(g.key)}>
              <span className="grade__label">{g.label}</span>
              <span className="grade__hint">{g.hint}</span>
            </button>
          ))}
        </div>
      )}

      <p className="muted" style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.85rem' }}>
        Rate how well you knew it. Harder cards come back sooner.
      </p>
    </div>
  )
}
