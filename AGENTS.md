<!-- Parent: ../AGENTS.md -->
<!-- Updated: 2026-09-10 -->

# sbng-front-service

수북농업의 회사·제품·대표·연혁 소개와 문의하기 안내 사이트입니다. `/contact`에 대표전화·상담 시간·주소·위치·회사 정보를 모으며, 상담은 대표번호 표시와 `tel:` 링크로 연결합니다.

## 실행 및 통합

- Node.js 24 LTS, Next.js 16, React 19, TypeScript strict.
- 개발/로컬 운영 포트 3004. Docker 앱 3000, Caddy 80/443.
- `npm ci`, `npm run dev`, `npm run lint`, `npm test`, `npm run build`, `npm run start`.
- 로컬 서버 실행 후 `npm run verify:site`로 전화 링크·공개 경로·제거된 기능의 응답을 검사합니다.
- Spring API나 DB 의존성은 없습니다. 기사 원문 확인과 검색 인증에 외부 서비스를 사용합니다.
- 환경 설정과 Docker 실행 절차는 `README.md`를 따릅니다.
- `.env.dev`는 `.env.local`의 복사본입니다. Docker 운영은 `.env.prod`와 `docker compose --env-file .env.prod`를 사용합니다.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`을 Google 검색 인증용 공개 빌드 인자로 전달합니다. 관리자 인증용 환경 변수는 없습니다.

## 주요 구조와 규칙

- `app/layout.tsx`에서 SiteNav·SiteFooter·본문 바로가기를 한 번만 렌더링합니다.
- 각 화면의 `main`은 `id="main-content"`와 하나의 h1을 갖습니다.
- `app/HomeContent.tsx`, `about/AboutContent.tsx`, `ceo/CeoContent.tsx`, `history/HistoryContent.tsx`, `products/ProductsContent.tsx`, `contact/ContactContent.tsx`는 서버 컴포넌트입니다.
- 클라이언트 상호작용은 메뉴·홈 섹션 이동·연혁 사진 효과·제품 자료 선택·이미지 확대를 중심으로 최소화합니다.
- 전화번호와 상담 시간은 `app/companyInfo.ts`를 사용합니다. `HomeSectionNav.tsx`는 홈의 섹션 이동과 빠른 전화 안내를 담당합니다.
- 온라인 문의 폼·관리자 화면·문의 저장 API는 제거된 기능입니다. 별도 요청 없이 다시 추가하지 않습니다.
- 문의하기는 전화·회사 위치를 안내하는 공개 페이지입니다. 회사 소개와 문의하기의 연락처·주소·지도 링크는 `companyInfo.ts`를 공통 기준으로 사용합니다.
- 디자인 토큰·헤더·메인 스크롤 규칙은 `app/globals.css`, 업체 소개 화면별 배치는 `app/companyPages.css`에서 관리합니다.
- 홈의 메인 → 회사 → 제품 → 대표 → 연혁 → 자료 → 전화 안내 순서를 유지합니다.
- 공통 메뉴는 회사 소개 → 제품 안내 → 대표 소개 → 연혁 → 문의하기 순서이며 `navItems.ts`를 헤더·모바일 메뉴·푸터의 단일 기준으로 사용합니다.
- 헤더는 밝은 표면으로 본문 배경과 관계없이 대비를 확보합니다. 1024px 미만에서는 바로 전화 버튼과 스크롤 가능한 전체 메뉴 dialog를 사용합니다.
- 메인 첫 화면은 CSS 색상·그라데이션·장식만 사용하며 내부 사진이나 배경 사진을 넣지 않습니다. 회사 현장 사진은 회사 소개의 자료 영역에 둡니다.
- 페이지별 역할을 분명히 합니다. 홈은 핵심 요약과 상세 화면 연결, 회사 소개는 사업·현장·회사 자료, 제품은 비교·성분·포장 자료, 대표 소개는 인물·경영 방향·주요 경력, 연혁은 시간순 기록, 문의하기는 전화 상담·방문 안내를 담당합니다. 회사 소개의 기존 사업장 위치 링크와 연혁의 날짜 해시 링크도 유지합니다.
- 메인의 7개 섹션 스크롤 형식과 연혁의 사진 타임라인 형식을 유지합니다. 연혁은 데스크톱에서 좌우 교차, 모바일에서 왼쪽 선을 따라 읽는 구성입니다.
- 연혁 사진은 화면 아래쪽에서 전체가 보이면 기울기와 색감이 돌아오는 스크롤 효과를 유지합니다. `history/HistoryTimeline.tsx`에서 회전하지 않는 바깥 영역의 전체 노출을 관찰하며, 모션 감소 설정에서는 처음부터 반듯한 원색 사진을 표시합니다.
- `PageHero.tsx`·`PageSectionNav.tsx`·`PageLinks.tsx`로 상세 화면의 도입부·내용 바로가기·관련 페이지를 공유합니다. 내부 링크의 해시 대상과 고정 메뉴 아래 표시 위치를 함께 확인합니다.
- `ProductGallery.tsx`는 제품의 앞면·뒷면·안내 시트를 선택하며 `LightboxImage.tsx`로 확대합니다. 자료 선택 버튼의 상태·키보드 조작·확대 후 초점 복귀를 유지합니다.
- 화면/컴포넌트는 PascalCase, 데이터/helper는 camelCase 파일명으로 작성합니다.
- 메인은 한 번의 휠 제스처·방향키 입력에 한 섹션씩 이동합니다. 터치·스크롤바 이동에는 CSS 스냅을 적용합니다. 긴 섹션은 끝까지 읽은 뒤 다음 구간으로 이동하며 내용을 잘라내지 않습니다.
- 섹션 스크롤 제어는 메인에만 적용하고 메뉴·사진 확대 dialog, 입력 요소, 확대 제스처의 기본 동작을 방해하지 않습니다. 푸터·해시 링크·다른 페이지 이동과 모션 감소 설정을 유지합니다.
- 제품·기사 자료 이미지에는 object-contain을 사용합니다. native dialog의 Escape, 포커스 이동·복귀, 배경 스크롤 잠금을 유지합니다.

## 데이터와 배포

- 현재 앱에는 문의 개인정보를 수집·저장·관리·자동 파기하는 기능이 없습니다.
- 과거 로컬 문의 파일과 Docker 볼륨을 임의 삭제하거나 변경하지 않습니다. 보유·파기는 운영자가 별도 관리합니다.
- 환경 파일과 과거 문의 기록을 Git·Docker·standalone 산출물에 포함하지 않습니다. 빌드의 postbuild 검사와 원본 보존 테스트를 유지합니다.
- 앱은 문의 저장용 볼륨 없이 실행합니다. Caddy 인증서·설정 볼륨은 유지합니다.
- 비밀값이나 과거 문의 본문·연락처를 로그에 출력하지 않습니다.

## SEO 및 검증

- 주요 경로: /, /about, /ceo, /history, /products, /contact, /sources/[slug].
- `/contact`와 기존 제품 쿼리가 붙은 주소는 문의하기 페이지를 표시합니다. `/contact#contact-location`은 위치 안내이며, `/admin`, `/privacy`, 이전 문의·관리자 API는 404입니다.
- URL 기준은 `app/siteConfig.ts`입니다. `layout.tsx`, `structuredData.ts`, `sitemap.ts`, `rss.xml/route.ts`의 정합성을 함께 확인합니다.
- 출처 원문과 자료 보관본의 경로를 유지하고 자료 시점을 현재 직책이나 인증으로 바꾸지 않습니다.
- 수정 후 lint·build와 해당 회귀 테스트를 실행합니다.
- 반응형 기본 확인 폭은 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560px이며 낮은 가로 화면도 포함합니다.
- DOM 폭 검사와 실제 브라우저 스크린샷·상호작용 검증을 구분해 기록합니다. 크기 에뮬레이션을 실제 iOS/Safari 기기 검증으로 표현하지 않습니다.
