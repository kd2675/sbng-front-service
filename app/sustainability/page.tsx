import type { Metadata } from "next";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

const metrics = [
  { label: "Water Use Reduction", value: "18%", note: "avg. across pilot farms" },
  { label: "Nutrient Waste Cut", value: "22%", note: "through precision dosing" },
  { label: "Soil Carbon Gain", value: "+14%", note: "after 2-year adoption" },
];

export const metadata: Metadata = {
  title: "지속가능성",
  description: "수북농업의 지속가능 농업 성과와 토양 보전 지표를 확인하세요.",
  alternates: {
    canonical: "/sustainability",
  },
};

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-[var(--agri-paper)]">
      <SiteNav />

      <main className="px-5 pb-20 pt-14 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl rounded-[2.2rem] border border-black/6 bg-white px-8 py-14 md:px-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            Sustainability
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-6xl">
            수북농업 지속가능성 지표
          </h1>
          <p className="mt-5 max-w-3xl text-[#51624f]">
            수북농업은 토양 순환 회복, 유실 저감, 탄소 지표 개선을 중심으로
            환경 부담을 줄이면서 생산성을 높입니다.
          </p>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-3xl bg-[var(--agri-ink)] p-8 text-white shadow-[0_16px_40px_rgba(10,25,10,0.28)]"
            >
              <p className="text-sm uppercase tracking-[0.16em] text-white/70">
                {metric.label}
              </p>
              <p className="mt-4 text-5xl font-black text-[var(--agri-primary)]">
                {metric.value}
              </p>
              <p className="mt-3 text-sm text-white/78">{metric.note}</p>
            </article>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
