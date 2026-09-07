import fs from "node:fs";
import path from "node:path";

const LIVE_SITEMAP = "https://www.praiseworthyroofing.com/sitemap.xml";
const OUT_SITEMAP = path.join(process.cwd(), "out", "sitemap.xml");
const LEGAL_PATHS = new Set(["/privacy-policy/", "/terms/"]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sitemapPaths(xml) {
  return new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
      new URL(match[1].replaceAll("&amp;", "&")).pathname,
    ),
  );
}

assert(fs.existsSync(OUT_SITEMAP), "Missing out/sitemap.xml. Run `npm run build` first.");
const response = await fetch(LIVE_SITEMAP, { signal: AbortSignal.timeout(15_000) });
assert(response.ok, `Unable to fetch the live sitemap: HTTP ${response.status}`);

const livePaths = sitemapPaths(await response.text());
const builtPaths = sitemapPaths(fs.readFileSync(OUT_SITEMAP, "utf8"));
const liveIndexablePaths = new Set([...livePaths].filter((urlPath) => !LEGAL_PATHS.has(urlPath)));

const missing = [...liveIndexablePaths].filter((urlPath) => !builtPaths.has(urlPath));
const unexpected = [...builtPaths].filter((urlPath) => !liveIndexablePaths.has(urlPath));

assert(missing.length === 0, `Built site dropped live indexable paths: ${missing.join(", ")}`);
assert(unexpected.length === 0, `Built sitemap added unreviewed paths: ${unexpected.join(", ")}`);

for (const legalPath of LEGAL_PATHS) {
  const outputPath = path.join(process.cwd(), "out", legalPath.slice(1), "index.html");
  assert(fs.existsSync(outputPath), `Built site dropped legal page: ${legalPath}`);
}

console.log(`Migration parity passed: all ${liveIndexablePaths.size} live indexable paths are preserved.`);
