import { NextResponse } from "next/server";
import { siteConfig } from "../siteConfig";

/**
 * robots.txt Route Handler.
 *
 * Next.js 16 빌트인 `app/robots.ts` 대신 Route Handler를 사용하는 이유:
 * Daum 웹마스터 인증 주석(`#DaumWebMasterTool:...`)을 보존해야 하는데,
 * `MetadataRoute.Robots` 타입은 주석 삽입을 지원하지 않습니다.
 *
 * 운영 규칙:
 * - 기본 `*` 사용자 에이전트는 공개 영역만 허용합니다.
 * - 네이버 Yeti 봇을 명시적으로 허용해 한국 검색 노출을 확보합니다.
 * - `/admin`, `/sources/`, `/api/` 는 비공개 자료이므로 크롤링을 차단합니다.
 * - `Host:` 디렉티브는 Yandex 전용 비표준 규격이라 사용하지 않습니다.
 */

const DISALLOWED_PATHS = ["/admin", "/admin/", "/sources/", "/api/"];
const DAUM_VERIFICATION =
  "#DaumWebMasterTool:e0c3a1dc64236f133b47afde2fa564a57e7761310e8c3acb013622d0d4ce3191:R98rmM28KNmZUNVNYT21Sg==";

function buildUserAgentBlock(userAgent: string): string {
  const disallow = DISALLOWED_PATHS.map((path) => `Disallow: ${path}`).join("\n");
  return `User-agent: ${userAgent}\nAllow: /\n${disallow}`;
}

export function GET() {
  const body = [
    buildUserAgentBlock("*"),
    "",
    buildUserAgentBlock("Yeti"),
    "",
    buildUserAgentBlock("Googlebot"),
    "",
    `Sitemap: ${siteConfig.siteUrl}/sitemap.xml`,
    "",
    DAUM_VERIFICATION,
    "",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
