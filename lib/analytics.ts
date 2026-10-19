export const GA_MEASUREMENT_ID = "G-P9T57KPSCH";

/** Only the production hosts send data; local and preview builds queue events without a config. */
const PRODUCTION_HOST_PATTERN = "(^|\\.)praiseworthyroofing\\.com$";

export const GA_BOOTSTRAP_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;if(new RegExp(${JSON.stringify(PRODUCTION_HOST_PATTERN)}).test(location.hostname)){gtag('js',new Date());gtag('config',${JSON.stringify(GA_MEASUREMENT_ID)});}`;

/** Empty until the Meta dataset exists; an empty id keeps the pixel off entirely. */
export const META_PIXEL_ID = "1135371599148332";

/** fbq always exists as a queue; fbevents.js loads and the pixel initialises on production hosts only. */
export const META_PIXEL_BOOTSTRAP_SCRIPT = `!function(w,d){if(w.fbq)return;var n=w.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!w._fbq)w._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];if(new RegExp(${JSON.stringify(PRODUCTION_HOST_PATTERN)}).test(location.hostname)){var t=d.createElement('script');t.async=!0;t.src='https://connect.facebook.net/en_US/fbevents.js';d.head.appendChild(t);n('init',${JSON.stringify(META_PIXEL_ID)});n('track','PageView');}}(window,document);`;

/** Meta standard events for the actions that matter; other events stay GA-only. */
const META_STANDARD_EVENTS: Record<string, string> = {
  generate_lead: "Lead",
  phone_click: "Contact",
  booking_click: "Schedule",
};

type EventParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") window.gtag("event", name, params);
  const metaEvent = META_STANDARD_EVENTS[name];
  if (metaEvent && typeof window.fbq === "function") window.fbq("track", metaEvent);
}
