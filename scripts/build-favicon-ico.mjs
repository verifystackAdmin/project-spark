/**
 * Brand favicons from public/favicon.svg (VerifyStack shield mark; all raster sizes for tabs + SERP).
 * Writes: favicon.ico (16/32/48/64), favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, logo-192.png
 * Run: npm run icons
 */
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import toIco from "to-ico";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const svg = path.join(root, "public", "favicon.svg");
const outIco = path.join(root, "public", "favicon.ico");
const out16 = path.join(root, "public", "favicon-16x16.png");
const out32 = path.join(root, "public", "favicon-32x32.png");
const outApple = path.join(root, "public", "apple-touch-icon.png");
const out192 = path.join(root, "public", "logo-192.png");

async function rasterSquare(size) {
  return sharp(svg).resize(size, size, { fit: "cover" }).png().toBuffer();
}

const sizesIco = [16, 32, 48, 64];
const pngs = await Promise.all(sizesIco.map(rasterSquare));
const ico = await toIco(pngs);
await fs.writeFile(outIco, ico);

await sharp(svg).resize(16, 16, { fit: "cover" }).png().toFile(out16);
await sharp(svg).resize(32, 32, { fit: "cover" }).png().toFile(out32);
await sharp(svg).resize(180, 180, { fit: "cover" }).png().toFile(outApple);
await sharp(svg).resize(192, 192, { fit: "cover" }).png().toFile(out192);

console.log("Wrote", outIco, ico.length, "bytes");
console.log("Wrote", out16, out32, outApple, out192);
