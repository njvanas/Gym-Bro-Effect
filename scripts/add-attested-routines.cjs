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
  id: 'machine-preacher-curl',
  name: 'Machine Preacher Curl',
  aliases: ['Preacher Curl Machine'],
  primaryMuscle: 'biceps',
  secondaryMuscles: [],
  equipment: 'machine',
  category: 'isolation',
  cues: ['Elbows fixed on pad', 'Full stretch at bottom', 'Squeeze at top'],
});
addExercise({
  id: 'triceps-kickback',
  name: 'Triceps Kickback',
  aliases: ['Dumbbell Kickback'],
  primaryMuscle: 'triceps',
  secondaryMuscles: [],
  equipment: 'dumbbell',
  category: 'isolation',
  cues: ['Upper arm parallel to floor', 'Extend only at the elbow', 'Pause at lockout'],
});
addExercise({
  id: 'hip-abductor-machine',
  name: 'Hip Abductor Machine',
  aliases: ['Seated Abductor', 'Abduction Machine'],
  primaryMuscle: 'glutes',
  secondaryMuscles: [],
  equipment: 'machine',
  category: 'isolation',
  cues: ['Sit upright', 'Drive knees outward', 'Control the return'],
});
addExercise({
  id: 'machine-shrug',
  name: 'Machine Shrug',
  aliases: ['Shrug Machine'],
  primaryMuscle: 'traps',
  secondaryMuscles: [],
  equipment: 'machine',
  category: 'isolation',
  cues: ['Pull shoulders straight up', 'Pause at top', 'No rolling'],
});
addExercise({
  id: 'stiff-leg-deadlift',
  name: 'Stiff-Leg Deadlift',
  aliases: ['Stiff-Legged Deadlift', 'SLDL'],
  primaryMuscle: 'hamstrings',
  secondaryMuscles: ['glutes', 'lower-back'],
  equipment: 'barbell',
  category: 'compound',
  cues: ['Soft knees', 'Hinge at hips', 'Feel stretch in hamstrings'],
});
addExercise({
  id: 'machine-squat',
  name: 'Machine Squat',
  aliases: ['Super Squat', 'Mechanical Squat'],
  primaryMuscle: 'quads',
  secondaryMuscles: ['glutes'],
  equipment: 'machine',
  category: 'compound',
  cues: ['Back against pad', 'To about parallel', 'Stop short of lockout'],
});

function ws(n, intensity) {
  return Array.from({ length: n }, (_, i) => ({
    label: String(i + 1),
    kind: 'working',
    intensity,
  }));
}

function slot(exerciseId, sets, repRange, notes, scheme) {
  const s = scheme || ws(sets, `${repRange}`);
  const out = { exerciseId, sets, repRange, setScheme: s };
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
    console.log('skip existing', r.id);
    return;
  }
  for (const ex of r.exercises) {
    if (!exIds.has(ex.exerciseId)) {
      throw new Error(`Missing exercise ${ex.exerciseId} in ${r.id}`);
    }
  }
  if (!r.sortOrder) r.sortOrder = maxSort(r.styleId) + 1;
  if (!r.collection) r.collection = 'legend';
  if (!r.labels) r.labels = ['Attested session'];
  routines.push(r);
  console.log('added', r.id);
}

addRoutine({
  id: 'iris-kyle-back',
  name: 'Iris Kyle — Back',
  day: 'Back day',
  styleId: 'iris-kyle',
  focus: ['back', 'lats'],
  description:
    'Published Iris Kyle back routine from Flex/Muscle & Fitness "Ms. Olympia\'s Back" (2009). She always warms up with pull-ups, then sequences the remaining work by feel; T-bar rows are optional if more work is needed.',
  source: {
    name: "Ms. Olympia's Back — Muscle & Fitness / Flex (2009)",
    url: 'https://www.muscleandfitness.com/flexonline/training/ms-olympia-s-back/',
  },
  exercises: [
    slot('pull-up', 1, 'warmup', 'Fixed warm-up before working sets (her own words).', [
      { label: 'W1', kind: 'warmup', intensity: 'Pull-up warm-up — not counted as a working set' },
    ]),
    slot('lat-pulldown', 4, '10-12', 'Front pulldowns in the published table.'),
    slot('seated-cable-row', 4, '10-12', 'Low cable rows.'),
    slot('one-arm-dumbbell-row', 4, '10-12'),
    slot('deadlift', 4, '15-10', 'Descending pyramid across 4 sets.'),
    slot('t-bar-row', 4, '10-12', 'Optional fifth exercise if she still feels work is needed.'),
  ],
});

