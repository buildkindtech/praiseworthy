# Praise Worthy technical SEO audit — 2026-09-06

Isolated snapshot: `/Users/aaron/projects/praiseworthy-seo-grok-20260906` branch `seo/grok-20260906`.
Live evidence: independent GET fetches this session plus `/Users/aaron/mission-control/reports/pw-seo-20260906/{live-audit.json,sitemap.xml}`.
Phone correction: `COORDINATOR-CORRECTION.md`. Tool display masking is not a defect.

This is a local code plan. Production is not fixed until a later approved deploy.

## 한국어 요약

라이브 사이트는 **색인 가능한 49개 URL이 모두 HTTP 200**이고, 각 페이지에 **title / description / 단일 H1 / www canonical**이 있습니다. 전화번호는 **깨지지 않았습니다.** 소스와 라이브 HTML 모두 `tel:+16822500078` / 스키마 `telephone: +16822500078`이며, 별표는 도구 마스킹이지 원본 데이터가 아닙니다.

실제 P0는 두 가지입니다.

1. **apex와 www가 둘 다 HTTP 200**입니다. canonical / robots / sitemap은 www를 가리키는데, `https://praiseworthyroofing.com/...`도 같은 문서를 그대로 서빙합니다. www 계약을 유지한 채 **apex만 www로 308**, path/query 보존, localhost·미리보기 호스트는 리다이렉트하지 않습니다.
2. **Vercel 별칭이 색인 가능합니다.** `https://praiseworthy-web.vercel.app/` 이 `index, follow` 이고 `X-Robots-Tag`가 없습니다. 프로덕션 커스텀 도메인(www/apex)은 건드리지 않고, `*.vercel.app`과 기존 스테이징 호스트에만 host-scoped `noindex, nofollow`를 붙입니다.

P1은 `skipTrailingSlashRedirect: true` 때문에 **슬래시 없는 페이지 URL도 200**인 점입니다. `/api`와 확장자 있는 에셋은 건드리지 않고, 문서 route만 trailing slash로 정규화합니다.

hreflang(홈·가이드, 4언어+x-default, 상호 왕복), OG WebP 200, 도시 페이지→영문 도시 route 링크, Review/AggregateRating 스키마 없음, legal `noindex`는 이미 맞습니다. Search Console / 실제 순위 / GBP 재인증 / CrUX는 이번 세션에서 측정하지 않았습니다.

배포·DNS·GBP 수정·폼 실전송은 하지 않습니다.

## Evidence method

- Programmatic reads of `live-audit.json` (49 rows, original on-disk values).
- Independent HTTPS GETs of www, apex, preview alias, robots, sitemap, OG image, legal, 404, `/api/lead` GET.
- Source grep for `tel:`, `BUSINESS_PHONE_E164`, apex host, `skipTrailingSlashRedirect`, `vercel.json` headers.
- Regex `tel:\+1\d{10}` and exact `+16822500078`; literal `*` in tel hrefs = 0 in source and live-audit JSON.

## P0 — implement in this snapshot

### P0-1. Apex and www both HTTP 200

| Check | Result |
| --- | --- |
| `https://www.praiseworthyroofing.com/` | 200, canonical www, robots `index, follow` |
| `https://praiseworthyroofing.com/` | **200 (no redirect)**, same body, canonical still www |
| `https://praiseworthyroofing.com/fort-worth/?utm=test` | **200**, stays on apex, query preserved because nothing redirects |
| robots.txt / sitemap.xml | Host + Sitemap URLs are www-only |

Fix: host-conditional **308** from exact host `praiseworthyroofing.com` → `https://www.praiseworthyroofing.com` + path + query, combined with slash normalization in the same hop. Do not redirect `localhost`, `127.0.0.1`, `*.vercel.app`, or arbitrary preview hosts.

### P0-2. Vercel alias is indexable

| Host | `X-Robots-Tag` | meta robots |
| --- | --- | --- |
| www.praiseworthyroofing.com | absent | `index, follow` (keep) |
| praiseworthyroofing.com | absent | `index, follow` (will redirect) |
| praiseworthy-web.vercel.app | **absent** | **`index, follow`** |

