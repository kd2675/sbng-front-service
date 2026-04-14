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
    <div className="min-h-screen bg-[var(--agri-paper)]">
      <SiteNav />

      <main className="px-5 pb-24 pt-20 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            Admin
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-6xl">
            문의 관리
          </h1>
          <p className="mt-4 max-w-3xl leading-relaxed text-[#506350]">
            접수된 문의를 확인하고 상담 대응을 이어가는 운영 화면입니다.
          </p>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <article className="rounded-[2rem] border border-black/8 bg-white p-8 shadow-[0_18px_52px_rgba(12,26,12,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--agri-primary-deep)]">
              Operator
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[var(--agri-ink)]">운영자 로그인</h2>
            <p className="mt-4 leading-relaxed text-[#536952]">
              비밀번호 입력 후 접수된 문의 목록을 조회합니다.
            </p>
            {isAuthenticated ? (
              <div className="mt-8 rounded-2xl bg-[#f5f8f1] px-5 py-4 text-sm leading-relaxed text-[#50674f]">
                로그인되었습니다. 오른쪽에서 접수된 문의를 확인해 주세요.
              </div>
            ) : (
              <AdminLoginClient />
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full border border-black/12 px-5 py-3 text-sm font-bold text-[var(--agri-ink)] transition hover:bg-black/4"
              >
                문의 페이지로 이동
              </Link>
            </div>
          </article>

          <section>
            {isAuthenticated ? (
              <AdminDashboardClient submissions={submissions} />
            ) : (
              <div className="rounded-[2rem] border border-dashed border-black/12 bg-[#f5f8f1] px-8 py-10 text-[#5a7158]">
                로그인 후 문의 목록이 표시됩니다.
              </div>
            )}
          </section>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
