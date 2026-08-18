/*
 * Theme-aware inline SVG mechanism diagrams (v2).
 *
 * Rebuilt on a shared visual grid: one type scale (13-16px sans labels), 8px
 * spacing, rounded 14px panels, curved arrow connectors, numbered sites of
 * action and a legend panel instead of labels crowded into the drawing.
 *
 * Every colour is a CSS custom property, so light and dark themes both work.
 * Extra tokens (--teal-500 and friends) live in src/styles/diagram-tokens.css.
 * Figure chrome lives in src/styles/diagrams.css.
 */

function Figure({ title, caption, wide = true, children }) {
  return (
    <figure className={`figure card${wide ? ' figure--wide' : ''}`}>
      <figcaption className="figure__cap">
        <span className="figure__title">{title}</span>
        {caption && <span className="figure__sub">{caption}</span>}
      </figcaption>
      <div className="figure__svg">{children}</div>
    </figure>
  )
}

/* ---------------- Myocardial oxygen supply and demand ---------------- */
export function OxygenBalanceDiagram() {
  return (
    <Figure
      title="Myocardial oxygen supply and demand"
      caption="Antianginal therapy tips the balance: raise supply, lower demand."
    >
      <svg data-diagram="oxygen" viewBox="0 110 960 410" width="100%" style={{ display: 'block', minWidth: 620 }} role="img" aria-label="Balance of myocardial oxygen supply and demand" fontFamily="var(--font-sans)">
        <line x1="140" y1="152" x2="820" y2="196" stroke="var(--border-strong)" strokeWidth="7" strokeLinecap="round"></line>
        <polygon points="480,196 452,268 508,268" fill="var(--navy-200)"></polygon>
        <rect x="436" y="268" width="88" height="12" rx="6" fill="var(--border-strong)"></rect>
        <line x1="200" y1="156" x2="200" y2="212" stroke="var(--border-strong)" strokeWidth="2"></line>
        <line x1="760" y1="192" x2="760" y2="240" stroke="var(--border-strong)" strokeWidth="2"></line>

        <rect x="60" y="212" width="280" height="120" rx="16" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="84" y="240" fontSize="10.5" fontWeight="700" letterSpacing="1.4" fill="var(--text-mute)">OXYGEN DELIVERY</text>
        <text x="84" y="270" fontSize="21" fontWeight="600" fill="var(--text)">Supply</text>
        <text x="84" y="298" fontSize="13" fill="var(--text-soft)">Coronary blood flow</text>
        <text x="84" y="318" fontSize="13" fill="var(--text-soft)">Diastolic filling time</text>
        <circle cx="304" cy="248" r="17" fill="var(--surface)" stroke="var(--border-strong)"></circle>
        <text x="304" y="254" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--indication)">↑</text>

        <rect x="620" y="240" width="280" height="120" rx="16" fill="var(--sideeffect-bg)" stroke="var(--sideeffect)" strokeOpacity=".35"></rect>
        <text x="644" y="268" fontSize="10.5" fontWeight="700" letterSpacing="1.4" fill="var(--text-mute)">OXYGEN CONSUMPTION</text>
        <text x="644" y="298" fontSize="21" fontWeight="600" fill="var(--text)">Demand</text>
        <text x="644" y="326" fontSize="13" fill="var(--text-soft)">Heart rate, contractility</text>
        <text x="644" y="346" fontSize="13" fill="var(--text-soft)">Wall stress: preload, afterload</text>
        <circle cx="864" cy="276" r="17" fill="var(--surface)" stroke="var(--sideeffect)" strokeOpacity=".35"></circle>
        <text x="864" y="282" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--sideeffect)">↓</text>

        <text x="60" y="374" fontSize="10.5" fontWeight="700" letterSpacing="1.4" fill="var(--text-mute)">RAISED BY</text>
        <g transform="translate(60, 386)">
        <rect width="180" height="30" rx="9" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="90" y="20" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--dosing)">Coronary vasodilation</text>
        </g>
        <g transform="translate(250, 386)">
        <rect width="150" height="30" rx="9" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="75" y="20" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--dosing)">Longer diastole</text>
        </g>

        <text x="596" y="374" fontSize="10.5" fontWeight="700" letterSpacing="1.4" fill="var(--text-mute)">LOWERED BY</text>
        <g transform="translate(596, 386)">
        <rect width="136" height="30" rx="9" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="68" y="20" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--dosing)">Beta blockers</text>
        </g>
        <g transform="translate(742, 386)">
        <rect width="102" height="30" rx="9" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="51" y="20" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--dosing)">Nitrates</text>
        </g>
        <g transform="translate(854, 386)">
        <rect width="88" height="30" rx="9" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="44" y="20" textAnchor="middle" fontSize="12.5" fontWeight="600" fill="var(--dosing)">CCBs</text>
        </g>

        <g>
        <rect x="60" y="440" width="882" height="58" rx="14" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="84" y="476" fontSize="13.5" fill="var(--text-soft)">Ischemia appears when demand outruns supply — antianginal drugs work on whichever pan is loaded.</text>
        </g>
        </svg>
    </Figure>
  )
}

