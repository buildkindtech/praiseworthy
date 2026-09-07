import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const ORIGIN = (process.env.SEO_VERIFY_ORIGIN ?? "http://127.0.0.1:3005").replace(/\/$/, "");
const CANONICAL_DOMAIN = "https://www.praiseworthyroofing.com";
const NON_CANONICAL_DOMAIN = "https://praiseworthyroofing.com";
const EXPECTED_PHONE_E164 = "+16822500078";
const EXPECTED_TEL = `tel:${EXPECTED_PHONE_E164}`;
const LEGAL_PATHS = new Set(["/privacy-policy/", "/terms/"]);
const LOCALES = ["en", "es", "zh", "ko"];
const CITY_SLUGS = [
  "arlington",
  "bedford",
  "carrollton",
  "colleyville",
  "euless",
  "fort-worth",
  "frisco",
  "grapevine",
  "hurst",
  "keller",
  "little-elm",
  "north-richland-hills",
  "plano",
  "richardson",
  "richland-hills",
  "southlake",
  "watauga",
];
const GUIDE_SLUGS = [
  "hail-damage-roof-inspection-dfw",
  "how-long-does-a-roof-inspection-take-in-dfw",
  "roof-repair-near-me-north-richland-hills",
  "roof-storm-damage-insurance-texas",
  "signs-of-wind-damage-on-your-roof",
  "what-roof-adjusters-look-for-during-an-insurance-inspection",
];
const EXPECTED_INDEXABLE_PATHS = new Set([
  "/",
  "/guides/",
  ...LOCALES.filter((locale) => locale !== "en").flatMap((locale) => [
    `/${locale}/`,
    `/${locale}/guides/`,
  ]),
  ...CITY_SLUGS.map((slug) => `/${slug}/`),
  ...GUIDE_SLUGS.flatMap((slug) =>
    LOCALES.map((locale) =>
      locale === "en" ? `/guides/${slug}/` : `/${locale}/guides/${slug}/`,
    ),
  ),
]);
const PERFORMANCE_IMAGE_PATHS = [
  "images/brand/hero-truck-home.webp",
  "images/brand/embroidered-shirt.webp",
  "images/before-after/aerial-before.webp",
  "images/before-after/aerial-after.webp",
  "images/before-after/chimney-before.webp",
  "images/before-after/chimney-after.webp",
  "images/before-after/front-house-before.webp",
  "images/before-after/front-house-after.webp",
];

const htmlCache = new Map();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function decodeHtml(value) {
  return decodeXml(value)
    .replaceAll(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replaceAll(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    );
}

async function fetchResponse(pathname, { allowStatuses = [200] } = {}) {
  const url = `${ORIGIN}${pathname}`;
  let response;
  try {
    response = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(20_000),
      headers: { "user-agent": "PW-SEO-Verify/1.0" },
    });
  } catch (error) {
    throw new Error(`Unable to fetch ${url}: ${error.message}`);
  }
  assert(
    allowStatuses.includes(response.status),
    `${pathname} returned HTTP ${response.status}; expected ${allowStatuses.join("/")}.`,
  );
  return response;
}

async function fetchText(pathname, options) {
  const response = await fetchResponse(pathname, options);
  return response.text();
}

async function fetchHtml(pathname) {
  if (htmlCache.has(pathname)) return htmlCache.get(pathname);
  const html = await fetchText(pathname);
  htmlCache.set(pathname, html);
  return html;
}

function publicFileExists(pathname) {
  const relative = decodeURIComponent(pathname).replace(/^\//, "");
  return fs.existsSync(path.join(PUBLIC_DIR, relative));
}

function outputTargetExists(url) {
  const parsed = new URL(url, CANONICAL_DOMAIN);
  const pathname = decodeURIComponent(parsed.pathname);
  if (/\.[a-zA-Z0-9]+$/.test(pathname)) {
    return publicFileExists(pathname);
  }
  const normalized =
    pathname === "/" || pathname.endsWith("/") ? pathname : `${pathname}/`;
  return EXPECTED_INDEXABLE_PATHS.has(normalized) || LEGAL_PATHS.has(normalized);
}

function getAttributeTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    ([tag]) => tag,
  );
}

function getAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1];
}

