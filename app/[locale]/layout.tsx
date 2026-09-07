import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "@/app/globals.css";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { locales, type Locale } from "@/lib/i18n";
import { localeMeta } from "@/lib/seo-i18n";
import { getLanguageAlternates, getLocaleUrl } from "@/lib/seo-routes";
import {
  createRoofingContractorSchema,
  getAuthorMetadata,
  getDefaultRobots,
  getMetadataBase,
  getSocialMetadata,
} from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

function localePath(locale: Locale) {
  return getLocaleUrl(locale);
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const meta = localeMeta[locale];
  const canonical = localePath(locale);

  return {
    ...getAuthorMetadata(),
    metadataBase: getMetadataBase(),
    referrer: "strict-origin-when-cross-origin",
    icons: {
      icon: [{ url: "/icon.png", type: "image/png" }],
      shortcut: [{ url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    other: {
      "content-language": meta.languageTag,
    },
    alternates: {
      canonical,
      languages: getLanguageAlternates(),
    },
    robots: getDefaultRobots(),
    ...getSocialMetadata({
      title: meta.title,
      description: meta.description,
      url: canonical,
      siteName: meta.siteName,
      imageAlt: meta.ogAlt,
    }),
    category: "home services",
  };
}

export function generateStaticParams() {
  return locales
    .filter((locale) => locale !== "en")
    .map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const meta = localeMeta[locale];
  return (
    <html
      lang={meta.languageTag}
      className={`${manrope.variable} ${fraunces.variable} scroll-smooth`}
    >
      <body id="top" className="font-sans antialiased">
        <LanguageProvider initialLocale={locale}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(createRoofingContractorSchema()),
            }}
          />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
