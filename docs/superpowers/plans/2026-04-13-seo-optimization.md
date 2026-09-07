# SEO Optimization Implementation Plan

> **Superseded host note (2026-07-17):** The migration canonical host is now `https://www.praiseworthyroofing.com`, matching the currently served and indexed host. Apex references below are retained only as historical context from the original plan.

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Praiseworthy Roofing site to meet the approved Google SEO requirements across metadata, semantic structure, structured data, technical SEO, internal linking, performance, and mobile usability.

**Architecture:** Centralize metadata and schema helpers in shared SEO utilities, then apply them consistently across the home, city, guides hub, and guide article page types. Keep the current App Router structure and visual design, but move SEO behavior toward reusable server-rendered configuration and crawl-friendly content structure.

**Tech Stack:** Next.js App Router, TypeScript, React 19, Next metadata routes, Tailwind CSS, Next Image, static export

---

## Chunk 1: SEO Infrastructure

### Task 1: Normalize site-level SEO constants and helpers

**Files:**
- Modify: `lib/seo.ts`
- Modify: `lib/seo-routes.ts`
- Modify: `lib/guides.ts`
- Modify: `lib/city-pages.ts`

- [ ] Step 1: Update the site origin default from `https://www.praiseworthyroofing.com` to `https://praiseworthyroofing.com`.
- [ ] Step 2: Add shared helpers for default robots, shared Open Graph images, canonical URL generation, and structured-data-safe image URLs in `lib/seo.ts`.
- [ ] Step 3: Refactor route metadata builders in `lib/guides.ts` and `lib/city-pages.ts` to use the shared helpers instead of duplicating metadata objects.
- [ ] Step 4: Keep hreflang handling intact for multilingual home and guides routes while ensuring canonical URLs always point to the final production domain.
- [ ] Step 5: Run `npm run lint` and confirm the SEO helper refactor compiles cleanly.
- [ ] Step 6: Commit the infrastructure refactor.

### Task 2: Add technical SEO routes

**Files:**
- Create: `app/robots.ts`
- Modify or delete/replace: `public/robots.txt`
- Modify: `app/sitemap.ts`
- Create: `app/not-found.tsx`

- [ ] Step 1: Create `app/robots.ts` so `robots.txt` is generated from the canonical site origin and references the sitemap.
- [ ] Step 2: Remove reliance on the static `public/robots.txt` file so the generated version is authoritative.
- [ ] Step 3: Verify `app/sitemap.ts` covers all public routes and uses shared absolute URL helpers consistently.
- [ ] Step 4: Add a custom `app/not-found.tsx` page with clear messaging and internal links to the homepage, guides hub, and primary service pages.
- [ ] Step 5: Run `npm run build` and confirm `robots.txt`, `sitemap.xml`, and `404.html` appear in the export output.
- [ ] Step 6: Commit the technical SEO route updates.

## Chunk 2: Page Templates and Semantic SEO

### Task 3: Strengthen home-page metadata, schema, and landmarks

**Files:**
- Modify: `app/(default)/layout.tsx`
- Modify: `app/[locale]/layout.tsx`
- Modify: `app/(default)/page.tsx`
- Modify: `app/[locale]/page.tsx`
- Modify: `components/page/HomePage.tsx`
- Modify: `components/sections/*.tsx` as needed for heading/landmark cleanup

- [ ] Step 1: Ensure the root and localized layouts keep a single `LocalBusiness` schema source and do not duplicate page-level schema unnecessarily.
- [ ] Step 2: Update home page metadata so title, description, canonical, Open Graph, and Twitter fields consistently use the shared helpers.
- [ ] Step 3: Review the home template and sections to keep exactly one `h1` and meaningful `h2` structure across all major content blocks.
- [ ] Step 4: Add or refine `FAQPage` schema for the visible home FAQ content.
- [ ] Step 5: Add natural internal links from high-intent sections to guides and city pages without keyword stuffing.
- [ ] Step 6: Run lint and commit the home-page SEO changes.

### Task 4: Upgrade city landing pages for local SEO

**Files:**
- Modify: `components/page/CityPage.tsx`
- Modify: `lib/city-pages.ts`
- Modify: `app/(default)/*/page.tsx` only if route exports need adjustment

