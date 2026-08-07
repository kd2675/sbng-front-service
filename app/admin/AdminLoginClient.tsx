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
    if (!password) {
      setErrorMessage("운영자 비밀번호를 입력해 주세요.");
      return;
    }
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

      const payload = await readLoginResponse(response);

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
      <label className="grid gap-2">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--agri-primary-deep)]">운영자 비밀번호</span>
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setErrorMessage("");
          }}
          className="min-h-12 rounded-xl border border-black/10 bg-[#f5f8f1] px-4 py-3 font-semibold outline-none ring-[var(--agri-primary)] focus:ring-2"
          placeholder="비밀번호 입력"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>
      {errorMessage ? (
        <p role="alert" aria-live="polite" className="rounded-xl bg-[#fff0ed] px-4 py-3 text-sm font-semibold text-[#9d2626]">{errorMessage}</p>
      ) : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-12 w-full rounded-xl bg-[var(--agri-primary)] px-7 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:brightness-95 disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? "확인 중..." : "로그인"}
      </button>
    </form>
  );
}

async function readLoginResponse(response: Response): Promise<{ ok: boolean; message?: string }> {
  try {
    const value = await response.json() as unknown;
    if (!value || typeof value !== "object") {
      return { ok: false };
    }
    const record = value as Record<string, unknown>;
    return {
      ok: record.ok === true,
      message: typeof record.message === "string" ? record.message : undefined,
    };
  } catch {
    return { ok: false, message: "로그인 응답을 확인하지 못했습니다." };
  }
}
