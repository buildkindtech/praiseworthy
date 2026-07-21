"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import WeChatQrButton from "@/components/contact/WeChatQrButton";
import { LinkButton } from "@/components/ui/link-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Phone, Menu } from "lucide-react";
import { locales } from "@/lib/i18n";
import { withBasePath } from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_NUMBER = "682-250-0078";
const PHONE_HREF = "tel:+16822500078";

function withOptionalHash(path: string, hash: string) {
  return hash ? `${path}${hash}` : path;
}

function normalizePathname(path: string | null) {
  const value = path ?? "/";
  return value.length > 1 ? value.replace(/\/+$/, "") : value;
}

function getLocaleDestination(
  currentPath: string | null,
  nextLocale: (typeof locales)[number],
) {
  const segments = (currentPath ?? "/").split("/").filter(Boolean);
  const hasLocalePrefix =
    segments[0] && locales.includes(segments[0] as (typeof locales)[number]);

  if (!hasLocalePrefix) {
    return nextLocale === "en" ? "/" : `/${nextLocale}/`;
  }

  const rest = segments.slice(1);
  if (nextLocale === "en") {
    return rest.length > 0 ? `/${rest.join("/")}` : "/";
  }

  return rest.length > 0 ? `/${nextLocale}/${rest.join("/")}` : `/${nextLocale}/`;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
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
  const navLinks = [
    sectionLinks[0],
    { label: t.header.guidesLabel, href: guidesHref },
    ...sectionLinks.slice(1),
  ];

  const handleLocaleChange = (nextLocale: (typeof locales)[number]) => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    setLocale(nextLocale);
    setOpen(false);
    router.push(withOptionalHash(getLocaleDestination(pathname, nextLocale), hash));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-surface/97 backdrop-blur-md shadow-[0_18px_40px_rgba(17,33,24,0.12)] border-b border-brand-navy/10"
          : "bg-brand-surface/92 backdrop-blur-sm border-b border-brand-navy/6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center gap-3 shrink-0" aria-label="Go to homepage">
            <div className="relative h-12 w-[166px] sm:h-14 sm:w-[196px]">
              <Image
                src={withBasePath("/images/brand/praiseworthy-wordmark.webp")}
                alt="Praise Worthy Roofing brand wordmark"
                fill
                sizes="(min-width: 640px) 196px, 166px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-brand-navy/8 bg-white/40 px-2 py-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-brand-text hover:text-brand-navy transition-colors rounded-full hover:bg-brand-navy/6"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <div className="hidden xl:flex items-center rounded-full border border-brand-navy/12 bg-white/70 p-1 shadow-sm">
              {locales.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLocaleChange(code)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    locale === code
                      ? "bg-brand-navy text-brand-surface shadow-sm"
                      : "text-brand-navy hover:bg-brand-navy/8"
                  }`}
                >
                  {code === "zh" ? "中文" : code === "ko" ? "한국어" : code.toUpperCase()}
                </button>
              ))}
            </div>
            {locale === "zh" && (
              <WeChatQrButton
                label="微信联系"
                size="sm"
                className="rounded-full border border-brand-navy/12 bg-white/70 px-4 text-brand-navy hover:bg-brand-navy/8"
                variant="outline"
              />
            )}
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 rounded-full px-2 py-2 text-sm font-semibold text-brand-navy hover:text-brand-text transition-colors"
              aria-label={t.header.callWithNumber}
            >
              <Phone className="h-4 w-4" />
              {PHONE_NUMBER}
            </a>
            <LinkButton
              href="#free-inspection"
              className="btn-gold rounded-full border border-brand-orange/45 px-5 text-brand-navy font-semibold"
            >
              {t.common.freeInspection}
            </LinkButton>
          </div>

          {/* Mobile: Phone + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {locale === "zh" ? (
              <WeChatQrButton
                label="微信"
                size="sm"
                className="btn-gold h-10 rounded-full border border-brand-orange/45 px-4 text-brand-navy font-semibold"
              />
            ) : (
              <LinkButton
                href={PHONE_HREF}
                size="sm"
                className="btn-gold h-10 rounded-full border border-brand-orange/45 px-4 text-brand-navy font-semibold"
              >
                <Phone className="h-4 w-4 mr-1" />
                {t.common.call}
              </LinkButton>
            )}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-brand-navy/8 transition-colors">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-brand-surface">
                <div className="flex flex-col gap-1 mt-8">
                  <div className="px-4 pb-3">
                    <div className="relative h-14 w-[200px]">
                      <Image
                        src={withBasePath("/images/brand/praiseworthy-wordmark.webp")}
                        alt="Praise Worthy Roofing brand wordmark"
                        fill
                        sizes="200px"
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2 px-4">
                    {locales.map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => handleLocaleChange(code)}
                        className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                          locale === code
                            ? "border-brand-navy bg-brand-navy text-brand-surface shadow-sm"
                            : "border-brand-navy/20 text-brand-navy hover:bg-brand-navy/6"
                        }`}
                      >
                        {code === "zh" ? "中文" : code === "ko" ? "한국어" : code.toUpperCase()}
                      </button>
                  ))}
                </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 text-base font-medium text-brand-text hover:text-brand-navy hover:bg-brand-navy/6 rounded-xl transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t mt-4 pt-4">
                    {locale === "zh" ? (
                      <WeChatQrButton
                        label="微信联系"
                        className="btn-gold h-12 w-full rounded-full border border-brand-orange/45 font-semibold text-brand-navy"
                      />
                    ) : (
                      <LinkButton
                        href={PHONE_HREF}
                        className="btn-gold h-12 w-full rounded-full border border-brand-orange/45 text-brand-navy font-semibold"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {t.common.call} {PHONE_NUMBER}
                      </LinkButton>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
