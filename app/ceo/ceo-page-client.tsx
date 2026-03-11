"use client";

import { motion, useReducedMotion } from "motion/react";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

const gallery = [
  {
    title: "Field Visit",
    description: "밀 재배 농가 현장 점검",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0jlHIwCgOAJCwJEsCcs4JN1lBIA81JiHP2fd5Gm-ho8Dk6WYylp7VEyXxn6BsMmCkUOQQUYHUeB6zf6t2LfcJ1UXMLOstBebhJHaZB2rje3TKb7-VbW_F0OZWbwHt53VJpEA4rATK9oyrkvZjpo73qxZMDtuiq4ucfRIMfL5VOWtF718tukxInOzk6o3k78MgG45dUqLqVUHE9eQVmaYp5QePcqH7UPFRK2E3oF6voNKgP43QU0_xuexpevVRuz5qbYXsg7uhNAk",
  },
  {
    title: "R&D Lab",
    description: "토양 샘플 분석 미팅",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApnvoHzOotnE1Kxwn1kv4CqhXtZeMGGJ28vUDZ7HdqUogXRKNqSdNpQLHnenJmzljUD1_7QqXInithxs0A1F5qsKT-nkHcUZGdDeLcA4WOerUNqr7u8nN7GCAk4LvFseofemYPcV9tA2J9eV_HEi8mxpHk7TXAQEJu6PCeotlVlWNhdyq2qs-cJ1uT2gpdkVEs22yfW3HFiLYqc7utmqYykr7eVbjkVDE0F_wjdOsyZQAig5fzpRNQznp9y-6Bl0ptMkSvU5zn6eM",
  },
  {
    title: "Global Impact",
    description: "농업 기술 포럼 키노트",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOxGXcZ2htCTUVJw4DSt02ra_4lOz6v-fMFDS_LcuQpQ89eYCxZDEextSyI4X9xDziqgYBApuGG4tilcQaNHvdGPgM4ubdk9hW44UfZLZp3JcJ8oWpiku-cz7ZEa2gdT4RUS-DfGFh4B-hXL5kUCI4bBFge7dtjpyt2m_DVymYDROE8EyjyQlxFgAPRHRRi08aBPQGZT8dW2LPUqwE9t8mLKRcTwMvw0SnoFGWnvW1t6DTMU9x5Jl6n2k-VcOcVaN1RxMj3L5BfsY",
  },
];

