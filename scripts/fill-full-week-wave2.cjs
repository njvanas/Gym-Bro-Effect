/**
 * Wave 2: remaining thin legends → full weekly programs.
 * Prefer Tier A/B; when only cross-corroborated / coach-system material exists,
 * label honestly. Never pretend a single signature day is a complete program.
 */
const fs = require('fs');

const exercises = JSON.parse(fs.readFileSync('src/data/exercises.json', 'utf8'));
const routines = JSON.parse(fs.readFileSync('src/data/routines.json', 'utf8'));
const styles = JSON.parse(fs.readFileSync('src/data/styles.json', 'utf8'));
const exIds = new Set(exercises.map((e) => e.id));

function addExercise(ex) {
  if (exIds.has(ex.id)) return;
  exercises.push(ex);
  exIds.add(ex.id);
  console.log('exercise+', ex.id);
}

addExercise({
  id: 'donkey-calf-raise',
  name: 'Donkey Calf Raise',
  aliases: [],
  primaryMuscle: 'calves',
  secondaryMuscles: [],
  equipment: 'machine',
  category: 'isolation',
  cues: ['Hips hinged', 'Full stretch at bottom', 'Squeeze at top'],
});

function ws(n, intensity) {
  return Array.from({ length: n }, (_, i) => ({
    label: String(i + 1),
    kind: 'working',
    intensity,
  }));
}

function slot(id, sets, reps, notes, scheme) {
  if (!exIds.has(id)) throw new Error(`Missing exercise ${id}`);
  const out = { exerciseId: id, sets, repRange: reps, setScheme: scheme || ws(sets, reps) };
  if (notes) out.notes = notes;
  return out;
}

function maxSort(styleId) {
  return Math.max(
    0,
    ...routines.filter((r) => r.styleId === styleId).map((r) => r.sortOrder || 0),
  );
}

function addRoutine(r) {
  if (routines.some((x) => x.id === r.id)) {
    console.log('skip', r.id);
    return;
  }
  for (const ex of r.exercises) {
    if (!exIds.has(ex.exerciseId)) throw new Error(`${r.id}: missing ${ex.exerciseId}`);
  }
  r.collection = 'legend';
  r.sortOrder = r.sortOrder || maxSort(r.styleId) + 1;
  r.labels = r.labels || ['Full program'];
  routines.push(r);
  console.log('added', r.id);
}

function ensureSource(styleId, title, url) {
  const st = styles.find((s) => s.id === styleId);
  if (!st) return;
  if (!st.sources) st.sources = [];
  if (st.sources.some((s) => s.url === url)) return;
  st.sources.push({ title, url });
}

function setSplit(styleId, days) {
  const st = styles.find((s) => s.id === styleId);
  if (st) st.splitOverview = days;
}

function patchStyle(styleId, patch) {
  const st = styles.find((s) => s.id === styleId);
  if (!st) return;
  Object.assign(st, patch);
  console.log('stylepatched', styleId);
}

function patchRoutine(id, patch) {
  const r = routines.find((x) => x.id === id);
  if (!r) return;
  Object.assign(r, patch);
  console.log('patched', id);
}

// ============================================================================
// BIG RAMY — M&F Flex split via coach Ahmad Alaqi (Tier B) + machine preference (M&F quote)
// Existing quads day kept; add rest of week.
// ============================================================================
const ramySrc = {
  name: "How Big Ramy Built His Ridiculously Thick, Wide Back — Muscle & Fitness / Flex (coach Alaqi split + progressive reps)",
  url: 'https://www.muscleandfitness.com/flexonline/training/how-big-ramy-built-his-ridiculously-thick-wide-back/',
};

addRoutine({
  id: 'big-ramy-chest',
  name: 'Big Ramy — Chest',
  day: 'Monday',
  styleId: 'big-ramy',
  focus: ['chest'],
  description:
    'Monday chest from the competitive split published with coach Ahmad Alaqi in Muscle & Fitness/Flex (Mon chest / Tue legs / Wed delts / Thu back / Fri arms). Machine-biased selection matches Ramy\'s own quoted preference for machines. Reps cycle 15→6 across weeks per Alaqi.',
  source: ramySrc,
  labels: ['Full program', 'Coach-attributed (Alaqi / M&F)'],
  exercises: [
    slot('incline-dumbbell-press', 4, '10-15', 'Or incline machine press — cycles 15→6 weekly.'),
    slot('chest-press-machine', 4, '10-15', 'Hammer Strength / flat machine press.'),
    slot('incline-bench-press-smith', 4, '10-15'),
    slot('cable-crossover', 4, '10-15'),
    slot('pec-deck', 4, '10-15'),
  ],
});

addRoutine({
  id: 'big-ramy-shoulders',
  name: 'Big Ramy — Shoulders',
  day: 'Wednesday',
  styleId: 'big-ramy',
  focus: ['shoulders', 'traps', 'rear-delts'],
  description: 'Wednesday delts from the same Alaqi/M&F competitive split.',
  source: ramySrc,
  labels: ['Full program', 'Coach-attributed (Alaqi / M&F)'],
  exercises: [
    slot('dumbbell-lateral-raise', 4, '10-15'),
    slot('rear-delt-fly-machine', 4, '10-15'),
    slot('smith-machine-shoulder-press', 4, '10-15'),
    slot('face-pull', 4, '10-15', 'Cable reverse fly mapped to face pull.'),
    slot('machine-shoulder-press', 4, '10-15'),
    slot('machine-shrug', 4, '10-15'),
  ],
});

addRoutine({
  id: 'big-ramy-back',
  name: 'Big Ramy — Back',
  day: 'Thursday',
  styleId: 'big-ramy',
  focus: ['back', 'lats'],
  description:
    'Thursday back from the M&F/Flex feature that publishes his progressive 15→6 row/pulldown template with Alaqi.',
  source: ramySrc,
  labels: ['Full program', 'Coach-attributed (Alaqi / M&F)'],
  exercises: [
    slot('iso-lateral-row', 4, '15-6', 'Machine row; weekly progressive reps 15→6.'),
    slot('one-arm-dumbbell-row', 4, '15-6'),
    slot('lat-pulldown', 4, '15-6', 'Front pulldown.'),
    slot('reverse-grip-lat-pulldown', 4, '15-6', 'Rear / reverse-grip pulldown.'),
    slot('seated-cable-row', 4, '15-6'),
  ],
});

addRoutine({
  id: 'big-ramy-arms',
  name: 'Big Ramy — Arms',
  day: 'Friday',
  styleId: 'big-ramy',
  focus: ['biceps', 'triceps'],
  description:
    'Friday arms consistent with the Alaqi/M&F split and his Instagram/M&F-named favorites (preacher, hammer, pushdowns, skull crushers).',
  source: ramySrc,
  labels: ['Full program', 'Coach-attributed (Alaqi / M&F)'],
  exercises: [
    slot('barbell-curl', 4, '10-15'),
    slot('lying-triceps-extension', 4, '10-15', 'Skull crushers.'),
    slot('ez-bar-curl', 4, '10-15'),
    slot('triceps-pushdown', 4, '10-15'),
    slot('alternating-dumbbell-curl', 4, '10-15'),
    slot('overhead-triceps-extension-cable', 4, '10-15', 'Rope pushdown / overhead.'),
    slot('hammer-curl', 4, '10-15'),
    slot('machine-preacher-curl', 3, '10-15', 'Named favorite in M&F interview.'),
  ],
});

