import type { MetadataRoute } from "next";
import { cityPages } from "@/lib/city-pages";
import { cityServicePages } from "@/lib/city-service-pages";
import { hasGuideLocaleCopy } from "@/lib/guides-content";
import { guideSlugs, getGuidePath, getGuidesHubPath } from "@/lib/guides";
import { locales, type Locale } from "@/lib/i18n";
import { PRIVACY_POLICY_PATH, TERMS_PATH, absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function getGuideAlternates(slug: string) {
  return Object.fromEntries(
    locales
      .filter((locale) => locale === "en" || hasGuideLocaleCopy(locale, slug))
      .map((locale) => [locale, absoluteUrl(getGuidePath(slug, locale))]),
  ) as Partial<Record<Locale, string>>;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl(getGuidesHubPath("en")),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    { url: absoluteUrl("/es/"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl(getGuidesHubPath("es")),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: absoluteUrl("/zh/"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl(getGuidesHubPath("zh")),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    { url: absoluteUrl("/ko/"), changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl(getGuidesHubPath("ko")),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...cityPages.map((page) => ({
      url: absoluteUrl(`/${page.slug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...cityServicePages.map((page) => ({
      url: absoluteUrl(`/${page.citySlug}/${page.serviceSlug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...guideSlugs.flatMap((slug) =>
      locales
        .filter((locale) => locale === "en" || hasGuideLocaleCopy(locale, slug))
        .map((locale) => ({
        url: absoluteUrl(getGuidePath(slug, locale)),
        changeFrequency: "weekly" as const,
        priority: 0.7,
        alternates: {
          languages: getGuideAlternates(slug),
        },
      })),
    ),
    { url: absoluteUrl(PRIVACY_POLICY_PATH), changeFrequency: "monthly", priority: 0.2 },
    { url: absoluteUrl(TERMS_PATH), changeFrequency: "monthly", priority: 0.2 },
  ];

  return pages.map((entry) => ({
    ...entry,
    lastModified: new Date(),
  }));
}
