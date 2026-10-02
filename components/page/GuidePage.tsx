import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobilePhoneButton from "@/components/layout/MobilePhoneButton";
import ChatWidget from "@/components/layout/ChatWidget";
import GuideSectionNav from "@/components/guides/GuideSectionNav";
import { LinkButton } from "@/components/ui/link-button";
import {
  getGuideRelatedCities,
  getGuidePath,
  getGuideUrl,
  getRelatedGuides,
  type GuideArticle,
} from "@/lib/guides";
import { type Locale } from "@/lib/i18n";
import {
  ARTICLE_IMAGE_URL,
  BUSINESS_AUTHOR_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_E164,
  SITE_URL,
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "@/lib/seo";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";
import { localeMeta } from "@/lib/seo-i18n";

const PHONE_HREF = `tel:${BUSINESS_PHONE_E164}`;
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

const guideUiCopy = {
  en: {
    call: "Call",
    schedule: "Schedule a phone call",
    summary: "Quick Summary",
    relatedAreas: "Related Service Areas",
    relatedGuides: "More Helpful Guides",
    readGuide: "Read guide",
    commonQuestions: "Common Questions",
    faqTitle: "Questions homeowners often ask",
    bookInspection: "Request a free inspection",
    roofInspectionIn: "Roof inspection in",
  },
  es: {
    call: "Llamar",
    schedule: "Agendar llamada telefónica",
    summary: "Resumen rapido",
    relatedAreas: "Zonas de servicio relacionadas",
    relatedGuides: "Mas guias utiles",
    readGuide: "Leer guia",
    commonQuestions: "Preguntas comunes",
    faqTitle: "Preguntas que suelen hacer los propietarios",
    bookInspection: "Solicitar inspección gratis",
    roofInspectionIn: "Inspeccion de techo en",
  },
  zh: {
    call: "致电",
    schedule: "预约电话沟通",
    summary: "快速总结",
    relatedAreas: "相关服务区域",
    relatedGuides: "更多实用指南",
    readGuide: "查看指南",
    commonQuestions: "常见问题",
    faqTitle: "业主常问的问题",
    bookInspection: "申请免费屋顶检查",
    roofInspectionIn: "屋顶检查服务地区",
  },
  ko: {
    call: "전화",
    schedule: "전화 상담 예약하기",
    summary: "빠른 요약",
    relatedAreas: "관련 서비스 지역",
    relatedGuides: "추가 가이드",
    readGuide: "가이드 보기",
    commonQuestions: "자주 묻는 질문",
    faqTitle: "주택 소유주가 자주 묻는 질문",
    bookInspection: "무료 점검 신청하기",
    roofInspectionIn: "지붕 점검 지역",
  },
} as const;

export default function GuidePage({
  guide,
  locale,
}: {
  guide: GuideArticle;
  locale: Locale;
}) {
  const guideUrl = getGuideUrl(guide.slug, locale);
  const relatedCities = getGuideRelatedCities(guide);
  const relatedGuides = getRelatedGuides(locale, guide);
  const ui = guideUiCopy[locale];
  const homeInspectionHref =
    locale === "en" ? "/#inspection-request-hero" : `/${locale}/#inspection-request-hero`;
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", item: locale === "en" ? `${SITE_URL}/` : `${SITE_URL}/${locale}/` },
    { name: "Guides", item: locale === "en" ? `${SITE_URL}/guides/` : `${SITE_URL}/${locale}/guides/` },
    { name: guide.title, item: guideUrl },
  ]);
  const faqSchema = createFaqSchema(guide.faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            createWebPageSchema({
              id: `${guideUrl}#webpage`,
              url: guideUrl,
              name: guide.title,
              description: guide.metaDescription,
              inLanguage: localeMeta[locale].languageTag,
              datePublished: guide.publishedAt,
              dateModified: guide.updatedAt,
              speakable: {
                cssSelector: ["article h1", "article h2"],
              },
            }),
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "@id": `${guideUrl}#article`,
              headline: guide.title,
              description: guide.metaDescription,
              image: [ARTICLE_IMAGE_URL],
              inLanguage: localeMeta[locale].languageTag,
              author: {
                "@type": "Organization",
                name: BUSINESS_AUTHOR_NAME,
                url: SITE_URL,
              },
              publisher: {
                "@id": `${SITE_URL}#roofingcontractor`,
              },
              mainEntityOfPage: {
                "@id": `${guideUrl}#webpage`,
              },
              url: guideUrl,
              articleSection: guide.sections.map((section) => section.title),
              about: {
                "@id": `${SITE_URL}#roofingcontractor`,
              },
              datePublished: guide.publishedAt,
              dateModified: guide.updatedAt,
              speakable: {
                "@type": "SpeakableSpecification",
                cssSelector: ["article h1", "article h2", "section[aria-label='guide faq'] h3"],
              },
            },
            breadcrumbSchema,
            faqSchema,
          ].filter(Boolean)),
        }}
      />
      <Header />
      <main>
        <article>
        <section className="bg-gradient-to-b from-brand-navy via-[#173122] to-brand-navy pt-32 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <p className="mb-4 inline-flex rounded-full border border-brand-orange/25 bg-brand-orange/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-amber">
                <BookOpen className="mr-2 h-4 w-4" />
                {guide.eyebrow}
              </p>
              <h1 className="mb-6 font-heading text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl md:text-6xl">
                {guide.title}
              </h1>
              <p className="mb-8 max-w-3xl text-lg leading-8 text-brand-surface/92 md:text-xl">
                {guide.intro}
              </p>

              <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                <LinkButton
                  href={PHONE_HREF}
                  size="lg"
                  className="btn-gold rounded-full border border-brand-orange/40 px-8 py-7 text-lg font-bold text-brand-navy"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {ui.call} {BUSINESS_PHONE}
                </LinkButton>
                <LinkButton
                  href={SCHEDULE_HREF}
                  target="_blank"
                  rel="noreferrer"
                  size="lg"
                  className="rounded-full border border-brand-surface/55 bg-brand-surface px-8 py-7 text-lg font-semibold text-brand-navy shadow-[0_16px_34px_rgba(12,24,18,0.22)]"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {ui.schedule}
                </LinkButton>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {guide.keyPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[24px] border border-white/10 bg-white/6 px-5 py-4 text-sm leading-6 text-brand-surface/92"
                  >
                    <CheckCircle className="mb-3 h-4 w-4 text-brand-success" />
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <GuideSectionNav sections={guide.sections} />
          </div>
        </section>

        <section className="bg-white pb-16 md:pb-24">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:px-8">
            <div className="space-y-6">
              {guide.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 rounded-[32px] border border-brand-navy/8 bg-brand-surface px-6 py-8 shadow-[0_18px_40px_rgba(27,54,38,0.08)] md:px-8"
                >
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                    {section.label}
                  </p>
                  <h2 className="mb-4 font-heading text-3xl font-bold text-brand-text">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-brand-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="leading-8">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="rounded-2xl bg-white px-4 py-3 text-sm font-medium text-brand-text shadow-sm"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <aside className="space-y-6">
              <section className="rounded-[32px] border border-brand-navy/8 bg-brand-navy px-6 py-6 text-brand-surface shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                  {ui.summary}
                </p>
                <p className="leading-7 text-brand-surface/92">{guide.summary}</p>
              </section>

              <section className="rounded-[32px] border border-brand-navy/8 bg-brand-surface px-6 py-6 shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                  {ui.relatedAreas}
                </p>
                <div className="space-y-4">
                  {relatedCities.map((city) => (
                    <Link
                      key={city.slug}
                      href={city.href}
                      className="block rounded-[24px] bg-white px-5 py-4 transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange/90">
                        <MapPin className="h-4 w-4" />
                        {city.city}
                      </div>
                      <p className="font-heading text-xl font-bold text-brand-text">
                        {ui.roofInspectionIn} {city.city}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-brand-muted">
                        {city.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] border border-brand-navy/8 bg-white px-6 py-6 shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                  {ui.relatedGuides}
                </p>
                <div className="space-y-4">
                  {relatedGuides.map((item) => (
                    <Link
                      key={item.slug}
                      href={getGuidePath(item.slug, locale)}
                      className="group block rounded-[24px] bg-brand-surface px-5 py-4 transition-[transform,box-shadow,background-color] hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <p className="font-semibold text-brand-text">{item.title}</p>
                      <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
                        {ui.readGuide}
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>

        <section aria-label="guide faq" className="bg-brand-surface py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[32px] border border-brand-navy/8 bg-white p-8 shadow-[0_18px_40px_rgba(27,54,38,0.08)] md:p-10">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                    {ui.commonQuestions}
                  </p>
                  <h2 className="font-heading text-3xl font-bold text-brand-text md:text-4xl">
                    {ui.faqTitle}
                  </h2>
                </div>
                <Link
                  href={homeInspectionHref}
                  className="hidden text-sm font-semibold text-brand-navy hover:text-brand-text md:inline-flex md:items-center md:gap-2"
                >
                  {ui.bookInspection}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-4">
                {guide.faq.map((item) => (
                  <article
                    key={item.question}
                    className="rounded-[24px] border border-brand-navy/8 bg-brand-surface px-6 py-5"
                  >
                    <h3 className="mb-2 font-semibold text-brand-text">{item.question}</h3>
                    <p className="leading-7 text-brand-muted">{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        </article>
      </main>
      <Footer />
      <MobilePhoneButton />
      <ChatWidget />
    </>
  );
}
