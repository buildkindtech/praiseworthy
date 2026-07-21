"use client";

import Link from "next/link";
import { cityNames, type Locale } from "@/lib/i18n";
import { cityPagePathsByCity } from "@/lib/city-pages";
import { getGuide, getGuidePath, guideSlugs } from "@/lib/guides";

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
      "We also make it easy to schedule a free roof inspection quickly. Fast response, storm damage experience, and real local coverage give homeowners a clearer, more trustworthy next step after severe weather.",
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
      "Tambien damos prioridad a la rapidez para programar una inspeccion gratis. Esa respuesta agil, junto con experiencia en tormentas y cobertura local en DFW, da a los propietarios un siguiente paso mas claro y confiable despues del mal clima.",
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
      "我们也尽量让免费检查预约更快完成。快速响应、熟悉风暴损伤、覆盖多个 DFW 城市，能让业主在恶劣天气后更快知道下一步该怎么做。",
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
      "무료 점검 예약도 빠르게 진행할 수 있도록 돕고 있습니다. 빠른 응답, 폭풍 피해 경험, DFW 지역 커버리지는 악천후 이후 무엇을 해야 할지 고민하는 분들에게 더 믿을 수 있는 다음 단계를 제공합니다.",
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

  return (
    <section className="bg-brand-surface py-16 md:py-24" aria-labelledby="local-roofing-services">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-brand-navy/8 bg-white px-6 py-8 shadow-[0_18px_40px_rgba(27,54,38,0.08)] md:px-10 md:py-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">
            {content.eyebrow}
          </p>
          <h2
            id="local-roofing-services"
            className="mb-4 font-heading text-3xl font-bold text-brand-text md:text-4xl"
          >
            {content.title}
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-brand-muted">
            {content.intro}
          </p>

          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              {content.paragraphs.map((paragraph) => (
                <p key={paragraph} className="leading-8 text-brand-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="rounded-[24px] bg-brand-navy px-6 py-6 text-brand-surface">
              <h3 className="mb-4 font-heading text-xl font-bold">
                {content.bulletTitle}
              </h3>
              <ul className="space-y-3">
                {content.bullets.map((bullet) => (
                  <li key={bullet} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {cityNames.map((city) => (
                  <a
                    key={city}
                    href={cityPagePathsByCity[city]}
                    className="rounded-full border border-white/20 bg-white/8 px-3.5 py-2 text-sm text-brand-surface/92 transition-colors hover:bg-white/16 hover:text-white"
                  >
                    {city}
                  </a>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-8 rounded-[28px] bg-brand-surface px-5 py-6 md:px-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                {content.guidesEyebrow}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-brand-text">
                {content.guidesTitle}
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {guideSlugs.map((slug) => {
                const guide = getGuide(locale, slug);
                if (!guide) return null;
                return (
                  <Link
                    key={guide.slug}
                    href={getGuidePath(guide.slug, locale)}
                    className="rounded-[24px] border border-brand-navy/8 bg-white px-5 py-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-orange">
                      {content.guideLabel}
                    </p>
                    <h4 className="mt-3 font-heading text-xl font-bold text-brand-text">
                      {guide.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-brand-muted">
                      {guide.metaDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
