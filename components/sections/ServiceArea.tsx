"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { GOOGLE_MAPS_URL, SERVICE_AREAS } from "@/lib/seo";
import { cityPagePathsByCity } from "@/lib/city-pages";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ServiceArea() {
  const { t } = useLanguage();

  return (
    <section id="service-area" className="section section-paper bg-brand-surface py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="section-head mb-10 max-w-3xl md:mb-16">
          <p className="kicker mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-navy">
            {t.serviceArea.badge}
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-brand-text md:text-5xl">
            {t.serviceArea.title}
          </h2>
          <p className="section-lede mt-4 max-w-2xl text-lg text-brand-muted">
            {t.serviceArea.description}
          </p>
        </div>

        <ul
          className="city-grid grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          aria-label={t.footer.serviceAreas}
        >
          {SERVICE_AREAS.map((city) => (
            <li key={city} className="min-w-0">
              <Link
                href={cityPagePathsByCity[city]}
                className="group flex min-h-[72px] items-center gap-3 rounded-[18px] border border-brand-navy/8 bg-white px-4 py-4 font-semibold text-brand-navy shadow-[0_8px_24px_-12px_rgba(10,29,20,0.22)] transition duration-300 hover:-translate-y-0.5 hover:border-brand-orange hover:shadow-[0_18px_40px_-20px_rgba(10,29,20,0.3)]"
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-orange transition-transform group-hover:scale-125" />
                <span className="min-w-0 leading-tight">{city}</span>
              </Link>
            </li>
          ))}
        </ul>


        <div className="mt-10 overflow-hidden rounded-[24px] border border-brand-navy/8 bg-white shadow-[0_18px_40px_-20px_rgba(10,29,20,0.3)]">
          <iframe
            title={t.serviceArea.mapCta}
            src="https://www.google.com/maps?q=Praise%20Worthy%20North%20Richland%20Hills%20TX&output=embed"
            className="h-[320px] w-full border-0 md:h-[420px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="city-note mt-8 flex flex-col items-start justify-between gap-4 border-t border-brand-navy/10 pt-6 text-brand-muted sm:flex-row sm:items-center">
          <p>{t.serviceArea.mapDescription}</p>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 font-bold text-brand-navy underline decoration-brand-orange/60 underline-offset-4 hover:decoration-brand-orange"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {t.serviceArea.mapCta}
          </a>
        </div>
      </div>
    </section>
  );
}
