"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV_ITEMS } from "./nav-items";

type SiteNavProps = {
  overlay?: boolean;
  dark?: boolean;
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNav({ overlay = false, dark = false }: SiteNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-30 px-5 py-5 md:px-10 lg:px-20"
          : dark
            ? "sticky top-0 z-30 border-b border-white/10 bg-[#132210]/95 px-5 py-4 backdrop-blur md:px-10 lg:px-20"
            : "sticky top-0 z-30 border-b border-black/8 bg-[var(--agri-paper)]/90 px-5 py-4 backdrop-blur md:px-10 lg:px-20"
      }
    >
      <div
        className={
          overlay
            ? "mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/15 bg-black/20 px-4 py-2.5 backdrop-blur-lg md:px-6"
            : dark
              ? "mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/12 bg-white/8 px-4 py-2.5 md:px-6"
              : "mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-black/8 bg-white/80 px-4 py-2.5 md:px-6"
        }
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[var(--agri-primary)]/15 p-2 text-[var(--agri-primary)]">
            <svg viewBox="0 0 48 48" fill="currentColor" className="size-full">
              <path d="M24 5c8.4 0 16 2.1 16 7.2v.2c-.2.7-.7 1.6-1.9 2.6-1.9 1.5-4.9 2.7-8.2 3.4a27.5 27.5 0 0 1-11.8 0c-3.3-.7-6.2-1.9-8.2-3.4A6.5 6.5 0 0 1 8 12.4v-.2C8 7.1 15.6 5 24 5Zm0 18.2c3.6 0 7-.4 10-1.1L24 38.3l-10-16.2c3 .7 6.4 1.1 10 1.1Z" />
              <path d="M24 3C18.7 3 13.8 3.7 10.1 5 8.2 5.7 6.5 6.5 5.2 7.6A6.3 6.3 0 0 0 3 12.3c0 .8.2 1.6.5 2.4.2.5.5 1.1.9 1.8l16.5 26.5c1.2 1.9 4 1.9 5.2 0l16.5-26.5c.4-.7.7-1.3.9-1.8.3-.8.5-1.6.5-2.4 0-1.8-.8-3.5-2.2-4.7C40.5 6.5 38.8 5.7 37 5c-3.8-1.3-8.7-2-13-2Zm0 4c8.9 0 15.7 2.4 16 5.2v.1c0 .1-.1.4-.5.9-.6.7-1.8 1.5-3.5 2.2-3.3 1.4-7.9 2.2-12 2.2s-8.7-.8-12-2.2c-1.7-.7-2.9-1.5-3.5-2.2a2 2 0 0 1-.5-.9v-.1C8.3 9.4 15.1 7 24 7Z" />
            </svg>
          </div>
          <p
            className={
              overlay
                ? "font-display text-2xl font-bold tracking-tight text-white"
                : dark
                  ? "font-display text-2xl font-bold tracking-tight text-white"
                  : "font-display text-2xl font-bold tracking-tight text-[var(--agri-ink)]"
            }
          >
            수북농업
          </p>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  overlay || dark
                    ? active
                      ? "text-[var(--agri-primary)]"
                      : "text-white/90 transition-colors hover:text-[var(--agri-primary)]"
                    : active
                      ? "text-[var(--agri-primary-deep)]"
                      : "text-[var(--agri-ink)]/80 transition-colors hover:text-[var(--agri-primary-deep)]"
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
          className={
            overlay || dark
              ? "rounded-full border border-white/20 bg-white/10 p-2 text-white md:hidden"
              : "rounded-full border border-black/15 bg-white p-2 text-[var(--agri-ink)] md:hidden"
          }
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
              className={
                overlay || dark
                  ? "relative z-30 mt-3 rounded-2xl border border-white/20 bg-black/72 p-3 backdrop-blur-md md:hidden"
                  : "relative z-30 mt-3 rounded-2xl border border-black/10 bg-white p-3 shadow-[0_10px_30px_rgba(10,25,10,0.08)] md:hidden"
              }
            >
              {NAV_ITEMS.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      overlay || dark
                        ? active
                          ? "block rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-[var(--agri-primary)]"
                          : "block rounded-xl px-3 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-[var(--agri-primary)]"
                        : active
                          ? "block rounded-xl bg-[var(--agri-primary)]/12 px-3 py-2 text-sm font-semibold text-[var(--agri-primary-deep)]"
                          : "block rounded-xl px-3 py-2 text-sm font-semibold text-[var(--agri-ink)]/85 transition-colors hover:bg-black/4 hover:text-[var(--agri-primary-deep)]"
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
