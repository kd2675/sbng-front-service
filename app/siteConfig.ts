import type { Metadata } from "next";

export const siteConfig = {
  siteUrl: "https://www.subuknongeop.com",
  siteName: "수북농업",
  shortName: "수북농업",
  defaultTitle: "수북농업",
  defaultDescription:
    "전남 담양 수북농업의 유기질비료 제품 흙손·흙보약·무등산과 회사 정보, 김종수 대표 소개를 안내합니다.",
  themeColor: "#112614",
  accentColor: "#57db31",
  organizationLogoPath: "/image/logo-og.png",
  defaultSocialImagePath: "/image/history/history-weeklypeople-2020-02-03-og.jpg",
  defaultSocialImageAlt: "수북농업 대표 이미지",
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
  imagePath = siteConfig.defaultSocialImagePath,
  imageAlt = siteConfig.defaultSocialImageAlt,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(imagePath);

  return {
    title,
    description,
    keywords: [...siteConfig.defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
      // Next.js 는 페이지 레벨 `alternates` 를 지정하면 레이아웃의 `alternates` 를
      // 그대로 덮어씁니다. 따라서 RSS autodiscovery 링크를 모든 페이지에서
      // 유지하려면 각 페이지 메타데이터에도 `types` 를 다시 포함시켜야 합니다.
      types: {
        "application/rss+xml": [
          { url: absoluteUrl("/rss.xml"), title: `${siteConfig.siteName} RSS Feed` },
        ],
      },
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

type BuildNoIndexMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildNoIndexMetadata({
  title,
  description,
  path,
}: BuildNoIndexMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl(siteConfig.defaultSocialImagePath);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      // noindex 페이지에서도 RSS autodiscovery 를 유지합니다.
      types: {
        "application/rss+xml": [
          { url: absoluteUrl("/rss.xml"), title: `${siteConfig.siteName} RSS Feed` },
        ],
      },
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
          alt: siteConfig.defaultSocialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
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