/* ---------------- Renin-angiotensin-aldosterone system ---------------- */
export function RaasDiagram() {
  return (
    <Figure
      title="Renin-angiotensin-aldosterone system"
      caption="ACE inhibitors block the conversion to angiotensin II; ARBs and ARNIs block the receptor."
    >
      <svg data-diagram="raas" viewBox="0 0 960 700" width="100%" style={{ display: 'block', minWidth: 620 }} role="img" aria-label="RAAS pathway with drug block points" fontFamily="var(--font-sans)">
        <defs>
        <marker id="raas-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9 z" fill="var(--text-mute)"></path>
        </marker>
        </defs>

        <rect x="350" y="36" width="260" height="60" rx="14" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="480" y="64" textAnchor="middle" fontSize="16" fontWeight="600" fill="var(--text)">Angiotensinogen</text>
        <text x="480" y="83" textAnchor="middle" fontSize="11.5" fill="var(--text-mute)">from the liver</text>

        <line x1="480" y1="96" x2="480" y2="166" stroke="var(--text-mute)" strokeWidth="2" markerEnd="url(#raas-arrow)"></line>
        <text x="336" y="130" textAnchor="end" fontSize="13" fontWeight="700" fill="var(--dosing)">Renin</text>
        <text x="336" y="148" textAnchor="end" fontSize="11.5" fill="var(--text-mute)">released by the kidney</text>

        <rect x="350" y="172" width="260" height="60" rx="14" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="480" y="208" textAnchor="middle" fontSize="16" fontWeight="600" fill="var(--text)">Angiotensin I</text>

        <line x1="480" y1="232" x2="480" y2="302" stroke="var(--text-mute)" strokeWidth="2" markerEnd="url(#raas-arrow)"></line>
        <text x="336" y="266" textAnchor="end" fontSize="13" fontWeight="700" fill="var(--dosing)">ACE</text>
        <text x="336" y="284" textAnchor="end" fontSize="11.5" fill="var(--text-mute)">pulmonary endothelium</text>

        <line x1="452" y1="270" x2="508" y2="270" stroke="var(--caution)" strokeWidth="3.5" strokeLinecap="round"></line>
        <line x1="512" y1="270" x2="556" y2="270" stroke="var(--caution)" strokeWidth="1.5" strokeDasharray="4 3"></line>
        <rect x="556" y="252" width="240" height="36" rx="10" fill="var(--caution-bg)" stroke="var(--caution)" strokeOpacity=".5"></rect>
        <text x="676" y="275" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--caution)">ACE inhibitors block here</text>

        <rect x="350" y="308" width="260" height="66" rx="14" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="480" y="341" textAnchor="middle" fontSize="16.5" fontWeight="600" fill="var(--text)">Angiotensin II</text>
        <text x="480" y="360" textAnchor="middle" fontSize="11.5" fill="var(--text-mute)">acting at the AT₁ receptor</text>

        <line x1="614" y1="341" x2="652" y2="341" stroke="var(--caution)" strokeWidth="3.5" strokeLinecap="round"></line>
        <rect x="656" y="323" width="270" height="36" rx="10" fill="var(--caution-bg)" stroke="var(--caution)" strokeOpacity=".5"></rect>
        <text x="791" y="346" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--caution)">ARB / ARNI block the receptor</text>

        <line x1="480" y1="374" x2="480" y2="404" stroke="var(--text-mute)" strokeWidth="2"></line>
        <line x1="175" y1="404" x2="785" y2="404" stroke="var(--text-mute)" strokeWidth="2"></line>
        <line x1="175" y1="404" x2="175" y2="418" stroke="var(--text-mute)" strokeWidth="2" markerEnd="url(#raas-arrow)"></line>
        <line x1="480" y1="404" x2="480" y2="418" stroke="var(--text-mute)" strokeWidth="2" markerEnd="url(#raas-arrow)"></line>
        <line x1="785" y1="404" x2="785" y2="418" stroke="var(--text-mute)" strokeWidth="2" markerEnd="url(#raas-arrow)"></line>

        <rect x="30" y="424" width="290" height="88" rx="14" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="175" y="462" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--text)">Vasoconstriction</text>
        <text x="175" y="486" textAnchor="middle" fontSize="12.5" fill="var(--text-soft)">raises afterload and blood pressure</text>

        <rect x="335" y="424" width="290" height="88" rx="14" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="480" y="462" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--text)">Aldosterone release</text>
        <text x="480" y="486" textAnchor="middle" fontSize="12.5" fill="var(--text-soft)">sodium and water retention, fibrosis</text>

        <rect x="640" y="424" width="290" height="88" rx="14" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="785" y="462" textAnchor="middle" fontSize="15" fontWeight="600" fill="var(--text)">Sympathetic activation</text>
        <text x="785" y="486" textAnchor="middle" fontSize="12.5" fill="var(--text-soft)">faster heart rate, more remodeling</text>

        <line x1="480" y1="512" x2="480" y2="528" stroke="var(--caution)" strokeWidth="1.5" strokeDasharray="4 3"></line>
        <rect x="335" y="528" width="290" height="36" rx="10" fill="var(--caution-bg)" stroke="var(--caution)" strokeOpacity=".5"></rect>
        <text x="480" y="551" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="var(--caution)">MRA (spironolactone) blocks this</text>

        <g>
        <rect x="30" y="596" width="900" height="80" rx="14" fill="var(--trial-bg)" stroke="var(--trial)" strokeOpacity=".35"></rect>
        <text x="54" y="624" fontSize="13" fontWeight="700" fill="var(--indication)">ARNI — sacubitril / valsartan</text>
        <text x="54" y="646" fontSize="12.5" fill="var(--text-soft)">Valsartan blocks the angiotensin II receptor while sacubitril inhibits neprilysin, so natriuretic</text>
        <text x="54" y="666" fontSize="12.5" fill="var(--text-soft)">peptides rise: natriuresis, diuresis, vasodilation, and less fibrosis.</text>
        </g>
        </svg>
    </Figure>
  )
}