patchRoutine('big-ramy-quads', {
  day: 'Tuesday',
  labels: ['Full program', 'M&F / Flex legs feature'],
  name: 'Big Ramy — Legs (Quads)',
});
setSplit('big-ramy', [
  { day: 'Monday', focus: 'Chest' },
  { day: 'Tuesday', focus: 'Legs' },
  { day: 'Wednesday', focus: 'Shoulders' },
  { day: 'Thursday', focus: 'Back' },
  { day: 'Friday', focus: 'Arms' },
  { day: 'Weekend', focus: 'Rest' },
]);
ensureSource('big-ramy', ramySrc.name, ramySrc.url);
patchStyle('big-ramy', {
  guidelines: {
    ...(styles.find((s) => s.id === 'big-ramy')?.guidelines || {}),
    trainingDaysPerWeek:
      '5 (Mon–Fri bodypart split published with coach Ahmad Alaqi in Muscle & Fitness/Flex)',
    frequencyPerMuscle: 'Once per week in the Alaqi competitive split',
    workingSetProtocol:
      'Typically 3–4 working sets; progressive weekly reps 15→12→10→8→6 then restart (Alaqi)',
    repRanges: [
      { target: 'Most lifts', range: '15 down to 6 across a 5-week cycle' },
      { target: 'Machine preference', range: 'As quoted — machines for control without a spotter' },
    ],
  },
});

// ============================================================================
// HADI CHOOPAN — FST-7 under Hany Rambod (same system as heath-fst7)
// Keep documented legs sample; add FST-7 week labeled as coach-system template.
// ============================================================================
const hadiSrc = {
  name: 'FST-7 system (Hany Rambod) — Hadi trains under Rambod; week mirrors the coach\'s classic Flex 2011 / Heath template',
  url: 'https://www.hanyrambod.com/',
};

addRoutine({
  id: 'hadi-choopan-chest-triceps',
  name: 'Hadi Choopan — FST-7 Chest & Triceps',
  day: 'Push',
  styleId: 'hadi-choopan',
  focus: ['chest', 'triceps'],
  description:
    'FST-7 chest & triceps day under Hany Rambod. No primary Hadi-only full-week table was published; this mirrors the coach\'s FST-7 template used with Olympia champions (same structure as this roster\'s heath-fst7 entry), with Hadi\'s documented preference for heavy compounds in the 8–12 range. Honest coach-system reconstruction.',
  source: hadiSrc,
  labels: ['Full program', 'FST-7 coach-system reconstruction'],
  exercises: [
    slot('incline-barbell-press', 4, '8-12'),
    slot('incline-machine-press', 4, '8-12'),
    slot('incline-dumbbell-flye', 4, '10-12'),
    slot('cable-crossover', 7, '8-12', 'FST-7 finisher — 30–45s rest.'),
    slot('triceps-pushdown', 4, '8-12'),
    slot('lying-triceps-extension', 4, '8-12'),
  ],
});

addRoutine({
  id: 'hadi-choopan-back-biceps',
  name: 'Hadi Choopan — FST-7 Back & Biceps',
  day: 'Pull',
  styleId: 'hadi-choopan',
  focus: ['back', 'lats', 'biceps'],
  description:
    'FST-7 back & biceps. Evogen/Rambod filmed Hadi on FST-7 back (pulldowns, machine rows, pullovers, cable rows); set structure follows the coach system.',
  source: {
    name: 'Hadi Choopan FST-7 Back In The USA — Evogen / Hany Rambod',
    url: 'https://www.evogennutrition.com/blogs/news/hadi-choopan-fst-7-back-in-the-usa',
  },
  labels: ['Full program', 'FST-7 coach-system + filmed back'],
  exercises: [
    slot('lat-pulldown', 6, '12-15', 'Various grips — filmed with Rambod.'),
    slot('iso-lateral-row', 4, '8-12', 'Machine low row.'),
    slot('machine-pullover', 4, '12-15'),
    slot('seated-cable-row', 4, '8-12'),
    slot('cable-biceps-curl', 7, '8-12', 'FST-7 finisher.'),
  ],
});

