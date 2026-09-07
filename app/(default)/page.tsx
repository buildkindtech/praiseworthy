import type { Metadata } from "next";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import HomePage from "@/components/page/HomePage";
import { localeMeta } from "@/lib/seo-i18n";
import { getLanguageAlternates, getRootUrl } from "@/lib/seo-routes";
import { getAuthorMetadata, getDefaultRobots, getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...getAuthorMetadata(),
  title: localeMeta.en.title,
  description: localeMeta.en.description,
  keywords: localeMeta.en.keywords,
  other: {
    "content-language": localeMeta.en.languageTag,
  },
  alternates: {
    canonical: getRootUrl(),
    languages: getLanguageAlternates(),
  },
  robots: getDefaultRobots(),
  ...getSocialMetadata({
    title: localeMeta.en.title,
    description: localeMeta.en.description,
    url: getRootUrl(),
    siteName: localeMeta.en.siteName,
    imageAlt: localeMeta.en.ogAlt,
  }),
  category: "home services",
};

export default function RootPage() {
  return (
    <LanguageProvider initialLocale="en">
      <HomePage locale="en" pageUrl={getRootUrl()} />
    </LanguageProvider>
  );
}
