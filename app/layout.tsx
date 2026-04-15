import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import JsonLd from "./components/JsonLd";
import { siteConfig } from "./siteConfig";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "./structuredData";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.siteName,
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.defaultDescription,
  keywords: [...siteConfig.defaultKeywords],
  category: "business",
  // `metadataBase` 가 설정돼 있으므로 canonical 도 상대 경로만 주면
  // Next.js 가 자동으로 절대 URL 로 직렬화합니다.
  alternates: {
    canonical: "/",
    types: {
      // 네이버 서치어드바이저·RSS 리더가 자동 탐색(autodiscovery)할 수 있도록
      // RSS 피드 링크를 `<link rel="alternate" type="application/rss+xml">` 으로 노출합니다.
      "application/rss+xml": [
        { url: "/rss.xml", title: `${siteConfig.siteName} RSS Feed` },
      ],
    },
  },
  manifest: "/manifest.webmanifest",
  // `metadataBase` 가 존재하므로 상대 경로만 사용합니다.
  // 기존의 `absoluteUrl()` 래핑은 중복 처리였으므로 제거했습니다.
  //
  // Next.js 파일 컨벤션으로 자동 주입되는 것:
  //   - `/favicon.ico`  ← `app/favicon.ico`
  //   - `/icon.svg`     ← `app/icon.svg`
  // 중복을 피하기 위해 layout 메타데이터에서는 추가 PNG 변형과 Apple 아이콘만 선언합니다.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteConfig.siteUrl,
    siteName: siteConfig.siteName,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [
      {
        url: siteConfig.defaultSocialImagePath,
        width: 1200,
        height: 630,
        alt: siteConfig.defaultSocialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.defaultSocialImagePath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    // Google Search Console 은 환경변수로 주입해 빌드 타임에 바인딩합니다.
    // 값이 없으면 필드 자체를 설정하지 않아 Next.js 가 태그를 출력하지 않도록 합니다.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    other: {
      "naver-site-verification": "338733ff0b62d612e4fdae7ce88d19ce157e815d",
      // Bing Webmaster Tools 도 환경변수 주입. 값이 비어 있으면 키가 스킵됩니다.
      ...(process.env.NEXT_PUBLIC_MSVALIDATE
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_MSVALIDATE }
        : {}),
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 한국 특정 지역 콘텐츠임을 명확히 하기 위해 BCP 47 `ko-KR` 로 통일.
    // JSON-LD `inLanguage` 및 RSS `language` 표기와도 일관성을 맞춥니다.
    <html lang="ko-KR">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <JsonLd data={buildOrganizationJsonLd()} />
        <JsonLd data={buildWebSiteJsonLd()} />
        {children}
      </body>
    </html>
  );
}
