import fs from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

const OUTPUT_DIR = path.join(process.cwd(), "artifacts", "home-section-check");
const TARGET_URL = process.env.TARGET_URL ?? "http://127.0.0.1:3004";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
];

async function captureViewport(browser, viewportConfig) {
  const context = await browser.newContext({
    viewport: { width: viewportConfig.width, height: viewportConfig.height },
    isMobile: viewportConfig.isMobile ?? false,
    hasTouch: viewportConfig.hasTouch ?? false,
  });
  const page = await context.newPage();

  await page.goto(TARGET_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1200);

  const results = [];

  for (let index = 0; index <= 6; index += 1) {
    const selector = `[data-section-index="${index}"]`;
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);

    const metrics = await page.locator(selector).evaluate((section) => {
      const rect = section.getBoundingClientRect();

      return {
        sectionHeight: Math.round(rect.height),
        viewportHeight: window.innerHeight,
        top: Math.round(rect.top),
        bottom: Math.round(rect.bottom),
      };
    });

    const filePath = path.join(OUTPUT_DIR, `${viewportConfig.name}-section-${index}.png`);
    await page.screenshot({ path: filePath });

    results.push({
      viewport: viewportConfig.name,
      index,
      screenshot: filePath,
      ...metrics,
    });
  }

  await context.close();
  return results;
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = [];

for (const viewport of viewports) {
  const results = await captureViewport(browser, viewport);
  report.push(...results);
}

await browser.close();

for (const item of report) {
  console.log(
    JSON.stringify({
      viewport: item.viewport,
      index: item.index,
      sectionHeight: item.sectionHeight,
      viewportHeight: item.viewportHeight,
      top: item.top,
      bottom: item.bottom,
      screenshot: path.relative(process.cwd(), item.screenshot),
    }),
  );
}
