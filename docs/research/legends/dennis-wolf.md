# Dennis Wolf — Primary Source Research (`dennis-wolf`)

Target: `src/data/styles.json` → `dennis-wolf`. Research only — no data files edited.

## Source Ledger

### Tier A — his own YouTube channel

| # | Source | Detail |
|---|--------|--------|
| A1 | "Wolfteam Forum" — Dennis Wolf's own YouTube channel | Confirmed active as of January 2026 (a Fitness Volt piece from that month is built entirely on quotes from a new upload). This is his channel, in his own voice, describing his current (retirement-era) training in real time. |

### Tier B — direct-quote reporting on his own video/interview content

| # | Source | Detail |
|---|--------|--------|
| B1 | Fitness Volt, "Dennis Wolf Feels 30 Years Old at 47, Shares How He's Staying Lean at 237 Pounds" (Jan 2026) | Extended direct quotes from his own YouTube video: current training is 3x/week (down from 5-6x/week in competitive prime), explicitly framed as a recovery-driven change — *"I need more time to recover, and I think I've figured it out, and it works."* Names a specific current split: Tuesday (back & shoulders), Thursday (back & arms), Saturday (legs), each session opening with abs as a warm-up. |
| B2 | Generation Iron, "Dennis Wolf Feels 30 At 47" | Same story, corroborating detail. |
| B3 | *Muscle & Fitness/Flex*, "Dennis Wolf: Mass with Class" | Describes his competitive-prime training approach: always starts each bodypart with a free-weight compound lift first (bench press for chest, barbell curls for biceps) while strength/energy are highest, then adds isolation/machine work for shape. States his own rep preference: 10-12 reps for most muscle groups, up to 20 for hamstrings, up to 25 for calves/abs. Typically 3-4 exercises and 12-16 total sets per bodypart, with calves/abs trained more frequently at lower per-session volume, and overall set volume increased in the last 4-5 weeks before a contest (a direct quote: *"In the last four to five weeks before a contest, I increase my overall sets."*). Also notes he trains calves at least 4x/week as a self-assessed lagging bodypart. |
| B4 | Generation Iron, "Dennis Wolf Full Interview | 2018 Comeback..." | Direct-quote interview; confirms a spinal injury requiring surgery interrupted his career, and he identifies his back as his personally hardest bodypart to develop to Olympia standard, despite feeling it was a strength relative to average lifters. |

## Verified Claims (Tier A/B only)

1. **Two clearly distinct, dated training eras exist in his own words**: competitive-prime (5-6 days/week, 4-days-on/1-off, higher volume) vs. current retirement-era (3 days/week: Tue/Thu/Sat, explicitly recovery-driven) (B1, B3).
2. **A specific current split is directly quoted**: Tue = back & shoulders, Thu = back & arms, Sat = legs, every session opening with abs (B1).
3. **A specific competitive-era training rule is directly quoted**: free-weight compound lift always performed first per bodypart, while energy is highest (B3).
4. **Rep-range preferences by bodypart are directly quoted**: 10-12 reps general, up to 20 for hamstrings, up to 25 for calves/abs (B3).
5. **Pre-contest volume increase is an explicit, quoted rule**, not a guess: total sets go up in the final 4-5 weeks before competing (B3).
6. **Calves trained at least 4x/week** as a self-identified lagging bodypart (B3).

## Gaps

- B3 (the fullest program-level source) is a *Flex*/M&F feature, not a verbatim first-person essay — treat its numeric claims as reliable Tier B (magazine interview format, consistent with his other quotes) but not word-for-word Wolf quotes throughout.
- No warm-up protocol or rest-period specifics were found in his own words.

## Draft styles.json Field Suggestions

> Dennis Wolf has two well-documented, self-described training eras: a high-volume competitive prime (5-6 days/week, always leading each bodypart with a free-weight compound lift, 10-12 reps generally, up to 25 for calves/abs, with total sets increasing in the final 4-5 weeks before a show) and a current, explicitly recovery-focused retirement routine (3 days/week — Tuesday back/shoulders, Thursday back/arms, Saturday legs — each opening with abs), which he attributes directly to needing more recovery time as he's aged.

**Principles (draft):**
1. Always perform a free-weight compound lift first per bodypart, while strength and energy are highest.
2. Rep ranges scale by bodypart: 10-12 reps generally, up to 20 for hamstrings, up to 25 for calves/abs.
3. Increase total working sets in the final 4-5 weeks of contest prep.
4. Calves trained at least 4x/week when identified as a lagging bodypart.
5. Post-competition, deliberately reduced training frequency (5-6 days → 3 days/week) for recovery, not laziness — a stated, reasoned change, not a decline.

**Guidelines/splitOverview (draft, current era):**
```json
{
  "trainingDaysPerWeek": "3 (Tuesday/Thursday/Saturday), down from 5-6 in his competitive prime — an explicit, stated recovery choice",
  "splitOverview": [
    { "day": "Tuesday", "focus": "Back and shoulders (opens with abs)" },
    { "day": "Thursday", "focus": "Back and arms (opens with abs)" },
    { "day": "Saturday", "focus": "Legs (opens with abs)" }
  ]
}
```

## Weakest-Sourcing Verdict

Well-sourced — an active personal YouTube channel plus a detailed *Flex*/M&F feature and multiple Generation Iron interviews give both an old and current, well-corroborated training picture.
