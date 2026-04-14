"use client";

import Link from "next/link";
import {
  companyProfile,
  companyRecordCards,
  publicSources,
  verifiedFactCards,
} from "../companyProfile";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import SourceLink from "../components/SourceLink";

const companyPhotoCards = [
  {
    src: "/image/company/subuk-facility-2015-group-1.jpg",
    alt: "수북농업 퇴비 적치 시설 사진",
    title: "퇴비 적치 시설",
    detail: "농기자재신문 2015.12.31 현장 탐방 기사",
    href: "https://www.newsam.co.kr/news/article.html?no=8732",
  },
  {
    src: "/image/company/subuk-facility-2015-side.jpg",
    alt: "수북농업 생산 설비 사진",
    title: "생산 설비 내부",
    detail: "포장과 생산 공정 일부가 공개된 사진 자료",
    href: "https://www.newsam.co.kr/news/article.html?no=8732",
  },
  {
    src: "/image/company/subuk-nextgen-2015-group-1.jpg",
    alt: "차세대리더 모임 단체 사진",
    title: "업계 교류 현장",
    detail: "농기자재신문 2015.07.31 공개 사진 자료",
    href: "https://www.newsam.co.kr/news/article.html?no=8385",
  },
] as const;

const featuredSources = publicSources.filter((source) =>
  [
    "회사 소개서",
    "한국유기질비료산업협동조합 조합원 검색",
    "농기자재신문 2015.12.31",
    "NICEbizinfo 기업정보",
    "114On 공개 사업자 정보",
  ].includes(source.label),
);

export default function AboutPageClient() {
  return (
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main>
        <PageHero
          eyebrow="About The Company"
          title="회사 실체와 공개 사업장 정보를 분명하게 정리했습니다"
          description="법인 정보, 사업장 위치, 업종 분류, 현장 사진, 업계 활동 자료를 같은 맥락에서 읽을 수 있도록 회사 페이지를 다시 구성했습니다."
          imageSrc="/image/company/subuk-facility-2015-share.jpg"
          imageAlt="수북농업 현장 대표 사진"
          actions={[
            { href: "/products", label: "제품 보기" },
            { href: "/contact", label: "상담 문의", kind: "secondary" },
          ]}
          facts={[
            { label: "Corporation", value: "농업회사법인(유)수북농업" },
            { label: "Category", value: "유기질/부숙유기질" },
            { label: "Records", value: "114On · NICEbizinfo · 조합 자료" },
            { label: "Location", value: "전남 담양군 담양읍" },
          ]}
        />

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker">Overview</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  소개보다 근거가 먼저 보이도록 구조를 바꿨습니다
                </h2>
                <p className="section-copy mt-6">{companyProfile.verificationNote}</p>
              </Reveal>

              <div className="grid gap-5">
                {companyProfile.companyOverview.slice(0, 6).map((paragraph, index) => (
                  <Reveal
                    key={paragraph}
                    delay={index * 0.05}
                    className="border-t border-[var(--line)] pt-5"
                  >
                    <p className="text-sm leading-8 text-[var(--muted)]">{paragraph}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[var(--surface)]">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-5 border-b border-[var(--line)] pb-8 md:grid-cols-2 lg:grid-cols-4">
              {verifiedFactCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.06} className="border-t border-[var(--line)] pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {card.title}
                  </p>
                  <p className="mt-3 font-display text-3xl leading-tight text-foreground">
                    {card.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{card.description}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
              {companyRecordCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 0.04} className="border-t border-[var(--line)] pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {card.title}
                  </p>
                  <p className="mt-3 text-2xl font-medium text-foreground">{card.value}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{card.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-8 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <p className="section-kicker">Field Images</p>
                <h2 className="section-title max-w-[11ch] text-balance">
                  공개 기사로 확인되는 생산 현장과 업계 활동
                </h2>
              </Reveal>
              <Reveal>
                <SourceLink
                  href="https://www.newsam.co.kr/news/article.html?no=8732"
                  className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
                >
                  현장 탐방 기사 보기
                </SourceLink>
              </Reveal>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">
              {companyPhotoCards.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08} className="grid gap-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
                    <LightboxImage
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                      hintClassName="bottom-4 left-4 right-auto"
                    />
                  </div>
                  <div className="border-t border-[var(--line)] pt-4">
                    <h3 className="font-display text-2xl text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.detail}</p>
                    <SourceLink
                      href={item.href}
                      className="mt-4 inline-flex text-sm font-medium text-foreground underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-foreground"
                    >
                      원문 보기
                    </SourceLink>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-rule bg-[#101610] text-white">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker text-white/52">Public Sources</p>
                <h2 className="section-title max-w-[10ch] text-white">
                  회사 정보 확인에 사용한 주요 공개 자료
                </h2>
                <p className="mt-6 max-w-[34rem] text-base leading-8 text-white/68">
                  페이지 안의 서술은 공개 기사, 조합 자료, 공공 사업자 정보, 내부 비치 자료를
                  기준으로 연결해 두었습니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {featuredSources.map((source, index) => (
                  <Reveal
                    key={source.label}
                    delay={index * 0.05}
                    className="grid gap-3 border-t border-white/10 pt-5 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-white">{source.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{source.detail}</p>
                    </div>
                    {source.url ? (
                      <SourceLink
                        href={source.url}
                        className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-white/14 px-4 py-3 text-sm font-medium text-white hover:border-[var(--accent)] hover:text-[var(--accent-soft)]"
                      >
                        열기
                      </SourceLink>
                    ) : null}
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="mt-12 border-t border-white/10 pt-6">
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/history"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101611] hover:bg-[var(--signal)]"
                >
                  공개 연혁 이어 보기
                </Link>
                <Link
                  href="/ceo"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-white/14 px-5 py-3 text-sm font-medium text-white hover:border-white/26"
                >
                  대표 소개 이어 보기
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
