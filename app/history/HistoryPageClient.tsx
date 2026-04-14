"use client";

import Link from "next/link";
import { historyFlowTimeline } from "../companyProfile";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import SourceLink from "../components/SourceLink";

export default function HistoryPageClient() {
  return (
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main>
        <PageHero
          eyebrow="Public History"
          title="기사와 공개 자료를 따라 수북농업의 흐름을 다시 배치했습니다"
          description="연혁 페이지는 단순 연표보다 장면과 맥락이 먼저 읽혀야 합니다. 각 시기의 기사 캡처와 설명을 한 쌍으로 묶어, 사용자가 기록을 따라가며 읽게 다시 정리했습니다."
          imageSrc="/image/history/history-weeklypeople-2020-02-03-main.jpg"
          imageAlt="주간인물 기사에 실린 수북농업 관련 사진"
          imageClassName="object-cover object-center"
          actions={[
            { href: "/ceo", label: "대표 소개 보기" },
            { href: "/about", label: "회사 정보", kind: "secondary" },
          ]}
          facts={[
            { label: "Timeline", value: `${historyFlowTimeline.length}개 공개 시점` },
            { label: "Format", value: "기사 캡처 + 설명 + 원문 링크" },
            { label: "Coverage", value: "2014.07 ~ 2026.03" },
            { label: "Archive", value: "내부 보관 페이지 연동" },
          ]}
        />

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker">Reading Order</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  연혁을 한 줄이 아니라 장면 묶음으로 재배치했습니다
                </h2>
                <p className="section-copy mt-6">
                  각 시점은 날짜, 핵심 제목, 설명, 캡처 이미지, 원문 링크가 하나의 블록으로
                  묶입니다. 그래서 사용자는 맥락을 잃지 않고 아래로 내려갈 수 있습니다.
                </p>
              </Reveal>

              <Reveal className="grid gap-5 border-t border-[var(--line)] pt-5">
                <p className="text-sm leading-8 text-[var(--muted)]">
                  기사 보관이 필요한 항목은 내부 자료 페이지와 이어지도록 두었고, 조합 연혁이나
                  공공 사업자 정보처럼 외부 공개 자료가 유지되는 항목은 원문으로 바로 연결했습니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/sources/kofic-history"
                    className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
                  >
                    자료 보관본 보기
                  </Link>
                  <Link
                    href="/ceo"
                    className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] px-4 py-3 text-sm font-medium text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-foreground"
                  >
                    대표 소개 보기
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[var(--surface)]">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-14">
              {historyFlowTimeline.map((item, index) => (
                <article
                  key={item.period}
                  id={`history-${item.period.replaceAll(".", "-")}`}
                  className="grid gap-8 border-t border-[var(--line)] pt-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12"
                >
                  <Reveal className={index % 2 === 1 ? "lg:order-2" : undefined}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      {item.period}
                    </p>
                    <h2 className="mt-4 font-display text-4xl leading-tight text-foreground">
                      {item.title}
                    </h2>
                    <p className="mt-5 text-sm leading-8 text-[var(--muted)]">{item.description}</p>
                    {item.sourceUrl && item.sourceLabel ? (
                      <SourceLink
                        href={item.sourceUrl}
                        className="mt-5 inline-flex text-sm font-medium text-foreground underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-foreground"
                      >
                        {item.sourceLabel}
                      </SourceLink>
                    ) : null}
                  </Reveal>

                  <Reveal className={index % 2 === 1 ? "lg:order-1" : undefined}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
                      <LightboxImage
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="object-cover"
                        hintClassName="bottom-4 left-4 right-auto"
                      />
                    </div>
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-rule bg-[#101610] text-white">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <p className="section-kicker text-white/52">Continue</p>
                <h2 className="section-title max-w-[10ch] text-white">
                  연혁에서 본 흐름을 다른 페이지와 자연스럽게 이어 붙였습니다
                </h2>
                <p className="mt-6 max-w-[34rem] text-base leading-8 text-white/68">
                  연혁에서 확인한 역할과 사업장 정보는 대표 소개, 회사 정보, 자료 보관 페이지로
                  바로 연결됩니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {[
                  {
                    href: "/ceo",
                    title: "대표 소개",
                    detail: "조합 활동, 현재 공개 기준, 대표 이력 흐름을 이어서 볼 수 있습니다.",
                  },
                  {
                    href: "/about",
                    title: "회사 정보",
                    detail: "사업장 정보, 생산 시설 사진, 공개 사업자 정보를 이어서 확인할 수 있습니다.",
                  },
                  {
                    href: "/sources/114on-business-info",
                    title: "자료 보관본",
                    detail: "원문 상태와 저장된 보관 파일을 함께 확인할 수 있습니다.",
                  },
                ].map((item, index) => (
                  <Reveal
                    key={item.href}
                    delay={index * 0.06}
                    className="grid gap-3 border-t border-white/10 pt-5 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{item.detail}</p>
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-white/14 px-4 py-3 text-sm font-medium text-white hover:border-[var(--accent)] hover:text-[var(--accent-soft)]"
                    >
                      열기
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
