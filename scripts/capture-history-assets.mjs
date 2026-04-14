import fs from "node:fs/promises";
import path from "node:path";

import { chromium } from "playwright";

const viewport = { width: 1440, height: 1600 };
const outputDir = path.join(process.cwd(), "public", "image", "history");

const targets = [
  {
    id: "history-kofic-2014-07-09.png",
    url: "https://kofic92.or.kr/about/sub02",
    type: "text",
    text: "제3대 김종수 이사장 취임",
    clip: { width: 860, height: 520, padX: 180, padY: 240 },
  },
  {
    id: "history-nongmin-2014-07-14.png",
    url: "https://www.nongmin.com/article/20140713094869",
    type: "selector",
    selectors: ["#contents .view_cont", "#contents .news_view"],
    clip: { width: 1160, height: 760, padX: 40, padY: 40 },
  },
  {
    id: "history-newsam-2015-06-18.png",
    url: "https://www.newsam.co.kr/news/article.html?no=8253",
    type: "selector",
    selectors: [".arv_001_01", ".art_top", ".cnt_view.news_body_area"],
    clip: { width: 760, height: 900, padX: 40, padY: 40 },
  },
  {
    id: "history-nongmin-2016-09-05.png",
    url: "https://www.nongmin.com/article/20160903062432",
    type: "selector",
    selectors: ["#contents .view_cont", "#contents .news_view"],
    clip: { width: 1160, height: 760, padX: 40, padY: 40 },
  },
  {
    id: "history-newsfm-2019-03-14.png",
    url: "https://www.newsfm.kr/news/article_print.html?no=3557",
    type: "selector",
    selectors: [".art_tit", ".cnt_view"],
    clip: { width: 760, height: 900, padX: 40, padY: 30 },
  },
  {
    id: "history-weeklypeople-2020-02-03-main.jpg",
    url: "http://weeklypeople.co.kr/news/view.php?no=2086",
    type: "selector",
    selectors: ["img[src*='15807021629762.jpg']", ".view_con img", ".article img"],
    clip: { width: 760, height: 760, padX: 40, padY: 40 },
  },
  {
    id: "history-newsfm-2020-08-07.png",
    url: "https://www.newsfm.kr/news/article_print.html?no=4987",
    type: "selector",
    selectors: [".art_tit", ".cnt_view"],
    clip: { width: 760, height: 900, padX: 40, padY: 30 },
  },
  {
    id: "history-newsam-2021-02-24.png",
    url: "https://www.newsam.co.kr/news/article.html?no=32817",
    type: "selector",
    selectors: [".arv_001_01", ".art_top", ".cnt_view.news_body_area"],
    clip: { width: 760, height: 900, padX: 40, padY: 40 },
  },
  {
    id: "history-jgkoreaja-2023-01-19.jpg",
    url: "http://www.jgkoreaja.com/article.asp?aid=167411243060801023",
    type: "selector",
    selectors: ["#content img", "img[src*='60801_s.jpg']"],
    clip: { width: 760, height: 520, padX: 40, padY: 40 },
  },
  {
    id: "history-kofic-2024-08-25.png",
    url: "https://kofic92.or.kr/about/sub02",
    type: "text",
    text: "2024.08.25",
    clip: { width: 860, height: 520, padX: 180, padY: 180 },
  },
  {
    id: "history-114on-2026-03-03.png",
    url: "https://www.114.co.kr/biznumber/detail/f27099f463c1",
    type: "selector",
    selectors: ["table.tbl2.row", ".tbl2.row"],
    clip: { width: 1160, height: 420, padX: 40, padY: 40 },
  },
];

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

async function findBox(page, target) {
  if (target.type === "text") {
    const locator = page.getByText(target.text, { exact: false }).first();
    await locator.scrollIntoViewIfNeeded();
    return locator.boundingBox();
  }

  for (const selector of target.selectors) {
    const locator = page.locator(selector).first();
    const count = await page.locator(selector).count();

    if (count === 0) {
      continue;
    }

    await locator.scrollIntoViewIfNeeded();
    const box = await locator.boundingBox();

    if (box) {
      return box;
    }
  }

  return null;
}

async function run() {
  await fs.mkdir(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport, locale: "ko-KR" });

  for (const target of targets) {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1800);

    const box = await findBox(page, target);

    if (!box) {
      throw new Error(`캡처 영역을 찾지 못했습니다: ${target.id}`);
    }

    const clip = buildClip(box, target.clip);
    const outputPath = path.join(outputDir, target.id);

    await page.screenshot({
      path: outputPath,
      clip,
    });

    console.log(`saved ${path.relative(process.cwd(), outputPath)}`);
  }

  await browser.close();
}

await run();
