"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Facebook, Instagram } from "lucide-react";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_E164,
  FACEBOOK_URL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  PRIVACY_POLICY_PATH,
  SERVICE_AREAS,
  TERMS_PATH,
  withBasePath,
} from "@/lib/seo";
import { cityPagePathsByCity } from "@/lib/city-pages";
import { useLanguage } from "@/components/providers/LanguageProvider";

function normalizePathname(path: string | null) {
  const value = path ?? "/";
  return value.length > 1 ? value.replace(/\/+$/, "") : value;
}

export default function Footer() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const homeHref = locale === "en" ? "/" : `/${locale}/`;
  const guidesHref = locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const isHomePage = normalizePathname(pathname) === normalizePathname(homeHref);
  const sectionHashes = ["#services", "#why-us", "#projects", "#reviews", "#service-area", "#faq"];
  const sectionLinks = t.nav.map((label, index) => ({
    label,
    href: isHomePage ? sectionHashes[index] : `${homeHref}${sectionHashes[index]}`,
  }));
  const quickLinks = [sectionLinks[0], { label: t.header.guidesLabel, href: guidesHref }, ...sectionLinks.slice(1)];
  const socialLinks = [
    { href: FACEBOOK_URL, label: "Facebook", icon: Facebook },
    { href: INSTAGRAM_URL, label: "Instagram", icon: Instagram },
  ].filter((item) => item.href);
  const backToTopLabel = {
    en: "Back to top",
    es: "Volver arriba",
    zh: "返回顶部",
    ko: "맨 위로",
  }[locale];

  return (
    <footer className="site-footer bg-[#0a1d14] py-12 text-brand-surface md:py-16">
      <div className="container footer-grid mx-auto grid max-w-7xl gap-9 px-6 sm:grid-cols-2 lg:grid-cols-[1.05fr_0.9fr_0.9fr_1.6fr]">
        <div className="footer-brand">
          <div className="relative h-16 w-44">
            <Image
              src={withBasePath("/brand-logo.svg")}
              alt={`${BUSINESS_NAME} wordmark`}
              fill
              sizes="176px"
              className="object-contain object-left brightness-0 invert"
            />
          </div>
          <p className="mt-3 font-heading font-medium text-brand-amber">{t.common.craftsmanshipTagline}</p>
          {socialLinks.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 p-2 text-brand-surface/72 transition hover:border-brand-amber hover:text-brand-amber"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="footer-col">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-amber">{t.footer.getStarted}</h3>
          <ul className="mt-4 grid gap-2.5 text-sm text-brand-surface/72">
            <li><a className="hover:text-brand-amber" href={`tel:${BUSINESS_PHONE_E164}`}>{BUSINESS_PHONE}</a></li>
            <li className="break-all"><a className="hover:text-brand-amber" href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a></li>
            <li>North Richland Hills, TX</li>
            <li>{t.footer.hours}</li>
            <li><a className="hover:text-brand-amber" href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer">{t.footer.mapLabel}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-amber">{t.footer.quickLinks}</h3>
          <ul className="mt-4 grid gap-2.5 text-sm text-brand-surface/72">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-brand-amber">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-amber">{t.footer.serviceAreas}</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 text-sm text-brand-surface/72">
            {SERVICE_AREAS.map((city) => (
              <li key={city}>
                <Link href={cityPagePathsByCity[city]} className="transition hover:text-brand-amber">{city}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer-bottom mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-white/12 px-6 pt-6 text-xs text-brand-surface/52 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME} {t.footer.rightsReserved}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href={PRIVACY_POLICY_PATH} className="hover:text-brand-amber">{t.footer.privacyPolicy}</Link>
          <Link href={TERMS_PATH} className="hover:text-brand-amber">{t.footer.termsOfService}</Link>
          <a href="#top" className="back-to-top hover:text-brand-amber">{backToTopLabel} ↑</a>
        </div>
      </div>
    </footer>
  );
}