function collectSchemaTypes(value, types = new Set()) {
  if (Array.isArray(value)) {
    for (const item of value) collectSchemaTypes(item, types);
    return types;
  }
  if (!value || typeof value !== "object") return types;
  const schemaType = value["@type"];
  if (typeof schemaType === "string") types.add(schemaType);
  if (Array.isArray(schemaType)) {
    for (const type of schemaType) types.add(type);
  }
  for (const child of Object.values(value)) collectSchemaTypes(child, types);
  return types;
}

function collectTypedSchemaIds(value, ids = new Map()) {
  if (Array.isArray(value)) {
    for (const item of value) collectTypedSchemaIds(item, ids);
    return ids;
  }
  if (!value || typeof value !== "object") return ids;
  if (value["@id"] && value["@type"]) {
    const values = ids.get(value["@id"]) ?? [];
    values.push(value);
    ids.set(value["@id"], values);
  }
  for (const child of Object.values(value)) collectTypedSchemaIds(child, ids);
  return ids;
}

function validateJsonLd(html, label) {
  const blocks = [
    ...html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  assert(blocks.length > 0, `${label} is missing structured data output.`);
  const schemaTypes = new Set();
  const schemas = [];
  for (const [, json] of blocks) {
    try {
      const schema = JSON.parse(json);
      schemas.push(schema);
      collectSchemaTypes(schema, schemaTypes);
    } catch (error) {
      throw new Error(`${label} contains invalid JSON-LD: ${error.message}`);
    }
  }
  const aggregateType = ["Aggregate", "Rating"].join("");
  assert(
    !schemaTypes.has(aggregateType) && !schemaTypes.has("Review"),
    `${label} contains unverified review/rating structured data.`,
  );
  const typedIds = collectTypedSchemaIds(schemas);
  for (const [id, definitions] of typedIds) {
    assert(
      definitions.length === 1,
      `${label} defines schema @id ${id} more than once. Use an @id-only reference instead.`,
    );
  }
  assert(schemaTypes.has("RoofingContractor"), `${label} is missing RoofingContractor schema.`);
  assert(
    schemas.filter((schema) => collectSchemaTypes(schema).has("FAQPage")).length <= 1,
    `${label} contains duplicate FAQPage schema blocks.`,
  );

  const phones = [];
  const visit = (value) => {
    if (Array.isArray(value)) return value.forEach(visit);
    if (!value || typeof value !== "object") return;
    if (typeof value.telephone === "string") phones.push(value.telephone);
    Object.values(value).forEach(visit);
  };
  schemas.forEach(visit);
  assert(phones.length > 0, `${label} schema is missing telephone.`);
  for (const phone of phones) {
    assert(
      phone === EXPECTED_PHONE_E164,
      `${label} schema telephone ${phone} is not ${EXPECTED_PHONE_E164}.`,
    );
  }
  return { schemaTypes, schemas };
}

function getLocalizedPath(locale, suffix = "") {
  if (locale === "en") return suffix ? `/${suffix}/` : "/";
  return suffix ? `/${locale}/${suffix}/` : `/${locale}/`;
}

function getExpectedAlternates(urlPath) {
  if (["/", "/es/", "/zh/", "/ko/"].includes(urlPath)) {
    return Object.fromEntries([
      ...LOCALES.map((locale) => [locale, getLocalizedPath(locale)]),
      ["x-default", "/"],
    ]);
  }
  if (["/guides/", "/es/guides/", "/zh/guides/", "/ko/guides/"].includes(urlPath)) {
    return Object.fromEntries([
      ...LOCALES.map((locale) => [locale, getLocalizedPath(locale, "guides")]),
      ["x-default", "/guides/"],
    ]);
  }
  const guideSlug = GUIDE_SLUGS.find((slug) => urlPath.endsWith(`/guides/${slug}/`));
  if (guideSlug) {
    return Object.fromEntries([
      ...LOCALES.map((locale) => [
        locale,
        getLocalizedPath(locale, `guides/${guideSlug}`),
      ]),
      ["x-default", `/guides/${guideSlug}/`],
    ]);
  }
  return null;
}

function validateInternalLinks(html, label) {
  for (const tag of getAttributeTags(html, "a")) {
    const href = getAttribute(tag, "href");
    if (
      !href ||
      href.startsWith("#") ||
      /^(mailto:|tel:|javascript:)/i.test(href)
    ) {
      continue;
    }

    const target = new URL(href, CANONICAL_DOMAIN);
    if (target.origin !== CANONICAL_DOMAIN) continue;
    target.hash = "";
    target.search = "";
    assert(
      outputTargetExists(target),
      `${label} links to a missing internal target: ${href}`,
    );
  }
}

function validatePhone(html, label) {
  const telHrefs = getAttributeTags(html, "a")
    .map((tag) => getAttribute(tag, "href") ?? "")
    .filter((href) => href.toLowerCase().startsWith("tel:"));
  assert(telHrefs.length > 0, `${label} has no tel: links.`);
  for (const href of telHrefs) {
    assert(!href.includes("*"), `${label} tel href contains a masked/star value: ${href}`);
    assert(
      href === EXPECTED_TEL,
      `${label} tel href ${href} is not ${EXPECTED_TEL}.`,
    );
  }
  assert(
    /\btel:\+1\d{10}\b/.test(html) && html.includes(EXPECTED_TEL),
    `${label} is missing the verified E.164 tel link.`,
  );
}

assert(fs.existsSync(PUBLIC_DIR), "Missing ./public directory.");

const performanceImageBytes = PERFORMANCE_IMAGE_PATHS.reduce((total, imagePath) => {
  const fullPath = path.join(PUBLIC_DIR, imagePath);
  assert(fs.existsSync(fullPath), `Missing optimized image: ${imagePath}`);
  return total + fs.statSync(fullPath).size;
}, 0);
assert(
  performanceImageBytes < 2_600_000,
  `Core page WebP assets exceed the 2.6 MB regression budget: ${performanceImageBytes} bytes.`,
);
for (const socialImage of [
  "images/social/social-card.webp",
  "images/social/article-roofing-dfw.webp",
]) {
  const fullPath = path.join(PUBLIC_DIR, socialImage);
  assert(fs.existsSync(fullPath), `Missing social/search image: ${socialImage}`);
  assert(fs.statSync(fullPath).size < 200_000, `${socialImage} exceeds 200 KB.`);
}

const robots = await fetchText("/robots.txt");
assert(
  robots.includes(`${CANONICAL_DOMAIN}/sitemap.xml`),
  "robots.txt does not reference the canonical-host sitemap.",
);
for (const bot of [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
  "Bingbot",
]) {
  assert(robots.includes(`User-Agent: ${bot}`), `robots.txt is missing ${bot}.`);
}
assert(!robots.includes(NON_CANONICAL_DOMAIN), "robots.txt references the non-canonical apex host.");

const sitemap = await fetchText("/sitemap.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
  decodeXml(match[1]),
);
const sitemapPaths = new Set(sitemapUrls.map((url) => new URL(url).pathname));
const localePaths = new Set(["/es/", "/zh/", "/ko/"]);
const homePaths = new Set(["/", ...localePaths]);
const cityPaths = new Set(CITY_SLUGS.map((slug) => `/${slug}/`));
assert(
  sitemapUrls.length === EXPECTED_INDEXABLE_PATHS.size,
  `Expected ${EXPECTED_INDEXABLE_PATHS.size} indexable sitemap URLs, found ${sitemapUrls.length}.`,
);
assert(
  new Set(sitemapUrls).size === sitemapUrls.length,
  "sitemap.xml contains duplicate URLs.",
);
assert(!sitemap.includes(NON_CANONICAL_DOMAIN), "sitemap.xml references the non-canonical apex host.");
for (const expectedPath of EXPECTED_INDEXABLE_PATHS) {
  assert(sitemapPaths.has(expectedPath), `sitemap.xml is missing indexable route ${expectedPath}.`);
}
for (const actualPath of sitemapPaths) {
  assert(EXPECTED_INDEXABLE_PATHS.has(actualPath), `sitemap.xml contains unexpected route ${actualPath}.`);
}
for (const legalPath of LEGAL_PATHS) {
  assert(
    !sitemapUrls.some((url) => new URL(url).pathname === legalPath),
    `${legalPath} is noindex and must not appear in sitemap.xml.`,
  );
}

const seenTitles = new Map();
const seenDescriptions = new Map();
const pageLinks = new Map();
const pageAlternates = new Map();
const stableEntities = new Map();

for (const url of sitemapUrls) {
  const parsed = new URL(url);
  assert(parsed.origin === CANONICAL_DOMAIN, `Non-canonical sitemap URL: ${url}`);
  const html = await fetchHtml(parsed.pathname);
  const label = parsed.pathname;

  const titles = html.match(/<title>[^<]+<\/title>/gi) ?? [];
  const descriptions = getAttributeTags(html, "meta")
    .filter((tag) => getAttribute(tag, "name") === "description")
    .map((tag) => getAttribute(tag, "content"));
  assert(titles.length === 1, `${label} must have exactly one non-empty title.`);
  assert(
    descriptions.length === 1 && descriptions[0]?.trim(),
    `${label} must have exactly one non-empty meta description.`,
  );
  const titleText = decodeHtml(titles[0].replace(/<\/?title>/gi, "").trim());
  const descriptionText = decodeHtml(descriptions[0].trim());
  assert(
    titleText.length >= 50 && titleText.length <= 60,
    `${label} title must be 50-60 characters; found ${titleText.length}: ${titleText}`,
  );
  assert(
    descriptionText.length >= 140 && descriptionText.length <= 160,
    `${label} description must be 140-160 characters; found ${descriptionText.length}.`,
  );
  assert(!seenTitles.has(titleText), `${label} duplicates the title from ${seenTitles.get(titleText)}.`);
  assert(
    !seenDescriptions.has(descriptionText),
    `${label} duplicates the description from ${seenDescriptions.get(descriptionText)}.`,
  );
  seenTitles.set(titleText, label);
  seenDescriptions.set(descriptionText, label);

  const canonicals = getAttributeTags(html, "link")
    .filter((tag) => getAttribute(tag, "rel") === "canonical")
    .map((tag) => getAttribute(tag, "href"));
  assert(canonicals.length === 1, `${label} must have exactly one canonical.`);
  assert(canonicals[0] === url, `${label} canonical mismatch: ${canonicals[0]}`);
  const h1Matches = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert(h1Matches.length === 1, `${label} must have one H1.`);
  assert(h1Matches[0][1].replace(/<[^>]+>/g, "").trim(), `${label} has an empty H1.`);
  assert(!/<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(html), `${label} is noindex.`);
  assert(!html.includes(NON_CANONICAL_DOMAIN), `${label} references the non-canonical apex host.`);
  assert(
    html.includes('name="referrer" content="strict-origin-when-cross-origin"'),
    `${label} is missing the referrer policy.`,
  );
  assert(
    html.includes('name="author"') || html.includes('"author"'),
    `${label} is missing author metadata or schema.`,
  );

  validatePhone(html, label);
  validateInternalLinks(html, label);

  const linkedPaths = new Set(
    getAttributeTags(html, "a")
      .map((tag) => getAttribute(tag, "href"))
      .filter(Boolean)
      .map((href) => new URL(href, CANONICAL_DOMAIN))
      .filter((target) => target.origin === CANONICAL_DOMAIN)
      .map((target) => target.pathname),
  );
  pageLinks.set(label, linkedPaths);

  const { schemaTypes, schemas } = validateJsonLd(html, label);
  for (const stableId of [`${CANONICAL_DOMAIN}#roofingcontractor`, `${CANONICAL_DOMAIN}#website`]) {
    const definitions = [];
    const visit = (value) => {
      if (Array.isArray(value)) return value.forEach(visit);
      if (!value || typeof value !== "object") return;
      if (value["@id"] === stableId && value["@type"]) definitions.push(value);
      Object.values(value).forEach(visit);
    };
    schemas.forEach(visit);
    for (const definition of definitions) {
      const serialized = JSON.stringify(definition);
      const previous = stableEntities.get(stableId);
      assert(
        !previous || previous === serialized,
        `${label} conflicts with another definition of ${stableId}.`,
      );
      stableEntities.set(stableId, serialized);
    }
  }
  if (homePaths.has(label)) {
    for (const expectedType of ["WebSite", "WebPage", "Service", "ItemList", "FAQPage"]) {
      assert(schemaTypes.has(expectedType), `${label} is missing ${expectedType} schema.`);
    }
    for (const cityPath of cityPaths) {
      assert(linkedPaths.has(cityPath), `${label} does not link to city page ${cityPath}.`);
    }
  } else if (cityPaths.has(label)) {
    for (const expectedType of ["WebPage", "Service", "BreadcrumbList", "FAQPage"]) {
      assert(schemaTypes.has(expectedType), `${label} is missing ${expectedType} schema.`);
    }
  } else if (label.endsWith("/guides/")) {
    for (const expectedType of ["CollectionPage", "ItemList", "BreadcrumbList"]) {
      assert(schemaTypes.has(expectedType), `${label} is missing ${expectedType} schema.`);
    }
  } else if (label.includes("/guides/")) {
    for (const expectedType of ["WebPage", "Article", "BreadcrumbList", "FAQPage"]) {
      assert(schemaTypes.has(expectedType), `${label} is missing ${expectedType} schema.`);
    }
  }

  const alternateLinks = getAttributeTags(html, "link").filter(
    (tag) => getAttribute(tag, "rel") === "alternate" && getAttribute(tag, "hreflang"),
  );
  const alternatesByLanguage = new Map(
    alternateLinks.map((tag) => [getAttribute(tag, "hreflang"), getAttribute(tag, "href")]),
  );
  assert(
    alternatesByLanguage.size === alternateLinks.length,
    `${label} contains duplicate hreflang entries.`,
  );
  const expectedAlternates = getExpectedAlternates(label);
  if (expectedAlternates) {
    for (const [language, expectedPath] of Object.entries(expectedAlternates)) {
      const href = alternatesByLanguage.get(language);
      assert(href, `${label} is missing ${language} hreflang.`);
      assert(
        new URL(href).pathname === expectedPath,
        `${label} ${language} hreflang points to ${href}; expected ${expectedPath}.`,
      );
    }
  } else {
    assert(alternateLinks.length === 0, `${label} has hreflang links but no locale variants.`);
  }
  for (const tag of alternateLinks) {
    const href = getAttribute(tag, "href");
    assert(href && outputTargetExists(href), `${label} has a broken hreflang URL: ${href}`);
  }
  pageAlternates.set(label, alternatesByLanguage);

  for (const imageTag of getAttributeTags(html, "img")) {
    const src = getAttribute(imageTag, "src") ?? "unknown image";
    const alt = decodeHtml(getAttribute(imageTag, "alt") ?? "").trim();
    assert(alt, `${label} image ${src} has an empty or missing alt attribute.`);
    assert(
      !/^(image|img|photo|picture|[\w-]+\.(?:jpe?g|png|webp|svg))$/i.test(alt),
      `${label} image ${src} has a generic alt attribute: ${alt}`,
    );
  }

  const socialImages = getAttributeTags(html, "meta")
    .filter((tag) => ["og:image", "twitter:image"].includes(getAttribute(tag, "property") ?? getAttribute(tag, "name")))
    .map((tag) => getAttribute(tag, "content"))
    .filter(Boolean);
  assert(socialImages.length > 0, `${label} has no social image metadata.`);
  assert(html.includes('property="og:image:width" content="1200"'), `${label} is missing OG image width.`);
  assert(html.includes('property="og:image:height" content="630"'), `${label} is missing OG image height.`);
  assert(html.includes('property="og:image:type" content="image/webp"'), `${label} is missing OG image type.`);
  for (const imageUrl of socialImages) {
    assert(!/\.[a-z0-9]+\/$/i.test(new URL(imageUrl).pathname), `${label} social image has a trailing slash: ${imageUrl}`);
    if (new URL(imageUrl).origin === CANONICAL_DOMAIN) {
      assert(outputTargetExists(imageUrl), `${label} social image is missing: ${imageUrl}`);
    }
  }
}

for (const [pathName, expectedAlternates] of [...pageAlternates].filter(([, values]) => values.size)) {
  for (const [language, href] of expectedAlternates) {
    if (language === "x-default") continue;
    const targetPath = new URL(href).pathname;
    const reciprocal = pageAlternates.get(targetPath);
    assert(reciprocal, `${pathName} hreflang target ${targetPath} has no alternate set.`);
    const sourceLocale = pathName.match(/^\/(es|zh|ko)\//)?.[1] ?? "en";
    assert(
      reciprocal.get(sourceLocale) && new URL(reciprocal.get(sourceLocale)).pathname === pathName,
      `${pathName} and ${targetPath} do not have reciprocal hreflang links.`,
    );
  }
}

for (const targetPath of EXPECTED_INDEXABLE_PATHS) {
  const inbound = [...pageLinks].some(
    ([sourcePath, links]) => sourcePath !== targetPath && links.has(targetPath),
  );
  assert(inbound, `${targetPath} is orphaned from every other indexable page.`);
}

const notFound = await fetchText("/this-page-does-not-exist-seo-verify/", { allowStatuses: [404] });
assert(
  /<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(notFound),
  "404 page must be noindex.",
);

for (const legalPath of LEGAL_PATHS) {
  const html = await fetchHtml(legalPath);
  assert(/<meta\b[^>]*name=["']robots["'][^>]*noindex/i.test(html), `${legalPath} must remain noindex.`);
}

console.log(`SEO verification passed for all ${sitemapUrls.length} indexable URLs plus legal pages against ${ORIGIN}.`);
