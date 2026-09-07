"use client";

import { testimonialBase } from "@/lib/i18n";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Testimonials() {
  const { t, locale } = useLanguage();
  const testimonials = testimonialBase.map((item, index) => ({
    ...item,
    content: t.testimonials.reviews[index],
  }));
  const ratingLabels = {
    en: (rating: number) => `${rating} out of 5 stars`,
    es: (rating: number) => `${rating} de 5 estrellas`,
    zh: (rating: number) => `5 星中的 ${rating} 星`,
    ko: (rating: number) => `별점 5점 중 ${rating}점`,
  };

  return (
    <section id="reviews" className="section section-stone bg-brand-surface py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="section-head mb-10 max-w-3xl md:mb-16">
          <p className="kicker mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-navy">
            {t.nav[3]}
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-brand-text md:text-5xl">
            {t.testimonials.title}
          </h2>
          <p className="section-lede mt-4 max-w-2xl text-lg text-brand-muted">
            {t.testimonials.description}
          </p>
        </div>

        <div className="card-grid card-grid-3 review-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="review flex min-h-full flex-col rounded-[18px] border border-brand-navy/8 border-b-4 border-b-transparent bg-white p-7 shadow-[0_8px_24px_-12px_rgba(10,29,20,0.22)] transition duration-300 hover:-translate-y-1 hover:border-b-brand-orange hover:shadow-[0_18px_50px_-18px_rgba(10,29,20,0.28)]"
            >
              <div
                className="stars text-base tracking-[0.22em] text-brand-orange"
                role="img"
                aria-label={ratingLabels[locale](testimonial.rating)}
              >
                {"★".repeat(testimonial.rating)}
              </div>
              <p className="mt-5 flex-1 leading-relaxed text-brand-text">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <footer className="mt-6 border-t border-brand-navy/8 pt-4">
                <strong className="block text-sm text-brand-navy">{testimonial.name}</strong>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.08em] text-brand-muted">
                  {testimonial.location}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
