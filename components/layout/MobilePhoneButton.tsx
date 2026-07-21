"use client";

import { Phone } from "lucide-react";
import WeChatQrButton from "@/components/contact/WeChatQrButton";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_HREF = "tel:+16822500078";

export default function MobilePhoneButton() {
  const { t, locale } = useLanguage();
  const mobileCtaClass =
    locale === "zh"
      ? "text-base"
      : locale === "ko"
        ? "text-[1rem]"
        : locale === "es"
          ? "text-[0.95rem]"
          : "text-lg";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {locale === "zh" ? (
        <WeChatQrButton
          label="微信联系"
          className={`h-auto w-full rounded-none bg-gradient-to-r from-brand-amber via-brand-orange to-brand-orange py-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-brand-navy shadow-[0_-8px_22px_rgba(17,33,24,0.2)] hover:brightness-105 ${mobileCtaClass}`}
        />
      ) : (
        <a
          href={PHONE_HREF}
          className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-amber via-brand-orange to-brand-orange hover:brightness-105 text-brand-navy font-bold ${mobileCtaClass} py-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-center leading-tight shadow-[0_-8px_22px_rgba(17,33,24,0.2)] transition-[filter]`}
        >
          <Phone className="h-5 w-5 animate-pulse" />
          {t.mobileBar.cta}
        </a>
      )}
    </div>
  );
}
