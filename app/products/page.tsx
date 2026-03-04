import type { Metadata } from "next";
import SiteNav from "../components/site-nav";

const products = [
  {
    name: "Nitrogen Plus Boost",
    category: "Liquid Fertilizer",
    badge: "Top Rated",
    badgeClass: "bg-[var(--agri-primary)] text-[#112614]",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCBcAqphtMh_B0rGg70Z64gQKQ3bAHQ8AGijEkCcjKmPvVJ1M8W0LvGo-ml_KyNblEg_INwMC_GDC9cwmAi_4DqpyZAdwWurccFimrSePJIX9zlwgvuXWYmgsU6CVmCCjsDECl3rVNsqTI6f6kX4gL0Mcr3dbILg2R0ruNP4Ygcao9DwtXEITdUrOnU2yk1--4rddN8yV8KiMfLYVjXjKFkGdY7ofbnu7HQX9B5CF90gkey_Gg3wRbVDeEuIgQMiWPPH4_s1VXAHLA",
    summary:
      "질소 흡수 효율을 높여 초기 생육과 엽면 활력을 빠르게 끌어올리는 액상 포뮬러입니다.",
  },
  {
    name: "EcoGrow Pellets",
    category: "Organic Series",
    badge: "Eco-Choice",
    badgeClass: "bg-[#2e7d32] text-white",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVnt6Av3Y1m82e9QtSCUih0RQpN6XM5dB4pJnKh8xBId1r0LdlvpBUPDvLQVxz4aDjbt39x2z0RBVWY9rEHKV_7xrhKZzrexQzQrwgN4GgI3JcMcxp6gPTXJWzTy06dqpdqHWBPsOg-aEEXnCKMmiTnAFawcFQMM_p9x0ExXRVG9W4WdV6RZbmct1Dvi1Y_ShpisNXafPBnJ7s3F7bQjb8OzUJMYMxdjwymZkxlchjDxTpKhsyxcYolvffnAYFrnPwhjB30ZnqJMM",
    summary:
      "유기질 펠릿 기반의 완효성 제품으로 토양 구조를 장기적으로 안정화하고 생태 균형을 강화합니다.",
  },
  {
    name: "PhosPower Granules",
    category: "Granular Blend",
    badge: "Power Blend",
    badgeClass: "bg-[#5d4037] text-white",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCPxx16jFN3bOyzBut8Zen2NP3ELxhdquWISoQcJgub-bbN84qTZ74YsHohlY2z9y5am6akCCEedpYMRzW092PjrnGFKaPvMV1AZzV1_sLmC4uUo3sBcDt3oeeyEsyxBYETC2foTYMXGNmLuUk2utvyM4B6cK-1KuBStlbo8v5Uqi7GNzhyBNOksjbx0BnB1g5sEV489jsfKJ-KJeLsajVv3Ckj2nRW8LHu1ivpYhAyh_F-DS-AZsWGaaMZEk-tXWmwDs4XToi23A",
    summary:
      "인산 중심의 과립 배합으로 뿌리 발달과 개화·결실 안정성을 높여 생산량 개선에 유리합니다.",
  },
];

export const metadata: Metadata = {
  title: "제품 소개",
  description: "수북농업의 비료 제품 라인업과 적용 작물 정보를 확인하세요.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#f6f8f6]">
      <SiteNav />

      <section className="relative overflow-hidden bg-[#132210] px-6 py-20 md:px-10 lg:px-20">
        <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--agri-primary)]/16 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/3 translate-y-1/4 rounded-full bg-[#2e7d32]/24 blur-3xl" />
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold tracking-wide text-[var(--agri-primary)]">
            Flagship Collection
          </p>
          <h1 className="font-display mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            수북농업 프리미엄 비료 솔루션
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">
            고효율 흡수 설계, 토양 친화 배합, 현장 검증 데이터를 바탕으로 핵심 제품
            3종을 제안합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 lg:px-20">
        <section className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <span
                  className={`absolute right-4 top-4 z-10 rounded-full px-4 py-1.5 text-sm font-bold shadow-lg ${product.badgeClass}`}
                >
                  {product.badge}
                </span>
                <img
                  alt={product.name}
                  src={product.image}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--agri-primary)]">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h2 className="text-2xl font-bold leading-tight text-slate-900 md:text-3xl">
                  {product.name}
                </h2>
                <p className="mt-4 leading-relaxed text-slate-600">
                  {product.summary}
                </p>

                <div className="mt-auto border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#132210] py-4 text-lg font-bold text-white transition-all hover:bg-[var(--agri-primary)] hover:text-[#132210]"
                  >
                    제품 상세 보기
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="mt-auto border-t border-white/10 bg-[#132210] py-10">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-slate-400 md:px-10 lg:px-20">
          <p>© 2026 수북농업. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
