import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import JsonLd from "./components/JsonLd";
import { siteConfig } from "./siteConfig";
import {
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "./structuredData";
import "./globals.css";

/**
 * Next.js 16 `viewport` export.
 *
 * 이 export 는 **반드시** `layout.tsx` 또는 `page.tsx` 에서 이루어져야 합니다.
 * 과거에 존재했던 `app/viewport.ts` 는 Next.js 파일 컨벤션이 **아니며**
 * 완전히 dead code 였습니다. 결과적으로 `<meta name="theme-color">`,
 * PWA 테마 색상이 렌더되지 않고 있었습니다.
 *
 * - `themeColor` 는 Android Chrome 주소창 색상, PWA splash 색상에 반영됩니다.
 * - `colorScheme` 를 명시해 접근성/다크모드 힌트를 제공합니다.
 * - `width/initialScale` 은 Next.js 기본값을 명시적으로 선언해 모바일 렌더링을 안정화합니다.
 */
export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

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
