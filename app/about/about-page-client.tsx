"use client";

import Image from "next/image";
import ColorShiftImage from "./color-shift-image";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

const timeline = [
  {
    year: "2012",
    title: "토양 과학 연구 시작",
    description:
      "가족 농장을 기반으로 수북농업의 첫 토양 영양 테스트가 시작되었습니다.",
    image: "/image/heukson-front.jpeg",
  },
  {
    year: "2016",
    title: "현장 실증 프로그램 확대",
    description:
      "전국 파트너 농가와 함께 기후·토양 조건별 맞춤 비료 모델을 구축했습니다.",
    image: "/image/heukboyak-front.jpeg",
  },
  {
    year: "2021",
    title: "운영 패키지 전환",
    description:
      "신규 포장과 저유실 영양 설계 도입으로 운영 전반을 고도화했습니다.",
    image: "/image/mudeungsan-front.jpeg",
  },
  {
    year: "2026",
    title: "AI 기반 토양 진단",
    description:
      "작물 생육 데이터와 토양 상태를 결합한 정밀 처방으로 생산 안정성을 높였습니다.",
    image: "/image/heukboyak-sheet-300.jpg",
  },
];

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ebe8dd_0%,#f3f0e6_34%,#eeebdf_100%)]">
      <SiteNav />

      <main className="overflow-x-hidden">
        <section className="relative flex h-[60vh] w-full flex-col items-center justify-center px-4">
          <div className="absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 z-10 bg-[#0f2814]/50" />
            <Image
              alt="Historical farm photo from 1985"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbB7OvuFpZ2-kDvE02bXeutf-6pdVSWl0T9n8t1VaXwtHEYpaM2jk39g7ieo4p3n0FHPrC8Ujfjo2s1SR4n-j4fkXUmWaRCkrYrsMWjGT34DnzTu-norFdaxRb8eUCFOb_vpchnO3Sa8DEEyrd_KDbegxlaMlNtZd1ZpRDGo2ExkoEnW6uzDNxma6YU42OUiIFcwpS2uo-QNJrhvaHgaYbsv_zNGQ6Yg_iAxbMJzSbSWaADoMHMdM1Uorv9R1cznT-MsiaYeEufz0"
              fill
              preload
              sizes="100vw"
              className="object-cover sepia-[0.3] contrast-75 grayscale-[0.2]"
            />
          </div>

          <div className="relative z-10 mx-auto mt-16 max-w-4xl px-4 text-center">
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-green-200">
              Established 1985
            </span>
            <h1 className="font-display mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              Our Journey Through Time
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-gray-200 md:text-xl">
              From humble beginnings on a family farm to global innovation in
              sustainable agriculture.
            </p>
          </div>
        </section>

        <section className="relative px-5 py-20 md:px-10 lg:px-20">
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/3 bg-[radial-gradient(circle_at_top,rgba(18,40,22,0.11),transparent_62%)] md:block" />
          <div className="mx-auto max-w-6xl">
            <div className="relative">
              <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[rgba(50,72,50,0.38)] md:block" />

              <div className="space-y-14 md:space-y-20">
                {timeline.map((item, index) => {
                  const left = index % 2 === 0;

                  return (
                    <article
                      key={item.year}
                      className="relative grid items-center gap-8 md:grid-cols-2 md:gap-16"
                    >
                      <div
                        className={`${
                          left
                            ? "order-2 text-left md:order-1 md:pr-12 md:text-right"
                            : "order-2 text-left md:order-2 md:pl-12"
                        }`}
                      >
                        <p className="font-display text-6xl font-bold text-[var(--agri-primary-deep)]/46">
                          {item.year}
                        </p>
                        <h2 className="font-display mt-2 text-3xl font-bold text-[#122713]">
                          {item.title}
                        </h2>
                        <p className="mt-4 leading-relaxed text-[#304a31]">
                          {item.description}
                        </p>
                      </div>

                      <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--agri-paper)] bg-[var(--agri-primary-deep)] shadow-[0_0_0_4px_rgba(47,138,29,0.15)] md:block" />

                      <div
                        className={`${
                          left
                            ? "order-1 md:order-2 md:pl-12"
                            : "order-1 md:order-1 md:pr-12"
                        }`}
                      >
                        <ColorShiftImage
                          src={item.image}
                          alt={`${item.year} ${item.title}`}
                          containerClassName="aspect-[4/3] overflow-hidden rounded-2xl border border-[#d7e0d2] bg-white shadow-[0_24px_60px_rgba(12,26,12,0.18)]"
                          grayContainerClassName={
                            left ? "rotate-6 md:rotate-5" : "-rotate-6 md:-rotate-5"
                          }
                          colorContainerClassName="rotate-0"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <section className="relative mt-24 overflow-hidden rounded-3xl bg-[#112614] px-8 py-14 text-center md:px-14 md:py-18">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(87,219,49,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(87,219,49,0.14),transparent_45%)]" />
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary)]">
                  2030 and Beyond
                </p>
                <h3 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
                  수북농업의 다음 목표
                </h3>
                <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/90">
                  AI 기반 토양 진단과 차세대 재생형 비료 개발을 통해 2040년까지
                  농업 유실 저감 50% 달성을 목표로 하고 있습니다.
                </p>
                <button
                  type="button"
                  className="mt-8 rounded-full bg-white px-8 py-3 font-bold text-[#132714] transition hover:bg-[var(--agri-primary)]"
                >
                  우리의 여정 함께하기
                </button>
              </div>
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
