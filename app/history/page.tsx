import type { Metadata } from "next";
import HistoryPageClient from "./HistoryPageClient";
import JsonLd from "../components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "../siteConfig";
import { buildHistoryCollectionPageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업 연혁",
  description:
    "김종수 대표와 수북농업의 공개 기사, 사업자 정보, 회사 자료를 바탕으로 연혁 흐름을 사진과 함께 소개합니다.",
  path: "/history",
  keywords: ["수북농업 연혁", "김종수 연혁", "수북농업 기사", "수북농업 공개 기록"],
  imagePath: "/image/history/history-weeklypeople-2020-02-03-main.jpg",
  imageAlt: "수북농업 연혁 대표 이미지",
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
      <HistoryPageClient />
    </>
  );
}
