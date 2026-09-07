import { NextRequest, NextResponse } from "next/server";
import { applyHostSeo } from "@/lib/host-seo";

export function proxy(request: NextRequest) {
  const requestHost = request.headers.get("host");
  const result = applyHostSeo({
    hostHeader: requestHost,
    protocol: request.nextUrl.protocol,
    hostname: request.nextUrl.hostname,
    port: request.nextUrl.port,
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
  });

  if (result.redirectLocation) {
    const response = NextResponse.redirect(result.redirectLocation, 308);
    if (result.robotsTag) {
      response.headers.set("X-Robots-Tag", result.robotsTag);
    }
    return response;
  }

  const response = NextResponse.next();
  if (result.robotsTag) {
    response.headers.set("X-Robots-Tag", result.robotsTag);
  }
  return response;
}

export const config = {
  // Literal matcher so Next can statically analyze it. Public images, API,
  // and HTML are included; `_next/static` and `_next/image` stay on the
  // asset pipeline (intercepting hashed chunks is not safe).
  matcher: ["/((?!_next/static|_next/image).*)"],
};
