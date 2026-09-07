# Praise Worthy SEO verification — 2026-09-06

Isolated snapshot only. **Production is not fixed.** No push, deploy, DNS, GBP, or live form POST.

Local server (this session): `http://127.0.0.1:3005/`

Duplicate host and slash handling is **P1 technical hygiene**, not a P0 outage: live pages already emit www canonicals.

## Exact commands and exit codes

Working directory: `/Users/aaron/projects/praiseworthy-seo-grok-20260906`

```bash
npm run verify:all
# lint && build && test:host-seo && verify:server
```

`npm run verify:server` starts `next start` on `127.0.0.1:3005`, then:

- `node scripts/verify-seo.mjs` — 49 indexable + legal + 404 noindex + phone
- `node scripts/verify-migration.mjs` — live sitemap path parity (GET only)
- `node scripts/verify-http.mjs` — Host-header redirects / preview noindex / API on apex+www+preview

## Review follow-up (this commit)

Vercel `headers.has` `type: host` string values are **regex**, not globs (Vercel routing-utils / docs). `*.vercel.app` is invalid regex (`*` has no atom). Removed that newly added wildcard header. Kept the baseline exact staging host rule. Preview `X-Robots-Tag` stays on `proxy.ts`. Compiled matcher from `.next/server/functions-config-manifest.json` matches `/`, `/api/lead`, and `/images/*`, and skips `/_next/static` and `/_next/image` (unsafe to intercept hashed chunks). Production www/apex never get noindex.

Apex `/api/lead` no longer 308s to www. GET 405 and honeypot POST stay on-host for apex, www, and preview. Baseline `app/api/lead` is unchanged; no live webhook.

## After (local `next start`, not production)

| Check | Result |
| --- | --- |
| Host `www.praiseworthyroofing.com` `/` | 200, no `X-Robots-Tag`, tel `+16822500078` |
| Host `praiseworthyroofing.com` `/` | **308** `https://www.praiseworthyroofing.com/` |
| Host `praiseworthyroofing.com` `/fort-worth?utm=test` | **308** `https://www.praiseworthyroofing.com/fort-worth/?utm=test` (one hop) |
| Host `www...` `/es/guides?ref=1` | **308** `https://www.praiseworthyroofing.com/es/guides/?ref=1` |
| Host `localhost` `/` | 200, not redirected to www |
| Host `praiseworthy-web.vercel.app` `/` | 200, **`X-Robots-Tag: noindex, nofollow`**, not redirected to www |
| Staging host | 200, `X-Robots-Tag: noindex, nofollow` |
| `/api/lead` GET on apex, www, preview | **405**, no Location |
| `/api/lead` POST honeypot on apex, www, preview | 200 `ignored_*`, no redirect, no webhook |
| Preview `/images/social/social-card.webp` | 200 + `X-Robots-Tag: noindex, nofollow` |
| www `/images/social/social-card.webp` | 200, no `X-Robots-Tag` |
| SEO verifier | 49 indexable URLs + legal noindex + 404 noindex + phone + reciprocal hreflang |
| Migration verifier | 49 live indexable paths preserved |

## Render

Hermes independently verified earlier against this snapshot: **desktop 1280 and mobile 390**, zero broken images, zero horizontal overflow. That pass is not repeated here (no Chrome launch). Prior local 1440 screenshot remains at `seo-verification-logs/screens/home-1440.png`. Live form POST was not used.

## Unresolved business / manual gates

- Production/DNS cutover of these redirects and preview headers is **not** done.
- Search Console, GA4, CrUX, live rankings: not measured.
- GBP verification (memory notes a rejected video): not re-checked, no GBP edits.
- NAP public name (“Praise Worthy” vs Peter’s “Praiseworthy Roofing”): owner evidence, not changed.
- Testimonials / hours / warranty / case studies: not invented; add only from Peter-confirmed jobs.
- Practical roadmap is in `SEO-AUDIT-PLAN.md` (GBP check, GSC/GA4 baseline, confirmed service/case-study pages). No production writes.
