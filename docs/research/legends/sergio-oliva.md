# Sergio Oliva — Primary Source Research (`sergio-oliva`)

Target: `src/data/styles.json` → `sergio-oliva`. Research only — no data files edited. Oliva passed away in 2012.

## Source Ledger

### Tier B — a genuine direct-quote interview excerpt

| # | Source | Detail |
|---|--------|--------|
| B1 | muscleandbrawn.com, "Sergio Oliva Training Routine And Interview" | Contains an actual Q&A-format interview excerpt (marked "SO:" for his responses), in which Oliva discusses training to muscular failure ("a routine, for instance, would have you start with a squat to muscular failure... to the point of not being able to possibly do any more reps") and gives the origin story of his signature "Victory Pose" (developed spontaneously while posing in an unspecified country in the 1960s: *"I lifted my arms up, and everybody went bananas! From that day on everybody started calling me the Myth."*). The site frames a specific routine as "his only true exercise program" — a 6-day/week split hitting each muscle group twice weekly, built on 5×5-pattern work with supersets and antagonistic pairing, plus three 20-rep squat sets on a lighter leg day and no direct hamstring work. |

### Tier C — training-partner/eyewitness accounts (secondhand, but detailed and specific)

| # | Source | Detail |
|---|--------|--------|
| C1 | Marty Gallagher, republished via ironcompany.com | An eyewitness-adjacent account (Gallagher relays stories told to him by the late Jeff Everson, who watched Oliva train at the Duncan YMCA in Chicago during his peak) — not Oliva's own words, but a detailed, named-source secondhand account with specific numbers: e.g., a bench-press/wide-grip-pullup superset ascending to 385×8 lbs bench and descending pullup reps; overhead press, curls, and triceps extensions for 5×5-15 working up to 205 lbs; sit-ups 10×50; squats ascending 315-505 lbs across 5-set schemes. Treat as Tier C — a real, named eyewitness chain, but not Oliva's own statement. |
| C2 | Old School Labs, citing Bob Zulak's April 1984 observation | Another named-eyewitness account (Zulak reportedly counted Oliva's sets directly): 20-30 sets per muscle group, up to 60 sets/workout, high reps (20+ for 6-8 sets on multiple exercises), short rest, "never reaching failure" — this directly **contradicts** B1's framing of training "to muscular failure," a genuine, documented conflict between sources that should be flagged rather than silently resolved. |
| C3 | The Immortal Sergio Oliva (Alexander Cortes, broscienceclub.com) | A modern analytical essay (not an interview) estimating ~60 total sets/week of direct+indirect triceps work alone, describing his style as "ramping" (same-rep, ascending-weight sets) rather than straight sets — analysis, not a primary quote. |
| C4 | Scribd PDF, "15 Things I Learned From Sergio Oliva Sr." | Attributed insights (light warm-ups, 15-25 rep preference even on small muscles, rest-pause technique, a direct quote relayed as said to Bob Kennedy: *"I don't do that 5-6 rep stuff anymore. It's too hard on the joints."*) — uncredited as to original source/date; treat as Tier C. |

## Verified Claims (Tier B, with an explicit, documented conflict)

1. **A specific, quoted training-to-failure statement exists in his own words** (B1) — but this is **directly contradicted** by a separate, named-eyewitness account (Zulak, C2) stating he "never reach[ed] failure like many others." This file flags this as a genuine, unresolved conflict between a Tier B quote and a Tier C eyewitness claim, rather than picking one arbitrarily.
2. **A specific, quoted origin story for his signature "Victory Pose"** — spontaneous, undated beyond "1960s," but genuinely in his own words (B1).
3. **Multiple independent (though all Tier C/secondhand) accounts converge on the same general shape**: very high volume (20-60+ sets per session/week depending on source), high reps (15-25+ common), short rest, ascending/"ramping" weight schemes rather than fixed straight sets, 6 days/week, each muscle group twice weekly (B1, C1, C2, C3).
4. **A specific, quoted, and functionally verified detail**: no direct hamstring work in his documented routines — corroborated across B1 and C1 alike.

## Gaps

- **No source in this pass is a clean, single-voice, dated Oliva interview describing his full program in his own words without secondhand mediation** — B1's interview excerpt is genuine but brief and focused on failure-training philosophy and the Victory Pose story, not a full program breakdown.
- **The failure-vs-no-failure conflict (B1 vs. C2) is unresolved** and should be explicitly stated as a conflict in any `styles.json` copy, per the methodology doc's rule to "name the conflict and pick one, transparently" rather than averaging or silently choosing.
- Exact set/rep numbers vary meaningfully between C1 and C2 (Gallagher's account skews toward heavier, more strength-oriented work; Zulak's account skews toward very-high-volume, no-failure pump work) — these may reflect different eras of Oliva's career rather than a factual error, but this pass could not confirm which era each account describes.

## Draft styles.json Field Suggestions

> Sergio Oliva, "The Myth," is genuinely quoted (in a muscleandbrawn.com interview excerpt) describing training to muscular failure and recounting the spontaneous origin of his "Victory Pose." However, this directly conflicts with a separate, named-eyewitness account (bodybuilding journalist Bob Zulak, cited via Old School Labs) that describes him "never reaching failure" during a documented 1984 observation — a genuine conflict between sources that should be stated explicitly, not resolved by picking a side without evidence. Beyond that conflict, multiple independent (mostly secondhand/eyewitness) accounts converge on the same general shape: 6 days/week, each muscle group trained twice, very high volume (accounts range from ~20 to 60+ sets per session), high reps (commonly 15-25), short rest, ascending "ramping" weight schemes rather than fixed straight sets, and no direct hamstring training.

**Principles (draft):**
1. His own words describe training to muscular failure on at least some lifts (B1) — but a separate, credible eyewitness account describes him never reaching failure (C2). Flag this explicitly as an unresolved source conflict rather than picking one.
2. 6 days/week, each muscle group trained twice — consistent across all sources reviewed.
3. High-volume, high-rep, short-rest, "ramping" (ascending weight, same rep target) training style, rather than fixed straight sets to one top weight.
4. No direct hamstring training in any documented version of his routine.

**Guidelines:** given the direct source conflict on failure training and the wide range of reported set counts (20-60+/session), no single numeric `workingSetProtocol` should be presented as settled fact — state the range and the conflict explicitly.

## Weakest-Sourcing Verdict

Moderate: real material exists (a genuine quoted interview excerpt plus detailed, named eyewitness accounts), but it contains a direct, unresolved factual conflict on the single most important training variable (failure vs. no-failure) — this should be treated as a feature of the research (an honest conflict to disclose), not a bug to silently fix.
