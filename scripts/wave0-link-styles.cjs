const fs = require('fs');

const bodybuilders = JSON.parse(fs.readFileSync('src/data/bodybuilders.json', 'utf8'));
const styles = JSON.parse(fs.readFileSync('src/data/styles.json', 'utf8'));
const styleIds = new Set(styles.map((s) => s.id));
let nextOrder = Math.max(...styles.map((s) => s.displayOrder)) + 1;

const GAP = 'Not yet verified from primary sources.';
const newStyles = [];

for (const b of bodybuilders) {
  if (b.styleId) {
    if (!styleIds.has(b.styleId)) {
      throw new Error(`missing style ${b.styleId}`);
    }
    continue;
  }

  const styleId = b.id;
  if (styleIds.has(styleId)) {
    throw new Error(`style id collision ${styleId}`);
  }

  const principles =
    b.principles.length > 0
      ? b.principles
      : [
          'Training details for this athlete are not yet verified from primary sources.',
        ];

  const style = {
    id: styleId,
    name: `${b.name}'s Training`,
    creator: b.name,
    displayOrder: nextOrder++,
    tags: ['Needs primary sources', 'Roster'],
    summary: `${b.why} Full split, set/rep schemes, and workout listings are not yet verified from primary sources (own book, DVD, official site/channel, or direct interview). Sections below mark those gaps honestly rather than inventing numbers.`,
    principles,
    intensityTechniques: [],
    guidelines: {
      trainingDaysPerWeek: GAP,
      frequencyPerMuscle: GAP,
      warmupProtocol: GAP,
      workingSetProtocol: GAP,
      repRanges: [{ target: 'Working sets', range: GAP }],
    },
    splitOverview: [{ day: 'Weekly split', focus: GAP }],
    sources: b.sources || [],
  };

  styles.push(style);
  styleIds.add(styleId);
  newStyles.push(styleId);
  b.styleId = styleId;
  b.principles = [];
  b.sources = [];
}

bodybuilders.sort((a, b) =>
  a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
);
bodybuilders.forEach((b, i) => {
  b.displayOrder = i + 1;
});

fs.writeFileSync('src/data/styles.json', `${JSON.stringify(styles, null, 2)}\n`);
fs.writeFileSync(
  'src/data/bodybuilders.json',
  `${JSON.stringify(bodybuilders, null, 2)}\n`,
);

console.log('added styles', newStyles.length);
console.log('total styles', styles.length);
console.log(
  'all linked',
  bodybuilders.every((b) => b.styleId),
);
console.log(
  'linked empty copy',
  bodybuilders.every((b) => b.principles.length === 0 && b.sources.length === 0),
);
