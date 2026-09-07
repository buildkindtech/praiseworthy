import GuidesHubPage from "@/components/page/GuidesHubPage";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import {
  getGuideCards,
  getGuidesHubCopy,
  getGuidesHubMetadata,
} from "@/lib/guides";

export const metadata = getGuidesHubMetadata("en");

export default function GuidesIndexPage() {
  const copy = getGuidesHubCopy("en");

  return (
    <LanguageProvider initialLocale="en">
      <GuidesHubPage
        guides={getGuideCards("en")}
        locale="en"
        title={copy.title}
        intro={copy.intro}
      />
    </LanguageProvider>
  );
}
