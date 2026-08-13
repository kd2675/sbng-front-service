"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import {
  ceoBiography,
  ceoCurrentStatus,
  companyProfile,
  publicSources,
  publicTimeline,
  verifiedFactCards,
} from "./companyProfile";
import { companyInfo } from "./companyInfo";
import LightboxImage from "./components/LightboxImage";
import SourceLink from "./components/SourceLink";
import SiteNav from "./components/SiteNav";
import { productCatalog } from "./productCatalog";

const productSummaries = productCatalog.map((product) => ({
  id: product.id,
  name: product.name,
  benefit: product.cardSummary,
  image: product.frontImage,
  material: product.material,
  usage: product.usage,
}));

const homeCeoHighlights = [
  ceoBiography[0],
  ceoBiography[3],
  ceoBiography[5],
  ceoBiography[6],
].filter(Boolean);

const homeCeoCurrentStatus = ceoCurrentStatus.slice(0, 2);

const homeTimelineDates = new Set(["2014.07.09", "2016.09.05", "2024.08.25", "2026.03"]);
const homeTimelineItems = publicTimeline.filter((item) => homeTimelineDates.has(item.date));

const homeSourceLabels = new Set([
  "회사 소개서",
  "한국유기질비료산업협동조합 연혁",
  "농민신문 2014.07.14",
  "영농자재신문 2020.08.07",
  "2026년 유기질비료 계약현황",
  "114On 공개 사업자 정보",
]);
const homeSources = publicSources.filter((source) => homeSourceLabels.has(source.label));

const sectionLabels = ["메인", "회사", "제품", "대표", "연혁", "자료", "문의"] as const;