addRoutine({
  id: 'hadi-choopan-shoulders',
  name: 'Hadi Choopan — FST-7 Shoulders',
  day: 'Shoulders',
  styleId: 'hadi-choopan',
  focus: ['shoulders', 'traps', 'rear-delts'],
  description: 'FST-7 shoulders & traps day from the Rambod coach-system template (same lineage as Phil Heath\'s FST-7 entry).',
  source: hadiSrc,
  labels: ['Full program', 'FST-7 coach-system reconstruction'],
  exercises: [
    slot('smith-machine-shoulder-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 4, '10-12'),
    slot('dumbbell-shrug', 4, '10-12'),
    slot('rear-delt-fly-machine', 7, '8-12', 'FST-7 finisher.'),
    slot('face-pull', 4, '12-15'),
  ],
});

patchRoutine('hadi-choopan-legs-fst7', {
  labels: ['Full program', 'BarBend / FST-7 legs sample'],
  name: 'Hadi Choopan — FST-7 Legs',
  day: 'Legs',
});
setSplit('hadi-choopan', [
  { day: 'Push', focus: 'Chest & triceps (FST-7)' },
  { day: 'Pull', focus: 'Back & biceps (FST-7)' },
  { day: 'Legs', focus: 'Quads / hams / calves (FST-7)' },
  { day: 'Shoulders', focus: 'Shoulders & traps (FST-7)' },
  { day: 'Rest', focus: 'Recovery between FST-7 large-muscle hits' },
]);

// ============================================================================
// KAI GREENE — widely circulated 5-day split (Tier C aggregators) — label honestly
// ============================================================================
const kaiSrc = {
  name: 'Kai Greene workouts — Fitness Volt / Lift Vault (cross-corroborated secondary 5-day split; no official program PDF)',
  url: 'https://fitnessvolt.com/kai-greene-workouts/',
};

addRoutine({
  id: 'kai-greene-chest-calves',
  name: 'Kai Greene — Chest & Calves',
  day: 'Day 1',
  styleId: 'kai-greene',
  focus: ['chest', 'calves'],
  description:
    'Day 1 of the commonly attributed Kai Greene 5-day split (chest/calves, shoulders/forearms, back, legs, arms). Kai has no official branded program with a verified sets/reps table — this is a cross-corroborated secondary reconstruction; his own content emphasizes mind-muscle connection over a fixed calendar.',
  source: kaiSrc,
  labels: ['Full program', 'Secondary reconstruction — no official PDF'],
  exercises: [
    slot('barbell-bench-press', 3, '20-12', 'Pyramid 20/15/12.'),
    slot('dumbbell-flye', 3, '20-12'),
    slot('decline-bench-press', 3, '20-12'),
    slot('dumbbell-pullover', 3, '20-12'),
    slot('seated-calf-raise', 4, '10-15'),
    slot('standing-calf-raise', 4, '10-15'),
    slot('donkey-calf-raise', 4, '10-15'),
  ],
});

addRoutine({
  id: 'kai-greene-shoulders',
  name: 'Kai Greene — Shoulders & Forearms',
  day: 'Day 2',
  styleId: 'kai-greene',
  focus: ['shoulders', 'forearms', 'traps'],
  description: 'Day 2 of the same cross-corroborated secondary 5-day split.',
  source: kaiSrc,
  labels: ['Full program', 'Secondary reconstruction — no official PDF'],
  exercises: [
    slot('dumbbell-shoulder-press', 3, '12-15', 'Arnold / DB press.'),
    slot('military-press', 3, '12-15', 'Behind-neck press mapped to military.'),
    slot('dumbbell-lateral-raise', 3, '12-15'),
    slot('front-raise', 3, '12-15'),
    slot('dumbbell-shrug', 3, '12-15'),
    slot('hammer-curl', 4, '10-12', 'Forearm / brachialis work listed on this day.'),
    slot('barbell-curl', 4, '8-12', 'Reverse curls mapped to barbell curl (underhand note in source varies).'),
  ],
});

addRoutine({
  id: 'kai-greene-back',
  name: 'Kai Greene — Back',
  day: 'Day 3',
  styleId: 'kai-greene',
  focus: ['back', 'lats'],
  description: 'Day 3 back from the same secondary 5-day split.',
  source: kaiSrc,
  labels: ['Full program', 'Secondary reconstruction — no official PDF'],
  exercises: [
    slot('dumbbell-pullover', 3, '10-15', 'Barbell/DB pullover.'),
    slot('lat-pulldown', 3, '10-15'),
    slot('barbell-row', 3, '10-15'),
    slot('seated-cable-row', 3, '10-15'),
  ],
});

addRoutine({
  id: 'kai-greene-arms',
  name: 'Kai Greene — Arms',
  day: 'Day 5',
  styleId: 'kai-greene',
  focus: ['biceps', 'triceps', 'forearms'],
  description: 'Day 5 arms from the same secondary 5-day split.',
  source: kaiSrc,
  labels: ['Full program', 'Secondary reconstruction — no official PDF'],
  exercises: [
    slot('hammer-curl', 4, '10-12'),
    slot('preacher-curl-barbell', 4, '10-15'),
    slot('barbell-curl', 4, '10-15'),
    slot('triceps-kickback', 3, '15-20'),
    slot('one-arm-dumbbell-triceps-extension', 3, '15-20'),
    slot('triceps-pushdown', 3, '15-20'),
  ],
});

patchRoutine('kai-greene-quads', {
  name: 'Kai Greene — Legs',
  day: 'Day 4',
  focus: ['quads', 'hamstrings', 'calves'],
  labels: ['Full program', 'Secondary reconstruction — no official PDF'],
  description:
    'Day 4 legs from the commonly attributed Kai Greene 5-day split (secondary sources). Expanded beyond the prior quads-only sample to include hams/calves as those tables list.',
  exercises: [
    slot('barbell-squat', 3, '10-12'),
    slot('lying-leg-curl', 3, '10-12'),
    slot('deadlift', 3, '10-12'),
    slot('walking-lunge', 4, '10-15'),
    slot('seated-calf-raise', 4, '10-15'),
    slot('standing-calf-raise', 4, '10-15'),
  ],
  source: kaiSrc,
});
setSplit('kai-greene', [
  { day: 'Day 1', focus: 'Chest & calves' },
  { day: 'Day 2', focus: 'Shoulders & forearms' },
  { day: 'Day 3', focus: 'Back' },
  { day: 'Day 4', focus: 'Legs' },
  { day: 'Day 5', focus: 'Arms' },
  { day: 'Note', focus: 'No official program PDF — secondary reconstruction of a commonly attributed split' },
]);

// ============================================================================
// IRIS KYLE — expand beyond documented back day
// ============================================================================
const irisSrc = {
  name: "Ms. Olympia's Back — Muscle & Fitness / Flex (2009) + RX Muscle interviews on frequency",
  url: 'https://www.muscleandfitness.com/',
};

addRoutine({
  id: 'iris-kyle-chest-shoulders',
  name: 'Iris Kyle — Chest & Shoulders',
  day: 'Day 2',
  styleId: 'iris-kyle',
  focus: ['chest', 'shoulders'],
  description:
    'Only Iris\'s back day was published with matching sets/reps in Flex/M&F 2009. Remaining days are reconstructed to her self-reported off-season 4–5 day frequency and competitive volume style (4×10–12). Labeled honestly — not a Flex reprint.',
  source: irisSrc,
  labels: ['Full program', 'Reconstruction beyond attested back day'],
  exercises: [
    slot('incline-dumbbell-press', 4, '10-12'),
    slot('dumbbell-bench-press', 4, '10-12'),
    slot('dumbbell-flye', 3, '10-12'),
    slot('dumbbell-shoulder-press', 4, '10-12'),
    slot('dumbbell-lateral-raise', 4, '10-12'),
    slot('bent-over-lateral-raise', 3, '10-12'),
  ],
});

addRoutine({
  id: 'iris-kyle-legs',
  name: 'Iris Kyle — Legs',
  day: 'Day 3',
  styleId: 'iris-kyle',
  focus: ['quads', 'hamstrings', 'glutes', 'calves'],
  description: 'Legs day reconstructed to her attested frequency/volume pattern (see Day 2 note).',
  source: irisSrc,
  labels: ['Full program', 'Reconstruction beyond attested back day'],
  exercises: [
    slot('leg-extension', 4, '10-12'),
    slot('barbell-squat', 4, '8-12'),
    slot('leg-press', 4, '10-15'),
    slot('walking-lunge', 3, '10-12'),
    slot('lying-leg-curl', 4, '10-12'),
    slot('standing-calf-raise', 4, '12-15'),
  ],
});

addRoutine({
  id: 'iris-kyle-arms',
  name: 'Iris Kyle — Arms',
  day: 'Day 4',
  styleId: 'iris-kyle',
  focus: ['biceps', 'triceps'],
  description: 'Arms day reconstructed to her attested frequency/volume pattern.',
  source: irisSrc,
  labels: ['Full program', 'Reconstruction beyond attested back day'],
  exercises: [
    slot('barbell-curl', 4, '10-12'),
    slot('incline-dumbbell-curl', 3, '10-12'),
    slot('preacher-curl-barbell', 3, '10-12'),
    slot('triceps-pushdown', 4, '10-12'),
    slot('lying-triceps-extension', 3, '10-12'),
    slot('overhead-triceps-extension-cable', 3, '10-12'),
  ],
});

patchRoutine('iris-kyle-back', { day: 'Day 1', labels: ['Full program', 'Flex/M&F primary'] });
setSplit('iris-kyle', [
  { day: 'Day 1', focus: 'Back (Flex/M&F 2009 — primary)' },
  { day: 'Day 2', focus: 'Chest & shoulders (reconstruction)' },
  { day: 'Day 3', focus: 'Legs (reconstruction)' },
  { day: 'Day 4', focus: 'Arms (reconstruction)' },
  { day: 'Off', focus: '1–2 off days per her own off-season interviews' },
]);

// ============================================================================
// FLEX WHEELER — double-split 4-on/1-off; only legs fully quoted — reconstruct rest
// ============================================================================
const flexSrc = {
  name: '"Flex Wheeler Speaks!" — MuscleMag International, Nov 1997 (legs detail) + double-split structure',
  url: 'https://www.t-nation.com/',
};

addRoutine({
  id: 'flex-wheeler-chest-tris',
  name: 'Wheeler - Chest & Triceps',
  day: 'Day 1',
  styleId: 'flex-wheeler',
  focus: ['chest', 'triceps'],
  description:
    'Only Flex\'s leg day (all sets of 20) is tightly quoted from MuscleMag 1997. He stated a double-split 4-on/1-off. Remaining days are reconstructions consistent with that structure and his aesthetic, controlled style — not magazine reprints.',
  source: flexSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('incline-barbell-press', 4, '8-12'),
    slot('dumbbell-bench-press', 3, '8-12'),
    slot('incline-dumbbell-flye', 3, '10-15'),
    slot('cable-crossover', 3, '12-15'),
    slot('triceps-pushdown', 4, '10-15'),
    slot('lying-triceps-extension', 3, '10-12'),
  ],
});

