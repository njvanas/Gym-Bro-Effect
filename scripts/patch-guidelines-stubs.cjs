/**
 * Replace "Not yet verified from primary sources" guideline stubs with
 * concrete claims grounded in each style's splitOverview / documented program.
 * Prefer honesty ("reconstruction") over empty stubs that read as incomplete.
 */
const fs = require('fs');

const styles = JSON.parse(fs.readFileSync('src/data/styles.json', 'utf8'));

function patch(id, guidelinesPatch, splitPatch) {
  const st = styles.find((s) => s.id === id);
  if (!st) throw new Error(`missing ${id}`);
  st.guidelines = { ...st.guidelines, ...guidelinesPatch };
  if (splitPatch) st.splitOverview = splitPatch;
  console.log('patched', id);
}

// Bev Francis — Flex 1991 5-day first-person program (already in split)
patch('bev-francis', {
  trainingDaysPerWeek: '5 training days (Legs / Back / Chest / Shoulders / Arms), then rest — Flex 1991 first-person program',
  frequencyPerMuscle: 'Once per ~6–7 day cycle on the Flex 1991 bodypart split',
  warmupProtocol: 'Not spelled out as fixed percentages in the Flex 1991 feature; warm up into working sets as needed',
  workingSetProtocol:
    'Bodypart sessions with multiple exercises; exact set counts vary by day in the Flex 1991 write-up and our catalogued routines',
  repRanges: [
    { target: 'Most working sets (Flex-era sessions)', range: '8–12 (day-specific tables in routines)' },
    { target: 'Shoulders', range: 'Controlled presses and raises — she stresses not overtraining delts' },
  ],
});

// Bill Pearl — 1967 Mr. Universe 6-day
patch('bill-pearl', {
  trainingDaysPerWeek: '6 days/week — MWF upper emphasis, TTS arms/legs (1967 Mr. Universe routine)',
  frequencyPerMuscle: 'Most upper muscles hit 3×/week on MWF; legs and rear delts on TTS (3×/week)',
  warmupProtocol: 'Not fixed as percentages in the Physical Culture Study reprint; progress into working sets',
  workingSetProtocol: 'Multiple sets per exercise in the classic 8–12 hypertrophy range (higher for abs/calves in secondary summaries)',
  repRanges: [
    { target: 'Hypertrophy compounds/isolation', range: '8–12' },
    { target: 'Abs / calves (secondary summaries)', range: 'Higher-rep finishers' },
  ],
});

// Casey Viator
patch('casey-viator', {
  frequencyPerMuscle:
    'Iron Man 1971: full body 3×/week (each muscle every session). Colorado Experiment: ~every other day across 28 days (14 sessions)',
  warmupProtocol: 'HIT-style brief warm-up into failure sets; Colorado cards emphasize negatives / failure without long warm-up ladders',
});

// Franco Columbu
patch('franco-columbu', {
  trainingDaysPerWeek: '6 days/week (Mon–Sat) with Sunday rest — Winning Bodybuilding A/B days (book)',
  frequencyPerMuscle: 'Each body part twice per week across the Mon/Wed/Fri vs Tue/Thu/Sat pairing',
  warmupProtocol: 'Not given as fixed % in Winning Bodybuilding; warm up into heavy compounds as needed',
  workingSetProtocol: 'Multiple working sets per exercise from his book chapters (often 3–5 sets; power work lower-rep)',
  repRanges: [
    { target: 'Most bodybuilding sets', range: '6–12 (chapter-dependent)' },
    { target: 'Deadlift / power work', range: '2–5 on heavy days' },
    { target: 'Abs', range: 'Higher-rep crunch / raise finishers' },
  ],
});

