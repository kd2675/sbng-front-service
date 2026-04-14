import type { Viewport } from "next";
import { siteConfig } from "./siteConfig";

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};
