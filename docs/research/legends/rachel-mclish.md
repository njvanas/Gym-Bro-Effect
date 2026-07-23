# Primary-source research: `rachel-mclish` (Rachel McLish)

Scope: verify the current `styles.json` entry for Rachel McLish against sources FROM Rachel McLish herself (self-authored books, a direct-quote interview reproducing an excerpt of her own unpublished book) wherever possible. This file does not edit `styles.json`.

## 1. Source ledger

| # | Title | URL | Tier | Notes |
|---|---|---|---|---|
| 1 | "Legendary" (Iron Man Magazine, April 2006, by Lonnie Teper — direct Q&A interview with Rachel McLish) | https://www.ironmanmagazine.com/wp-content/uploads/articles/6504-Rachel-McLish.pdf | **B** | Direct Q&A. Crucially reproduces a verbatim excerpt of her own soon-to-be-published book: the "In and Out 35-Minute Whole-Body Workout," explicitly captioned *"Adapted from the soon-to-be-published TLC...Tighter and Leaner to the Core by Rachel McLish."* That workout table is effectively Tier A content (her own book) delivered via a Tier B outlet. |
| 2 | *Flex Appeal* (book, Warner Books, 1984, co-written with Bill Reynolds) | https://openlibrary.org/works/OL4969728W/Flex_appeal_by_Rachel | **A** | Self-authored, NYT-bestseller. Described by McLish herself (ledger #1) as "training 101 — how to work out properly, how to diet," not a single fixed regimen. Full text not re-transcribed this pass. |
| 3 | *Perfect Parts* (book, 1987) | (no clean online full-text source located) | **A** (unverified text) | Self-authored per ledger #1's own description: one chapter per bodypart, "showing how people can train as little as 15 minutes a day." Existence/authorship confirmed via ledger #1 and #4, but the book's actual page content was not located online this pass. |
| 4 | "WHERE ARE THEY NOW: RACHEL MCLISH" — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/flex-news/where-are-they-now-rachel-mclish/ | **B** | Direct Q&A. Confirms current (at time of interview) training frequency in her own words: *"How many days a week are you in the gym? McLish: Three times a week."* |
| 5 | *In Shape With Rachel McLish* (self-produced exercise video) | (referenced in ledger #1's bio paragraph; no separate transcript located) | **A** (artifact, untranscribed) | Confirmed to exist and to have "debuted at number three on the national video charts" per ledger #1. Not transcribed this pass — flagged for a future deeper pass. |
| 6 | "Rachel McLish: The First Ms. Olympia Who Defined What Female Bodybuilding Would Look Like" — Lift Big Eat Big | https://liftbigeatbig.com/rachel-mclish/ | C (aggregator, but names its primary source) | Explicitly cites *"a Muscle and Fitness profile published in April 1983, written by Bill Reynolds"* as the source for its specific competitive-era volume numbers (12 sets/session for back, chest, thighs; 9 for triceps; 6 each for biceps/calves; 10-12 ab sets off-season/12-15 pre-contest; legs at 12-15 reps off-season/15-20 pre-contest; 4 training days/week off-season, 6 pre-contest). The original 1983 M&F/Bill Reynolds article itself was not independently located/verified this pass — see gaps below. |

**Tier A count: 3** (two self-authored books + one self-produced video), but none of the three had their actual page/session content independently transcribed this pass. The one numeric routine used below (the "In and Out" workout) is a literal excerpt of her own book text, reproduced verbatim inside a Tier B interview (ledger #1).

## 2. Current `styles.json` entry (before this pass)

Stub entry: `tags: ["Needs primary sources", "Roster"]`, empty `intensityTechniques`, every `guidelines` field "Not yet verified from primary sources," `sources: []`.

## 3. Verified training claims

| Claim | Support | Tier |
|---|---|---|
| *Flex Appeal* (1984) is a general "training 101" guide, not a single fixed program — her own characterization | Ledger #1, direct quote: *"It was really training 101—how to work out properly, how to diet."* | A/B (her own description of her own book) |
| *Perfect Parts* (1987) devotes one chapter per bodypart and is built around short (as little as 15 min/day), correctly-executed sessions | Ledger #1, direct quote: *"showing how people can train as little as 15 minutes a day and get great results, because a little goes a long way when you exercise correctly with weights."* | A/B |
| The "In and Out" 35-minute whole-body workout (from her then-unpublished *TLC* book), performed 3-4x/week with 1-2 rest days between sessions: Midsection — ab tightener 2×25, full-range crunches 2×25, hyperextensions 1×15, back-bend stretch 2×10sec; Upper body — lat pulldowns 3×12-15, dips 3×12-15, DB/machine chest press 2×9-12, seated pulley rows 2×9-12; Lower body — leg curls 3×15, leg extensions 3×15, leg press/squat 2×15, isolated glute motion 2×15 | Ledger #1, verbatim reproduced workout table, captioned as adapted from her own book | A (book text, via B outlet) |
| Warm-up: 3-minute treadmill jog, then midsection work first (doubles as extra warm-up), then power movements | Ledger #1, direct quote (her own 8-step "In and Out" gym-efficiency tips) | B |
| Every exercise's last set ends with a sustained stretch before releasing the weight | Ledger #1, direct quote: *"Finish the last repetition of the last set for each bodypart with a sustained stretch before releasing the weight."* | B |
| Current (as of the 2006 interview) general training frequency: 3x/week, "a couple of effective, concentrated sets per bodypart," never skipping a bodypart | Ledger #1 + #4, direct quotes: *"Three times a week, that's what I'm doing right now"* (#4); *"a couple of effective, concentrated sets per bodypart, is probably the most doable number... You cannot ignore bodyparts"* (#1) | B |
| Competitive-era (1980-84) volume/frequency: off-season 4 training days/week, pre-contest 6 days/week, split by bodypart; ~12 sets/session for back, chest, thighs; 9 for triceps; 6 each for biceps/calves; abs 10-12 sets off-season/12-15 pre-contest; legs at 12-15 reps off-season/15-20 pre-contest to control mass | Ledger #6, explicitly attributed to Muscle & Fitness, April 1983, Bill Reynolds — **not independently verified against the original magazine text this pass** | B, via unverified secondary report (see gaps) |

## 4. Gaps / conflicts

- **The competitive-era volume numbers (ledger #6) are a secondary report of a named Tier B source, not a directly-verified one.** Per the methodology doc, Tier C aggregators are fine for *discovery* but should not be the sole citation for specific numeric claims. Lift Big Eat Big names its source precisely (M&F, April 1983, Bill Reynolds) — the same handling the Coleman research doc used for a secondary-reported Hany Rambod session — but the original 1983 magazine scan was not located and read directly this pass. **These numbers are flagged as unverified-secondary in `styles.json` rather than stated as flatly confirmed fact.**
- **Two different life stages, two different frequencies.** The 2006 interview (3x/week, general fitness) and the reported 1983 M&F profile (4-6x/week, competitive) are not a contradiction — they describe different eras of her life — but `styles.json` must not silently merge them into one number.
- **No numeric claim was independently verified from the actual pages of *Flex Appeal*, *Perfect Parts*, or *In Shape With Rachel McLish*.** The one full numeric routine available (the "In and Out" workout) is from her *third*, TLC-era book, not her competitive-era training. This is the same kind of gap the methodology doc flags for Bannout — real primary material exists but was not fully mined this pass.

## 5. Draft summary + principles + guidelines (grounded in what's actually verified)

### Summary (draft)
The sport's first-ever Ms. Olympia (1980, 1982). Her own most detailed available numeric routine — the "In and Out" 35-minute whole-body workout, a verbatim excerpt from her then-unpublished third book *TLC: Tighter and Leaner to the Core* — is from her post-competitive, general-fitness career, not a reconstruction of her early-1980s Olympia training; no primary-source numeric log from that competitive era was independently verified this pass. A secondary report (Lift Big Eat Big, naming a 1983 Muscle & Fitness/Bill Reynolds profile as its source) describes higher-frequency, higher-volume competitive-era training, but that report was not independently confirmed against the original magazine text.

### Principles (draft)
- Train every bodypart — "you cannot ignore bodyparts," even the uncomfortable ones (her own words).
- A short list of effective, concentrated sets per bodypart beats padding out volume (her own words, describing her general approach).
- Every last set of a bodypart's work ends with a sustained stretch before racking the weight (her own words).
- Prioritize midsection/ab work early in a session — it doubles as extra warm-up before power movements (her own words).
- Reported (via a secondary source naming a 1983 Muscle & Fitness profile, not independently verified): deliberately varied exercise selection, rep ranges, and training partners to avoid staleness across her competitive career.

### Guidelines (draft, "In and Out" program — her general-fitness era, not her Olympia-competition era)
- **Frequency:** 3-4x/week, with 1-2 rest days between sessions.
- **Midsection:** ab tightener 2×25, full-range crunches 2×25, hyperextensions 1×15.
- **Upper body:** lat pulldowns 3×12-15, dips 3×12-15, chest press 2×9-12, seated rows 2×9-12.
- **Lower body:** leg curls 3×15, leg extensions 3×15, leg press/squat 2×15, isolated glute motion 2×15.
- **Unverified secondary report only (competitive era, not confirmed against the original 1983 text):** off-season 4 days/week, 6 days/week pre-contest; ~12 working sets for back/chest/thighs; legs kept at 12-20 reps to control mass.
