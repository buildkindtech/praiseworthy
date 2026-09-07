import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  applyHostSeo,
  CANONICAL_HOST,
  isApiPath,
  isFilePath,
  needsTrailingSlash,
  normalizeRequestHost,
  PREVIEW_NOINDEX_TAG,
  shouldCanonicalizeApexHost,
  shouldNoIndexHost,
} from "../lib/host-seo.ts";

const PROXY_MATCHER_SOURCE = "/((?!_next/static|_next/image).*)";
// Next 16 wraps proxy.ts matchers the same way it wraps middleware.
const COMPILED_PROXY_MATCHER =
  /^(?:\/(_next\/data\/[^/]{1,}))?(?:\/((?!_next\/static|_next\/image).*))(\.json)?[\/#\?]?$/;

function check(name, fn) {
  try {
    fn();
    console.log(`ok  ${name}`);
  } catch (error) {
    console.error(`not ok  ${name}`);
    throw error;
  }
}

check("normalizes Host with port", () => {
  assert.equal(normalizeRequestHost("PraiseWorthyRoofing.com:443"), "praiseworthyroofing.com");
  assert.equal(normalizeRequestHost("localhost:3000"), "localhost");
});

check("apex is the only host canonicalized", () => {
  assert.equal(shouldCanonicalizeApexHost("praiseworthyroofing.com"), true);
  assert.equal(shouldCanonicalizeApexHost("www.praiseworthyroofing.com"), false);
  assert.equal(shouldCanonicalizeApexHost("localhost"), false);
  assert.equal(shouldCanonicalizeApexHost("praiseworthy-web.vercel.app"), false);
  assert.equal(shouldCanonicalizeApexHost("random.example.com"), false);
});

check("noindex is host-scoped to Vercel aliases and known staging", () => {
  assert.equal(shouldNoIndexHost("praiseworthy-web.vercel.app"), true);
  assert.equal(shouldNoIndexHost("some-sha-project.vercel.app"), true);
  assert.equal(shouldNoIndexHost("praiseworthyroofing.aiworkflowautomations.net"), true);
  assert.equal(shouldNoIndexHost("www.praiseworthyroofing.com"), false);
  assert.equal(shouldNoIndexHost("praiseworthyroofing.com"), false);
  assert.equal(shouldNoIndexHost("localhost"), false);
  assert.equal(shouldNoIndexHost("127.0.0.1"), false);
  assert.equal(shouldNoIndexHost("random.example.com"), false);
});

check("slash normalization is route-only", () => {
  assert.equal(needsTrailingSlash("/fort-worth"), true);
  assert.equal(needsTrailingSlash("/fort-worth/"), false);
  assert.equal(needsTrailingSlash("/"), false);
  assert.equal(isApiPath("/api/lead"), true);
  assert.equal(needsTrailingSlash("/api/lead"), false);
  assert.equal(needsTrailingSlash("/api/lead/"), false);
  assert.equal(isFilePath("/images/social/social-card.webp"), true);
  assert.equal(needsTrailingSlash("/images/social/social-card.webp"), false);
  assert.equal(needsTrailingSlash("/images/social/social-card.webp/"), false);
  assert.equal(needsTrailingSlash("/robots.txt"), false);
  assert.equal(needsTrailingSlash("/sitemap.xml"), false);
});

check("apex+slash+query collapse into one www 308", () => {
  const result = applyHostSeo({
    hostHeader: "praiseworthyroofing.com",
    protocol: "http:",
    hostname: "127.0.0.1",
    port: "3005",
    pathname: "/fort-worth",
    search: "?utm=test",
  });
  assert.equal(
    result.redirectLocation,
    `https://${CANONICAL_HOST}/fort-worth/?utm=test`,
  );
  assert.equal(result.robotsTag, null);
});

check("www document slash redirect stays on the canonical https host", () => {
  const result = applyHostSeo({
    hostHeader: "www.praiseworthyroofing.com",
    protocol: "http:",
    hostname: "127.0.0.1",
    port: "3005",
    pathname: "/es/guides",
    search: "?ref=1",
  });
  assert.equal(result.redirectLocation, `https://${CANONICAL_HOST}/es/guides/?ref=1`);
  assert.equal(result.robotsTag, null);
});

check("localhost slash redirect does not go to www", () => {
  const result = applyHostSeo({
    hostHeader: "localhost:3005",
    protocol: "http:",
    hostname: "127.0.0.1",
    port: "3005",
    pathname: "/fort-worth",
    search: "?x=1",
  });
  assert.equal(result.redirectLocation, "http://127.0.0.1:3005/fort-worth/?x=1");
  assert.equal(result.robotsTag, null);
});

check("localhost never redirects to www", () => {
  const result = applyHostSeo({
    hostHeader: "localhost:3005",
    protocol: "http:",
    hostname: "localhost",
    port: "3005",
    pathname: "/",
    search: "",
  });
  assert.equal(result.redirectLocation, null);
  assert.equal(result.robotsTag, null);
});

check("preview alias gets noindex and is not redirected to www", () => {
  const result = applyHostSeo({
    hostHeader: "praiseworthy-web.vercel.app",
    protocol: "http:",
    hostname: "127.0.0.1",
    port: "3005",
    pathname: "/",
    search: "",
  });
  assert.equal(result.redirectLocation, null);
  assert.equal(result.robotsTag, PREVIEW_NOINDEX_TAG);
});

check("API and assets are not slash-redirected on preview", () => {
  const api = applyHostSeo({
    hostHeader: "foo.vercel.app",
    protocol: "http:",
    hostname: "127.0.0.1",
    port: "3005",
    pathname: "/api/lead",
    search: "",
  });
  assert.equal(api.redirectLocation, null);
  assert.equal(api.robotsTag, PREVIEW_NOINDEX_TAG);

  const asset = applyHostSeo({
    hostHeader: "foo.vercel.app",
    protocol: "http:",
    hostname: "127.0.0.1",
    port: "3005",
    pathname: "/images/social/social-card.webp",
    search: "",
  });
  assert.equal(asset.redirectLocation, null);
  assert.equal(asset.robotsTag, PREVIEW_NOINDEX_TAG);
});

check("API stays on apex instead of cross-origin www redirect", () => {
  for (const pathname of ["/api/lead", "/api/lead/"]) {
    const result = applyHostSeo({
      hostHeader: "praiseworthyroofing.com",
      protocol: "http:",
      hostname: "127.0.0.1",
      port: "3005",
      pathname,
      search: "",
    });
    assert.equal(result.redirectLocation, null, `${pathname} redirected`);
    assert.equal(result.robotsTag, null, `${pathname} must not noindex production`);
  }
});

check("production hosts never receive preview noindex", () => {
  for (const host of ["www.praiseworthyroofing.com", "praiseworthyroofing.com"]) {
    for (const pathname of ["/", "/images/social/social-card.webp", "/api/lead"]) {
      const result = applyHostSeo({
        hostHeader: host,
        protocol: "https:",
        hostname: host,
        pathname,
        search: "",
      });
      assert.equal(result.robotsTag, null, `${host} ${pathname} got ${result.robotsTag}`);
    }
  }
});

check("vercel.json keeps exact staging host and no invalid wildcard regex", () => {
  const config = JSON.parse(fs.readFileSync(new URL("../vercel.json", import.meta.url)));
  const hostValues = [];
  for (const rule of config.headers ?? []) {
    for (const condition of rule.has ?? []) {
      if (condition.type !== "host") continue;
      assert.equal(typeof condition.value, "string", "host has-value must be a string");
      assert.notEqual(condition.value, "*.vercel.app", "bare *.vercel.app is not valid regex");
      assert.doesNotThrow(() => new RegExp(`^${condition.value}$`));
      hostValues.push(condition.value);
      const re = new RegExp(`^${condition.value}$`);
      assert.equal(re.test("www.praiseworthyroofing.com"), false);
      assert.equal(re.test("praiseworthyroofing.com"), false);
      assert.equal(re.test("praiseworthy-web.vercel.app"), false);
    }
  }
  assert.deepEqual(hostValues, ["praiseworthyroofing.aiworkflowautomations.net"]);
});

check("proxy matcher covers HTML, public images, and API but not hashed Next assets", () => {
  const proxySource = fs.readFileSync(new URL("../proxy.ts", import.meta.url), "utf8");
  assert.match(proxySource, /matcher:\s*\[\s*"\/\(\(\?!_next\/static\|_next\/image\)\.\*\)"\s*\]/);

  const shouldMatch = ["/", "/fort-worth/", "/api/lead", "/images/social/social-card.webp", "/robots.txt"];
  const shouldSkip = ["/_next/static/chunks/app.js", "/_next/image"];
  for (const pathname of shouldMatch) {
    assert.equal(COMPILED_PROXY_MATCHER.test(pathname), true, `matcher missed ${pathname}`);
  }
  for (const pathname of shouldSkip) {
    assert.equal(COMPILED_PROXY_MATCHER.test(pathname), false, `matcher should skip ${pathname}`);
  }

  const manifestPath = path.join(process.cwd(), ".next/server/functions-config-manifest.json");
  assert.equal(fs.existsSync(manifestPath), true, "run npm run build before test:host-seo");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const matchers = manifest.functions?.["/_middleware"]?.matchers ?? [];
  assert.equal(matchers.length, 1, "expected one compiled proxy matcher");
  assert.equal(matchers[0].originalSource, PROXY_MATCHER_SOURCE);
  const builtMatcher = new RegExp(matchers[0].regexp);
  for (const pathname of shouldMatch) {
    assert.equal(builtMatcher.test(pathname), true, `built matcher missed ${pathname}`);
  }
  for (const pathname of shouldSkip) {
    assert.equal(builtMatcher.test(pathname), false, `built matcher should skip ${pathname}`);
  }
});

console.log("host-seo regression tests passed");
