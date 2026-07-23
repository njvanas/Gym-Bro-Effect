const fs = require('fs');

const styles = JSON.parse(fs.readFileSync('src/data/styles.json', 'utf8'));
let cleared = 0;
let kept = 0;

for (const style of styles) {
  if (!style.tags.includes('Needs primary sources')) continue;
  if (style.sources.length === 0) {
    kept += 1;
    continue;
  }
  style.tags = style.tags.filter((t) => t !== 'Needs primary sources');
  if (!style.tags.includes('Documented')) {
    style.tags.push('Documented');
  }
  cleared += 1;
}

fs.writeFileSync('src/data/styles.json', `${JSON.stringify(styles, null, 2)}\n`);
console.log({ cleared, kept });