- [ ] Step 1: Keep each city page at one `h1` with supporting `h2` and `h3` hierarchy for service detail, FAQ, and related links.
- [ ] Step 2: Refine city page metadata to ensure keyword-led title tags, action-oriented descriptions, canonical URLs, and correct Open Graph types.
- [ ] Step 3: Expand structured data so each city page emits `Service`, `BreadcrumbList`, and `FAQPage` cleanly from reusable data.
- [ ] Step 4: Add at least 3 natural internal links per city page to home anchors, guide pages, and nearby city pages using `Link` where appropriate.
- [ ] Step 5: Confirm hero and supporting imagery use descriptive alt text with local roofing keywords naturally.
- [ ] Step 6: Run lint and commit the city-page updates.

### Task 5: Upgrade guides hub and guide articles

**Files:**
- Modify: `components/page/GuidesHubPage.tsx`
- Modify: `components/page/GuidePage.tsx`
- Modify: `app/(default)/guides/page.tsx`
- Modify: `app/(default)/guides/[slug]/page.tsx`
- Modify: `app/[locale]/guides/page.tsx`
- Modify: `app/[locale]/guides/[slug]/page.tsx`
- Modify: `lib/guides.ts`

- [ ] Step 1: Keep the guides hub as a `CollectionPage` with a strong single `h1`, crawlable card links, and breadcrumb schema if needed.
- [ ] Step 2: Update guide metadata so article pages expose keyword-led title tags under 60 characters where possible, action-oriented descriptions, canonical URLs, and social previews.
- [ ] Step 3: Ensure guide articles use semantic content wrappers with one `h1`, section `h2`s, FAQ `h3`s, and visible internal links to related guides and city pages.
- [ ] Step 4: Add `Article`, `BreadcrumbList`, and `FAQPage` structured data where appropriate without duplicating global business schema.
- [ ] Step 5: Run lint and commit the guides SEO improvements.

## Chunk 3: Media, Performance, and Verification

### Task 6: Convert raster assets to WebP and update image usage

**Files:**
- Modify asset references in:
  `components/layout/Header.tsx`
  `components/layout/Footer.tsx`
  `components/page/CityPage.tsx`
  `components/sections/Hero.tsx`
  `components/sections/BeforeAfter.tsx`
  other image-using components found by search
- Create or replace assets under: `public/images/**`

- [ ] Step 1: Inventory all `.png` and `.jpg` assets used by the site.
- [ ] Step 2: Convert the referenced raster assets to `.webp` equivalents while preserving filenames semantically.
- [ ] Step 3: Update component references to `.webp` assets and preserve `priority` only for the true LCP hero images.
- [ ] Step 4: Confirm non-critical imagery uses lazy loading defaults and that all images have descriptive alt text.
- [ ] Step 5: Run `npm run build` and spot-check there are no broken image references.
- [ ] Step 6: Commit the media optimization pass.

### Task 7: Verify mobile-first usability and page speed safeguards

**Files:**
- Modify: shared CTA components or page components only if touch targets or spacing need adjustment
- Verify: `components/layout/Header.tsx`, `components/layout/MobilePhoneButton.tsx`, `components/ui/link-button.tsx`

- [ ] Step 1: Confirm primary interactive controls on mobile meet or exceed 44px target height.
- [ ] Step 2: Remove or avoid any unnecessary third-party scripts that could hurt Core Web Vitals.
- [ ] Step 3: Keep navigation, CTA, and content spacing mobile-first and readable at narrow widths.
- [ ] Step 4: Run `npm run lint`.
- [ ] Step 5: Run `npm run build`.
- [ ] Step 6: Inspect the production bundle for any obvious SEO or static export regressions.

### Task 8: Final verification and closeout

**Files:**
- Review only

- [ ] Step 1: Search the codebase for `<h1` and confirm each route template still renders exactly one main heading.
- [ ] Step 2: Search for image references and confirm raster assets are now WebP where required.
- [ ] Step 3: Inspect one home page, one city page, one guides hub page, and one guide article page in the build output for title, description, canonical, JSON-LD, and internal-link quality.
- [ ] Step 4: Run `git status` and review only the intended files.
- [ ] Step 5: Commit the remaining SEO verification fixes if needed.

Plan complete and saved to `docs/superpowers/plans/2026-04-13-seo-optimization.md`. Ready to execute.
