import { NextResponse } from "next/server";
import { absoluteUrl, siteConfig } from "../siteConfig";

const feedUrl = absoluteUrl("/rss.xml");

type FeedItem = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
};

const feedItems: FeedItem[] = [
  {
    title: "수북농업 공식 홈페이지",
    description: siteConfig.defaultDescription,
    path: "/",
    publishedAt: siteConfig.siteUpdatedAt,
  },
  {
    title: "김종수 대표 소개",
    description: "김종수 대표의 주요 활동과 회사 연락처를 소개합니다.",
    path: "/ceo",
    publishedAt: siteConfig.siteUpdatedAt,
  },
  {
    title: "제품 소개",
    description: "흙손, 흙보약, 무등산 제품 라인업과 주요 사용 정보를 소개합니다.",
    path: "/products",
    publishedAt: siteConfig.siteUpdatedAt,
  },
  {
    title: "수북농업 연혁",
    description: "김종수 대표와 수북농업의 공개 기사, 사업자 정보 흐름을 사진과 함께 소개합니다.",
    path: "/history",
    publishedAt: siteConfig.siteUpdatedAt,
  },
  {
    title: "회사 정보",
    description: "수북농업의 회사 소개와 담양 사업장 정보, 주요 연혁을 소개합니다.",
    path: "/about",
    publishedAt: siteConfig.siteUpdatedAt,
  },
  {
    title: "문의하기",
    description: "수북농업 본사 연락처, 이메일, 휴대전화와 문의 접수 창구를 안내합니다.",
    path: "/contact",
    publishedAt: siteConfig.siteUpdatedAt,
  },
];

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const lastBuildDate = new Date().toUTCString();

  const itemsXml = feedItems
    .map((item) => {
      const itemUrl = absoluteUrl(item.path);

      return `
      <item>
        <title>${escapeXml(item.title)}</title>
        <description>${escapeXml(item.description)}</description>
        <link>${escapeXml(itemUrl)}</link>
        <guid isPermaLink="true">${escapeXml(itemUrl)}</guid>
        <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      </item>`;
    })
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>수북농업 RSS Feed</title>
    <description>${siteConfig.defaultDescription}</description>
    <link>${siteConfig.siteUrl}</link>
    <language>ko-kr</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
