import { Check, X } from './Icons.jsx'

/*
 * One multiple-choice option. After grading, correctness is carried by three
 * independent channels so it never depends on colour alone: a border/background
 * treatment (CSS), a drawn check or cross icon, and a screen-reader-only phrase.
 *
 * state: 'idle' before grading, then 'correct' | 'incorrect' | 'resolved'
 * ('resolved' = a non-selected option once the answer is locked in).
 */
export default function ChoiceButton({ letter, children, state = 'idle', disabled, onClick }) {
  const cls =
    'choice' +
    (state === 'correct' ? ' correct' : '') +
    (state === 'incorrect' ? ' incorrect' : '')

  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled}>
      <span className="choice__key" aria-hidden="true">{letter}</span>
      <span className="choice__text">{children}</span>
      {state === 'correct' && (
        <span className="choice__mark choice__mark--correct">
          <Check size={18} />
          <span className="sr-only"> — correct answer</span>
        </span>
      )}
      {state === 'incorrect' && (
        <span className="choice__mark choice__mark--incorrect">
          <X size={18} />
          <span className="sr-only"> — your answer, incorrect</span>
        </span>
      )}
    </button>
  )
}
