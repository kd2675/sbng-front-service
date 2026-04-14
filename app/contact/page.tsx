import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "문의하기",
  description:
    "수북농업 본사 연락처, 이메일, 휴대전화와 상담 문의 창구를 안내합니다.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
