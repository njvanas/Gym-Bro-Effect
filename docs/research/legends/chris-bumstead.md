# Chris Bumstead — Primary Source Research (`chris-bumstead`)

Target: `src/data/styles.json` → `chris-bumstead`. Read `00-methodology-and-yates-gold-standard.md` and re-read `blood-and-guts` before using this file.

## Source Ledger

### Tier A

| # | Source | Detail |
|---|--------|--------|
| A1 | Chris Bumstead, official YouTube channel (`@ChrisBumstead`), "Push, Pull, Legs Explained \| MY FULL WORKOUT PROGRAM" (published 21 Nov 2019, 4.2M views) | **The single richest first-person training source found across all five legends in this research pass.** A 28-minute, fully narrated, first-person walkthrough of his entire 6-session push/pull/legs rotation (Push 1, Pull 1, Legs 1, Push 2, Pull 2, Legs 2) — explaining *why* he switched from a bro split, giving exercise order and, for most exercises, explicit sets/reps, and demonstrating a self-invented "40-second constant-tension set" technique. Full transcript captured and used below. |
| A2 | Chris Bumstead — official YouTube channel — already in `styles.json` | Confirmed same channel as A1; kept as the general-presence source. |

### Tier B / C (leads only — NOT used for verified claims)

| # | Source | Detail |
|---|--------|--------|
| B1 | "Chris Bumstead's Off Season Chest Building Program" (YouTube, uploaded by a third-party fitness page, not his own channel) | Shows Bumstead walking through a chest session with specific numbers (incline barbell press 4x4-6, etc.), but the channel is not confirmed as his own and the exact tier of the host page was not verified in this pass. Treated as a lead only, not cited. |
| C1 | Generation Iron, Fitness Volt — "Chris Bumstead's 2025 Complete Bodybuilding Workout & Diet Plan" / "Classic Physique Training Blueprint" | Detailed 8-day split tables with per-exercise sets/reps, explicitly sourced to his paid coaching app (`stndrd.app`) rather than a citable public interview or video. Internally consistent with A1's general structure (drop sets, rest-pause, lower-set-count-per-session philosophy) but the exact numbers are behind a paywall this research did not access — treated as uncited aggregator content, not used for verified claims. |

## Verified Claims (Tier A only)

1. **Why he switched to push/pull/legs, in his own words (A1):** "the most optimal way for muscle growth is to train a body part more than once a week" because of the muscle-protein-synthesis recovery window, which he explicitly discusses (~24-48 hours).
2. **Deliberately lower volume per session, higher frequency (A1):** e.g., 2 chest exercises for ~6-8 total sets on a given day (down from ~12-15 on the old bro split), because splitting volume across two sessions a week lets him give "100% full effort" on fewer sets rather than pad out fatigued, lower-quality volume at the end of a long single session.
3. **Weak-point prioritization (A1):** trains his self-identified weakest body parts (back and biceps, his "pull" day) with deliberately elevated intensity/prep — extra caffeine, extra calories — because "I know I need to get in there and I need to [go hard] and fire through that workout."
4. **Self-invented "40-second set" technique (A1):** on several isolation finishers (EZ-bar curls, pec deck, lying leg curl), he abandons rep-counting for a continuous-tension, phone-timer-based 40-second set, explicitly because it "kind of forces you to bring a little bit more intensity."
5. **Rest days are taken by feel, not on a fixed calendar (A1):** he runs push/pull/legs twice through with rest inserted wherever his body (particularly his lower back) needs it, not a fixed weekly schedule.
6. **Specific, attributed sets/reps for several exercises (A1):** squat day — 3 warm-up sets, then 3 working sets of 8-10 reps, then 1-2 progressively heavier top sets; rack pulls — 2 working sets of 8-10 reps; standing calf raise — 4 sets of 10-12 reps then burnout reps to failure; leg extension — 2 sets of 10-12 reps then 2 triple drop-sets; leg press (superset with calf raises on the platform) — 2 sets of ~40 seconds continuous tension.
7. **Drop sets are the only intensity technique confirmed in his own words/demonstration** in A1 (quad extension triple drop-set; dumbbell curl finisher drop set). Rest-pause and other techniques appear in the separately-hosted B1 video, which is not confirmed as his own channel, so they are **not** added to `intensityTechniques`.

## Gaps — documented honestly

- **This entry is dated to a specific 2019 video.** Bumstead has continued publishing training content since (chest-day breakdowns, "Off Script" vlogs, his own coaching app), and his day-to-day program is likely updated inside `stndrd.app`, which was not accessed for this research. `summary` flags this explicitly.
- **Several exercises in the video have no stated numbers** (e.g., lat pulldown warm-up reps, incline dumbbell curl sets, reverse-grip row/pulldown sets, cable curl sets) — these are described qualitatively ("start really light," "keep it really light") but no set/rep count is given, so they are **not** included in the added `routines.json` entry or presented as verified numeric claims.
- **Only Legs 2 (squat day) maps cleanly onto existing `exercises.json` ids** with fully-stated numbers for every included exercise (barbell-squat, leg-press-horizontal, standing-calf-raise, leg-extension); this is the only routine added. The hip-adductor exercise he mentions on this day has no matching entry in `exercises.json` (no "adductors" muscle group in the schema) and is described in the routine's notes rather than invented as a new exercise.

## Draft Copy (Tier A only)

> Chris Bumstead's own YouTube channel hosts a full, dated (Nov 2019), first-person walkthrough of his push/pull/legs program — the most complete self-documented training video found for any of the five legends in this research pass. He trains each muscle roughly twice per 6-session rotation rather than once, deliberately trims volume per session to compensate, prioritizes his self-identified weak points (back, biceps) with elevated intensity, and uses a self-invented 40-second constant-tension set on several isolation finishers instead of counting reps. His day-to-day program has likely evolved since inside his paid coaching app, which this research did not access.
