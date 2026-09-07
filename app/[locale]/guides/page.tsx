import { notFound, redirect } from "next/navigation";
import GuidesHubPage from "@/components/page/GuidesHubPage";
import {
  getGuideCards,
  getGuidesHubCopy,
  getGuidesHubMetadata,
} from "@/lib/guides";
import { locales, type Locale } from "@/lib/i18n";

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return getGuidesHubMetadata(locale);
}

export default async function LocalizedGuidesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  if (locale === "en") {
    redirect("/guides/");
  }

  const copy = getGuidesHubCopy(locale);

  return (
    <GuidesHubPage
      guides={getGuideCards(locale)}
      locale={locale}
      title={copy.title}
      intro={copy.intro}
    />
  );
}