addRoutine({
  id: 'lou-ferrigno-maintenance',
  name: 'Lou Ferrigno — Current Maintenance',
  day: 'Current maintenance session',
  styleId: 'lou-ferrigno',
  focus: ['chest', 'biceps', 'triceps', 'cardio'],
  description:
    "Lou Ferrigno's current (septuagenarian) machine/isolation maintenance session as published by Men's Health — explicitly not a reconstruction of his 1970s competitive program.",
  source: {
    name: "Lou Ferrigno's No-Distraction Hulk Workout — Men's Health",
    url: 'https://www.menshealth.com/fitness/a36756282/lou-ferrigno-workout-training/',
  },
  exercises: [
    slot('treadmill', 1, '10 min', 'Warm-up walk/jog before working sets.', [
      { label: 'W1', kind: 'warmup', intensity: '10-minute treadmill' },
    ]),
    slot('chest-press-machine', 3, '12'),
    slot('machine-preacher-curl', 3, '12'),
    slot('alternating-dumbbell-curl', 3, '8-10', 'Per arm.'),
    slot('triceps-kickback', 3, '8-10', 'Per arm.'),
  ],
});

addRoutine({
  id: 'shawn-rhoden-legs-2018',
  name: 'Shawn Rhoden — Olympia Prep Legs (2018)',
  day: 'Leg day (2018 Olympia prep)',
  styleId: 'shawn-rhoden',
  focus: ['quads', 'hamstrings'],
  description:
    'Filmed 2018 Mr. Olympia prep leg day under coach Chris Lewis (Muscle & Strength). Squat pattern varied weekly (back squat vs Smith); catalog uses barbell squat with that caveat.',
  source: {
    name: "Shawn 'Flexatron' Rhoden's Heavy Olympia Prep Leg Workout — Muscle & Strength",
    url: 'https://www.muscleandstrength.com/videos/shawn-rhoden-leg-day-workout',
  },
  exercises: [
    slot('leg-extension', 3, 'drop sets', 'Drop sets / extended TUT pre-exhaust.', [
      { label: '1', kind: 'working', intensity: 'Drop-set pre-exhaust' },
      { label: '2', kind: 'working', intensity: 'Drop-set pre-exhaust' },
      { label: '3', kind: 'working', intensity: 'Drop-set pre-exhaust' },
    ]),
    slot(
      'barbell-squat',
      4,
      '6-8',
      'Squat pattern varied weekly (back squat one week, Smith the next).',
    ),
    slot('front-squat', 4, '8-10', 'Machine front squat in the filmed session — mapped to front squat.'),
    slot('leg-press', 4, '10-12'),
    slot('standing-leg-curl', 3, '8-10'),
  ],
});

addRoutine({
  id: 'big-ramy-quads',
  name: 'Big Ramy — Quads',
  day: 'Quad day',
  styleId: 'big-ramy',
  focus: ['quads'],
  description:
    'Sample quad routine from Flex/Muscle & Fitness "Big Ramy\'s Legendary Legs," built around his stated exercise order and published sets/reps table.',
  source: {
    name: "Big Ramy's Legendary Legs — Muscle & Fitness / Flex",
    url: 'https://www.muscleandfitness.com/flexonline/training/big-ramys-legendary-legs/',
  },
  exercises: [
    slot(
      'leg-extension',
      3,
      '20-25',
      'Working warm-up / pre-exhaust; he sometimes uses 2×50 or 4×15 instead.',
    ),
    slot('barbell-squat', 4, '10-15', 'Wide stance, toes out; typically near-constant tension.'),
    slot('leg-press', 4, '15-25', 'Feet low on platform for more quad emphasis.'),
    slot('machine-squat', 4, '10-15', 'Super squat / mechanical squat machine — back against pad.'),
  ],
});

