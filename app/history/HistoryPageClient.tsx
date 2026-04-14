"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import ColorShiftImage from "../about/ColorShiftImage";
import SourceLink from "../components/SourceLink";
import { historyFlowTimeline } from "../companyProfile";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";

export default function HistoryPageClient() {
  const reduceMotion = useReducedMotion();
  const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const revealWhileInView = { opacity: 1, y: 0 };

  const historyHeroCards = [
    {
      title: "정리 기준",
      value: "기사와 공개 자료",
      description: "수북농업과 김종수 대표 관련 공개 기록을 날짜 순으로 정리했습니다.",
    },
    {
      title: "사진 흐름",
      value: "기사 캡처 중심",
      description: "각 시점에 맞는 기사 화면과 공개 자료 이미지를 함께 배치했습니다.",
    },
    {
      title: "이어 보기",
      value: "대표 소개 · 회사 정보",
      description: "연혁에서 본 흐름을 대표 소개와 회사 정보 페이지로 이어서 살펴보실 수 있습니다.",
    },
  ] as const;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ebe8dd_0%,#f3f0e6_34%,#eeebdf_100%)]">
      <SiteNav />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden bg-[#112614] px-5 pb-20 pt-28 md:px-10 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,240,83,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,232,154,0.12),transparent_34%)]" />

          <div className="relative mx-auto max-w-7xl">
            <motion.p
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.04, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--agri-primary)]"
            >
              공개 연혁
            </motion.p>
            <motion.h1
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.1, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              공개 기록으로 다시 보는
              <br className="hidden sm:block" /> 수북농업 연혁
            </motion.h1>
            <motion.p
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.16, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg"
            >
              김종수 대표와 수북농업에 관한 기사, 공개 사업자 정보, 회사 자료를 바탕으로
              주요 흐름을 사진과 함께 소개합니다.
            </motion.p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {historyHeroCards.map((card, index) => (
                <motion.article
                  key={card.title}
                  initial={revealInitial}
                  animate={revealWhileInView}
                  transition={{
                    delay: 0.22 + index * 0.06,
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                    {card.title}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">{card.value}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/74">
                    {card.description}
                  </p>
                </motion.article>
              ))}
            </div>
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
                          <SourceLink
                            href={item.sourceUrl}
                            className="mt-5 inline-flex rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                          >
                            {item.sourceLabel}
                          </SourceLink>
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
