"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { LinkButton } from "@/components/ui/link-button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
} from "lucide-react";
import {
  BUSINESS_EMAIL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_PHONE_E164,
  GOOGLE_MAPS_URL,
  PRIVACY_POLICY_PATH,
  TERMS_PATH,
  withBasePath,
} from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cityNames } from "@/lib/i18n";
import { cityPagePathsByCity } from "@/lib/city-pages";

const PHONE_NUMBER = BUSINESS_PHONE;
const PHONE_HREF = `tel:${BUSINESS_PHONE_E164}`;

function normalizePathname(path: string | null) {
  const value = path ?? "/";
  return value.length > 1 ? value.replace(/\/+$/, "") : value;
}

export default function Footer() {
  const pathname = usePathname();
  const { locale, t } = useLanguage();
  const homeHref = locale === "en" ? "/" : `/${locale}/`;
  const guidesHref = locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const currentPath = normalizePathname(pathname);
  const normalizedHomeHref = normalizePathname(homeHref);
  const isHomePage = currentPath === normalizedHomeHref;
  const sectionHashes = [
    "#free-inspection",
    "#why-choose-us",
    "#before-after",
    "#testimonials",
    "#service-area",
    "#faq",
  ];
  const sectionLinks = t.nav.map((label, index) => ({
    label,
    href: isHomePage ? sectionHashes[index] : `${homeHref}${sectionHashes[index]}`,
  }));
  const quickLinks = [
    sectionLinks[0],
    { label: t.header.guidesLabel, href: guidesHref },
    ...sectionLinks.slice(1),
  ];
  const serviceAreas = [...cityNames].slice(0, 6);
  const socialLinks = [
    { href: FACEBOOK_URL, label: "Facebook", icon: Facebook },
    { href: INSTAGRAM_URL, label: "Instagram", icon: Instagram },
  ].filter((item) => item.href);

  return (
    <footer className="bg-brand-navy text-brand-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1">
            <div className="relative mb-5 h-14 w-[184px]">
              <Image
                src={withBasePath("/images/brand/praiseworthy-wordmark.webp")}
                alt="Praise Worthy Roofing brand wordmark"
                fill
                sizes="184px"
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <div className="space-y-3 text-sm text-brand-surface/82">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>North Richland Hills, TX</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a href={PHONE_HREF} className="hover:text-brand-orange transition-colors">
                  {PHONE_NUMBER}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${BUSINESS_EMAIL}`}
                  className="hover:text-brand-orange transition-colors"
                >
                  {BUSINESS_EMAIL}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{t.footer.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  {t.footer.mapLabel}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-surface/82 hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">
              {t.footer.serviceAreas}
            </h3>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <Link
                    href={cityPagePathsByCity[area]}
                    className="text-sm text-brand-surface/82 hover:text-brand-orange transition-colors"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">
              {t.footer.getStarted}
            </h3>
            <p className="text-sm text-brand-surface/82 mb-4">
              {t.footer.getStartedDescription}
            </p>
            <LinkButton
              href={PHONE_HREF}
              className="btn-gold w-full rounded-full border border-brand-orange/40 text-brand-navy font-semibold"
            >
              <Phone className="h-4 w-4 mr-2" />
              {t.common.freeInspection}
            </LinkButton>
            {socialLinks.length > 0 && (
              <div className="flex gap-3 mt-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-full bg-white/8 hover:bg-white/14 transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-white/12 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-surface/52">
            &copy; {new Date().getFullYear()} {BUSINESS_NAME} {t.footer.rightsReserved}
          </p>
          <div className="flex gap-4">
            <Link
              href={PRIVACY_POLICY_PATH}
              className="text-xs text-brand-surface/52 hover:text-brand-orange transition-colors"
            >
              {t.footer.privacyPolicy}
            </Link>
            <Link
              href={TERMS_PATH}
              className="text-xs text-brand-surface/52 hover:text-brand-orange transition-colors"
            >
              {t.footer.termsOfService}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
