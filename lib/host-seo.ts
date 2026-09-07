export const CANONICAL_HOST = "www.praiseworthyroofing.com";
export const APEX_HOST = "praiseworthyroofing.com";
export const PREVIEW_NOINDEX_TAG = "noindex, nofollow";

const STAGING_HOSTS = new Set([
  "praiseworthyroofing.aiworkflowautomations.net",
]);

const LOOPBACK_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "[::1]",
  "::1",
]);

export function normalizeRequestHost(hostHeader: string | null | undefined): string {
  if (!hostHeader) return "";
  const trimmed = hostHeader.trim().toLowerCase();
  if (!trimmed) return "";
  if (trimmed.startsWith("[")) {
    const end = trimmed.indexOf("]");
    if (end !== -1) return trimmed.slice(0, end + 1);
  }
  return trimmed.split(":")[0] ?? "";
}

export function isLoopbackHost(host: string): boolean {
  return LOOPBACK_HOSTS.has(host) || host.endsWith(".localhost");
}

export function isProductionCustomDomain(host: string): boolean {
  return host === CANONICAL_HOST || host === APEX_HOST;
}

export function isVercelAliasHost(host: string): boolean {
  return host.endsWith(".vercel.app");
}

export function shouldNoIndexHost(host: string): boolean {
  if (!host || isLoopbackHost(host) || isProductionCustomDomain(host)) {
    return false;
  }
  return isVercelAliasHost(host) || STAGING_HOSTS.has(host);
}

export function shouldCanonicalizeApexHost(host: string): boolean {
  return host === APEX_HOST;
}

export function isApiPath(pathname: string): boolean {
  return pathname === "/api" || pathname.startsWith("/api/");
}

export function isFilePath(pathname: string): boolean {
  const last = pathname.split("/").filter(Boolean).pop() ?? "";
  return /\.[a-zA-Z0-9]+$/.test(last);
}

export function needsTrailingSlash(pathname: string): boolean {
  if (!pathname || pathname === "/") return false;
  if (isApiPath(pathname) || isFilePath(pathname)) return false;
  return !pathname.endsWith("/");
}

export type HostSeoInput = {
  hostHeader: string | null | undefined;
  protocol: string;
  hostname: string;
  port?: string;
  pathname: string;
  search: string;
};

export type HostSeoResult = {
  redirectLocation: string | null;
  robotsTag: string | null;
};

function originFor(protocol: string, hostname: string, port?: string): string {
  const normalizedProtocol = protocol.endsWith(":") ? protocol : `${protocol}:`;
  const hostWithPort =
    port && port !== "80" && port !== "443" ? `${hostname}:${port}` : hostname;
  return `${normalizedProtocol}//${hostWithPort}`;
}

function withTrailingSlash(pathname: string): string {
  return needsTrailingSlash(pathname) ? `${pathname}/` : pathname;
}

export function applyHostSeo(input: HostSeoInput): HostSeoResult {
  const host = normalizeRequestHost(input.hostHeader);
  const robotsTag = shouldNoIndexHost(host) ? PREVIEW_NOINDEX_TAG : null;
  const search = input.search || "";
  const pathname = input.pathname || "/";

  if (shouldCanonicalizeApexHost(host)) {
    return {
      redirectLocation: `https://${CANONICAL_HOST}${withTrailingSlash(pathname)}${search}`,
      robotsTag: null,
    };
  }

  if (needsTrailingSlash(pathname)) {
    if (host === CANONICAL_HOST) {
      return {
        redirectLocation: `https://${CANONICAL_HOST}${pathname}/${search}`,
        robotsTag: null,
      };
    }
    const destHost = input.hostname || host || "localhost";
    return {
      redirectLocation: `${originFor(input.protocol, destHost, input.port)}${pathname}/${search}`,
      robotsTag,
    };
  }

  return { redirectLocation: null, robotsTag };
}
