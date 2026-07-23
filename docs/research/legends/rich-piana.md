# Primary-source research: `rich-piana` (Rich Piana)

Scope: verify/expand the current `styles.json` entry for Rich Piana against his own brand (5% Nutrition, founded by him) and direct-quote interviews. This file does not edit `styles.json`.

## 1. Source ledger

| # | Title | URL | Tier | Notes |
|---|---|---|---|---|
| 1 | "The Legend Rich Piana" — 5% Nutrition (official, his own brand) | https://5percentnutrition.com/pages/legend-rich-piana | **A** | Already the sole source in the current entry. Official brand he founded in 2014. |
| 2 | "Rich Piana's Workout Tips & Tricks" — 5% Nutrition (official) | https://5percentnutrition.com/blogs/motivation/rich-piana-s-workout-tips-tricks | **A** | Official brand blog; content is presented as Rich's own tips (feeder workouts, iso-tension, warm-up philosophy). |
| 3 | "The Mystique Of Rich Piana" — 5% Nutrition (official) | https://5percentnutrition.com/blogs/motivation/the-mystique-of-rich-piana | **A** | Official brand blog on his stated training philosophy (overtraining skepticism, progression-through-variety, feeder-workout rationale). |
| 4 | "Arm Training With Rich Piana" — Muscle Insider | https://muscleinsider.com/magazine_feature/arm-training-rich-piana/ | **B** | Direct-quote interview on arm training specifics and mindset. |
| 5 | Rich Piana — official YouTube channel | https://www.youtube.com/channel/UCJHroOyfde4rZLTL2Zmk1UQ | **A** (artifact) | Source of the original "8-Hour Arm Workout" video. The original upload has since been made private by whoever now manages the channel (confirmed via multiple secondary reports, ledger #6), so it could not be re-watched/transcribed directly this pass. |
| 6 | "Bodybuilder added 'inch a day' to his giant arms..." — Daily Star | https://www.dailystar.co.uk/news/us-news/bodybuilder-added-inch-day-giant-29953111 | B (secondary report, but preserves direct quotes) | Reports on the (now-private) YouTube video with several direct Piana quotes describing the workout in his own words. Used only to corroborate the structure (16 mini-sessions, every 30 min, 8 hours, one shake per session) via his own quoted words — not for anything not directly attributed to him. |

**Tier A count: 4** (official brand ×3, official YouTube channel ×1) — the strongest source mix of the five athletes in this batch, since 5% Nutrition is a brand he personally founded and still runs branded content about him.

## 2. Current `styles.json` entry (before this pass)

