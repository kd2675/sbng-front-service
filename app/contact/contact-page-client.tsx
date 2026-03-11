"use client";

import { companyInfo } from "../company-info";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

export default function ContactPageClient() {
  return (
    <div className="min-h-screen bg-[var(--agri-paper)]">
      <SiteNav />

      <main className="px-5 pb-20 pt-14 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            Contact
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-6xl">
            수북농업 상담 문의
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-[#506350]">
            제품 선택, 적용 시기, 토양개량 방향 등은 현장 조건에 따라 달라질 수
            있습니다. 기본 문의는 아래 폼으로 남겨주시고, 빠른 상담은 본사 연락처를
            이용해 주세요.
          </p>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-7 md:grid-cols-5">
          <div className="rounded-3xl border border-black/7 bg-white p-8 shadow-[0_14px_45px_rgba(12,26,12,0.06)] md:col-span-3">
            <h2 className="text-2xl font-bold text-[var(--agri-ink)]">상담 요청 남기기</h2>
            <form className="mt-6 grid gap-4">
              <input
                className="rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="성함 또는 농가명"
                type="text"
              />
              <input
                className="rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="연락처"
                type="tel"
              />
              <textarea
                className="min-h-36 rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="재배 작물, 토양 상태, 현재 고민을 남겨주세요."
              />
              <button
                type="submit"
                className="mt-2 w-fit rounded-full bg-[var(--agri-primary)] px-7 py-3 font-bold text-[var(--agri-ink)] transition hover:bg-[#64e93f]"
              >
                문의 남기기
              </button>
            </form>
          </div>

          <aside className="rounded-3xl border border-black/7 bg-white p-8 shadow-[0_14px_45px_rgba(12,26,12,0.06)] md:col-span-2">
            <h3 className="text-xl font-bold text-[var(--agri-ink)]">본사 안내</h3>
            <div className="mt-4 space-y-3 text-[#506350]">
              <p>{companyInfo.legalName}</p>
              <p>{companyInfo.address}</p>
              <p>전화 {companyInfo.telephoneDisplay}</p>
              <p>팩스 {companyInfo.faxDisplay}</p>
            </div>
            <p className="mt-6 rounded-2xl bg-[var(--agri-paper)] p-4 text-sm text-[#506350]">
              상담 가능 시간: {companyInfo.businessHours}
            </p>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