addRoutine({
  id: 'nasser-el-sonbaty-quads',
  name: 'Nasser El Sonbaty — Quads & Glutes',
  day: 'Quads & glutes',
  styleId: 'nasser-el-sonbaty',
  focus: ['quads', 'glutes'],
  description:
    'Published "Nasser\'s Quad & Glute Workout" from Muscle & Fitness (Kathleen Engel, 2002), reproduced by Physical Culture Study. He stressed that order/sets/rest change session to session — this is the sample table from that feature.',
  source: {
    name: 'Put Size on Your Thighs with Nasser El Sonbaty — Muscle & Fitness 63:6 (2002)',
    url: 'https://physicalculturestudy.com/2023/06/14/kathleen-engel-put-size-on-your-thighs-with-nasser-el-sonbaty-muscle-fitness-63-6-2002-134-138-2/',
  },
  exercises: [
    slot('leg-extension', 4, '20, 15, 10, 6-10'),
    slot('barbell-squat', 5, '15, 12-15, 12, 8-10, 6-8'),
    slot('hack-squat', 4, '20, 15, 10, 6-10'),
    slot('leg-press', 4, '20, 15, 10, 6-10'),
    slot('hip-abductor-machine', 5, '50-20', 'Precontest glute focus; high-rep outward squeeze.'),
  ],
});

addRoutine({
  id: 'nasser-el-sonbaty-hams',
  name: 'Nasser El Sonbaty — Hamstrings',
  day: 'Hamstrings',
  styleId: 'nasser-el-sonbaty',
  focus: ['hamstrings'],
  description:
    'Published "Nasser\'s Hamstring Workout" from the same 2002 Muscle & Fitness feature. Standing unilateral curl may be swapped for high-foot leg press.',
  source: {
    name: 'Put Size on Your Thighs with Nasser El Sonbaty — Muscle & Fitness 63:6 (2002)',
    url: 'https://physicalculturestudy.com/2023/06/14/kathleen-engel-put-size-on-your-thighs-with-nasser-el-sonbaty-muscle-fitness-63-6-2002-134-138-2/',
  },
  exercises: [
    slot('lying-leg-curl', 5, '20, 15, 10, 5-10, 6-8'),
    slot('stiff-leg-deadlift', 4, '20, 15, 12-15, 10'),
    slot(
      'standing-leg-curl',
      3,
      '20, 15, 6-10',
      'Unilateral; or leg press with feet high pushing through heels.',
    ),
  ],
});

addRoutine({
  id: 'nasser-el-sonbaty-calves',
  name: 'Nasser El Sonbaty — Calves',
  day: 'Calves',
  styleId: 'nasser-el-sonbaty',
  focus: ['calves'],
  description: 'Published calf sample from the 2002 Muscle & Fitness Nasser feature.',
  source: {
    name: 'Put Size on Your Thighs with Nasser El Sonbaty — Muscle & Fitness 63:6 (2002)',
    url: 'https://physicalculturestudy.com/2023/06/14/kathleen-engel-put-size-on-your-thighs-with-nasser-el-sonbaty-muscle-fitness-63-6-2002-134-138-2/',
  },
  exercises: [
    slot('standing-calf-raise', 5, '20-25 → 6-10', 'Pyramid; final set often back up to 15-20.'),
    slot('seated-calf-raise', 4, '20, 15, 10-15, 6-10'),
  ],
});

addRoutine({
  id: 'shawn-ray-legs',
  name: 'Shawn Ray — Legs',
  day: 'Leg day',
  styleId: 'shawn-ray',
  focus: ['quads', 'hamstrings'],
  description:
    'Published "Ray\'s Legs" routine from Muscle & Fitness. He emphasized constant variety in order and machines; this is the sample table from that feature.',
  source: {
    name: "Ray's Legs — Muscle & Fitness",
    url: 'https://www.muscleandfitness.com/uncategorized/rays-legs/',
  },
  exercises: [
    slot(
      'leg-extension',
      4,
      '15',
      'One-leg extensions in the published table — catalog uses bilateral machine with unilateral note.',
    ),
    slot('barbell-squat', 5, '12-6', 'Descending pyramid.'),
    slot('leg-press', 4, '8-12'),
    slot('leg-extension', 4, '10-12', 'Two-leg extensions as a second extension block.'),
    slot('standing-leg-curl', 4, '12-15'),
    slot('lying-leg-curl', 4, '12-15'),
    slot('stiff-leg-deadlift', 4, '12-15'),
  ],
});

