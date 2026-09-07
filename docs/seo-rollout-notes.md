# SEO Rollout Notes

- Canonical, sitemap, robots, and social metadata point to `https://www.praiseworthyroofing.com`, matching the current served and indexed host.
- GitHub Pages deployment publishes with `NEXT_PUBLIC_SITE_ORIGIN=https://www.praiseworthyroofing.com` and writes `www.praiseworthyroofing.com` to `out/CNAME`.
- Keep apex as a DNS alias that makes one permanent, path-preserving redirect to the equivalent `www` URL.
- Do not serve both hosts as indexable origins at the same time, or Google may keep duplicate URLs in the index during rollout.
- The exported HTML now includes a `strict-origin-when-cross-origin` referrer policy meta signal, but GitHub Pages cannot emit response headers like `X-Frame-Options`, `X-Content-Type-Options`, or `Strict-Transport-Security` by itself.
- For full security-header coverage, place the site behind a proxy/CDN that can inject `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Strict-Transport-Security`.
- If official Facebook, Instagram, LinkedIn, or YouTube profiles exist, provide them through the `NEXT_PUBLIC_FACEBOOK_URL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, and `NEXT_PUBLIC_YOUTUBE_URL` environment variables so `sameAs` can publish stronger entity signals.
