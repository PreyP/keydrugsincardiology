import { drugClasses } from '../data/drugClasses.js'
import ThemeToggle from '../components/ThemeToggle.jsx'

// Collect every trial, flagging those added beyond the source slides.
const trials = drugClasses.flatMap((d) =>
  (d.trials || []).map((t) => ({ drug: d.shortName, ...t })),
)
const added = trials.filter((t) => t.addedBeyondSource)
const fromSource = trials.filter((t) => !t.addedBeyondSource)

export default function AboutView() {
  return (
    <div className="content">
      <div className="topbar">
        <span className="pill">Sources</span>
        <div className="topbar__spacer" />
        <ThemeToggle />
      </div>

      <h1>Sources and content notes</h1>
      <p className="byline">
        This module was created by Prey Patel and Md Riaz Mahmud (MD Class of 2028) with support
        from Dr. Amar Thakrar.
      </p>
      <p className="lead">
        Core content is adapted from the Queen's MEDS230 "Key Drugs in Cardiology" lectures and the
        DIL cases (Dr. Amar Thakrar). This module is for education only and is not clinical guidance.
      </p>

      <div className="card" style={{ padding: '1.35rem 1.5rem', marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0 }}>Source materials</h3>
        <ul style={{ marginBottom: 0 }}>
          <li>Key Drugs in Cardiology — ischemic disease lecture (MEDS230)</li>
          <li>Key Drugs in Cardiology — arrhythmia lecture (MEDS230)</li>
          <li>Key Drugs in Cardiology — heart failure lecture (MEDS230)</li>
          <li>DIL cases and answer key: stable angina, SVT, and heart failure</li>
        </ul>
      </div>

      <h2>Trials added beyond the slides</h2>
      <p className="muted" style={{ marginTop: '-0.4rem' }}>
        The lecture slides name only the CAST trial. The trials below were added to support the
        "landmark trials" sections and have each been checked against their primary publication
        (NEJM, Lancet, or the ACC/AHA trial summaries) for the correct agent, year, and headline
        finding. They are tagged "added, not in slides" throughout the app. If your department
        prefers different citations for these teaching points, they are easy to swap in
        src/data/drugClasses.js.
      </p>
      <div className="card compare" style={{ marginTop: '1rem' }}>
        <div className="compare__scroll">
          <table className="compare__table">
            <thead>
              <tr><th className="compare__rowhead">Drug</th><th>Trial</th><th>Stated takeaway</th></tr>
            </thead>
            <tbody>
              {added.map((t, i) => (
                <tr key={i}>
                  <td className="compare__rowhead">{t.drug}</td>
                  <td>{t.name}</td>
                  <td>{t.takeaway}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {fromSource.length > 0 && (
        <>
          <h2 style={{ marginTop: '2rem' }}>From the source slides</h2>
          <div className="card compare">
            <div className="compare__scroll">
              <table className="compare__table">
                <thead>
                  <tr><th className="compare__rowhead">Drug</th><th>Trial</th><th>Takeaway</th></tr>
                </thead>
                <tbody>
                  {fromSource.map((t, i) => (
                    <tr key={i}>
                      <td className="compare__rowhead">{t.drug}</td>
                      <td>{t.name}</td>
                      <td>{t.takeaway}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
