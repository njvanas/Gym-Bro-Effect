# Casey Viator — Primary Source Research (`casey-viator`)

Target: `src/data/styles.json` → `casey-viator`. Research only — no data files edited.

## Source Ledger

### Tier A — the original experiment report (about him, co-authored context)

| # | Source | Detail |
|---|--------|--------|
| A1 | Arthur Jones, "The Colorado Experiment" — original report, reprinted by *Ironman Magazine* and hosted as a PDF on arthurjonesexercise.com | The primary documentary record of the May 1973 Colorado Experiment: Viator trained by Arthur Jones personally, exclusively on Nautilus equipment, 12 workouts in 28 days, each under 30 minutes, using negative-only reps on roughly half the exercises, all sets to failure. Reported result: 45.28 lb bodyweight gain, 17.93 lb fat loss, for a claimed 63.21 lb "muscular gain" (a figure treated skeptically by later sources — see Gaps). This is Tier A in the sense that it's the original primary document, though it is authored by Jones about Viator, not by Viator himself. |

### Tier B/C — retrospective analysis and corroboration

| # | Source | Detail |
|---|--------|--------|
| B1 | Wikipedia, "Colorado Experiment" (well-cited overview) | Corroborates the training protocol details (negative-only reps on 50% of exercises, Jones personally training Viator every session) and flags the core controversy: both subjects were regaining previously-trained muscle mass after a period of inactivity, not building it from scratch, and Mike Mentzer later publicly stated Viator was "literally force-fed" — i.e., the muscle gain figure likely included substantial fat/water, not pure lean mass. |
| C1 | physicalculturestudy.com retrospective | Adds context: the experiment was conducted with Dr. Elliott Plese at Colorado State University's Physical Education Laboratory; describes Jones's stated training philosophy: sets taken to failure, minimal-to-no rest between exercises on the equipment. |

## Verified Claims (Tier A/co-primary)

1. **A specific, dated, documented 28-day training protocol exists** (May 1–29, 1973): 12 total workouts, each under 30 minutes, using only Nautilus equipment, roughly half the exercises performed with negative-only (eccentric) reps, every set taken to failure (A1).
2. **Viator's own training history prior to the experiment is documented** in the same report: barbell/conventional training through mid-1970, mixed barbell + Nautilus through 1971 (won Mr. America), Nautilus-primary with limited barbell squats through Sept. 1972, then Nautilus-exclusive negative-only training through Dec. 1972 (A1) — meaning the experiment picked up an already Nautilus-trained athlete, not a novice.
3. **The headline "63 lb of muscle" claim is independently disputed**, including by Mike Mentzer, a contemporary in the same HIT circle (B1) — this should be reflected as an explicit caveat in any `styles.json` copy, not repeated as an uncontested fact.

## Gaps

- **This is fundamentally a study about Viator, using Arthur Jones's training philosophy, not a "Casey Viator training system" in his own voice.** No first-person Viator interview, book, or video describing his own training approach (before, during, or after the experiment) was located in this pass. If `styles.json` treats this as its own style entry, the honest framing is "the Nautilus/Jones protocol Viator was subjected to," paired with the Heavy Duty (`heavy-duty`) entry as historical context, not as Viator's personal branded system.
- The exact list of which specific exercises were negative-only vs. standard was not itemized past-tense in the sources reviewed here.

## Draft styles.json Field Suggestions

> Casey Viator's most documented training period is the 1973 Colorado Experiment — 28 days, 12 total workouts under 30 minutes each, all on Nautilus equipment, roughly half the exercises done with negative-only reps, every set to failure, personally supervised by Arthur Jones. The reported 63-lb "muscular gain" is disputed even within the HIT community (Mike Mentzer called it "force-fed"), so this figure should be presented as a contested historical claim, not a settled fact. No separate, first-person Viator training philosophy beyond this experiment and his later association with Mike Mentzer's Heavy Duty circle was found in this research pass.

**Note for future edits:** pair this entry with `heavy-duty` (Mike Mentzer) as historical/lineage context per the roster plan (`00-roster-50-plus.md` #33) rather than trying to build an independent Viator-branded system.

## Weakest-Sourcing Verdict

Moderate: the underlying primary document (A1) is genuinely strong and well-dated, but it describes an experiment run *on* Viator by Jones, not Viator's own voice — so despite having real Tier A material, there is no first-person Viator training philosophy to cite.