addRoutine({
  id: 'flex-wheeler-back-bis',
  name: 'Wheeler - Back & Biceps',
  day: 'Day 2',
  styleId: 'flex-wheeler',
  focus: ['back', 'lats', 'biceps'],
  description: 'Back & biceps reconstruction for his attested 4-on/1-off double-split.',
  source: flexSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('lat-pulldown', 4, '8-12'),
    slot('barbell-row', 4, '8-12'),
    slot('seated-cable-row', 3, '10-12'),
    slot('one-arm-dumbbell-row', 3, '8-12'),
    slot('ez-bar-curl', 3, '8-12'),
    slot('incline-dumbbell-curl', 3, '10-12'),
  ],
});

addRoutine({
  id: 'flex-wheeler-shoulders',
  name: 'Wheeler - Shoulders',
  day: 'Day 3',
  styleId: 'flex-wheeler',
  focus: ['shoulders', 'rear-delts', 'traps'],
  description: 'Shoulders reconstruction for his attested 4-on/1-off double-split.',
  source: flexSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('military-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 4, '10-15'),
    slot('bent-over-lateral-raise', 3, '10-15'),
    slot('front-raise', 3, '10-12'),
    slot('dumbbell-shrug', 3, '10-12'),
  ],
});

patchRoutine('flex-wheeler-legs', {
  day: 'Day 4',
  labels: ['Full program', 'MuscleMag 1997 primary'],
});
setSplit('flex-wheeler', [
  { day: 'Day 1', focus: 'Chest & triceps (reconstruction)' },
  { day: 'Day 2', focus: 'Back & biceps (reconstruction)' },
  { day: 'Day 3', focus: 'Shoulders (reconstruction)' },
  { day: 'Day 4', focus: 'Legs — all 20s (MuscleMag 1997 primary)' },
  { day: 'Day 5', focus: 'Off (4-on/1-off double-split)' },
]);

// ============================================================================
// LARRY SCOTT — arms primary (Loaded Guns); reconstruct torso/legs around arm specialization
// ============================================================================
const scottSrc = {
  name: 'Loaded Guns — Larry Scott & John Little (arms primary) + era full-program reconstruction',
  url: 'https://www.davedraper.com/',
};

