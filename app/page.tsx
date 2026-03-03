"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import SiteNav from "./components/site-nav";

const features = [
  {
    id: "eco",
    label: "ECO",
    title: "Sustainable Growth",
    description:
      "Eco-conscious formulas that enrich soil microbiome and improve long-term field health.",
  },
  {
    id: "science",
    label: "LAB",
    title: "Advanced Science",
    description:
      "Engineered nutrient blends that optimize uptake, reduce runoff, and minimize fertilizer waste.",
  },
  {
    id: "yield",
    label: "YLD",
    title: "Higher Yields",
    description:
      "Field trials indicate up to 30% yield improvements with stable performance across diverse climates.",
  },
];

const sectionLabels = ["메인", "핵심 가치"] as const;

export default function Home() {
  const reduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const fadeUpInitial = reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 };
  const fadeUpAnimate = { opacity: 1, y: 0 };
  const maxSectionIndex = sectionLabels.length - 1;

  useEffect(() => {
    const node = mainRef.current;

    if (!node) {
      return;
    }

    const onScroll = () => {
      const sectionHeight = Math.max(node.clientHeight, 1);
      const index = Math.round(node.scrollTop / sectionHeight);
      const clamped = Math.min(maxSectionIndex, Math.max(0, index));
      setActiveSection((prev) => (prev === clamped ? prev : clamped));
    };

    onScroll();
    node.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      node.removeEventListener("scroll", onScroll);
    };
  }, [maxSectionIndex]);

  const scrollToSection = (index: number) => {
    const node = mainRef.current;

    if (!node) {
      return;
    }

    node.scrollTo({
      top: node.clientHeight * index,
      behavior: "smooth",
    });
  };

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative overflow-x-clip bg-[var(--agri-paper)]">
        <SiteNav overlay />

        <div className="pointer-events-none fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 lg:right-10 md:block">
          <div className="pointer-events-auto flex flex-col items-center gap-2 px-1 py-1">
            {sectionLabels.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => scrollToSection(index)}
                aria-label={`Go to ${label}`}
                className="group flex h-4 w-4 items-center justify-center"
              >
                <motion.span
                  animate={{
                    scale: activeSection === index ? 1 : 0.78,
                    opacity: activeSection === index ? 1 : 0.55,
                  }}
                  transition={{ duration: 0.2 }}
                  className="h-2 w-2 rounded-full bg-[var(--agri-primary)]"
                />
              </button>
            ))}
            <p className="mt-1 text-[10px] font-bold tracking-[0.16em] text-white/85">
              {String(activeSection + 1).padStart(2, "0")} /{" "}
              {String(sectionLabels.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        <main
          ref={mainRef}
          className="h-[100svh] overflow-y-auto scroll-smooth md:snap-y md:snap-mandatory"
        >
          <section className="hero-grain relative isolate flex min-h-[100svh] items-center justify-center px-5 pb-16 pt-28 md:snap-start md:snap-always md:px-10 lg:px-20">
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
                수북농업 바이오-유기질 시리즈 출시
              </motion.div>

              <motion.h1
                initial={fadeUpInitial}
                animate={fadeUpAnimate}
                transition={{ delay: 0.12 }}
                className="font-display text-5xl font-bold leading-[0.96] tracking-[-0.02em] text-white md:text-7xl lg:text-8xl"
              >
                수북농업이 만드는{" "}
                <span className="bg-gradient-to-r from-[var(--agri-primary)] to-[#e5ffc6] bg-clip-text text-transparent">
                  지속가능한 미래
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
                수북농업은 친환경 비료와 토양 중심 컨설팅으로 수확량을 높이고
                건강한 농업 생태계를 지키는 지속가능 농업 솔루션을 제공합니다.
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
              className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/80 transition hover:text-[var(--agri-primary)]"
            >
              <span className="text-[10px] font-bold tracking-[0.22em]">
                SCROLL
              </span>
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
            id="highlights"
            className="relative z-10 flex min-h-[100svh] items-center bg-[var(--agri-paper)] px-5 py-20 md:snap-start md:snap-always md:px-10 lg:px-20"
          >
            <div className="mx-auto w-full max-w-6xl">
              <motion.div
                initial={fadeUpInitial}
                whileInView={fadeUpAnimate}
                viewport={{ once: true, amount: 0.4 }}
                className="mb-12 flex flex-col gap-4"
              >
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--agri-primary-deep)]">
                  Why Subuk Nongup
                </p>
                <h2 className="font-display text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-5xl">
                  수북농업의 정밀 영양 설계로 더 강한 농장 운영
                </h2>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                {features.map((feature, index) => (
                  <motion.article
                    key={feature.id}
                    initial={fadeUpInitial}
                    whileInView={fadeUpAnimate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.42, delay: Math.min(index * 0.08, 0.2) }}
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                    className="rounded-3xl border border-black/5 bg-white p-7 shadow-[0_20px_50px_rgba(10,25,10,0.06)]"
                  >
                    <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[var(--agri-primary)]/16 text-xs font-bold text-[var(--agri-primary-deep)]">
                      {feature.label}
                    </div>
                    <h3 className="text-xl font-extrabold text-[var(--agri-ink)]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[#4f624d]">
                      {feature.description}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}
