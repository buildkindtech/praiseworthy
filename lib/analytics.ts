export const GA_MEASUREMENT_ID = "G-P9T57KPSCH";

/** Only the production hosts send data; local and preview builds queue events without a config. */
const PRODUCTION_HOST_PATTERN = "(^|\\.)praiseworthyroofing\\.com$";

export const GA_BOOTSTRAP_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;if(new RegExp(${JSON.stringify(PRODUCTION_HOST_PATTERN)}).test(location.hostname)){gtag('js',new Date());gtag('config',${JSON.stringify(GA_MEASUREMENT_ID)});}`;

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
