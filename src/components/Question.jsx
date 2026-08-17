import { useState } from 'react'

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F']

/* Multiple choice, self-grading. Reports correctness via onAnswered. */
export function MultipleChoice({ q, onAnswered }) {
  const [picked, setPicked] = useState(null)
  const done = picked !== null

  function choose(i) {
    if (done) return
    setPicked(i)
    onAnswered && onAnswered(i === q.answer)
  }

  return (
    <div className="question">
      <p className="question__stem">{q.stem}</p>
      {q.choices.map((choice, i) => {
        let cls = 'choice'
        if (done && i === q.answer) cls += ' correct'
        else if (done && i === picked) cls += ' incorrect'
        return (
          <button key={i} className={cls} onClick={() => choose(i)} disabled={done}>
            <span className="choice__key">{KEYS[i]}</span>
            <span>{choice}</span>
          </button>
        )
      })}
      {done && (
        <div className="explain" role="status" aria-live="polite">
          <div className="explain__label">
            {picked === q.answer ? 'Correct' : 'Explanation'}
          </div>
          {q.explanation}
        </div>
      )}
    </div>
  )
}

/* Short free-text: student writes, then reveals the model answer to self-assess. */
export function FreeText({ q }) {
  const [text, setText] = useState('')
  const [revealed, setRevealed] = useState(false)
  return (
    <div className="question">
      <p className="question__stem">{q.stem}</p>
      <textarea
        className="freetext"
        placeholder="Write your answer, then reveal the model answer to compare."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="row" style={{ marginTop: '0.6rem' }}>
        {!revealed && (
          <button className="btn btn--primary btn--sm" onClick={() => setRevealed(true)}>
            Reveal model answer
          </button>
        )}
        {!revealed && q.hint && <span className="muted">Hint: {q.hint}</span>}
      </div>
      {revealed && (
        <div className="explain">
          <div className="explain__label">Model answer</div>
          {q.modelAnswer}
        </div>
      )}
    </div>
  )
}

/* Flashcard: prompt on front, reveal the back. */
export function Flashcard({ q }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div className="flashcard" onClick={() => setFlipped((f) => !f)} role="button" tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setFlipped((f) => !f) }}>
      <div className="flashcard__front">{q.front}</div>
      {flipped ? (
        <div className="flashcard__back">{q.back}</div>
      ) : (
        <span className="muted" style={{ fontSize: '0.85rem' }}>Click to reveal</span>
      )}
    </div>
  )
}

/* Dispatches on question type. */
export default function Question({ q, onAnswered }) {
  if (q.type === 'mc') return <MultipleChoice q={q} onAnswered={onAnswered} />
  if (q.type === 'free') return <FreeText q={q} />
  if (q.type === 'flash') return <Flashcard q={q} />
  return null
}
