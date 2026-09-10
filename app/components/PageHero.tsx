import Link from "next/link";
import type { ReactNode } from "react";

export default function PageHero({
  label,
  title,
  description,
  children,
  aside,
}: {
  label: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="site-container">
        <nav aria-label="현재 위치" className="page-breadcrumb">
          <Link href="/" className="py-2 hover:underline">
            홈
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{label}</span>
        </nav>
        <div className={aside ? "page-hero-grid" : undefined}>
          <div>
            <p className="eyebrow">{label}</p>
            <h1 className="page-hero-title font-display">{title}</h1>
            <p className="page-hero-description">{description}</p>
            {children}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
