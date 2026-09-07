import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mapNeedForIntake, validateLeadInput, type LeadPayload } from "@/lib/lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const WEBHOOK_TIMEOUT_MS = 8000;

type RateBucket = number[];

const hits = new Map<string, RateBucket>();

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((stamp) => now - stamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 2000) {
    for (const [key, stamps] of hits) {
      const kept = stamps.filter((stamp) => now - stamp < RATE_WINDOW_MS);
      if (kept.length === 0) hits.delete(key);
      else hits.set(key, kept);
    }
  }
  return false;
}

function webhookBody(leadId: string, data: LeadPayload) {
  return {
    lead_id: leadId,
    source: "praiseworthy-web",
    name: data.name,
    phone: data.phone,
    zip: data.zip,
    need: mapNeedForIntake(data.need),
    page: data.pagePath,
    page_path: data.pagePath,
    locale: data.locale,
    notes: data.message,
    message: data.message,
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
    utm_content: data.utm_content,
    utm_term: data.utm_term,
    gclid: data.gclid,
    fbclid: data.fbclid,
    created_at: new Date().toISOString(),
  };
}

async function forwardWebhook(leadId: string, data: LeadPayload) {
  const url = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!url) {
    console.info(`Lead webhook skipped: LEAD_WEBHOOK_URL is not set (lead_id=${leadId})`);
    return;
  }

  try {
    const secret =
      process.env.PW_INTAKE_SECRET?.trim() || process.env.LEAD_WEBHOOK_SECRET?.trim();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (secret) {
      headers["x-pw-intake-secret"] = secret;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(webhookBody(leadId, data)),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`Lead webhook failed: HTTP ${response.status} (lead_id=${leadId})`);
    }
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown";
    console.error(`Lead webhook error: ${reason} (lead_id=${leadId})`);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const result = validateLeadInput(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const leadId = result.honeypot ? `ignored_${randomUUID()}` : `pw_${randomUUID()}`;

  if (!result.honeypot) {
    await forwardWebhook(leadId, result.data);
  }

  return NextResponse.json({ ok: true, lead_id: leadId });
}
