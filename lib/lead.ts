export const LEAD_NEEDS = ["storm", "leak", "check"] as const;

export type LeadNeed = (typeof LEAD_NEEDS)[number];

export const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export type TrackingKey = (typeof TRACKING_KEYS)[number];

export type LeadPayload = {
  name: string;
  phone: string;
  zip: string;
  need: LeadNeed;
  pagePath: string;
  locale: string;
  message: string;
} & Record<TrackingKey, string>;

const NAME_MAX = 80;
const PHONE_MAX = 32;
const ZIP_MAX = 12;
const PATH_MAX = 300;
const MESSAGE_MAX = 400;
const TRACKING_MAX = 180;

export function isLeadNeed(value: string): value is LeadNeed {
  return LEAD_NEEDS.includes(value as LeadNeed);
}

/** Command Center /api/leads/intake expects these exact need labels. */
export const INTAKE_NEED_MAP = {
  storm: "Storm/hail",
  leak: "Leak",
  check: "Roof check",
} as const;

export function mapNeedForIntake(need: LeadNeed): (typeof INTAKE_NEED_MAP)[LeadNeed] {
  return INTAKE_NEED_MAP[need];
}

export function normalizePhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidPhone(value: string): boolean {
  const digits = normalizePhoneDigits(value);
  if (digits.length === 10) return true;
  return digits.length === 11 && digits.startsWith("1");
}

export function isValidZip(value: string): boolean {
  return /^\d{5}(?:-\d{4})?$/.test(value.trim());
}

export function isValidName(value: string): boolean {
  const name = value.trim();
  return name.length >= 2 && name.length <= NAME_MAX;
}

function cleanTracking(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, TRACKING_MAX);
}

export type LeadValidationError =
  | "invalid"
  | "honeypot"
  | "name"
  | "phone"
  | "zip"
  | "need";

export type LeadValidationResult =
  | { ok: true; data: LeadPayload; honeypot: boolean }
  | { ok: false; error: LeadValidationError };

function emptyPayload(): LeadPayload {
  return {
    name: "",
    phone: "",
    zip: "",
    need: "check",
    pagePath: "",
    locale: "en",
    message: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    gclid: "",
    fbclid: "",
  };
}

export function validateLeadInput(body: unknown): LeadValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "invalid" };
  }

  const input = body as Record<string, unknown>;
  const honeypot = typeof input.honeypot === "string" ? input.honeypot.trim() : "";

  if (honeypot) {
    return { ok: true, honeypot: true, data: emptyPayload() };
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const zip = typeof input.zip === "string" ? input.zip.trim() : "";
  const need = typeof input.need === "string" ? input.need.trim() : "";
  const pagePath =
    typeof input.pagePath === "string" ? input.pagePath.trim().slice(0, PATH_MAX) : "";
  const locale =
    typeof input.locale === "string" ? input.locale.trim().slice(0, 8) : "en";
  const message =
    typeof input.message === "string" ? input.message.trim().slice(0, MESSAGE_MAX) : "";

  if (name.length > NAME_MAX || phone.length > PHONE_MAX || zip.length > ZIP_MAX) {
    return { ok: false, error: "invalid" };
  }
  if (!isValidName(name)) return { ok: false, error: "name" };
  if (!isValidPhone(phone)) return { ok: false, error: "phone" };
  if (!isValidZip(zip)) return { ok: false, error: "zip" };
  if (!isLeadNeed(need)) return { ok: false, error: "need" };

  const tracking = Object.fromEntries(
    TRACKING_KEYS.map((key) => [key, cleanTracking(input[key])]),
  ) as Record<TrackingKey, string>;

  return {
    ok: true,
    honeypot: false,
    data: {
      name,
      phone,
      zip,
      need,
      pagePath,
      locale,
      message,
      ...tracking,
    },
  };
}