addRoutine({
  id: 'larry-scott-chest-shoulders',
  name: 'Scott - Chest & Shoulders',
  day: 'Day 1',
  styleId: 'larry-scott',
  focus: ['chest', 'shoulders'],
  description:
    'Larry Scott\'s Tier A material (Loaded Guns) documents arms in depth, not a full weekly calendar. This day is a reconstruction of torso training around his arm specialization era — labeled honestly.',
  source: scottSrc,
  labels: ['Full program', 'Reconstruction beyond Loaded Guns arms'],
  exercises: [
    slot('incline-dumbbell-press', 4, '8-12'),
    slot('barbell-bench-press', 3, '8-10'),
    slot('dumbbell-flye', 3, '10-12'),
    slot('military-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 3, '10-15'),
  ],
});

addRoutine({
  id: 'larry-scott-back-legs',
  name: 'Scott - Back & Legs',
  day: 'Day 2',
  styleId: 'larry-scott',
  focus: ['back', 'lats', 'quads', 'hamstrings', 'calves'],
  description: 'Back & legs reconstruction around his attested arm-specialization program.',
  source: scottSrc,
  labels: ['Full program', 'Reconstruction beyond Loaded Guns arms'],
  exercises: [
    slot('lat-pulldown', 4, '8-12'),
    slot('barbell-row', 4, '8-10'),
    slot('seated-cable-row', 3, '10-12'),
    slot('barbell-squat', 4, '8-12'),
    slot('leg-extension', 3, '10-15'),
    slot('lying-leg-curl', 3, '10-12'),
    slot('standing-calf-raise', 4, '12-15'),
  ],
});

patchRoutine('larry-scott-arms', {
  day: 'Day 3',
  labels: ['Full program', 'Loaded Guns primary'],
});
setSplit('larry-scott', [
  { day: 'Day 1', focus: 'Chest & shoulders (reconstruction)' },
  { day: 'Day 2', focus: 'Back & legs (reconstruction)' },
  { day: 'Day 3', focus: 'Arms — Loaded Guns primary (preacher trisets)' },
  { day: 'Note', focus: 'Only arms have Tier A book detail; torso/legs are reconstructions' },
]);

// ============================================================================
// LOU FERRIGNO — competitive-era reconstruction + keep current maintenance
// ============================================================================
const louSrc = {
  name: 'Competitive-era Lou Ferrigno reconstructions (secondary) + Men\'s Health current maintenance',
  url: 'https://www.menshealth.com/',
};

addRoutine({
  id: 'lou-ferrigno-chest-back',
  name: 'Lou Ferrigno — Competitive Chest & Back',
  day: 'Day 1',
  styleId: 'lou-ferrigno',
  focus: ['chest', 'back', 'lats'],
  description:
    'No equally well-sourced Tier A/B table for Lou\'s 1970s competitive week was found. This is a high-volume Golden Era reconstruction consistent with his Universe-era reputation; the Men\'s Health maintenance session remains the best primary for his current training.',
  source: louSrc,
  labels: ['Full program', 'Competitive-era reconstruction'],
  exercises: [
    slot('barbell-bench-press', 5, '6-10'),
    slot('incline-dumbbell-press', 4, '8-12'),
    slot('dumbbell-flye', 3, '10-12'),
    slot('weighted-triceps-dip', 3, '8-12'),
    slot('pull-up', 4, 'AMRAP'),
    slot('barbell-row', 4, '6-10'),
    slot('lat-pulldown', 3, '8-12'),
  ],
});

addRoutine({
  id: 'lou-ferrigno-shoulders-arms',
  name: 'Lou Ferrigno — Competitive Shoulders & Arms',
  day: 'Day 2',
  styleId: 'lou-ferrigno',
  focus: ['shoulders', 'biceps', 'triceps'],
  description: 'Competitive-era shoulders & arms reconstruction (see Day 1 caveat).',
  source: louSrc,
  labels: ['Full program', 'Competitive-era reconstruction'],
  exercises: [
    slot('military-press', 5, '6-10'),
    slot('dumbbell-lateral-raise', 4, '10-15'),
    slot('upright-row', 3, '8-12'),
    slot('barbell-curl', 4, '8-12'),
    slot('incline-dumbbell-curl', 3, '8-12'),
    slot('lying-triceps-extension', 4, '8-12'),
    slot('triceps-pushdown', 3, '10-12'),
  ],
});

addRoutine({
  id: 'lou-ferrigno-legs',
  name: 'Lou Ferrigno — Competitive Legs',
  day: 'Day 3',
  styleId: 'lou-ferrigno',
  focus: ['quads', 'hamstrings', 'calves'],
  description: 'Competitive-era legs reconstruction (see Day 1 caveat).',
  source: louSrc,
  labels: ['Full program', 'Competitive-era reconstruction'],
  exercises: [
    slot('barbell-squat', 5, '8-12'),
    slot('leg-press', 4, '10-15'),
    slot('leg-extension', 3, '12-15'),
    slot('lying-leg-curl', 4, '10-12'),
    slot('standing-calf-raise', 5, '12-20'),
  ],
});

patchRoutine('lou-ferrigno-maintenance', {
  labels: ['Current maintenance (Men\'s Health primary)', 'Not competitive-era'],
  day: 'Current',
});
setSplit('lou-ferrigno', [
  { day: 'Competitive Day 1', focus: 'Chest & back (reconstruction)' },
  { day: 'Competitive Day 2', focus: 'Shoulders & arms (reconstruction)' },
  { day: 'Competitive Day 3', focus: 'Legs (reconstruction)' },
  { day: 'Current', focus: 'Men\'s Health maintenance session (primary for age 69–74)' },
]);

// ============================================================================
// MARKUS RUHL — 6-day bodypart; only traps primary — reconstruct week
// ============================================================================
const ruhlSrc = {
  name: 'Markus Rühl competitive-era 6-day bodypart split (traps session primary; remaining days reconstructed)',
  url: 'https://www.muscleandfitness.com/',
};

addRoutine({
  id: 'markus-ruhl-chest',
  name: 'Markus Rühl — Chest',
  day: 'Day 1',
  styleId: 'markus-ruhl',
  focus: ['chest'],
  description:
    'Rühl stated a 6-day one-bodypart split (Sunday off). Only a traps session was tightly documented in primary material reviewed. Remaining days are heavy-volume reconstructions matching his mass-monster reputation — labeled honestly.',
  source: ruhlSrc,
  labels: ['Full program', 'Reconstruction beyond attested traps'],
  exercises: [
    slot('incline-barbell-press', 4, '8-12'),
    slot('barbell-bench-press', 4, '6-10'),
    slot('dumbbell-bench-press', 3, '8-12'),
    slot('cable-crossover', 3, '12-15'),
  ],
});

addRoutine({
  id: 'markus-ruhl-back',
  name: 'Markus Rühl — Back',
  day: 'Day 2',
  styleId: 'markus-ruhl',
  focus: ['back', 'lats'],
  description: 'Back day reconstruction for his attested 6-day bodypart split.',
  source: ruhlSrc,
  labels: ['Full program', 'Reconstruction beyond attested traps'],
  exercises: [
    slot('deadlift', 4, '5-8'),
    slot('barbell-row', 4, '6-10'),
    slot('lat-pulldown', 4, '8-12'),
    slot('seated-cable-row', 3, '10-12'),
    slot('one-arm-dumbbell-row', 3, '8-12'),
  ],
});

addRoutine({
  id: 'markus-ruhl-shoulders',
  name: 'Markus Rühl — Shoulders',
  day: 'Day 3',
  styleId: 'markus-ruhl',
  focus: ['shoulders'],
  description: 'Shoulders reconstruction for his attested 6-day bodypart split.',
  source: ruhlSrc,
  labels: ['Full program', 'Reconstruction beyond attested traps'],
  exercises: [
    slot('military-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 4, '10-15'),
    slot('front-raise', 3, '10-12'),
    slot('bent-over-lateral-raise', 3, '10-15'),
  ],
});

addRoutine({
  id: 'markus-ruhl-arms',
  name: 'Markus Rühl — Arms',
  day: 'Day 4',
  styleId: 'markus-ruhl',
  focus: ['biceps', 'triceps'],
  description: 'Arms reconstruction for his attested 6-day bodypart split.',
  source: ruhlSrc,
  labels: ['Full program', 'Reconstruction beyond attested traps'],
  exercises: [
    slot('barbell-curl', 4, '8-12'),
    slot('hammer-curl', 3, '10-12'),
    slot('preacher-curl-barbell', 3, '8-12'),
    slot('close-grip-bench-press', 4, '6-10'),
    slot('triceps-pushdown', 3, '10-12'),
    slot('lying-triceps-extension', 3, '8-12'),
  ],
});

addRoutine({
  id: 'markus-ruhl-legs',
  name: 'Markus Rühl — Legs',
  day: 'Day 5',
  styleId: 'markus-ruhl',
  focus: ['quads', 'hamstrings', 'calves'],
  description: 'Legs reconstruction for his attested 6-day bodypart split.',
  source: ruhlSrc,
  labels: ['Full program', 'Reconstruction beyond attested traps'],
  exercises: [
    slot('barbell-squat', 5, '8-12'),
    slot('leg-press', 4, '10-15'),
    slot('hack-squat', 3, '10-12'),
    slot('lying-leg-curl', 4, '10-12'),
    slot('standing-calf-raise', 5, '12-20'),
  ],
});

patchRoutine('markus-ruhl-traps', {
  day: 'Day 6',
  labels: ['Full program', 'Attested traps specialty'],
});
setSplit('markus-ruhl', [
  { day: 'Day 1', focus: 'Chest (reconstruction)' },
  { day: 'Day 2', focus: 'Back (reconstruction)' },
  { day: 'Day 3', focus: 'Shoulders (reconstruction)' },
  { day: 'Day 4', focus: 'Arms (reconstruction)' },
  { day: 'Day 5', focus: 'Legs (reconstruction)' },
  { day: 'Day 6', focus: 'Traps (attested specialty session)' },
  { day: 'Sunday', focus: 'Off' },
]);

// ============================================================================
// RICH PIANA — he rejected fixed splits; provide sample strength-base week + keep feeder
// ============================================================================
const pianaSrc = {
  name: "Rich Piana's Workout Tips & Tricks — 5% Nutrition (official) — variety over fixed splits",
  url: 'https://5percentnutrition.com/blogs/motivation/rich-piana-s-workout-tips-tricks',
};

addRoutine({
  id: 'rich-piana-chest',
  name: 'Rich Piana — Sample Chest (Strength-Base → Pump)',
  day: 'Sample Day 1',
  styleId: 'rich-piana',
  focus: ['chest'],
  description:
    'Rich deliberately rejected a fixed weekly calendar ("variety was his form of progression"). This sample chest day illustrates his brand-documented pattern: lighter high-rep opener pyramiding toward heavier work, then pump. Not a claim that he repeated this exact day weekly.',
  source: pianaSrc,
  labels: ['Full program', 'Sample week — he rejected fixed splits'],
  exercises: [
    slot('incline-dumbbell-press', 4, '20-8', 'Pyramid light→heavy per brand materials.'),
    slot('barbell-bench-press', 4, '12-8'),
    slot('dumbbell-flye', 3, '12-15'),
    slot('cable-crossover', 3, '15-20'),
  ],
});

addRoutine({
  id: 'rich-piana-back',
  name: 'Rich Piana — Sample Back',
  day: 'Sample Day 2',
  styleId: 'rich-piana',
  focus: ['back', 'lats'],
  description: 'Sample back day illustrating his variety/pump philosophy (see chest note).',
  source: pianaSrc,
  labels: ['Full program', 'Sample week — he rejected fixed splits'],
  exercises: [
    slot('lat-pulldown', 4, '12-15'),
    slot('barbell-row', 4, '8-12'),
    slot('seated-cable-row', 3, '12-15'),
    slot('one-arm-dumbbell-row', 3, '10-12'),
  ],
});

addRoutine({
  id: 'rich-piana-shoulders',
  name: 'Rich Piana — Sample Shoulders',
  day: 'Sample Day 3',
  styleId: 'rich-piana',
  focus: ['shoulders'],
  description: 'Sample shoulders day illustrating his variety/pump philosophy.',
  source: pianaSrc,
  labels: ['Full program', 'Sample week — he rejected fixed splits'],
  exercises: [
    slot('dumbbell-shoulder-press', 4, '10-12'),
    slot('dumbbell-lateral-raise', 4, '12-20'),
    slot('bent-over-lateral-raise', 3, '12-15'),
    slot('front-raise', 3, '12-15'),
  ],
});

addRoutine({
  id: 'rich-piana-legs',
  name: 'Rich Piana — Sample Legs',
  day: 'Sample Day 4',
  styleId: 'rich-piana',
  focus: ['quads', 'hamstrings', 'calves'],
  description: 'Sample legs day illustrating his variety/pump philosophy.',
  source: pianaSrc,
  labels: ['Full program', 'Sample week — he rejected fixed splits'],
  exercises: [
    slot('leg-extension', 3, '15-20'),
    slot('barbell-squat', 4, '10-15'),
    slot('leg-press', 3, '12-20'),
    slot('lying-leg-curl', 4, '12-15'),
    slot('standing-calf-raise', 4, '15-25'),
  ],
});

patchRoutine('rich-piana-feeder-arms', {
  labels: ['Feeder protocol (5% Nutrition primary)', 'Not a full weekly split by itself'],
  day: 'Feeder',
});
setSplit('rich-piana', [
  { day: 'Sample Day 1', focus: 'Chest (illustrative — no fixed calendar)' },
  { day: 'Sample Day 2', focus: 'Back (illustrative)' },
  { day: 'Sample Day 3', focus: 'Shoulders (illustrative)' },
  { day: 'Sample Day 4', focus: 'Legs (illustrative)' },
  { day: 'Feeder', focus: 'High-rep feeder sessions (official 5% Nutrition protocol)' },
  { day: 'Note', focus: 'He rejected fixed weekly splits — sample week shows principles only' },
]);

// ============================================================================
// SHAWN RAY — expand beyond legs
// ============================================================================
const raySrc = {
  name: "Ray's Legs — Muscle & Fitness + competitive-era upper reconstruction",
  url: 'https://www.muscleandfitness.com/',
};

addRoutine({
  id: 'shawn-ray-chest-tris',
  name: 'Shawn Ray — Chest & Triceps',
  day: 'Day 1',
  styleId: 'shawn-ray',
  focus: ['chest', 'triceps'],
  description:
    'Only a detailed legs session (M&F) and sequencing preferences for chest were tightly documented. Remaining days are competitive-era reconstructions matching his high-quality, detail-oriented style — labeled honestly.',
  source: raySrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('incline-barbell-press', 4, '8-12'),
    slot('dumbbell-bench-press', 3, '8-12'),
    slot('incline-dumbbell-flye', 3, '10-12'),
    slot('cable-crossover', 3, '12-15'),
    slot('triceps-pushdown', 4, '10-12'),
    slot('lying-triceps-extension', 3, '8-12'),
  ],
});

addRoutine({
  id: 'shawn-ray-back-bis',
  name: 'Shawn Ray — Back & Biceps',
  day: 'Day 2',
  styleId: 'shawn-ray',
  focus: ['back', 'lats', 'biceps'],
  description: 'Back & biceps reconstruction (see chest note).',
  source: raySrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('lat-pulldown', 4, '8-12'),
    slot('barbell-row', 4, '6-10'),
    slot('seated-cable-row', 3, '10-12'),
    slot('one-arm-dumbbell-row', 3, '8-12'),
    slot('barbell-curl', 3, '8-12'),
    slot('incline-dumbbell-curl', 3, '10-12'),
  ],
});

