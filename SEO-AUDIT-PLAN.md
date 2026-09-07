# Praise Worthy technical SEO audit — 2026-09-06

Isolated snapshot: `/Users/aaron/projects/praiseworthy-seo-grok-20260906` branch `seo/grok-20260906`.
Live evidence: independent GET fetches this session plus `/Users/aaron/mission-control/reports/pw-seo-20260906/{live-audit.json,sitemap.xml}`.
Phone correction: `COORDINATOR-CORRECTION.md`. Tool display masking is not a defect.

This is a local code plan. Production is not fixed until a later approved deploy.

## 한국어 요약

라이브 사이트는 **색인 가능한 49개 URL이 모두 HTTP 200**이고, 각 페이지에 **title / description / 단일 H1 / www canonical**이 있습니다. 전화번호는 **깨지지 않았습니다.** 소스와 라이브 HTML 모두 `tel:+16822500078` / 스키마 `telephone: +16822500078`이며, 별표는 도구 마스킹이지 원본 데이터가 아닙니다.

**우선순위 재분류 (fresh-context review, 2026-09-06):** apex/www 중복과 슬래시 중복은 **P0 장애가 아니라 P1 technical hygiene**입니다. 라이브 페이지는 이미 www canonical을 내고 있어서 검색 엔진이 대표 URL을 고를 수 있습니다. 구현은 로컬 스냅샷에 유지하되, 프로덕션이 “다운”된 상태가 아닙니다.

P1-host. **apex와 www가 둘 다 HTTP 200**입니다. canonical / robots / sitemap은 www를 가리키는데, `https://praiseworthyroofing.com/...`도 같은 문서를 그대로 서빙합니다. www 계약을 유지한 채 **apex만 www로 308**, path/query 보존, localhost·미리보기 호스트는 리다이렉트하지 않습니다. `/api/*`는 apex에서도 보존합니다.

P1-preview. **Vercel 별칭이 색인 가능합니다.** `https://praiseworthy-web.vercel.app/` 이 `index, follow` 이고 `X-Robots-Tag`가 없습니다. 프로덕션 커스텀 도메인(www/apex)은 건드리지 않고, Next proxy가 `*.vercel.app`과 기존 스테이징 호스트에만 host-scoped `noindex, nofollow`를 붙입니다. `vercel.json`의 `*.vercel.app` 문자열은 유효한 host regex가 아니라서 추가하지 않습니다.

P1-slash. `skipTrailingSlashRedirect: true` 때문에 **슬래시 없는 페이지 URL도 200**입니다. `/api`와 확장자 있는 에셋은 건드리지 않고, 문서 route만 trailing slash로 정규화합니다.

hreflang(홈·가이드, 4언어+x-default, 상호 왕복), OG WebP 200, 도시 페이지→영문 도시 route 링크, Review/AggregateRating 스키마 없음, legal `noindex`는 이미 맞습니다. Search Console / 실제 순위 / GBP 재인증 / CrUX는 이번 세션에서 측정하지 않았습니다.

배포·DNS·GBP 수정·폼 실전송은 하지 않습니다.

## Evidence method

- Programmatic reads of `live-audit.json` (49 rows, original on-disk values).
- Independent HTTPS GETs of www, apex, preview alias, robots, sitemap, OG image, legal, 404, `/api/lead` GET.
- Source grep for `tel:`, `BUSINESS_PHONE_E164`, apex host, `skipTrailingSlashRedirect`, `vercel.json` headers.
- Regex `tel:\+1\d{10}` and exact `+16822500078`; literal `*` in tel hrefs = 0 in source and live-audit JSON.

## P1 — technical hygiene (not a production outage)

Existing www canonicals already mitigate duplicate-host/slash indexing. These remain worth fixing before cutover.

### P1-1. Apex and www both HTTP 200

| Check | Result |
| --- | --- |
| `https://www.praiseworthyroofing.com/` | 200, canonical www, robots `index, follow` |
| `https://praiseworthyroofing.com/` | **200 (no redirect)**, same body, canonical still www |
| `https://praiseworthyroofing.com/fort-worth/?utm=test` | **200**, stays on apex, query preserved because nothing redirects |
| robots.txt / sitemap.xml | Host + Sitemap URLs are www-only |

