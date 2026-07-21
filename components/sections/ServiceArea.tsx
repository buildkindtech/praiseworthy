"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import { MapPin, CheckCircle } from "lucide-react";
import { useInView } from "@/lib/hooks";
import { BUSINESS_NAME, GOOGLE_MAPS_URL, withBasePath } from "@/lib/seo";
import { cityNames } from "@/lib/i18n";
import { cityPagePathsByCity } from "@/lib/city-pages";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function ServiceArea() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const { t } = useLanguage();
  const cities = cityNames.map((name, index) => ({ name, primary: index < 3 }));

  return (
    <section id="service-area" className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <Badge className="mb-4 rounded-full bg-brand-navy/8 text-brand-navy border-brand-navy/12">
            <MapPin className="w-3 h-3 mr-1" />
            {t.serviceArea.badge}
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-4">
            {t.serviceArea.title}
          </h2>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            {t.serviceArea.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* City Grid */}
          <div
            className={`space-y-4 ${
              isInView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <div className="overflow-hidden rounded-[28px] border border-brand-navy/8 bg-brand-surface shadow-[0_18px_40px_rgba(27,54,38,0.08)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src={withBasePath("/images/brand/service-truck.webp")}
                  alt={t.images.truckAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.map((city, index) => (
                <Link
                  key={city.name}
                  href={cityPagePathsByCity[city.name]}
                  className={`flex min-h-[72px] items-center gap-2 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    city.primary
                      ? "bg-brand-navy text-brand-surface shadow-md"
                      : "bg-brand-surface text-brand-text shadow-sm hover:shadow-md"
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <CheckCircle
                    className={`h-4 w-4 shrink-0 ${
                      city.primary ? "text-brand-amber" : "text-brand-success"
                    }`}
                  />
                  <div className="min-w-0">
                    <span className="block font-medium text-sm">{city.name}</span>
                    <span
                      className={`block text-[11px] uppercase tracking-[0.2em] ${
                        city.primary ? "text-brand-surface/84" : "text-brand-muted"
                      }`}
                    >
                      {t.common.homeowner} {t.roofingLabel}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Map Embed */}
          <div
            className={`rounded-[28px] overflow-hidden border border-brand-navy/8 shadow-[0_18px_40px_rgba(27,54,38,0.08)] ${
              isInView ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            <iframe
              src="https://www.google.com/maps?q=Praise%20Worthy%20North%20Richland%20Hills%20TX&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${BUSINESS_NAME} Google Maps profile and service area`}
              className="w-full"
            />
            <div className="bg-brand-surface px-5 py-4 border-t border-brand-navy/10">
              <p className="text-sm text-brand-muted mb-3">
                {t.serviceArea.mapDescription}
              </p>
              <LinkButton
                href={GOOGLE_MAPS_URL}
                className="rounded-full bg-brand-navy hover:bg-brand-navy/92 text-brand-surface"
              >
                {t.serviceArea.mapCta}
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
