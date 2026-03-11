import type { Metadata } from "next";
import ContactPageClient from "./contact-page-client";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "수북농업 제품 및 농업 솔루션 상담 문의 페이지입니다. 본사 연락처와 상담 폼을 확인하세요.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
