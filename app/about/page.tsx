import type { Metadata } from "next";
import AboutPageClient from "./about-page-client";

export const metadata: Metadata = {
  title: "회사 연혁",
  description: "수북농업의 시작부터 현재까지, 토양 중심 농업 혁신 여정을 소개합니다.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
