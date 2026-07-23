/**
 * One-shot scraper: visit product pages / brand sources, save images under public/products/,
 * then patch imageSrc in src/data/products.json.
 * Run: node scripts/fetch-product-images.mjs
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const productsPath = path.join(root, 'src', 'data', 'products.json');
const outDir = path.join(root, 'public', 'products');

fs.mkdirSync(outDir, { recursive: true });

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

/** Extra brand / stock sources when AH URL is missing or blocked. */
const FALLBACK_IMAGE_URLS = {
  'ah-barebells-salty-peanut':
    'https://barebells.com/wp-content/uploads/2023/08/SE_FI_BB_Proteinbar_SaltyPeanut_L1.png',
  'ah-barebells-white-chocolate-almond':
    'https://barebells.com/wp-content/uploads/2023/08/SE_FI_BB_Proteinbar_WhiteChocolateAlmond_L1.png',
  'ah-barebells-caramel-cashew':
    'https://barebells.com/wp-content/uploads/2023/08/SE_FI_BB_Proteinbar_CaramelCashew_L1.png',
  'pantry-oats':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Oatmeal.jpg?width=800',
  'pantry-tuna':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Canned_tuna.jpg?width=800',
  'pantry-eggs':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Chicken_egg_2009-06-07.jpg?width=800',
  'pantry-brown-bread':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Whole_wheat_bread.jpg?width=800',
  'pantry-peanut-butter':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Peanut_butter.jpg?width=800',
  'pantry-honey':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Honey_comb.jpg?width=800',
  'supp-creatine':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Creatine.jpg?width=800',
  'supp-vitamin-d':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Cholecalciferol_structure.svg?width=800',
  'supp-whey-protein':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Whey_protein.jpg?width=800',
  'supp-mass-gainer':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Protein_shake.jpg?width=800',
  'supp-animal-stak':
    'https://commons.wikimedia.org/wiki/Special:FilePath/Assorted_pills.jpg?width=800',
};

async function download(url, dest) {
  const isWiki = /wikimedia|wikipedia/.test(url);
  const res = await fetch(url, {
    headers: {
      'User-Agent': isWiki
        ? 'GymBroEffect/1.0 (https://github.com/njvanas/Gym-Bro-Effect; product catalog images)'
        : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      Referer: url.includes('ah.nl') || url.includes('static.ah.nl') ? 'https://www.ah.nl/' : undefined,
    },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 800) throw new Error(`Tiny file (${buf.length}) for ${url}`);
  fs.writeFileSync(dest, buf);
  return buf.length;
}

function pickExt(url, contentTypeHint) {
  const lower = url.toLowerCase();
  if (lower.includes('.png') || contentTypeHint?.includes('png')) return '.png';
  if (lower.includes('.webp')) return '.webp';
  return '.jpg';
}

async function acceptCookies(page) {
  const selectors = [
    'button:has-text("Accepteren")',
    'button:has-text("Alles accepteren")',
    'button:has-text("Akkoord")',
    '#accept-button',
    '[data-testhook="cookie-accept"]',
  ];
  for (const sel of selectors) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 1500 })) {
        await btn.click({ timeout: 3000 });
        await page.waitForTimeout(800);
        return;
      }
    } catch {
      /* try next */
    }
  }
}

async function extractAhImage(page, productUrl) {
  await page.goto(productUrl, { waitUntil: 'networkidle', timeout: 90000 });
  await acceptCookies(page);
  await page.waitForTimeout(2000);
  // Prefer largest dam/product image; upgrade tiny og renditions.
  return page.evaluate(() => {
    const og = document.querySelector('meta[property="og:image"]')?.content || null;
    const imgs = [...document.querySelectorAll('img')]
      .map((i) => ({
        src: i.currentSrc || i.src,
        alt: i.alt || '',
        area: (i.naturalWidth || 0) * (i.naturalHeight || 0),
      }))
      .filter((i) => i.src && /static\.ah\.nl\/dam\/product/i.test(i.src))
      .sort((a, b) => b.area - a.area);
    const best =
      imgs.find((i) => /pdp-image/i.test(i.alt) && /800x800/.test(i.src)) ||
      imgs.find((i) => /800x800/.test(i.src)) ||
      imgs[0];
    let url = best?.src || og;
    if (!url) return null;
    url = url
      .replace('200x200_JPG_Q85', '800x800_JPG_Q90')
      .replace('200x200_JPG_Q90', '800x800_JPG_Q90')
      .replace('400x400_JPG_Q85', '800x800_JPG_Q90');
    return url;
  });
}

const missing = products.filter((p) => !p.imageSrc || !fs.existsSync(path.join(root, 'public', p.imageSrc)));
console.log(`Need images for ${missing.length} products`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  locale: 'nl-NL',
});
const page = await context.newPage();

const results = [];

for (const product of missing) {
  const id = product.id;
  let imageUrl = null;
  let source = null;

  try {
    if (product.url?.includes('ah.nl')) {
      imageUrl = await extractAhImage(page, product.url);
      source = 'ah';
    }
  } catch (err) {
    console.warn(`[${id}] AH extract failed: ${err.message}`);
  }

  if (!imageUrl && FALLBACK_IMAGE_URLS[id]) {
    imageUrl = FALLBACK_IMAGE_URLS[id];
    source = 'fallback';
  }

  if (!imageUrl) {
    console.warn(`[${id}] no image URL`);
    results.push({ id, ok: false });
    continue;
  }

  const ext = pickExt(imageUrl);
  const rel = `products/${id}${ext}`;
  const dest = path.join(outDir, `${id}${ext}`);

  try {
    const bytes = await download(imageUrl, dest);
    product.imageSrc = rel;
    console.log(`[${id}] ${source} → ${rel} (${bytes} bytes)`);
    results.push({ id, ok: true, rel, source });
  } catch (err) {
    console.warn(`[${id}] download failed: ${err.message}`);
    results.push({ id, ok: false, err: err.message });
  }
}

await browser.close();

fs.writeFileSync(productsPath, `${JSON.stringify(products, null, 2)}\n`);
const ok = results.filter((r) => r.ok).length;
console.log(`Done: ${ok}/${results.length} images saved; products.json updated`);
