import { NextResponse } from "next/server";
import { absoluteUrl, siteConfig } from "../siteConfig";

type SitemapEntry = {
  path: string;
  lastModified: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

const sitemapEntries: SitemapEntry[] = [
  {
    path: "/",
    lastModified: siteConfig.pageUpdatedAt.home,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/ceo",
    lastModified: siteConfig.pageUpdatedAt.ceo,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/history",
    lastModified: siteConfig.pageUpdatedAt.history,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/products",
    lastModified: siteConfig.pageUpdatedAt.products,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/about",
    lastModified: siteConfig.pageUpdatedAt.about,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/contact",
    lastModified: siteConfig.pageUpdatedAt.contact,
    changeFrequency: "monthly",
    priority: 0.7,
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
  const urlsXml = sitemapEntries
    .map((entry) => {
      const lastModified = new Date(entry.lastModified).toISOString();

      return `
  <url>
    <loc>${escapeXml(absoluteUrl(entry.path))}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join("");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}
</urlset>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
