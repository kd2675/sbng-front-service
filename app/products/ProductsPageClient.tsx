"use client";

import { companyInfo } from "../companyInfo";
import { contractProducts2026 } from "../companyProfile";
import LightboxImage from "../components/LightboxImage";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";
import { productCatalog } from "../productCatalog";

export default function ProductsPageClient() {
  return (
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main>
        <PageHero
          eyebrow="Product Catalogue"
          title="대표 제품 세 가지를 각각의 용도와 제형 중심으로 다시 배열했습니다"
          description="기존 제품 페이지는 정보는 많았지만 읽는 순서가 분산돼 있었습니다. 이번에는 제품별 핵심 요약, 실물 이미지, 보증 성분량, 사용 기준이 한 묶음으로 따라오도록 다시 설계했습니다."
          imageSrc="/image/heukboyak-front.jpeg"
          imageAlt="수북농업 흙보약 제품 전면 이미지"
          imageClassName="object-cover object-center"
          actions={[
            { href: "/contact", label: "제품 상담 문의" },
            { href: "/about", label: "회사 정보", kind: "secondary" },
          ]}
          facts={[
            { label: "Lineup", value: "흙손 · 흙보약 · 무등산" },
            { label: "Packaging", value: "20kg 기준 안내" },
            { label: "Reference", value: "포장 이미지와 안내 시트 동시 제공" },
            { label: "Consulting", value: companyInfo.telephoneDisplay },
          ]}
        />

        <section className="section-rule">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker">Product Structure</p>
                <h2 className="section-title max-w-[10ch] text-balance">
                  제품 탐색 순서를 실물 중심으로 바꿨습니다
                </h2>
                <p className="section-copy mt-6">
                  제품명만 나열하지 않고, 전면 이미지로 제품을 인지한 뒤 성상, 자재명, 포장
                  단위, 사용 기준, 보증 성분량을 자연스럽게 이어 읽도록 재구성했습니다.
                </p>
              </Reveal>

              <div className="grid gap-5">
                {contractProducts2026.map((item, index) => (
                  <Reveal key={item} delay={index * 0.05} className="border-t border-[var(--line)] pt-5">
                    <p className="text-sm leading-8 text-[var(--muted)]">{item}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {productCatalog.map((product, index) => (
          <section
            key={product.id}
            id={`product-${product.id}`}
            className={index % 2 === 0 ? "section-rule bg-[var(--surface)]" : "section-rule"}
          >
            <div className="section-wrap py-18 md:py-24">
              <div className="grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
                <div className="grid gap-5">
                  <Reveal>
                    <p className="section-kicker">{product.category}</p>
                    <h2 className="section-title max-w-[10ch] text-balance">{product.name}</h2>
                    <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                      {product.summary}
                    </p>
                  </Reveal>

                  <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
                    <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[8px]">
                      <LightboxImage
                        src={product.frontImage}
                        alt={`${product.name} 전면 이미지`}
                        fill
                        sizes="(min-width: 1024px) 36vw, 100vw"
                        className="object-cover"
                        hintClassName="bottom-4 left-4 right-auto"
                      />
                    </Reveal>
                    <div className="grid gap-4">
                      <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                        <LightboxImage
                          src={product.sheetImage}
                          alt={`${product.name} 안내 시트 이미지`}
                          fill
                          sizes="(min-width: 1024px) 24vw, 100vw"
                          className="object-cover"
                          hintClassName="bottom-4 left-4 right-auto"
                        />
                      </Reveal>
                      <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[8px]">
                        <LightboxImage
                          src={product.backImage}
                          alt={`${product.name} 후면 이미지`}
                          fill
                          sizes="(min-width: 1024px) 24vw, 100vw"
                          className="object-cover"
                          hintClassName="bottom-4 left-4 right-auto"
                        />
                      </Reveal>
                    </div>
                  </div>
                </div>

                <div className="grid gap-8">
                  <Reveal className="grid gap-5 border-t border-[var(--line)] pt-5 md:grid-cols-2">
                    {[
                      { label: "자재명", value: product.material },
                      { label: "성상", value: product.form },
                      { label: "포장단위", value: product.packUnit },
                      { label: "사용 기준", value: product.usage },
                    ].map((item) => (
                      <div key={`${product.id}-${item.label}`} className="border-t border-[var(--line)] pt-4">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                          {item.label}
                        </p>
                        <p className="mt-3 text-xl font-medium text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </Reveal>

                  <Reveal className="border-t border-[var(--line)] pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      보증 성분량
                    </p>
                    <p className="mt-3 font-display text-3xl leading-tight text-foreground">
                      {product.guarantee}
                    </p>
                  </Reveal>

                  <div className="grid gap-5">
                    {product.highlights.map((highlight, highlightIndex) => (
                      <Reveal
                        key={highlight}
                        delay={highlightIndex * 0.04}
                        className="border-t border-[var(--line)] pt-5"
                      >
                        <p className="text-sm leading-8 text-[var(--muted)]">{highlight}</p>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal className="border-t border-[var(--line)] pt-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      적용 포인트
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {product.cropTags.map((tag) => (
                        <span
                          key={`${product.id}-${tag}`}
                          className="inline-flex min-h-9 items-center justify-center rounded-[8px] border border-[var(--line)] px-3 py-2 text-sm text-[var(--muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="section-rule bg-[#101610] text-white">
          <div className="section-wrap py-18 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <p className="section-kicker text-white/52">Consulting</p>
                <h2 className="section-title max-w-[10ch] text-white">
                  실제 적용량과 상담은 현장 조건을 기준으로 이어집니다
                </h2>
                <p className="mt-6 max-w-[34rem] text-base leading-8 text-white/68">
                  작물 특성, 토양 상태, 투입 시기, 재배 방식에 따라 실제 적용량은 달라질 수
                  있습니다. 자세한 상담은 문의 페이지에서 남겨주세요.
                </p>
              </Reveal>

              <Reveal className="grid gap-5 border-t border-white/10 pt-5">
                <p className="text-sm leading-8 text-white/66">{companyInfo.legalName}</p>
                <p className="text-sm leading-8 text-white/66">{companyInfo.address}</p>
                <p className="text-sm leading-8 text-white/66">전화 {companyInfo.telephoneDisplay}</p>
                <p className="text-sm leading-8 text-white/66">이메일 {companyInfo.emailDisplay}</p>
                <a
                  href={companyInfo.telephoneHref}
                  className="inline-flex min-h-12 w-fit items-center justify-center rounded-[8px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101611] hover:bg-[var(--signal)]"
                >
                  전화 연결
                </a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
