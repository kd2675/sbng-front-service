"use client";

import { useState } from "react";
import Link from "next/link";
import { companyInfo } from "../companyInfo";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
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
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main>
        <PageHero
          eyebrow="Contact"
          title="제품 상담과 회사 문의를 같은 흐름 안에서 접수합니다"
          description="문의 페이지는 연락처 나열과 입력 폼이 따로 노는 대신, 회사 정보 확인과 상담 접수를 한 번에 끝낼 수 있게 다시 정리했습니다."
          imageSrc="/image/ceo-card.png"
          imageAlt="수북농업 연락처 카드 이미지"
          imageClassName="object-cover object-center"
          actions={[
            { href: companyInfo.telephoneHref, label: "전화 연결" },
            { href: "/products", label: "제품 보기", kind: "secondary" },
          ]}
          facts={[
            { label: "Phone", value: companyInfo.telephoneDisplay },
            { label: "Mobile", value: companyInfo.mobileDisplay },
            { label: "Email", value: companyInfo.emailDisplay },
            { label: "Hours", value: companyInfo.businessHours },
          ]}
        />

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr]">
              <Reveal>
                <p className="section-kicker">Direct Contact</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  먼저 확인할 연락처와 위치를 앞에 배치했습니다
                </h2>
                <div className="mt-8 grid gap-5">
                  {[
                    { label: "대표 전화", value: companyInfo.telephoneDisplay, href: companyInfo.telephoneHref },
                    { label: "휴대전화", value: companyInfo.mobileDisplay, href: companyInfo.mobileHref },
                    { label: "이메일", value: companyInfo.emailDisplay, href: companyInfo.emailHref },
                    { label: "사업장", value: companyInfo.address },
                  ].map((item) => (
                    <div key={item.label} className="border-t border-[var(--line)] pt-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                        {item.label}
                      </p>
                      {item.href ? (
                        <Link
                          href={item.href}
                          prefetch={false}
                          className="mt-3 inline-flex text-lg font-medium text-foreground underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-foreground"
                        >
                          {item.value}
                        </Link>
                      ) : (
                        <p className="mt-3 text-lg font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="grid gap-5">
                <div className="border-t border-[var(--line)] pt-5">
                  <p className="section-kicker">Inquiry Form</p>
                  <h3 className="mt-4 font-display text-4xl leading-tight text-foreground">
                    상담 요청 남기기
                  </h3>
                  <p className="mt-4 max-w-[38rem] text-sm leading-8 text-[var(--muted)]">
                    작물, 토양 상태, 사용 시기, 필요한 제품 자료를 남겨주시면 확인 후
                    순차적으로 연락드리겠습니다.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, name: event.target.value }))
                    }
                    className="min-h-12 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
                    placeholder="성함 또는 농가명"
                    type="text"
                  />
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, phone: event.target.value }))
                      }
                      className="min-h-12 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
                      placeholder="연락처"
                      type="tel"
                    />
                    <input
                      name="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData((current) => ({ ...current, email: event.target.value }))
                      }
                      className="min-h-12 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
                      placeholder="이메일"
                      type="email"
                    />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={(event) =>
                      setFormData((current) => ({ ...current, message: event.target.value }))
                    }
                    className="min-h-48 rounded-[8px] border border-[var(--line)] bg-white px-4 py-3 text-sm leading-7 outline-none ring-[var(--accent)] focus:ring-2"
                    placeholder="작물, 토양 상태, 필요 자료, 상담 내용을 남겨주세요."
                  />

                  {errorMessage ? <p className="text-sm leading-7 text-[#a52f2f]">{errorMessage}</p> : null}
                  {successMessage ? (
                    <p className="text-sm leading-7 text-[#2f6d36]">{successMessage}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex min-h-12 w-fit items-center justify-center rounded-[8px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101611] hover:bg-[var(--signal)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "접수 중..." : "문의 보내기"}
                  </button>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[var(--surface)]">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker">Visit & Hours</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  운영 시간과 방문 전 확인 정보를 분리해 뒀습니다
                </h2>
                <div className="mt-6 grid gap-4 text-sm leading-8 text-[var(--muted)]">
                  <p>운영 시간 {companyInfo.businessHours}</p>
                  <p>팩스 {companyInfo.faxDisplay}</p>
                  <p>사업장 주소 {companyInfo.address}</p>
                </div>
              </Reveal>

              <Reveal className="relative aspect-[16/10] overflow-hidden rounded-[8px]">
                <LightboxImage
                  src="/image/company/subuk-facility-2015-side.jpg"
                  alt="수북농업 생산 설비 이미지"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                  hintClassName="bottom-4 left-4 right-auto"
                />
              </Reveal>
            </div>
          </div>
        </section>

        <section className="section-rule bg-[#101610] text-white">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <p className="section-kicker text-white/52">Reference</p>
                <h2 className="section-title max-w-[10ch] text-white">
                  문의 전에 제품과 회사 자료도 바로 연결해 두었습니다
                </h2>
              </Reveal>

              <div className="grid gap-5">
                {[
                  {
                    href: "/products",
                    title: "제품 소개",
                    detail: "흙손, 흙보약, 무등산의 포장 이미지와 안내 시트를 바로 확인할 수 있습니다.",
                  },
                  {
                    href: "/about",
                    title: "회사 정보",
                    detail: "사업장 정보와 공개 사업자 정보를 함께 확인할 수 있습니다.",
                  },
                  {
                    href: "/company-brochure.hwp",
                    title: "회사 소개서",
                    detail: "비치된 회사 소개서 파일을 바로 내려받을 수 있습니다.",
                  },
                ].map((item, index) => (
                  <Reveal
                    key={item.href}
                    delay={index * 0.06}
                    className="grid gap-3 border-t border-white/10 pt-5 md:grid-cols-[1fr_auto] md:items-center"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">{item.detail}</p>
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-white/14 px-4 py-3 text-sm font-medium text-white hover:border-[var(--accent)] hover:text-[var(--accent-soft)]"
                    >
                      열기
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
