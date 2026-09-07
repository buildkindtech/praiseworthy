import fs from "node:fs";
import path from "node:path";

const LIVE_SITEMAP = "https://www.praiseworthyroofing.com/sitemap.xml";
const ORIGIN = (process.env.SEO_VERIFY_ORIGIN ?? "http://127.0.0.1:3005").replace(/\/$/, "");
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

async function fetchText(url, label) {
  let response;
  try {
    response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(15_000),
      headers: { "user-agent": "PW-SEO-Verify/1.0" },
    });
  } catch (error) {
    throw new Error(`Unable to fetch ${label}: ${error.message}`);
  }
  assert(response.ok, `Unable to fetch ${label}: HTTP ${response.status}`);
  return response.text();
}

const liveXml = await fetchText(LIVE_SITEMAP, "the live sitemap");
const builtXml = await fetchText(`${ORIGIN}/sitemap.xml`, `local sitemap at ${ORIGIN}/sitemap.xml`);

const livePaths = sitemapPaths(liveXml);
const builtPaths = sitemapPaths(builtXml);
const liveIndexablePaths = new Set([...livePaths].filter((urlPath) => !LEGAL_PATHS.has(urlPath)));

const missing = [...liveIndexablePaths].filter((urlPath) => !builtPaths.has(urlPath));
const unexpected = [...builtPaths].filter((urlPath) => !liveIndexablePaths.has(urlPath));

assert(missing.length === 0, `Built site dropped live indexable paths: ${missing.join(", ")}`);
assert(unexpected.length === 0, `Built sitemap added unreviewed paths: ${unexpected.join(", ")}`);

for (const legalPath of LEGAL_PATHS) {
  const response = await fetch(`${ORIGIN}${legalPath}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
    headers: { "user-agent": "PW-SEO-Verify/1.0" },
  });
  assert(response.status === 200, `Built site dropped legal page: ${legalPath} (HTTP ${response.status})`);
  const html = await response.text();
  assert(
    /<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(html),
    `${legalPath} must remain noindex on the server build.`,
  );
}

const publicRoot = path.join(process.cwd(), "public");
assert(fs.existsSync(publicRoot), "Missing ./public directory.");

console.log(`Migration parity passed: all ${liveIndexablePaths.size} live indexable paths are preserved.`);
