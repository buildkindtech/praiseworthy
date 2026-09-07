import { LanguageProvider } from "@/components/providers/LanguageProvider";
import CityPage from "@/components/page/CityPage";
import { cityPagesBySlug, getCityPageMetadata } from "@/lib/city-pages";

const page = cityPagesBySlug["little-elm"];

export const metadata = getCityPageMetadata(page);

export default function LittleElmPage() {
  return (
    <LanguageProvider initialLocale="en">
      <CityPage page={page} />
    </LanguageProvider>
  );
}
