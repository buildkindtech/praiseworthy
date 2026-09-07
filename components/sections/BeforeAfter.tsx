"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { projectLocations } from "@/lib/i18n";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { withBasePath } from "@/lib/seo";

function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforePosition = "center",
  afterPosition = "center",
  location,
  beforeLabel,
  afterLabel,
}: {
  beforeImg: string;
  afterImg: string;
  beforePosition?: string;
  afterPosition?: string;
  location: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setPositionFromClientX = useCallback((clientX: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const nextPosition = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, nextPosition)));
  }, []);

  const stopDragging = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <figure>
      <div
        ref={sliderRef}
        className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[18px] bg-brand-navy shadow-[0_24px_55px_-20px_rgba(0,0,0,0.8)]"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          dragging.current = true;
          setTouched(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          setPositionFromClientX(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging.current) setPositionFromClientX(event.clientX);
        }}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
      >
        <Image
          src={afterImg}
          alt={`${afterLabel}: ${location}, TX`}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 80vw, 100vw"
          className="pointer-events-none object-cover"
          style={{ objectPosition: afterPosition }}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeImg}
            alt={`${beforeLabel}: ${location}, TX`}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 80vw, 100vw"
            className="pointer-events-none object-cover"
            style={{ objectPosition: beforePosition }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-brand-amber shadow-[0_0_12px_rgba(0,0,0,0.55)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          aria-hidden="true"
        />
        <button
          type="button"
          role="slider"
          aria-label={`${beforeLabel} / ${afterLabel}: ${location}, TX`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${beforeLabel} ${Math.round(position)}%, ${afterLabel} ${Math.round(100 - position)}%`}
          aria-orientation="horizontal"
          className="absolute top-1/2 z-20 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none place-items-center rounded-full bg-gradient-to-br from-brand-amber to-brand-orange text-[#081810] shadow-[0_8px_20px_rgba(0,0,0,0.5)] outline-none focus-visible:ring-4 focus-visible:ring-white/95 focus-visible:ring-offset-2 focus-visible:ring-offset-[#081810]"
          style={{ left: `${position}%` }}
          onPointerDown={(event) => event.currentTarget.parentElement?.setPointerCapture(event.pointerId)}
          onKeyDown={(event) => {
            let nextPosition = position;
            if (event.key === "ArrowLeft" || event.key === "ArrowDown") nextPosition -= 5;
            else if (event.key === "ArrowRight" || event.key === "ArrowUp") nextPosition += 5;
            else if (event.key === "Home") nextPosition = 0;
            else if (event.key === "End") nextPosition = 100;
            else return;
            event.preventDefault();
            setTouched(true);
            setPosition(Math.min(100, Math.max(0, nextPosition)));
          }}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18-6-6 6-6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </button>

        {!touched && (
          <span className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-brand-amber/55 bg-[#081810]/80 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-brand-amber backdrop-blur-sm">
            {beforeLabel} ↔ {afterLabel}
          </span>
        )}
        <span className="pointer-events-none absolute left-3.5 top-3.5 z-20 rounded-full bg-[#081810]/75 px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-white">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3.5 top-3.5 z-20 rounded-full bg-gradient-to-br from-brand-amber to-brand-orange px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-[#081810]">
          {afterLabel}
        </span>
      </div>
      <figcaption className="mt-4 text-center text-sm font-bold text-brand-surface/85">
        {location}, TX
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter() {
  const { t } = useLanguage();
  const projects = [
    {
      location: projectLocations[0],
      beforeImg: "/images/before-after/chimney-before.webp",
      afterImg: "/images/before-after/chimney-after.webp",
      beforePosition: "center center",
      afterPosition: "center center",
    },
    {
      location: projectLocations[1],
      beforeImg: "/images/before-after/front-house-before.webp",
      afterImg: "/images/before-after/front-house-after.webp",
      beforePosition: "center 42%",
      afterPosition: "center 42%",
    },
    {
      location: projectLocations[2],
      beforeImg: "/images/before-after/aerial-before.webp",
      afterImg: "/images/before-after/aerial-after.webp",
      beforePosition: "center center",
      afterPosition: "center center",
    },
  ];

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

        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map((project) => (
            <BeforeAfterSlider
              key={project.location}
              beforeImg={withBasePath(project.beforeImg)}
              afterImg={withBasePath(project.afterImg)}
              beforePosition={project.beforePosition}
              afterPosition={project.afterPosition}
              location={project.location}
              beforeLabel={t.beforeAfter.before}
              afterLabel={t.beforeAfter.after}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
