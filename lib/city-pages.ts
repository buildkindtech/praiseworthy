import type { Metadata } from "next";
import {
  BUSINESS_AUTHOR_NAME,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  SITE_PUBLISHED_AT,
  SITE_UPDATED_AT,
} from "@/lib/seo";
import {
  absoluteUrl,
  getAuthorMetadata,
  getDefaultRobots,
  getSocialMetadata,
  normalizeUrlPath,
} from "@/lib/seo";
import { localeMeta } from "@/lib/seo-i18n";

export type CityPage = {
  slug: string;
  city: string;
  title: string;
  metaTitle: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  body: string[];
  serviceBullets: string[];
  nearbyAreas: string[];
  faq: Array<{ question: string; answer: string }>;
};

export const cityPages: CityPage[] = [
  {
    slug: "fort-worth",
    city: "Fort Worth",
    title: "Roof Inspection and Roofing Services in Fort Worth, TX",
    metaTitle: "Fort Worth Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage assessments, and residential roofing services for homeowners in Fort Worth, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Fort Worth? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Fort Worth roof inspection",
      "roofing contractor Fort Worth TX",
      "hail damage roof repair Fort Worth",
      "storm damage roofing Fort Worth",
      "free roof inspection Fort Worth",
    ],
    intro:
      "If you are searching for a roofing contractor in Fort Worth after hail, heavy rain, or wind, this page is designed to answer the most common homeowner questions before a small issue turns into a major repair.",
    body: [
      "Praise Worthy works with homeowners in Fort Worth who need a fast and honest roof inspection after storms. We check for missing shingles, lifted edges, granule loss, flashing damage, soft spots, and visible leak risk so you have a clearer picture of the roof condition before making a decision.",
      "Fort Worth homes can take a beating during storm season, especially when hail and high winds affect multiple neighborhoods at once. A local inspection helps determine whether the roof needs simple monitoring, targeted repair, or a larger replacement plan backed by clear photo documentation.",
      "We also help Fort Worth homeowners understand what to expect if insurance is involved. Our role is to document damage clearly, explain findings in plain language, and make the next step easier to understand without pressure.",
    ],
    serviceBullets: [
      "Free roof inspections for Fort Worth homeowners",
      "Storm and hail damage roof assessments",
      "Residential roofing repair and replacement guidance",
      "Roof documentation that supports insurance conversations",
    ],
    nearbyAreas: ["West Fort Worth", "North Fort Worth", "Ridglea", "Benbrook"],
    faq: [
      {
        question: "How quickly can you inspect a roof in Fort Worth?",
        answer:
          "Inspection availability depends on current storm demand and weather conditions. Send a request or call to confirm an onsite visit. The online calendar schedules a phone call.",
      },
      {
        question: "Do you handle hail damage roof inspections in Fort Worth?",
        answer:
          "Yes. Hail damage inspections are one of the main reasons Fort Worth homeowners call us after severe weather.",
      },
      {
        question: "Can you help with insurance documentation?",
        answer:
          "Yes. We provide photo documentation and a clear summary of visible roof conditions to help homeowners understand what to discuss with their insurance company.",
      },
    ],
  },
  {
    slug: "keller",
    city: "Keller",
    title: "Roof Inspection and Storm Damage Roofing in Keller, TX",
    metaTitle: "Keller Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections, hail damage checks, and residential roofing services for homeowners in Keller, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Keller? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Keller roof inspection",
      "roofing contractor Keller TX",
      "hail damage roofing Keller",
      "storm damage roof repair Keller",
      "free roof inspection Keller",
    ],
    intro:
      "Keller homeowners often search for a roofer right after a storm, but the best next step is usually a documented inspection that shows whether the roof is actually damaged and how urgent the problem is.",
    body: [
      "Praise Worthy helps Keller homeowners inspect roofs for hail marks, wind damage, shingle wear, flashing issues, and early leak risk. That is especially useful when the roof still looks fine from the ground but hidden damage may already be present.",
      "Because Keller sits within the same broader North Tarrant storm pattern as other DFW communities, weather-related roof damage can happen quickly and spread quietly. Catching those signs early gives homeowners more time to protect the home and compare repair options calmly.",
      "Our process focuses on straightforward guidance. We inspect the roof, document findings with photos, explain what we found, and help homeowners understand their options without overcomplicating the next step.",
    ],
    serviceBullets: [
      "Free roof inspections in Keller",
      "Hail and wind damage roof checks",
      "Residential roofing recommendations based on inspection findings",
      "Local support before repair or replacement decisions",
    ],
    nearbyAreas: ["North Keller", "Hidden Lakes", "Southlake border", "Watauga"],
    faq: [
      {
        question: "Why book a roof inspection in Keller after hail?",
        answer:
          "Small hail strikes can shorten roof life even when there is no obvious leak yet. An inspection helps confirm whether damage is cosmetic, functional, or developing into a bigger problem.",
      },
      {
        question: "Do you only work on large roofing jobs?",
        answer:
          "No. We inspect and explain conditions first. Some homeowners need repairs, some need replacement planning, and some only need peace of mind.",
      },
      {
        question: "Are inspections really free?",
        answer:
          "Yes. The initial roof inspection is free for homeowners in Keller and nearby service areas.",
      },
    ],
  },
  {
    slug: "bedford",
    city: "Bedford",
    title: "Bedford TX Roof Inspection and Residential Roofing Services",
    metaTitle: "Bedford Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage assessments, and roofing support for homeowners in Bedford, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Bedford? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Bedford roof inspection",
      "roofing contractor Bedford TX",
      "storm damage roof Bedford",
      "hail damage roof inspection Bedford",
      "free roof inspection Bedford",
    ],
    intro:
      "Bedford homeowners often need a roofer after intense weather, but what matters most first is getting a clear local inspection that shows what is actually happening on the roof.",
    body: [
      "Praise Worthy inspects Bedford roofs for storm damage, hail impact, lifted shingles, exposed nail lines, flashing wear, and signs of water intrusion. That kind of early inspection can prevent avoidable interior damage and more expensive repairs later.",
      "Bedford homes often share weather patterns with Hurst, Euless, and surrounding Mid-Cities neighborhoods, so roof issues may develop after the same storm systems that affect the wider DFW area. A fast inspection helps homeowners act before those issues worsen.",
      "Our goal is to make the process easier. We provide clear inspection notes, explain what needs attention, and help you decide whether repair, replacement, or continued observation makes the most sense for your home.",
    ],
    serviceBullets: [
      "Bedford roof inspections after hail and wind",
      "Residential roofing support for leak prevention",
      "Storm damage photo documentation",
      "Honest recommendations for homeowners in the Mid-Cities area",
    ],
    nearbyAreas: ["Hurst", "Euless", "Mid-Cities", "Colleyville border"],
    faq: [
      {
        question: "What roof problems do you look for in Bedford?",
        answer:
          "We look for hail impact, wind damage, shingle deterioration, flashing problems, and visible leak-risk areas around penetrations and roof lines.",
      },
      {
        question: "Can a Bedford roof look fine and still be damaged?",
        answer:
          "Yes. Many roofing issues are not obvious from the driveway, especially after hail or strong wind events.",
      },
      {
        question: "Do you serve neighborhoods around Bedford too?",
        answer:
          "Yes. We serve Bedford and nearby Mid-Cities communities throughout this part of DFW.",
      },
    ],
  },
  {
    slug: "euless",
    city: "Euless",
    title: "Euless TX Roof Inspection and Storm Damage Roofing Services",
    metaTitle: "Euless Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage evaluations, and residential roofing support for homeowners in Euless, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Euless? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Euless roof inspection",
      "roofing contractor Euless TX",
      "hail damage roof Euless",
      "storm damage roofing Euless",
      "free roof inspection Euless",
    ],
    intro:
      "Euless homeowners dealing with storm season often need clear answers fast. A local roof inspection can show whether the roof needs action now or careful monitoring before a minor issue grows.",
    body: [
      "Praise Worthy inspects Euless roofs for hail marks, wind-lifted shingles, flashing problems, drainage issues, and early leak risk. That helps homeowners understand the true roof condition before committing to repairs or replacement.",
      "Because Euless sits in the same Mid-Cities storm corridor as Bedford and Hurst, roof damage can happen quickly and stay hidden for weeks. What looks fine from the driveway can still include functional damage that shortens roof life.",
      "We focus on inspection first and clear guidance. Homeowners get documented findings, plain-language explanations, and practical next steps without pressure.",
    ],
    serviceBullets: [
      "Free roof inspections in Euless",
      "Hail and storm damage roof assessments",
      "Residential roofing guidance for Mid-Cities homeowners",
      "Photo documentation for clearer next-step decisions",
    ],
    nearbyAreas: ["Bedford", "Hurst", "Grapevine border", "Colleyville border"],
    faq: [
      {
        question: "Why schedule a roof inspection in Euless after hail?",
        answer:
          "Even small hail impacts can reduce roof life or create weak points that are not obvious right away. A roof inspection helps confirm whether damage is present and whether it needs attention.",
      },
      {
        question: "Do you inspect older roofs in Euless neighborhoods?",
        answer:
          "Yes. We inspect both older and newer roofs, especially where storm damage may overlap with age-related wear.",
      },
      {
        question: "How quickly can I get a roof inspection in Euless?",
        answer:
          "Inspection availability depends on current weather and storm demand. Send a request or call to confirm an onsite visit. The online calendar schedules a phone call.",
      },
    ],
  },
  {
    slug: "arlington",
    city: "Arlington",
    title: "Arlington TX Roof Inspection for Storm and Hail Damage",
    metaTitle: "Arlington Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections and residential roofing support for homeowners in Arlington, Texas after hail, wind, and storm damage.",
    metaDescription:
      "Concerned about hail or wind damage in Arlington? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Arlington roof inspection",
      "roofing contractor Arlington TX",
      "hail damage roof Arlington",
      "storm damage roof repair Arlington",
      "free roof inspection Arlington",
    ],
    intro:
      "Arlington homeowners searching for roofing help after a storm usually need two things quickly: a trustworthy inspection and a clear explanation of what the roof condition means.",
    body: [
      "Praise Worthy provides roof inspections for Arlington homes that may have been affected by hail, wind, or heavy rain. We inspect shingles, ridge lines, vents, flashing, and visible drainage-related trouble spots to catch damage before it spreads.",
      "Storm-related roofing issues in Arlington are not always obvious at first. A roof may show only minor surface wear from the ground while still carrying functional hail damage or lifted materials that create leak risk later.",
      "That is why we focus on inspection-first service. Homeowners get a clearer understanding of the roof condition, what to do next, and whether insurance or repair planning should be part of the conversation.",
    ],
    serviceBullets: [
      "Free roofing inspections in Arlington",
      "Hail and wind damage roof checks",
      "Residential roof condition reporting for homeowners",
      "Next-step guidance after severe weather",
    ],
    nearbyAreas: ["North Arlington", "South Arlington", "Dalworthington Gardens", "Mansfield border"],
    faq: [
      {
        question: "Is a roof inspection useful even without an active leak?",
        answer:
          "Yes. Many roof issues start before interior leaks appear, so early inspection can prevent larger costs later.",
      },
      {
        question: "Do you inspect roofs after wind damage in Arlington?",
        answer:
          "Yes. We inspect for wind-lifted shingles, exposed areas, and related storm damage after high-wind events.",
      },
      {
        question: "Can I schedule a free inspection online or by phone?",
        answer:
          `Yes. Arlington homeowners can call ${BUSINESS_PHONE} or send a request on the site. We confirm onsite timing by phone; the online calendar schedules a phone call.`,
      },
    ],
  },
  {
    slug: "hurst",
    city: "Hurst",
    title: "Hurst TX Roof Inspection and Storm Damage Roofing Services",
    metaTitle: "Hurst Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage assessments, and residential roofing support for homeowners in Hurst, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Hurst? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Hurst roof inspection",
      "roofing contractor Hurst TX",
      "hail damage roof Hurst",
      "storm damage roofing Hurst",
      "free roof inspection Hurst",
    ],
    intro:
      "Hurst homeowners often need clear answers after a storm. This page is built to help you understand what a local roof inspection should cover and why early action matters.",
    body: [
      "Praise Worthy inspects Hurst roofs for hail strikes, wind-lifted shingles, flashing wear, soft spots, and early leak risk. A local inspection helps homeowners understand whether the roof needs monitoring, repair planning, or a larger replacement conversation.",
      "Because Hurst sits in the same Mid-Cities weather path as Bedford, Euless, and North Richland Hills, roof damage can spread across neighborhoods quickly after a severe storm. Damage that looks minor from the yard can still shorten roof life or create hidden water intrusion points.",
      "Our approach is inspection first. We document what is visible, explain findings in plain language, and help Hurst homeowners make the next decision with less guesswork and less pressure.",
    ],
    serviceBullets: [
      "Free roof inspections in Hurst",
      "Hail and storm damage roof checks",
      "Residential roofing guidance for Mid-Cities homeowners",
      "Clear photo documentation after severe weather",
    ],
    nearbyAreas: ["Bedford", "Euless", "North Richland Hills", "Colleyville border"],
    faq: [
      {
        question: "Why schedule a roof inspection in Hurst after hail?",
        answer:
          "Even light hail can damage shingles or reduce roof life without causing an immediate leak. A professional inspection helps confirm whether the damage is functional and needs attention.",
      },
      {
        question: "Do you inspect roofs in older Hurst neighborhoods too?",
        answer:
          "Yes. We inspect both newer and older Hurst homes, especially where storm damage may combine with normal roof aging.",
      },
      {
        question: "How soon can I get a Hurst inspection?",
        answer:
          "Inspection availability depends on current weather and storm demand. Send a request or call to confirm an onsite visit. The online calendar schedules a phone call.",
      },
    ],
  },
  {
    slug: "north-richland-hills",
    city: "North Richland Hills",
    title: "North Richland Hills Roof Inspection and Roofing Services",
    metaTitle:
      "North Richland Hills Free Roof Inspection | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, hail damage assessments, and residential roofing services in North Richland Hills, Texas.",
    metaDescription:
      "Concerned about North Richland Hills hail or wind damage? Get a free roof inspection with clear photos and honest next-step guidance from Praise Worthy.",
    keywords: [
      "North Richland Hills roof inspection",
      "roofing contractor North Richland Hills TX",
      "hail damage roofing North Richland Hills",
      "storm damage roof North Richland Hills",
      "free roof inspection North Richland Hills",
    ],
    intro:
      "North Richland Hills is at the center of our service area, so this page is focused on homeowners who want a local roofing company that understands storm damage, inspection timing, and neighborhood-level roof concerns.",
    body: [
      "Praise Worthy provides free roof inspections for homeowners in North Richland Hills who want to check for hail damage, wind damage, missing shingles, flashing wear, and early leak risk. That is often the best first step after a storm passes through the area.",
      "Because North Richland Hills homes experience the same DFW weather pressure as nearby communities, roof damage can show up in subtle ways first. A local inspection helps identify those early signs before they grow into interior damage or larger repair costs.",
      "Our approach is simple: inspect the roof carefully, document visible issues, explain the findings clearly, and help homeowners understand what to do next. That makes it easier to move forward with confidence instead of guessing.",
    ],
    serviceBullets: [
      "Free roof inspections in North Richland Hills",
      "Hail and wind damage roof evaluations",
      "Residential roofing guidance from a local DFW team",
      "Clear documentation for homeowners after storms",
    ],
    nearbyAreas: ["Richland Hills", "Watauga", "Hurst", "Keller"],
    faq: [
      {
        question: "Why is North Richland Hills a priority service area?",
        answer:
          "It is one of the core communities we serve, so we regularly inspect roofs in and around North Richland Hills after severe weather.",
      },
      {
        question: "Do you help homeowners after hail storms?",
        answer:
          "Yes. Hail inspections are a major part of our roofing work in North Richland Hills and nearby DFW cities.",
      },
      {
        question: "What if the roof damage looks minor?",
        answer:
          "Even minor-looking damage can create future leak or structural issues, so it is worth documenting early with a free inspection.",
      },
    ],
  },
  {
    slug: "richland-hills",
    city: "Richland Hills",
    title: "Richland Hills TX Roof Inspection and Storm Damage Roofing Services",
    metaTitle: "Richland Hills Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage evaluations, and residential roofing support for homeowners in Richland Hills, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Richland Hills? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Richland Hills roof inspection",
      "roofing contractor Richland Hills TX",
      "hail damage roof Richland Hills",
      "storm damage roofing Richland Hills",
      "free roof inspection Richland Hills",
    ],
    intro:
      "Richland Hills homeowners often need a clear answer after a storm: is the roof truly damaged, and what should happen next? A local roof inspection is the best first step.",
    body: [
      "Praise Worthy inspects Richland Hills roofs for hail impact, wind-lifted shingles, flashing wear, exposed nail lines, and visible leak-risk areas. That gives homeowners a clearer understanding of whether the roof needs monitoring, repairs, or a larger replacement plan.",
      "Because Richland Hills sits close to North Richland Hills, Hurst, and Watauga, homes in the area often experience the same North Texas storm systems. Damage may appear subtle at first but still reduce roof life or create future water intrusion.",
      "We focus on inspection first and clear guidance. Homeowners get straightforward explanations, documented findings, and help deciding the next step without pressure.",
    ],
    serviceBullets: [
      "Free roof inspections in Richland Hills",
      "Storm and hail damage roof evaluations",
      "Residential roofing guidance based on actual roof condition",
      "Photo-backed documentation after severe weather",
    ],
    nearbyAreas: ["North Richland Hills", "Hurst", "Watauga", "Haltom City border"],
    faq: [
      {
        question: "Why inspect a Richland Hills roof after hail?",
        answer:
          "Even small hail can create damage that is not visible from the ground. An inspection helps confirm whether there are weak points that need attention.",
      },
      {
        question: "Do you inspect both newer and older roofs in Richland Hills?",
        answer:
          "Yes. We inspect a wide range of residential roofs, including older roofs where storm damage can overlap with normal wear.",
      },
      {
        question: "How soon can you inspect a roof in Richland Hills?",
        answer:
          "Inspection availability depends on current weather and storm demand. Send a request or call to confirm an onsite visit. The online calendar schedules a phone call.",
      },
    ],
  },
  {
    slug: "watauga",
    city: "Watauga",
    title: "Watauga TX Roof Inspection and Residential Roofing Support",
    metaTitle: "Watauga Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections, storm damage checks, and residential roofing support for homeowners in Watauga, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Watauga? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Watauga roof inspection",
      "roofing contractor Watauga TX",
      "hail damage roof Watauga",
      "storm damage roof repair Watauga",
      "free roof inspection Watauga",
    ],
    intro:
      "Watauga homeowners often want to know whether recent weather caused real roof damage or only surface wear. A local roof inspection helps answer that before the problem gets more expensive.",
    body: [
      "Praise Worthy inspects Watauga roofs for hail strikes, wind-lifted shingles, granule loss, flashing wear, and early leak-risk areas. That gives homeowners a clearer picture of roof condition before they decide what to do next.",
      "Because Watauga homes share the same North Tarrant weather patterns as North Richland Hills and Keller, storms can create damage that is hard to spot from the ground. An early inspection helps catch issues before they develop into interior leaks or larger repairs.",
      "Our inspection process is simple and homeowner-focused. We document what we see, explain it clearly, and help you decide whether repair, monitoring, or replacement planning makes the most sense.",
    ],
    serviceBullets: [
      "Free roof inspections in Watauga",
      "Storm and hail damage roof checks",
      "Residential roofing guidance based on actual findings",
      "Clear documentation for homeowners after severe weather",
    ],
    nearbyAreas: ["North Richland Hills", "Keller", "Haltom City border", "Saginaw border"],
    faq: [
      {
        question: "Why inspect a Watauga roof before a leak appears?",
        answer:
          "Many roofing problems become visible indoors only after damage has worsened. Early inspection helps homeowners act sooner and avoid larger repairs later.",
      },
      {
        question: "Do you inspect roofs after strong wind in Watauga?",
        answer:
          "Yes. Wind damage inspections are common, especially after North Texas storms move across the area.",
      },
      {
        question: "Are Watauga inspections really free?",
        answer:
          "Yes. The initial roof inspection is free for homeowners in Watauga and nearby service areas.",
      },
    ],
  },
  {
    slug: "frisco",
    city: "Frisco",
    title: "Frisco TX Roof Inspection and Residential Roofing Support",
    metaTitle: "Frisco Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections, storm damage roof assessments, and residential roofing support for homeowners in Frisco, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Frisco? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Frisco roof inspection",
      "roofing contractor Frisco TX",
      "hail damage roof Frisco",
      "storm damage roof repair Frisco",
      "free roof inspection Frisco",
    ],
    intro:
      "Frisco homeowners often search for a roofer after major weather, but the smartest first step is usually a roof inspection that documents what actually happened and what should happen next.",
    body: [
      "Praise Worthy provides roof inspections for Frisco homes affected by hail, wind, or heavy rain. We check shingles, ridge caps, vents, flashing, drainage points, and visible leak-risk areas so you understand the roof condition before making a bigger decision.",
      "North Texas storms can create damage that is easy to miss from the street. A Frisco roof may look mostly intact while still carrying hail bruising, lifted materials, or weak points that become leaks later.",
      "We focus on giving homeowners a clear inspection experience. That means straightforward findings, photo-backed documentation, and practical guidance without pressure or confusing sales talk.",
    ],
    serviceBullets: [
      "Free roof inspections in Frisco",
      "Storm and hail damage roof assessments",
      "Residential roofing guidance after severe weather",
      "Inspection documentation homeowners can actually use",
    ],
    nearbyAreas: ["West Frisco", "Little Elm border", "McKinney border", "The Colony border"],
    faq: [
      {
        question: "Do you inspect Frisco roofs after wind-driven storms?",
        answer:
          "Yes. Wind damage inspections are a common reason Frisco homeowners call us, especially after strong seasonal storms move across North Texas.",
      },
      {
        question: "What if there is no leak yet?",
        answer:
          "That is often the best time to inspect. Catching damage before interior symptoms appear can help avoid larger repairs later.",
      },
      {
        question: "Can you help me understand insurance-related damage findings?",
        answer:
          "Yes. We provide clear notes and photos so homeowners can better understand what to discuss with their insurance company.",
      },
    ],
  },
  {
    slug: "grapevine",
    city: "Grapevine",
    title: "Grapevine TX Roof Inspection and Residential Roofing Support",
    metaTitle: "Grapevine Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections, storm damage checks, and residential roofing support for homeowners in Grapevine, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Grapevine? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Grapevine roof inspection",
      "roofing contractor Grapevine TX",
      "hail damage roof Grapevine",
      "storm damage roofing Grapevine",
      "free roof inspection Grapevine",
    ],
    intro:
      "Grapevine homeowners often need to know whether a storm caused real roof damage or only surface wear. A local roof inspection helps answer that before a bigger problem develops.",
    body: [
      "Praise Worthy inspects Grapevine roofs for hail strikes, wind damage, flashing issues, drainage-related trouble spots, and visible leak-risk areas. That gives homeowners a clearer understanding of roof condition before they make a repair or replacement decision.",
      "Because Grapevine homes share the same North Texas weather patterns as nearby Southlake, Colleyville, and Euless, storm damage can spread across neighborhoods quickly and stay hidden at first.",
      "We keep the process simple and useful. Homeowners get clear findings, helpful documentation, and straightforward guidance without pressure.",
    ],
    serviceBullets: [
      "Free roof inspections in Grapevine",
      "Storm and hail damage roof assessments",
      "Residential roofing guidance after severe weather",
      "Documented findings homeowners can use for next steps",
    ],
    nearbyAreas: ["Southlake", "Colleyville", "Euless border", "Coppell border"],
    faq: [
      {
        question: "Do you inspect Grapevine roofs after hail or wind storms?",
        answer:
          "Yes. Hail and wind damage inspections are among the main reasons Grapevine homeowners contact us after severe weather.",
      },
      {
        question: "Can a Grapevine roof look fine and still have storm damage?",
        answer:
          "Yes. Many roofing issues are not easy to see from the ground, especially after hail or strong wind.",
      },
      {
        question: "Are roof inspections free in Grapevine?",
        answer:
          "Yes. The initial roof inspection is free for homeowners in Grapevine and nearby service areas.",
      },
    ],
  },
  {
    slug: "southlake",
    city: "Southlake",
    title: "Southlake TX Roof Inspection and High-End Residential Roofing",
    metaTitle: "Southlake Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage evaluations, and residential roofing support for homeowners in Southlake, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Southlake? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Southlake roof inspection",
      "roofing contractor Southlake TX",
      "hail damage roof Southlake",
      "storm damage roofing Southlake",
      "free roof inspection Southlake",
    ],
    intro:
      "Southlake homeowners often want a roofing company that can inspect carefully, communicate clearly, and respect the details that matter on higher-end homes. That starts with a strong inspection.",
    body: [
      "Praise Worthy inspects Southlake roofs for hail impact, wind damage, flashing issues, shingle wear, and visible drainage-related trouble spots. A clear inspection helps homeowners understand whether the roof needs repair planning, replacement, or simple monitoring.",
      "Southlake homes often feature larger rooflines and premium materials, which makes accurate storm-damage documentation even more important. Damage that appears minor at first can still affect roof performance and long-term protection.",
      "Our approach stays inspection first and homeowner focused. We document findings, explain them in plain language, and help Southlake homeowners move forward with confidence.",
    ],
    serviceBullets: [
      "Free roof inspections in Southlake",
      "Storm and hail damage roof evaluations",
      "Residential roofing guidance for higher-end homes",
      "Photo-backed inspection documentation",
    ],
    nearbyAreas: ["Westlake", "Keller border", "Grapevine border", "Colleyville"],
    faq: [
      {
        question: "Do you inspect larger custom roofs in Southlake?",
        answer:
          "Yes. We inspect a wide range of residential roof types and focus on documenting storm-related issues clearly, even on larger or more complex rooflines.",
      },
      {
        question: "Is a roof inspection worth it after minor hail in Southlake?",
        answer:
          "Yes. Even smaller hail events can create wear that reduces roof life or leads to future leaks if left unchecked.",
      },
      {
        question: "How soon can you schedule a Southlake inspection?",
        answer:
          "Inspection availability depends on current storm demand and weather. Send a request or call to confirm an onsite visit. The online calendar schedules a phone call.",
      },
    ],
  },
  {
    slug: "carrollton",
    city: "Carrollton",
    title: "Carrollton TX Roof Inspection for Storm and Hail Damage",
    metaTitle: "Carrollton Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage evaluations, and residential roofing support for homeowners in Carrollton, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Carrollton? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Carrollton roof inspection",
      "roofing contractor Carrollton TX",
      "hail damage roofing Carrollton",
      "storm damage roof Carrollton",
      "free roof inspection Carrollton",
    ],
    intro:
      "If you are looking for a Carrollton roofing company after hail or strong wind, the best first step is usually a detailed roof inspection that explains what is damaged and what is not.",
    body: [
      "Praise Worthy inspects Carrollton roofs for hail marks, missing shingles, lifted edges, flashing problems, drainage concerns, and early leak indicators. That gives homeowners a better understanding of roof condition before they commit to repairs or replacement.",
      "Carrollton homes can be affected by the same fast-moving North Texas storm systems that impact nearby suburbs. After those events, roof damage may stay hidden for weeks unless someone checks the roof closely.",
      "Our inspection process is designed to be simple and useful. We document findings, explain what we see in plain language, and help Carrollton homeowners move forward with confidence.",
    ],
    serviceBullets: [
      "Free roof inspections in Carrollton",
      "Storm and hail damage roof evaluations",
      "Residential roofing support for homeowners",
      "Clear documentation for next-step planning",
    ],
    nearbyAreas: ["North Carrollton", "Farmers Branch border", "Addison border", "Plano border"],
    faq: [
      {
        question: "Is a Carrollton roof inspection helpful after a mild storm?",
        answer:
          "Yes. Even moderate wind or hail can create early roofing issues that are easier to address when caught quickly.",
      },
      {
        question: "Do you work with homeowners before they decide on repairs?",
        answer:
          "Yes. We inspect first and explain the findings so you know what the roof needs before making a repair or replacement decision.",
      },
      {
        question: "Are Carrollton inspections free?",
        answer:
          "Yes. The initial roof inspection is free for homeowners in Carrollton and nearby service areas.",
      },
    ],
  },
  {
    slug: "colleyville",
    city: "Colleyville",
    title: "Colleyville TX Roof Inspection and Storm Damage Roofing Services",
    metaTitle: "Colleyville Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections, storm damage assessments, and residential roofing support for homeowners in Colleyville, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Colleyville? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Colleyville roof inspection",
      "roofing contractor Colleyville TX",
      "hail damage roof Colleyville",
      "storm damage roofing Colleyville",
      "free roof inspection Colleyville",
    ],
    intro:
      "Colleyville homeowners often need a roofing company that can explain storm damage clearly and help them decide what to do before a small issue turns into a more disruptive repair.",
    body: [
      "Praise Worthy inspects Colleyville roofs for hail marks, lifted shingles, flashing wear, drainage trouble spots, and early leak indicators. That kind of local inspection helps homeowners understand what the roof needs before they commit to the next step.",
      "Because Colleyville homes often experience the same North Texas hail and wind events as nearby Southlake, Bedford, and Euless, roof damage may be present even when the roof still looks mostly intact from below.",
      "We focus on straightforward inspection service. Homeowners get clear findings, useful photos, and honest guidance without pressure.",
    ],
    serviceBullets: [
      "Free roof inspections in Colleyville",
      "Hail and storm damage roof assessments",
      "Residential roofing guidance based on visible findings",
      "Inspection documentation that supports next-step planning",
    ],
    nearbyAreas: ["Southlake", "Bedford", "Euless", "Grapevine border"],
    faq: [
      {
        question: "Why inspect a Colleyville roof after a storm if there is no leak?",
        answer:
          "Many roofing problems start before water shows up inside. Early inspection helps identify storm damage before it becomes a more expensive interior issue.",
      },
      {
        question: "Do you inspect roofs for wind damage in Colleyville?",
        answer:
          "Yes. We inspect for wind-lifted shingles, exposed areas, and related storm damage after severe weather.",
      },
      {
        question: "Are inspections free for Colleyville homeowners?",
        answer:
          "Yes. The initial roof inspection is free for homeowners in Colleyville and nearby service areas.",
      },
    ],
  },
  {
    slug: "plano",
    city: "Plano",
    title: "Plano TX Roof Inspection and Roofing Services for Homeowners",
    metaTitle: "Plano Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections, hail damage checks, and residential roofing support for homeowners in Plano, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Plano? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Plano roof inspection",
      "roofing contractor Plano TX",
      "hail damage roof Plano",
      "storm damage roofing Plano",
      "free roof inspection Plano",
    ],
    intro:
      "Plano homeowners often want to know whether storm damage is serious enough to act on. A local roof inspection can answer that before a minor issue becomes a costly repair.",
    body: [
      "Praise Worthy inspects Plano roofs for hail impact, wind damage, shingle wear, flashing failure, and visible leak-risk areas. These checks help homeowners understand whether the roof needs immediate work or careful monitoring.",
      "Because Plano homes can see sudden hail and wind events during storm season, roof damage does not always show up as an obvious leak right away. Early inspections help catch those weaker areas before interior damage starts.",
      "We keep the process clear and practical. Homeowners receive understandable findings, supporting photos, and guidance on what to do next without pressure.",
    ],
    serviceBullets: [
      "Free roof inspections in Plano",
      "Hail and wind damage checks",
      "Residential roofing guidance for storm-related issues",
      "Helpful documentation for homeowners reviewing next steps",
    ],
    nearbyAreas: ["West Plano", "East Plano", "Richardson border", "Murphy border"],
    faq: [
      {
        question: "Why inspect a Plano roof before there is a leak?",
        answer:
          "Many roofing issues become visible inside the home only after damage has worsened. Early inspection gives you a chance to act sooner and protect the home.",
      },
      {
        question: "Do you inspect for hail damage in Plano?",
        answer:
          "Yes. Hail damage inspections are one of the most common roofing concerns we help Plano homeowners with.",
      },
      {
        question: "How do I schedule a Plano roof inspection?",
        answer:
          `Call ${BUSINESS_PHONE} or send a free inspection request on the site. We confirm onsite timing by phone; the online calendar schedules a phone call.`,
      },
    ],
  },
  {
    slug: "little-elm",
    city: "Little Elm",
    title: "Little Elm TX Roof Inspection and Storm Damage Roofing Services",
    metaTitle: "Little Elm Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy provides free roof inspections, storm damage evaluations, and residential roofing support for homeowners in Little Elm, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Little Elm? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Little Elm roof inspection",
      "roofing contractor Little Elm TX",
      "hail damage roof Little Elm",
      "storm damage roofing Little Elm",
      "free roof inspection Little Elm",
    ],
    intro:
      "Little Elm homeowners often want to know whether the last storm caused damage worth acting on. A local roof inspection helps answer that before the roof problem becomes more expensive.",
    body: [
      "Praise Worthy inspects Little Elm roofs for hail impact, wind damage, flashing wear, lifted shingles, and early leak-risk areas. These checks help homeowners understand whether the roof needs immediate work or continued monitoring.",
      "Because Little Elm homes often experience the same weather systems as Frisco and nearby North Texas suburbs, roof damage may be present even when there is no obvious interior leak yet.",
      "We focus on practical inspection-first service. Homeowners get a clearer understanding of the roof condition, photo-backed findings, and guidance on what to do next.",
    ],
    serviceBullets: [
      "Free roof inspections in Little Elm",
      "Storm and hail damage roof checks",
      "Residential roofing guidance after severe weather",
      "Helpful documentation for clear next-step decisions",
    ],
    nearbyAreas: ["Frisco border", "The Colony border", "Oak Point border", "Prosper border"],
    faq: [
      {
        question: "Why inspect a Little Elm roof even without a leak?",
        answer:
          "Storm damage often appears before interior symptoms do. Early inspection gives homeowners a chance to address weak points sooner.",
      },
      {
        question: "Do you inspect roofs after wind-driven storms in Little Elm?",
        answer:
          "Yes. Wind damage inspections are a common reason Little Elm homeowners contact us after severe weather.",
      },
      {
        question: "How soon can I schedule a roof inspection in Little Elm?",
        answer:
          "Inspection availability depends on current weather and storm demand. Send a request or call to confirm an onsite visit. The online calendar schedules a phone call.",
      },
    ],
  },
  {
    slug: "richardson",
    city: "Richardson",
    title: "Richardson TX Roof Inspection and Residential Roofing Support",
    metaTitle: "Richardson Roof Inspection & Storm Help | Praise Worthy",
    description:
      "Praise Worthy offers free roof inspections, storm damage assessments, and residential roofing support for homeowners in Richardson, Texas.",
    metaDescription:
      "Concerned about hail or wind damage in Richardson? Get a free Praise Worthy roof inspection with clear photos and honest next-step guidance for homeowners.",
    keywords: [
      "Richardson roof inspection",
      "roofing contractor Richardson TX",
      "hail damage roof Richardson",
      "storm damage roofing Richardson",
      "free roof inspection Richardson",
    ],
    intro:
      "Richardson homeowners often need clear guidance after major weather, especially when roof damage is not obvious from the ground. A local inspection helps remove that uncertainty.",
    body: [
      "Praise Worthy inspects Richardson roofs for hail strikes, wind-lifted materials, flashing wear, drainage problems, and visible leak-risk areas. That helps homeowners understand whether the roof needs monitoring, repairs, or replacement planning.",
      "Because Richardson homes can be hit by the same fast-moving North Texas storm systems as Plano and Carrollton, roof damage may stay hidden until it becomes a leak or interior repair issue.",
      "Our process stays straightforward. We document what we find, explain it in clear language, and help Richardson homeowners make a confident next-step decision.",
    ],
    serviceBullets: [
      "Free roof inspections in Richardson",
      "Hail and storm damage roof assessments",
      "Residential roofing guidance for homeowners after severe weather",
      "Photo-backed findings that support next-step planning",
    ],
    nearbyAreas: ["Plano border", "Garland border", "Dallas border", "North Richardson"],
    faq: [
      {
        question: "Do you inspect roofs in Richardson after hail storms?",
        answer:
          "Yes. Hail damage inspections are one of the most common reasons Richardson homeowners request an inspection after severe weather.",
      },
      {
        question: "Can a Richardson roof have damage without visible missing shingles?",
        answer:
          "Yes. Functional damage from hail or wind may not be obvious from the ground, which is why an inspection can be valuable even when the roof appears intact.",
      },
      {
        question: "Are Richardson roof inspections free?",
        answer:
          "Yes. The initial roof inspection is free for homeowners in Richardson and nearby service areas.",
      },
    ],
  },
];

