import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "../company-info";
import { NAV_ITEMS } from "./nav-items";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/8 bg-white/60 px-5 py-10 md:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-3">
            <Image
              alt="수북농업 브랜드 마크"
              src="/image/logo-only-svg.svg"
              width={48}
              height={48}
              sizes="48px"
              className="h-12 w-12 shrink-0 object-contain"
            />
            <p className="text-lg font-semibold tracking-[-0.04em] text-[#243422]">수북농업</p>
          </div>
          <div>
            <p className="mt-1 text-sm text-[#5a6a57]">
              수북농업과 함께 생산성과 토양 건강을 높입니다.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#5a6a57]">
              {companyInfo.address}
              <br />
              전화 {companyInfo.telephoneDisplay} · 팩스 {companyInfo.faxDisplay}
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm font-semibold text-[#4f624d]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[var(--agri-primary-deep)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
