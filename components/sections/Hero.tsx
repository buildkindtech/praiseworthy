"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Calendar, CheckCircle2, ChevronLeft, ChevronRight, Pause, Phone, Play } from "lucide-react";
import InspectionPreview from "@/components/inspection/InspectionPreview";
import { withBasePath } from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_HREF = "tel:+16822500078";

const notes = {
  en: "Free initial inspection · No obligation · Local DFW service",
  es: "Inspección inicial gratis · Sin compromiso · Servicio local en DFW",
  zh: "免费首次检查 · 无需承担义务 · DFW 本地服务",
  ko: "무료 초기 점검 · 부담 없음 · DFW 지역 서비스",
} as const;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const { t, locale } = useLanguage();
  const guidesHref = locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const carouselSlides = t.hero.slides;
  const slidesLength = carouselSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((previous) => (previous + 1) % slidesLength);
  }, [slidesLength]);

  const previousSlide = useCallback(() => {
    setCurrentSlide((previous) => (previous - 1 + slidesLength) % slidesLength);
  }, [slidesLength]);

  useEffect(() => {
    if (isManuallyPaused || isInteractionPaused) return;

    const timer = window.setInterval(nextSlide, 5000);
    return () => window.clearInterval(timer);
  }, [isInteractionPaused, isManuallyPaused, nextSlide]);

  return (
    <>
      <section className="pw-hero" aria-labelledby="home-hero-title">
        <div className="pw-hero__media">
          <Image
            src={withBasePath("/images/real/hero-roof-inspection.webp")}
            alt={t.images.heroRoofAlt}
            fill
            priority
            sizes="100vw"
            className="pw-hero__image"
          />
          <div className="pw-hero__scrim" aria-hidden="true" />
          <div className="pw-hero__sweep" aria-hidden="true" />
        </div>

        <div className="pw-container pw-hero__grid">
          <div className="pw-hero__content">
            <p className="pw-eyebrow">{t.hero.badge}</p>
            <h1 id="home-hero-title">
              {t.hero.titleLine1}{" "}
              <span className="pw-hero__highlight">{t.hero.titleHighlight}</span>
            </h1>
            <p className="pw-hero__lede">{t.hero.description}</p>

            <div className="pw-hero__actions">
              <a
                className="pw-button pw-button--gold"
                href="#inspection-request-hero"
              >
                <Calendar aria-hidden="true" />
                {t.common.freeInspection}
              </a>
              <a className="pw-button pw-button--ghost" href={PHONE_HREF}>
                <Phone aria-hidden="true" />
                {t.header.callWithNumber}
              </a>
            </div>

            <nav className="pw-hero__links" aria-label="Roofing service links">
              <a href="#services">{t.nav[0]}</a>
              <a href="#service-area">DFW {t.nav[4]}</a>
              <Link href={guidesHref}>{t.header.guidesLabel}</Link>
            </nav>

            <div className="pw-hero__benefits">
              {t.hero.trustSignals.map((signal) => (
                <span key={signal}>
                  <CheckCircle2 aria-hidden="true" />
                  {signal}
                </span>
              ))}
            </div>
            <p className="pw-hero__note">{notes[locale]}</p>
          </div>

          <InspectionPreview locale={locale} instanceId="hero" />
        </div>
      </section>

      {/* Carousel */}
      <div
        className="relative z-10 w-full border-t border-white/10 bg-brand-navy/55 backdrop-blur-md"
        onMouseEnter={() => setIsInteractionPaused(true)}
        onMouseLeave={() => setIsInteractionPaused(false)}
        onFocus={() => setIsInteractionPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsInteractionPaused(false);
          }
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={previousSlide}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-surface/80 hover:text-brand-surface hover:bg-white/10 transition-colors"
              aria-label={t.common.previousSlide}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex-1 text-center min-h-[60px] flex flex-col justify-center">
              <p className="text-white font-heading font-semibold text-base sm:text-lg mb-1">
                {carouselSlides[currentSlide].title}
              </p>
              <p className="text-brand-surface/85 text-sm sm:text-base">
                {carouselSlides[currentSlide].desc}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                onClick={() => setIsManuallyPaused((paused) => !paused)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-surface/80 hover:text-brand-surface hover:bg-white/10 transition-colors"
                aria-label={isManuallyPaused ? t.common.playCarousel : t.common.pauseCarousel}
              >
                {isManuallyPaused ? (
                  <Play className="h-5 w-5" />
                ) : (
                  <Pause className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={nextSlide}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-surface/80 hover:text-brand-surface hover:bg-white/10 transition-colors"
                aria-label={t.common.nextSlide}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {carouselSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`box-content h-2.5 rounded-full bg-clip-content p-1.5 transition-[width,background-color] ${
                  i === currentSlide
                    ? "w-7 bg-brand-orange"
                    : "w-2.5 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`${t.common.goToSlide} ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
}
