import type { Metadata } from "next";
import CeoPageClient from "./CEOPageClient";
import JsonLd from "../components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "../siteConfig";
import { buildCeoProfilePageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "김종수 대표 소개",
  description:
    "수북농업 김종수 대표의 주요 활동, 공개 연혁, 수북환경개발 관련 역할과 현재 공개 기록을 소개합니다.",
  path: "/ceo",
  keywords: ["김종수 대표", "수북농업 대표", "김종수 연혁", "수북환경개발"],
  imagePath: "/image/kim-jong-su-portrait.jpg",
  imageAlt: "수북농업 김종수 대표 사진",
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
      <CeoPageClient />
    </>
  );
}
