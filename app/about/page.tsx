import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "회사 정보",
  description:
    "수북농업의 회사 소개, 담양 사업장 정보, 주요 연혁과 제품 자료를 소개합니다.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
