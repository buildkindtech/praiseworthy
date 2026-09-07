import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobilePhoneButton from "@/components/layout/MobilePhoneButton";
import ChatWidget from "@/components/layout/ChatWidget";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const helpfulLinks = [
  { href: "/", label: "Go to the DFW roofing home page" },
  { href: "/guides/", label: "Browse roofing guides and FAQs" },
  { href: "/north-richland-hills/", label: "See North Richland Hills roofing services" },
];

export default function NotFoundPage() {
  return (
    <LanguageProvider initialLocale="en">
    <>
      <Header />
      <main className="bg-brand-surface pt-28 pb-24">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-brand-navy/8 bg-white px-6 py-10 shadow-[0_18px_40px_rgba(27,54,38,0.08)] sm:px-10">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand-orange">
              404 Page Not Found
            </p>
            <h1 className="font-heading text-4xl font-bold text-brand-text sm:text-5xl">
              This roofing page could not be found
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-brand-muted">
              The page may have moved, the URL may be misspelled, or the resource is no
              longer available. Use one of the links below to continue browsing roof
              inspections, storm damage help, and homeowner guides.
            </p>
            <nav aria-label="Helpful pages" className="mt-8">
              <ul className="grid gap-4 sm:grid-cols-3">
                {helpfulLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center rounded-2xl border border-brand-navy/8 bg-brand-surface px-5 py-4 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </main>
      <Footer />
      <MobilePhoneButton />
      <ChatWidget />
    </>
    </LanguageProvider>
  );
}
