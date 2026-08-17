# Key Drugs in Cardiology

An interactive learning module for cardiology pharmacotherapy, organized by the
condition you are treating. Built with React and Vite.

For each condition students can:

- **Learn** the relevant drug classes (indications, mechanism, dosing, side
  effects, and the landmark trials behind the decisions) and read a worked
  sample case.
- **Practice** with case-based questions in three formats: auto-graded multiple
  choice, short free-text with a model answer, and reveal-to-check flashcards.
- **Test** themselves against a settable timer, then review a score broken down
  by topic.

Learning tools inspired by Amboss and Osmosis:

- **Hover bubbles:** key terms are highlighted inline; hovering or tapping one
  shows a short definition and deep links to the relevant drug and practice
  questions. Terms live in `src/data/glossary.js`.
- **Knowledge-graph cross-links:** each drug card lists every condition it
  appears in, so learners can move between pharmacology and clinical context.
- **Drug library** (`/drugs`): an A-to-Z index of every drug class, searchable,
  with anchors so bubbles can deep-link to a specific drug.
- **Command palette:** Cmd/Ctrl+K searches conditions, drugs, and terms.
- **Progress:** mark a condition as learned and keep your best test score
  (stored in `localStorage`), surfaced on the overview.
- **Spaced-repetition review deck** (`/review`): an SM-2-flavoured scheduler with
  Again/Hard/Good/Easy grading, seeded from every flashcard. Missed test
  questions are added automatically. Logic lives in `src/lib/srs.js`.
- **Guided path:** a continue banner on the overview and a Learn/Practise/Test
  stepper with a next-condition link on each Learn page.
- **Confidence rating** on timed-test questions; wrong-but-confident answers are
  surfaced as a priority bucket and fed into the review deck.
- **Comparison tables** (`/compare`): high-yield side-by-side matrices, also
  embedded on the relevant Learn pages (`src/data/comparisons.js`).
- **Mechanism diagrams:** theme-aware inline SVGs (oxygen supply/demand, RAAS,
  nephron diuretic sites, cardiac action potential) in `src/components/Diagrams.jsx`.
- **Clinical calculators:** interactive CHA2DS2-VASc and HAS-BLED on the AFib page.
- **Branching case simulator** (`src/data/simulations.js`): choices lead to
  consequences with a running decision log.
- **Printable cheat sheets** (`/cheatsheet/:condition`): a print-optimized,
  one-page summary with a save-as-PDF button.
- **Sources page** (`/about`): consolidates trials flagged for faculty review.

Content is adapted from the Queen's MEDS230 "Key Drugs in Cardiology" lectures
and DIL cases (Dr. Amar Thakrar). This is an educational tool, not clinical
guidance.

## Running locally

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # preview the production build
npm test         # run the Vitest unit + data-integrity tests
```

## Project structure

```
src/
  data/
    drugClasses.js   Canonical drug-class reference (one entry per class)
    conditions.js    Conditions, grouped Plumbing / Electrical / Pump,
                     each with a sample case and practice cases
    quiz.js          Builds the pooled question bank for the timed test
  components/        Reusable UI (cards, accordion, question types, icons)
  views/             HomeView, LearnView, PracticeView, TestView
  styles/            theme.css (design tokens, light + dark), global.css
```

## Adding or editing content

All teaching content lives in `src/data/` as plain JavaScript objects, so no UI
changes are needed to extend it.

- **Add a drug class:** append an object to the `drugClasses` array in
  `drugClasses.js` following the shape documented at the top of the file, then
  reference its `id` from a condition's `drugClassIds`.
- **Add a condition:** append an object to the `conditions` array in
  `conditions.js` with an `overview`, a `sampleCase`, and one or more
  `practiceCases`. Set its `category` to `ischemic`, `rhythm`, or `pump` (add a
  new category in `categories` if needed). It appears in the sidebar, home page,
  and test bank automatically.
- **Question formats** inside a practice case:
  - `{ type: 'mc', stem, choices: [...], answer: <index>, explanation }`
  - `{ type: 'free', stem, modelAnswer, hint? }`
  - `{ type: 'flash', front, back }`

Trials marked `addedBeyondSource: true` were added from standard references
(they are not named in the source slides) and show a "verify vs course refs"
tag in the UI so they can be checked or swapped.

## Deploying

The build is a static site (`base: './'` in `vite.config.js`), so `dist/` can be
served from GitHub Pages or any static host. Routing uses `HashRouter`, so no
server rewrite rules are required.
