import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "../siteConfig";
import { buildAboutPageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업 회사 소개",
  description:
    "1996년 설립한 수북농업의 회사 개요, 유기질비료·퇴비 사업, 생산 현장, 담양 사업장과 회사 자료를 안내합니다.",
  path: "/about",
  keywords: ["수북농업 회사 정보", "담양 수북농업 주소", "수북농업 현장 사진"],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildAboutPageJsonLd()} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "회사 소개", path: "/about" },
        ])}
      />
      <AboutContent />
    </>
  );
}
