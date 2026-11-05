import assert from "node:assert/strict";

import { chromium } from "playwright";

const base = process.env.SBNG_TEST_TARGET_URL ?? "http://localhost:3004";
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(new URL(base).hostname),
  "Run browser scroll checks against a local server only.",
);

const sizes = [
  [320, 568],
  [375, 667],
  [390, 844],
  [430, 932],
  [768, 1024],
  [844, 390],
  [1024, 768],
  [1280, 720],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
];
const sections = [
  "home-main",
  "home-company",
  "home-products",
  "home-ceo",
  "home-history",
  "home-sources",
  "home-contact",
];
const checked = [];

// Wait through native smooth scrolling and streaming layout changes, rather
// than accepting a transient position immediately after navigation or input.
async function settle(page) {
  await page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const started = performance.now();
        let quietSince = started;
        let previous = scrollY;
        function frame(now) {
          if (Math.abs(scrollY - previous) > 0.5) quietSince = now;
          previous = scrollY;
          if (now - quietSince >= 350) return resolve();
          if (now - started > 6000)
            return reject(new Error("Scroll did not settle"));
          requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      }),
  );
}

async function openHome(page, hash = "") {
  // A goto that changes only the fragment is a same-document navigation.
  // Leave the document first to exercise an actual streamed first response.
  await page.goto("about:blank");
  await page.goto(base + "/" + hash);
  await page.locator(".home-page").waitFor({ state: "visible" });
  await page.evaluate(() => document.fonts.ready);
  await settle(page);
}

async function expectPosition(page, expected, label) {
  await settle(page);
  // Sample the destination and scroll position in the same layout. A late
  // font/image layout must not leave an expected coordinate from an old frame.
  const { actual, destination } = await page.evaluate((target) => {
    const max = document.documentElement.scrollHeight - innerHeight;
    return {
      actual: scrollY,
      destination:
        typeof target === "number"
          ? target
          : target === "footer"
            ? max
            : Math.min(
                max,
                scrollY +
                  document.getElementById(target).getBoundingClientRect().top,
              ),
    };
  }, expected);
  assert.ok(
    Math.abs(actual - destination) <= 2,
    `${label}: expected ${destination}, got ${actual}`,
  );
  checked.push(label);
  console.log("OK " + label);
}

