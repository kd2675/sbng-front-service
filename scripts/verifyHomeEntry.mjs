import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

const base = process.env.SBNG_TEST_TARGET_URL ?? "http://localhost:3004";
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(new URL(base).hostname),
  "Run entry checks against a local production server only.",
);
const output = path.resolve("output/playwright/home-entry");
await mkdir(output, { recursive: true });
const archives = JSON.parse(
  await readFile(
    new URL("../app/articleArchives.json", import.meta.url),
    "utf8",
  ),
);
const routes = ["/", "/about", "/products", "/ceo", "/history", "/contact"];
const report = { documents: [], entries: [], transitions: [] };
const browser = await chromium.launch({ headless: true });

// Runs before application scripts so a hydration-dependent mask cannot pass as
// server-rendered content. Also samples in-place App Router transitions.
function observePaints() {
  window.entryDocument = crypto.randomUUID();
  window.entryPaints = [];
  let seenMain = false;
  function sample() {
    const main = document.querySelector("main:not([hidden], [hidden] *)");
    let opacity = 1;
    for (let node = main; node; node = node.parentElement)
      opacity *= Number(getComputedStyle(node).opacity);
    if (main || performance.getEntriesByName("first-contentful-paint").length)
      seenMain = true;
    if (seenMain)
      window.entryPaints.push({
        path: location.pathname,
        main: Boolean(main),
        loading: main?.getAttribute("aria-busy") === "true",
        opacity,
      });
    if (window.entryPaints.length < 3600) requestAnimationFrame(sample);
  }
  requestAnimationFrame(sample);
}

async function assertPaints(page, label) {
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      ),
  );
  const paints = await page.evaluate(() => window.entryPaints);
  assert.ok(paints.length > 0, `${label}: observed content frames`);
  assert.ok(
    paints.every((p) => p.main),
    `${label}: content never disappears`,
  );
  assert.ok(
    paints.every((p) => !p.loading),
    `${label}: no page loading interstitial`,
  );
  assert.ok(
    paints.every((p) => p.opacity >= 0.999),
    `${label}: no full-page fade`,
  );
  return {
    frames: paints.length,
    minimumOpacity: Math.min(...paints.map((p) => p.opacity)),
    paths: [...new Set(paints.map((p) => p.path))],
  };
}

try {
  for (const pathname of [...routes, `/sources/${archives[0].slug}`]) {
    const response = await fetch(base + pathname);
    const html = await response.text();
    assert.equal(response.status, 200, `${pathname}: document status`);
    assert.ok(
      !/화면을 불러오는 중입니다|class="page-transition"/.test(html),
      `${pathname}: no intermediate loading or fade wrapper`,
    );
    assert.ok(
      !/<main\b[^>]*aria-busy="true"/.test(html),
      `${pathname}: server renders content directly`,
    );
    assert.equal(
      (html.match(/<h1[\s>]/g) ?? []).length,
      1,
      `${pathname}: one title`,
    );
    report.documents.push({ path: pathname, status: response.status });
  }

  for (const [width, height] of [
    [320, 568],
    [390, 844],
    [844, 390],
    [1440, 900],
  ]) {
    for (const reducedMotion of ["no-preference", "reduce"]) {
      const label = `${width}x${height}-${reducedMotion}`;
      const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion,
      });
      let resumeScripts;
      const scriptsReady = new Promise((resolve) => {
        resumeScripts = resolve;
      });
      try {
        await context.addInitScript(observePaints);
        // Leave HTML/CSS/fonts untouched and hold only application JS. The
        // complete main must remain visible while hydration is unavailable.
        await context.route(
          /\/_next\/static\/.*\.js(?:\?|$)/,
          async (route) => {
            await scriptsReady;
            await route.continue().catch(() => {});
          },
        );
        const page = await context.newPage();
        const throttled = width === 390 && reducedMotion === "no-preference";
        if (throttled) {
          const network = await context.newCDPSession(page);
          await network.send("Network.enable");
          await network.send("Network.emulateNetworkConditions", {
            offline: false,
            latency: 120,
            downloadThroughput: 128000,
            uploadThroughput: 128000,
          });
        }
        await page.goto(base + "/", { waitUntil: "domcontentloaded" });
        await page.locator(".home-page").waitFor({ state: "visible" });
        assert.equal(
          await page.title(),
          "담양 유기질비료·퇴비 제조 | 수북농업",
        );
        const beforeHydration = await assertPaints(page, label);
        if (reducedMotion === "no-preference")
          await page.screenshot({
            path: path.join(output, `${label}-server.png`),
          });
        resumeScripts();
        await page.waitForLoadState("load");
        const afterHydration = await assertPaints(page, label);
        await page.reload({ waitUntil: "load" });
        const reload = await assertPaints(page, `${label} reload`);
        report.entries.push({
          label,
          throttled,
          beforeHydration,
          afterHydration,
          reload,
        });
        console.log(`OK first response, hydration and reload ${label}`);
      } finally {
        resumeScripts();
        await context.close();
      }
    }
  }

  const noScripts = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await noScripts.newPage();
    for (const pathname of routes) {
      await page.goto(base + pathname);
      await page
        .locator(pathname === "/" ? ".home-page" : ".business-page")
        .waitFor({ state: "visible" });
      assert.equal(
        await page.locator("h1:visible").count(),
        1,
        `${pathname}: usable without JS`,
      );
    }
    console.log("OK all six introduction pages without application JS");
  } finally {
    await noScripts.close();
  }

  for (const width of [390, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    try {
      await context.addInitScript(observePaints);
      const page = await context.newPage();
      await page.goto(base);
      const originalDocument = await page.evaluate(() => window.entryDocument);
      for (const pathname of [...routes.slice(1), "/about"]) {
        if (width < 1024)
          await page.getByRole("button", { name: "메뉴 열기" }).click();
        await page
          .locator(
            `${width < 1024 ? ".mobile-menu-links" : ".desktop-nav"} a[href="${pathname}"]`,
          )
          .click();
        await page.waitForURL(base + pathname);
        await page.locator(".business-page").waitFor({ state: "visible" });
        assert.equal(
          await page.evaluate(() => window.entryDocument),
          originalDocument,
          `${pathname}: client navigation`,
        );
      }
      await page
        .locator("#company-sources .source-disclosure summary")
        .first()
        .click();
      const archive = page.locator('a[href^="/sources/"]').first();
      const archivePath = await archive.getAttribute("href");
      await archive.click();
      await page.waitForURL(base + archivePath);
      await page.locator(".archive-page").waitFor({ state: "visible" });
      await page
        .getByRole("link", { name: "수북농업 홈", exact: true })
        .first()
        .click();
      await page.waitForURL(base + "/#home-main");
      await page.locator(".home-page").waitFor({ state: "visible" });
      assert.equal(
        await page.evaluate(() => window.entryDocument),
        originalDocument,
        "Return to home keeps the document",
      );
      const paints = await assertPaints(page, `${width}px navigation`);
      report.transitions.push({ width, ...paints });
      console.log(`OK menu, detail, archive and home transitions ${width}px`);
    } finally {
      await context.close();
    }
  }
  console.log(
    "Entry browser checks passed: 7 documents, 8 entry/reload cases, 6 JS-disabled pages, 2 navigation flows",
  );
} finally {
  await writeFile(
    path.join(output, "report.json"),
    JSON.stringify(report, null, 2) + "\n",
  );
  await browser.close();
}
