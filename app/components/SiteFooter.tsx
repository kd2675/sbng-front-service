import Image from "next/image";
import Link from "next/link";
import { companyInfo } from "../companyInfo";
import { NAV_ITEMS } from "./navItems";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0b100b] text-white">
      <div className="section-wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              alt="수북농업 브랜드 마크"
              src="/image/logo-only-svg.svg"
              width={46}
              height={46}
              sizes="46px"
              className="h-11 w-11 object-contain"
            />
            <div>
              <p className="font-display text-2xl">수북농업</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.22em] text-white/54">
                Damyang Organic Soil Care
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-[34rem] text-base leading-8 text-white/72">
            담양 기반의 유기질비료 생산 정보, 공개 기록, 제품 자료, 상담 창구를 한 흐름으로
            정리한 브랜드 사이트입니다.
          </p>
          <div className="mt-8 grid gap-4 border-t border-white/10 pt-6 text-sm leading-7 text-white/62 sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">Address</p>
              <p className="mt-2">{companyInfo.address}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">Contact</p>
              <p className="mt-2">
                전화 {companyInfo.telephoneDisplay}
                <br />
                휴대전화 {companyInfo.mobileDisplay}
                <br />
                이메일 {companyInfo.emailDisplay}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">Pages</p>
            <nav className="mt-5 grid gap-3 text-sm text-white/76">
              {NAV_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-[var(--accent-soft)]">
                  {item.label}
                </Link>
              ))}
              <Link href="/admin" className="hover:text-[var(--accent-soft)]">
                관리자
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/42">Resources</p>
            <div className="mt-5 grid gap-4 text-sm text-white/76">
              <Link href="/contact" className="hover:text-[var(--accent-soft)]">
                제품 상담 요청
              </Link>
              <Link href="/products" className="hover:text-[var(--accent-soft)]">
                제품 자료 보기
              </Link>
              <Link href="/company-brochure.hwp" className="hover:text-[var(--accent-soft)]">
                회사 소개서
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-wrap flex flex-col gap-3 py-5 text-xs text-white/46 md:flex-row md:items-center md:justify-between">
          <p>{companyInfo.legalName}</p>
          <p>Updated {companyInfo.publicRecordUpdatedAt}</p>
        </div>
      </div>
    </footer>
  );
}
