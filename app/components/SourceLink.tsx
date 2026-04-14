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
  const browserExternal = href.startsWith("http://") || href.startsWith("https://");

  if (!internal) {
    return (
      <a
        href={href}
        className={className}
        target={target ?? (browserExternal ? "_blank" : undefined)}
        rel={rel ?? (browserExternal ? "noreferrer" : undefined)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      prefetch={undefined}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}
