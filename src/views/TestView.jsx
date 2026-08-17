import { useState, useEffect, useRef, useMemo } from 'react'
import { buildQuestionBank, shuffle } from '../data/quiz.js'
import { conditionById } from '../data/conditions.js'
import ThemeToggle from '../components/ThemeToggle.jsx'
import { useProgress } from '../hooks/useProgress.js'
import { useSRS } from '../hooks/useSRS.js'
import { Link } from 'react-router-dom'
import { Timer, Cards } from '../components/Icons.jsx'

const KEYS = ['A', 'B', 'C', 'D', 'E', 'F']

function fmt(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

/* ---- Setup screen ---- */
function Setup({ onStart, bankSize }) {
  const [count, setCount] = useState(Math.min(10, bankSize))
  const [minutes, setMinutes] = useState(5)

  return (
    <div className="card" style={{ padding: '1.5rem', maxWidth: 520 }}>
      <h3 style={{ marginTop: 0 }}>Set up your test</h3>
      <p className="muted">Choose how many questions and how long you have. Questions are shuffled.</p>

      <label className="nav-section-label" style={{ margin: '1rem 0 0.35rem', display: 'block' }}>
        Number of questions
      </label>
      <select className="select" value={count} onChange={(e) => setCount(Number(e.target.value))}>
        {[5, 10, 15, bankSize].filter((n, i, a) => n <= bankSize && a.indexOf(n) === i).map((n) => (
          <option key={n} value={n}>{n === bankSize ? `${n} (all)` : n}</option>
        ))}
      </select>

      <label className="nav-section-label" style={{ margin: '1.25rem 0 0.35rem', display: 'block' }}>
        Timer
      </label>
      <select className="select" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
        {[3, 5, 10, 15, 20].map((m) => (
          <option key={m} value={m}>{m} minutes</option>
        ))}
      </select>

      <div style={{ marginTop: '1.5rem' }}>
        <button className="btn btn--primary" onClick={() => onStart(count, minutes * 60)}>
          <Timer size={17} /> Start test
        </button>
      </div>
    </div>
  )
}

/* ---- Results screen ---- */
function stemHash(s) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h).toString(36)
}

