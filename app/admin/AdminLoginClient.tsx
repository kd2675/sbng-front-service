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
        className="min-h-12 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
        placeholder="비밀번호 입력"
        type="password"
        autoComplete="current-password"
      />
      {errorMessage ? <p className="text-sm leading-7 text-[#a52f2f]">{errorMessage}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-fit items-center justify-center rounded-[8px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101611] hover:bg-[var(--signal)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "확인 중..." : "로그인"}
      </button>
    </form>
  );
}
