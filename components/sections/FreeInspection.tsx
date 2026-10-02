"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { withBasePath } from "@/lib/seo";

export default function FreeInspection() {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#081810] py-20 text-white md:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_-10%,rgba(197,160,89,0.17),transparent_46%),linear-gradient(165deg,rgba(27,54,38,0.96),rgba(8,24,16,1))]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-amber">
              <span className="h-2.5 w-2.5 rotate-45 border-l-2 border-t-2 border-brand-orange" aria-hidden="true" />
              {t.inspection.badge}
            </p>
            <h2 className="max-w-2xl font-heading text-4xl font-bold leading-[1.06] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.55rem]">
              {t.inspection.titleLine1}{" "}
              <span className="font-heading font-medium text-brand-amber">
                {t.inspection.titleHighlight}
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-surface/72">
              {t.inspection.description}
            </p>

            <ul className="mt-8 grid gap-5" aria-label={t.inspection.titleLine1}>
              {t.inspection.items.map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-amber to-brand-orange text-[#081810]">
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <div>
                    <strong className="block text-[1.05rem] text-white">{item}</strong>
                    <span className="mt-0.5 block text-sm leading-6 text-brand-surface/62">
                      {t.inspection.itemDescriptions[index]}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton
                href="#inspection-request-hero"
                className="h-auto rounded-full bg-gradient-to-br from-brand-amber to-brand-orange px-5 py-2.5 font-extrabold text-[#081810] hover:brightness-105"
              >
                {t.inspection.primaryCta}
              </LinkButton>
              <LinkButton
                href="#service-area"
                variant="outline"
                className="h-auto rounded-full border-brand-amber/60 bg-transparent px-5 py-2.5 font-bold text-brand-amber hover:bg-white/8 hover:text-brand-amber"
              >
                {t.inspection.secondaryCta}
              </LinkButton>
            </div>
          </div>

          <figure className="relative min-h-[360px] overflow-hidden rounded-[20px] shadow-[0_30px_70px_-24px_rgba(0,0,0,0.65)] sm:min-h-[470px]">
            <Image
              src={withBasePath("/images/brand/service-truck.webp")}
              alt={t.images.truckAlt}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-center"
            />
            <span className="pointer-events-none absolute inset-3.5 rounded-[13px] border border-brand-amber/45" aria-hidden="true" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081810]/90 via-[#081810]/45 to-transparent px-6 pb-5 pt-14 text-sm font-semibold text-brand-surface/90">
              {t.inspection.visualCaption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