/* ---------------- Where diuretics act in the nephron ---------------- */
export function NephronDiagram() {
  return (
    <Figure
      title="Where diuretics act in the nephron"
      caption="Each agent blocks sodium handling at a different segment."
    >
      <svg data-diagram="nephron" viewBox="0 40 960 495" width="100%" style={{ display: 'block', minWidth: 620 }} role="img" aria-label="Nephron with numbered diuretic sites of action" fontFamily="var(--font-sans)">
        <defs>
        <marker id="neph-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 1 L9 5 L0 9 z" fill="var(--text-mute)"></path>
        </marker>
        </defs>

        <path d="M154 112 q 22 -22 44 0 q 22 22 44 0 q 22 -22 44 0 C 316 112 330 128 330 158 V 358 A 34 34 0 0 0 398 358 V 158 C 398 128 412 112 442 112 q 20 -20 40 0 q 20 20 40 0 C 552 112 566 128 566 158 V 470"
         fill="none" stroke="var(--navy-300)" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M154 112 q 22 -22 44 0 q 22 22 44 0 q 22 -22 44 0 C 316 112 330 128 330 158 V 358 A 34 34 0 0 0 398 358 V 158 C 398 128 412 112 442 112 q 20 -20 40 0 q 20 20 40 0 C 552 112 566 128 566 158 V 470"
         fill="none" stroke="var(--surface)" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"></path>

        <circle cx="120" cy="112" r="34" fill="var(--indication-bg)" stroke="var(--trial)" strokeWidth="2"></circle>
        <circle cx="120" cy="112" r="17" fill="var(--sky-300)"></circle>
        <text x="120" y="176" textAnchor="middle" fontSize="12" fill="var(--text-mute)">Glomerulus</text>

        <line x1="566" y1="470" x2="566" y2="496" stroke="var(--text-mute)" strokeWidth="2" markerEnd="url(#neph-arrow)"></line>
        <text x="566" y="520" textAnchor="middle" fontSize="12" fill="var(--text-mute)">To urine</text>

        <g>
        <text x="220" y="72" textAnchor="middle" fontSize="12" fill="var(--text-mute)">Proximal convoluted tubule</text>
        <text x="312" y="266" textAnchor="end" fontSize="12" fill="var(--text-mute)">Descending limb</text>
        <text x="418" y="300" fontSize="12" fill="var(--text-mute)">Thick ascending limb</text>
        <text x="482" y="72" textAnchor="middle" fontSize="12" fill="var(--text-mute)">Distal tubule</text>
        <text x="524" y="418" textAnchor="end" fontSize="12" fill="var(--text-mute)">Collecting duct</text>
        </g>

        <circle cx="220" cy="112" r="15" fill="var(--navy-500)"></circle>
        <text x="220" y="117" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#fff">1</text>
        <circle cx="398" cy="240" r="15" fill="var(--navy-500)"></circle>
        <text x="398" y="245" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#fff">2</text>
        <circle cx="566" cy="380" r="15" fill="var(--navy-500)"></circle>
        <text x="566" y="385" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#fff">3</text>

        <rect x="620" y="72" width="310" height="268" rx="16" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="644" y="104" fontSize="10.5" fontWeight="700" letterSpacing="1.4" fill="var(--text-mute)">SITES OF ACTION</text>

        <circle cx="659" cy="142" r="13" fill="var(--navy-500)"></circle>
        <text x="659" y="147" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">1</text>
        <text x="684" y="138" fontSize="14" fontWeight="600" fill="var(--text)">SGLT2 inhibitors</text>
        <text x="684" y="158" fontSize="12" fill="var(--text-soft)">Proximal tubule: glucose and sodium</text>

        <circle cx="659" cy="210" r="13" fill="var(--navy-500)"></circle>
        <text x="659" y="215" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">2</text>
        <text x="684" y="206" fontSize="14" fontWeight="600" fill="var(--text)">Loop diuretics</text>
        <text x="684" y="226" fontSize="12" fill="var(--text-soft)">Thick ascending limb: Na⁺/K⁺/2Cl⁻</text>

        <circle cx="659" cy="278" r="13" fill="var(--navy-500)"></circle>
        <text x="659" y="283" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#fff">3</text>
        <text x="684" y="274" fontSize="14" fontWeight="600" fill="var(--text)">MRA (spironolactone)</text>
        <text x="684" y="294" fontSize="12" fill="var(--text-soft)">Collecting duct: aldosterone receptor</text>

        <g>
        <rect x="620" y="364" width="310" height="86" rx="14" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="644" y="396" fontSize="12.5" fill="var(--text-soft)">Loops relieve congestion; the MRA and</text>
        <text x="644" y="416" fontSize="12.5" fill="var(--text-soft)">SGLT2 inhibitor are the segments that</text>
        <text x="644" y="436" fontSize="12.5" fill="var(--text-soft)">also carry a mortality benefit in HFrEF.</text>
        </g>
        </svg>
    </Figure>
  )
}

