import { useState, useEffect, useRef, useMemo, useId } from 'react'
import { buildQuestionBank, shuffle } from '../data/quiz.js'
import { conditionById } from '../data/conditions.js'
import ThemeToggle from '../components/ThemeToggle.jsx'
import ChoiceButton from '../components/ChoiceButton.jsx'
import { useProgress } from '../hooks/useProgress.js'
import { Link } from 'react-router-dom'
import FeedbackForm from '../components/FeedbackForm.jsx'
import { Timer, ClipboardCheck } from '../components/Icons.jsx'

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F']

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/* Spoken form of the countdown, only at the thresholds that matter. */
function timeCallout(sec) {
  if (sec === 60) return '1 minute remaining'
  if (sec === 30) return '30 seconds remaining'
  if (sec === 10) return '10 seconds remaining'
  if (sec === 0) return "Time's up"
  return null
}

/* ---- Setup screen ---- */
function Setup({ onStart, bankSize }) {
  const [count, setCount] = useState(Math.min(10, bankSize))
  const [minutes, setMinutes] = useState(5)
  const countId = useId()
  const minutesId = useId()

  return (
    <div className="card" style={{ padding: '1.5rem', maxWidth: 520 }}>
      <h3 style={{ marginTop: 0 }}>Set up your test</h3>
      <p className="muted">Choose how many questions and how long you have. Questions are shuffled.</p>

      <label className="field-label" htmlFor={countId}>Number of questions</label>
      <select id={countId} className="select" value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {[5, 10, 15, bankSize].filter((n, i, a) => n <= bankSize && a.indexOf(n) === i).map((n) => (
          <option key={n} value={n}>{n === bankSize ? `${n} (all)` : n}</option>
        ))}
      </select>

      <label className="field-label" htmlFor={minutesId}>Timer</label>
      <select id={minutesId} className="select" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
        {[3, 5, 10, 15, 20].map((m) => (
          <option key={m} value={m}>{m} minutes</option>
        ))}
      </select>

      <div style={{ marginTop: '1.5rem' }}>
        <button type="button" className="btn btn--primary" onClick={() => onStart(count, minutes * 60)}>
          <Timer size={17} /> Start test
        </button>
      </div>
    </div>
  )
}

