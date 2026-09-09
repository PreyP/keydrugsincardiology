# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are Queen's University medical students taking **MEDS230** (the
cardiology block), in the preclinical years. They use the module for
self-directed study around the lectures and the Directed Independent Learning
(DIL) cases, and to prepare for assessments; it is also used to rehearse clinical
reasoning before clerkship. Study sessions are self-paced, happen on a laptop or
phone, often cluster around assessment deadlines, and sometimes happen offline.

The stated intent is for later MEDS230 cohorts to keep using it as a maintained,
course-endorsed resource, so "the whole cohort, year after year" is the audience
future work should design for — not just the two authors.

## Product Purpose

Teach the high-yield cardiology drug classes the way they are actually
prescribed — grouped by the condition being treated — and give students one place
to **learn** each class (indication, mechanism, dosing, adverse effects, and the
landmark trial behind the decision), **work cases**, and **test** themselves
under time pressure, with the results pointing at the blind spots to go back to.

Success: for a given cardiac condition a student can name the right drug classes,
justify them mechanistically, and recall the supporting evidence.

## Positioning

The module is organized **by condition, not by drug class and not alphabetically**.
Most pharmacology resources index on the drug ("beta blockers: ..."); this one
indexes on the clinical decision ("ACS → these classes, in this order, because
...") and then cross-links back to a single canonical per-class reference.

That condition-first framing, wrapped in a learn → practise → test loop over
course-specific case material (MEDS230 lectures and Dr. Amar Thakrar's DIL
cases), is what a generic pharmacology resource cannot truthfully copy.

## Operating Context

- **Course:** Queen's MEDS230 cardiology pharmacotherapy lectures plus the DIL
  cases (Dr. Amar Thakrar). Content is adapted from that material.
- **Lecture framing carried through the UI:** Ischemic disease (Plumbing),
  Arrhythmia (Electrical), Heart failure (Pump).
- **Study scene:** self-directed, laptop or phone, frequently right before
  assessments; must tolerate being opened from a static host and used offline.
- **Mnemonics are part of the teaching** (e.g. ASA / APA / BETA / STATA / PRIL
  for ACS) and appear inline with their expansions.
- **Source traceability:** the module carries only what the MEDS230 lectures and
  DIL cases cover — the one landmark trial included (CAST) is the one the slides
  name. The `/about` page lists the source materials.
- A "for education only, not clinical guidance" disclaimer currently appears on
  the home page and `/about`. (Not selected as a hard commitment in the init
  interview — see wrap-up note — but it is the present state and matters more, not
  less, for a course-endorsed medical resource.)

## Capabilities and Constraints

**Surfaces / routes**

- Overview (`/`), Learn per condition (`/learn/:conditionId`), Drug library A–Z
  (`/drugs`), Practice (`/practice` and `/practice/:conditionId`), timed Test
  (`/test`), Comparison tables (`/compare`), printable Cheat sheet
  (`/cheatsheet/:conditionId`), Sources / about (`/about`).

**Learning + practice**

- Practice question formats: auto-graded multiple choice; short free-text with a
  revealed model answer; reveal-to-check flashcards.
- Test: settable timer, shuffled pooled bank, score broken down by topic,
  per-question confidence rating. Wrong-but-confident answers are surfaced on the
  results screen as a "review these first" priority list.
- Learning aids: inline hover/tap glossary bubbles that deep-link to a drug and
  its practice questions; per-drug "appears in these conditions" cross-links;
  Cmd/Ctrl+K command palette over conditions, drugs, and terms; theme-aware
  inline-SVG mechanism diagrams (oxygen supply/demand, RAAS, nephron diuretic
  sites, cardiac action potential); interactive CHA₂DS₂-VASc and HAS-BLED
  calculators on the AFib page; a branching case simulator with a running
  decision log.
- Guided path: a continue banner on the overview and a Learn/Practise/Test
  stepper with a next-condition link.

**Hard constraints (confirmed in the init interview)**

- **No backend and no user accounts.** Everything runs client-side. Progress
  (conditions marked learned, best test score) and all review scheduling live
  only in the browser via `localStorage`. The module must keep working as a plain
  static site (currently GitHub Pages: `base: './'`, `HashRouter`, no server
  rewrite rules).
- **Author and contributor credit stays visible** (see Brand Commitments).

**Authoring model**

- All teaching content is plain JavaScript data objects under `src/data/`
  (`drugClasses.js`, `conditions.js`, `glossary.js`, `comparisons.js`,
  `simulations.js`), so content can be extended without UI changes.

**Undecided / not yet established — do not invent**

- Formal permission or licensing status for adapting the MEDS230 material.
- Whether the module becomes officially course-owned, and who maintains it
  long-term.
- Any analytics or telemetry (there is none today).

## Brand Commitments

- **Name:** Key Drugs in Cardiology.
- **Byline that must remain visible:** created by Prey Patel and Md Riaz Mahmud
  (MD Class of 2028) with content and support from Dr. Thakrar.
- **Voice, as written in the current content:** plain, precise, exam-focused;
  second person and imperative ("open the artery and start secondary
  prevention"); teaching-first, no marketing tone.

## Evidence on Hand

- A complete working implementation (this repo): ~10 views, a pooled question
  bank, glossary, comparison data, case simulations, and Vitest unit +
  data-integrity tests.
- Teaching content adapted from the Queen's MEDS230 "Key Drugs in Cardiology"
  lectures and DIL cases (Dr. Amar Thakrar). Provenance is stated in `README.md`
  and `/about`; there is no formal licensing or permission text in the repo — do
  not fabricate one.
- Author bylines and the Dr. Thakrar acknowledgement are real and already in the
  UI.
- There are **no** testimonials, usage numbers, endorsements, institutional
  logos, or student-outcome data. Do not invent them. "Course-endorsed" is the
  stated goal, not a present fact.

## Product Principles

1. **Condition-first, always.** The primary organizing axis is the clinical
   problem being treated; the per-drug-class reference is the cross-linked
   backing layer, never the entry point.
2. **One loop: learn → practise → test.** Every feature should move a student
   around that loop or pull them back into it; the timed test's blind-spot list
   points them back to the parts of the loop they have not yet locked in.
3. **Traceable to the course.** Every teaching point maps to the MEDS230 lectures
   and DIL cases; material the slides do not cover is left out rather than added
   from elsewhere. Trust comes from being checkable, not exhaustive.
4. **Runs anywhere, holds nothing of the student's.** Client-side only, no
   accounts, static-host friendly, works offline; a student's progress is theirs
   and never leaves their browser.
5. **Credit is permanent.** Student authors and faculty support are acknowledged
   wherever the module presents itself.

## Accessibility & Inclusion

The existing baseline to preserve: a skip-to-content link, a keyboard-operable
command palette, ARIA labels on icon controls, visible focus, light and dark
themes sharing one token surface, and a prior accessibility pass in the history.

Because the module is meant to serve an entire medical-school cohort as an
endorsed resource, future work should hold this to **WCAG 2.1 AA**: full keyboard
operability, sufficient contrast in both themes, `prefers-reduced-motion`
support, and text equivalents for the mechanism diagrams and calculator outputs.
No individual user access requirement was established.
