"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function HistoryTimeline({ children }: { children: ReactNode }) {
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const photos = timelineRef.current?.querySelectorAll<HTMLElement>(
      ".history-photo-frame",
    );
    if (!photos?.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    function observePhotos() {
      observer?.disconnect();
      if (reduceMotion.matches || !("IntersectionObserver" in window)) {
        photos?.forEach((photo) => photo.removeAttribute("data-in-view"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.setAttribute(
              "data-in-view",
              String(entry.isIntersecting && entry.intersectionRatio >= 1),
            );
          });
        },
        {
          // Start as soon as the whole photo enters from the viewport bottom.
          threshold: 1,
        },
      );
      photos?.forEach((photo) => observer?.observe(photo));
    }

    observePhotos();
    reduceMotion.addEventListener("change", observePhotos);
    return () => {
      observer?.disconnect();
      reduceMotion.removeEventListener("change", observePhotos);
    };
  }, []);

  return (
    <ol ref={timelineRef} className="history-timeline">
      {children}
    </ol>
  );
}
