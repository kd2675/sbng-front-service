import type { Metadata } from "next";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

const milestones = [
  {
    year: "2012",
    title: "Soil Science Lab Launch",
    description: "Started with crop nutrition R&D in controlled test fields.",
  },
  {
    year: "2018",
    title: "Regional Farmer Programs",
    description:
      "Expanded field support teams across partner farms and co-ops.",
  },
  {
    year: "2025",
    title: "Bio-Organic Platform",
    description:
      "Released a full bio-active line focused on soil regeneration.",
  },
];

export const metadata: Metadata = {
  title: "회사 소개",
  description: "수북농업의 철학, 연혁, 농업 기술 기반을 소개합니다.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--agri-paper)]">
      <SiteNav />

      <main className="px-5 pb-20 pt-14 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            About Subuk Nongup
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-6xl">
            수북농업은 과학 기반 농업 파트너입니다
          </h1>
          <p className="mt-5 max-w-3xl text-[#51624f]">
            수북농업은 작물생리, 데이터 분석, 토양 보전 원칙을 결합해 실제 농장
            환경에서 실행 가능한 비료 시스템을 제공합니다.
          </p>
        </section>

        <section className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-3">
          {milestones.map((item) => (
            <article
              key={item.year}
              className="rounded-3xl border border-black/6 bg-white p-8 shadow-[0_14px_45px_rgba(12,26,12,0.06)]"
            >
              <p className="text-2xl font-black text-[var(--agri-primary-deep)]">
                {item.year}
              </p>
              <h2 className="mt-3 text-xl font-bold text-[var(--agri-ink)]">
                {item.title}
              </h2>
              <p className="mt-3 text-[#546753]">{item.description}</p>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