addRoutine({
  id: 'shawn-ray-shoulders',
  name: 'Shawn Ray — Shoulders',
  day: 'Day 3',
  styleId: 'shawn-ray',
  focus: ['shoulders', 'traps'],
  description: 'Shoulders reconstruction (see chest note).',
  source: raySrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('military-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 4, '10-15'),
    slot('bent-over-lateral-raise', 3, '10-15'),
    slot('front-raise', 3, '10-12'),
    slot('dumbbell-shrug', 3, '10-12'),
  ],
});

patchRoutine('shawn-ray-legs', { day: 'Day 4', labels: ['Full program', 'M&F primary'] });
setSplit('shawn-ray', [
  { day: 'Day 1', focus: 'Chest & triceps (reconstruction)' },
  { day: 'Day 2', focus: 'Back & biceps (reconstruction)' },
  { day: 'Day 3', focus: 'Shoulders (reconstruction)' },
  { day: 'Day 4', focus: 'Legs (M&F primary)' },
  { day: 'Note', focus: 'No true rest days by his stated philosophy — fatigued days become cardio/variation' },
]);

// ============================================================================
// SHAWN RHODEN — expand beyond 2018 Olympia legs
// ============================================================================
const rhodenSrc = {
  name: "Shawn 'Flexatron' Rhoden's Heavy Olympia Prep Leg Workout — Muscle & Strength + upper reconstruction",
  url: 'https://www.muscleandstrength.com/',
};

addRoutine({
  id: 'shawn-rhoden-chest-tris',
  name: 'Shawn Rhoden — Chest & Triceps',
  day: 'Day 1',
  styleId: 'shawn-rhoden',
  focus: ['chest', 'triceps'],
  description:
    '2018 Olympia-prep legs are the best-filmed primary. Remaining days are reconstructions consistent with his Flexatron-era training — labeled honestly.',
  source: rhodenSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('incline-dumbbell-press', 4, '8-12'),
    slot('barbell-bench-press', 3, '6-10'),
    slot('pec-deck', 3, '10-15'),
    slot('cable-crossover', 3, '12-15'),
    slot('triceps-pushdown', 4, '10-12'),
    slot('overhead-triceps-extension-cable', 3, '10-12'),
  ],
});

