"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Calendar, Menu, Phone } from "lucide-react";
import WeChatQrButton from "@/components/contact/WeChatQrButton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { locales } from "@/lib/i18n";
import { withBasePath } from "@/lib/seo";
import { useLanguage } from "@/components/providers/LanguageProvider";

const PHONE_NUMBER = "682-250-0078";
const PHONE_HREF = "tel:+16822500078";
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

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

  if (!hasLocalePrefix) return nextLocale === "en" ? "/" : `/${nextLocale}/`;

  const rest = segments.slice(1);
  if (nextLocale === "en") return rest.length > 0 ? `/${rest.join("/")}` : "/";
  return rest.length > 0 ? `/${nextLocale}/${rest.join("/")}` : `/${nextLocale}/`;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const homeHref = locale === "en" ? "/" : `/${locale}/`;
  const guidesHref = locale === "en" ? "/guides/" : `/${locale}/guides/`;
  const isHomePage = normalizePathname(pathname) === normalizePathname(homeHref);
  const hasCityForm = ["/north-richland-hills", "/fort-worth"].includes(normalizePathname(pathname));
  const requestHref = hasCityForm ? "#inspection-request-city" : `${isHomePage ? "" : homeHref}#inspection-request-hero`;
  const isOverlay = isHomePage && !scrolled && !open;
  const sectionHashes = [
    "#services",
    "#why-us",
    "#projects",
    "#reviews",
    "#service-area",
    "#faq",
  ];
  const sectionLinks = t.nav.map((label, index) => ({
    label,
    href: isHomePage ? sectionHashes[index] : `${homeHref}${sectionHashes[index]}`,
  }));
  const navLinks = [
    sectionLinks[0],
    sectionLinks[1],
    sectionLinks[2],
    sectionLinks[3],
    sectionLinks[4],
    { label: t.header.guidesLabel, href: guidesHref },
    sectionLinks[5],
  ];

  const handleLocaleChange = (nextLocale: (typeof locales)[number]) => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    setLocale(nextLocale);
    setOpen(false);
    router.push(withOptionalHash(getLocaleDestination(pathname, nextLocale), hash));
  };

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 40);
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="pw-scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <header className={`pw-site-header ${isOverlay ? "is-overlay" : "is-solid"}`}>
        <div className="pw-nav-inner">
          <Link href={homeHref} className="pw-nav-brand" aria-label="Praise Worthy Roofing home">
            <Image
              src={withBasePath("/brand-logo.svg")}
              alt="Praise Worthy Roofing"
              width={172}
              height={54}
              priority
            />
          </Link>

          <nav className="pw-nav-links" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pw-nav-actions">
            <div className="pw-desktop-language" aria-label="Language">
              {locales.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => handleLocaleChange(code)}
                  className={locale === code ? "is-active" : ""}
                  aria-current={locale === code ? "true" : undefined}
                >
                  {code === "zh" ? "中文" : code === "ko" ? "한국어" : code.toUpperCase()}
                </button>
              ))}
            </div>
            {locale === "zh" && (
              <WeChatQrButton
                label="微信"
                size="sm"
                className="h-10 rounded-full border border-brand-orange/45 bg-white/88 px-4 font-bold text-brand-navy hover:bg-white"
              />
            )}
            <a className="pw-nav-phone" href={PHONE_HREF} aria-label={t.header.callWithNumber}>
              <Phone aria-hidden="true" />
              {PHONE_NUMBER}
            </a>
            <a
              className="pw-nav-cta"
              href={requestHref}
            >
              <Calendar aria-hidden="true" />
              {t.common.freeInspection}
            </a>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="pw-nav-toggle" aria-label={t.header.menuLabel}>
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(88vw,340px)] border-l-brand-orange/25 bg-[#faf8f3] p-0">
              <div className="pw-mobile-menu">
                <div className="pw-mobile-menu__brand">
                  <Image
                    src={withBasePath("/brand-logo.svg")}
                    alt="Praise Worthy Roofing"
                    width={176}
                    height={56}
                  />
                </div>
                <div className="pw-language-switcher" aria-label="Language">
                  {locales.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => handleLocaleChange(code)}
                      className={locale === code ? "is-active" : ""}
                      aria-current={locale === code ? "true" : undefined}
                    >
                      {code === "zh" ? "中文" : code === "ko" ? "한국어" : code.toUpperCase()}
                    </button>
                  ))}
                </div>
                <nav className="pw-mobile-menu__links" aria-label="Mobile navigation">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                {locale === "zh" ? (
                  <WeChatQrButton label="微信联系" className="pw-mobile-menu__cta" />
                ) : (
                  <a className="pw-mobile-menu__cta" href={PHONE_HREF}>
                    <Phone aria-hidden="true" />
                    {t.common.call} {PHONE_NUMBER}
                  </a>
                )}
                <a
                  className="pw-mobile-menu__schedule"
                  href={SCHEDULE_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar aria-hidden="true" />
                  {t.common.scheduleOnline}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}
