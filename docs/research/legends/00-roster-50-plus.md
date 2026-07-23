# Roster Expansion — 55-Name Bodybuilder Plan (Target: 50+)

This is a **planning document only**. It does not modify `src/data/styles.json`
or any app code. It exists to answer three questions before any more content
work happens:

1. Who are the ~50+ bodybuilders (spanning eras, and including women's
   bodybuilding legends) that Gym Bro Effect should eventually have a page
   for?
2. What data-model shape lets us do that **without** forcing every single one
   through the full Yates-depth research pass on day one?
3. In what order should we build them out, given that Yates is locked and
   parallel research is already deepening the other 11 current styles?

Read `docs/research/legends/00-methodology-and-yates-gold-standard.md` first —
the Tier A/B/C source rules and the "gold standard" bar defined there apply to
every name below, at whatever depth tier we pick for it.

## 0. Current state

`src/data/styles.json` has **12 creators** today (all men, all Olympia-era
systems tied to a named training philosophy):

| # | id | Creator |
|---|---|---|
| 1 | `blood-and-guts` | Dorian Yates |
| 2 | `heavy-duty` | Mike Mentzer |
| 3 | `coleman-powerbuilding` | Ronnie Coleman |
| 4 | `htlt` | Greg Doucette |
| 5 | `heath-fst7` | Hany Rambod / Phil Heath |
| 6 | `arnold-golden-era` | Arnold Schwarzenegger |
| 7 | `haney-stimulate` | Lee Haney |
| 8 | `zane-aesthetics` | Frank Zane |
| 9 | `cutler-volume` | Jay Cutler |
| 10 | `bannout-lion` | Samir Bannout |
| 11 | `jackson-blade` | Dexter Jackson |
| 12 | `gaspari-annihilation` | Rich Gaspari |

All 12 are carried forward into the roster below at **#1–12**, unchanged in
identity, so nobody currently in the app falls out of the plan.

---

## 1. Architecture recommendation (read this before building anything)

### The problem

Every current `styles.json` entry is expected to hit the Yates bar: full
`summary`, 5–7 sourced `principles`, complete `guidelines` (days/week,
frequency, warm-up protocol, working-set protocol, rep ranges by category),
a day-by-day `splitOverview`, and Tier A/B `sources`. That's the right bar for
a *system* page — but most of the ~43 new names below do **not** have enough
primary-source depth to responsibly fill all of those fields (no DVD, no
official course, sometimes not even a personal brand site). Forcing all 55
through that mold would mean either (a) blocking the roster expansion for
months, or (b) padding thin entries with Tier C guesses — exactly what the
methodology doc forbids.

### The tiers

| Tier | Name | What it requires | Example |
|---|---|---|---|
| **1** | **Full Style** (Yates-depth) | Complete `styles.json` entry: `summary`, `principles` (5–7), `intensityTechniques`, full `guidelines` (days/week, frequency, warm-up, working-set protocol, rep ranges by body-part category), `splitOverview`, `sources` — Tier A/B only, per the methodology doc. | `blood-and-guts` (Dorian Yates) |
| **2** | **Documented Style** | Same shape as Tier 1, but it's honest that fewer fields are as richly filled because primary sources are thinner (e.g. `intensityTechniques` may be `[]`, `repRanges` may have only 1–2 categories, `splitOverview` may carry an explicit "reconstruction" caveat). Still cites Tier A/B only, never rests a numeric claim on Tier C alone. | `bannout-lion` today (honest about having no branded system) |
| **3** | **Roster Card** (new, lighter shape — proposed below) | Not a full training system. A short profile: name, era, titles, 2–4 sourced principles/quotes, 1–3 primary-source links, **no invented split**. If no split exists, the card simply doesn't have one — it does not fabricate one to match the Tier 1 shape. | Most of the 1990s mass-monster era, most Golden Era names without a self-authored book |

**Proposed Tier 3 "Roster Card" fields** (for future data-model work, not built
yet):

