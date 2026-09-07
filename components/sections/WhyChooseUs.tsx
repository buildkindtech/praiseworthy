"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { withBasePath } from "@/lib/seo";

export default function WhyChooseUs() {
  const { t } = useLanguage();

  return (
    <section id="why-us" className="bg-brand-surface py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16 xl:gap-20">
          <div>
            <h2 className="max-w-2xl font-heading text-4xl font-bold leading-[1.06] tracking-[-0.025em] text-brand-text sm:text-5xl lg:text-[3.55rem]">
              {t.why.titlePrefix}{" "}
              <span className="font-heading font-medium text-brand-navy">Praise Worthy</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted">
              {t.why.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-12 sm:gap-6">
              {t.why.cards.map((reason, index) => (
                <article
                  key={reason.title}
                  className={`rounded-[18px] border border-brand-navy/10 bg-white px-5 py-5 shadow-[0_12px_30px_rgba(8,24,16,0.08)] sm:px-6 ${
                    ["sm:col-span-7", "sm:col-span-5", "sm:col-span-5", "sm:col-span-7"][index]
                  }`}
                >
                  <h3 className="flex items-center gap-3 text-base font-semibold text-brand-text">
                    <span className="h-2.5 w-2.5 shrink-0 rotate-45 bg-brand-orange" aria-hidden="true" />
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-brand-muted">{reason.desc}</p>
                </article>
              ))}
            </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-[20px] shadow-[0_30px_70px_-24px_rgba(8,24,16,0.45)]">
            <div className="relative aspect-[0.83]">
              <Image
                src={withBasePath("/images/brand/founder-ladder.webp")}
                alt={t.images.founderAlt}
                fill
                sizes="(min-width: 1024px) 36vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <span className="pointer-events-none absolute inset-3.5 rounded-[13px] border border-brand-orange/55" aria-hidden="true" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#081810]/90 via-[#081810]/45 to-transparent px-6 pb-5 pt-14 text-sm font-semibold text-brand-surface/90">
              {t.why.cards[0].title} · {t.why.cards[1].title}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
