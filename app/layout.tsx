import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { companyInfo } from "./companyInfo";
import { absoluteUrl, siteConfig } from "./siteConfig";
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
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    shortcut: [{ url: absoluteUrl("/favicon-32x32.png"), type: "image/png" }],
    icon: [
      { url: absoluteUrl("/favicon-32x32.png"), type: "image/png", sizes: "32x32" },
      { url: absoluteUrl("/favicon-16x16.png"), type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: absoluteUrl("/apple-touch-icon.png"), sizes: "180x180" }],
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
          url: absoluteUrl(siteConfig.defaultSocialImagePath),
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
    images: [absoluteUrl(siteConfig.defaultSocialImagePath)],
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
    other: {
      "naver-site-verification": "338733ff0b62d612e4fdae7ce88d19ce157e815d",
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
    name: siteConfig.siteName,
    alternateName: companyInfo.legalName,
    description: siteConfig.defaultDescription,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/icon.svg`,
    image: absoluteUrl("/image/company/subuk-facility-2015-share.jpg"),
    foundingDate: "1996-03-30",
    knowsAbout: ["유기질비료", "퇴비", "토양개량", "농업 자재"],
    telephone: companyInfo.telephoneDisplay,
    email: companyInfo.emailDisplay,
    identifier: companyInfo.businessRegistrationNumber,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address,
      addressLocality: companyInfo.addressLocality,
      addressRegion: companyInfo.addressRegion,
      addressCountry: "KR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.telephoneDisplay,
      email: companyInfo.emailDisplay,
      contactType: "customer support",
      areaServed: "KR",
      availableLanguage: ["ko"],
    },
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    inLanguage: "ko-KR",
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
