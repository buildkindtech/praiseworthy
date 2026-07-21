"use client";
import Image from "next/image";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/link-button";
import {
  CheckCircle,
  Phone,
  ArrowRight,
  CloudHail,
  Wind,
  Layers,
  Droplets,
} from "lucide-react";
import { useInView } from "@/lib/hooks";
import { withBasePath } from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_HREF = "tel:+16822500078";

export default function FreeInspection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const { t, locale } = useLanguage();
  const inspectionHeadlineClass =
    locale === "zh"
      ? "text-3xl md:text-[2.6rem]"
      : locale === "ko"
        ? "text-3xl md:text-[2.7rem]"
        : locale === "es"
          ? "text-3xl md:text-[2.75rem]"
          : "text-3xl md:text-4xl";
  const inspectionItems = [
    { icon: CloudHail, label: t.inspection.items[0] },
    { icon: Wind, label: t.inspection.items[1] },
    { icon: Layers, label: t.inspection.items[2] },
    { icon: Droplets, label: t.inspection.items[3] },
  ];

  return (
    <section id="free-inspection" className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div
            className={`${isInView ? "animate-slide-in-left" : "opacity-0"}`}
          >
            <Badge className="mb-4 rounded-full bg-brand-navy/8 text-brand-navy border-brand-navy/12">
              {t.inspection.badge}
            </Badge>
            <h2 className={`font-heading ${inspectionHeadlineClass} font-bold text-brand-text mb-6 leading-[1.1] text-balance`}>
              {t.inspection.titleLine1}
              <br />
              <span className="text-brand-navy">{t.inspection.titleHighlight}</span>
            </h2>
            <p className="text-brand-muted text-lg mb-8 leading-relaxed text-pretty">
              {t.inspection.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {inspectionItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-brand-surface hover:bg-brand-orange/8 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-navy/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-navy" />
                  </div>
                  <span className="font-medium text-brand-text">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <LinkButton
                href={PHONE_HREF}
                size="lg"
                className="btn-gold rounded-full border border-brand-orange/40 text-brand-navy font-bold text-base"
              >
                <Phone className="h-5 w-5 mr-2" />
                {t.inspection.primaryCta}
              </LinkButton>
              <LinkButton
                href="#service-area"
                size="lg"
                variant="outline"
                className="rounded-full border-brand-navy/18 text-brand-navy hover:bg-brand-navy/5 font-semibold"
              >
                {t.inspection.secondaryCta}
                <ArrowRight className="h-4 w-4 ml-2" />
              </LinkButton>
            </div>
          </div>

          {/* Right: Visual */}
          <div
            className={`relative ${
              isInView ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "200ms" }}
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl aspect-[4/3] border border-brand-navy/8 bg-brand-surface">
              <Image
                src={withBasePath("/images/brand/embroidered-shirt.webp")}
                alt={t.images.shirtAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/78 via-brand-navy/28 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-brand-success" />
                  <span className="font-semibold">
                    {t.inspection.visualCaption}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-brand-orange text-brand-navy rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-xl">
              <span className="text-2xl font-bold">{t.inspection.floatingTop}</span>
              <span className="text-xs">{t.inspection.floatingBottom}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
