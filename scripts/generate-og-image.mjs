/**
 * Writes public/og-image.png (1200×630) — gradient + logo + tagline for social previews.
 * Run: node scripts/generate-og-image.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const W = 1200;
const H = 630;
const out = path.join(root, "public", "og-image.png");
const logoPath = path.join(root, "public", "verifystack-logo.png");

const gradientSvg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0EA5E9"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="#020617" fill-opacity="0.42"/>
</svg>`,
);

async function main() {
  const base = await sharp(gradientSvg).resize(W, H).png().toBuffer();
  const composites = [];

  if (fs.existsSync(logoPath)) {
    const logoBuf = await sharp(logoPath)
      .resize({ height: 200, fit: "inside" })
      .png()
      .toBuffer();
    const { width: lw = 0, height: lh = 0 } = await sharp(logoBuf).metadata();
    composites.push({
      input: logoBuf,
      left: Math.max(0, Math.round((W - lw) / 2)),
      top: Math.max(0, Math.round(H * 0.28 - lh / 2)),
    });
  }

  const textSvg = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <text x="600" y="455" text-anchor="middle" font-family="Segoe UI,system-ui,-apple-system,BlinkMacSystemFont,sans-serif" font-size="64" font-weight="700" fill="#ffffff">VerifyStack</text>
      <text x="600" y="515" text-anchor="middle" font-family="Segoe UI,system-ui,-apple-system,BlinkMacSystemFont,sans-serif" font-size="28" font-weight="500" fill="rgba(255,255,255,0.92)">AI-powered identity &amp; trust infrastructure</text>
    </svg>`,
  );
  composites.push({ input: textSvg, blend: "over" });

  await sharp(base).composite(composites).png({ compressionLevel: 9 }).toFile(out);
  const stat = fs.statSync(out);
  console.log("Wrote", out, stat.size, "bytes");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
