import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "../../components/BackButton";
import LightboxImage from "../../components/LightboxImage";
import PageHero from "../../components/PageHero";
import Reveal from "../../components/Reveal";
import SiteFooter from "../../components/SiteFooter";
import SiteNav from "../../components/SiteNav";
import SourceLink from "../../components/SourceLink";
import { articleArchiveBySlug, checkRemoteSourceStatus } from "../../articleArchive";

type SourcePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: SourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = articleArchiveBySlug.get(slug);

  if (!entry) {
    return {
      title: "자료 보관본",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${entry.sourceLabel} 보관본`,
    description: `${entry.sourceLabel} 기사 보관본과 기사 상태를 안내합니다.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

async function fileExists(publicPath: string): Promise<boolean> {
  const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));

  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export default async function SourceArchivePage({ params }: SourcePageProps) {
  const { slug } = await params;
  const entry = articleArchiveBySlug.get(slug);

  if (!entry) {
    notFound();
  }

  const [status, captureExists, snapshotExists] = await Promise.all([
    checkRemoteSourceStatus(entry),
    fileExists(entry.captureImage),
    fileExists(entry.snapshotHtml),
  ]);
  const sourceNoun =
    entry.sourceName.includes("신문") ||
    entry.sourceName.includes("주간인물") ||
    entry.sourceName.includes("기자협회")
      ? "기사"
      : "자료";

  return (
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main>
        <PageHero
          eyebrow="Archive Source"
          title={`${entry.sourceLabel} 보관본과 현재 상태를 함께 안내합니다`}
          description={entry.summary}
          imageSrc={captureExists ? entry.captureImage : "/image/history/history-kofic-2024-08-25.png"}
          imageAlt={`${entry.sourceLabel} 보관 이미지`}
          imageClassName="object-cover object-top"
          actions={[
            { href: entry.url, label: `${sourceNoun} 보기` },
            ...(snapshotExists
              ? [{ href: entry.snapshotHtml, label: "보관 HTML 보기", kind: "secondary" as const }]
              : []),
          ]}
          note={status.reason}
          facts={[
            { label: "Published", value: entry.publishedAt },
            { label: "Status", value: status.available ? `${sourceNoun} 확인 가능` : "보관본 우선 제공" },
            { label: "Capture", value: captureExists ? "저장됨" : "없음" },
            { label: "Archive HTML", value: snapshotExists ? "저장됨" : "없음" },
          ]}
        />

        <section className="section-wrap py-8">
          <BackButton
            fallbackHref="/history"
            className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
          >
            뒤로가기
          </BackButton>
        </section>

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr]">
              <Reveal>
                <p className="section-kicker">Archive Summary</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  핵심 요약과 저장 상태를 나란히 배치했습니다
                </h2>
                <p className="section-copy mt-6">
                  원문이 유지되는 경우에는 원문 우선, 접속이 어려운 경우에는 보관본 우선이라는
                  기준을 이 페이지에서 바로 확인할 수 있습니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {entry.excerptBullets.map((bullet, index) => (
                  <Reveal key={bullet} delay={index * 0.05} className="border-t border-[var(--line)] pt-5">
                    <p className="text-sm leading-8 text-[var(--muted)]">{bullet}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[var(--surface)]">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr]">
              <Reveal>
                <div className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
                  {captureExists ? (
                    <LightboxImage
                      src={entry.captureImage}
                      alt={`${entry.sourceLabel} 저장 캡처 이미지`}
                      fill
                      sizes="(min-width: 1024px) 52vw, 100vw"
                      className="object-cover"
                      hintClassName="bottom-4 left-4 right-auto"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-white px-6 text-sm leading-7 text-[var(--muted)]">
                      현재 저장된 캡처 이미지가 없습니다.
                    </div>
                  )}
                </div>
              </Reveal>

              <div className="grid gap-5">
                <Reveal className="border-t border-[var(--line)] pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    원문 상태
                  </p>
                  <p className="mt-3 text-lg font-medium text-foreground">
                    {status.available ? `${sourceNoun} 확인 가능` : "보관본 우선 제공"}
                  </p>
                  <p className="mt-3 text-sm leading-8 text-[var(--muted)]">{status.reason}</p>
                </Reveal>

                <Reveal delay={0.06} className="border-t border-[var(--line)] pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    저장 항목
                  </p>
                  <div className="mt-4 grid gap-3 text-sm leading-7 text-[var(--muted)]">
                    <p>캡처 이미지 {captureExists ? "저장됨" : "없음"}</p>
                    <p>보관 HTML {snapshotExists ? "저장됨" : "없음"}</p>
                  </div>
                </Reveal>

                <Reveal delay={0.12} className="flex flex-wrap gap-3 border-t border-[var(--line)] pt-5">
                  <SourceLink
                    href={entry.url}
                    className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
                  >
                    {sourceNoun} 보기
                  </SourceLink>
                  {snapshotExists ? (
                    <SourceLink
                      href={entry.snapshotHtml}
                      className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] px-4 py-3 text-sm font-medium text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-foreground"
                    >
                      보관 HTML 열기
                    </SourceLink>
                  ) : null}
                  {captureExists ? (
                    <SourceLink
                      href={entry.captureImage}
                      className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-[var(--line)] px-4 py-3 text-sm font-medium text-[var(--muted)] hover:border-[var(--line-strong)] hover:text-foreground"
                    >
                      캡처 열기
                    </SourceLink>
                  ) : null}
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[#101610] text-white">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
              <Reveal>
                <p className="section-kicker text-white/52">Continue</p>
                <h2 className="section-title max-w-[10ch] text-white">
                  보관 자료에서 다시 연혁 흐름으로 돌아갈 수 있습니다
                </h2>
              </Reveal>

              <Reveal className="grid gap-4 border-t border-white/10 pt-5">
                <p className="text-sm leading-8 text-white/62">
                  자료 보관본은 연혁과 회사 정보 페이지에서 다시 이어집니다. 원문 상태가 바뀌더라도
                  확인 흐름이 끊기지 않도록 내부 보관 링크를 남겨 두었습니다.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/history"
                    className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101611] hover:bg-[var(--signal)]"
                  >
                    연혁으로 돌아가기
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
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
