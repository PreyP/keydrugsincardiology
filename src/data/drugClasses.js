/*
 * Canonical drug-class reference for the module.
 *
 * Content is drawn from the Queen's MEDS230 "Key Drugs in Cardiology" lectures
 * (Dr. Amar Thakrar) and the DIL case answer keys. Landmark trials are included
 * only where the source slides name them (currently CAST).
 *
 * Each drug class has:
 *   id, name, shortName, monogram (2-3 letters for the badge),
 *   examples[]   - representative agents
 *   mechanism    - how it works
 *   indications[]- conditions / reasons to prescribe
 *   dosing[]     - representative dosing (reference only; the course notes dosing
 *                  is secondary to knowing class / indication / adverse effects)
 *   sideEffects[]- key adverse effects, cautions flagged with `caution: true`
 *   trials[]     - landmark evidence { name, takeaway } (optional)
 *   pearls[]     - teaching pearls / mnemonics (optional)
 */

export const drugClasses = [
  {
    id: 'asa',
    name: 'Aspirin (Acetylsalicylic acid)',
    shortName: 'ASA',
    monogram: 'ASA',
    examples: ['Acetylsalicylic acid (ASA / ECASA)'],
    mechanism:
      'Irreversibly acetylates cyclooxygenase (COX), blocking synthesis of thromboxane A2 and therefore platelet aggregation. Because platelets have no nucleus they cannot make new COX, so the effect lasts the lifespan of the platelet.',
    indications: [
      'Acute coronary syndromes: reduces future fatal and nonfatal coronary events',
      'Primary and secondary prevention of ischemic events',
      'Part of first-line antianginal / antithrombotic therapy in stable coronary disease',
    ],
    dosing: [
      'ACS: 160 mg chewed and swallowed, then 81 mg orally once daily',
      'Chronic prevention: 81 mg orally once daily',
    ],
    sideEffects: [
      { text: 'Bleeding, particularly gastrointestinal', caution: true },
      { text: 'GI upset, nausea' },
      { text: 'Can exacerbate asthma or gout in sensitive patients' },
    ],
    pearls: ['Remembered in the ACS mnemonic ASA / APA / BETA / STATA / PRIL as the first "A".'],
  },
  {
    id: 'p2y12',
    name: 'Antiplatelet agents (P2Y₁₂ inhibitors)',
    shortName: 'Antiplatelet',
    monogram: 'AP',
    examples: ['Clopidogrel', 'Prasugrel', 'Ticagrelor'],
    mechanism:
      'Inhibit ADP-mediated platelet activation by blocking the P2Y₁₂ purinoreceptor. Given with aspirin as a second antiplatelet (dual antiplatelet therapy).',
    indications: [
      'ACS across the spectrum: unstable angina, NSTEMI, STEMI',
      'Significant reduction in adverse cardiovascular outcomes at the cost of increased bleeding',
      'Dual antiplatelet therapy when planning angiography / revascularization',
    ],
    dosing: [
      'Require a loading dose then maintenance',
      'e.g. Clopidogrel 300-600 mg load, then 75 mg daily',
      'e.g. Ticagrelor 180 mg load, then 90 mg twice daily',
    ],
    sideEffects: [
      { text: 'Bleeding', caution: true },
      { text: 'Dyspepsia, diarrhea' },
      { text: 'Dyspnea, specific to ticagrelor' },
    ],
  },
  {
    id: 'beta-blocker',
    name: 'Beta-adrenergic receptor blockers',
    shortName: 'Beta blockers',
    monogram: 'β',
    examples: ['Bisoprolol', 'Metoprolol', 'Carvedilol', 'Labetalol', 'Acebutolol'],
    mechanism:
      'Block beta-adrenergic receptors: decrease chronotropy, inotropy, and conduction velocity, and reduce adverse remodeling from chronic beta-adrenergic stimulation in heart failure. By lowering heart rate, contractility, and arterial pressure they reduce myocardial oxygen demand, improving the supply/demand ratio in angina. Subtypes differ: some add vasodilation (labetalol, carvedilol), some have intrinsic sympathomimetic activity that lowers heart rate less (acebutolol), and some are beta-1 selective (less bronchoconstriction, useful in asthmatics).',
    badges: ['GDMT pillar'],
    indications: [
      'Acute coronary syndrome and post-MI (mortality reduction, less remodeling and arrhythmia)',
      'Congestive heart failure (HFrEF): one of the four pillars of guideline-directed medical therapy (GDMT)',
      'Tachyarrhythmias, including rate control',
      'Hypertrophic cardiomyopathy',
      'Angina',
      'Hypertension (effective but not a preferred first-line pick)',
    ],
    dosing: [
      'Bisoprolol 2.5 mg orally once daily',
      'Metoprolol 25 mg orally twice daily, up to 100 mg twice daily',
      'Labetalol is the beta blocker of choice in pregnancy: 100 mg orally twice daily, up to 400 mg orally three times daily',
    ],
    sideEffects: [
      { text: 'Bradycardia', caution: true },
      { text: 'Hypotension; can cause orthostasis/presyncope in young normotensive patients', caution: true },
      { text: 'Low mood / depression, fatigue' },
      { text: 'Sexual dysfunction / impotence' },
    ],
    pearls: [
      'In heart failure the primary benefit is neurohormonal blockade, preventing chronic overstimulation and negative remodeling, not just rate control.',
    ],
  },
  {
    id: 'statin',
    name: 'Statins (HMG-CoA reductase inhibitors)',
    shortName: 'Statins',
    monogram: 'ST',
    examples: ['Rosuvastatin', 'Atorvastatin', 'Simvastatin'],
    mechanism:
      'Inhibit HMG-CoA reductase and reduce hepatic cholesterol synthesis. This upregulates LDL receptors (clearing LDL from the circulation), clears LDL precursors (VLDLs) more rapidly, and lowers hepatic VLDL production (so less LDL and triglyceride). Pleiotropic effects include plaque stabilization, enhanced nitric oxide synthesis, and suppression of inflammation.',
    indications: [
      'Anyone with established vascular disease, regardless of baseline cholesterol',
      'Secondary prevention after ACS, with mortality reduction',
      'Primary prevention in high-risk patients to reduce coronary events',
    ],
    dosing: [
      'High-intensity after ACS, e.g. Atorvastatin 80 mg daily or Rosuvastatin 20-40 mg daily',
    ],
    sideEffects: [
      { text: 'Myalgias and myopathy; rhabdomyolysis is very rare', caution: true },
      { text: 'Mild GI upset' },
      { text: 'Hepatotoxicity, small risk, higher with excess alcohol' },
    ],
  },
  {
    id: 'ace-inhibitor',
    name: 'ACE inhibitors',
    shortName: 'ACE inhibitors',
    monogram: 'ACE',
    examples: ['Enalapril', 'Ramipril', 'Perindopril'],
    mechanism:
      'Inhibit angiotensin-converting enzyme, preventing conversion of angiotensin I to angiotensin II. This decreases vasoconstriction, decreases sodium retention (via less aldosterone), and decreases sympathetic activity. Afterload reduction raises cardiac output and drives favourable remodeling.',
    badges: ['GDMT pillar (RAAS)'],
    indications: [
      'Improve survival after myocardial infarction',
      'Heart failure (HFrEF): now second-line to the ARNI, which is started first for EF under 40%. Use an ACE inhibitor if the ARNI is unaffordable, unavailable, or not tolerated.',
      'Excellent antihypertensives',
    ],
    dosing: ['e.g. Ramipril 2.5-10 mg daily; titrate to target as tolerated'],
    sideEffects: [
      { text: 'Hyperkalemia', caution: true },
      { text: 'Renal insufficiency', caution: true },
      { text: 'Teratogenicity, contraindicated in pregnancy', caution: true },
      { text: 'Hypotension' },
      { text: 'Dry cough' },
      { text: 'Rare: angioedema, agranulocytosis', caution: true },
    ],
  },
  {
    id: 'nitrate',
    name: 'Nitrates (Nitroglycerin)',
    shortName: 'Nitrates',
    monogram: 'NTG',
    examples: ['Nitroglycerin (patch, sublingual, IV, paste)', 'Isosorbide mono/dinitrate'],
    mechanism:
      'Converted to nitric oxide, raising cGMP and relaxing vascular smooth muscle. Venodilation reduces preload and therefore wall stress and myocardial oxygen demand; systemic vasodilation reduces afterload. Both effects reduce angina.',
    indications: [
      'Angina (symptomatic relief)',
      'Hypertension',
      'Acute relief of pulmonary congestion',
    ],
    dosing: [
      'Patch 0.4 mg/hr, on at 0800 and off at 2200 to give a nitrate-free interval and avoid tolerance',
      'Sublingual for acute episodes; IV acutely; oral chronically',
    ],
    sideEffects: [
      { text: 'Headache' },
      { text: 'Hypotension', caution: true },
      { text: 'Avoid with recent PDE-5 inhibitor use and use caution in inferior / right ventricular MI', caution: true },
    ],
  },
  {
    id: 'morphine',
    name: 'Morphine',
    shortName: 'Morphine',
    monogram: 'M',
    examples: ['Morphine'],
    mechanism: 'Opioid analgesic and anxiolytic with venodilator effect.',
    indications: [
      'Symptom relief in ACS (listed in the guidelines) though falling out of favour',
    ],
    dosing: ['Small IV boluses titrated to pain / distress'],
    sideEffects: [
      { text: 'Slows gastric emptying, delaying absorption and peak effect of oral antiplatelet agents', caution: true },
      { text: 'May mask symptoms' },
      { text: 'Hypotension, respiratory depression, nausea' },
    ],
    pearls: ['Part of the classic "MONA" mnemonic, but increasingly de-emphasized because it delays antiplatelet action.'],
  },
  {
    id: 'ccb',
    name: 'Calcium channel blockers',
    shortName: 'CCBs',
    monogram: 'CCB',
    examples: [
      'Non-dihydropyridines: Diltiazem, Verapamil',
      'Dihydropyridines: Amlodipine, Nifedipine',
    ],
    mechanism:
      'Cardio-depressant and vasodilatory. Systemic vasodilation reduces arterial pressure and ventricular afterload, lowering oxygen demand. The rate-limiting non-dihydropyridines (verapamil, diltiazem) are negative inotropes and chronotropes that further reduce demand and slow AV-node conduction. CCBs also dilate coronary arteries and can prevent or reverse coronary vasospasm.',
    indications: [
      'Angina',
      'Supraventricular tachycardia and rate control (non-dihydropyridines, via AV-node slowing)',
      'Atrial fibrillation rate control (the non-dihydropyridines act as Class IV antiarrhythmics)',
      'Drug of choice for atrial fibrillation in young patients, because it avoids the sexual side effects of beta blockers (impotence, poor libido, poor energy)',
      'Hypertension',
      'Coronary vasospasm',
    ],
    dosing: [
      'Diltiazem 240 mg (long acting) orally once daily',
      'Verapamil 80 mg orally three times daily',
    ],
    sideEffects: [
      { text: 'Peripheral edema' },
      { text: 'Hypotension' },
      { text: 'Bradycardia with non-dihydropyridines', caution: true },
      { text: 'Constipation (verapamil)' },
      { text: 'Avoid non-dihydropyridines in structurally abnormal hearts or congestive heart failure', caution: true },
    ],
  },
  {
    id: 'loop-diuretic',
    name: 'Loop diuretics',
    shortName: 'Loop diuretics',
    monogram: 'LOOP',
    examples: ['Furosemide (Lasix)'],
    mechanism:
      'Act in the thick ascending loop of Henle, impairing sodium reabsorption so more sodium (and water) is delivered distally and excreted. In heart failure this counters the salt and water retention that drives edema and pulmonary congestion.',
    indications: [
      'Symptomatic relief of congestion and edema in heart failure',
      'Volume overload states',
    ],
    dosing: ['Dose titrated to volume status; "Lasix" = "lasts six" hours as a memory aid'],
    sideEffects: [
      { text: 'Hypokalemia, hypomagnesemia', caution: true },
      { text: 'Intravascular volume depletion' },
      { text: 'Ototoxicity at high doses' },
    ],
    pearls: ['Symptomatic relief only; loop diuretics do not confer a mortality benefit in heart failure.'],
  },
  {
    id: 'mra',
    name: 'Mineralocorticoid receptor antagonists',
    shortName: 'MRA (Spironolactone)',
    monogram: 'MRA',
    examples: ['Spironolactone', 'Eplerenone'],
    mechanism:
      'A synthetic steroid that competes for the aldosterone receptor (a potassium-sparing aldosterone blocker). Inhibits sodium reabsorption in the distal tubule (a weak diuretic) while retaining potassium, and has cardiac anti-remodeling effects.',
    badges: ['GDMT pillar'],
    indications: [
      'HFrEF with EF < 35% and NYHA class II-IV, with a mortality benefit: one of the four pillars of GDMT',
    ],
    dosing: ['e.g. Spironolactone 12.5-25 mg daily; monitor potassium and renal function'],
    sideEffects: [
      { text: 'Hyperkalemia, can be life-threatening', caution: true },
      { text: 'Gynecomastia' },
      { text: 'Menstrual irregularities' },
    ],
  },
  {
    id: 'digoxin',
    name: 'Cardiac glycosides (Digoxin)',
    shortName: 'Digoxin',
    monogram: 'DIG',
    examples: ['Digoxin (from Digitalis purpurea)'],
    mechanism:
      'Inhibits the Na/K ATPase, raising intracellular calcium available to the sarcoplasmic reticulum and increasing contractile force (positive inotrope). Also slows transmission of atrial impulses through the AV node and prolongs AV-node refractoriness.',
    indications: [
      'Systolic heart failure: symptom benefit and fewer hospitalizations, but no mortality reduction',
      'Atrial fibrillation rate control, useful in the still-hospitalized hypotensive patient because it is relatively blood-pressure neutral',
      'Rarely SVT (children, pregnant patients)',
    ],
    dosing: ['Narrow therapeutic index; dose to effect and monitor levels'],
    sideEffects: [
      { text: 'AV block, proarrhythmic effect', caution: true },
      { text: 'Xanthopsia (yellow-tinged vision)' },
      { text: 'Nausea, vomiting' },
      { text: 'Toxicity is potentiated by hypokalemia', caution: true },
    ],
  },
  {
    id: 'arni',
    name: 'Angiotensin receptor-neprilysin inhibitor (ARNI)',
    shortName: 'ARNI (Entresto)',
    monogram: 'ARNI',
    examples: ['Sacubitril / Valsartan (Entresto)'],
    mechanism:
      'A combination pill of an ARB and a neprilysin inhibitor. Because it is a combo, the two components do different things: neprilysin inhibition raises natriuretic peptides, giving natriuresis and diuresis, while the ARB component provides aldosterone suppression, vasodilation, and inhibition of fibrosis.',
    badges: ['GDMT pillar (RAAS)'],
    indications: [
      'HFrEF, NYHA class II-IV: started first for EF under 40% (first-line RAAS pillar, ahead of an ACE inhibitor)',
      'Replaces the ACE inhibitor when a patient remains symptomatic on an ACE inhibitor plus beta blocker',
    ],
    dosing: [
      'When switching, discontinue the ACE inhibitor for at least 36 hours first to avoid serious hypotension and angioedema',
    ],
    sideEffects: [
      { text: 'Hypotension', caution: true },
      { text: 'Hyperkalemia' },
      { text: 'Contraindicated with a history of angioedema (see the omapatrilat story)', caution: true },
    ],
  },
  {
    id: 'ivabradine',
    name: 'Ivabradine',
    shortName: 'Ivabradine',
    monogram: 'IVA',
    examples: ['Ivabradine (Corlanor, Lancora)'],
    mechanism:
      'Selective inhibitor of the "funny" (If) current in the sinus node, slowing the sinus rate without affecting contractility. It does not work in atrial fibrillation because it acts on the SA node.',
    indications: [
      'HFrEF with LVEF <= 35% in sinus rhythm and resting heart rate > 70 bpm, when a patient cannot tolerate a goal beta-blocker dose or has worsening symptoms',
      'New: rate control in the CT scanner, to bring patients to a target heart rate before imaging',
      'Post-COVID inappropriate sinus tachycardia (autonomic dysfunction with sinus tachycardia)',
    ],
    dosing: ['Titrated to a target resting heart rate'],
    sideEffects: [
      { text: 'Bradycardia', caution: true },
      { text: 'Phosphenes (transient luminous visual phenomena)' },
      { text: 'Atrial fibrillation' },
    ],
  },
  {
    id: 'sglt2',
    name: 'SGLT2 inhibitors',
    shortName: 'SGLT2 inhibitors',
    monogram: 'SGLT',
    examples: ['Dapagliflozin', 'Empagliflozin', 'Canagliflozin'],
    mechanism:
      'Block the sodium-glucose cotransporter 2 in the proximal tubule, which normally reabsorbs about 90% of filtered glucose. This increases urinary glucose excretion and produces a diuretic effect, along with weight loss, renal (kidney) protection, and mortality reduction in heart failure through mechanisms beyond glucose lowering.',
    badges: ['GDMT pillar'],
    indications: [
      'HFrEF, with additional mortality reduction: one of the four pillars of GDMT',
      'Heart failure with non-reduced (preserved) ejection fraction. The non-reduced regimen is an MRA, an SGLT2 inhibitor, a GLP-1 agonist, plus blood-pressure control.',
      'Type 2 diabetes',
    ],
    dosing: ['Once daily, fixed dose'],
    sideEffects: [
      { text: 'Genital mycotic infections' },
      { text: 'Volume depletion' },
      { text: 'Euglycemic diabetic ketoacidosis (rare)', caution: true },
    ],
  },
  {
    id: 'anticoagulant-acs',
    name: 'Parenteral anticoagulants (ACS)',
    shortName: 'Anticoagulants',
    monogram: 'AC',
    examples: ['Low molecular weight heparin (enoxaparin)', 'Fondaparinux', 'Unfractionated heparin'],
    mechanism:
      'Potentiate antithrombin to inhibit thrombin and factor Xa, limiting propagation of coronary thrombus during acute coronary syndromes.',
    indications: ['Adjunctive antithrombotic therapy in the acute management of ACS'],
    dosing: ['Weight-based; agent chosen by presentation and planned invasive strategy'],
    sideEffects: [
      { text: 'Bleeding', caution: true },
      { text: 'Heparin-induced thrombocytopenia (with heparins)', caution: true },
    ],
    pearls: ['Part of initial ACS management alongside oxygen (if hypoxic), morphine, and nitrates.'],
  },
  {
    id: 'doac',
    name: 'Direct oral anticoagulants (DOAC / NOAC)',
    shortName: 'DOACs',
    monogram: 'DOAC',
    examples: ['Rivaroxaban', 'Apixaban', 'Edoxaban', 'Dabigatran'],
    mechanism:
      'Directly inhibit a single clotting factor: factor Xa (rivaroxaban, apixaban, edoxaban) or thrombin (dabigatran). Predictable effect without routine monitoring.',
    indications: [
      'Stroke prevention in non-valvular atrial fibrillation',
      'Treatment and prevention of DVT / PE',
    ],
    dosing: ['Fixed dosing, adjusted for renal function and specific agent'],
    sideEffects: [
      { text: 'Bleeding, major and minor', caution: true },
      { text: 'Dabigatran: nausea / GI upset' },
      { text: 'Historically limited antidote availability, offset by a short half-life' },
      {
        text: 'Contraindicated with mechanical valves, rheumatic / valvular AF, and significant liver or renal dysfunction',
        caution: true,
      },
    ],
    pearls: [
      'Preferred over warfarin in most non-valvular AF, but warfarin may be chosen when bleeding risk needs a reversible, monitorable agent.',
      'Naming mnemonic: the -xaban stem encodes the mechanism, since Xa = factor Xa inhibitor (edoxaban: "Edo," made in Japan). All the DOACs follow the -xaban pattern except dabigatran.',
    ],
  },
  {
    id: 'warfarin',
    name: 'Warfarin',
    shortName: 'Warfarin',
    monogram: 'WARF',
    examples: ['Warfarin'],
    mechanism:
      'Antagonizes vitamin K epoxide reductase, which is required to recycle vitamin K for activation of clotting factors II, VII, IX, and X (and proteins C and S). Onset is delayed 2 to 7 days and the half-life is long.',
    indications: [
      'Mechanical heart valves',
      'Severe LV dysfunction and LV thrombus',
      'DVT / PE',
      'Atrial fibrillation stroke prevention, particularly when a reversible, monitorable agent is preferred',
    ],
    dosing: ['Dose titrated to the INR (target INR 2-3 for most AF indications)'],
    sideEffects: [
      { text: 'Bleeding, reversible with vitamin K, prothrombin complex concentrate (Octaplex), or fresh frozen plasma', caution: true },
      { text: 'Numerous drug and dietary (vitamin K) interactions requiring INR monitoring' },
    ],
    pearls: ['Monitored by the INR. Still the agent of choice for mechanical valves and valvular AF where DOACs are contraindicated.'],
  },
  {
    id: 'class-ic',
    name: 'Class Ic antiarrhythmics',
    shortName: 'Class Ic',
    monogram: 'Ic',
    examples: ['Flecainide', 'Propafenone'],
    mechanism:
      'Potent sodium-channel blockers that markedly slow the upstroke of the action potential and conduction velocity in atrial, ventricular, and Purkinje fibres.',
    indications: [
      'Rhythm control in atrial fibrillation in patients without structural heart disease or ischemia',
    ],
    dosing: ['Started after structural heart disease and ischemia are excluded (e.g. stress testing)'],
    sideEffects: [
      { text: 'Do not use in structural heart disease or ischemia (CAST trial)', caution: true },
      { text: 'Can cause 1:1 conduction of atrial flutter across the AV node (rates up to 300 bpm), so pair with a beta blocker or calcium channel blocker', caution: true },
      { text: 'Can potentiate heart failure', caution: true },
      { text: 'Flecainide: CNS effects including confusion, dizziness, taste disturbance' },
    ],
    trials: [
      {
        name: 'CAST trial (Cardiac Arrhythmia Suppression Trial)',
        takeaway:
          'Mortality increased in post-MI patients treated with Class Ic agents (encainide, moricizine). A landmark lesson that suppressing arrhythmia is not the same as improving survival, and why Class Ic drugs are avoided in structural heart disease.',
      },
    ],
  },
  {
    id: 'class-iii',
    name: 'Class III antiarrhythmics',
    shortName: 'Class III',
    monogram: 'III',
    examples: ['Amiodarone', 'Sotalol'],
    mechanism:
      'Block the outward potassium current and prolong the action potential in ventricular (Purkinje) fibres.',
    indications: [
      'Atrial fibrillation and atrial flutter',
      'Supraventricular tachycardia',
      'Ventricular arrhythmia, VF / cardiac arrest',
    ],
    dosing: ['Amiodarone is not eliminated by the kidney; requires ongoing organ monitoring'],
    sideEffects: [
      { text: 'Amiodarone has multiple tissue toxicities: monitor TSH, chest X-ray, LFTs, and ECG for QT prolongation', caution: true },
      { text: 'Amiodarone affects the skin, liver, thyroid, lung (pulmonary fibrosis), heart, and eye (corneal deposits)', caution: true },
      { text: 'QT prolongation (both agents)', caution: true },
    ],
    pearls: [
      'Amiodarone is effective across a broad range of arrhythmias but its long-term toxicity profile demands regular monitoring.',
      'It is not eliminated by the kidney: the classic exam point. Everything else clears it, which is why so many organ systems are affected.',
    ],
  },
  {
    id: 'tafamidis',
    name: 'Tafamidis',
    shortName: 'Tafamidis',
    monogram: 'TAF',
    examples: ['Tafamidis'],
    badges: ['New / emerging'],
    mechanism:
      'A transthyretin (TTR) stabilizer: binds TTR and keeps it from misfolding and depositing as amyloid in the heart.',
    indications: [
      'Transthyretin amyloid cardiomyopathy (ATTR amyloidosis)',
    ],
    dosing: ['Once daily, oral'],
    sideEffects: [
      { text: 'Generally well tolerated' },
    ],
    pearls: [
      'New and up-and-coming treatment for cardiac amyloidosis. (Gene silencers for amyloid also exist but are beyond the scope of this module.)',
    ],
  },
  {
    id: 'myosin-inhibitor',
    name: 'Cardiac myosin inhibitors',
    shortName: 'Myosin inhibitors',
    monogram: 'CMI',
    examples: ['Mavacamten', 'Aficamten'],
    badges: ['New / emerging'],
    mechanism:
      'A cardiac myosin inhibitor that prevents excess actin-myosin cross-bridge formation, reducing hypercontractility and relieving left ventricular outflow tract obstruction.',
    indications: [
      'Obstructive hypertrophic cardiomyopathy (HCM) only, not non-obstructive HCM',
      'Works regardless of gene-positive or gene-negative status',
    ],
    dosing: ['Titrated with echo monitoring of EF and of the outflow tract obstruction'],
    sideEffects: [
      { text: 'Drops the ejection fraction (a negative inotrope): requires EF monitoring by echo. The interval was every 3 months, now up to 6 months, and is currently unsettled.', caution: true },
      { text: 'Monitor the left ventricular outflow tract obstruction', caution: true },
      { text: 'Few other side effects' },
    ],
    pearls: [
      'The first genuinely engineered drug for a cardiac illness; it can spare patients open-heart surgery to resect septal muscle.',
      'It is not yet known whether the muscle itself shrinks. Only 2 to 3 years on the market, it appears to affect contraction only for now.',
      'Aficamten: approved in the EU in 2026; under review and not yet approved in Canada.',
    ],
  },
]

export const drugClassById = Object.fromEntries(drugClasses.map((d) => [d.id, d]))
