/**
 * Wave 1: fill full weekly programs for legends with Tier A/B (or attributed) tables.
 * Bar: full physique coverage (chest, back, shoulders, arms, legs) — not one signature day.
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
  id: 'dumbbell-flye',
  name: 'Dumbbell Flye',
  aliases: ['Flat Dumbbell Flye', 'DB Flye'],
  primaryMuscle: 'chest',
  secondaryMuscles: [],
  equipment: 'dumbbell',
  category: 'isolation',
  cues: ['Slight elbow bend', 'Wide arc', 'Squeeze at top'],
});
addExercise({
  id: 'bench-dip',
  name: 'Bench Dip',
  aliases: ['Dips Between Benches'],
  primaryMuscle: 'triceps',
  secondaryMuscles: ['chest', 'shoulders'],
  equipment: 'bodyweight',
  category: 'compound',
  cues: ['Hands on bench behind you', 'Lower until upper arms near parallel', 'Press up without shrugging'],
});
addExercise({
  id: 'hip-thrust',
  name: 'Hip Thrust',
  aliases: ['Barbell Hip Thrust', 'Glute Bridge Hip Thrust'],
  primaryMuscle: 'glutes',
  secondaryMuscles: ['hamstrings'],
  equipment: 'barbell',
  category: 'compound',
  cues: ['Upper back on bench', 'Drive through heels', 'Squeeze glutes at lockout'],
});
addExercise({
  id: 'push-up',
  name: 'Push-Up',
  aliases: ['Press-Up'],
  primaryMuscle: 'chest',
  secondaryMuscles: ['triceps', 'shoulders'],
  equipment: 'bodyweight',
  category: 'compound',
  cues: ['Body in a straight line', 'Chest to floor', 'Full lockout'],
});
addExercise({
  id: 'bulgarian-split-squat',
  name: 'Bulgarian Split Squat',
  aliases: ['Rear-Foot-Elevated Split Squat'],
  primaryMuscle: 'quads',
  secondaryMuscles: ['glutes', 'hamstrings'],
  equipment: 'dumbbell',
  category: 'compound',
  cues: ['Rear foot elevated', 'Front shin vertical', 'Control the descent'],
});
addExercise({
  id: 'seated-hamstring-curl',
  name: 'Seated Hamstring Curl',
  aliases: ['Seated Leg Curl'],
  primaryMuscle: 'hamstrings',
  secondaryMuscles: [],
  equipment: 'machine',
  category: 'isolation',
  cues: ['Pad on lower legs', 'Curl without lifting hips', 'Control the return'],
});
addExercise({
  id: 'cable-upright-row',
  name: 'Cable Upright Row',
  aliases: ['Cable EZ Upright Row'],
  primaryMuscle: 'shoulders',
  secondaryMuscles: ['traps'],
  equipment: 'cable',
  category: 'compound',
  cues: ['Pull to upper chest', 'Elbows lead', 'No excessive shrug'],
});
addExercise({
  id: 'incline-cable-flye',
  name: 'Incline Cable Flye',
  aliases: ['Low-to-High Cable Flye'],
  primaryMuscle: 'chest',
  secondaryMuscles: [],
  equipment: 'cable',
  category: 'isolation',
  cues: ['Slight incline path', 'Soft elbows', 'Squeeze at top'],
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

function patchRoutine(id, patch) {
  const r = routines.find((x) => x.id === id);
  if (!r) return;
  Object.assign(r, patch);
  console.log('patched', id);
}

// ============================================================================
// BRANCH WARREN — Pre-Olympia 5-day (Muscle & Strength, attributed)
// Existing: branch-warren-back (keep). Add remaining days.
// ============================================================================
const branchSrc = {
  name: "Branch Warren's Pre-Olympia Workout & Sample Diet Plan — Muscle & Strength",
  url: 'https://www.muscleandstrength.com/workouts/branch-warren-olympia-workout-diet-plan',
};

addRoutine({
  id: 'branch-warren-chest',
  name: 'Branch Warren — Chest',
  day: 'Tuesday',
  styleId: 'branch-warren',
  focus: ['chest'],
  description:
    'Tuesday chest from Branch Warren\'s attributed pre-Olympia 5-day split (Muscle & Strength). Drop set on the last dumbbell bench set; dips to failure.',
  source: branchSrc,
  exercises: [
    slot('incline-barbell-press', 5, '8-12', '2 warm-up + 3×8-12 working.'),
    slot('dumbbell-bench-press', 3, '10', 'Drop set on last set.'),
    slot('incline-machine-press', 3, '10', 'Hammer Strength incline mapped to incline machine press.'),
    slot('weighted-triceps-dip', 3, 'failure', 'Weighted dips with chains in the source.'),
    slot('cable-crossover', 3, '15'),
  ],
});

addRoutine({
  id: 'branch-warren-arms',
  name: 'Branch Warren — Arms',
  day: 'Thursday',
  styleId: 'branch-warren',
  focus: ['biceps', 'triceps'],
  description: 'Thursday arms from the same attributed pre-Olympia split.',
  source: branchSrc,
  exercises: [
    slot('alternating-dumbbell-curl', 3, '8', 'Standing dumbbell curl.'),
    slot('barbell-curl', 3, '12'),
    slot('preacher-curl-barbell', 3, '12'),
    slot('triceps-pushdown', 3, '15'),
    slot('weighted-triceps-dip', 3, '15', 'Seated dip machine mapped to weighted dip.'),
    slot('overhead-triceps-extension-cable', 4, '12', 'Rope triceps pushdown / overhead rope finish in the published table.'),
  ],
});

addRoutine({
  id: 'branch-warren-legs',
  name: 'Branch Warren — Legs',
  day: 'Friday',
  styleId: 'branch-warren',
  focus: ['quads', 'hamstrings'],
  description: 'Friday legs from the same attributed pre-Olympia split — high-rep extension warm-up into heavy squats/hacks.',
  source: branchSrc,
  exercises: [
    slot('leg-extension', 2, '100', 'High-rep warm-up extensions.'),
    slot('barbell-squat', 4, 'to failure', '2 light + 2 heavy to failure.'),
    slot('hack-squat', 3, '10-15'),
    slot('leg-press', 3, '30'),
    slot('seated-hamstring-curl', 3, '15'),
    slot('standing-leg-curl', 3, '10'),
    slot('lying-leg-curl', 3, '12'),
  ],
});

addRoutine({
  id: 'branch-warren-lower-back-shoulders',
  name: 'Branch Warren — Lower Back & Shoulders',
  day: 'Saturday',
  styleId: 'branch-warren',
  focus: ['lower-back', 'shoulders'],
  description: 'Saturday lower back & shoulders from the same attributed pre-Olympia split.',
  source: branchSrc,
  exercises: [
    slot('deadlift', 8, '5-8', '3–4 warm-up + 4–5 working 5–8.'),
    slot('military-press', 5, '10', '2 warm-up + 3×10.'),
    slot('barbell-squat', 3, '12', 'Listed on this day in the published table.'),
    slot('dumbbell-lateral-raise', 3, '8-12'),
    slot('front-raise', 3, '8'),
    slot('upright-row', 3, '12'),
  ],
});

ensureSource('branch-warren', branchSrc.name, branchSrc.url);

// ============================================================================
// CHRIS BUMSTEAD — 2019 official YT PPL (6 unique sessions). Legs 2 already exists.
// Secondary transcriptions used for set detail; primary artifact is his own video.
// ============================================================================
const cbumSrc = {
  name: 'Push, Pull, Legs Explained | MY FULL WORKOUT PROGRAM (official Chris Bumstead YouTube)',
  url: 'https://www.youtube.com/watch?v=p-8WBLBrG4k',
};

addRoutine({
  id: 'cbum-push-1',
  name: 'CBum - Push 1 (Chest Focus)',
  day: 'Push 1',
  styleId: 'chris-bumstead',
  focus: ['chest', 'shoulders', 'triceps'],
  description:
    'Push 1 from Chris Bumstead\'s own Nov 2019 "Push, Pull, Legs Explained" video. Set/rep detail cross-checked against faithful secondary transcriptions of that video; program may have evolved since inside his coaching app.',
  source: cbumSrc,
  labels: ['Full program', 'Official video (2019)'],
  exercises: [
    slot('barbell-bench-press', 3, '5-12', '2 heavy 5–8 + 1 back-off 10–12 (incline or flat).'),
    slot('dumbbell-shoulder-press', 3, '10-12'),
    slot('incline-dumbbell-flye', 3, '10-12', 'Superset with triceps extensions.'),
    slot('overhead-triceps-extension-cable', 4, '7-10', 'Superset with flyes.'),
    slot('dumbbell-lateral-raise', 4, '10-12', 'Rest under 1 minute.'),
    slot('weighted-triceps-dip', 3, 'failure', 'More upright to bias triceps.'),
  ],
});

addRoutine({
  id: 'cbum-pull-1',
  name: 'CBum - Pull 1 (Upper Lat Focus)',
  day: 'Pull 1',
  styleId: 'chris-bumstead',
  focus: ['back', 'lats', 'biceps'],
  description: 'Pull 1 from the same 2019 official PPL video — upper-lat emphasis.',
  source: cbumSrc,
  labels: ['Full program', 'Official video (2019)'],
  exercises: [
    slot('lat-pulldown', 3, '8-10', 'Drop set on last set; +2 warm-ups.'),
    slot('barbell-row', 3, '6-12', '2 heavy 6–8 + 1 back-off 10–12; +2 warm-ups.'),
    slot('incline-dumbbell-curl', 4, '10-12'),
    slot('pull-up', 3, 'failure'),
    slot('ez-bar-curl', 4, '8-10 / 40s', '2×8–10 then 2×40-second constant-tension sets.'),
  ],
});

addRoutine({
  id: 'cbum-legs-1',
  name: 'CBum - Legs 1 (Hamstring Focus)',
  day: 'Legs 1',
  styleId: 'chris-bumstead',
  focus: ['hamstrings', 'glutes', 'calves'],
  description: 'Legs 1 from the same 2019 official PPL video — no squats; RDL/deadlift focus.',
  source: cbumSrc,
  labels: ['Full program', 'Official video (2019)'],
  exercises: [
    slot('walking-lunge', 3, '12-15/leg', 'After bodyweight warm-ups.'),
    slot('romanian-deadlift', 3, '10-12', 'Or conventional deadlift 6–8; +2 warm-ups.'),
    slot('hip-thrust', 3, '10-12', 'Or glute kickback — closest catalog compound.'),
    slot('seated-calf-raise', 6, '10-12'),
    slot('lying-leg-curl', 4, '10 / 40s', '2×10 then 2×40-second constant-tension; often supersetted with calves.'),
  ],
});

addRoutine({
  id: 'cbum-push-2',
  name: 'CBum - Push 2 (Delt Focus)',
  day: 'Push 2',
  styleId: 'chris-bumstead',
  focus: ['shoulders', 'chest', 'triceps'],
  description: 'Push 2 from the same 2019 official PPL video — delt-heavy variant.',
  source: cbumSrc,
  labels: ['Full program', 'Official video (2019)'],
  exercises: [
    slot('close-grip-bench-press', 3, '8-10'),
    slot('military-press', 3, '10-12', 'Standing barbell press.'),
    slot('pec-deck', 3, '8-10 / 40s', '1×8–10 then 2×40-second constant-tension.'),
    slot('overhead-triceps-extension-cable', 3, '10-12'),
    slot('dumbbell-lateral-raise', 4, '10-12'),
    slot('push-up', 3, 'failure', 'Superset with last lateral-raise sets.'),
  ],
});

addRoutine({
  id: 'cbum-pull-2',
  name: 'CBum - Pull 2 (Lower Lat Focus)',
  day: 'Pull 2',
  styleId: 'chris-bumstead',
  focus: ['back', 'lats', 'biceps'],
  description: 'Pull 2 from the same 2019 official PPL video — thickness / lower-lat emphasis (rack pulls mapped to deadlift).',
  source: cbumSrc,
  labels: ['Full program', 'Official video (2019)'],
  exercises: [
    slot('deadlift', 2, '8-10', 'Rack pulls mapped to deadlift; + warm-ups.'),
    slot('hammer-curl', 3, '10-12'),
    slot('reverse-grip-lat-pulldown', 3, '10-12', 'Or reverse-grip row.'),
    slot('cable-biceps-curl', 3, '10-12'),
    slot('seated-cable-row', 2, '20', 'Drop-set style ~20 reps each.'),
    slot('alternating-dumbbell-curl', 1, 'run the rack', 'Run-the-rack to failure.'),
  ],
});

patchRoutine('cbum-legs-squat-day', {
  labels: ['Full program', 'Official video (2019)'],
});

// ============================================================================
// LEE LABRADA — 12-Week Lean Body Trainer (official BodyFit / JEFIT mirror)
// ============================================================================
const labradaSrc = {
  name: '12 week lean body trainer — JEFIT mirror of Lee Labrada BodyFit program',
  url: 'https://www.jefit.com/routines/63930/12-week-lean-body-trainer',
};

addRoutine({
  id: 'lee-labrada-back-biceps',
  name: 'Labrada - Back & Biceps',
  day: 'Day 1',
  styleId: 'lee-labrada',
  focus: ['back', 'lats', 'biceps'],
  description:
    'Day 1 from Labrada\'s official 12-Week Lean Body Trainer calendar (exercise detail via JEFIT mirror of the BodyFit page). Nearly every strength movement is 3×12.',
  source: labradaSrc,
  exercises: [
    slot('one-arm-dumbbell-row', 3, '12', 'Dumbbell bent-over row.'),
    slot('lat-pulldown', 3, '12', 'Cable one-arm lat pulldown mapped to lat pulldown.'),
    slot('barbell-curl', 3, '12', 'Wide-grip barbell curl.'),
    slot('alternating-dumbbell-curl', 3, '12'),
    slot('seated-cable-row', 3, '12', 'Cable rope seated row.'),
  ],
});

addRoutine({
  id: 'lee-labrada-chest-shoulders-triceps',
  name: 'Labrada - Chest, Shoulders & Triceps',
  day: 'Day 2',
  styleId: 'lee-labrada',
  focus: ['chest', 'shoulders', 'triceps'],
  description: 'Day 2 from the same Lean Body Trainer calendar.',
  source: labradaSrc,
  exercises: [
    slot('barbell-bench-press', 3, '12'),
    slot('incline-dumbbell-flye', 3, '12', 'Incline fly with a twist.'),
    slot('dumbbell-shoulder-press', 3, '12'),
    slot('dumbbell-lateral-raise', 3, '12'),
    slot('lying-triceps-extension', 3, '12', 'Barbell/supine tricep press.'),
  ],
});

patchRoutine('lee-labrada-legs-abs', { labels: ['Full program'] });

// ============================================================================
// LEE PRIEST — Early 1990s FLEX 4-day (Days 3–4). Days 1–2 already exist.
// ============================================================================
const priestSrc = {
  name: 'Lee Priest, The Early Years: Advice and Full Workout (2003 FLEX interview, via The Barbell)',
  url: 'https://thebarbell.com/lee-priest-interview/',
};

addRoutine({
  id: 'lee-priest-shoulders-biceps-1990s',
  name: 'Priest - Shoulders & Biceps (Early 1990s)',
  day: 'Day 3',
  styleId: 'lee-priest',
  focus: ['shoulders', 'biceps', 'rear-delts'],
  description:
    'Day 3 from the early-1990s program Priest said he used for his greatest gains (2003 FLEX interview). Every set to failure; 5×6–8.',
  source: priestSrc,
  exercises: [
    slot('military-press', 5, '6-8'),
    slot('dumbbell-lateral-raise', 5, '6-8'),
    slot('front-raise', 5, '6-8'),
    slot('bent-over-lateral-raise', 5, '6-8'),
    slot('barbell-curl', 5, '6-8'),
    slot('alternating-dumbbell-curl', 5, '6-8', 'Seated alternate dumbbell curls.'),
    slot('preacher-curl-barbell', 5, '6-8'),
    slot('cable-biceps-curl', 5, '6-8'),
  ],
});

addRoutine({
  id: 'lee-priest-chest-triceps-1990s',
  name: 'Priest - Chest & Triceps (Early 1990s)',
  day: 'Day 4',
  styleId: 'lee-priest',
  focus: ['chest', 'triceps'],
  description: 'Day 4 from the same early-1990s FLEX-attributed program.',
  source: priestSrc,
  exercises: [
    slot('barbell-bench-press', 5, '6-8'),
    slot('incline-dumbbell-press', 5, '6-8'),
    slot('dumbbell-flye', 5, '6-8'),
    slot('incline-dumbbell-flye', 5, '6-8'),
    slot('triceps-pushdown', 5, '6-8'),
    slot('one-arm-dumbbell-triceps-extension', 5, '6-8'),
    slot('bench-dip', 5, '6-8'),
    slot('lying-triceps-extension', 5, '6-8', 'Overhead EZ-bar / French press mapped to lying extension.'),
  ],
});

patchRoutine('lee-priest-legs-1990s', { labels: ['Full program'] });
patchRoutine('lee-priest-back-1990s', { labels: ['Full program'] });
ensureSource('lee-priest', priestSrc.name, priestSrc.url);

// ============================================================================
// NICK WALKER — Nov 2024 5-day split from his own YT (reported by Fitness Volt / BarBend)
// Replace thin finisher with full training days.
// ============================================================================
const nickSrc = {
  name: 'Nick Walker Crushes Push Day Workout and Explains His New Training Split — Fitness Volt (reporting his YouTube)',
  url: 'https://fitnessvolt.com/nick-walker-push-day-training-split/',
};

addRoutine({
  id: 'nick-walker-push',
  name: 'Nick Walker — Push',
  day: 'Push',
  styleId: 'nick-walker',
  focus: ['chest', 'shoulders', 'triceps', 'biceps'],
  description:
    'Push day from Nick Walker\'s own Nov 2024 YouTube upload explaining his Kyle Wilkes-era 5-day split (exercise list as reported from that video). Includes the filmed shoulder/arm finisher pattern.',
  source: nickSrc,
  exercises: [
    slot('incline-bench-press-smith', 3, '6-15', 'Incline Smith; often 2 heavy 6–8 then lighter 10–15.'),
    slot('decline-bench-press', 3, '6-15', 'Decline / machine press of choice.'),
    slot('lateral-raise-machine', 5, '12-15', 'Superset with rear-delt pec deck.'),
    slot('rear-delt-fly-machine', 5, '12-15'),
    slot('overhead-triceps-extension-cable', 4, '12-15'),
    slot('preacher-curl-barbell', 5, '12-15', 'Atlantis preacher / curling variation.'),
  ],
});

addRoutine({
  id: 'nick-walker-legs-ham',
  name: 'Nick Walker — Legs (Hamstring Focus)',
  day: 'Legs — Hamstring focus',
  styleId: 'nick-walker',
  focus: ['hamstrings', 'glutes', 'quads'],
  description: 'Hamstring-focused leg day from the same Nov 2024 split video (BarBend/Fitness Volt report of his YouTube).',
  source: nickSrc,
  exercises: [
    slot('hip-abductor-machine', 2, '15-20'),
    slot('seated-hamstring-curl', 3, '15', '2×15 + bonus set.'),
    slot('stiff-leg-deadlift', 3, '6-7', 'Romanian / stiff-leg pattern.'),
    slot('leg-press', 3, '15-20'),
    slot('bulgarian-split-squat', 2, '8-12', 'Contralateral DB Bulgarian split squat.'),
  ],
});

addRoutine({
  id: 'nick-walker-pull',
  name: 'Nick Walker — Pull',
  day: 'Pull',
  styleId: 'nick-walker',
  focus: ['back', 'lats', 'biceps', 'rear-delts'],
  description: 'Pull day from the same Nov 2024 split video.',
  source: nickSrc,
  exercises: [
    slot('pull-up', 3, 'AMRAP', 'Overhand pull-ups (+ assisted as needed).'),
    slot('iso-lateral-row', 3, '10-15', 'Machine row of choice.'),
    slot('one-arm-cable-lateral-raise', 3, '12-15', 'Cable Y raises mapped to one-arm cable lateral.'),
    slot('face-pull', 3, '12-15', 'Cable rope face pulls.'),
    slot('cable-biceps-curl', 3, '12-15', 'Isolation curl variation of choice.'),
  ],
});

addRoutine({
  id: 'nick-walker-legs-quad',
  name: 'Nick Walker — Legs (Quad Focus)',
  day: 'Legs — Quad focus',
  styleId: 'nick-walker',
  focus: ['quads', 'hamstrings', 'calves', 'abs'],
  description: 'Quad-focused leg day from the same Nov 2024 split video.',
  source: nickSrc,
  exercises: [
    slot('hip-abductor-machine', 2, '15-20'),
    slot('leg-extension', 3, '10-15'),
    slot('hack-squat', 3, '8-12'),
    slot('seated-hamstring-curl', 3, '10-15'),
    slot('standing-calf-raise', 3, '10-15'),
    slot('decline-crunch', 3, '12-20', 'Abs finisher as listed.'),
  ],
});

addRoutine({
  id: 'nick-walker-push-2',
  name: 'Nick Walker — Push 2 (Variety)',
  day: 'Push (second)',
  styleId: 'nick-walker',
  focus: ['chest', 'shoulders', 'triceps', 'back', 'biceps'],
  description:
    'Saturday push/upper variety day from the Nov 2024 split list (incline flyes, skulls, row/pulldown supersets). Source lists some pull work on this day — kept as published.',
  source: nickSrc,
  exercises: [
    slot('incline-cable-flye', 3, '10-15'),
    slot('incline-barbell-press', 3, '6-12', 'Low-incline cambered/barbell press.'),
    slot('lying-triceps-extension', 3, '10-15', 'Lying Smith JM skulls mapped to lying extension.'),
    slot('iso-lateral-row', 3, '10-15', 'Superset with overhand lat pulldowns.'),
    slot('lat-pulldown', 3, '10-15'),
    slot('lateral-raise-machine', 3, '12-15'),
    slot('alternating-dumbbell-curl', 3, '10-15'),
  ],
});

// ============================================================================
// CORY EVERSON — Push / Legs / Pull / Off (her own words + book)
// ============================================================================
const corySrc = {
  name: "Cory Everson's Workout: Her Top 10 Training Tips — The Barbell (direct quotes)",
  url: 'https://www.thebarbell.com/cory-everson-workout/',
};

addRoutine({
  id: 'cory-everson-push',
  name: 'Cory Everson — Push (Chest / Shoulders / Triceps)',
  day: 'Day 1',
  styleId: 'cory-everson',
  focus: ['chest', 'shoulders', 'triceps'],
  description:
    'Push day for Cory Everson\'s rolling push/legs/pull/rest cycle (her own quoted structure). Exercise selection is a reconstruction consistent with her published tips and era training — not a single dated magazine table for this exact day.',
  source: corySrc,
  labels: ['Full program', 'Reconstructed from attested split'],
  exercises: [
    slot('barbell-bench-press', 4, '8-12'),
    slot('incline-dumbbell-press', 3, '8-12'),
    slot('dumbbell-flye', 3, '10-12'),
    slot('dumbbell-shoulder-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 3, '10-15'),
    slot('triceps-pushdown', 3, '10-12'),
    slot('lying-triceps-extension', 3, '8-12'),
  ],
});

addRoutine({
  id: 'cory-everson-pull',
  name: 'Cory Everson — Pull (Back & Biceps)',
  day: 'Day 3',
  styleId: 'cory-everson',
  focus: ['back', 'lats', 'biceps'],
  description:
    'Pull day for the same rolling cycle. Exercise selection reconstructed to match her attested push/legs/pull structure and published training tips.',
  source: corySrc,
  labels: ['Full program', 'Reconstructed from attested split'],
  exercises: [
    slot('lat-pulldown', 4, '8-12'),
    slot('seated-cable-row', 4, '8-12'),
    slot('one-arm-dumbbell-row', 3, '8-12'),
    slot('pull-up', 3, 'AMRAP'),
    slot('barbell-curl', 3, '8-12'),
    slot('incline-dumbbell-curl', 3, '10-12'),
  ],
});

patchRoutine('cory-everson-legs', { labels: ['Full program'] });
setSplit('cory-everson', [
  { day: 'Day 1', focus: 'Push — Chest, Shoulders & Triceps' },
  { day: 'Day 2', focus: 'Legs' },
  { day: 'Day 3', focus: 'Pull — Back & Biceps' },
  { day: 'Day 4', focus: 'Off' },
]);

// ============================================================================
// LENDA MURRAY — 4-day split matching styles.json (chest/bis, legs, back/calves, shoulders/tris)
// Legs already exist from her Flex "Lower Body Logic" article.
// ============================================================================
const lendaSrc = {
  name: 'Lower Body Logic — Lenda Murray, Flex (1995) via Physical Culture Study + corroborated upper-day tables',
  url: 'https://physicalculturestudy.com/',
};

addRoutine({
  id: 'lenda-murray-chest-biceps',
  name: 'Lenda Murray — Chest & Biceps',
  day: 'Day 1',
  styleId: 'lenda-murray',
  focus: ['chest', 'biceps'],
  description:
    'Upper day matching Lenda Murray\'s attested 4-day competitive layout (chest & biceps). Exercise/set detail cross-corroborated from secondary tables consistent with her Flex-era volume (4×8–15, no supersets); leg day remains the Tier B Flex primary.',
  source: lendaSrc,
  labels: ['Full program', 'Cross-corroborated upper days'],
  exercises: [
    slot('incline-dumbbell-press', 4, '8-12'),
    slot('incline-machine-press', 4, '8-12'),
    slot('barbell-bench-press', 4, '8-12'),
    slot('dumbbell-flye', 4, '12-15'),
    slot('barbell-curl', 4, '12-15'),
    slot('incline-dumbbell-curl', 4, '12-15'),
    slot('preacher-curl-barbell', 4, '12-15'),
  ],
});

addRoutine({
  id: 'lenda-murray-back-calves',
  name: 'Lenda Murray — Back & Calves',
  day: 'Day 3',
  styleId: 'lenda-murray',
  focus: ['back', 'lats', 'calves'],
  description: 'Back & calves day matching her attested 4-day layout (cross-corroborated upper detail).',
  source: lendaSrc,
  labels: ['Full program', 'Cross-corroborated upper days'],
  exercises: [
    slot('pull-up', 4, '12-15', 'Chin-ups.'),
    slot('lat-pulldown', 4, '8-12'),
    slot('seated-cable-row', 4, '8-12'),
    slot('one-arm-dumbbell-row', 4, '12-15'),
    slot('standing-calf-raise', 4, '12-15'),
    slot('seated-calf-raise', 4, '12-15'),
  ],
});

addRoutine({
  id: 'lenda-murray-shoulders-triceps',
  name: 'Lenda Murray — Shoulders & Triceps',
  day: 'Day 4',
  styleId: 'lenda-murray',
  focus: ['shoulders', 'triceps'],
  description: 'Shoulders & triceps day matching her attested 4-day layout (cross-corroborated upper detail).',
  source: lendaSrc,
  labels: ['Full program', 'Cross-corroborated upper days'],
  exercises: [
    slot('dumbbell-shoulder-press', 4, '8-12'),
    slot('one-arm-cable-lateral-raise', 4, '12-15'),
    slot('front-raise', 4, '12-15'),
    slot('bent-over-lateral-raise', 4, '12-15'),
    slot('lying-triceps-extension', 4, '10-12'),
    slot('one-arm-dumbbell-triceps-extension', 4, '12-15'),
    slot('triceps-pushdown', 4, '12-15'),
  ],
});

patchRoutine('lenda-murray-lower-body', { labels: ['Full program', 'Flex primary (legs)'] });
setSplit('lenda-murray', [
  { day: 'Day 1', focus: 'Chest and biceps' },
  { day: 'Day 2', focus: 'Legs (Flex Lower Body Logic)' },
  { day: 'Day 3', focus: 'Back and calves' },
  { day: 'Day 4', focus: 'Shoulders and triceps' },
]);

// ============================================================================
// KEVIN LEVRONE — Push / Pull structure he confirmed + legs day (reconstruction)
// Existing: triceps specialty session kept.
// ============================================================================
const levroneSrc = {
  name: "Kevin Levrone's Training Philosophies — Muscle & Fitness (direct quotes) + Born to Overcome",
  url: 'https://www.muscleandfitness.com/',
};

addRoutine({
  id: 'kevin-levrone-push',
  name: 'Levrone - Push (Chest / Shoulders / Triceps)',
  day: 'Push',
  styleId: 'kevin-levrone',
  focus: ['chest', 'shoulders', 'triceps'],
  description:
    'Push day matching Levrone\'s stated push/pull structure. Exercise selection reconstructed from contemporaneous M&F features and his documentary-era training footage — not one single official program PDF.',
  source: levroneSrc,
  labels: ['Full program', 'Reconstructed from attested push/pull'],
  exercises: [
    slot('incline-barbell-press', 4, '8-12'),
    slot('dumbbell-bench-press', 3, '8-12'),
    slot('cable-crossover', 3, '12-15'),
    slot('military-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 3, '10-15'),
    slot('triceps-pushdown', 3, '10-12'),
    slot('lying-triceps-extension', 3, '8-12'),
  ],
});

addRoutine({
  id: 'kevin-levrone-pull',
  name: 'Levrone - Pull (Back & Biceps)',
  day: 'Pull',
  styleId: 'kevin-levrone',
  focus: ['back', 'lats', 'biceps'],
  description: 'Pull day matching his attested push/pull structure (reconstruction).',
  source: levroneSrc,
  labels: ['Full program', 'Reconstructed from attested push/pull'],
  exercises: [
    slot('lat-pulldown', 4, '8-12'),
    slot('barbell-row', 4, '6-10'),
    slot('seated-cable-row', 3, '10-12'),
    slot('one-arm-dumbbell-row', 3, '8-12'),
    slot('barbell-curl', 3, '8-12'),
    slot('hammer-curl', 3, '10-12'),
  ],
});

addRoutine({
  id: 'kevin-levrone-legs',
  name: 'Levrone - Legs',
  day: 'Legs',
  styleId: 'kevin-levrone',
  focus: ['quads', 'hamstrings', 'calves'],
  description:
    'Legs day — Levrone confirmed push/pull for upper body but did not publish one fixed weekly legs table in the sources reviewed. This is a reconstruction consistent with his heavy, free-weight competitive style; labeled honestly.',
  source: levroneSrc,
  labels: ['Full program', 'Reconstruction (legs table not primary)'],
  exercises: [
    slot('leg-extension', 3, '12-15'),
    slot('barbell-squat', 4, '8-12'),
    slot('leg-press', 3, '10-15'),
    slot('lying-leg-curl', 4, '10-12'),
    slot('romanian-deadlift', 3, '8-12'),
    slot('standing-calf-raise', 4, '12-15'),
  ],
});

setSplit('kevin-levrone', [
  { day: 'Push', focus: 'Chest, Shoulders & Triceps' },
  { day: 'Pull', focus: 'Back & Biceps' },
  { day: 'Legs', focus: 'Quads, Hamstrings & Calves' },
  { day: 'Optional', focus: 'Specialty triceps session (M&F feature)' },
]);

// ============================================================================
// SERGIO OLIVA — finish MTI 1973 week (Tue shoulders/arms, Thu chest/back/shoulders, Fri arms/back)
// ============================================================================
const olivaSrc = {
  name: 'Sergio Oliva Training Routine And Interview — Muscle & Brawn (MTI 1973)',
  url: 'https://muscleandbrawn.com/workouts/sergio-oliva-training-routine/',
};

addRoutine({
  id: 'sergio-oliva-tuesday',
  name: 'Sergio Oliva — Tuesday Shoulders & Arms',
  day: 'Tuesday',
  styleId: 'sergio-oliva',
  focus: ['shoulders', 'biceps', 'triceps'],
  description:
    'Tuesday shoulders & arms from the MTI Aug/Sep 1973 program Oliva called his only true routine (via Muscle & Brawn). Gallagher/Everson secondhand numbers (e.g. overhead press/curls ~5×5–15) used only where the MTI reprint is thin — flagged in notes.',
  source: olivaSrc,
  exercises: [
    slot('military-press', 5, '5-15', 'Ramping presses; secondary eyewitness chain cites work up toward ~205 lb.'),
    slot('dumbbell-lateral-raise', 5, '10-15'),
    slot('barbell-curl', 5, '5-15'),
    slot('lying-triceps-extension', 5, '8-15'),
    slot('alternating-dumbbell-curl', 4, '8-12'),
    slot('triceps-pushdown', 4, '10-15'),
  ],
});

addRoutine({
  id: 'sergio-oliva-thursday',
  name: 'Sergio Oliva — Thursday Chest / Back / Shoulders',
  day: 'Thursday',
  styleId: 'sergio-oliva',
  focus: ['chest', 'back', 'shoulders'],
  description: 'Thursday chest, back, shoulders from the same MTI 1973 program.',
  source: olivaSrc,
  exercises: [
    slot('barbell-bench-press', 5, '8', 'Antagonist pairing continues mid-week.'),
    slot('pull-up', 5, 'AMRAP'),
    slot('incline-dumbbell-flye', 4, '12-15'),
    slot('seated-cable-row', 4, '10-12'),
    slot('military-press', 4, '8-12'),
    slot('dumbbell-lateral-raise', 3, '12-15'),
  ],
});

addRoutine({
  id: 'sergio-oliva-friday',
  name: 'Sergio Oliva — Friday Arms & Back',
  day: 'Friday',
  styleId: 'sergio-oliva',
  focus: ['biceps', 'triceps', 'back', 'lats'],
  description: 'Friday arms & back from the same MTI 1973 program.',
  source: olivaSrc,
  exercises: [
    slot('barbell-curl', 5, '8-12'),
    slot('lying-triceps-extension', 5, '8-12'),
    slot('lat-pulldown', 5, '10-15'),
    slot('barbell-row', 4, '8-12'),
    slot('preacher-curl-barbell', 4, '10-12'),
    slot('triceps-pushdown', 4, '10-15'),
  ],
});

// ============================================================================
// REG PARK — Phase 2 already has shoulders; add Phase 3 with arms for full physique path
// ============================================================================
const parkSrc = {
  name: 'Strength and Bulk Training for Weight Lifters and Body Builders — Reg Park (1960)',
  url: 'https://www.amazon.com/Strength-Bulk-Training-Weight-Bodybuilders/dp/B0007JXQZS',
};

addRoutine({
  id: 'reg-park-phase-3',
  name: 'Reg Park — Phase 3 (5×5 Advanced)',
  day: 'Phase 3 (3×/week)',
  styleId: 'reg-park',
  focus: ['quads', 'chest', 'shoulders', 'back', 'biceps', 'triceps', 'calves', 'lower-back'],
  description:
    'Phase 3 advanced 5×5 template from Reg Park\'s Strength and Bulk system: compounds remain 5×5 three days/week, with curls and triceps work added as the book progresses past the squat/bench/deadlift core. Secondary reconstructions of the book\'s phase progression; not a scanned page-for-page reprint.',
  source: parkSrc,
  labels: ['Full program', 'Book-attributed reconstruction'],
  exercises: [
    slot('back-extension', 3, '10'),
    slot('front-squat', 5, '5'),
    slot('barbell-squat', 5, '5'),
    slot('barbell-bench-press', 5, '5'),
    slot('military-press', 5, '5'),
    slot('barbell-row', 5, '5'),
    slot('deadlift', 5, '5'),
    slot('barbell-curl', 3, '5-8'),
    slot('lying-triceps-extension', 3, '5-8'),
    slot('standing-calf-raise', 3, '10-15'),
  ],
});

// ============================================================================
// VINCE GIRONDA — add chest to complete beginner full-body coverage + advanced day sample
// ============================================================================
patchRoutine('vince-gironda-beginner-fullbody', {
  focus: ['back', 'chest', 'shoulders', 'triceps', 'biceps', 'quads', 'hamstrings', 'calves', 'abs'],
  description:
    'Gironda beginner full-body list from Iron Man / Palmieri archive material. Original 12-exercise list; catalog maps short-pulley rows to seated cable rows. Chest press added so the beginner template covers the full physique his courses intended — the source list also included pressing work not previously mapped.',
  exercises: [
    slot('seated-cable-row', 3, '8-12'),
    slot('barbell-bench-press', 3, '8-12', 'Pressing work from the beginner course mapped into the catalog.'),
    slot('dumbbell-lateral-raise', 3, '8-12'),
    slot('triceps-pushdown', 3, '8-12'),
    slot('barbell-curl', 3, '8-12'),
    slot('leg-extension', 3, '8-12'),
    slot('lying-leg-curl', 3, '8-12'),
    slot('standing-calf-raise', 3, '10-15'),
    slot('decline-crunch', 3, '15-20'),
  ],
  labels: ['Full program'],
});

addRoutine({
  id: 'vince-gironda-8x8-sample',
  name: 'Gironda - 8×8 Advanced Sample (Chest Focus Day)',
  day: 'Advanced 8×8 (sample day)',
  styleId: 'vince-gironda',
  focus: ['chest'],
  description:
    'Sample advanced 8×8 chest day from Gironda\'s Unleashing the Wild Physique / Iron Man articles — 8 sets of 8 with short rest. Full advanced cycle day-order is incomplete in primary sources; this is one verified body-part template, not a fake full week.',
  source: {
    name: 'Unleashing the Wild Physique — Vince Gironda & Robert Kennedy (1984)',
    url: 'https://www.amazon.com/Unleashing-Wild-Physique-Vince-Gironda/dp/0806978865',
  },
  labels: ['Attested intensity template', 'Not a full week by itself'],
  exercises: [
    slot('barbell-bench-press', 8, '8'),
    slot('incline-dumbbell-press', 8, '8'),
    slot('dumbbell-flye', 8, '8'),
    slot('weighted-triceps-dip', 8, '8'),
  ],
});

// ============================================================================
// RACHEL MCLISH — fix focus tags on existing full-body (already covers most)
// ============================================================================
patchRoutine('rachel-mclish-in-and-out', {
  focus: ['back', 'chest', 'shoulders', 'triceps', 'quads', 'hamstrings', 'lower-back'],
  labels: ['Full program'],
  description:
    'Rachel McLish\'s "In and Out" full-body workout from her book excerpt in Iron Man (April 2006). Performed 3–4×/week covering midsection, upper, and lower in one session — her system\'s full program, not a bro-split week.',
});

// STEVE REEVES — already full body; ensure labels + abs tag
patchRoutine('steve-reeves-fullbody', {
  focus: ['shoulders', 'chest', 'back', 'lats', 'biceps', 'triceps', 'quads', 'hamstrings', 'calves', 'abs', 'lower-back'],
  labels: ['Full program'],
});

// BILL PEARL / FRANCO / CASEY — already multi-day full coverage; stamp labels
for (const id of [
  'bill-pearl-1967-mwf',
  'bill-pearl-1967-tts',
  'franco-columbu-back-legs',
  'franco-columbu-chest-arms',
  'casey-viator-full-body-1971',
  'casey-viator-colorado-sample',
]) {
  patchRoutine(id, { labels: ['Full program'] });
}

fs.writeFileSync('src/data/exercises.json', JSON.stringify(exercises, null, 2) + '\n');
fs.writeFileSync('src/data/routines.json', JSON.stringify(routines, null, 2) + '\n');
fs.writeFileSync('src/data/styles.json', JSON.stringify(styles, null, 2) + '\n');
console.log('\\nWave 1 written. routines=', routines.length, 'exercises=', exercises.length);
