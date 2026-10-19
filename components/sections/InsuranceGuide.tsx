"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { withBasePath } from "@/lib/seo";

export default function InsuranceGuide() {
  const { t } = useLanguage();

  return (
    <section id="insurance" className="bg-brand-surface py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-navy">
              <span className="h-2.5 w-2.5 rotate-45 border-l-2 border-t-2 border-brand-orange" aria-hidden="true" />
              {t.insurance.title}
            </p>
            <h2 className="max-w-2xl font-heading text-4xl font-bold leading-[1.06] tracking-[-0.025em] text-brand-text sm:text-5xl lg:text-[3.55rem]">
              {t.insurance.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted">
              {t.insurance.description}
            </p>

            <ol className="mt-9 grid gap-6">
              {t.insurance.cards.map((service, index) => (
                <li key={service.title} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-navy font-heading text-lg font-bold text-brand-amber" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-[1.05rem] font-bold text-brand-text">{service.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-brand-muted">{service.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="relative min-h-[380px] overflow-hidden rounded-[20px] shadow-[0_30px_70px_-24px_rgba(8,24,16,0.35)] sm:min-h-[520px]">
            <Image
              src={withBasePath("/images/real/storm-damage-ridge.webp")}
              alt={t.images.insuranceAlt}
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover object-center"
            />
            <span className="pointer-events-none absolute inset-3.5 rounded-[13px] border border-brand-orange/50" aria-hidden="true" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081810]/90 via-[#081810]/45 to-transparent px-6 pb-5 pt-14 text-sm font-semibold text-brand-surface/90">
              {t.insurance.cards[0].title} · {t.insurance.cards[3].title}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
