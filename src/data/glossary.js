/*
 * Glossary that powers the hover "bubbles" (Amboss-style hovertext).
 *
 * Each entry:
 *   id         stable key
 *   term       canonical display term
 *   aliases[]  other strings that should trigger the same bubble (matched
 *              case-insensitively on word boundaries)
 *   def        short definition (kept consistent with the course material)
 *   link       optional { type: 'drug' | 'condition', id } deep link
 *   practice   optional conditionId to offer a "Practise" link
 *
 * Definitions are intentionally brief. They restate concepts already present in
 * the MEDS230 lectures and DIL cases rather than adding new clinical claims.
 */

export const glossary = [
  // Physiology / pharmacology concepts
  {
    id: 'preload',
    term: 'preload',
    def: 'The volume-related stretch on the ventricle before contraction. Nitrates and diuretics lower it, reducing wall stress and myocardial oxygen demand.',
  },
  {
    id: 'afterload',
    term: 'afterload',
    def: 'The resistance the ventricle pumps against. Reducing it (for example with an ACE inhibitor) improves cardiac output and lowers oxygen demand.',
  },
  {
    id: 'inotropy',
    term: 'inotropy',
    aliases: ['inotrope', 'inotropes', 'negative inotrope', 'positive inotrope'],
    def: 'The force of cardiac contraction. Positive inotropes increase it (digoxin); negative inotropes decrease it (beta blockers, non-dihydropyridine CCBs).',
  },
  {
    id: 'chronotropy',
    term: 'chronotropy',
    aliases: ['chronotrope', 'chronotropes'],
    def: 'The heart rate. Negative chronotropic drugs slow the rate, reducing oxygen demand and allowing more diastolic filling.',
  },
  {
    id: 'remodeling',
    term: 'remodeling',
    aliases: ['remodelling', 'anti-remodeling', 'antiremodeling', 'cardiac remodeling'],
    def: 'Structural change in the heart under chronic stress. Blocking maladaptive remodeling is a key survival benefit of beta blockers, ACE inhibitors, and MRAs in heart failure.',
  },
  {
    id: 'oxygen-demand',
    term: 'oxygen demand',
    aliases: ['myocardial oxygen demand', 'supply demand', 'supply/demand', 'supply and demand'],
    def: 'Angina reflects a mismatch between myocardial oxygen supply and demand. Antianginal therapy works by maximizing supply and minimizing demand.',
  },
  {
    id: 'lvef',
    term: 'ejection fraction',
    aliases: ['LVEF', 'EF', 'left ventricular ejection fraction'],
    def: 'The fraction of blood ejected from the left ventricle per beat. A reduced EF (for example under 35%) defines HFrEF and drives eligibility for several therapies.',
  },
  {
    id: 'nyha',
    term: 'NYHA class',
    aliases: ['NYHA', 'NYHA II', 'NYHA III', 'NYHA II-IV', 'NYHA III, IV'],
    def: 'New York Heart Association functional classification of heart failure symptoms, from class I (none) to class IV (symptoms at rest).',
  },
  {
    id: 'ccs',
    term: 'CCS class',
    aliases: ['Canadian Cardiovascular Society', 'CCS class II'],
    def: 'Canadian Cardiovascular Society grading of angina severity by the level of exertion that provokes symptoms.',
  },

  // Signs / symptoms
  {
    id: 'orthopnea',
    term: 'orthopnea',
    def: 'Breathlessness lying flat, relieved by sitting up. A sign of pulmonary congestion in heart failure.',
  },
  {
    id: 'pnd',
    term: 'paroxysmal nocturnal dyspnea',
    aliases: ['PND'],
    def: 'Sudden breathlessness waking a patient from sleep, a classic symptom of decompensated heart failure.',
  },
  {
    id: 'jvp',
    term: 'JVP',
    aliases: ['jugular venous pressure'],
    def: 'Jugular venous pressure, an estimate of right atrial pressure. Elevation suggests volume overload.',
  },

  // Diagnoses (link to conditions)
  {
    id: 'acs',
    term: 'acute coronary syndrome',
    aliases: ['ACS'],
    def: 'The spectrum of unstable angina, NSTEMI, and STEMI caused by acute plaque rupture and thrombus.',
    link: { type: 'condition', id: 'acs' },
    practice: 'acs',
  },
  {
    id: 'stemi',
    term: 'STEMI',
    def: 'ST-elevation myocardial infarction, a full-thickness coronary occlusion needing urgent reperfusion.',
    link: { type: 'condition', id: 'acs' },
  },
  {
    id: 'nstemi',
    term: 'NSTEMI',
    aliases: ['non-ST-elevation', 'unstable angina'],
    def: 'Non-ST-elevation ACS, managed with antithrombotic therapy and risk stratification.',
    link: { type: 'condition', id: 'acs' },
  },
  {
    id: 'hfref',
    term: 'HFrEF',
    aliases: ['heart failure with reduced ejection fraction', 'systolic dysfunction', 'congestive heart failure', 'CHF'],
    def: 'Heart failure with reduced ejection fraction, a pump problem treated with guideline-directed survival therapy plus diuretics for symptoms.',
    link: { type: 'condition', id: 'heart-failure' },
    practice: 'heart-failure',
  },
  {
    id: 'af',
    term: 'atrial fibrillation',
    aliases: ['AF', 'atrial flutter'],
    def: 'An irregular atrial rhythm that risks left atrial appendage thrombus and stroke. Management is anticoagulation plus rate or rhythm control.',
    link: { type: 'condition', id: 'atrial-fibrillation' },
    practice: 'atrial-fibrillation',
  },
  {
    id: 'svt',
    term: 'supraventricular tachycardia',
    aliases: ['SVT', 'AVNRT', 'AVRT'],
    def: 'A regular narrow-complex tachycardia often terminated by vagal maneuvers. Treated with AV-nodal agents; anticoagulation is not indicated.',
    link: { type: 'condition', id: 'svt' },
    practice: 'svt',
  },

  // Mechanistic terms (many link to a drug class)
  {
    id: 'thromboxane',
    term: 'thromboxane A2',
    def: 'A platelet activator whose synthesis aspirin blocks by irreversibly acetylating cyclooxygenase.',
    link: { type: 'drug', id: 'asa' },
  },
  {
    id: 'cox',
    term: 'cyclooxygenase',
    aliases: ['COX'],
    def: 'The enzyme aspirin irreversibly acetylates. Platelets cannot remake it, so the antiplatelet effect lasts their lifespan.',
    link: { type: 'drug', id: 'asa' },
  },
  {
    id: 'p2y12r',
    term: 'P2Y₁₂ purinoreceptor',
    aliases: ['P2Y₁₂ purinoreceptor', 'P2Y₁₂ receptor', 'P2Y₁₂', 'P2Y12 purinoreceptor', 'P2Y12 receptor', 'P2Y12'],
    def: 'The platelet ADP receptor blocked by clopidogrel, prasugrel, and ticagrelor (the second antiplatelet given with aspirin).',
    link: { type: 'drug', id: 'p2y12' },
  },
  {
    id: 'dapt',
    term: 'dual antiplatelet therapy',
    aliases: ['DAPT'],
    def: 'Aspirin combined with a second antiplatelet (a P2Y₁₂ inhibitor), used in ACS and around coronary revascularization.',
    link: { type: 'drug', id: 'p2y12' },
  },
  {
    id: 'avnode',
    term: 'AV node',
    aliases: ['atrioventricular node', 'AV-node', 'AV nodal', 'AV-nodal'],
    def: 'The electrical relay between atria and ventricles. Slowing it (beta blockers, non-dihydropyridine CCBs, digoxin) controls ventricular rate in AF and terminates SVT.',
  },
  {
    id: 'sanode',
    term: 'sinus node',
    aliases: ['SA node', 'sinoatrial node'],
    def: 'The heart’s natural pacemaker. Ivabradine slows it selectively through the funny current.',
    link: { type: 'drug', id: 'ivabradine' },
  },
  {
    id: 'ifcurrent',
    term: 'funny current',
    aliases: ['If', 'I funny', 'Ifunny', 'funny (If) channel', 'funny (If) current'],
    def: 'The pacemaker current in the sinus node. Ivabradine inhibits it to slow heart rate without affecting contractility.',
    link: { type: 'drug', id: 'ivabradine' },
    practice: 'heart-failure',
    questionId: 'q-ivabradine',
  },
  {
    id: 'raas',
    term: 'angiotensin',
    aliases: ['angiotensin II', 'renin-angiotensin', 'RAAS', 'RAS'],
    def: 'The renin-angiotensin-aldosterone system that raises blood pressure and drives remodeling. ACE inhibitors and ARNIs interrupt it.',
    link: { type: 'drug', id: 'ace-inhibitor' },
  },
  {
    id: 'aldosterone',
    term: 'aldosterone',
    def: 'A hormone promoting sodium retention and cardiac fibrosis. Spironolactone blocks its receptor for a survival benefit in HFrEF.',
    link: { type: 'drug', id: 'mra' },
  },
  {
    id: 'neprilysin',
    term: 'neprilysin',
    aliases: ['natriuretic peptides'],
    def: 'An enzyme that degrades natriuretic peptides. Inhibiting it (the sacubitril in an ARNI) promotes natriuresis and vasodilation.',
    link: { type: 'drug', id: 'arni' },
  },
  {
    id: 'hmgcoa',
    term: 'HMG-CoA reductase',
    def: 'The rate-limiting enzyme of hepatic cholesterol synthesis that statins inhibit, upregulating LDL receptors.',
    link: { type: 'drug', id: 'statin' },
  },
  {
    id: 'ldl',
    term: 'LDL',
    aliases: ['LDL cholesterol', 'VLDL'],
    def: 'Low-density lipoprotein, the atherogenic cholesterol carrier that statins clear by raising hepatic LDL-receptor activity.',
    link: { type: 'drug', id: 'statin' },
  },
  {
    id: 'no',
    term: 'nitric oxide',
    aliases: ['cGMP'],
    def: 'The vasodilator signal nitrates generate, raising cGMP to relax vascular smooth muscle and lower preload.',
    link: { type: 'drug', id: 'nitrate' },
  },
  {
    id: 'laa',
    term: 'left atrial appendage',
    def: 'The usual site of thrombus formation in atrial fibrillation; clot here can embolize and cause stroke.',
    link: { type: 'condition', id: 'atrial-fibrillation' },
  },
  {
    id: 'dhp',
    term: 'dihydropyridine',
    aliases: ['dihydropyridines', 'non-dihydropyridine', 'non-dihydropyridines', 'non dihydropyridine'],
    def: 'The two CCB families. Dihydropyridines (amlodipine) are vasodilators; non-dihydropyridines (diltiazem, verapamil) also slow the AV node.',
    link: { type: 'drug', id: 'ccb' },
  },
  {
    id: 'inr',
    term: 'INR',
    aliases: ['international normalized ratio'],
    def: 'The lab test used to titrate warfarin, typically targeted to 2 to 3 for atrial fibrillation.',
    link: { type: 'drug', id: 'warfarin' },
  },
  {
    id: 'vker',
    term: 'vitamin K epoxide reductase',
    def: 'The enzyme warfarin antagonizes, blocking activation of clotting factors II, VII, IX, and X.',
    link: { type: 'drug', id: 'warfarin' },
  },
  {
    id: 'loading',
    term: 'loading dose',
    def: 'A large first dose used to reach a therapeutic effect quickly, as required for the second antiplatelet (P2Y₁₂ inhibitor) in ACS.',
  },

  // Adverse effects worth a bubble
  {
    id: 'hyperk',
    term: 'hyperkalemia',
    def: 'A high serum potassium that can be life-threatening. A key risk of ACE inhibitors, ARNIs, and spironolactone.',
  },
  {
    id: 'gynecomastia',
    term: 'gynecomastia',
    def: 'Breast tissue enlargement, a class effect of spironolactone because of its steroid structure.',
    link: { type: 'drug', id: 'mra' },
  },
  {
    id: 'xanthopsia',
    term: 'xanthopsia',
    def: 'Yellow-tinged vision, a classic sign of digoxin toxicity.',
    link: { type: 'drug', id: 'digoxin' },
  },
  {
    id: 'phosphenes',
    term: 'phosphenes',
    def: 'Transient flashes of light, a recognized visual side effect of ivabradine.',
    link: { type: 'drug', id: 'ivabradine' },
  },
  {
    id: 'ototox',
    term: 'ototoxicity',
    def: 'Hearing or balance injury, a risk of high-dose loop diuretics.',
    link: { type: 'drug', id: 'loop-diuretic' },
  },
  {
    id: 'terato',
    term: 'teratogenicity',
    aliases: ['teratogenic'],
    def: 'The potential to cause fetal harm. ACE inhibitors and ARNIs are contraindicated in pregnancy.',
  },
  {
    id: 'angioedema',
    term: 'angioedema',
    def: 'Deep tissue swelling that can obstruct the airway. A contraindication to ARNIs and a rare ACE-inhibitor effect.',
  },

  // Trials
  {
    id: 'cast',
    term: 'CAST trial',
    aliases: ['CAST', 'Cardiac Arrhythmia Suppression Trial'],
    def: 'The Cardiac Arrhythmia Suppression Trial: Class Ic agents increased mortality after MI, so they are avoided in structural heart disease.',
    link: { type: 'drug', id: 'class-ic' },
    practice: 'atrial-fibrillation',
    questionId: 'q-cast',
  },
  {
    id: 'plaque-rupture',
    term: 'plaque rupture',
    def: 'The trigger of acute coronary syndrome: an atherosclerotic plaque ruptures and a thrombus forms on it, acutely limiting coronary flow.',
    link: { type: 'condition', id: 'acs' },
  },
  {
    id: 'vasospasm',
    term: 'coronary vasospasm',
    aliases: ['vasospasm'],
    def: 'Reversible constriction of a coronary artery. Calcium channel blockers can prevent or reverse it, including catheter-induced spasm.',
    link: { type: 'drug', id: 'ccb' },
  },
  {
    id: 'secondary-prevention',
    term: 'secondary prevention',
    def: 'Reducing further events in someone with established vascular disease, for example aspirin and a statin after ACS.',
  },
  {
    id: 'primary-prevention',
    term: 'primary prevention',
    def: 'Preventing a first cardiovascular event in a higher-risk person who has not yet had one.',
  },
  {
    id: 'vagal',
    term: 'vagal maneuvers',
    def: 'Techniques that increase vagal tone to slow AV-node conduction and can terminate SVT, such as breath-holding or leg raising.',
    link: { type: 'condition', id: 'svt' },
  },
  {
    id: 'ablation',
    term: 'ablation',
    def: 'A catheter procedure that destroys the arrhythmia circuit. Often pursued when SVT or AF is refractory to drugs.',
  },
  {
    id: 'structural',
    term: 'structural heart disease',
    def: 'A structurally abnormal heart (for example prior infarct or reduced EF). It contraindicates Class Ic antiarrhythmics and rate-limiting CCBs in heart failure.',
  },
  {
    id: 'pleiotropic',
    term: 'pleiotropic effects',
    aliases: ['pleiotropic'],
    def: 'Benefits of statins beyond LDL lowering: plaque stabilization, more nitric oxide, and less inflammation.',
    link: { type: 'drug', id: 'statin' },
  },
  {
    id: 'orthostasis',
    term: 'orthostasis',
    aliases: ['orthostatic', 'presyncope', 'presyncopal'],
    def: 'A drop in blood pressure on standing, causing lightheadedness. A risk when giving rate or blood-pressure lowering drugs to young normotensive patients.',
  },
  {
    id: 'bradycardia',
    term: 'bradycardia',
    def: 'A slow heart rate. A dose-limiting effect of beta blockers, non-dihydropyridine CCBs, digoxin, and ivabradine.',
  },
  {
    id: 'holter',
    term: 'Holter monitor',
    aliases: ['holter'],
    def: 'A continuous ambulatory ECG (often 24 hours) used to capture and characterize intermittent arrhythmias.',
  },
]

// Build a fast lookup and a matching regex.
export const glossaryById = Object.fromEntries(glossary.map((g) => [g.id, g]))

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// All triggerable strings, longest first so multi-word terms win over substrings.
const triggers = glossary
  .flatMap((g) => [g.term, ...(g.aliases || [])].map((t) => ({ text: t, id: g.id })))
  .sort((a, b) => b.text.length - a.text.length)

export const termToId = Object.fromEntries(triggers.map((t) => [t.text.toLowerCase(), t.id]))

// One regex that matches any trigger on a word boundary.
export const glossaryRegex = new RegExp(
  '\\b(' + triggers.map((t) => escape(t.text)).join('|') + ')\\b',
  'gi',
)
