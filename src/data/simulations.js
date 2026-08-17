/*
 * Branching case simulations: a small state machine where each choice gives
 * feedback and leads to the next node. Consequences follow the course teaching
 * (for example, the CAST lesson about Class Ic in structural heart disease).
 *
 * Node shape:
 *   { prompt, choices: [{ label, tone: 'good'|'bad'|'neutral', feedback, next }] }
 * A node with `terminal: true` ends the case with a summary.
 */

export const simulations = [
  {
    id: 'af-decision',
    title: 'Mrs. AF: work the atrial fibrillation decisions',
    conditionId: 'atrial-fibrillation',
    intro:
      '67 year old with symptomatic paroxysmal AF up to 180 bpm. She has ulcerative colitis (on methotrexate) and asthma. Echo shows mild left atrial dilatation with normal ventricular function; the ECG suggests LVH.',
    start: 'anticoag',
    nodes: {
      anticoag: {
        prompt: 'First decision: does she need anticoagulation for stroke prevention?',
        choices: [
          {
            label: 'Yes, start anticoagulation',
            tone: 'good',
            feedback: 'Correct. She is over 65 and the LVH points to likely hypertension, both raising stroke risk.',
            next: 'anticoag-choice',
          },
          {
            label: 'No, she is low risk',
            tone: 'bad',
            feedback: 'Her age and likely hypertension raise her stroke risk. Anticoagulation is indicated. Let us choose an agent.',
            next: 'anticoag-choice',
          },
        ],
      },
      'anticoag-choice': {
        prompt: 'Which anticoagulant, given her ulcerative colitis and GI bleeding risk?',
        choices: [
          {
            label: 'Warfarin, targeted to INR 2 to 3',
            tone: 'good',
            feedback: 'Reasonable here. With her colitis and higher GI bleeding risk, a reversible, monitorable agent was preferred by the GI team.',
            next: 'rate',
          },
          {
            label: 'A DOAC',
            tone: 'neutral',
            feedback: 'DOACs are first-line in most non-valvular AF, but her GI bleeding risk led the team to prefer warfarin in this case.',
            next: 'rate',
          },
        ],
      },
      rate: {
        prompt: 'Now for rate control. Which agent fits her best?',
        choices: [
          {
            label: 'A beta blocker',
            tone: 'bad',
            feedback: 'Her asthma makes a beta blocker a poor choice. A rate-limiting calcium channel blocker is safer.',
            next: 'rate-retry',
          },
          {
            label: 'Diltiazem (rate-limiting CCB)',
            tone: 'good',
            feedback: 'Good choice. It slows the AV node without the bronchospasm risk of a beta blocker.',
            next: 'antiarr',
          },
        ],
      },
      'rate-retry': {
        prompt: 'Choose a rate-control agent that avoids bronchospasm.',
        choices: [
          {
            label: 'Diltiazem (rate-limiting CCB)',
            tone: 'good',
            feedback: 'Yes. Long-acting diltiazem was started for rate control.',
            next: 'antiarr',
          },
        ],
      },
      antiarr: {
        prompt: 'She stays symptomatic on diltiazem. She has NOT yet had a stress test. You want rhythm control. What now?',
        choices: [
          {
            label: 'Start flecainide (Class Ic) now',
            tone: 'bad',
            feedback: 'Careful. The CAST trial showed Class Ic agents raise mortality in structural heart disease. You must exclude ischemia and structural disease first.',
            next: 'stress',
          },
          {
            label: 'Order a stress test first',
            tone: 'good',
            feedback: 'Right. Exclude structural disease and ischemia before starting a Class Ic agent.',
            next: 'stress',
          },
          {
            label: 'Start amiodarone',
            tone: 'neutral',
            feedback: 'Amiodarone is an option and is safe in structural disease, but its long-term toxicities argue for trying a cleaner agent when the heart is structurally normal.',
            next: 'stress',
          },
        ],
      },
      stress: {
        prompt: 'The stress test shows no scar or ischemia and normal LV function. Now choose rhythm control.',
        choices: [
          {
            label: 'Flecainide (Class Ic)',
            tone: 'good',
            feedback: 'Appropriate now that structural disease and ischemia are excluded. She was started on flecainide.',
            next: 'end',
          },
          {
            label: 'Avoid all antiarrhythmics',
            tone: 'neutral',
            feedback: 'Rhythm control is reasonable given ongoing symptoms; with a structurally normal heart, flecainide is a good option.',
            next: 'end',
          },
        ],
      },
      end: {
        terminal: true,
        tone: 'good',
        prompt: 'She was started on flecainide, converted to sinus rhythm, and stayed there. You anticoagulated for stroke prevention, controlled rate safely around her asthma, and excluded structural disease before a Class Ic agent, exactly as the CAST lesson requires.',
      },
    },
  },
]

export const simulationsById = Object.fromEntries(simulations.map((s) => [s.id, s]))
export function simulationsForCondition(conditionId) {
  return simulations.filter((s) => s.conditionId === conditionId)
}
