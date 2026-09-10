# 수북농업 · sbng-front-service

수북농업의 회사·제품·대표·연혁을 소개하는 Next.js 사이트입니다. 문의하기 페이지에서 전화번호와 회사 위치를 안내하고 상담은 대표번호 **061-383-6186**으로 연결합니다. 온라인 문의 폼, 관리자 로그인, 문의 저장 API는 제공하지 않습니다.

## 실행과 검증

Node.js 24 LTS를 사용합니다. 개발·로컬 운영의 기본 포트는 **3004**입니다.

```bash
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run start
```

`dev`와 `start`는 같은 기본 포트를 쓰므로 하나씩 실행합니다. `npm run start`는 프로젝트의 환경 설정을 읽고 standalone 빌드에 정적 파일을 준비한 뒤 실행합니다. 먼저 `npm run build`가 필요합니다.

빌드의 `postbuild`는 환경 파일과 과거 문의 파일이 standalone 산출물에 남지 않았는지 확인합니다. 복사된 산출물만 정리하며 원본은 수정하지 않습니다. 이 검사를 포함하도록 `npx next build` 대신 `npm run build`를 사용합니다.

서버 실행 후 `npm run verify:site`로 공개 화면·전화 링크·검색 메타데이터·이전 경로의 응답을 확인합니다. 종료된 API에 대한 검사도 포함하므로 이 스크립트는 로컬 서버만 허용합니다. 다른 로컬 포트는 `SBNG_TEST_TARGET_URL=http://127.0.0.1:3104 npm run verify:site`로 지정합니다.

## 주요 경로와 구조

| 경로                                      | 역할                                                       |
| ----------------------------------------- | ---------------------------------------------------------- |
| `/`                                       | 회사 → 제품 → 대표 → 연혁 → 자료 → 전화 안내               |
| `/about`                                  | 회사 개요, 생산 현장, 사업장 안내, 회사 자료               |
| `/products`                               | 세 제품 비교, 제품별 성분·사용 기준, 선택형 포장·안내 자료 |
| `/ceo`                                    | 대표 인물 소개, 경영 방향, 주요 경력, 활동 기사            |
| `/history`                                | 설립부터 이어지는 날짜순 사진 타임라인                     |
| `/contact`                                | 대표전화, 상담 시간, 담양 사업장 주소·지도, 회사 정보      |
| `/sources/[slug]`                         | 기사 원문 상태, 보관 요약·이미지·파일                      |
| `/sitemap.xml`, `/rss.xml`, `/robots.txt` | 검색 메타데이터와 피드                                     |

`/contact`는 전화와 회사 위치를 안내하는 문의하기 페이지입니다. 기존 `/contact?product=heukson`도 같은 안내 페이지를 표시합니다. `/admin`, `/privacy`와 문의·관리자 API는 제거되어 404를 반환합니다.

