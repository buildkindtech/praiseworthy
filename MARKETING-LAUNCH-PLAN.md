# Praise Worthy Roofing Marketing Launch Plan

Status: local planning only. No accounts, tags, campaigns, spend, deploy, DNS, GBP, or production settings have been changed.

## 1. Launch principle

Do not buy traffic until the active phone, calendar, and chat paths are measurable and the lead owner can record qualification and inspection outcomes. Contract and collected-revenue attribution are post-launch reconciliation requirements; they determine scaling, not whether a tightly capped pilot can begin.

The visible homepage must keep the new `praiseworthy-demo` landing-page design. The existing site's 51 routes, localized content, images, metadata, internal links, schema, phone, calendar, and LeadConnector integration are source material—not the visual template.

## 2. Verified current state

- Production and the migration source have no GA4, Google tag, GTM, or Meta Pixel.
- The current conversion surfaces are telephone links, Google Appointment Schedule links, and LeadConnector chat.
- The local candidate no longer presents a simulated inspection form. Its live-intent conversion paths are the verified telephone links, Google Appointment Schedule links, and LeadConnector chat widget.
- PW Command Center stores a broad source/campaign value but not first/last touch UTMs, ad click IDs, consent evidence, lifecycle timestamps, or platform sync status.
- Aaron's GBP manager access was verified in the live Google interface on 2026-07-17; current NAP, categories, hours, services, and destination URLs still need a launch audit.
- Meta invitation is accepted, but Aaron has no Page, Instagram, or Ad Account assets assigned; Pixel/CAPI and campaign work are blocked.
- GA4, GTM, Search Console, Google Appointment Schedule owner access, and LeadConnector admin access are not yet verified.
- Namecheap domain-manager access is still pending login/acceptance.

## 3. Canonical measurement contract

Use lowercase `snake_case`. Never send names, email addresses, phone numbers, street addresses, claim numbers, or free-text notes to GA4/GTM.

| Event | Fires only when | Reporting role | Meta mapping |
|---|---|---|---|
| `phone_click` | A `tel:` link is clicked | Diagnostic | Optional `Contact` |
| `call_connected` | Provider confirms an answered, non-spam call meeting the approved duration | Primary | `Lead` via CAPI |
| `appointment_click` | User leaves for the calendar | Diagnostic | None |
| `appointment_booked` | Calendar confirms a real booking | Primary | `Schedule` via CAPI |
| `chat_open` | LeadConnector is opened | Diagnostic | Optional `Contact` |
| `chat_lead_submitted` | Widget confirms a persisted contact | Primary | `Lead` with deduplication |
| `form_start` | First interaction with the future real form | Diagnostic | None |
| `form_submit_success` | Server/CRM returns a stable `lead_id` | Primary | `Lead` with deduplication |
| `qualified_lead` | Peter applies the approved qualification definition | Offline primary | Offline/custom |
| `inspection_scheduled` | Inspection time is persisted | Offline primary | `Schedule` |
| `contract_signed` | Installation Agreement is signed | Business outcome | Custom qualified outcome |
| `job_completed` | Certification of Complete is reached | Business outcome | Custom |
| `revenue_collected` | A unique payment is persisted | Value outcome | `Purchase`, after value definition |

Every web event must include an `event_id`, UTC timestamp, page path/type/language, CTA ID/location, current UTM values, available click IDs, and consent state. Offline lifecycle events inherit the original lead's attribution and consent record instead of inventing page or CTA values. Browser and server copies of a Meta event must reuse the same `event_id` for deduplication.

