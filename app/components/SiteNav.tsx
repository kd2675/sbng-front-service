"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { NAV_ITEMS } from "./navItems";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.16,
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeMobileMenu = () => setMobileOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50"
        style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
      >
        <div className="section-wrap">
          <div
            className={`mt-4 flex items-center justify-between rounded-[8px] border px-4 py-3 backdrop-blur-xl md:px-5 ${
              isScrolled
                ? "border-white/12 bg-[rgba(7,10,8,0.84)] shadow-[0_18px_48px_rgba(7,10,8,0.24)]"
                : "border-white/10 bg-[rgba(7,10,8,0.56)]"
            }`}
          >
            <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-3 text-white">
              <Image
                alt="수북농업 브랜드 마크"
                src="/image/logo-only-svg.svg"
                width={38}
                height={38}
                sizes="38px"
                className="h-9 w-9 shrink-0 object-contain"
              />
              <div className="leading-none">
                <p className="font-display text-lg font-semibold">수북농업</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/56">
                  Damyang Organic Soil Care
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-7 text-sm text-white/82 md:flex">
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`relative pb-1 ${
                      active ? "text-white" : "hover:text-[var(--accent-soft)]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[var(--accent)] transition-transform duration-200 ${
                        active ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="inline-flex min-h-11 items-center justify-center rounded-[8px] border border-white/14 bg-white/8 px-4 py-2 text-sm font-medium text-white hover:border-white/26 hover:bg-white/12"
              >
                상담 문의
              </Link>
            </nav>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-site-nav"
              aria-label="네비게이션 열기"
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[8px] border border-white/14 bg-white/8 text-white md:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform ${
                    mobileOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-opacity ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-transform ${
                    mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <motion.div
          style={{ scaleX }}
          className="mt-3 h-px origin-left bg-[var(--accent)]/75"
        />
      </header>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="메뉴 닫기"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[rgba(7,10,8,0.62)] md:hidden"
            />
            <motion.nav
              id="mobile-site-nav"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-5 top-24 z-50 rounded-[8px] border border-white/10 bg-[#0d120d] p-4 text-white shadow-[0_24px_60px_rgba(7,10,8,0.3)] md:hidden"
            >
              <div className="grid gap-2">
                {NAV_ITEMS.map((item) => {
                  const active = isActivePath(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`rounded-[8px] px-3 py-3 text-sm ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/76 hover:bg-white/6 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[8px] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[#101611]"
              >
                상담 문의
              </Link>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
