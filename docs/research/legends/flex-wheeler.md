# Primary-source research: `flex-wheeler` (Flex Wheeler)

Target file: `src/data/styles.json` → id `flex-wheeler`. Phase B promotion candidate (see
`00-roster-50-plus.md` #18, target Tier 2). This document does not modify `styles.json` or
`routines.json` directly — it is the source dossier informing that edit.

## Source ledger

| Tier | Source | What it's good for |
|---|---|---|
| **A** | *Flex Ability: A Story of Strength and Survival* — Flex Wheeler with Cindy Pearlman (Hay House, 2003) | Self-authored (co-written) memoir. Confirmed real (Internet Archive, Penguin Random House, Wikipedia all list it). Not full-text reviewed in this pass — flagged as a gap; the memoir is framed around his career/health story, not a sets-and-reps manual. |
| **B** | **"Flex Wheeler Speaks! Sitting in on an up-front seminar with the winningest pro of '97"** by Redd Hall, *MuscleMag International*, November 1997 (full Q&A text reproduced in a T-Nation forum thread, [t-nation.com/t/flex-wheeler/133949?page=2](https://t-nation.com/t/flex-wheeler/133949?page=2)) | **The single best source found.** A contemporaneous magazine feature built entirely around a live seminar Q&A — Flex answering fan questions directly, in his own words, transcribed. Gives concrete, falsifiable training numbers (see below). Hosted as a verbatim forum repost rather than on the original magazine's own site, but the text itself is a dated, attributed, direct-quote magazine interview — genuine Tier B. |
| **B** | Critical Bench — "Interview With Legendary IFBB Bodybuilder Kenneth Flex Wheeler," as told to Ben Tatar, August 2007 | Direct-quote interview; useful for career/lifestyle framing (comparing pre- and post-retirement training), not new sets/reps detail. |
| **B** | Generation Iron — "Flex Wheeler: People Are Misunderstanding The Main Secret To Growth" (first-person guest column, Flex's own byline) | First-person short essay by Flex himself: "Lift heavy intensely 4 to 5 times a week no more than 1.5 hours. Eat lots of food and sleep as much as you can... 99% of progress comes from those simple rules." Corroborates the MuscleMag interview's training-day count and session length. |
| **C** | Better Body Sports — "Flex Wheeler Training Principles"; Generation Iron — "How Flex Wheeler Works Out For A Full Body Pump"; *FLEX* UK June 2017 (Scribd upload) | Aggregator round-ups/listicles built from social-media clips and secondhand paraphrase. Useful only as leads — e.g. they corroborate "high reps, 10–20 range" as a general Wheeler signature — but give no dated, attributed quote of their own and are **not** used for any specific number below. |

## Verified claims (Tier A/B only)

1. **Split structure, in his own words (MuscleMag 1997):** "I do a double split, training one bodypart in the morning and another in the afternoon or evening, usually four days on and one day off." Session length: "one and a half hours or an hour and 45 minutes."
2. **Leg day, in his own words (MuscleMag 1997):** "For a warmup I do leg extensions, 4 sets of 20 reps. Then I immediately go into squats, again 4 sets of 20 reps. Next I do leg presses and end with leg extensions. The reps are always 20, the sets always 4 or 5." He explains the 20-rep leg convention explicitly: "Think how important your legs are... you've got to give 'em more weight and more stress than they normally handle" — versus 10–12 reps for other bodyparts (confirmed when the interviewer references this back to him and he doesn't dispute it).
3. **Calf training, in his own words (MuscleMag 1997):** "I train calves once or twice a week, doing 60 reps for 3 sets: 20 with a heavy weight, 20 a little lighter, and 20 still lighter."
4. **Back training, in his own words (MuscleMag 1997):** "My back-training isn't about any certain specific movements. Instead I hit it from any angle and every angle... I do all the bread-and-butter movements and variations." (Explicitly not a fixed exercise list — do not invent one.)
5. **Off-season = pre-contest exercise selection, in his own words:** "There ain't no off-season! If I'm hammering legs and it works off-season, do you think I'm gonna change it? No way. Keep doin' what works." — i.e. he does not cycle exercises by season.
6. **Training philosophy, self-authored (Generation Iron column):** intensity, consistency, food, and sleep are what matter; he explicitly says the specific-numbers questions ("how many sets, reps, drop sets, super sets, rest time...") "really make very little difference."
7. **Priority-training principle (MuscleMag 1997):** he trains his weakest bodyparts (legs, calves, chest, at various points in his career) first in a session, "not leaving them for last or just doing a couple of sets."

## Gaps — left as "Not yet verified from primary sources"

- No Tier A/B source gives a full 4-day weekly split naming which bodyparts pair on which day beyond "one bodypart AM, another PM." Do not invent a day-by-day table.
- No verified chest, back, shoulder, or arm set/rep numbers exist beyond the general "10 to 12 reps for other bodyparts" comment — the interview only gives an exact table for legs and calves.
- The memoir (*Flex Ability*) was not full-text reviewed in this pass; it may contain more programming detail and is the top follow-up target.

## Draft copy for `styles.json`

**Summary:** anchor to the MuscleMag International, November 1997 seminar Q&A ("Flex Wheeler Speaks!") as the single most concrete, dated, attributed primary artifact; flag that this is the only source with an exact sets/reps table (legs + calves), and that the rest of his split is only generally described (double split, 4 days on/1 off, AM/PM pairing unspecified).

**Principles (Tier A/B only):**
- Double split: one bodypart trained in the morning, a different one in the afternoon/evening, usually 4 days on/1 day off, sessions 1.5–1.75 hours.
- Legs get 20 reps per set (not 10–12 like other bodyparts) "because they propel you all day" and need more stress; leg day is warmup leg extensions → squats → leg press → leg extensions, always 20 reps, 4–5 sets each.
- Calves: 1–2x/week, 3 sets of 20 reps with descending weight (heavy/lighter/lightest).
- Back is trained "from every angle" with no fixed exercise list — deliberately not a fixed program.
- Trains weak bodyparts first in the session, when freshest.
- No off-season exercise switching — keeps doing what works year-round.
- Self-stated philosophy: intensity, consistency, food, and sleep matter far more than the specific number of sets/reps/rest periods.

**Guidelines:**
- `trainingDaysPerWeek`: "4 days on, 1 day off (double split — one bodypart AM, a different one PM/evening)."
- `frequencyPerMuscle`: "Not stated exactly; the 4-on/1-off double-split implies each muscle is hit roughly once every 4–5 days, but Wheeler does not name a fixed weekly rotation."
- `warmupProtocol`: "Documented only for legs: leg extensions, 4 sets of 20 reps, immediately before squats."
- `workingSetProtocol`: "Legs: 4–5 sets of 20 reps per exercise (squats, leg press, leg extensions). Other bodyparts: 10–12 reps per set (exact set counts not stated). Calves: 3 sets of 20 reps, descending weight."
- `repRanges`: Legs 20 reps; Calves 20 reps x3 descending weight; Other bodyparts 10-12 reps (set count unverified).
- `splitOverview`: single documented day = "Leg day" (warmup leg extension → squat → leg press → leg extension finisher). Everything else: "Not yet verified from primary sources" — do not invent a 4-day table.

**Sources (Tier A/B first):**
1. "Flex Wheeler Speaks!" — Redd Hall, *MuscleMag International*, November 1997 (as reproduced on T-Nation forums) — https://t-nation.com/t/flex-wheeler/133949?page=2
2. "People Are Misunderstanding The Main Secret To Growth" — Flex Wheeler, Generation Iron (first-person column) — https://generationiron.com/flex-wheeler-people-are-misunderstanding-the-main-secret-to-growth/
3. *Flex Ability: A Story of Strength and Survival* — Flex Wheeler & Cindy Pearlman (Hay House, 2003) — https://en.wikipedia.org/wiki/Flex_Wheeler
4. Flex Wheeler — Wikipedia (biography, memoir citation) — https://en.wikipedia.org/wiki/Flex_Wheeler

## Routine buildability

Leg day is fully specified with real numbers and maps cleanly onto existing `exercises.json` ids:
`leg-extension` (warmup, 4x20), `barbell-squat` (4-5x20), `leg-press` (working set, sets/reps
not separately specified beyond "the reps are always 20, the sets always 4 or 5" applying to the
whole sequence), `leg-extension` (finisher — represented via a note rather than a duplicate slot),
`standing-calf-raise` (3x20 descending weight). This is enough for one legitimate legend routine
("Leg Day"). No other bodypart day has a specific enough source to build a second routine without
inventing exercise selection — left as a gap.
