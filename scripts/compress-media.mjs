/**
 * Media compression script
 * - Videos: re-encode with H.264 CRF 28, scale to max 1280px wide
 * - Images: convert PNG/JPG to WebP (quality 82)
 * Run: node scripts/compress-media.mjs
 */

import { execSync, spawnSync } from 'child_process';
import { readdirSync, statSync, renameSync, unlinkSync, existsSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');
const FFMPEG = join(ROOT, 'node_modules/ffmpeg-static/ffmpeg');

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + 'MB';
}

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

const files = walk(PUBLIC);
let totalSaved = 0;

// ── Video compression ────────────────────────────────────────────────────────
const videos = files.filter(f => extname(f).toLowerCase() === '.mp4');
console.log(`\nCompressing ${videos.length} videos...\n`);

for (const src of videos) {
  const sizeBefore = statSync(src).size;
  const tmp = src + '.tmp.mp4';

  const result = spawnSync(FFMPEG, [
    '-i', src,
    '-c:v', 'libx264',
    '-crf', '28',
    '-preset', 'fast',
    '-vf', 'scale=\'min(1280,iw)\':-2',
    '-movflags', '+faststart',
    '-an',          // remove audio (portfolio videos don't need it)
    '-y',
    tmp,
  ], { stdio: 'pipe' });

  if (result.status !== 0 || !existsSync(tmp)) {
    console.error(`  ✗ FAILED: ${src.replace(PUBLIC, '')}`);
    console.error(result.stderr?.toString().slice(-300));
    if (existsSync(tmp)) unlinkSync(tmp);
    continue;
  }

  const sizeAfter = statSync(tmp).size;
  if (sizeAfter < sizeBefore) {
    unlinkSync(src);
    renameSync(tmp, src);
    const saved = sizeBefore - sizeAfter;
    totalSaved += saved;
    console.log(`  ✓ ${basename(src)}: ${formatMB(sizeBefore)} → ${formatMB(sizeAfter)} (−${formatMB(saved)})`);
  } else {
    unlinkSync(tmp);
    console.log(`  ⟳ ${basename(src)}: already optimal (${formatMB(sizeBefore)})`);
  }
}

// ── Image compression (PNG/JPG → WebP) ──────────────────────────────────────
const images = files.filter(f => /\.(png|jpe?g)$/i.test(extname(f)));
console.log(`\nConverting ${images.length} images to WebP...\n`);

// Track src→webp renames so we can print a summary for data/projects.ts updates
const renamedPaths = [];

for (const src of images) {
  const sizeBefore = statSync(src).size;
  const webpPath = src.replace(/\.(png|jpe?g)$/i, '.webp');

  const result = spawnSync(FFMPEG, [
    '-i', src,
    '-c:v', 'libwebp',
    '-quality', '82',
    '-y',
    webpPath,
  ], { stdio: 'pipe' });

  if (result.status !== 0 || !existsSync(webpPath)) {
    console.error(`  ✗ FAILED: ${src.replace(PUBLIC, '')}`);
    if (existsSync(webpPath)) unlinkSync(webpPath);
    continue;
  }

  const sizeAfter = statSync(webpPath).size;
  if (sizeAfter < sizeBefore) {
    unlinkSync(src);
    const saved = sizeBefore - sizeAfter;
    totalSaved += saved;
    const relOld = src.replace(PUBLIC, '');
    const relNew = webpPath.replace(PUBLIC, '');
    renamedPaths.push({ old: relOld, new: relNew });
    console.log(`  ✓ ${basename(src)} → ${basename(webpPath)}: ${formatMB(sizeBefore)} → ${formatMB(sizeAfter)} (−${formatMB(saved)})`);
  } else {
    unlinkSync(webpPath);
    console.log(`  ⟳ ${basename(src)}: already optimal as-is (${formatMB(sizeBefore)})`);
  }
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`Total saved: ${formatMB(totalSaved)}`);

if (renamedPaths.length > 0) {
  console.log(`\n⚠️  The following files were renamed to .webp.`);
  console.log(`   Run: node scripts/update-refs.mjs  to update src/data/projects.ts automatically.\n`);
}
