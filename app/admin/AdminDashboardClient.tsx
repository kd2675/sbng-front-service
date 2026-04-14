"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactSubmission } from "@/app/contactStore";

function formatDate(value: string): string {
  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboardClient({
  submissions,
}: {
  submissions: ContactSubmission[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const filteredSubmissions = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return submissions;
    }

    return submissions.filter((item) =>
      [item.name, item.phone, item.email, item.message].join(" ").toLowerCase().includes(normalized),
    );
  }, [query, submissions]);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-5 border-t border-[var(--line)] pt-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            Inquiry List
          </p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-foreground">
            접수 현황 {submissions.length}건
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-h-12 min-w-0 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2 sm:min-w-80"
            placeholder="고객명, 연락처, 이메일, 문의 내용 검색"
            type="search"
          />
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex min-h-12 items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground disabled:opacity-60"
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div className="rounded-[8px] border border-dashed border-[var(--line-strong)] bg-white px-6 py-8 text-sm leading-7 text-[var(--muted)]">
          접수된 문의가 없습니다.
        </div>
      ) : (
        <div className="grid gap-5">
          {filteredSubmissions.map((submission) => (
            <article
              key={submission.id}
              className="grid gap-5 rounded-[8px] border border-[var(--line)] bg-white px-5 py-5 md:grid-cols-[11rem_1fr]"
            >
              <div className="grid gap-3 text-sm leading-7 text-[var(--muted)]">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    접수 시각
                  </p>
                  <p className="mt-2 font-medium text-foreground">{formatDate(submission.createdAt)}</p>
                </div>
                <div>
                  <p>{submission.name}</p>
                  <p>{submission.phone}</p>
                  <p className="break-all">{submission.email}</p>
                </div>
              </div>
              <div className="rounded-[8px] bg-[var(--surface)] px-4 py-4 text-sm leading-8 text-[var(--muted)]">
                {submission.message}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
