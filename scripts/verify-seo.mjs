import fs from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");
const APEX_DOMAIN = "https://praiseworthyroofing.com";
const LEGACY_DOMAIN = "https://www.praiseworthyroofing.com";

const htmlChecks = [
  { file: "index.html", canonical: `${APEX_DOMAIN}/`, label: "home page" },
  {
    file: path.join("guides", "index.html"),
    canonical: `${APEX_DOMAIN}/guides/`,
    label: "guides hub",
  },
  {
    file: path.join("fort-worth", "index.html"),
    canonical: `${APEX_DOMAIN}/fort-worth/`,
    label: "city page",
  },
  {
    file: path.join("guides", "hail-damage-roof-inspection-dfw", "index.html"),
    canonical: `${APEX_DOMAIN}/guides/hail-damage-roof-inspection-dfw/`,
    label: "guide article",
  },
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readFile(relativePath) {
  const fullPath = path.join(OUT_DIR, relativePath);
  assert(fs.existsSync(fullPath), `Missing build artifact: ${relativePath}`);
  return fs.readFileSync(fullPath, "utf8");
}

assert(fs.existsSync(OUT_DIR), "Missing ./out directory. Run `npm run build` first.");

const robots = readFile("robots.txt");

assert(
  robots.includes(`${APEX_DOMAIN}/sitemap.xml`),
  "robots.txt does not reference the apex-domain sitemap.",
);
for (const bot of ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended", "Bingbot"]) {
  assert(robots.includes(`User-Agent: ${bot}`), `robots.txt is missing an explicit rule for ${bot}.`);
}
assert(!robots.includes(LEGACY_DOMAIN), "robots.txt still references the legacy www domain.");

const sitemap = readFile("sitemap.xml");
assert(
  sitemap.includes(`${APEX_DOMAIN}/guides/`) && sitemap.includes(`${APEX_DOMAIN}/fort-worth/`),
  "sitemap.xml is missing expected apex-domain URLs.",
);
assert(!sitemap.includes(LEGACY_DOMAIN), "sitemap.xml still references the legacy www domain.");

for (const check of htmlChecks) {
  const html = readFile(check.file);
  const canonicalMatches = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  const h1Matches = html.match(/<h1\b/gi) ?? [];

  assert(
    canonicalMatches.length === 1,
    `${check.label} should contain exactly one canonical tag.`,
  );
  assert(
    canonicalMatches[0][1] === check.canonical,
    `${check.label} canonical mismatch. Expected ${check.canonical}, got ${canonicalMatches[0][1]}.`,
  );
  assert(h1Matches.length === 1, `${check.label} should contain exactly one <h1>.`);
  assert(!html.includes(LEGACY_DOMAIN), `${check.label} still references the legacy www domain.`);
  assert(
    html.includes("application/ld+json"),
    `${check.label} is missing structured data output.`,
  );
  assert(
    html.includes('name="referrer" content="strict-origin-when-cross-origin"'),
    `${check.label} is missing the referrer meta policy.`,
  );
  assert(
    html.includes('name="author"') || html.includes('"author"'),
    `${check.label} is missing author metadata or author schema.`,
  );
  assert(
    html.includes('name="msvalidate.01" content="B5BB378228E5B9BCAEF3D6F7E7141471"'),
    `${check.label} is missing the Bing Webmaster verification meta tag.`,
  );
}

console.log("SEO verification passed.");
