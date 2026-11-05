"use client";

import { useEffect, useRef, useState } from "react";

import LightboxImage from "./LightboxImage";

export default function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: readonly { src: string; label: string }[];
}) {
  const [selected, setSelected] = useState(0);
  const [nearViewport, setNearViewport] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    // Prepare only this product's display-sized images before it is reached.
    // Hidden alternatives otherwise start their first request after selection.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(gallery);
    return () => observer.disconnect();
  }, [images.length]);

  const current = images[selected];
  if (!current) return null;

  return (
    <div ref={galleryRef} className="product-gallery">
      <div
        className="product-image-options"
        role="group"
        aria-label={name + " 자료 선택"}
      >
        {images.map((item, index) => (
          <button
            key={item.src}
            type="button"
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <figure>
        <div className="product-main-image">
          {images.map((item, index) => (
            <div key={item.src} hidden={selected !== index}>
              <LightboxImage
                src={item.src}
                alt={name + " " + item.label}
                fill
                loading={nearViewport ? "eager" : "lazy"}
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-contain p-4"
              />
            </div>
          ))}
        </div>
        <figcaption aria-live="polite">
          {name} · {current.label}
        </figcaption>
      </figure>
      <p className="source-note">이미지를 누르면 크게 볼 수 있습니다.</p>
    </div>
  );
}
