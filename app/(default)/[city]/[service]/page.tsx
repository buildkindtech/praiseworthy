import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import CityServicePage from "@/components/page/CityServicePage";
import {
  cityServicePages,
  getCityServiceMetadata,
  getCityServicePage,
} from "@/lib/city-service-pages";

export function generateStaticParams() {
  return cityServicePages.map((page) => ({
    city: page.citySlug,
    service: page.serviceSlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city, service } = await params;
  const page = getCityServicePage(city, service);

  if (!page) {
    return {};
  }

  return getCityServiceMetadata(page);
}

export default async function CityServiceRoutePage({
  params,
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city, service } = await params;
  const page = getCityServicePage(city, service);

  if (!page) {
    notFound();
  }

  return (
    <LanguageProvider initialLocale="en">
      <CityServicePage page={page} />
    </LanguageProvider>
  );
}
