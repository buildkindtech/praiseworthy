import type { Metadata } from "next";
import { PRIVACY_POLICY_PATH, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy for Homeowner Requests | Praise Worthy",
  description:
    "Read how Praise Worthy handles contact details submitted for roofing questions and inspection requests, including how information is used and protected.",
  alternates: {
    canonical: absoluteUrl(PRIVACY_POLICY_PATH),
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-brand-surface px-4 py-24 text-brand-text">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-orange">
            Praise Worthy
          </p>
          <h1 className="font-heading text-4xl font-bold text-brand-navy">Privacy Policy</h1>
          <p className="text-base leading-7 text-brand-text/76">
            We use the information you share with us to respond to inspection requests,
            schedule follow-up conversations, and improve the homeowner experience on this
            website.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">
            Information We Collect
          </h2>
          <p className="leading-7 text-brand-text/80">
            When you contact Praise Worthy, we may collect your name, phone number, email
            address, property location, and any details you choose to share about your roof
            or storm damage concerns.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">
            How We Use Information
          </h2>
          <p className="leading-7 text-brand-text/80">
            We use that information to answer questions, schedule inspections, provide
            service updates, and follow up about roofing work you requested. We do not sell
            your personal information.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">
            Website Analytics
          </h2>
          <p className="leading-7 text-brand-text/80">
            Like many websites, we may use basic analytics and log data to understand how
            visitors use the site and which pages are most helpful.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl font-semibold text-brand-navy">Contact</h2>
          <p className="leading-7 text-brand-text/80">
            If you have questions about this policy, contact Praise Worthy through the phone
            number or email address listed on the website.
          </p>
        </section>
      </div>
    </main>
  );
}
