import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";

/**
 * 전역 404 페이지.
 *
 * Next.js App Router 는 이 파일이 존재하면 해당 라우트가 매칭되지 않을 때
 * 자동으로 `not-found.tsx` 를 렌더링하며 HTTP 404 상태 코드를 반환합니다.
 * 기본 내장 404 화면 대신 사이트 내비게이션과 내부 링크를 제공해
 * 검색 크롤러가 올바른 상태 코드를 받으면서도 사용자에게 회귀 경로를 안내합니다.
 *
 * `robots` 를 반드시 override 하는 이유:
 * - 루트 레이아웃이 `robots: { index: true, follow: true }` 로 기본값을 설정.
 * - `robots` 를 지정하지 않으면 404 페이지도 이 값을 상속받아 `index, follow`
 *   태그가 출력되며, Next.js 가 `_not-found` 에 자동 주입하는 `noindex` 태그와
 *   모순되는 신호를 만듭니다.
 * - 명시적으로 `noindex, nofollow` 를 지정해 모든 검색엔진에 일관된 신호를 전달합니다.
 */
export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description:
    "요청하신 페이지가 이동되었거나 삭제되었을 수 있습니다. 메인 메뉴에서 다시 탐색해 주세요.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const quickLinks = [
  { href: "/", label: "홈" },
  { href: "/about", label: "회사 정보" },
  { href: "/ceo", label: "대표 소개" },
  { href: "/products", label: "제품 소개" },
  { href: "/history", label: "연혁" },
  { href: "/contact", label: "문의하기" },
] as const;

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--agri-paper)] text-[var(--agri-ink)]">
      <SiteNav />

      <main className="px-5 pb-24 pt-24 md:px-10 lg:px-20">
        <section className="mx-auto max-w-3xl rounded-[2rem] border border-black/8 bg-white p-10 shadow-[0_18px_52px_rgba(12,26,12,0.06)]">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            404 Not Found
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="mt-5 leading-relaxed text-[#536a52]">
            요청하신 주소가 변경되었거나 사라졌을 수 있습니다. 아래 링크를 통해 주요 페이지로 이동해
            주세요.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center justify-between rounded-2xl border border-black/8 bg-[#f5f8f1] px-5 py-4 text-sm font-bold text-[var(--agri-ink)] transition hover:-translate-y-0.5 hover:bg-[#eaf1e1]"
                >
                  <span>{link.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
