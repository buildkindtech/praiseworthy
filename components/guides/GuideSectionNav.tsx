"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { GuideSection } from "@/lib/guides";

export default function GuideSectionNav({
  sections,
}: {
  sections: GuideSection[];
}) {
  return (
    <div className="sticky top-20 z-20 rounded-[24px] border border-brand-navy/8 bg-white/92 p-3 shadow-[0_16px_34px_rgba(27,54,38,0.08)] backdrop-blur">
      <div className="flex flex-wrap gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full border-brand-navy/12 bg-brand-surface px-4 text-brand-navy hover:bg-brand-navy hover:text-white",
            )}
          >
            {section.label}
          </a>
        ))}
      </div>
    </div>
  );
}
