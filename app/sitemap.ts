import type { MetadataRoute } from "next";

const siteUrl = "https://www.subuknongup.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/products", "/about", "/sustainability", "/contact"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
