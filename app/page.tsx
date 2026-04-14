import type { Metadata } from "next";
import JsonLd from "./components/JsonLd";
import HomePageClient from "./HomePageClient";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "./siteConfig";

export const metadata: Metadata = buildPageMetadata({
  title: "담양 유기질비료 수북농업",
  description:
    "전남 담양 수북농업의 회사 정보, 김종수 대표 소개, 흙손·흙보약·무등산 제품 안내를 한곳에서 전합니다.",
  path: "/",
  keywords: ["담양 유기질비료", "수북농업 제품", "김종수 대표", "흙손 흙보약 무등산"],
  imageAlt: "수북농업 김종수 대표 사진",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          name: "담양 유기질비료 수북농업",
          description:
            "전남 담양 수북농업의 회사 정보, 김종수 대표 소개, 흙손·흙보약·무등산 제품 안내를 한곳에서 전합니다.",
          path: "/",
        })}
      />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "홈", path: "/" }])} />
      <HomePageClient />
    </>
  );
}
