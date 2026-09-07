# Guides Hub Readability Refresh Design

## Goal

Make `/guides/` easier to scan as more articles are added, while keeping the page clearly optimized for service-site conversion rather than passive blog browsing.

## Chosen Direction

Use a **service-oriented magazine layout**:

- Keep a short hero section with strong brand and service framing
- Add an immediate CTA band near the top
- Convert the guide area into a cleaner, more scannable list-first layout
- Keep secondary service content visible, but reduce competition with the article list

## Problems With Current Page

- Too many visually strong blocks compete at once
- Guide cards are dense, so scanning multiple titles is slower than it should be
- Related areas and side CTA content compete too aggressively with the article list
- As article count grows, the current layout will feel busier rather than clearer

## New Information Hierarchy

1. Short, service-focused hero
2. High-conversion CTA band
3. Main guide list
4. Secondary service support blocks
5. Related service areas lower on the page

## Layout Changes

### Hero

- Keep the hero, but shorten copy and reduce visual weight
- Preserve strong service-site tone
- Keep phone and scheduling CTAs visible

### CTA Band

- Add a dedicated CTA strip immediately below the hero
- Emphasize `Call now` and `Schedule a Free Inspection`
- Include one short trust/reassurance line

### Guide List

- Shift from visually heavy card grid feel toward a cleaner vertical editorial list
- Each guide should prioritize:
  - Title
  - Short summary
  - 2-3 contextual tags/city cues
  - Simple `Read guide` action
- Reduce decorative density so the list is easier to scan quickly

### Secondary Service Blocks

- Keep a conversion-focused service card visible
- Reduce competing long-form content in the sidebar
- Move related service areas lower so they support navigation without overpowering the list

## Visual Tone

- Service-site confidence over blog-like softness
- Cleaner spacing and clearer rhythm
- Strong CTA contrast
- Less simultaneous emphasis per section

## Non-Goals

- No CMS or content model changes
- No route changes
- No redesign of individual guide article pages

## Verification

- `npm run lint`
- `npm run build`
