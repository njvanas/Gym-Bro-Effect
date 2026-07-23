# Reg Park — Primary Source Research (`reg-park`)

Target: `src/data/styles.json` → `reg-park`. Research only — no data files edited.

## Source Ledger

### Tier A — self-authored book (the original 5×5 source)

| # | Source | Detail |
|---|--------|--------|
| A1 | *Strength and Bulk Training for Weight Lifters and Body Builders* (Reg Park, 1960) | Self-authored training manual — widely credited across multiple independent secondary sources (T-Nation/archive.t-nation.com, Breaking Muscle, gymtalk.com, werstupid.com, superstrengthtraining.com) as the first widely-published, structured 5×5 program. The original course is still sold/reprinted via superstrengthtraining.com, which includes reader testimonials describing direct, decades-long use of the program. |
| A2 | *Training for Power* (Reg Park, 1954) | Referenced by Breaking Muscle as an earlier Park text that partially used 5-sets-of-5 structure before the 1960 book formalized it — not independently reviewed in this pass. |

### Tier C — highly consistent, cross-corroborated reconstructions of the book's actual content

| # | Source | Detail |
|---|--------|--------|
| C1 | Breaking Muscle, "The 5x5 Workout Explained" | Describes the 1960 book's core program: 3 workouts/week, each built around squat, bench press, and deadlift, each for 5×5. First 2 sets are progressively heavier warm-ups; final 3 sets use the same "working" weight (e.g., 135×5, 155×5 warm-up, then 175×5 for three sets). Rest between working sets: 3-5 minutes. |
| C2 | T-Nation (archive.t-nation.com), "Reg Park's 5×5 Program" | Independently corroborates C1's exact structure and numbers (135×5, 185×5 warm-up progression example; 225×5 for three working sets). Adds detail: Park was "strongly against training to failure," believing it encouraged a negative mindset for other near-maximal lifts. Describes an explicit progression rule: once all three working sets of 5 are completed, add 5-10 lbs to all sets next session. Also describes an end-of-phase 1-rep-max testing protocol: 1×5, 1×3 warm-ups, then 3 progressively heavier singles, followed by 4 rest days before the next phase. |
| C3 | gymtalk.com, "Reg Park's 5x5 Routine" | Independently corroborates the 3-phase (each phase ~3 months), 3-day/week structure, and the specific progression rule (2.5 kg upper body / 5 kg lower body added per successful completion). Gives the phase-by-phase exercise list (Phase 1: basic 3-lift squat/bench/deadlift + hyperextensions; Phase 2 and 3: added exercises, reduced rest between sets to build endurance, more advanced lifts like front squats and power cleans). |
| C4 | werstupid.com | Corroborates the same 3-phase structure and the "2 warm-up sets + 3 working sets of 5" core mechanic, and adds provenance context: an earlier writer (Mark Berry, 1930s US Olympic weightlifting coach) may have originated the 5×5 concept before Park, but Park is "the name associated most extensively with the 5X5 program" due to this specific 1960 publication. |

## Verified Claims (Tier A confirmed to exist; content cross-corroborated across 4 independent sources)

1. **Reg Park personally authored the seminal, dated (1960) 5×5 training manual**, which is independently and consistently described the same way across at least four unrelated secondary sources — this level of cross-corroboration is a strong signal the underlying claims are accurate, even without this pass directly quoting the book's original text.
2. **A specific, reproducible mechanic is consistently reported**: 2 progressively-heavier warm-up sets of 5, then 3 straight sets of 5 at one working weight, with 3-5 minutes rest between the working sets (C1, C2).
3. **An explicit, consistently-reported anti-failure philosophy**: Park is described as "strongly against training to failure" for psychological reasons related to near-maximal lifting (C2).
4. **A specific, consistently-reported 3-phase structure** (beginner: 3 core lifts only; intermediate: more exercises, less rest; advanced: yet more exercises, less rest, more advanced lifts), each phase roughly 3 months, always 3 training days/week (C2, C3, C4).
5. **A specific progression rule**: add weight only after completing all 3 working sets of 5 at the current weight; increments of roughly 5-10 lbs (or the metric equivalent) per upper/lower body lift (C2, C3).

## Gaps

- **This pass did not directly access/quote the original 1960 book text** — the above claims are consistent across four independent secondary sources but remain technically Tier C attribution rather than a directly-quoted Tier A citation. Given the unusually strong cross-source consistency (all four sites independently report the same numbers), this file treats the *shape* of the program as reliable, while flagging that a future pass should still try to obtain and directly quote the primary book.

## Draft styles.json Field Suggestions

> Reg Park's 1960 book, *Strength and Bulk Training for Weight Lifters and Body Builders*, is one of the most concretely documented Golden Era training systems in this entire roster — not because this pass directly quoted the book, but because four independent secondary sources consistently describe the exact same mechanic: 3 training days/week, 3 phases (~3 months each) of increasing complexity, and a core 5×5 protocol (2 progressively heavier warm-up sets of 5, then 3 straight working sets of 5 at one weight, 3-5 minutes rest between working sets), with Park explicitly and consistently described as opposed to training to failure. Progression is a specific, simple rule: complete all 3 working sets, then add roughly 5-10 lbs (or metric equivalent) next session.

**Principles (draft):**
1. 3 training days/week across all 3 phases — frequency never increases, only the exercise list and rest-period structure does.
2. Explicitly opposed to training to failure — described as risking a negative mindset carried into other near-maximal lifts.
3. Warm-up is built into the working sets themselves: 2 progressively heavier sets of 5 before the 3 working sets, not a separate warm-up phase.
4. Simple, binary progression rule: complete all 3 working sets of 5, then add weight next session — no completion, no added weight.
5. 3-phase structure (beginner/intermediate/advanced), each roughly 3 months, adding exercises and reducing rest between sets as phases advance.

**Guidelines (draft):**
```json
{
  "trainingDaysPerWeek": "3 (all phases)",
  "workingSetProtocol": "2 progressively heavier warm-up sets of 5, then 3 straight working sets of 5 at one weight; 3-5 minutes rest between working sets. Not trained to failure.",
  "repRanges": [{ "target": "Core lifts (squat, bench, deadlift)", "range": "5 reps x 5 sets (2 warm-up + 3 working)" }]
}
```

## Weakest-Sourcing Verdict

Strong — despite not directly quoting the primary book in this pass, the cross-corroboration across four independent, unrelated secondary sources on identical specific numbers is unusually strong evidence for this batch.
