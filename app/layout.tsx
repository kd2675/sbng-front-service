import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const siteUrl = "https://www.subuknongeop.com";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "수북농업",
    template: "%s | 수북농업",
  },
  description:
    "수북농업은 지속 가능한 농업을 위한 비료 솔루션과 토양 중심 농업 컨설팅을 제공합니다.",
  keywords: [
    "수북농업",
    "subuknongeop",
    "친환경 비료",
    "유기질 비료",
    "농업 솔루션",
    "토양 관리",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "수북농업",
    title: "수북농업",
    description:
      "수북농업은 지속 가능한 농업을 위한 비료 솔루션과 토양 중심 농업 컨설팅을 제공합니다.",
  },
  twitter: {
    card: "summary_large_image",
    title: "수북농업",
    description:
      "수북농업은 지속 가능한 농업을 위한 비료 솔루션과 토양 중심 농업 컨설팅을 제공합니다.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "수북농업",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "수북농업",
    url: siteUrl,
  };

  return (
    <html lang="ko">
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
