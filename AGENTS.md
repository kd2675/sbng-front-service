<!-- Parent: ../AGENTS.md -->
<!-- Updated: 2026-03-06 -->

# sbng-front-service

## Purpose

수북농업 브랜드 사이트입니다. 제품 판매/운영 앱이 아니라 소개성 웹사이트와 SEO 자산을 관리합니다.

## Key Files

| File | Description |
|---|---|
| `package.json` | Next.js/Motion 의존성과 스크립트 |
| `app/layout.tsx` | 전역 metadata, structured data, verification 메타 |
| `app/sitemap.ts` | 사이트맵 생성 |
| `app/rss.xml/route.ts` | RSS 피드 생성 |
| `app/components/site-nav.tsx` | 공통 네비게이션 |
| `app/components/site-footer.tsx` | 공통 푸터 |

## Routes

- `/`
- `/about`
- `/ceo`
- `/products`
- `/contact`
- `/rss.xml`

## Run / Check

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Runtime Notes

- 포트는 `3004`입니다.
- `siteUrl`은 `https://www.subuknongeop.com`으로 고정돼 있습니다.
- 기능 변경 시 화면뿐 아니라 metadata, sitemap, RSS까지 같이 점검하는 편이 맞습니다.
- `/contact`는 현재 정적 폼 UI이며 실전 전송 처리까지 연결된 상태는 아닙니다.
- 연락처와 주소 성격의 텍스트에는 placeholder 또는 고정 문자열이 섞여 있을 수 있습니다.

## Agent Rules

- 이 앱은 서비스 운영 콘솔이 아니라 브랜드/SEO 사이트라는 전제를 유지합니다.
- 페이지 수정 시 `layout.tsx`, `sitemap.ts`, `rss.xml/route.ts`의 정합성도 함께 확인합니다.
- 현재 린트는 `<img>` 최적화 경고가 남아 있으므로 성능 개선 작업과 콘텐츠 수정 작업을 구분합니다.
