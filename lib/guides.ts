import type { Metadata } from "next";
import { cityPagesBySlug, getCityPagePath } from "@/lib/city-pages";
import { getGuideLocaleCopy, hasGuideLocaleCopy } from "@/lib/guides-content";
import { locales, type Locale } from "@/lib/i18n";
import {
  BUSINESS_AUTHOR_NAME,
  BUSINESS_NAME,
  SITE_PUBLISHED_AT,
  SITE_URL,
  SITE_UPDATED_AT,
  absoluteUrl,
  getAuthorMetadata,
  getDefaultRobots,
  getSocialMetadata,
} from "@/lib/seo";
import { localeMeta } from "@/lib/seo-i18n";

export type GuideSection = {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideFaq = {
  question: string;
  answer: string;
};

export type GuideArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  summary: string;
  eyebrow: string;
  keywords: string[];
  keyPoints: string[];
  sections: GuideSection[];
  relatedCitySlugs: string[];
  relatedGuideSlugs: string[];
  faq: GuideFaq[];
  publishedAt: string;
  updatedAt: string;
};

type GuidesHubCopy = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  keywords: string[];
};

const guideShared = {
  "hail-damage-roof-inspection-dfw": {
    relatedCitySlugs: ["north-richland-hills", "fort-worth", "keller"],
    relatedGuideSlugs: [
      "roof-repair-near-me-north-richland-hills",
      "roof-storm-damage-insurance-texas",
      "signs-of-wind-damage-on-your-roof",
    ],
  },
  "roof-repair-near-me-north-richland-hills": {
    relatedCitySlugs: ["north-richland-hills", "richland-hills", "keller"],
    relatedGuideSlugs: [
      "hail-damage-roof-inspection-dfw",
      "roof-storm-damage-insurance-texas",
      "signs-of-wind-damage-on-your-roof",
    ],
  },
  "roof-storm-damage-insurance-texas": {
    relatedCitySlugs: ["north-richland-hills", "bedford", "arlington"],
    relatedGuideSlugs: [
      "hail-damage-roof-inspection-dfw",
      "roof-repair-near-me-north-richland-hills",
      "signs-of-wind-damage-on-your-roof",
    ],
  },
  "signs-of-wind-damage-on-your-roof": {
    relatedCitySlugs: ["hurst", "euless", "southlake"],
    relatedGuideSlugs: [
      "hail-damage-roof-inspection-dfw",
      "roof-repair-near-me-north-richland-hills",
      "roof-storm-damage-insurance-texas",
    ],
  },
  "what-roof-adjusters-look-for-during-an-insurance-inspection": {
    relatedCitySlugs: ["north-richland-hills", "fort-worth", "arlington"],
    relatedGuideSlugs: [
      "roof-storm-damage-insurance-texas",
      "hail-damage-roof-inspection-dfw",
      "signs-of-wind-damage-on-your-roof",
    ],
  },
  "how-long-does-a-roof-inspection-take-in-dfw": {
    relatedCitySlugs: ["north-richland-hills", "fort-worth", "bedford"],
    relatedGuideSlugs: [
      "hail-damage-roof-inspection-dfw",
      "how-a-free-roof-inspection-works",
      "what-roof-adjusters-look-for-during-an-insurance-inspection",
    ],
  },
  "how-a-free-roof-inspection-works": {
    relatedCitySlugs: ["north-richland-hills", "fort-worth", "plano"],
    relatedGuideSlugs: [
      "how-long-does-a-roof-inspection-take-in-dfw",
      "hail-damage-roof-inspection-dfw",
      "when-to-repair-vs-replace-asphalt-shingles-texas",
    ],
  },
  "when-to-repair-vs-replace-asphalt-shingles-texas": {
    relatedCitySlugs: ["frisco", "carrollton", "arlington"],
    relatedGuideSlugs: [
      "how-a-free-roof-inspection-works",
      "roof-repair-near-me-north-richland-hills",
      "what-to-do-after-storm-damage-to-your-roof-in-dfw",
    ],
  },
  "what-to-do-after-storm-damage-to-your-roof-in-dfw": {
    relatedCitySlugs: ["fort-worth", "plano", "north-richland-hills"],
    relatedGuideSlugs: [
      "signs-of-wind-damage-on-your-roof",
      "roof-storm-damage-insurance-texas",
      "how-a-free-roof-inspection-works",
    ],
  },
} as const;

