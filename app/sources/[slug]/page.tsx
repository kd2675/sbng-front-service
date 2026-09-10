import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  articleArchiveBySlug,
  checkRemoteSourceStatus,
} from "../../articleArchive";
import LightboxImage from "../../components/LightboxImage";
import PageHero from "../../components/PageHero";
import SourceLink from "../../components/SourceLink";
import { buildNoIndexMetadata } from "../../siteConfig";

type SourcePageProps = { params: Promise<{ slug: string }> };
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: SourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = articleArchiveBySlug.get(slug);
  return buildNoIndexMetadata({
    title: entry ? entry.sourceLabel + " 보관본" : "자료 보관본",
    description:
      "수북농업 관련 기사와 공개 자료의 원문 링크 및 보관 자료를 제공합니다.",
    path: "/sources/" + slug,
  });
}

async function fileExists(publicPath: string) {
  try {
    await fs.access(
      path.join(process.cwd(), "public", publicPath.replace(/^\//, "")),
    );
    return true;
  } catch {
    return false;
  }
}

export default async function SourceArchivePage({ params }: SourcePageProps) {
  const { slug } = await params;
  const entry = articleArchiveBySlug.get(slug);
  if (!entry) notFound();
  const [status, captureExists, snapshotExists] = await Promise.all([
    checkRemoteSourceStatus(entry),
    fileExists(entry.captureImage),
    fileExists(entry.snapshotHtml),
  ]);
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="business-page archive-page"
    >
      <PageHero
        label="자료 보관본"
        title={entry.title}
        description={entry.summary}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="badge">{entry.sourceLabel}</span>
          <span className="badge">게시일 {entry.publishedAt}</span>
        </div>
      </PageHero>
      <div className="site-container section-space">
        <Link href="/about#company-sources" className="text-link mb-6">
          ← 자료 목록으로 돌아가기
        </Link>
        <div className="grid items-start gap-7 lg:grid-cols-2">
          <article className="panel">
            <span className="eyebrow">보관 요약</span>
            <h2 className="mt-4 text-2xl font-bold">자료의 주요 내용</h2>
            <ul className="muted mt-6 list-disc space-y-4 pl-5 text-sm leading-8">
              {entry.excerptBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="notice mt-7">
              <p className="font-semibold">
                {status.available
                  ? "원문 서버 응답 확인"
                  : "보관 자료를 먼저 확인해 주세요"}
              </p>
              <p className="mt-2 text-xs leading-6">{status.reason}</p>
              <p className="mt-2 text-xs leading-6">
                원문 상태는 접속 시 확인합니다. 보관 자료는 저장 당시의 내용이며
                원문의 이후 수정 사항은 포함하지 않을 수 있습니다.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <SourceLink href={entry.url} className="btn btn-primary">
                원문 열기 ↗
              </SourceLink>
              {snapshotExists && (
                <a
                  href={entry.snapshotHtml}
                  download
                  className="btn btn-secondary"
                >
                  보관 파일 다운로드 ↓
                </a>
              )}
            </div>
          </article>
          <figure className="panel">
            <h2 className="text-2xl font-bold">저장된 자료 화면</h2>
            {captureExists ? (
              <>
                <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg border border-[var(--line)] bg-[#f1f4eb]">
                  <LightboxImage
                    src={entry.captureImage}
                    alt={entry.sourceLabel + " 자료 화면"}
                    fill
                    sizes="(min-width: 1280px) 520px, (min-width: 1024px) 43vw, 90vw"
                    className="object-contain p-2"
                  />
                </div>
                <figcaption className="muted mt-4 text-sm leading-7">
                  이미지를 선택하면 전체 화면으로 확인할 수 있습니다.
                </figcaption>
                <a
                  href={entry.captureImage}
                  download
                  className="text-link mt-3"
                >
                  캡처 이미지 다운로드 ↓
                </a>
              </>
            ) : (
              <p className="notice mt-6">
                저장된 이미지가 없습니다. 원문 링크 또는 보관 파일을 확인해
                주세요.
              </p>
            )}
          </figure>
        </div>
      </div>
    </main>
  );
}
