# Praise Worthy SEO Migration Checklist

This repository is the migration base. The one-page demo is a visual reference only.

## Protected production contract

- Preserve all 51 public routes: 49 indexable pages and 2 accessible legal pages.
- Keep the existing city, guide, and localized content modules as the source of truth.
- Keep route-specific titles, descriptions, canonicals, hreflang, H1s, and JSON-LD.
- Keep the real phone, Google Calendar, and LeadConnector integrations.
- Keep `/privacy-policy/` and `/terms/` available with `noindex, follow`, but exclude them from the sitemap.
- Do not ship simulated lead forms or unverified review/rating structured data.

Run the full gate before every reviewed preview or production candidate:

```bash
npm run verify:all
```

The gate builds the static export, checks every indexable URL and legal page, validates internal links and assets, and compares the built path set with the current live sitemap.

## Canonical host contract

The intended canonical host for this migration is `https://www.praiseworthyroofing.com`.
The public site is currently indexed on `www`, so keeping that host avoids combining
a redesign with a second, unnecessary host migration.

At cutover, these conditions must become true together:

1. Every `www` URL returns its page directly with HTTP 200.
2. Every `https://praiseworthyroofing.com/<path>` URL makes one permanent, path-preserving redirect to `https://www.praiseworthyroofing.com/<path>`.
3. HTTP variants redirect to the same HTTPS `www` URL.
4. Canonical, hreflang, sitemap, Open Graph, robots sitemap reference, and schema IDs all use `www`.
5. Do not create redirect chains and do not redirect old deep URLs to the homepage.

The current production redirect already resolves to `www`, but its generated SEO tags point to apex. The migration fixes the tags to match the indexed and served host. DNS and redirect changes must still be reviewed together.

## Preview review

The custom staging host `praiseworthyroofing.aiworkflowautomations.net` must return
`X-Robots-Tag: noindex, nofollow` on every response. Standard Vercel preview URLs
are noindexed by Vercel automatically; verify the header anyway before sharing.

Before approval, inspect at minimum:

- `/`
- `/es/`
- `/fort-worth/`
- `/guides/`
- `/ko/guides/hail-damage-roof-inspection-dfw/`
- `/privacy-policy/`

Review desktop and mobile rendering, mobile navigation, language switching, before/after controls, phone links, calendar links, and LeadConnector loading. Do not submit a lead during QA without explicit approval.

## Launch sequence

1. Capture the final `npm run verify:all` output and review the preview locally.
2. Confirm the apex/www redirect behavior in the hosting project before DNS cutover.
3. Deploy only after explicit approval.
4. Change DNS only after explicit approval and a reviewed rollback plan.
5. Verify all 51 URLs, redirects, `robots.txt`, and `sitemap.xml` against production.
6. Submit the `www` sitemap in Google Search Console and inspect the home page, one city page, and one localized guide.
7. Monitor indexing, canonical selection, 404s, organic clicks, and impressions daily for the first week, then weekly for four weeks.

## Content claims requiring owner confirmation

The unverified `500+` roof and `24h` / `24-48 hour` response claims have been removed from the production candidate. Testimonial identities/content, published business hours, and warranty language were inherited from the current source and were not independently verified during this migration. Confirm them with the business owner before launch; do not add rating/review JSON-LD until the testimonial source and authenticity are documented.

The inspection panels are production-ready action cards, not simulated forms: they collect no data and link only to the verified Google Appointment Schedule and phone number. The LeadConnector chat remains the existing on-site lead capture integration.
