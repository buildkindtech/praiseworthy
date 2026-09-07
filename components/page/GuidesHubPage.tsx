import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobilePhoneButton from "@/components/layout/MobilePhoneButton";
import ChatWidget from "@/components/layout/ChatWidget";
import { LinkButton } from "@/components/ui/link-button";
import { cityPagesBySlug } from "@/lib/city-pages";
import {
  getGuidePath,
  getGuidesHubUrl,
  type GuideArticle,
} from "@/lib/guides";
import { type Locale } from "@/lib/i18n";
import { localeMeta } from "@/lib/seo-i18n";
import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_E164,
  SITE_URL,
  createBreadcrumbSchema,
} from "@/lib/seo";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";

const PHONE_HREF = `tel:${BUSINESS_PHONE_E164}`;
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

const guidesHubUiCopy = {
  en: {
    eyebrow: "Guides and Resources",
    browseLabel: "Browse Guides",
    featuredLabel: "Helpful Topics",
    relatedAreas: "Related Service Areas",
    readGuide: "Read guide",
    bookInspection: "Book a free inspection",
    callNow: "Call now",
    schedule: "Schedule a Free Inspection",
    localHelp: "Local roofing help in",
    ctaTitle: "Need a roof inspection instead of more guesswork?",
    ctaBody:
      "Talk to a local team that can check for hail, wind, and leak-risk areas and explain the next step clearly.",
    reassurance: "Free inspections, photo-backed findings, and honest next-step guidance across DFW.",
    browseTitle: "Roofing guides built for real homeowner questions",
    supportTitle: "Talk through what your roof may need",
  },
  es: {
    eyebrow: "Guias y recursos",
    browseLabel: "Explora las guias",
    featuredLabel: "Temas utiles",
    relatedAreas: "Zonas de servicio relacionadas",
    readGuide: "Leer guia",
    bookInspection: "Agenda una inspeccion gratis",
    callNow: "Llamar ahora",
    schedule: "Agenda una inspeccion gratis",
    localHelp: "Ayuda local de techos en",
    ctaTitle: "Necesita una inspeccion en lugar de seguir adivinando?",
    ctaBody:
      "Hable con un equipo local que puede revisar granizo, viento y zonas con riesgo de filtracion y explicarle el siguiente paso con claridad.",
    reassurance: "Inspecciones gratis, fotos claras y orientacion honesta en todo DFW.",
    browseTitle: "Guias de techos pensadas para preguntas reales de propietarios",
    supportTitle: "Hable con nosotros sobre lo que su techo podria necesitar",
  },
  zh: {
    eyebrow: "指南与资源",
    browseLabel: "浏览指南",
    featuredLabel: "实用主题",
    relatedAreas: "相关服务区域",
    readGuide: "查看指南",
    bookInspection: "预约免费检查",
    callNow: "立即致电",
    schedule: "预约免费检查",
    localHelp: "本地屋顶服务地区",
    ctaTitle: "与其继续猜测，不如直接做一次屋顶检查",
    ctaBody:
      "联系本地团队，检查冰雹、大风和漏水风险，并用清楚的方式告诉您下一步该怎么做。",
    reassurance: "免费检查、照片记录和清楚建议，服务覆盖整个 DFW。",
    browseTitle: "围绕业主真实问题整理的屋顶指南",
    supportTitle: "直接咨询您的屋顶下一步该怎么做",
  },
  ko: {
    eyebrow: "가이드 및 리소스",
    browseLabel: "가이드 둘러보기",
    featuredLabel: "도움이 되는 주제",
    relatedAreas: "관련 서비스 지역",
    readGuide: "가이드 보기",
    bookInspection: "무료 점검 예약하기",
    callNow: "전화하기",
    schedule: "무료 점검 예약하기",
    localHelp: "지역 지붕 서비스",
    ctaTitle: "계속 고민하기보다 지붕 점검부터 받아보세요",
    ctaBody:
      "우박, 강풍, 누수 위험 부위를 확인하고 다음 단계를 명확하게 설명해주는 지역 팀과 바로 연결할 수 있습니다.",
    reassurance: "무료 점검, 사진 기록, 명확한 다음 단계 안내를 DFW 전역에서 제공합니다.",
    browseTitle: "주택 소유주의 실제 질문에 맞춘 지붕 가이드",
    supportTitle: "지붕 상태를 직접 상담해보세요",
  },
} as const;

