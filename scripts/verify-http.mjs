import http from "node:http";

const ORIGIN = (process.env.SEO_VERIFY_ORIGIN ?? "http://127.0.0.1:3005").replace(/\/$/, "");
const CANONICAL = "https://www.praiseworthyroofing.com";
const EXPECTED_TEL = "tel:+16822500078";
const originUrl = new URL(ORIGIN);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function request({
  pathname,
  host,
  method = "GET",
  body,
  headers = {},
} = {}) {
  return new Promise((resolve, reject) => {
    const pathAndQuery = pathname.startsWith("/") ? pathname : `/${pathname}`;
    const req = http.request(
      {
        hostname: originUrl.hostname,
        port: originUrl.port || 80,
        path: pathAndQuery,
        method,
        headers: {
          host: host ?? originUrl.host,
          "user-agent": "PW-SEO-Verify/1.0",
          ...headers,
        },
      },
      (res) => {
        const chunks = [];
        res.on("data", (chunk) => chunks.push(chunk));
        res.on("end", () => {
          resolve({
            status: res.statusCode ?? 0,
            location: res.headers.location ?? null,
            robots: res.headers["x-robots-tag"] ?? null,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

const cases = [];
function record(name, fn) {
  cases.push({ name, fn });
}

record("www home stays 200 without preview noindex", async () => {
  const res = await request({ pathname: "/", host: "www.praiseworthyroofing.com" });
  assert(res.status === 200, `expected 200, got ${res.status}`);
  assert(!res.robots, `www must not send X-Robots-Tag, got ${res.robots}`);
  assert(res.body.includes(EXPECTED_TEL), "www home missing verified tel");
  assert(!/\btel:[^"'\s]*\*/.test(res.body), "www home contains starred tel");
});

record("apex home 308 to www preserving slash", async () => {
  const res = await request({ pathname: "/", host: "praiseworthyroofing.com" });
  assert(res.status === 308, `expected 308, got ${res.status}`);
  assert(res.location === `${CANONICAL}/`, `unexpected Location: ${res.location}`);
});

record("apex path+query canonicalizes in one hop including slash", async () => {
  const res = await request({
    pathname: "/fort-worth?utm=test",
    host: "praiseworthyroofing.com",
  });
  assert(res.status === 308, `expected 308, got ${res.status}`);
  assert(
    res.location === `${CANONICAL}/fort-worth/?utm=test`,
    `unexpected Location: ${res.location}`,
  );
});

record("www document route without slash normalizes and keeps query", async () => {
  const res = await request({
    pathname: "/es/guides?ref=1",
    host: "www.praiseworthyroofing.com",
  });
  assert(res.status === 308, `expected 308, got ${res.status}`);
  assert(
    res.location === `${CANONICAL}/es/guides/?ref=1`,
    `unexpected Location: ${res.location}`,
  );
});

record("localhost is not redirected to www", async () => {
  const res = await request({ pathname: "/", host: "localhost" });
  assert(res.status === 200, `localhost home expected 200, got ${res.status} ${res.location}`);
  assert(!res.robots, `localhost must not be noindexed, got ${res.robots}`);
});

record("localhost document slash stays local", async () => {
  const res = await request({ pathname: "/fort-worth", host: "localhost" });
  assert(res.status === 308, `expected 308, got ${res.status}`);
  assert(res.location, "missing Location");
  assert(
    res.location.includes("/fort-worth/"),
    `localhost slash Location missing trailing slash: ${res.location}`,
  );
  assert(
    !res.location.includes("www.praiseworthyroofing.com"),
    `localhost was redirected to www: ${res.location}`,
  );
});

record("arbitrary preview host is not redirected to www", async () => {
  const res = await request({
    pathname: "/fort-worth/",
    host: "random-preview.example.com",
  });
  assert(res.status === 200, `arbitrary host expected 200, got ${res.status} ${res.location}`);
  assert(!res.robots, `arbitrary host must not receive preview noindex, got ${res.robots}`);
});

record("Vercel alias is noindexed and not redirected to www", async () => {
  const res = await request({ pathname: "/", host: "praiseworthy-web.vercel.app" });
  assert(res.status === 200, `preview alias expected 200, got ${res.status} ${res.location}`);
  assert(res.robots === "noindex, nofollow", `preview X-Robots-Tag was ${res.robots}`);
});

record("staging host is noindexed", async () => {
  const res = await request({
    pathname: "/",
    host: "praiseworthyroofing.aiworkflowautomations.net",
  });
  assert(res.status === 200, `staging expected 200, got ${res.status} ${res.location}`);
  assert(res.robots === "noindex, nofollow", `staging X-Robots-Tag was ${res.robots}`);
});

record("API GET is not slash-redirected", async () => {
  const res = await request({
    pathname: "/api/lead",
    host: "www.praiseworthyroofing.com",
  });
  assert(res.status === 405, `API GET expected 405, got ${res.status} location=${res.location}`);
});

record("API POST stays on /api/lead without outbound webhook", async () => {
  const payload = JSON.stringify({
    name: "Local SEO Verify",
    phone: "6822500078",
    zip: "76180",
    need: "check",
    pagePath: "/",
    locale: "en",
    message: "local regression only",
    honeypot: "1",
  });
  const res = await request({
    pathname: "/api/lead",
    host: "www.praiseworthyroofing.com",
    method: "POST",
    headers: {
      "content-type": "application/json",
      "content-length": Buffer.byteLength(payload),
    },
    body: payload,
  });
  assert(res.status === 200, `honeypot POST expected 200, got ${res.status} ${res.body}`);
  const json = JSON.parse(res.body);
  assert(json.ok === true, `unexpected API body ${res.body}`);
  assert(String(json.lead_id || "").startsWith("ignored_"), `expected ignored lead id, got ${json.lead_id}`);
});

record("static asset is not slash-redirected", async () => {
  const res = await request({
    pathname: "/images/social/social-card.webp",
    host: "www.praiseworthyroofing.com",
  });
  assert(res.status === 200, `asset expected 200, got ${res.status} ${res.location}`);
});

let failed = 0;
for (const testCase of cases) {
  try {
    await testCase.fn();
    console.log(`ok  ${testCase.name}`);
  } catch (error) {
    failed += 1;
    console.error(`not ok  ${testCase.name}`);
    console.error(error instanceof Error ? error.message : error);
  }
}

assert(failed === 0, `${failed} HTTP verification check(s) failed against ${ORIGIN}.`);
console.log(`HTTP host/slash/preview verification passed against ${ORIGIN}.`);
