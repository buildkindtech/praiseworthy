import type { MetadataRoute } from "next";
import { cityPages } from "@/lib/city-pages";
import { guideSlugs, getGuidePath, getGuidesHubPath } from "@/lib/guides";
import { locales, type Locale } from "@/lib/i18n";
import { SITE_UPDATED_AT, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function getGuideAlternates(slug: string) {
  const alternates = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(getGuidePath(slug, locale))]),
  ) as Record<Locale, string>;

  return { ...alternates, "x-default": alternates.en };
}

function getHomeAlternates() {
  return {
    en: absoluteUrl("/"),
    es: absoluteUrl("/es/"),
    zh: absoluteUrl("/zh/"),
    ko: absoluteUrl("/ko/"),
    "x-default": absoluteUrl("/"),
  };
}

function getGuidesHubAlternates() {
  const alternates = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(getGuidesHubPath(locale))]),
  ) as Record<Locale, string>;

  return { ...alternates, "x-default": alternates.en };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: getHomeAlternates() },
    },
    {
      url: absoluteUrl(getGuidesHubPath("en")),
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: { languages: getGuidesHubAlternates() },
    },
    {
      url: absoluteUrl("/es/"),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: getHomeAlternates() },
    },
    {
      url: absoluteUrl(getGuidesHubPath("es")),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: getGuidesHubAlternates() },
    },
    {
      url: absoluteUrl("/zh/"),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: getHomeAlternates() },
    },
    {
      url: absoluteUrl(getGuidesHubPath("zh")),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: getGuidesHubAlternates() },
    },
    {
      url: absoluteUrl("/ko/"),
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: getHomeAlternates() },
    },
    {
      url: absoluteUrl(getGuidesHubPath("ko")),
      changeFrequency: "weekly",
      priority: 0.7,
      alternates: { languages: getGuidesHubAlternates() },
    },
    ...cityPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...guideSlugs.flatMap((slug) =>
      locales.map((locale) => ({
        url: absoluteUrl(getGuidePath(slug, locale)),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: getGuideAlternates(slug),
        },
      })),
    ),
  ];

  return pages.map((entry) => ({
    ...entry,
    lastModified: new Date(SITE_UPDATED_AT),
  }));
}
