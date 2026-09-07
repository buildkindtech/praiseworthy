import type { Metadata } from "next";
import { cityPagesBySlug } from "@/lib/city-pages";
import {
  BUSINESS_AUTHOR_NAME,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  SITE_PUBLISHED_AT,
  SITE_UPDATED_AT,
  absoluteUrl,
  getAuthorMetadata,
  getDefaultRobots,
  getSocialMetadata,
  normalizeUrlPath,
} from "@/lib/seo";
import { localeMeta } from "@/lib/seo-i18n";

export const cityServiceSlugs = [
  "roof-inspection",
  "hail-damage",
  "storm-damage",
  "roof-repair",
] as const;

export type CityServiceSlug = (typeof cityServiceSlugs)[number];

export const moneyPageCitySlugs = [
  "fort-worth",
  "plano",
  "frisco",
  "arlington",
  "north-richland-hills",
  "carrollton",
] as const;

export type MoneyPageCitySlug = (typeof moneyPageCitySlugs)[number];

export type CityServicePage = {
  citySlug: MoneyPageCitySlug;
  serviceSlug: CityServiceSlug;
  city: string;
  serviceLabel: string;
  title: string;
  metaTitle: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  body: string[];
  serviceBullets: string[];
  faq: Array<{ question: string; answer: string }>;
  relatedGuideSlugs: string[];
};

const INSURANCE_LIMIT =
  "We can photograph visible conditions and meet your insurance adjuster at the property. We do not guarantee that insurance will pay, and we do not waive deductibles.";

const HOURS_ANSWER = `Call ${BUSINESS_PHONE} Monday through Saturday, 8:00 a.m. to 6:00 p.m. Central Time. We are closed Sunday. Appointment timing depends on weather and current demand.`;

export const serviceCatalog: Record<
  CityServiceSlug,
  {
    label: string;
    shortLabel: string;
    schemaServiceType: string;
    relatedGuideSlugs: string[];
  }
> = {
  "roof-inspection": {
    label: "Free Roof Inspection",
    shortLabel: "Roof Inspection",
    schemaServiceType: "Roof inspection",
    relatedGuideSlugs: [
      "how-a-free-roof-inspection-works",
      "how-long-does-a-roof-inspection-take-in-dfw",
      "hail-damage-roof-inspection-dfw",
    ],
  },
  "hail-damage": {
    label: "Hail Damage Roof Inspection",
    shortLabel: "Hail Damage",
    schemaServiceType: "Hail damage roof inspection",
    relatedGuideSlugs: [
      "hail-damage-roof-inspection-dfw",
      "roof-storm-damage-insurance-texas",
      "what-roof-adjusters-look-for-during-an-insurance-inspection",
    ],
  },
  "storm-damage": {
    label: "Storm Damage Roof Inspection",
    shortLabel: "Storm Damage",
    schemaServiceType: "Storm damage assessment",
    relatedGuideSlugs: [
      "what-to-do-after-storm-damage-to-your-roof-in-dfw",
      "signs-of-wind-damage-on-your-roof",
      "roof-storm-damage-insurance-texas",
    ],
  },
  "roof-repair": {
    label: "Roof Repair",
    shortLabel: "Roof Repair",
    schemaServiceType: "Residential roof repair",
    relatedGuideSlugs: [
      "when-to-repair-vs-replace-asphalt-shingles-texas",
      "roof-repair-near-me-north-richland-hills",
      "how-a-free-roof-inspection-works",
    ],
  },
};