- `app/layout.tsx`: 공통 메뉴, 푸터, 본문 바로가기와 전역 메타데이터.
- `app/components/SiteNav.tsx`, `navItems.ts`: 회사 소개 → 제품 안내 → 대표 소개 → 연혁 → 문의하기 순서의 공통 메뉴. 1024px 미만에서는 바로 전화 버튼과 전체 메뉴 패널을 제공합니다.
- `app/HomeContent.tsx`, 각 경로의 `*Content.tsx`: 서버에서 렌더링하는 소개 화면.
- `app/components/HomeSectionNav.tsx`, `useHomeSectionScroll.ts`: 메인의 한 섹션씩 이동, 현재 위치와 빠른 전화 안내. 긴 내용은 현재 구간 안에서 읽고 경계에서 다음 구간으로 이동합니다.
- `app/homeScroll.ts`: 섹션·긴 내용·푸터의 이동 경계 계산과 휠 관성 구분. `scripts/homeScroll.test.mjs`에서 연속 입력·방향 전환과 본문·푸터 접근을 검사합니다.
- `app/template.tsx`: 모션 감소 설정을 따르는 짧은 페이지 등장 효과.
- `app/components/PageHero.tsx`, `PageSectionNav.tsx`, `PageLinks.tsx`: 상세 페이지의 도입부, 내용 바로가기, 관련 페이지.
- `app/components/ProductGallery.tsx`: 제품 앞면·뒷면·안내 시트 선택. 확대 화면은 공통 `LightboxImage.tsx`를 사용합니다.
- `app/history/HistoryTimeline.tsx`: 연혁 사진이 읽는 영역에 들어오면 기울기와 색감을 복원합니다. 화면 높이에 맞춰 진입 위치를 계산하고 모션 감소 설정을 따릅니다.
- `app/companyInfo.ts`: 대표번호·상담 시간·주소·카카오맵·네이버지도 링크의 공통 기준. 회사 소개와 문의하기에서 같은 주소를 사용하며 전화번호를 바꿀 때 표시값과 `tel:` 값을 함께 수정합니다.
- `app/contact/ContactContent.tsx`: 대표전화와 상담 시간, 위치·방문 안내, 대표자와 사업자 정보. 문의 폼 없이 서버에서 렌더링합니다.
- `app/companyProfile.ts`, `companyPhotos.ts`, `productCatalog.ts`: 회사·제품·기사 자료.
- `app/globals.css`: 색상 토큰, 공통 버튼, 헤더·메뉴, 홈 스크롤 규칙.
- `app/companyPages.css`: 업체 소개 페이지별 배치, 홈 요약 구간, 제품 비교·갤러리, 대표 프로필, 연혁 타임라인의 반응형 규칙.

소개 화면은 업체 소개에 맞춰 페이지별 역할을 나눕니다. 홈의 섹션 스크롤과 연혁의 사진 타임라인은 유지합니다. 메인 첫 화면은 사진 없이 CSS 그라데이션과 장식만 사용하며, 각 구간에는 핵심 정보와 해당 상세 화면 링크를 둡니다. 소개 본문은 서버에서 렌더링하고 메뉴·섹션 이동·연혁 사진 효과·제품 자료 선택·이미지 확대에 필요한 클라이언트 코드만 사용합니다. 제품·기사 자료는 `object-contain`으로 전체 비율을 표시합니다.

회사 자료 목록은 `/about#company-sources`, 문의와 방문 안내는 `/contact`에 있습니다. 홈의 사업장 안내는 `/contact#contact-location`으로 연결하며 기존 `/about#company-location`도 유지합니다. 제품은 `#product-compare`에서 비교한 뒤 기존 `#product-heukson`, `#product-heukboyak`, `#product-mudeungsan`으로 이동합니다. 연혁의 기존 날짜 링크는 유지하며 설립 기록 `#history-1996-03-30`을 추가했습니다. 공개 화면 검사는 페이지 사이 해시 링크의 실제 대상도 확인합니다.

헤더는 모든 페이지에서 밝은 표면과 짙은 글자를 사용합니다. 모바일 메뉴는 현재 페이지와 간단한 설명을 표시하며, 낮은 화면에서는 목록만 스크롤하고 닫기·전화 버튼은 계속 보입니다. Escape 닫기, Tab 순환, 메뉴를 통한 화면 이동 후 본문 초점, 데스크톱 전환 시 닫힘·초점 복귀를 지원합니다.

## 환경 설정

- `.env.local`: 로컬 실행 설정. `.env.example`을 참고합니다.
- `.env.dev`: `.env.local`을 그대로 복사한 파일입니다. 다시 적용하려면 `cp .env.dev .env.local` 후 실행합니다.
- `.env.prod`: 운영 서버에서 직접 만드는 Docker 설정 파일입니다. 현재 필요한 항목은 선택적인 Google 검색 인증 코드입니다.

Next.js는 `.env.dev`와 `.env.prod`를 해당 이름만으로 자동 로드하지 않습니다. 로컬에서는 `.env.local`을 읽고, Docker에서는 아래 Compose 명령과 `env_file`로 적용합니다.

| 변수                                   | 용도                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `PORT`                                 | 로컬 운영 기본값 3004. 개발 스크립트는 `-p 3004`, Docker는 3000으로 고정 |
| `NODE_ENV`, `HOSTNAME`                 | Docker 운영 모드와 컨테이너 수신 주소                                    |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | 선택적인 Google 검색 인증 코드                                           |

