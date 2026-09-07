import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? (isProduction ? "" : "");
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Server build so /api/lead can accept form posts. Static `output: "export"`
  // (GitHub Pages) cannot host that route. Do not re-enable export on this
  // branch unless the lead API is moved off-app.
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  // This snapshot lives under /Users/aaron/projects, which has its own lockfile.
  // Pin Turbopack to this app so CSS/PostCSS resolve local node_modules.
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
