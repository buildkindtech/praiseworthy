import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { localeMeta } from "@/lib/seo-i18n";
import {
  BUSINESS_ALT_NAME,
  BUSINESS_AUTHOR_NAME,
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_OPENING_HOURS,
  BUSINESS_PHONE_E164,
  GOOGLE_MAPS_URL,
  SERVICE_AREAS,
  SITE_PUBLISHED_AT,
  SITE_UPDATED_AT,
  SITE_URL,
  getMetadataBase,
  getSameAsLinks,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={localeMeta.en.languageTag} className="scroll-smooth">
      <body className="font-sans antialiased">
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a34480981870ee2fd694134"
          data-source="WEB_USER"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": `${SITE_URL}#organization`,
                name: BUSINESS_NAME,
                alternateName: BUSINESS_ALT_NAME,
                url: SITE_URL,
                logo: `${SITE_URL}/brand-logo.svg`,
                image: `${SITE_URL}/images/social/social-card.svg`,
                email: BUSINESS_EMAIL,
                telephone: BUSINESS_PHONE_E164,
                sameAs: getSameAsLinks(),
                foundingDate: SITE_PUBLISHED_AT,
              },
              {
                "@context": "https://schema.org",
                "@type": "RoofingContractor",
                "@id": `${SITE_URL}#roofingcontractor`,
                inLanguage: localeMeta.en.languageTag,
                name: BUSINESS_NAME,
                alternateName: BUSINESS_ALT_NAME,
                description: localeMeta.en.businessDescription,
                url: SITE_URL,
                telephone: BUSINESS_PHONE_E164,
                email: BUSINESS_EMAIL,
                logo: `${SITE_URL}/brand-logo.svg`,
                image: `${SITE_URL}/images/social/social-card.svg`,
                sameAs: getSameAsLinks(),
                hasMap: GOOGLE_MAPS_URL,
                founder: {
                  "@type": "Organization",
                  name: BUSINESS_AUTHOR_NAME,
                  url: SITE_URL,
                },
                areaServed: SERVICE_AREAS.map((area) => ({
                  "@type": "City",
                  name: area,
                })),
                openingHoursSpecification: BUSINESS_OPENING_HOURS,
                dateModified: SITE_UPDATED_AT,
              },
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