export const cityPagesBySlug = Object.fromEntries(
  cityPages.map((page) => [page.slug, page]),
) as Record<string, CityPage>;

function matchesAreaToCity(area: string, city: string) {
  const normalizedArea = area.toLowerCase();
  const normalizedCity = city.toLowerCase();

  return (
    normalizedArea.includes(normalizedCity) ||
    normalizedCity.includes(normalizedArea)
  );
}

export function getCityPageUrl(slug: string) {
  return absoluteUrl(`/${slug}`);
}

export function getCityPagePath(slug: string) {
  return normalizeUrlPath(`/${slug}`);
}

export const cityPagePathsByCity = Object.fromEntries(
  cityPages.map((page) => [page.city, getCityPagePath(page.slug)]),
) as Record<string, string>;

export function getRelatedCityPages(page: CityPage, limit = 4) {
  const relatedFromNearby = page.nearbyAreas
    .map((area) =>
      cityPages.find(
        (candidate) =>
          candidate.slug !== page.slug && matchesAreaToCity(area, candidate.city),
      ),
    )
    .filter((candidate): candidate is CityPage => Boolean(candidate));

  const uniqueRelated = Array.from(
    new Map(relatedFromNearby.map((candidate) => [candidate.slug, candidate])).values(),
  );

  if (uniqueRelated.length >= limit) {
    return uniqueRelated.slice(0, limit);
  }

  const fallbackPages = cityPages.filter(
    (candidate) =>
      candidate.slug !== page.slug &&
      !uniqueRelated.some((related) => related.slug === candidate.slug),
  );

  return [...uniqueRelated, ...fallbackPages].slice(0, limit);
}

export function getCityPageMetadata(page: CityPage): Metadata {
  const url = getCityPageUrl(page.slug);

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
