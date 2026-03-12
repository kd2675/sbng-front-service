"use client";

import Image from "next/image";
import ColorShiftImage from "./color-shift-image";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

const timeline = [
  {
    year: "2012",
    title: "흙손 출시",
    description:
      "가축분퇴비 분상 제품인 흙손을 선보이며 수북농업의 제품 구성이 시작되었습니다.",
    image: "/image/heukson-front.jpeg",
  },
  {
    year: "2016",
    title: "흙보약 출시",
    description:
      "혼합유기질비료 흙보약을 통해 토양 중심 비료 제품군을 확장했습니다.",
    image: "/image/heukboyak-front.jpeg",
  },
  {
    year: "2021",
    title: "무등산 출시",
    description:
      "일반퇴비 1등급 제품 무등산을 더해 주요 제품 라인업을 완성했습니다.",
    image: "/image/mudeungsan-front.jpeg",
  },
  {
    year: "2026",
    title: "브랜드 사이트 정비",
    description:
      "회사 소개와 제품 정보를 한곳에서 확인할 수 있도록 브랜드 사이트를 새롭게 정리했습니다.",
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
              About Subuk
            </span>
            <h1 className="font-display mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              토양을 먼저 생각하는
              <br className="hidden sm:block" /> 수북농업의 기준
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-gray-200 md:text-xl">
              수북농업은 작물보다 먼저 토양을 이해해야 한다는 기준으로 제품과 현장 상담의
              방향을 다듬어가고 있습니다.
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
                            ? "order-1 text-left md:order-1 md:pr-12 md:text-right"
                            : "order-1 text-left md:order-2 md:pl-12"
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
                            ? "order-2 md:order-2 md:pl-12"
                            : "order-2 md:order-1 md:pr-12"
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
                  What We Build Next
                </p>
                <h3 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
                  더 선명한 현장 해답을 위해
                </h3>
                <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/90">
                  수북농업은 제품 소개에 그치지 않고, 토양 상태와 재배 조건에 맞는 설명과
                  상담 경험을 더 명확하게 전달하는 브랜드를 지향합니다.
                </p>
                <button
                  type="button"
                  className="mt-8 rounded-full bg-white px-8 py-3 font-bold text-[#132714] transition hover:bg-[var(--agri-primary)]"
                >
                  제품과 회사 소개 보기
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
