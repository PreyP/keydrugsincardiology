import { Link } from 'react-router-dom'
import RichText from './RichText.jsx'
import { conditionById } from '../data/conditions.js'

export default function ComparisonTable({ table, showRelated = false }) {
  return (
    <div className="compare card">
      <div className="compare__head">
        <h3 className="compare__title">{table.title}</h3>
        <p className="compare__blurb">{table.blurb}</p>
        {showRelated && (
          <div className="row" style={{ gap: '0.4rem', marginTop: '0.5rem' }}>
            {table.related.map((cid) => (
              <Link key={cid} to={`/learn/${cid}`} className="chip-link">
                {conditionById[cid]?.shortName || cid}
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="compare__scroll" tabIndex={0} role="region" aria-label={`${table.title} — table, scrolls horizontally`}>
        <table className="compare__table">
          <caption className="sr-only">{table.title}. {table.blurb}</caption>
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th key={i} scope="col" className={i === 0 ? 'compare__rowhead' : ''}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th key={c} scope="row" className="compare__rowhead">{cell}</th>
                  ) : (
                    <td key={c}><RichText>{cell}</RichText></td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
