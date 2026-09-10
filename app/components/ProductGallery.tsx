"use client";

import { useState } from "react";

import LightboxImage from "./LightboxImage";

export default function ProductGallery({
  name,
  images,
}: {
  name: string;
  images: readonly { src: string; label: string }[];
}) {
  const [selected, setSelected] = useState(0);
  const current = images[selected];
  if (!current) return null;

  return (
    <div className="product-gallery">
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
          <LightboxImage
            key={current.src}
            src={current.src}
            alt={name + " " + current.label}
            fill
            sizes="(min-width: 1024px) 460px, 90vw"
            className="object-contain p-4"
          />
        </div>
        <figcaption aria-live="polite">
          {name} · {current.label}
        </figcaption>
      </figure>
      <p className="source-note">이미지를 누르면 크게 볼 수 있습니다.</p>
    </div>
  );
}
