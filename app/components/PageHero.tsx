"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type HeroAction = {
  href: string;
  label: string;
  kind?: "primary" | "secondary";
};

type HeroFact = {
  label: string;
  value: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  note?: string;
  actions?: HeroAction[];
  facts?: readonly HeroFact[];
  contentClassName?: string;
};

function HeroActionLink({
  href,
  label,
  kind = "primary",
}: HeroAction) {
  const className =
    kind === "secondary"
      ? "inline-flex min-h-12 items-center justify-center rounded-[8px] border border-white/20 px-5 py-3 text-sm font-medium text-white/90 hover:border-white/32 hover:bg-white/8"
      : "inline-flex min-h-12 items-center justify-center rounded-[8px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[#101611] hover:bg-[var(--signal)]";
  const internal = href.startsWith("/");
  const browserExternal = href.startsWith("http://") || href.startsWith("https://");

  if (!internal) {
    return (
      <a
        href={href}
        className={className}
        target={browserExternal ? "_blank" : undefined}
        rel={browserExternal ? "noreferrer" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function PageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imageClassName,
  note,
  actions = [],
  facts = [],
  contentClassName,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.28]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[#0b100b] text-white">
      <div className="absolute inset-0">
        <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className={imageClassName ?? "object-cover"}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(6,9,7,0.88)_10%,rgba(6,9,7,0.66)_48%,rgba(6,9,7,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(143,203,79,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(207,215,118,0.12),transparent_34%)]" />
        <div className="grain-overlay" />
      </div>

      <div className="relative min-h-[76svh] pt-24 md:min-h-[84svh]">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className={`section-wrap flex min-h-[inherit] flex-col justify-end pb-14 md:pb-18 ${contentClassName ?? ""}`}
        >
          <div className="max-w-[46rem]">
            <p className="section-kicker text-white/72">{eyebrow}</p>
            <h1 className="font-display mt-5 max-w-[14ch] text-balance text-[clamp(3rem,8vw,6.75rem)] leading-[0.94]">
              {title}
            </h1>
            <p className="mt-6 max-w-[37rem] text-balance text-base leading-8 text-white/78 md:text-lg">
              {description}
            </p>
            {actions.length > 0 ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {actions.map((action) => (
                  <HeroActionLink key={action.href} {...action} />
                ))}
              </div>
            ) : null}
            {note ? (
              <p className="mt-6 max-w-[34rem] text-sm leading-7 text-white/62">{note}</p>
            ) : null}
          </div>

          {facts.length > 0 ? (
            <div className="mt-12 grid gap-5 border-t border-white/14 pt-6 md:grid-cols-4">
              {facts.map((fact) => (
                <div key={fact.label} className="max-w-[15rem]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/54">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-base font-medium text-white/88">{fact.value}</p>
                </div>
              ))}
            </div>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
