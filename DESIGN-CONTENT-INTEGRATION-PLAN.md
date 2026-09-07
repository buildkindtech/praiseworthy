# New-Landing Design + Existing-Content Integration Plan

Status: implementation contract. The current migration build preserves the SEO/routes, but it does **not yet** satisfy the clarified visual requirement.

## Product decision

`/Users/aaron/Projects/praiseworthy-demo` is the definitive visible design and interaction reference for the homepage.

`/Users/aaron/Projects/praiseworthy-seo-migration` supplies the production-safe framework and the old site's valuable assets:

- 51 preserved routes: 49 indexable plus 2 legal `noindex` pages.
- Four-language home and guide content.
- Seventeen city pages.
- Titles, descriptions, canonicals, hreflang, sitemap, schema, internal links, and `www` host contract.
- Real images, phone number, Google Appointment Schedule, LeadConnector, guides, and local-search copy.

The old homepage layout is not a design source. Content must be fitted into the new landing-page system rather than retaining old cards, typography, section composition, spacing, or CTA treatments.

## Verified gap

Rendered at 1440px, the demo and migration currently differ materially:

- Demo document height: 9,488px; migration: 11,331px.
- Demo section order/IDs: `storm`, `services`, `why-us`, `projects`, `insurance`, `reviews`, `service-area`, `faq`, `contact`.
- Migration IDs: `free-inspection`, `insurance-guide`, `why-choose-us`, `before-after`, `testimonials`, `service-area`, `faq`.
- Demo uses the Fraunces/Manrope visual system; the migration uses legacy typography and component styling.
- Header, hero/form composition, stat strip, service cards, insurance section, reviews, service-area treatment, CTA/footer, mobile sticky CTA, and motion behavior do not match.
- Most demo assets are present, but several are used in different sections/crops.
- The demo form is simulated. Its visual design should be retained, but its success behavior must be replaced by a real persisted lead endpoint.

Therefore, the current build is an SEO-safe technical base, not the finished design integration.

## Protected files and contracts

Do not rewrite these during the visual pass unless a verified defect requires it:

- `lib/city-pages.ts`
- `lib/guides.ts` and localized guide sources
- `lib/i18n.ts` content keys, except where the new visual structure requires equivalent labels
- `lib/seo.ts` and `lib/seo-i18n.ts`
- route files under `app/`
- `app/sitemap.ts`
- `scripts/verify-seo.mjs`
- `scripts/verify-migration.mjs`
- `SEO-MIGRATION-CHECKLIST.md`

Every design batch must keep `npm run verify:all` green.

## Phase 1 — exact homepage shell

### `app/globals.css`

- Recreate the demo color, type, spacing, radius, shadow, background, and breakpoint tokens.
- Scope homepage-specific rules under a landing-page root to avoid regressions on city, guide, and legal templates.
- Use locally controlled Fraunces/Manrope loading rather than a runtime stylesheet dependency.
- Preserve focus visibility and `prefers-reduced-motion` behavior.

### `components/layout/Header.tsx`

- Match the demo's logo scale, navigation density, transparent-to-solid behavior, phone/inspection CTA, and mobile control.
- Preserve route-aware language switching and accessible menu semantics.

### `components/page/HomePage.tsx`

Render the demo section sequence:

1. Hero + working inspection form
2. Trust/stat strip
3. Storm awareness
4. Free inspection/services
5. Why Praise Worthy
6. Before/after projects
7. Insurance/documentation
8. Reviews
9. Service area
10. Existing local-search/guide content in demo styling
11. FAQ
12. Final inspection CTA

Localized homes must use the same structure, not separate legacy layouts.

### `components/sections/Hero.tsx`

- Match the demo's truck/founder crop, overlay, editorial H1, CTA hierarchy, benefit row, and right-side form panel.
- Keep the current route-specific/localized H1 and supporting copy where SEO value exists.
- Replace simulated submission with a real server-confirmed lead flow. Until that endpoint exists, do not show a false success state.
- Preserve phone and Google Calendar as working fallbacks.

