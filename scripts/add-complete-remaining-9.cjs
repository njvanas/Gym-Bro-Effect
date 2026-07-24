/**
 * Fill remaining 9 bodybuilders with complete legend routines.
 * Prefer Tier A/B; where only cross-corroborated reconstructions exist, use them
 * and state that honestly in the routine description.
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
}

addExercise({
  id: 'good-morning',
  name: 'Good Morning',
  aliases: [],
  primaryMuscle: 'hamstrings',
  secondaryMuscles: ['lower-back', 'glutes'],
  equipment: 'barbell',
  category: 'compound',
  cues: ['Soft knees', 'Hinge until torso near parallel', 'Drive hips forward'],
});
addExercise({
  id: 'dumbbell-shoulder-press',
  name: 'Dumbbell Shoulder Press',
  aliases: ['Seated Dumbbell Press', 'DB Press'],
  primaryMuscle: 'shoulders',
  secondaryMuscles: ['triceps'],
  equipment: 'dumbbell',
  category: 'compound',
  cues: ['Press overhead without excessive lean', 'Full lockout', 'Control the descent'],
});
addExercise({
  id: 'bent-over-lateral-raise',
  name: 'Bent-Over Lateral Raise',
  aliases: ['Bent-Over Rear Delt Raise', 'Rear Lateral Raise'],
  primaryMuscle: 'rear-delts',
  secondaryMuscles: ['shoulders'],
  equipment: 'dumbbell',
  category: 'isolation',
  cues: ['Hinge at hips', 'Raise out to sides', 'Lead with elbows'],
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
  r.labels = r.labels || ['Complete split'];
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

// ============================================================================
// CASEY VIATOR — Iron Man 1971 full body (3x/week) + Colorado sample
// ============================================================================
addRoutine({
  id: 'casey-viator-full-body-1971',
  name: 'Casey Viator — Full Body (Iron Man 1971)',
  day: 'Full body (3×/week)',
  styleId: 'casey-viator',
  focus: ['quads', 'hamstrings', 'back', 'lats', 'shoulders', 'traps'],
  description:
    'Whole-body session from Iron Man (Oct 1971, Achilles Kallos), reprinted via caseyviator.com — 3×/week, ~2–2.5 hours, legs done back-to-back with little rest. This is his pre–Colorado Experiment competitive program, not the Colorado Experiment itself.',
  source: {
    name: "Casey Viator's Training — Iron Man Oct 1971 (via caseyviator.com)",
    url: 'http://www.caseyviator.com/flexarticle.pdf',
  },
  exercises: [
    slot('leg-press', 1, '20', '750 lb noted in the 1971 feature.'),
    slot('leg-extension', 1, '14-20', '250 lb noted.'),
    slot('barbell-squat', 1, '14-20', 'Full squat; 505 lb noted.'),
    slot('lying-leg-curl', 1, '14-20', '150 lb noted.'),
    slot('machine-pullover', 3, '20', 'Nautilus pullover.'),
    slot('lat-pulldown', 3, '20', 'Circular / behind-neck pulldown mapped to lat pulldown.'),
    slot('pull-up', 3, '20', 'Chins.'),
    slot('dumbbell-lateral-raise', 3, '20', 'Standing laterals; 60 lb noted.'),
    slot('military-press', 3, '20', 'Behind-the-neck press mapped to military press; 215 lb noted.'),
    slot('barbell-shrug', 3, '20', '280 lb noted.'),
  ],
});

addRoutine({
  id: 'casey-viator-colorado-sample',
  name: 'Casey Viator — Colorado Experiment (Routine #7 sample)',
  day: 'Colorado Experiment session',
  styleId: 'casey-viator',
  focus: ['back', 'chest', 'shoulders', 'biceps', 'triceps', 'quads'],
  description:
    'One of Ellington Darden\'s preserved Colorado Experiment session cards (Routine #7): Nautilus-only, ~1 set to failure per movement, many negative-only. Catalog maps Nautilus names to closest free-weight/machine equivalents — this is a fidelity compromise, not a claim that Viator used these exact commercial machines.',
  source: {
    name: 'The Colorado Experiment — Arthur Jones / Ellington Darden archive',
    url: 'http://arthurjonesexercise.com/Athletic/Colorado.PDF',
  },
  labels: ['Complete split', 'HIT / negatives'],
  exercises: [
    slot('machine-pullover', 1, 'to failure', 'Negative-only pullover.'),
    slot('lat-pulldown', 1, 'to failure', 'Torso-arm / behind-neck pulldown — negative-only.'),
    slot('machine-shoulder-press', 1, 'to failure', 'Shoulder machine — negative-only.'),
    slot('ez-bar-curl', 1, 'to failure', 'Biceps — negative-only.'),
    slot('barbell-bench-press', 1, 'to failure', 'Negative-only bench.'),
    slot('pull-up', 1, 'to failure', 'Chin — negative-only.'),
    slot('triceps-pushdown', 1, 'to failure', 'Triceps — negative-only.'),
    slot('barbell-curl', 1, 'to failure', 'Compound biceps — normal.'),
    slot('dumbbell-lateral-raise', 1, 'to failure', 'Double shoulder — normal.'),
    slot('barbell-squat', 1, 'to failure', 'Normal squat.'),
    slot('back-extension', 1, 'to failure', 'Hip and back — normal.'),
    slot('leg-extension', 1, 'to failure', 'Negative-accentuated.'),
  ],
});

// ============================================================================
// DENNIS WOLF — competitive 4-day (cross-corroborated Tier C + M&F principles)
// ============================================================================
addRoutine({
  id: 'dennis-wolf-day1-chest-bis',
  name: 'Dennis Wolf — Day 1 Chest & Biceps',
  day: 'Day 1',
  styleId: 'dennis-wolf',
  focus: ['chest', 'biceps'],
  description:
    'Competitive-prime Day 1 from cross-corroborated secondary tables (Greatest Physiques / Steel Supplements / Dr Workout), matching the shape confirmed in Flex/M&F "Mass with Class" (compound first, 10–12 reps).',
  source: {
    name: 'Dennis Wolf: Mass with Class — Muscle & Fitness / Flex (principles) + corroborated split tables',
    url: 'https://www.muscleandfitness.com/flexonline/training/dennis-wolf-mass-class/',
  },
  exercises: [
    slot('incline-barbell-press', 3, '8-12', '+2 warm-up sets before working sets.'),
    slot('barbell-bench-press', 2, '8-12'),
    slot('incline-dumbbell-flye', 2, '8-12'),
    slot('cable-crossover', 1, '12-15'),
    slot('alternating-dumbbell-curl', 2, '10-12', 'Seated DB curls; +2 warm-ups.'),
    slot('barbell-curl', 2, '10-12'),
    slot('cable-biceps-curl', 1, '12', 'One-arm cable curls.'),
  ],
});

addRoutine({
  id: 'dennis-wolf-day2-legs',
  name: 'Dennis Wolf — Day 2 Legs',
  day: 'Day 2',
  styleId: 'dennis-wolf',
  focus: ['quads', 'hamstrings', 'calves'],
  description: 'Competitive-prime Day 2 legs from the same corroborated split tables.',
  source: {
    name: 'Dennis Wolf: Mass with Class — Muscle & Fitness / Flex (principles) + corroborated split tables',
    url: 'https://www.muscleandfitness.com/flexonline/training/dennis-wolf-mass-class/',
  },
  exercises: [
    slot('leg-extension', 3, '12-15', '+1 warm-up.'),
    slot('leg-press', 2, '12-15'),
    slot('barbell-squat', 2, '10-15'),
    slot('lying-leg-curl', 3, '10-15'),
    slot('good-morning', 2, '10'),
    slot('standing-leg-curl', 1, '10-12', 'One-legged curls.'),
    slot('standing-calf-raise', 3, '15'),
    slot('seated-calf-raise', 2, '15'),
  ],
});

addRoutine({
  id: 'dennis-wolf-day3-back',
  name: 'Dennis Wolf — Day 3 Back & Rear Delts',
  day: 'Day 3',
  styleId: 'dennis-wolf',
  focus: ['back', 'lats', 'rear-delts', 'traps'],
  description: 'Competitive-prime Day 3 from the same corroborated split tables.',
  source: {
    name: 'Dennis Wolf: Mass with Class — Muscle & Fitness / Flex (principles) + corroborated split tables',
    url: 'https://www.muscleandfitness.com/flexonline/training/dennis-wolf-mass-class/',
  },
  exercises: [
    slot('dumbbell-pullover', 2, '10-12', '+1 warm-up.'),
    slot('lat-pulldown', 2, '10', 'Close-grip.'),
    slot('barbell-row', 2, '10-12'),
    slot('one-arm-dumbbell-row', 1, '12', 'Seated one-arm row mapped to DB row.'),
    slot('rear-delt-fly-machine', 3, '12', 'Lying reverse flyes.'),
    slot('face-pull', 2, '12', 'One-arm cable reverse flyes mapped to face pull.'),
    slot('barbell-shrug', 2, '10-12'),
  ],
});

addRoutine({
  id: 'dennis-wolf-day4-shoulders',
  name: 'Dennis Wolf — Day 4 Shoulders / Triceps / Abs',
  day: 'Day 4',
  styleId: 'dennis-wolf',
  focus: ['shoulders', 'triceps', 'abs'],
  description: 'Competitive-prime Day 4 from the same corroborated split tables.',
  source: {
    name: 'Dennis Wolf: Mass with Class — Muscle & Fitness / Flex (principles) + corroborated split tables',
    url: 'https://www.muscleandfitness.com/flexonline/training/dennis-wolf-mass-class/',
  },
  exercises: [
    slot('machine-shoulder-press', 3, '10-12', '+1 warm-up.'),
    slot('dumbbell-lateral-raise', 2, '10'),
    slot('one-arm-cable-lateral-raise', 1, '10'),
    slot('triceps-pushdown', 3, '10-12'),
    slot('overhead-triceps-extension-cable', 2, '10', 'French / overhead extension.'),
    slot('one-arm-triceps-pushdown', 1, '15'),
    slot('decline-crunch', 3, '15-20', 'Sit-ups.'),
  ],
});

setSplit('dennis-wolf', [
  { day: 'Day 1', focus: 'Chest & biceps' },
  { day: 'Day 2', focus: 'Legs' },
  { day: 'Day 3', focus: 'Back & rear delts' },
  { day: 'Day 4', focus: 'Shoulders, triceps & abs' },
  { day: 'Day 5', focus: 'Rest (4-on/1-off competitive pattern)' },
]);

// ============================================================================
// FRANCO COLUMBU — Winning Bodybuilding 6-day (Tier A book)
// ============================================================================
addRoutine({
  id: 'franco-columbu-back-legs',
  name: 'Franco Columbu — Back / Abs / Legs',
  day: 'Mon / Wed / Fri',
  styleId: 'franco-columbu',
  focus: ['back', 'lats', 'quads', 'hamstrings', 'calves', 'abs'],
  description:
    'A-day from Franco Columbu\'s own Winning Bodybuilding (1977): back, abdomen, and legs. Sets/reps follow his book chapters for each body part.',
  source: {
    name: 'Winning Bodybuilding — Franco Columbu (1977)',
    url: 'https://www.creators.com/books/winning-bodybuilding',
  },
  exercises: [
    slot('pull-up', 5, '8-10', 'Chin in front / behind neck variants in the book.'),
    slot('barbell-row', 4, '8'),
    slot('one-arm-dumbbell-row', 3, '8-10'),
    slot('deadlift', 5, '2-5', 'Powerlifting chapter — heavy day ≤2, moderate 4–5.'),
    slot('leg-extension', 2, '20'),
    slot('lying-leg-curl', 3, '13'),
    slot('barbell-squat', 6, '10-12', '1 warm-up + 5 working.'),
    slot('front-squat', 3, '10'),
    slot('standing-calf-raise', 4, '20'),
    slot('decline-crunch', 3, '25', 'Abs circuit: sit-ups / leg raises — 25 reps, circuit 2–4×.'),
    slot('leg-raise-parallel-bars', 3, '25'),
  ],
});

addRoutine({
  id: 'franco-columbu-chest-arms',
  name: 'Franco Columbu — Chest / Arms / Shoulders / Abs',
  day: 'Tue / Thu / Sat',
  styleId: 'franco-columbu',
  focus: ['chest', 'shoulders', 'biceps', 'triceps', 'forearms', 'abs'],
  description:
    'B-day from Winning Bodybuilding: chest, arms, shoulders, abdomen. Includes his documented curl/extension supersets.',
  source: {
    name: 'Winning Bodybuilding — Franco Columbu (1977)',
    url: 'https://www.creators.com/books/winning-bodybuilding',
  },
  exercises: [
    slot('barbell-bench-press', 8, '8-1', 'Pyramid 8 down to 1.'),
    slot('incline-barbell-press', 4, '8'),
    slot('incline-dumbbell-flye', 3, '8'),
    slot('weighted-triceps-dip', 4, '10'),
    slot('dumbbell-pullover', 1, '10', 'Optional extra.'),
    slot('smith-machine-shoulder-press', 4, '8', 'Seated press behind neck mapped to Smith/machine press.'),
    slot('dumbbell-lateral-raise', 4, '8'),
    slot('front-raise', 3, '8'),
    slot('upright-row', 3, '10'),
    {
      exerciseId: 'incline-dumbbell-curl',
      sets: 4,
      repRange: '8',
      notes: 'Superset with lying triceps extension.',
      supersetGroup: 'franco-arms-a',
      setScheme: ws(4, '8'),
    },
    {
      exerciseId: 'lying-triceps-extension',
      sets: 4,
      repRange: '8',
      notes: 'Superset with incline DB curl.',
      supersetGroup: 'franco-arms-a',
      setScheme: ws(4, '8'),
    },
    {
      exerciseId: 'barbell-curl',
      sets: 4,
      repRange: '8',
      notes: 'Superset with close-grip bench / lying close-grip triceps press.',
      supersetGroup: 'franco-arms-b',
      setScheme: ws(4, '8'),
    },
    {
      exerciseId: 'close-grip-bench-press',
      sets: 4,
      repRange: '8',
      notes: 'Superset with barbell curl.',
      supersetGroup: 'franco-arms-b',
      setScheme: ws(4, '8'),
    },
    slot('preacher-curl-barbell', 4, '8'),
    slot('triceps-pushdown', 4, '15-10', '1×15 + 3×10.'),
    slot('dumbbell-concentration-curl', 3, '10'),
    slot('decline-crunch', 3, '25'),
  ],
});

setSplit('franco-columbu', [
  { day: 'Monday / Wednesday / Friday', focus: 'Back, abs, legs' },
  { day: 'Tuesday / Thursday / Saturday', focus: 'Chest, arms, shoulders, abs' },
  { day: 'Sunday', focus: 'Rest' },
]);

// ============================================================================
// SERGE NUBRET — T-Nation A/B/C (Serge-recommended layout)
// ============================================================================
addRoutine({
  id: 'serge-nubret-a',
  name: 'Serge Nubret — Workout A Quads & Chest',
  day: 'Day A',
  styleId: 'serge-nubret',
  focus: ['quads', 'chest'],
  description:
    'Workout A from the basic layout T-Nation states Serge himself often recommended to young bodybuilders: high volume, 12 reps, short rest, never to true failure. Matches his Weik-interview volume philosophy.',
  source: {
    name: 'Serge Nubret Pump Training — T-Nation',
    url: 'https://archive.t-nation.com/training/serge-nubret-pump-training/',
  },
  exercises: [
    slot('barbell-squat', 8, '12'),
    slot('leg-press', 8, '12'),
    slot('leg-extension', 6, '12'),
    slot('barbell-bench-press', 8, '12', 'Extremely wide grip.'),
    slot('incline-dumbbell-flye', 6, '12', 'Flat DB fly mapped to incline fly when flat fly absent — use flat path if preferred.'),
    slot('incline-barbell-press', 8, '12'),
    slot('incline-dumbbell-flye', 6, '12', 'Incline fly block.'),
    slot('dumbbell-pullover', 6, '12'),
  ],
});

addRoutine({
  id: 'serge-nubret-b',
  name: 'Serge Nubret — Workout B Back & Hamstrings',
  day: 'Day B',
  styleId: 'serge-nubret',
  focus: ['back', 'lats', 'hamstrings', 'calves'],
  description: 'Workout B from the same Serge-recommended T-Nation layout. Calves trained on B and C days.',
  source: {
    name: 'Serge Nubret Pump Training — T-Nation',
    url: 'https://archive.t-nation.com/training/serge-nubret-pump-training/',
  },
  exercises: [
    slot('pull-up', 6, '12', 'Chin-up.'),
    slot('lat-pulldown', 8, '12', 'Behind-the-neck pulldown.'),
    slot('lat-pulldown', 6, '12', 'Front lat pulldown — second block.'),
    slot('barbell-row', 6, '12'),
    slot('lying-leg-curl', 8, '12'),
    slot('standing-leg-curl', 8, '12'),
    slot('standing-calf-raise', 6, '12-20'),
    slot('seated-calf-raise', 6, '12-20'),
  ],
});

addRoutine({
  id: 'serge-nubret-c',
  name: 'Serge Nubret — Workout C Shoulders & Arms',
  day: 'Day C',
  styleId: 'serge-nubret',
  focus: ['shoulders', 'biceps', 'triceps', 'calves'],
  description: 'Workout C from the Serge-recommended T-Nation layout. Arm pairings are supersets.',
  source: {
    name: 'Serge Nubret Pump Training — T-Nation',
    url: 'https://archive.t-nation.com/training/serge-nubret-pump-training/',
  },
  exercises: [
    slot('military-press', 6, '12', 'Behind-the-neck press mapped to military press.'),
    slot('front-raise', 6, '12', 'Alternate front raise.'),
    slot('upright-row', 6, '12'),
    slot('dumbbell-lateral-raise', 6, '12'),
    {
      exerciseId: 'cable-biceps-curl',
      sets: 8,
      repRange: '12',
      notes: 'Superset with triceps pushdown.',
      supersetGroup: 'nubret-arms-a',
      setScheme: ws(8, '12'),
    },
    {
      exerciseId: 'triceps-pushdown',
      sets: 8,
      repRange: '12',
      notes: 'Superset with cable curl.',
      supersetGroup: 'nubret-arms-a',
      setScheme: ws(8, '12'),
    },
    {
      exerciseId: 'barbell-curl',
      sets: 8,
      repRange: '12',
      notes: 'Superset with dips.',
      supersetGroup: 'nubret-arms-b',
      setScheme: ws(8, '12'),
    },
    {
      exerciseId: 'weighted-triceps-dip',
      sets: 8,
      repRange: '12',
      notes: 'Superset with barbell curl.',
      supersetGroup: 'nubret-arms-b',
      setScheme: ws(8, '12'),
    },
    slot('standing-calf-raise', 6, '12-20'),
    slot('decline-crunch', 1, 'as many as possible', 'Daily abs: build toward 2,000 sit-ups (his own words). Start with one unbroken set and progress.'),
  ],
});

setSplit('serge-nubret', [
  { day: 'Day A', focus: 'Quads & chest' },
  { day: 'Day B', focus: 'Back & hamstrings (+ calves)' },
  { day: 'Day C', focus: 'Shoulders & arms (+ calves)' },
  { day: 'Rotate A/B/C', focus: '6 days on / 1 off (or 3-on/1-off variant)' },
  { day: 'Every morning', focus: 'Abs — build toward 2,000 sit-ups' },
]);

// ============================================================================
// ROBBY ROBINSON — heavy week 3-day (MuscleSportMag / SpotMeBro corroboration)
// ============================================================================
addRoutine({
  id: 'robby-robinson-chest-back',
  name: 'Robby Robinson — Heavy Chest & Back',
  day: 'Day 1',
  styleId: 'robby-robinson',
  focus: ['chest', 'back'],
  description:
    'Heavy-week chest & back from Robinson heavy/light system (MuscleSportMag Old School Workout No. 3 / matching SpotMeBro reconstruction). Pyramid 12 → 6-8.',
  source: {
    name: "Robby Robinson Heavy/Light System — MuscleSportMag / SpotMeBro reconstructions",
    url: 'https://fitnessvolt.com/robby-robinson-favorite-exercises/',
  },
  exercises: [
    slot('incline-barbell-press', 3, '12, 8-10, 6-8'),
    slot('dumbbell-bench-press', 3, '12, 8-10, 6-8'),
    slot('incline-dumbbell-flye', 3, '12, 8-10, 6-8', 'Flat flyes in source — mapped to incline flye.'),
    slot('t-bar-row', 3, '12, 8-10, 6-8'),
    slot('seated-cable-row', 3, '12, 8-10, 6-8', 'Low pulley rows.'),
  ],
});

addRoutine({
  id: 'robby-robinson-legs',
  name: 'Robby Robinson — Heavy Legs',
  day: 'Day 2',
  styleId: 'robby-robinson',
  focus: ['quads', 'calves'],
  description: 'Heavy-week legs from the same heavy/light system reconstructions.',
  source: {
    name: "Robby Robinson Heavy/Light System — MuscleSportMag / SpotMeBro reconstructions",
    url: 'https://fitnessvolt.com/robby-robinson-favorite-exercises/',
  },
  exercises: [
    slot('leg-press', 3, '20, 15, 10-12'),
    slot('barbell-squat', 3, '12, 8-10, 6-8'),
    slot('leg-extension', 3, '12, 10, 8'),
    slot('seated-calf-raise', 3, '12-20'),
    slot('stiff-leg-deadlift', 3, '10-15', 'Favorite hamstring move per his own channel commentary.'),
  ],
});

addRoutine({
  id: 'robby-robinson-shoulders-arms',
  name: 'Robby Robinson — Heavy Shoulders & Arms',
  day: 'Day 3',
  styleId: 'robby-robinson',
  focus: ['shoulders', 'biceps', 'triceps'],
  description: 'Heavy-week shoulders & arms completing the 3-on/1-off heavy rotation.',
  source: {
    name: "Robby Robinson Heavy/Light System — MuscleSportMag / SpotMeBro reconstructions",
    url: 'https://fitnessvolt.com/robby-robinson-favorite-exercises/',
  },
  exercises: [
    slot('dumbbell-shoulder-press', 3, '12, 10, 8'),
    slot('dumbbell-lateral-raise', 3, '12, 10, 8'),
    slot('bent-over-lateral-raise', 3, '12, 10, 8'),
    slot('barbell-curl', 3, '12, 10, 8'),
    slot('dumbbell-concentration-curl', 3, '12, 8-10, 6-8'),
    slot('overhead-triceps-extension-cable', 3, '12, 10, 8'),
    slot('triceps-pushdown', 3, '12, 10, 8'),
  ],
});

setSplit('robby-robinson', [
  { day: 'Day 1', focus: 'Chest & back (heavy)' },
  { day: 'Day 2', focus: 'Legs (heavy)' },
  { day: 'Day 3', focus: 'Shoulders & arms (heavy)' },
  { day: 'Day 4', focus: 'Rest — then light week (intentionally unstructured / lower loads)' },
]);

// ============================================================================
// PAUL DILLETT — complete 4-on/1-off with arm day B + other days at his 10-12 rule
// ============================================================================
addRoutine({
  id: 'paul-dillett-shoulders',
  name: 'Paul Dillett — Day 1 Shoulders',
  day: 'Day 1',
  styleId: 'paul-dillett',
  focus: ['shoulders', 'traps'],
  description:
    'Shoulder day for his 4-on/1-off split. Exercise selection from secondary profiles; sets/reps follow his own quoted rule — nothing less than 10 reps, moderate weight, 4–5 sets.',
  source: {
    name: 'Paul Dillett interview / arm quotes — bodybuildingfanatic + Fitness Volt profile split',
    url: 'https://www.getbig.com/iview/dillett990731.htm',
  },
  exercises: [
    slot('military-press', 5, '10-12'),
    slot('dumbbell-shoulder-press', 4, '10-12'),
    slot('dumbbell-lateral-raise', 4, '10-12'),
    slot('front-raise', 4, '10-12'),
    slot('rear-delt-fly-machine', 4, '10-12'),
    slot('barbell-shrug', 4, '10-12'),
  ],
});

addRoutine({
  id: 'paul-dillett-legs',
  name: 'Paul Dillett — Day 2 Quads AM / Hams PM',
  day: 'Day 2',
  styleId: 'paul-dillett',
  focus: ['quads', 'hamstrings', 'calves'],
  description:
    'Combined presentation of his AM quads / PM hamstrings double-session day. Compound selection is standard for his era; loading follows his ≥10-rep rule.',
  source: {
    name: 'Paul Dillett split — Fitness Volt profile + getbig interviews',
    url: 'https://www.getbig.com/iview/dillett990731.htm',
  },
  exercises: [
    slot('leg-extension', 4, '12-15'),
    slot('barbell-squat', 5, '10-12'),
    slot('leg-press', 4, '10-15'),
    slot('hack-squat', 4, '10-12'),
    slot('lying-leg-curl', 5, '10-12'),
    slot('stiff-leg-deadlift', 4, '10-12'),
    slot('standing-calf-raise', 5, '12-20'),
  ],
});

addRoutine({
  id: 'paul-dillett-chest-arms',
  name: 'Paul Dillett — Day 3 Chest AM / Arms PM',
  day: 'Day 3',
  styleId: 'paul-dillett',
  focus: ['chest', 'biceps', 'triceps'],
  description:
    'Chest block plus his best-attested arm sequence (triceps first, then alternating, 4–5×10–12) from bodybuildingfanatic direct quotes.',
  source: {
    name: 'Paul Dillett arm training — bodybuildingfanatic (direct quotes)',
    url: 'https://www.bodybuildingfanatic.com/paul-dillet.html',
  },
  exercises: [
    slot('incline-barbell-press', 5, '10-12'),
    slot('barbell-bench-press', 4, '10-12'),
    slot('pec-deck', 4, '10-12'),
    slot('weighted-triceps-dip', 4, '10-12'),
    slot('triceps-pushdown', 5, '10-12', 'Opens arm session as warm-up for what follows.'),
    slot('barbell-curl', 5, '10-12', '"I loved barbell curls" — his own words.'),
    slot('lying-triceps-extension', 5, '10-12', 'Skull-crushers — his own words.'),
    slot('preacher-curl-barbell', 4, '10-12'),
    slot('triceps-pushdown', 4, '10-12', 'Second press-down block (bar/V/rope variety).'),
    slot('dumbbell-concentration-curl', 4, '10-12'),
  ],
});

addRoutine({
  id: 'paul-dillett-back',
  name: 'Paul Dillett — Day 4 Back',
  day: 'Day 4',
  styleId: 'paul-dillett',
  focus: ['back', 'lats'],
  description:
    'Back day completing the 4-on/1-off cycle. Exercise selection is era-standard; sets follow his ≥10-rep moderate-weight rule (no primary exercise table found).',
  source: {
    name: 'Paul Dillett split — Fitness Volt profile + getbig interviews',
    url: 'https://www.getbig.com/iview/dillett990731.htm',
  },
  exercises: [
    slot('pull-up', 4, '10-12'),
    slot('lat-pulldown', 5, '10-12'),
    slot('barbell-row', 5, '10-12'),
    slot('t-bar-row', 4, '10-12'),
    slot('seated-cable-row', 4, '10-12'),
    slot('deadlift', 4, '10-12'),
  ],
});

setSplit('paul-dillett', [
  { day: 'Day 1', focus: 'Shoulders' },
  { day: 'Day 2', focus: 'Quads (AM) / Hamstrings (PM)' },
  { day: 'Day 3', focus: 'Chest (AM) / Arms (PM)' },
  { day: 'Day 4', focus: 'Back' },
  { day: 'Day 5', focus: 'Rest (3-on/1-off variant in contest prep)' },
]);

// ============================================================================
// VINCE TAYLOR — PPL at his 3 exercises × 5 sets × 10-12 protocol
// ============================================================================
addRoutine({
  id: 'vince-taylor-push',
  name: 'Vince Taylor — Push (Chest / Shoulders / Triceps)',
  day: 'Monday / Thursday',
  styleId: 'vince-taylor',
  focus: ['chest', 'shoulders', 'triceps'],
  description:
    'Push day of his named push-pull system (in use since 1984). Exercises from Fitness Volt named list; structure is his own 2002 comeback protocol: 3 exercises/bodypart, 5 sets, 10–12 reps (6–8 on a bad day).',
  source: {
    name: 'THE ROAD BACK — Muscle & Fitness / Flex + Fitness Volt named exercises',
    url: 'https://www.muscleandfitness.com/flexonline/training/road-back/',
  },
  exercises: [
    slot('barbell-bench-press', 5, '10-12'),
    slot('dumbbell-bench-press', 5, '10-12'),
    slot('cable-crossover', 5, '10-12'),
    slot('military-press', 5, '10-12'),
    slot('dumbbell-shoulder-press', 5, '10-12'),
    slot('dumbbell-lateral-raise', 5, '10-12'),
    slot('triceps-pushdown', 5, '10-12'),
    slot('one-arm-triceps-pushdown', 5, '10-12'),
    slot('lying-triceps-extension', 5, '10-12', 'DB French press / skull-crusher pattern.'),
  ],
});

addRoutine({
  id: 'vince-taylor-pull',
  name: 'Vince Taylor — Pull (Back / Biceps / Traps)',
  day: 'Tuesday / Friday',
  styleId: 'vince-taylor',
  focus: ['back', 'lats', 'biceps', 'traps'],
  description:
    'Pull day of the push-pull system. Biceps explicitly capped at moderate weight, max 5×10–12 (his own words: heavier is overtraining).',
  source: {
    name: 'THE ROAD BACK — Muscle & Fitness / Flex + Fitness Volt named exercises',
    url: 'https://www.muscleandfitness.com/flexonline/training/road-back/',
  },
  exercises: [
    slot('t-bar-row', 5, '10-12'),
    slot('seated-cable-row', 5, '10-12'),
    slot('lat-pulldown', 5, '10-12'),
    slot('barbell-shrug', 5, '10-12'),
    slot('cable-biceps-curl', 5, '10-12', 'Moderate weight only — his biceps cap.'),
    slot('alternating-dumbbell-curl', 5, '10-12'),
  ],
});

addRoutine({
  id: 'vince-taylor-legs',
  name: 'Vince Taylor — Legs & Abs',
  day: 'Wednesday / Saturday',
  styleId: 'vince-taylor',
  focus: ['quads', 'calves', 'abs'],
  description:
    'Second push block = legs/abs. He avoided back squats after a knee injury (quoted); prefers leg press and front squats.',
  source: {
    name: 'THE ROAD BACK — Muscle & Fitness / Flex + Fitness Volt named exercises',
    url: 'https://www.muscleandfitness.com/flexonline/training/road-back/',
  },
  exercises: [
    slot('leg-press', 5, '10-12'),
    slot('front-squat', 5, '10-12', 'Preferred over back squat post knee injury.'),
    slot('leg-extension', 5, '10-12'),
    slot('standing-calf-raise', 5, '12-20'),
    slot('seated-calf-raise', 5, '12-20'),
    slot('decline-crunch', 5, '15-25'),
    slot('leg-raise-parallel-bars', 5, '12-20'),
  ],
});

setSplit('vince-taylor', [
  { day: 'Monday / Thursday', focus: 'Push: chest, shoulders, triceps' },
  { day: 'Tuesday / Friday', focus: 'Pull: back, biceps, traps' },
  { day: 'Wednesday / Saturday', focus: 'Legs & abs' },
]);

// ============================================================================
// BEV FRANCIS — shoulders Tier B + complete week from powerbuilding pattern
// ============================================================================
addRoutine({
  id: 'bev-francis-shoulders',
  name: 'Bev Francis — Shoulders',
  day: 'Shoulders',
  styleId: 'bev-francis',
  focus: ['shoulders', 'rear-delts'],
  description:
    'Direct Flex 1991 first-person shoulder program: 5 press sets across 4 press variations, 6 side-lateral sets across 3 variations, 4 rear-lateral sets across 3 variations. Little/no front-delt isolation — bench covers fronts.',
  source: {
    name: 'A Balanced Approach for Dynamite Delts — Bev Francis, Flex 1991',
    url: 'https://physicalculturestudy.com/2017/07/22/bev-francis-a-balanced-approach-for-dynamite-delts-1991/',
  },
  exercises: [
    slot('smith-machine-shoulder-press', 2, '8-12', 'Machine/Smith press — part of 5 total press sets.'),
    slot('military-press', 1, '6-10', 'Barbell press — Olympic-lifter style (lean forward at lockout).'),
    slot('dumbbell-shoulder-press', 1, '10-15', 'Higher reps, strict control.'),
    slot('military-press', 1, '6-10', 'Occasional behind-neck press — use caution; she notes joint stress.'),
    slot('dumbbell-lateral-raise', 2, '10-15'),
    slot('one-arm-cable-lateral-raise', 2, '10-15', 'Cross-body cable lateral.'),
    slot('lateral-raise-machine', 2, '10-15'),
    slot('face-pull', 2, '12-15', 'Standing rear-delt cable / reverse lateral.'),
    slot('bent-over-lateral-raise', 2, '12-15'),
  ],
});

addRoutine({
  id: 'bev-francis-legs',
  name: 'Bev Francis — Legs',
  day: 'Legs',
  styleId: 'bev-francis',
  focus: ['quads', 'hamstrings', 'glutes'],
  description:
    'Complete leg day using her powerlifting-to-bodybuilding pattern: heavy compounds first (4–5×4–6), then accessories (3–4×8–12). Exercise list matches secondary career profiles; loading scheme follows her own stated compound/accessory rule.',
  source: {
    name: 'Bev Francis training principles — Flex 1991 + powerlifting/bodybuilding career profiles',
    url: 'https://physicalculturestudy.com/2017/07/22/bev-francis-a-balanced-approach-for-dynamite-delts-1991/',
  },
  exercises: [
    slot('barbell-squat', 5, '4-6'),
    slot('hack-squat', 4, '6-10'),
    slot('leg-press', 4, '8-12'),
    slot('walking-lunge', 3, '8-12'),
    slot('lying-leg-curl', 4, '8-12'),
    slot('stiff-leg-deadlift', 3, '8-12'),
    slot('standing-calf-raise', 4, '10-15'),
  ],
});

addRoutine({
  id: 'bev-francis-back',
  name: 'Bev Francis — Back',
  day: 'Back',
  styleId: 'bev-francis',
  focus: ['back', 'lats'],
  description: 'Back day completing her one-bodypart-per-day competitive pattern.',
  source: {
    name: 'Bev Francis training principles — Flex 1991 + powerlifting/bodybuilding career profiles',
    url: 'https://physicalculturestudy.com/2017/07/22/bev-francis-a-balanced-approach-for-dynamite-delts-1991/',
  },
  exercises: [
    slot('deadlift', 5, '4-6'),
    slot('barbell-row', 4, '6-10'),
    slot('pull-up', 4, '6-12'),
    slot('lat-pulldown', 3, '8-12'),
    slot('seated-cable-row', 3, '8-12'),
  ],
});

addRoutine({
  id: 'bev-francis-chest',
  name: 'Bev Francis — Chest',
  day: 'Chest',
  styleId: 'bev-francis',
  focus: ['chest', 'triceps'],
  description:
    'Chest day. Bench also serves as her only intentional front-delt work (her own words from the 1991 Flex feature).',
  source: {
    name: 'Bev Francis training principles — Flex 1991 + powerlifting/bodybuilding career profiles',
    url: 'https://physicalculturestudy.com/2017/07/22/bev-francis-a-balanced-approach-for-dynamite-delts-1991/',
  },
  exercises: [
    slot('barbell-bench-press', 5, '4-6'),
    slot('incline-barbell-press', 4, '6-10'),
    slot('weighted-triceps-dip', 4, '6-12'),
    slot('incline-dumbbell-flye', 3, '8-12'),
    slot('cable-crossover', 3, '10-15'),
  ],
});

addRoutine({
  id: 'bev-francis-arms',
  name: 'Bev Francis — Arms',
  day: 'Arms',
  styleId: 'bev-francis',
  focus: ['biceps', 'triceps'],
  description: 'Arms day completing the competitive one-bodypart-per-day week.',
  source: {
    name: 'Bev Francis training principles — Flex 1991 + powerlifting/bodybuilding career profiles',
    url: 'https://physicalculturestudy.com/2017/07/22/bev-francis-a-balanced-approach-for-dynamite-delts-1991/',
  },
  exercises: [
    slot('close-grip-bench-press', 4, '6-10'),
    slot('triceps-pushdown', 4, '8-12'),
    slot('lying-triceps-extension', 3, '8-12'),
    slot('barbell-curl', 4, '6-10'),
    slot('preacher-curl-barbell', 3, '8-12'),
    slot('alternating-dumbbell-curl', 3, '8-12'),
  ],
});

setSplit('bev-francis', [
  { day: 'Day 1', focus: 'Legs' },
  { day: 'Day 2', focus: 'Back' },
  { day: 'Day 3', focus: 'Chest' },
  { day: 'Day 4', focus: 'Shoulders (Flex 1991 first-person program)' },
  { day: 'Day 5', focus: 'Arms' },
  { day: 'Day 6-7', focus: 'Rest / recovery (she emphasizes not overtraining shoulders)' },
]);

// ============================================================================
// KIM CHIZEVSKY — complete competitive reconstruction from attested parameters
// ============================================================================
addRoutine({
  id: 'kim-chizevsky-legs',
  name: 'Kim Chizevsky — Legs (competitive era)',
  day: 'Legs',
  styleId: 'kim-chizevsky',
  focus: ['quads', 'hamstrings', 'calves'],
  description:
    'Competitive-era leg session reconstructed from attested parameters: twice-daily ~90-minute high-intensity training comparable to top male pros (bodybuildingfanatic), plus Chad Nicholls\'s verified note that two weeks out she still squatted 335×20. No full Flex table was found online — this is an honest reconstruction, not a lost magazine reprint.',
  source: {
    name: 'Chad Nicholls on Kim Chizevsky squat strength — Muscle & Fitness',
    url: 'https://www.muscleandfitness.com/burn-fat-fast/top-6-common-myths-about-fat-loss/',
  },
  labels: ['Complete split', 'Reconstructed from attested parameters'],
  exercises: [
    slot('leg-extension', 4, '12-20'),
    slot('barbell-squat', 5, '8-20', 'Includes capacity for 335×20 two weeks out (Chad Nicholls / M&F).'),
    slot('hack-squat', 4, '10-15'),
    slot('leg-press', 4, '12-20'),
    slot('lying-leg-curl', 4, '10-15'),
    slot('stiff-leg-deadlift', 3, '10-15'),
    slot('standing-calf-raise', 5, '12-20'),
  ],
});

addRoutine({
  id: 'kim-chizevsky-chest-tris',
  name: 'Kim Chizevsky — Chest & Triceps',
  day: 'Chest / triceps',
  styleId: 'kim-chizevsky',
  focus: ['chest', 'triceps'],
  description:
    'Competitive-era upper push session under the same twice-daily high-intensity parameters. Reconstruction — no published Flex table found.',
  source: {
    name: 'Kim Chizevsky career training notes — bodybuildingfanatic + M&F interviews',
    url: 'https://www.muscleandfitness.com/athletes-celebrities/interviews/kim-chizevsky-nicholls-reminisces-on-her-olympia-winning-career/',
  },
  labels: ['Complete split', 'Reconstructed from attested parameters'],
  exercises: [
    slot('incline-barbell-press', 4, '8-12'),
    slot('barbell-bench-press', 4, '8-12'),
    slot('incline-dumbbell-flye', 3, '10-15'),
    slot('cable-crossover', 3, '12-15'),
    slot('close-grip-bench-press', 4, '8-12'),
    slot('triceps-pushdown', 4, '10-15'),
    slot('overhead-triceps-extension-cable', 3, '10-15'),
  ],
});

addRoutine({
  id: 'kim-chizevsky-back-bis',
  name: 'Kim Chizevsky — Back & Biceps',
  day: 'Back / biceps',
  styleId: 'kim-chizevsky',
  focus: ['back', 'lats', 'biceps'],
  description: 'Competitive-era pull session under the same attested high-intensity parameters.',
  source: {
    name: 'Kim Chizevsky career training notes — bodybuildingfanatic + M&F interviews',
    url: 'https://www.muscleandfitness.com/athletes-celebrities/interviews/kim-chizevsky-nicholls-reminisces-on-her-olympia-winning-career/',
  },
  labels: ['Complete split', 'Reconstructed from attested parameters'],
  exercises: [
    slot('pull-up', 4, '6-12'),
    slot('lat-pulldown', 4, '8-12'),
    slot('barbell-row', 4, '8-12'),
    slot('t-bar-row', 3, '8-12'),
    slot('seated-cable-row', 3, '10-12'),
    slot('deadlift', 3, '6-10'),
    slot('barbell-curl', 4, '8-12'),
    slot('alternating-dumbbell-curl', 3, '10-12'),
  ],
});

addRoutine({
  id: 'kim-chizevsky-shoulders',
  name: 'Kim Chizevsky — Shoulders',
  day: 'Shoulders',
  styleId: 'kim-chizevsky',
  focus: ['shoulders', 'rear-delts', 'traps'],
  description: 'Competitive-era shoulder session under the same attested high-intensity parameters.',
  source: {
    name: 'Kim Chizevsky career training notes — bodybuildingfanatic + M&F interviews',
    url: 'https://www.muscleandfitness.com/athletes-celebrities/interviews/kim-chizevsky-nicholls-reminisces-on-her-olympia-winning-career/',
  },
  labels: ['Complete split', 'Reconstructed from attested parameters'],
  exercises: [
    slot('military-press', 4, '8-12'),
    slot('dumbbell-shoulder-press', 3, '10-15'),
    slot('dumbbell-lateral-raise', 4, '12-15'),
    slot('bent-over-lateral-raise', 4, '12-15'),
    slot('upright-row', 3, '10-12'),
    slot('barbell-shrug', 4, '10-15'),
  ],
});

setSplit('kim-chizevsky', [
  { day: 'AM / PM blocks', focus: '~90 minutes twice daily during competitive peak (attested)' },
  { day: 'Legs', focus: 'Heavy compounds including attested 335×20 squat capacity near show' },
  { day: 'Chest / triceps', focus: 'Push emphasis' },
  { day: 'Back / biceps', focus: 'Pull emphasis' },
  { day: 'Shoulders', focus: 'Delts & traps' },
]);

setSplit('casey-viator', [
  { day: 'Full body (3×/week)', focus: 'Iron Man 1971 program — primary complete reference' },
  { day: 'Colorado Experiment', focus: '14 alternating Nautilus sessions over 28 days (sample Routine #7 included)' },
]);

// Sources
ensureSource(
  'casey-viator',
  "Casey Viator's Training — Iron Man Oct 1971 (via caseyviator.com)",
  'http://www.caseyviator.com/flexarticle.pdf',
);
ensureSource(
  'serge-nubret',
  'Serge Nubret Pump Training — T-Nation',
  'https://archive.t-nation.com/training/serge-nubret-pump-training/',
);
ensureSource(
  'bev-francis',
  'A Balanced Approach for Dynamite Delts — Bev Francis, Flex 1991',
  'https://physicalculturestudy.com/2017/07/22/bev-francis-a-balanced-approach-for-dynamite-delts-1991/',
);
ensureSource(
  'kim-chizevsky',
  'Chad Nicholls on Kim Chizevsky squat strength — Muscle & Fitness',
  'https://www.muscleandfitness.com/burn-fat-fast/top-6-common-myths-about-fat-loss/',
);
ensureSource(
  'dennis-wolf',
  'Dennis Wolf: Mass with Class — Muscle & Fitness / Flex',
  'https://www.muscleandfitness.com/flexonline/training/dennis-wolf-mass-class/',
);
ensureSource(
  'vince-taylor',
  'THE ROAD BACK — Muscle & Fitness / Flex',
  'https://www.muscleandfitness.com/flexonline/training/road-back/',
);

fs.writeFileSync('src/data/exercises.json', JSON.stringify(exercises, null, 2) + '\n');
fs.writeFileSync('src/data/routines.json', JSON.stringify(routines, null, 2) + '\n');
fs.writeFileSync('src/data/styles.json', JSON.stringify(styles, null, 2) + '\n');

const b = JSON.parse(fs.readFileSync('src/data/bodybuilders.json', 'utf8'));
const by = {};
for (const x of routines) {
  if (x.collection === 'legend' && x.styleId) by[x.styleId] = (by[x.styleId] || 0) + 1;
}
const missing = b.filter((bb) => !(by[bb.styleId] > 0));
console.log('\nCoverage:', b.filter((bb) => by[bb.styleId] > 0).length, '/', b.length);
if (missing.length) console.log('STILL MISSING:', missing.map((x) => x.name).join(', '));
console.log(
  'Legend routines:',
  routines.filter((r) => r.collection === 'legend').length,
);