addRoutine({
  id: 'tom-platz-legs-1981',
  name: 'Tom Platz — 1981 Olympia Prep Legs',
  day: 'Leg day (1981)',
  styleId: 'tom-platz',
  focus: ['quads', 'hamstrings', 'calves'],
  description:
    'Platz\'s 1981 prep leg routine as published by Flex/Muscle & Fitness ("Hardcore Contender"). Final sets of extensions/curls were often extended with drop sets and partials beyond the listed rep totals.',
  source: {
    name: 'Hardcore Contender — Tom Platz — Muscle & Fitness / Flex',
    url: 'https://www.muscleandfitness.com/flexonline/training/hardcore-contender-tom-platz/',
  },
  exercises: [
    slot(
      'barbell-squat',
      10,
      '20-8',
      '8-10 sets pyramided; catalog uses 10 sets as the top of the published range.',
      ws(10, '20-8 pyramid'),
    ),
    slot('hack-squat', 5, '10-15'),
    slot(
      'leg-extension',
      8,
      '10-15',
      '5-8 sets published; final sets often drop/partials. Catalog uses top of range.',
      ws(8, '10-15'),
    ),
    slot(
      'lying-leg-curl',
      10,
      '10-15',
      '6-10 sets published; catalog uses top of range.',
      ws(10, '10-15'),
    ),
    slot('standing-calf-raise', 4, '10-15'),
    slot('seated-calf-raise', 4, '10-15'),
  ],
});

addRoutine({
  id: 'kai-greene-quads',
  name: 'Kai Greene — Quads (sample)',
  day: 'Quad day',
  styleId: 'kai-greene',
  focus: ['quads'],
  description:
    'Sample quad table from Flex/Muscle & Fitness "By Any Means Necessary." Greene trains instinctively and may stop a set early once the target feeling is reached — numbers are a published sample, not a rigid prescription.',
  source: {
    name: 'By Any Means Necessary — Muscle & Fitness / Flex',
    url: 'https://www.muscleandfitness.com/flexonline/training/any-means-necessary/',
  },
  exercises: [
    slot('leg-extension', 3, '15-20'),
    slot('barbell-squat', 3, '12-15'),
    slot('hack-squat', 3, '12-15'),
    slot('leg-press', 3, '15-20'),
  ],
});

addRoutine({
  id: 'markus-ruhl-traps',
  name: 'Markus Rühl — Traps',
  day: 'Traps (after delts)',
  styleId: 'markus-ruhl',
  focus: ['traps'],
  description:
    'Published traps sample from Flex/Muscle & Fitness "Markusaurus!": dumbbell shrugs and machine shrugs, trained after delts rather than with back.',
  source: {
    name: 'Markusaurus! — Muscle & Fitness / Flex',
    url: 'https://www.muscleandfitness.com/flexonline/training/markusaurus/',
  },
  exercises: [
    slot('dumbbell-shrug', 3, '10-12'),
    slot(
      'machine-shrug',
      3,
      '10-12',
      'Prefers parallel-handle machine over barbell for a straighter pull.',
    ),
  ],
});

addRoutine({
  id: 'reg-park-phase-1',
  name: 'Reg Park — Phase 1 (5×5)',
  day: 'Phase 1 (~3 months)',
  styleId: 'reg-park',
  focus: ['quads', 'chest', 'back', 'lower-back'],
  description:
    'Phase 1 of Strength and Bulk Training (1960), as consistently reconstructed across multiple independent secondary sources (T-Nation, Breaking Muscle, GymTalk). 3 days/week. Each core lift: 2 progressive warm-up sets of 5 + 3 working sets of 5.',
  source: {
    name: 'Strength and Bulk Training — Reg Park (1960) — secondary reconstructions',
    url: 'https://superstrengthtraining.com/strength-and-bulk-training-reg-park',
  },
  exercises: [
    slot('back-extension', 3, '10', '45° hyperextension / prone back extension.'),
    slot('barbell-squat', 5, '5', '2 warm-up + 3 working at one weight; 3-5 min rest on working sets.', [
      { label: 'W1', kind: 'warmup', intensity: 'Progressive warm-up ×5' },
      { label: 'W2', kind: 'warmup', intensity: 'Heavier warm-up ×5' },
      { label: '1', kind: 'working', intensity: 'Working weight ×5' },
      { label: '2', kind: 'working', intensity: 'Working weight ×5' },
      { label: '3', kind: 'working', intensity: 'Working weight ×5' },
    ]),
    slot('barbell-bench-press', 5, '5', 'Same 2+3×5 scheme.', [
      { label: 'W1', kind: 'warmup', intensity: 'Progressive warm-up ×5' },
      { label: 'W2', kind: 'warmup', intensity: 'Heavier warm-up ×5' },
      { label: '1', kind: 'working', intensity: 'Working weight ×5' },
      { label: '2', kind: 'working', intensity: 'Working weight ×5' },
      { label: '3', kind: 'working', intensity: 'Working weight ×5' },
    ]),
    slot('deadlift', 5, '5', 'Same 2+3×5 scheme.', [
      { label: 'W1', kind: 'warmup', intensity: 'Progressive warm-up ×5' },
      { label: 'W2', kind: 'warmup', intensity: 'Heavier warm-up ×5' },
      { label: '1', kind: 'working', intensity: 'Working weight ×5' },
      { label: '2', kind: 'working', intensity: 'Working weight ×5' },
      { label: '3', kind: 'working', intensity: 'Working weight ×5' },
    ]),
  ],
});

