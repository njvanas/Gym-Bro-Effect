# Brandon Curry — Primary Source Research (`brandon-curry`)

Target: `src/data/styles.json` → `brandon-curry`. Research only — no data files edited. `styles.json` already cites one Tier B source (Fitness Volt); this research adds a confirmed Tier A official channel and more direct quotes.

## Source Ledger

### Tier A — official YouTube channel

| # | Source | Detail |
|---|--------|--------|
| A1 | "Brandon Curry All Access" — his own official YouTube channel | Confirmed active as of 2025, with him narrating his own training in real time ("I want to bring you back into this world of mine. Today is a leg day... Quad dominant day."). This satisfies the Tier A "official YouTube channel" bar per the methodology doc — should be added to `styles.json`'s `sources` above the existing Fitness Volt citation. |

### Tier B — direct-quote reporting on his own YouTube content

| # | Source | Detail |
|---|--------|--------|
| B1 | Fitness Volt, "Brandon Curry Puts Doubters on Notice..." (Jan 2025) — already cited in `styles.json` | Direct quotes from his own video: *"Training-wise, I've prioritized my leg training... Typically, on a Sunday, I'll have a quad hamstring day dominant. Monday, I'll have a hip-dominant day... Come Thursday, which is usually my high day, I do another quad hamstring-dominant session."* Also: two upper-body days/week, a "horizontal push-and-pull day" pattern, secondary arm/rear-delt work folded into that day. |
| B2 | Fitness Volt, "Brandon Curry Shares His 'Simple But Effective' Leg Day Workout 4 Weeks from 2025 Arnold Classic" | Direct quotes describing specific technique choices: varying foot position on leg press for range of motion, pendulum squats supersetted with calf raises, belt squat lunges explicitly invoking "stimulate, don't annihilate" (crediting Lee Haney's phrase), single-leg hamstring curls, higher reps on adductor machine by preference ("I like to do a little bit higher reps on these... I want to get some work done"). |

## Verified Claims (Tier A/B only)

1. **A specific, named weekly leg-training structure for his 2025 Arnold Classic prep**, in his own words: Sunday quad/hamstring-dominant, Monday hip-dominant (more isolation, less compound), Thursday a second quad/hamstring-dominant "high day" (B1).
2. **Two upper-body training days/week**, structured around a "horizontal push-and-pull" pattern (chest/back pressing and pulling), with arms/rear delts added onto that day because chest and back "don't need a lot" of extra volume for him (B1).
3. **Deliberate leg-press foot-position variation** within a single session (deep range of motion low on platform, then shorter range of motion high on platform) as a specific, quoted technique (B2).
4. **Explicitly credits Lee Haney's "stimulate, don't annihilate" framing** as an active influence on a specific exercise choice (belt squat lunges) — a rare direct cross-legend citation worth preserving (B2).
5. **States a training preference reason, not just a number**: higher reps on the adductor machine specifically because going heavy on that exercise has diminishing returns for him ("once you go really heavy... there's no point in that") (B2).

## Gaps

- No full 7-day `splitOverview` was assembled in this pass — B1/B2 give named training days (Sunday/Monday/Thursday legs, "two other days" upper body) but not a complete day-by-day calendar with every day filled in.
- No warm-up protocol or explicit failure/rest-period rules were found in his own words.

## Draft styles.json Field Suggestions

**Sources to add (above the existing Fitness Volt entry):**
```json
{ "title": "Brandon Curry All Access — official YouTube channel", "url": "https://www.youtube.com/@BrandonCurryAllAccess" }
```
(Verify exact handle before adding — confirmed channel name is "Brandon Curry All Access.")

**Principles (draft additions):**
1. 2025 Arnold Classic prep prioritized legs with three dedicated sessions/week (two quad/hamstring-dominant, one hip-dominant) because his upper body "responds really well really fast."
2. Upper body trained twice/week using a horizontal push/pull structure; arms and rear delts are added onto that day rather than given a standalone session.
3. Deliberately varies leg-press foot position within one session for different ranges of motion on the same movement.
4. Explicitly cites Lee Haney's "stimulate, don't annihilate" philosophy as a live influence on his own exercise selection.

## Weakest-Sourcing Verdict

Well-sourced for this batch — confirmed official YouTube channel plus multiple recent, specific, directly-quoted training breakdowns. Comparable in quality to `hadi-choopan` and `dennis-wolf`.
