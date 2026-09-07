"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function FAQ() {
  const { t } = useLanguage();
  const faqs = t.faq.items.map(([question, answer]) => ({ question, answer }));

  return (
    <section id="faq" className="section section-stone bg-brand-surface py-16 md:py-24">
      <div className="container container-narrow mx-auto max-w-3xl px-6">
        <div className="section-head mb-10 max-w-2xl md:mb-12">
          <h2 className="font-heading text-3xl font-semibold leading-tight text-brand-text md:text-5xl">
            {t.faq.titleLine1} <span className="font-serif font-semibold text-brand-orange">{t.faq.titleLine2}</span>
          </h2>
          <p className="section-lede mt-4 text-lg text-brand-muted">{t.faq.description}</p>
        </div>

        <div className="faq-list grid gap-3.5">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="faq-item group rounded-[18px] border border-brand-navy/8 bg-white shadow-[0_8px_24px_-12px_rgba(10,29,20,0.22)] transition hover:border-brand-orange/50"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 font-heading text-base font-semibold text-brand-navy marker:hidden md:text-lg [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span className="faq-marker relative h-8 w-8 shrink-0 rounded-full bg-brand-orange/15 transition group-open:rotate-45 group-open:bg-brand-orange" aria-hidden="true">
                  <span className="absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 bg-brand-navy" />
                  <span className="absolute left-1/2 top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-brand-navy" />
                </span>
              </summary>
              <div className="faq-body px-6 pb-6 pr-16">
                <p className="leading-relaxed text-brand-muted">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            }),
          }}
        />
      </div>
    </section>
  );
}
