# Lee Priest — Primary Source Research (`lee-priest`)

Target: `src/data/styles.json` → `lee-priest`. Read `00-methodology-and-yates-gold-standard.md` and re-read `blood-and-guts` before using this file.

## Source Ledger

### Tier B

| # | Source | Detail |
|---|--------|--------|
| B1 | Lee Priest, interviewed by Bob Kennedy (byline confirmed on page) for **FLEX magazine**, 2003, republished by **The Barbell**, "Lee Priest, The Early Years: Advice and Full Workout" | The single richest source found for this legend: a dated, attributed, direct Q&A covering his teenage/early-pro training in his own words, plus a full 4-day workout table explicitly labeled "the one young Lee Priest used when he made his greatest gains." Extensive direct quotes used below. |
| B2 | Lee Priest, on-camera in his own words, published on the **Sam's Fitness — Gym Equipment** YouTube channel (30 Apr/5 May 2023), reported with direct quotes by Generation Iron, "How Lee Priest Has Transformed Training From His 20s to 50s" | Priest narrating his current (50+) training in his own words: *"Whatever feels comfortable for you... Don't be one of those people where they go, well, he does them seated, so I have to do them seated when you could... feel it better just standing up."* And on rear delts: *"The main key is your rear delts['] only a small muscle. Don't go... 80 pounds. It's like, come on, you're just pulling with your arms, you're not really focusing on your rear delts. So leave your ego at the door."* Confirms current-era compound lifts at 70-80% of 1RM, full-body 2-3x/week, plus ~2 hours of daily cardio. |

### Tier A (existing, identity/presence)

| # | Source | Detail |
|---|--------|--------|
| A1 | `leepriest.co` — official coaching site — already in `styles.json` | Existing source. |
| A2 | `@RealLeePriest` — "Lee Priest - BE YOURSELF" official YouTube channel — already in `styles.json` | Confirmed active channel; no specific full-workout upload with an exact sets/reps table was located and transcribed in this pass beyond the Sam's Fitness content (B2), which is hosted on a third-party channel he appears in regularly, not his own channel. |

### Tier C (leads only — NOT used for any numeric claim)

| # | Source | Detail |
|---|--------|--------|
| C1 | Sam's Fitness (samsfitness.com.au) — "The Lee Priest MASS Program" | A 4-day mass program (Legs / Back / Shoulders & Arms / Chest & Triceps) presented with videos "featuring Lee himself" and closing with "A Final Word from Lee," but the page does not attribute a date or state which specific numbers are Priest's verbatim words vs. Sam's Fitness's own write-up around his video demonstrations. Overlaps heavily with the independently-sourced and fully-attributed B1 table; not used as the basis for any claim since B1 is stronger. |

## Verified Claims (Tier A/B only)

1. **Early-1990s program (his own words, B1):** "I believe in the old Arnold style of high-volume basic exercises and heavy weights with six to eight reps. I did at least 20 sets per body part, sometimes 30 or more, and that's not counting warmups."
2. **Every set to failure (his own words, B1):** "Yep, every set. If I don't get to failure when I get to eight reps, then I don't count that set. I'll increase the weight and do the set again."
3. **Only named intensity technique — forced reps (his own words, B1):** "I liked forced reps. I've always had a training partner and that person would help me with the last one or two reps, just enough to keep the weight moving."
4. **Instinctive, no fixed program (his own words, B1):** "I go by how I feel. I've always been a very instinctive trainer. I never had a set routine in mind before I started a workout." Split was "most often... four-on and one-off, but sometimes I'd train for two weeks straight if I felt strong."
5. **A full, dated, attributed 4-day split exists** (B1): Day 1 Legs, Day 2 Back, Day 3 Shoulders & Biceps, Day 4 Chest & Triceps, each at 5 sets x 6-8 reps per exercise (leg extension 8-10), calves trained every session for 4-5 sets of 50-100 reps.
6. **Current-era (50+) training has shifted** (B2): full-body sessions 2-3x/week, compound lifts at 70-80% of 1RM with moderate reps, ~2 hours of daily cardio, explicit "ego at the door" cueing on small isolation muscles.

## Gaps — documented honestly

- **Day 3 and Day 4 of the B1 split include several exercises with no matching entry in `exercises.json`** (flat dumbbell flye, dumbbell triceps extension, bench dip, overhead EZ-bar triceps extension, bent-over dumbbell rear lateral) — these two days are therefore **not** added as `routines.json` entries, to avoid inventing or force-fitting substitute exercises. Day 1 (Legs) and Day 2 (Back) map cleanly and are added.
- **No warm-up protocol is specified with sets/%/reps** in either B1 or B2 beyond "that's not counting warmups."
- **B1 describes 1990s-era training; B2 describes 2020s-era training** — these are two different, dated eras with materially different volume/frequency, not one continuous program. `styles.json` follows B1 (the fully detailed split) as its primary reference and notes B2 as the documented later evolution, per the Yates-precedent rule of naming the conflict and picking one primary source transparently.

## Draft Copy (Tier A/B only)

> Lee Priest's own account of the program he used "when he made his greatest gains" as a teenager (2003 FLEX interview) is a 4-day, high-volume split — Legs, Back, Shoulders & Biceps, Chest & Triceps, repeating after one rest day (sometimes two weeks straight if he felt strong) — with 5 sets of 6-8 reps per exercise, every set taken to true failure, and forced reps from a training partner as his only intensity technique. He describes himself as a lifelong instinctive trainer with no fixed routine in mind before a workout. By his 50s, in his own words on camera, he had shifted to full-body sessions 2-3 times a week at 70-80% of his one-rep max, prioritizing joint-friendly volume and daily cardio over the extreme volume of his younger years.
