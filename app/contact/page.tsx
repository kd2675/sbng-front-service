import type { Metadata } from "next";

import { companyInfo } from "../companyInfo";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "../siteConfig";
import { buildContactPageJsonLd } from "../structuredData";

import ContactContent from "./ContactContent";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업 문의하기 · 전화 및 위치 안내",
  description: `수북농업 대표전화 ${companyInfo.telephoneDisplay}, ${companyInfo.businessHours}, 전남 담양 사업장의 주소와 위치, 회사 정보를 안내합니다.`,
  path: "/contact",
  keywords: ["수북농업 문의", "수북농업 전화번호", "수북농업 오시는 길"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildContactPageJsonLd()} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "문의하기", path: "/contact" },
        ])}
      />
      <ContactContent />
    </>
  );
}
