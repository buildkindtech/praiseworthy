"use client";

import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { withBasePath } from "@/lib/seo";

// Real job-site photos taken by the Praise Worthy team. Every file traces back to an
// owner-supplied iPhone photo or video frame; see public/images/real/README.md.
const PROJECT_PHOTOS = [
  { src: "/images/real/gallery-missing-shingles-ridge.webp", place: "Carrollton, TX" },
  { src: "/images/real/gallery-seal-check.webp", place: "Carrollton, TX" },
  { src: "/images/real/gallery-granule-loss.webp", place: "Carrollton, TX" },
  { src: "/images/real/gallery-vent-intact-roof.webp", place: "Collin County, TX" },
  { src: "/images/real/gallery-vent-cap.webp", place: "Carrollton, TX" },
  { src: "/images/real/gallery-repair-in-progress.webp", place: "Carrollton, TX" },
] as const;

export default function BeforeAfter() {
  const { t } = useLanguage();
  const photos = PROJECT_PHOTOS.map((photo, index) => ({
    ...photo,
    ...t.beforeAfter.photos[index],
  }));

  return (
    <section id="projects" className="relative overflow-hidden bg-[#07150e] py-20 text-white md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(197,160,89,0.13),transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-5 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] text-brand-amber">
            <span className="h-2.5 w-2.5 rotate-45 border-l-2 border-t-2 border-brand-orange" aria-hidden="true" />
            Praise Worthy
          </p>
          <h2 className="font-heading text-4xl font-bold leading-[1.06] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.55rem]">
            {t.beforeAfter.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-brand-surface/70">
            {t.beforeAfter.description}
          </p>
        </div>

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3" aria-label={t.beforeAfter.title}>
          {photos.map((photo) => (
            <li key={photo.src}>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-brand-navy shadow-[0_24px_55px_-20px_rgba(0,0,0,0.8)]">
                  <Image
                    src={withBasePath(photo.src)}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover object-center"
                  />
                  <span className="pointer-events-none absolute inset-3 rounded-[12px] border border-brand-amber/35" aria-hidden="true" />
                </div>
                <figcaption className="mt-4">
                  <p className="text-sm font-bold text-brand-surface/92">{photo.caption}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-amber/85">
                    {photo.place} · {photo.when}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
