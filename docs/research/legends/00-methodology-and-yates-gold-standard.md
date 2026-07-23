# Legends Research Methodology — Yates / Blood & Guts Gold Standard

This document defines how we research and write up official bodybuilder training
systems in `src/data/styles.json`. It exists because one entry — `blood-and-guts`
(Dorian Yates) — is measurably better sourced than the other 11, and every future
edit to a legend's style entry should be brought up to that bar, not down to the
average.

**Do not edit `styles.json` as part of this doc.** This is a research/process
reference for content writers and future editing passes.

## 1. Why `blood-and-guts` is the gold standard

Read `src/data/styles.json` → `id: "blood-and-guts"` side by side with the notes
below.

- **Specificity over vibes.** Nothing is vague. Warm-up percentages are stated
  (50% then 75% of working weight). The working-set protocol is a single,
  falsifiable sentence: "Exactly one all-out working set per exercise to muscular
  failure, then beyond with forced reps, rest-pause, negatives, partials, or
  iso-holds." Session length is bounded (45–60 minutes). Rep ranges are split by
  body-part category, not one blanket number.
- **Documentary/DVD session fidelity.** The `summary` explicitly anchors the
  whole entry to one concrete, verifiable artifact — the *Blood & Guts* DVD filmed
  at Temple Gym in 1996 — rather than a generic "here's how Dorian trained"
  paraphrase. The `splitOverview` day order is stated to follow that DVD's
  session order, not a random blog's guess at his weekly calendar.
- **Primary URLs only.** All six `sources` entries are Tier A: the full
  documentary upload, four individual body-part sessions published by Dorian
  Yates Nutrition (his own brand channel), and one article on `dynutrition.co.uk`
  (his own brand site). There is no Fitness Volt, no SimplyShredded, no
  unattributed aggregator anywhere in the list.
- **Honest caveats about variance.** The summary does not pretend there's one
  official canonical week: "Weekly calendar order varies across interviews; this
  collection follows the Blood & Guts DVD session order and exercise selections."
  This is the model for how to handle real-world ambiguity — state the
  discrepancy, then state which single source you picked and why, instead of
  averaging conflicting claims into a fabricated consensus.
- **Every guideline field is filled with a real claim, not a placeholder.**
  `trainingDaysPerWeek`, `frequencyPerMuscle`, `warmupProtocol`,
  `workingSetProtocol`, and `repRanges` are all present and each cites something
  Yates or his documentary actually said/showed — none are generic filler like
  "train hard, eat big."

Contrast note (from skimming other entries for calibration):

- `htlt` (Greg Doucette) and `heath-fst7` (Hany Rambod / Phil Heath) are the
  next-best entries — both lean on official brand sites (`gregdoucette.com`,
  `hanyrambod.com`) and contemporaneous Muscle & Fitness interviews, with zero
  Tier C sources. They are close to gold-standard.
- `bannout-lion` (Samir Bannout) is the clearest example of what to avoid: all
  three sources are secondary aggregators (Fitness Volt, Iron and Grit Fitness,
  Nutribody), and the summary itself admits "There is no official branded
  'Lion' training system" and "day order conflicts across secondary sources."
  The entry is honest about this weakness, which is good practice, but the
  underlying sourcing is Tier C throughout and should be the first target for a
  future research pass if primary material ever surfaces.

## 2. Source tier ranking (applies to ALL legends research)

Use this ranking to decide what counts as authoritative for any claim you add
or change. Higher tiers always win in a conflict.

### Tier A — the person themselves (highest authority)

- Books the legend personally authored or co-authored (e.g. *The New
  Encyclopedia of Modern Bodybuilding* — Arnold Schwarzenegger & Bill Dobbins).
