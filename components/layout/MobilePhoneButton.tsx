"use client";

import { Phone } from "lucide-react";
import WeChatQrButton from "@/components/contact/WeChatQrButton";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_HREF = "tel:+16822500078";

export default function MobilePhoneButton() {
  const { t, locale } = useLanguage();

  return (
    <div className="pw-mobile-phone">
      {locale === "zh" ? (
        <WeChatQrButton
          label="微信联系"
          className="pw-mobile-phone__button"
        />
      ) : (
        <a href={PHONE_HREF} className="pw-mobile-phone__button">
          <Phone aria-hidden="true" />
          {t.mobileBar.cta}
        </a>
      )}
    </div>
  );
}
