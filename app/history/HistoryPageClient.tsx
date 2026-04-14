"use client";

import Image from "next/image";
import Link from "next/link";
import ColorShiftImage from "../about/ColorShiftImage";
import { historyFlowTimeline } from "../companyProfile";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";

export default function HistoryPageClient() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ebe8dd_0%,#f3f0e6_34%,#eeebdf_100%)]">
      <SiteNav />

      <main className="overflow-x-hidden">
        <section className="relative flex h-[60vh] w-full flex-col items-center justify-center px-4">
          <div className="absolute inset-0 z-0 h-full w-full">
            <div className="absolute inset-0 z-10 bg-[#0f2814]/50" />
            <Image
              alt="수북농업 현장 사진"
              src="/image/kim-jong-su-assembly.jpg"
              fill
              priority
              sizes="100vw"
              className="object-cover sepia-[0.3] contrast-75 grayscale-[0.2]"
            />
          </div>

          <div className="relative z-10 mx-auto mt-16 max-w-4xl px-4 text-center">
            <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-green-200">
              공개 연혁
            </span>
            <h1 className="font-display mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              공개 기록으로 다시 보는
              <br className="hidden sm:block" /> 수북농업 연혁
            </h1>
            <p className="mx-auto max-w-2xl text-lg font-light text-gray-200 md:text-xl">
              김종수 대표와 수북농업에 관한 기사, 공개 사업자 정보, 회사 자료를 바탕으로
              주요 흐름을 사진과 함께 소개합니다. 공개 기록과 기사 흐름을 시간 순서에
              따라 이어서 보실 수 있습니다.
            </p>
          </div>
        </section>

        <section className="relative px-5 py-20 md:px-10 lg:px-20">
          <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/3 bg-[radial-gradient(circle_at_top,rgba(18,40,22,0.11),transparent_62%)] md:block" />
          <div className="mx-auto max-w-6xl">
            <div className="relative">
              <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[rgba(50,72,50,0.38)] md:block" />

              <div className="space-y-14 md:space-y-20">
                {historyFlowTimeline.map((item, index) => {
                  const left = index % 2 === 0;

                  return (
                    <article
                      key={item.period}
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
                          {item.period}
                        </p>
                        <h2 className="font-display mt-2 text-3xl font-bold text-[#122713]">
                          {item.title}
                        </h2>
                        <p className="mt-4 leading-relaxed text-[#304a31]">
                          {item.description}
                        </p>
                        {item.sourceUrl && item.sourceLabel ? (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                          >
                            {item.sourceLabel}
                          </a>
                        ) : null}
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
                          src={item.image.src}
                          alt={item.image.alt}
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

              <section className="relative mt-24 overflow-hidden rounded-3xl bg-[#112614] px-8 py-14 text-center md:px-14 md:py-18">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(87,219,49,0.2),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(87,219,49,0.14),transparent_45%)]" />
                <div className="relative">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary)]">
                    함께 이어보기
                  </p>
                  <h3 className="font-display mt-4 text-4xl font-bold text-white md:text-5xl">
                    대표 소개와 회사 정보도 함께 이어집니다
                  </h3>
                  <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-white/90">
                    연혁에서 본 흐름을 바탕으로 김종수 대표 소개와 회사 정보 페이지에서도
                    같은 공개 기록을 이어서 살펴보실 수 있습니다.
                  </p>
                  <Link
                    href="/ceo"
                    className="mt-8 inline-flex rounded-full bg-white px-8 py-3 font-bold text-[#132714] transition hover:bg-[var(--agri-primary)]"
                  >
                    대표 소개 이어 보기
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