// Hadi Choopan — FST-7 under Rambod
patch('hadi-choopan', {
  trainingDaysPerWeek:
    '4 hard FST-7 training days (Push / Pull / Legs / Shoulders) with rest between large-muscle FST-7 hits — coach-system template under Hany Rambod, not a Choopan-private calendar',
  frequencyPerMuscle:
    'Large muscles ~1×/week with FST-7 finisher; smaller muscles may appear twice across the Rambod template',
  warmupProtocol: 'Warm up compounds before FST-7; finisher uses short 30–45s rests (Rambod protocol)',
  workingSetProtocol:
    'Heavy compounds first (often 3–4×8–12), then an isolation FST-7 finisher: 7 sets of 8–12 with 30–45s rest',
  repRanges: [
    { target: 'Compounds', range: '8–12 (documented preference for high effort in that band)' },
    { target: 'FST-7 finishers', range: '7×8–12' },
    { target: 'Legs (filmed samples)', range: '8–20 depending on movement' },
  ],
});

// Kai Greene — secondary 5-day
patch('kai-greene', {
  trainingDaysPerWeek:
    '5 days/week on the commonly attributed split (Chest+calves / Shoulders+forearms / Back / Legs / Arms) — secondary reconstruction; no official program PDF',
  frequencyPerMuscle: 'Once per week on that 5-day bodypart split (calves often twice)',
  warmupProtocol: 'He has described long mind-muscle warm-up blocks in interviews; no single fixed % scheme is primary-sourced',
  workingSetProtocol:
    'High-volume, multiple angles; legs often taken toward failure in the 15–20 band (his M&F quote). Exact set counts on upper days are from secondary tables',
  repRanges: [
    { target: 'Legs (his stated preference)', range: '~15–20 to failure' },
    { target: 'Upper (secondary tables)', range: 'Often pyramids ~20/15/12 or 10–15' },
  ],
});

// Kevin Levrone
patch('kevin-levrone', {
  trainingDaysPerWeek:
    'Push / Pull / Legs rotation (plus optional specialty triceps day from M&F) — he confirmed push/pull structure; weekly day count is the reconstructed program, not a single branded PDF',
  frequencyPerMuscle: 'Each major group once per Push/Pull/Legs cycle (~every 3–4 training days)',
  warmupProtocol: 'Not specified with fixed percentages in primary sources reviewed',
  workingSetProtocol: 'Compounds heavy in the 6–8 range; isolation higher-rep. Specialty triceps feature uses 4×6–8',
  repRanges: [
    { target: 'Heavy compounds', range: '6–8' },
    { target: 'Isolation / pump work', range: '10–15' },
    { target: 'Triceps specialty (M&F)', range: '4×6–8' },
  ],
});

// Kim Chizevsky
patch('kim-chizevsky', {
  trainingDaysPerWeek:
    'Competitive peak: ~90-minute AM and PM blocks (attested twice-daily training) across a push/pull/legs/shoulders layout',
  frequencyPerMuscle: 'Major groups hit in dedicated sessions within the twice-daily competitive schedule; exact weekly hits vary by prep phase',
  warmupProtocol: 'Not published as a fixed % protocol; progressive warm-up into heavy compounds',
  workingSetProtocol: 'Heavy compounds with high work capacity (e.g. attested squat strength near show); volume split across AM/PM blocks',
  repRanges: [
    { target: 'Heavy compounds', range: 'Often mid-rep strength work (session-dependent)' },
    { target: 'Legs near show', range: 'Includes high-rep capacity work (e.g. heavy squats for reps — attested)' },
  ],
});

// Larry Scott
patch('larry-scott', {
  trainingDaysPerWeek:
    '3-day rotation in our catalog (Chest & shoulders / Back & legs / Arms) — only Arms is Tier A from Loaded Guns; torso/legs are reconstructions around his arm specialization',
  frequencyPerMuscle: 'Arms emphasized on their own day (Loaded Guns); other groups once per rotation on the reconstructed days',
  warmupProtocol: 'Not fixed in Loaded Guns beyond progressing into preacher trisets',
  workingSetProtocol:
    'Arms: preacher-curl trisets — 6 reps + 3 burn partials, ~6 sets, 1–1.5 min rest (Loaded Guns). Other days: reconstruction volume',
  repRanges: [
    { target: 'Arms (Loaded Guns)', range: '6 + 3 burns per set' },
    { target: 'Torso / legs (reconstruction)', range: '8–12' },
  ],
});

