import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import JsonLd from "../components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "../siteConfig";
import { buildContactPageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업 문의",
  description:
    "수북농업 본사 연락처, 이메일, 휴대전화, 상담 문의 접수 창구와 담양 사업장 정보를 안내합니다.",
  path: "/contact",
  keywords: ["수북농업 문의", "수북농업 연락처", "담양 수북농업 전화번호"],
  imagePath: "/image/ceo-card.png",
  imageAlt: "수북농업 연락처 카드 이미지",
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
      <ContactPageClient />
    </>
  );
}
