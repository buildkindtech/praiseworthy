import type { Metadata } from "next";

export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://praiseworthyroofing.com";
export const SITE_BASE_PATH =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH ??
  (process.env.NODE_ENV === "production" ? "" : "");
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE_PATH}`;
export const DEFAULT_OG_IMAGE_PATH = "/images/social/social-card.svg";
export const BUSINESS_NAME = "Praise Worthy";
export const BUSINESS_ALT_NAME = "Praise Worthy Roofing";
export const BUSINESS_AUTHOR_NAME = "Praise Worthy Roofing Team";
export const BUSINESS_PHONE = "682-250-0078";
export const BUSINESS_PHONE_E164 = "+16822500078";
export const BUSINESS_EMAIL = "praiseworthyroofing@gmail.com";
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Praise+Worthy/@32.8602567,-97.2664166,13z/data=!3m1!4b1!4m6!3m5!1s0x6e0d6965cacc9bd1:0xcd3fdb4223065dc3!8m2!3d32.8602635!4d-97.225217!16s%2Fg%2F11mdfpbzgb?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D";
export const FACEBOOK_URL = process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "";
export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/praiseworthyroofing";
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "";
export const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "";
export const SITE_PUBLISHED_AT = "2026-03-27T09:25:45+09:00";
export const SITE_UPDATED_AT = "2026-04-13T00:00:00+09:00";

export const BUSINESS_OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    opens: "08:00",
    closes: "18:00",
  },
] as const;

export const SERVICE_AREAS = [
  "North Richland Hills",
  "Fort Worth",
  "Keller",
  "Hurst",
  "Bedford",
  "Frisco",
  "Carrollton",
  "Plano",
  "Arlington",
] as const;

export const BUSINESS_DESCRIPTION =
  "Praise Worthy provides free roof inspections, storm damage repair, hail damage assessment, and roofing services for homeowners in North Richland Hills and the DFW area.";

export function normalizeUrlPath(path: string) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return path === "/" ? path : `${path.replace(/\/+$/, "")}/`;
}

export function withBasePath(path: string) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  return `${SITE_BASE_PATH}${path}`;
}

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${normalizeUrlPath(path)}`;
}

export const PRIVACY_POLICY_PATH = "/privacy-policy/";
export const TERMS_PATH = "/terms/";

export function getMetadataBase() {
  return new URL(SITE_URL);
}

export function getSameAsLinks() {
  return [
    FACEBOOK_URL,
    INSTAGRAM_URL,
    LINKEDIN_URL,
    YOUTUBE_URL,
    GOOGLE_MAPS_URL,
  ].filter(Boolean);
}

export function getAuthorMetadata(): Pick<
  Metadata,
  "authors" | "creator" | "publisher"
> {
  return {
    authors: [{ name: BUSINESS_AUTHOR_NAME, url: SITE_URL }],
    creator: BUSINESS_AUTHOR_NAME,
    publisher: BUSINESS_NAME,
  };
}

export function getDefaultRobots(): NonNullable<Metadata["robots"]> {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export function getSharedOgImage(alt: string) {
  return {
    url: absoluteUrl(DEFAULT_OG_IMAGE_PATH),
    alt,
  };
}

export function getSocialMetadata({
  title,
  description,
  url,
  siteName = BUSINESS_NAME,
  type = "website",
  imageAlt,
}: {
  title: string;
  description: string;
  url: string;
  siteName?: string;
  type?: "website" | "article";
  imageAlt: string;
}) {
  const image = getSharedOgImage(imageAlt);

  return {
    openGraph: {
      title,
      description,
      type,
      url,
      siteName,
      images: [image],
    } satisfies NonNullable<Metadata["openGraph"]>,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    } satisfies NonNullable<Metadata["twitter"]>,
  };
}

export function createFaqSchema(
  items: Array<{ question: string; answer: string }>,
) {
  if (!items.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; item: string }>,
) {
  if (!items.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function createWebPageSchema({
  id,
  url,
  name,
  description,
  inLanguage,
  datePublished,
  dateModified,
  speakable,
}: {
  id: string;
  url: string;
  name: string;
  description: string;
  inLanguage: string;
  datePublished?: string;
  dateModified?: string;
  speakable?: { cssSelector: string[] };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": id,
    inLanguage,
    url,
    name,
    description,
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    about: {
      "@id": `${SITE_URL}#roofingcontractor`,
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(speakable ? { speakable: { "@type": "SpeakableSpecification", ...speakable } } : {}),
  };
}
