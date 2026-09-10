"use client";

import Link from "next/link";

import { companyInfo } from "../companyInfo";

import { useHomeSectionScroll } from "./useHomeSectionScroll";

const sections = [
  { id: "home-main", label: "메인" },
  { id: "home-company", label: "회사" },
  { id: "home-products", label: "제품" },
  { id: "home-ceo", label: "대표" },
  { id: "home-history", label: "연혁" },
  { id: "home-sources", label: "자료" },
  { id: "home-contact", label: "전화 안내" },
] as const;
const sectionIds = sections.map(({ id }) => id);

export default function HomeSectionNav() {
  const activeIndex = useHomeSectionScroll(sectionIds);

  return (
    <>
      <nav
        aria-label="홈 섹션 이동"
        className="home-section-nav"
        data-hero={activeIndex === 0}
      >
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={"#" + section.id}
            aria-label={section.label + " 섹션으로 이동"}
            aria-current={activeIndex === index ? "location" : undefined}
          >
            <span className="section-dot" aria-hidden="true" />
            <span className="section-dot-label">{section.label}</span>
          </a>
        ))}
        <p aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / 07
        </p>
      </nav>
      <aside
        aria-label="빠른 전화 상담"
        className="home-phone-dock"
        hidden={activeIndex === 0 || activeIndex === sections.length - 1}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <p className="hidden text-sm font-semibold sm:block">
            수북농업 전화 상담
          </p>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <a
              href={companyInfo.telephoneHref}
              className="btn btn-light flex-1"
            >
              {companyInfo.telephoneDisplay}
            </a>
            <Link href="/ceo" className="btn btn-secondary">
              대표 소개
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
