# Guides Hub Readability Refresh Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the `/guides/` hub so it reads like a conversion-focused service page while staying easier to scan as more guides are added.

**Architecture:** Keep the existing route and data model, but reorganize `GuidesHubPage` into a stronger hierarchy: short hero, dedicated CTA band, cleaner guide list, and lower-priority supporting sections. Reuse current guide and city data so no routing or CMS changes are required.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, existing shared UI components

---

## Chunk 1: Layout Restructure

### Task 1: Refactor Guides Hub hierarchy

**Files:**
- Modify: `components/page/GuidesHubPage.tsx`
- Verify: `npm run lint`
- Verify: `npm run build`

- [ ] **Step 1: Review the current hub component sections**

Read `components/page/GuidesHubPage.tsx` and identify the current hero, guide list, sidebar, and related areas blocks.

- [ ] **Step 2: Shorten the hero content footprint**

Reduce vertical weight in the hero by tightening spacing and limiting the top supporting content to the highest-signal elements.

- [ ] **Step 3: Add a dedicated CTA band below the hero**

Create a compact CTA strip immediately after the hero using the existing phone and schedule actions plus one short reassurance line.

- [ ] **Step 4: Convert the guide area into a list-first reading experience**

Replace the visually heavy guide grid feel with a cleaner vertical flow that emphasizes title, summary, tags, and a clear read action.

- [ ] **Step 5: Reduce competing sidebar content**

Simplify the sidebar into one strong service CTA card and move lower-priority support content further down the page.

- [ ] **Step 6: Move related service areas below the main guide list**

Reposition related city/service-area links into a lower section so they support navigation without competing with the primary reading flow.

- [ ] **Step 7: Preserve existing schema output**

Keep the current JSON-LD behavior intact while reorganizing layout markup.

- [ ] **Step 8: Run lint**

Run: `npm run lint`  
Expected: exit code 0

- [ ] **Step 9: Run build**

Run: `npm run build`  
Expected: exit code 0 and the guides hub routes remain generated

- [ ] **Step 10: Commit**

```bash
git add components/page/GuidesHubPage.tsx
git commit -m "Improve guides hub readability"
```