addRoutine({
  id: 'reg-park-phase-2',
  name: 'Reg Park — Phase 2 (5×5)',
  day: 'Phase 2 (~3 months)',
  styleId: 'reg-park',
  focus: ['quads', 'chest', 'shoulders', 'back', 'calves', 'lower-back'],
  description:
    'Phase 2 additions as consistently reconstructed across the same secondary sources: front squat, military press, high pull, and high-rep calves, still 3×/week with shorter rest (~2 min).',
  source: {
    name: 'Strength and Bulk Training — Reg Park (1960) — secondary reconstructions',
    url: 'https://superstrengthtraining.com/strength-and-bulk-training-reg-park',
  },
  exercises: [
    slot('back-extension', 4, '10'),
    slot('front-squat', 5, '5'),
    slot('barbell-squat', 5, '5'),
    slot('barbell-bench-press', 5, '5'),
    slot('military-press', 5, '5'),
    slot(
      'upright-row',
      5,
      '5',
      'High pull mapped to upright row — closest catalog match; not a power clean.',
    ),
    slot('deadlift', 5, '5'),
    slot('standing-calf-raise', 5, '25'),
  ],
});

addRoutine({
  id: 'victor-martinez-day1',
  name: 'Victor Martinez — Day 1 Shoulders / Triceps / Abs',
  day: 'Day 1',
  styleId: 'victor-martinez',
  focus: ['shoulders', 'triceps', 'abs', 'traps'],
  description:
    'Current-era Day 1 from Muscle Insider "Relentless" (2015). Exact set counts are not fully itemized for every lift; working loads/reps are as published. Catalog uses 3 working sets where only top-set loads were stated.',
  source: {
    name: 'Victor Martinez – Relentless — Muscle Insider',
    url: 'https://muscleinsider.com/magazine_feature/victor-martinez-relentess/',
  },
  exercises: [
    slot('military-press', 3, '10', 'Barbell shoulder press working up to 225×10.'),
    slot('barbell-shrug', 3, '8-12', 'Shrugs with 315 noted.'),
    slot('dumbbell-lateral-raise', 3, '10-12', 'Up to 50-lb dumbbells.'),
    slot('triceps-pushdown', 3, '10-12', 'Pushdowns with ~140 lb noted.'),
    slot(
      'close-grip-bench-press',
      3,
      '15',
      'Close-grip on Smith with 275×15 noted — mapped to close-grip bench.',
    ),
    slot(
      'leg-raise-parallel-bars',
      1,
      '5-8 min circuit',
      'Abs: leg raises, decline sit-ups, cable crunches, weighted twists — nonstop 5-8 minutes.',
      [{ label: '1', kind: 'working', intensity: '5-8 min nonstop ab circuit' }],
    ),
  ],
});

addRoutine({
  id: 'victor-martinez-day2',
  name: 'Victor Martinez — Day 2 Legs',
  day: 'Day 2',
  styleId: 'victor-martinez',
  focus: ['quads', 'hamstrings', 'calves'],
  description: 'Day 2 quads/hamstrings/calves from the same Muscle Insider feature.',
  source: {
    name: 'Victor Martinez – Relentless — Muscle Insider',
    url: 'https://muscleinsider.com/magazine_feature/victor-martinez-relentess/',
  },
  exercises: [
    slot('leg-extension', 3, '10-15', 'Pre-exhaust before squats.'),
    slot('barbell-squat', 3, '8-10', 'Up to 405×8-10 then drop to 225 to failure.', [
      { label: '1', kind: 'working', intensity: 'Build-up' },
      { label: '2', kind: 'working', intensity: 'Heavy ~405×8-10' },
      { label: '3', kind: 'failure', intensity: 'Drop set ~225 to failure' },
    ]),
    slot('leg-press', 3, '8-10', 'Up to 11 plates/side.'),
    slot('lying-leg-curl', 3, '10-15', 'Dual- and single-leg machines noted.'),
    slot('stiff-leg-deadlift', 3, '10-12'),
    slot('standing-calf-raise', 4, '20-30', 'As heavy as possible, typically near full stack.'),
  ],
});

