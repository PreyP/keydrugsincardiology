import { useId, useState } from 'react'
import ChoiceButton from './ChoiceButton.jsx'
import EcgFigure from './EcgFigure.jsx'

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
        const state = !done
          ? 'idle'
          : i === q.answer
            ? 'correct'
            : i === picked
              ? 'incorrect'
              : 'idle'
        return (
          <ChoiceButton
            key={i}
            letter={KEYS[i]}
            state={state}
            disabled={done}
            onClick={() => choose(i)}
          >
            {choice}
          </ChoiceButton>
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
  const fieldId = useId()
  const hintId = useId()

  return (
    <div className="question">
      <label className="question__stem" htmlFor={fieldId}>{q.stem}</label>
      <textarea
        id={fieldId}
        className="freetext"
        placeholder="Write your answer, then reveal the model answer to compare."
        aria-describedby={q.hint && !revealed ? hintId : undefined}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="row" style={{ marginTop: '0.6rem' }}>
        {!revealed && (
          <button type="button" className="btn btn--primary btn--sm" onClick={() => setRevealed(true)}>
            Reveal model answer
          </button>
        )}
        {!revealed && q.hint && <span className="muted" id={hintId}>Hint: {q.hint}</span>}
      </div>
      {revealed && (
        <div className="explain" role="status" aria-live="polite">
          <div className="explain__label">Model answer</div>
          {q.modelAnswer}
        </div>
      )}
      {revealed && q.video && (
        <div className="qvideo">
          <div className="qvideo__label">{q.video.title || 'Video'}</div>
          {q.video.src ? (
            <video className="qvideo__player" src={q.video.src} controls playsInline />
          ) : (
            <div className="qvideo__placeholder">{q.video.note || 'Video to be added.'}</div>
          )}
        </div>
      )}
      {revealed && q.ecg && (
        <div style={{ marginTop: '0.7rem' }}>
          <EcgFigure title={q.ecg.title || 'ECG'} src={q.ecg.src} caption={q.ecg.caption} note={q.ecg.note} interpretation={q.ecg.interpretation} />
        </div>
      )}
    </div>
  )
}

/* Flashcard: prompt on front, reveal the back. */
export function Flashcard({ q }) {
  const [flipped, setFlipped] = useState(false)
  const backId = useId()

  return (
    <button
      type="button"
      className="flashcard"
      aria-expanded={flipped}
      aria-controls={backId}
      onClick={() => setFlipped((f) => !f)}
    >
      <span className="flashcard__front">{q.front}</span>
      <span id={backId} className="flashcard__back" hidden={!flipped}>
        {flipped ? q.back : null}
      </span>
      {!flipped && <span className="flashcard__hint">Reveal answer</span>}
    </button>
  )
}

/* Dispatches on question type. */
export default function Question({ q, onAnswered }) {
  if (q.type === 'mc') return <MultipleChoice q={q} onAnswered={onAnswered} />
  if (q.type === 'free') return <FreeText q={q} />
  if (q.type === 'flash') return <Flashcard q={q} />
  return null
}
