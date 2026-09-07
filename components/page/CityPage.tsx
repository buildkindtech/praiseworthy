"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobilePhoneButton from "@/components/layout/MobilePhoneButton";
import { LinkButton } from "@/components/ui/link-button";
import type { CityPage as CityPageType } from "@/lib/city-pages";
import { getCityPagePath, getCityPageUrl, getRelatedCityPages } from "@/lib/city-pages";
import {
  getCityServicePagesForCity,
  getCityServicePath,
} from "@/lib/city-service-pages";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_E164,
  GOOGLE_MAPS_URL,
  SITE_URL,
  createBreadcrumbSchema,
  createFaqSchema,
  withBasePath,
} from "@/lib/seo";
import { Calendar, CheckCircle, ChevronRight, MapPin, Phone } from "lucide-react";

const PHONE_HREF = `tel:${BUSINESS_PHONE_E164}`;
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

function matchesAreaLink(area: string, city: string) {
  const normalizedArea = area.toLowerCase();
  const normalizedCity = city.toLowerCase();

  return (
    normalizedArea.includes(normalizedCity) ||
    normalizedCity.includes(normalizedArea)
  );
}

export default function CityPage({ page }: { page: CityPageType }) {
  const relatedCities = getRelatedCityPages(page);
  const servicePages = getCityServicePagesForCity(page.slug);
  const pageUrl = getCityPageUrl(page.slug);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: `${SITE_URL}/` },
    { name: `${page.city} Roofing`, item: pageUrl },
  ]);
  const faqSchema = createFaqSchema(page.faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${pageUrl}#service`,
              name: `${BUSINESS_NAME} roofing services in ${page.city}, TX`,
              description: page.description,
              areaServed: {
                "@type": "City",
                name: page.city,
              },
              provider: {
                "@type": "RoofingContractor",
                "@id": `${SITE_URL}#roofingcontractor`,
                name: BUSINESS_NAME,
                telephone: BUSINESS_PHONE_E164,
                email: BUSINESS_EMAIL,
              },
              serviceType: [
                "Roof inspection",
                "Storm damage assessment",
                "Hail damage roof inspection",
                "Residential roofing",
              ],
              url: pageUrl,
            },
            breadcrumbSchema,
            faqSchema,
          ].filter(Boolean)),
        }}
      />
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={withBasePath("/images/brand/hero-truck-home.webp")}
              alt={`${BUSINESS_NAME} roofing inspection truck serving ${page.city} homeowners`}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/96 via-brand-navy/86 to-brand-navy/52" />
          </div>

          <div className="relative mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-brand-orange/26 bg-brand-orange/12 px-4 py-1.5 text-sm font-semibold text-brand-amber">
                Roofing Services in {page.city}, TX
              </p>
              <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.04] text-white sm:text-5xl md:text-6xl">
                {page.title}
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-brand-surface/92 md:text-xl">
                {page.intro}
              </p>

              <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <LinkButton
                  href={PHONE_HREF}
                  size="lg"
                  className="btn-gold rounded-full border border-brand-orange/40 px-8 py-7 text-lg font-bold text-brand-navy"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call {BUSINESS_PHONE}
                </LinkButton>
                <LinkButton
                  href={SCHEDULE_HREF}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="rounded-full border border-brand-surface/55 bg-brand-surface px-8 py-7 text-lg font-semibold text-brand-navy shadow-[0_16px_34px_rgba(12,24,18,0.22)]"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Free Inspection
                </LinkButton>
              </div>

              <nav aria-label={`${page.city} roofing quick links`} className="flex flex-wrap gap-2.5 text-sm font-medium">
                <Link href="/#free-inspection" className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white">
                  See how our free inspection works
                </Link>
                <Link href="/#local-roofing-services" className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white">
                  Explore storm damage and insurance help
                </Link>
                <Link href="/#service-area" className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white">
                  View all DFW service areas
                </Link>
                <Link href="/guides/" className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white">
                  Read DFW roofing guides
                </Link>
                {servicePages[0] ? (
                  <Link href={getCityServicePath(servicePages[0].citySlug, servicePages[0].serviceSlug)} className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white">
                    Free roof inspection in {page.city}
                  </Link>
                ) : null}
              </nav>

              <div className="flex flex-wrap gap-3">
                {page.serviceBullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-brand-surface/90"
                  >
                    <CheckCircle className="h-4 w-4 text-brand-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
            <div>
              <h2 className="mb-5 font-heading text-3xl font-bold text-brand-text md:text-4xl">
                Why homeowners in {page.city} search for a local roofing contractor
              </h2>
              <div className="space-y-5 text-lg leading-8 text-brand-muted">
                {page.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="rounded-[30px] border border-brand-navy/8 bg-brand-surface p-6 shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
              <h3 className="mb-4 font-heading text-2xl font-bold text-brand-text">
                Service highlights for {page.city}
              </h3>
              <ul className="space-y-3">
                {page.serviceBullets.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-white px-4 py-3 text-brand-text shadow-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-brand-navy px-5 py-5 text-brand-surface">
                <p className="mb-3 text-sm uppercase tracking-[0.22em] text-brand-orange/90">
                  Nearby areas
                </p>
                <div className="space-y-3 text-sm text-brand-surface/90">
                  {page.nearbyAreas.map((area) => (
                    <div key={area} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-orange" />
                      {relatedCities.some((item) => matchesAreaLink(area, item.city)) ? (
                        <Link
                          href={getCityPagePath(
                            relatedCities.find((item) => matchesAreaLink(area, item.city))!.slug,
                          )}
                          className="underline-offset-4 hover:text-white hover:underline"
                        >
                          {area}
                        </Link>
                      ) : (
                        <span>{area}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {servicePages.length > 0 ? (
          <section className="bg-white pb-16 md:pb-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">
                {page.city} Services
              </p>
              <h2 className="mb-8 font-heading text-3xl font-bold text-brand-text md:text-4xl">
                Inspection, hail, storm, and repair pages
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                {servicePages.map((item) => (
                  <Link
                    key={item.serviceSlug}
                    href={getCityServicePath(item.citySlug, item.serviceSlug)}
                    className="group rounded-[28px] border border-brand-navy/8 bg-brand-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-orange/90">
                      {item.serviceLabel}
                    </p>
                    <h3 className="mb-3 font-heading text-xl font-bold text-brand-text">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-brand-muted">
                      {item.metaDescription}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                      Open this page
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-brand-surface py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-brand-navy/8 bg-white p-8 shadow-[0_18px_40px_rgba(27,54,38,0.08)] md:p-10">
              <h2 className="mb-6 font-heading text-3xl font-bold text-brand-text md:text-4xl">
                Frequently asked questions about roofing in {page.city}
              </h2>
              <div className="space-y-4">
                {page.faq.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[24px] border border-brand-navy/8 bg-brand-surface px-6 py-5"
                  >
                    <h3 className="mb-2 font-semibold text-brand-text">
                      {item.question}
                    </h3>
                    <p className="leading-7 text-brand-muted">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">
                  Related Service Areas
                </p>
                <h2 className="font-heading text-3xl font-bold text-brand-text md:text-4xl">
                  Explore other DFW roofing service pages
                </h2>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-brand-navy hover:text-brand-text"
              >
                View Praise Worthy on Google Maps
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {relatedCities.map((item) => (
                <Link
                  key={item.slug}
                  href={getCityPagePath(item.slug)}
                  className="group rounded-[28px] border border-brand-navy/8 bg-brand-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-brand-orange/90">
                    {item.city}
                  </p>
                  <h3 className="mb-3 font-heading text-xl font-bold text-brand-text">
                    Roof inspections in {item.city}
                  </h3>
                  <p className="text-sm leading-6 text-brand-muted">
                    {item.metaDescription}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                    Visit page
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobilePhoneButton />
    </>
  );
}
