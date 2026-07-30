/*
 * Question bank for the timed "Test my knowledge" mode.
 *
 * The bank is the union of:
 *   1. every multiple-choice question attached to a condition's practice cases, and
 *   2. the extra standalone recall questions below (broad coverage of the classes).
 *
 * Each entry is tagged with its conditionId so results can be reviewed by topic.
 */

import { conditions } from './conditions.js'

const extraQuestions = [
  {
    conditionId: 'heart-failure',
    stem: 'Digoxin improves symptoms and reduces hospitalizations in systolic heart failure. What is its effect on mortality?',
    choices: ['Reduces mortality', 'Increases mortality', 'Mortality neutral', 'Not studied'],
    answer: 2,
    explanation:
      'Digoxin gives a symptomatic benefit and fewer hospitalizations but is mortality neutral (the DIG trial). It is relatively blood-pressure neutral, useful for AF rate control in a hospitalized hypotensive patient.',
  },
  {
    conditionId: 'heart-failure',
    stem: 'How do SGLT2 inhibitors produce a diuretic effect?',
    choices: [
      'By blocking the aldosterone receptor',
      'By blocking sodium reabsorption in the loop of Henle',
      'By blocking glucose (and sodium) reabsorption in the proximal tubule, causing osmotic diuresis',
      'By antagonizing vitamin K',
    ],
    answer: 2,
    explanation:
      'SGLT2 normally reabsorbs about 90% of filtered glucose in the proximal tubule. Blocking it increases urinary glucose excretion and produces a diuretic effect, with mortality reduction in HFrEF.',
  },
  {
    conditionId: 'acs',
    stem: 'Which agent irreversibly acetylates cyclooxygenase?',
    choices: ['Clopidogrel', 'Aspirin', 'Ticagrelor', 'Rivaroxaban'],
    answer: 1,
    explanation:
      'Aspirin irreversibly acetylates COX. Clopidogrel and prasugrel irreversibly block P2Y12, while ticagrelor blocks P2Y12 reversibly.',
  },
  {
    conditionId: 'acs',
    stem: 'Beta blockers reduce myocardial oxygen demand primarily by:',
    choices: [
      'Increasing preload',
      'Lowering heart rate, contractility, and arterial pressure',
      'Dilating coronary arteries directly',
      'Raising cardiac output through positive inotropy',
    ],
    answer: 1,
    explanation:
      'By reducing heart rate, contractility, and arterial pressure, beta blockers reduce cardiac work and oxygen demand. In heart failure they also blunt adverse remodeling.',
  },
  {
    conditionId: 'atrial-fibrillation',
    stem: 'Which anticoagulant is monitored by the INR?',
    choices: ['Apixaban', 'Dabigatran', 'Warfarin', 'Rivaroxaban'],
    answer: 2,
    explanation:
      'Warfarin antagonizes vitamin K epoxide reductase and is monitored by the INR. The DOACs are given at fixed doses without routine monitoring.',
  },
  {
    conditionId: 'atrial-fibrillation',
    stem: 'Amiodarone requires monitoring of several organs because of its tissue toxicities. Which set is most appropriate?',
    choices: [
      'INR only',
      'TSH, chest X-ray, liver function, and ECG for QT',
      'Potassium and digoxin level',
      'No monitoring is required',
    ],
    answer: 1,
    explanation:
      'Amiodarone has multiple tissue toxicities, so monitor thyroid (TSH), lungs (chest X-ray), liver (LFTs), and the ECG for QT prolongation. It is not eliminated by the kidney.',
  },
  {
    conditionId: 'stable-angina',
    stem: 'Which calcium channel blockers are the rate-limiting (non-dihydropyridine) agents that slow the AV node?',
    choices: [
      'Amlodipine and felodipine',
      'Diltiazem and verapamil',
      'Nifedipine and amlodipine',
      'Ramipril and perindopril',
    ],
    answer: 1,
    explanation:
      'Diltiazem and verapamil are the non-dihydropyridines. They are negative inotropes and chronotropes that slow AV-node conduction, unlike the dihydropyridines (amlodipine, nifedipine).',
  },
  {
    conditionId: 'heart-failure',
    stem: 'An ACE inhibitor is contraindicated in which situation?',
    choices: ['Post-MI', 'Hypertension', 'Pregnancy', 'HFrEF'],
    answer: 2,
    explanation:
      'ACE inhibitors are teratogenic and contraindicated in pregnancy. Other adverse effects include hyperkalemia, cough, renal insufficiency, and rarely angioedema.',
  },
]

/** Build the flat MC bank from conditions + extras. */
export function buildQuestionBank() {
  const fromCases = []
  for (const c of conditions) {
    for (const pc of c.practiceCases || []) {
      for (const q of pc.questions) {
        if (q.type === 'mc') {
          fromCases.push({
            conditionId: c.id,
            stem: q.stem,
            choices: q.choices,
            answer: q.answer,
            explanation: q.explanation,
          })
        }
      }
    }
  }
  return [...fromCases, ...extraQuestions]
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
