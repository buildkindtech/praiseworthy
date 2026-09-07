# Praise Worthy SEO verification — 2026-09-06

Isolated snapshot only. **Production is not fixed.** No push, deploy, DNS, GBP, or live form POST.

Local server (this session): `http://127.0.0.1:3005/`

## Exact commands and exit codes

Working directory: `/Users/aaron/projects/praiseworthy-seo-grok-20260906`

Disk: internal free was ~2.2–2.8Gi. npm cache: `/Volumes/Archive/pw-seo-grok-20260906-npm/cache`. Duplicate Archive `node_modules` copy exists for cache reuse. Project `node_modules` is a real directory (Turbopack rejects an off-volume `node_modules` symlink). `.next` is in the project (28M). Archive `.next` symlink caused a Next prerender invariant and was removed.

```bash
npm ci --cache /Volumes/Archive/pw-seo-grok-20260906-npm/cache --no-audit --no-fund
# exit 0

npx eslint .
# exit 0
# log: seo-verification-logs/eslint.txt

node --experimental-strip-types --no-warnings scripts/test-host-seo.mjs
# exit 0
# log: seo-verification-logs/test-host-seo.txt

npm run build
# exit 0
# 59 routes generated, including /api/lead (dynamic) and Proxy (Middleware)

npm run verify:server
# exit 0
# log: seo-verification-logs/verify-server.txt
# starts next start on 127.0.0.1:3005, then:
#   node scripts/verify-seo.mjs          # 49 indexable + legal + 404 noindex + phone
#   node scripts/verify-migration.mjs    # live sitemap path parity (GET only)
#   node scripts/verify-http.mjs         # Host-header redirects / preview noindex / API
```

`npm run verify:all` is `lint && build && test:host-seo && verify:server`.

## Before (live, this session)

| Check | Result |
| --- | --- |
| 49 sitemap URLs | HTTP 200, unique title/description, one H1, www canonical |
| Phone | `tel:+16822500078` on every audited page; JSON-LD telephone same; live-audit.json literal `*` count 0 |
| `https://praiseworthyroofing.com/` | **HTTP 200**, no redirect, canonical still www |
| `https://praiseworthyroofing.com/fort-worth/?utm=test` | **HTTP 200** on apex |
| `/fort-worth` vs `/fort-worth/` | both **200** |
| `https://praiseworthy-web.vercel.app/` | 200, meta `index, follow`, **no `X-Robots-Tag`** |
| robots.txt / sitemap.xml | www Host + Sitemap; no apex loc |
| OG image | `.../social-card.webp` 200, 112236 bytes |
| hreflang | home/guides reciprocal en/es/zh/ko/x-default; cities correctly have none |
| `/api/lead` GET | 405 (route exists) |
| Review schema | absent |

## After (local `next start`, not production)

| Check | Result |
| --- | --- |
| Host `www.praiseworthyroofing.com` `/` | 200, no `X-Robots-Tag`, tel `+16822500078` |
| Host `praiseworthyroofing.com` `/` | **308** `https://www.praiseworthyroofing.com/` |
| Host `praiseworthyroofing.com` `/fort-worth?utm=test` | **308** `https://www.praiseworthyroofing.com/fort-worth/?utm=test` (one hop) |
| Host `www...` `/es/guides?ref=1` | **308** `https://www.praiseworthyroofing.com/es/guides/?ref=1` |
| Host `localhost` `/` | 200, not redirected to www |
| Host `localhost` `/fort-worth` | 308 local `/fort-worth/` |
| Host `random-preview.example.com` `/fort-worth/` | 200, no noindex |
| Host `praiseworthy-web.vercel.app` `/` | 200, **`X-Robots-Tag: noindex, nofollow`**, not redirected to www |
| Staging host | 200, `X-Robots-Tag: noindex, nofollow` |
| `/api/lead` GET | 405, not slash-redirected |
| `/api/lead` POST honeypot | 200 `ignored_*` lead id (no webhook env, not a live submit) |
| `/images/social/social-card.webp` | 200, not slash-redirected |
| SEO verifier | 49 indexable URLs + legal noindex + 404 noindex + phone + reciprocal hreflang |
| Migration verifier | 49 live indexable paths preserved |

## Render

Headless Chrome 1440×900 of local home: `seo-verification-logs/screens/home-1440.png`. Phone `682-250-0078` visible in header and hero. Design unchanged. Form was **not** submitted. A follow-up 390px screenshot hung in Chrome’s updater; HTML GET with desktop and iPhone User-Agents both 200 with `tel:+16822500078`. Live form POST was not used.

## Unresolved business / manual gates

- Production/DNS cutover of these redirects and preview headers is **not** done.
- Search Console, GA4, CrUX, live rankings: not measured.
- GBP verification (memory notes a rejected video): not re-checked, no GBP edits.
- NAP public name (“Praise Worthy” vs Peter’s “Praiseworthy Roofing”): owner evidence, not changed.
- Testimonials / hours / warranty / case studies: not invented.
- Hermes independent verification still owed against this commit and local server.
