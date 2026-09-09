import { drugClasses } from '../data/drugClasses.js'
import ThemeToggle from '../components/ThemeToggle.jsx'

// Every landmark trial in the module (all named in the source slides).
const trials = drugClasses.flatMap((d) =>
  (d.trials || []).map((t) => ({ drug: d.shortName, ...t })),
)

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
        This module was created by Prey Patel and Md Riaz Mahmud (MD Class of 2028) with content
        and support from Dr. Thakrar.
      </p>
      <p className="lead">
        Every teaching point is adapted from the Queen's MEDS230 "Key Drugs in Cardiology" lectures
        and the DIL cases (Dr. Amar Thakrar). Material the slides do not cover is left out rather
        than added from other sources. This module is for education only and is not clinical guidance.
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

      {trials.length > 0 && (
        <>
          <h2>Landmark trials</h2>
          <p className="muted" style={{ marginTop: '-0.4rem' }}>
            The trial{trials.length === 1 ? '' : 's'} named in the lecture slides.
          </p>
          <div className="card compare">
            <div className="compare__scroll" tabIndex={0} role="region" aria-label="Landmark trials — table, scrolls horizontally">
              <table className="compare__table">
                <caption className="sr-only">Landmark trials named in the source lecture slides, with the agent and takeaway.</caption>
                <thead>
                  <tr>
                    <th scope="col" className="compare__rowhead">Drug</th>
                    <th scope="col">Trial</th>
                    <th scope="col">Takeaway</th>
                  </tr>
                </thead>
                <tbody>
                  {trials.map((t, i) => (
                    <tr key={i}>
                      <th scope="row" className="compare__rowhead">{t.drug}</th>
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
