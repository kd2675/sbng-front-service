"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import { companyInfo } from "./company-info";
import { productCatalog } from "./product-catalog";
import SiteNav from "./components/site-nav";

const productSummaries = productCatalog.map((product) => ({
  id: product.id,
  name: product.name,
  benefit: product.cardSummary,
  crops: product.cropTags,
  image: product.frontImage,
  label: product.material,
}));

const caseStudies = [
  {
    id: "seosan",
    region: "충남 서산",
    crop: "벼",
    metric: "수확량",
    change: "+19%",
    before: "430kg / 10a",
    after: "512kg / 10a",
    summary: "질소 과다 구간을 줄이고 분얼기 생육 균일도를 확보했습니다.",
  },
  {
    id: "mungyeong",
    region: "경북 문경",
    crop: "사과",
    metric: "당도",
    change: "+1.9 brix",
    before: "14.2 brix",
    after: "16.1 brix",
    summary: "착색기 처방 최적화로 상품과 비율과 평균 당도가 개선되었습니다.",
  },
  {
    id: "gimje",
    region: "전북 김제",
    crop: "감자",
    metric: "상품 수율",
    change: "+21%",
    before: "2.8톤 / 10a",
    after: "3.4톤 / 10a",
    summary: "토양 통기성 개선 처방으로 괴경 비대와 균일도를 끌어올렸습니다.",
  },
];

const certificationItems = [
  "ISO 9001",
  "유기자재 인증",
  "특허 등록 15건",
  "농협 협력농가",
  "지역 연구기관 공동실증",
  "토양분석 파트너 랩",
];

const faqItems = [
  {
    question: "대량 주문 시 가격 정책은 어떻게 되나요?",
    answer:
      "기준 물량 이상부터 단계별 단가가 적용됩니다. 작물과 면적 정보를 주시면 맞춤 견적서를 제공합니다.",
  },
  {
    question: "제품 적용 시기는 언제가 가장 좋나요?",
    answer:
      "작물별 권장 시기가 다르지만 보통 정식 전 2주 내외 1차 적용 후 생육 중기 보강을 권장합니다.",
  },
  {
    question: "최소 주문 수량이 있나요?",
    answer:
      "직배송 기준 최소 주문은 500kg입니다. 소량은 지역 대리점 또는 상담 후 공동 배송으로 안내합니다.",
  },
  {
    question: "배송 기간은 얼마나 걸리나요?",
    answer:
      "국내 기준 평균 2~4영업일 내 출고됩니다. 산간 지역은 1~2일 추가될 수 있습니다.",
  },
  {
    question: "현장 상담 범위는 어디까지인가요?",
    answer:
      "토양 상태, 작물 생육, 기존 투입 이력을 기반으로 진단-처방-적용 계획까지 안내합니다.",
  },
];

const newsItems = [
  {
    category: "제품안내",
    date: "2026.02.18",
    title: "흙손·흙보약·무등산 제품 소개 페이지 공개",
    summary: "실제 포장 실사와 안내 시트를 기반으로 대표 제품 3종 정보를 정리했습니다.",
    href: "/products",
  },
  {
    category: "상담안내",
    date: "2026.01.29",
    title: "담양 본사 상담 접수 안내",
    summary: "작물 유형과 토양 상태에 따라 제품 적용 방향을 상담 중심으로 안내합니다.",
    href: "/contact",
  },
  {
    category: "브랜드",
    date: "2025.12.11",
    title: "수북농업 브랜드 사이트 운영 시작",
    summary: "회사 소개, CEO 메시지, 제품 정보, 문의 채널을 한곳에서 확인할 수 있습니다.",
    href: "/about",
  },
];

const sectionLabels = ["메인", "제품", "사례", "CEO", "인증", "FAQ", "뉴스"] as const;

