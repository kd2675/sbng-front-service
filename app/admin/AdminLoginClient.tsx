"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginClient() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setErrorMessage(payload.message ?? "로그인에 실패했습니다.");
        return;
      }

      router.refresh();
    } catch {
      setErrorMessage("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="rounded-xl border border-black/10 bg-[#f5f8f1] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
        placeholder="비밀번호 입력"
        type="password"
        autoComplete="current-password"
      />
      {errorMessage ? (
        <p className="text-sm font-semibold text-[#9d2626]">{errorMessage}</p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-full bg-[var(--agri-primary)] px-7 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "확인 중..." : "로그인"}
      </button>
    </form>
  );
}