- An official DVD or documentary they starred in or produced (e.g. *Blood &
  Guts*, Jay Cutler's *One Step Closer*).
- Their official personal site or blog (e.g. `frankzane.com`,
  `hanyrambod.com`, `gregdoucette.com`, `leehaney.com`).
- Their official YouTube channel.
- A brand site they personally own/founded (e.g. DY Nutrition, Ronnie Coleman
  Nutrition / Ronnie Coleman Signature Series, Gaspari Nutrition).

### Tier B — contemporaneous interviews where THEY speak

- Muscle & Fitness, Flex, Iron Man Magazine, and similar outlets, **but only
  the parts that are direct quotes from the legend**, not the journalist's
  summary or paraphrase of what "sources say" they did.
- When citing Tier B, prefer pulling the actual quoted sentence into research
  notes over restating the article's framing.

### Tier C — secondary aggregators (leads only, never sole authority)

- Fitness Volt, SimplyShredded, Liftosaur, Generation Iron round-ups,
  StrengthLog, personal fitness blogs, "Top 10 tips" listicles, etc.
- Tier C is useful for finding **where** a primary quote or video might exist
  (a lead), and can be cited as a supplementary source alongside Tier A/B, but
  a style entry must never rest on Tier C alone for a specific numeric claim
  (sets, reps, days/week, rest periods). If Tier C is the only thing available
  for a claim, that claim must be phrased as unverified/approximate (see
  Rules, §4) rather than stated as fact.

## 3. Required fields — mirror the Yates schema

Every improved (or newly added) style entry must fill these fields, matching
the shape and rigor of `blood-and-guts`:

| Field | Requirement |
|---|---|
| `id`, `name`, `creator`, `displayOrder` | Stable identifiers; `creator` is the actual legend's name. |
| `tags` | 3–4 short tags capturing the system's defining traits (not generic "bodybuilding"). |
| `summary` | 2–4 sentences. Must name the concrete source artifact (DVD, book, official program name) the entry is built on, and must flag any known variance across interviews/sources instead of silently picking one. |
| `principles` | 5–7 bullet claims, each traceable to a real source, ordered by importance. |
| `intensityTechniques` | Only techniques actually documented for this legend (empty array is fine and honest if none are verified — see Coleman/Haney). |
| `guidelines.trainingDaysPerWeek` | Stated plainly; note "(reconstruction)" or similar if not from a primary source. |
| `guidelines.frequencyPerMuscle` | How often each muscle is trained, with the source context if it varies across the legend's own materials. |
| `guidelines.warmupProtocol` | Concrete enough to reproduce (set counts, %, rep counts) — not "warm up properly." |
| `guidelines.workingSetProtocol` | The single most important field. Must state exact set counts/failure protocol as documented; if uncertain, say so explicitly rather than rounding to a plausible number. |
| `guidelines.repRanges` | Array of `{ target, range }`, split by body-part/lift category, not one number for everything. |
| `splitOverview` | Day-by-day (or rotation-by-rotation) array of `{ day, focus }` matching the actual documented split, with a caveat line in `summary`/`principles` if day order is contested. |
| `sources` | Array of `{ title, url }`. At minimum one Tier A source. List Tier A/B sources before any Tier C source. Titles should indicate the tier/origin (e.g. "(official)", brand name, or magazine name) so a reader can tell provenance at a glance. |

## 4. Rules

1. **Never invent sets, reps, rest periods, or day counts.** If you cannot find
   it in a Tier A or Tier B source, do not fill in a specific number "because it
   sounds about right."
2. **If the primary source is silent on a detail, say so in the text.** Use
   language like "not specified in the documentary," "sources disagree on day
   order," or "this is a reconstruction, not an official program" — exactly as
   `blood-and-guts`, `coleman-powerbuilding`, `bannout-lion`, and
   `gaspari-annihilation` already do. Silence is not an invitation to guess.
3. **Prefer fewer verified claims over many blog claims.** A shorter
   `principles`/`guidelines` section built entirely on Tier A/B material is
   better than a longer one padded out with Tier C aggregator claims. Cutting a
   plausible-sounding but unverifiable detail is the correct default.
4. **When sources conflict, name the conflict and pick one, transparently.**
   Follow the Yates pattern: state that variance exists, state which single
   source (ideally the most primary one — a DVD, an official program PDF, a
   book) you are following for the concrete split/numbers, and cite that
   source first.
5. **Quote, don't paraphrase, when using Tier B.** When pulling from an
   interview, prefer the legend's literal words for anything you treat as a
   principle or protocol.
6. **Tier C is for discovery, not for citation of specific numbers.** It's fine
   to use Fitness Volt/SimplyShredded/Liftosaur to find out *that* a DVD or
   official program exists, then go verify against the primary source before
   writing the claim.
7. **Never edit `styles.json` without re-reading `blood-and-guts` first** as
   the calibration reference for tone, specificity, and honesty about gaps.

## 5. Output checklist for content writers

Before submitting a new or edited legend style entry, confirm:

- [ ] `summary` names the concrete primary artifact (DVD/book/official program)
      the entry is based on.
- [ ] `summary` or `principles` flags any known source variance/conflict.
- [ ] Every numeric claim (days/week, sets, reps, rest, %) traces to a Tier A
      or Tier B source, or is explicitly marked as a reconstruction/estimate.
- [ ] `intensityTechniques` contains only documented techniques (or is empty,
      honestly).
- [ ] `guidelines.repRanges` is broken out by body-part/lift category, not one
      flat number.
- [ ] `splitOverview` matches the actual documented split; day-order disputes
      are called out in `summary`/`principles`, not silently resolved.
- [ ] `sources` lists at least one Tier A source, orders Tier A/B before Tier C,
      and every `title` makes the provenance/tier legible (official/brand name
      or magazine name visible).
- [ ] No claim was added purely because "it sounds right for a bodybuilder of
      that era" — if it's not sourced, it's cut or flagged.
- [ ] Re-read `blood-and-guts` one more time before finalizing; the new/edited
      entry should read at the same level of specificity and honesty.
