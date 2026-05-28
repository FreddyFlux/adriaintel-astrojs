/**
 * Builds favicon assets from src/assets/adriaintel-logo.svg.
 * Circle fill matches hero surface: --color-surface (#e6fff4).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const logoPath = join(root, 'src/assets/adriaintel-logo.svg');

/** Hero gradient start: `from-surface` in index.astro */
const HERO_SURFACE = '#e6fff4';
const CANVAS = 512;
const LOGO_SCALE = 0.62;

const logoInner = readFileSync(logoPath, 'utf8')
	.replace(/<\?xml[^>]*>\s*/i, '')
	.replace(/<svg[^>]*>/, '')
	.replace(/<\/svg>\s*$/, '')
	.trim();

const logoW = 679;
const logoH = 699;
const scaledW = logoW * LOGO_SCALE;
const scaledH = logoH * LOGO_SCALE;
const offsetX = (CANVAS - scaledW) / 2;
const offsetY = (CANVAS - scaledH) / 2;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CANVAS} ${CANVAS}" role="img" aria-label="AdriaIntel">
  <circle cx="${CANVAS / 2}" cy="${CANVAS / 2}" r="${CANVAS / 2}" fill="${HERO_SURFACE}"/>
  <g transform="translate(${offsetX} ${offsetY}) scale(${LOGO_SCALE})">
${logoInner}
  </g>
</svg>
`;

writeFileSync(join(publicDir, 'favicon.svg'), faviconSvg, 'utf8');

const rasterSizes = [
	{ name: 'favicon-16.png', size: 16 },
	{ name: 'favicon-32.png', size: 32 },
	{ name: 'favicon-48.png', size: 48 },
	{ name: 'apple-touch-icon.png', size: 180 },
	{ name: 'icon-192.png', size: 192 },
	{ name: 'icon-512.png', size: 512 },
];

const pngBuffers = [];
for (const { name, size } of rasterSizes) {
	const buf = await sharp(Buffer.from(faviconSvg)).resize(size, size).png().toBuffer();
	writeFileSync(join(publicDir, name), buf);
	if (size <= 48) pngBuffers.push(buf);
}

const ico = await toIco(pngBuffers);
writeFileSync(join(publicDir, 'favicon.ico'), ico);

console.log('Wrote favicon.svg, favicon.ico, and PNG sizes:', rasterSizes.map((s) => s.name).join(', '));
