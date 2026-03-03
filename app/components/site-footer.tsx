import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";

export default function SiteFooter() {
  return (
    <footer className="border-t border-black/8 bg-white/60 px-5 py-10 md:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-[var(--agri-ink)]">
            수북농업
          </p>
          <p className="mt-1 text-sm text-[#5a6a57]">
            수북농업과 함께 생산성과 토양 건강을 높입니다.
          </p>
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
