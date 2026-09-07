"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobilePhoneButton from "@/components/layout/MobilePhoneButton";
import { LinkButton } from "@/components/ui/link-button";
import { getCityPagePath } from "@/lib/city-pages";
import {
  getCityHubForServicePage,
  getCityServicePath,
  getCityServiceUrl,
  getSameServiceCityPages,
  getSiblingServicePages,
  serviceCatalog,
  type CityServicePage as CityServicePageType,
} from "@/lib/city-service-pages";
import { getGuide, getGuidePath } from "@/lib/guides";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_E164,
  SITE_URL,
  createBreadcrumbSchema,
  createFaqSchema,
  withBasePath,
} from "@/lib/seo";
import { Calendar, CheckCircle, ChevronRight, MapPin, Phone } from "lucide-react";

const PHONE_HREF = `tel:${BUSINESS_PHONE_E164}`;
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

export default function CityServicePage({ page }: { page: CityServicePageType }) {
  const cityHub = getCityHubForServicePage(page);
  const siblingServices = getSiblingServicePages(page);
  const relatedCities = getSameServiceCityPages(page);
  const relatedGuides = page.relatedGuideSlugs
    .map((slug) => getGuide("en", slug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide));
  const pageUrl = getCityServiceUrl(page.citySlug, page.serviceSlug);
  const cityHubUrl = `${SITE_URL}${getCityPagePath(page.citySlug)}`;
  const catalog = serviceCatalog[page.serviceSlug];
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: `${SITE_URL}/` },
    { name: `${page.city} Roofing`, item: cityHubUrl },
    { name: page.serviceLabel, item: pageUrl },
  ]);
  const faqSchema = createFaqSchema(page.faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [
              {
                "@context": "https://schema.org",
                "@type": "RoofingContractor",
                "@id": `${pageUrl}#roofingcontractor`,
                name: BUSINESS_NAME,
                telephone: BUSINESS_PHONE_E164,
                email: BUSINESS_EMAIL,
                url: pageUrl,
                areaServed: {
                  "@type": "City",
                  name: page.city,
                },
                parentOrganization: {
                  "@id": `${SITE_URL}#roofingcontractor`,
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Service",
                "@id": `${pageUrl}#service`,
                name: `${page.serviceLabel} in ${page.city}, TX`,
                description: page.description,
                serviceType: catalog.schemaServiceType,
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
                url: pageUrl,
              },
              breadcrumbSchema,
              faqSchema,
            ].filter(Boolean),
          ),
        }}
      />
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={withBasePath("/images/brand/hero-truck-home.webp")}
              alt={`${BUSINESS_NAME} ${page.serviceLabel.toLowerCase()} serving ${page.city} homeowners`}
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
                {page.serviceLabel} in {page.city}, TX
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

              <nav
                aria-label={`${page.city} ${page.serviceLabel} quick links`}
                className="mb-8 flex flex-wrap gap-2.5 text-sm font-medium"
              >
                <Link
                  href={getCityPagePath(page.citySlug)}
                  className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white"
                >
                  {page.city} roofing hub
                </Link>
                <Link
                  href="/#free-inspection"
                  className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white"
                >
                  See how a free inspection works
                </Link>
                <Link
                  href="/guides/"
                  className="rounded-full border border-white/24 bg-white/10 px-4 py-2.5 text-brand-surface backdrop-blur-[2px] transition-colors hover:bg-white/18 hover:text-white"
                >
                  Read DFW roofing guides
                </Link>
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
                What this {page.serviceLabel.toLowerCase()} covers in {page.city}
              </h2>
              <div className="space-y-5 text-lg leading-8 text-brand-muted">
                {page.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="rounded-[30px] border border-brand-navy/8 bg-brand-surface p-6 shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
              <h3 className="mb-4 font-heading text-2xl font-bold text-brand-text">
                Other {page.city} roofing pages
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href={getCityPagePath(page.citySlug)}
                    className="block rounded-2xl bg-white px-4 py-3 text-brand-text shadow-sm underline-offset-4 hover:underline"
                  >
                    {cityHub?.title ?? `${page.city} roofing services`}
                  </Link>
                </li>
                {siblingServices.map((item) => (
                  <li key={item.serviceSlug}>
                    <Link
                      href={getCityServicePath(item.citySlug, item.serviceSlug)}
                      className="block rounded-2xl bg-white px-4 py-3 text-brand-text shadow-sm underline-offset-4 hover:underline"
                    >
                      {item.serviceLabel} in {item.city}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl bg-brand-navy px-5 py-5 text-brand-surface">
                <p className="mb-3 text-sm uppercase tracking-[0.22em] text-brand-orange/90">
                  Hours and contact
                </p>
                <p className="text-sm leading-6 text-brand-surface/90">
                  Monday–Saturday, 8:00 a.m.–6:00 p.m. Central Time. Sunday closed.
                </p>
                <a
                  href={PHONE_HREF}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-amber hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  {BUSINESS_PHONE}
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="bg-brand-surface py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-brand-navy/8 bg-white p-8 shadow-[0_18px_40px_rgba(27,54,38,0.08)] md:p-10">
              <h2 className="mb-6 font-heading text-3xl font-bold text-brand-text md:text-4xl">
                {page.city} {page.serviceLabel.toLowerCase()} questions
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

        {relatedGuides.length > 0 ? (
          <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">
                Helpful Guides
              </p>
              <h2 className="mb-8 font-heading text-3xl font-bold text-brand-text md:text-4xl">
                Read before you decide
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {relatedGuides.map((guide) => (
                  <Link
                    key={guide.slug}
                    href={getGuidePath(guide.slug)}
                    className="group rounded-[28px] border border-brand-navy/8 bg-brand-surface p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="mb-3 font-heading text-xl font-bold text-brand-text">
                      {guide.title}
                    </h3>
                    <p className="text-sm leading-6 text-brand-muted">
                      {guide.metaDescription}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                      Read guide
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-brand-surface py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">
              Nearby Cities
            </p>
            <h2 className="mb-8 font-heading text-3xl font-bold text-brand-text md:text-4xl">
              Same service in other DFW cities
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedCities.map((item) => (
                <Link
                  key={`${item.citySlug}-${item.serviceSlug}`}
                  href={getCityServicePath(item.citySlug, item.serviceSlug)}
                  className="group rounded-[28px] border border-brand-navy/8 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-brand-orange/90">
                    <MapPin className="h-4 w-4" />
                    {item.city}
                  </p>
                  <h3 className="mb-3 font-heading text-xl font-bold text-brand-text">
                    {item.title}
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
