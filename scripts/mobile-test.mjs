import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '../mobile-screenshots');
await mkdir(OUT, { recursive: true });

const sections = [
  { hash: 'intro',   label: '01-intro' },
  { hash: 'about',   label: '02-about' },
  { hash: 'toolbox', label: '03-toolbox' },
  { hash: 'works',   label: '04-works' },
  { hash: 'aix3d',   label: '05-aix3d' },
];

const browser = await chromium.launch();
// iPhone 14 viewport
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
});
const page = await context.newPage();

for (const { hash, label } of sections) {
  await page.goto(`http://localhost:5174/#${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(OUT, `${label}.png`), fullPage: false });
  console.log(`✓ ${label}`);
}

await browser.close();
console.log(`\nScreenshots saved to: mobile-screenshots/`);
