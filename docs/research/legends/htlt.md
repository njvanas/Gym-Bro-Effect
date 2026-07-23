# Primary-source research: `htlt` (Harder Than Last Time — Greg Doucette)

Target file: `src/data/styles.json` → id `htlt`. **This document does not modify styles.json.** It is a source-vetting dossier to inform a future edit.

## ⚠️ Paywall / piracy notice (read first)

Greg Doucette's full HTLT system — *"Harder Than Last Time! The Complete Muscle & Strength Training Manual"* — is a **paid eBook** (currently sold in Beginner/Intermediate/Advanced tiers, $129+, at gregdoucette.com). During research, full-text copies of this manual turned up on **Scribd** and **pdfcoffee.com**. Per instructions, **these were not used as sources for this dossier** — they are uploaded/leaked copies of a product Coach Greg sells for a living, and citing or reproducing their contents here would be piracy. Anything in the current `src/data/styles.json` entry that matches that leaked text *word-for-word* (see "Flag" below) should be treated as **unverified from public/free sources**.

## Source ledger

| Tier | Source | Author / publisher | What it's good for | Notes |
|---|---|---|---|---|
| **A** | [gregdoucette.com/products/htlt-training-programs](https://www.gregdoucette.com/products/htlt-training-programs) | Coach Greg Inc. (official) | Confirms product structure: Beginner (2–3 days/wk) / Intermediate (4 days/wk) / Advanced (5+ days/wk), each with 4 programs (60‑ or 90‑min, strength- or hypertrophy‑focused). Confirms the manual is 50+ pages covering mindset, training, cardio, diet. | **Sales page — no set/rep/rest numbers.** Already in styles.json sources. |
| **A** | [gregdoucette.com/pages/htlt-training-programs](https://www.gregdoucette.com/pages/htlt-training-programs) | Coach Greg Inc. (official) | Same as above, marketing copy only. | Already in styles.json sources. |
| **A** | [Coach Greg YouTube channel](https://www.youtube.com/@gregdoucette) | Greg Doucette | Hundreds of free videos where he explains his philosophy in his own words. | Already in styles.json sources, but generic (channel-level, not a specific video). See "free video evidence" below for the specific videos actually reviewed. |
| **A (free video)** | ["Top 5 Common Beginner Mistakes Seen In The Gym"](https://www.youtube.com/watch?v=Xkq6hZ-QPgs) | Greg Doucette | Free video. In his own words: don't obsess over exact tempo/rest-ratio numbers as a beginner ("is my rest exactly 75 seconds… is my work-rest ratio exactly 3:2:1… you're overthinking everything"); follow your program and get good at it; avoid ego lifting. | Useful for *tone/philosophy*, but directly **undercuts** the idea that Greg publicly prescribes a rigid tempo formula for beginners — see Flag below. |
| **A (free video)** | ["Why Are We Listening To Mr Whosetheboss About Fitness?"](https://www.youtube.com/watch?v=oyK7gs_AAr8) (May 2026) | Greg Doucette | Free video, confirms in his own words: "harder than last time" as the gym-effort motto, paired with "moderate, medium pace" Zone‑2 cardio (heart rate roughly 116–135 bpm example he gives for himself), fat-loss/food-density tips. | Good current (2026) primary confirmation of the core motto and the cardio-intensity pairing. |
| **B** | [generationiron.com — "Greg Doucette Profile, Biography, and Stats"](https://generationiron.com/greg-doucette-profile-bio-stats/) | Generation Iron staff (third-party profile, not an interview transcript) | Describes his general approach: PPL/full-body 6 days/week, compound-lift focus, controlled tempo, "10–20 sets per muscle group per week," RIR-based effort. | Third-party summary, **not directly quoted from Greg** — treat as Tier B/C boundary. Useful for corroboration only, not as a primary citation for exact numbers. |
| **not usable** | Scribd "Harder Than Last Time" PDF; pdfcoffee.com PDF | Uploaded/leaked copies of the paid manual | Contains the manual's exact tempo prescription (2s down / 1s up / 1s pause), rep ranges (hypertrophy 12–15, strength 8–10 or 5–8 on heaviest sets), and rest-time guidance. | **Not cited or used as a source in this dossier — piracy risk.** Flagged only so the team knows *why* these specific numbers can't currently be sourced to anything free/public. |

## Flag: current `styles.json` entry likely mirrors paywalled text

The existing `htlt` entry in `src/data/styles.json` states:
- Tempo: "~2s down / 1s up / 1s pause"
- Rep ranges: "Hypertrophy working sets: 12-15 reps" / "Strength working sets: 8-10 reps (occasionally 5-8)"
- "Stop warm-ups with 3-5 reps in reserve"

These numbers were searched extensively against every free public source (gregdoucette.com sales pages, his YouTube channel, third-party interviews). **They were not found in any free/public source** — they appear to originate from (or exactly match) the paid manual as it exists in the leaked Scribd/pdfcoffee copies. This dossier does not confirm or deny accuracy; it flags that these specific numbers currently have **no citable free source**, and recommends either:
1. Re-labeling them in a future styles.json edit as coming from the paid manual (with an explicit "paywalled — from Coach Greg's paid eBook" note), or
2. Softening them to match only what's confirmed free (progressive overload, "harder than last time" motto, RIR-based effort, ~150 min/week Zone‑2 cardio), and dropping the specific tempo/rep-range numbers unless a free citation turns up.

## Verified HTLT principles (free/public A sources only)

1. **Core motto — "Harder Than Last Time":** always try to beat your last session (weight, reps, technique, or reduced rest) — confirmed directly in his own words on his 2026 YouTube video and restated across his product pages (Tier A).
2. **Progressive overload, broadly defined:** progress can come from reps, technique, weight/resistance, total volume, rest time, or reps-in-reserve — not just adding plates. (This general framing appears consistently across his free video content and is the throughline of the "harder than last time" motto; exact wording of any single formal definition could not be pinned to a specific free source in this pass — see Gaps.)
3. **Don't overthink minor variables as a beginner.** Directly from his own free video: don't obsess over exact rest-time-to-the-second or tempo ratios; follow the program, get good at the basics, avoid ego lifting.
4. **Cardio pairs with the same "harder than last time" logic** but should stay at a *moderate*, Zone‑2 pace rather than max effort — confirmed in his own words (2026 video), using ~116–135 bpm as his own personal example range.
5. **Product structure confirms training frequency tiers:** Beginner = 2–3 days/week, Intermediate = 4 days/week, Advanced = 5+ days/week (official sales page, Tier A) — this training-frequency breakdown is legitimately public (it's the marketing description of what you're buying), unlike the internal rep/tempo numbers.
6. **Sustainability over burnout:** repeatedly emphasized across free videos and channel description — train hard but avoid injury/burnout from "all-out" every session; advanced techniques (drop sets, forced reps, etc.) are positioned as things to earn, not starting points.

## Draft summary (A only)

> Greg Doucette's "Harder Than Last Time" (HTLT) philosophy, confirmed from his own free YouTube content and official product pages: always aim to beat your previous session — more weight, more reps, better technique, less rest, or more total volume than last time. He pairs this with moderate (not maximal) Zone‑2 cardio and explicitly warns beginners against overthinking exact tempo/rest-time numbers. The full HTLT manual is sold as a paid eBook (Beginner 2–3 days/week, Intermediate 4 days/week, Advanced 5+ days/week, each with 4 program variants); its internal exercise-level prescriptions (tempo counts, precise rep ranges, warm-up rules) are paywalled and were not sourced from any free/public statement in this research pass.

## Draft principles (A only)

1. Harder than last time: beat your previous session in weight, reps, technique, rest time, or volume.
2. Don't obsess over exact tempo/rest-second counts as a beginner — get good at the fundamentals first (his own words, free video).
3. Cardio should be trained progressively too, but at a moderate/Zone‑2 intensity, not an all-out pace.
4. Consistency and sustainability beat short, reckless bursts of effort.
5. Training frequency scales with experience: Beginner 2–3 days/week, Intermediate 4 days/week, Advanced 5+ days/week (per the official program tiers).

## Draft guidelines (A only — intentionally sparse; see Flag above)

```json
{
  "trainingDaysPerWeek": "Beginner 2-3, Intermediate 4, Advanced 5+ (official program tiers, gregdoucette.com)",
  "frequencyPerMuscle": "Not stated in any free/public source reviewed.",
  "warmupProtocol": "Not stated in any free/public source reviewed (his own beginner-mistakes video explicitly discourages over-precision here).",
  "workingSetProtocol": "Not stated with specific numbers in any free/public source reviewed — see paywall flag.",
  "repRanges": []
}
```

## Gaps / open questions

1. **No free source states exact rep ranges, rest times, or tempo counts.** This is the biggest gap relative to the current styles.json entry, which contains numbers that only appear (verified during this research) inside the paid/leaked manual. Recommend either sourcing a free interview/video where Greg states these numbers explicitly, or reframing the styles.json copy to note it summarizes paid-product content.
2. Could not confirm a specific free video where Greg lays out the full HTLT split (Legs & Biceps / Chest, Shoulders & Triceps / Back) as currently described in styles.json's `splitOverview`. That specific 3-day template appears to be a plausible reconstruction rather than something directly quoted/verified free.
3. Greg's YouTube channel is enormous (600+ videos referenced in his own manual's bio); this pass reviewed only a handful of specific videos found via search. A deeper channel-specific search (e.g., filtering his uploads for "HTLT" or "harder than last time" in titles) could surface more free primary statements and should be considered a follow-up task.
4. Third-party summaries (Generation Iron profile) mention "10–20 sets per muscle group per week" and a 6-day PPL default — these are plausible and consistent with his general public image, but are not direct quotes and should not be treated as confirmed Coach Greg statements without a primary follow-up.

## Best Tier A URLs

- https://www.gregdoucette.com/products/htlt-training-programs (official product/sales page — program structure only)
- https://www.youtube.com/@gregdoucette (official channel — richest source of free primary statements, needs deeper per-video search)
- https://www.youtube.com/watch?v=oyK7gs_AAr8 ("Why Are We Listening To Mr Whosetheboss About Fitness?", 2026 — free video, direct motto + cardio-intensity confirmation)
- https://www.youtube.com/watch?v=Xkq6hZ-QPgs ("Top 5 Common Beginner Mistakes Seen In The Gym" — free video, direct quote on not overthinking tempo/rest precision)

## Paywall warnings

- **"Harder Than Last Time! The Complete Muscle & Strength Training Manual"** — paid eBook, $129+ (Beginner/Intermediate/Advanced tiers), gregdoucette.com. Contains the detailed tempo, rep-range, and warm-up prescriptions that the current styles.json entry appears to summarize.
- **"The Home & Hotel Hypertrophy Handbook"** — separate paid eBook covering equipment-limited training; not reviewed here (not directly relevant to the core HTLT split, but shares the same training-philosophy chapter structure).
- Full-length copies of the manual found on Scribd/pdfcoffee were **not accessed as sources** for this document, per instructions against pirating paid content.
