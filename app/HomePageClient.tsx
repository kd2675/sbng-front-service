"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { companyProfile, publicSources, publicTimeline, verifiedFactCards } from "./companyProfile";
import { companyInfo } from "./companyInfo";
import LightboxImage from "./components/LightboxImage";
import PageHero from "./components/PageHero";
import Reveal from "./components/Reveal";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";
import SourceLink from "./components/SourceLink";
import { productCatalog } from "./productCatalog";

const featuredTimeline = publicTimeline.slice(-4).reverse();
const featuredSources = publicSources.filter((source) =>
  [
    "회사 소개서",
    "한국유기질비료산업협동조합 연혁",
    "농기자재신문 2015.12.31",
    "2026년 유기질비료 계약현황",
    "114On 공개 사업자 정보",
  ].includes(source.label),
);

export default function HomePageClient() {
  const productSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: productSectionRef,
    offset: ["start end", "end start"],
  });
  const galleryY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main>
        <PageHero
          eyebrow="Organic Soil Care From Damyang"
          title="수북농업의 현장과 제품을 한 화면에서 정리합니다"
          description="회사 실체, 대표 이력, 공개 연혁, 제품 자료, 상담 창구를 흐름 끊김 없이 이어 붙인 브랜드 홈페이지입니다."
          imageSrc="/image/company/subuk-facility-2015-main.jpg"
          imageAlt="수북농업 현장 전경"
          imageClassName="object-cover object-center"
          actions={[
            { href: "/products", label: "제품 보기" },
            { href: "/contact", label: "상담 문의", kind: "secondary" },
          ]}
          note={companyProfile.verificationNote}
          facts={[
            { label: "Established", value: companyInfo.establishmentDate },
            { label: "Based In", value: "전남 담양" },
            { label: "Product Line", value: "흙손 · 흙보약 · 무등산" },
            { label: "Contact", value: companyInfo.telephoneDisplay },
          ]}
        />

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
              <Reveal className="max-w-[34rem]">
                <p className="section-kicker">Company Profile</p>
                <h2 className="section-title text-balance">
                  담양 현장의 실체를 먼저 보여주는 브랜드 구조
                </h2>
                <p className="section-copy mt-6">
                  수북농업은 소개성 문구보다 공개 기록과 제품 실물, 사업장 맥락이 먼저 읽히는
                  편이 맞습니다. 이번 구성은 그 순서를 앞쪽으로 당겼습니다.
                </p>
                <div className="mt-8 border-t border-[var(--line)] pt-6">
                  <p className="text-sm leading-7 text-[var(--muted)]">
                    {companyProfile.summary}
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-6 border-t border-[var(--line)] pt-4 md:grid-cols-2">
                {verifiedFactCards.map((item, index) => (
                  <Reveal key={item.title} delay={index * 0.06} className="border-t border-[var(--line)] pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {item.title}
                    </p>
                    <p className="mt-3 font-display text-3xl leading-tight text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-3 max-w-[18rem] text-sm leading-7 text-[var(--muted)]">
                      {item.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="editorial-grid mt-14 lg:grid-cols-[1.05fr_0.95fr]">
              <Reveal className="relative min-h-[25rem] overflow-hidden rounded-[8px]">
                <motion.div className="absolute inset-0" style={{ y: galleryY }}>
                  <LightboxImage
                    src="/image/company/subuk-facility-2015-group-2.jpg"
                    alt="수북농업 시설 내부 사진"
                    fill
                    priority
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    className="object-cover"
                    hintClassName="bottom-4 left-4 right-auto"
                  />
                </motion.div>
              </Reveal>

              <Reveal className="grid content-start gap-6">
                <div className="border-t border-[var(--line)] pt-5">
                  <p className="section-kicker">Field Story</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight text-foreground">
                    생산 현장과 기록을 같은 온도로 보여줍니다
                  </h3>
                </div>
                <div className="grid gap-5 border-t border-[var(--line)] pt-5">
                  {companyProfile.companyOverview.slice(0, 4).map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-8 text-[var(--muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    href="/about"
                    className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
                  >
                    회사 정보 보기
                  </Link>
                  <Link
                    href="/history"
                    className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] px-4 py-3 text-sm font-medium text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-foreground"
                  >
                    공개 연혁 보기
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section ref={productSectionRef} className="section-rule bg-[#0f1510] text-white">
          <div className="section-wrap py-18 md:py-24">
            <Reveal className="flex flex-col gap-5 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="section-kicker text-white/52">Products</p>
                <h2 className="section-title max-w-[11ch] text-white">
                  대표 제품을 첫 화면 수준으로 끌어올렸습니다
                </h2>
              </div>
              <p className="max-w-[32rem] text-sm leading-8 text-white/62">
                흙손, 흙보약, 무등산은 각각의 쓰임과 제형, 보증 성분량이 다릅니다. 홈에서도
                차이를 바로 읽을 수 있게 구성했습니다.
              </p>
            </Reveal>

            <motion.div style={{ y: galleryY }} className="mt-10 grid gap-10 lg:grid-cols-3">
              {productCatalog.map((product, index) => (
                <Reveal key={product.id} delay={index * 0.08} className="grid gap-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
                    <LightboxImage
                      src={product.frontImage}
                      alt={`${product.name} 제품 전면 이미지`}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                      hintClassName="bottom-4 left-4 right-auto"
                    />
                  </div>
                  <div className="grid gap-4 border-t border-white/10 pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/44">
                      {product.category}
                    </p>
                    <div>
                      <h3 className="font-display text-4xl leading-none text-white">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{product.displayName}</p>
                    </div>
                    <p className="text-sm leading-8 text-white/68">{product.cardSummary}</p>
                    <div className="grid gap-2 border-t border-white/8 pt-4 text-sm text-white/54">
                      <p>성상 {product.form}</p>
                      <p>포장단위 {product.packUnit}</p>
                      <p>사용 기준 {product.usage}</p>
                    </div>
                    <Link
                      href={`/products#product-${product.id}`}
                      className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-white/16 px-4 py-3 text-sm font-medium text-white hover:border-[var(--accent)] hover:text-[var(--accent-soft)]"
                    >
                      자세히 보기
                    </Link>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section-rule bg-[var(--surface)]">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker">Public Timeline</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  최근 공개 기록과 대표 이력을 압축해서 배치했습니다
                </h2>
                <p className="section-copy mt-6">
                  브랜드 사이트라도 최신 공개 기준이 무엇인지 먼저 보여줘야 신뢰가 생깁니다.
                  그래서 현재 체계, 계약현황, 사업장 기준 정보를 한 구간에 모았습니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {featuredTimeline.map((item, index) => (
                  <Reveal key={`${item.date}-${item.title}`} delay={index * 0.06} className="grid gap-4 border-t border-[var(--line)] pt-5 md:grid-cols-[8rem_1fr]">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        {item.date}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-8 text-[var(--muted)]">
                        {item.description}
                      </p>
                      <SourceLink
                        href={item.sourceUrl}
                        className="mt-4 inline-flex text-sm font-medium text-foreground underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-foreground"
                      >
                        {item.sourceLabel}
                      </SourceLink>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <p className="section-kicker">Sources</p>
                <h2 className="section-title max-w-[11ch] text-balance">
                  공개 자료와 내부 보관 링크를 바로 연결합니다
                </h2>
                <p className="section-copy mt-6">
                  기사 원문과 회사 소개서, 공공 자료를 홈에서도 바로 연결해 두었습니다.
                  내부 보관본이 필요한 흐름은 연혁과 자료 페이지에서 이어집니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {featuredSources.map((source, index) => (
                  <Reveal key={source.label} delay={index * 0.05} className="grid gap-3 border-t border-[var(--line)] pt-5 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <h3 className="text-lg font-medium text-foreground">{source.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{source.detail}</p>
                    </div>
                    {source.url ? (
                      <SourceLink
                        href={source.url}
                        className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
                      >
                        열기
                      </SourceLink>
                    ) : null}
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[#111611] text-white">
          <div className="section-wrap grid gap-10 py-18 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal>
              <p className="section-kicker text-white/52">Contact</p>
              <h2 className="section-title max-w-[11ch] text-white">
                제품 상담과 회사 문의는 이 흐름에서 바로 닿게 했습니다
              </h2>
              <p className="mt-6 max-w-[34rem] text-base leading-8 text-white/68">
                작물, 사용 시기, 토양 상태, 필요한 자료를 남겨주시면 접수 후 순차적으로
                안내합니다.
              </p>
            </Reveal>

            <Reveal className="grid gap-5 border-t border-white/10 pt-5">
              <div className="grid gap-2 text-sm leading-8 text-white/66">
                <p>{companyInfo.address}</p>
                <p>전화 {companyInfo.telephoneDisplay}</p>
                <p>휴대전화 {companyInfo.mobileDisplay}</p>
                <p>이메일 {companyInfo.emailDisplay}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101611] hover:bg-[var(--signal)]"
                >
                  문의 페이지 열기
                </Link>
                <Link
                  href="/ceo"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-white/14 px-5 py-3 text-sm font-medium text-white hover:border-white/26"
                >
                  대표 소개 보기
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
