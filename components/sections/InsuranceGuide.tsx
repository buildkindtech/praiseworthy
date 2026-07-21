"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Users, ClipboardCheck, HelpCircle } from "lucide-react";
import { useInView } from "@/lib/hooks";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function InsuranceGuide() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });
  const { t } = useLanguage();
  const services = [
    { icon: FileText, ...t.insurance.cards[0] },
    { icon: ClipboardCheck, ...t.insurance.cards[1] },
    { icon: Users, ...t.insurance.cards[2] },
    { icon: HelpCircle, ...t.insurance.cards[3] },
  ];

  return (
    <section
      id="insurance-guide"
      className="py-16 md:py-24 bg-gradient-to-b from-brand-navy to-[#15281d]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {t.insurance.title}
          </h2>
          <p className="text-brand-surface/88 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.insurance.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className={`bg-white/8 border-white/10 backdrop-blur-sm hover:bg-white/12 transition-all duration-500 hover:-translate-y-1 ${
                isInView ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-brand-orange/16 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-brand-orange" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-brand-surface/84 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
