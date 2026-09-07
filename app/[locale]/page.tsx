import { notFound, redirect } from "next/navigation";
import HomePage from "@/components/page/HomePage";
import { locales, type Locale } from "@/lib/i18n";
import { getLocaleUrl } from "@/lib/seo-routes";

type PageProps = {
  params: Promise<{ locale: string }>;
};

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  if (locale === "en") {
    redirect("/");
  }

  return <HomePage locale={locale} pageUrl={getLocaleUrl(locale)} />;
}