GA4 recommends `generate_lead`, `qualify_lead`, `working_lead`, and `close_convert_lead` for full-funnel lead reporting. Our operational names above can map to those GA4 recommended events where appropriate. See [GA4 recommended events](https://support.google.com/analytics/answer/9267735).

## 4. Attribution fields required in PW Command Center

Add these without removing the current roofing pipeline:

- Identity: `lead_id`, `created_at`, `lead_channel`, `source_platform`, `source_detail`.
- Capture: `form_id`, `booking_id`, `call_id`, `landing_page`, `landing_page_referrer`.
- First touch: five `first_utm_*` fields plus `first_touch_at`.
- Last touch: five `last_utm_*` fields plus `last_touch_at`.
- Click IDs: `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`.
- Consent: analytics, ads, marketing, timestamp, policy version, source.
- Lifecycle timestamps: new, contacted, inspection scheduled/completed, adjuster meeting, claim approved, installation agreement, installation, quality check, completion, lost.
- Outcome: `lost_reason`, contract value, direct costs, collected amount.
- Sync: Google/Meta status, last sync time, and non-sensitive error code.

Stage-change activity text is not enough for attribution or offline conversion imports; timestamps must be stored as structured fields.

`adjuster meeting` and `claim approved` are customer- or insurer-reported external statuses only. Recording them must not mean that Praise Worthy Roofing files, negotiates, represents, or manages the insurance claim.

## 5. UTM standard

- `utm_source`: `google`, `facebook`, `instagram`, `gbp`, `email`, `sms`, `partner`, `yard-sign`, `door-hanger`, `korean-radio`.
- `utm_medium`: `cpc`, `paid-social`, `organic`, `local-organic`, `referral`, `email`, `sms`, `offline`.
- `utm_campaign`: `<market>-<offer>-<objective>-<yyyy-mm>`.
- `utm_content`: `<creative>-<format>-<language>-<variant>`.
- `utm_term`: paid-search keyword only.

Examples:

- GBP: `?utm_source=gbp&utm_medium=local-organic&utm_campaign=tarrant-profile-visits-2026-07`
- Google: `?utm_source=google&utm_medium=cpc&utm_campaign=tarrant-roof-inspection-leads-2026-07&utm_content=honest-inspection-rsa-en-v1`
- Door hanger: `?utm_source=door-hanger&utm_medium=offline&utm_campaign=nrh-roof-inspection-leads-2026-07&utm_content=qr-en-v1`

Persist first touch without overwriting it; update last touch only on a new attributable visit.

## 6. Platform setup order

1. Peter approves territory, qualification, call threshold, response ownership, lost reasons, and signed-job milestone.
2. Inventory existing GA4, GTM, Search Console, Meta Dataset/Pixel, LeadConnector, and Calendar assets before creating duplicates.
3. Approve privacy, consent, retention, and call-recording policy.
4. Extend PW Command Center attribution and lifecycle fields.
5. Instrument the existing phone, calendar, and LeadConnector paths first. A native form is a Phase 2 addition only after an approved endpoint can return a server-confirmed `lead_id`.
6. Add first-party UTM/click-ID capture and Consent Mode v2 state.
7. Install GTM/GA4 in noindex staging with placeholder-safe environment configuration.
8. Connect authoritative call, booking, chat, and form webhooks.
9. Add Google enhanced conversions/offline lead outcomes and Meta Pixel+CAPI.
10. Validate Search Console, sitemap, canonical host, GBP-tagged URLs, and platform diagnostics.
11. Run seven-day reconciliation after an approved production launch.

Google now recommends enhanced conversions for lead/offline matching through its current Data Manager path, using hashed first-party data and website tags. See [Google enhanced conversions for leads](https://support.google.com/google-ads/answer/11021502) and [GTM conversion setup](https://support.google.com/tagmanager/answer/6105160).

Meta recommends using Pixel and Conversions API together when sharing website events. See [Meta Conversions API](https://www.facebook.com/business/help/AboutConversionsAPI) and [Meta Pixel setup](https://www.facebook.com/help/messenger-app/952192354843755).

## 7. First 30 days

### Days 1–3: no ad spend

- Finish real lead routing and event QA.
- Peter confirms the serviceable ZIP list, capacity, economics, insurance-language limits, and follow-up SLA.
- Confirm which storm/date/geography claims are factually supportable.
- Prepare real project photos, inspection documentation examples, and owner-approved claims.

Do not advertise a universal claim deadline. Policy notice and filing requirements vary. Also, the internal project memory says June 1, 2025, while current official NWS material identifies June 8, 2025 as a major North Texas event; the exact campaign date and storm swath require verification before use. See [NWS June 2025 context](https://www.weather.gov/fwd/april2026svrwx).

### Days 4–10: one Google Search test at $10/day

- Geography: Peter-approved core Tarrant ZIPs only.
- Maximum two ad groups: hail/storm inspection and roof/leak inspection. Do not advertise insurance negotiation or claim representation.
- Phrase/exact high-intent terms only.
- Primary conversions: connected calls and successfully persisted leads/bookings.
- Search terms reviewed daily; add employment, DIY, materials, auto-hail, radar/weather-history, public-adjuster, and other irrelevant negatives.

### Days 11–17: hold or carefully expand

- Request approval to raise Google to $15/day only if tracking, lead quality, and response SLA are clean.
- Prepare Meta retargeting only after Aaron receives the actual assets, events are verified, and the audience is large enough to deliver; do not spend from the initial Search-only envelope.
- Do not force Meta spend when the audience is too small.

### Days 18–30: scale evidence, not hope

- If Aaron approves a new budget, raise Search by 20–25% no more often than every three days.
- Use Meta prospecting only after real creative, verified ZIPs, a converting landing message, and consistent follow-up exist.
- Keep North/East DFW separate from the initial Tarrant test.
- Do not split a $10/day campaign across 17 city campaigns.

## 8. Landing messages to test sequentially

Use the same new landing-page layout and change one major message at a time.

1. Honest inspection: “Not every storm-damaged roof needs replacement.”
2. Documentation: “Clear roof photos and findings for your records.”
3. Storm relevance: only after the exact date and geography are verified; never promise coverage, approval, or a universal deadline.

Required landing content:

- Tap-to-call and book-inspection CTAs.
- Phone, booking, and chat CTAs with successful outcome tracking. Add a two-step form later only when a real endpoint, consent copy, and lead routing are approved.
- What happens next in three clear steps.
- Real job/inspection imagery.
- Verified trust signals only.
- Policy/carrier disclaimer where insurance is discussed.

## 9. Operating KPIs and guardrails

These are initial operating hypotheses, not industry guarantees.

- Primary business KPIs: cost per completed inspection and cost per signed job.
- Diagnostic targets: 80%+ relevant search clicks, 80%+ contact within 24 hours, 50%+ raw-to-qualified, and 35%+ qualified-to-inspection-booked.
- Investigate landing conversion below 5% after 40 relevant clicks.
- Stop and correct if more than 30% of recent paid-search spend is irrelevant.
- Pause and review an ad group at $100 spend with no qualified lead, even if it has fewer than 20 relevant clicks. Also review after 20 relevant clicks with no qualified lead before adding budget.
- Do not scale when Peter repeatedly misses the approved response SLA.
- Scale only after at least two qualified leads, clean attribution, acceptable qualified CPL, and available inspection capacity.

The reported $200–300 CPL and $60 competitor figure are unverified owner/project-memory numbers. Rebuild the baseline from platform and Command Center data.

## 10. Go-to-market brief

### Positioning

Praise Worthy Roofing should lead with an honest local roof inspection, clear photo documentation, and plain-language next steps. The promise is clarity without pressure—not insurance representation, guaranteed coverage, or automatic replacement.

Primary offer: a no-obligation initial roof inspection for homeowners in Peter-approved service ZIPs. Confirm that the word “free” is operationally accurate before it appears in paid ads.

### Initial audience

- Homeowners or authorized property decision-makers in Peter-approved Tarrant County ZIPs.
- High-intent needs: suspected hail/wind damage, roof leak, aging roof, or a request for a professional condition check.
- English first. Add a separate Spanish or Korean campaign only when Peter confirms that calls, bookings, and follow-up can be handled in that language.
- Exclude renters without decision authority, job seekers, DIY/material shoppers, auto-hail users, weather-history researchers, and public-adjuster/legal inquiries.

### Channel priority

1. Google Search: first paid test because it captures active local intent.
2. Google Local Services Ads: begin eligibility and screening in parallel, but do not activate or spend until business, insurance, GBP, lead-routing, and budget controls are verified. Roofers are an eligible US category; screening requirements may apply. See [Google Local Services Ads eligibility](https://support.google.com/localservices/answer/6224841) and [screening requirements](https://support.google.com/localservices/answer/6230381).
3. Google Business Profile: keep services, photos, reviews, calls, website clicks, and UTM-tagged URLs measurable. GBP performance can report calls and website clicks. See [Business Profile performance](https://support.google.com/business/answer/9918094).
4. Meta: retargeting only after Aaron receives the actual Page, Instagram, Ad Account, and Dataset/Pixel assets and the site has verified events plus enough audience volume.
5. Offline: yard signs, door hangers, and partner referrals only with unique QR/UTM attribution and owner-approved creative.

## 11. Google Search pilot

### Campaign controls

- Campaign: `search-tarrant-roof-inspection-2026-07`.
- Network: Google Search only; disable Search Partners and Display expansion, and do not use Performance Max during the small-budget validation period.
- Geography: Peter-approved core ZIPs only. Set location targeting to **Presence: people in or regularly in the targeted locations**; Google's default can also include people showing interest in the area. See [Google location options](https://support.google.com/google-ads/answer/9376662).
- Schedule call assets only for hours when a person can answer or return missed calls promptly.
- Start with phrase and exact match. Review actual search terms daily.
- Bidding hypothesis: validate tracking with Maximize Clicks and a conservative CPC limit, then consider Maximize Conversions only after primary conversions are reliable and enough clean data exists.

### Ad groups and seed keywords

**Ad group A — storm or hail inspection**

- `"hail damage roof inspection"`
- `"storm damage roof inspection"`
- `[hail damage roof inspection near me]`
- `[roof inspection north richland hills]`
- `"roof inspection fort worth"`

**Ad group B — roof or leak inspection**

- `"roof inspection near me"`
- `"roof leak inspection"`
- `[residential roof inspection]`
- `"roof damage inspection"`
- `"roof inspection tarrant county"`

These are seed terms, not an automatic upload list. Peter's approved ZIPs and Google Keyword Planner estimates must be reviewed before launch.

### Initial negative themes

- Employment: `jobs`, `career`, `salary`, `training`, `classes`.
- DIY and supplies: `diy`, `how to`, `materials`, `shingles`, `supply`, `home depot`, `lowes`.
- Automotive: `car`, `auto`, `dent`, `paintless repair`.
- Research-only: `radar`, `weather history`, `storm map`, `noaa`.
- Legal/adjusting: `public adjuster`, `lawyer`, `attorney`, `claim dispute`.
- Offers outside scope: `free roof replacement`, `roof grant`, and `commercial` if Peter confirms residential-only service. Do not use a broad `free roof` negative that could block legitimate free-inspection intent.

Negative keywords prevent ads from serving on irrelevant searches and should be maintained from the search-terms report. See [Google negative keywords](https://support.google.com/google-ads/answer/7449003).

### Responsive Search Ad draft

Headlines:

- Local Free Roof Inspection — use only after Peter verifies the offer and the ad is restricted to approved ZIPs.
- Local Roof Inspection Team
- Hail & Wind Damage Check
- Clear Photos. Honest Findings.
- Serving North Richland Hills
- Book Your Inspection Online
- Not Every Roof Needs Replacing
- Roof Leak or Storm Concern?
- Call Praise Worthy Roofing

Descriptions:

- Get a clear roof inspection with photos and plain-language findings. No pressure. Book online or call our local DFW team.
- Concerned about hail, wind, or a leak? We inspect the roof and explain repair, replacement, or monitoring options.
- We document visible roof conditions for your records. Coverage decisions remain with your insurer.

Assets: call, GBP location, and sitelinks to Services, Projects, Service Area, and Roofing Guides. Do not use ratings, job counts, warranties, response times, or other claims until verified.

## 12. Texas insurance-language guardrail

Texas contractors doing the roofing work must not advertise or act as a public adjuster on the same claim. Marketing and sales materials must not offer to negotiate the settlement, file or present the homeowner's claim, represent the policyholder on coverage, promise every dollar owed, or waive/rebate/absorb the deductible. See the [Texas Department of Insurance roofing guidance](https://www.tdi.texas.gov/consumer/storms/roofing-and-insurance-know-the-law.html).

Use: “We inspect and document visible roof conditions.”

Avoid: “We handle your claim,” “We negotiate with your insurer,” “We maximize your settlement,” “insurance experts,” “guaranteed approval,” “free roof,” and “we waive your deductible.”

Any contract of $1,000 or more involving an insurance settlement needs the Texas-required deductible notice; contract language requires owner/legal review before use.

## 13. Lead handling and qualification

### Proposed internal service level

- Answer live calls when possible; target missed-call return within five minutes during staffed hours.
- Acknowledge chat and booking leads within 15 minutes during staffed hours.
- Peter owns manual follow-up until a compliant automation, consent language, and sending account are separately approved.
- Do not advertise these response times until staffing evidence supports them.

### Qualified lead definition

A human marks `qualified_lead` only when the lead is in an approved ZIP, is the homeowner or authorized decision-maker, has a residential roof concern within scope, supplies a reachable contact method, and can reasonably schedule an inspection. Employment, materials, auto-hail, public-adjuster, spam, duplicate, and out-of-area inquiries are not qualified.

Required lost reasons: `out_of_area`, `not_decision_maker`, `outside_scope`, `unreachable`, `duplicate`, `spam`, `timing`, `price`, `competitor`, and `other_reviewed`.

## 14. Budget and decision rules

- Days 1–3: $0 while measurement and routing are tested.
- First seven paid days: maximum $10/day Search, total maximum $70.
- Next seven paid days: maximum $15/day only if tracking, relevance, and response handling are clean, total maximum $105.
- Initial approval envelope: no more than $175 across the first 14 paid days. No automatic increase, LSA activation, or Meta spend.
- After at least two qualified leads, calculate qualified CPL, completed-inspection cost, and available weekly capacity. Aaron must approve any next budget, including a move toward the earlier $1,000/month working target.

Call reporting can count calls using an approved minimum duration; CRM-confirmed connected or qualified calls are the stronger business outcome. See [Google call conversion tracking](https://support.google.com/google-ads/answer/6100664).

## 15. Peter launch checklist

- Final service ZIP list and any excluded neighborhoods.
- Weekly inspection capacity and staffed phone hours.
- Who answers calls, chats, and bookings; who records outcomes in PW Command Center.
- English/Spanish/Korean handling capacity.
- Residential versus commercial scope.
- Confirmation of the no-obligation/free inspection offer.
- Permission-safe project photos, testimonials, warranties, financing, years in business, and job-count claims.
- Calendar ownership and LeadConnector webhook/admin access.
- Agreement on qualification, lost reasons, call-duration threshold, and signed-job milestone.
- Signoff on Texas insurance-safe language.

## 16. Current blockers

### Peter

- Assign Meta Page, Instagram, Ad Account, and Dataset/Pixel access.
- Confirm serviceable ZIPs, weekly capacity, qualification, lost reasons, call handling, calendar ownership, and insurance-language boundaries.
- Confirm every operational claim: free inspection, response time, warranties, financing, residential/commercial scope, and 500+ jobs/testimonials.
- Supply real project/customer/storm evidence and permission-safe past-customer data.

### Aaron

- Confirm whether GA4, GTM, and Search Console already exist.
- Confirm Google Ads account access, billing profile, advertiser verification, and account-level conversion settings before building or activating the pilot.
- Complete Namecheap access.
- Approve privacy/consent/retention and any call-tracking provider/payment.
- Audit GBP NAP, primary/secondary categories, hours, services, and UTM-tagged destination URLs before using the location asset.
- Review the local site before staging; approve staging and production separately.

### Production gates

- No campaign spend before phone/calendar/chat clicks are measured, lead routing is tested, and a manual reconciliation method exists. Do not count `appointment_booked` as a primary conversion until Calendar or CRM confirmation can connect the booking to the original click/lead; use `appointment_click` as diagnostic only in the meantime.
- No Meta launch before asset assignment and Pixel/CAPI diagnostics.
- No Search Console sitemap submission before the approved `www` canonical cutover.
- No deploy, DNS, GBP edit, tag activation, message automation, or spend without the relevant approval.
