# Primary-source research: `larry-scott` (Larry Scott)

Target file: `src/data/styles.json` → id `larry-scott`. Phase B promotion candidate (see
`00-roster-50-plus.md` #22, target Tier 2). This document does not modify `styles.json` or
`routines.json` directly.

## Source ledger

| Tier | Source | What it's good for |
|---|---|---|
| **A** | *Loaded Guns: Blueprint for Building Massive Arms* — Larry Scott, with John Little (self-authored; still sold today, e.g. Golden Era Bookworm ebook edition) | His own book, entirely about his arm-training methodology. Confirmed real and still in print/reprint. Full text not directly reviewed in this pass; content below is drawn from two independent secondary accounts that both explicitly cite the book (see next rows), plus a direct excerpt hosted by fellow Golden Era bodybuilder Dave Draper. |
| **A** | Excerpt from *Loaded Guns* — hosted at davedraper.com | A genuine excerpt from the book itself, covering Scott's views on machines (Paramount triceps machine, Polaris/Flex rear-delt machines, preacher-bench evolution, abdominal trunk-curl machines vs. sit-ups). Confirms the book's authorship and voice directly but this particular excerpt does not cover the specific arm set/rep routine — that comes from the Tier B accounts below, which both cite the book by name. |
| **A/B** | Alan Palmieri interview with Larry Scott himself, published alongside "Larry Scott 'The Legend'" (Palmieri, © 2005; mirrored at pdfcoffee.com) | The second half of this document is a direct, on-the-record Q&A between Palmieri and Larry Scott, in Scott's own words — covering his relationship with Vince Gironda, the origin of the Preacher/"Scott" Bench, and Gironda teaching him the "down the rack" dumbbell system for shoulders ("I couldn't get big in my shoulders... Vince taught me that down the rack system for deltoids which really helped me put on some extra weight"). Genuine Tier A/B first-person material, though this particular quote does not include exact sets/reps for the down-the-rack technique. |
| **B** | Same document (Palmieri, "Larry Scott 'The Legend'") — the article's own reconstruction of a specific Larry Scott arm-training session, explicitly framed as drawing on "Loaded Guns" and on witnessed/documented training at Vince's Gym | Gives a fully detailed, exercise-by-exercise account with exact weights/reps/burns for a real Scott arm session (biceps triset, triceps sequence) — see Verified claims below. |
| **B** | Paul Becker (TrulyHuge), "Bigger Arms Fast: Old School Arm Training" — leanbody.com (Labrada Nutrition's official blog) | Independently corroborates the same *Loaded Guns* biceps triset (dumbbell preacher curl / barbell preacher curl / EZ-bar reverse preacher curl, 6 reps + burns each) from a different author who says he personally sent away for "Larry Scott's training courses" in 1972 — a second, independent secondary account matching Palmieri's on the core numbers, which raises confidence they both trace accurately back to the book. |
| **C** | Various uncredited "old school arms" round-ups repeating the same triset numbers | Not used as a standalone source — cited only insofar as they match the two independent Tier B accounts above. |

## Verified claims (Tier A/B only)

1. **Signature biceps triset (corroborated independently by Palmieri and Becker/TrulyHuge, both citing *Loaded Guns*):** Dumbbell Preacher Curl → Barbell Preacher Curl → (after several rounds) EZ-Bar Reverse Preacher Curl, elbows kept close together/in, hands wider than shoulder width, full contraction and extension every rep, no cheating. Working numbers: 60 lb dumbbells for 6 reps + 3 "burns" (partial reps) per set on the DB Preacher Curl, alternated set-for-set with Barbell Preacher Curl (6 reps + 3 burns), for a combined total of 6 sets, resting about 1 to 1.5 minutes between rounds. Reverse Preacher Curl with an 85 lb EZ-bar: 4 straight sets, medium grip, 6 reps + 3 burns each (Palmieri's account) — Becker's independent account gives the same three exercises and the same 6-reps-plus-burns structure, describing 3-6 total trisets as the general range.
2. **Signature triceps sequence (Palmieri account, citing the book):** Lying Triceps Extension with an EZ-bar (bar lowered to the eyes, pressed up on triceps power only, elbows locked out each rep) alternated with Kneeling Pulley Extensions (elbows rested on a low bench, kept close to the head) for a combined 6 sets of 8 reps + 3 burns each, finishing with One-Arm Triceps Kickback (dumbbell) for 4-6 sets of 8-10 reps.
3. **The "down the rack" shoulder system, in Larry Scott's own words (Palmieri interview):** Vince Gironda personally taught him this dumbbell lateral-raise drop-set technique because Scott "couldn't get big in [his] shoulders" using standard magazine advice — he credits it directly with adding shoulder mass. No specific sets/reps/weights are given for this technique in the interview; treated as a documented principle, not a numeric protocol.
4. **He trained at Vince's Gym and used the Preacher Bench so heavily that it became known as the "Scott Bench"** — confirmed in his own words (Palmieri interview): "I guess I popularized it... [the Easton Brothers] are the ones that actually created it," crediting the bench's true originators rather than claiming invention.
5. **Nutrition philosophy, his own widely-quoted line (multiple biographical sources agree on attribution):** "Success in bodybuilding is 75% to 80% nutrition" — paired with a documented high-protein regimen (Rheo H. Blair protein powder in heavy cream, plus milk).

## Gaps — left as "Not yet verified from primary sources"

- No exact set/rep numbers exist for the "down the rack" shoulder technique — only the fact that Gironda taught it to him and that it worked for his shoulders specifically.
- No full weekly split (which other bodyparts on which days, training frequency) was found in Tier A/B material — only the arm-day session above is fully specified with numbers.
- *Loaded Guns*' full text was not directly reviewed in this pass; the numbers above trace to two independent secondary accounts that both cite the book, not to a direct page scan.

## Draft copy for `styles.json`

**Summary:** anchor to *Loaded Guns: Blueprint for Building Massive Arms* (Larry Scott's own
self-authored book on his arm training) as corroborated by two independent secondary accounts
(Alan Palmieri's Larry Scott profile/interview, and Paul Becker's TrulyHuge piece hosted on
Labrada Nutrition's official blog) that both cite the book and agree on the core numbers.

**Principles (Tier A/B only):**
- Signature biceps triset: dumbbell preacher curl and barbell preacher curl alternated set-for-set (elbows in, hands wider than shoulders, full range every rep, no cheating), 6 reps plus 3 "burn" partials per set, ~6 total sets, then EZ-bar reverse preacher curls for burns as well.
- Signature triceps pairing: lying EZ-bar triceps extension alternated with kneeling pulley extensions, 8 reps plus burns per set, finished with one-arm dumbbell kickbacks.
- Learned the "down the rack" dumbbell drop-set system for shoulders directly from Vince Gironda, crediting it with fixing his own weak-point shoulder development.
- Popularized, but did not invent, the Preacher Bench — credits the Easton Brothers' gym as its true originator.
- "Success in bodybuilding is 75% to 80% nutrition" — trained under Vince Gironda's/Rheo H. Blair's high-protein nutrition philosophy.

**Guidelines:**
- `trainingDaysPerWeek`: "Not specified in the sources reviewed beyond the arm-day session itself."
- `frequencyPerMuscle`: "Not specified beyond the documented arm day."
- `warmupProtocol`: "Not specified in the sources reviewed."
- `workingSetProtocol`: "Biceps: alternating preacher-curl triset, 6 reps + 3 burns per set, ~6 total sets, 1-1.5 min rest between rounds. Triceps: alternating lying-extension/pulley-extension pairing, 8 reps + 3 burns per set, ~6 total sets, finished with 4-6 sets of 8-10 dumbbell kickbacks."
- `repRanges`: Biceps 6 reps + burns; Triceps 8 reps + burns; kickback finisher 8-10 reps.
- `splitOverview`: single documented day = "Arms" (biceps triset into triceps pairing). No other day is specified in Tier A/B material — do not invent one.

**Sources (Tier A/B first):**
1. *Loaded Guns: Blueprint for Building Massive Arms* — Larry Scott & John Little — https://www.goldenerabookworm.com/product-page/loaded-guns-by-larry-scott
2. Excerpt from *Loaded Guns* — davedraper.com — https://davedraper.com/loaded-guns.html
3. "Larry Scott 'The Legend'" (article + first-person Palmieri/Scott interview) — Alan Palmieri, © 2005 — https://pdfcoffee.com/download/larry-scott-article-pdf-free.html
4. "Bigger Arms Fast: Old School Arm Training" — Paul Becker, TrulyHuge, via LeanBody.com (Labrada Nutrition) — https://leanbody.com/blogs/training-exercise/bigger-arms-fast

## Routine buildability

The arm-day session maps onto `exercises.json` for its verifiable-numbered exercises:
`preacher-curl-barbell` (Barbell Preacher Curl, exact match), `overhead-triceps-extension-cable`
(closest match to "Kneeling Pulley Extensions" — elbows in close to the head, an overhead/behind
cable triceps extension), `lying-triceps-extension` (Lying Triceps Extension, exact match).
"Dumbbell Preacher Curl," "EZ-Bar Reverse Preacher Curl," and "One-Arm Triceps Kickback" have no
library match and are omitted (gap, not invented) rather than substituted with a different
exercise. The "down the rack" shoulder technique has a documented name but no numbers, so it is
described in principles/guidelines only and is not added as a routine slot. 3 verified-exercise
matches with exact quoted numbers is enough for one legitimate legend routine ("Arms").
