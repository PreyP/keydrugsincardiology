import { Book, HeartPulse, ClipboardCheck, Pill } from './Icons.jsx'

/*
 * Overview schematic: how the module is organized, visible without a click.
 * Three primary steps in a row (pick a condition -> learn -> practise & test)
 * plus one branch hanging off step 2 for the A–Z lookup views (Drug library,
 * Comparisons). Static, informational content: nothing here is a link, and it
 * renders on every visit to "/". The sidebar's "How to use" modal repeats the
 * same model as a quick reference from inside deep pages.
 *
 * Semantics: the <ol> carries the step order once, so the numbered badges and
 * connector lines are aria-hidden. The branch lives inside step 2's <li> so it
 * reads as part of that step rather than as a fourth item.
 */
function Entry({ icon: Icon, label, children }) {
  return (
    <div className="module-map__text">
      <strong className="module-map__label">
        <Icon size={16} /> {label}
      </strong>
      <span className="muted module-map__desc">{children}</span>
    </div>
  )
}

export default function ModuleMap() {
  return (
    <div className="card module-map">
      <ol className="module-map__steps" role="list" aria-label="How this module is organized">
        <li className="module-map__step">
          <span className="module-map__badge" aria-hidden="true">1</span>
          <span className="module-map__line" aria-hidden="true" />
          <Entry icon={Book} label="Pick a condition">
            ACS, AFib, heart failure, and the rest, grouped the way they're prescribed.
          </Entry>
        </li>

        <li className="module-map__step">
          <span className="module-map__badge" aria-hidden="true">2</span>
          <span className="module-map__line" aria-hidden="true" />
          <Entry icon={HeartPulse} label="Learn">
            Its page has everything for it in one place: the drug classes to use, the relevant
            comparison tables, and a worked sample case.
          </Entry>

          {/* Shortcut off step 2, not a fourth step. */}
          <span className="module-map__drop" aria-hidden="true" />
          <div className="module-map__branch">
            <span className="module-map__turn" aria-hidden="true">↳</span>
            <Entry icon={Pill} label="Drug library & Comparisons">
              Same content as above, indexed A–Z instead of by condition — for when you already
              know what you want.
            </Entry>
          </div>
        </li>

        <li className="module-map__step">
          <span className="module-map__badge" aria-hidden="true">3</span>
          <Entry icon={ClipboardCheck} label="Practise & test">
            Work graded cases for that condition, then time yourself across everything.
          </Entry>
        </li>
      </ol>
    </div>
  )
}