관리자 비밀번호·세션 서명키·문의 저장 경로·신뢰 프록시 환경 변수는 더 이상 사용하지 않습니다.

## Docker 운영

운영 서버의 `/data/git/sbng-front-service/.env.prod`를 직접 만듭니다. Google 검색 인증을 사용하지 않으면 값은 비워둡니다.

```dotenv
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

`NODE_ENV=production`, `HOSTNAME=0.0.0.0`, `PORT=3000`은 Dockerfile과 Compose에 이미 고정되어 있어 `.env.prod`에 중복해서 작성할 필요가 없습니다. 환경 파일은 Git에서 제외되며, 없을 때 자동 생성하거나 `.env.example`로 대체하지 않습니다.

```bash
docker compose --env-file .env.prod config --quiet
docker compose --env-file .env.prod up -d --build
```

앱은 Docker 네트워크 안에서 3000 포트로 실행하고 Caddy가 외부의 80/443 요청을 전달합니다. 앱에 별도 DB나 문의 데이터 볼륨이 필요하지 않습니다. Caddy의 인증서와 설정 볼륨은 유지합니다.

Compose의 `env_file`은 `.env.prod`를 컨테이너에 전달하고, `--env-file .env.prod`는 Google 검색 인증 코드의 빌드 인자 치환에 사용합니다. 인증 코드를 변경했다면 `--build`로 이미지를 다시 생성합니다. 환경 파일 자체와 로컬 데이터는 이미지 빌드에서 제외합니다.

### Jenkins SSH 배포

서버에 `.env.prod`를 준비한 뒤 Jenkins에서는 다음 명령을 사용합니다. 설정 파일은 배포할 때마다 읽으며 기존 내용을 변경하지 않습니다.

```bash
ssh -T -p 122 kimd0@kimd0.iptime.org 'bash -se' <<'EOF'
set -euo pipefail

cd /data/git/sbng-front-service

git fetch origin
git merge --ff-only origin/main

docker compose --env-file .env.prod config --quiet
docker compose --env-file .env.prod up -d --build
EOF
```

비대화형 Bash로 실행하며 Git 갱신·Compose 설정 검사·빌드 또는 기동 명령이 실패하면 SSH의 종료 코드가 Jenkins에 전달됩니다. `up -d` 성공은 컨테이너 시작까지의 결과이며 외부 HTTPS 응답이나 장기 실행 상태를 보장하지는 않습니다.

Docker는 `node server.js`로 standalone 서버를 직접 실행합니다. `package.json`의 `start`는 Docker 밖에서 빌드를 확인하는 로컬 실행 경로이며 Jenkins 배포의 환경 파일 선택에 관여하지 않습니다.

## 이전 문의 기록

문의 기능을 종료하면서 저장·관리·1년 보유 기간 계산·자동 파기 코드를 제거했습니다. 현재 앱은 문의 개인정보를 새로 수집하거나 저장하지 않습니다.

기존 `data/contact-submissions.json`과 이미 존재하는 Docker `contact_data` 볼륨의 기록은 자동 이관하거나 삭제하지 않습니다. 새 앱은 이 저장소를 읽거나 연결하지 않습니다. 과거 기록의 보유·파기와 백업은 운영자가 별도로 관리합니다. 로컬 기록은 Git·Docker·standalone 산출물에서 계속 제외합니다.

## 콘텐츠와 외부 의존성

공식 URL은 `https://www.subuknongeop.com`입니다. 회사·제품 데이터를 변경하면 metadata·sitemap·RSS도 함께 확인합니다. 자료 보관 화면은 noindex이고, 보관 HTML은 실행하지 않고 다운로드하도록 제한합니다.

별도 Spring API에 의존하지 않습니다. 외부 의존성은 기사 원문 상태 확인과 검색 도구 인증입니다. 기사 보관 스크립트는 `npm run archive:articles`이며 Playwright를 개발 의존성으로 사용합니다.

개선 범위와 실제 검증 기록은 [SBNG_REVIEW.md](./SBNG_REVIEW.md)를 참고하세요.
