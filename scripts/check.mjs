// Pre-deploy checks for the static site: run with `node scripts/check.mjs`.
// Verifies local asset references, image dimensions, anchors, and WhatsApp link encoding.
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
let failures = 0;
const fail = (msg) => { failures++; console.error("✗ " + msg); };
const pass = (msg) => console.log("✓ " + msg);

// Reads width/height from a JPEG's SOF marker.
function jpegSize(path) {
  const b = readFileSync(new URL(path, root));
  let i = 2;
  while (i < b.length) {
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  return null;
}

for (const page of ["index.html", "credits.html"]) {
  const html = read(page);

  // 1. Local src/href references exist.
  const refs = [...html.matchAll(/(?:src|href)="([^"#][^"]*)"/g)].map((m) => m[1])
    .filter((u) => !/^(https?:|tel:|mailto:|\/$)/.test(u));
  for (const r of refs) existsSync(new URL(r, root)) ? null : fail(`${page}: missing file ${r}`);
  pass(`${page}: ${refs.length} local references checked`);

  // 2. In-page anchors resolve.
  const ids = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
  for (const [, a] of html.matchAll(/href="#([^"]+)"/g)) if (!ids.has(a)) fail(`${page}: broken anchor #${a}`);
  for (const [, a] of html.matchAll(/use href="#([^"]+)"/g)) if (!ids.has(a)) fail(`${page}: missing icon #${a}`);

  // 3. Image width/height attributes match the files (prevents layout shift).
  for (const [tag] of html.matchAll(/<img[^>]+>/g)) {
    const src = tag.match(/src="([^"]+)"/)[1];
    const w = +tag.match(/width="(\d+)"/)?.[1], h = +tag.match(/height="(\d+)"/)?.[1];
    if (!/alt="[^"]+"/.test(tag)) fail(`${page}: ${src} has no alt text`);
    const s = jpegSize(src);
    if (s && (s.w !== w || s.h !== h)) fail(`${page}: ${src} is ${s.w}x${s.h} but tagged ${w}x${h}`);
  }
}

// 4. WhatsApp config and link encoding.
const ctx = { window: {} };
vm.runInNewContext(read("js/config.js"), ctx);
const cfg = ctx.window.SITE_CONFIG;
if (!/^91\d{10}$/.test(cfg.whatsappNumber)) fail(`whatsappNumber "${cfg.whatsappNumber}" is not 91 + 10 digits`);
const html = read("index.html");
const keys = new Set([...html.matchAll(/data-wa="([^"]+)"/g)].map((m) => m[1]));
for (const k of keys) {
  if (!cfg.messages[k]) { fail(`data-wa="${k}" has no message in config`); continue; }
  const url = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.messages[k])}`;
  const back = decodeURIComponent(new URL(url).searchParams.get("text"));
  back === cfg.messages[k] ? pass(`WhatsApp "${k}" link round-trips (${url.length} chars)`) : fail(`WhatsApp "${k}" encoding mismatch`);
}
console.log("\nDefault link:", `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(cfg.messages.default)}`);

if (failures) { console.error(`\n${failures} check(s) failed`); process.exit(1); }
console.log("\nAll checks passed");
