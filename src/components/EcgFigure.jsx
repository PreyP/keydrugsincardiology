import RichText from './RichText.jsx'

/*
 * An ECG figure slot. When `src` is provided it renders the (de-identified)
 * image; until then it shows a clearly marked placeholder so the real ECG from
 * the source deck can be dropped in. `interpretation` is a bullet list and
 * `note` an optional teaching point.
 */
export default function EcgFigure({ title = 'ECG', src, alt, interpretation, note, caption }) {
  return (
    <figure className="ecg">
      <figcaption className="ecg__cap">
        <span className="ecg__title">{title}</span>
        {caption && <span className="ecg__sub">{caption}</span>}
      </figcaption>

      {src ? (
        <img className="ecg__img" src={`${import.meta.env.BASE_URL}${src}`} alt={alt || title} />
      ) : (
        <div className="ecg__placeholder" role="img" aria-label={`${title} placeholder`}>
          <span className="ecg__placeholder-line">ECG image to be added</span>
          <span className="ecg__placeholder-sub">From the source deck (de-identified, dated 2016; technician names removed)</span>
        </div>
      )}

      {interpretation && interpretation.length > 0 && (
        <div className="ecg__read">
          <div className="ecg__read-label">Interpretation</div>
          <ul>
            {interpretation.map((line, i) => (
              <li key={i}><RichText>{line}</RichText></li>
            ))}
          </ul>
        </div>
      )}
      {note && <p className="ecg__note"><RichText>{note}</RichText></p>}
    </figure>
  )
}
