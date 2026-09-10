import type { Metadata } from "next";
import HistoryContent from "./HistoryContent";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "../siteConfig";
import { buildHistoryCollectionPageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업 연혁",
  description:
    "1996년 설립부터 이어온 수북농업과 김종수 대표의 발자취를 사진과 출처가 연결된 타임라인으로 소개합니다.",
  path: "/history",
  keywords: [
    "수북농업 연혁",
    "김종수 연혁",
    "수북농업 기사",
    "수북농업 공개 기록",
  ],
});

export default function HistoryPage() {
  return (
    <>
      <JsonLd data={buildHistoryCollectionPageJsonLd()} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "연혁", path: "/history" },
        ])}
      />
      <HistoryContent />
    </>
  );
}
