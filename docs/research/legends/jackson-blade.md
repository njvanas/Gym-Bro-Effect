# Primary-source research: `jackson-blade` (Dexter Jackson)

Scope: verify the current `styles.json` entry for Dexter Jackson against sources FROM Dexter Jackson or his official brand (his own YouTube/Instagram, Built By Blade coaching, Dexter Jackson Signature Series supplements) wherever possible. This file does not edit `styles.json`.

## 1. Source ledger

| # | Title | URL | Tier | Notes |
|---|---|---|---|---|
| 1 | "The Blade" — Iron Man Magazine (Dexter Jackson interview, 2004) | https://www.ironmanmagazine.com/the-blade/ | **B** | Full direct Q&A. The single richest verified source: exact sets/reps/exercises for both his prior 3-day split and his new (2004) 5-day split, plus his stated training philosophy. |
| 2 | Dexter Jackson's YouTube channel (`@DexterJacksonTheBlade`) | youtube.com/@DexterJacksonTheBlade (URL confirmed to exist via search; not directly fetched in this pass) | **A** | His own channel — chest/arm/back workout uploads, "Road to the Olympia" content, Q&A. |
| 3 | Dexter Jackson's Instagram (`@mrolympia08`) | instagram.com/mrolympia08 (referenced by multiple secondary outlets; not directly fetched) | **A** | His own account; several Tier C aggregator posts embed/quote it directly. |
| 4 | Built By Blade (his current official coaching site) | https://builtbyblade.com/ | **A** | Official current-day coaching bio/offer. Marketing copy only — no set/rep programming detail found on-page. |
| 5 | Dexter Jackson Signature Series (his supplement brand) | https://dextersupplements.com/ and https://dextersupplements.com/blogs/news/introducing-the-dexter-jackson-signature-series-to-the-u-s-market | **A** | Official brand; supplement-focused, no training programming content found. |
| 6 | "Olympia Legend: Dexter Jackson" ("Dexter's Secrets") — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/training/dexters-secrets/ | **B** | Direct Dexter + Charles Glass quotes on his post-2010 shift to machine-based, mind-muscle training and away from heavy free-weight squats. |
| 7 | "Dexter Jackson: Armed and Still Dangerous" — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/training/dexter-jackson-armed-and-still-dangerous/ | **B** | Direct quotes on his biceps/triceps routine structure (machine → free-weight two-arm → dumbbell), 21-curls technique from Charles Glass. |
| 8 | "Dexter Jackson's 7 Keys to Building Quality Muscle" — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/training/dexter-jacksons-7-keys-building-quality-muscle/ | **B** | Direct quotes: 4 sets of 8–10 reps for biceps staples; "mostly...straight sets," occasional forced reps/supersets; mind-muscle cueing. |
| 9 | Getbig Interview: Dexter Jackson (Feb 2004) | http://www.getbig.com/iview/jackson040205.htm | **B** | Direct Q&A confirming the 2004 shift from 3 to 5 training days/week and the "Blade"/"Action Jackson" nickname origin. |
| 10 | "Dexter Jackson Credits Time Off, Machine Work For Longevity" — Generation Iron | https://generationiron.com/dexter-jackson-tips-machine-work-time-off/ | C (secondary report) | Reports on an **OlympiaTV** interview, quoting Dexter directly ("I went from doing all those heavy compound movements... and started doing mostly machine work... You're not going to lose muscle mass... doing machine work."). Underlying primary is the OlympiaTV interview, not this write-up. |
| 11 | "Dexter Jackson Maintains Herculean Chest With This Training Routine" — Fitness Volt | https://fitnessvolt.com/dexter-jackson-chest-training/ | **C** | Reports on his own May 2023 YouTube video but pads with unrelated third-party study citations (Schwanbeck et al.) as generic aggregator filler. Direct Dexter quote on joint pain/machines is real but secondhand here. |
| 12 | "Dexter Jackson Rips His Chest Up With This Efficient Workout" — Breaking Muscle | https://breakingmuscle.com/dexter-jackson-chest-workout-2023/ | **C** | Same underlying May 2023 YouTube video as #11, more exercise/set/rep detail (4×10 on several plate-loaded-machine movements). |
| 13 | "Dexter Jackson Pushes His Chest to the Limit..." — Colosseum Strength | https://colosseumstrength.com/dexter-jackson-pushes-his-chest-to-the-limit-with-an-intense-workout/ | **C** | Same underlying video again, redundant third aggregator. |
| 14 | "Dexter Jackson's Workout Routine" — Dr Workout | https://www.drworkout.fitness/dexter-jackson-workout-routine/ | **C** | Generic profile/aggregator: "4-day split," "3–4 sets," "5 to 8 exercises" — no direct quote or dated source. |
| 15 | "Dexter Jackson Diet and Workout Program" — Fitness Volt | https://fitnessvolt.com/dexter-jackson-diet-training-program/ | **C** | Aggregator, but carries a real direct Dexter quote contrasting himself with Coleman/Yates ("they kind of fell apart at the end because they didn't change their training"). |
| 16 | "Dexter Jackson's Sleeve-Ripping Arm Workout" — Generation Iron | https://generationiron.com/dexter-jackson-arm-workout/ | **C** | Reports on his own YouTube arm-workout upload (circuit/quad-set triceps training); underlying video is Tier A, this write-up is Tier C. |
| 17 | "Charles Glass Bodybuilding Workout" — Fitness Volt | https://fitnessvolt.com/charles-glass-bodybuilding-workout/ | **C** | General profile of trainer Charles Glass (not Dexter-specific quotes), useful context only. |

