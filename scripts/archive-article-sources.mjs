import fs from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

import articleArchives from "../app/articleArchives.json" with { type: "json" };

const viewport = { width: 1440, height: 1600 };
const archiveRoot = path.join(process.cwd(), "public", "archive", "articles");
const userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function buildClip(box, clipConfig) {
  const x = clamp(Math.floor(box.x - clipConfig.padX), 0, viewport.width - 20);
  const y = clamp(Math.floor(box.y - clipConfig.padY), 0, viewport.height - 20);
  const maxWidth = viewport.width - x;
  const maxHeight = viewport.height - y;

  return {
    x,
    y,
    width: clamp(Math.floor(clipConfig.width), 20, maxWidth),
    height: clamp(Math.floor(clipConfig.height), 20, maxHeight),
  };
}

async function findLocatorBox(locator) {
  const count = await locator.count();

  if (count === 0) {
    return null;
  }

  const target = locator.first();
  await target.scrollIntoViewIfNeeded();

  return target.boundingBox();
}

async function findBox(page, entry) {
  if (entry.targetText) {
    const textLocator = page.getByText(entry.targetText, {
      exact: entry.targetExact ?? false,
    });
    const indexedLocator = textLocator.nth(entry.targetIndex ?? 0);
    const box = await findLocatorBox(indexedLocator);

    if (box) {
      return box;
    }
  }

  const selectors = entry.selectors ?? [];

  for (const selector of selectors) {
    const box = await findLocatorBox(page.locator(selector));

    if (box) {
      return box;
    }
  }

  return null;
}

async function saveSnapshot(entry) {
  const dirPath = path.join(archiveRoot, entry.slug);
  const snapshotPath = path.join(dirPath, "source.html");
  const metaPath = path.join(dirPath, "meta.json");
  const capturePath = path.join(dirPath, "capture.png");

  await fs.mkdir(dirPath, { recursive: true });

  const response = await fetch(entry.url, {
    headers: {
      "user-agent": userAgent,
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    },
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });

  const body = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(snapshotPath, body);

  return {
    dirPath,
    snapshotPath,
    metaPath,
    capturePath,
    response,
  };
}

async function capturePage(page, entry, capturePath) {
  await page.goto(entry.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(1800);

  const box = await findBox(page, entry);

  if (box) {
    const clip = buildClip(box, entry.clip);
    await page.screenshot({
      path: capturePath,
      clip,
    });
    return;
  }

  await page.screenshot({
    path: capturePath,
    fullPage: true,
  });
}

async function run() {
  await fs.mkdir(archiveRoot, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport,
    locale: "ko-KR",
    userAgent,
  });

  for (const entry of articleArchives) {
    const { snapshotPath, metaPath, capturePath, response } = await saveSnapshot(entry);

    await capturePage(page, entry, capturePath);

    await fs.writeFile(
      metaPath,
      JSON.stringify(
        {
          slug: entry.slug,
          sourceLabel: entry.sourceLabel,
          url: entry.url,
          finalUrl: response.url,
          status: response.status,
          ok: response.ok,
          archivedAt: new Date().toISOString(),
        },
        null,
        2,
      ),
    );

    console.log(`archived ${entry.slug}`);
    console.log(`  html: ${path.relative(process.cwd(), snapshotPath)}`);
    console.log(`  image: ${path.relative(process.cwd(), capturePath)}`);
  }

  await browser.close();
}

await run();
