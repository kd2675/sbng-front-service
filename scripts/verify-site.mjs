import assert from "node:assert/strict";

const base = process.env.SBNG_TEST_TARGET_URL ?? "http://127.0.0.1:3004";
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(new URL(base).hostname),
  "Run retired API checks against a local server only.",
);
const routes = ["/", "/about", "/products", "/ceo", "/history", "/contact"];
const renderedPages = new Map();
const retiredLink = /^\/(?:privacy|admin|api)(?:[/?#]|$)/;
for (const route of routes) {
  const response = await fetch(base + route);
  const html = await response.text();
  renderedPages.set(route, html);
  assert.equal(response.status, 200, route + " status");
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, route + " h1");
  assert.ok(html.includes("<main "), route + " main landmark");
  assert.ok(html.includes('id="main-content"'), route + " skip target");
  assert.ok(html.includes('rel="canonical"'), route + " canonical");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.equal(response.headers.get("set-cookie"), null);
  assert.ok(html.includes('id="phone-contact"'), route + " telephone anchor");
  assert.ok(html.includes("061-383-6186"), route + " visible phone number");
  assert.doesNotMatch(html, /<(?:form|input|textarea|select)[\s>]/i);
  const links = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.ok(links.includes("tel:0613836186"), route + " call link");
  assert.ok(links.includes("/contact"), route + " contact navigation");
  assert.ok(
    links
      .filter((href) => href.startsWith("tel:"))
      .every((href) => href === "tel:0613836186"),
    route + " consistent phone destination",
  );
  assert.ok(
    !links.some((href) => retiredLink.test(href) || href.startsWith("mailto:")),
    route + " phone-only contact flow",
  );
  if (route === "/") {
    assert.deepEqual(
      [...html.matchAll(/<section\b[^>]*\bid="(home-[^"]+)"/g)].map(
        (match) => match[1],
      ),
      [
        "home-main",
        "home-company",
        "home-products",
        "home-ceo",
        "home-history",
        "home-sources",
        "home-contact",
      ],
      "Original company, product, CEO, history, resources and phone flow",
    );
    const hero = html.match(
      /<section\b[^>]*\bid="home-main"[^>]*>([\s\S]*?)<\/section>/,
    );
    assert.ok(hero, "Home introduction exists");
    assert.doesNotMatch(
      hero[1],
      /<(?:img|picture|video)\b/i,
      "Home background uses decorations only",
    );
  }
  if (route === "/contact") {
    // Development responses can include the loading shell before page content.
    const main = [...html.matchAll(/<main\b([^>]*)>([\s\S]*?)<\/main>/g)].find(
      ([, attributes]) => /\bcontact-page\b/.test(attributes),
    )?.[2];
    assert.ok(main, "Contact page content is rendered");
    for (const detail of [
      "061-383-6186",
      "평일 09:00 - 18:00",
      "전라남도 담양군 담양읍 추성로 1030",
      "농업회사법인(유)수북농업",
      "김종수",
      "409-81-31733",
    ]) {
      assert.ok(main.includes(detail), "Contact page includes " + detail);
    }
    assert.ok(
      main.includes('id="contact-location"'),
      "Contact location target",
    );
    assert.ok(
      html.includes('"@type":"ContactPage"'),
      "ContactPage structured data",
    );
  }
  if (route === "/about" || route === "/contact") {
    for (const mapSearchUrl of [
      "https://map.kakao.com/link/search/",
      "https://map.naver.com/p/search/",
    ]) {
      assert.ok(
        links.includes(
          mapSearchUrl +
            encodeURIComponent("전라남도 담양군 담양읍 추성로 1030"),
        ),
        route + " map uses the company address: " + mapSearchUrl,
      );
    }
  }
  console.log(route + " OK");
}
for (const [route, html] of renderedPages) {
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const destination = new URL(match[1], base + route);
    const targetHtml = renderedPages.get(destination.pathname);
    if (
      destination.origin !== new URL(base).origin ||
      !destination.hash ||
      !targetHtml
    )
      continue;
    const id = decodeURIComponent(destination.hash.slice(1));
    assert.ok(
      targetHtml.includes('id="' + id + '"'),
      route + " link reaches " + destination.pathname + "#" + id,
    );
  }
}
console.log("Page section links resolve to existing content");
for (const [route, contentType] of [
  ["/sitemap.xml", "xml"],
  ["/rss.xml", "xml"],
  ["/robots.txt", "text/plain"],
  ["/manifest.webmanifest", "manifest+json"],
]) {
  const response = await fetch(base + route);
  assert.equal(response.status, 200);
  assert.ok(response.headers.get("content-type")?.includes(contentType));
  if (route === "/sitemap.xml" || route === "/rss.xml") {
    const xml = await response.text();
    assert.doesNotMatch(
      xml,
      /https:\/\/www\.subuknongeop\.com\/(?:privacy|admin)[<\/?#]/,
    );
    assert.ok(
      xml.includes("https://www.subuknongeop.com/contact<"),
      route + " includes the contact page",
    );
  }
  console.log(route + " OK");
}
for (const route of ["/contact", "/contact?product=heukson"]) {
  const response = await fetch(base + route, { redirect: "manual" });
  assert.equal(response.status, 200, route + " contact page status");
  assert.equal(
    response.headers.get("location"),
    null,
    route + " does not redirect",
  );
  const html = await response.text();
  assert.ok(html.includes('id="contact-location"'), route + " contact details");
  assert.doesNotMatch(html, /<(?:form|input|textarea|select)[\s>]/i);
  console.log(route + " serves phone and location information");
}
for (const [route, method] of [
  ["/admin", "GET"],
  ["/privacy", "GET"],
  ["/api/contact", "GET"],
  ["/api/contact", "POST"],
  ["/api/admin/login", "POST"],
  ["/api/admin/logout", "POST"],
  ["/api/admin/contacts/retired-feature-probe", "PATCH"],
  ["/api/admin/contacts/retired-feature-probe", "DELETE"],
]) {
  const response = await fetch(base + route, {
    method,
    ...(method === "GET"
      ? {}
      : { headers: { "Content-Type": "application/json" }, body: "{}" }),
  });
  assert.equal(response.status, 404, method + " " + route + " removed");
  assert.equal(response.headers.get("set-cookie"), null);
  console.log(method + " " + route + " removed (404)");
}
assert.equal((await fetch(base + "/missing-sbng-review-page")).status, 404);
console.log(
  "Public routes, phone links, retired features, metadata and headers passed.",
);
