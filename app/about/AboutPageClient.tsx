"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import SourceLink from "../components/SourceLink";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import {
  companyProfile,
  companyRecordCards,
  verifiedFactCards,
} from "../companyProfile";
import { companyInfo } from "../companyInfo";

const aboutHeroCards = [
  {
    title: "법인명",
    value: companyInfo.legalName,
    description: "담양 본사를 기반으로 회사 정보와 제품 자료를 함께 안내합니다.",
  },
  {
    title: "대표자",
    value: companyInfo.ceoName,
    description: "공개 기사와 사업자 정보에 함께 소개된 대표자입니다.",
  },
  {
    title: "제품 안내",
    value: "흙손 · 흙보약 · 무등산",
    description: "대표 제품 3종의 포장 이미지와 안내 자료를 이어서 살펴보실 수 있습니다.",
  },
] as const;

const detailLinks = [
  {
    href: "/ceo",
    title: "김종수 대표 소개",
    description: "대표 활동과 공개 기록을 이어서 살펴보실 수 있습니다.",
    image: "/image/kim-jong-su-portrait.jpg",
    alt: "김종수 대표 인물 사진",
  },
  {
    href: "/history",
    title: "사진 흐름 연혁",
    description: "기사 캡처와 공개 기록을 따라 연혁 흐름을 자세히 보실 수 있습니다.",
    image: "/image/history/history-kofic-2024-08-25.png",
    alt: "한국유기질비료산업협동조합 연혁 기록 캡처",
  },
  {
    href: "/products",
    title: "제품 안내",
    description: "흙손, 흙보약, 무등산의 포장 이미지와 안내 자료를 보실 수 있습니다.",
    image: "/image/heukboyak-front.jpeg",
    alt: "수북농업 흙보약 포장 이미지",
  },
] as const;

const companyPhotoCards = [
  {
    src: "/image/company/subuk-facility-2015-group-1.jpg",
    alt: "농기자재신문 기사에 실린 수북농업 퇴비 적치 시설 사진",
    date: "2015.12.31",
    sourceLabel: "농기자재신문 2015.12.31",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=8732",
    title: "퇴비 적치 시설",
    description: "농기자재신문 2015년 12월 31일 기사에 소개된 수북농업 현장 사진입니다.",
  },
  {
    src: "/image/company/subuk-facility-2015-side.jpg",
    alt: "농기자재신문 기사에 실린 수북농업 생산 설비 사진",
    date: "2015.12.31",
    sourceLabel: "농기자재신문 2015.12.31",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=8732",
    title: "생산 설비 내부",
    description: "포장과 생산 공정 일부가 공개 기사 사진으로 확인됩니다.",
  },
  {
    src: "/image/company/subuk-facility-2015-group-2.jpg",
    alt: "농기자재신문 기사에 실린 수북농업 시설 내부 사진",
    date: "2015.12.31",
    sourceLabel: "농기자재신문 2015.12.31",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=8732",
    title: "시설 내부 현장",
    description: "담양 수북농업 탐방 기사에서 확인되는 시설 내부 장면입니다.",
  },
] as const;

const industryActivityCards = [
  {
    src: "/image/company/subuk-nextgen-2015-group-1.jpg",
    alt: "농기자재신문 기사에 실린 차세대리더들의 모임 단체 사진",
    date: "2015.07.31",
    sourceLabel: "농기자재신문 2015.07.31",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=8385",
    title: "차세대리더들의 모임 현장",
    description:
      "2015년 7월 농기자재신문 기사에 실린 현장 사진입니다. 기사 참석자 명단에는 김건영(수북농업)이 포함되어 있습니다.",
  },
  {
    src: "/image/company/subuk-nextgen-2015-group-2.jpg",
    alt: "농기자재신문 기사에 실린 차세대리더들의 모임 설명 장면",
    date: "2015.07.31",
    sourceLabel: "농기자재신문 2015.07.31",
    sourceUrl: "https://www.newsam.co.kr/news/article.html?no=8385",
    title: "교류와 설명 장면",
    description:
      "차세대리더들의 모임 기사에 실린 공개 사진으로, 수북농업이 참여한 업계 교류 흐름을 함께 보여줍니다.",
  },
] as const;

