import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.cwd();
const ORIGIN = (process.env.SEO_VERIFY_ORIGIN ?? "http://127.0.0.1:3005").replace(
  /\/$/,
  "",
);
const LOCALES = ["en", "es", "zh", "ko"];
const VERCEL_FAVICON_SHA256 =
  "2b8ad2d33455a8f736fc3a8ebf8f0bdea8848ad4c0db48a2833bd0f9cd775932";
const VERCEL_FAVICON_BYTES = 25931;
const REQUIRED_ICO_SIZES = ["16x16", "32x32", "48x48"];
const ICON_PNG_SIZES = new Set([192, 512]);
const APPLE_PNG_SIZE = 180;
const TILE_BG = [249, 248, 244, 255];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function parsePngSize(buffer) {
  assert(buffer.length >= 24, "PNG is truncated before IHDR.");
  assert(buffer.subarray(1, 4).toString("ascii") === "PNG", "file is not a PNG.");
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function pngCornerRgba(filePath) {
  const script = `from PIL import Image; im=Image.open(${JSON.stringify(filePath)}).convert("RGBA"); print(",".join(str(v) for v in im.getpixel((0,0))))`;
  const result = spawnSync("python3", ["-c", script], { encoding: "utf8" });
  assert(result.status === 0, `unable to sample ${filePath}: ${result.stderr}`);
  const values = result.stdout.trim().split(",").map(Number);
  assert(values.length === 4, `unexpected corner sample for ${filePath}: ${result.stdout}`);
  return values;
}

function assertTileBackground(filePath, label = filePath) {
  const corner = pngCornerRgba(filePath);
  assert(
    corner[0] === TILE_BG[0] &&
      corner[1] === TILE_BG[1] &&
      corner[2] === TILE_BG[2] &&
      corner[3] === TILE_BG[3],
    `${label} corner ${corner.join(",")} is not opaque SVG tile #F9F8F4.`,
  );
}

function parseIcoSizes(buffer) {
  assert(buffer.length >= 6, "ICO is truncated before ICONDIR.");
  assert(buffer.readUInt16LE(0) === 0, "ICO reserved field must be 0.");
  assert(buffer.readUInt16LE(2) === 1, "ICO type must be 1.");
  const count = buffer.readUInt16LE(4);
  assert(count >= 3, `ICO must contain at least 3 images; found ${count}.`);
  const sizes = [];
  for (let index = 0; index < count; index += 1) {
    const offset = 6 + index * 16;
    assert(buffer.length >= offset + 16, "ICO is truncated before ICONDIRENTRY.");
    const width = buffer[offset] === 0 ? 256 : buffer[offset];
    const height = buffer[offset + 1] === 0 ? 256 : buffer[offset + 1];
    sizes.push(`${width}x${height}`);
  }
  return sizes;
}

function getAttributeTags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map(
    ([tag]) => tag,
  );
}

function getAttribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"))?.[1];
}

function relTokens(rel) {
  return new Set((rel ?? "").toLowerCase().split(/\s+/).filter(Boolean));
}

function isIconRel(rel) {
  const tokens = relTokens(rel);
  return tokens.has("icon") || tokens.has("shortcut") || tokens.has("apple-touch-icon");
}

