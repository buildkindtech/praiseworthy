"use client";

import { useMemo, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Calendar, MessageCircle, Phone, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { trackEvent } from "@/lib/analytics";
import { isValidName, isValidPhone, isValidZip, TRACKING_KEYS } from "@/lib/lead";

const PHONE_HREF = "tel:+16822500078";
const SCHEDULE_HREF =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ01K4KNgIlF5_N0dcliaOX-17GpOsjDRKNjnDCZ_giIDfnAqaxLZY90DLEHQfXcTRKuNAtlZ1_v";

type FieldError = "name" | "phone" | "zip" | "generic" | "rate" | "";

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

export default function ChatWidget() {
  const { locale, t } = useLanguage();
  const text = t.chat;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [error, setError] = useState<FieldError>("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const attribution = useMemo(readAttribution, []);

  function validate(): FieldError {
    if (!isValidName(name)) return "name";
    if (!isValidPhone(phone)) return "phone";
    if (!isValidZip(zip)) return "zip";
    return "";
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextError = validate();
    if (nextError) {
      setError(nextError);
      return;
    }

    setError("");
    setSending(true);

    try {
      const page = pathname || "/";
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          zip,
          need: "check",
          message,
          honeypot,
          pagePath: `${page} [chat]`,
          locale,
          ...attribution,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (response.status === 429 || payload?.error === "rate_limited") {
        setError("rate");
        return;
      }

      if (!response.ok || !payload?.ok) {
        setError("generic");
        return;
      }

      trackEvent("generate_lead", { lead_source: "chat", need: "check" });
      setSuccess(true);
    } catch {
      setError("generic");
    } finally {
      setSending(false);
    }
  }

  const errorMessage =
    error === "name"
      ? text.errorName
      : error === "phone"
        ? text.errorPhone
        : error === "zip"
          ? text.errorZip
          : error === "rate"
            ? text.errorRate
            : error === "generic"
              ? text.errorGeneric
              : "";

  return (
    <div className="pw-chat">
      {open ? (
        <div
          className="pw-chat__panel"
          role="dialog"
          aria-labelledby="pw-chat-title"
          aria-modal="false"
        >
          <div className="pw-chat__head">
            <div>
              <p className="pw-chat__eyebrow">Praise Worthy</p>
              <h2 id="pw-chat-title">{text.title}</h2>
            </div>
            <button
              type="button"
              className="pw-chat__icon-btn"
              onClick={() => setOpen(false)}
              aria-label={text.closeLabel}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          {success ? (
            <div className="pw-chat__success" aria-live="polite">
              <p className="pw-chat__success-title">{text.successTitle}</p>
              <p>{text.successBody}</p>
              <a className="pw-chat__primary" href={PHONE_HREF}>
                <Phone aria-hidden="true" />
                {text.successCall}
              </a>
              <a
                className="pw-chat__secondary"
                href={SCHEDULE_HREF}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar aria-hidden="true" />
                {text.successBook}
              </a>
            </div>
          ) : (
            <form className="pw-chat__form" onSubmit={onSubmit} noValidate>
              <p className="pw-chat__subtitle">{text.subtitle}</p>

              <label className="pw-chat__field">
                <span>{text.nameLabel}</span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={80}
                  placeholder={text.namePlaceholder}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-invalid={error === "name"}
                />
              </label>

              <div className="pw-chat__split">
                <label className="pw-chat__field">
                  <span>{text.phoneLabel}</span>
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
                  />
                </label>
                <label className="pw-chat__field">
                  <span>{text.zipLabel}</span>
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
                  />
                </label>
              </div>

              <label className="pw-chat__field">
                <span>{text.messageLabel}</span>
                <textarea
                  name="message"
                  rows={2}
                  maxLength={400}
                  placeholder={text.messagePlaceholder}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </label>

              <div className="pw-chat__honeypot" aria-hidden="true">
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

              {errorMessage ? (
                <p className="pw-chat__error" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button className="pw-chat__submit" type="submit" disabled={sending}>
                {sending ? text.sending : text.submit}
              </button>
            </form>
          )}
        </div>
      ) : null}

      <button
        type="button"
        className="pw-chat__launch"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? text.closeLabel : text.openLabel}
      >
        {open ? <X aria-hidden="true" /> : <MessageCircle aria-hidden="true" />}
      </button>
    </div>
  );
}