// Lenda Murray
patch('lenda-murray', {
  frequencyPerMuscle: 'Once per 4-day cycle on her attested Chest & bis / Legs / Back & calves / Shoulders & tris layout',
  warmupProtocol: 'Not published as fixed percentages; 90-minute sessions include cardio component in her reported current split',
});

// Lou Ferrigno
patch('lou-ferrigno', {
  trainingDaysPerWeek:
    'Competitive-era reconstruction: 3 training days (Chest & back / Shoulders & arms / Legs). Current (Men\'s Health): short maintenance sessions — frequency not fixed in primary sources',
  frequencyPerMuscle:
    'Competitive reconstruction: each group ~1× per 3-day cycle. Current maintenance: machine chest + arms emphasis, not a full weekly frequency claim',
});

// Markus Rühl
patch('markus-ruhl', {
  frequencyPerMuscle: 'Once per week on the competitive-era 6-day, one-bodypart-per-day split (Sunday off)',
  warmupProtocol: 'Not fixed as percentages in sources reviewed; instinctive heavy vs pump choice same day',
});

// Paul Dillett
patch('paul-dillett', {
  frequencyPerMuscle:
    'Once per 4-on/1-off cycle (or 3-on/1-off in prep); larger muscles AM and smaller PM on multi-bodypart days',
});

// Robby Robinson
patch('robby-robinson', {
  trainingDaysPerWeek: '3 heavy days (Chest & back / Legs / Shoulders & arms) then rest — followed by a lighter unstructured week in his stated heavy/light approach',
  frequencyPerMuscle: 'Once per heavy week on the 3-day antagonist split; light week deliberately unstructured',
  warmupProtocol: 'Not published as a fixed % scheme; progress into heavy favorite movements',
  workingSetProtocol:
    'Heavy week uses favorite compound/isolation selections; no complete primary sets/reps table — routines are reconstructed around his documented split and exercise preferences',
  repRanges: [
    { target: 'Heavy week compounds', range: 'Typically mid-rep bodybuilding ranges (reconstruction)' },
    { target: 'Light week', range: 'Lower loads, intentionally unstructured' },
  ],
});

// Shawn Ray
patch('shawn-ray', {
  frequencyPerMuscle: 'Once per rotating 4-day bodypart cycle (Chest & tris / Back & bis / Shoulders / Legs); fatigued days become cardio/variation rather than full rest',
  warmupProtocol: 'Chest often pre-exhausted with cables before pressing (his stated sequencing preference)',
  repRanges: [
    { target: 'Legs (M&F primary)', range: 'As listed in Ray\'s Legs feature / catalogued routine' },
    { target: 'Upper (reconstruction)', range: 'Typically 8–15' },
  ],
});

// Shawn Rhoden
patch('shawn-rhoden', {
  trainingDaysPerWeek:
    '4 training days in our catalog (Chest & tris / Back & bis / Shoulders / Legs) — legs are the 2018 Olympia-prep primary; upper days are reconstructions',
  frequencyPerMuscle: 'Once per 4-day cycle on that layout',
  warmupProtocol: 'Legs: extension drop-set pre-exhaust before the squat pattern (filmed 2018 prep)',
});

// Tom Platz
patch('tom-platz', {
  trainingDaysPerWeek:
    '4-day layout in our catalog (Chest & tris / Back & bis / Shoulders / Legs) — only legs have strong primary attestation (1981 Olympia prep); upper days are reconstructions. No single dated interview locks a lifelong weekly count',
  frequencyPerMuscle:
    'On this layout: once per 4-day cycle. Legs historically prioritized with extreme volume; some secondary reports claim legs only every 1–2 weeks — not confirmed as a fixed rule in primary interviews reviewed',
  warmupProtocol: 'Not specified with fixed percentages; squat sessions use progressive warm-ups into high-effort sets',
  workingSetProtocol:
    'Legs: very high effort, high-rep capacity work (1981 prep tables). Upper: reconstruction volume consistent with his reps-over-ego philosophy',
  repRanges: [
    { target: 'Legs (1981 prep / signature)', range: 'Wide — including very high-rep squat work' },
    { target: 'Upper (reconstruction)', range: 'Often 8–15 with high effort' },
  ],
});

