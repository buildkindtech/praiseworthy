import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobilePhoneButton from "@/components/layout/MobilePhoneButton";
import ChatWidget from "@/components/layout/ChatWidget";
import Hero from "@/components/sections/Hero";
import StormAwareness from "@/components/sections/StormAwareness";
import FreeInspection from "@/components/sections/FreeInspection";
import InsuranceGuide from "@/components/sections/InsuranceGuide";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import KoreanRadioFeature from "@/components/sections/KoreanRadioFeature";
import BeforeAfter from "@/components/sections/BeforeAfter";
import Testimonials from "@/components/sections/Testimonials";
import ServiceArea from "@/components/sections/ServiceArea";
import SearchContent from "@/components/sections/SearchContent";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import { type Locale } from "@/lib/i18n";
import { localeMeta } from "@/lib/seo-i18n";
import {
  BUSINESS_NAME,
  SERVICE_AREAS,
  SITE_URL,
  SITE_PUBLISHED_AT,
  SITE_UPDATED_AT,
  createBreadcrumbSchema,
  createWebsiteSchema,
  createWebPageSchema,
} from "@/lib/seo";

export default function HomePage({
  locale,
  pageUrl,
}: {
  locale: Locale;
  pageUrl: string;
}) {
  const meta = localeMeta[locale];
  const breadcrumbSchema = createBreadcrumbSchema([
    {
      name: locale === "en" ? "Home" : meta.pageName,
      item: pageUrl,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            createWebsiteSchema(),
            {
              ...createWebPageSchema({
                id: `${pageUrl}#webpage`,
                inLanguage: meta.languageTag,
                url: pageUrl,
                name: meta.pageName,
                description: meta.description,
                datePublished: SITE_PUBLISHED_AT,
                dateModified: SITE_UPDATED_AT,
                speakable: {
                  cssSelector: ["main h1", "#services h2", "#faq h2"],
                },
              }),
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${pageUrl}#service`,
              name: `${BUSINESS_NAME} free roof inspection and storm damage roofing services`,
              serviceType: meta.serviceTypes,
              url: pageUrl,
              areaServed: SERVICE_AREAS.map((area) => ({
                "@type": "City",
                name: area,
              })),
              provider: {
                "@id": `${SITE_URL}#roofingcontractor`,
              },
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: pageUrl,
              },
              offers: {
                "@type": "Offer",
                name: `${BUSINESS_NAME} free roof inspection`,
                price: "0",
                priceCurrency: "USD",
                url: pageUrl,
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: meta.itemListName,
                itemListElement: meta.serviceTypes.map((serviceType) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: serviceType,
                  },
                })),
              },
            },
            breadcrumbSchema,
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${pageUrl}#serviceareas`,
              inLanguage: meta.languageTag,
              name: meta.itemListName,
              itemListElement: SERVICE_AREAS.map((area, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: area,
              })),
            },
          ]),
        }}
      />
      <Header />
    <main className="landing-page">
        <Hero />
        <StormAwareness />
        <FreeInspection />
        <WhyChooseUs />
        {locale === "ko" ? <KoreanRadioFeature /> : null}
        <BeforeAfter />
        <InsuranceGuide />
        <Testimonials />
        <ServiceArea />
        <SearchContent locale={locale} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobilePhoneButton />
      <ChatWidget />
    </>
  );
}