function layoutHasManualIcons(source) {
  return /icons\s*:\s*\{[\s\S]*?icon\s*:/.test(source);
}

function localeHomePath(locale) {
  return locale === "en" ? "/" : `/${locale}/`;
}

async function fetchResponse(pathname) {
  const url = pathname.startsWith("http") ? pathname : `${ORIGIN}${pathname}`;
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
  return { url, response };
}

async function fetchBuffer(pathname) {
  const { url, response } = await fetchResponse(pathname);
  assert(response.status === 200, `${url} returned HTTP ${response.status}; expected 200.`);
  return {
    url,
    contentType: response.headers.get("content-type") ?? "",
    buffer: Buffer.from(await response.arrayBuffer()),
  };
}

function verifyOnDiskAssets() {
  const icoPath = path.join(ROOT, "app/favicon.ico");
  const iconPath = path.join(ROOT, "app/icon.png");
  const applePath = path.join(ROOT, "app/apple-icon.png");
  const sourcePath = path.join(ROOT, "scripts/assets/pw-monogram.png");
  const publicSvgPath = path.join(ROOT, "public/favicon.svg");
  const appSvgPath = path.join(ROOT, "app/icon.svg");
  const defaultLayout = fs.readFileSync(
    path.join(ROOT, "app/(default)/layout.tsx"),
    "utf8",
  );
  const localeLayout = fs.readFileSync(
    path.join(ROOT, "app/[locale]/layout.tsx"),
    "utf8",
  );

  assert(fs.existsSync(sourcePath), "missing scripts/assets/pw-monogram.png");
  const source = fs.readFileSync(sourcePath);
  const sourceSize = parsePngSize(source);
  assert(
    sourceSize.width === 299 && sourceSize.height === 318,
    `source monogram must remain 299x318; found ${sourceSize.width}x${sourceSize.height}.`,
  );

  const ico = fs.readFileSync(icoPath);
  const icoHash = sha256(ico);
  assert(
    icoHash !== VERCEL_FAVICON_SHA256,
    "app/favicon.ico still matches the original Vercel triangle bytes.",
  );
  assert(
    ico.length !== VERCEL_FAVICON_BYTES || icoHash !== VERCEL_FAVICON_SHA256,
    "app/favicon.ico still has the original Vercel byte length.",
  );
  const icoSizes = parseIcoSizes(ico);
  for (const required of REQUIRED_ICO_SIZES) {
    assert(icoSizes.includes(required), `ICO is missing ${required}; found ${icoSizes.join(", ")}.`);
  }

  const icon = fs.readFileSync(iconPath);
  const iconSize = parsePngSize(icon);
  assert(
    iconSize.width === iconSize.height,
    `app/icon.png must be square; found ${iconSize.width}x${iconSize.height}.`,
  );
  assert(
    ICON_PNG_SIZES.has(iconSize.width),
    `app/icon.png must be 192 or 512; found ${iconSize.width}x${iconSize.height}.`,
  );

  const apple = fs.readFileSync(applePath);
  const appleSize = parsePngSize(apple);
  assert(
    appleSize.width === APPLE_PNG_SIZE && appleSize.height === APPLE_PNG_SIZE,
    `app/apple-icon.png must be ${APPLE_PNG_SIZE}x${APPLE_PNG_SIZE}; found ${appleSize.width}x${appleSize.height}.`,
  );
  assertTileBackground(iconPath, "app/icon.png");
  assertTileBackground(applePath, "app/apple-icon.png");

  const publicSvg = fs.readFileSync(publicSvgPath, "utf8");
  const appSvg = fs.readFileSync(appSvgPath, "utf8");
  assert(publicSvg === appSvg, "public/favicon.svg and app/icon.svg have drifted.");
  assert(
    publicSvg.includes("Praise Worthy monogram"),
    "favicon SVG is missing the existing PW title.",
  );
  assert(
    /fill="#F9F8F4"/i.test(publicSvg),
    "favicon SVG is missing the existing #F9F8F4 tile fill.",
  );

  assert(
    !layoutHasManualIcons(defaultLayout),
    "app/(default)/layout.tsx still declares manual icons metadata that conflicts with file-based favicons.",
  );
  assert(
    !layoutHasManualIcons(localeLayout),
    "app/[locale]/layout.tsx still declares manual icons metadata that conflicts with file-based favicons.",
  );

  return {
    ico,
    icoHash,
    icoSizes,
    iconSize,
    appleSize,
  };
}

function collectIconLinks(html) {
  return getAttributeTags(html, "link")
    .map((tag) => {
      const rel = getAttribute(tag, "rel") ?? "";
      if (!isIconRel(rel)) return null;
      const href = getAttribute(tag, "href");
      if (!href) return null;
      return {
        rel: rel.toLowerCase(),
        href,
        type: (getAttribute(tag, "type") ?? "").toLowerCase(),
        sizes: (getAttribute(tag, "sizes") ?? "").toLowerCase(),
        tag,
      };
    })
    .filter(Boolean);
}

function assertNoDuplicateIconLinks(links, label) {
  const seen = new Set();
  for (const link of links) {
    const key = `${link.rel}|${link.href}|${link.sizes}|${link.type}`;
    assert(!seen.has(key), `${label} has duplicate favicon link: ${link.tag}`);
    seen.add(key);
  }
  const icoHrefs = links
    .map((link) => new URL(link.href, ORIGIN).pathname)
    .filter((pathname) => pathname.endsWith(".ico"));
  assert(
    new Set(icoHrefs).size <= 1,
    `${label} has conflicting ICO hrefs: ${icoHrefs.join(", ")}`,
  );
}

async function verifyGeneratedIconLinks(html, label, assetCache) {
  const links = collectIconLinks(html);
  assert(links.length > 0, `${label} is missing favicon / icon link tags.`);
  assert(
    links.some((link) => relTokens(link.rel).has("icon")),
    `${label} is missing rel=icon.`,
  );
  assert(
    links.some((link) => relTokens(link.rel).has("apple-touch-icon")),
    `${label} is missing rel=apple-touch-icon.`,
  );
  assertNoDuplicateIconLinks(links, label);

  const fetched = [];
  for (const link of links) {
    const resolved = new URL(link.href, ORIGIN);
    assert(
      resolved.origin === new URL(ORIGIN).origin,
      `${label} icon ${link.href} left the local origin.`,
    );
    const cacheKey = resolved.pathname + resolved.search;
    if (!assetCache.has(cacheKey)) {
      const asset = await fetchBuffer(resolved.pathname + resolved.search);
      assetCache.set(cacheKey, asset);
    }
    fetched.push({ link, asset: assetCache.get(cacheKey) });
  }
  return fetched;
}

export async function verifyFavicons() {
  const onDisk = verifyOnDiskAssets();
  const icoResponse = await fetchBuffer("/favicon.ico");
  assert(
    sha256(icoResponse.buffer) !== VERCEL_FAVICON_SHA256,
    "GET /favicon.ico still returns the original Vercel triangle bytes.",
  );
  assert(
    sha256(icoResponse.buffer) === onDisk.icoHash,
    "GET /favicon.ico does not match app/favicon.ico.",
  );
  const servedIcoSizes = parseIcoSizes(icoResponse.buffer);
  for (const required of REQUIRED_ICO_SIZES) {
    assert(
      servedIcoSizes.includes(required),
      `GET /favicon.ico is missing ${required}; found ${servedIcoSizes.join(", ")}.`,
    );
  }

  const svgResponse = await fetchBuffer("/favicon.svg");
  assert(
    svgResponse.buffer.toString("utf8").includes("Praise Worthy monogram"),
    "GET /favicon.svg is not the existing PW SVG.",
  );

  const assetCache = new Map();
  const pages = [];
  for (const locale of LOCALES) {
    const pathname = localeHomePath(locale);
    const { url, response } = await fetchResponse(pathname);
    assert(response.status === 200, `${url} returned HTTP ${response.status}; expected 200.`);
    const html = await response.text();
    const fetched = await verifyGeneratedIconLinks(html, pathname, assetCache);
    pages.push({ pathname, fetched });
  }

  return {
    icoHash: onDisk.icoHash,
    icoBytes: onDisk.ico.length,
    icoSizes: onDisk.icoSizes,
    iconSize: onDisk.iconSize,
    appleSize: onDisk.appleSize,
    servedIcoType: icoResponse.contentType,
    pages: pages.map((page) => ({
      pathname: page.pathname,
      links: page.fetched.map((item) => ({
        rel: item.link.rel,
        href: item.link.href,
        type: item.link.type,
        sizes: item.link.sizes,
        status: 200,
        bytes: item.asset.buffer.length,
      })),
    })),
  };
}

const isDirect =
  Boolean(process.argv[1]) &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirect) {
  const result = await verifyFavicons();
  console.log(
    `Favicon verification passed: ICO sha256=${result.icoHash.slice(0, 12)}… sizes=${result.icoSizes.join(",")} icon=${result.iconSize.width}x${result.iconSize.height} apple=${result.appleSize.width}x${result.appleSize.height} against ${ORIGIN}.`,
  );
  for (const page of result.pages) {
    console.log(
      `  ${page.pathname} ${page.links.length} icon link(s) HTTP 200: ${page.links
        .map((link) => `${link.rel} ${link.sizes || "no-size"}`)
        .join("; ")}`,
    );
  }
}
