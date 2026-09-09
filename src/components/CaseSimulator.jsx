import { useEffect, useRef, useState } from 'react'
import RichText from './RichText.jsx'

const TONE_PREFIX = { good: 'Good choice: ', bad: 'Poor choice: ', neutral: 'Note: ' }

/*
 * Walks a branching simulation node by node. Each choice reveals feedback before
 * you continue, and a running decision log records the path you took. Focus
 * moves to the feedback after a choice and to the next prompt after Continue, so
 * a keyboard user is never dropped back to the top.
 */
export default function CaseSimulator({ sim }) {
  const [nodeId, setNodeId] = useState(sim.start)
  const [picked, setPicked] = useState(null) // the chosen choice object, awaiting Continue
  const [log, setLog] = useState([])
  const feedbackRef = useRef(null)
  const promptRef = useRef(null)
  const advancedRef = useRef(false)

  const node = sim.nodes[nodeId]

  useEffect(() => {
    if (picked) feedbackRef.current?.focus()
  }, [picked])

  useEffect(() => {
    if (advancedRef.current) {
      promptRef.current?.focus()
      advancedRef.current = false
    }
  }, [nodeId])

  function choose(choice) {
    if (picked) return
    setPicked(choice)
    setLog((l) => [...l, { prompt: node.prompt, label: choice.label, tone: choice.tone }])
  }

  function cont() {
    const nextId = picked.next
    advancedRef.current = true
    setPicked(null)
    setNodeId(nextId)
  }

  function restart() {
    setNodeId(sim.start)
    setPicked(null)
    setLog([])
  }

  return (
    <div className="sim card">
      <div className="sim__head">
        <span className="tag">Case simulation</span>
        <h3 className="sim__title">{sim.title}</h3>
        <RichText as="p" className="sim__intro">{sim.intro}</RichText>
      </div>

      {log.length > 0 && (
        <ol className="sim__log">
          {log.map((step, i) => (
            <li key={i} className={`sim__logitem sim__logitem--${step.tone}`}>
              <span className="sim__logdot" aria-hidden="true" />
              <span className="sr-only">{TONE_PREFIX[step.tone] || ''}</span>
              <span>{step.label}</span>
            </li>
          ))}
        </ol>
      )}

      {node.terminal ? (
        <div className={`sim__end sim__end--${node.tone || 'good'}`} ref={promptRef} tabIndex={-1}>
          <div className="sim__endbadge">Case complete</div>
          <RichText as="p">{node.prompt}</RichText>
          <button type="button" className="btn btn--ghost btn--sm" onClick={restart}>Run it again</button>
        </div>
      ) : (
        <div className="sim__body">
          <p className="sim__prompt" ref={promptRef} tabIndex={-1}><RichText>{node.prompt}</RichText></p>
          {!picked ? (
            <div className="sim__choices">
              {node.choices.map((c, i) => (
                <button type="button" key={i} className="sim__choice" onClick={() => choose(c)}>
                  {c.label}
                </button>
              ))}
            </div>
          ) : (
            <div
              className={`sim__feedback sim__feedback--${picked.tone}`}
              ref={feedbackRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
            >
              <div className="sim__fbhead">
                {picked.tone === 'good' ? 'Good call' : picked.tone === 'bad' ? 'Reconsider' : 'Worth noting'}
              </div>
              <RichText as="p">{picked.feedback}</RichText>
              <button type="button" className="btn btn--primary btn--sm" onClick={cont}>Continue</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
