/*
 * Theme-aware inline SVG mechanism diagrams.
 *
 * Colours reference CSS custom properties via fill/stroke="var(--token)" so the
 * diagrams adapt to light and dark mode. Each diagram is wrapped in <Figure>
 * with a caption. Content matches the MEDS230 lectures.
 */

function Figure({ title, caption, children }) {
  return (
    <figure className="figure card">
      <figcaption className="figure__cap">
        <span className="figure__title">{title}</span>
        {caption && <span className="figure__sub">{caption}</span>}
      </figcaption>
      <div className="figure__svg">{children}</div>
    </figure>
  )
}

const chip = {
  rx: 7,
  fill: 'var(--navy-50)',
  stroke: 'var(--sky-200)',
}
const chipText = { fill: 'var(--navy-700)', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)' }
const label = { fill: 'var(--text)', fontFamily: 'var(--font-sans)' }
const soft = { fill: 'var(--text-soft)', fontFamily: 'var(--font-sans)' }

/* ---------------- Oxygen supply and demand ---------------- */
export function OxygenBalanceDiagram() {
  return (
    <Figure
      title="Myocardial oxygen supply and demand"
      caption="Antianginal therapy tips the balance: raise supply, lower demand."
    >
      <svg viewBox="0 0 640 300" width="100%" role="img" aria-label="Balance of myocardial oxygen supply and demand">
        {/* beam */}
        <line x1="120" y1="90" x2="520" y2="118" stroke="var(--border-strong)" strokeWidth="4" strokeLinecap="round" />
        {/* fulcrum */}
        <polygon points="320,104 305,150 335,150" fill="var(--navy-500)" />
        <rect x="290" y="150" width="60" height="10" rx="4" fill="var(--border-strong)" />

        {/* left pan: supply */}
        <line x1="150" y1="92" x2="150" y2="140" stroke="var(--border-strong)" strokeWidth="2" />
        <rect x="70" y="140" width="160" height="42" rx="12" fill="var(--indication-bg)" stroke="var(--indication)" />
        <text x="150" y="166" textAnchor="middle" style={label} fontWeight="700" fontSize="15">Supply</text>
        <text x="150" y="205" textAnchor="middle" style={soft} fontSize="12">Coronary blood flow,</text>
        <text x="150" y="222" textAnchor="middle" style={soft} fontSize="12">diastolic filling time</text>

        {/* right pan: demand */}
        <line x1="490" y1="120" x2="490" y2="140" stroke="var(--border-strong)" strokeWidth="2" />
        <rect x="410" y="140" width="160" height="42" rx="12" fill="var(--sideeffect-bg)" stroke="var(--sideeffect)" />
        <text x="490" y="166" textAnchor="middle" style={label} fontWeight="700" fontSize="15">Demand</text>
        <text x="490" y="205" textAnchor="middle" style={soft} fontSize="12">Heart rate, contractility,</text>
        <text x="490" y="222" textAnchor="middle" style={soft} fontSize="12">wall stress (preload/afterload)</text>

        {/* demand-lowering drugs */}
        <text x="490" y="252" textAnchor="middle" style={soft} fontSize="11" fontWeight="700">LOWERED BY</text>
        {['Beta blockers', 'Nitrates', 'CCBs'].map((t, i) => (
          <g key={t} transform={`translate(${372 + i * 82}, 262)`}>
            <rect width="76" height="26" {...chip} />
            <text x="38" y="17" textAnchor="middle" style={chipText}>{t}</text>
          </g>
        ))}
      </svg>
    </Figure>
  )
}

