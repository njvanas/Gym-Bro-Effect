# Primary-source research: `coleman-powerbuilding` (Ronnie Coleman)

Scope: verify the current `styles.json` entry for Ronnie Coleman against sources FROM Ronnie Coleman or his official brand (Ronnie Coleman Signature Series / RCSS) wherever possible. This file does not edit `styles.json`.

## 1. Source ledger

| # | Title | URL | Tier | Notes |
|---|---|---|---|---|
| 1 | Ronnie Coleman Signature Series — "How to be Hardcore" | https://ronniecoleman.net/blogs/articles/how-to-be-hardcore | **A** | RCSS is Ronnie's own supplement/media brand. Contains his direct quote: *"As heavy as possible as many sets and reps as possible."* |
| 2 | Ronnie Coleman official YouTube channel (`@ronniecoleman8`) | https://www.youtube.com/@ronniecoleman8 | **A** | His own channel; remastered training/DVD footage (e.g. "THE COP" / "Unbelievable" DVD clips). |
| 3 | "Ronnie Coleman Says He Trains 6x a Week Still, Smashes Workout w/ Hany Rambod" | https://fitnessvolt.com/ronnie-coleman-workout-with-hany-rambod/ | B (secondary report) | Reports on a Hany Rambod YouTube upload (Oct 2023) that directly quotes Ronnie on his current training. Underlying primary is the Rambod video, not this write-up. |
| 4 | "Mr. Olympia Muscle: The Truth" — Iron Man Magazine | https://www.ironmanmagazine.com/mr-olympia-muscle-the-truth/ | **B** | Direct Ronnie quote: *"I know I was doing singles and doubles in those lifts you saw me do, but that was mainly for the DVD to make it more exciting. Usually I always did my sets in the 10‑12 rep range, because that's what made me grow best."* |
| 5 | "Coleman's Chest Test" — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/training/coleman-s-chest-test/ | **B** | In-person 2006 workout observation, 2 weeks out from that year's Olympia, with direct Ronnie quotes on rep target ("I go for 10 reps per set..."). |
| 6 | "10 Bodybuilding Training Tips From Ronnie Coleman" — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/training/10-training-tips-legendary-ronnie-coleman/ | **B** | Billed as "straight from the King himself"; pump-over-numbers philosophy, direct quotes. |
| 7 | "Ronnie Coleman's 6 Rules for Getting Shredded" — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/training/ronnie-colemans-6-rules-getting-shredded/ | **B** | Direct Ronnie quote: *"Use 10‑15 reps per set... a minimum of 10 reps per set—and often as many as 15."* |
| 8 | "Is It Worth It?" — Muscle & Fitness / FLEX | https://www.muscleandfitness.com/flexonline/training/it-worth-it/ | **B** | Direct Ronnie quote on the 800‑lb squat being a "video anomaly," plus an explicit stat box: **Sets per body part: 12–16. Reps per set: 10–12.** Confirms twice-weekly body-part frequency. |
| 9 | "Ronnie Coleman On Counting Reps" (first-person column, reprinted) | https://xbodyconcepts.com/ronnie-coleman-on-counting-reps/ | B/C blend | Reads as a first-person Ronnie column (likely a reprinted FLEX/RCSS "Ask Ronnie"-style piece) but hosted on a third-party aggregator with no clear original citation — treat the *words* as B-grade Ronnie testimony, the *hosting site* as unverified. Direct quote: *"...my 12‑16 sets of 10‑12 reps."* |
| 10 | "The Ronnie Horror Show" (FLEX, April 2004) as reprinted by Paramount Training | http://www.paramounttraining.ca/2011/08/ronnie-coleman.html | B/C blend | Full 2003-Olympia-prep workout (exact exercises/weights/sets/reps) with direct Ronnie quotes ("I never max out... squats down around 600 pounds for 12‑15 reps precontest, and my deadlifts down around 750 for five or six reps"). Original outlet is FLEX Magazine (B); this page is a Tier C reprint — could not locate the original FLEX archive. |
| 11 | "Ronnie Coleman Workout Guide" — ronniecolemannutrition.com | https://ronniecolemannutrition.com/blog/ronnie-coleman-workout-guide/ | **C** | See §2 — despite the brand-sounding domain, this site explicitly discloses it is **not** RCSS or an official Ronnie Coleman property. |
| 12 | "About RC Nutrition" | https://ronniecolemannutrition.com/about/ | C (self-disclosure) | Confirms #11 is independent/unofficial. Used here only to justify demotion. |
| 13 | "Ronnie Coleman Workout Program" — Fitness Volt | https://fitnessvolt.com/ronnie-coleman-workout-program/ | **C** | Generic aggregator reconstruction, no direct quotes tying numbers to Ronnie. |
| 14 | "Complete Full Body Weekly Workout With Ronnie Coleman" — Generation Iron | https://generationiron.com/ronnie-the-king-coleman-workout/ | **C** | Generic reconstruction/"inspired by" template, explicitly not claimed as his literal routine. |

