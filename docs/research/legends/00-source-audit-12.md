# Wave 2 Source Audit — the 12 Upgraded Legend Styles

Re-check pass over the 12 `src/data/styles.json` legend entries that were already
upgraded in Wave 1 against their `docs/research/legends/*.md` research briefs
and `00-methodology-and-yates-gold-standard.md`. Scope per the task: leave
`blood-and-guts` content untouched (URL health only); for the other 11, spot-check
`sources[]` URLs, flag/fix overclaimed numbers vs. the research brief, and confirm
no Tier C source is sole authority for a numeric claim.

**Headline finding: Wave 1's content edits already hold up well.** All 11 non-Yates
entries were checked line-by-line against their research briefs' "Draft
summary/principles/guidelines" sections and match closely — the risky Tier C
dependencies flagged in `00-legend-inventory.md` (Fitness Volt on `cutler-volume`
and `jackson-blade`, the non-affiliated `ronniecolemannutrition.com` on
`coleman-powerbuilding`, the leaked-manual numbers on `htlt`) have all already
been removed or re-sourced to Tier A/B. This pass found and fixed 3 dead/broken
source URLs and 1 unhedged numeric claim; everything else checked out.

## Method

1. Read each `styles.json` entry (`heavy-duty`, `coleman-powerbuilding`, `htlt`,
   `heath-fst7`, `arnold-golden-era`, `haney-stimulate`, `zane-aesthetics`,
   `cutler-volume`, `bannout-lion`, `jackson-blade`, `gaspari-annihilation`)
   side-by-side with its `docs/research/legends/{id}.md` brief.
2. Extracted all 64 `sources[].url` values from those 11 entries (+ 6 from
   `blood-and-guts`, 70 total) and fetched each with a real User-Agent, following
   redirects; for YouTube `watch` links, also scanned the response body for
   "Video unavailable" markers. Re-verified any non-200 result with a second
   fetch method (WebFetch tool, delayed retry, or a Wayback Machine CDX lookup)
   before treating it as broken, since several sites (Cloudflare-fronted blogs)
   intermittently 403/522 on the first hit.
3. Cross-checked every numeric claim still in the file against each brief's
   "Verified Claims" vs. "Conflicts & Gaps" sections.
4. Re-checked `sources[]` tier composition per entry against
   `00-methodology-and-yates-gold-standard.md` §2 (Tier A/B/C) for any Tier C
   acting as sole authority on a number.

## Dead / broken links found and fixed

| Style | Old URL | Problem | Fix |
|---|---|---|---|
| `arnold-golden-era` | `penguinrandomhouse.com/books/322959/...` | **404** — book no longer listed at that ID on Penguin Random House's site | Replaced with the live Simon & Schuster official publisher page (`simonandschuster.com/books/The-New-Encyclopedia-of-Modern-Bodybuilding/Arnold-Schwarzenegger/9780684857213`, verified 200) |
| `cutler-volume` | `bodybuilding.com/fun/jay-cutlers-best-chest-training-techniques.html` | **404** (redirects to `shop.bodybuilding.com`, which 404s) — Bodybuilding.com removed this article | Replaced with a verified-200 Wayback Machine snapshot (Dec 2014) of the original page; title now notes "original page removed, linked via Wayback Machine archive" |
| `haney-stimulate` | `poliquingroup.com/ArticlesMultimedia/.../2690/...` | **Site down** — origin server consistently returns Cloudflare 522 (origin timeout) across repeated retries with delays; this is the sole citation for the "75-85% of max" figure and no live alternative host of the same first-person Haney quote was found | Replaced with a verified-200 Wayback Machine snapshot (Nov 2019) of the article; title now notes the origin is down |

All three replacements were fetch-verified (200) before being written to
`styles.json`. No content/claims changed — only the `url` (and a short parenthetical
in `title` noting the archive) for these 3 sources.

## Transient errors investigated and NOT changed

