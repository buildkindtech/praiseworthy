import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import GuidePage from "@/components/page/GuidePage";
import { getGuide, getGuideMetadata, guideSlugs } from "@/lib/guides";

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide("en", slug);

  if (!guide) {
    return {};
  }

  return getGuideMetadata(guide, "en");
}

export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide("en", slug);

  if (!guide) {
    notFound();
  }

  return (
    <LanguageProvider initialLocale="en">
      <GuidePage guide={guide} locale="en" />
    </LanguageProvider>
  );
}
