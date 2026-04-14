"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import SourceLink from "../components/SourceLink";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import {
  ceoBiography,
  ceoCurrentStatus,
  externalPhotoCredit,
  publicTimeline,
} from "../companyProfile";

const roleCards = [
  {
    title: "대표 역할",
    description: "(유)수북농업 대표이사",
    detail: "수북농업의 공개 기사와 회사 정보에서 함께 안내되는 현재 역할입니다.",
  },
  {
    title: "겸임 이력",
    description: "수북환경개발 대표이사",
    detail: "공개 기사 기준으로 함께 소개된 이력입니다.",
  },
  {
    title: "조합 활동",
    description: "한국유기질비료산업협동조합 제3·4대 이사장",
    detail: "조합 공개 연혁과 기사 자료를 바탕으로 정리했습니다.",
  },
] as const;

const ceoTimelineDates = new Set([
  "2014.07.09",
  "2014.07.14",
  "2016.09.05",
  "2020.02.03",
  "2020.08.07",
  "2021.02.24",
  "2024.08.25",
]);
const ceoTimelineItems = publicTimeline.filter((item) => ceoTimelineDates.has(item.date));

export default function CEOPageClient() {
  const reduceMotion = useReducedMotion();
  const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 };
  const revealWhileInView = { opacity: 1, y: 0 };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--agri-paper)] text-[var(--agri-ink)]">
      <SiteNav />

      <main>
        <section className="relative overflow-hidden bg-[#112614] px-5 pb-20 pt-28 md:px-10 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,240,83,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,232,154,0.12),transparent_32%)]" />
          <div className="relative mx-auto max-w-7xl">
            <motion.p
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--agri-primary)]"
            >
              대표 소개
            </motion.p>
            <motion.h1
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              김종수 대표의 주요 활동과
              <br className="hidden sm:block" /> 공개 이력을 소개합니다
            </motion.h1>
            <motion.p
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg"
            >
              수북농업과 수북환경개발을 이끌며 현장과 산업을 함께 살펴온 김종수 대표의
              공개 기사와 연혁 흐름을 정리했습니다.
            </motion.p>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="grid gap-4 sm:grid-cols-2">
                {roleCards.map((role, index) => (
                  <motion.article
                    key={role.title}
                    initial={revealInitial}
                    animate={revealWhileInView}
                    transition={{
                      delay: 0.22 + index * 0.06,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                      {role.title}
                    </p>
                    <h2 className="mt-3 text-2xl font-bold text-white">{role.description}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/74">{role.detail}</p>
                  </motion.article>
                ))}
              </div>

              <motion.figure
                initial={revealInitial}
                animate={revealWhileInView}
                transition={{ duration: 0.45, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 shadow-[0_30px_80px_rgba(0,0,0,0.26)]"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    alt="농민신문 기사에 실린 김종수 대표 인물 사진"
                    src="/image/kim-jong-su-portrait.jpg"
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-white/74">
                  {externalPhotoCredit.description}
                </figcaption>
              </motion.figure>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-18 md:px-10 lg:px-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.3 }}
              className="rounded-[2rem] border border-black/8 bg-[#f7faf4] p-8"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
                대표 활동
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)]">
                대표 소개
              </h2>
              <div className="mt-6 space-y-4 leading-relaxed text-[#516950]">
                <p>
                  김종수 대표는 수북농업과 수북환경개발을 이끌며 유기질비료 산업과 현장
                  중심의 농업 활동을 이어오고 있습니다.
                </p>
                <p>
                  조합 활동과 지역 농업 관련 역할을 함께 맡으며 현장과 산업을 연결하는
                  흐름을 이어왔습니다.
                </p>
                <p className="rounded-2xl bg-white px-5 py-4 text-sm leading-relaxed text-[#556d54]">
                  한국유기질비료산업협동조합 공개 연혁 기준 현재 조합 체계는 2024년 8월
                  25일 제6대 김방식 이사장 취임 이후 기준으로 안내되며, 김종수 대표의
                  조합 이력은 제3·4대 이사장 기록으로 확인됩니다.
                </p>
              </div>
              <div className="mt-8 space-y-3">
                {ceoCurrentStatus.map((item) => (
                  <SourceLink
                    key={item.date}
                    href={item.sourceUrl}
                    className="block rounded-[1.6rem] border border-black/8 bg-white px-5 py-4 transition hover:-translate-y-0.5"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--agri-primary-deep)]">
                      {item.date}
                    </p>
                    <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#556d54]">
                      {item.description}
                    </p>
                    <p className="mt-3 text-sm font-bold text-[var(--agri-primary-deep)]">
                      {item.sourceLabel} →
                    </p>
                  </SourceLink>
                ))}
              </div>
              <div className="mt-8 space-y-3">
                <SourceLink
                  href={externalPhotoCredit.url}
                  className="inline-flex text-sm font-bold text-[var(--agri-primary-deep)]"
                >
                  관련 기사 보기 →
                </SourceLink>
              </div>
            </motion.article>

            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_18px_46px_rgba(12,26,12,0.06)]"
            >
              <h2 className="font-display text-4xl font-bold text-[var(--agri-ink)]">
                주요 활동
              </h2>
              <ul className="mt-7 space-y-4">
                {ceoBiography.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={revealInitial}
                    whileInView={revealWhileInView}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ delay: Math.min(index * 0.05, 0.16) }}
                    className="flex gap-3 rounded-2xl bg-[#f5f8f1] px-5 py-4 text-sm leading-relaxed text-[#556d54]"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--agri-primary-deep)]" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>

        <section className="bg-[#eef3ea] px-5 py-18 md:px-10 lg:px-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
                공개 연혁
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                대표 연혁
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-[#556d54]">
                2014년 이사장 선출부터 이후 공개 기록 흐름까지 함께 살펴보실 수
                있습니다.
              </p>
            </div>

            <div className="space-y-5">
              {ceoTimelineItems.map((item, index) => (
                <motion.article
                  key={item.date}
                  initial={revealInitial}
                  whileInView={revealWhileInView}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: Math.min(index * 0.05, 0.16) }}
                  className="grid gap-4 rounded-[2rem] border border-black/8 bg-white px-6 py-6 shadow-[0_16px_40px_rgba(12,26,12,0.05)] md:grid-cols-[8.5rem_1fr_auto]"
                >
                  <p className="text-sm font-bold text-[var(--agri-primary-deep)]">{item.date}</p>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--agri-ink)]">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-[#526951]">{item.description}</p>
                  </div>
                  <SourceLink
                    href={item.sourceUrl}
                    className="w-fit self-start rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                  >
                    {item.sourceLabel}
                  </SourceLink>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-18 md:px-10 lg:px-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-3">
            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_46px_rgba(12,26,12,0.06)]"
            >
              <div className="relative aspect-[4/3] bg-[#edf2e8]">
                <Image
                  alt="2019년 비료품질관리교육 행사 사진"
                  src="/image/kim-jong-su-assembly.jpg"
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
                  현장 기록
                </p>
                <h3 className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">
                  행사 현장
                </h3>
                <p className="mt-4 leading-relaxed text-[#536b52]">
                  비료품질관리교육 행사 현장을 통해 산업과 현장을 함께 살피는 활동 흐름을
                  전합니다.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_46px_rgba(12,26,12,0.06)]"
            >
              <div className="relative aspect-[4/3] bg-[#edf2e8]">
                <Image
                  alt="한국유기질비료산업협동조합 연혁 기록 캡처"
                  src="/image/history/history-kofic-2024-08-25.png"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-6">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
                  공개 기록
                </p>
                <h3 className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">
                  연혁 흐름 이어 보기
                </h3>
                <p className="mt-4 leading-relaxed text-[#536b52]">
                  기사 캡처와 공개 기록을 따라 연혁 흐름을 사진과 함께 자세히 보실 수
                  있습니다.
                </p>
                <Link
                  href="/history"
                  className="mt-5 inline-flex rounded-full bg-[var(--agri-ink)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
                >
                  사진 연혁 보기
                </Link>
              </div>
            </motion.article>

            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[2rem] bg-[#112614] px-8 py-10 text-white"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary)]">
                함께 보기
              </p>
              <h3 className="font-display mt-4 text-4xl font-bold">다른 정보도 이어집니다</h3>
              <p className="mt-7 text-base leading-relaxed text-white/84">
                회사 개요와 사업장 정보, 제품 자료, 문의 페이지로 바로 이동하실 수
                있습니다.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about"
                  className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-[var(--agri-primary)]"
                >
                  회사 정보
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-white/18 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  제품 안내
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/18 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  문의 페이지
                </Link>
              </div>
            </motion.article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