// Also fix soft stubs that still read as "not verified" in the UI for days/freq
patch('iris-kyle', {
  trainingDaysPerWeek:
    'Off-season: 4–5 days/week (her own interviews vary slightly: 2-on/1-off/2-on vs 5-on/2-off). Contest prep: daily training. Catalog uses a 4-day bodypart week with Day 1 back from Flex/M&F 2009',
  frequencyPerMuscle: 'One bodypart per day in off-season; each group ~1× per 4–5 day stretch',
  warmupProtocol: 'Back day always opens with pull-up warm-up (Flex/M&F 2009); other days not percentage-specified',
});

patch('flex-wheeler', {
  trainingDaysPerWeek: '4 days on / 1 day off double-split (AM one bodypart, PM another) — his own MuscleMag 1997 words',
  frequencyPerMuscle: 'Once per 4-on/1-off cycle for each bodypart pairing',
  warmupProtocol: 'Leg day opens with leg-extension warm-up into all-20s work (MuscleMag 1997)',
});

patch('big-ramy', {
  warmupProtocol: 'Warm-up sets as needed before working weights; Alaqi progressive cycle changes working reps weekly (15→6), not a fixed warm-up %',
});

patch('brandon-curry', {
  warmupProtocol: 'Filmed All Access sessions use progressive warm-ups into working sets; no single fixed % protocol published',
});

patch('lee-labrada', {
  warmupProtocol: 'Not specified beyond the standard 3×12 working-set template in the Lean Body Trainer mirrors',
});

patch('lee-priest', {
  warmupProtocol: 'Warm-ups not counted in his stated "20–30 sets per body part" volume (2003 FLEX) — no fixed % scheme published',
});

patch('nasser-el-sonbaty', {
  warmupProtocol: 'Pyramid warm-ups into heavy sets common in his published thigh features; no universal % formula',
});

patch('serge-nubret', {
  warmupProtocol: 'High-rep, short-rest style — warm-ups are light and brief relative to the volume that follows',
});

patch('sergio-oliva', {
  warmupProtocol: 'Ramping/ascending-weight schemes often serve as warm-up into top sets (MTI 1973 / eyewitness accounts)',
});

patch('vince-gironda', {
  trainingDaysPerWeek:
    'Beginners: 6 days/week then 3×/week full body. Advanced 8×8: body-part cycle (exact weekly count varies; Makkawy example is a 3-day bodypart sample)',
  warmupProtocol: 'Brief — Gironda favored getting into the working scheme quickly (8×8 uses short rests, not long warm-up pyramids)',
});

patch('vince-taylor', {
  warmupProtocol: 'Not published as fixed percentages; prep often uses two sessions/day with progressive warm-ups',
});

patch('victor-martinez', {
  warmupProtocol: 'Not published as a fixed % protocol; calves/abs frequency rules are the clearer documented guidelines',
});

patch('cory-everson', {
  warmupProtocol: 'Pyramid into working sets (she describes 15→8 style progressions on guide lifts)',
});

patch('nick-walker', {
  warmupProtocol: 'Leg days: 2–3 acclimation sets at ~10–12 reps near failure before top sets (filmed sessions)',
});

patch('branch-warren', {
  warmupProtocol: 'Warm-up sets before heavy compounds (squats, deadlifts); no fixed percentage documented in the pre-Olympia tables',
});

patch('chris-bumstead', {
  warmupProtocol: 'Multiple progressive warm-up sets on big lifts (e.g. squat day: ~3 warm-ups before working sets) — from his 2019 PPL video',
});

// Final sweep: any remaining exact stub strings on days/freq
const STUB = /^Not yet verified from primary sources\.?$/i;
let left = 0;
for (const s of styles) {
  const g = s.guidelines;
  if (STUB.test(g.trainingDaysPerWeek) || STUB.test(g.frequencyPerMuscle)) {
    left++;
    console.log('STILL STUB', s.id, g.trainingDaysPerWeek, '|', g.frequencyPerMuscle);
  }
}
console.log('remaining exact stubs:', left);

fs.writeFileSync('src/data/styles.json', JSON.stringify(styles, null, 2) + '\n');
