"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import {
  Calendar,
  CheckCircle2,
  CloudSun,
  Droplets,
  MapPin,
  Phone,
  Search,
  User,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { translations, type Locale } from "@/lib/i18n";
import { GOOGLE_MAPS_URL } from "@/lib/seo";
import {
  isValidName,
  isValidPhone,
  isValidZip,
  TRACKING_KEYS,
  type LeadNeed,
} from "@/lib/lead";

const PHONE_HREF = "tel:+16822500078";
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

const NEED_OPTIONS: Array<{
  value: LeadNeed;
  icon: typeof CloudSun;
}> = [
  { value: "storm", icon: CloudSun },
  { value: "leak", icon: Droplets },
  { value: "check", icon: Search },
];

type FieldError = "name" | "phone" | "zip" | "need" | "generic" | "rate" | "";

function readAttribution() {
  const empty = Object.fromEntries(TRACKING_KEYS.map((key) => [key, ""])) as Record<
    (typeof TRACKING_KEYS)[number],
    string
  >;
  if (typeof window === "undefined") return empty;
  const params = new URLSearchParams(window.location.search);
  for (const key of TRACKING_KEYS) {
    empty[key] = params.get(key) ?? "";
  }
  return empty;
}

export default function InspectionPreview({
  locale,
  instanceId = "primary",
}: {
  locale: Locale;
  instanceId?: string;
}) {
  const text = translations[locale].leadForm;
  const pathname = usePathname();
  const titleId = `inspection-preview-title-${instanceId}`;
  const errorId = `inspection-preview-error-${instanceId}`;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [need, setNeed] = useState<LeadNeed | "">("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<FieldError>("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const submitBlocked = useRef(false);

  const attribution = useMemo(readAttribution, []);

  function validate(): FieldError {
    if (!isValidName(name)) return "name";
    if (!isValidPhone(phone)) return "phone";
    if (!isValidZip(zip)) return "zip";
    if (!need) return "need";
    return "";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitBlocked.current) return;
    const nextError = validate();
    if (nextError) {
      setError(nextError);
      return;
    }

    setError("");
    submitBlocked.current = true;
    let completed = false;
    setSending(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          zip,
          need,
          honeypot,
          pagePath: pathname || "/",
          locale,
          ...attribution,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; accepted?: boolean; error?: string }
        | null;

      if (response.status === 429 || payload?.error === "rate_limited") {
        setError("rate");
        return;
      }

      if (!response.ok || !payload?.ok || typeof payload.accepted !== "boolean") {
        setError("generic");
        return;
      }

      if (payload.accepted === true) {
        trackEvent("generate_lead", { lead_source: "inspection_form", need });
      }
      completed = true;
      setSuccess(true);
    } catch {
      setError("generic");
    } finally {
      setSending(false);
      submitBlocked.current = completed;
    }
  }

  const errorMessage =
    error === "name"
      ? text.errorName
      : error === "phone"
        ? text.errorPhone
        : error === "zip"
          ? text.errorZip
          : error === "need"
            ? text.errorNeed
            : error === "rate"
              ? text.errorRate
              : error === "generic"
                ? text.errorGeneric
                : "";

  return (
    <aside id={`inspection-request-${instanceId}`} className="pw-inspection" aria-labelledby={titleId}>
      <div className="pw-inspection__head">
        <span className="pw-inspection__badge">
          <span className="pw-inspection__pulse" aria-hidden="true" />
          {text.badge}
        </span>
        <CheckCircle2 className="pw-inspection__status" aria-hidden="true" />
      </div>

      {success ? (
        <div className="pw-inspection__success" aria-live="polite">
          <h2 id={titleId}>{text.successTitle}</h2>
          <p className="pw-inspection__subtitle">{text.successBody}</p>
          <a className="pw-inspection__schedule" href={PHONE_HREF}>
            <Phone aria-hidden="true" />
            {text.successCall}
          </a>
          <a
            className="pw-inspection__call"
            href={SCHEDULE_HREF}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Calendar aria-hidden="true" />
            {text.successBook}
          </a>
          <p className="pw-inspection__caption">
            <CheckCircle2 aria-hidden="true" />
            {text.successChat}
          </p>
        </div>
      ) : (
        <form className="pw-inspection__form" onSubmit={onSubmit} noValidate>
          <h2 id={titleId}>{text.title}</h2>
          <p className="pw-inspection__subtitle">{text.subtitle}</p>
          <ol className="pw-inspection__steps" aria-label={text.stepsLabel}>
            {text.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>

          <div className="pw-inspection__fields">
            <label className="pw-inspection__field">
              <span className="pw-inspection__sr">{text.nameLabel}</span>
              <User aria-hidden="true" />
              <input
                name="name"
                type="text"
                autoComplete="name"
                maxLength={80}
                placeholder={text.namePlaceholder}
                value={name}
                onChange={(event) => setName(event.target.value)}
                aria-invalid={error === "name"}
                aria-describedby={error ? errorId : undefined}
              />
            </label>

            <div className="pw-inspection__split">
              <label className="pw-inspection__field">
                <span className="pw-inspection__sr">{text.phoneLabel}</span>
                <Phone aria-hidden="true" />
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={32}
                  required
                  placeholder={text.phonePlaceholder}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  aria-invalid={error === "phone"}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
              <label className="pw-inspection__field">
                <span className="pw-inspection__sr">{text.zipLabel}</span>
                <MapPin aria-hidden="true" />
                <input
                  name="zip"
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={10}
                  required
                  placeholder={text.zipPlaceholder}
                  value={zip}
                  onChange={(event) => setZip(event.target.value)}
                  aria-invalid={error === "zip"}
                  aria-describedby={error ? errorId : undefined}
                />
              </label>
            </div>

            <div className="pw-inspection__honeypot" aria-hidden="true">
              <label>
                Company
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </label>
            </div>

            <fieldset className="pw-inspection__need">
              <legend className="pw-inspection__label">{text.needLabel}</legend>
              <div className="pw-inspection__options" role="radiogroup" aria-label={text.needLabel}>
                {NEED_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const selected = need === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={selected ? "is-selected" : undefined}
                      onClick={() => setNeed(option.value)}
                    >
                      <Icon aria-hidden="true" />
                      {text.needs[option.value]}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {errorMessage ? (
            <p className="pw-inspection__error" id={errorId} role="alert">
              {errorMessage}
            </p>
          ) : (
            <p className="pw-inspection__notice">{text.microcopy}</p>
          )}

          <button className="pw-inspection__submit" type="submit" disabled={sending}>
            {sending ? text.sending : text.submit}
          </button>

          <p className="pw-inspection__caption">
            <CheckCircle2 aria-hidden="true" />
            {text.caption}
          </p>
          <a className="pw-inspection__proof" href={GOOGLE_MAPS_URL.split("?")[0]} target="_blank" rel="noopener noreferrer">
            <MapPin aria-hidden="true" />
            {text.googleProof}
          </a>
        </form>
      )}
    </aside>
  );
}
