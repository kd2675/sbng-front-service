import Link from "next/link";

import { getArchivedSourceHref } from "../articleArchive";

type SourceLinkProps = {
  href: string;
  className?: string;
  target?: string;
  rel?: string;
  showArchive?: boolean;
  children: React.ReactNode;
};

export default function SourceLink({
  href,
  className,
  target,
  rel,
  showArchive = false,
  children,
}: SourceLinkProps) {
  const internal = href.startsWith("/");
  const archiveHref = showArchive ? getArchivedSourceHref(href) : href;

  return (
    <>
      <Link
        href={href}
        className={className}
        prefetch={internal ? undefined : false}
        target={target ?? (internal ? undefined : "_blank")}
        rel={rel ?? (internal ? undefined : "noreferrer")}
      >
        {children}
      </Link>
      {archiveHref !== href && (
        <Link
          href={archiveHref}
          prefetch={false}
          className="ml-4 inline-flex min-h-11 items-center text-xs font-semibold text-[var(--agri-primary-deep)] underline underline-offset-4"
        >
          보관본 보기
        </Link>
      )}
    </>
  );
}
