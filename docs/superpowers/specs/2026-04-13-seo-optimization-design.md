# Praiseworthy Web SEO Optimization Design

> **Superseded host note (2026-07-17):** The migration canonical host is now `https://www.praiseworthyroofing.com`, matching the currently served and indexed host. Apex references below are retained only as historical context from the original plan.

## Goal

Raise Google SEO quality across the Praiseworthy Roofing site by standardizing semantic page structure, metadata, structured data, internal linking, and technical SEO while preserving the existing visual brand and multilingual routing.

## Scope

- Home pages for `en`, `es`, `zh`, and `ko`
- City landing pages
- Guides hub pages
- Guide article pages
- Global layout and shared navigation/footer
- Technical SEO assets including `robots`, `sitemap`, and custom `404`
- Image delivery and mobile usability improvements that affect Core Web Vitals

## Recommended Approach

Use a shared SEO configuration layer plus page-type-specific schema builders.

This keeps metadata rules in one place while letting each page type express the right search intent:

- Home pages: `WebPage`, `Service`, `LocalBusiness`, `FAQPage`
- City pages: `Service`, `LocalBusiness`, `BreadcrumbList`, `FAQPage`
- Guides hub: `CollectionPage`, `ItemList`, `BreadcrumbList`
- Guide articles: `Article`, `FAQPage`, `BreadcrumbList`

This is better than only patching metadata because the current site already has content depth and multilingual routing. The highest leverage change is to make the content structure, metadata, and internal linking consistent everywhere.

## Architecture

### 1. Shared SEO utilities

Create reusable helpers in `lib/seo.ts` or adjacent SEO helpers for:

- site origin and canonical URL generation using `https://praiseworthyroofing.com`
- shared Open Graph image references
- title and description normalization
- robots defaults
- JSON-LD builders for `LocalBusiness`, `FAQPage`, `BreadcrumbList`, `CollectionPage`, and `Article`

### 2. Page metadata ownership

Each route should continue exporting metadata, but route metadata should be built from shared helpers instead of handwritten objects.

- Root and localized home routes keep canonical and hreflang support
- City pages use per-city metadata plus localized internal links
- Guide routes keep article metadata with article schema and related links
- Guides hub pages expose collection metadata and crawl-friendly item lists

### 3. Semantic layout updates

Keep the visual layout but strengthen HTML landmarks and heading hierarchy:

- exactly one `h1` per page
- `header`, `nav`, `main`, `section`, `article`, and `footer` used intentionally
- FAQ entries on content-heavy pages wrapped in `article`
- sidebars exposed as `aside`

### 4. Technical SEO and crawl assets

- replace static `public/robots.txt` with `app/robots.ts` so the sitemap URL is always correct
- keep `app/sitemap.ts` as the canonical source and ensure all public routes are listed
- add `app/not-found.tsx` with crawl-safe guidance and strong internal links
- preserve lowercase, hyphenated, short URL patterns already in use

### 5. Performance and media strategy

- convert site-served raster images from PNG and JPG to WebP
- update image references to WebP files
- keep only above-the-fold hero imagery as `priority`
- use lazy loading defaults for below-the-fold images
- make alt text descriptive and keyword-aware without stuffing
- avoid introducing any new third-party scripts

## Page-Type Design

### Home pages

- Keep one keyword-led `h1` in the hero
- Add page-level FAQ schema sourced from the visible FAQ section
- Ensure each major content block is a `section` with its own `h2`
- Strengthen internal links from hero/footer/FAQ into guides and city pages

### City pages

- Position the city keyword in the `title`, `description`, `h1`, hero alt text, and FAQ headings
- Keep one `h1`, with body sections organized under `h2` and FAQ under `h2` + `h3`
- Add breadcrumb schema and at least 3 natural internal links to home, guides, and nearby city pages
- Keep service intent clear for local SEO using `RoofingContractor` and `Service`

### Guides hub

- Treat as a `CollectionPage`
- Ensure guide cards create clear crawlable internal links
- Add breadcrumb schema and localized canonical/hreflang links

### Guide article pages

- Treat each guide as an `Article`
- Wrap major content blocks in `article` content sections under a single `h1`
- Add breadcrumb schema and FAQ schema
- Ensure at least 3 internal links to related guides, service pages, and contact paths

## Mobile-First Requirements

- retain viewport metadata
- ensure primary CTA buttons meet or exceed a 44px touch target
- preserve readable spacing and stacking order on narrow screens
- avoid interaction patterns that depend on hover only

## Error Handling

- invalid locale or missing slugs continue to use `notFound()`
- custom 404 page should return a helpful path back to high-value pages
- schema builders should return nothing for missing optional FAQ or breadcrumb inputs instead of emitting invalid JSON-LD

## Verification Plan

- run lint
- run production build
- inspect generated `out` output for `404.html`, sitemap, and robots
- verify no page has more than one `h1`
- verify all raster image references point to `.webp`
- spot-check metadata and JSON-LD on one home page, one city page, one guides hub page, and one guide article page

## Risks and Mitigations

- Risk: changing image filenames can break references
  Mitigation: convert assets first, update references centrally, then run build verification

- Risk: duplicated schema across layout and page components
  Mitigation: keep `LocalBusiness` global and move page-specific schemas into page templates only

- Risk: multilingual routes could emit incorrect canonical URLs
  Mitigation: generate canonicals only from shared route helpers and site origin constants
