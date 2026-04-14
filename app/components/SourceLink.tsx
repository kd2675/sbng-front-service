"use client";

import Link from "next/link";

type SourceLinkProps = {
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
};

export default function SourceLink({
  href,
  className,
  target,
  rel,
  children,
}: SourceLinkProps) {
  const internal = href.startsWith("/");

  return (
    <Link
      href={href}
      className={className}
      prefetch={internal ? undefined : false}
      target={target ?? (internal ? undefined : "_blank")}
      rel={rel ?? (internal ? undefined : "noreferrer")}
    >
      {children}
    </Link>
  );
}
