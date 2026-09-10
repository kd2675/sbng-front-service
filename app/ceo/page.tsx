import type { Metadata } from "next";
import CeoContent from "./CeoContent";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "../siteConfig";
import { buildCeoProfilePageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "김종수 대표 소개",
  description:
    "수북농업 김종수 대표의 경영 방향, 주요 경력, 유기질비료 산업과 지역 농업 분야의 활동을 소개합니다.",
  path: "/ceo",
  keywords: ["김종수 대표", "수북농업 대표", "김종수 연혁", "수북환경개발"],
});

export default function CeoPage() {
  return (
    <>
      <JsonLd data={buildCeoProfilePageJsonLd()} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "대표 소개", path: "/ceo" },
        ])}
      />
      <CeoContent />
    </>
  );
}