## Phase 2 — section-by-section visual port

Rewrite the visible markup/styling to match the demo while injecting the existing translated content:

- `StormAwareness.tsx` → demo `#storm` composition.
- `FreeInspection.tsx` → demo `#services` layout and service-truck asset.
- `WhyChooseUs.tsx` → demo `#why-us` founder/ladder composition.
- `BeforeAfter.tsx` → demo `#projects` full-width comparison treatment, keyboard accessible.
- `InsuranceGuide.tsx` → demo `#insurance` dark editorial section.
- `Testimonials.tsx` → demo `#reviews`; visible real testimonials only, no review schema.
- `ServiceArea.tsx` → demo `#service-area`, with all 17 existing routes retained.
- `SearchContent.tsx` → demo-styled editorial/local SEO block; preserve useful internal links without preserving the legacy card design.
- `FAQ.tsx` → demo accordion styling with current locale-specific questions/schema.
- `FinalCTA.tsx` → demo `#contact` visual, working call/calendar/form actions.
- `Footer.tsx` and `MobilePhoneButton.tsx` → demo footer/sticky CTA while keeping legal, language, phone, and service-area links.

## Phase 3 — assets and interaction fidelity

Use the demo asset roles consistently:

- Hero: `hero-truck-home.webp`
- Services: `service-truck.webp`
- Founder/why-us: `founder-ladder.webp`
- Projects: six before/after WebPs
- Supporting brand detail: `embroidered-shirt.webp`
- Final CTA: `cta-yard-sign.webp`
- Header/footer: the approved Praise Worthy wordmark

Port the useful demo interactions into React rather than loading `script.js`:

- Sticky header/progress state
- Scroll reveal with a no-motion fallback
- Stat counters that remain readable without JavaScript
- Before/after drag and keyboard control
- Mobile navigation
- Form-step behavior only after the real endpoint contract exists
- Decorative particles only if they do not harm performance or reduced-motion users

Do not port the fake lead success, duplicated analytics, or any interaction that hides content when JavaScript or intersection observation fails.

## Phase 4 — secondary pages

City, guide hub, guide article, and legal pages do not need to copy the single-page homepage layout. They should use the same new design system:

- Fraunces/Manrope typography
- Deep-green/ivory/gold palette
- Demo header/footer/buttons/cards
- Consistent editorial spacing and image treatment

Preserve their route-specific copy, breadcrumbs, H1, FAQs, internal links, and schema.

Target files:

- `components/page/CityPage.tsx`
- `components/page/GuidesHubPage.tsx`
- `components/page/GuidePage.tsx`
- legal routes under `app/(default)`

## Acceptance tests

### Visual

- Compare the demo and integrated homepage at 1440×1000 and 390×844.
- Homepage section order, major composition, typography, palette, asset roles, header, CTA/footer, and mobile sticky treatment match the demo.
- No horizontal overflow or content hidden by reveal defaults.
- Chat widget and sticky CTA do not make required actions inaccessible.

### Functional

- Phone links call `682-250-0078`.
- Calendar links open the verified schedule.
- Form validation never emits success.
- A successful form creates one persisted lead and returns one `lead_id`.
- Mobile menu, language switching, accordion, and before/after control work by keyboard and touch.

### SEO/regression

- `npm run verify:all` passes.
- All 51 routes remain available; sitemap contains the same 49 indexable paths.
- Exactly one H1, canonical, and valid metadata set per route.
- Localized routes retain `en`, `es`, `zh`, `ko`, and `x-default` hreflang.
- All four home variants link all 17 city routes.
- JSON-LD remains valid with no self-published review or rating schema.
- No broken internal links or images.

## Approval gates

1. Finish exact local design integration.
2. Aaron reviews localhost.
3. With explicit approval, deploy a `noindex` staging preview and verify real response headers/form/calendar/chat.
4. With separate explicit approval, perform production deploy and path-preserving apex-to-`www` redirect/DNS cutover.
