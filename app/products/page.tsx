import type { Metadata } from "next";
import ProductsPageClient from "./products-page-client";

export const metadata: Metadata = {
  title: "제품 소개",
  description:
    "수북농업의 흙손, 흙보약, 무등산 제품 라인업과 적용 방향을 확인하세요.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
