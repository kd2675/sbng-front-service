import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";

export const metadata: Metadata = {
  title: "제품 소개",
  description:
    "수북농업의 흙손, 흙보약, 무등산 제품 라인업과 주요 사용 정보를 소개합니다.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
