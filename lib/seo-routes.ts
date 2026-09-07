import type { Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";

export function getRootUrl() {
  return absoluteUrl("/");
}

export function getLocaleUrl(locale: Locale) {
  return locale === "en" ? getRootUrl() : absoluteUrl(`/${locale}`);
}

export function getLanguageAlternates() {
  return {
    en: getRootUrl(),
    es: getLocaleUrl("es"),
    zh: getLocaleUrl("zh"),
    ko: getLocaleUrl("ko"),
    "x-default": getRootUrl(),
  } as const;
}