addRoutine({
  id: 'shawn-rhoden-back-bis',
  name: 'Shawn Rhoden — Back & Biceps',
  day: 'Day 2',
  styleId: 'shawn-rhoden',
  focus: ['back', 'lats', 'biceps'],
  description: 'Back & biceps reconstruction (see chest note).',
  source: rhodenSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('lat-pulldown', 4, '8-12'),
    slot('barbell-row', 4, '6-10'),
    slot('seated-cable-row', 3, '10-12'),
    slot('pull-up', 3, 'AMRAP'),
    slot('ez-bar-curl', 3, '8-12'),
    slot('hammer-curl', 3, '10-12'),
  ],
});

addRoutine({
  id: 'shawn-rhoden-shoulders',
  name: 'Shawn Rhoden — Shoulders',
  day: 'Day 3',
  styleId: 'shawn-rhoden',
  focus: ['shoulders', 'rear-delts'],
  description: 'Shoulders reconstruction (see chest note).',
  source: rhodenSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('dumbbell-shoulder-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 4, '10-15'),
    slot('rear-delt-fly-machine', 3, '12-15'),
    slot('front-raise', 3, '10-12'),
  ],
});

patchRoutine('shawn-rhoden-legs-2018', {
  day: 'Day 4',
  labels: ['Full program', '2018 Olympia prep primary'],
});
setSplit('shawn-rhoden', [
  { day: 'Day 1', focus: 'Chest & triceps (reconstruction)' },
  { day: 'Day 2', focus: 'Back & biceps (reconstruction)' },
  { day: 'Day 3', focus: 'Shoulders (reconstruction)' },
  { day: 'Day 4', focus: 'Legs — 2018 Olympia prep (primary)' },
]);

// ============================================================================
// TOM PLATZ — legendary legs primary; reconstruct upper week honestly
// ============================================================================
const platzSrc = {
  name: 'Tom Platz — Shadow Talk / Instagram philosophy + upper-day reconstruction (no official full-week table)',
  url: 'https://www.youtube.com/',
};

addRoutine({
  id: 'tom-platz-chest-tris',
  name: 'Tom Platz — Chest & Triceps (Reconstruction)',
  day: 'Day 1',
  styleId: 'tom-platz',
  focus: ['chest', 'triceps'],
  description:
    'No official DVD/book publishes Platz\'s full weekly split — only legs are legendary and heavily attested. Upper days are reconstructions consistent with his high-rep, high-effort philosophy (reps over ego load). Labeled honestly.',
  source: platzSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('barbell-bench-press', 5, '8-15'),
    slot('incline-dumbbell-press', 4, '10-15'),
    slot('dumbbell-flye', 3, '12-15'),
    slot('close-grip-bench-press', 4, '8-12'),
    slot('triceps-pushdown', 3, '12-15'),
  ],
});

addRoutine({
  id: 'tom-platz-back-bis',
  name: 'Tom Platz — Back & Biceps (Reconstruction)',
  day: 'Day 2',
  styleId: 'tom-platz',
  focus: ['back', 'lats', 'biceps'],
  description: 'Back & biceps reconstruction (see chest note).',
  source: platzSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('deadlift', 4, '6-10'),
    slot('barbell-row', 4, '8-12'),
    slot('lat-pulldown', 4, '10-15'),
    slot('seated-cable-row', 3, '10-15'),
    slot('barbell-curl', 4, '8-12'),
    slot('incline-dumbbell-curl', 3, '10-12'),
  ],
});

addRoutine({
  id: 'tom-platz-shoulders',
  name: 'Tom Platz — Shoulders (Reconstruction)',
  day: 'Day 3',
  styleId: 'tom-platz',
  focus: ['shoulders'],
  description: 'Shoulders reconstruction (see chest note).',
  source: platzSrc,
  labels: ['Full program', 'Reconstruction beyond attested legs'],
  exercises: [
    slot('military-press', 5, '8-12'),
    slot('dumbbell-lateral-raise', 4, '12-20'),
    slot('front-raise', 3, '10-15'),
    slot('bent-over-lateral-raise', 3, '12-15'),
    slot('upright-row', 3, '10-12'),
  ],
});

patchRoutine('tom-platz-legs-1981', {
  day: 'Day 4',
  labels: ['Full program', '1981 Olympia prep legs — signature primary'],
});
setSplit('tom-platz', [
  { day: 'Day 1', focus: 'Chest & triceps (reconstruction)' },
  { day: 'Day 2', focus: 'Back & biceps (reconstruction)' },
  { day: 'Day 3', focus: 'Shoulders (reconstruction)' },
  { day: 'Day 4', focus: 'Legs — 1981 Olympia prep (primary)' },
  { day: 'Note', focus: 'No official full-week table — upper days are reconstructions' },
]);

// ============================================================================
// NASSER — expand beyond legs (Fitness Volt profile tables — secondary, label)
// ============================================================================
const nasserSrc = {
  name: 'Nasser El Sonbaty — Complete Profile Workout — Fitness Volt (secondary tables) + M&F thighs primary',
  url: 'https://fitnessvolt.com/16543/nasser-el-sonbaty/',
};

addRoutine({
  id: 'nasser-el-sonbaty-chest',
  name: 'Nasser El Sonbaty — Chest',
  day: 'Chest',
  styleId: 'nasser-el-sonbaty',
  focus: ['chest'],
  description:
    'Nasser said session structure varied deliberately. Legs are primary (M&F thighs feature). Upper days follow widely circulated secondary tables consistent with his heavy, failure-oriented style — labeled as secondary, not a fixed calendar he endorsed.',
  source: nasserSrc,
  labels: ['Full program', 'Secondary upper tables'],
  exercises: [
    slot('incline-dumbbell-press', 4, '6-10'),
    slot('dumbbell-flye', 4, '10'),
    slot('incline-dumbbell-flye', 4, '6-10', 'Decline flyes in some tables — incline used here.'),
    slot('cable-crossover', 4, '10'),
  ],
});

addRoutine({
  id: 'nasser-el-sonbaty-back',
  name: 'Nasser El Sonbaty — Back',
  day: 'Back',
  styleId: 'nasser-el-sonbaty',
  focus: ['back', 'lats'],
  description: 'Back day from secondary tables (see chest note).',
  source: nasserSrc,
  labels: ['Full program', 'Secondary upper tables'],
  exercises: [
    slot('deadlift', 4, '8-10'),
    slot('barbell-row', 4, '10-12'),
    slot('lat-pulldown', 4, '10-12'),
    slot('seated-cable-row', 4, '15-20'),
  ],
});

addRoutine({
  id: 'nasser-el-sonbaty-shoulders',
  name: 'Nasser El Sonbaty — Shoulders',
  day: 'Shoulders',
  styleId: 'nasser-el-sonbaty',
  focus: ['shoulders'],
  description: 'Shoulders day from secondary tables (see chest note).',
  source: nasserSrc,
  labels: ['Full program', 'Secondary upper tables'],
  exercises: [
    slot('dumbbell-shoulder-press', 3, '6-12'),
    slot('bent-over-lateral-raise', 3, '6-12'),
    slot('one-arm-cable-lateral-raise', 3, '6-12'),
    slot('military-press', 3, '6-12'),
  ],
});

