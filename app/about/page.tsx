import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import JsonLd from "../components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "../siteConfig";
import { buildAboutPageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업 회사 정보",
  description:
    "수북농업 회사 소개, 담양 사업장 정보, 공개 사업자 정보, 현장 사진과 업계 활동 자료를 소개합니다.",
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
          { name: "회사 정보", path: "/about" },
        ])}
      />
      <AboutPageClient />
    </>
  );
}
