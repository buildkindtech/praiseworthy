"use client";

import Image from "next/image";
import { Calendar, Mail, Phone } from "lucide-react";
import WeChatQrButton from "@/components/contact/WeChatQrButton";
import InspectionPreview from "@/components/inspection/InspectionPreview";
import { LinkButton } from "@/components/ui/link-button";
import { BUSINESS_EMAIL, BUSINESS_PHONE, withBasePath } from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_HREF = "tel:+16822500078";
export default function FinalCTA() {
  const { t, locale } = useLanguage();

  return (
    <section id="contact" className="section cta-band bg-brand-navy py-16 text-white md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="cta-inner grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-start lg:gap-16">
          <div className="cta-copy">
            <h2 className="font-heading text-3xl font-semibold leading-tight text-white md:text-5xl">
              {t.finalCta.titleLine1}{" "}
              <span className="font-serif font-semibold text-brand-orange">{t.finalCta.titleHighlight}</span>
            </h2>
            <p className="section-lede mt-5 max-w-2xl text-lg leading-relaxed text-brand-surface/80">
              {t.finalCta.description}
            </p>

            <div className="hero-ctas mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <LinkButton
                href="#inspection-request-contact"
                size="lg"
                className="btn btn-gold btn-lg rounded-full border border-brand-orange/35 bg-brand-orange px-8 py-6 font-bold text-brand-navy shadow-[0_10px_30px_-10px_rgba(193,154,91,0.65)] hover:bg-brand-amber"
              >
                <Calendar className="mr-2 h-5 w-5" aria-hidden="true" />
                {t.common.freeInspection}
              </LinkButton>
              {locale === "zh" ? (
                <WeChatQrButton
                  label="微信联系"
                  size="lg"
                  className="btn btn-ghost btn-lg rounded-full border border-white/45 bg-white/6 px-8 py-6 font-bold text-white hover:bg-white/14"
                />
              ) : (
                <LinkButton
                  href={PHONE_HREF}
                  size="lg"
                  className="btn btn-ghost btn-lg rounded-full border border-white/45 bg-white/6 px-8 py-6 font-bold text-white hover:bg-white/14"
                >
                  <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t.mobileBar.cta}
                </LinkButton>
              )}
              <LinkButton
                href={`mailto:${BUSINESS_EMAIL}`}
                size="lg"
                className="btn btn-ghost btn-lg rounded-full border border-white/45 bg-white/6 px-8 py-6 font-bold text-white hover:bg-white/14"
              >
                <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                {BUSINESS_EMAIL}
              </LinkButton>
            </div>

            <ul className="cta-details mt-8 grid gap-3 border-t border-white/12 pt-6 text-sm text-brand-surface/76 sm:grid-cols-3">
              <li><strong className="block text-brand-amber">{t.common.call}</strong>{BUSINESS_PHONE}</li>
              <li><strong className="block text-brand-amber">{t.footer.hours}</strong></li>
              <li><strong className="block text-brand-amber">{t.footer.serviceAreas}</strong>North Richland Hills · DFW</li>
            </ul>

            <figure className="cta-media relative mt-8 overflow-hidden rounded-[18px] border border-white/10 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)]">
              <div className="relative h-60">
                <Image
                  src={withBasePath("/images/real/cta-shingle-closeup.webp")}
                  alt={t.images.ctaAlt}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </figure>
          </div>

          <InspectionPreview locale={locale} instanceId="contact" />
        </div>
      </div>
    </section>
  );
}
