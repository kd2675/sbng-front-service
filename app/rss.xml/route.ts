import { NextResponse } from "next/server";

const siteUrl = "https://www.subuknongeop.com";
const feedUrl = `${siteUrl}/rss.xml`;

type FeedItem = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
};

const feedItems: FeedItem[] = [
  {
    title: "수북농업 공식 홈페이지",
    description: "토양 중심 농업 솔루션과 대표 제품 3종 안내를 확인할 수 있습니다.",
    path: "/",
    publishedAt: "2026-02-18T00:00:00+09:00",
  },
  {
    title: "CEO 소개",
    description: "수북농업 CEO의 경영 철학과 농업 혁신 비전을 소개합니다.",
    path: "/ceo",
    publishedAt: "2026-01-29T00:00:00+09:00",
  },
  {
    title: "제품 소개",
    description: "흙손, 흙보약, 무등산 제품 라인업과 적용 방향을 확인할 수 있습니다.",
    path: "/products",
    publishedAt: "2026-02-18T00:00:00+09:00",
  },
  {
    title: "회사 연혁",
    description: "수북농업의 시작부터 현재까지의 농업 혁신 여정을 소개합니다.",
    path: "/about",
    publishedAt: "2026-01-10T00:00:00+09:00",
  },
  {
    title: "문의하기",
    description: "제품 및 농업 솔루션 상담 문의와 본사 연락처를 확인할 수 있습니다.",
    path: "/contact",
    publishedAt: "2026-01-10T00:00:00+09:00",
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
      const itemUrl = `${siteUrl}${item.path}`;

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
    <description>수북농업 홈페이지 주요 페이지 및 업데이트 안내</description>
    <link>${siteUrl}</link>
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