Fix: host-conditional **308** from exact host `praiseworthyroofing.com` → `https://www.praiseworthyroofing.com` + path + query, combined with slash normalization in the same hop. Do not redirect `localhost`, `127.0.0.1`, Vercel aliases, arbitrary preview hosts, or `/api/*` (apex lead POST must not become a cross-origin 308).

### P1-2. Vercel alias is indexable

| Host | `X-Robots-Tag` | meta robots |
| --- | --- | --- |
| www.praiseworthyroofing.com | absent | `index, follow` (keep) |
| praiseworthyroofing.com | absent | `index, follow` (will redirect) |
| praiseworthy-web.vercel.app | **absent** | **`index, follow`** |

`vercel.json` only noindexes `praiseworthyroofing.aiworkflowautomations.net`. Production custom domains must stay indexable.

Fix: `X-Robots-Tag: noindex, nofollow` from Next `proxy.ts` when Host ends with `.vercel.app` or is the known staging host. Never set that header for www or apex. Do **not** add `vercel.json` `has.host` `*.vercel.app`: Vercel treats that string as regex, and a leading `*` is invalid. Keep the exact staging host header (baseline). Public `/images/*` and `/api/*` are already in the proxy matcher; `_next/static` and `_next/image` stay on the asset pipeline.

## P1 — slash hygiene (same snapshot)

### P1-3. Duplicate slash URLs on document routes

Live (all 200, no redirect):

- `/fort-worth` and `/fort-worth/`
- apex + www variants of the same

`next.config.ts` has `trailingSlash: true` and `skipTrailingSlashRedirect: true`. Canonical tags already use trailing slashes, so this is duplicate URL space rather than a canonical-tag bug.

Fix: route-only 308 to the trailing-slash URL. Preserve query. **Do not** rewrite `/api/*` (lead POST must stay). **Do not** rewrite filenames with extensions (WebP, robots.txt, sitemap.xml, JS/CSS). Combine with apex→www in one hop when both apply.

### P1-4. Phone regression assertions only

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

## Practical roadmap (no production writes)

Do these after Aaron locally reviews the snapshot. None of this is a code change in this branch.

1. **GBP verification.** Re-check the live profile (memory notes a 2026-09-01 video rejection). Capture current verification/suspension state. Do not edit name, address, category, or hours until Peter’s evidence is in hand.
2. **Search Console + GA4 metrics.** Confirm whether a PW GSC property and GA4 property exist and are shared with `info@buildkind.tech`. Baseline coverage, sitemap processing, canonical selection, impressions/clicks, and CrUX/CWV. Do not add tags or properties from this snapshot.
3. **Confirmed service pages / case studies.** Keep the existing 49 indexable routes. Add service or project pages only from Peter-confirmed jobs, photos, warranty, and hours. Do not invent testimonials, case studies, or extra city landings.
4. **NAP name.** Site “Praise Worthy Roofing” vs Peter text “Praiseworthy Roofing” needs owner evidence; no silent rename.
5. **Cutover.** Staging noindex review first, then a later approved www 200 + apex→www 308 DNS/deploy. Live form POST stays on the existing `/api/lead` implementation.

## Out of scope for this code change

Service-content expansion, case studies, Search Console/GA4 setup, GBP edits, DNS, production deploy, live form POST, credential files, redesign, new city pages.

## Implementation plan (local only)

1. Pure helpers in `lib/host-seo.ts` + node regression tests.
2. Next.js 16 `proxy.ts`: apex 308, preview `X-Robots-Tag`, document trailing-slash 308.
3. Keep `vercel.json` exact staging header. Do not add `*.vercel.app` host regex. Preview noindex comes from `proxy.ts` (HTML, public images, API). Production www/apex never get that header.
4. Adapt `scripts/verify-seo.mjs` and `scripts/verify-migration.mjs` from `out/` static export to a running `next start` origin. Same assertions; add phone + host/slash/preview HTTP checks. Do not weaken title/H1/canonical/hreflang/schema/orphan/social-image rules.
5. Local `Host` header verification. Optional local `/api/lead` POST only against this snapshot with no webhook env (no live intake).
6. Lint, production build, write `SEO-VERIFICATION.md`, commit locally. No push/deploy.
