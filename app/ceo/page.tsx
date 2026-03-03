import type { Metadata } from "next";
import CeoPageClient from "./ceo-page-client";

export const metadata: Metadata = {
  title: "CEO 소개",
  description:
    "수북농업 CEO의 경영 철학과 농업 혁신 비전을 소개합니다.",
  alternates: {
    canonical: "/ceo",
  },
};

export default function CeoPage() {
  return <CeoPageClient />;
}
