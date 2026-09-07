# Favicon verification — final local snapshot

Production unchanged. Live ICO was visually confirmed Vercel triangle (SHA256 2b8ad2d33455a8f736fc3a8ebf8f0bdea8848ad4c0db48a2833bd0f9cd775932). It was advertised alongside PW PNG, giving browsers conflicting branding.

Cursor Grok job 20260907005733-5a8cb6b0 completed exit0 at bd849c0. Existing PW monogram preserved in scripts/assets/pw-monogram.png. New cream opaque tiles: ICO16/32/48, PNG512, Apple180. Manual layout icon metadata removed; Next file metadata uses content-versioned links.

Independent review identified a remaining font-dependent SVG approximation. Hermes corrected SVG to embed the exact PW PNG, with byte-equality regression checks. Optional SVG was moved from app/icon.svg to public/pw-monogram.svg, and public/favicon.svg is identical. SVG is no longer advertised as a competing favicon. The advertised formats are actual PW ICO/PNG/Apple only. No business copy or customer data changed.

Intermediate build: embedded-raster SVG in Next file-metadata routing triggered Turbopack internal panic; fresh cache did not fix it. Moving the optional SVG out of Next metadata routing resolved it. Old build cache preserved outside repo under mission-control/reports/pw-seo-20260906/build-cache-before-favicon-qa. A temporary cache move inside repo caused lint to scan generated files; corrected by moving outside repo, no lint rules relaxed.

Final independent execution: npm run verify:all EXIT0 (lint, production build58 generated routes, host tests,49 indexable URLs plus legal,49URL migration parity,API/host/preview HTTP regressions,favicon tests). All four locales /,/es/,/zh/,/ko/ advertise three icon links, each HTTP200. ICO SHA256 4d92242725cec0e872b0e99a332341f597efffde8b2cbf846c95e5d17b3498af matches served file. SVG payload exactly matches PNG. Visual contact sheet confirms no Vercel/clipping/distortion in new ICO frames.

No push/deploy/DNS/outbound sends. Existing dirty server log not included in commits. Deployment still requires Aaron review+approval and baseline/live lineage reconciliation.
