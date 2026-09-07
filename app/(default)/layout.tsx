import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "@/app/globals.css";
import { localeMeta } from "@/lib/seo-i18n";
import {
  createRoofingContractorSchema,
  getMetadataBase,
} from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  referrer: "strict-origin-when-cross-origin",
};

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={localeMeta.en.languageTag}
      className={`${manrope.variable} ${fraunces.variable} scroll-smooth`}
    >
      <body id="top" className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(createRoofingContractorSchema()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
