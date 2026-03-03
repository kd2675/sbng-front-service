"use client";

import { useEffect, useRef, useState } from "react";

type ColorShiftImageProps = {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  grayContainerClassName?: string;
  colorContainerClassName?: string;
};

export default function ColorShiftImage({
  src,
  alt,
  containerClassName = "",
  imageClassName = "",
  grayContainerClassName = "",
  colorContainerClassName = "",
}: ColorShiftImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isColored, setIsColored] = useState(false);

  useEffect(() => {
    const node = wrapperRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsColored(entry.isIntersecting);
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -55% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`${containerClassName} transition-transform duration-700 ease-out ${
        isColored ? colorContainerClassName : grayContainerClassName
      }`}
    >
      <img
        alt={alt}
        src={src}
        className={`h-full w-full object-cover transition-[filter] duration-700 ease-out ${
          isColored
            ? "grayscale-0 sepia-0 contrast-100 brightness-100 saturate-100"
            : "grayscale-[0.78] sepia-[0.36] contrast-70 brightness-75 saturate-40"
        } ${imageClassName}`}
      />
    </div>
  );
}
