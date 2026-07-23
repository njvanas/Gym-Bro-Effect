# Primary-source research: `branch-warren` (Branch Warren)

Scope: verify/expand the current `styles.json` entry for Branch Warren against direct-interview and filmed-at-his-own-gym sources. This file does not edit `styles.json`.

## 1. Source ledger

| # | Title | URL | Tier | Notes |
|---|---|---|---|---|
| 1 | "M&S Legends: How to Train Like a Bodybuilder w/ Branch Warren" — Muscle & Strength (video, direct interview) | https://www.muscleandstrength.com/videos/how-to-train-like-a-bodybuilder-branch-warren | **B** | Already the sole source in the current entry. Direct-quote interview covering the evolution of his training split over his career. |
| 2 | "Branch Warren's Back Workout at MetroFlex Gym" — Muscle & Strength (video, filmed at his own gym) | https://www.muscleandstrength.com/videos/branch-warren-back-workout | **B** | Filmed following Branch through one of his actual back sessions at MetroFlex, post-retirement. Full exercise/set/rep table published alongside the video. |
| 3 | "Branch Warren's Pre-Olympia Workout & Sample Diet Plan" — Muscle & Strength | https://www.muscleandstrength.com/workouts/branch-warren-olympia-workout-diet-plan | **B** | Attributed directly to Branch Warren ("Branch Warren shares his pre-contest 5-day training split"). Full 5-day split with exercise/set/rep tables for every day. |
| 4 | "Branch Warren Names His Fav Bodybuilders, Reflects on Training" — Fitness Volt, reporting on *The Truth Podcast* with Hany Rambod | https://fitnessvolt.com/branch-warren-reflects-training-career/ | B (secondary report of a direct podcast interview) | Direct Branch quotes reported from the podcast, on training partners (Ronnie Coleman, Johnnie Jackson) and post-retirement training intensity. No new numeric claims used from this one — context/flavor only. |

**Tier A count: 0.** No self-authored book, DVD, or official brand site was located for Branch Warren this pass — everything usable is Tier B (direct quotes or filmed-with-him sessions via Muscle & Strength). This matches the roster doc's original "1/2" tier estimate, not a "1 (Yates-level)" one.

## 2. Current `styles.json` entry (before this pass)

Already had a real Tier B source (ledger #1) and some real principle quotes, but every `guidelines` field and the `splitOverview` were still "Not yet verified from primary sources," honestly reflecting that the interview covered *philosophy*, not a concrete exercise-by-exercise template.

## 3. Verified training claims

| Claim | Support | Tier |
|---|---|---|
| Career-long split evolution: started with a 6-day push/pull/legs split (Sundays off) early in his lifting career; switched to a 4-day Yates-inspired HIT split while attending college (lower time budget); moved to a 5-day bodypart split once training for IFBB Pro shows | Ledger #1, direct quotes on each career phase | B |
| Core training philosophy, in his own words: bodybuilding is "about getting as much blood into the muscle as possible during training, working the muscle to failure, and recovering through proper nutrition, supplementation, and rest," done consistently over years | Ledger #1, direct quote | B |
| Trained at Metroflex Gym (Texas) for his whole career; frequent training partner Johnnie O. Jackson from 2001 onward, both known for extremely high-intensity sessions | Ledger #1, #4 | B |
| Controls the weight at all times — even at high intensity, form/control take priority over sloppy momentum (his own words) | Ledger #1, direct quote | B |
| Pre-contest 5-day split (his own, as shared directly): Mon Back, Tue Chest, Wed Rest, Thu Arms, Fri Legs, Sat Lower Back & Shoulders, Sun Off | Ledger #3, full published exercise/set/rep tables per day | B |
| A representative, filmed post-retirement back session at MetroFlex: Barbell Shrugs 3-4×15, Machine T-Bar Row 4×(3×12, 1×20), One-Arm Rows 4×12/side, Cable Rows 3×20, Incline Pulldowns 3-4×12, Machine Rows 3×10, Lat Pulldowns 3×15, with a double drop set on the final exercise's last set | Ledger #2, full published table, filmed directly with Branch | B |
| Even in retirement, trains with the same intensity he brought to his pro career; takes 1-2 weeks fully off after a big show/event, then eases back at 60% before ramping up | Ledger #4, direct podcast quotes | B |

## 4. Gaps / conflicts

- **No single canonical weekly split.** His own interview (ledger #1) describes three *different* splits across three career phases (6-day PPL as a beginner → 4-day HIT in college → 5-day bodypart pre-Pro). The `splitOverview` below follows the **pre-Olympia 5-day split** (ledger #3) since that's the one with a full, directly-attributed exercise/set/rep table — but the summary must flag that this was not his only documented split across his career, exactly per the methodology doc's "name the conflict, pick one source transparently" rule.
- **The back-workout video (ledger #2) is post-retirement**, filmed as a "here's how I still train" demo, not a competition-prep log — used only to corroborate exercise selection and general set/rep ranges, not as the header split.
- **No verified numeric warm-up protocol** (e.g., "50% then 75%" the way Yates's is documented) — the pre-Olympia tables (ledger #3) mark some early sets as "Warmup" without giving exact percentages, so `warmupProtocol` is stated honestly as "warm-up sets before working sets, no fixed percentage documented" rather than inventing a number.

## 5. Draft summary + principles + guidelines (grounded in Tier B only)

### Summary (draft)
Longtime Metroflex Gym (Texas) mainstay and Mr. Olympia top-5 finisher, known for filming and narrating extensive footage of his own training. In his own words, his weekly split changed across three career phases — a 6-day push/pull/legs split early on, a 4-day Yates-inspired HIT split during college, then a 5-day bodypart split once training for IFBB Pro shows — so there is no single canonical "Branch Warren split." The most complete directly-attributed exercise/set/rep template available is his pre-Olympia 5-day split (Muscle & Strength), used below as the split-of-record with that career-phase caveat stated up front.

### Principles (draft)
- Bodybuilding is about maximizing blood into the muscle and training to failure, then recovering through nutrition/supplementation/rest — done consistently for years (his own words).
- Split has changed three times across his career (6-day PPL → 4-day HIT → 5-day bodypart) based on life constraints (time in college) and competitive goals — consistency mattered more than the specific split.
- Full control of the weight at all times, even training at very high intensity — no sloppy momentum.
- High-intensity training partners (Johnnie O. Jackson from 2001 on) pushed his own intensity further.
- Even in retirement, keeps training hard; takes real time off (1-2 weeks) after a big event before ramping back up gradually (~60% initially).

### Guidelines (draft — pre-Olympia 5-day split, the most complete directly-attributed template)
- **Training days/week:** 5 (pre-contest); documented as 6 (early career, PPL) and 4 (college years, HIT) at other career phases.
- **Frequency per muscle:** once per 5-6 day cycle in the pre-Olympia split.
- **Warm-up protocol:** warm-up sets precede working sets on major lifts (e.g., squats, deadlifts) — no fixed percentage/rep count documented.
- **Working-set protocol:** heavy compound lifts anchor each session; several accessory movements per bodypart taken to high-rep pump work; occasional drop sets on a session's final exercise.
- **Rep ranges:** compound lifts (rows, presses) 8-12; pump/accessory work 12-20; some finishing sets as high as 20-30 (e.g., leg press, cable rows).

### Split overview (draft, pre-Olympia 5-day split)
| Day | Focus |
|---|---|
| Monday | Back |
| Tuesday | Chest |
| Wednesday | Rest |
| Thursday | Arms |
| Friday | Legs |
| Saturday | Lower Back & Shoulders |
| Sunday | Off |