Had one real Tier A source (ledger #1) and two solid principle bullets, but every `guidelines` field and `splitOverview` were "Not yet verified from primary sources."

## 3. Verified training claims

| Claim | Support | Tier |
|---|---|---|
| Founded 5% Nutrition (2014) around the motto "those who are willing to do whatever it takes to achieve their goals" | Ledger #1 (already in current entry) | A |
| "Feeder workouts": short, light, high-rep sessions done for a muscle the day after (or the same night before bed) that muscle was trained, to keep blood/nutrients flowing into it; typically 2 exercises, 2-3 sets × 30-50 reps, or 1-2 sets × 100 reps, done superset-style | Ledger #2, direct description on his own brand's site | A |
| Rejected the concept of overtraining for himself specifically ("Rich believed overtraining was a myth and a sign of weakness" for enhanced athletes), while separately acknowledging natural lifters need to respect recovery more | Ledger #3 | A |
| Progression philosophy: build a strength base early with straight-set compound work, then — once that strength ceiling is reached — switch to moderate weight, higher reps, chasing the pump, with constant exercise/rep-range variety substituting for continued weight increases | Ledger #3 | A |
| Pyramid rep scheme used often, e.g., starting a chest session light at 20-25 reps and working down to a top set of 8-12 reps across several sets | Ledger #3 | A |
| Warm-up philosophy: one solid warm-up set, not "countless" warm-up sets that do nothing for growth — make every set after that count | Ledger #3 | A |
| Iso-tension: flexing/holding a target muscle hard for ~30 seconds at a time throughout the day (not just posing in a mirror), repeated multiple times, without letting on to whoever he was with | Ledger #4, direct quote | B |
| Arm-training exercise pool and stated favorites: overhead cable curls ("basically a double-biceps pose, curling the cables to the head"), hammer curls, hammer concentration curls, dumbbell curls, preacher cable curls; deliberately avoids straight barbell curls; rotates exercise selection constantly | Ledger #4, direct quotes | B |
| "8-Hour Arm Workout": 16 mini-sessions of alternating biceps/triceps supersets, one every 30 minutes for 8 hours, with a protein shake after each mini-session, starting around 8am, using moderate (not maximal) weight so the volume can be sustained all day, described in his own words on his own YouTube channel | Ledger #6, direct quotes preserved from the (now-private) original video: *"It's made up of 16 mini-workouts every half hour throughout the day for eight hours straight... You're gonna start your workout at say 8am and every half an hour it's another workout..."* | A (his own words, via B secondary report since the original video is no longer viewable) |

## 4. Gaps / conflicts

- **No fixed weekly split.** All Tier A sources agree he deliberately changed his workouts/exercises constantly rather than repeating a template — "Variety was his form of progression" (ledger #3). This is a genuine, sourced absence, not an oversight, and `styles.json` should say so honestly rather than reconstructing a fake weekly calendar.
- **The 8-Hour Arm Workout is a single documented special-occasion session, not his everyday routine.** It should be presented in `styles.json` as one specific, well-documented protocol (with an honest "his own words, via a secondary report since the original video is now private" caveat) — not implied to be his typical training day.
- **No specific total weekly training-day count was found in Tier A/B material.** He is broadly reported (multiple Tier C sources, not used here) to have trained very frequently/high-volume, but no Tier A/B source gives an exact days/week number, so `trainingDaysPerWeek` should stay honestly unspecified rather than guessed.

## 5. Draft summary + principles + guidelines (grounded in Tier A/B)

### Summary (draft)
Founder of 5% Nutrition (2014) and one of bodybuilding's most influential self-documentarians, whose own YouTube back catalog remains the primary record of his training. His own brand's official materials describe a deliberately variety-driven approach — no fixed weekly split — built around feeder workouts (frequent, high-rep pump sessions), a progression model that shifts from heavy compound work early on to higher-rep pump-chasing once a strength base is built, and a rejection of "overtraining" as a concept for himself. His single most detailed documented session, the "8-Hour Arm Workout" (16 alternating biceps/triceps supersets every 30 minutes for 8 hours), is presented here as one specific, well-documented protocol, not his everyday training.

### Principles (draft)
- Deliberately varied his workouts and exercise selection constantly rather than repeating a fixed template — "variety was his form of progression" (his own brand's words).
- Feeder workouts — frequent, light, high-rep sessions (2-3 sets × 30-50 reps, or 1-2 sets × 100 reps, superset-style) — to keep blood and nutrients flowing into a muscle between real training sessions.
- Build a strength base early with heavy compound straight sets; once that strength ceiling is hit, shift to moderate weight, higher reps, and chasing the pump rather than continuing to chase heavier numbers.
- One solid warm-up set is enough — he explicitly rejected doing many warm-up sets that don't contribute to growth.
- Iso-tension: hard, sustained (~30 sec) flexes of a target muscle throughout the day, outside of the gym, as a supplementary intensity tool.
- Rejected "overtraining" as a meaningful limit for himself, while separately acknowledging natural (non-enhanced) lifters need more respect for recovery.

### Guidelines (draft)
- **Training days/week:** Not documented with a specific number in Tier A/B material; described only as high-frequency/high-volume overall.
- **Frequency per muscle:** No fixed split documented — exercises and target muscles rotated by feel/variety rather than a repeating weekly calendar.
- **Warm-up protocol:** One solid warm-up set per exercise; explicitly not "countless" warm-up sets.
- **Working-set protocol:** Early strength-building phase uses heavy compound straight sets; once a strength base is built, shifts to moderate weight/higher reps chasing the pump, often in a pyramid (e.g., 20-25 reps down to an 8-12 rep top set).
- **Rep ranges:** Feeder/pump work 30-50 reps (or up to 100 in 1-2 sets); top working sets during the pump-chasing phase 8-12 reps.
- **8-Hour Arm Workout (one specific documented protocol, not an everyday routine):** 16 alternating biceps/triceps supersets, one every 30 minutes for 8 hours, moderate weight, one protein shake after each mini-session.
