/*
 * Side-by-side comparison tables (Amboss-style high-yield matrices).
 *
 * Each table:
 *   id, title, blurb
 *   related[]   condition ids the table is relevant to (used to embed it on
 *               the matching Learn pages and to tag it on the Compare page)
 *   headers[]   column headers; the first is the row-label column
 *   rows[][]    each row is an array of cell strings aligned to headers
 *
 * Content stays consistent with the MEDS230 lectures and DIL cases.
 */

export const comparisons = [
  {
    id: 'doac-vs-warfarin',
    title: 'DOAC versus warfarin',
    blurb: 'Choosing an anticoagulant for stroke prevention in atrial fibrillation.',
    related: ['atrial-fibrillation'],
    headers: ['', 'DOACs', 'Warfarin'],
    rows: [
      ['Examples', 'Apixaban, rivaroxaban, edoxaban, dabigatran', 'Warfarin'],
      ['Target', 'Factor Xa or thrombin, directly', 'Vitamin K epoxide reductase (factors II, VII, IX, X)'],
      ['Monitoring', 'None routine, fixed dosing', 'INR, target 2 to 3'],
      ['Onset', 'Rapid', 'Delayed 2 to 7 days'],
      ['Reversal', 'Agent-specific, historically limited; short half-life', 'Vitamin K, prothrombin complex (Octaplex), or FFP'],
      ['Avoid in', 'Mechanical valves, rheumatic/valvular AF, significant liver or renal disease', 'Relative: high bleeding risk needing a stable, monitorable agent may still favour it'],
    ],
  },
  {
    id: 'hfref-pillars',
    title: 'The four survival pillars of HFrEF',
    blurb: 'Guideline-directed therapy that improves mortality, separate from diuretics for symptoms.',
    related: ['heart-failure'],
    headers: ['Pillar', 'Example', 'Key benefit', 'Watch for'],
    rows: [
      ['ACE inhibitor or ARNI', 'Ramipril; sacubitril/valsartan', 'Afterload reduction, positive remodeling; ARNI adds natriuresis', 'Hyperkalemia, cough (ACEi), angioedema; 36 h washout when switching to ARNI'],
      ['Beta blocker', 'Bisoprolol, metoprolol, carvedilol', 'Neurohormonal blockade, less adverse remodeling', 'Bradycardia, hypotension, fatigue'],
      ['MRA', 'Spironolactone, eplerenone', 'Anti-remodeling, mortality benefit at EF < 35%', 'Hyperkalemia, gynecomastia'],
      ['SGLT2 inhibitor', 'Dapagliflozin, empagliflozin', 'Diuresis plus mortality reduction beyond glucose lowering', 'Genital infections, volume depletion'],
    ],
  },
  {
    id: 'rate-vs-rhythm',
    title: 'Rate versus rhythm control in AF',
    blurb: 'The second decision in atrial fibrillation, after anticoagulation.',
    related: ['atrial-fibrillation'],
    headers: ['', 'Rate control', 'Rhythm control'],
    rows: [
      ['Goal', 'Slow the ventricular response', 'Restore and maintain sinus rhythm'],
      ['Typical drugs', 'Beta blocker, non-dihydropyridine CCB, digoxin', 'Class Ic (flecainide, propafenone) or Class III (amiodarone, sotalol)'],
      ['Key caveat', 'Beta blocker avoided in asthma; digoxin is rate-limiting but BP-neutral', 'Class Ic contraindicated in structural heart disease (CAST); exclude ischemia first'],
    ],
  },
  {
    id: 'ccb-nondhp-vs-dhp',
    title: 'Calcium channel blockers: non-DHP versus DHP',
    blurb: 'The two CCB families behave very differently at the AV node.',
    related: ['stable-angina', 'svt', 'atrial-fibrillation'],
    headers: ['', 'Non-dihydropyridine', 'Dihydropyridine'],
    rows: [
      ['Examples', 'Diltiazem, verapamil', 'Amlodipine, nifedipine'],
      ['AV node', 'Slows conduction (negative chronotrope/inotrope)', 'Little effect; mainly vasodilators'],
      ['Main uses', 'Angina, rate control in AF and SVT', 'Hypertension, angina'],
      ['Avoid in', 'Structurally abnormal hearts or heart failure', 'Reflex tachycardia possible with short-acting agents'],
    ],
  },
  {
    id: 'antiplatelets',
    title: 'Antiplatelets: aspirin versus P2Y12 inhibitors',
    blurb: 'The two arms of dual antiplatelet therapy in ACS.',
    related: ['acs', 'stable-angina'],
    headers: ['', 'Aspirin', 'P2Y12 inhibitors'],
    rows: [
      ['Examples', 'Acetylsalicylic acid', 'Clopidogrel, prasugrel, ticagrelor'],
      ['Target', 'Cyclooxygenase (blocks thromboxane A2)', 'P2Y12 ADP receptor'],
      ['Reversibility', 'Irreversible', 'Irreversible (clopidogrel, prasugrel), reversible (ticagrelor)'],
      ['Loading dose', '160 mg chewed', 'Yes, agent-specific'],
      ['Notable adverse effect', 'GI bleeding', 'Bleeding; dyspnea with ticagrelor'],
    ],
  },
]

export const comparisonsById = Object.fromEntries(comparisons.map((c) => [c.id, c]))
export function comparisonsForCondition(conditionId) {
  return comparisons.filter((c) => c.related.includes(conditionId))
}
