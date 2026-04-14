import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import JsonLd from "../components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "../siteConfig";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업 문의",
  description:
    "수북농업 본사 연락처, 이메일, 휴대전화, 상담 문의 접수 창구와 담양 사업장 정보를 안내합니다.",
  path: "/contact",
  keywords: ["수북농업 문의", "수북농업 연락처", "담양 수북농업 전화번호"],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          name: "수북농업 문의",
          description:
            "수북농업 본사 연락처, 이메일, 휴대전화, 상담 문의 접수 창구와 담양 사업장 정보를 안내합니다.",
          path: "/contact",
        })}
      />
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