/* ---------------- RAAS with drug block points ---------------- */
export function RaasDiagram() {
  const box = (x, y, w, t) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height="40" rx="10" fill="var(--surface-2)" stroke="var(--border-strong)" />
      <text x={w / 2} y="25" textAnchor="middle" style={label} fontSize="13" fontWeight="600">{t}</text>
    </g>
  )
  const arrow = (x1, x2, y, tag) => (
    <g>
      <line x1={x1} y1={y} x2={x2 - 8} y2={y} stroke="var(--text-mute)" strokeWidth="2" />
      <polygon points={`${x2},${y} ${x2 - 9},${y - 5} ${x2 - 9},${y + 5}`} fill="var(--text-mute)" />
      {tag && <text x={(x1 + x2) / 2} y={y - 9} textAnchor="middle" style={soft} fontSize="11">{tag}</text>}
    </g>
  )
  return (
    <Figure
      title="Renin-angiotensin-aldosterone system"
      caption="ACE inhibitors block conversion to angiotensin II; ARNIs add neprilysin inhibition."
    >
      <svg viewBox="0 0 640 300" width="100%" role="img" aria-label="RAAS pathway with drug block points">
        {box(20, 40, 120, 'Angiotensinogen')}
        {arrow(140, 200, 60, 'renin')}
        {box(200, 40, 100, 'Angiotensin I')}
        {arrow(300, 380, 60, 'ACE')}
        {box(380, 40, 110, 'Angiotensin II')}

        {/* ACE inhibitor block marker */}
        <line x1="340" y1="30" x2="340" y2="78" stroke="var(--caution)" strokeWidth="2.5" strokeDasharray="4 3" />
        <g transform="translate(300, 6)">
          <rect width="80" height="24" rx="7" fill="var(--caution-bg)" stroke="var(--caution)" />
          <text x="40" y="16" textAnchor="middle" fill="var(--caution)" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">ACE inhibitor</text>
        </g>

        {/* effects of Ang II */}
        <line x1="435" y1="80" x2="435" y2="110" stroke="var(--text-mute)" strokeWidth="2" />
        {['Vasoconstriction (afterload)', 'Aldosterone: Na and water retention', 'Sympathetic activation'].map((t, i) => (
          <g key={t} transform={`translate(300, ${118 + i * 34})`}>
            <rect width="300" height="26" rx="8" fill="var(--sideeffect-bg)" stroke="var(--sideeffect)" opacity="0.9" />
            <text x="150" y="17" textAnchor="middle" style={soft} fontSize="12">{t}</text>
          </g>
        ))}

        {/* ARNI note */}
        <g transform="translate(20, 210)">
          <rect width="580" height="72" rx="12" fill="var(--trial-bg)" stroke="var(--trial)" opacity="0.9" />
          <text x="16" y="26" style={{ fill: 'var(--trial)' }} fontSize="12" fontWeight="700" fontFamily="var(--font-sans)">ARNI (sacubitril / valsartan)</text>
          <text x="16" y="46" style={soft} fontSize="12">Valsartan blocks the angiotensin II receptor, while sacubitril inhibits neprilysin so</text>
          <text x="16" y="62" style={soft} fontSize="12">natriuretic peptides rise: natriuresis, diuresis, vasodilation, and less fibrosis.</text>
        </g>
      </svg>
    </Figure>
  )
}

/* ---------------- Nephron sites of diuretic action ---------------- */
export function NephronDiagram() {
  return (
    <Figure
      title="Where diuretics act in the nephron"
      caption="Different agents block sodium handling at different segments."
    >
      <svg viewBox="0 0 640 300" width="100%" role="img" aria-label="Nephron with diuretic sites of action">
        {/* glomerulus */}
        <circle cx="90" cy="70" r="26" fill="var(--surface-2)" stroke="var(--border-strong)" strokeWidth="2" />
        <text x="90" y="118" textAnchor="middle" style={soft} fontSize="11">Glomerulus</text>

        {/* tubule path: PCT -> loop -> DCT -> collecting duct */}
        <path
          d="M116 70 H180 C210 70 210 70 210 110 V190 C210 220 250 220 250 190 V110 C250 78 250 78 285 78 H360"
          fill="none" stroke="var(--navy-400)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"
        />
        {/* collecting duct down */}
        <path d="M360 78 H420 C450 78 450 78 450 120 V250" fill="none" stroke="var(--navy-400)" strokeWidth="10" strokeLinecap="round" opacity="0.55" />

        {/* SGLT2 at PCT */}
        <g transform="translate(120, 20)">
          <rect width="150" height="26" {...chip} />
          <text x="75" y="17" textAnchor="middle" style={chipText}>SGLT2 inhibitors</text>
        </g>
        <line x1="170" y1="46" x2="175" y2="64" stroke="var(--sky-400)" strokeWidth="2" />
        <text x="150" y="60" textAnchor="middle" style={soft} fontSize="10">Proximal tubule</text>

        {/* Loop diuretic at ascending loop */}
        <g transform="translate(255, 150)">
          <rect width="150" height="26" {...chip} />
          <text x="75" y="17" textAnchor="middle" style={chipText}>Loop diuretics</text>
        </g>
        <line x1="255" y1="163" x2="230" y2="170" stroke="var(--sky-400)" strokeWidth="2" />
        <text x="330" y="196" textAnchor="middle" style={soft} fontSize="10">Thick ascending loop of Henle</text>

        {/* MRA at DCT / collecting duct */}
        <g transform="translate(470, 120)">
          <rect width="150" height="26" {...chip} />
          <text x="75" y="17" textAnchor="middle" style={chipText}>MRA (spironolactone)</text>
        </g>
        <line x1="470" y1="133" x2="452" y2="150" stroke="var(--sky-400)" strokeWidth="2" />
        <text x="500" y="180" textAnchor="middle" style={soft} fontSize="10">Distal tubule /</text>
        <text x="500" y="194" textAnchor="middle" style={soft} fontSize="10">collecting duct</text>

        <text x="450" y="272" textAnchor="middle" style={soft} fontSize="11">To collecting duct and urine</text>
      </svg>
    </Figure>
  )
}

