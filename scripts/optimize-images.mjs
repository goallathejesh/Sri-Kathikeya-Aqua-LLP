import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('../.tools/node_modules/sharp');
const specs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const { source, dest, w, h } of specs) {
  const target = path.join('assets/images', dest);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  await sharp(source).resize(w, h, { fit: 'cover' }).webp({ quality: 82 }).toFile(target);
  console.log(target, fs.statSync(target).size);
}
for (const name of ['250ml', '1-liter', '2-liter']) fs.copyFileSync('assets/images/products/water-bottle-500ml.webp', `assets/images/products/water-bottle-${name}.webp`);
await sharp('assets/images/custom-label/custom-branded-bottles.webp').resize(640, 640, { fit: 'contain', background: '#ffffff' }).webp({ quality: 82 }).toFile('assets/images/products/gifting-bottles.webp');
await sharp('assets/images/hero/water-hero.webp').resize(1200, 630, { fit: 'cover' }).webp({ quality: 82 }).toFile('assets/images/hero/open-graph.webp');
await sharp('assets/images/hero/water-hero.webp').resize(960, 640).webp({ quality: 78 }).toFile('assets/images/hero/water-hero-mobile.webp');
for (const directory of ['services', 'industries', 'contact']) fs.mkdirSync(`assets/images/${directory}`, { recursive: true });
