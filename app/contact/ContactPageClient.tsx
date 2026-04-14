"use client";

import { useState } from "react";
import Image from "next/image";
import { companyInfo } from "../companyInfo";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (!response.ok || !payload.ok) {
        setErrorMessage(payload.message ?? "문의 저장 중 오류가 발생했습니다.");
        return;
      }

      setSuccessMessage("문의가 저장되었습니다. 확인 후 순차적으로 연락드리겠습니다.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch {
      setErrorMessage("문의 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--agri-paper)]">
      <SiteNav />

      <main className="px-5 pb-24 pt-20 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            문의 안내
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-6xl">
            수북농업 문의
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-[#506350]">
            제품 상담, 회사 문의, 자료 요청이 필요하시면 편한 방법으로 연락해 주세요.
            남겨주신 내용은 확인 후 순차적으로 안내해 드립니다.
          </p>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-7 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[2rem] border border-black/7 bg-white p-8 shadow-[0_18px_52px_rgba(12,26,12,0.06)]">
            <h2 className="text-2xl font-bold text-[var(--agri-ink)]">상담 요청 남기기</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#60735f]">
              재배 작물, 토양 상태, 필요한 제품 자료를 남겨주시면 확인 후 연락드리겠습니다.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <input
                value={formData.name}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, name: event.target.value }))
                }
                className="rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="성함 또는 농가명"
                type="text"
              />
              <input
                value={formData.phone}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, phone: event.target.value }))
                }
                className="rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="연락처"
                type="tel"
              />
              <input
                value={formData.email}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, email: event.target.value }))
                }
                className="rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="이메일"
                type="email"
              />
              <textarea
                value={formData.message}
                onChange={(event) =>
                  setFormData((current) => ({ ...current, message: event.target.value }))
                }
                className="min-h-40 rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="작물, 토양 상태, 필요한 제품 자료나 상담 내용을 남겨주세요."
              />
              {errorMessage ? (
                <p className="text-sm font-semibold text-[#9d2626]">{errorMessage}</p>
              ) : null}
              {successMessage ? (
                <p className="text-sm font-semibold text-[#2d6b2f]">{successMessage}</p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-fit rounded-full bg-[var(--agri-primary)] px-7 py-3 font-bold text-[var(--agri-ink)] transition hover:bg-[#64e93f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "접수 중..." : "문의 보내기"}
              </button>
            </form>
          </div>

          <div className="grid gap-7">
            <aside className="rounded-[2rem] border border-black/7 bg-white p-8 shadow-[0_18px_52px_rgba(12,26,12,0.06)]">
              <h3 className="text-xl font-bold text-[var(--agri-ink)]">본사 안내</h3>
              <div className="mt-5 space-y-4 text-[#506350]">
                <p>{companyInfo.legalName}</p>
                <p>{companyInfo.address}</p>
                <p>
                  전화{" "}
                  <a href={companyInfo.telephoneHref} className="font-semibold text-[var(--agri-ink)]">
                    {companyInfo.telephoneDisplay}
                  </a>
                </p>
                <p>팩스 {companyInfo.faxDisplay}</p>
                <p>
                  휴대전화{" "}
                  <a href={companyInfo.mobileHref} className="font-semibold text-[var(--agri-ink)]">
                    {companyInfo.mobileDisplay}
                  </a>
                </p>
                <p>
                  이메일{" "}
                  <a href={companyInfo.emailHref} className="font-semibold text-[var(--agri-ink)] break-all">
                    {companyInfo.emailDisplay}
                  </a>
                </p>
              </div>
              <p className="mt-6 rounded-2xl bg-[var(--agri-paper)] p-4 text-sm text-[#506350]">
                상담 가능 시간: {companyInfo.businessHours}
              </p>
            </aside>

            <article className="overflow-hidden rounded-[2rem] border border-black/7 bg-white shadow-[0_18px_52px_rgba(12,26,12,0.06)]">
              <div className="relative aspect-[4/3] bg-[#eef3ea]">
                <Image
                  alt="수북농업 명함 이미지"
                  src="/image/ceo-card.png"
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="px-6 py-6">
                <h3 className="text-xl font-bold text-[var(--agri-ink)]">회사 연락처</h3>
                <p className="mt-3 leading-relaxed text-[#536652]">
                  주소와 전화, 팩스, 휴대전화, 이메일을 한눈에 안내합니다.
                </p>
                <a
                  href="/admin"
                  className="mt-5 inline-flex rounded-full border border-black/12 px-4 py-2 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                >
                  관리자 페이지 열기
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
