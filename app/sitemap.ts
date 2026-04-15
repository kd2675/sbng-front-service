import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "./siteConfig";

/**
 * Next.js 16 빌트인 `app/sitemap.ts`.
 *
 * 수동 XML 빌더(app/sitemap.xml/route.ts)에서 빌트인으로 전환한 이유:
 * - XML 이스케이프 실수 위험 제거
 * - `MetadataRoute.Sitemap` 타입으로 컴파일 타임 검증
 * - `changeFrequency`·`priority` 필드명 표준 준수
 *
 * `lastModified`는 `siteConfig.pageUpdatedAt`에서 읽어 들인 ISO 8601 문자열을
 * `Date` 인스턴스로 변환해 Next.js가 W3C Datetime 형식으로 직렬화하도록 맡깁니다.
 */

type SitemapSourceEntry = {
  path: string;
  lastModified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const sitemapSourceEntries: SitemapSourceEntry[] = [
  {
    path: "/",
    lastModified: siteConfig.pageUpdatedAt.home,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about",
    lastModified: siteConfig.pageUpdatedAt.about,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/ceo",
    lastModified: siteConfig.pageUpdatedAt.ceo,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/history",
    lastModified: siteConfig.pageUpdatedAt.history,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/products",
    lastModified: siteConfig.pageUpdatedAt.products,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    lastModified: siteConfig.pageUpdatedAt.contact,
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapSourceEntries.map((entry) => ({
    url: absoluteUrl(entry.path),
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
