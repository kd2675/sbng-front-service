import type { Metadata } from "next";
import HistoryPageClient from "./HistoryPageClient";

export const metadata: Metadata = {
  title: "회사 연혁",
  description:
    "김종수 대표와 수북농업의 공개 기사, 사업자 정보, 회사 자료를 바탕으로 연혁 흐름을 소개합니다.",
  alternates: {
    canonical: "/history",
  },
};

export default function HistoryPage() {
  return <HistoryPageClient />;
}
