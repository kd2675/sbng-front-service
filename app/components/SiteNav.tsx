"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { companyInfo } from "../companyInfo";

import HomeLink from "./HomeLink";
import { NAV_ITEMS } from "./navItems";

function PhoneIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m7.5 3 2 4.5-2.3 2.3a15 15 0 0 0 7 7l2.3-2.3 4.5 2V20a1 1 0 0 1-1.1 1A18.9 18.9 0 0 1 3 4.1 1 1 0 0 1 4 3Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const focusOnClose = useRef<"trigger" | "page" | "desktop">("trigger");
  const navigationPending = useRef(false);

  useEffect(() => {
    dialogRef.current?.close();
    if (navigationPending.current) {
      navigationPending.current = false;
      const frame = window.requestAnimationFrame(() => {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches && dialogRef.current?.open) {
        focusOnClose.current = "desktop";
        dialogRef.current.close();
      }
    };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      media.removeEventListener("change", closeOnDesktop);
      if (previousOverflow.current !== null) {
        document.body.style.overflow = previousOverflow.current;
      }
    };
  }, []);

  function openMenu() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    previousOverflow.current = document.body.style.overflow;
    focusOnClose.current = "trigger";
    navigationPending.current = false;
    dialog.showModal();
    const content = dialog.querySelector<HTMLElement>(".mobile-menu-content");
    if (content) content.scrollTop = 0;
    document.body.style.overflow = "hidden";
    setMenuOpen(true);
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  function navigateFromMenu(href: string) {
    focusOnClose.current = "page";
    navigationPending.current = pathname !== href;
    closeMenu();
  }

  function finishClosingMenu() {
    setMenuOpen(false);
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
    if (focusOnClose.current === "desktop") {
      const link =
        document.querySelector<HTMLElement>(
          ".desktop-nav [aria-current='page']",
        ) ??
        document.querySelector<HTMLElement>(".site-header-shell .site-brand");
      link?.focus({ preventScroll: true });
    } else if (focusOnClose.current === "page") {
      if (!navigationPending.current) {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }
    } else {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }

  return (
    <header className="site-header">
      <div className="site-header-shell">
        <HomeLink aria-label="수북농업 홈" className="site-brand">
          <Image
            src="/image/logo-only-svg.svg"
            alt=""
            width={600}
            height={549}
            className="site-brand-mark"
          />
          <span className="site-brand-copy">
            <span className="site-brand-name">{companyInfo.brandName}</span>
            <span className="site-brand-caption">담양 · 유기질비료</span>
          </span>
        </HomeLink>
        <nav aria-label="주 메뉴" className="desktop-nav">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-header-actions">
          <a
            href={companyInfo.telephoneHref}
            className="header-phone"
            aria-label={"전화 상담 " + companyInfo.telephoneDisplay}
          >
            <PhoneIcon />
            <span>{companyInfo.telephoneDisplay}</span>
          </a>
          <button
            ref={triggerRef}
            type="button"
            aria-label="메뉴 열기"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="menu-trigger"
            onClick={openMenu}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <span>메뉴</span>
          </button>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        aria-labelledby="mobile-menu-title"
        className="mobile-menu-panel"
        onClose={finishClosingMenu}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            "a[href], button:not(:disabled)",
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            closeMenu();
        }}
      >
        <div className="mobile-menu-header">
          <h2 id="mobile-menu-title" className="sr-only">
            전체 메뉴
          </h2>
          <HomeLink
            aria-label="수북농업 홈"
            className="site-brand"
            onNavigate={() => navigateFromMenu("/")}
          >
            <Image
              src="/image/logo-only-svg.svg"
              alt=""
              width={32}
              height={30}
              className="site-brand-mark"
            />
            <span className="site-brand-name">{companyInfo.brandName}</span>
          </HomeLink>
          <button
            type="button"
            autoFocus
            onClick={closeMenu}
            aria-label="메뉴 닫기"
            className="menu-close"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="mobile-menu-content">
          <HomeLink
            className="mobile-home-link"
            aria-current={pathname === "/" ? "page" : undefined}
            onNavigate={() => navigateFromMenu("/")}
          >
            <span>홈으로</span>
            <ArrowIcon />
          </HomeLink>
          <nav aria-label="모바일 메뉴" className="mobile-menu-links">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobile-menu-link"
                aria-current={pathname === item.href ? "page" : undefined}
                onNavigate={() => navigateFromMenu(item.href)}
              >
                <span>
                  <span className="mobile-menu-label">
                    {item.label}
                    {pathname === item.href && (
                      <span className="mobile-current-label">현재 페이지</span>
                    )}
                  </span>
                  <span className="mobile-menu-description">
                    {item.description}
                  </span>
                </span>
                <ArrowIcon />
              </Link>
            ))}
          </nav>
        </div>
        <div className="mobile-menu-contact">
          <div className="mobile-menu-contact-heading">
            <p>제품 상담</p>
            <p>{companyInfo.businessHours}</p>
          </div>
          <a
            href={companyInfo.telephoneHref}
            className="mobile-menu-phone"
            aria-label={"전화 상담 " + companyInfo.telephoneDisplay}
          >
            <PhoneIcon />
            {companyInfo.telephoneDisplay}
          </a>
        </div>
      </dialog>
    </header>
  );
}
