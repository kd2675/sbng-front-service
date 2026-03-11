import type { Metadata } from "next";
import Image from "next/image";
import { companyInfo } from "../company-info";
import { productCatalog } from "../product-catalog";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

export const metadata: Metadata = {
  title: "제품 소개",
  description:
    "수북농업의 흙손, 흙보약, 무등산 제품 라인업과 적용 방향을 확인하세요.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#f4f6ef]">
      <SiteNav />

      <section className="relative overflow-hidden bg-[#112614] px-6 pb-20 pt-28 md:px-10 lg:px-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,240,83,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(93,140,84,0.22),transparent_36%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--agri-primary)]">
            Product Lineup
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
            홍보자료 기준으로 정리한
            <br className="hidden sm:block" /> 수북농업 대표 제품 3종
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg">
            흙손, 흙보약, 무등산은 모두 토양개량 및 작물생육용 제품군입니다.
            포장 실사와 안내 시트를 함께 배치해 브랜드 소개 사이트에서도 제품 신뢰도를
            빠르게 전달하도록 구성했습니다.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {productCatalog.map((product) => (
              <article
                key={product.id}
                className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                  {product.category}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-white">{product.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/74">{product.cardSummary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/86">
                    {product.form}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/86">
                    {product.packUnit}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/86">
                    {product.material}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 lg:px-20">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-[#dfe7d7] bg-white p-8 shadow-[0_24px_60px_rgba(12,26,12,0.08)] md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
              Selection Principle
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-[var(--agri-ink)] md:text-4xl">
              브랜드 소개 사이트에 맞는 제품 커뮤니케이션 구조
            </h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-[#496048]">
              대표 썸네일에는 포장 앞면 실사를, 상세 설명에는 안내 시트를, 신뢰 보강
              용도로는 포장 뒷면 이미지를 배치했습니다. 판매 페이지처럼 복잡하게 보이지
              않으면서도, 실제 제품 확인과 핵심 정보 전달이 동시에 되도록 설계했습니다.
            </p>
          </div>

          <aside className="rounded-[2rem] border border-[#dfe7d7] bg-[#edf5e7] p-8 shadow-[0_24px_60px_rgba(12,26,12,0.05)]">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
              Consultation
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">
              제품 상담 및 자료 문의
            </h3>
            <p className="mt-4 leading-relaxed text-[#496048]">
              작물 특성, 투입 시기, 토양 상태에 따라 실제 적용량은 달라질 수 있습니다.
              상세 상담은 본사로 문의하는 구성이 가장 자연스럽습니다.
            </p>
            <div className="mt-6 space-y-2 text-sm font-semibold text-[#264526]">
              <p>{companyInfo.legalName}</p>
              <p>{companyInfo.address}</p>
              <p>전화 {companyInfo.telephoneDisplay}</p>
              <p>팩스 {companyInfo.faxDisplay}</p>
            </div>
          </aside>
        </section>

        <section className="mt-16 space-y-16">
          {productCatalog.map((product, index) => {
            const reverse = index % 2 === 1;

            return (
              <article
                key={product.id}
                className="rounded-[2rem] border border-[#dce5d5] bg-white p-6 shadow-[0_26px_80px_rgba(12,26,12,0.08)] md:p-8 lg:p-10"
              >
                <div className="grid items-start gap-8 lg:grid-cols-2">
                  <div className={reverse ? "lg:order-2" : undefined}>
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${product.badgeClass}`}
                      >
                        {product.category}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#60765f]">
                        Series 0{index + 1}
                      </span>
                    </div>

                    <h2 className="font-display mt-5 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                      {product.name}
                    </h2>
                    <p className="mt-3 text-lg font-semibold text-[#315131]">
                      {product.displayName}
                    </p>
                    <p className="mt-5 max-w-2xl leading-relaxed text-[#4f644e]">
                      {product.summary}
                    </p>

                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[#f4f8f0] p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6a7f69]">
                          성상
                        </p>
                        <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">
                          {product.form}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#f4f8f0] p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6a7f69]">
                          자재명
                        </p>
                        <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">
                          {product.material}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#f4f8f0] p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6a7f69]">
                          포장단위
                        </p>
                        <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">
                          {product.packUnit}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-[#f4f8f0] p-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6a7f69]">
                          사용 기준
                        </p>
                        <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">
                          {product.usage}
                        </p>
                      </div>
                    </div>

                    <div className="mt-7 rounded-3xl border border-[#deead8] bg-[#f8fbf5] p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
                        보증 성분량
                      </p>
                      <p className="mt-3 text-xl font-bold leading-snug text-[var(--agri-ink)]">
                        {product.guarantee}
                      </p>
                      <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#4e664d]">
                        {product.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--agri-primary-deep)]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {product.cropTags.map((tag) => (
                        <span
                          key={`${product.id}-${tag}`}
                          className="rounded-full border border-[#cfe0c8] bg-white px-3 py-1.5 text-xs font-semibold text-[#4a6148]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`grid gap-4 md:grid-cols-[1.08fr_0.92fr] ${reverse ? "lg:order-1" : ""}`}>
                    <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[#dce4d5] bg-[#eef4ea]">
                      <Image
                        alt={`${product.name} 제품 앞면`}
                        src={product.frontImage}
                        fill
                        sizes="(min-width: 1280px) 26rem, (min-width: 768px) 46vw, 100vw"
                        className="object-cover"
                      />
                    </figure>
                    <div className="grid gap-4">
                      <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#dce4d5] bg-[#f7faf4]">
                        <Image
                          alt={`${product.name} 제품 안내 시트`}
                          src={product.sheetImage}
                          fill
                          sizes="(min-width: 1280px) 22rem, (min-width: 768px) 38vw, 100vw"
                          quality={82}
                          className="object-cover"
                        />
                      </figure>
                      <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#dce4d5] bg-[#f7faf4]">
                        <Image
                          alt={`${product.name} 제품 뒷면`}
                          src={product.backImage}
                          fill
                          sizes="(min-width: 1280px) 22rem, (min-width: 768px) 38vw, 100vw"
                          className="object-cover"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-16 rounded-[2rem] bg-[#112614] px-8 py-12 text-white md:px-10">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary)]">
            Brand Note
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">
            제품 이미지는 소개용, 세부 적용은 상담 중심으로
          </h2>
          <p className="mt-5 max-w-4xl leading-relaxed text-white/82">
            이 페이지는 온라인 판매가 아니라 브랜드 소개와 제품 이해를 위한 구성입니다.
            실제 시비량과 적용 시기는 토양 상태와 작물 조건에 따라 달라질 수 있으므로,
            현장 상담을 통해 최종 안내하는 흐름이 가장 적절합니다.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