export default function AboutPageClient() {
  const reduceMotion = useReducedMotion();
  const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const revealWhileInView = { opacity: 1, y: 0 };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef2e9_0%,#f6f8f4_42%,#eef2e8_100%)]">
      <SiteNav />

      <main className="overflow-x-hidden">
        <section className="relative overflow-hidden bg-[#112614] px-5 pb-20 pt-28 md:px-10 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,240,83,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(93,140,84,0.18),transparent_36%)]" />

          <div className="relative mx-auto max-w-7xl">
            <motion.p
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.04, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--agri-primary)]"
            >
              회사 소개
            </motion.p>
            <motion.h1
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.1, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="font-display mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              수북농업의 회사 정보와
              <br className="hidden sm:block" /> 공개 기록을 소개합니다
            </motion.h1>
            <motion.p
              initial={revealInitial}
              animate={revealWhileInView}
              transition={{ delay: 0.16, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg"
            >
              {companyProfile.summary}
            </motion.p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {aboutHeroCards.map((card, index) => (
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

        <section className="px-5 py-18 md:px-10 lg:px-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_22px_60px_rgba(12,26,12,0.08)]">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                회사 개요
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)]">
                회사 개요
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#50674f] md:text-lg">
                {companyProfile.companyOverview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p className="mt-6 rounded-2xl bg-[#f5f8f1] px-5 py-4 text-sm leading-relaxed text-[#556d54]">
                {companyProfile.verificationNote}
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {verifiedFactCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.75rem] border border-black/8 bg-[#f7faf4] px-6 py-6"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6a8068]">
                    {card.title}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">{card.value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#566d55]">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-4 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                공개 사업자 정보
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                공개 기록 기준 회사 개요
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {companyRecordCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[1.75rem] border border-black/8 bg-white px-6 py-6 shadow-[0_16px_42px_rgba(12,26,12,0.06)]"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6a8068]">
                    {card.title}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">{card.value}</p>
                  <p className="mt-3 text-sm leading-relaxed text-[#566d55]">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-18 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  현장 사진
                </p>
                <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                  공개 기사로 본 수북농업 현장
                </h2>
              </div>
              <SourceLink
                href="https://www.newsam.co.kr/news/article.html?no=8732"
                className="inline-flex rounded-full border border-black/10 px-5 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
              >
                현장 탐방 기사 보기
              </SourceLink>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {companyPhotoCards.map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden rounded-[1.75rem] border border-black/8 bg-white shadow-[0_18px_46px_rgba(12,26,12,0.06)]"
                >
                  <div className="relative aspect-[4/3] bg-[#e8eee1]">
                    <Image
                      alt={item.alt}
                      src={item.src}
                      fill
                      loading={item.src === "/image/company/subuk-facility-2015-group-1.jpg" ? "eager" : undefined}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-[var(--agri-ink)] shadow-[0_8px_20px_rgba(12,26,12,0.14)]">
                      {item.date}
                    </div>
                  </div>
                  <figcaption className="px-6 py-6">
                    <p className="text-2xl font-bold text-[var(--agri-ink)]">{item.title}</p>
                    <p className="mt-3 leading-relaxed text-[#556d54]">{item.description}</p>
                    <SourceLink
                      href={item.sourceUrl}
                      className="mt-5 inline-flex text-sm font-bold text-[var(--agri-primary-deep)]"
                    >
                      출처: {item.sourceLabel} →
                    </SourceLink>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-4 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  업계 교류
                </p>
                <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                  차세대리더들의 모임 공개 사진
                </h2>
              </div>
              <SourceLink
                href="https://www.newsam.co.kr/news/article.html?no=8385"
                className="inline-flex rounded-full border border-black/10 px-5 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
              >
                관련 기사 보기
              </SourceLink>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {industryActivityCards.map((item) => (
                <figure
                  key={item.src}
                  className="overflow-hidden rounded-[1.75rem] border border-black/8 bg-white shadow-[0_18px_46px_rgba(12,26,12,0.06)]"
                >
                  <div className="relative aspect-[4/3] bg-[#e8eee1]">
                    <Image
                      alt={item.alt}
                      src={item.src}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-[var(--agri-ink)] shadow-[0_8px_20px_rgba(12,26,12,0.14)]">
                      {item.date}
                    </div>
                  </div>
                  <figcaption className="px-6 py-6">
                    <p className="text-2xl font-bold text-[var(--agri-ink)]">{item.title}</p>
                    <p className="mt-3 leading-relaxed text-[#556d54]">{item.description}</p>
                    <SourceLink
                      href={item.sourceUrl}
                      className="mt-5 inline-flex text-sm font-bold text-[var(--agri-primary-deep)]"
                    >
                      출처: {item.sourceLabel} →
                    </SourceLink>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-18 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-[2rem] bg-[#112614] px-8 py-9 text-white shadow-[0_20px_48px_rgba(12,26,12,0.14)]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                  사업장 안내
                </p>
                <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">
                  담양 본사 정보
                </h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-white/84">
                  수북농업 본사 주소와 대표 연락처, 상담 가능 시간을 함께 안내합니다.
                </p>
                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/64">
                      주소
                    </p>
                    <p className="mt-2 text-lg font-bold text-white">{companyInfo.address}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/64">
                      상담 시간
                    </p>
                    <p className="mt-2 text-lg font-bold text-white">{companyInfo.businessHours}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/64">
                      대표 전화
                    </p>
                    <p className="mt-2 text-lg font-bold text-white">{companyInfo.telephoneDisplay}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/64">
                      이메일
                    </p>
                    <p className="mt-2 text-lg font-bold text-white break-all">
                      {companyInfo.emailDisplay}
                    </p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-[var(--agri-primary)]"
                  >
                    문의 페이지 열기
                  </Link>
                </div>
              </article>

              <article className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_46px_rgba(12,26,12,0.06)]">
                <div className="relative aspect-[4/3] bg-[#eff4ea]">
                  <Image
                    alt="수북농업 명함 이미지"
                    src="/image/ceo-card.png"
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-6 py-6">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
                    회사 안내
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">
                    본사 연락처와 주소를 소개합니다
                  </h3>
                  <p className="mt-4 leading-relaxed text-[#556d54]">
                    담양 본사 주소와 전화, 팩스, 휴대전화, 이메일을 함께 안내합니다.
                  </p>
                  <p className="mt-5 text-sm font-semibold leading-relaxed text-[#365235]">
                    {companyInfo.address}
                    <br />
                    전화 {companyInfo.telephoneDisplay} · 휴대전화 {companyInfo.mobileDisplay}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 pt-18 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                더 살펴보기
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                필요한 정보로 바로 이어집니다
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {detailLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_18px_46px_rgba(12,26,12,0.06)] transition hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] bg-[#e7eee1]">
                    <Image
                      alt={item.alt}
                      src={item.image}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="px-6 py-6">
                    <h3 className="text-2xl font-bold text-[var(--agri-ink)]">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-[#556d54]">{item.description}</p>
                    <p className="mt-5 text-sm font-bold text-[var(--agri-primary-deep)]">
                      자세히 보기 →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
