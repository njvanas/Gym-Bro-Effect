# Top 50 bodybuilder roster (selection rule)

The live Bro Legends list is a **curated top 50**, not a headcount target.

## Selection rule

Include an athlete only when we have (or can reasonably find) **Tier A/B primary
material** for their training — enough for an honest methodology page. Fame alone
is not enough if sources are empty.

## Dropped from the 55-name expansion plan

These were removed because primary material was missing or too thin for a top-50
archive:

| id | Reason |
|---|---|
| `albert-beckles` | Zero sources / Needs primary sources |
| `gunter-schlierkamp` | Zero sources / Needs primary sources |
| `johnnie-jackson` | Thin attestation; not top-tier household name |
| `toney-freeman` | Thin attestation |
| `mike-matarazzo` | Thin attestation |

## Current bar

- Exactly **50** entries in `bodybuilders.json` ↔ **50** styles
- Every card uses the same Legend detail layout
- Workouts only when sets/reps are attested; otherwise methodology-only with gaps marked

## Routine coverage rule

Every top-50 bodybuilder must have a **full program** in `routines.json` — a weekly (or system-native) split that covers the whole physique (chest, back, shoulders, arms, legs; abs as their system uses), not one signature bodypart day padded as “complete.”

Prefer Tier A/B tables. When a primary full week is missing, use the best corroborated reconstruction and label it honestly in the routine `description` / `labels` (e.g. book-attributed, coach-system, cross-corroborated secondary, or reconstructed from attested parameters). If a fixed week cannot be verified, say so in `splitOverview` — do not invent certainty.

Celebrate **50/50 full programs**, not “50/50 have a routine.”

See also `00-methodology-and-yates-gold-standard.md`.