**Tier A count: 3 brand properties identified** (his own YouTube channel, his Instagram, Built By Blade / Dexter Supplements), but **0 were transcribed set-by-set in this pass** — the channel/IG posts are referenced only through Tier C aggregator write-ups (#11–13, #16). No direct fetch of his YouTube or Instagram content was performed.

## 2. Current `styles.json` sources that are Tier C and should be demoted/removed

Current `sources[]` for `jackson-blade`:
1. "The Blade — Iron Man Magazine (Dexter Jackson interview)" — **B**, keep; this is the backbone of the entry and holds up well.
2. "Dexter Jackson chest training - Fitness Volt / YouTube" (`fitnessvolt.com/dexter-jackson-chest-training/`) — **worst dependency**: Tier C aggregator that pads a real (but secondhand) Dexter quote with unrelated stock research citations. Should be swapped for a direct link to his own YouTube upload (the May 2023 chest-workout video referenced by ledger #11/#12/#13) rather than a third-party recap.
3. "Dexter Jackson on machines & longevity - Generation Iron" (`generationiron.com/dexter-jackson-tips-machine-work-time-off/`) — Tier C secondary report of an OlympiaTV interview. Direct quotes are genuine, but the citation should point to the OlympiaTV interview itself if it can be located, not the Generation Iron recap.

## 3. Best primary alternatives found

- **`youtube.com/@DexterJacksonTheBlade`** — his own channel with dated uploads (e.g., a May 14, 2023 chest-workout video that three separate Tier C outlets independently recapped with consistent exercise/set/rep numbers — a good sign the underlying video is accurately reported, even though this file could not fetch the video directly).
- **Instagram `@mrolympia08`** — primary source for several of the "recent tips" style aggregator articles; not directly fetched here.
- **Built By Blade** (`builtbyblade.com`) and **Dexter Supplements** (`dextersupplements.com`) — official current-day brand properties, useful for bio/positioning but did not yield programming detail in this pass.
- **Iron Man Magazine's "The Blade" interview** (ledger #1) remains the best single non-owned source: it is a full, dated, direct Q&A rather than a paraphrase.

## 4. Verified training claims (grounded in Tier A/B)

| Claim | Support | Tier |
|---|---|---|
| Trained 3 days/week for several years (chest+back Tue, legs Thu, shoulders+arms Fri) before 2004 | Ledger #1 (direct quote) | B |
| ~10 working sets per body part on that 3-day routine, across 2–3 exercises | Ledger #1 (direct quote: *"About 10 working sets per bodypart, divided over two to three exercises."*) | B |
| Switched to 5 days/week in 2004 with a new training partner: Mon chest+abs, Tue back+calves, Wed/Thu off, Fri quads, Sat shoulders+arms, Sun hamstrings | Ledger #1, corroborated by #9 (Getbig, same period, confirms move from 3 to 5 days/week) | B |
| On the 5-day plan: most exercises 3–4 sets (5 on squats), reps kept low at 6–10 for compounds ("I need to train heavy to get that full look") | Ledger #1 (direct quote) | B |
| Leg extensions/curls done for very high reps (30 reps/set) for detail | Ledger #1 (direct quote) | B |
| Supersets used "all the time"; forced reps only "once in a while" | Ledger #1 (direct quote) | B |
| Rep cadence: mostly 1-second up / 1-second down | Ledger #1 (direct quote) | B |
| Favorite/staple exercises: squats, bench press, rows, chins ("the bread and butter... exercises I have to do") | Ledger #1 (direct quote) | B |
| Trains smart, not through injury: takes time off to heal fully rather than train hurt | Ledger #1 (direct quote) | B |
| Later career (post-2010ish, working with Charles Glass): shifted substantially toward machines and isolation work, moved away from heavy free-weight squats to protect joints | Ledger #6, #10, #11 (all with direct Dexter/Glass quotes) | B/B/C(reporting) |
| Biceps: moderate volume/reps, ~4 sets of 8–10 reps, framework of machine → free-weight two-arm → dumbbell exercise | Ledger #7, #8 (direct quotes) | B |
| Explicit self-comparison: attributes his longevity (vs. Coleman/Yates) to changing his training as he aged | Ledger #15 (direct quote, via aggregator) | C(reporting)/B(quote) |
| Took ~4 months/year completely off training in his later career, crediting this for his longevity | Ledger #10 (direct quote, via aggregator reporting an OlympiaTV interview) | C(reporting)/B(quote) |

## 5. Gaps / conflicts

- **The current `styles.json` summary and guidelines correctly separate** the "~10 sets/body part" figure (old 3-day routine) from the 5-day plan's "3–4 sets per exercise" — this matches ledger #1 well and is one of the more carefully-sourced entries in the file.
- **No Tier A (his own channel/IG) content was directly transcribed** in this pass to confirm present-day set/rep numbers; all post-2010 "machine work" claims currently rely on Tier B (Muscle & Fitness) or Tier C-reporting-B (Generation Iron/Fitness Volt recapping OlympiaTV or his own YouTube). This is a real gap — a direct crawl of `@DexterJacksonTheBlade` and `@mrolympia08` would upgrade several claims from B/C-reporting to true A.
- **"Conditioning is identity"** framing (current file principle) is not directly sourced to a Dexter quote in this research pass — it's consistent with his reputation ("the Blade," known for cutting conditioning) but should be treated as editorial framing rather than a cited claim.
- **Exact current (post-retirement) split** is not confirmed from a Tier A/B source in this pass; Dr Workout's "4-day split" claim (ledger #14) is Tier C with no direct quote and should not be relied on without corroboration.
- **Charles Glass's role** is well-documented as central to Dexter's later-career training philosophy (ledger #6, #7, #8), but the current `styles.json` entry doesn't mention Glass at all — worth considering whether the "Blade" system should be split into "early career" (Iron Man 2004, self-directed) vs. "Charles Glass era" (machines/isolation), since the two are meaningfully different training philosophies under one nickname.

## 6. Draft summary + principles + guidelines (grounded only in A/B sources)

### Summary (draft)
Dexter Jackson — "The Blade" — described his own training evolution in a 2004 Iron Man Magazine interview: after years on a 3-day/week split (~10 working sets per body part across 2–3 exercises for chest+back, legs, shoulders+arms), a new training partner pushed him to 5 days/week in 2004, splitting quads and hamstrings into their own days because "they just take a lot out of me." On that 5-day plan he kept most compound lifts at 3–4 sets of 6–10 reps ("I need to train heavy to get that full look"), used supersets constantly, and pushed leg extensions/curls to 30 reps per set for detail. Later in his career, working with trainer Charles Glass, Jackson shifted substantially toward machines and isolation work — moving away from heavy free-weight squats — explicitly to protect his joints and extend his competitive longevity, a change he credits (along with regular multi-month breaks from training) for outlasting contemporaries like Ronnie Coleman and Dorian Yates.

### Principles (draft)
- Train smart for longevity: heal injuries fully rather than train through them.
- Compounds first — squats, bench presses, rows, chins are described in his own words as "the bread and butter... exercises I have to do" (early career).
- Separate quads and hamstrings into their own training days if leg work is taking too much out of one session.
- Use supersets often; forced reps only occasionally — not every set needs an intensity technique.
- As you age, be willing to change: later-career Dexter shifted heavily toward machines and isolation work to keep training hard without the joint cost of heavy free weights.
- Regular extended time away from the gym (he cites roughly 4 months/year in his later career) is compatible with keeping muscle, not a threat to it.

### Guidelines (draft)
- **Training days/week (2004-era, primary-sourced):** 5, with Wed/Thu off (Mon chest+abs, Tue back+calves, Fri quads, Sat shoulders+arms, Sun hamstrings).
- **Working-set protocol (2004-era):** 3–4 sets per exercise on most lifts, 5 sets on squats; excludes any note of warm-ups.
- **Rep ranges (2004-era):** 6–10 for most compound/heavy work; up to 30 reps/set on leg extensions and leg curls for "detail."
- **Rep cadence:** roughly 1 second up / 1 second down.
- **Intensity techniques:** supersets used constantly; forced reps only occasionally — no drop sets or partials confirmed in any A/B source.
- **Later-career adaptation (not fully quantified in A/B sources — flagged as a gap):** substantially more machine/isolation work, less heavy free-weight squatting, moderate reps (e.g., 8–10 for biceps staples per ledger #8), built around a Charles Glass-style mind-muscle framework rather than the earlier heavy-compound approach.
