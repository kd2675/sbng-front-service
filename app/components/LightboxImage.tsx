"use client";

import Image, { type ImageProps } from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type LightboxImageProps = ImageProps & {
  hideHint?: boolean;
  hintClassName?: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function LightboxImage({
  alt,
  className,
  hideHint = false,
  hintClassName,
  ...imageProps
}: LightboxImageProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={`${alt} 크게 보기`}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        className={
          imageProps.fill
            ? "absolute inset-0 block h-full w-full text-left"
            : "relative block h-full w-full text-left"
        }
      >
        <Image
          {...imageProps}
          alt={alt}
          className={joinClassNames(className, "cursor-zoom-in")}
        />
        {!hideHint ? (
          <span
            className={joinClassNames(
              "pointer-events-none absolute bottom-3 right-3 z-10 rounded-full border border-white/18 bg-black/55 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm",
              hintClassName,
            )}
          >
            크게 보기
          </span>
        ) : null}
      </button>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open ? (
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/88 px-4 py-6"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[1440px] rounded-[1.5rem] border border-white/10 bg-[#081006] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.4)] md:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 z-20 rounded-full border border-white/12 bg-black/40 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-black/55 md:right-4 md:top-4"
              >
                닫기
              </button>

              <div className="relative h-[min(80vh,1100px)] w-full overflow-hidden rounded-[1rem] bg-[#081006]">
                <Image
                  {...imageProps}
                  alt={alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/78">{alt}</p>
            </motion.div>
          </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
