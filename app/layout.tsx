import type { Metadata } from "next";
import { Archivo, Noto_Sans_JP } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ViewEffects } from "@/components/view-effects";
import "./globals.css";

const noto = Noto_Sans_JP({
  variable: "--font-jp",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-en",
  weight: ["600", "800"],
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://t-rails.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Two Rails ｜ 情熱が放置されない世界を創る",
    template: "%s ｜ Two Rails",
  },
  description:
    "Two Railsは、売上を伸ばす「次の一手」を見つける診断を中心に、経営支援サービスを開発しています。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Two Rails",
    title: "Two Rails ｜ 情熱が放置されない世界を創る",
    description:
      "経営者の意思決定と組織の実行のあいだにある認識のズレを可視化します。",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Two Rails ｜ 情熱が放置されない世界を創る",
    description:
      "経営者の意思決定と組織の実行のあいだにある認識のズレを可視化します。",
    images: ["/opengraph-image"],
  },
  icons: { icon: "/icon" },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "合同会社Two Rails",
  url: siteUrl,
  logo: `${siteUrl}/icon`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "JP",
    addressRegion: "東京都",
    addressLocality: "新宿区",
    streetAddress: "新宿1-36-2 新宿第七葉山ビル3F",
  },
  founder: { "@type": "Person", name: "佐藤 元紀" },
  foundingDate: "2024-04",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${noto.variable} ${archivo.variable}`}>
      <body>
        <a className="skip-link" href="#main">本文へ移動</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ViewEffects />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
