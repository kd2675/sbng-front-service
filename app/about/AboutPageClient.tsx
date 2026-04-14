"use client";

import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import { productCatalog } from "../productCatalog";
import {
  companyProfile,
  companyRecordCards,
  publicTimeline,
  publicSources,
  verifiedFactCards,
} from "../companyProfile";
import { companyInfo } from "../companyInfo";

const productShowcaseItems = productCatalog.map((product) => ({
  id: product.id,
  name: product.name,
  alt: `수북농업 제품 ${product.name} 포장 이미지`,
  image: product.frontImage,
  badge: product.material,
  summary: product.cardSummary,
}));

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef2e9_0%,#f6f8f4_42%,#eef2e8_100%)]">
      <SiteNav />

      <main className="overflow-x-hidden">
        <section className="relative flex min-h-[72svh] items-end overflow-hidden px-5 pb-16 pt-28 md:px-10 lg:px-20">
          <Image
            alt="수북농업 제품 무등산 포장 이미지"
            src="/image/mudeungsan-front.jpeg"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(9,18,8,0.86),rgba(13,22,10,0.48)_42%,rgba(13,22,10,0.82)_100%)]" />

          <div className="relative z-10 mx-auto w-full max-w-6xl">
            <span className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/82 backdrop-blur">
              수북농업 소개
            </span>
            <h1 className="font-display max-w-4xl text-5xl font-bold leading-[1.02] text-white md:text-7xl">
              수북농업의 길과
              <br className="hidden sm:block" /> 제품을 소개합니다
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/84 md:text-xl">
              {companyProfile.summary}
            </p>
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
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                주요 연혁
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                수북농업 주요 연혁
              </h2>
              <p className="mt-4 max-w-3xl leading-relaxed text-[#556d54]">
                김종수 대표의 공개 이력부터 2024년 조합 체계 변화, 2026년 공개 사업자
                정보까지 한 흐름으로 소개합니다. 사진과 함께 이어지는 연혁은 별도
                페이지에서 더 자세히 보실 수 있습니다.
              </p>
            </div>

            <div className="space-y-5">
              {publicTimeline.map((item) => (
                <article
                  key={item.date}
                  className="grid gap-4 rounded-[2rem] border border-black/8 bg-white px-6 py-6 shadow-[0_16px_42px_rgba(12,26,12,0.06)] md:grid-cols-[8.5rem_1fr_auto]"
                >
                  <p className="text-sm font-bold text-[var(--agri-primary-deep)]">{item.date}</p>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--agri-ink)]">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-[#526952]">{item.description}</p>
                  </div>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit self-start rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                  >
                    {item.sourceLabel}
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/history"
                className="inline-flex rounded-full bg-[var(--agri-ink)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
              >
                사진 흐름 연혁 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="px-5 py-18 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  제품 안내
                </p>
                <h2 className="font-display mt-4 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                  대표 제품과 안내 자료
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[#587057]">
                대표 제품 3종의 특징을 먼저 살펴보시고, 자세한 자료는 제품 페이지에서
                이어서 확인하실 수 있습니다.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {productShowcaseItems.map((item) => (
                <figure
                  key={item.id}
                  className="group overflow-hidden rounded-[1.75rem] border border-black/8 bg-[#eff5ea] shadow-[0_18px_46px_rgba(12,26,12,0.06)]"
                >
                  <div className="relative aspect-[5/6]">
                    <Image
                      alt={item.alt}
                      src={item.image}
                      fill
                      sizes="(min-width: 1024px) 28vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,20,10,0.02),rgba(10,20,10,0.18)_45%,rgba(10,20,10,0.72)_100%)]" />
                    <div className="absolute left-5 top-5 rounded-full bg-white/88 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--agri-ink)]">
                      {item.badge}
                    </div>
                    <figcaption className="absolute inset-x-0 bottom-0 px-5 pb-5 pt-10 text-white">
                      <p className="text-2xl font-bold">{item.name}</p>
                      <p className="mt-3 text-sm leading-relaxed text-white/84">{item.summary}</p>
                    </figcaption>
                  </div>
                </figure>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-[2rem] bg-[#112614] px-8 py-9 text-white shadow-[0_20px_48px_rgba(12,26,12,0.14)]">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                  제품 흐름
                </p>
                <h3 className="font-display mt-4 text-3xl font-bold md:text-4xl">
                  흙손, 흙보약, 무등산을 한 흐름으로 소개합니다
                </h3>
                <p className="mt-5 max-w-2xl leading-relaxed text-white/84">
                  토양 개량과 작물 생육을 돕는 대표 제품 3종을 먼저 살펴보고, 각 제품의
                  안내 자료와 보증 성분량, 사용 기준은 제품 소개 페이지에서 이어서
                  살펴보실 수 있습니다. 2026년 공개 계약현황 기준으로도 흙손, 흙보약,
                  무등산 계열 제품이 함께 확인됩니다.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-[var(--agri-primary)]"
                  >
                    제품 소개 이어 보기
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    제품 문의 남기기
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
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <article className="rounded-[2rem] bg-[#112614] px-8 py-10 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary)]">
                참고 자료
              </p>
              <h2 className="font-display mt-4 text-4xl font-bold md:text-5xl">
                함께 보면 좋은 자료
              </h2>
              <div className="mt-7 space-y-4">
                {publicSources.map((source) => (
                  <div
                    key={source.label}
                    className="rounded-2xl border border-white/10 bg-white/8 px-5 py-4"
                  >
                    <p className="text-lg font-bold text-white">{source.label}</p>
                    <p className="mt-2 leading-relaxed text-white/74">{source.detail}</p>
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex text-sm font-bold text-[var(--agri-primary)]"
                      >
                        자료 보기 →
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>

            <div className="flex flex-col gap-4">
              <Link
                href="/ceo"
                className="rounded-full bg-[var(--agri-primary)] px-7 py-3 text-center text-sm font-bold text-[var(--agri-ink)] transition hover:brightness-95"
              >
                김종수 대표 소개 보기
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-black/12 px-7 py-3 text-center text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
              >
                문의 페이지 열기
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