/* ---------------- Cardiac action potential and antiarrhythmic classes ---------------- */
export function ActionPotentialDiagram() {
  return (
    <Figure
      title="Cardiac action potential and antiarrhythmic classes"
      caption="Each Vaughan-Williams class targets a different phase or current."
    >
      <svg data-diagram="ap" viewBox="0 0 960 560" width="100%" style={{ display: 'block', minWidth: 620 }} role="img" aria-label="Cardiac action potential with Vaughan-Williams class targets" fontFamily="var(--font-sans)">
        <rect x="198" y="70" width="204" height="270" fill="var(--surface-2)"></rect>
        <text x="300" y="88" textAnchor="middle" fontSize="11" letterSpacing=".08em" fill="var(--text-mute)">PLATEAU</text>

        <line x1="90" y1="130" x2="660" y2="130" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 4"></line>
        <line x1="90" y1="300" x2="660" y2="300" stroke="var(--border)" strokeWidth="1.5" strokeDasharray="5 4"></line>
        <text x="78" y="134" textAnchor="end" fontSize="11.5" fill="var(--text-mute)">0</text>
        <text x="78" y="304" textAnchor="end" fontSize="11.5" fill="var(--text-mute)">−85</text>
        <text x="46" y="200" fontSize="11.5" fill="var(--text-mute)" transform="rotate(-90 46 200)">mV</text>

        <line x1="90" y1="50" x2="90" y2="360" stroke="var(--border-strong)" strokeWidth="2"></line>
        <line x1="90" y1="360" x2="672" y2="360" stroke="var(--border-strong)" strokeWidth="2"></line>
        <text x="660" y="384" textAnchor="end" fontSize="11.5" fill="var(--text-mute)">time</text>

        <path d="M90 300 H152 L170 76 C178 68 188 110 198 122 C270 130 330 134 402 144 C430 152 448 250 472 296 C480 308 484 300 492 300 H660"
         fill="none" stroke="var(--dosing)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path>

        <line x1="152" y1="384" x2="472" y2="384" stroke="var(--navy-200)" strokeWidth="2"></line>
        <line x1="152" y1="378" x2="152" y2="390" stroke="var(--navy-200)" strokeWidth="2"></line>
        <line x1="472" y1="378" x2="472" y2="390" stroke="var(--navy-200)" strokeWidth="2"></line>
        <text x="312" y="406" textAnchor="middle" fontSize="11.5" fill="var(--text-mute)">Refractory period</text>

        <circle cx="161" cy="190" r="13" fill="var(--surface)" stroke="var(--caution)" strokeWidth="2"></circle>
        <text x="161" y="195" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--caution)">0</text>
        <circle cx="200" cy="100" r="13" fill="var(--surface)" stroke="var(--indication)" strokeWidth="2"></circle>
        <text x="200" y="105" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--indication)">1</text>
        <circle cx="300" cy="133" r="13" fill="var(--surface)" stroke="var(--dosing)" strokeWidth="2"></circle>
        <text x="300" y="138" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--dosing)">2</text>
        <circle cx="460" cy="258" r="13" fill="var(--surface)" stroke="var(--trial)" strokeWidth="2"></circle>
        <text x="460" y="263" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--trial)">3</text>
        <circle cx="600" cy="300" r="13" fill="var(--surface)" stroke="var(--teal-500)" strokeWidth="2"></circle>
        <text x="600" y="305" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--teal-500)">4</text>

        <rect x="700" y="60" width="230" height="280" rx="16" fill="var(--surface)" stroke="var(--border-strong)"></rect>
        <text x="722" y="92" fontSize="10" fontWeight="700" letterSpacing="1.3" fill="var(--text-mute)">VAUGHAN-WILLIAMS</text>

        <rect x="722" y="112" width="4" height="26" rx="2" fill="var(--caution)"></rect>
        <text x="738" y="122" fontSize="13.5" fontWeight="600" fill="var(--text)">Class I — Na⁺ channels</text>
        <text x="738" y="140" fontSize="11.5" fill="var(--text-soft)">Flecainide · phase 0 upstroke</text>

        <rect x="722" y="168" width="4" height="26" rx="2" fill="var(--teal-500)"></rect>
        <text x="738" y="178" fontSize="13.5" fontWeight="600" fill="var(--text)">Class II — beta blockade</text>
        <text x="738" y="196" fontSize="11.5" fill="var(--text-soft)">Metoprolol · phase 4, nodes</text>

        <rect x="722" y="224" width="4" height="26" rx="2" fill="var(--trial)"></rect>
        <text x="738" y="234" fontSize="13.5" fontWeight="600" fill="var(--text)">Class III — K⁺ channels</text>
        <text x="738" y="252" fontSize="11.5" fill="var(--text-soft)">Amiodarone · phase 3</text>

        <rect x="722" y="280" width="4" height="26" rx="2" fill="var(--dosing)"></rect>
        <text x="738" y="290" fontSize="13.5" fontWeight="600" fill="var(--text)">Class IV — Ca²⁺ channels</text>
        <text x="738" y="308" fontSize="11.5" fill="var(--text-soft)">Diltiazem · phase 2, AV node</text>

        <g>
        <rect x="90" y="440" width="840" height="86" rx="14" fill="var(--surface-2)" stroke="var(--border-strong)"></rect>
        <text x="114" y="472" fontSize="12.5" fill="var(--text-soft)">Phases: 0 upstroke · 1 early repolarization · 2 plateau · 3 repolarization · 4 resting membrane potential.</text>
        <text x="114" y="500" fontSize="13" fill="var(--text-soft)">Nodal cells depolarize through calcium rather than sodium, which is why beta blockers and diltiazem slow the sinus and AV nodes.</text>
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
