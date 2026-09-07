"use client";

import Link from "next/link";
import { type Locale } from "@/lib/i18n";
import { cityPagePathsByCity } from "@/lib/city-pages";
import { getGuide, getGuidePath, guideSlugs } from "@/lib/guides";
import { SERVICE_AREAS } from "@/lib/seo";

const seoContent: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    intro: string;
    paragraphs: string[];
    bulletTitle: string;
    bullets: string[];
    guidesEyebrow: string;
    guidesTitle: string;
    guideLabel: string;
  }
> = {
  en: {
    eyebrow: "Local Roofing Support",
    title: "Roofing Help for Homeowners Across North Richland Hills and DFW",
    intro:
      "If you are worried your roof may have been damaged by hail, wind, or heavy rain, this section explains how Praise Worthy helps homeowners across North Richland Hills and the greater DFW area.",
    paragraphs: [
      "Praise Worthy helps homeowners identify roof damage after hail, heavy rain, and high wind events across North Richland Hills and surrounding DFW communities. Our inspections focus on shingles, flashing, valleys, vents, gutters, and visible leak risk so you can understand what needs attention before the damage spreads.",
      "If your roof shows signs of storm damage, our team explains the condition in plain language, documents the findings with photos, and helps you understand whether repair, replacement, or simple monitoring makes the most sense. That local-first process is especially helpful for homeowners in Fort Worth, Keller, Bedford, Hurst, Plano, Arlington, and nearby cities.",
      "We also make it easy to check current availability for a free roof inspection online or by phone. Storm damage experience and real local coverage give homeowners a clearer next step after severe weather.",
    ],
    bulletTitle: "What we help homeowners with most",
    bullets: [
      "Free roof inspection for storm and hail damage",
      "Residential roofing contractor services in DFW",
      "Roof damage documentation for insurance claims",
      "Leak risk checks after wind and hail events",
    ],
    guidesEyebrow: "Helpful Guides",
    guidesTitle: "Start with the topic that matches your biggest concern",
    guideLabel: "Guide",
  },
  es: {
    eyebrow: "Apoyo local para techos",
    title: "Ayuda para propietarios en North Richland Hills y todo el area de DFW",
    intro:
      "Si cree que su techo pudo sufrir danos por granizo, viento o lluvia fuerte, esta seccion explica de forma clara como Praise Worthy ayuda a propietarios en North Richland Hills y otras ciudades de DFW.",
    paragraphs: [
      "Praise Worthy ayuda a propietarios a detectar dano en techos despues de granizo, lluvia fuerte y viento en North Richland Hills y otras comunidades de DFW. Revisamos tejas, tapajuntas, valles, ventilaciones, canaletas y posibles puntos de filtracion para explicar el estado real del techo.",
      "Si encontramos senales de dano por tormenta, explicamos la condicion con palabras sencillas, entregamos evidencia fotografica y orientamos al propietario sobre si conviene reparar, reemplazar o simplemente seguir observando. Ese enfoque local resulta util para quienes comparan empresas de techos en Fort Worth, Keller, Bedford, Hurst, Plano, Arlington y ciudades cercanas.",
      "Tambien facilitamos la consulta de horarios disponibles para una inspeccion gratis, en linea o por telefono. La experiencia en tormentas y la cobertura local en DFW ofrecen un siguiente paso mas claro despues del mal clima.",
    ],
    bulletTitle: "Lo que mas ayudamos a revisar",
    bullets: [
      "Inspeccion gratis de techo por tormenta o granizo",
      "Servicios residenciales de techos en DFW",
      "Documentacion de dano para reclamos de seguro",
      "Revision de riesgo de filtraciones despues de viento o granizo",
    ],
    guidesEyebrow: "Guias utiles",
    guidesTitle: "Empiece con el tema que mas le preocupa hoy",
    guideLabel: "Guia",
  },
  zh: {
    eyebrow: "本地屋顶服务支持",
    title: "服务 North Richland Hills 与整个 DFW 的业主屋顶帮助",
    intro:
      "如果您担心屋顶在冰雹、大风或暴雨后受损，这一部分会更清楚地说明 Praise Worthy 如何为 North Richland Hills 和整个 DFW 的业主提供帮助。",
    paragraphs: [
      "Praise Worthy 为 North Richland Hills 及周边 DFW 社区业主检查冰雹、大雨和强风后的屋顶状况。我们会查看瓦片、泛水、屋脊、排水沟、通风口和潜在渗漏风险，帮助业主尽早了解问题。",
      "如果发现风暴损伤迹象，我们会用容易理解的方式说明屋顶情况，提供照片记录，并帮助业主判断更适合维修、更换，还是继续观察。对正在比较 Fort Worth、Keller、Bedford、Hurst、Plano、Arlington 等地屋顶公司的业主来说，这种本地化说明尤其有帮助。",
      "业主可以在线或通过电话查看免费检查的当前可用时间。熟悉风暴损伤并覆盖多个 DFW 城市，能让业主在恶劣天气后更清楚下一步该怎么做。",
    ],
    bulletTitle: "我们最常帮助业主确认的事项",
    bullets: [
      "风暴与冰雹后的免费屋顶检查",
      "DFW 住宅屋顶承包服务",
      "保险理赔需要的屋顶损伤记录",
      "强风和冰雹后的渗漏风险检查",
    ],
    guidesEyebrow: "实用指南",
    guidesTitle: "先从最符合您当前担心的问题开始看",
    guideLabel: "指南",
  },
  ko: {
    eyebrow: "지역 지붕 서비스 지원",
    title: "North Richland Hills와 DFW 전역 주택 소유주를 위한 지붕 도움",
    intro:
      "우박, 강풍, 폭우 이후 지붕 손상이 걱정된다면 이 섹션에서 Praise Worthy가 North Richland Hills와 DFW 전역의 주택 소유주를 어떻게 도와드리는지 더 자연스럽게 확인할 수 있습니다.",
    paragraphs: [
      "Praise Worthy는 North Richland Hills와 주변 DFW 지역에서 우박, 강풍, 폭우 이후 지붕 상태를 확인하려는 주택 소유주를 돕습니다. 슁글, 후레싱, 골, 환기구, 거터, 누수 위험 지점을 살펴 손상이 퍼지기 전에 상태를 파악할 수 있도록 안내합니다.",
      "폭풍 피해가 확인되면 사진과 함께 상태를 설명하고, 수리, 교체, 경과 관찰 중 어떤 대응이 적절한지 이해하기 쉽게 알려드립니다. Fort Worth, Keller, Bedford, Hurst, Plano, Arlington 등에서 지붕 업체를 비교하는 분들에게 이런 지역 밀착형 설명은 특히 중요합니다.",
      "무료 점검은 온라인 또는 전화로 현재 가능한 시간을 확인할 수 있습니다. 폭풍 피해 경험과 DFW 지역 서비스는 악천후 이후 무엇을 해야 할지 고민하는 분들에게 더 명확한 다음 단계를 제공합니다.",
    ],
    bulletTitle: "가장 많이 도와드리는 점검 항목",
    bullets: [
      "폭풍 및 우박 피해 무료 지붕 점검",
      "DFW 지역 주택 지붕 서비스",
      "보험 청구용 지붕 손상 기록 정리",
      "강풍과 우박 이후 누수 위험 점검",
    ],
    guidesEyebrow: "실용 가이드",
    guidesTitle: "지금 가장 걱정되는 주제부터 확인해보세요",
    guideLabel: "가이드",
  },
};

