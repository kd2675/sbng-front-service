import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BackButton from "../../components/BackButton";
import LightboxImage from "../../components/LightboxImage";
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
    <div className="min-h-screen bg-[#f4f6ef] text-[var(--agri-ink)]">
      <SiteNav />

      <main className="px-5 pb-18 pt-28 md:px-10 lg:px-20">
        <section className="mx-auto max-w-6xl rounded-[2rem] bg-[#112614] px-8 py-10 text-white shadow-[0_22px_54px_rgba(12,26,12,0.16)]">
          <BackButton
            fallbackHref="/history"
            className="inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-sm font-bold text-white/92 transition hover:bg-white/16"
          >
            ← 뒤로가기
          </BackButton>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary)]">
            자료 보관본
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-3xl leading-relaxed text-white/82">{entry.summary}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88">
              {entry.sourceLabel}
            </span>
            <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88">
              게시일 {entry.publishedAt}
            </span>
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                status.available
                  ? "bg-[#d5f5c6] text-[#173019]"
                  : "bg-[#fff0c4] text-[#4e3600]"
              }`}
            >
              {status.available ? `${sourceNoun} 확인 가능` : "보관본 우선 제공"}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-white/74">{status.reason}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <SourceLink
              href={entry.url}
              className="rounded-full bg-[var(--agri-primary)] px-6 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:-translate-y-0.5"
            >
              {sourceNoun} 보기
            </SourceLink>
            {snapshotExists ? (
              <SourceLink
                href={entry.snapshotHtml}
                className="rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/16"
              >
                보관 HTML 보기
              </SourceLink>
            ) : null}
            {captureExists ? (
              <SourceLink
                href={entry.captureImage}
                className="rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/16"
              >
                캡처 이미지 보기
              </SourceLink>
            ) : null}
          </div>
        </section>

        <section className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <article className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_18px_46px_rgba(12,26,12,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
              보관 요약
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-[var(--agri-ink)]">
              기사 핵심 정리
            </h2>
            <ul className="mt-7 space-y-4">
              {entry.excerptBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 rounded-2xl bg-[#f5f8f1] px-5 py-4 text-sm leading-relaxed text-[#556d54]"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--agri-primary-deep)]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[1.6rem] border border-[#dfe7d8] bg-[#f8fbf5] px-5 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b8169]">
                안내
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#536a52]">
                {sourceNoun} 상태는 페이지 접속 시점에 다시 확인합니다. {sourceNoun} 접속이 되지 않거나
                삭제 문구가 확인되면 이 보관본을 기준으로 계속 살펴보실 수 있습니다.
              </p>
            </div>
          </article>

          <article className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_18px_46px_rgba(12,26,12,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
              저장 자료
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold text-[var(--agri-ink)]">
              캡처와 보관 파일
            </h2>

            {captureExists ? (
              <div className="mt-6 overflow-hidden rounded-[1.6rem] border border-black/8 bg-[#eef3e8]">
                <div className="relative aspect-[4/3]">
                  <LightboxImage
                    alt={`${entry.sourceLabel} 기사 캡처 이미지`}
                    src={entry.captureImage}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-[1.6rem] border border-dashed border-black/12 bg-[#f7faf4] px-5 py-10 text-sm leading-relaxed text-[#566d55]">
                현재 저장된 캡처 이미지는 아직 준비되지 않았습니다.
              </div>
            )}

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#f5f8f1] px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b8169]">
                  보관 HTML
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#536a52]">
                  {snapshotExists
                    ? `스크랩한 ${sourceNoun} HTML 파일을 바로 열어보실 수 있습니다.`
                    : `${sourceNoun} HTML 보관 파일은 아직 저장되지 않았습니다.`}
                </p>
              </div>
              <div className="rounded-2xl bg-[#f5f8f1] px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b8169]">
                  캡처 이미지
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#536a52]">
                  {captureExists
                    ? `${sourceNoun} 화면을 로컬 이미지로 보관해 ${sourceNoun}가 사라져도 확인할 수 있습니다.`
                    : "캡처 이미지는 아직 저장되지 않았습니다."}
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="mx-auto mt-10 max-w-6xl">
          <Link
            href="/history"
            className="inline-flex rounded-full bg-[var(--agri-ink)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
          >
            연혁 페이지로 돌아가기
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
