import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import GuidePage from "@/components/page/GuidePage";
import { getGuide, getGuideMetadata, guideSlugs } from "@/lib/guides";
import { locales, type Locale } from "@/lib/i18n";

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .flatMap((locale) => guideSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const guide = getGuide(locale, slug);

  if (!guide) {
    return {};
  }

  return getGuideMetadata(guide, locale);
}

export default async function LocalizedGuidePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  if (locale === "en") {
    redirect(`/guides/${slug}/`);
  }

  const guide = getGuide(locale, slug);

  if (!guide) {
    notFound();
  }

  return <GuidePage guide={guide} locale={locale} />;
}
