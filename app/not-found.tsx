import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지가 이동되었거나 삭제되었을 수 있습니다.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container section-space"
    >
      <section className="panel mx-auto my-8 max-w-2xl">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1 className="section-title mt-5">페이지를 찾을 수 없습니다</h1>
        <p className="muted mt-5 leading-8">
          주소가 변경되었거나 없는 페이지입니다. 아래 메뉴에서 필요한 정보를
          다시 찾아보세요.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            { href: "/", label: "홈으로 이동" },
            { href: "/products", label: "제품 소개" },
            { href: "/about", label: "회사 정보" },
            { href: "/contact", label: "문의하기" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="btn btn-secondary justify-between"
            >
              {item.label}
              <span aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
