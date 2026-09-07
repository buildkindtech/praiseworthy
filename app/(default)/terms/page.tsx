import type { Metadata } from "next";
import { TERMS_PATH, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Website Terms and Roofing Requests | Praise Worthy",
  description:
    "Review the terms for using the Praise Worthy website and submitting roofing inspection requests, including service scope, accuracy, and follow-up details.",
  alternates: {
    canonical: absoluteUrl(TERMS_PATH),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-surface px-4 py-24 text-brand-text">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange">
            Praise Worthy
          </p>
          <h1 className="font-heading text-4xl font-bold text-brand-navy">Terms of Service</h1>
          <p className="text-base leading-7 text-brand-text/76">
            These terms explain how visitors may use the Praise Worthy website and how
            inspection requests submitted through the site are handled.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">
            Website Use
          </h2>
          <p className="leading-7 text-brand-text/80">
            The information on this site is provided for general homeowner education and to
            help visitors request inspections or contact Praise Worthy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">
            Service Requests
          </h2>
          <p className="leading-7 text-brand-text/80">
            Submitting a contact form or calling through the website does not create a
            binding service contract. Scope, pricing, scheduling, and warranty details are
            confirmed separately with each homeowner.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">Accuracy</h2>
          <p className="leading-7 text-brand-text/80">
            We work to keep the information on this website accurate and up to date, but
            service availability, timelines, and offers may change.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">Contact</h2>
          <p className="leading-7 text-brand-text/80">
            Questions about these terms can be directed to Praise Worthy using the contact
            information shown on the website.
          </p>
        </section>
      </div>
    </main>
  );
}
