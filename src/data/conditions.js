/*
 * Conditions for the module, grouped by the lecture's own framing:
 *   Ischemic (Plumbing), Rhythm (Electrical), Pump.
 *
 * Each condition references drug classes by id (see drugClasses.js), carries a
 * worked "sample case" for the Learn view, and a set of interactive practice
 * cases for the Practice view. Practice questions use three formats:
 *   { type: 'mc',   stem, choices[], answer, explanation }
 *   { type: 'free', stem, modelAnswer, hint? }
 *   { type: 'flash', front, back }
 *
 * Case material is taken from the DIL "Key Drugs in Cardiology" cases and the
 * MEDS230 lectures (Dr. Amar Thakrar).
 */

export const categories = {
  ischemic: { label: 'Ischemic disease (Plumbing)', token: 'ischemic' },
  rhythm: { label: 'Arrhythmia (Electrical)', token: 'rhythm' },
  pump: { label: 'Heart failure (Pump)', token: 'pump' },
}

export const conditions = [
  /* ---------------------------------------------------------------- ACS */
  {
    id: 'acs',
    name: 'Acute Coronary Syndrome',
    shortName: 'ACS',
    category: 'ischemic',
    oneLiner: 'Acute plaque rupture and thrombus. Open the artery and start secondary prevention.',
    overview:
      'Acute coronary syndrome spans unstable angina, NSTEMI, and STEMI. On top of reperfusion, the acute pharmacologic approach layers antithrombotic therapy onto measures that reduce myocardial oxygen demand. A useful framework is the initial "A, B, C, IV" plus morphine, oxygen (if hypoxic), and an anticoagulant, followed by the ongoing regimen captured in the mnemonic ASA / APA / BETA / STATA / PRIL.',
    mnemonic: {
      label: 'ASA / APA / BETA / STATA / PRIL',
      expansion: 'Aspirin, a second antiplatelet (APA), Beta blocker, Statin, and an ACE inhibitor (PRIL).',
    },
    drugClassIds: ['asa', 'p2y12', 'beta-blocker', 'statin', 'ace-inhibitor', 'nitrate', 'morphine', 'anticoagulant-acs'],
    sampleCase: {
      title: 'Mr. CP, 45, retrosternal chest heaviness',
      vignette:
        'A 45 year old man presents with retrosternal heaviness radiating to his left arm, with diaphoresis and feeling generally unwell. He has "borderline" cholesterol, is otherwise well aside from a remote appendectomy, takes no medications, and is an active smoker (20 pack-year history).',
      exam:
        'BP 165/82 (equal in both arms), RR 16, HR 80 and regular. Appears ashen grey, pale, and diaphoretic. JVP not elevated, brisk carotid upstroke. Chest clear, S1 and S2 normal with no extra sounds or murmur. Peripheral pulses normal, no edema.',
      ecg: {
        title: 'Mr. CP, 12-lead ECG',
        src: 'ecgs/cp-acs.webp',
        caption: 'De-identified from the source deck',
        interpretation: [
          'Anterolateral STEMI: ST elevation V1 to V4 with Q waves, plus ST elevation in I and aVL',
          'Reciprocal change inferiorly',
          'Sinus arrhythmia; baseline wander',
          'Age of the MI: acute, hours to days, based on Q-wave development',
        ],
      },
      walkthrough: [
        {
          prompt: 'What is the working diagnosis, and what drives the pharmacology?',
          answer:
            'Acute coronary syndrome (STEMI). The presentation is an ischemic one from plaque rupture with thrombus, so therapy targets the thrombus (antiplatelets and an anticoagulant) while also reducing myocardial oxygen demand (beta blocker, nitrate) and setting up secondary prevention (statin, ACE inhibitor).',
        },
        {
          prompt: 'What are the immediate measures?',
          answer:
            'A, B, C and IV access. Consider morphine for pain and anxiety, oxygen if hypoxic, and an anticoagulant (low molecular weight heparin or fondaparinux). Morphine is increasingly de-emphasized because it slows gastric emptying and delays oral antiplatelet absorption.',
        },
        {
          prompt: 'What ongoing regimen is started, and when?',
          answer:
            'ASA / APA / BETA / STATA / PRIL: aspirin (160 mg chewed then 81 mg daily), a second antiplatelet with a loading dose, a beta blocker, a high-intensity statin, and an ACE inhibitor. Nitroglycerin is added for ongoing ischemic symptoms. Timing: aspirin, the second antiplatelet, and heparin are immediate; the beta blocker, statin, and ACE inhibitor are usually started within 24 hours of admission, though often begun in the emergency room.',
        },
        {
          prompt: 'Who starts each medication?',
          answer:
            'The emergency department starts the heparin, the aspirin, and the second antiplatelet. The beta blocker, statin, and ACE inhibitor are usually started by the resident admitting the patient rather than the emergency physician.',
        },
      ],
    },
    practiceCases: [
      {
        id: 'acs-1',
        title: 'Mr. CP: acute management',
        vignette:
          '45 year old active smoker with retrosternal heaviness radiating to the left arm, diaphoresis, BP 165/82, HR 80. Working diagnosis: acute coronary syndrome.',
        questions: [
          {
            type: 'mc',
            stem: 'Aspirin is given as 160 mg chewed and swallowed. What is its mechanism?',
            choices: [
              'Reversibly blocks the P2Y₁₂ ADP receptor',
              'Irreversibly acetylates cyclooxygenase, blocking thromboxane A2 synthesis',
              'Directly inhibits factor Xa',
              'Blocks the funny (If) current in the sinus node',
            ],
            answer: 1,
            explanation:
              'Aspirin irreversibly acetylates COX and blocks thromboxane A2 synthesis. Because platelets lack a nucleus they cannot make new COX, so the effect lasts the platelet lifespan.',
          },
          {
            type: 'mc',
            stem: 'Which antiplatelet adverse effect is specific to ticagrelor?',
            choices: ['Dyspnea', 'Xanthopsia', 'Gynecomastia', 'Dry cough'],
            answer: 0,
            explanation:
              'Dyspnea is a recognized effect specific to ticagrelor. Bleeding is common to the whole antiplatelet class.',
          },
          {
            type: 'free',
            stem: 'Why is morphine falling out of favour in ACS despite being guideline-listed?',
            modelAnswer:
              'Morphine slows gastric emptying, which delays absorption and the peak effect of oral antiplatelet agents. It can also mask symptoms. It remains an option for pain and anxiety but is used more selectively.',
            hint: 'Think about how it interacts with the oral antiplatelet agents you are trying to load.',
          },
          {
            type: 'mc',
            stem: 'What intensity of statin is appropriate after an acute coronary syndrome?',
            choices: [
              'No statin unless LDL is very high',
              'High-intensity statin (for example atorvastatin 80 mg)',
              'A statin only if the patient is diabetic',
              'A low dose, tapering off after a month',
            ],
            answer: 1,
            explanation:
              'Secondary prevention after ACS uses a high-intensity statin regardless of baseline cholesterol, for its mortality reduction and plaque-stabilizing effects.',
          },
          {
            type: 'flash',
            front: 'What do the initial "A, B, C, IV" measures and MONA cover in ACS?',
            back: 'Airway, breathing, circulation, and IV access, plus considering morphine, oxygen (if hypoxic), nitrates, and an anticoagulant. Morphine is de-emphasized because it delays antiplatelet absorption.',
          },
          {
            type: 'flash',
            front: 'Expand the ACS mnemonic ASA / APA / BETA / STATA / PRIL.',
            back: 'Aspirin, a second antiplatelet agent, Beta blocker, Statin, and an ACE inhibitor. These form the ongoing secondary-prevention regimen after acute measures.',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------- Stable angina */
  {
    id: 'stable-angina',
    name: 'Stable Angina',
    shortName: 'Stable angina',
    category: 'ischemic',
    oneLiner: 'Supply/demand mismatch. Maximize supply, minimize demand, prevent progression.',
    overview:
      'Stable angina is a disease of supply and demand mismatch for myocardial oxygen. Pharmacotherapy is aimed at maximizing supply and minimizing demand, layered onto secondary prevention. A typical prescription while a patient is worked up combines an antiplatelet, an antianginal that lowers demand (a beta blocker and/or a rate-limiting calcium channel blocker), a nitrate, and a statin.',
    drugClassIds: ['asa', 'beta-blocker', 'ccb', 'nitrate', 'statin'],
    sampleCase: {
      title: 'A 77 year old physician with CCS class II angina',
      vignette:
        'A 77 year old family physician has 6 months of stable exertional chest discomfort climbing two flights of stairs. It resolves with rest and was prevented by his partner’s nitroglycerin before stairs. Risk factors: pipe smoking and hypertension. He has no allergies and takes no medications.',
      exam:
        'Well appearing, comfortable. Pulse 75, BP 140/90. JVP 3 cm above the sternal angle, normal apex beat, normal S1 and S2, no murmurs. Protuberant abdomen. Chest clear, no edema. Baseline ECG and fasting bloodwork normal. Diagnosis: typical (CCS class II) angina.',
      ecg: {
        note: 'Stable angina can present with a normal resting ECG. Changes appear only when you ask the heart for additional power or oxygen demand, for example during a stress test.',
      },
      walkthrough: [
        {
          prompt: 'Write a three-drug antianginal prescription and give a one-line rationale for each.',
          answer:
            'Several combinations are reasonable. Antiplatelet: ASA 81 mg daily (decreases platelet aggregation and thrombus formation, for primary and secondary prevention). Beta blocker: Bisoprolol 2.5 mg daily or Metoprolol 25 mg twice daily (lowers heart rate, contractility, and pressure, reducing oxygen demand). Calcium channel blocker: Diltiazem 240 mg long-acting daily (vasodilation reduces afterload; the non-dihydropyridines also lower rate and contractility). Nitrate: Nitroglycerin patch 0.4 mg/hr on at 0800 and off at 2200 (venodilation reduces preload and demand).',
        },
        {
          prompt: 'What side effects would you warn about?',
          answer:
            'ASA: GI bleeding. Beta blocker: bradycardia, hypotension, low mood, fatigue, sexual dysfunction. Diltiazem: peripheral edema, hypotension, bradycardia. Nitrate: headache and hypotension.',
        },
        {
          prompt: 'What else is indicated?',
          answer:
            'A statin for prevention of coronary disease regardless of the cholesterol level. Dual antiplatelet therapy could be considered if angiography and revascularization are planned.',
        },
      ],
    },
    practiceCases: [
      {
        id: 'angina-1',
        title: 'The 77 year old physician',
        vignette:
          '77 year old with stable CCS class II exertional angina, BP 140/90, HR 75. You are treating him medically while arranging a treadmill stress test.',
        questions: [
          {
            type: 'mc',
            stem: 'How do nitrates chiefly relieve angina?',
            choices: [
              'By increasing heart rate and contractility',
              'By venodilation that reduces preload and myocardial oxygen demand',
              'By blocking the P2Y₁₂ receptor',
              'By inhibiting HMG-CoA reductase',
            ],
            answer: 1,
            explanation:
              'Nitrates are converted to nitric oxide, raising cGMP and relaxing vascular smooth muscle. Venodilation reduces preload and wall stress, lowering myocardial oxygen demand; they also reduce afterload.',
          },
          {
            type: 'mc',
            stem: 'A statin is recommended here even though his cholesterol is not markedly elevated. Why?',
            choices: [
              'Statins are only for patients with very high LDL',
              'Anyone with vascular disease benefits, regardless of baseline cholesterol',
              'Statins are used for rate control',
              'Statins reverse coronary vasospasm',
            ],
            answer: 1,
            explanation:
              'Patients with established vascular disease benefit from a statin regardless of baseline cholesterol, through LDL lowering plus pleiotropic effects such as plaque stabilization.',
          },
          {
            type: 'free',
            stem: 'The nitroglycerin patch is dosed on at 0800 and off at 2200. Why the daily off period?',
            modelAnswer:
              'A nitrate-free interval each day prevents the development of nitrate tolerance, preserving the drug’s effect.',
            hint: 'Think about what happens to the response with continuous, uninterrupted exposure.',
          },
          {
            type: 'mc',
            stem: 'Which calcium channel blocker property makes diltiazem useful as an antianginal beyond vasodilation?',
            choices: [
              'It increases heart rate',
              'It is a negative inotrope and chronotrope, lowering oxygen demand',
              'It irreversibly blocks COX',
              'It raises preload',
            ],
            answer: 1,
            explanation:
              'As a non-dihydropyridine, diltiazem lowers heart rate and contractility (negative chronotrope and inotrope) in addition to reducing afterload, cutting myocardial oxygen demand.',
          },
          {
            type: 'flash',
            front: 'What are the two therapeutic goals in stable angina?',
            back: 'Maximize myocardial oxygen supply and minimize oxygen demand, on a background of secondary prevention (antiplatelet and statin).',
          },
        ],
      },
    ],
  },

  /* ---------------------------------------------------- Atrial fibrillation */
  {
    id: 'atrial-fibrillation',
    name: 'Atrial Fibrillation',
    shortName: 'Atrial fibrillation',
    category: 'rhythm',
    oneLiner: 'Three goals: don’t have a stroke, prevent symptoms, and don’t wreck the heart.',
    overview:
      'There are three goals in atrial fibrillation: (1) don’t have a stroke, (2) prevent symptoms, and (3) don’t wreck the heart. Concretely, management is whether to anticoagulate for stroke prevention (driven by risk factors, not by symptoms), and how to control the arrhythmia by rate control or rhythm control, to prevent tachycardia-induced cardiomyopathy and symptoms. The stroke risk comes from intracardiac thrombus, usually in the left atrial appendage, which can embolize and cause stroke, often affecting multiple territories. "Don’t wreck the heart" refers to tachycardia-induced cardiomyopathy: when the heart runs fast for a sustained period it dilates, like running a marathon and creating a big baggy sack. Antiarrhythmic choice is constrained by structural heart disease, a lesson taught by the CAST trial.',
    drugClassIds: ['doac', 'warfarin', 'ccb', 'beta-blocker', 'digoxin', 'class-ic', 'class-iii'],
    sampleCase: {
      title: 'Mrs. AF, 67, paroxysmal atrial fibrillation',
      vignette:
        'A 67 year old woman has episodic irregular palpitations. When asked to tap out her pulse she taps an irregular rhythm at 180 bpm. She has ulcerative colitis with frequent flares (on methotrexate and Asacol) and asthma (on Flovent and salbutamol).',
      exam:
        'Normal cardiac exam, no signs of hyperthyroidism or valvular disease. Echocardiogram shows mild left atrial dilatation, no valvular abnormality, normal biventricular function. A 24 hour Holter shows 2 to 3 hour runs of symptomatic atrial fibrillation with rates up to 180 bpm.',
      walkthrough: [
        {
          prompt: 'Is anticoagulation indicated, and which agent?',
          answer:
            'Yes. She is over 65 and the ECG suggests LVH from likely undiagnosed hypertension, both raising stroke risk. Given her ulcerative colitis and higher GI bleeding risk, the gastroenterology team was more comfortable with warfarin, which is reversible and monitorable, rather than a DOAC. Warfarin was targeted to an INR of 2 to 3. Note this is uncommon: roughly 95% of the time a DOAC would be chosen. This was an individualized decision driven by her colitis.',
        },
        {
          prompt: 'Rate control or rhythm control, and which drug?',
          answer:
            'A beta blocker is not favoured because of her asthma. Long-acting diltiazem was started at 120 mg daily for rate control (a Class IV antiarrhythmic action, slowing the AV node).',
        },
        {
          prompt: 'She remains symptomatic on diltiazem. What next, and what determines the choice?',
          answer:
            'Add an antiarrhythmic for rhythm control: Class III (sotalol or amiodarone) or Class Ic (flecainide or propafenone). The CAST trial showed increased mortality with Class Ic agents in post-MI patients, so Class Ic is avoided in structural heart disease and ischemia is excluded first. Her stress test showed no scar or ischemia and normal LV function, so flecainide was started and she stayed in sinus rhythm.',
        },
      ],
    },
    practiceCases: [
      {
        id: 'af-1',
        title: 'Mrs. AF: anticoagulation and rhythm',
        vignette:
          '67 year old with symptomatic paroxysmal AF up to 180 bpm, ulcerative colitis on methotrexate, and asthma. Echo: mild LA dilatation, normal ventricular function.',
        questions: [
          {
            type: 'mc',
            stem: 'Why was warfarin chosen over a DOAC in this patient?',
            choices: [
              'DOACs carry a lower GI bleeding risk than warfarin',
              'Her colitis raises GI bleeding risk, and warfarin has a lower GI bleeding risk than a DOAC (and is reversible and monitorable)',
              'Warfarin carries a lower risk of intracranial hemorrhage than a DOAC',
              'DOACs are contraindicated in all patients over 65',
            ],
            answer: 1,
            explanation:
              'The bleeding profiles are the opposite of what many assume: DOACs have a HIGHER GI bleeding risk but a LOWER intracranial hemorrhage risk than warfarin, while warfarin has a higher intracranial but a lower GI bleeding risk. With her colitis (GI bleeding risk), warfarin’s lower GI bleeding, reversibility, and INR monitoring made it the individualized choice, though a DOAC is first-line in most non-valvular AF.',
          },
          {
            type: 'mc',
            stem: 'Why is a beta blocker not favoured for rate control here?',
            choices: [
              'She has asthma',
              'She has a mechanical valve',
              'Beta blockers do not slow the AV node',
              'She is pregnant',
            ],
            answer: 0,
            explanation:
              'Non-selective beta blockade can worsen bronchospasm in asthma, so a rate-limiting calcium channel blocker (diltiazem) was chosen instead.',
          },
          {
            id: 'q-cast',
            type: 'mc',
            stem: 'The CAST trial is the reason we avoid which drugs in structural heart disease?',
            choices: [
              'ACE inhibitors',
              'Class Ic antiarrhythmics (flecainide, propafenone)',
              'Statins',
              'SGLT2 inhibitors',
            ],
            answer: 1,
            explanation:
              'CAST showed increased mortality in post-MI patients treated with Class Ic agents. Suppressing arrhythmia is not the same as improving survival, so Class Ic drugs are avoided in structural heart disease and ischemia is excluded first.',
          },
          {
            type: 'free',
            stem: 'Flecainide can cause 1:1 AV conduction of atrial flutter. What is the practical prescribing consequence?',
            modelAnswer:
              'Because Class Ic agents can allow 1:1 conduction across the AV node (producing rates up to 300 bpm in atrial flutter), they are paired with an AV-nodal blocking agent such as a beta blocker or calcium channel blocker.',
            hint: 'What do you co-prescribe to protect the AV node?',
          },
          {
            type: 'mc',
            stem: 'A patient on amiodarone needs monitoring because of its tissue toxicities. Which panel fits?',
            choices: [
              'INR only',
              'TSH, chest X-ray, liver function, and ECG for QT',
              'Digoxin level and potassium',
              'No monitoring needed',
            ],
            answer: 1,
            explanation:
              'Amiodarone can affect the thyroid, lungs, and liver and prolongs the QT, so monitor TSH, chest X-ray, LFTs, and the ECG. It is not eliminated by the kidney.',
          },
          {
            type: 'flash',
            front: 'How many independent decisions are there in managing atrial fibrillation, and what are they?',
            back: 'Three. (1) Anticoagulate to prevent stroke (driven by risk factors, not symptoms). (2) Rate versus rhythm control for symptoms. (3) Don’t wreck the heart: prevent tachycardia-induced cardiomyopathy.',
          },
          {
            type: 'flash',
            front: 'Where does the thrombus that causes stroke in AF usually form?',
            back: 'Usually the left atrial appendage (sometimes the left atrium proper). It can embolize to the brain, often affecting multiple territories.',
          },
        ],
      },
    ],
  },

  /* ------------------------------------------------------------------ SVT */
  {
    id: 'svt',
    name: 'Supraventricular Tachycardia',
    shortName: 'SVT',
    category: 'rhythm',
    oneLiner: 'Regular narrow-complex tachycardia. AV-nodal agents, and no anticoagulation.',
    overview:
      'Paroxysmal SVT (AVNRT or AVRT) is a regular, narrow-complex tachycardia that patients can often terminate with vagal maneuvers. Chronic suppression uses AV-nodal agents (a rate-limiting calcium channel blocker or a beta blocker); refractory cases often proceed to ablation. Unlike atrial fibrillation and flutter, SVT does not carry the same intracardiac thrombus risk, so anticoagulation is not indicated.',
    drugClassIds: ['ccb', 'beta-blocker', 'digoxin'],
    sampleCase: {
      title: 'A 37 year old with regular palpitations',
      vignette:
        'A 37 year old hospital administrator has several episodes of palpitations and taps out a regular, fast rhythm. She terminates episodes by breath-holding or lying down and raising her legs. She has anxiety but is otherwise well, is a competitive runner, and has an IUD but takes no medications. She specifically denies syncope.',
      exam:
        'HR 65, BP 125/70. No cyanosis or clubbing, normal S1 and S2, flat JVP, normal carotid upstroke, normal apex beat, minor end-of-day edema. ECG, TSH, renal and liver function normal. Holter: supraventricular tachycardia at 160 bpm with palpitations and breathlessness.',
      walkthrough: [
        {
          prompt: 'Prescribe a single agent. How does the edema influence the choice?',
          answer:
            'Reasonable single agents are a rate-limiting calcium channel blocker (diltiazem long-acting 240 mg daily or verapamil 80 mg three times daily) or a beta blocker (metoprolol 25 mg twice daily). Because calcium channel blockers commonly cause peripheral edema and she already has minor edema, a beta blocker may be the better choice. Note that in a young normotensive patient either can cause orthostasis or presyncope.',
        },
        {
          prompt: 'Does she need anticoagulation?',
          answer:
            'No. Anticoagulation is not indicated for SVT. Sustained arrhythmias such as atrial fibrillation and flutter can form intracardiac thrombus that embolizes and causes stroke, but SVT does not carry that same risk.',
        },
      ],
    },
    practiceCases: [
      {
        id: 'svt-1',
        title: 'The 37 year old runner',
        vignette:
          '37 year old with regular narrow-complex tachycardia at 160 bpm on Holter, terminated by vagal maneuvers. Minor end-of-day edema. Structurally normal heart.',
        questions: [
          {
            type: 'mc',
            stem: 'Given her minor peripheral edema, which agent is arguably the best single choice?',
            choices: [
              'A beta blocker, since calcium channel blockers commonly cause edema',
              'A dihydropyridine calcium channel blocker',
              'Warfarin',
              'A loop diuretic',
            ],
            answer: 0,
            explanation:
              'Rate-limiting calcium channel blockers frequently cause peripheral edema, which she already has, so a beta blocker may be preferred. Either can cause orthostasis in a young normotensive patient.',
          },
          {
            type: 'mc',
            stem: 'Does this patient with SVT require anticoagulation?',
            choices: [
              'Yes, all tachycardias require anticoagulation',
              'No, SVT does not carry the intracardiac thrombus risk of AF or flutter',
              'Yes, because her heart rate exceeds 150 bpm',
              'Only if she is over 65',
            ],
            answer: 1,
            explanation:
              'Anticoagulation is not indicated in SVT. The thrombus and stroke risk that drives anticoagulation applies to sustained atrial fibrillation and flutter.',
          },
          {
            type: 'free',
            stem: 'How do vagal maneuvers terminate an episode of SVT?',
            modelAnswer:
              'They increase vagal (parasympathetic) tone, which slows AV-node conduction. Because AVNRT and AVRT depend on the AV node, slowing it can break the reentrant circuit.',
            hint: 'Think about what the AV node does in the reentry circuit.',
            video: {
              src: null,
              title: 'Vagal maneuvers',
              note: 'Video to be added (Dr. Thakrar’s vagal maneuvers video).',
            },
          },
          {
            type: 'flash',
            front: 'What two drug classes are first-line for chronic suppression of SVT?',
            back: 'AV-nodal agents: a rate-limiting (non-dihydropyridine) calcium channel blocker or a beta blocker. Refractory cases often go on to ablation.',
          },
        ],
      },
    ],
  },

  /* --------------------------------------------------------- Heart failure */
  {
    id: 'heart-failure',
    name: 'Heart Failure (HFrEF)',
    shortName: 'Heart failure',
    category: 'pump',
    oneLiner: 'Separate symptom relief from mortality benefit, then build the guideline-directed pillars.',
    overview:
      'Heart failure with reduced ejection fraction is a pump problem. Management separates two goals: symptomatic relief, mainly with diuretics, and mortality benefit from guideline-directed therapy. The survival pillars are an ACE inhibitor (or an ARNI), a beta blocker, a mineralocorticoid receptor antagonist, and an SGLT2 inhibitor. Digoxin and ivabradine have selected roles, and diuretics treat congestion without changing mortality.',
    drugClassIds: ['loop-diuretic', 'ace-inhibitor', 'beta-blocker', 'mra', 'arni', 'sglt2', 'digoxin', 'ivabradine'],
    sampleCase: {
      title: 'Mr. MD, 54, new severe systolic dysfunction',
      vignette:
        'A 54 year old man with mild muscular dystrophy has 4 weeks of progressive dyspnea on exertion, now with dyspnea at rest, orthopnea, paroxysmal nocturnal dyspnea, and edema to the knees. Echocardiogram shows severe systolic dysfunction (LVEF 26%). The heart failure nurse started low-dose ACE inhibitor and beta blocker a week ago.',
      exam:
        'JVP 10 cm above the sternal angle, decreased breath sounds to both bases, quiet S1, normal S2, a soft (I/VI) holosystolic murmur at the apex (functional mitral regurgitation from LV dilatation), and 2+ edema to the knees.',
      walkthrough: [
        {
          prompt: 'What is offered for symptomatic relief?',
          answer:
            'A loop diuretic such as furosemide, alongside salt (and possibly water) restriction. It relieves congestion and edema by enhancing renal sodium and water excretion, but it does not improve mortality.',
        },
        {
          prompt: 'What is offered for mortality benefit?',
          answer:
            'Guideline-directed therapy: an ACE inhibitor, a beta blocker, a mineralocorticoid receptor antagonist (spironolactone) for EF < 35% and NYHA II-IV, and an SGLT2 inhibitor. If he tolerates the ACE inhibitor and beta blocker but stays symptomatic, replace the ACE inhibitor with an ARNI (sacubitril/valsartan). Ivabradine is an option if he cannot reach a goal beta-blocker dose, stays symptomatic, is in sinus rhythm, and has a resting heart rate over 70 with LVEF <= 35%.',
        },
        {
          prompt: 'What is the practical caution when switching to an ARNI?',
          answer:
            'Discontinue the ACE inhibitor for at least 36 hours before starting the ARNI to avoid serious hypotension and angioedema. A history of angioedema is a contraindication. During those 36 hours, monitoring is simply watching the blood pressure, since this patient is an inpatient. At home you would just stop the ACE inhibitor and expect the blood pressure to rise, which is why clinicians are reluctant to start these at home and part of what heart failure clinics are for.',
        },
      ],
    },
    practiceCases: [
      {
        id: 'hf-1',
        title: 'Mr. MD: symptom relief versus survival',
        vignette:
          '54 year old, LVEF 26%, congested with elevated JVP and edema, already on low-dose ACE inhibitor and beta blocker.',
        questions: [
          {
            type: 'mc',
            stem: 'Which therapy provides symptomatic benefit for his congestion?',
            choices: [
              'A loop diuretic (furosemide)',
              'An ACE inhibitor',
              'Spironolactone',
              'An SGLT2 inhibitor',
            ],
            answer: 0,
            explanation:
              'Loop diuretics provide symptomatic relief of congestion and edema. They may improve mortality but this is not proven, so they are used for symptom relief, while the ACE inhibitor (or ARNI), MRA, and SGLT2 inhibitor are the survival therapies.',
          },
          {
            type: 'mc',
            stem: 'He remains symptomatic on an ACE inhibitor and beta blocker. What is the recommended change?',
            choices: [
              'Stop the beta blocker',
              'Replace the ACE inhibitor with an ARNI (sacubitril/valsartan)',
              'Add a dihydropyridine calcium channel blocker',
              'Add a Class Ic antiarrhythmic',
            ],
            answer: 1,
            explanation:
              'When a patient stays symptomatic on an ACE inhibitor and beta blocker, replacing the ACE inhibitor with an ARNI is indicated for further benefit.',
          },
          {
            type: 'mc',
            stem: 'When switching from an ACE inhibitor to an ARNI, what must you do first?',
            choices: [
              'Give both together for a week',
              'Discontinue the ACE inhibitor for at least 36 hours',
              'Load a P2Y₁₂ inhibitor',
              'Check the INR',
            ],
            answer: 1,
            explanation:
              'Stop the ACE inhibitor for at least 36 hours before starting the ARNI to avoid serious hypotension and angioedema. A history of angioedema is a contraindication.',
          },
          {
            type: 'free',
            stem: 'Spironolactone is added. What is its key life-threatening adverse effect, and what else is commonly seen?',
            modelAnswer:
              'Hyperkalemia is the life-threatening adverse effect and requires monitoring of potassium and renal function. Gynecomastia and menstrual irregularities are also common because it is a steroid that competes at the aldosterone receptor.',
            hint: 'One is an electrolyte emergency; the other relates to its steroid structure.',
            ecg: {
              src: null,
              title: 'ECG of hyperkalemia',
              note: 'Progresses from peaked T waves through to a sine-wave pattern as potassium rises.',
            },
          },
          {
            type: 'flash',
            front: 'Name the four survival pillars of HFrEF therapy.',
            back: 'ACE inhibitor (or ARNI), beta blocker, mineralocorticoid receptor antagonist (spironolactone), and an SGLT2 inhibitor.',
          },
          {
            id: 'q-ivabradine',
            type: 'mc',
            stem: 'Ivabradine is being considered. Which patient is an appropriate candidate?',
            choices: [
              'A patient in atrial fibrillation',
              'A patient in sinus rhythm with LVEF 30% and resting HR 78 who cannot tolerate a higher beta-blocker dose',
              'A patient with a resting heart rate of 55',
              'A patient with preserved ejection fraction',
            ],
            answer: 1,
            explanation:
              'Ivabradine is for HFrEF (LVEF <= 35%) in sinus rhythm with resting HR over 70 when a goal beta-blocker dose is not tolerated. It acts on the sinus node, so it does not work in atrial fibrillation.',
          },
          {
            type: 'flash',
            front: 'When is ivabradine indicated in heart failure?',
            back: 'In sinus rhythm with LVEF <= 35% and resting heart rate over 70 bpm, when a patient cannot tolerate a goal beta-blocker dose or has worsening symptoms. It has no effect in atrial fibrillation.',
          },
        ],
      },
    ],
  },
]

export const conditionById = Object.fromEntries(conditions.map((c) => [c.id, c]))

/** Every condition that lists this drug class, for cross-linking. */
export function conditionsForDrug(drugId) {
  return conditions.filter((c) => c.drugClassIds.includes(drugId))
}
