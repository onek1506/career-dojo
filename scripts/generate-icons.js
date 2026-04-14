// ============================================================
// CareerDojo PWA Icon Generator
// Renders a green "CD" badge in two sizes (192 + 512 px) using
// sharp's SVG -> PNG pipeline. Run with: node scripts/generate-icons.js
// ============================================================

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function buildSvg(size) {
  // Black rounded-square background with a white "CD" wordmark — monochrome look
  const radius = Math.round(size * 0.22);
  const fontSize = Math.round(size * 0.42);
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#000000"/>
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="central"
    font-family="Arial Black, Arial, Helvetica, sans-serif"
    font-weight="900"
    font-size="${fontSize}"
    fill="#FFFFFF"
    letter-spacing="-2"
  >CD</text>
</svg>`.trim();
}

async function renderIcon(size) {
  const svg = Buffer.from(buildSvg(size));
  const outPath = path.join(PUBLIC_DIR, `icon-${size}.png`);
  await sharp(svg).png().toFile(outPath);
  console.log(`✓ wrote ${outPath}`);
}

(async () => {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  await renderIcon(192);
  await renderIcon(512);
  console.log('Done.');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