export default function GuidesHubPage({
  guides,
  locale,
  title,
  intro,
}: {
  guides: GuideArticle[];
  locale: Locale;
  title: string;
  intro: string;
}) {
  const ui = guidesHubUiCopy[locale];
  const hubUrl = getGuidesHubUrl(locale);
  // City pages currently exist only at their English routes. Keep localized
  // guide hubs linked to real pages until translated city routes are added.
  const getCityHref = (slug: string) => `/${slug}/`;
  const relatedCities = Array.from(
    new Map(
      guides
        .flatMap((guide) =>
          guide.relatedCitySlugs.map((slug) => cityPagesBySlug[slug]).filter(Boolean),
        )
        .map((city) => [city.slug, city]),
    ).values(),
  ).slice(0, 6);
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: locale === "en" ? "Home" : BUSINESS_NAME, item: locale === "en" ? `${SITE_URL}/` : `${SITE_URL}/${locale}/` },
    { name: title, item: hubUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${hubUrl}#collection`,
              name: title,
              description: intro,
              inLanguage: localeMeta[locale].languageTag,
              url: hubUrl,
              isPartOf: {
                "@id": `${SITE_URL}#website`,
              },
              about: {
                "@id": `${SITE_URL}#roofingcontractor`,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${hubUrl}#guides`,
              name: `${BUSINESS_NAME} guides`,
              inLanguage: localeMeta[locale].languageTag,
              itemListElement: guides.map((guide, index) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `${SITE_URL}${getGuidePath(guide.slug, locale)}`,
                name: guide.title,
              })),
            },
            breadcrumbSchema,
          ].filter(Boolean)),
        }}
      />
      <Header />
      <main>
        <section className="bg-gradient-to-b from-brand-navy via-[#173122] to-brand-navy pt-32 pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-4 inline-flex rounded-full border border-brand-orange/25 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">
                <BookOpen className="mr-2 h-4 w-4" />
                {ui.eyebrow}
              </p>
              <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-brand-surface/92 md:text-xl">
                {intro}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {guides.slice(0, 3).map((guide) => (
                  <div
                    key={guide.slug}
                    className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4 text-sm leading-6 text-brand-surface/92"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange/90">
                      {ui.featuredLabel}
                    </p>
                    <p className="font-semibold text-white">{guide.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-surface py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 rounded-[30px] border border-brand-navy/10 bg-white px-6 py-6 shadow-[0_18px_40px_rgba(27,54,38,0.08)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                  {ui.bookInspection}
                </p>
                <h2 className="font-heading text-2xl font-bold text-brand-text md:text-3xl">
                  {ui.ctaTitle}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-brand-muted">
                  {ui.ctaBody}
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <LinkButton
                  href={PHONE_HREF}
                  className="w-full btn-gold rounded-full border border-brand-orange/40 text-brand-navy font-semibold lg:w-auto lg:min-w-[280px]"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {ui.callNow} {BUSINESS_PHONE}
                </LinkButton>
                <LinkButton
                  href={SCHEDULE_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-full border border-brand-navy/12 bg-brand-surface text-brand-navy hover:bg-brand-navy/6 font-semibold lg:w-auto lg:min-w-[280px]"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {ui.schedule}
                </LinkButton>
                <p className="text-sm leading-6 text-brand-muted lg:max-w-[320px] lg:text-right">
                  {ui.reassurance}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                {ui.browseLabel}
              </p>
              <h2 className="font-heading text-3xl font-bold text-brand-text md:text-4xl">
                {ui.browseTitle}
              </h2>
              <p className="mt-4 text-base leading-7 text-brand-muted">
                {intro}
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_340px]">
              <div className="space-y-4">
                {guides.map((guide) => (
                  <article key={guide.slug}>
                  <Link
                    key={guide.slug}
                    href={getGuidePath(guide.slug, locale)}
                    className="group block rounded-[30px] border border-brand-navy/8 bg-white px-6 py-6 shadow-[0_18px_36px_rgba(27,54,38,0.06)] transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(27,54,38,0.1)] md:px-7"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange/90">
                          {guide.eyebrow}
                        </p>
                        <h3 className="font-heading text-2xl font-bold leading-tight text-brand-text md:text-[1.75rem]">
                          {guide.title}
                        </h3>
                        <p className="mt-3 max-w-3xl text-base leading-7 text-brand-muted">
                          {guide.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {guide.relatedCitySlugs.slice(0, 3).map((slug) => {
                            const city = cityPagesBySlug[slug];

                            if (!city) {
                              return null;
                            }

                            return (
                              <span
                                key={slug}
                                className="rounded-full border border-brand-navy/10 bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-navy"
                              >
                                {city.city}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-brand-surface transition-colors group-hover:bg-brand-text">
                        {ui.readGuide}
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                  </article>
                ))}
              </div>

              <aside className="space-y-6">
                <section className="rounded-[32px] border border-brand-navy/8 bg-brand-navy px-6 py-6 text-brand-surface shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                    {ui.bookInspection}
                  </p>
                  <h3 className="font-heading text-2xl font-bold leading-tight">
                    {ui.supportTitle}
                  </h3>
                  <p className="mt-3 leading-7 text-brand-surface/92">{ui.ctaBody}</p>
                  <div className="mt-5 space-y-3">
                    <LinkButton
                      href={PHONE_HREF}
                      className="w-full btn-gold rounded-full border border-brand-orange/40 text-brand-navy font-semibold"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {ui.callNow} {BUSINESS_PHONE}
                    </LinkButton>
                    <LinkButton
                      href={SCHEDULE_HREF}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full rounded-full border border-white/16 bg-white/8 text-brand-surface hover:bg-white/12 font-semibold"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {ui.schedule}
                    </LinkButton>
                  </div>
                  <div className="mt-5 rounded-[22px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-brand-surface/92">
                    {ui.reassurance}
                  </div>
                </section>

                <section className="rounded-[32px] border border-brand-navy/8 bg-white px-6 py-6 shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                    {ui.featuredLabel}
                  </p>
                  <p className="leading-7 text-brand-muted">{intro}</p>
                </section>
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-brand-surface py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                {ui.relatedAreas}
              </p>
              <h2 className="font-heading text-3xl font-bold text-brand-text md:text-4xl">
                {ui.localHelp}
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedCities.map((city) => (
                <Link
                  key={city.slug}
                  href={getCityHref(city.slug)}
                  className="block rounded-[28px] border border-brand-navy/8 bg-white px-5 py-5 shadow-sm transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange/90">
                    <MapPin className="h-4 w-4" />
                    {city.city}
                  </div>
                  <p className="font-heading text-xl font-bold text-brand-text">
                    {ui.localHelp} {city.city}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-brand-muted">
                    {city.metaDescription}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                    {ui.readGuide}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobilePhoneButton />
      <ChatWidget />
    </>
  );
}
