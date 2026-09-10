import Image from "next/image";
import Link from "next/link";

import { companyInfo } from "../companyInfo";

import HomeLink from "./HomeLink";
import { NAV_ITEMS } from "./navItems";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/8 bg-white/70 px-5 py-10 md:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:gap-7">
          <HomeLink className="inline-flex shrink-0 items-center gap-3 self-start text-lg font-semibold tracking-tight text-[#243422]">
            <Image
              src="/image/logo-only-svg.svg"
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            수북농업
          </HomeLink>
          <div
            id="phone-contact"
            className="min-w-0 text-sm leading-7 text-[#5a6a57]"
          >
            <p>수북농업의 회사 소개와 제품 정보를 한곳에서 안내합니다.</p>
            <p className="mt-2">{companyInfo.address}</p>
            <a
              href={companyInfo.telephoneHref}
              className="inline-flex min-h-11 items-center gap-2 font-bold text-[var(--agri-primary-deep)] underline underline-offset-4"
            >
              전화 {companyInfo.telephoneDisplay}
            </a>
            <p>{companyInfo.businessHours}</p>
            <p className="mt-2 text-xs">
              {companyInfo.legalName} · 대표 {companyInfo.ceoName}
              <br />
              사업자등록번호 {companyInfo.businessRegistrationNumber}
            </p>
          </div>
        </div>
        <nav
          aria-label="하단 메뉴"
          className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-[#4f624d]"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center hover:text-[var(--agri-primary-deep)] hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
