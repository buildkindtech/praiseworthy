import { GA_BOOTSTRAP_SCRIPT, GA_MEASUREMENT_ID } from "@/lib/analytics";

/** Rendered inside <head> so Search Console can also verify ownership through this tag. */
export function GoogleAnalyticsHead() {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script dangerouslySetInnerHTML={{ __html: GA_BOOTSTRAP_SCRIPT }} />
    </>
  );
}