`vercel.json` only noindexes `praiseworthyroofing.aiworkflowautomations.net`. Production custom domains must stay indexable.

Fix: `X-Robots-Tag: noindex, nofollow` when Host is `*.vercel.app` or the known staging host. Never set that header for www or apex.

## P1 — implement in this snapshot

### P1-1. Duplicate slash URLs on document routes

Live (all 200, no redirect):

- `/fort-worth` and `/fort-worth/`
- apex + www variants of the same

`next.config.ts` has `trailingSlash: true` and `skipTrailingSlashRedirect: true`. Canonical tags already use trailing slashes, so this is duplicate URL space rather than a canonical-tag bug.

Fix: route-only 308 to the trailing-slash URL. Preserve query. **Do not** rewrite `/api/*` (lead POST must stay). **Do not** rewrite filenames with extensions (WebP, robots.txt, sitemap.xml, JS/CSS). Combine with apex→www in one hop when both apply.

### P1-2. Phone regression assertions only

Withdrawn as a defect. Source `lib/seo.ts`: `BUSINESS_PHONE_E164 = "+16822500078"`. Live tel and JSON-LD telephone match. No phone markup change.

## Already good (do not “fix”)

- 49 sitemap URLs HTTP 200; unique title (50–59 chars) and description (140–160); one H1; one www canonical; `index, follow`.
- robots.txt `Host` + `Sitemap` on www; sitemap loc + xhtml hreflang on www; no apex loc; privacy/terms excluded from sitemap and served `noindex, follow`.
- Live 404 body includes `noindex`.
- Home / locale homes / guides hubs / localized guides: hreflang `en/es/zh/ko/x-default`, reciprocal. City pages have no locale variants and correctly omit hreflang.
- ES/ZH/KO homes link to existing English city routes (`/arlington/` etc.), not missing `/es/arlington/` URLs.
- OG/Twitter image `https://www.praiseworthyroofing.com/images/social/social-card.webp` HTTP 200 `image/webp` (112236 bytes). Metadata has no trailing slash on the image URL.
- Schema `RoofingContractor.telephone` and `ContactPoint.telephone` = `+16822500078`. No Review/AggregateRating JSON-LD.
- Lead route exists as App Router `POST /api/lead` (GET 405). Do not convert the app back to static export.
- Visual design, 49 indexable routes, 2 legal routes, calendar/tel/chat integrations stay.

## Unknown / not measured this session

Treat as roadmap, not invented defects:

- Google Search Console coverage, canonical selection, and sitemap processing.
- Actual organic rankings, impressions, clicks.
- Current GBP verification state (memory notes a rejected video on 2026-09-01; not re-checked here).
- CrUX / Search Console Core Web Vitals.
- GA4 property existence and linking.
- NAP public-name conflict (site “Praise Worthy” / “Praise Worthy Roofing” vs Peter text “Praiseworthy Roofing”) — needs owner evidence, not a silent rename.
- Testimonial, hours, warranty, and project-photo authenticity — owner confirmation, no fake reviews/case studies.
- Mass extra city landings — out of scope.

## Out of scope for this code change

Service-content expansion, case studies, Search Console/GA4 setup, GBP edits, DNS, production deploy, live form POST, credential files, redesign, new city pages.

## Implementation plan (local only)

1. Pure helpers in `lib/host-seo.ts` + node regression tests.
2. Next.js 16 `proxy.ts`: apex 308, preview `X-Robots-Tag`, document trailing-slash 308.
3. Keep `vercel.json` staging header; add host-scoped noindex for `*.vercel.app` without touching custom domains.
4. Adapt `scripts/verify-seo.mjs` and `scripts/verify-migration.mjs` from `out/` static export to a running `next start` origin. Same assertions; add phone + host/slash/preview HTTP checks. Do not weaken title/H1/canonical/hreflang/schema/orphan/social-image rules.
5. Local `Host` header verification. Optional local `/api/lead` POST only against this snapshot with no webhook env (no live intake).
6. Lint, production build, write `SEO-VERIFICATION.md`, commit locally. No push/deploy.
