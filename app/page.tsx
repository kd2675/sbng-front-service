import type { Metadata } from "next";
import JsonLd from "./components/JsonLd";
import HomePageClient from "./HomePageClient";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
  siteConfig,
} from "./siteConfig";

export const metadata: Metadata = buildPageMetadata({
  title: "수북농업",
  description: siteConfig.defaultDescription,
  path: "/",
  keywords: ["담양 유기질비료", "수북농업 제품", "김종수 대표", "흙손 흙보약 무등산"],
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          name: "수북농업",
          description: siteConfig.defaultDescription,
          path: "/",
        })}
      />
      <JsonLd data={buildBreadcrumbJsonLd([{ name: "홈", path: "/" }])} />
      <HomePageClient />
    </>
  );
}
