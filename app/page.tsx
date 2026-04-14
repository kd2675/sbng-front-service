import type { Metadata } from "next";
import JsonLd from "./components/JsonLd";
import HomePageClient from "./HomePageClient";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "./siteConfig";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업",
  description:
    "농업회사법인 (유) 수북농업의 회사 정보와 제품 안내를 전합니다.",
  path: "/",
  keywords: ["담양 유기질비료", "수북농업 제품", "김종수 대표", "흙손 흙보약 무등산"],
  imageAlt: "수북농업 로고",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          name: "수북농업",
          description:
            "농업회사법인 (유) 수북농업의 회사 정보와 제품 안내를 전합니다.",
          path: "/",
        })}
      />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "홈", path: "/" }])} />
      <HomePageClient />
    </>
  );
}
