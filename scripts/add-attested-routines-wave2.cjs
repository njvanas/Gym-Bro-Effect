const fs = require('fs');

const exercises = JSON.parse(fs.readFileSync('src/data/exercises.json', 'utf8'));
const routines = JSON.parse(fs.readFileSync('src/data/routines.json', 'utf8'));
const styles = JSON.parse(fs.readFileSync('src/data/styles.json', 'utf8'));
const exIds = new Set(exercises.map((e) => e.id));

function ws(n, intensity) {
  return Array.from({ length: n }, (_, i) => ({
    label: String(i + 1),
    kind: 'working',
    intensity,
  }));
}

function slot(exerciseId, sets, repRange, notes, scheme) {
  if (!exIds.has(exerciseId)) throw new Error(`Missing ${exerciseId}`);
  const out = {
    exerciseId,
    sets,
    repRange,
    setScheme: scheme || ws(sets, `${repRange}`),
  };
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
  r.sortOrder = r.sortOrder || maxSort(r.styleId) + 1;
  r.collection = 'legend';
  r.labels = r.labels || ['Attested session'];
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

// Sergio Oliva — from MTI 1973 via Muscle & Brawn (his stated "only true" program)
addRoutine({
  id: 'sergio-oliva-monday',
  name: 'Sergio Oliva — Monday Chest / Back',
  day: 'Monday',
  styleId: 'sergio-oliva',
  focus: ['chest', 'back', 'lats'],
  description:
    'Monday from the MTI Aug/Sep 1973 program Oliva called his only true routine (reproduced by Muscle & Brawn). Bench supersetted with chins; flyes supersetted with dips (dip loads not published).',
  source: {
    name: 'Sergio Oliva Training Routine And Interview — Muscle & Brawn (MTI 1973)',
    url: 'https://muscleandbrawn.com/workouts/sergio-oliva-training-routine/',
  },
  exercises: [
    {
      exerciseId: 'barbell-bench-press',
      sets: 7,
      repRange: '8',
      notes: 'Superset with pull-ups; ascending load 200→380 lb ×8 (chin reps decline 15→5).',
      supersetGroup: 'oliva-mon-press-chin',
      setScheme: ws(7, '8 (ascending load)'),
    },
    {
      exerciseId: 'pull-up',
      sets: 7,
      repRange: '15-5',
      notes: 'Chinning bar paired with each bench set.',
      supersetGroup: 'oliva-mon-press-chin',
      setScheme: ws(7, '15→5'),
    },
    {
      exerciseId: 'incline-dumbbell-flye',
      sets: 5,
      repRange: '15',
      notes: 'DB flyes 80 lb ×15; supersetted with dips (dip scheme not published). Mapped to incline DB flye — closest catalog flye.',
      supersetGroup: 'oliva-mon-flye-dip',
      setScheme: ws(5, '15'),
    },
    {
      exerciseId: 'weighted-triceps-dip',
      sets: 5,
      repRange: 'not published',
      notes: 'Dip set/rep/weight scheme was not provided by Oliva in the source.',
      supersetGroup: 'oliva-mon-flye-dip',
      setScheme: ws(5, 'Not published — keep pairs with flyes'),
    },
  ],
});

addRoutine({
  id: 'sergio-oliva-wednesday',
  name: 'Sergio Oliva — Wednesday Abs / Legs / Calves',
  day: 'Wednesday',
  styleId: 'sergio-oliva',
  focus: ['abs', 'quads', 'calves'],
  description:
    'Wednesday abs + heavy squat + standing calves from the same MTI 1973 program. No direct hamstring work — consistent with all documented Oliva accounts.',
  source: {
    name: 'Sergio Oliva Training Routine And Interview — Muscle & Brawn (MTI 1973)',
    url: 'https://muscleandbrawn.com/workouts/sergio-oliva-training-routine/',
  },
  exercises: [
    slot('decline-crunch', 10, '50', 'Sit-ups 10×50 — mapped to decline crunch.'),
    slot('leg-raise-parallel-bars', 5, '20', 'Leg raises.'),
    slot(
      'barbell-squat',
      5,
      '5-4',
      '300×5, 400×5, 440×5, 470×5, 500×4.',
      [
        { label: '1', kind: 'working', intensity: '300×5' },
        { label: '2', kind: 'working', intensity: '400×5' },
        { label: '3', kind: 'working', intensity: '440×5' },
        { label: '4', kind: 'working', intensity: '470×5' },
        { label: '5', kind: 'working', intensity: '500×4' },
      ],
    ),
    slot('standing-calf-raise', 10, '8', 'Standing heel raises 10×8 with 300 lb.'),
  ],
});

addRoutine({
  id: 'sergio-oliva-saturday',
  name: 'Sergio Oliva — Saturday Abs / Legs / Calves',
  day: 'Saturday',
  styleId: 'sergio-oliva',
  focus: ['abs', 'quads', 'calves'],
  description:
    'Saturday lighter squat day with three 20-rep squat sets and front squats — same MTI 1973 program. Again no direct hamstring work.',
  source: {
    name: 'Sergio Oliva Training Routine And Interview — Muscle & Brawn (MTI 1973)',
    url: 'https://muscleandbrawn.com/workouts/sergio-oliva-training-routine/',
  },
  exercises: [
    slot('decline-crunch', 5, '10', 'Sit-ups.'),
    slot('leg-raise-parallel-bars', 5, '10'),
    slot(
      'barbell-squat',
      8,
      '3-20',
      '3×3 @300, 2×3 @400, then 3×20 @250.',
      [
        { label: '1', kind: 'working', intensity: '300×3' },
        { label: '2', kind: 'working', intensity: '300×3' },
        { label: '3', kind: 'working', intensity: '300×3' },
        { label: '4', kind: 'working', intensity: '400×3' },
        { label: '5', kind: 'working', intensity: '400×3' },
        { label: '6', kind: 'working', intensity: '250×20' },
        { label: '7', kind: 'working', intensity: '250×20' },
        { label: '8', kind: 'working', intensity: '250×20' },
      ],
    ),
    slot('front-squat', 5, '10', '200 lb.'),
    slot('seated-calf-raise', 5, '5', 'Sitting heel raises 5×5 with 200 lb.'),
  ],
});

// Bill Pearl 1967 — map catalog-matched lifts from PCS reproduction
addRoutine({
  id: 'bill-pearl-1967-mwf',
  name: 'Bill Pearl — 1967 Mr. Universe (MWF)',
  day: 'Monday / Wednesday / Friday',
  styleId: 'bill-pearl',
  focus: ['shoulders', 'back', 'lats', 'chest', 'biceps', 'triceps', 'abs'],
  description:
    'Upper-focused day from Bill Pearl\'s 1967 Mr. Universe routine as reproduced by Physical Culture Study. Only catalog-matched movements are included; several lateral/chin variations and abs from the original list are omitted rather than invented.',
  source: {
    name: "Bill Pearl's 1967 Mr. Universe Workout — Physical Culture Study",
    url: 'https://physicalculturestudy.com/2017/03/02/bill-pearls-1967-mr-universe-workout/',
  },
  exercises: [
    slot('pull-up', 4, '8', 'Close-grip chin-up (first chin block).'),
    slot('pull-up', 4, '8', 'Medium-grip chin-up (second chin block).'),
    slot('pull-up', 4, '8', 'Wide-grip chin-up (third chin block).'),
    slot('military-press', 4, '8'),
    slot('weighted-triceps-dip', 4, '8', 'Weighted dips.'),
    slot('dumbbell-lateral-raise', 4, '8', 'Standing dumbbell lateral raise.'),
    slot('incline-dumbbell-curl', 4, '8', 'Incline barbell curl mapped to incline DB curl when catalog lacks incline barbell curl.'),
  ],
});

addRoutine({
  id: 'bill-pearl-1967-tts',
  name: 'Bill Pearl — 1967 Mr. Universe (TTS)',
  day: 'Tuesday / Thursday / Saturday',
  styleId: 'bill-pearl',
  focus: ['biceps', 'shoulders', 'quads', 'hamstrings', 'calves', 'rear-delts'],
  description:
    'Lower/arms day from the same 1967 Mr. Universe routine reproduction. Catalog-matched lifts only.',
  source: {
    name: "Bill Pearl's 1967 Mr. Universe Workout — Physical Culture Study",
    url: 'https://physicalculturestudy.com/2017/03/02/bill-pearls-1967-mr-universe-workout/',
  },
  exercises: [
    slot('alternating-dumbbell-curl', 4, '8', 'Standing dumbbell curl.'),
    slot('incline-dumbbell-curl', 4, '8'),
    slot('rear-delt-fly-machine', 4, '8', 'Lying/incline rear-delt raise mapped to rear-delt fly machine.'),
    slot('leg-extension', 4, '10'),
    slot('standing-calf-raise', 5, '15'),
    slot('hack-squat', 4, '8'),
    slot('seated-calf-raise', 5, '15'),
    slot('lying-leg-curl', 4, '8', 'Hamstring curl.'),
  ],
});

// Lenda Murray — lower body from her own 1995 Flex article + her 4×10 rule
addRoutine({
  id: 'lenda-murray-lower-body',
  name: 'Lenda Murray — Lower Body Logic',
  day: 'Quads / hamstrings / glutes',
  styleId: 'lenda-murray',
  focus: ['quads', 'hamstrings', 'glutes'],
  description:
    'Exercise selection from Lenda Murray\'s own 1995 Flex article "Lower Body Logic" (squats with stance variation, lunges, standing leg curls, stiff-leg deadlifts), programmed at her stated template of four exercises × four sets × 10 reps.',
  source: {
    name: 'Lower Body Logic — Lenda Murray, Flex (1995) via Physical Culture Study',
    url: 'https://physicalculturestudy.com/2017/03/08/lenda-murray-lower-body-logic-1995/',
  },
  exercises: [
    slot(
      'barbell-squat',
      4,
      '10',
      'Vary stance: closer = glutes/outer quads; wider = hips/inner quads. Full depth — buttocks toward heels.',
    ),
    slot('walking-lunge', 4, '10', 'Named for hamstrings/glutes in her article.'),
    slot(
      'standing-leg-curl',
      4,
      '10',
      'Emphasize peak-contraction glute squeeze at the top (her own cue).',
    ),
    slot('stiff-leg-deadlift', 4, '10'),
  ],
});

ensureSource(
  'bill-pearl',
  "Bill Pearl's 1967 Mr. Universe Workout — Physical Culture Study",
  'https://physicalculturestudy.com/2017/03/02/bill-pearls-1967-mr-universe-workout/',
);
ensureSource(
  'sergio-oliva',
  'Sergio Oliva Training Routine And Interview — Muscle & Brawn (MTI 1973)',
  'https://muscleandbrawn.com/workouts/sergio-oliva-training-routine/',
);
ensureSource(
  'lenda-murray',
  'Lower Body Logic — Lenda Murray, Flex (1995) via Physical Culture Study',
  'https://physicalculturestudy.com/2017/03/08/lenda-murray-lower-body-logic-1995/',
);

// Update Oliva / Pearl / Lenda split overviews lightly where still placeholder
const oliva = styles.find((s) => s.id === 'sergio-oliva');
if (oliva) {
  oliva.splitOverview = [
    { day: 'Monday', focus: 'Chest & back — bench/chin supersets, flye/dip supersets (MTI 1973)' },
    { day: 'Tuesday', focus: 'Shoulders & arms (MTI 1973 — not yet fully mapped to catalog)' },
    { day: 'Wednesday', focus: 'Abs, heavy squats, standing calves — no direct hamstrings' },
    { day: 'Thursday', focus: 'Chest, back, shoulders (MTI 1973)' },
    { day: 'Friday', focus: 'Arms & back (MTI 1973)' },
    { day: 'Saturday', focus: 'Abs, lighter/high-rep squats, front squats, seated calves' },
  ];
}

const pearl = styles.find((s) => s.id === 'bill-pearl');
if (pearl) {
  pearl.splitOverview = [
    {
      day: 'Monday / Wednesday / Friday',
      focus: 'Upper emphasis — chins, presses, dips, laterals, curls (1967 Mr. Universe routine)',
    },
    {
      day: 'Tuesday / Thursday / Saturday',
      focus: 'Arms, rear delts, legs, calves (1967 Mr. Universe routine)',
    },
  ];
}

const lenda = styles.find((s) => s.id === 'lenda-murray');
if (lenda) {
  const lower = lenda.splitOverview.find((d) => /quad|ham|leg/i.test(d.focus + d.day));
  if (lower) {
    lower.focus =
      'Squats (stance variation), lunges, standing leg curls, stiff-leg deadlifts — 4×10 per her own article';
  }
}

fs.writeFileSync('src/data/routines.json', JSON.stringify(routines, null, 2) + '\n');
fs.writeFileSync('src/data/styles.json', JSON.stringify(styles, null, 2) + '\n');

const b = JSON.parse(fs.readFileSync('src/data/bodybuilders.json', 'utf8'));
const by = {};
for (const x of routines) {
  if (x.collection === 'legend' && x.styleId) by[x.styleId] = (by[x.styleId] || 0) + 1;
}
const withW = b.filter((bb) => (by[bb.styleId] || 0) > 0);
const noW = b.filter((bb) => (by[bb.styleId] || 0) === 0);
console.log('Coverage:', withW.length, '/', b.length);
console.log('Still without:', noW.map((x) => x.name).join(', '));
console.log(
  'Legend routines:',
  routines.filter((r) => r.collection === 'legend').length,
);
