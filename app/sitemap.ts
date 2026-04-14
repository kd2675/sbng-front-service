import type { MetadataRoute } from "next";

const siteUrl = "https://www.subuknongeop.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/ceo", "/history", "/products", "/about", "/contact"];
  const lastModified = new Date("2026-04-14T00:00:00+09:00");

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