export const guideSlugs = Object.keys(guideShared);

const guidesHubCopy: Record<Locale, GuidesHubCopy> = {
  en: {
    title: "Roofing Guides and Storm Help for DFW Homeowners",
    metaTitle: "DFW Roofing Guides | Hail, Storm Damage, and Insurance Help",
    metaDescription:
      "Browse practical roofing guides from Praise Worthy covering hail damage, storm inspections, insurance questions, and next steps for DFW homeowners.",
    intro:
      "Explore practical guides for DFW homeowners who need clearer answers about hail damage, storm inspections, insurance questions, and what to do next after severe weather.",
    keywords: [
      "DFW roofing guides",
      "hail damage roof guide",
      "storm damage roofing help Texas",
      "roof insurance guide Texas",
    ],
  },
  es: {
    title: "Guias de techos y ayuda por tormentas para propietarios en DFW",
    metaTitle:
      "Guias de techos en DFW | Granizo, tormentas y ayuda con seguro",
    metaDescription:
      "Consulta guias practicas de Praise Worthy sobre danos por granizo, inspecciones despues de tormentas, dudas de seguro y siguientes pasos para propietarios en DFW.",
    intro:
      "Explora guias practicas para propietarios en DFW que necesitan respuestas mas claras sobre granizo, tormentas, inspecciones de techo, seguro y los siguientes pasos.",
    keywords: [
      "guias de techos DFW",
      "guia de dano por granizo techo",
      "ayuda techo tormenta Texas",
      "guia seguro techo Texas",
    ],
  },
  zh: {
    title: "DFW 屋顶指南与风暴损坏帮助",
    metaTitle: "DFW 屋顶指南 | 冰雹、风暴损坏与保险说明",
    metaDescription:
      "查看 Praise Worthy 为 DFW 业主准备的实用屋顶指南，涵盖冰雹损坏、风暴检查、保险问题与后续处理建议。",
    intro:
      "这里整理了适合 DFW 业主阅读的实用指南，帮助你更清楚了解冰雹损坏、风暴后屋顶检查、保险流程以及下一步怎么做。",
    keywords: [
      "DFW 屋顶指南",
      "冰雹损坏 屋顶 指南",
      "德州 风暴 屋顶 帮助",
      "德州 屋顶 保险 指南",
    ],
  },
  ko: {
    title: "DFW 주택 소유주를 위한 지붕 가이드",
    metaTitle: "DFW 지붕 가이드 | 우박, 폭풍 피해, 보험 안내",
    metaDescription:
      "Praise Worthy의 실용적인 지붕 가이드를 통해 우박 피해, 폭풍 후 점검, 보험 관련 질문, 다음 단계 대응법을 확인하세요.",
    intro:
      "DFW 주택 소유주가 우박 피해, 폭풍 후 지붕 점검, 보험 절차, 다음 단계 대응을 더 쉽게 이해할 수 있도록 실용적인 가이드를 모았습니다.",
    keywords: [
      "DFW 지붕 가이드",
      "우박 피해 지붕 가이드",
      "텍사스 폭풍 지붕 도움말",
      "텍사스 지붕 보험 가이드",
    ],
  },
};

export function getGuidePath(slug: string, locale: Locale = "en") {
  return locale === "en" ? `/guides/${slug}/` : `/${locale}/guides/${slug}/`;
}

export function getGuideUrl(slug: string, locale: Locale = "en") {
  return absoluteUrl(getGuidePath(slug, locale));
}

export function getGuidesHubPath(locale: Locale = "en") {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}

export function getGuidesHubUrl(locale: Locale = "en") {
  return absoluteUrl(getGuidesHubPath(locale));
}

