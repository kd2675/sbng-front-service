import type { Metadata } from "next";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

export const metadata: Metadata = {
  title: "문의하기",
  description: "수북농업 상담 문의 페이지입니다. 제품 및 농업 솔루션 상담을 받아보세요.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--agri-paper)]">
      <SiteNav />

      <main className="px-5 pb-20 pt-14 md:px-10 lg:px-20">
        <section className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--agri-primary-deep)]">
            Contact
          </p>
          <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[var(--agri-ink)] md:text-6xl">
            수북농업 상담 문의
          </h1>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-7 md:grid-cols-5">
          <div className="rounded-3xl border border-black/7 bg-white p-8 shadow-[0_14px_45px_rgba(12,26,12,0.06)] md:col-span-3">
            <h2 className="text-2xl font-bold text-[var(--agri-ink)]">
              Request a consultation
            </h2>
            <form className="mt-6 grid gap-4">
              <input
                className="rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="Name"
                type="text"
              />
              <input
                className="rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="Email"
                type="email"
              />
              <textarea
                className="min-h-36 rounded-2xl border border-black/10 bg-[var(--agri-paper)] px-4 py-3 outline-none ring-[var(--agri-primary)] focus:ring-2"
                placeholder="Tell us about your crop type and current challenge"
              />
              <button
                type="submit"
                className="mt-2 w-fit rounded-full bg-[var(--agri-primary)] px-7 py-3 font-bold text-[var(--agri-ink)] transition hover:bg-[#64e93f]"
              >
                Send Inquiry
              </button>
            </form>
          </div>

          <aside className="rounded-3xl border border-black/7 bg-white p-8 shadow-[0_14px_45px_rgba(12,26,12,0.06)] md:col-span-2">
            <h3 className="text-xl font-bold text-[var(--agri-ink)]">
              Regional Office
            </h3>
            <div className="mt-4 space-y-3 text-[#506350]">
              <p>120 Green Valley Road</p>
              <p>Salinas, CA 93901</p>
              <p>+1 (831) 555-0147</p>
              <p>hello@agrifert.example</p>
            </div>
            <p className="mt-6 rounded-2xl bg-[var(--agri-paper)] p-4 text-sm text-[#506350]">
              Typical response time: within 1 business day.
            </p>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
