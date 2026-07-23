import { chromium } from 'playwright-core';
import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const chromiumInfo = execSync('npx playwright install --dry-run chromium', { encoding: 'utf-8' });
const installMatch = chromiumInfo.match(/Install location:\s+(.+)/);
const executablePath = installMatch
  ? path.join(installMatch[1].trim(), 'chrome-win64', 'chrome.exe')
  : undefined;

const products = [
  ['ah-hipro-protein-drink-mango', 'https://www.ah.nl/producten/product/wi515883/hipro-protein-drink-mango'],
  ['ah-hipro-protein-kwark-mango', 'https://www.ah.nl/producten/product/wi556396/hipro-protein-kwark-mango'],
  ['ah-hipro-protein-pudding-karamel', 'https://www.ah.nl/producten/product/wi556394/hipro-protein-pudding-karamel'],
  ['ah-hipro-protein-pudding-chocolade-hazelnoot', 'https://www.ah.nl/producten/product/wi556395/hipro-protein-pudding-chocolade-hazelnoot'],
  ['ah-campina-high-protein-greek-yoghurt', 'https://www.ah.nl/producten/product/wi585849/campina-high-protein-greek-yoghurt-1-5-fat'],
  ['ah-protein-mousse-chocolade', 'https://www.ah.nl/producten/product/wi556294/ah-protein-mousse-chocoladesmaak'],
  ['ah-protein-kwark-framboos', 'https://www.ah.nl/producten/product/wi585919/ah-protein-kwark-met-yoghurt-framboos'],
  ['ah-xxl-fitquark-peach-passion', 'https://www.ah.nl/producten/product/wi585928/xxl-nutrition-fitquark-peach-passion'],
  ['ah-starbucks-protein-chocolate-mocha', 'https://www.ah.nl/producten/product/wi588114/starbucks-protein-drink-chocolate-mocha-coffee'],
  ['ah-starbucks-protein-caramel-hazelnut', 'https://www.ah.nl/producten/product/wi588113/starbucks-protein-drink-caramel-hazelnut-coffee'],
  ['ah-melkunie-protein-yoghurt-perzik-framboos', 'https://www.ah.nl/producten/product/wi585902/melkunie-protein-yoghurt-perzik-framboos'],
  ['ah-protein-bar-white-choco-pinda-karamel', 'https://www.ah.nl/producten/product/wi560850/ah-protein-bar-white-choco-pinda-karamel'],
  ['ah-protein-bar-melk-choco-pinda-karamel', 'https://www.ah.nl/producten/product/wi560851/ah-protein-bar-melk-choco-pinda-karamel'],
  ['ah-pasta-tonijn', 'https://www.ah.nl/producten/product/wi365389/ah-pasta-tonijn-m'],
  ['ah-pasta-kip-kebab', 'https://www.ah.nl/producten/product/wi563781/ah-pasta-kip-kebab-m'],
  ['ah-fitmeals-chicken-teriyaki', 'https://www.ah.nl/producten/product/wi564363/fitmeals-chicken-teriyaki'],
  ['ah-freasy-tandoori-kip-biryani', 'https://www.ah.nl/producten/product/wi582329/freasy-tandoori-kip-biryani'],
  ['ah-go-tan-mihoen', 'https://www.ah.nl/producten/product/wi55943/go-tan-mihoen-rice-noodles'],
  ['ah-coca-cola-zero', 'https://www.ah.nl/producten/product/wi137739/coca-cola-zero-sugar'],
];

const outDir = path.resolve('public/products');
fs.mkdirSync(outDir, { recursive: true });

function upgrade(url) {
  if (!url) return url;
  return url
    .replace(/rendition=\d+x\d+[^&]*/i, 'rendition=800x800_JPG_Q90')
    .replace(/\/\d+x\d+(_[A-Za-z0-9]+)?\.(jpg|jpeg|png)/i, '/800x800_JPG_Q90.$2');
}

async function extractImageUrl(page) {
  return await page.evaluate(() => {
    function damId(url) {
      const m = /\/dam\/product\/(AHI_[^?/]+)/.exec(url || '');
      return m ? m[1] : null;
    }
    // og:image reliably identifies the actual product photo (unlike promo/banner
    // images elsewhere on the page that can also match the dam/product path).
    const og = document.querySelector('meta[property="og:image"]');
    const ogId = og ? damId(og.content) : null;
    if (ogId) {
      const imgs = Array.from(document.querySelectorAll('img')).filter((img) => damId(img.src) === ogId);
      if (imgs.length > 0) {
        imgs.sort((a, b) => b.naturalWidth * b.naturalHeight - a.naturalWidth * a.naturalHeight);
        return imgs[0].src;
      }
      return og.content;
    }
    return null;
  });
}

async function processProduct(browser, id, url, attempt = 1) {
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 1600 },
    locale: 'nl-NL',
  });
  const page = await context.newPage();
  try {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
    } catch {
      // Fall through; networkidle can time out on pages with background polling.
    }
    await page.waitForTimeout(2000);

    let imageUrl = await extractImageUrl(page);
    for (let i = 0; i < 3 && !imageUrl; i += 1) {
      await page.waitForTimeout(1500);
      imageUrl = await extractImageUrl(page);
    }

    if (!imageUrl) {
      if (attempt < 2) {
        await context.close();
        await new Promise((r) => setTimeout(r, 1500));
        return processProduct(browser, id, url, attempt + 1);
      }
      return { id, url, status: 'failed', reason: 'no image url found' };
    }

    imageUrl = upgrade(imageUrl);
    const resp = await context.request.get(imageUrl, { headers: { Referer: 'https://www.ah.nl/' } });
    if (!resp.ok()) {
      return { id, url, status: 'failed', reason: `image fetch status ${resp.status()}`, imageUrl };
    }
    const buffer = await resp.body();
    if (buffer.length < 1000) {
      return { id, url, status: 'failed', reason: 'downloaded file too small', imageUrl, bytes: buffer.length };
    }
    const destPath = path.join(outDir, `${id}.jpg`);
    fs.writeFileSync(destPath, buffer);
    return { id, url, status: 'ok', imageUrl, bytes: buffer.length };
  } catch (err) {
    return { id, url, status: 'failed', reason: String(err) };
  } finally {
    await context.close().catch(() => {});
  }
}

const results = [];
const browser = await chromium.launch({ executablePath, headless: true });

const alreadyDone = new Set(
  fs.existsSync(path.resolve('scripts/ah-images-result.json'))
    ? JSON.parse(fs.readFileSync(path.resolve('scripts/ah-images-result.json'), 'utf-8'))
        .filter((r) => r.status === 'ok')
        .map((r) => r.id)
    : []
);

for (const [id, url] of products) {
  if (alreadyDone.has(id)) {
    console.log(`SKIP ${id} already downloaded`);
    continue;
  }
  const result = await processProduct(browser, id, url);
  results.push(result);
  console.log(`${result.status.toUpperCase()} ${id} ${result.bytes ?? result.reason ?? ''}`);
  await new Promise((r) => setTimeout(r, 800));
}

await browser.close();

const previous = fs.existsSync(path.resolve('scripts/ah-images-result.json'))
  ? JSON.parse(fs.readFileSync(path.resolve('scripts/ah-images-result.json'), 'utf-8'))
  : [];
const merged = [...previous.filter((r) => !results.some((n) => n.id === r.id)), ...results];
fs.writeFileSync(path.resolve('scripts/ah-images-result.json'), JSON.stringify(merged, null, 2));
