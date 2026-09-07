import assert from "node:assert/strict";
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
});

console.log("host-seo regression tests passed");