/* ---------------- Cardiac action potential + Vaughan-Williams ---------------- */
export function ActionPotentialDiagram() {
  return (
    <Figure
      title="Cardiac action potential and antiarrhythmic classes"
      caption="Each Vaughan-Williams class targets a different phase or current."
    >
      <svg viewBox="0 0 640 300" width="100%" role="img" aria-label="Action potential with Vaughan Williams class targets">
        {/* axes */}
        <line x1="60" y1="30" x2="60" y2="230" stroke="var(--border-strong)" strokeWidth="2" />
        <line x1="60" y1="230" x2="600" y2="230" stroke="var(--border-strong)" strokeWidth="2" />
        <text x="30" y="130" style={soft} fontSize="11" transform="rotate(-90 30 130)">mV</text>
        <text x="330" y="256" textAnchor="middle" style={soft} fontSize="11">time</text>

        {/* action potential curve */}
        <path
          d="M60 210 L110 210 L120 50 L150 70 L165 66 L300 92 L360 205 L600 210"
          fill="none" stroke="var(--navy-500)" strokeWidth="3.5" strokeLinejoin="round"
        />

        {/* phase 0 (Na) - Class I */}
        <circle cx="118" cy="120" r="5" fill="var(--caution)" />
        <g transform="translate(120, 44)">
          <rect width="150" height="24" rx="7" fill="var(--caution-bg)" stroke="var(--caution)" />
          <text x="75" y="16" textAnchor="middle" fill="var(--caution)" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">Class I: Na (flecainide)</text>
        </g>

        {/* plateau phase 2 (Ca) - Class IV */}
        <circle cx="230" cy="86" r="5" fill="var(--dosing)" />
        <g transform="translate(190, 96)">
          <rect width="180" height="24" rx="7" fill="var(--dosing-bg)" stroke="var(--dosing)" />
          <text x="90" y="16" textAnchor="middle" fill="var(--dosing)" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">Class IV: Ca (diltiazem)</text>
        </g>

        {/* phase 3 repolarization (K) - Class III */}
        <circle cx="360" cy="150" r="5" fill="var(--trial)" />
        <g transform="translate(365, 120)">
          <rect width="185" height="24" rx="7" fill="var(--trial-bg)" stroke="var(--trial)" />
          <text x="92" y="16" textAnchor="middle" fill="var(--trial)" fontSize="11" fontWeight="700" fontFamily="var(--font-sans)">Class III: K (amiodarone)</text>
        </g>

        {/* Class II note */}
        <g transform="translate(60, 258)">
          <rect width="540" height="30" rx="8" fill="var(--surface-2)" stroke="var(--border-strong)" />
          <text x="270" y="20" textAnchor="middle" style={soft} fontSize="12">Class II (beta blockers) blunt sympathetic drive, slowing the sinus and AV nodes.</text>
        </g>
      </svg>
    </Figure>
  )
}

/* Map conditions to their diagrams. */
export const conditionDiagrams = {
  acs: [OxygenBalanceDiagram],
  'stable-angina': [OxygenBalanceDiagram],
  'heart-failure': [RaasDiagram, NephronDiagram],
  'atrial-fibrillation': [ActionPotentialDiagram],
}