export const cityServicePages: CityServicePage[] = [
  {
    citySlug: "fort-worth",
    serviceSlug: "roof-inspection",
    city: "Fort Worth",
    serviceLabel: serviceCatalog["roof-inspection"].label,
    title: "Free Roof Inspection in Fort Worth, TX",
    metaTitle: "Free Roof Inspection Fort Worth | Hail & Storm Roof Check",
    description:
      "Praise Worthy offers free roof inspections for Fort Worth homeowners who want a documented look at hail, wind, and leak-risk areas before deciding what to do next.",
    metaDescription:
      "Need a free roof inspection in Fort Worth? Get photos, plain-language findings, and honest next steps. Call 682-250-0078 Mon–Sat 8–6 CT.",
    keywords: [
      "Fort Worth roof inspection",
      "free roof inspection Fort Worth",
      "roof inspection Fort Worth TX",
      "residential roof inspection Fort Worth",
      "schedule roof inspection Fort Worth",
    ],
    intro:
      "A free roof inspection in Fort Worth is the first step when you are not sure whether the last hail or wind event actually damaged the roof. We look at the roof, take photos, and explain what is visible so you can decide without pressure.",
    body: [
      "Fort Worth roofs take a wide range of weather because the city stretches from older central and west-side neighborhoods to newer north Fort Worth subdivisions. That mix means one storm can leave very different conditions on two streets in the same ZIP code.",
      "During a Fort Worth inspection we check shingles, ridge lines, flashing, vents, and other leak-risk points. We also note granule loss, lifted edges, and soft spots that are easy to miss from the driveway in areas such as Ridglea or near the Benbrook border.",
      "You leave with a clearer picture of whether the roof needs monitoring, a targeted repair conversation, or a longer-term replacement discussion. Replacement is only part of the conversation when the visible condition supports it.",
    ],
    serviceBullets: [
      "Free Fort Worth roof inspections",
      "Photo documentation of visible conditions",
      "Hail, wind, and leak-risk checks",
      "Clear next-step guidance, no pressure",
    ],
    faq: [
      {
        question: "Is a roof inspection in Fort Worth actually free?",
        answer:
          "Yes. The initial residential roof inspection is free for Fort Worth homeowners. There is no obligation to repair or replace anything after the visit.",
      },
      {
        question: "What should I do before you arrive?",
        answer:
          "Note the storm date if you remember it, and mention any new stains, drips, or missing shingles. You do not need to climb on the roof.",
      },
      {
        question: "When can I schedule a Fort Worth inspection?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-inspection"].relatedGuideSlugs,
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "hail-damage",
    city: "Fort Worth",
    serviceLabel: serviceCatalog["hail-damage"].label,
    title: "Hail Damage Roof Inspection in Fort Worth, TX",
    metaTitle: "Hail Damage Roof Inspection Fort Worth | Free Roof Check",
    description:
      "Praise Worthy inspects Fort Worth roofs for hail impact, documents visible marks, and helps homeowners understand what to discuss before any insurance conversation.",
    metaDescription:
      "Think hail hit your Fort Worth roof? Get a free hail damage inspection, photos, and honest guidance. Inspection and adjuster meeting only.",
    keywords: [
      "hail damage roof inspection Fort Worth",
      "hail damage roof repair Fort Worth",
      "hail damaged roof Fort Worth TX",
      "roof hail damage Fort Worth",
      "free hail inspection Fort Worth",
    ],
    intro:
      "Hail damage in Fort Worth is often easier to feel than to see from the street. A focused hail inspection looks for bruises, granule loss, and metal dents so you know whether the roof was marked, and how serious those marks look.",
    body: [
      "Fort Worth sits in a North Texas hail path that can clip west-side neighborhoods one week and north Fort Worth the next. Soft metal on vents, flashing, and gutters often shows impact even when field shingles still look mostly intact.",
      "We photograph suspected hail marks and explain the difference between cosmetic bruising and conditions that may affect how the roof sheds water. That record is useful if you later choose to speak with your insurance company.",
      INSURANCE_LIMIT,
    ],
    serviceBullets: [
      "Hail-focused Fort Worth roof inspections",
      "Photos of shingles, flashing, and metal",
      "Adjuster meeting available if you request it",
      "No claim-payment promises",
    ],
    faq: [
      {
        question: "Can hail damage a Fort Worth roof without a leak?",
        answer:
          "Yes. Hail can bruise shingles or strip granules long before water shows up on a ceiling. An inspection is useful even when the attic still looks dry.",
      },
      {
        question: "Will you file my insurance claim or guarantee payment?",
        answer:
          "No. We document visible hail-related conditions and can meet an adjuster if you ask. Coverage decisions belong to your insurer. We do not waive deductibles.",
      },
      {
        question: "Do I need to stay home for a hail inspection?",
        answer:
          "It helps if you can point out the storm date and any interior stains, but we can still inspect the roof during posted business hours if access is arranged.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["hail-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "storm-damage",
    city: "Fort Worth",
    serviceLabel: serviceCatalog["storm-damage"].label,
    title: "Storm Damage Roof Inspection in Fort Worth, TX",
    metaTitle: "Storm Damage Roof Fort Worth | Wind, Hail & Rain Check",
    description:
      "After a Fort Worth storm, Praise Worthy inspects for wind-lifted shingles, hail marks, and rain-entry points so homeowners know what changed on the roof.",
    metaDescription:
      "Storm damage on a Fort Worth roof? Book a free inspection for wind, hail, and leak-risk areas. Call 682-250-0078. Closed Sunday.",
    keywords: [
      "storm damage roof Fort Worth",
      "storm damage roof inspection Fort Worth",
      "roof storm damage Fort Worth TX",
      "wind and storm roof damage Fort Worth",
      "after storm roof inspection Fort Worth",
    ],
    intro:
      "If a Fort Worth storm left limbs in the yard, granules in the gutter, or a shingle on the lawn, the roof may have moved even if the house still looks dry. A storm-damage inspection answers what changed and what can wait.",
    body: [
      "Fort Worth storms often combine wind and hail in the same evening. West Fort Worth and north Fort Worth can see different damage from the same system, especially on older ranch roofs versus newer composition roofs.",
      "We look for lifted tabs, creased shingles, exposed nail lines, displaced ridge cap, and flashing that no longer sits tight. Those are the spots that turn the next heavy rain into an interior stain.",
      "If you are considering insurance, we can document what is visible and meet an adjuster. We will not say the claim will be paid, and we will not waive a deductible.",
    ],
    serviceBullets: [
      "Post-storm Fort Worth roof checks",
      "Wind, hail, and rain-entry review",
      "Photo notes you can keep",
      "Honest repair-versus-monitor guidance",
    ],
    faq: [
      {
        question: "What should I do first after a Fort Worth storm?",
        answer:
          "Keep people and pets away from downed lines or unstable limbs, then look from the ground for missing shingles, gutter dents, or new ceiling spots. Schedule an inspection during business hours if anything looks off.",
      },
      {
        question: "Is every storm-damaged Fort Worth roof a replacement?",
        answer:
          "No. Some roofs need a localized repair. Some only need monitoring. Replacement is a separate conversation when the visible condition supports it.",
      },
      {
        question: "When are you available after a storm?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["storm-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "fort-worth",
    serviceSlug: "roof-repair",
    city: "Fort Worth",
    serviceLabel: serviceCatalog["roof-repair"].label,
    title: "Roof Repair in Fort Worth, TX",
    metaTitle: "Roof Repair Fort Worth | Leak, Shingle & Flashing Help",
    description:
      "Praise Worthy helps Fort Worth homeowners inspect leak sources, storm-worn shingles, and flashing before recommending a repair scope or a replacement discussion.",
    metaDescription:
      "Need roof repair in Fort Worth? Start with a free inspection of leaks, shingles, and flashing. Honest repair vs replacement talk. Call 682-250-0078.",
    keywords: [
      "roof repair Fort Worth",
      "roof leak repair Fort Worth",
      "residential roof repair Fort Worth TX",
      "shingle roof repair Fort Worth",
      "roofing repair contractor Fort Worth",
    ],
    intro:
      "Roof repair in Fort Worth should start with the cause, not a patch over the stain. We inspect the leak path, storm wear, and flashing so you know whether a targeted repair is realistic.",
    body: [
      "Many Fort Worth repair calls start after a ceiling ring appears in an older home, or after wind lifts a few tabs on a north-side slope. Those problems can be local, but they can also be the first visible sign of wider storm wear.",
      "We check the suspected leak area and the surrounding roof, including valleys, chimneys, vents, and roof edges. A repair recommendation is only useful if it matches what is actually open to water.",
      "If the roof is broadly worn or storm-bruised, we will say so and talk through repair versus replacement in plain language. We do not sell a new roof as the default answer.",
    ],
    serviceBullets: [
      "Fort Worth leak and shingle repair inspections",
      "Flashing and penetration checks",
      "Cause-first repair guidance",
      "Honest replacement discussion when needed",
    ],
    faq: [
      {
        question: "Does a Fort Worth roof leak always mean replacement?",
        answer:
          "No. Some leaks come from a small flashing failure or a few missing shingles. An inspection is how we tell a local repair from a larger condition.",
      },
      {
        question: "Can you repair hail damage without replacing the roof?",
        answer:
          "Sometimes, when the damage is limited. Widespread functional hail wear can lead to a replacement conversation. That decision should follow documented findings, not a sales script.",
      },
      {
        question: "How do I start a Fort Worth roof repair?",
        answer: `Call ${BUSINESS_PHONE} or use the scheduling link for a free inspection. We review the roof before quoting a repair scope.`,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-repair"].relatedGuideSlugs,
  },
  {
    citySlug: "plano",
    serviceSlug: "roof-inspection",
    city: "Plano",
    serviceLabel: serviceCatalog["roof-inspection"].label,
    title: "Free Roof Inspection in Plano, TX",
    metaTitle: "Free Roof Inspection Plano | Storm & Hail Roof Check",
    description:
      "Praise Worthy provides free roof inspections for Plano homeowners who want documented findings after Collin County hail, wind, or unexplained granule loss.",
    metaDescription:
      "Book a free roof inspection in Plano, TX. We photograph visible storm wear and explain next steps. Call 682-250-0078 Mon–Sat 8–6 CT.",
    keywords: [
      "Plano roof inspection",
      "free roof inspection Plano",
      "roof inspection Plano TX",
      "residential roof inspection Plano",
      "schedule roof inspection Plano",
    ],
    intro:
      "A free roof inspection in Plano is for homeowners who noticed a stain, heard neighbors talking about hail, or simply want a documented look before the next storm season.",
    body: [
      "Plano roofs in west Plano, east Plano, and along the Richardson and Murphy borders often look tidy from the street. Hail and wind can still bruise shingles or lift edges on HOA-kept homes without leaving an obvious mess in the yard.",
      "We inspect the field, ridges, flashing, and penetrations, then walk you through photos. The goal is a calm explanation of what is visible, not a rushed replacement pitch.",
      "If the roof is sound, we will say that. If it needs repair planning or a replacement discussion, we will show you why those options are on the table.",
    ],
    serviceBullets: [
      "Free Plano roof inspections",
      "Photo-backed storm and wear review",
      "HOA-neighborhood and older-home checks",
      "No-pressure next-step explanation",
    ],
    faq: [
      {
        question: "Do Plano inspections cost anything up front?",
        answer:
          "The initial residential roof inspection is free. You are not required to approve a repair or replacement after we share findings.",
      },
      {
        question: "Can you inspect if I only have granules in the gutter?",
        answer:
          "Yes. Granule piles after a Collin County storm are a common reason Plano homeowners book a check, even without an interior leak.",
      },
      {
        question: "What are your Plano inspection hours?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-inspection"].relatedGuideSlugs,
  },
  {
    citySlug: "plano",
    serviceSlug: "hail-damage",
    city: "Plano",
    serviceLabel: serviceCatalog["hail-damage"].label,
    title: "Hail Damage Roof Inspection in Plano, TX",
    metaTitle: "Hail Damage Roof Inspection Plano | Free Photo Check",
    description:
      "Praise Worthy inspects Plano roofs for hail bruising, granule loss, and dented metal, then explains findings homeowners can use before any insurance talk.",
    metaDescription:
      "Hail damage on a Plano roof? Get a free inspection and photos. We meet adjusters on request and do not promise claim payment.",
    keywords: [
      "hail damage roof inspection Plano",
      "hail damage roof repair Plano",
      "hail damaged roof Plano TX",
      "roof hail damage Plano",
      "free hail inspection Plano",
    ],
    intro:
      "Plano hail can mark a roof in a few minutes and leave the driveway looking almost normal. A hail-damage inspection is how you confirm whether shingles and metal were hit, and how those marks look up close.",
    body: [
      "Collin County hail cells often move fast across Plano. West Plano and east Plano can report very different impact from the same afternoon, which is why a neighbor’s result is not a substitute for photos of your own roof.",
      "We look for circular bruises, exposed mat, stripped granules, and dents on flashing, vents, and gutters. Those details help you understand whether the damage looks cosmetic, scattered, or more widespread.",
      INSURANCE_LIMIT,
    ],
    serviceBullets: [
      "Plano hail-impact inspections",
      "Shingle and soft-metal photo notes",
      "Optional adjuster meeting",
      "No deductible-waiver offers",
    ],
    faq: [
      {
        question: "Should I call insurance before a Plano hail inspection?",
        answer:
          "Many homeowners prefer to see the roof first. If you do open a claim later, we can share inspection photos and meet the adjuster. We cannot promise the claim will be approved.",
      },
      {
        question: "Is small Plano hail still worth checking?",
        answer:
          "Yes, if you heard hail, found granules, or see dents on yard metal. Small stones can still bruise shingles enough to shorten roof life.",
      },
      {
        question: "Do you repair hail damage in Plano?",
        answer:
          "After the inspection we explain whether a localized repair looks realistic or whether the condition points to a broader replacement discussion. That depends on what we find.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["hail-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "plano",
    serviceSlug: "storm-damage",
    city: "Plano",
    serviceLabel: serviceCatalog["storm-damage"].label,
    title: "Storm Damage Roof Inspection in Plano, TX",
    metaTitle: "Storm Damage Roof Plano | Wind & Hail Inspection",
    description:
      "Praise Worthy checks Plano roofs after wind, hail, and heavy rain so homeowners know whether shingles lifted, metal dented, or leak-risk points opened.",
    metaDescription:
      "After-storm roof inspection in Plano, TX. We document wind and hail wear and explain options. Call 682-250-0078. Sunday closed.",
    keywords: [
      "storm damage roof Plano",
      "storm damage roof inspection Plano",
      "roof storm damage Plano TX",
      "wind and storm roof damage Plano",
      "after storm roof inspection Plano",
    ],
    intro:
      "A Plano storm-damage inspection is for the day after the sirens, when you are looking at wet fences, a few shingles on the lawn, or a faint ceiling shadow and want a direct answer.",
    body: [
      "Plano storms can push wind across long east-west roof planes and then drop hail on only part of a street. That is why a roof can look fine from the front walk and still have lifted tabs on the back slope.",
      "We review edges, ridges, valleys, and penetrations, then explain what looks storm-related versus ordinary aging. If you want an adjuster present later, we can meet them. Coverage is still their decision.",
      "Replacement is not assumed. Many Plano roofs need monitoring or a defined repair after a single storm.",
    ],
    serviceBullets: [
      "Plano post-storm roof inspections",
      "Wind-lift and hail-mark review",
      "Leak-risk notes around flashing",
      "Documented findings for your records",
    ],
    faq: [
      {
        question: "My Plano roof looks fine. Should I still inspect after a storm?",
        answer:
          "If the storm was strong enough to drop hail, move patio furniture, or leave granules in the gutter, a check is reasonable. Many issues are not obvious from the driveway.",
      },
      {
        question: "Do you guarantee insurance will cover Plano storm damage?",
        answer:
          "No. We inspect, photograph, and can meet an adjuster. We do not guarantee payment and we do not waive deductibles.",
      },
      {
        question: "When can Plano homeowners call?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["storm-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "plano",
    serviceSlug: "roof-repair",
    city: "Plano",
    serviceLabel: serviceCatalog["roof-repair"].label,
    title: "Roof Repair in Plano, TX",
    metaTitle: "Roof Repair Plano | Leak and Shingle Repair Inspection",
    description:
      "Praise Worthy inspects Plano roof leaks, missing shingles, and flashing wear, then explains whether a targeted repair is realistic or a replacement talk is needed.",
    metaDescription:
      "Roof repair in Plano starts with a free inspection. We find leak sources and storm wear before quoting. Call 682-250-0078 Mon–Sat 8–6 CT.",
    keywords: [
      "roof repair Plano",
      "roof leak repair Plano",
      "residential roof repair Plano TX",
      "shingle roof repair Plano",
      "roofing repair contractor Plano",
    ],
    intro:
      "Plano roof repair should follow a documented cause. We inspect the leak, the surrounding shingles, and the flashing so you are not paying to cover a stain while the opening stays on the roof.",
    body: [
      "Common Plano repair questions include a spot leak in a vaulted living room, a wind-lifted tab after a spring storm, or flashing wear around a newer vent. Those can be local jobs, or they can sit next to unnoticed hail bruising.",
      "We inspect first, then talk through a repair scope if the condition is limited. If the roof is broadly worn, we will say a replacement conversation may be the more honest path.",
      "We do not treat every Plano leak as a full reroof, and we do not promise insurance will fund the work.",
    ],
    serviceBullets: [
      "Plano leak-source inspections",
      "Shingle and flashing repair guidance",
      "Repair versus replacement explained clearly",
      "Photos before any work conversation",
    ],
    faq: [
      {
        question: "Can you repair a Plano roof without replacing it?",
        answer:
          "Often, when the damage is localized. Widespread storm wear or end-of-life shingles can change that recommendation. The inspection decides, not a one-size pitch.",
      },
      {
        question: "Do you work on HOA homes in Plano?",
        answer:
          "Yes. We inspect residential roofs in Plano neighborhoods, including homes with association rules. Any HOA approval steps stay the homeowner’s responsibility.",
      },
      {
        question: "How do I request Plano roof repair help?",
        answer: `Call ${BUSINESS_PHONE} during business hours or use the site scheduling link for a free inspection.`,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-repair"].relatedGuideSlugs,
  },
  {
    citySlug: "frisco",
    serviceSlug: "roof-inspection",
    city: "Frisco",
    serviceLabel: serviceCatalog["roof-inspection"].label,
    title: "Free Roof Inspection in Frisco, TX",
    metaTitle: "Free Roof Inspection Frisco | Hail & Wind Roof Check",
    description:
      "Praise Worthy offers free roof inspections for Frisco homeowners, including newer composition roofs that can still hide hail marks and wind lift after a fast North Texas storm.",
    metaDescription:
      "Free roof inspection in Frisco, TX. We check newer and older roofs for hail, wind, and leak risk. Call 682-250-0078. Closed Sunday.",
    keywords: [
      "Frisco roof inspection",
      "free roof inspection Frisco",
      "roof inspection Frisco TX",
      "residential roof inspection Frisco",
      "schedule roof inspection Frisco",
    ],
    intro:
      "A free roof inspection in Frisco is useful even on a newer home. Recent construction does not make a roof immune to hail bruises or wind-lifted tabs after a Collin or Denton County storm.",
    body: [
      "Frisco’s housing stock includes many composition roofs built during fast growth near Little Elm, McKinney, and The Colony borders. Those roofs can look uniform from the street while individual slopes take the worst of a storm.",
      "We inspect shingles, ridges, flashing, and penetrations and give you photos plus a plain-language summary. If nothing urgent shows, we will say so.",
      "If repair or a replacement discussion is warranted, you will see the conditions that led there. We do not invent urgency.",
    ],
    serviceBullets: [
      "Free Frisco roof inspections",
      "Newer-home and established-home checks",
      "Storm-wear and leak-risk photos",
      "Straightforward findings",
    ],
    faq: [
      {
        question: "My Frisco roof is only a few years old. Do I still need an inspection?",
        answer:
          "Age helps, but hail and wind can still mark or lift shingles. An inspection is about current condition, not just the original install year.",
      },
      {
        question: "Is the Frisco inspection free?",
        answer:
          "Yes. The initial residential inspection is free and does not require you to approve work.",
      },
      {
        question: "When can I book in Frisco?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-inspection"].relatedGuideSlugs,
  },
  {
    citySlug: "frisco",
    serviceSlug: "hail-damage",
    city: "Frisco",
    serviceLabel: serviceCatalog["hail-damage"].label,
    title: "Hail Damage Roof Inspection in Frisco, TX",
    metaTitle: "Hail Damage Roof Inspection Frisco | Free Roof Photos",
    description:
      "Praise Worthy inspects Frisco roofs for hail impact on shingles and metal, then documents what is visible for homeowners who may later talk with an adjuster.",
    metaDescription:
      "Hail damage roof inspection in Frisco. Free photos of shingles and metal. No claim-payment promises. Call 682-250-0078 Mon–Sat 8–6 CT.",
    keywords: [
      "hail damage roof inspection Frisco",
      "hail damage roof repair Frisco",
      "hail damaged roof Frisco TX",
      "roof hail damage Frisco",
      "free hail inspection Frisco",
    ],
    intro:
      "Frisco hail often sounds worse than it looks from the porch. A hail-damage inspection gets you off guesswork and onto photos of the actual shingle and metal surfaces.",
    body: [
      "Growing Frisco neighborhoods can see a hail core clip one section of a street and skip another. A neighbor’s clean roof does not prove yours was spared, especially on a different slope or exposure.",
      "We look for bruises, granule loss, cracked tabs, and dents on vents and flashing. Those are the marks that matter when you decide whether to monitor, repair, or keep notes for an insurance conversation.",
      INSURANCE_LIMIT,
    ],
    serviceBullets: [
      "Frisco hail-mark inspections",
      "Composition shingle and metal photos",
      "Adjuster meeting on request",
      "No waived-deductible offers",
    ],
    faq: [
      {
        question: "Does hail on a new Frisco roof always mean replacement?",
        answer:
          "No. Some hail marks are limited or cosmetic. Functional damage is a different finding. We explain what we see instead of jumping to a reroof.",
      },
      {
        question: "Will you guarantee my Frisco hail claim is paid?",
        answer:
          "No. Insurance decisions are made by your carrier. We document visible conditions and can meet the adjuster if you ask.",
      },
      {
        question: "What if I only see dents on the A/C hood or mailbox?",
        answer:
          "Soft metal in the yard can be a clue, but the roof still needs its own look. Those dents do not automatically describe the shingle condition.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["hail-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "frisco",
    serviceSlug: "storm-damage",
    city: "Frisco",
    serviceLabel: serviceCatalog["storm-damage"].label,
    title: "Storm Damage Roof Inspection in Frisco, TX",
    metaTitle: "Storm Damage Roof Frisco | Wind & Hail Inspection",
    description:
      "Praise Worthy inspects Frisco roofs after wind-driven rain and hail so homeowners can see whether shingles lifted, ridges shifted, or flashing opened.",
    metaDescription:
      "Storm damage roof inspection in Frisco, TX. We document wind and hail wear and explain next steps. Closed Sunday. Call 682-250-0078.",
    keywords: [
      "storm damage roof Frisco",
      "storm damage roof inspection Frisco",
      "roof storm damage Frisco TX",
      "wind and storm roof damage Frisco",
      "after storm roof inspection Frisco",
    ],
    intro:
      "After a Frisco storm, the useful question is not “did it hail somewhere in town?” It is “did this roof move, bruise, or open?” A storm-damage inspection is built to answer that.",
    body: [
      "Frisco sits where Collin and Denton weather often lines up. Fast-moving cells can lift ridge cap on a two-story roof while the front elevation still looks tidy for drive-by traffic.",
      "We check for creased or missing tabs, exposed underlayment, displaced flashing, and hail marks that arrived with the same system. You get photos and a clear summary of urgency.",
      "If insurance becomes part of your plan, we can meet the adjuster. We will not promise a payout.",
    ],
    serviceBullets: [
      "Frisco post-storm roof checks",
      "Wind-lift and hail review together",
      "Ridge, edge, and flashing focus",
      "Written-style photo findings",
    ],
    faq: [
      {
        question: "What is the first step after a Frisco storm?",
        answer:
          "Confirm the home is safe, look from the ground for missing shingles or new leaks, then book an inspection during business hours if anything seems off.",
      },
      {
        question: "Do you work after every advertised DFW hail event?",
        answer:
          "We inspect Frisco roofs when homeowners ask. We do not claim a citywide storm map or a guaranteed same-week slot after every event. Timing depends on weather and demand.",
      },
      {
        question: "Are you open Sunday for storm calls?",
        answer:
          "No. We are open Monday through Saturday, 8:00 a.m. to 6:00 p.m. Central Time, and closed Sunday.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["storm-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "frisco",
    serviceSlug: "roof-repair",
    city: "Frisco",
    serviceLabel: serviceCatalog["roof-repair"].label,
    title: "Roof Repair in Frisco, TX",
    metaTitle: "Roof Repair Frisco | Leak, Wind, and Shingle Repair",
    description:
      "Praise Worthy inspects Frisco roof leaks and storm-worn shingles first, then explains whether a targeted repair is appropriate or a replacement discussion is more honest.",
    metaDescription:
      "Frisco roof repair starts with a free inspection of leaks and storm wear. Honest repair vs replacement. Call 682-250-0078 Mon–Sat 8–6 CT.",
    keywords: [
      "roof repair Frisco",
      "roof leak repair Frisco",
      "residential roof repair Frisco TX",
      "shingle roof repair Frisco",
      "roofing repair contractor Frisco",
    ],
    intro:
      "Frisco roof repair is often a wind-lifted tab, a pipe-boot leak, or a valley that started showing after one hard rain. We inspect the cause before talking about a repair scope.",
    body: [
      "Newer Frisco roofs can still leak at penetrations and transitions. Older sections near the Little Elm border may mix age-related wear with a recent storm. Both need a full look, not just a tube of sealant on the stain.",
      "If the damage is local, we discuss a defined repair. If hail or wind wear is widespread, we will say a replacement conversation may be the more accurate next step.",
      "We do not treat repair as a way to hide a roof that is ready for a larger decision, and we do not promise insurance will fund either path.",
    ],
    serviceBullets: [
      "Frisco leak and flashing inspections",
      "Localized shingle-repair guidance",
      "Honest scope before any work",
      "Replacement talk only when findings support it",
    ],
    faq: [
      {
        question: "Can a newer Frisco roof still need repair?",
        answer:
          "Yes. Wind, hail, and flashing details can create problems long before a roof reaches typical replacement age.",
      },
      {
        question: "Will you just tar a Frisco leak and leave?",
        answer:
          "We inspect the source first. A smear of sealant without understanding the opening is not a complete answer.",
      },
      {
        question: "How do I request Frisco roof repair?",
        answer: `Call ${BUSINESS_PHONE} or schedule a free inspection online. Repair recommendations come after we see the roof.`,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-repair"].relatedGuideSlugs,
  },
  {
    citySlug: "arlington",
    serviceSlug: "roof-inspection",
    city: "Arlington",
    serviceLabel: serviceCatalog["roof-inspection"].label,
    title: "Free Roof Inspection in Arlington, TX",
    metaTitle: "Free Roof Inspection Arlington | Storm & Hail Roof Check",
    description:
      "Praise Worthy provides free roof inspections across north and south Arlington so homeowners can see whether hail, wind, or age-related wear needs attention.",
    metaDescription:
      "Free roof inspection in Arlington, TX. Photos and plain-language findings for storm and leak-risk areas. Call 682-250-0078. Closed Sunday.",
    keywords: [
      "Arlington roof inspection",
      "free roof inspection Arlington",
      "roof inspection Arlington TX",
      "residential roof inspection Arlington",
      "schedule roof inspection Arlington",
    ],
    intro:
      "A free roof inspection in Arlington is the practical first step when you live in a large city with mixed housing ages and you are not sure what the last storm did to your specific roof.",
    body: [
      "North Arlington, south Arlington, and homes near Dalworthington Gardens or the Mansfield border do not all wear the same. Older roofs may already be thin; newer roofs can still hide hail bruises.",
      "We inspect the surface, edges, flashing, and penetrations and give you photos you can keep. The visit is for understanding the roof, not locking you into a contract.",
      "If monitoring is enough, we will say that. If repair or a replacement discussion is justified, you will see the conditions behind that advice.",
    ],
    serviceBullets: [
      "Free Arlington roof inspections",
      "North and south Arlington coverage",
      "Storm-wear and leak-risk photos",
      "No-obligation findings",
    ],
    faq: [
      {
        question: "Do you inspect Arlington roofs without a leak?",
        answer:
          "Yes. Many useful inspections happen before water reaches a ceiling, especially after hail or high wind.",
      },
      {
        question: "Is the Arlington inspection free?",
        answer:
          "Yes. The initial residential roof inspection is free and does not require you to approve work.",
      },
      {
        question: "What are your Arlington hours?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-inspection"].relatedGuideSlugs,
  },
  {
    citySlug: "arlington",
    serviceSlug: "hail-damage",
    city: "Arlington",
    serviceLabel: serviceCatalog["hail-damage"].label,
    title: "Hail Damage Roof Inspection in Arlington, TX",
    metaTitle: "Hail Damage Roof Inspection Arlington | Free Check",
    description:
      "Praise Worthy inspects Arlington roofs for hail impact and documents shingle and metal marks so homeowners can decide their next step with clear photos.",
    metaDescription:
      "Arlington hail damage roof inspection with photos. Inspection and adjuster meeting only — no claim-payment promises. Call 682-250-0078.",
    keywords: [
      "hail damage roof inspection Arlington",
      "hail damage roof repair Arlington",
      "hail damaged roof Arlington TX",
      "roof hail damage Arlington",
      "free hail inspection Arlington",
    ],
    intro:
      "Arlington hail can track across a wide city and still hit one subdivision harder than the next. A hail-damage inspection is how you find out whether your shingles and metal were marked.",
    body: [
      "Because Arlington stretches so far north to south, a storm that dents gutters in one area may only dust another. Yard metal and neighbor reports are clues, not a roof diagnosis.",
      "We photograph suspected bruises, granule loss, and dented flashing or vents. Those pictures help you understand severity before you decide whether to monitor, repair, or call your insurer.",
      INSURANCE_LIMIT,
    ],
    serviceBullets: [
      "Arlington hail-impact inspections",
      "Shingle bruise and metal-dent photos",
      "Optional adjuster meeting",
      "No guarantee insurance pays",
    ],
    faq: [
      {
        question: "I heard hail in Arlington but see no missing shingles. Still inspect?",
        answer:
          "Yes, if you heard hail, found granules, or see dents on soft metal. Functional hail marks often stay on the shingle surface.",
      },
      {
        question: "Will you waive my deductible if I use you after a hail claim?",
        answer:
          "No. We do not waive deductibles. Any insurance payment decision belongs to your carrier.",
      },
      {
        question: "Can hail damage be repaired on an Arlington roof?",
        answer:
          "Limited damage sometimes can. Widespread functional hail wear may lead to a replacement conversation after we document the roof.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["hail-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "arlington",
    serviceSlug: "storm-damage",
    city: "Arlington",
    serviceLabel: serviceCatalog["storm-damage"].label,
    title: "Storm Damage Roof Inspection in Arlington, TX",
    metaTitle: "Storm Damage Roof Arlington | Wind, Hail & Leak Check",
    description:
      "Praise Worthy inspects Arlington roofs after wind, hail, and heavy rain, focusing on lifted shingles, open flashing, and other storm-created leak-risk points.",
    metaDescription:
      "Storm damage roof inspection in Arlington, TX. Document wind and hail wear, then decide next steps. Call 682-250-0078 Mon–Sat 8–6 CT.",
    keywords: [
      "storm damage roof Arlington",
      "storm damage roof inspection Arlington",
      "roof storm damage Arlington TX",
      "wind and storm roof damage Arlington",
      "after storm roof inspection Arlington",
    ],
    intro:
      "An Arlington storm-damage inspection is for the morning after: wet insulation on a soffit, a shingle in the flower bed, or a new drip you cannot explain from the ground.",
    body: [
      "Arlington storms can push wind down long streets of similarly aged homes, then add hail on only some blocks. That pattern makes it easy to assume the roof is fine because the front elevation still looks even.",
      "We check wind lift, hail marks, ridge movement, and flashing at chimneys and walls. You get a clear note on what looks urgent versus what can be watched.",
      "If you involve insurance, we can meet the adjuster. We will not say the claim will be paid.",
    ],
    serviceBullets: [
      "Arlington post-storm inspections",
      "Wind and hail reviewed together",
      "Leak-risk notes you can keep",
      "No same-day-response claims",
    ],
    faq: [
      {
        question: "Do you offer 24-hour storm response in Arlington?",
        answer:
          "No. We schedule inspections Monday through Saturday, 8:00 a.m. to 6:00 p.m. Central Time. Timing after a busy storm period depends on weather and demand.",
      },
      {
        question: "Should I tarp an Arlington roof myself?",
        answer:
          "Only if you can do it safely from the ground or with a qualified helper. Do not climb a wet roof. Tell us what you see when you call.",
      },
      {
        question: "Does storm damage always mean a new Arlington roof?",
        answer:
          "No. Some roofs need a defined repair. Some need monitoring. Replacement is discussed only when the visible condition supports it.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["storm-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "arlington",
    serviceSlug: "roof-repair",
    city: "Arlington",
    serviceLabel: serviceCatalog["roof-repair"].label,
    title: "Roof Repair in Arlington, TX",
    metaTitle: "Roof Repair Arlington | Leak and Shingle Repair Help",
    description:
      "Praise Worthy inspects Arlington roof leaks, missing shingles, and flashing failures, then explains a repair scope only after the cause is visible.",
    metaDescription:
      "Arlington roof repair after a free inspection of leaks, shingles, and flashing. Honest repair vs replacement. Call 682-250-0078.",
    keywords: [
      "roof repair Arlington",
      "roof leak repair Arlington",
      "residential roof repair Arlington TX",
      "shingle roof repair Arlington",
      "roofing repair contractor Arlington",
    ],
    intro:
      "Arlington roof repair should start with why the water entered, not which stain is darkest. We inspect the leak path and surrounding storm wear before talking about a repair.",
    body: [
      "In mixed-age Arlington neighborhoods, a leak can come from a tired pipe boot, a wind-cut shingle, or a step-flashing line that finally opened. Those are different repairs with different outlooks.",
      "We inspect the suspected area and the rest of the roof so a small patch is not hiding broader hail or wind wear. If a repair is realistic, we say so. If replacement is the more honest discussion, we show you why.",
      "We do not promise insurance will pay for the repair.",
    ],
    serviceBullets: [
      "Arlington leak-cause inspections",
      "Shingle and flashing repair guidance",
      "Whole-roof context before a patch",
      "No default reroof pitch",
    ],
    faq: [
      {
        question: "Can you repair an older Arlington roof?",
        answer:
          "Sometimes, if the opening is local and surrounding shingles can still do their job. Very worn roofs may need a replacement conversation instead.",
      },
      {
        question: "Do you repair only the room that is leaking?",
        answer:
          "We inspect the roof above that room and the rest of the surface. Water often travels. The stain is not always the source.",
      },
      {
        question: "How do I start Arlington roof repair?",
        answer: `Call ${BUSINESS_PHONE} or use the scheduling link. We inspect first, then discuss a repair scope if one fits the findings.`,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-repair"].relatedGuideSlugs,
  },
  {
    citySlug: "north-richland-hills",
    serviceSlug: "roof-inspection",
    city: "North Richland Hills",
    serviceLabel: serviceCatalog["roof-inspection"].label,
    title: "Free Roof Inspection in North Richland Hills, TX",
    metaTitle: "Free Roof Inspection North Richland Hills | Local Roof Check",
    description:
      "Praise Worthy provides free roof inspections in North Richland Hills, the core Mid-Cities area we serve, with photos and a clear explanation of visible roof conditions.",
    metaDescription:
      "Free roof inspection in North Richland Hills. Local DFW team, photos, and honest next steps. Call 682-250-0078 Mon–Sat 8–6 CT.",
    keywords: [
      "North Richland Hills roof inspection",
      "free roof inspection North Richland Hills",
      "roof inspection North Richland Hills TX",
      "residential roof inspection North Richland Hills",
      "schedule roof inspection North Richland Hills",
    ],
    intro:
      "North Richland Hills is at the center of our service area. A free roof inspection here is a local visit: we check the roof, take photos, and tell you what we see without dressing it up.",
    body: [
      "NRH homes sit in the same Mid-Cities storm path as Richland Hills, Watauga, Hurst, and Keller. After hail or wind, it is common to want a neighbor-level answer instead of a generic DFW script.",
      "We inspect shingles, flashing, ridges, and leak-risk points, then explain whether the roof looks like a monitor, repair, or replacement conversation. You are not required to do any of those after the visit.",
      "If you want to keep reading, the city hub and our inspection guides walk through the same process in more detail.",
    ],
    serviceBullets: [
      "Free North Richland Hills inspections",
      "Mid-Cities local roof checks",
      "Photo documentation",
      "Direct, no-pressure findings",
    ],
    faq: [
      {
        question: "Why start with an inspection in North Richland Hills?",
        answer:
          "It is the fastest way to know whether last week’s weather left real roof issues or only yard debris. Guessing from the driveway is easy to get wrong.",
      },
      {
        question: "Is the NRH inspection really free?",
        answer:
          "Yes. The initial residential inspection is free and does not obligate you to hire us for repair or replacement.",
      },
      {
        question: "When can North Richland Hills homeowners call?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-inspection"].relatedGuideSlugs,
  },
  {
    citySlug: "north-richland-hills",
    serviceSlug: "hail-damage",
    city: "North Richland Hills",
    serviceLabel: serviceCatalog["hail-damage"].label,
    title: "Hail Damage Roof Inspection in North Richland Hills, TX",
    metaTitle: "Hail Damage Roof Inspection North Richland Hills",
    description:
      "Praise Worthy inspects North Richland Hills roofs for hail marks on shingles and metal, then documents findings for homeowners who may later meet an adjuster.",
    metaDescription:
      "Hail damage inspection in North Richland Hills with photos. We can meet your adjuster. We do not promise insurance will pay.",
    keywords: [
      "hail damage roof inspection North Richland Hills",
      "hail damage roof repair North Richland Hills",
      "hail damaged roof North Richland Hills TX",
      "roof hail damage North Richland Hills",
      "free hail inspection North Richland Hills",
    ],
    intro:
      "Hail damage inspections are a common reason North Richland Hills homeowners call. We look for bruises and metal dents, photograph them, and explain what those marks mean for the roof in front of you.",
    body: [
      "Mid-Cities hail can rake NRH, Richland Hills, and Watauga in the same hour. Because lots and tree cover vary, two houses on the same street can show different impact density.",
      "We check field shingles, ridges, flashing, and soft metal. You get a record you can keep if you later choose to involve insurance.",
      INSURANCE_LIMIT,
    ],
    serviceBullets: [
      "NRH hail-damage inspections",
      "Local Mid-Cities storm context",
      "Adjuster meeting if you request it",
      "No deductible-waiver offers",
    ],
    faq: [
      {
        question: "Do you handle hail inspections in North Richland Hills often?",
        answer:
          "Yes. Hail checks are a regular part of our work in North Richland Hills and nearby Mid-Cities communities. We still inspect each roof on its own findings.",
      },
      {
        question: "Will you say my insurance has to pay for a new NRH roof?",
        answer:
          "No. We document visible conditions. Coverage, depreciation, and payment are between you and your insurer.",
      },
      {
        question: "Can I wait until the next storm season?",
        answer:
          "You can, but hail marks do not improve with time. An earlier inspection gives you more time to decide without a leak forcing the timeline.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["hail-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "north-richland-hills",
    serviceSlug: "storm-damage",
    city: "North Richland Hills",
    serviceLabel: serviceCatalog["storm-damage"].label,
    title: "Storm Damage Roof Inspection in North Richland Hills, TX",
    metaTitle: "Storm Damage Roof North Richland Hills | Free Inspection",
    description:
      "Praise Worthy inspects North Richland Hills roofs after wind, hail, and heavy rain and explains what changed so homeowners can choose the next step calmly.",
    metaDescription:
      "Storm damage roof inspection in North Richland Hills. Wind, hail, and leak-risk photos. Call 682-250-0078. Sunday closed.",
    keywords: [
      "storm damage roof North Richland Hills",
      "storm damage roof inspection North Richland Hills",
      "roof storm damage North Richland Hills TX",
      "wind and storm roof damage North Richland Hills",
      "after storm roof inspection North Richland Hills",
    ],
    intro:
      "After a North Richland Hills storm, you want to know if the roof moved. We inspect for wind lift, hail marks, and opened flashing, then tell you what looks urgent.",
    body: [
      "NRH shares weather with Hurst, Keller, and Watauga, so the same evening can leave shingles in several yards. The useful work is still on your roof, not the neighborhood rumor mill.",
      "We walk the conditions we can see, photograph them, and separate storm-related change from ordinary wear. If you want an adjuster there later, we can meet them.",
      "We will not claim 24-hour response or a guaranteed claim result.",
    ],
    serviceBullets: [
      "North Richland Hills storm inspections",
      "Wind, hail, and rain-entry review",
      "Photo notes for your files",
      "Business-hours scheduling only",
    ],
    faq: [
      {
        question: "What should NRH homeowners do right after a storm?",
        answer:
          "Stay off a wet roof, look from the ground for missing shingles or new stains, and call during business hours if you want the roof documented.",
      },
      {
        question: "Do you guarantee insurance will cover NRH storm damage?",
        answer:
          "No. Inspection, photos, and an adjuster meeting are the support we can offer. Payment is not guaranteed.",
      },
      {
        question: "Are you open Sunday after a Saturday night storm?",
        answer:
          "No. We are closed Sunday. Call Monday through Saturday, 8:00 a.m. to 6:00 p.m. Central Time.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["storm-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "north-richland-hills",
    serviceSlug: "roof-repair",
    city: "North Richland Hills",
    serviceLabel: serviceCatalog["roof-repair"].label,
    title: "Roof Repair in North Richland Hills, TX",
    metaTitle: "Roof Repair North Richland Hills | Leak & Shingle Help",
    description:
      "Praise Worthy inspects North Richland Hills roof leaks and storm-worn shingles, then recommends a repair only when the visible cause supports a local fix.",
    metaDescription:
      "Roof repair in North Richland Hills starts with a free inspection. Honest leak-source and repair vs replacement guidance. Call 682-250-0078.",
    keywords: [
      "roof repair North Richland Hills",
      "roof leak repair North Richland Hills",
      "residential roof repair North Richland Hills TX",
      "shingle roof repair North Richland Hills",
      "roofing repair contractor North Richland Hills",
    ],
    intro:
      "North Richland Hills roof repair should follow a cause you can see. We inspect the leak or missing shingles first, then talk about a repair scope that matches the roof in front of us.",
    body: [
      "Local repair calls here often follow a wind event that lifted a few tabs, a pipe boot that dried and split, or a valley that started showing after repeated Mid-Cities storms.",
      "We inspect the problem area and the rest of the roof. A tidy patch on one corner is not helpful if the field is heavily hail-marked. If replacement is the more honest discussion, we will say so.",
      "For a longer local walkthrough, see our North Richland Hills roof-repair guide and the city hub.",
    ],
    serviceBullets: [
      "NRH leak and shingle-repair inspections",
      "Cause-first repair guidance",
      "Whole-roof context",
      "No default replacement pitch",
    ],
    faq: [
      {
        question: "Does every NRH leak mean I need a new roof?",
        answer:
          "No. Some leaks are local. Some sit on a roof that is broadly worn. The inspection is how we tell those apart.",
      },
      {
        question: "Can you repair hail damage in North Richland Hills?",
        answer:
          "If the hail wear is limited, a repair conversation may be appropriate. Widespread functional damage can change that recommendation.",
      },
      {
        question: "How do I request roof repair in North Richland Hills?",
        answer: `Call ${BUSINESS_PHONE} or schedule a free inspection. We do not quote a repair without seeing the roof.`,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-repair"].relatedGuideSlugs,
  },
  {
    citySlug: "carrollton",
    serviceSlug: "roof-inspection",
    city: "Carrollton",
    serviceLabel: serviceCatalog["roof-inspection"].label,
    title: "Free Roof Inspection in Carrollton, TX",
    metaTitle: "Free Roof Inspection Carrollton | Hail & Storm Roof Check",
    description:
      "Praise Worthy offers free roof inspections for Carrollton homeowners along the Dallas, Denton, and Collin county edges who want documented storm and wear findings.",
    metaDescription:
      "Free roof inspection in Carrollton, TX. Photos of hail, wind, and leak-risk areas. Call 682-250-0078 Mon–Sat 8–6 CT. Sunday closed.",
    keywords: [
      "Carrollton roof inspection",
      "free roof inspection Carrollton",
      "roof inspection Carrollton TX",
      "residential roof inspection Carrollton",
      "schedule roof inspection Carrollton",
    ],
    intro:
      "A free roof inspection in Carrollton helps when you sit between Dallas, Denton, and Collin weather and you are not sure which storm cell actually reached your block.",
    body: [
      "Carrollton roofs near the Farmers Branch, Addison, and Plano borders can see different wind and hail from the same evening. Older streets and newer infill do not respond the same way either.",
      "We inspect shingles, flashing, ridges, and penetrations, then explain what is visible with photos. You can stop at information. Work is a separate decision.",
      "If the roof looks sound, we will say that. If repair or a replacement talk is justified, you will see why.",
    ],
    serviceBullets: [
      "Free Carrollton roof inspections",
      "County-line storm context",
      "Photo-backed findings",
      "No-pressure next steps",
    ],
    faq: [
      {
        question: "Do you inspect Carrollton roofs after mild storms too?",
        answer:
          "Yes. Moderate wind or light hail can still lift tabs or bruise shingles. An inspection is about condition, not how dramatic the night felt.",
      },
      {
        question: "Is the Carrollton inspection free?",
        answer:
          "Yes. The initial residential inspection is free and does not require you to approve a project.",
      },
      {
        question: "When can I schedule in Carrollton?",
        answer: HOURS_ANSWER,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-inspection"].relatedGuideSlugs,
  },
  {
    citySlug: "carrollton",
    serviceSlug: "hail-damage",
    city: "Carrollton",
    serviceLabel: serviceCatalog["hail-damage"].label,
    title: "Hail Damage Roof Inspection in Carrollton, TX",
    metaTitle: "Hail Damage Roof Inspection Carrollton | Free Photos",
    description:
      "Praise Worthy inspects Carrollton roofs for hail bruising and dented metal, then documents findings homeowners can use before any insurance conversation.",
    metaDescription:
      "Carrollton hail damage roof inspection with photos. Adjuster meeting on request. No claim-payment or deductible-waiver promises.",
    keywords: [
      "hail damage roof inspection Carrollton",
      "hail damage roof repair Carrollton",
      "hail damaged roof Carrollton TX",
      "roof hail damage Carrollton",
      "free hail inspection Carrollton",
    ],
    intro:
      "Carrollton hail can arrive with a cell that looked like it was headed for Addison or Plano. A hail-damage inspection confirms whether your shingles and metal were hit.",
    body: [
      "Because Carrollton sits on three county lines, radar screenshots are a weak substitute for roof photos. One slope can take stone while the opposite slope stays clean.",
      "We look for bruises, granule loss, and dents on flashing, vents, and gutters. Those details help you decide whether to monitor, repair, or keep a record for your insurer.",
      INSURANCE_LIMIT,
    ],
    serviceBullets: [
      "Carrollton hail-mark inspections",
      "Shingle and metal documentation",
      "Optional adjuster meeting",
      "No payment guarantees",
    ],
    faq: [
      {
        question: "Should I open a Carrollton hail claim before you inspect?",
        answer:
          "You can, but many homeowners want photos first. If you do file, we can meet the adjuster. We cannot promise the claim will be paid.",
      },
      {
        question: "Is light hail in Carrollton worth an inspection?",
        answer:
          "If you heard hail or see granules or dented metal, yes. Light stone can still bruise shingles enough to matter over the next few seasons.",
      },
      {
        question: "Do you waive deductibles on Carrollton hail jobs?",
        answer:
          "No. We do not waive deductibles.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["hail-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "carrollton",
    serviceSlug: "storm-damage",
    city: "Carrollton",
    serviceLabel: serviceCatalog["storm-damage"].label,
    title: "Storm Damage Roof Inspection in Carrollton, TX",
    metaTitle: "Storm Damage Roof Carrollton | Wind & Hail Inspection",
    description:
      "Praise Worthy inspects Carrollton roofs after wind, hail, and heavy rain so homeowners can see whether shingles lifted or leak-risk points opened.",
    metaDescription:
      "Storm damage roof inspection in Carrollton, TX. Wind, hail, and leak-risk photos. Call 682-250-0078. Closed Sunday.",
    keywords: [
      "storm damage roof Carrollton",
      "storm damage roof inspection Carrollton",
      "roof storm damage Carrollton TX",
      "wind and storm roof damage Carrollton",
      "after storm roof inspection Carrollton",
    ],
    intro:
      "A Carrollton storm-damage inspection answers a simple question after a messy night: did this roof change, or did the yard just collect debris?",
    body: [
      "Carrollton storms can push wind down older north-south streets and then drop hail closer to the Plano or Farmers Branch edges. That split is why a clean front elevation is not the whole story.",
      "We inspect for lifted or creased shingles, ridge movement, flashing gaps, and hail marks. You get photos and a direct note on urgency.",
      "Insurance support means documentation and an adjuster meeting if you ask — not a promised check.",
    ],
    serviceBullets: [
      "Carrollton post-storm roof checks",
      "Wind and hail reviewed on the same visit",
      "Leak-risk notes around flashing",
      "Business-hours scheduling",
    ],
    faq: [
      {
        question: "What should I do first after a Carrollton storm?",
        answer:
          "Avoid downed lines, look from the ground for missing shingles or new stains, and call during posted hours if you want the roof inspected.",
      },
      {
        question: "Do you promise same-day Carrollton storm visits?",
        answer:
          "No. We schedule Monday through Saturday, 8:00 a.m. to 6:00 p.m. Central Time. After a busy weather day, timing depends on demand.",
      },
      {
        question: "Does storm damage always mean replacement in Carrollton?",
        answer:
          "No. Some roofs need a local repair or simple monitoring. Replacement is discussed only when the visible condition supports it.",
      },
    ],
    relatedGuideSlugs: serviceCatalog["storm-damage"].relatedGuideSlugs,
  },
  {
    citySlug: "carrollton",
    serviceSlug: "roof-repair",
    city: "Carrollton",
    serviceLabel: serviceCatalog["roof-repair"].label,
    title: "Roof Repair in Carrollton, TX",
    metaTitle: "Roof Repair Carrollton | Leak and Shingle Repair Inspection",
    description:
      "Praise Worthy inspects Carrollton roof leaks and storm-worn shingles first, then explains whether a targeted repair is realistic or a replacement discussion is needed.",
    metaDescription:
      "Carrollton roof repair after a free inspection of leaks, flashing, and storm wear. Honest repair vs replacement. Call 682-250-0078.",
    keywords: [
      "roof repair Carrollton",
      "roof leak repair Carrollton",
      "residential roof repair Carrollton TX",
      "shingle roof repair Carrollton",
      "roofing repair contractor Carrollton",
    ],
    intro:
      "Carrollton roof repair should start with the opening on the roof, not the stain on the ceiling. We inspect the leak path and surrounding wear before recommending a repair.",
    body: [
      "Carrollton homes include older sections that leak at tired flashing and newer roofs that lose a few tabs in wind. Either way, a useful repair plan needs the cause in view.",
      "We inspect the problem and the rest of the roof so a small repair is not covering widespread hail or wind wear. If a replacement conversation is more honest, we will say so and show the photos.",
      "We do not promise that insurance will fund the repair.",
    ],
    serviceBullets: [
      "Carrollton leak-source inspections",
      "Shingle and flashing repair guidance",
      "Whole-roof context before a patch",
      "Conditional replacement discussion only",
    ],
    faq: [
      {
        question: "Can you repair a Carrollton roof after hail?",
        answer:
          "If the hail wear is limited, maybe. If the field is broadly marked in a way that affects function, we may recommend a replacement conversation instead.",
      },
      {
        question: "Do I need to know the exact leak source before I call?",
        answer:
          "No. Describe the stain or missing shingles. Finding the source is part of the inspection.",
      },
      {
        question: "How do I request Carrollton roof repair?",
        answer: `Call ${BUSINESS_PHONE} or schedule a free inspection. We review the roof before discussing a repair scope.`,
      },
    ],
    relatedGuideSlugs: serviceCatalog["roof-repair"].relatedGuideSlugs,
  },
];

export const cityServicePagesByKey = Object.fromEntries(
  cityServicePages.map((page) => [`${page.citySlug}/${page.serviceSlug}`, page]),
) as Record<string, CityServicePage>;

export function isMoneyPageCitySlug(value: string): value is MoneyPageCitySlug {
  return (moneyPageCitySlugs as readonly string[]).includes(value);
}

export function isCityServiceSlug(value: string): value is CityServiceSlug {
  return (cityServiceSlugs as readonly string[]).includes(value);
}

export function getCityServicePage(citySlug: string, serviceSlug: string) {
  return cityServicePagesByKey[`${citySlug}/${serviceSlug}`] ?? null;
}

export function getCityServicePath(citySlug: string, serviceSlug: string) {
  return normalizeUrlPath(`/${citySlug}/${serviceSlug}/`);
}

export function getCityServiceUrl(citySlug: string, serviceSlug: string) {
  return absoluteUrl(getCityServicePath(citySlug, serviceSlug));
}

export function getCityServicePagesForCity(citySlug: string) {
  return cityServicePages.filter((page) => page.citySlug === citySlug);
}

export function getSiblingServicePages(page: CityServicePage) {
  return cityServicePages.filter(
    (candidate) =>
      candidate.citySlug === page.citySlug &&
      candidate.serviceSlug !== page.serviceSlug,
  );
}

export function getSameServiceCityPages(page: CityServicePage, limit = 3) {
  return cityServicePages
    .filter(
      (candidate) =>
        candidate.serviceSlug === page.serviceSlug &&
        candidate.citySlug !== page.citySlug,
    )
    .slice(0, limit);
}

export function getCityHubForServicePage(page: CityServicePage) {
  return cityPagesBySlug[page.citySlug];
}

export function getCityServiceMetadata(page: CityServicePage): Metadata {
  const url = getCityServiceUrl(page.citySlug, page.serviceSlug);

  return {
    ...getAuthorMetadata(),
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    other: {
      "content-language": localeMeta.en.languageTag,
      "article:published_time": SITE_PUBLISHED_AT,
      "article:modified_time": SITE_UPDATED_AT,
      "article:author": BUSINESS_AUTHOR_NAME,
    },
    alternates: {
      canonical: url,
    },
    ...getSocialMetadata({
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: BUSINESS_NAME,
      type: "website",
      imageAlt: page.title,
    }),
    robots: getDefaultRobots(),
  };
}
