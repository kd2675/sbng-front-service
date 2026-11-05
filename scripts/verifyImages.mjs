import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

import { chromium } from "playwright";

const base = process.env.SBNG_TEST_TARGET_URL ?? "http://localhost:3004";
assert.ok(["localhost", "127.0.0.1", "[::1]"].includes(new URL(base).hostname));
const archives = JSON.parse(
  await readFile(
    new URL("../app/articleArchives.json", import.meta.url),
    "utf8",
  ),
);
const routes = ["/", "/about", "/products", "/ceo", "/history", "/contact"];
const cases = [];
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [390, 1440, 2560]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    try {
      const page = await context.newPage();
      const imageFailures = [];
      const requested = [];
      page.on("response", (response) => {
        if (
          response.request().resourceType() === "image" &&
          response.status() >= 400
        )
          imageFailures.push({
            url: response.url(),
            status: response.status(),
          });
      });
      page.on("request", (request) => {
        if (request.resourceType() === "image") requested.push(request.url());
      });
      const paths = [
        ...routes,
        ...archives
          .filter((_, index) => width === 1440 || index === 0)
          .map((entry) => "/sources/" + entry.slug),
      ];
      for (const path of paths) {
        const started = performance.now();
        await page.goto(base + path, { waitUntil: "commit" });
        await page
          .locator("main:not([aria-busy])")
          .waitFor({ state: "visible" });
        await page.evaluate(() => document.fonts.ready);
        const mainVisibleMs = Math.round(performance.now() - started);
        await page.locator("details").evaluateAll((elements) => {
          elements.forEach((element) => {
            element.open = true;
          });
        });
        const images = page.locator("img:visible");
        const count = await images.count();
        const records = [];
        for (let index = 0; index < count; index++) {
          const image = images.nth(index);
          await image.scrollIntoViewIfNeeded();
          await image.evaluate((element) => element.decode());
          const record = await image.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return {
              src: element.currentSrc,
              alt: element.getAttribute("alt"),
              naturalWidth: element.naturalWidth,
              naturalHeight: element.naturalHeight,
              renderedWidth: rect.width,
              renderedHeight: rect.height,
              sizes: element.sizes,
              loading: element.loading,
              fit: getComputedStyle(element).objectFit,
            };
          });
          assert.ok(
            record.naturalWidth > 0 && record.naturalHeight > 0,
            path + " decoded image",
          );
          assert.notEqual(record.alt, null, path + " image alt attribute");
          const requestedWidth = Number(
            new URL(record.src).searchParams.get("w"),
          );
          if (requestedWidth)
            assert.ok(
              requestedWidth <= Math.max(128, record.renderedWidth * 3),
              `${path} oversized request: ${record.src}`,
            );
          records.push(record);
        }
        const trigger = page
          .locator("main button[aria-haspopup='dialog']:visible")
          .first();
        if (await trigger.count()) {
          await trigger.scrollIntoViewIfNeeded();
          await trigger.click();
          const dialog = page.locator(".image-dialog[open]");
          await dialog.locator("img").evaluate((image) => image.decode());
          await page.waitForFunction(
            () =>
              document
                .querySelector(".image-dialog[open] [aria-busy]")
                ?.getAttribute("aria-busy") === "false",
          );
          assert.equal(
            await dialog
              .locator("img")
              .evaluate((image) => getComputedStyle(image).objectFit),
            "contain",
          );
          await page.keyboard.press("Escape");
          await page.waitForFunction(
            () =>
              !document.querySelector("dialog[open]") &&
              document.body.style.overflow === "",
          );
          assert.equal(
            await trigger.evaluate(
              (element) => document.activeElement === element,
            ),
            true,
          );
        }
        cases.push({ path, width, mainVisibleMs, images: records });
        console.log(`OK ${width}px ${path}: ${records.length} images`);
      }
      assert.deepEqual(
        imageFailures,
        [],
        "All requested image responses succeed",
      );
      assert.ok(
        !requested.some((url) => /ceo-card|sheet-600/.test(url)),
        "Unused large originals are not page downloads",
      );
    } finally {
      await context.close();
    }
  }
  const report = {
    pages: cases.length,
    images: cases.reduce((sum, entry) => sum + entry.images.length, 0),
    cases,
  };
  if (process.env.SBNG_IMAGE_AUDIT_REPORT)
    await writeFile(
      process.env.SBNG_IMAGE_AUDIT_REPORT,
      JSON.stringify(report, null, 2) + "\n",
    );
  console.log(
    `Image audit passed: ${report.pages} page/viewport combinations, ${report.images} decoded images.`,
  );
} finally {
  await browser.close();
}