export default function HomePageClient() {
  const reduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const activeSectionRef = useRef(0);
  const wheelAccumulatorRef = useRef(0);
  const isSwitchingRef = useRef(false);
  const [activeSection, setActiveSection] = useState(0);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  const revealInitial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 };
  const revealAnimate = { opacity: 1, y: 0 };
  const maxSectionIndex = sectionLabels.length - 1;
  const showBottomBar = activeSection >= 1;

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    const widthMedia = window.matchMedia("(min-width: 1024px)");
    const pointerMedia = window.matchMedia("(any-pointer: fine)");
    const sync = () => setIsDesktopMode(widthMedia.matches && pointerMedia.matches);

    sync();
    widthMedia.addEventListener("change", sync);
    pointerMedia.addEventListener("change", sync);

    return () => {
      widthMedia.removeEventListener("change", sync);
      pointerMedia.removeEventListener("change", sync);
    };
  }, []);

  const scrollToSection = useCallback(
    (index: number) => {
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
    },
    [maxSectionIndex, reduceMotion],
  );

  const registerSection =
    (index: number) =>
    (element: HTMLElement | null): void => {
      sectionRefs.current[index] = element;
    };

  const shouldUseNativeScroll = useCallback((direction: 1 | -1) => {
    const root = mainRef.current;
    const currentSection = sectionRefs.current[activeSectionRef.current];

    if (!root || !currentSection || currentSection.offsetHeight <= root.clientHeight + 2) {
      return false;
    }

    const rootRect = root.getBoundingClientRect();
    const sectionRect = currentSection.getBoundingClientRect();

    return direction > 0
      ? sectionRect.bottom > rootRect.bottom + 2
      : sectionRect.top < rootRect.top - 2;
  }, []);

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
      if (isSwitchingRef.current) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;

      if (shouldUseNativeScroll(direction)) {
        wheelAccumulatorRef.current = 0;
        return;
      }

      event.preventDefault();
      wheelAccumulatorRef.current += event.deltaY;

      if (Math.abs(wheelAccumulatorRef.current) < 110) {
        return;
      }

      const accumulatedDirection = wheelAccumulatorRef.current > 0 ? 1 : -1;
      wheelAccumulatorRef.current = 0;
      scrollToSection(activeSectionRef.current + accumulatedDirection);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isSwitchingRef.current) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        if (shouldUseNativeScroll(1)) {
          event.preventDefault();
          root.scrollBy({
            top: event.key === "PageDown" ? root.clientHeight * 0.82 : 96,
            behavior: "smooth",
          });
          return;
        }

        event.preventDefault();
        scrollToSection(activeSectionRef.current + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        if (shouldUseNativeScroll(-1)) {
          event.preventDefault();
          root.scrollBy({
            top: event.key === "PageUp" ? root.clientHeight * -0.82 : -96,
            behavior: "smooth",
          });
          return;
        }

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
  }, [isDesktopMode, scrollToSection, shouldUseNativeScroll]);

  const sectionClassName =
    "relative z-10 flex min-h-[auto] items-center px-5 py-20 md:min-h-[100svh] md:snap-start md:snap-always md:px-10 lg:px-20";

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-x-hidden bg-[var(--agri-paper)]">
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
                  className={`h-2 w-2 rounded-full shadow-[0_0_0_1px_rgba(11,20,11,0.14)] ${
                    activeSection === 0 ? "bg-white" : "bg-[var(--agri-primary-deep)]"
                  }`}
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
              ? "h-[100svh] overflow-y-auto scroll-smooth pb-24"
              : "h-[100svh] overflow-y-auto scroll-smooth pb-36"
          }
        >
          <section
            ref={registerSection(0)}
            data-section-index={0}
            className="relative isolate flex min-h-[100svh] items-end overflow-hidden px-5 pb-16 pt-28 md:snap-start md:snap-always md:px-10 lg:px-20"
          >
            <LightboxImage
              alt="수북농업 현장 활동 이미지"
              src="/image/kim-jong-su-assembly.jpg"
              fill
              priority
              sizes="100vw"
              className="object-cover"
              hideHint
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(9,18,8,0.86),rgba(13,22,10,0.52)_42%,rgba(13,22,10,0.82)_100%)]" />
            <div className="pointer-events-none absolute left-[-4rem] top-32 h-56 w-56 rounded-full bg-[#ffe89a]/12 blur-3xl md:h-72 md:w-72" />
            <div className="pointer-events-none absolute bottom-16 right-[-4rem] h-56 w-56 rounded-full bg-[var(--agri-primary)]/14 blur-3xl md:h-80 md:w-80" />

            <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start">
              <motion.div
                initial={revealInitial}
                animate={revealAnimate}
                transition={{ delay: 0.04 }}
                className="flex flex-wrap gap-2"
              >
                {["흙손", "무등산", "흙보약"].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/86 backdrop-blur"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--agri-primary)]" />
                    {item}
                  </span>
                ))}
              </motion.div>

              <motion.h1
                initial={revealInitial}
                animate={revealAnimate}
                transition={{ delay: 0.12 }}
                className="font-display mt-6 max-w-5xl text-5xl font-bold leading-[0.98] text-white md:text-7xl lg:text-8xl"
              >
                담양 유기질비료
                <br />
                <span className="text-[var(--agri-primary)]">수북농업</span>
              </motion.h1>

              <motion.p
                initial={revealInitial}
                animate={revealAnimate}
                transition={{ delay: 0.18 }}
                className="mt-7 max-w-3xl text-base leading-relaxed text-white/86 md:text-xl"
              >
                농업회사법인(유) 수북농업은 전남 담양에서 유기질비료와 퇴비를 생산하며,
                흙손·흙보약·무등산 제품을 안내합니다.
              </motion.p>

              <motion.div
                initial={revealInitial}
                animate={revealAnimate}
                transition={{ delay: 0.24 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {verifiedFactCards.map((card) => (
                  <span
                    key={card.title}
                    className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-semibold text-white/88 backdrop-blur"
                  >
                    {card.value}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={revealInitial}
                animate={revealAnimate}
                transition={{ delay: 0.32 }}
                className="mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row"
              >
                <Link
                  href="/ceo"
                  className="rounded-full bg-[var(--agri-primary)] px-8 py-4 text-base font-extrabold text-[var(--agri-ink)] shadow-[0_16px_42px_rgba(87,219,49,0.35)] transition hover:-translate-y-0.5"
                >
                  김종수 대표 보기
                </Link>
                <Link
                  href="/about"
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  회사 정보 보기
                </Link>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection(1)}
              className="absolute bottom-20 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/78 transition hover:text-[var(--agri-primary)]"
            >
              <span className="text-[10px] font-bold tracking-[0.22em]">내려보기</span>
              <span className="flex h-10 w-6 items-start justify-center rounded-full border border-current p-1">
                <motion.span
                  className="h-2.5 w-1 rounded-full bg-current"
                  animate={reduceMotion ? { opacity: 1 } : { y: [0, 11], opacity: [1, 0] }}
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
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]"
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--agri-primary-deep)]">
                    회사 소개
                  </p>
                  <h2 className="font-display mt-4 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                    수북농업 소개
                  </h2>
                  <div className="mt-6 space-y-4 text-base leading-relaxed text-[#4d654d] md:text-lg">
                    {companyProfile.companyOverview.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <p className="mt-6 rounded-2xl bg-white px-5 py-4 text-sm leading-relaxed text-[#4a634a] shadow-[0_18px_45px_rgba(12,26,12,0.06)]">
                    {companyProfile.verificationNote}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {verifiedFactCards.map((card, index) => (
                    <motion.article
                      key={card.title}
                      initial={revealInitial}
                      whileInView={revealAnimate}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ delay: Math.min(index * 0.05, 0.14) }}
                      className="rounded-3xl border border-black/8 bg-white p-6 shadow-[0_20px_48px_rgba(12,26,12,0.06)]"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#678066]">
                        {card.title}
                      </p>
                      <p className="mt-3 text-2xl font-bold text-[var(--agri-ink)]">{card.value}</p>
                      <p className="mt-3 text-sm leading-relaxed text-[#536a52]">
                        {card.description}
                      </p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section
            ref={registerSection(2)}
            data-section-index={2}
            className={`${sectionClassName} bg-white`}
          >
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="mb-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  제품 안내
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  대표 제품 3종
                </h2>
              </motion.div>
              <div className="grid gap-6 lg:grid-cols-3">
                {productSummaries.map((item, index) => (
                  <motion.article
                    key={item.id}
                    initial={revealInitial}
                    whileInView={revealAnimate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: Math.min(index * 0.08, 0.18) }}
                    className="overflow-hidden rounded-3xl border border-black/8 bg-[#f8fbf6] shadow-[0_22px_54px_rgba(12,26,12,0.07)]"
                  >
                    <div className="relative h-64">
                      <LightboxImage
                        alt={`${item.name} 제품 실사`}
                        src={item.image}
                        fill
                        sizes="(min-width: 1024px) 28vw, 100vw"
                        className="object-cover"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-transparent" />
                      <p className="pointer-events-none absolute left-5 top-5 rounded-full bg-white/86 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--agri-ink)]">
                        {item.material}
                      </p>
                    </div>
                    <div className="p-7">
                      <h3 className="text-2xl font-bold text-[var(--agri-ink)]">{item.name}</h3>
                      <p className="mt-3 leading-relaxed text-[#516851]">{item.benefit}</p>
                      <p className="mt-5 text-sm font-semibold text-[#365335]">
                        권장 사용량: {item.usage}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={registerSection(3)}
            data-section-index={3}
            className="relative z-10 flex items-center bg-[#f3f7ef] px-5 py-14 md:min-h-[100svh] md:snap-start md:snap-always md:px-10 md:py-12 lg:px-20"
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <motion.figure
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="overflow-hidden rounded-[2rem] border border-black/8 bg-white shadow-[0_26px_70px_rgba(12,26,12,0.12)]"
              >
                <div className="relative aspect-[4/5] bg-[#e6ebdf]">
                  <LightboxImage
                    alt="농민신문 기사에 실린 김종수 대표 사진"
                    src="/image/kim-jong-su-portrait.jpg"
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="border-t border-black/8 px-5 py-4 text-sm leading-relaxed text-[#546a54]">
                  김종수 대표
                </figcaption>
              </motion.figure>

              <motion.article
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.28 }}
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  대표 소개
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  김종수 대표 소개
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-[#456045] md:text-xl">
                  수북농업과 수북환경개발을 이끌며 유기질비료 산업과 현장 중심의 농업
                  활동을 이어오고 있습니다.
                </p>
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {homeCeoCurrentStatus.map((item) => (
                    <SourceLink
                      key={item.date}
                      href={item.sourceUrl}
                      className="rounded-[1.4rem] border border-black/8 bg-[#f5f8f1] px-5 py-4 text-left shadow-[0_16px_36px_rgba(12,26,12,0.05)] transition hover:-translate-y-0.5"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--agri-primary-deep)]">
                        {item.date}
                      </p>
                      <p className="mt-2 text-base font-bold text-[var(--agri-ink)]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#536b52]">
                        {item.description}
                      </p>
                    </SourceLink>
                  ))}
                </div>
                <ul className="mt-8 space-y-4">
                  {homeCeoHighlights.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={revealInitial}
                      whileInView={revealAnimate}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ delay: Math.min(index * 0.05, 0.16) }}
                      className="flex gap-3 rounded-2xl bg-white px-5 py-4 text-sm leading-relaxed text-[#536b52] shadow-[0_16px_36px_rgba(12,26,12,0.05)]"
                    >
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--agri-primary-deep)]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <Link
                  href="/ceo"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--agri-ink)] px-7 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
                >
                  대표 소개 자세히 보기
                  <span aria-hidden>→</span>
                </Link>
              </motion.article>
            </div>
          </section>

          <section
            ref={registerSection(4)}
            data-section-index={4}
            className="relative z-10 flex items-center bg-white px-5 py-14 md:min-h-[100svh] md:snap-start md:snap-always md:px-10 md:py-10 lg:px-20"
          >
            <div className="mx-auto w-full max-w-6xl">
              <motion.div
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="mb-8"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  공개 연혁
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  수북농업 주요 연혁
                </h2>
              </motion.div>
              <div className="space-y-5">
                {homeTimelineItems.map((item, index) => (
                  <motion.article
                    key={item.date}
                    initial={revealInitial}
                    whileInView={revealAnimate}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: Math.min(index * 0.05, 0.16) }}
                    className="grid gap-3 rounded-3xl border border-black/8 bg-[#f8fbf6] p-5 md:grid-cols-[10rem_1fr_auto]"
                  >
                    <div>
                      <p className="text-sm font-bold text-[var(--agri-primary-deep)]">{item.date}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--agri-ink)]">{item.title}</h3>
                      <p className="mt-3 leading-relaxed text-[#516851]">{item.description}</p>
                    </div>
                    <SourceLink
                      href={item.sourceUrl}
                      className="w-fit self-start rounded-full border border-black/10 px-4 py-2 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                    >
                      {item.sourceLabel}
                    </SourceLink>
                  </motion.article>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/history"
                  className="inline-flex rounded-full bg-[var(--agri-ink)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
                >
                  전체 연혁 보기
                </Link>
              </div>
            </div>
          </section>

          <section
            ref={registerSection(5)}
            data-section-index={5}
            className="relative z-10 flex items-center bg-[#f7faf4] px-5 py-14 md:min-h-[100svh] md:snap-start md:snap-always md:px-10 md:py-12 lg:px-20"
          >
            <div className="mx-auto w-full max-w-7xl">
              <motion.div
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.35 }}
                className="mb-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary-deep)]">
                  참고 자료
                </p>
                <h2 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  함께 보면 좋은 자료
                </h2>
              </motion.div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {homeSources.map((source, index) => (
                  <motion.article
                    key={source.label}
                    initial={revealInitial}
                    whileInView={revealAnimate}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: Math.min(index * 0.05, 0.18) }}
                    className="flex h-full flex-col rounded-3xl border border-black/8 bg-white p-7 shadow-[0_16px_38px_rgba(12,26,12,0.06)]"
                  >
                    <h3 className="text-xl font-bold text-[var(--agri-ink)]">{source.label}</h3>
                    <p className="mt-3 flex-1 leading-relaxed text-[#526952]">{source.detail}</p>
                    {source.url ? (
                      <SourceLink
                        href={source.url}
                        className="mt-6 text-sm font-bold text-[var(--agri-primary-deep)]"
                      >
                        자료 보기 →
                      </SourceLink>
                    ) : (
                      <p className="mt-6 text-sm font-semibold text-[#647b63]">사이트 자료</p>
                    )}
                  </motion.article>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex rounded-full bg-[var(--agri-ink)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
                >
                  전체 자료 보기
                </Link>
              </div>
            </div>
          </section>

          <section
            ref={registerSection(6)}
            data-section-index={6}
            className={`${sectionClassName} bg-white`}
          >
            <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.article
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[2rem] bg-[#112614] px-8 py-10 text-white"
              >
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--agri-primary)]">
                  문의 안내
                </p>
                <h2 className="font-display mt-4 text-4xl font-bold md:text-5xl">
                  수북농업 본사 문의
                </h2>
                <p className="mt-5 max-w-3xl leading-relaxed text-white/84">
                  제품 상담이나 회사 문의가 필요하면 전화, 휴대전화, 이메일 중 편한 채널을
                  이용해 주세요. 남겨주신 문의는 확인 후 순차적으로 안내해 드립니다.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <a
                    href={companyInfo.telephoneHref}
                    className="rounded-2xl bg-white/10 px-5 py-4 text-left backdrop-blur transition hover:bg-white/14"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/64">전화</p>
                    <p className="mt-2 text-xl font-bold">{companyInfo.telephoneDisplay}</p>
                  </a>
                  <a
                    href={companyInfo.mobileHref}
                    className="rounded-2xl bg-white/10 px-5 py-4 text-left backdrop-blur transition hover:bg-white/14"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/64">
                      휴대전화
                    </p>
                    <p className="mt-2 text-xl font-bold">{companyInfo.mobileDisplay}</p>
                  </a>
                  <a
                    href={companyInfo.emailHref}
                    className="rounded-2xl bg-white/10 px-5 py-4 text-left backdrop-blur transition hover:bg-white/14 sm:col-span-2"
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/64">이메일</p>
                    <p className="mt-2 text-xl font-bold break-all">{companyInfo.emailDisplay}</p>
                  </a>
                </div>
              </motion.article>

              <motion.article
                initial={revealInitial}
                whileInView={revealAnimate}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-[2rem] border border-black/8 bg-[#f4f8ee] px-8 py-10"
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
                  본사 정보
                </p>
                <h3 className="mt-4 text-3xl font-bold text-[var(--agri-ink)]">담양 본사 정보</h3>
                <p className="mt-5 leading-relaxed text-[#506750]">
                  {companyInfo.legalName}
                  <br />
                  {companyInfo.address}
                </p>
                <p className="mt-5 rounded-2xl bg-white px-5 py-4 text-sm leading-relaxed text-[#536a52]">
                  상담 가능 시간: {companyInfo.businessHours}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="rounded-full bg-[var(--agri-ink)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--agri-primary-deep)]"
                  >
                    문의 페이지 열기
                  </Link>
                  <Link
                    href="/products"
                    className="rounded-full border border-black/12 px-6 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
                  >
                    제품 자료 보기
                  </Link>
                </div>
              </motion.article>
            </div>
          </section>
        </main>

        <div
          className={`fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/92 backdrop-blur-md transition-transform duration-300 ${
            showBottomBar ? "translate-y-0" : "pointer-events-none translate-y-full"
          }`}
          style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0rem)" }}
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6 md:px-8">
            <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
              <p className="text-sm font-bold text-[var(--agri-ink)]">빠른 문의</p>
              <p className="text-xs text-[#526652]">
                전화 {companyInfo.telephoneDisplay} · 휴대전화 {companyInfo.mobileDisplay}
              </p>
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <a
                href={companyInfo.telephoneHref}
                className="flex-1 rounded-lg border border-black/10 bg-[#f2f6ef] px-4 py-2 text-center text-sm font-bold text-[var(--agri-ink)] transition hover:bg-[#e9f2e3] sm:flex-none"
              >
                전화 연결
              </a>
              <Link
                href="/ceo"
                className="flex-1 rounded-lg bg-[#ffe812] px-4 py-2 text-center text-sm font-bold text-[#3b1f1f] transition hover:brightness-95 sm:flex-none"
              >
                대표 소개
              </Link>
              <Link
                href="/contact"
                className="flex-1 rounded-lg bg-[var(--agri-primary)] px-4 py-2 text-center text-sm font-bold text-[var(--agri-ink)] transition hover:brightness-95 sm:flex-none"
              >
                문의 페이지
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
