/**
 * After compress-media.mjs converts PNG/JPG → WebP,
 * this script updates all .png/.jpg references in src/ to .webp.
 * Run: node scripts/update-refs.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'src');

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else if (/\.(ts|tsx|js|jsx)$/.test(full)) {
      results.push(full);
    }
  }
  return results;
}

const srcFiles = walk(SRC);
let total = 0;

for (const file of srcFiles) {
  const original = readFileSync(file, 'utf8');
  // Replace .png and .jpg/.jpeg references inside strings with .webp
  const updated = original.replace(/(['"`])([^'"`]+)\.(png|jpe?g)(['"`])/gi, (_, q1, path, _ext, q2) => {
    return `${q1}${path}.webp${q2}`;
  });
  if (updated !== original) {
    writeFileSync(file, updated, 'utf8');
    const count = (original.match(/\.(png|jpe?g)/gi) || []).length;
    total += count;
    console.log(`  ✓ Updated ${file.replace(join(__dirname, '..'), '')} (${count} references)`);
  }
}

console.log(`\nDone. ${total} references updated.`);
