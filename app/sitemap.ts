import type { MetadataRoute } from "next";
import { absoluteUrl, siteConfig } from "./siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/ceo", "/history", "/products", "/about", "/contact"];
  const lastModified = new Date(siteConfig.siteUpdatedAt);

  return routes.map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