export default function SearchContent({ locale }: { locale: Locale }) {
  const content = seoContent[locale];
  const serviceAreaLabel = {
    en: "DFW service area links",
    es: "Enlaces de areas de servicio en DFW",
    zh: "DFW 服务区域链接",
    ko: "DFW 서비스 지역 링크",
  }[locale];

  return (
    <section className="section section-green bg-brand-navy py-16 text-brand-surface md:py-24" aria-labelledby="local-roofing-services">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="split grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="split-copy">
            <p className="kicker kicker-gold mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-amber">
              {content.eyebrow}
            </p>
            <h2
              id="local-roofing-services"
              className="font-heading text-3xl font-semibold leading-tight text-white md:text-5xl"
            >
              {content.title}
            </h2>
            <p className="section-lede mt-5 max-w-2xl text-lg leading-relaxed text-brand-surface/80">
              {content.intro}
            </p>
            <div className="mt-7 space-y-4 text-brand-surface/76">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-8">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <aside className="self-start rounded-[18px] border border-white/10 bg-white/6 p-6 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.4)] md:p-8">
            <h3 className="font-heading text-2xl font-semibold text-white">{content.bulletTitle}</h3>
            <ul className="check-list mt-6 grid gap-4">
              {content.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <span className="mt-1 h-5 w-5 shrink-0 rotate-45 border-b-[3px] border-r-[3px] border-brand-amber" aria-hidden="true" />
                  <span className="leading-relaxed text-brand-surface/88">{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2" aria-label={serviceAreaLabel}>
              {SERVICE_AREAS.map((city) => (
                <Link
                  key={city}
                  href={cityPagePathsByCity[city]}
                  className="rounded-full border border-brand-amber/45 px-3 py-1.5 text-sm text-brand-amber transition hover:bg-brand-amber hover:text-brand-navy"
                >
                  {city}
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-14 border-t border-white/12 pt-10 md:mt-20 md:pt-14">
          <div className="section-head mb-8 max-w-3xl">
            <p className="kicker kicker-gold mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-amber">
              {content.guidesEyebrow}
            </p>
            <h3 className="font-heading text-2xl font-semibold text-white md:text-4xl">
              {content.guidesTitle}
            </h3>
          </div>

          <div className="service-row grid gap-4 md:grid-cols-3">
            {guideSlugs.map((slug) => {
              const guide = getGuide(locale, slug);
              if (!guide) return null;
              return (
                <Link
                  key={guide.slug}
                  href={getGuidePath(guide.slug, locale)}
                  className="service-tile rounded-[18px] border border-white/12 bg-white/6 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-amber/60 hover:bg-white/10"
                >
                  <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-brand-amber">
                    {content.guideLabel}
                  </p>
                  <h4 className="mt-3 font-heading text-xl font-semibold text-white">{guide.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-brand-surface/72">{guide.metaDescription}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
