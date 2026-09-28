"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function eventForHref(href: string): string | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("calendar.google.com/calendar")) return "booking_click";
  return null;
}

/** One delegated listener covers every phone, email and booking link on the site. */
export function ContactClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const name = eventForHref(href);
      if (!name) return;
      trackEvent(name, {
        link_url: href.split("?")[0],
        page_path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
