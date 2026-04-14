"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallbackHref?: string;
  className?: string;
  children: React.ReactNode;
};

export default function BackButton({
  fallbackHref = "/",
  className,
  children,
}: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push(fallbackHref);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
