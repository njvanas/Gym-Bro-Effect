# Lou Ferrigno — Primary Source Research (`lou-ferrigno`)

Target: `src/data/styles.json` → `lou-ferrigno`. Research only — no data files edited.

## Source Ledger

### Tier B — current, filmed, direct-quote training content (major outlet)

| # | Source | Detail |
|---|--------|--------|
| B1 | *Men's Health*, "Lou Ferrigno's No-Distraction Hulk Workout | Train Like a Celebrity" (video, ~age 69) | Filmed, demonstrated workout with exact sets/reps published alongside: Warm-up (10 min treadmill), then Machine Chest Press 3×12, Machine Preacher Curl 3×12, Alternating Dumbbell Curl 3×8-10/arm, Triceps Kickback 3×8-10/arm. Direct quotes on gym etiquette and training philosophy. |
| B2 | *Men's Health UK*, "Lou Ferrigno Still Boasts a Hulking Physique at 74 – These Rules Help Him Maintain Strength and Size" (2025/2026) | Updated version of the same workout at age 74, with direct quotes on his current philosophy: *"I feel that all isolation..."* [exercises are now his priority over heavy compound work], and biographical context on his training origin (built a makeshift barbell from junkyard parts as a poor teenager) and his description of training as lifelong "therapeutic," giving him "a great feeling" and a sense of controllable progress. Confirms he trains in silence due to his hearing situation, prioritizing focus. |
| B3 | Multiple 2025 convention Q&As (Houston Life, 11Alive, GalaxyCon OKC) | Direct-quote confirmation of consistent themes: moderation over intensity, prioritizing 7-8 hours of sleep, balanced diet, and training in silence for focus — corroborated across three independent, dated 2025 appearances. |

## Verified Claims (Tier B, cross-corroborated across at least 2 dated instances)

1. **A specific, filmed, exact-sets/reps current workout is published and directly attributed to him**, at two different ages (69 and 74) with the same core structure (machine chest press, machine preacher curl, alternating DB curls, triceps kickbacks, each 3 sets, 8-12 reps) — a genuinely reproducible, dated program, not a vague description (B1, B2).
2. **An explicit, stated shift toward isolation work and away from heavy compound lifting** as he's aged, directly quoted in his own words (B2).
3. **Trains in silence, deliberately, for focus** — a specific, repeated, self-described habit tied to a hearing condition, corroborated across B2 and B3 (multiple separate 2025 appearances).
4. **States sleep (7-8 hrs/night) and diet balance as explicit priorities over training intensity** — a consistent theme across multiple, independently dated 2025 interviews (B3).
5. **His training origin story is directly quoted and specific**: built his own weights from junkyard scrap as a poor teenager, and describes training as "therapeutic" from the very start (B2).

## Gaps

- The published workout (B1, B2) is a short "keep it simple" maintenance session for a septuagenarian, not a reconstruction of his 1970s Mr. Universe-era training — any `styles.json` entry should be explicit that this is his *current* training philosophy, not his competitive-era program (for which no equally well-sourced Tier A/B material was found in this pass).
- No explicit rest-period or warm-up-beyond-treadmill detail was found for the current routine.

## Draft styles.json Field Suggestions

> Lou Ferrigno's best-documented material is his *current* (septuagenarian) training approach, published with exact sets/reps by *Men's Health* at two different ages (69 and 74): a machine- and isolation-focused, low-fatigue maintenance session (10-min treadmill warm-up, then machine chest press, machine preacher curl, alternating dumbbell curls, and triceps kickbacks, each for 3 sets of 8-12 reps), trained in silence for focus. He is directly quoted stating a deliberate shift toward isolation work as he's aged, and consistently emphasizes sleep (7-8 hours) and diet balance as being as important as the training itself. No equally well-sourced material for his 1970s competitive-era training was found in this pass — the entry should not conflate his current maintenance routine with his Mr. Universe-era program.

**Principles (draft):**
1. Current training deliberately favors machines/isolation work over heavy free-weight compounds, as an explicit, stated adjustment for his age.
2. Trains in silence for focus, tied to a specific personal hearing condition — a repeatable, self-described habit, not incidental.
3. States sleep (7-8 hrs) and diet balance as equal priorities to training itself.
4. Views training as lifelong "therapeutic" activity, a framing traced back to his teenage origin story.

**Guidelines (draft, current-era only):**
```json
{
  "trainingDaysPerWeek": "Not specified in sources reviewed; likely low-frequency maintenance given his age and stated philosophy.",
  "workingSetProtocol": "3 sets per exercise, 8-12 reps, machine/isolation-focused, no heavy compound emphasis stated.",
  "warmupProtocol": "10-minute treadmill walk/jog before working sets."
}
```

## Weakest-Sourcing Verdict

Well-sourced for his *current* training (a major outlet, filmed, exact numbers, at two different dated ages) — the gap is his historic competitive-era program, not his current voice.