addRoutine({
  id: 'victor-martinez-day3',
  name: 'Victor Martinez — Day 3 Chest / Biceps / Forearms / Abs',
  day: 'Day 3',
  styleId: 'victor-martinez',
  focus: ['chest', 'biceps', 'forearms', 'abs'],
  description:
    'Day 3 from Muscle Insider; includes the published 4-set flat DB press and 3 decline/pullover supersets.',
  source: {
    name: 'Victor Martinez – Relentless — Muscle Insider',
    url: 'https://muscleinsider.com/magazine_feature/victor-martinez-relentess/',
  },
  exercises: [
    slot('incline-dumbbell-flye', 3, '10', 'Up to 70s×10.'),
    slot('incline-barbell-press', 3, '10', 'Working up to 225×10.'),
    slot('dumbbell-bench-press', 4, '8-12', 'Includes a drop set on the final effort.'),
    {
      exerciseId: 'decline-bench-press',
      sets: 3,
      repRange: '8-12',
      notes: 'Superset with dumbbell pullover.',
      supersetGroup: 'vm-chest-finisher',
      setScheme: ws(3, '8-12'),
    },
    {
      exerciseId: 'dumbbell-pullover',
      sets: 3,
      repRange: '8-12',
      notes: 'Superset with decline DB press (article: single DB pullovers).',
      supersetGroup: 'vm-chest-finisher',
      setScheme: ws(3, '8-12'),
    },
    slot('barbell-curl', 3, '8-12'),
    slot('incline-dumbbell-curl', 3, '8-12'),
    slot('preacher-curl-barbell', 3, '8-12'),
    slot(
      'leg-raise-parallel-bars',
      1,
      '5-8 min circuit',
      'Same ab circuit as Day 1.',
      [{ label: '1', kind: 'working', intensity: '5-8 min nonstop ab circuit' }],
    ),
  ],
});

addRoutine({
  id: 'victor-martinez-day4',
  name: 'Victor Martinez — Day 4 Back / Calves',
  day: 'Day 4',
  styleId: 'victor-martinez',
  focus: ['back', 'lats', 'calves'],
  description: 'Day 4 back/calves from Muscle Insider — completes the 4-on/1-off rotation.',
  source: {
    name: 'Victor Martinez – Relentless — Muscle Insider',
    url: 'https://muscleinsider.com/magazine_feature/victor-martinez-relentess/',
  },
  exercises: [
    slot('pull-up', 3, '8-12'),
    slot('lat-pulldown', 3, '8-12', 'Heavy lat pulldowns.'),
    slot('barbell-row', 3, '8-10', 'Working up to 275×8-10.'),
    slot('one-arm-dumbbell-row', 3, '8-12'),
    slot('seated-cable-row', 3, '8-12'),
    slot('deadlift', 4, '6-10', 'Controlled; emphasize squeeze and full ROM.'),
    slot('standing-calf-raise', 4, '15-25', 'Standing or seated, as heavy as possible.'),
  ],
});

addRoutine({
  id: 'hadi-choopan-legs-fst7',
  name: 'Hadi Choopan — FST-7 Legs (sample)',
  day: 'Leg day (FST-7 prep)',
  styleId: 'hadi-choopan',
  focus: ['quads', 'glutes'],
  description:
    "Sample FST-7-era leg session from Choopan's prep under Hany Rambod, matching contemporaneous BarBend coverage of his own YouTube uploads.",
  source: {
    name: "Hadi Choopan's Leg Training — BarBend (own YouTube session breakdown)",
    url: 'https://barbend.com/news/hadi-choopan-leg-training-10-weeks-from-2023-mr-olympia/',
  },
  exercises: [
    slot('leg-extension', 4, '8-15', 'Often unilateral variants for imbalance correction.'),
    slot('front-squat', 4, '8-12', 'Or Smith/front squat pattern depending on session.'),
    slot('leg-press', 4, '12-20', 'Vertical / heavy machine loading emphasized in filmed sessions.'),
    slot('walking-lunge', 4, '12-20'),
    slot('romanian-deadlift', 3, '12-20', 'Deadlift variations finish many filmed sessions.'),
  ],
});