export default function Home() {
  const reduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeSectionRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const isSwitchingRef = useRef(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  const fadeUpInitial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 };
  const fadeUpAnimate = { opacity: 1, y: 0 };
  const maxSectionIndex = sectionLabels.length - 1;
  const isBottomSection = activeSection >= 1;

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const widthMedia = window.matchMedia("(min-width: 1024px)");
    const pointerMedia = window.matchMedia("(any-pointer: fine)");
    const sync = () => {
      setIsDesktopMode(widthMedia.matches && pointerMedia.matches);
    };

    sync();
    widthMedia.addEventListener("change", sync);
    pointerMedia.addEventListener("change", sync);

    return () => {
      widthMedia.removeEventListener("change", sync);
      pointerMedia.removeEventListener("change", sync);
    };
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(maxSectionIndex, index));

    if (isSwitchingRef.current || clampedIndex === activeSectionRef.current) {
      return;
    }

    isSwitchingRef.current = true;
    activeSectionRef.current = clampedIndex;
    setActiveSection(clampedIndex);
    wheelAccumulatorRef.current = 0;

    sectionRefs.current[clampedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.setTimeout(() => {
      isSwitchingRef.current = false;
    }, reduceMotion ? 140 : 620);
  }, [maxSectionIndex, reduceMotion]);

  const registerSection =
    (index: number) =>
    (element: HTMLElement | null): void => {
      sectionRefs.current[index] = element;
    };

  useEffect(() => {
    const root = mainRef.current;

    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length === 0) {
          return;
        }

        const index = Number((visible[0].target as HTMLElement).dataset.sectionIndex);

        if (!Number.isNaN(index) && index !== activeSectionRef.current) {
          activeSectionRef.current = index;
          setActiveSection(index);
        }
      },
      {
        root,
        threshold: [0.3, 0.55, 0.75],
      },
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = mainRef.current;

    if (!root || !isDesktopMode) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (isSwitchingRef.current) {
        return;
      }

      wheelAccumulatorRef.current += event.deltaY;

      if (Math.abs(wheelAccumulatorRef.current) < 110) {
        return;
      }

      const direction = wheelAccumulatorRef.current > 0 ? 1 : -1;
      wheelAccumulatorRef.current = 0;
      scrollToSection(activeSectionRef.current + direction);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isSwitchingRef.current) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        scrollToSection(activeSectionRef.current + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        scrollToSection(activeSectionRef.current - 1);
      }
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      root.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isDesktopMode, scrollToSection]);

  const sectionClassName =
    "relative z-10 flex min-h-[auto] items-center px-5 py-20 md:min-h-[100svh] md:snap-start md:snap-always md:px-10 lg:px-20";

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-x-clip bg-[var(--agri-paper)]">
        <SiteNav />

        <div className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 md:block lg:right-8">
          <div className="pointer-events-auto flex flex-col items-center gap-2 px-1 py-1">
            {sectionLabels.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollToSection(index)}
                aria-label={`${label} 섹션으로 이동`}
                className="group flex h-4 w-4 items-center justify-center"
              >
                <motion.span
                  animate={{
                    scale: activeSection === index ? 1 : 0.76,
                    opacity: activeSection === index ? 1 : 0.58,
                  }}
                  transition={{ duration: 0.2 }}
                  className="h-2 w-2 rounded-full bg-[var(--agri-primary-deep)] shadow-[0_0_0_1px_rgba(11,20,11,0.14)]"
                />
              </button>
            ))}
            <p
              className={`mt-1 text-[10px] font-bold tracking-[0.16em] ${
                activeSection === 0 ? "text-white/85" : "text-[var(--agri-ink)]/85"
              }`}
            >
              {String(activeSection + 1).padStart(2, "0")} /{" "}
              {String(sectionLabels.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <main
          ref={mainRef}
          data-nav-scroll-root="true"
          className={
            isDesktopMode
              ? "h-[100svh] overflow-y-hidden scroll-smooth pb-24"
              : "h-[100svh] overflow-y-auto scroll-smooth pb-36"
          }
        >
          <section
            ref={registerSection(0)}
            data-section-index={0}
            className="hero-grain relative isolate flex min-h-[100svh] items-center justify-center px-5 pb-16 pt-28 md:snap-start md:snap-always md:px-10 lg:px-20"
          >
            <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1592982537447-6f2a6a0c8d43?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
            <div className="absolute inset-0 -z-10 bg-black/25" />

            <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
              <motion.div
                initial={fadeUpInitial}
                animate={fadeUpAnimate}
                transition={{ delay: 0.05 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--agri-primary)]/30 bg-[var(--agri-primary)]/12 px-4 py-1.5 text-sm font-semibold text-[var(--agri-primary)] backdrop-blur"
              >
                <motion.span
                  className="size-2 rounded-full bg-[var(--agri-primary)]"
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: [0.55, 1, 0.55], scale: [1, 1.24, 1] }
                  }
                  transition={{ duration: 1.9, repeat: Infinity }}
                />
                수북농업 대표 제품 3종 안내
              </motion.div>

              <motion.h1
                initial={fadeUpInitial}
                animate={fadeUpAnimate}
                transition={{ delay: 0.12 }}
                className="font-display text-5xl font-bold leading-[0.96] tracking-[-0.02em] text-white md:text-7xl lg:text-8xl"
              >
                수북농업이 만드는{" "}
                <span className="bg-gradient-to-r from-[var(--agri-primary)] to-[#e5ffc6] bg-clip-text text-transparent">
                  성장 중심 미래
                </span>{" "}
                <br className="hidden sm:block" />
                농업 솔루션
              </motion.h1>

              <motion.p
                initial={fadeUpInitial}
                animate={fadeUpAnimate}
                transition={{ delay: 0.2 }}
                className="mt-7 max-w-2xl text-base leading-relaxed text-white/88 md:text-xl"
              >
                수북농업은 친환경 비료와 토양 중심 컨설팅으로 수확량을 높이고 농업
                운영의 안정성을 강화하는 농업 솔루션을 제공합니다.
              </motion.p>

              <motion.div
                initial={fadeUpInitial}
                animate={fadeUpAnimate}
                transition={{ delay: 0.3 }}
                className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
              >
                <Link
                  href="/about"
                  className="rounded-full bg-[var(--agri-primary)] px-8 py-4 text-base font-extrabold text-[var(--agri-ink)] shadow-[0_16px_42px_rgba(87,219,49,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(87,219,49,0.48)]"
                >
                  수북농업 소개
                </Link>
                <Link
                  href="/products"
                  className="rounded-full border border-white/35 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  제품 보기
                </Link>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection(1)}
              className="absolute bottom-28 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition hover:text-[var(--agri-primary)] sm:bottom-24 md:bottom-20 lg:bottom-16"
            >
              <span className="text-[10px] font-bold tracking-[0.22em]">SCROLL</span>
              <span className="flex h-10 w-6 items-start justify-center rounded-full border border-current p-1">
                <motion.span
                  className="h-2.5 w-1 rounded-full bg-current"
                  animate={
                    reduceMotion ? { opacity: 1 } : { y: [0, 11], opacity: [1, 0] }
                  }
                  transition={{ duration: 1.35, repeat: Infinity }}
                />
              </span>
            </button>
          </section>

          <section
            ref={registerSection(1)}
            data-section-index={1}
            className={`${sectionClassName} bg-[var(--agri-paper)]`}
          >
            <div className="mx-auto w-full max-w-6xl">
              <motion.div
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.4 }}
                className="mb-12 flex flex-col gap-4"
              >
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--agri-primary-deep)]">
                  Products
                </p>
                <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  주요 제품 3종 요약
                </h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {productSummaries.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={fadeUpInitial}
                    whileInView={fadeUpAnimate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: Math.min(index * 0.08, 0.2) }}
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                    className="flex flex-col overflow-hidden rounded-3xl border border-black/6 bg-white shadow-[0_20px_50px_rgba(10,25,10,0.07)]"
                  >
                    <div className="relative h-56 overflow-hidden bg-[#edf3e7]">
                      <img
                        alt={`${item.name} 제품 이미지`}
                        src={item.image}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                      <p className="absolute left-5 top-5 rounded-full bg-white/82 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--agri-ink)] backdrop-blur">
                        {item.label}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--agri-primary-deep)]">
                        Flagship
                      </p>
                      <h3 className="text-xl font-extrabold text-[var(--agri-ink)]">
                        {item.name}
                      </h3>
                      <p className="mt-3 leading-relaxed text-[#4f624d]">{item.benefit}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.crops.map((crop) => (
                          <span
                            key={`${item.id}-${crop}`}
                            className="rounded-full bg-[#edf4e8] px-3 py-1 text-xs font-semibold text-[#476247]"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                      <Link
                        href="/products"
                        className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--agri-ink)] transition hover:text-[var(--agri-primary-deep)]"
                      >
                        자세히 보기
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={registerSection(2)}
            data-section-index={2}
            className={`${sectionClassName} bg-white`}
          >
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="mb-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  Case Study
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  고객 후기 및 현장 수치
                </h2>
              </motion.div>
              <div className="grid gap-6 md:grid-cols-3">
                {caseStudies.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={fadeUpInitial}
                    whileInView={fadeUpAnimate}
                    viewport={{ once: true, amount: 0.24 }}
                    transition={{ delay: Math.min(index * 0.08, 0.2) }}
                    className="rounded-3xl border border-black/8 bg-[#f9fcf7] p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-[#425b42]">{item.region}</p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#607860]">
                          작물: {item.crop}
                        </p>
                      </div>
                      <span className="rounded-full bg-[var(--agri-primary)]/20 px-3 py-1 text-sm font-extrabold text-[var(--agri-primary-deep)]">
                        {item.change}
                      </span>
                    </div>
                    <p className="mt-4 leading-relaxed text-[#486248]">{item.summary}</p>
                    <div className="mt-6 rounded-2xl border border-black/8 bg-white p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#789178]">
                        {item.metric}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-[#f1f4ee] p-3 text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#768a76]">
                            Before
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#5d735d]">{item.before}</p>
                        </div>
                        <div className="rounded-xl bg-[#ecfae5] p-3 text-center">
                          <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#2f7f22]">
                            After
                          </p>
                          <p className="mt-1 text-sm font-bold text-[#2f7f22]">{item.after}</p>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={registerSection(3)}
            data-section-index={3}
            className={`${sectionClassName} bg-[#f3f7ef]`}
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
              <motion.div
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="relative lg:col-span-4"
              >
                <div className="overflow-hidden rounded-3xl border border-black/10 shadow-[0_30px_70px_rgba(13,28,11,0.16)]">
                  <img
                    alt="수북농업 CEO 프로필"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfNvDKOA4us8Alix8jWVyu9urycX7CVV0JHF2Oyn_q3QsnIetIvYF0EgmdheZjgusMTMdPL-fVIxhFDDMdRKXfA0Cez0UsJf5TLPkvZotFit9BsCAmE_QfMnqCpxJIsy2ESR12g92bWDTjePFIXGej4QL7Gr8ndelj0l6HLLQiS-7bhvYJiwapUYvMfWXkAaDFFxW6PVzE4sSYkk4AkjuGmAR8w0f2mNwEi0rSi4HZta0qVc96JqNlqpb8AYgT4QUkh4aAWFiB77E"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.article
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.3 }}
                className="lg:col-span-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
                  CEO Message
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  한 줄 메시지
                </h2>
                <p className="mt-6 text-2xl leading-relaxed text-[#334c33] md:text-3xl">
                  &ldquo;현장 수치로 증명되는 기술만 농가에 전달하겠습니다.&rdquo;
                </p>
                <p className="mt-6 max-w-3xl leading-relaxed text-[#4d654d]">
                  수북농업은 연구 데이터보다 현장 적용 결과를 우선합니다. 작물과 토양이
                  모두 달라지는 현실에서, 실행 가능한 처방 체계를 만들고 있습니다.
                </p>
                <Link
                  href="/ceo"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--agri-ink)] px-7 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
                >
                  CEO 소개 페이지로 이동
                  <span aria-hidden>→</span>
                </Link>
              </motion.article>
            </div>
          </section>

          <section
            ref={registerSection(4)}
            data-section-index={4}
            className={`${sectionClassName} bg-white`}
          >
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.3 }}
                className="mb-10 text-center"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  Partners
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                  인증 및 협력 네트워크
                </h2>
              </motion.div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {certificationItems.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={fadeUpInitial}
                    whileInView={fadeUpAnimate}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ delay: Math.min(index * 0.05, 0.2) }}
                    className="flex min-h-28 items-center justify-center rounded-2xl border border-black/8 bg-[#f6faef] px-3 text-center text-sm font-bold text-[#4a644a]"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={registerSection(5)}
            data-section-index={5}
            className={`${sectionClassName} bg-[#f7faf4]`}
          >
            <div className="mx-auto w-full max-w-5xl">
              <motion.div
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="mb-10 text-center"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  FAQ
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                  자주 묻는 질문
                </h2>
              </motion.div>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <motion.details
                    key={faq.question}
                    initial={fadeUpInitial}
                    whileInView={fadeUpAnimate}
                    viewport={{ once: true, amount: 0.45 }}
                    transition={{ delay: Math.min(index * 0.04, 0.16) }}
                    className="rounded-2xl border border-black/8 bg-white"
                  >
                    <summary className="cursor-pointer list-none p-5 text-base font-bold text-[var(--agri-ink)]">
                      {faq.question}
                    </summary>
                    <div className="border-t border-black/8 px-5 pb-5 pt-4 text-[#4b634b]">
                      {faq.answer}
                    </div>
                  </motion.details>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={registerSection(6)}
            data-section-index={6}
            className={`${sectionClassName} bg-white`}
          >
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                    News
                  </p>
                  <h2 className="font-display mt-3 text-4xl font-bold text-[var(--agri-ink)] md:text-5xl">
                    공지 및 소식
                  </h2>
                </div>
                <Link
                  href="/about"
                  className="text-sm font-bold text-[#4a634a] transition hover:text-[var(--agri-primary-deep)]"
                >
                  전체 소식 보기 →
                </Link>
              </motion.div>
              <div className="grid gap-6 md:grid-cols-3">
                {newsItems.map((item, index) => (
                  <motion.article
                    key={`${item.date}-${item.title}`}
                    initial={fadeUpInitial}
                    whileInView={fadeUpAnimate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: Math.min(index * 0.08, 0.2) }}
                    className="flex flex-col rounded-3xl border border-black/8 bg-[#f8fbf6] p-7"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--agri-primary-deep)]">
                      {item.category}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#627962]">{item.date}</p>
                    <h3 className="mt-4 text-xl font-bold leading-snug text-[var(--agri-ink)]">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#4d654d]">{item.summary}</p>
                    <Link
                      href={item.href}
                      className="mt-6 w-fit text-sm font-bold text-[var(--agri-primary-deep)]"
                    >
                      자세히 보기 →
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <div
          className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/92 backdrop-blur-md transition-transform duration-300 ${
            isBottomSection ? "translate-y-0" : "pointer-events-none translate-y-full"
          }`}
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0rem)" }}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6 md:px-8">
            <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
              <p className="text-sm font-bold text-[var(--agri-ink)]">상담 가능 시간</p>
              <p className="text-xs text-[#526652]">
                {companyInfo.businessHours}, 문의 접수 후 순차 회신
              </p>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <a
                href={companyInfo.telephoneHref}
                className="flex-1 rounded-lg border border-black/10 bg-[#f2f6ef] px-4 py-2 text-center text-sm font-bold text-[var(--agri-ink)] transition hover:bg-[#e9f2e3] sm:flex-none"
              >
                전화 {companyInfo.telephoneDisplay}
              </a>
              <Link
                href="/products"
                className="flex-1 rounded-lg bg-[#ffe812] px-4 py-2 text-center text-sm font-bold text-[#3b1f1f] transition hover:brightness-95 sm:flex-none"
              >
                제품 보기
              </Link>
              <Link
                href="/contact"
                className="flex-1 rounded-lg bg-[var(--agri-primary)] px-4 py-2 text-center text-sm font-bold text-[var(--agri-ink)] transition hover:brightness-95 sm:flex-none"
              >
                문의폼
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
