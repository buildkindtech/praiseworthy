import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { locales, type Locale } from "@/lib/i18n";
import { localeMeta } from "@/lib/seo-i18n";
import { getLanguageAlternates, getLocaleUrl } from "@/lib/seo-routes";
import {
  BUSINESS_ALT_NAME,
  BUSINESS_AUTHOR_NAME,
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE_E164,
  GOOGLE_MAPS_URL,
  SERVICE_AREAS,
  SITE_URL,
  SITE_PUBLISHED_AT,
  SITE_UPDATED_AT,
  getAuthorMetadata,
  getDefaultRobots,
  getMetadataBase,
  getSameAsLinks,
  getSocialMetadata,
} from "@/lib/seo";

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
  const canonical = getLocaleUrl(locale);

  return (
    <html lang={meta.languageTag} className="scroll-smooth">
      <body className="font-sans antialiased">
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a34480981870ee2fd694134"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
        <LanguageProvider initialLocale={locale}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "RoofingContractor",
                "@id": `${SITE_URL}#roofingcontractor`,
                inLanguage: meta.languageTag,
                name: BUSINESS_NAME,
                alternateName: BUSINESS_ALT_NAME,
                description: meta.businessDescription,
                url: canonical,
                telephone: BUSINESS_PHONE_E164,
                email: BUSINESS_EMAIL,
                logo: `${SITE_URL}/brand-logo.svg`,
                image: `${SITE_URL}/images/social/social-card.svg`,
                sameAs: getSameAsLinks(),
                hasMap: GOOGLE_MAPS_URL,
                foundingDate: SITE_PUBLISHED_AT,
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: 32.8602635,
                  longitude: -97.225217,
                },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "North Richland Hills",
                  addressRegion: "TX",
                  addressCountry: "US",
                },
                areaServed: SERVICE_AREAS.map((area) => ({
                  "@type": "City",
                  name: area,
                })),
                openingHoursSpecification: [
                  {
                    "@type": "OpeningHoursSpecification",
                    dayOfWeek: [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ],
                    opens: "08:00",
                    closes: "18:00",
                  },
                ],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: BUSINESS_PHONE_E164,
                    contactType: "customer service",
                    email: BUSINESS_EMAIL,
                    areaServed: "US-TX",
                    availableLanguage: ["English", "Spanish", "Chinese", "Korean"],
                  },
                ],
                serviceType: meta.serviceTypes,
                priceRange: "Free Inspection",
                knowsAbout: meta.knowsAbout,
                founder: {
                  "@type": "Organization",
                  name: BUSINESS_AUTHOR_NAME,
                  url: SITE_URL,
                },
                dateModified: SITE_UPDATED_AT,
              }),
            }}
          />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
