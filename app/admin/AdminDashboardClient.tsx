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
      [item.name, item.phone, item.email, item.message]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
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
      <div className="flex flex-col gap-4 rounded-[1.75rem] bg-white p-6 shadow-[0_18px_40px_rgba(12,26,12,0.06)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
            Inquiry List
          </p>
          <h2 className="mt-2 text-3xl font-bold text-[var(--agri-ink)]">
            접수 현황 {submissions.length}건
          </h2>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="min-w-0 rounded-xl border border-black/10 bg-[#f5f8f1] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2 sm:min-w-72"
            placeholder="고객명, 연락처, 이메일, 문의 내용 검색"
            type="search"
          />
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="rounded-full border border-black/12 px-5 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4 disabled:opacity-60"
          >
            {isLoggingOut ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSubmissions.length === 0 ? (
          <div className="rounded-[1.75rem] border border-black/8 bg-white px-6 py-8 text-[#5d725c]">
            접수된 문의가 없습니다.
          </div>
        ) : (
          filteredSubmissions.map((submission) => (
            <article
              key={submission.id}
              className="rounded-[1.75rem] border border-black/8 bg-white px-6 py-6 shadow-[0_14px_34px_rgba(12,26,12,0.05)]"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#6c806a]">
                    접수 시각
                  </p>
                  <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">
                    {formatDate(submission.createdAt)}
                  </p>
                </div>
                <div className="grid gap-1 text-sm text-[#4f654f] md:text-right">
                  <p>{submission.name}</p>
                  <p>{submission.phone}</p>
                  <p className="break-all">{submission.email}</p>
                </div>
              </div>
              <div className="mt-5 rounded-2xl bg-[#f5f8f1] px-5 py-4 text-sm leading-relaxed text-[#4f654f]">
                {submission.message}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
