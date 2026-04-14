import articleArchives from "./articleArchives.json";

type ArchiveClip = {
  width: number;
  height: number;
  padX: number;
  padY: number;
};

export type ArticleArchiveEntry = {
  slug: string;
  sourceName: string;
  sourceLabel: string;
  title: string;
  publishedAt: string;
  url: string;
  summary: string;
  excerptBullets: string[];
  captureImage: string;
  snapshotHtml: string;
  selectors: string[];
  clip: ArchiveClip;
  missingSignals?: string[];
};

const GENERIC_MISSING_SIGNALS = [
  "존재하지 않는 페이지",
  "페이지를 찾을 수 없습니다",
  "삭제된 기사",
  "삭제된 페이지",
  "찾을 수 없는 페이지",
  "404 not found",
  "not found",
] as const;

export const articleArchiveEntries = articleArchives as readonly ArticleArchiveEntry[];

export const articleArchiveBySlug = new Map(
  articleArchiveEntries.map((entry) => [entry.slug, entry]),
);

const articleArchiveByUrl = new Map(articleArchiveEntries.map((entry) => [entry.url, entry]));

export function getArchivedSourceHref(url: string): string {
  const entry = articleArchiveByUrl.get(url);
  return entry ? `/sources/${entry.slug}` : url;
}

export async function checkRemoteSourceStatus(entry: ArticleArchiveEntry): Promise<{
  available: boolean;
  reason: string;
}> {
  try {
    const response = await fetch(entry.url, {
      cache: "no-store",
      redirect: "follow",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      signal: AbortSignal.timeout(6000),
    });

    if (!response.ok) {
        return {
          available: false,
          reason: `응답 코드 ${response.status}`,
        };
    }

    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes("text/html")) {
      return {
        available: true,
        reason: "응답 확인",
      };
    }

    const html = await response.text();
    const haystack = html.toLowerCase();
    const missingSignals = [...GENERIC_MISSING_SIGNALS, ...(entry.missingSignals ?? [])];
    const matchedSignal = missingSignals.find((signal) => haystack.includes(signal.toLowerCase()));

    if (matchedSignal) {
      return {
        available: false,
        reason: `페이지에 '${matchedSignal}' 문구가 확인됐습니다.`,
      };
    }

    return {
      available: true,
      reason: "응답 확인",
    };
  } catch {
    return {
      available: false,
      reason: "확인 중 응답이 불안정해 보관본을 우선 제공합니다.",
    };
  }
}
