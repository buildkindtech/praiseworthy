"use client";
import Image from "next/image";
import WeChatQrButton from "@/components/contact/WeChatQrButton";
import { LinkButton } from "@/components/ui/link-button";
import { Phone, Calendar, CheckCircle } from "lucide-react";
import { withBasePath } from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_HREF = "tel:+16822500078";
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

export default function FinalCTA() {
  const { t, locale } = useLanguage();
  const ctaHeadlineClass =
    locale === "zh"
      ? "text-3xl sm:text-4xl md:text-[3rem]"
      : locale === "ko"
        ? "text-3xl sm:text-4xl md:text-[3.15rem]"
        : locale === "es"
          ? "text-3xl sm:text-4xl md:text-[3.25rem]"
          : "text-3xl sm:text-4xl md:text-5xl";

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-[#1A2F22] to-[#233A2B]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(249,248,244,0.08),transparent_24%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="text-center lg:text-left">
            <h2 className={`font-heading ${ctaHeadlineClass} font-bold text-white mb-6 leading-[1.06] text-balance`}>
              {t.finalCta.titleLine1}
              <br />
              <span className="text-brand-orange">{t.finalCta.titleHighlight}</span>
            </h2>

            <p className="text-brand-surface/88 text-lg md:text-xl mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed text-pretty">
              {t.finalCta.description}
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 sm:gap-6 mb-8">
              {t.finalCta.bullets.map((bullet) => (
                <div key={bullet} className="flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-4 py-2 text-brand-surface/92 text-sm md:text-base">
                  <CheckCircle className="w-5 h-5 text-brand-orange" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {locale === "zh" ? (
                <WeChatQrButton
                  label="微信联系"
                  size="lg"
                  className="btn-gold rounded-full border border-brand-orange/40 px-10 py-7 text-lg font-bold text-brand-navy animate-pulse-glow"
                />
              ) : (
                <LinkButton
                  href={PHONE_HREF}
                  size="lg"
                  className="btn-gold rounded-full border border-brand-orange/40 text-brand-navy text-lg px-10 py-7 font-bold animate-pulse-glow"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {t.mobileBar.cta}
                </LinkButton>
              )}
              <LinkButton
                href={SCHEDULE_HREF}
                target="_blank"
                rel="noreferrer"
                size="lg"
                className="rounded-full border border-brand-surface/55 bg-brand-surface text-brand-navy hover:bg-brand-amber hover:border-brand-amber text-lg px-10 py-7 font-semibold shadow-[0_16px_34px_rgba(12,24,18,0.22)]"
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t.common.scheduleOnline}
              </LinkButton>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md rounded-[30px] border border-white/10 bg-white/6 p-5 backdrop-blur-sm shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="relative aspect-[6/5] overflow-hidden rounded-[22px] bg-brand-surface/95">
              <Image
                src={withBasePath("/images/brand/cta-yard-sign.webp")}
                alt={t.images.signAlt}
                fill
                sizes="(min-width: 1024px) 448px, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="mt-4 rounded-[20px] border border-white/10 bg-brand-navy/70 px-5 py-4 text-sm text-brand-surface/84">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-brand-surface">Praise Worthy</span>
                <span className="text-brand-orange">{t.roofingLabel}</span>
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.24em] text-brand-surface/68">
                {t.common.craftsmanshipTagline}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
