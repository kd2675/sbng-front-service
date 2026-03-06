# sbng-front-service

수북농업 브랜드/기업 사이트입니다. 제품 앱이 아니라 소개, 제품, CEO, 문의, SEO 자산을 제공하는 Next.js 사이트입니다.

## 주요 라우트

- `/`
- `/about`
- `/ceo`
- `/products`
- `/contact`
- `/rss.xml`

## 특징

- 사이트 URL 고정: `https://www.subuknongeop.com`
- metadata, Open Graph, JSON-LD 포함
- sitemap 생성
- RSS 피드 제공
- Naver site verification 메타 포함
- Motion 기반 페이지 전환/표현 사용

## 실행

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## 포트

- 개발 서버: `3004`
- 프로덕션 시작: `3004`

## 기술 스택

- Next.js 16.1.6
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Motion

## 참고

- 별도 API 의존성은 거의 없습니다.
- 문서/SEO 출력 검증 시 `app/layout.tsx`, `app/sitemap.ts`, `app/rss.xml/route.ts`를 함께 확인하면 됩니다.
