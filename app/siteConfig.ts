import type { Metadata } from "next";

export const siteConfig = {
  siteUrl: "https://www.subuknongeop.com",
  siteName: "수북농업",
  shortName: "수북농업",
  defaultTitle: "수북농업",
  defaultDescription:
    "농업회사법인 (유) 수북농업의 회사 정보, 제품 안내, 김종수 대표 소개를 전합니다.",
  themeColor: "#112614",
  accentColor: "#57db31",
  defaultKeywords: [
    "수북농업",
    "농업회사법인 유한회사 수북농업",
    "김종수",
    "담양 수북농업",
    "전남 담양 유기질비료",
    "유기질비료",
    "퇴비",
    "흙손",
    "흙보약",
    "무등산",
    "수북환경개발",
  ],
  siteUpdatedAt: "2026-04-14T09:00:00+09:00",
  pageUpdatedAt: {
    home: "2026-04-14T16:36:33+09:00",
    ceo: "2026-04-14T13:48:48+09:00",
    history: "2026-04-14T11:32:17+09:00",
    products: "2026-04-14T10:25:04+09:00",
    about: "2026-04-14T11:01:57+09:00",
    contact: "2026-04-14T09:55:31+09:00",
  },
} as const;

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${normalizedPath}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imagePath?: string;
  imageAlt?: string;
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  imagePath = "/opengraph-image",
  imageAlt = `${siteConfig.siteName} 대표 이미지`,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(imagePath);

  return {
    title,
    description,
    keywords: [...siteConfig.defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "ko_KR",
      url,
      siteName: siteConfig.siteName,
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type BuildWebPageJsonLdInput = {
  name: string;
  description: string;
  path: string;
};

export function buildWebPageJsonLd({
  name,
  description,
  path,
}: BuildWebPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "ko-KR",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.siteName,
      url: siteConfig.siteUrl,
    },
  };
}