addRoutine({
  id: 'brandon-curry-upper-touchup',
  name: 'Brandon Curry — Peak-Week Upper Touch-Up',
  day: 'Upper touch-up',
  styleId: 'brandon-curry',
  focus: ['back', 'chest', 'rear-delts'],
  description:
    'Exercise order from Brandon Curry All Access (final upper-body touch-up before 2025 Arnold Classic), via Fitness Volt. Exact set counts were not itemized in the writeup — 3 working sets per movement are a structure placeholder, not a Curry-stated set prescription.',
  source: {
    name: 'Brandon Curry Final Upper Body Touch Up — Fitness Volt (All Access video)',
    url: 'https://fitnessvolt.com/brandon-curry-peak-week-arnold-classic-2025-workout/',
  },
  labels: ['Attested exercise order', 'Sets not itemized'],
  exercises: [
    slot('machine-pullover', 3, '8-15', 'Nautilus pullover.'),
    slot('pec-deck', 3, '8-15'),
    slot('lat-pulldown', 3, '8-15', 'Crossbody underhand pulldowns mapped to lat pulldown.'),
    slot('cable-crossover', 3, '8-15', 'Single-cable fly mapped to cable crossover.'),
    slot('lat-pulldown', 3, '8-15', 'Stiff-arm single-hand pulldown — second pulldown block.'),
    slot('face-pull', 3, '10-15', 'Cable rear-delt pull mapped to face pull.'),
    slot('pull-up', 3, 'AMRAP'),
    slot('weighted-triceps-dip', 3, '8-15', 'Dips.'),
  ],
});

function ensureSource(styleId, title, url) {
  const st = styles.find((s) => s.id === styleId);
  if (!st) return;
  if (!st.sources) st.sources = [];
  if (st.sources.some((s) => s.url === url)) return;
  st.sources.push({ title, url });
}

ensureSource(
  'big-ramy',
  "Big Ramy's Legendary Legs — Muscle & Fitness / Flex",
  'https://www.muscleandfitness.com/flexonline/training/big-ramys-legendary-legs/',
);
ensureSource(
  'nasser-el-sonbaty',
  'Put Size on Your Thighs with Nasser El Sonbaty — Muscle & Fitness 63:6 (2002)',
  'https://physicalculturestudy.com/2023/06/14/kathleen-engel-put-size-on-your-thighs-with-nasser-el-sonbaty-muscle-fitness-63-6-2002-134-138-2/',
);
ensureSource(
  'kai-greene',
  'By Any Means Necessary — Muscle & Fitness / Flex',
  'https://www.muscleandfitness.com/flexonline/training/any-means-necessary/',
);
ensureSource(
  'shawn-ray',
  "Ray's Legs — Muscle & Fitness",
  'https://www.muscleandfitness.com/uncategorized/rays-legs/',
);
ensureSource(
  'tom-platz',
  'Hardcore Contender — Tom Platz — Muscle & Fitness / Flex',
  'https://www.muscleandfitness.com/flexonline/training/hardcore-contender-tom-platz/',
);

fs.writeFileSync('src/data/exercises.json', JSON.stringify(exercises, null, 2) + '\n');
fs.writeFileSync('src/data/routines.json', JSON.stringify(routines, null, 2) + '\n');
fs.writeFileSync('src/data/styles.json', JSON.stringify(styles, null, 2) + '\n');

const b = JSON.parse(fs.readFileSync('src/data/bodybuilders.json', 'utf8'));
const by = {};
for (const x of routines) {
  if (x.collection === 'legend' && x.styleId) by[x.styleId] = (by[x.styleId] || 0) + 1;
}
const withW = b.filter((bb) => (by[bb.styleId] || 0) > 0);
const noW = b.filter((bb) => (by[bb.styleId] || 0) === 0);
console.log('\nCoverage:', withW.length, '/', b.length, 'with workouts');
console.log('Still without:', noW.map((x) => x.name).join(', '));
console.log(
  'Legend routines:',
  routines.filter((r) => r.collection === 'legend').length,
);