export default function CeoPageClient() {
  const reduceMotion = useReducedMotion();
  const revealInitial = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 };
  const revealWhileInView = { opacity: 1, y: 0 };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--agri-paper)] text-[var(--agri-ink)]">
      <SiteNav />

      <main>
        <section className="relative flex h-[84vh] items-end">
          <div className="absolute inset-0">
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
            <img
              alt="수북농업 CEO 과수원 현장"
              className="h-full w-full object-cover object-center"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8IWhyQjGiWdq3v9aNX8WMSfftZ0FykbqCoOXjDMS60RREBzh6P4vVtFTqtuUnlneVNF7dMFhf1_C2oAGXkzM04ow8PgwrdO6lN06b_6VgCrY-nz5aNZcvTSSL2iG4TjxTbMcCAzg4ESOlCdjeYc2mOZcNaqOdEvMFXfK1jqMYuW_WWeLT6VAazP-1yOcBaKIoiccqw7Cq39X8BEG6gP0BtC08NXukNb4YwyrqpOXEFj3aDwMtBzni7kpjSHJjjKjPfSXsGvwgKdU"
            />
          </div>

          <motion.div
            initial={revealInitial}
            animate={revealWhileInView}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 mx-auto w-full max-w-7xl px-5 pb-20 md:px-10 lg:px-20"
          >
            <span className="inline-flex rounded-full border border-[var(--agri-primary)]/40 bg-[var(--agri-primary)]/14 px-4 py-1 text-sm font-semibold text-[var(--agri-primary)]">
              Executive Leadership
            </span>
            <h1 className="font-display mt-6 text-5xl font-bold leading-[1.03] text-white md:text-7xl">
              신뢰를 경작하고
              <br />
              혁신을 수확합니다
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              수북농업 CEO는 농가 수익성과 토양 회복을 동시에 달성하는 실행 중심
              전략으로 현장 농업의 기준을 새롭게 만들고 있습니다.
            </p>
          </motion.div>
        </section>

        <section className="relative bg-white px-5 py-20 md:px-10 lg:px-20">
          <div className="absolute right-0 top-0 hidden h-80 w-80 -translate-y-1/4 translate-x-1/3 rounded-full bg-[var(--agri-primary)]/12 blur-3xl md:block" />
          <div className="mx-auto grid w-full max-w-6xl items-start gap-12 md:grid-cols-3">
            <motion.aside
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.35 }}
              className="md:sticky md:top-24"
            >
              <img
                alt="임시 CEO 남성 캐릭터 프로필"
                className="aspect-[3/4] w-full rounded-2xl object-cover shadow-[0_24px_64px_rgba(12,26,12,0.22)]"
                src="/image/ceo-placeholder-male.svg"
              />
              <div className="mt-5">
                <p className="font-display text-2xl font-bold">대표이사</p>
                <p className="mt-1 text-sm font-semibold text-[#516551]">
                  (유)수북농업 · 수북환경개발
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6a7d69]">
                  Chairman of Jeonnam Eco-Friendly Agro Industry Federation
                </p>
              </div>
            </motion.aside>

            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.25 }}
              className="md:col-span-2"
            >
              <h2 className="font-display inline-block border-b-2 border-[var(--agri-primary)] pb-2 text-4xl font-bold">
                CEO 메시지
              </h2>
              <p className="mt-7 text-2xl leading-relaxed text-[#3f523f]">
                &ldquo;지역 농업의 신뢰는 현장에 답하고 책임 있게 연결하는 데서
                시작된다고 생각합니다.&rdquo;
              </p>
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-[#4a5f49]">
                <p>
                  명함 기준으로 이 소개 페이지에서 확인되는 역할은 세 가지입니다.
                  전남친환경농산업연합회 회장, 수북농업 대표이사, 수북환경개발
                  대표이사입니다.
                </p>
                <p>
                  이는 단순한 직함 나열보다, 지역 농업 네트워크와 기업 운영을 동시에
                  맡고 있다는 의미로 읽히며 수북농업의 신뢰도와 실행 범위를 보여줍니다.
                </p>
                <p>
                  CEO 소개 페이지는 이 명함 정보에 맞춰 과장된 개인 서사보다 실제
                  직책, 회사 기반, 연락 가능성 중심으로 정리하는 편이 더 적절합니다.
                </p>
              </div>
              <p className="mt-8 text-xl font-bold text-[#1f351f]">감사합니다.</p>
              <p className="mt-1 text-lg text-[#385238]">(유)수북농업 대표이사</p>
            </motion.article>
          </div>
        </section>

        <section
          className="relative bg-cover bg-center bg-no-repeat px-5 py-24 md:px-10 lg:px-20"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGKqbL13qycgyQApJwBNaP9hO_xLI3lZZw3zaDiUJp74yqLEx3XNZ5cSgiCbcVG6TTwv5YPrgGXgZVx3VeapE92ahabXhYLxohyAB13jfxONFaX9NQytcpdmJfn64eTCaUkNMDIsi9kLjpA5_xWWIPK-dQfLi_kypplEdHD2KFFJ0UwGK8AZ-eOsm9ZpnBz7op7kFlHMg_yW8dkdKUNN3LFq1QjTlvRDvxwn8bh-c2WKxrqdEjHGVAKbf4nrPc64OIvcw61s1zTgk')",
          }}
        >
          <div className="absolute inset-0 bg-[#132210]/82" />
          <motion.div
            initial={revealInitial}
            whileInView={revealWhileInView}
            viewport={{ once: true, amount: 0.3 }}
            className="relative mx-auto max-w-5xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
              Core Belief
            </p>
            <h2 className="font-display mt-5 text-4xl leading-tight text-white md:text-6xl">
              우리는 지구를 물려받은 것이 아니라
              <br />
              다음 세대에게 잠시 빌려 쓰고 있습니다.
            </h2>
          </motion.div>
        </section>

        <section className="bg-[#eef3ea] px-5 py-20 md:px-10 lg:px-20">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-2">
            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl border border-black/8 bg-white p-8 shadow-[0_18px_46px_rgba(12,26,12,0.08)]"
            >
              <h3 className="font-display text-3xl font-bold text-[var(--agri-ink)]">
                명함 기준 소개
              </h3>
              <div className="mt-6 space-y-5 leading-relaxed text-[#4f634e]">
                <p>
                  이 페이지에서 근거로 삼은 자료는 `ceo-card.png` 명함 이미지입니다.
                  명함에는 전남친환경농산업연합회 회장, (유)수북농업·수북환경개발
                  대표이사라는 직함이 확인됩니다.
                </p>
                <p>
                  개인 이름이나 상세 경력은 명함에서 명확히 확인되지 않으므로, 이
                  소개 영역은 확인 가능한 직함과 사업 기반 정보만 중심으로 작성했습니다.
                </p>
              </div>
              <div className="mt-9 flex flex-wrap gap-8 border-t border-black/8 pt-8">
                <div>
                  <p className="text-4xl font-bold text-[var(--agri-primary-deep)]">3</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f725d]">
                    Verified Roles
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[var(--agri-primary-deep)]">1030</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f725d]">
                    Chuseong-ro
                  </p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-[var(--agri-primary-deep)]">061</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#5f725d]">
                    Main Contact Code
                  </p>
                </div>
              </div>
            </motion.article>

            <motion.article
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.2 }}
              className="rounded-3xl border border-black/8 bg-white p-8 shadow-[0_18px_46px_rgba(12,26,12,0.08)]"
            >
              <h3 className="font-display text-3xl font-bold text-[var(--agri-ink)]">
                연락 및 운영 정보
              </h3>
              <div className="mt-7 space-y-6">
                <div className="border-l-2 border-black/10 pl-5">
                  <h4 className="text-lg font-bold text-[var(--agri-ink)]">주소</h4>
                  <p className="mt-1 leading-relaxed text-[#4f634e]">
                    전남 담양군 담양읍 추성로 1030
                  </p>
                </div>
                <div className="border-l-2 border-black/10 pl-5">
                  <h4 className="text-lg font-bold text-[var(--agri-ink)]">대표 연락처</h4>
                  <p className="mt-1 leading-relaxed text-[#4f634e]">
                    TEL. (061) 383-6186 / FAX. (061) 383-6187
                  </p>
                </div>
                <div className="border-l-2 border-black/10 pl-5">
                  <h4 className="text-lg font-bold text-[var(--agri-ink)]">직통 및 이메일</h4>
                  <p className="mt-1 leading-relaxed text-[#4f634e]">
                    H.P 010-6408-6186 / kgy2675@hanmail.net
                  </p>
                </div>
                <div className="border-l-2 border-black/10 pl-5">
                  <h4 className="text-lg font-bold text-[var(--agri-ink)]">운영 성격</h4>
                  <p className="mt-1 leading-relaxed text-[#4f634e]">
                    지역 기반 기업 운영과 친환경 농산업 네트워크 역할을 함께 수행하는
                    구조로 읽힙니다.
                  </p>
                </div>
              </div>
            </motion.article>
          </div>
        </section>

        <section className="bg-[var(--agri-paper)] px-5 py-20 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={revealInitial}
              whileInView={revealWhileInView}
              viewport={{ once: true, amount: 0.35 }}
              className="text-center"
            >
              <h3 className="font-display text-4xl font-bold text-[var(--agri-ink)]">
                A Day in the Field
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-[#4f634e]">
                수북농업 CEO는 연구실과 경영 현장을 넘어 농가의 실제 재배 환경에서
                의사결정합니다.
              </p>
            </motion.div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {gallery.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={revealInitial}
                  whileInView={revealWhileInView}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: Math.min(index * 0.08, 0.18) }}
                  className="group overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_14px_35px_rgba(12,26,12,0.1)]"
                >
                  <div className="relative h-72">
                    <img
                      alt={item.description}
                      src={item.image}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--agri-primary)]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">{item.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/10 bg-white px-5 py-16 text-center md:px-10 lg:px-20">
          <h3 className="font-display text-4xl font-bold text-[var(--agri-ink)]">
            수북농업 비전을 더 자세히 확인해보세요
          </h3>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              className="rounded-full bg-[var(--agri-primary)] px-8 py-3 text-base font-bold text-[var(--agri-ink)] transition hover:brightness-95"
            >
              CEO 경영 리포트 보기
            </button>
            <button
              type="button"
              className="rounded-full border border-black/20 px-8 py-3 text-base font-semibold text-[var(--agri-ink)] transition hover:bg-black/5"
            >
              사업 제휴 문의
            </button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
