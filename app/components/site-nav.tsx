"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "./nav-items";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const useDarkText = pathname.startsWith("/contact");

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const scrollRoot = document.querySelector<HTMLElement>('[data-nav-scroll-root="true"]');

    const onScroll = () => {
      const windowScrolled = window.scrollY > 8;
      const rootScrolled = scrollRoot ? scrollRoot.scrollTop > 8 : false;
      setIsScrolled(windowScrolled || rootScrolled);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    scrollRoot?.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      scrollRoot?.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 px-4 pb-3 md:px-10 lg:px-20"
      style={{ paddingTop: "max(env(safe-area-inset-top), 0.5rem)" }}
    >
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 md:px-6 ${
          isScrolled
            ? "border border-white/20 bg-black/55 shadow-[0_12px_30px_rgba(4,12,4,0.24)] backdrop-blur-xl"
            : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <Image
            alt="수북농업 브랜드 마크"
            src="/image/logo-only-svg.svg"
            width={40}
            height={40}
            sizes="40px"
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span
            className={`text-lg font-semibold tracking-[-0.04em] ${
              isScrolled
                ? "text-white"
                : useDarkText
                ? "text-[var(--agri-ink)]"
                : "text-white"
            }`}
          >
            수북농업
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={
                  active
                    ? "text-[var(--agri-primary)]"
                    : isScrolled
                      ? "text-white/90 transition-colors hover:text-[var(--agri-primary)]"
                      : useDarkText
                      ? "text-[var(--agri-ink)]/85 transition-colors hover:text-[var(--agri-primary-deep)]"
                      : "text-white/90 transition-colors hover:text-[var(--agri-primary)]"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`rounded-full border p-2 md:hidden ${
            isScrolled
              ? "border-white/20 bg-white/10 text-white"
              : useDarkText
              ? "border-black/20 bg-white/85 text-[var(--agri-ink)]"
              : "border-white/20 bg-white/10 text-white"
          }`}
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span
            className={`mt-1 block h-0.5 w-5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`mt-1 block h-0.5 w-5 bg-current transition-transform ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation overlay"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-20 bg-black/35 md:hidden"
            />
            <motion.nav
              id="mobile-nav-panel"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-30 mt-3 max-h-[calc(100dvh-7.5rem)] overflow-y-auto rounded-2xl border border-white/20 bg-black/75 p-3 shadow-[0_16px_40px_rgba(4,12,4,0.35)] backdrop-blur-xl md:hidden"
            >
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={
                      active
                        ? "block rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-[var(--agri-primary)]"
                        : "block rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-[var(--agri-primary)]"
                    }
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
