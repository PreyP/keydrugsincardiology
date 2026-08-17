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
      <div className="compare__scroll">
        <table className="compare__table">
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th key={i} className={i === 0 ? 'compare__rowhead' : ''}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c} className={c === 0 ? 'compare__rowhead' : ''}>
                    {c === 0 ? cell : <RichText>{cell}</RichText>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