const browser = await chromium.launch({ headless: true });
try {
  for (const [width, height] of sizes) {
    // Each first visit has fresh history/storage. Reload tests alone can hide
    // this bug by restoring the previous document's scroll position.
    const context = await browser.newContext({ viewport: { width, height } });
    try {
      const page = await context.newPage();
      await openHome(page);
      await expectPosition(page, 0, `first visit ${width}x${height}`);
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollSnapType,
        ),
        "y mandatory",
        "Touch/scrollbar snapping remains enabled after reveal",
      );
      assert.equal(
        await page
          .locator("footer")
          .evaluate((el) => getComputedStyle(el).scrollSnapAlign),
        "end",
        "The footer remains a snap destination",
      );
    } finally {
      await context.close();
    }
  }

  for (const reducedMotion of ["no-preference", "reduce"]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion,
    });
    try {
      const page = await context.newPage();
      for (const id of [...sections, "main-content", "phone-contact"]) {
        await openHome(page, "#" + id);
        await expectPosition(
          page,
          id === "main-content" ? 0 : id === "phone-contact" ? "footer" : id,
          `direct fragment ${id} (${reducedMotion})`,
        );
      }
      await openHome(page, "#unknown-section");
      await expectPosition(page, 0, `unknown fragment (${reducedMotion})`);
      await openHome(page);
      await page.keyboard.press("PageDown");
      await expectPosition(page, "home-company", `PageDown (${reducedMotion})`);
      await page.keyboard.press("ArrowUp");
      await expectPosition(page, 0, `ArrowUp (${reducedMotion})`);
      await page.mouse.wheel(0, 120);
      await expectPosition(page, "home-company", `wheel (${reducedMotion})`);
      await page.keyboard.press("End");
      await expectPosition(page, "footer", `footer End (${reducedMotion})`);
      await page.keyboard.press("ArrowUp");
      await expectPosition(
        page,
        "home-contact",
        `footer return (${reducedMotion})`,
      );

      // Next restores fragment entries to their target. The page itself must
      // also return: native hash entries used to leave the detail UI mounted.
      await page.locator('.home-section-nav a[href="#home-products"]').click();
      await expectPosition(
        page,
        "home-products",
        `section link (${reducedMotion})`,
      );
      await page.mouse.wheel(0, 120);
      await expectPosition(
        page,
        "home-ceo",
        `scroll beyond fragment (${reducedMotion})`,
      );
      await page.locator('.desktop-nav a[href="/about"]').click();
      await page.waitForURL(base + "/about");
      await settle(page);
      assert.equal(
        await page.evaluate(
          () => getComputedStyle(document.documentElement).scrollSnapType,
        ),
        "none",
        "Home snapping must not leak into detail pages",
      );
      await page.goBack();
      assert.equal(
        new URL(page.url()).pathname,
        "/",
        "Back returns to home URL",
      );
      await page.locator(".home-page").waitFor({ state: "visible" });
      await expectPosition(
        page,
        "home-products",
        `back restores home and fragment (${reducedMotion})`,
      );
      await page.goForward();
      await page.waitForURL(base + "/about");
      await page
        .getByRole("link", { name: "수북농업 홈", exact: true })
        .first()
        .click();
      await page.waitForURL(base + "/#home-main");
      await expectPosition(page, 0, `detail to home (${reducedMotion})`);
      await page.keyboard.press("End");
      await expectPosition(
        page,
        "footer",
        `footer before repeated home link (${reducedMotion})`,
      );
      await page
        .getByRole("link", { name: "수북농업 홈", exact: true })
        .first()
        .click();
      await expectPosition(
        page,
        0,
        `repeated home fragment (${reducedMotion})`,
      );

      await openHome(page);
      await page.mouse.wheel(0, 120);
      await expectPosition(
        page,
        "home-company",
        `scroll without fragment (${reducedMotion})`,
      );
      const savedWithoutFragment = await page.evaluate(() => scrollY);
      await page.locator('.desktop-nav a[href="/about"]').click();
      await page.waitForURL(base + "/about");
      await page.locator(".business-page").waitFor({ state: "visible" });
      await page.goBack();
      await page.locator(".home-page").waitFor({ state: "visible" });
      await expectPosition(
        page,
        savedWithoutFragment,
        `back restores position without fragment (${reducedMotion})`,
      );
    } finally {
      await context.close();
    }
  }

  const context = await browser.newContext({
    viewport: { width: 320, height: 568 },
  });
  try {
    const page = await context.newPage();
    await openHome(page);
    await page.keyboard.press("ArrowDown");
    const heroEnd = await page
      .locator("#home-main")
      .evaluate((el) => el.getBoundingClientRect().height - innerHeight);
    assert.ok(heroEnd > 0, "The small viewport exercises an oversized section");
    await expectPosition(
      page,
      Math.min(96, heroEnd),
      "long mobile hero keeps remaining content reachable",
    );
    await page.setViewportSize({ width: 390, height: 844 });
    await openHome(page);
    const saved = await page.evaluate(() => scrollY);
    await page.getByRole("button", { name: "메뉴 열기" }).click();
    await page.locator("#mobile-menu[open]").waitFor({ state: "visible" });
    await page.mouse.wheel(0, 200);
    await page.keyboard.press("PageDown");
    await expectPosition(page, saved, "menu preserves background position");
    await page.keyboard.press("Escape");
    await expectPosition(page, saved, "menu closes without moving home");
    await openHome(page, "#home-products");
    await expectPosition(
      page,
      "home-products",
      "mobile direct section fragment",
    );
    const productPosition = await page.evaluate(() => scrollY);
    await page
      .getByRole("button", { name: "흙손 제품 실사 크게 보기" })
      .click();
    await page.locator(".image-dialog[open]").waitFor({ state: "visible" });
    await page.mouse.wheel(0, 200);
    await page.keyboard.press("PageDown");
    await expectPosition(
      page,
      productPosition,
      "lightbox preserves background position",
    );
    await page.keyboard.press("Escape");
    await expectPosition(
      page,
      productPosition,
      "lightbox closes without moving home",
    );
    await page.reload();
    await page.locator(".home-page").waitFor({ state: "visible" });
    await expectPosition(
      page,
      productPosition,
      "reload retains fragment destination",
    );
  } finally {
    await context.close();
  }

  console.log(`Home scroll browser checks passed: ${checked.length}`);
} finally {
  await browser.close();
}
