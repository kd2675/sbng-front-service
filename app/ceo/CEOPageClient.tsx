"use client";

import Link from "next/link";
import { ceoBiography, ceoCurrentStatus, externalPhotoCredit, publicTimeline } from "../companyProfile";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import SourceLink from "../components/SourceLink";

const leadershipTimeline = publicTimeline.filter((item) =>
  [
    "2014.07.09",
    "2014.07.14",
    "2016.09.05",
    "2020.02.03",
    "2021.02.24",
    "2024.08.25",
  ].includes(item.date),
);

const leadershipRoles = [
  {
    label: "Current Public Role",
    value: "(유)수북농업 대표이사",
  },
  {
    label: "Concurrent Record",
    value: "수북환경개발 대표이사",
  },
  {
    label: "Industry Leadership",
    value: "한국유기질비료산업협동조합 제3·4대 이사장",
  },
] as const;

export default function CEOPageClient() {
  return (
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main>
        <PageHero
          eyebrow="Leadership"
          title="김종수 대표의 활동 이력과 현재 공개 기준을 다시 정리했습니다"
          description="대표 페이지는 미화보다 기록 정리에 집중해야 합니다. 조합 활동, 인터뷰, 현재 공개 체계를 한 흐름으로 압축해 읽히게 재구성했습니다."
          imageSrc="/image/kim-jong-su-portrait.jpg"
          imageAlt="김종수 대표 인물 사진"
          imageClassName="object-cover object-top"
          actions={[
            { href: "/history", label: "공개 연혁 보기" },
            { href: "/contact", label: "상담 문의", kind: "secondary" },
          ]}
          facts={[
            { label: "Role", value: "(유)수북농업 대표이사" },
            { label: "Leadership", value: "조합 제3·4대 이사장" },
            { label: "Public Record", value: "2024.08.25 기준 현재 체계 확인" },
            { label: "Coverage", value: "농민신문 · 영농자재신문 · 주간인물" },
          ]}
        />

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker">Role Summary</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  대표 개인 소개보다 역할과 공적 흐름을 먼저 배치했습니다
                </h2>
                <p className="section-copy mt-6">
                  수북농업과 수북환경개발, 조합 활동 이력, 현재 공개 연혁의 기준점을 분리해서
                  읽을 수 있도록 섹션을 정리했습니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {leadershipRoles.map((role, index) => (
                  <Reveal key={role.label} delay={index * 0.07} className="border-t border-[var(--line)] pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {role.label}
                    </p>
                    <p className="mt-3 font-display text-3xl leading-tight text-foreground">
                      {role.value}
                    </p>
                  </Reveal>
                ))}
                <Reveal delay={0.24} className="relative mt-2 aspect-[4/5] overflow-hidden rounded-[8px]">
                  <LightboxImage
                    src="/image/kim-jong-su-portrait.jpg"
                    alt="김종수 대표 인물 사진"
                    fill
                    priority
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    className="object-cover object-top"
                    hintClassName="bottom-4 left-4 right-auto"
                  />
                </Reveal>
                <Reveal delay={0.28}>
                  <SourceLink
                    href={externalPhotoCredit.url}
                    className="inline-flex text-sm font-medium text-foreground underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-foreground"
                  >
                    {externalPhotoCredit.description} 관련 기사 보기
                  </SourceLink>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[var(--surface)]">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <p className="section-kicker">Biography</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  기사와 연혁에 드러난 주요 활동을 직선적으로 나열했습니다
                </h2>
              </Reveal>

              <div className="grid gap-5">
                {ceoBiography.map((item, index) => (
                  <Reveal key={item} delay={Math.min(index * 0.04, 0.2)} className="border-t border-[var(--line)] pt-5">
                    <p className="text-sm leading-8 text-[var(--muted)]">{item}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker">Current Record</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  현재 공개 기준을 별도 섹션으로 분리했습니다
                </h2>
                <p className="section-copy mt-6">
                  과거 이력과 현재 체계는 같은 문장 안에 섞이면 해석이 흐려집니다. 그래서 최신
                  공개 기준만 따로 묶었습니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {ceoCurrentStatus.map((item, index) => (
                  <Reveal
                    key={item.date}
                    delay={index * 0.08}
                    className="grid gap-4 border-t border-[var(--line)] pt-5 md:grid-cols-[8rem_1fr]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {item.date}
                    </p>
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

        <section className="section-rule bg-[#101610] text-white">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <p className="section-kicker text-white/52">Leadership Timeline</p>
                <h2 className="section-title max-w-[10ch] text-white">
                  조합 활동과 기사 공개 시점을 한 줄기 흐름으로 정리했습니다
                </h2>
              </Reveal>

              <div className="grid gap-5">
                {leadershipTimeline.map((item, index) => (
                  <Reveal
                    key={`${item.date}-${item.title}`}
                    delay={index * 0.05}
                    className="grid gap-4 border-t border-white/10 pt-5 md:grid-cols-[8rem_1fr]"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/46">
                      {item.date}
                    </p>
                    <div>
                      <h3 className="font-display text-2xl leading-tight text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-8 text-white/62">{item.description}</p>
                      <SourceLink
                        href={item.sourceUrl}
                        className="mt-4 inline-flex text-sm font-medium text-white underline decoration-white/22 underline-offset-4 hover:decoration-[var(--accent)]"
                      >
                        {item.sourceLabel}
                      </SourceLink>
                    </div>
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
                  전체 연혁 보기
                </Link>
                <Link
                  href="/about"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-white/14 px-5 py-3 text-sm font-medium text-white hover:border-white/26"
                >
                  회사 정보 보기
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
