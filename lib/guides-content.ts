import { type Locale } from "@/lib/i18n";
import { guidesEn } from "@/lib/guides-en";
import { guidesEs } from "@/lib/guides-es";
import { guidesKo } from "@/lib/guides-ko";
import { guidesZh } from "@/lib/guides-zh";

const guideLocaleMap = {
  en: guidesEn,
  es: guidesEs,
  zh: guidesZh,
  ko: guidesKo,
} as const;

export function getGuideLocaleCopy(locale: Locale, slug: string) {
  return guideLocaleMap[locale]?.[slug as keyof (typeof guideLocaleMap)[typeof locale]] ?? null;
}

export function hasGuideLocaleCopy(locale: Locale, slug: string) {
  return Boolean(getGuideLocaleCopy(locale, slug));
}

export function getGuideSlugsForLocale(locale: Locale) {
  return Object.keys(guideLocaleMap[locale]);
}
