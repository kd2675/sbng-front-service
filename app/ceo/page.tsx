import type { Metadata } from "next";
import CeoPageClient from "./CEOPageClient";

export const metadata: Metadata = {
  title: "김종수 대표 소개",
  description:
    "김종수 대표의 주요 활동과 수북농업·수북환경개발 관련 역할, 회사 연락처를 소개합니다.",
  alternates: {
    canonical: "/ceo",
  },
};

export default function CeoPage() {
  return <CeoPageClient />;
}
