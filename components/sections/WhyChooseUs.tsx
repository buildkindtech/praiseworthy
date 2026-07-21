"use client";
import Image from "next/image";
import { useRef } from "react";
import { MapPin, Search, CloudLightning, MessageSquare } from "lucide-react";
import { useInView } from "@/lib/hooks";
import { withBasePath } from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const { t } = useLanguage();
  const reasons = [
    { icon: MapPin, ...t.why.cards[0] },
    { icon: Search, ...t.why.cards[1] },
    { icon: CloudLightning, ...t.why.cards[2] },
    { icon: MessageSquare, ...t.why.cards[3] },
  ];

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-brand-surface" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-4">
            {t.why.titlePrefix}{" "}
            <span className="text-brand-navy">Praise Worthy</span>
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            {t.why.description}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {reasons.map((reason, index) => (
              <div
                key={reason.title}
                className={`group flex h-full flex-col rounded-[28px] border border-brand-navy/8 bg-white p-6 shadow-[0_16px_36px_rgba(27,54,38,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_46px_rgba(27,54,38,0.1)] ${
                  isInView ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-brand-navy/8 flex items-center justify-center group-hover:bg-brand-navy transition-all duration-300">
                    <reason.icon className="w-7 h-7 text-brand-navy group-hover:text-brand-surface transition-colors" />
                  </div>
                  <div className="text-right">
                    <span className="block text-3xl font-bold text-brand-orange">
                      {reason.stat}
                    </span>
                    <span className="block text-[11px] text-brand-muted uppercase tracking-[0.24em] mt-1">
                      {reason.statLabel}
                    </span>
                  </div>
                </div>

                <h3 className="font-heading text-lg font-bold text-brand-text mb-2">
                  {reason.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed mt-auto">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`rounded-[32px] border border-brand-navy/10 bg-brand-navy p-6 text-brand-surface shadow-[0_26px_60px_rgba(17,33,24,0.18)] ${
              isInView ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "180ms" }}
          >
            <div className="mb-5 overflow-hidden rounded-[24px] bg-brand-surface/6">
              <div className="relative aspect-[5/4]">
                <Image
                  src={withBasePath("/images/brand/founder-ladder.webp")}
                  alt={t.images.founderAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.28em] text-brand-orange/90 mb-3">
              Praise Worthy
            </p>
            <h3 className="font-heading text-2xl font-bold mb-3">{t.why.description}</h3>
            <div className="space-y-3 text-brand-surface/86 leading-relaxed">
              {reasons.slice(0, 3).map((reason) => (
                <div key={reason.title} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-orange" />
                  <span>{reason.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
