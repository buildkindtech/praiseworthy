# Praise Worthy favicon verification — 2026-09-06

Isolated snapshot only. **Production is not fixed.** No push, deploy, DNS, or live asset change.

Hermes visually confirmed live `https://www.praiseworthyroofing.com/favicon.ico` is the Create Next App black tile / white Vercel triangle. This checkout at `9ba621b` had the same file: `app/favicon.ico` = 25,931 bytes, SHA-256 `2b8ad2d33455a8f736fc3a8ebf8f0bdea8848ad4c0db48a2833bd0f9cd775932`.

Root cause: both route-group layouts declared PNG icons, but Next file metadata still emitted `app/favicon.ico`. Browsers request `/favicon.ico` first, so the stale Vercel ICO won.

## What changed (local)

Existing PW assets only. No redesign, no paid image API.

The 299×318 monogram PNG is transparent; compositing it onto a transparent/black canvas lost contrast on dark browser tabs (Hermes visual QA). Raster tiles now use the same opaque `#F9F8F4` fill as `public/favicon.svg`.

| Asset | Result |
| --- | --- |
| `scripts/assets/pw-monogram.png` | Original 299×318 RGBA monogram (source preserved) |
| `app/icon.png` | Square 512×512 RGB PNG, cream tile, even pad, no stretch |
| `app/apple-icon.png` | Square 180×180 RGB PNG, opaque cream (Apple-safe) |
| `app/favicon.ico` | 5,199 bytes; ICO directory 16×16, 32×32, 48×48 |
| `public/favicon.svg` + `app/icon.svg` | Unchanged and byte-identical (`ea4a20a9…`) |
| Layout `icons` metadata | Removed so file-based ICO/PNG/SVG/Apple are the only set |
| `seo-verification-logs/favicon-contact-sheet.png` | 16 / 32 / 48 / 180 inspect row |

Generator: `python3 scripts/generate-favicons.py` (system Pillow, already installed). `npm run generate:favicons` wraps it.

## On-disk hashes after generation

```
4d92242725cec0e872b0e99a332341f597efffde8b2cbf846c95e5d17b3498af  app/favicon.ico
89a8b6806920cfda36e8d1c7f08a215d39f01174409d2e9e928e4f2ebd37a546  app/icon.png
5e017a9be381da7b0b9d51f6613765833aeb3d3754f96e1a91c481ad8ef202cb  app/apple-icon.png
```

ICO SHA-256 ≠ original Vercel `2b8ad2d3…`. Byte length 5,199 ≠ 25,931. PNG corners sampled `(249, 248, 244, 255)` = `#F9F8F4`.

## Generated HTML (local production build)

EN `/`, `/es/`, `/zh/`, `/ko/` each emit exactly these four links (no `shortcut` duplicate):

```html
<link rel="icon" href="/favicon.ico?favicon.e6db3b2d.ico" sizes="48x48" type="image/x-icon"/>
<link rel="icon" href="/icon.png?icon.cb0abc81.png" sizes="512x512" type="image/png"/>
<link rel="icon" href="/icon.svg?icon.3f22d7f8.svg" sizes="any" type="image/svg+xml"/>
<link rel="apple-touch-icon" href="/apple-icon.png?apple-icon.5faea216.png" sizes="180x180" type="image/png"/>
```

Complementary formats of the same PW mark, not two brands.

## Commands and exit codes

Working directory: `/Users/aaron/projects/praiseworthy-seo-grok-20260906`

```bash
python3 scripts/generate-favicons.py    # exit 0
npm run verify:all                      # exit 0
# lint && build && test:host-seo && verify:server
```

`verify:server` now also runs `node scripts/verify-favicons.mjs` against `http://127.0.0.1:3005`:

- On-disk ICO is not the Vercel SHA / 25,931-byte file
- ICO contains 16×16, 32×32, 48×48
- `app/icon.png` is 512×512; `app/apple-icon.png` is 180×180
- PNG corners are opaque `#F9F8F4` (same as SVG tile)
- Layouts do not redeclare conflicting `icons` metadata
- `GET /favicon.ico` HTTP 200 and SHA matches the new file
- `GET /favicon.svg` HTTP 200 is the existing PW SVG
- EN `/` plus `/es/`, `/zh/`, `/ko/`: each generated icon href HTTP 200

`npm run verify:all` this session: **exit 0**. Existing 49-URL SEO, host/slash, preview noindex, and `/api/lead` checks still passed.

## Not done

- Production `/favicon.ico` is still the Vercel triangle until an approved deploy.
- No push, DNS, or Vercel alias change.
- Preexisting dirty `seo-verification-logs/next-start.log` was not committed; contents restored after `verify:server`.
