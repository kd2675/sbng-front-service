"use client";

import Image from "next/image";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { companyInfo } from "../companyInfo";
import { productCatalog } from "../productCatalog";
import SiteFooter from "../components/SiteFooter";
import SiteNav from "../components/SiteNav";

export default function ProductsPageClient() {
  const reduceMotion = useReducedMotion();
  const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 };
  const revealAnimate = { opacity: 1, y: 0 };

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
      <div className="min-h-screen bg-[#f4f6ef]">
        <SiteNav />

        <section className="relative overflow-hidden bg-[#112614] px-6 pb-20 pt-28 md:px-10 lg:px-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,240,83,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(93,140,84,0.22),transparent_36%)]" />
          <div className="relative mx-auto max-w-7xl">
            <motion.p
              initial={revealInitial}
              animate={revealAnimate}
              transition={{ delay: 0.04 }}
              className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--agri-primary)]"
            >
              제품 안내
            </motion.p>
            <motion.h1
              initial={revealInitial}
              animate={revealAnimate}
              transition={{ delay: 0.1 }}
              className="font-display mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl"
            >
              흙손, 흙보약, 무등산
              <br className="hidden sm:block" /> 제품을 소개합니다
            </motion.h1>
            <motion.p
              initial={revealInitial}
              animate={revealAnimate}
              transition={{ delay: 0.16 }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg"
            >
              흙손, 흙보약, 무등산은 수북농업을 대표하는 제품입니다. 포장 이미지와 안내
              자료를 함께 살펴보며 제품 특징과 사용 정보를 확인해 보세요.
            </motion.p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {productCatalog.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={revealInitial}
                  whileInView={revealAnimate}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: Math.min(index * 0.08, 0.22) }}
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  className="rounded-3xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                    {product.category}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">{product.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/74">{product.cardSummary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {[product.form, product.packUnit, product.material].map((token) => (
                      <motion.span
                        key={`${product.id}-${token}`}
                        initial={revealInitial}
                        whileInView={revealAnimate}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ delay: 0.14 }}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/86"
                      >
                        {token}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <main className="mx-auto w-full max-w-[1440px] px-6 py-16 md:px-10 lg:px-20">
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.div
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-[2rem] border border-[#dfe7d7] bg-white p-8 shadow-[0_24px_60px_rgba(12,26,12,0.08)] md:p-10"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
                제품 자료 안내
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold text-[var(--agri-ink)] md:text-4xl">
                포장 이미지와 안내 자료를 함께 소개합니다
              </h2>
              <p className="mt-5 max-w-3xl leading-relaxed text-[#496048]">
                제품 앞면, 안내 시트, 포장 뒷면을 함께 보시며 주요 성분과 사용 기준,
                포장 정보를 한눈에 살펴보실 수 있습니다.
              </p>
            </motion.div>

            <motion.aside
              initial={revealInitial}
              whileInView={revealAnimate}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.08 }}
              className="rounded-[2rem] border border-[#dfe7d7] bg-[#edf5e7] p-8 shadow-[0_24px_60px_rgba(12,26,12,0.05)]"
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
                문의 안내
              </p>
              <h3 className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">
                제품 상담 및 자료 문의
              </h3>
              <p className="mt-4 leading-relaxed text-[#496048]">
                작물 특성, 투입 시기, 토양 상태에 따라 실제 적용량은 달라질 수 있습니다.
                자세한 상담은 본사로 문의해 주세요.
              </p>
              <div className="mt-6 space-y-2 text-sm font-semibold text-[#264526]">
                <p>{companyInfo.legalName}</p>
                <p>{companyInfo.address}</p>
                <p>전화 {companyInfo.telephoneDisplay}</p>
                <p>팩스 {companyInfo.faxDisplay}</p>
                <p>이메일 {companyInfo.emailDisplay}</p>
              </div>
            </motion.aside>
          </section>

          <section className="mt-16 space-y-16">
            {productCatalog.map((product, index) => {
              const reverse = index % 2 === 1;

              return (
                <motion.article
                  key={product.id}
                  id={`product-${product.id}`}
                  initial={revealInitial}
                  whileInView={revealAnimate}
                  viewport={{ once: true, amount: 0.16 }}
                  transition={{ delay: Math.min(index * 0.06, 0.18) }}
                  className="scroll-mt-32 rounded-[2rem] border border-[#dce5d5] bg-white p-6 shadow-[0_26px_80px_rgba(12,26,12,0.08)] md:p-8 lg:p-10"
                >
                  <div className="grid items-start gap-8 lg:grid-cols-2">
                    <motion.div
                      initial={revealInitial}
                      whileInView={revealAnimate}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: 0.06 }}
                      className={reverse ? "lg:order-2" : undefined}
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <motion.span
                          initial={revealInitial}
                          whileInView={revealAnimate}
                          viewport={{ once: true, amount: 0.45 }}
                          className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] ${product.badgeClass}`}
                        >
                          {product.category}
                        </motion.span>
                        <motion.span
                          initial={revealInitial}
                          whileInView={revealAnimate}
                          viewport={{ once: true, amount: 0.45 }}
                          transition={{ delay: 0.05 }}
                          className="text-xs font-bold uppercase tracking-[0.18em] text-[#60765f]"
                        >
                          제품 0{index + 1}
                        </motion.span>
                      </div>

                      <motion.h2
                        initial={revealInitial}
                        whileInView={revealAnimate}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ delay: 0.08 }}
                        className="font-display mt-5 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl"
                      >
                        {product.name}
                      </motion.h2>
                      <motion.p
                        initial={revealInitial}
                        whileInView={revealAnimate}
                        viewport={{ once: true, amount: 0.35 }}
                        transition={{ delay: 0.12 }}
                        className="mt-3 text-lg font-semibold text-[#315131]"
                      >
                        {product.displayName}
                      </motion.p>
                      <motion.p
                        initial={revealInitial}
                        whileInView={revealAnimate}
                        viewport={{ once: true, amount: 0.28 }}
                        transition={{ delay: 0.16 }}
                        className="mt-5 max-w-2xl leading-relaxed text-[#4f644e]"
                      >
                        {product.summary}
                      </motion.p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {[
                          { label: "성상", value: product.form },
                          { label: "자재명", value: product.material },
                          { label: "포장단위", value: product.packUnit },
                          { label: "사용 기준", value: product.usage },
                        ].map((item, cardIndex) => (
                          <motion.div
                            key={`${product.id}-${item.label}`}
                            initial={revealInitial}
                            whileInView={revealAnimate}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: Math.min(cardIndex * 0.05, 0.15) }}
                            whileHover={reduceMotion ? undefined : { y: -4 }}
                            className="rounded-2xl bg-[#f4f8f0] p-4"
                          >
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6a7f69]">
                              {item.label}
                            </p>
                            <p className="mt-2 text-lg font-bold text-[var(--agri-ink)]">
                              {item.value}
                            </p>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={revealInitial}
                        whileInView={revealAnimate}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ delay: 0.16 }}
                        className="mt-7 rounded-3xl border border-[#deead8] bg-[#f8fbf5] p-6"
                      >
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
                          보증 성분량
                        </p>
                        <p className="mt-3 text-xl font-bold leading-snug text-[var(--agri-ink)]">
                          {product.guarantee}
                        </p>
                        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#4e664d]">
                          {product.highlights.map((highlight, highlightIndex) => (
                            <motion.li
                              key={highlight}
                              initial={revealInitial}
                              whileInView={revealAnimate}
                              viewport={{ once: true, amount: 0.45 }}
                              transition={{ delay: Math.min(highlightIndex * 0.05, 0.15) }}
                              className="flex gap-3"
                            >
                              <span className="mt-1.5 h-2 w-2 rounded-full bg-[var(--agri-primary-deep)]" />
                              <span>{highlight}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {product.cropTags.map((tag, tagIndex) => (
                          <motion.span
                            key={`${product.id}-${tag}`}
                            initial={revealInitial}
                            whileInView={revealAnimate}
                            viewport={{ once: true, amount: 0.45 }}
                            transition={{ delay: Math.min(tagIndex * 0.04, 0.12) }}
                            className="rounded-full border border-[#cfe0c8] bg-white px-3 py-1.5 text-xs font-semibold text-[#4a6148]"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={revealInitial}
                      whileInView={revealAnimate}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: 0.1 }}
                      className={`grid gap-4 md:grid-cols-[1.08fr_0.92fr] ${reverse ? "lg:order-1" : ""}`}
                    >
                      <motion.figure
                        whileHover={reduceMotion ? undefined : { y: -6 }}
                        className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-[#dce4d5] bg-[#eef4ea]"
                      >
                        <Image
                          alt={`${product.name} 제품 앞면`}
                          src={product.frontImage}
                          fill
                          sizes="(min-width: 1280px) 26rem, (min-width: 768px) 46vw, 100vw"
                          className="object-cover"
                        />
                      </motion.figure>
                      <div className="grid gap-4">
                        <motion.figure
                          whileHover={reduceMotion ? undefined : { y: -5 }}
                          className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#dce4d5] bg-[#f7faf4]"
                        >
                          <Image
                            alt={`${product.name} 제품 안내 시트`}
                            src={product.sheetImage}
                            fill
                            sizes="(min-width: 1280px) 22rem, (min-width: 768px) 38vw, 100vw"
                            quality={82}
                            className="object-cover"
                          />
                        </motion.figure>
                        <motion.figure
                          whileHover={reduceMotion ? undefined : { y: -5 }}
                          className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#dce4d5] bg-[#f7faf4]"
                        >
                          <Image
                            alt={`${product.name} 제품 뒷면`}
                            src={product.backImage}
                            fill
                            sizes="(min-width: 1280px) 22rem, (min-width: 768px) 38vw, 100vw"
                            className="object-cover"
                          />
                        </motion.figure>
                      </div>
                    </motion.div>
                  </div>
                </motion.article>
              );
            })}
          </section>

          <motion.section
            initial={revealInitial}
            whileInView={revealAnimate}
            viewport={{ once: true, amount: 0.25 }}
            className="mt-16 rounded-[2rem] bg-[#112614] px-8 py-12 text-white md:px-10"
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary)]">
              안내 기준
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold md:text-4xl">
              제품 상담이 필요하시면 본사로 문의해 주세요
            </h2>
            <p className="mt-5 max-w-4xl leading-relaxed text-white/82">
              실제 시비량과 적용 시기는 토양 상태와 작물 조건에 따라 달라질 수 있습니다.
              제품 선택과 적용 상담은 본사 연락처를 통해 안내해 드립니다.
            </p>
          </motion.section>
        </main>

        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
