# Primary-source research: `lee-labrada` (Lee Labrada)

Target file: `src/data/styles.json` → id `lee-labrada`. Phase B promotion candidate (see
`00-roster-50-plus.md` #19, target Tier 1). This document does not modify `styles.json` or
`routines.json` directly.

## Source ledger

| Tier | Source | What it's good for |
|---|---|---|
| **A** | **"12-Week Lean Body Trainer"** — Lee Labrada's official training program, produced by/for Labrada Nutrition and hosted on Bodybuilding.com's BodyFit ([bodybuilding.com/fun/lee-labrada-12-week-lean-body-trainer.html](https://www.bodybuilding.com/fun/lee-labrada-12-week-lean-body-trainer.html)) | His own branded program — "daily videos... learn the secret tips and tools" from Lee Labrada personally, 7 workouts/week, 12 weeks, full exercise-by-exercise calendar. The live BodyFit page could not be retrieved in this pass (redirects to a generic app-marketing page); reconstructed from cached/mirrored copies below. |
| **A** | *The Lean Body Promise* (HarperCollins, 2005) and *The Lean Body Promise, Gym Edition* (Collins Gem, 2006) — self-authored books by Lee Labrada | Confirms the "Banex" (Balanced Nutrition and Exercise) framework and the 12-week structure are his own, developed "over the past 25 years." Book itself not full-text reviewed in this pass. |
| **A** | About Lean Body — leanbody.com (official Labrada Nutrition site, founder statement) | Confirms Labrada Nutrition founded 1995, Lee Labrada CEO/founder, IFBB Pro Bodybuilding Hall of Fame — already cited in the existing `styles.json` stub. |
| **B/mirror** | JEFIT — "12 week lean body trainer" routine mirror ([jefit.com/routines/63930](https://www.jefit.com/routines/63930/12-week-lean-body-trainer)), citing bodybuilding.com as its source | Exercise-level detail (specific exercises, sets, reps) for Day 1 (Back & Biceps), Day 2 (Delts & Triceps), Day 4 (Legs & Abs) of the official program, explicitly sourced back to the Bodybuilding.com BodyFit page. Treated as a faithful mirror of the Tier A program, not an independent aggregator claim. |
| **B/mirror** | PDFCoffee — "Lee Labrada's 12-Week Lean Body Trainer" (scan/mirror of the BodyFit calendar page) | Confirms the weekly day-label rotation (Back and Biceps → Chest, Shoulders, and Triceps → Cardio → Legs and Abs → repeat) and the "7 workouts per week / 45-60 min" framing, plus that daily videos come from Lee Labrada personally. |
| **C** | Fitness Volt — "Lee Labrada – Complete Profile, Workout And Diet"; musclenet.com — "Lee Labrada Bodybuilding Workout Routine" | Both give a **different**, more detailed table (12–16 sets/week for large bodyparts, 9–12 for medium, 6–9 for small; full exercise lists at 3-4x8-12 for every movement) with **no citation** for where/when Labrada said this. It is internally consistent between the two sites but likely shares an untraced common origin (probably an old contest-era magazine feature, not the 12-Week Lean Body Trainer). **Not used for any specific number in this file** — flagged only as a lead pattern (large/medium/small bodypart set-volume tiering) that is plausible but unverified. |

## Verified claims (Tier A/B only)

1. **The 12-Week Lean Body Trainer is Lee Labrada's own official program**, hosted through his Labrada Nutrition brand and (later) BodyFit/Bodybuilding.com, with him personally delivering daily training/lifestyle/motivation videos — not a third-party's guess at his training.
2. **Weekly day rotation (official calendar):** Day 1 Back & Biceps, Day 2 Chest/Shoulders & Triceps (also labeled "Delts & Triceps" in the JEFIT mirror), Day 3 Cardio, Day 4 Legs & Abs, then the cycle repeats with Back & Biceps again — a 7-day rotating cycle across 12 weeks (84 workouts total), not a fixed Mon-Sun template.
3. **Day 1 (Back & Biceps) exercise-level detail (JEFIT mirror of the official program):** Dumbbell Bent-Over Row, Cable One-Arm Lat Pulldown, Barbell Bicep Curl (wide grip), Dumbbell Alternating Bicep Curl, Cable Rope Seated Row — all 3 sets x 12 reps, plus cardio (elliptical).
4. **Day 2 (Chest/Delts & Triceps) exercise-level detail:** Barbell Bench Press, Dumbbell Incline Fly with a Twist, Dumbbell Seated Shoulder Press, Dumbbell Lateral Raise, Barbell Tricep Press (supine) — all 3 sets x 12 reps.
5. **Day 4 (Legs & Abs) exercise-level detail:** Barbell Squat, Dumbbell Lunge, Machine Leg Curl (prone), Barbell Stiff-Leg Deadlift, Dumbbell Seated Calf Raise, Dumbbell Calf Raise, Bench Leg Raise (supine) — all 3 sets x 12 reps.
6. **Program structure:** 12 weeks, 7 workouts/week, 45–60 minutes each, per the official calendar; the 3-phase "Foundation → Intensity/Volume → Cut" progression described in some secondary summaries was not independently confirmed against the primary calendar in this pass and is not used.

## Gaps — left as "Not yet verified from primary sources"

- The Fitness Volt/musclenet "12-16/9-12/6-9 sets by bodypart size" table is a different, uncited claim and is not blended with the verified 12-Week Lean Body Trainer numbers above — the two should not be presented as one unified system.
- Full exercise text for every week/day of the 12-week calendar was not retrieved — only Days 1, 2, and 4 have confirmed exercise-level detail in this pass.
- *The Lean Body Promise* book's own text was not directly reviewed; it may contain additional verified detail and is the top follow-up target.

## Draft copy for `styles.json`

**Summary:** anchor to the *12-Week Lean Body Trainer*, Lee Labrada's own official training program (Labrada Nutrition / Bodybuilding.com BodyFit), a 7-day rotating cycle repeated across 12 weeks with him personally hosting daily videos.

**Principles (Tier A/B only):**
- Founded and fronts Labrada Nutrition since 1995, publishing his own training/nutrition content built around his "Banex" (Balanced Nutrition and Exercise) framework.
- 12-Week Lean Body Trainer rotates Back & Biceps → Chest/Delts & Triceps → Cardio → Legs & Abs, every 3 days across a 7-day cycle, for 84 total workouts.
- Nearly every strength exercise in the official program is 3 sets x 12 reps — a consistent, moderate-rep, moderate-volume template rather than heavy powerlifting-style loading.
- Cardio is scheduled as its own dedicated day within the rotation, not just tacked onto lifting days.

**Guidelines:**
- `trainingDaysPerWeek`: "7 days/week across a rotating 3-day training cycle (Back & Biceps, Chest/Delts & Triceps, Cardio, Legs & Abs) sustained for 12 weeks (84 workouts total)."
- `frequencyPerMuscle`: "Each muscle group hit once every 3 training days within the rotation (i.e., roughly twice per week)."
- `warmupProtocol`: "Not specified beyond the standard 3x12 working-set template in the sources reviewed."
- `workingSetProtocol`: "3 sets of 12 reps per exercise on nearly every strength movement in the official calendar."
- `repRanges`: single documented target — "12 reps" across all lifts in the reviewed days.
- `splitOverview`: Day 1 Back & Biceps, Day 2 Chest, Shoulders & Triceps, Day 3 Cardio, Day 4 Legs & Abs, repeating.

**Sources (Tier A/B first):**
1. "12-Week Lean Body Trainer" — Lee Labrada / Labrada Nutrition, via Bodybuilding.com BodyFit — https://www.bodybuilding.com/fun/lee-labrada-12-week-lean-body-trainer.html
2. *The Lean Body Promise* — Lee Labrada (HarperCollins, 2005) — https://books.google.com/books/about/The_Lean_Body_Promise_Gym_Edition_Collin.html?id=mXEzGwAACAAJ
3. About Lean Body — Labrada Nutrition (official, founder statement) — https://leanbody.com/pages/company
4. "12 week lean body trainer" mirror — JEFIT (sourced to Bodybuilding.com) — https://www.jefit.com/routines/63930/12-week-lean-body-trainer

## Routine buildability

Day 4 (Legs & Abs) maps most cleanly onto `exercises.json`: `barbell-squat`, `walking-lunge`
(stand-in for "Dumbbell Lunge"), `lying-leg-curl` (stand-in for "Machine Leg Curl (Prone)"),
`romanian-deadlift` (stand-in for "Barbell Stiff-Leg Deadlift"), `seated-calf-raise`,
`standing-calf-raise` (stand-in for "Dumbbell Calf Raise") — 6 exercises, all 3x12. "Bench Leg
Raise" has no library match and is omitted (gap, not invented). This is enough for one legitimate
legend routine. Day 1 and Day 2 have thinner matches ("Dumbbell Bent-Over Row" and "Cable One-Arm
Lat Pulldown" have no exact ids) and are left undocumented as routines rather than force-fit.