/* ---- Results screen ---- */
function Results({ questions, answers, confidence, onRestart, timeUp }) {
  const { recordScore } = useProgress()
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0)
  const pct = Math.round((correct / questions.length) * 100)

  // Record the best score once, on mount.
  useEffect(() => {
    recordScore(pct)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const byTopic = {}
  questions.forEach((q, i) => {
    const key = q.conditionId
    byTopic[key] = byTopic[key] || { correct: 0, total: 0 }
    byTopic[key].total += 1
    if (answers[i] === q.answer) byTopic[key].correct += 1
  })

  // Wrong-but-confident: the highest-priority study bucket.
  const wrongConfident = questions
    .map((q, i) => ({ q, i }))
    .filter(({ i }) => answers[i] !== undefined && answers[i] !== questions[i].answer && confidence[i] === true)

  // A-04 calibration counts.
  const confidentWrong = wrongConfident.length
  const unsureRight = questions.filter(
    (q, i) => answers[i] === q.answer && confidence[i] === false,
  ).length
  const ratedCount = questions.filter((q, i) => confidence[i] !== undefined).length

  return (
    <div>
      <div className="card" style={{ padding: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        {timeUp && <p className="tag tag--caution">Time expired</p>}
        <div className="score-ring" style={{ '--score-deg': `${pct * 3.6}deg` }}>
          <div className="score-ring__inner">{pct}%</div>
        </div>
        <p style={{ fontWeight: 700, margin: 0 }}>{correct} of {questions.length} correct</p>

        <div style={{ maxWidth: 420, margin: '1.25rem auto 0', textAlign: 'left' }}>
          {Object.entries(byTopic).map(([cid, s]) => (
            <div key={cid} className="row" style={{ justifyContent: 'space-between', padding: '0.35rem 0' }}>
              <span>{conditionById[cid]?.shortName || cid}</span>
              <span className="muted">{s.correct} / {s.total}</span>
            </div>
          ))}
        </div>

        <div className="row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
          <button type="button" className="btn btn--primary" onClick={onRestart}>New test</button>
          <Link to="/practice" className="btn btn--ghost"><ClipboardCheck size={16} /> Practise the cases</Link>
        </div>
      </div>

      {ratedCount > 0 && (
        <div className="card" style={{ padding: '1.2rem 1.4rem', marginBottom: '1.5rem' }}>
          <div className="explain__label" style={{ marginBottom: '0.5rem' }}>Confidence calibration</div>
          <div className="row" style={{ gap: '2rem' }}>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--caution)' }}>{confidentWrong}</div>
              <div className="muted" style={{ fontSize: '0.85rem' }}>sure, but wrong</div>
            </div>
            <div>
              <div style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--correct)' }}>{unsureRight}</div>
              <div className="muted" style={{ fontSize: '0.85rem' }}>unsure, but right</div>
            </div>
          </div>
          <p className="muted" style={{ fontSize: '0.88rem', margin: '0.7rem 0 0' }}>
            "Sure but wrong" are blind spots to prioritize; "unsure but right" are things you know better than you think.
          </p>
        </div>
      )}

      {wrongConfident.length > 0 && (
        <div className="card priority-card" style={{ padding: '1.2rem 1.4rem', marginBottom: '1.5rem' }}>
          <div className="row" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="tag tag--caution">Review these first</span>
            <span className="muted" style={{ fontSize: '0.88rem' }}>Wrong, but you felt sure</span>
          </div>
          <p className="muted" style={{ fontSize: '0.9rem', margin: '0 0 0.75rem' }}>
            These are your blind spots: confident answers that turned out wrong. Start your next study
            session here.
          </p>
          <ul style={{ margin: 0 }}>
            {wrongConfident.map(({ q, i }) => (
              <li key={i}>{q.stem}</li>
            ))}
          </ul>
        </div>
      )}

      <h2>Review</h2>
      {questions.map((q, i) => {
        const userAns = answers[i]
        const gotIt = userAns === q.answer
        return (
          <div className="card" style={{ padding: '1.1rem 1.35rem', marginBottom: '1rem' }} key={i}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="tag">{conditionById[q.conditionId]?.shortName || q.conditionId}</span>
              <span className="row" style={{ gap: '0.4rem' }}>
                {confidence[i] !== undefined && (
                  <span className="tag">{confidence[i] ? 'was sure' : 'was unsure'}</span>
                )}
                <span className={`tag ${gotIt ? 'tag--correct' : 'tag--caution'}`}>
                  {gotIt ? 'Correct' : userAns == null ? 'Unanswered' : 'Incorrect'}
                </span>
              </span>
            </div>
            <p style={{ fontWeight: 600, margin: '0.6rem 0' }}>{q.stem}</p>
            <p className="answer-line answer-line--correct">
              Answer: {KEYS[q.answer]}. {q.choices[q.answer]}
            </p>
            {!gotIt && userAns != null && (
              <p className="answer-line answer-line--wrong">
                You chose: {KEYS[userAns]}. {q.choices[userAns]}
              </p>
            )}
            <div className="explain" style={{ marginTop: '0.5rem' }}>{q.explanation}</div>
          </div>
        )
      })}

      <div style={{ marginTop: '1.5rem' }}>
        <FeedbackForm context="test" />
      </div>
    </div>
  )
}

/* ---- Active test ---- */
function Active({ questions, seconds, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [confidence, setConfidence] = useState({})
  const [remaining, setRemaining] = useState(seconds)
  const [callout, setCallout] = useState('')
  const finishedRef = useRef(false)
  const confGroupId = useId()

  // keep refs for the timeout callback
  const answersRef = useRef(answers)
  answersRef.current = answers
  const confidenceRef = useRef(confidence)
  confidenceRef.current = confidence

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => {
        const nextR = r <= 1 ? 0 : r - 1
        const spoken = timeCallout(nextR)
        if (spoken) setCallout(spoken)
        if (nextR === 0) {
          clearInterval(t)
          if (!finishedRef.current) {
            finishedRef.current = true
            onFinish(answersRef.current, confidenceRef.current, true)
          }
        }
        return nextR
      })
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const q = questions[idx]
  const picked = answers[idx]
  const answered = picked !== undefined

  function choose(i) {
    if (answered) return
    setAnswers((a) => ({ ...a, [idx]: i }))
  }

  function setConf(v) {
    setConfidence((c) => ({ ...c, [idx]: v }))
  }

  function next() {
    if (idx + 1 < questions.length) setIdx(idx + 1)
    else if (!finishedRef.current) {
      finishedRef.current = true
      onFinish(answersRef.current, confidenceRef.current, false)
    }
  }

  function prev() {
    if (idx > 0) setIdx(idx - 1)
  }

  const answeredCount = Object.keys(answers).length
  const fraction = answeredCount / questions.length
  const timerCls = remaining <= 30 ? 'timer danger' : remaining <= 60 ? 'timer warn' : 'timer'

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="muted">Question {idx + 1} of {questions.length}</span>
        <span className={timerCls} role="timer" aria-label={`Time remaining ${fmt(remaining)}`}>
          {fmt(remaining)}
        </span>
      </div>
      <div className="sr-only" role="status" aria-live="assertive">{callout}</div>
      <div
        className="progress"
        role="progressbar"
        aria-label="Questions answered"
        aria-valuenow={answeredCount}
        aria-valuemin={0}
        aria-valuemax={questions.length}
      >
        <div className="progress__bar" style={{ transform: `scaleX(${fraction})` }} />
      </div>

      <div className="card" style={{ padding: '1.35rem' }}>
        <span className="tag">{conditionById[q.conditionId]?.shortName || q.conditionId}</span>
        <p className="question__stem" style={{ marginTop: '0.7rem' }}>{q.stem}</p>

        {/* A-04: rate confidence before submitting the answer */}
        <div className="row conf-row" style={{ margin: '0 0 1rem' }} role="group" aria-labelledby={confGroupId}>
          <span className="muted" id={confGroupId} style={{ fontSize: '0.85rem' }}>
            {answered ? 'You said you were' : 'Before you answer, how sure are you?'}
          </span>
          <button
            type="button"
            className={`conf-chip ${confidence[idx] === true ? 'is-on' : ''}`}
            aria-pressed={confidence[idx] === true}
            onClick={() => setConf(true)}
            disabled={answered}
          >Sure</button>
          <button
            type="button"
            className={`conf-chip ${confidence[idx] === false ? 'is-on conf-chip--unsure' : ''}`}
            aria-pressed={confidence[idx] === false}
            onClick={() => setConf(false)}
            disabled={answered}
          >Unsure</button>
        </div>

        {q.choices.map((choice, i) => {
          const state = !answered
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
              disabled={answered}
              onClick={() => choose(i)}
            >
              {choice}
            </ChoiceButton>
          )
        })}
        {answered && (
          <div className="explain" role="status" aria-live="polite">
            <div className="explain__label">{picked === q.answer ? 'Correct' : 'Explanation'}</div>
            {q.explanation}
          </div>
        )}
      </div>

      <div className="row" style={{ marginTop: '1rem' }}>
        <button type="button" className="btn btn--ghost btn--sm" onClick={prev} disabled={idx === 0}>Back</button>
        <div style={{ flex: 1 }} />
        <button type="button" className="btn btn--ghost btn--sm" onClick={next}>Skip</button>
        <button type="button" className="btn btn--primary" onClick={next} disabled={!answered}>
          {idx + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}

export default function TestView() {
  const bank = useMemo(() => buildQuestionBank(), [])
  const [phase, setPhase] = useState('setup') // setup | active | results
  const [questions, setQuestions] = useState([])
  const [seconds, setSeconds] = useState(300)
  const [result, setResult] = useState({ answers: {}, confidence: {}, timeUp: false })

  function start(count, secs) {
    setQuestions(shuffle(bank).slice(0, count))
    setSeconds(secs)
    setResult({ answers: {}, confidence: {}, timeUp: false })
    setPhase('active')
  }

  function finish(answers, confidence, timeUp) {
    setResult({ answers, confidence, timeUp })
    setPhase('results')
  }

  return (
    <div className="content">
      <div className="topbar">
        <span className="pill"><Timer size={14} /> Test my knowledge</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>Test my knowledge</h1>
      {phase === 'setup' && (
        <>
          <p className="lead">
            Set a timer and answer a shuffled mix of questions across every condition. You will get a
            score, a breakdown by topic, and a full review with explanations.
          </p>
          <Setup onStart={start} bankSize={bank.length} />
        </>
      )}
      {phase === 'active' && (
        <Active questions={questions} seconds={seconds} onFinish={finish} />
      )}
      {phase === 'results' && (
        <Results
          questions={questions}
          answers={result.answers}
          confidence={result.confidence}
          timeUp={result.timeUp}
          onRestart={() => setPhase('setup')}
        />
      )}
    </div>
  )
}
