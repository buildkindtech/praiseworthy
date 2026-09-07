import { LanguageProvider } from "@/components/providers/LanguageProvider";
import CityPage from "@/components/page/CityPage";
import { cityPagesBySlug, getCityPageMetadata } from "@/lib/city-pages";

const page = cityPagesBySlug.euless;

export const metadata = getCityPageMetadata(page);

export default function EulessPage() {
  return (
    <LanguageProvider initialLocale="en">
      <CityPage page={page} />
    </LanguageProvider>
  );
}
