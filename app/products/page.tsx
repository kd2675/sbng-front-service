import type { Metadata } from "next";
import ProductsPageClient from "./ProductsPageClient";
import JsonLd from "../components/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
} from "../siteConfig";
import { buildProductsCollectionPageJsonLd } from "../structuredData";

export const metadata: Metadata = buildPageMetadata({
  title: "흙손 흙보약 무등산 제품 소개",
  description:
    "수북농업의 흙손, 흙보약, 무등산 제품 라인업과 포장 이미지, 안내 시트, 주요 사용 정보를 소개합니다.",
  path: "/products",
  keywords: ["흙손", "흙보약", "무등산", "수북농업 제품", "유기질비료 제품"],
  imagePath: "/image/heukboyak-front.jpeg",
  imageAlt: "수북농업 제품 흙보약 포장 이미지",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={buildProductsCollectionPageJsonLd()} />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "홈", path: "/" },
          { name: "제품 소개", path: "/products" },
        ])}
      />
      <ProductsPageClient />
    </>
  );
}
