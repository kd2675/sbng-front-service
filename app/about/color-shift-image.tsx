"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ColorShiftImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  containerClassName?: string;
  imageClassName?: string;
  grayContainerClassName?: string;
  colorContainerClassName?: string;
};

export default function ColorShiftImage({
  src,
  alt,
  sizes = "(min-width: 768px) 42vw, 100vw",
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
      className={`relative ${containerClassName} transition-transform duration-700 ease-out ${
        isColored ? colorContainerClassName : grayContainerClassName
      }`}
    >
      <Image
        alt={alt}
        src={src}
        fill
        sizes={sizes}
        className={`object-cover transition-[filter] duration-700 ease-out ${
          isColored
            ? "grayscale-0 sepia-0 contrast-100 brightness-100 saturate-100"
            : "grayscale-[0.78] sepia-[0.36] contrast-70 brightness-75 saturate-40"
        } ${imageClassName}`}
      />
    </div>
  );
}