```json
{
  "id": "kebab-case-slug",
  "name": "Display Name",
  "era": "e.g. 1993-2003",
  "titles": ["e.g. 1× Mr. Olympia", "..."],
  "why": "1 sentence on why they're in the roster",
  "principles": ["2-4 short, sourced bullets — quotes preferred over paraphrase"],
  "sources": [{ "title": "...", "url": "...", "tier": "A|B|C" }],
  "styleId": "matching styles.json id, or null if no full system exists",
  "tier": 3
}
```

Note the explicit `tier` field even inside a roster card, and the optional
`styleId` link — this is the bridge to the file-structure decision below.

### File structure: one `bodybuilders.json` roster, linking into `styles.json`

**Recommendation: create a new `src/data/bodybuilders.json` roster file.
Every name in the 50+ roster gets exactly one entry there. Only names that
reach Tier 1 or Tier 2 depth also get a full row in `styles.json`, linked back
via a shared `id` (or an explicit `styleId` field on the roster entry).**

Do **not** try to make all 55 rows live in `styles.json` directly, and do
**not** keep the roster as a document-only list with no data file — both of
those were considered and rejected below.

**Why this over "make everyone a `styles.json` row":**
- Pros of one unified `styles.json`: no cross-file linking logic, one query
  path for the UI, no risk of the two files drifting.
