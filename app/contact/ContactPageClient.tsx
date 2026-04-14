"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { companyInfo } from "../companyInfo";
import LightboxImage from "../components/LightboxImage";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";

export default function ContactPageClient() {
  const reduceMotion = useReducedMotion();
  const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const revealWhileInView = { opacity: 1, y: 0 };
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

      <section className="relative overflow-hidden bg-[#112614] px-5 pb-20 pt-28 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,240,83,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,232,154,0.12),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.p
            initial={revealInitial}
            animate={revealWhileInView}
            transition={{ delay: 0.04, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--agri-primary)]"
          >
            문의 안내
          </motion.p>
          <motion.h1
            initial={revealInitial}
            animate={revealWhileInView}
            transition={{ delay: 0.1, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
          >
            수북농업 상담과 문의를
            <br className="hidden sm:block" /> 접수합니다
          </motion.h1>
          <motion.p
            initial={revealInitial}
            animate={revealWhileInView}
            transition={{ delay: 0.16, duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg"
          >
            제품 상담, 회사 문의, 자료 요청이 필요하시면 편한 방법으로 연락해 주세요.
            남겨주신 내용은 확인 후 순차적으로 안내해 드립니다.
          </motion.p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "대표 전화",
                value: companyInfo.telephoneDisplay,
                description: "본사 대표 번호로 제품 상담과 회사 문의를 접수합니다.",
              },
              {
                title: "휴대전화",
                value: companyInfo.mobileDisplay,
                description: "현장 상담이 필요한 경우 휴대전화로도 연결하실 수 있습니다.",
              },
              {
                title: "이메일",
                value: companyInfo.emailDisplay,
                description: "자료 요청이나 상담 내용을 이메일로 남기실 수 있습니다.",
              },
            ].map((card, index) => (
              <motion.article
                key={card.title}
                initial={revealInitial}
                animate={revealWhileInView}
                transition={{
                  delay: 0.22 + index * 0.06,
                  duration: 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                  {card.title}
                </p>
                <h2 className="mt-3 break-all text-2xl font-bold text-white">{card.value}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/74">
                  {card.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <main className="px-5 pb-24 pt-14 md:px-10 lg:px-20">
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
                  <Link
                    href={companyInfo.telephoneHref}
                    prefetch={false}
                    className="font-semibold text-[var(--agri-ink)]"
                  >
                    {companyInfo.telephoneDisplay}
                  </Link>
                </p>
                <p>팩스 {companyInfo.faxDisplay}</p>
                <p>
                  휴대전화{" "}
                  <Link
                    href={companyInfo.mobileHref}
                    prefetch={false}
                    className="font-semibold text-[var(--agri-ink)]"
                  >
                    {companyInfo.mobileDisplay}
                  </Link>
                </p>
                <p>
                  이메일{" "}
                  <Link
                    href={companyInfo.emailHref}
                    prefetch={false}
                    className="font-semibold text-[var(--agri-ink)] break-all"
                  >
                    {companyInfo.emailDisplay}
                  </Link>
                </p>
              </div>
              <p className="mt-6 rounded-2xl bg-[var(--agri-paper)] p-4 text-sm text-[#506350]">
                상담 가능 시간: {companyInfo.businessHours}
              </p>
            </aside>

            <article className="overflow-hidden rounded-[2rem] border border-black/7 bg-white shadow-[0_18px_52px_rgba(12,26,12,0.06)]">
              <div className="relative aspect-[4/3] bg-[#eef3ea]">
                <LightboxImage
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
                <Link
                  href="/admin"
                  className="mt-5 inline-flex rounded-full border border-black/12 px-4 py-2 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                >
                  관리자 페이지 열기
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