function Results({ questions, answers, confidence, onRestart, timeUp }) {
  const { recordScore } = useProgress()
  const { addMissed } = useSRS()
  const correct = questions.reduce((n, q, i) => n + (answers[i] === q.answer ? 1 : 0), 0)
  const pct = Math.round((correct / questions.length) * 100)

  // Record best score and add every missed question to the review deck.
  useEffect(() => {
    recordScore(pct)
    questions.forEach((q, i) => {
      if (answers[i] !== undefined && answers[i] !== q.answer) {
        addMissed({
          id: `mc:${q.conditionId}:${stemHash(q.stem)}`,
          front: q.stem,
          back: `${q.choices[q.answer]}. ${q.explanation}`,
          conditionId: q.conditionId,
        })
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const byTopic = {}
  questions.forEach((q, i) => {
    const key = q.conditionId
    byTopic[key] = byTopic[key] || { correct: 0, total: 0 }
    byTopic[key].total += 1
    if (answers[i] === q.answer) byTopic[key].correct += 1
  })

  // Wrong-but-confident: the highest-priority review bucket.
  const wrongConfident = questions
    .map((q, i) => ({ q, i }))
    .filter(({ q, i }) => answers[i] !== undefined && answers[i] !== q.answer && confidence[i] === true)

  return (
    <div>
      <div className="card" style={{ padding: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        {timeUp && <p className="tag" style={{ color: 'var(--caution)' }}>Time expired</p>}
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
          <button className="btn btn--primary" onClick={onRestart}>New test</button>
          <Link to="/review" className="btn btn--ghost"><Cards size={16} /> Review missed cards</Link>
        </div>
      </div>

      {wrongConfident.length > 0 && (
        <div className="card priority-card" style={{ padding: '1.2rem 1.4rem', marginBottom: '1.5rem' }}>
          <div className="row" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="tag tag--caution">Review these first</span>
            <span className="muted" style={{ fontSize: '0.88rem' }}>Wrong, but you felt sure</span>
          </div>
          <p className="muted" style={{ fontSize: '0.9rem', margin: '0 0 0.75rem' }}>
            These are your blind spots: confident answers that were wrong. They have been added to your review deck.
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
                <span className="tag" style={{ color: gotIt ? 'var(--correct)' : 'var(--incorrect)' }}>
                  {gotIt ? 'Correct' : userAns == null ? 'Unanswered' : 'Incorrect'}
                </span>
              </span>
            </div>
            <p style={{ fontWeight: 600, margin: '0.6rem 0' }}>{q.stem}</p>
            <p style={{ margin: '0 0 0.3rem', color: 'var(--correct)' }}>
              Answer: {KEYS[q.answer]}. {q.choices[q.answer]}
            </p>
            {!gotIt && userAns != null && (
              <p style={{ margin: '0 0 0.3rem', color: 'var(--incorrect)' }}>
                You chose: {KEYS[userAns]}. {q.choices[userAns]}
              </p>
            )}
            <div className="explain" style={{ marginTop: '0.5rem' }}>{q.explanation}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ---- Active test ---- */
function Active({ questions, seconds, onFinish }) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [confidence, setConfidence] = useState({})
  const [remaining, setRemaining] = useState(seconds)
  const finishedRef = useRef(false)

  useEffect(() => {
    const t = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(t)
          if (!finishedRef.current) {
            finishedRef.current = true
            onFinish(answersRef.current, confidenceRef.current, true)
          }
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // keep refs for the timeout callback
  const answersRef = useRef(answers)
  answersRef.current = answers
  const confidenceRef = useRef(confidence)
  confidenceRef.current = confidence

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

  const answeredCount = Object.keys(answers).length
  const pctDone = (answeredCount / questions.length) * 100
  const timerCls = remaining <= 30 ? 'timer danger' : remaining <= 60 ? 'timer warn' : 'timer'

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <span className="muted">Question {idx + 1} of {questions.length}</span>
        <span className={timerCls}>{fmt(remaining)}</span>
      </div>
      <div className="progress"><div className="progress__bar" style={{ width: `${pctDone}%` }} /></div>

      <div className="card" style={{ padding: '1.35rem' }}>
        <span className="tag">{conditionById[q.conditionId]?.shortName || q.conditionId}</span>
        <p className="question__stem" style={{ marginTop: '0.7rem' }}>{q.stem}</p>
        {q.choices.map((choice, i) => {
          let cls = 'choice'
          if (answered && i === q.answer) cls += ' correct'
          else if (answered && i === picked) cls += ' incorrect'
          return (
            <button key={i} className={cls} onClick={() => choose(i)} disabled={answered}>
              <span className="choice__key">{KEYS[i]}</span>
              <span>{choice}</span>
            </button>
          )
        })}
        {answered && (
          <div className="explain">
            <div className="explain__label">{picked === q.answer ? 'Correct' : 'Explanation'}</div>
            {q.explanation}
          </div>
        )}
      </div>

      {answered && (
        <div className="row conf-row" style={{ marginTop: '0.9rem' }}>
          <span className="muted" style={{ fontSize: '0.85rem' }}>How sure were you?</span>
          <button
            className={`conf-chip ${confidence[idx] === true ? 'is-on' : ''}`}
            onClick={() => setConf(true)}
          >Sure</button>
          <button
            className={`conf-chip ${confidence[idx] === false ? 'is-on conf-chip--unsure' : ''}`}
            onClick={() => setConf(false)}
          >Unsure</button>
        </div>
      )}

      <div className="row" style={{ justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button className="btn btn--ghost btn--sm" onClick={next}>Skip</button>
        <button className="btn btn--primary" onClick={next} disabled={!answered}>
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
