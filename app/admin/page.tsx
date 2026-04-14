import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import AdminDashboardClient from "./AdminDashboardClient";
import AdminLoginClient from "./AdminLoginClient";
import { ADMIN_COOKIE_NAME, isAdminSessionValue } from "@/app/adminAuth";
import { getContactSubmissions } from "@/app/contactStore";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";

export const metadata: Metadata = {
  title: "문의 관리",
  description: "수북농업 문의 접수 관리 페이지",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = isAdminSessionValue(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  const submissions = isAuthenticated ? await getContactSubmissions() : [];

  return (
    <div className="page-shell bg-background text-foreground">
      <SiteNav />

      <main className="pt-28">
        <section className="section-wrap py-12 md:py-16">
          <div className="grid gap-4 border-b border-[var(--line)] pb-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <p className="section-kicker">Admin</p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.94] text-foreground">
                문의 운영 화면
              </h1>
              <p className="mt-5 max-w-[38rem] text-sm leading-8 text-[var(--muted)]">
                접수 상태 확인, 검색, 로그아웃을 한 화면에서 처리하는 운영용 페이지입니다.
              </p>
            </div>
            <div className="grid gap-3 text-sm leading-7 text-[var(--muted)]">
              <p>검색 기준 고객명, 연락처, 이메일, 문의 내용</p>
              <p>데이터 소스 로컬 JSON 저장소</p>
              <Link
                href="/contact"
                className="inline-flex min-h-11 w-fit items-center justify-center rounded-[8px] border border-[var(--line-strong)] px-4 py-3 text-sm font-medium text-foreground hover:border-foreground"
              >
                문의 페이지로 이동
              </Link>
            </div>
          </div>
        </section>

        <section className="section-wrap pb-20 md:pb-24">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-t border-[var(--line)] pt-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                Operator Access
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-foreground">
                운영자 로그인
              </h2>
              <p className="mt-4 text-sm leading-8 text-[var(--muted)]">
                비밀번호 인증 후 접수 목록이 열립니다.
              </p>
              {isAuthenticated ? (
                <div className="mt-6 rounded-[8px] border border-[var(--line)] bg-white px-4 py-4 text-sm leading-7 text-[var(--muted)]">
                  로그인되었습니다. 오른쪽 목록에서 접수 현황을 확인할 수 있습니다.
                </div>
              ) : (
                <AdminLoginClient />
              )}
            </div>

            <section>
              {isAuthenticated ? (
                <AdminDashboardClient submissions={submissions} />
              ) : (
                <div className="rounded-[8px] border border-dashed border-[var(--line-strong)] bg-white px-6 py-8 text-sm leading-7 text-[var(--muted)]">
                  로그인 후 문의 목록이 표시됩니다.
                </div>
              )}
            </section>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
