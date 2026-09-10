"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";

type HomeLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick"> & {
  onNavigate?: () => void;
};

export default function HomeLink({ onNavigate, ...props }: HomeLinkProps) {
  const pathname = usePathname();

  if (pathname !== "/") {
    return <Link {...props} href="/#home-main" onNavigate={onNavigate} />;
  }

  // Native anchors also scroll when the URL already has the same hash.
  return (
    <a
      {...props}
      href="#home-main"
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.ctrlKey ||
          event.metaKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        onNavigate?.();
      }}
    />
  );
}
