import assert from "node:assert/strict";

import { chromium } from "playwright";

const base = process.env.SBNG_TEST_TARGET_URL ?? "http://localhost:3004";
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(new URL(base).hostname),
  "Run gallery checks against a local server only.",
);
const products = [
  { id: "heukson", name: "흙손" },
  { id: "heukboyak", name: "흙보약" },
  { id: "mudeungsan", name: "무등산" },
];
const labels = ["제품 앞면", "포장 뒷면", "안내 시트"];
const thumbnail = ".product-main-image > div:not([hidden]) > button img";
const browser = await chromium.launch({ headless: true });
const results = [];
try {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    const context = await browser.newContext({ viewport });
    try {
      // Empty browser cache plus delayed images: preparation must happen before
      // selection, rather than depending on a fast or already cached response.
      await context.route("**/_next/image?**", async (route) => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        await route.continue();
      });
      const page = await context.newPage();
      const requested = [];
      page.on("request", (request) => {
        if (request.resourceType() === "image") requested.push(request.url());
      });
      await page.goto(base + "/products");
      await page.locator("main.products-page").waitFor({ state: "visible" });
      await page.evaluate(() => document.fonts.ready);
      const distant = page.locator("#product-mudeungsan .product-gallery");
      const top = await distant.evaluate(
        (element) => element.getBoundingClientRect().top,
      );
      assert.ok(
        top > viewport.height + 600,
        "The last gallery starts outside the preparation margin",
      );
      assert.ok(
        !requested.some((url) => /mudeungsan-(?:back|sheet)/.test(url)),
        "Offscreen alternatives must not all load at page entry",
      );

      for (const { id, name } of products) {
        const gallery = page.locator(`#product-${id} .product-gallery`);
        await gallery.scrollIntoViewIfNeeded();
        await page.waitForFunction((productId) => {
          const images = document.querySelectorAll(
            `#product-${productId} .product-main-image > div > button img`,
          );
          return (
            images.length === 3 &&
            [...images].every(
              (image) => image.complete && image.naturalWidth > 0,
            )
          );
        }, id);
        const urls = await gallery
          .locator(".product-main-image > div > button img")
          .evaluateAll((images) => images.map((image) => image.currentSrc));
        assert.equal(
          new Set(urls).size,
          3,
          "All three distinct display images are prepared",
        );

        for (const label of labels) {
          const before = requested.filter((url) => url.includes(id)).length;
          const start = performance.now();
          const option = gallery.getByRole("button", {
            name: label,
            exact: true,
          });
          await option.focus();
          await page.keyboard.press("Enter");
          await gallery.locator(thumbnail).evaluate((image) => image.decode());
          assert.equal(await option.getAttribute("aria-pressed"), "true");
          assert.equal(
            await gallery.locator(thumbnail).getAttribute("alt"),
            `${name} ${label}`,
          );
          assert.equal(
            await gallery.locator("figcaption").textContent(),
            `${name} · ${label}`,
          );
          assert.equal(
            requested.filter((url) => url.includes(id)).length,
            before,
            "Selecting a prepared image must not start another image request",
          );
          const selectionMilliseconds = Math.round(performance.now() - start);

          const displayUrl = await gallery
            .locator(thumbnail)
            .evaluate((image) => image.currentSrc);
          await gallery
            .getByRole("button", { name: `${name} ${label} 크게 보기` })
            .click();
          const dialog = page.locator(".image-dialog[open]");
          await dialog.waitFor({ state: "visible" });
          await dialog.locator("img").evaluate((image) => image.decode());
          const zoomUrl = await dialog
            .locator("img")
            .evaluate((image) => image.currentSrc);
          assert.ok(
            Number(new URL(zoomUrl).searchParams.get("w")) >=
              Number(new URL(displayUrl).searchParams.get("w")),
            "Zoom retains at least the display resolution at this viewport",
          );
          await page.keyboard.press("Escape");
          await dialog.waitFor({ state: "hidden" });
          await page.waitForFunction(() => document.body.style.overflow === "");
          assert.equal(
            await page.evaluate(() => document.body.style.overflow),
            "",
          );
          assert.equal(
            await gallery
              .getByRole("button", { name: `${name} ${label} 크게 보기` })
              .evaluate((button) => button === document.activeElement),
            true,
            "Closing returns focus to the selected image",
          );
          results.push({
            viewport: viewport.width,
            product: id,
            label,
            selectionMilliseconds,
          });
        }
        // Revisit a warmed panel: both its display image and dialog stay usable.
        await gallery
          .getByRole("button", { name: "제품 앞면", exact: true })
          .click();
        await gallery.locator(thumbnail).evaluate((image) => image.decode());
        assert.equal(
          await gallery.locator(thumbnail).getAttribute("alt"),
          name + " 제품 앞면",
        );
      }
    } finally {
      await context.close();
    }
  }
  console.log(
    JSON.stringify({ passed: results.length, cases: results }, null, 2),
  );
} finally {
  await browser.close();
}
