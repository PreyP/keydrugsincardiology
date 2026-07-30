/*
 * Canonical drug-class reference for the module.
 *
 * Content is drawn from the Queen's MEDS230 "Key Drugs in Cardiology" lectures
 * (Dr. Amar Thakrar) and the DIL case answer keys. Landmark trials marked
 * `addedBeyondSource: true` were added from standard cardiology references
 * (they are not named in the source slides) so they can be verified or swapped.
 *
 * Each drug class has:
 *   id, name, shortName, monogram (2-3 letters for the badge),
 *   examples[]   - representative agents
 *   mechanism    - how it works
 *   indications[]- conditions / reasons to prescribe
 *   dosing[]     - representative dosing (reference only; the course notes dosing
 *                  is secondary to knowing class / indication / adverse effects)
 *   sideEffects[]- key adverse effects, cautions flagged with `caution: true`
 *   trials[]     - landmark evidence { name, takeaway, addedBeyondSource? }
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
    trials: [
      {
        name: 'ISIS-2 (1988)',
        takeaway:
          'Aspirin in acute MI reduced vascular mortality, with benefit additive to thrombolysis. A foundation of antiplatelet therapy in ACS.',
        addedBeyondSource: true,
      },
    ],
    pearls: ['Remembered in the ACS mnemonic ASA / APA / BETA / STATA / PRIL as the first "A".'],
  },
  {
    id: 'p2y12',
    name: 'P2Y12 inhibitors',
    shortName: 'P2Y12',
    monogram: 'P2Y',
    examples: ['Clopidogrel', 'Prasugrel', 'Ticagrelor'],
    mechanism:
      'Inhibit ADP-mediated platelet activation by blocking the P2Y12 purinoreceptor. Clopidogrel and prasugrel bind irreversibly; ticagrelor binds reversibly. Given with aspirin as dual antiplatelet therapy.',
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
    trials: [
      {
        name: 'PLATO (2009)',
        takeaway:
          'Ticagrelor reduced cardiovascular death, MI, and stroke versus clopidogrel in ACS, with more non-procedural bleeding.',
        addedBeyondSource: true,
      },
      {
        name: 'CURE (2001)',
        takeaway: 'Clopidogrel added to aspirin reduced ischemic events in non-ST-elevation ACS.',
        addedBeyondSource: true,
      },
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
    indications: [
      'Acute coronary syndrome and post-MI (mortality reduction, less remodeling and arrhythmia)',
      'Congestive heart failure (HFrEF)',
      'Tachyarrhythmias, including rate control',
      'Hypertrophic cardiomyopathy',
      'Angina',
      'Hypertension (effective but not a preferred first-line pick)',
    ],
    dosing: [
      'Bisoprolol 2.5 mg orally once daily',
      'Metoprolol 25 mg orally twice daily, up to 100 mg twice daily',
    ],
    sideEffects: [
      { text: 'Bradycardia', caution: true },
      { text: 'Hypotension; can cause orthostasis/presyncope in young normotensive patients', caution: true },
      { text: 'Low mood / depression, fatigue' },
      { text: 'Sexual dysfunction / impotence' },
    ],
    trials: [
      {
        name: 'MERIT-HF (1999)',
        takeaway: 'Metoprolol succinate reduced mortality in HFrEF.',
        addedBeyondSource: true,
      },
      {
        name: 'CIBIS-II (1999)',
        takeaway: 'Bisoprolol reduced mortality in HFrEF.',
        addedBeyondSource: true,
      },
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
    trials: [
      {
        name: '4S (1994)',
        takeaway:
          'Simvastatin reduced mortality in patients with coronary disease, establishing statins for secondary prevention.',
        addedBeyondSource: true,
      },
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
    indications: [
      'Improve survival after myocardial infarction',
      'Congestive heart failure (HFrEF), a cornerstone therapy',
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
    trials: [
      {
        name: 'SOLVD (1991)',
        takeaway: 'Enalapril reduced mortality and hospitalization in HFrEF.',
        addedBeyondSource: true,
      },
      {
        name: 'HOPE (2000)',
        takeaway: 'Ramipril reduced cardiovascular events in high-risk vascular patients.',
        addedBeyondSource: true,
      },
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
      'Sublingual for acute episodes; IV acutely; oral or paste chronically',
    ],
    sideEffects: [
      { text: 'Headache' },
      { text: 'Hypotension', caution: true },
      { text: 'Avoid with recent PDE-5 inhibitor use and use caution in inferior / right ventricular MI', caution: true },
    ],
    trials: [
      {
        name: 'GISSI-3 / ISIS-4',
        takeaway:
          'Nitrates relieve symptoms but did not show a mortality benefit in acute MI; they are used for symptom control.',
        addedBeyondSource: true,
      },
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
    indications: [
      'HFrEF with EF < 35% and NYHA class II-IV, with a mortality benefit',
    ],
    dosing: ['e.g. Spironolactone 12.5-25 mg daily; monitor potassium and renal function'],
    sideEffects: [
      { text: 'Hyperkalemia, can be life-threatening', caution: true },
      { text: 'Gynecomastia' },
      { text: 'Menstrual irregularities' },
    ],
    trials: [
      {
        name: 'RALES (1999)',
        takeaway: 'Spironolactone reduced mortality in severe HFrEF.',
        addedBeyondSource: true,
      },
      {
        name: 'EMPHASIS-HF (2011)',
        takeaway: 'Eplerenone reduced mortality and hospitalization in mild (NYHA II) HFrEF.',
        addedBeyondSource: true,
      },
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
    trials: [
      {
        name: 'DIG trial (1997)',
        takeaway: 'Digoxin reduced heart failure hospitalizations but was mortality-neutral.',
        addedBeyondSource: true,
      },
    ],
  },
  {
    id: 'arni',
    name: 'Angiotensin receptor-neprilysin inhibitor (ARNI)',
    shortName: 'ARNI (Entresto)',
    monogram: 'ARNI',
    examples: ['Sacubitril / Valsartan (Entresto)'],
    mechanism:
      'Combines an ARB with neprilysin inhibition. Neprilysin inhibition raises natriuretic peptides, producing natriuresis, diuresis, aldosterone suppression, vasodilation, and inhibition of fibrosis.',
    indications: [
      'HFrEF, NYHA class II-IV',
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
    trials: [
      {
        name: 'PARADIGM-HF (2014)',
        takeaway: 'Sacubitril/valsartan was superior to enalapril for cardiovascular death and HF hospitalization in HFrEF.',
        addedBeyondSource: true,
      },
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
    ],
    dosing: ['Titrated to a target resting heart rate'],
    sideEffects: [
      { text: 'Bradycardia', caution: true },
      { text: 'Phosphenes (transient luminous visual phenomena)' },
      { text: 'Atrial fibrillation' },
    ],
    trials: [
      {
        name: 'SHIFT (2010)',
        takeaway: 'Ivabradine reduced heart failure hospitalizations in HFrEF patients in sinus rhythm with HR >= 70.',
        addedBeyondSource: true,
      },
    ],
  },
  {
    id: 'sglt2',
    name: 'SGLT2 inhibitors',
    shortName: 'SGLT2 inhibitors',
    monogram: 'SGLT',
    examples: ['Dapagliflozin', 'Empagliflozin', 'Canagliflozin'],
    mechanism:
      'Block the sodium-glucose cotransporter 2 in the proximal tubule, which normally reabsorbs about 90% of filtered glucose. This increases urinary glucose excretion and produces a diuretic effect, along with mortality reduction in heart failure through mechanisms beyond glucose lowering.',
    indications: [
      'HFrEF, with additional mortality reduction',
      'Type 2 diabetes',
    ],
    dosing: ['Once daily, fixed dose'],
    sideEffects: [
      { text: 'Genital mycotic infections' },
      { text: 'Volume depletion' },
      { text: 'Euglycemic diabetic ketoacidosis (rare)', caution: true },
    ],
    trials: [
      {
        name: 'DAPA-HF (2019)',
        takeaway: 'Dapagliflozin reduced worsening heart failure and cardiovascular death in HFrEF, including patients without diabetes.',
        addedBeyondSource: true,
      },
      {
        name: 'EMPEROR-Reduced (2020)',
        takeaway: 'Empagliflozin reduced cardiovascular death or HF hospitalization in HFrEF.',
        addedBeyondSource: true,
      },
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
    trials: [
      {
        name: 'RE-LY, ROCKET-AF, ARISTOTLE',
        takeaway:
          'DOACs were non-inferior or superior to warfarin for stroke prevention in atrial fibrillation with less intracranial bleeding.',
        addedBeyondSource: true,
      },
    ],
    pearls: ['Preferred over warfarin in most non-valvular AF, but warfarin may be chosen when bleeding risk needs a reversible, monitorable agent.'],
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
      { text: 'QT prolongation (both agents)', caution: true },
    ],
    pearls: ['Amiodarone is effective across a broad range of arrhythmias but its long-term toxicity profile demands regular monitoring.'],
  },
]

export const drugClassById = Object.fromEntries(drugClasses.map((d) => [d.id, d]))