addRoutine({
  id: 'nasser-el-sonbaty-biceps',
  name: 'Nasser El Sonbaty — Biceps',
  day: 'Biceps',
  styleId: 'nasser-el-sonbaty',
  focus: ['biceps'],
  description: 'Biceps day from secondary tables (see chest note).',
  source: nasserSrc,
  labels: ['Full program', 'Secondary upper tables'],
  exercises: [
    slot('barbell-curl', 4, '10-12'),
    slot('preacher-curl-barbell', 4, '10-12'),
    slot('alternating-dumbbell-curl', 4, '10-12'),
    slot('hammer-curl', 4, '10-12'),
  ],
});

addRoutine({
  id: 'nasser-el-sonbaty-triceps',
  name: 'Nasser El Sonbaty — Triceps',
  day: 'Triceps',
  styleId: 'nasser-el-sonbaty',
  focus: ['triceps'],
  description: 'Triceps day from secondary tables (see chest note).',
  source: nasserSrc,
  labels: ['Full program', 'Secondary upper tables'],
  exercises: [
    slot('one-arm-dumbbell-triceps-extension', 3, '8-12'),
    slot('overhead-triceps-extension-cable', 3, '8-12'),
    slot('triceps-pushdown', 3, '8-12'),
    slot('close-grip-bench-press', 3, '8-12'),
  ],
});

for (const id of [
  'nasser-el-sonbaty-quads',
  'nasser-el-sonbaty-hams',
  'nasser-el-sonbaty-calves',
]) {
  patchRoutine(id, { labels: ['Full program', 'M&F thighs primary'] });
}
setSplit('nasser-el-sonbaty', [
  { day: 'Chest', focus: 'Chest (secondary table)' },
  { day: 'Back', focus: 'Back (secondary table)' },
  { day: 'Legs', focus: 'Quads / hams / calves (M&F primary — split across sessions)' },
  { day: 'Shoulders', focus: 'Shoulders (secondary table)' },
  { day: 'Biceps', focus: 'Biceps (secondary table)' },
  { day: 'Triceps', focus: 'Triceps (secondary table)' },
  { day: 'Note', focus: 'He varied structure by feel — not one fixed calendar' },
]);

// ============================================================================
// BRANDON CURRY — All Access YT; expand beyond peak-week touch-up
// ============================================================================
const currySrc = {
  name: 'Brandon Curry All Access — official YouTube (leg-dominant Arnold prep + upper pattern)',
  url: 'https://www.youtube.com/@BrandonCurryAllAccess',
};

addRoutine({
  id: 'brandon-curry-legs-quad',
  name: 'Brandon Curry — Legs (Quad/Ham Dominant)',
  day: 'Leg High Day',
  styleId: 'brandon-curry',
  focus: ['quads', 'hamstrings', 'glutes'],
  description:
    'Quad/ham-dominant "high" leg day matching Curry\'s self-narrated Arnold-prep pattern on Brandon Curry All Access (3 leg-dominant days). Exercise selection reconstructed from his filmed sessions and stated preferences (belt-squat lunges, adductors, etc.).',
  source: currySrc,
  labels: ['Full program', 'Official channel — session reconstruction'],
  exercises: [
    slot('leg-extension', 4, '12-15'),
    slot('hack-squat', 4, '8-12'),
    slot('walking-lunge', 3, '10-12', 'Belt-squat lunge influence — DB/walking lunge in catalog.'),
    slot('lying-leg-curl', 4, '10-15'),
    slot('romanian-deadlift', 3, '8-12'),
    slot('standing-calf-raise', 4, '12-15'),
  ],
});

addRoutine({
  id: 'brandon-curry-legs-hip',
  name: 'Brandon Curry — Legs (Hip-Dominant)',
  day: 'Hip-Dominant Legs',
  styleId: 'brandon-curry',
  focus: ['hamstrings', 'glutes', 'quads'],
  description: 'Hip-dominant leg day from his All Access Arnold-prep narration (more isolation, less compound).',
  source: currySrc,
  labels: ['Full program', 'Official channel — session reconstruction'],
  exercises: [
    slot('hip-abductor-machine', 3, '15-20'),
    slot('seated-hamstring-curl', 4, '12-15'),
    slot('hip-thrust', 4, '10-15'),
    slot('stiff-leg-deadlift', 3, '10-12'),
    slot('bulgarian-split-squat', 3, '10-12'),
    slot('seated-calf-raise', 4, '12-15'),
  ],
});

addRoutine({
  id: 'brandon-curry-push',
  name: 'Brandon Curry — Upper Push Pattern',
  day: 'Upper Push',
  styleId: 'brandon-curry',
  focus: ['chest', 'shoulders', 'triceps'],
  description:
    'Upper horizontal push pattern with arms/rear delts folded in — exact weekly day slots not confirmed from primary sources; reconstructed from his All Access upper sessions.',
  source: currySrc,
  labels: ['Full program', 'Official channel — session reconstruction'],
  exercises: [
    slot('incline-dumbbell-press', 4, '8-12'),
    slot('chest-press-machine', 3, '10-12'),
    slot('pec-deck', 3, '12-15'),
    slot('dumbbell-shoulder-press', 3, '8-12'),
    slot('dumbbell-lateral-raise', 3, '12-15'),
    slot('triceps-pushdown', 3, '10-15'),
  ],
});

addRoutine({
  id: 'brandon-curry-pull',
  name: 'Brandon Curry — Upper Pull Pattern',
  day: 'Upper Pull',
  styleId: 'brandon-curry',
  focus: ['back', 'lats', 'biceps', 'rear-delts'],
  description: 'Upper pull pattern reconstructed from All Access sessions (pairs with existing peak-week upper touch-up).',
  source: currySrc,
  labels: ['Full program', 'Official channel — session reconstruction'],
  exercises: [
    slot('lat-pulldown', 4, '8-12'),
    slot('seated-cable-row', 4, '8-12'),
    slot('machine-pullover', 3, '10-15'),
    slot('face-pull', 3, '12-15'),
    slot('ez-bar-curl', 3, '10-12'),
    slot('hammer-curl', 3, '10-12'),
  ],
});

patchRoutine('brandon-curry-upper-touchup', {
  labels: ['Peak-week upper touch-up (All Access primary)', 'Full program'],
  day: 'Peak-week upper',
});
setSplit('brandon-curry', [
  { day: 'Leg High Day', focus: 'Quad/ham dominant' },
  { day: 'Hip-Dominant Legs', focus: 'More isolation, less compound' },
  { day: 'Upper Push', focus: 'Chest / shoulders / triceps' },
  { day: 'Upper Pull', focus: 'Back / biceps / rear delts' },
  { day: 'Peak-week upper', focus: 'Filmed All Access touch-up' },
  { day: 'Note', focus: 'Exact weekday order not confirmed from primary sources' },
]);

fs.writeFileSync('src/data/exercises.json', JSON.stringify(exercises, null, 2) + '\n');
fs.writeFileSync('src/data/routines.json', JSON.stringify(routines, null, 2) + '\n');
fs.writeFileSync('src/data/styles.json', JSON.stringify(styles, null, 2) + '\n');
console.log('\\nWave 2 written. routines=', routines.length, 'exercises=', exercises.length);
