# Shawn Rhoden — Primary Source Research (`shawn-rhoden`)

Target: `src/data/styles.json` → `shawn-rhoden`. Research only — no data files edited. Rhoden passed away in 2021.

## Source Ledger

### Tier A — an official documentary featuring him as the subject

| # | Source | Detail |
|---|--------|--------|
| A1 | *Flexatron: Becoming Shawn Rhoden* — feature documentary (Generation Iron) | Tracks his 2018 Olympia-winning training cycle in depth, including his relationship with trainer Chris "Psycho Fitness" Lewis and training partner "Stanimal." He is the subject/participant, not the narrator, so this sits between Tier A and B — closer to Tier A than a generic third-party recap because it is a dedicated, feature-length documentary built around him with his direct participation (comparable in kind, if not in ownership, to Jay Cutler's *One Step Closer*). |

### Tier B — direct filmed training sessions with sets/reps published

| # | Source | Detail |
|---|--------|--------|
| B1 | Muscle & Strength, "Shawn 'Flexatron' Rhoden's Heavy Olympia Prep Leg Workout" (filmed in Santa Barbara with coach Chris Lewis) | A genuine filmed session with a published sets/reps table: Leg Extension 3× (drop sets, ~21 sec time-under-tension), Smith Machine Squat 4×6-8, Machine Front Squat 4×8-10, Leg Press 4×10-12, Standing Hamstring Curl 3×8-10. Coach explicitly varies squat pattern week to week (back squat one week, Smith machine the next) specifically to build muscle through varied stimulus. |
| B2 | Fitness Volt, "Road To Olympia 2018: Dexter Jackson And Shawn Rhoden Workouts" | Confirms a filmed chest session with Stanimal at 6 weeks out from the 2018 Olympia — describes the session as "grueling" but does not give a detailed sets/reps breakdown in the excerpt reviewed. |
| B3 | Generation Iron, "Psycho Fitness On 'Bamboozling' Phil Heath..." | This is his coach's account of the 2018 prep, not Rhoden's own words — useful for corroborating that a real, intense training relationship existed, and for the psychological/competitive strategy context, but should not be cited as a Rhoden quote. |

## Verified Claims (Tier A/B only)

1. **A specific, filmed, and published leg-day sets/reps table exists** from his actual 2018 Olympia prep, including a stated coaching rationale for exercise variation (alternating back squat and Smith machine squat week to week specifically to avoid staleness/plateau) (B1).
2. **A dedicated, feature-length documentary about his training cycle exists and is a legitimate primary-adjacent source** (A1) — one of the few names in this batch with an actual documentary built around a single competitive cycle.
3. **A confirmed, active training partnership and coaching relationship (Chris "Psycho Fitness" Lewis, training partner Stanimal) is well corroborated** across B1, B2, and B3.

## Gaps

- **A1 (the documentary) was not directly transcribed in this pass** — this is the single best remaining lead for additional verified detail, since it's described as covering his training "in depth."
- No first-person Rhoden quotes about his own training philosophy (as opposed to his coach's account, B3) were found in this pass — everything verified here is either a filmed/published workout (B1) or his coach's retrospective account, not Rhoden's own stated words.
- No upper-body sets/reps table with the same specificity as the leg session (B1) was found.

## Draft styles.json Field Suggestions

> Shawn Rhoden's best-documented training material is his actual, filmed 2018 Mr. Olympia prep under coach Chris "Psycho Fitness" Lewis, captured in both a published leg-day workout (Leg Extension drop sets, Smith Machine Squat 4×6-8, Machine Front Squat 4×8-10, Leg Press 4×10-12, Standing Hamstring Curl 3×8-10) and a dedicated feature documentary, *Flexatron: Becoming Shawn Rhoden*. His coach's stated rationale for the training — deliberately varying squat pattern week to week to avoid staleness — is documented, but no first-person Rhoden quote about his own training philosophy was confirmed in this research pass; the available material describes what he did and how his coach designed it, not what Rhoden himself said about it.

**Principles (draft):**
1. Squat pattern deliberately varied week to week (back squat vs. Smith machine) specifically to avoid training staleness, per his coach's stated rationale.
2. Leg extensions used with drop sets and extended time-under-tension (~21 sec) as a pre-exhaust/finisher technique.
3. Trained with a dedicated, consistent training partner (Stanimal) through his title-winning 2018 prep.

**Guidelines (draft, leg day only):**
```json
{ "workingSetProtocol": "Leg extension drop sets for time-under-tension pre-exhaust, then squat pattern (varied weekly) 4x6-8, machine front squat 4x8-10, leg press 4x10-12, standing hamstring curl 3x8-10." }
```

## Weakest-Sourcing Verdict

Moderate — real, filmed, specific training material exists (a rarity for this batch), but it documents his coach's design more than Rhoden's own stated philosophy, and the best remaining source (the documentary) was not fully mined in this pass.
