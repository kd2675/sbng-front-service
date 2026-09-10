"use client";

import Link from "next/link";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="site-container section-space"
    >
      <section className="panel mx-auto max-w-2xl">
        <p className="eyebrow">일시적인 오류</p>
        <h1 className="section-title mt-4">화면을 불러오지 못했습니다</h1>
        <p className="muted mt-5 leading-8">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 본사로 연락해 주시면
          안내해 드리겠습니다.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-primary">
            다시 시도
          </button>
          <Link href="/" className="btn btn-secondary">
            홈으로 이동
          </Link>
        </div>
      </section>
    </main>
  );
}
