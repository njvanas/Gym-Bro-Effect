# Kim Chizevsky — Primary Source Research (`kim-chizevsky`)

Target: `src/data/styles.json` → `kim-chizevsky`. Research only — no data files edited.

## Source Ledger

### Tier B — career-history interviews (no training specifics)

| # | Source | Detail |
|---|--------|--------|
| B1 | *Muscle & Fitness*, "Kim Chizevsky-Nicholls Reminisces on Her Olympia-winning Career" (recapping a *Fit Rockstar Show* appearance with Lenda Murray) | Direct quotes, but entirely career-history/relationship-focused (her rivalry-turned-friendship with Lenda Murray, family life) — no training content. |
| B2 | Buzzsprout podcast, "Interview with Miss Olympia 1996-1999 Kim Chizevsky-Nicholls" (2021) | Confirmed as a real, extensive interview covering "bodybuilding... diet... everything," but description-level detail only reviewed in this pass — full transcript not pulled. Flagged as the single best lead for future research; a 2021, hour-plus interview is likely to contain real training detail not yet extracted here. |
| B3 | *Muscle & Fitness/Flex*, "A Salute to Ms. Olympia Kim Chizevsky" | Career-retrospective/tribute piece; documents her historic significance (first woman to win Ms. International and Ms. Olympia bodybuilding in the same year, 1996) and the pressure she faced to move to the Fitness division due to her muscularity — no first-person training specifics. |

## Verified Claims

**No specific, first-person training principle, rep range, or split could be verified in this pass.** Every source reviewed is either a direct-quote interview focused on career history/relationships (B1) or a retrospective tribute (B3) — genuine Tier B material, but not training content. The one promising lead (B2, a 2021 hour-long interview explicitly described as covering "everything" including diet) was not transcribed in this pass.

## Gaps — documented honestly

- **This is a genuine gap, not a lack of interviews** — Kim Chizevsky is an accessible, still-living, still-interviewed figure (as recently as the *Fit Rockstar Show* appearance referenced in B1), but the interviews found in this pass happen to focus on career narrative rather than training methodology.
- **B2 (the Buzzsprout podcast) is the clear next step**: a dedicated, hour-plus interview described as covering diet and "everything" is very likely to contain trainable detail that simply wasn't extracted in this research pass.
- Her cross-division career (bodybuilding → Fitness Olympia) means any future training research should look for two distinct training eras, similar to the `dennis-wolf`/`vince-taylor` pattern of "competitive prime" vs. "current" training, since building a physique for bodybuilding judging and for Fitness-division gymnastic/stage requirements plausibly required different approaches.

## Draft styles.json/bodybuilders.json Field Suggestions

Given the absence of verified training-specific material, no `principles` or `guidelines` should be added at this time. A Tier 3 roster card should stay biographical:

> Kim Chizevsky-Nicholls became the first female bodybuilder to win both Ms. International and Ms. Olympia in the same year (1996), successfully defending her Ms. Olympia bodybuilding title through 1999 before a contractual push into the Fitness division, where she also won a Fitness Olympia title — a rare cross-division champion. No first-person training-methodology interview was verified in this research pass; the strongest available material documents her career history and relationships rather than her training approach.

## Weakest-Sourcing Verdict

Among the weaker-sourced names in this batch for *training content specifically* (though not for biographical/career interviews, which are plentiful). Recommend Tier 3 Roster Card, with a flagged follow-up to transcribe the 2021 Buzzsprout interview (B2) before concluding no training detail exists.

## Follow-up deep dive (2026-07-24) — still no complete day-by-day program

Targeted re-search for a Flex/M&F published routine, getbig archives, and full workout interviews. Result: **no complete weekly split with named exercises + sets/reps exists in any accessible source.** This is a confirmed, honestly-documented gap, not a research shortcut — see detail below.

### New Tier B find — one specific, falsifiable numeric claim

| # | Source | Detail |
|---|--------|--------|
| B4 | *Muscle & Fitness*, "Top 6 Common Myths About Fat Loss," bylined **Chad Nicholls** (Kim's husband/coach) — https://www.muscleandfitness.com/burn-fat-fast/top-6-common-myths-about-fat-loss/ | Direct, first-person coach quote with a specific number: *"the incredible strength my wife (four-time Ms. Olympia Kim Chizevsky) possessed throughout her Ms. Olympia training. At two weeks out of the competition, she was still able to squat 335 pounds for 20 reps—by no means light weight."* Also documents her post-retirement fat-loss protocol in his own words: stopped all weight training, ate fewer/lower-protein meals, and did 1.5–2 hrs cardio per session (~3 hrs/day total) specifically to shed bodybuilding muscle mass — a distinct, deliberately-documented second training era. |

This is a genuine Tier B claim (named author, dated context — "two weeks out" of an unspecified Ms. Olympia — published on M&F), but it is a single data point (one lift, one number), not a program.

### Archival lead confirmed but not resolved: the Flex "Kim Chizevsky File"

- getbig.com's Flex magazine archive confirms a real, dedicated Flex feature: **"The Big Picture: The Kim Chizevsky File"** (Flex, October 1997, Vol. 15 No. 8) — https://www.getbig.com/magazine/flex/flex9710.htm. getbig only hosts the table-of-contents/cover-blurb text for this issue, not the article body, so the feature's actual content (which could plausibly include a training breakdown, given Flex's "Big Picture" profile format used for other champions) remains unverified.
- Flex March 1998 (flex9803.htm) and November 1998 (flex9811.htm) issues also feature her prominently ("Kim: Two Times the Lady!", "Czechmate") but again only as TOC blurbs — no full article text accessible via getbig's archive.
- **Recommendation for a future pass**: these three back issues are the single best remaining lead and would require either a physical/scanned copy or a paid magazine archive (not accessible via web search/fetch in this pass).

### Confirmed non-leads (checked and ruled out this pass)

- No bodybuilding.com forum training log exists for Chizevsky (unlike Serge Nubret, who personally posted on forums).
- getbig.com's interview archive (`/iview/`) has no Chizevsky-specific entry; she is only mentioned in passing in other athletes' interviews.
- Aggregator sites (modelpeeps.com, 24-7.is, bodybuildingfanatic.com) either restate the same generic "90 minutes, twice daily, high intensity" claim with zero exercises, or list an unattributed generic exercise list (squats/deadlifts/OHP/pull-ups/bench/rows/lunges/dips) sourced from her *current*, post-retirement Instagram content rather than her competitive-era training — Tier D, not usable as a competitive-era program.

### Updated verdict

Still a genuine Tier 3/methodology-only card. The one addition from this pass — Chad Nicholls' quoted 335 lb × 20-rep squat at two weeks out — is worth adding as a standalone "verified strength claim" if `styles.json` wants a single concrete detail, but it does not support a `routines.json` weekly-session entry per the roster's routine-coverage rule (exercises + sets/reps required, not a single lift).
