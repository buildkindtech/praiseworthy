"use client";

import { EyeOff, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function StormAwareness() {
  const { t } = useLanguage();
  const problems = [
    { ...t.storm.cards[0], icon: EyeOff },
    { ...t.storm.cards[1], icon: Zap },
    { ...t.storm.cards[2], icon: ShieldCheck },
  ];

  return (
    <section id="storm" className="bg-[#f6f1e7] py-24 md:py-32">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <h2 className="font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-[#10241b] md:text-6xl">
            {t.storm.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5d675f] md:text-lg">
            {t.storm.description}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {problems.map((problem, index) => (
            <article
              key={problem.title}
              className={`rounded-[18px] border border-[#17382a]/10 bg-[#fffdf8] p-7 shadow-[0_18px_55px_rgba(16,36,27,0.07)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(16,36,27,0.12)] md:p-9 ${
                [
                  "md:col-span-7 lg:col-span-5",
                  "md:col-span-5 lg:col-span-3",
                  "md:col-span-12 lg:col-span-4",
                ][index]
              }`}
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d5a94f]/15 text-[#9a6f2f]">
                  <problem.icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="pt-1 font-heading text-2xl font-semibold leading-tight tracking-[-0.025em] text-[#10241b]">
                  {problem.title}
                </h3>
              </div>
              <p className="mt-4 text-[0.96rem] leading-7 text-[#667068]">{problem.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
