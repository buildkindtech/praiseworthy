import { META_PIXEL_BOOTSTRAP_SCRIPT, META_PIXEL_ID } from "@/lib/analytics";

export function MetaPixelHead() {
  if (!META_PIXEL_ID) return null;
  return <script dangerouslySetInnerHTML={{ __html: META_PIXEL_BOOTSTRAP_SCRIPT }} />;
}
