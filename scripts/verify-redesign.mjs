import fs from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

const baseUrl = process.env.TARGET_URL ?? "http://127.0.0.1:3004";
const outputDir = path.join(process.cwd(), "artifacts", "redesign-check");

const targets = [
  { slug: "home", path: "/" },
  { slug: "about", path: "/about" },
  { slug: "products", path: "/products" },
  { slug: "contact", path: "/contact" },
];

const viewports = [
  { slug: "desktop", width: 1440, height: 900, isMobile: false, hasTouch: false },
  { slug: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
];

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile,
    hasTouch: viewport.hasTouch,
  });

  const page = await context.newPage();

  for (const target of targets) {
    await page.goto(`${baseUrl}${target.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1400);

    const title = await page.title();
    const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const viewportHeight = viewport.height;
    const scrollPositions = [0, 0.45, 0.82].map((ratio) =>
      Math.max(0, Math.round((pageHeight - viewportHeight) * ratio)),
    );

    for (const [index, scrollTop] of scrollPositions.entries()) {
      await page.evaluate((value) => window.scrollTo({ top: value, behavior: "instant" }), scrollTop);
      await page.waitForTimeout(500);

      const screenshotPath = path.join(outputDir, `${viewport.slug}-${target.slug}-${index}.png`);
      await page.screenshot({ path: screenshotPath });

      console.log(
        JSON.stringify({
          viewport: viewport.slug,
          page: target.path,
          title,
          scrollTop,
          screenshot: path.relative(process.cwd(), screenshotPath),
        }),
      );
    }
  }

  await context.close();
}

await browser.close();