- Cons (why we're not doing this): it forces Tier 3 names into a schema shape
  built for Tier 1 depth. You'd either leave most fields empty/null on 30+
  rows (ugly, and a UI has to special-case "empty split" everywhere it renders
  a style), or you'd be tempted to fill them with plausible-sounding filler —
  which directly violates the "never invent sets/reps/splits" rule in the
  methodology doc. It also conflates two different product surfaces: "a
  training system you can follow" vs. "a legend's profile card."

**Why this over "keep it as docs only, no new data file yet":**
- Pros: zero engineering risk right now.
- Cons: the user's ask is explicitly to plan toward *at least 50 bodybuilders
  in total* in the product, and every future research pass would still need
  to decide where the data lives eventually. Naming the target file now
  (`bodybuilders.json`) lets research writers start citing it consistently in
  Phase B/C docs instead of re-litigating the question per person.

**Why `bodybuilders.json` + link, not the reverse (`styles.json` + a
`bodybuilder` lookup):**
- `styles.json` stays exactly what it is today: a curated list of *trainable
  systems*, all Tier 1/2, all with a real split. It doesn't need to grow a
  "this one has no split" escape hatch.
- `bodybuilders.json` becomes the single source of truth for "who is in the
  roster," independent of whether we've written their system up yet. A
  bodybuilder can exist in `bodybuilders.json` for years at Tier 3 before ever
  earning a `styles.json` row — that's expected and fine, not a bug.
- UI benefit: a "Legends" or "Roster" browsing surface can render all 55 cards
  from one file, and only the ones with a non-null `styleId` get a "View full
  training system →" link into the existing style detail page. No schema
  changes needed on `styles.json` at all.

**Summary of the recommendation in one sentence:** *`styles.json` remains the
Tier 1/2 "full systems" table (today's 12, growing via Phase B/C promotions);
a new `bodybuilders.json` becomes the 50+ roster of profile cards, each
optionally linking to a `styles.json` row when a real system has been
documented for that person.*

---

## 2. The roster table (55 names)

Tiers below are **targets/recommendations for the next research pass**, not
claims that the work is already done. Tier 1 targets for currently-existing
entries reflect where they already are per the methodology doc's own
gold-standard audit (Yates locked at 1; Bannout flagged as the weakest,
targeting 2 but may only ever reach a documented 3 if no primary source
surfaces).

Women's bodybuilding/fitness legends are included (Cory Everson, Rachel
McLish, Lenda Murray, Iris Kyle, Kim Chizevsky, Bev Francis — 6 names) because
"bodybuilders" is the broader product framing the user described, not a
male-only Olympia-systems constraint. If the product direction is later
clarified as **male-only Olympia training systems**, this list still holds:
drop the 6 women listed here and backfill with 6 more men from the "further
candidates" pool (e.g. Berry DeMey, Melvin Anthony, Mohamed Makkawy, Chris
Cormier's era-mates, Ben Weider-era names) — the phased delivery order below is
unaffected either way since none of the 6 women are in Phase A/B.

| # | Name | Era/peak | Why include | Tier | Best likely primary-source types | Notes |
|---|---|---|---|---|---|---|
| 1 | Dorian Yates | 1992–1997, 6× Mr. Olympia | Gold-standard entry already; anchors the whole roster's quality bar | 1 (locked) | Official DVD (*Blood & Guts*), DY Nutrition brand site, official YouTube | Do not edit without re-reading first, per methodology doc |
| 2 | Mike Mentzer | 1971–1980 competitor; HIT theorist until 2001 | Defines HIT as a rival philosophy to Yates' HIT | 1 | Official site (mikementzer.org), official YouTube (Heavy Duty College) | Already near gold-standard |
| 3 | Ronnie Coleman | 1998–2007, 8× Mr. Olympia | Most-titled male Olympia champion; high-volume counterpoint to HIT | 1/2 | Ronnie Coleman Nutrition/Signature brand site, official YouTube | Brand site publishes >1 weekly template; keep the caveat |
| 4 | Greg Doucette | 2010s–present, coach/creator | Modern, living, easiest-to-verify system; already near gold-standard | 1 | Official site (gregdoucette.com), official YouTube | Fastest entry to fully lock down further |
| 5 | Hany Rambod / Phil Heath | 2008–2022 (Heath: 7× Mr. Olympia) | FST-7 is a named, still-active coaching system | 1 | hanyrambod.com official site, Muscle & Fitness interviews | Consider splitting Rambod (coach) and Heath (athlete) into separate roster cards later |
| 6 | Arnold Schwarzenegger | 1970–1980, 7× Mr. Olympia | The most culturally significant name in the sport | 1 | Self-authored book (*The New Encyclopedia of Modern Bodybuilding*) | Golden Six vs. competitive-era split already handled correctly |
| 7 | Lee Haney | 1984–1991, 8× Mr. Olympia | Tied most-Olympia-titles record; "stimulate don't annihilate" is a named philosophy | 2 | leehaney.com (thin), Muscle & Fitness/Flex interviews | Look for more official material to reach 1 |
| 8 | Frank Zane | 1977–1979, 3× Mr. Olympia | Aesthetics-era icon; unusually strong personal-site sourcing | 1 | frankzane.com official site | Strong already |
| 9 | Jay Cutler | 2006, 2007, 2009, 2010, 4× Mr. Olympia | High-volume Olympia-era counterpoint; own branded DVD exists | 1 | Official DVD (*One Step Closer*), own YouTube | Strong already |
| 10 | Samir Bannout | 1983 Mr. Olympia | Historically important champion; explicitly the weakest-sourced current entry | 3 (target 2) | Interview leads only — no known book/DVD/branded system | Flagged in methodology doc; may stay Tier 3 permanently absent a primary find |
| 11 | Dexter Jackson | 1999–2019 career, 2008 Mr. Olympia | Longevity record-holder for competing at the top level | 2 | Iron Man Magazine interview (Tier B), own YouTube presence | Own YouTube could upgrade this toward Tier 1 |
| 12 | Rich Gaspari | 1985–1991, multiple Olympia runner-up | Pre-exhaust training philosophy tied to a real brand | 2 | Gaspari Nutrition brand site | 1980s contest-era detail thinner than Nutrition-era coaching content |
| 13 | Tom Platz | Late 1970s–80s; 1981 Mr. Olympia 3rd | Legendary leg-training specialist with a cult following | 1 | Branded leg-training VHS/DVD, podcast/interview archive | Verify against the actual leg-training video, not secondhand paraphrase |
| 14 | Kai Greene | 2012–2016, multiple Olympia runner-up | Highly quotable modern philosophy, huge fanbase | 1 | Own YouTube channel, Dynamik Muscle brand | Separate quotable philosophy from verifiable set/rep protocol |
| 15 | Lee Priest | 1990s–2000s, "The Blond Myth" | 30+ year documented career, still filming himself training | 1 | Own YouTube channel, decades of interviews | Prolific current content makes verification easy |
| 16 | Chris Bumstead | 2019–2024, 5× Classic Physique Olympia | Defines the modern Classic Physique division | 1 | Own YouTube channel (CBum), personal brand | Represents a division distinct from Open bodybuilding |
| 17 | Kevin Levrone | 1991–2003, "The Maryland Muscle Machine" | Iconic 90s mass-monster/Olympia runner-up era | 1/2 | Levrone Signature Series brand, docuseries, own YouTube | Confirm docuseries claims are his own words, not narration |
| 18 | Flex Wheeler | 1993–2003 | Widely considered the most aesthetic physique of the 90s | 2 | Self-authored/co-authored autobiography (*Blood & Sweat*) | Confirm authorship credit before treating book as Tier A |
| 19 | Lee Labrada | 1985–1993, "Mr. Symmetry" | Symmetry-era icon with a lasting education/supplement brand | 1 | Labrada Nutrition official site, own book (*Lean Bodies*) | Strong official brand content on training philosophy |
| 20 | Vince Gironda | 1950s–60s trainer/gym owner, "Iron Guru" | Hugely influential pre-Olympia training theorist | 2 | Self-authored courses/books | Historical text sourcing harder to find online; may need archive research |
| 21 | Steve Reeves | 1940s–50s, Mr. America/Mr. Universe | Foundational aesthetics icon, predates Mr. Olympia entirely | 2 | Self-authored courses/books (*Building the Classic Physique*) | Genuinely primary but old; sourcing is an archival challenge |
| 22 | Larry Scott | 1965–1966, first-ever Mr. Olympia | Historically essential — literally the first champion | 2 | Self-authored mail-order courses/book (*Loaded Guns*) | Courses may be out of print; look for archived/scanned text |
| 23 | Cory Everson | 1984–1989, 6× Ms. Olympia | Most dominant women's bodybuilding champion of her era | 1 | Official workout VHS/DVD series (self-produced) | Rare case of genuine Tier A video documentation for a woman's era |
| 24 | Rachel McLish | 1980, 1982 Ms. Olympia (first-ever) | Founding icon of women's bodybuilding | 2 | Self-authored book (*Flex Appeal* / *Perfect Parts*) | Separate training-protocol content from lifestyle/motivational content in the book |
| 25 | Branch Warren | 2000s–2010s | Old-school-style heavy training, extremely open on camera | 1/2 | Extensive own YouTube/interview documentation | Verify against his own filmed sessions, not secondhand recaps |
| 26 | Nick Walker | 2020s, active competitor | Current-generation mass monster who films himself extensively | 1 | Own YouTube channel | Easiest modern name to verify; content is fresh and self-produced |
| 27 | Rich Piana | 2000s–2017 | Hugely influential self-documentarian of his own training | 1 | Own YouTube channel/brand (5% Nutrition) | Enormous self-filmed back catalog; easy to verify against primary video |
| 28 | Sergio Oliva | 1967–1969, 3× Mr. Olympia, "The Myth" | Arnold's chief Golden Era rival | 3 | Documentaries/interviews about him (mostly Tier B/C) | Little confirmed self-authored material; may stay Tier 3 |
| 29 | Franco Columbu | 1976, 1981, 2× Mr. Olympia | Arnold's training partner; own book may exist | 2/3 | Self-authored book (*Winning Bodybuilding*) — verify | Confirm self-authorship before treating as Tier A |
| 30 | Bill Pearl | 1950s–70s, multiple Mr. Universe | Longevity/legacy icon who wrote extensively | 2 | Self-authored books (*Getting Stronger*, *Keys to the Inner Universe*) | Strong self-authored material exists; could reach 1 with a research pass |
| 31 | Serge Nubret | 1960s–80s, "The Black Panther" | Unique high-volume/cardio-heavy philosophy, long career | 3 | Mostly French-language interviews/documentaries | Language barrier limits primary sourcing to Tier B/C |
| 32 | Robby Robinson | 1970s–80s, still posing into his 70s | Longevity icon, active on social/YouTube today | 2 | His own current YouTube/social presence | Living legend; cross-check current statements vs. historical claims |
| 33 | Casey Viator | 1970s, youngest-ever Mr. America | Directly tied to HIT lineage (Colorado Experiment, Nautilus) | 2 | Nautilus/Arthur Jones documentation, Mentzer-adjacent material | Good pairing context for the existing Heavy Duty entry |
| 34 | Reg Park | 1950s–60s, 3× Mr. Universe | Arnold's own idol/mentor | 2 | Self-authored strength courses | Verify online availability of the original course text |
| 35 | Lou Ferrigno | 1970s Mr. Olympia runner-up; later Hollywood | Crossover fame, still coaches/appears publicly | 2 | Interviews, his own current YouTube/social | Modern accessibility makes verification easier than most Golden Era names |
| 36 | Albert Beckles | Competed into his 50s, "The Ageless Wonder" | Longevity/genetics icon | 3 | Mostly secondary profiles | Thin primary material expected |
| 37 | Nasser El Sonbaty | 1990s mass-monster, multiple Olympia runner-up | Huge frame, unusually articulate multilingual interviews | 2 | Extensive Muscle & Fitness/Flex direct-quote interviews | Good Tier B interview density despite no personal brand site |
| 38 | Paul Dillett | Mid-1990s | Iconic 90s size, brief but memorable career | 3 | Magazine profiles | Limited long-form primary material |
| 39 | Shawn Ray | 1990s, longtime Olympia top-5 | Outspoken, still an active media personality | 2 | Own current YouTube/podcast appearances | Living and accessible; good upgrade candidate |
| 40 | Vince Taylor | 1990s Masters Olympia champion | Longevity + symmetry-era representative | 3 | Magazine profiles | Thin primary sourcing likely |
| 41 | Mike Matarazzo | 1990s mass-monster | Cult fan-favorite of the era | 3 | Magazine/interview profiles | Thin primary sourcing likely |
| 42 | Gunter Schlierkamp | Late 1990s–2000s | Size + European representation | 2/3 | Own brand/coaching content — verify presence | Check for a personal brand/YouTube presence |
| 43 | Markus Ruhl | 2000s, extreme mass | Extreme-mass case study, German representation | 3 | Magazine profiles; some self-filmed gym footage may exist | Check for self-filmed footage as a primary lead |
| 44 | Johnnie Jackson | 2000s–2010s | Powerlifting-bodybuilding hybrid approach | 2 | Own YouTube/social, well-documented lifts | Good modern-era verification potential |
| 45 | Toney Freeman | 2000s–2010s Olympia top-5 | Aesthetics + longevity in the modern-mass era | 3 | Interviews | Thin primary material expected |
| 46 | Victor Martinez | 2000s | Strong physique-era representative, Dominican representation | 3 | Interviews | Thin primary material expected |
| 47 | Dennis Wolf | 2000s–2010s | Modern European mass-monster representative | 2 | Own YouTube/social presence | Check for self-produced training content |
| 48 | Shawn Rhoden | 2018 Mr. Olympia | Most recent "classic-format" Olympia winner before the Big Ramy era | 2/3 | Interviews, some own YouTube | Vet training-source claims independent of any career controversy |
| 49 | Brandon Curry | 2019 Mr. Olympia | Modern Olympia champion, articulate on camera | 2 | Own YouTube/social, interviews | Solid modern accessibility |
| 50 | Hadi Choopan | 2022 Mr. Olympia, "The Persian Wolf" | Current-era champion, distinct training culture | 2 | Own YouTube training footage | Flag translation caveats on any quoted material |
| 51 | Big Ramy | 2020–2021 Mr. Olympia | Modern mass-monster champion with a docuseries | 2 | Docuseries, own YouTube | Verify docuseries statements are his own words, not narration |
| 52 | Lenda Murray | 1990–1995, 1997, 8× Ms. Olympia | Most-titled women's bodybuilding champion pre-Iris Kyle | 2 | Interviews, official appearances | Seek any self-authored material or brand presence |
| 53 | Iris Kyle | 2003–2014, 10× Ms. Olympia | Most Olympia titles of any bodybuilder ever, any gender | 2 | Interviews, social/YouTube presence | High-priority upgrade candidate given historic status |
| 54 | Kim Chizevsky | 1996–1999 Ms. Olympia, then Fitness Olympia | Rare cross-division (bodybuilding → fitness) champion | 3 | Magazine interviews | Thin primary sourcing likely |
| 55 | Bev Francis | 1980s powerlifting-to-bodybuilding pioneer; now coach/gym owner | Pioneered a strength-first approach; still active coaching | 2 | Her own gym/brand content (Powerhouse Gym), interviews | Active coaching presence gives good modern verification options |

---

## 3. Phased delivery

### Phase A — improve the current 12 (Yates locked)

This is already underway in parallel. No new names; just raise #2–12 toward
the Yates bar per the methodology doc. Bannout (#10) is the hardest case and
may top out at Tier 3/"documented Tier 2" if no primary source ever surfaces.

### Phase B — next 15 best primary-sourced names → Tier 1/2

These 15 were chosen specifically because each one has an identifiable Tier A
candidate source (a self-produced DVD/VHS, an official brand site, a
self-authored book, or a large self-filmed YouTube catalog) — meaning a
research pass can plausibly land them at Tier 1 or a well-documented Tier 2
without relying on Tier C aggregators:

1. Tom Platz
2. Kai Greene
3. Lee Priest
4. Chris Bumstead
5. Kevin Levrone
6. Flex Wheeler
7. Lee Labrada
8. Vince Gironda
9. Steve Reeves
10. Larry Scott
11. Cory Everson
12. Rachel McLish
13. Branch Warren
14. Nick Walker
15. Rich Piana

### Phase C — fill to 50+ with Tier 2/3 cards

The remaining 28 names (#28–43, #44–51, #52–55 in the table above) become
Tier 3 Roster Cards first — cheap to produce, honest about thin sourcing, no
invented splits. Any that turn out to have better primary sourcing than
expected during research (e.g. Bill Pearl, Nasser El Sonbaty, Bev Francis all
look like plausible Tier 2 upgrades) get promoted opportunistically, but the
default assumption for Phase C is "roster card, not full style."

Full Phase C name list: Sergio Oliva, Franco Columbu, Bill Pearl, Serge
Nubret, Robby Robinson, Casey Viator, Reg Park, Lou Ferrigno, Albert Beckles,
Nasser El Sonbaty, Paul Dillett, Shawn Ray, Vince Taylor, Mike Matarazzo,
Gunter Schlierkamp, Markus Ruhl, Johnnie Jackson, Toney Freeman, Victor
Martinez, Dennis Wolf, Shawn Rhoden, Brandon Curry, Hadi Choopan, Big Ramy,
Lenda Murray, Iris Kyle, Kim Chizevsky, Bev Francis.

---

## 4. Source strategy reminder

Reuse the project's existing tier rules exactly as defined in
`00-methodology-and-yates-gold-standard.md`:

- **Tier A (highest authority):** the person's own book, DVD/documentary,
  official personal site, official YouTube channel, or a brand they personally
  founded.
- **Tier B:** contemporaneous interviews where the legend is directly quoted
  (Muscle & Fitness, Flex, Iron Man Magazine, etc.) — quote them, don't
  paraphrase the journalist's framing.
- **Tier C (leads only, never sole authority):** Fitness Volt, SimplyShredded,
  Generation Iron round-ups, StrengthLog, and similar aggregators. Fine for
  discovering *that* a primary source exists; never fine as the only citation
  for a specific numeric claim (sets, reps, days/week, rest periods).

This applies at every tier of roster depth — even a Tier 3 Roster Card's 2–4
principles must trace to Tier A/B, exactly like a Tier 1 style entry's
`principles` array. The card is allowed to be *short*; it is never allowed to
be *unsourced*.
