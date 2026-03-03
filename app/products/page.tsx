import type { Metadata } from "next";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

const products = [
  {
    name: "Bio-Organic Boost",
    target: "Leafy crops, vegetables",
    summary: "High microbial density for healthier root-zone ecosystems.",
  },
  {
    name: "Nitro Balance NPK",
    target: "Rice, wheat, corn",
    summary: "Balanced release profile for stable growth and strong yields.",
  },
  {
    name: "MicroTrace Plus",
    target: "Fruit orchards",
    summary: "Chelated micronutrients to reduce deficiency stress.",
  },
  {
    name: "AquaGuard Soil Care",
    target: "Dry and mixed fields",
    summary: "Improves water retention and protects topsoil structure.",
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
    <div className="min-h-screen bg-[var(--agri-paper)]">
      <SiteNav />

      <main className="px-5 pb-20 pt-14 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl rounded-[2.2rem] bg-white px-8 py-14 shadow-[0_20px_55px_rgba(10,25,10,0.08)] md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            Product Portfolio
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-6xl">
            수북농업 비료 라인업
          </h1>
          <p className="mt-5 max-w-3xl text-[#51624f]">
            수북농업은 실제 재배 환경에서 검증된 배합으로 영양 효율, 토양 활력,
            작기 안정성을 함께 설계합니다.
          </p>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-2">
          {products.map((product) => (
            <article
              key={product.name}
              className="rounded-3xl border border-black/6 bg-white p-8 shadow-[0_14px_45px_rgba(12,26,12,0.06)]"
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
                {product.target}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">
                {product.name}
              </h2>
              <p className="mt-3 text-[#546753]">{product.summary}</p>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
