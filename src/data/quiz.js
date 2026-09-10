/*
 * Standalone question bank for the timed "Test my knowledge" mode.
 *
 * These questions are written to stand on their own, separate from the
 * case-based practice questions, so the timed test does not simply repeat what
 * the learner saw in the cases (see change spec J-01, J-04). Distractors are
 * kept plausible and options are similar in length so length does not signal
 * the key (J-02); the answer key is spread across positions with no long runs
 * of one letter (J-03).
 *
 * Each entry: { conditionId, stem, choices[], answer (index), explanation }.
 */

export const testBank = [
  {
    conditionId: 'acs',
    stem: 'Aspirin is given as 160 mg chewed in ACS. What is its mechanism?',
    choices: [
      'Reversibly blocks the P2Y₁₂ ADP receptor',
      'Directly inhibits factor Xa',
      'Irreversibly acetylates cyclooxygenase (blocks thromboxane A2)',
      'Blocks the funny (If) current in the sinus node',
    ],
    answer: 2,
    explanation:
      'Aspirin irreversibly acetylates COX and blocks thromboxane A2. Platelets lack a nucleus, so the effect lasts their lifespan.',
  },
  {
    conditionId: 'acs',
    stem: 'Which agents are given immediately in acute coronary syndrome?',
    choices: [
      'Beta blocker, statin, and ACE inhibitor',
      'Aspirin, a second antiplatelet, and heparin',
      'Spironolactone and an SGLT2 inhibitor',
      'An ARNI and ivabradine',
    ],
    answer: 1,
    explanation:
      'Aspirin, the second antiplatelet, and heparin are immediate. The beta blocker, statin, and ACE inhibitor usually follow within 24 hours.',
  },
  {
    conditionId: 'acs',
    stem: 'Who usually starts the beta blocker, statin, and ACE inhibitor after ACS?',
    choices: [
      'The emergency physician at triage',
      'The patient, at home before arrival',
      'A cardiology fellow, on consult',
      'The admitting resident, within 24 hours',
    ],
    answer: 3,
    explanation:
      'The emergency department gives the heparin and antiplatelets; the admitting resident usually starts the beta blocker, statin, and ACE inhibitor within 24 hours.',
  },
  {
    conditionId: 'acs',
    stem: 'Which adverse effect is specific to ticagrelor?',
    choices: [
      'Dyspnea',
      'Yellow-tinged vision',
      'Gynecomastia',
      'A persistent dry cough',
    ],
    answer: 0,
    explanation: 'Dyspnea is specific to ticagrelor. Bleeding is common to the whole antiplatelet class.',
  },
  {
    conditionId: 'stable-angina',
    stem: 'A patient with exertional chest pain has a normal resting ECG. This means:',
    choices: [
      'Coronary disease is ruled out',
      'Stable angina is still possible; changes appear with demand',
      'It is diagnostic of an acute STEMI',
      'It points to acute pericarditis',
    ],
    answer: 1,
    explanation:
      'Stable angina often has a normal resting ECG; changes appear only when oxygen demand rises, for example during a stress test.',
  },
  {
    conditionId: 'stable-angina',
    stem: 'How does a nitrate mainly relieve angina?',
    choices: [
      'It increases heart rate and contractility',
      'It blocks the platelet P2Y₁₂ receptor',
      'It inhibits hepatic HMG-CoA reductase',
      'Venodilation lowers preload and oxygen demand',
    ],
    answer: 3,
    explanation:
      'Nitrates become nitric oxide, raising cGMP; venodilation cuts preload and wall stress, lowering myocardial oxygen demand.',
  },
  {
    conditionId: 'heart-failure',
    stem: 'What is first-line RAAS therapy for HFrEF with EF under 40%?',
    choices: [
      'An ARNI, unless unaffordable or not tolerated',
      'An ACE inhibitor in every patient',
      'A loop diuretic used on its own',
      'A dihydropyridine calcium channel blocker',
    ],
    answer: 0,
    explanation:
      'The ARNI is now started first for EF under 40%; an ACE inhibitor is used when the ARNI is unaffordable, unavailable, or not tolerated.',
  },
  {
    conditionId: 'heart-failure',
    stem: 'How should the four GDMT pillars be started in HFrEF?',
    choices: [
      'One pillar at a time over months',
      'Only after diuretics have failed',
      'All four at low doses, introduced rapidly',
      'Only in patients who also have diabetes',
    ],
    answer: 2,
    explanation:
      'Current practice is to start all four pillars at minimal doses and introduce them rapidly, rather than the older stepwise approach.',
  },
  {
    conditionId: 'heart-failure',
    stem: 'Beyond glucose lowering, SGLT2 inhibitors provide:',
    choices: [
      'Weight gain and higher potassium',
      'Weight loss and renal protection',
      'A rise in LDL cholesterol',
      'Slowing of AV-node conduction',
    ],
    answer: 1,
    explanation:
      'SGLT2 inhibitors add weight loss, renal protection, and a mortality benefit in heart failure beyond their glucose effect.',
  },
  {
    conditionId: 'heart-failure',
    stem: 'In an ARNI, which part drives aldosterone suppression and vasodilation?',
    choices: [
      'The neprilysin inhibitor (sacubitril)',
      'The beta blocker component',
      'The SGLT2 inhibitor component',
      'The ARB component (valsartan)',
    ],
    answer: 3,
    explanation:
      'It is a combo pill: neprilysin inhibition gives natriuresis and diuresis, while the ARB gives aldosterone suppression, vasodilation, and less fibrosis.',
  },
  {
    conditionId: 'heart-failure',
    stem: 'Which heart failure therapy gives symptom relief with an unproven mortality benefit?',
    choices: [
      'An ACE inhibitor',
      'Spironolactone',
      'A loop diuretic',
      'An SGLT2 inhibitor',
    ],
    answer: 2,
    explanation:
      'Loop diuretics relieve congestion; they may help mortality but this is not proven. The RAAS agent, MRA, and SGLT2 inhibitor are the survival pillars.',
  },
  {
    conditionId: 'heart-failure',
    stem: 'Besides HFrEF, a current use of ivabradine is:',
    choices: [
      'Reaching target heart rate in the CT scanner',
      'Rate control in atrial fibrillation',
      'Reperfusion during an acute STEMI',
      'Long-term anticoagulation for stroke',
    ],
    answer: 0,
    explanation:
      'Ivabradine is now used to bring patients to target heart rate before CT imaging, and in post-COVID inappropriate sinus tachycardia. It does not work in AF.',
  },
  {
    conditionId: 'atrial-fibrillation',
    stem: 'What are the three goals of atrial fibrillation management?',
    choices: [
      'Rate, rhythm, and rest',
      'Anticoagulate, image, and ablate',
      'No stroke, prevent symptoms, protect the heart',
      'Lower LDL, blood pressure, and glucose',
    ],
    answer: 2,
    explanation:
      'The three goals: do not have a stroke, prevent symptoms, and do not wreck the heart (avoid tachycardia-induced cardiomyopathy).',
  },
  {
    conditionId: 'atrial-fibrillation',
    stem: 'Compared with warfarin, DOACs carry:',
    choices: [
      'Higher intracranial, lower GI bleeding',
      'Lower intracranial, higher GI bleeding',
      'A higher risk of both types',
      'A lower risk of both types',
    ],
    answer: 1,
    explanation:
      'DOACs have lower intracranial but higher GI bleeding than warfarin; warfarin is the reverse. This is why colitis can favour warfarin.',
  },
  {
    conditionId: 'atrial-fibrillation',
    stem: '"Do not wreck the heart" in atrial fibrillation refers to:',
    choices: [
      'Valvular damage from fibrillation',
      'Coronary vasospasm at fast rates',
      'A large pericardial effusion',
      'Tachycardia-induced cardiomyopathy',
    ],
    answer: 3,
    explanation:
      'Sustained fast rates dilate the ventricle (like a baggy sack), causing tachycardia-induced cardiomyopathy.',
  },
  {
    conditionId: 'atrial-fibrillation',
    stem: 'Why is diltiazem often preferred for AF in a young patient?',
    choices: [
      'It spares the sexual side effects of beta blockers',
      'It anticoagulates more effectively',
      'It uniquely works during fibrillation',
      'It leaves the AV node untouched',
    ],
    answer: 0,
    explanation:
      'A rate-limiting CCB avoids the impotence, poor libido, and low energy that beta blockers can cause in young patients.',
  },
  {
    conditionId: 'svt',
    stem: 'Does paroxysmal SVT require anticoagulation?',
    choices: [
      'Yes, the same as atrial fibrillation',
      'No, it lacks the thrombus risk of AF',
      'Only when the rate exceeds 150 bpm',
      'Only in patients over 65 years',
    ],
    answer: 1,
    explanation:
      'SVT does not form the intracardiac thrombus that drives anticoagulation in atrial fibrillation and flutter.',
  },
  {
    conditionId: 'atrial-fibrillation',
    stem: 'The -xaban stem in a DOAC name tells you the drug:',
    choices: [
      'Is manufactured in Japan',
      'Antagonizes vitamin K',
      'Inhibits factor Xa',
      'Is reversed with vitamin K',
    ],
    answer: 2,
    explanation:
      'The -xaban stem encodes factor Xa inhibition. All the DOACs follow the -xaban pattern except dabigatran (a thrombin inhibitor).',
  },
]

/** Build the flat MC bank for the timed test (standalone questions only). */
export function buildQuestionBank() {
  return testBank.map((q) => ({ ...q }))
}

/** Fisher-Yates shuffle (returns a new array). */
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