**Tier A count: 2** (RCSS blog article + his own YouTube channel — DVD/training-video content lives there but wasn't transcribed set-by-set in this pass).

## 2. Current `styles.json` sources that are Tier C and should be demoted/removed

Current `sources[]` for `coleman-powerbuilding`:
1. "Ronnie Coleman Workout Guide — Ronnie Coleman Nutrition" (`ronniecolemannutrition.com`) — **worst dependency**. This is the entry the summary/guidelines lean on hardest for hard numbers (16‑25 sets, 4‑8 reps on main lifts), yet the site's own `/about/` page states: *"This site is NOT affiliated with, endorsed by, or sponsored by Ronnie Coleman Signature Series or any official Ronnie Coleman brand... We are an independent editorial publication."* It is functionally Tier C dressed in a brand-shaped URL. It should be demoted and its numeric claims re-verified against ledger items 5, 6, 8, 9, 10 above.
2. "Ronnie Coleman Workout Program - Fitness Volt" (`fitnessvolt.com`) — plain Tier C aggregator, no direct quotes attributing the numbers to Ronnie.

Sources 2 and 3 in the current list (RCSS "How to be Hardcore" and the official YouTube channel) are correctly Tier A and should stay.

## 3. Best primary alternatives found

- **RCSS blog** (`ronniecoleman.net/blogs/articles/...`) — already used; more articles likely exist under `ronniecoleman.net/blogs/articles/` worth a follow-up crawl.
- **Ronnie Coleman official YouTube** (`@ronniecoleman8`) — hours of remastered DVD footage ("The Unbelievable," "The Cop," etc.) plus a 2023 Hany Rambod collab. These are Tier A but require watching/timestamping to extract exact set/rep numbers rather than relying on a text summary.
- **FLEX Magazine / Muscle & Fitness "flexonline" archive** — the single richest vein of direct Ronnie quotes (ledger items 4–8, 10). Not "his brand," but genuine interviews/observed-workout journalism, i.e. solid Tier B. These consistently converge on **10–12 (up to 15) reps** and **12–16 working sets per body part**, which is materially different from the current file's framing.

## 4. Verified training claims (grounded in Tier A/B)

| Claim | Support | Tier |
|---|---|---|
| Six-day split, each major body part trained twice weekly | Ledger #8, #10 (FLEX prep log: Mon/Thu back+biceps, Tue/Fri legs varies, Wed/Sat chest+triceps in the 2003 log) | B |
| Working reps sit mostly at **10–12**, occasionally up to 15; heavy singles/doubles seen on video were largely for show | Ledger #4 (direct quote), #5, #6, #7, #10 | B |
| Deadlifts were the one lift regularly taken lower, ~5–6 reps at ~750 lb precontest (not a blanket "4‑8 on all main compounds") | Ledger #10 (direct quote) | B |
| Working-set volume per body part: **12–16 sets**, not 16–25 | Ledger #8 (explicit stat box), #9 (Ronnie's own "12‑16 sets of 10‑12 reps," contrasted with Sergio Oliva's 20‑25) | B |
| Never trains to a true 1‑rep max; keeps control to protect joints/nervous system | Ledger #4, #10 | B |
| "Lift the heaviest weight possible, with the most correct form, through a full range of motion" is his own stated 3-part principle | Ledger #10 (direct FLEX quote) | B |
| Rest periods: roughly 90 seconds–2+ minutes between sets on heavy work (not tightly documented anywhere as "short rest") | Ledger #10 (contemporary analysis, not a Ronnie quote — weak support) | C-adjacent inference |
| Still trains ~6 days/week in retirement, now leaning on machines/lighter loads | Ledger #3 (2023 Hany Rambod session, Ronnie's own words reported) | B |

## 5. Gaps / conflicts

- **Rep range conflict:** the current `styles.json` guidelines assert "4‑8" reps for "main compounds" and "8‑12" for most exercises. Every Tier B/A source found instead converges on **10–12 (up to 15)** as Ronnie's real working range, with heavy 2‑6-rep singles reserved for filmed showcase lifts (his own words: "mainly for the DVD"). This is a meaningful mismatch, not a rounding difference.
- **Set-volume conflict:** "16‑25 working sets per session" (current file, sourced from the non-official `ronniecolemannutrition.com`) vs. **12‑16 sets per body part** consistently reported by FLEX/Muscle & Fitness and by Ronnie's own quoted column. The FLEX April‑2004 prep log (ledger #10) supports numbers in the low‑to‑mid teens per body part per session (e.g., ~13–15 sets for back or chest per session), not 16‑25.
- **Split-day mapping conflict:** the 2003 FLEX prep log (ledger #10) pairs Monday back+biceps+shoulders, Tuesday legs, Wednesday chest+triceps, Thursday back+biceps+shoulders (repeat), Friday legs (repeat), Saturday chest+triceps (repeat) — i.e., three body-part groups hit twice each, closer to a push/pull/legs cadence than the current file's "back/bis and chest/tris twice; legs and shoulders once." Multiple sources (including RCSS-adjacent reconstructions) disagree on the exact day order, so this remains a real ambiguity, not a solved discrepancy — but the "legs and shoulders once" framing is contradicted by at least one detailed primary-adjacent log.
- **No Tier A numeric log located.** Nothing on RCSS's own blog or YouTube channel (as searched) gives a clean sets-and-reps table in Ronnie's own written words; the most granular numbers all come from FLEX/Muscle & Fitness (Tier B) journalism, not from RCSS itself. A full pass through his YouTube back catalogue (timestamped) could upgrade this.
- **"Everybody wants to be a bodybuilder..." quote and "as heavy as possible as many sets and reps as possible"** are confirmed Tier A (RCSS's own site), but are more a mindset/catchphrase than a specific programming parameter — they don't resolve the rep-range/volume conflicts above.

## 6. Draft summary + principles + guidelines (grounded only in A/B sources)

### Summary (draft)
Ronnie Coleman — 8× Mr. Olympia — trained six days a week at Metroflex Gym, hitting each major body part twice weekly with heavy compound movements as the foundation. Despite the legendary 800‑lb squats and 800‑lb-class deadlifts seen on his training DVDs, Coleman said those near-maximal lifts were "mainly for the DVD to make it more exciting" — his actual working sets almost always sat in the 10–12 rep range (occasionally up to 15), for roughly 12–16 working sets per body part per session. His own stated training principles: use the most weight possible, with the most correct form, through a full range of motion — chasing a full muscular pump rather than a fixed number.

### Principles (draft)
- Heavy compound barbell movements anchor every session, but "heavy" for Coleman meant control, not a true 1‑rep max — he says he never maxed out.
- Work mostly in the 10–12 rep range (sometimes up to 15); very low reps (2–6) were reserved for filmed showcase lifts or the occasional deadlift set, not the norm.
- Volume lands around 12–16 working sets per body part per session, not 16‑25.
- Train each major body part twice per week across a six-day split.
- Never train to a true max; prioritize full range of motion and a strict, muscle-focused rep over ego weight.
- Chase the pump, not a number: "I don't tackle a workout obsessed with being able to lift a specific number of pounds for a specific number of repetitions."

### Guidelines (draft)
- **Training days/week:** 6, each major body part twice.
- **Rep range:** 10–12 working reps as the default target; up to 15 is fine if the pump isn't there yet; occasional low-rep (5‑6) work on deadlifts.
- **Working sets per body part:** 12–16.
- **Intensity approach:** straight, progressively heavier sets; Coleman is not reported (in A/B sources) as a heavy user of drop sets, forced reps, or pre-exhaustion — he "does straight, progressively heavier sets... with relatively long rest periods (two minutes or more)" per Muscle & Fitness's direct observation.
- **Core cue:** full range of motion, strict form, maximum resistance the target muscle (not joints/leverage) can control.