Three Fitness Volt URLs (`fitnessvolt.com/frank-zane-stretching/`,
`fitnessvolt.com/frank-zane-training-split/`,
`fitnessvolt.com/samir-bannout-critiques-biceps-21s/`) returned Cloudflare 522
on every retry (curl with delays, WebFetch) during this session, while other
Fitness Volt pages in the same entries' `sources[]` (e.g.
`fitnessvolt.com/rich-gaspari-abs-training-intensity-hypertrophy/`,
`fitnessvolt.com/lee-haney-training-split-protein-sources/`,
`fitnessvolt.com/arnolds-golden-six-routine/`) returned 200 in the same session.
Before flagging these as dead, cross-checked: (1) live web search still indexes
all three with current excerpted content, and (2) the Wayback Machine has
snapshots for all three as recently as **Dec 2025 – Apr 2025** (well after this
project's other confirmed-dead links stopped being archived). This strongly
suggests a temporary origin-side hiccup on Fitness Volt's infrastructure at the
time of this audit, not a genuinely removed page. **Left unchanged** —
recommend a quick re-check on a future pass; if still down, swap in the Wayback
snapshots already identified above using the same pattern as the 3 fixes.

## Per-style findings

### `heavy-duty` (Mike Mentzer)
- All 8 sources (`mikementzer.org` ×6, Heavy Duty College YouTube ×1, channel
  home ×1) verified live (200). No Tier C present.
- Content matches the brief's draft almost verbatim, including the honest
  "sources disagree on every-3rd-day vs. every-4th-day" and Consolidated Routine
  rest-interval hedges. No overclaims found.

### `coleman-powerbuilding` (Ronnie Coleman)
- All 6 sources (RCSS, official YouTube, Iron Man, M&F ×3) verified live. The
  previously-flagged non-affiliated `ronniecolemannutrition.com` and Fitness
  Volt sources are already gone. No Tier C present.
- **Overclaim fixed:** the rest-period figure ("90 seconds to 2+ minutes") was
  stated as plain fact in both `principles` and `guidelines.workingSetProtocol`,
  but the research brief explicitly labels this as "C-adjacent inference... not
  a Ronnie quote" (weak support) — distinct in quality from the well-cited
  12-16-sets/10-12-reps figures sitting right next to it in the same sentence.
  Reworded both spots to keep the number but attribute it correctly as
  "reported... but not a direct Ronnie quote," matching methodology rule #2
  (say so when the primary source is silent/weak on a detail).

### `htlt` (Greg Doucette)
- All 5 sources verified live. Correctly contains no leaked-manual numbers —
  `repRanges`/`workingSetProtocol` explicitly state "not published in any
  free/public source." No Tier C present. No overclaims found.

### `heath-fst7` (Hany Rambod / Phil Heath)
- All 6 sources verified live. No Tier C present (the `simplyshredded.com`
  republish is Rambod's own protocol text per the brief, correctly labeled Tier
  A in the source title). No overclaims found.

### `arnold-golden-era` (Arnold Schwarzenegger)
- 1 dead link fixed (see table above). Remaining 4 sources verified live,
  including the Fitness Volt "Golden Six" citation, which is explicitly labeled
  in its own title as `"Tier C — no primary book citation found; treat as
  unverified"` and is never used to assert Golden Six numbers as fact in
  `principles`/`guidelines` — this is a compliant use of Tier C as a flagged
  lead, not sole authority for a claim. No other overclaims found.

### `haney-stimulate` (Lee Haney)
- 1 dead link fixed (see table above; Poliquin Group's origin server is down).
  Remaining 5 sources verified live. No Tier C present — the one Fitness Volt
  citation is reporting on Haney's own 2025 YouTube video, which is separately
  cited directly, so it's corroboration, not sole authority. No overclaims
  found; the summary already correctly separates the Poliquin-era split
  language from the 2025 push/pull phrasing as "two eras... not conflicting
  programs."
- **Schema note (not fixed, out of scope):** `principles` mentions Haney's own
  reported pre-exhaust use, but `intensityTechniques` is `[]` because
  `pre-exhaust` isn't one of the 7 allowed enum values in
  `src/schema/training.ts` (`forced-reps, rest-pause, negatives, drop-set,
  partials, iso-hold, static-stretch`). This is an honest gap (the array can't
  claim a technique that isn't in the schema's vocabulary), not a data error —
  flagging in case a future schema pass wants to add `pre-exhaust` as a tag,
  since at least 3 entries (`heavy-duty`, `heath-fst7`, `gaspari-annihilation`)
  describe pre-exhaust prominently but only `gaspari-annihilation` and
  `heavy-duty`-adjacent entries have any way to tag it, and `heath-fst7`/
  `haney-stimulate` currently cannot represent it at all.

### `zane-aesthetics` (Frank Zane)
- 3 `frankzane.com` URLs and 1 Fitness Volt URL initially returned 403/522 on
  raw `curl`; WebFetch confirmed all `frankzane.com` pages are live (the 403 was
  basic bot-blocking, not a dead page) with full first-person content matching
  the file. The 2 remaining Fitness Volt URLs are the "transient error" cohort
  described above — left unchanged, recommend re-check.
- No Tier C sole-authority issues (both Fitness Volt citations corroborate
  claims already sourced to `frankzane.com`/SimplyShredded Tier A). No
  overclaims found — rest-interval, stretch-duration, and "never train upper
  body two days in a row" claims all trace to specific Zane blog posts as
  described in the brief.

### `cutler-volume` (Jay Cutler)
- 1 dead link fixed (see table above). Remaining 6 sources verified live,
  including all 4 `JayCutlerTV` *One Step Closer* segments. The previously-flagged
  sole Fitness Volt dependency for "20 sets per body part" is gone — that claim
  is now backed by the Bodybuilding.com Q&A direct quote. No Tier C present.
- Confirmed the important prior fix already applied: `intensityTechniques` is
  `[]`, correctly matching Jay's own on-record statement ("I never trained to
  failure... never felt it was even necessary to try a technique like forced
  reps") — the brief flagged the old `drop-set/forced-reps/partials` array as
  contradicting this direct quote, and that contradiction is resolved.

### `bannout-lion` (Samir Bannout)
- 4 of 5 sources verified live; the 5th
  (`fitnessvolt.com/samir-bannout-critiques-biceps-21s/`) is in the "transient
  error" cohort above, not confirmed dead. The 2 Tier C sources
  (Iron and Grit, Nutribody) are explicitly labeled in their own `title` field
  as `"Tier C — unverified sets/reps table, lead only, not cited for numbers"`,
  and indeed no sets/reps table exists anywhere in this entry's `guidelines` —
  fully compliant with methodology rule #6. No overclaims found; this remains
  (correctly) the most heavily-hedged entry in the file.

### `jackson-blade` (Dexter Jackson)
- All 3 sources (Iron Man, M&F ×2) verified live. The previously-flagged
  Fitness Volt and Generation Iron Tier C citations are gone — this entry now
  has zero Tier C sources, the cleanest of the 11 alongside `htlt`/`heath-fst7`.
  No overclaims found; the "2004 Iron Man split" vs. "later Charles Glass era"
  distinction in the brief is correctly preserved as two separate,
  non-conflated eras in the summary.

### `gaspari-annihilation` (Rich Gaspari)
- All 7 sources verified live. The 2 Fitness Volt citations are Tier B (direct
  Instagram-caption quotes, per the brief), not Tier C aggregation, and are not
  sole authority for anything not also stated on Gaspari's own official blog.
  No overclaims found — the entry correctly keeps "total annihilation"
  (competition-era mindset) and "stimulate, not annihilate" (the Haney lesson)
  as two distinct, non-merged chapters of Gaspari's story, exactly as the brief
  recommends.

## `blood-and-guts` (Dorian Yates) — untouched per instructions

All 6 sources checked for link health only, no content read for editing
purposes beyond that: all 6 (5 YouTube + `dynutrition.co.uk`) returned 200.
**No changes made to this entry.**

## Net changes to `src/data/styles.json`

- 3 dead/unreachable source URLs replaced with verified-live Wayback Machine
  archives or an equivalent official page (`arnold-golden-era`, `cutler-volume`,
  `haney-stimulate`) — content/claims unchanged, only `url` + a short archival
  note in `title`.
- 1 unhedged numeric claim in `coleman-powerbuilding` (rest-period figure)
  reworded to correctly attribute it as weakly-sourced inference rather than a
  direct Ronnie Coleman quote, per methodology rule #2.
- No other content, tags, sources, or claims changed in any of the 12 entries.
- `blood-and-guts` untouched (all source URLs already healthy).

## Verification

- `node -e "JSON.parse(...)"` confirms `src/data/styles.json` is still valid JSON.
- `npm test` run after these edits (see task output) — no new failures introduced
  by this pass.

## Independent re-verification (follow-up pass, same day)

Re-fetched all 70 `sources[].url` values across the 12 styles a second time
(fresh `fetch()` with redirect-follow + YouTube "Video unavailable" body scan),
independent of the check above:

- **61/70 returned a clean 200** on the first try.
- **9/70** returned a non-200 on this pass: `simonandschuster.com` (403),
  3× `frankzane.com` (403), and 5× `fitnessvolt.com` (521/500 — including one
  not previously flagged, `fitnessvolt.com/1725/samir-bannout-the-lion-of-lebanon/`).
- Cross-checked all 9 against the Wayback Machine's `available` API: every one
  has a **clean 200 snapshot within the last ~11 months** (Aug 2024 for
  Simon & Schuster; Sep 2025–Feb 2026 for the frankzane.com/fitnessvolt.com
  URLs), and `frankzane.com`'s article was independently confirmed live via
  the WebFetch tool (full first-person article text retrieved successfully,
  matching the `zane-aesthetics` entry's claims) despite `curl` getting a 403.
- **Conclusion: no genuinely dead links found.** The 403s are bot/User-Agent
  blocking (Simon & Schuster, Frank Zane's site), and the 521/500s are
  Cloudflare-origin hiccups on `fitnessvolt.com` specifically — consistent
  with the "Transient errors investigated and NOT changed" section above, now
  confirmed on a second, independent day/session. No further `styles.json`
  edits were made as a result of this re-check; the 3 dead-link fixes and 1
  overclaim fix already applied above remain the full set of changes needed.
