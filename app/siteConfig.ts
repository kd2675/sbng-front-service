import type { Metadata } from "next";

export const siteConfig = {
  siteUrl: "https://www.subuknongeop.com",
  siteName: "수북농업",
  shortName: "수북농업",
  defaultTitle: "수북농업",
  defaultDescription:
    "전남 담양을 기반으로 흙손, 흙보약, 무등산 제품과 회사 정보, 김종수 대표 소개를 전합니다.",
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
};

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl("/opengraph-image");

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
          alt: `${siteConfig.siteName} 대표 소개와 제품 안내`,
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
