"use client";
import Image, { type ImageProps } from "next/image";
import { useEffect, useId, useRef, useState } from "react";

type LightboxImageProps = ImageProps & {
  hideHint?: boolean;
  hintClassName?: string;
};

export default function LightboxImage({
  alt,
  className,
  hideHint = false,
  hintClassName = "",
  ...imageProps
}: LightboxImageProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef("");
  const ownsScrollLock = useRef(false);
  const [loaded, setLoaded] = useState(false);
  const captionId = useId();
  useEffect(
    () => () => {
      if (ownsScrollLock.current)
        document.body.style.overflow = previousOverflow.current;
    },
    [],
  );
  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={alt + " 크게 보기"}
        aria-haspopup="dialog"
        className={
          imageProps.fill
            ? "absolute inset-0 block h-full w-full text-left"
            : "relative block w-full text-left"
        }
        onClick={() => {
          setLoaded(true);
          previousOverflow.current = document.body.style.overflow;
          ownsScrollLock.current = true;
          dialogRef.current?.showModal();
          document.body.style.overflow = "hidden";
        }}
      >
        <Image
          {...imageProps}
          alt={alt}
          className={(className ?? "") + " cursor-zoom-in"}
        />
        {!hideHint && (
          <span
            className={
              "pointer-events-none absolute bottom-3 right-3 rounded-md bg-[#193e2d] px-3 py-1.5 text-xs font-semibold text-white " +
              hintClassName
            }
          >
            크게 보기 <span aria-hidden="true">↗</span>
          </span>
        )}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={captionId}
        className="image-dialog"
        onClose={() => {
          document.body.style.overflow = previousOverflow.current;
          ownsScrollLock.current = false;
          triggerRef.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <div onClick={(event) => event.stopPropagation()}>
          <div className="mb-3 flex items-center justify-between gap-4">
            <p id={captionId} className="text-sm">
              {alt}
            </p>
            <button
              type="button"
              autoFocus
              aria-label="이미지 닫기"
              className="btn shrink-0 border-white/40 text-white"
              onClick={() => dialogRef.current?.close()}
            >
              닫기 ×
            </button>
          </div>
          <div className="relative h-[min(70dvh,calc(100dvh-12rem),900px)]">
            {loaded && (
              <Image
                src={imageProps.src}
                alt={alt}
                fill
                sizes="(min-width: 1100px) 1050px, 95vw"
                className="object-contain"
              />
            )}
          </div>
          <p className="mt-3 text-center text-xs text-[#c6d4bf]">
            Esc 키 또는 닫기 버튼으로 돌아갈 수 있습니다.
          </p>
        </div>
      </dialog>
    </>
  );
}