export function getGuide(locale: Locale, slug: string): GuideArticle | null {
  const shared = guideShared[slug as keyof typeof guideShared];
  const localized = getGuideLocaleCopy(locale, slug);

  if (!shared || !localized) {
    return null;
  }

  return {
    slug,
    title: localized.title,
    metaTitle: localized.metaTitle,
    metaDescription: localized.metaDescription,
    intro: localized.intro,
    summary: localized.summary,
    eyebrow: localized.eyebrow,
    keywords: [...localized.keywords],
    keyPoints: [...localized.keyPoints],
    sections: localized.sections.map((section) => ({
      ...section,
      paragraphs: [...section.paragraphs],
      bullets:
        "bullets" in section && section.bullets ? [...section.bullets] : undefined,
    })),
    faq: localized.faq.map((item) => ({ ...item })),
    relatedCitySlugs: [...shared.relatedCitySlugs],
    relatedGuideSlugs: [...shared.relatedGuideSlugs],
    publishedAt: SITE_PUBLISHED_AT,
    updatedAt: SITE_UPDATED_AT,
  };
}

export function getGuideCards(locale: Locale) {
  return guideSlugs
    .map((slug) => getGuide(locale, slug))
    .filter((guide): guide is GuideArticle => Boolean(guide));
}

export function getGuidesHubCopy(locale: Locale) {
  return guidesHubCopy[locale];
}

export function getGuidesHubMetadata(locale: Locale): Metadata {
  const hub = getGuidesHubCopy(locale);
  const url = getGuidesHubUrl(locale);

  return {
    ...getAuthorMetadata(),
    title: hub.metaTitle,
    description: hub.metaDescription,
    keywords: hub.keywords,
    other: {
      "content-language": localeMeta[locale].languageTag,
    },
    alternates: {
      canonical: url,
      languages: {
        en: getGuidesHubUrl("en"),
        es: getGuidesHubUrl("es"),
        zh: getGuidesHubUrl("zh"),
        ko: getGuidesHubUrl("ko"),
        "x-default": getGuidesHubUrl("en"),
      },
    },
    ...getSocialMetadata({
      title: hub.metaTitle,
      description: hub.metaDescription,
      url,
      siteName: BUSINESS_NAME,
      imageAlt: hub.title,
    }),
    robots: getDefaultRobots(),
  };
}

export function getGuideMetadata(guide: GuideArticle, locale: Locale): Metadata {
  const url = getGuideUrl(guide.slug, locale);

  return {
    ...getAuthorMetadata(),
    title: guide.metaTitle,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          locales
            .filter((item) => item === "en" || hasGuideLocaleCopy(item, guide.slug))
            .map((item) => [item, getGuideUrl(guide.slug, item)]),
        ),
        "x-default": getGuideUrl(guide.slug, "en"),
      },
    },
    ...getSocialMetadata({
      title: guide.metaTitle,
      description: guide.metaDescription,
      url,
      siteName: BUSINESS_NAME,
      type: "article",
      imageAlt: guide.title,
    }),
    authors: [{ name: BUSINESS_AUTHOR_NAME, url: SITE_URL }],
    other: {
      "content-language": localeMeta[locale].languageTag,
      "article:published_time": guide.publishedAt,
      "article:modified_time": guide.updatedAt,
      "article:author": BUSINESS_AUTHOR_NAME,
    },
    robots: getDefaultRobots(),
  };
}

export function getGuideRelatedCities(guide: GuideArticle) {
  return guide.relatedCitySlugs
    .map((slug) => cityPagesBySlug[slug])
    .filter(Boolean)
    .map((page) => ({
      slug: page.slug,
      city: page.city,
      href: getCityPagePath(page.slug),
      description: page.metaDescription,
    }));
}

export function getRelatedGuides(locale: Locale, guide: GuideArticle) {
  return guide.relatedGuideSlugs
    .map((slug) => getGuide(locale, slug))
    .filter((item): item is GuideArticle => Boolean(item));
}
