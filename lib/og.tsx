import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/i18n";
import { BUSINESS_NAME, BUSINESS_PHONE, SITE_URL } from "@/lib/seo";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export const ogImageContentType = "image/png";

const ogCopy: Record<
  Locale,
  { headlineTop: string; headlineBottom: string; subhead: string }
> = {
  en: {
    headlineTop: "Roofing and Free Roof",
    headlineBottom: "Inspection in DFW",
    subhead:
      "Storm damage, hail damage, and homeowner roof inspections in North Richland Hills, Fort Worth, and surrounding DFW cities.",
  },
  es: {
    headlineTop: "Techos e inspeccion",
    headlineBottom: "gratis en DFW",
    subhead:
      "Inspecciones de techo, dano por tormenta y dano por granizo para propietarios en North Richland Hills, Fort Worth y ciudades cercanas de DFW.",
  },
  zh: {
    headlineTop: "DFW 免费屋顶检查",
    headlineBottom: "与屋顶服务",
    subhead:
      "为 North Richland Hills、Fort Worth 及周边 DFW 城市业主提供风暴损伤、冰雹损伤与屋顶检查服务。",
  },
  ko: {
    headlineTop: "DFW 무료 지붕 점검",
    headlineBottom: "및 지붕 서비스",
    subhead:
      "North Richland Hills, Fort Worth 및 DFW 인근 지역 주택을 위한 폭풍 피해, 우박 피해, 지붕 점검 서비스.",
  },
};

export function createLocalizedOgImage(locale: Locale) {
  const copy = ogCopy[locale];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top right, rgba(197,160,89,0.22), transparent 22%), linear-gradient(135deg, #13261b 0%, #1B3626 58%, #274332 100%)",
          color: "#F9F8F4",
          padding: "54px 64px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 20,
              background: "rgba(249,248,244,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(249,248,244,0.18)",
              color: "#C5A059",
            }}
          >
            PW
          </div>
          <div>{BUSINESS_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            <div style={{ display: "flex" }}>{copy.headlineTop}</div>
            <div style={{ display: "flex" }}>{copy.headlineBottom}</div>
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              maxWidth: 920,
              color: "rgba(249,248,244,0.84)",
            }}
          >
            {copy.subhead}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "rgba(249,248,244,0.88)",
            borderTop: "1px solid rgba(249,248,244,0.14)",
            paddingTop: 24,
          }}
        >
          <div>{BUSINESS_PHONE}</div>
          <div>{SITE_URL.replace("https://", "")}</div>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
