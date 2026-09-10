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
    let resizeFrame = 0;

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
              String(entry.isIntersecting),
            );
          });
        },
        {
          threshold: 0.05,
          // Use viewport height: percentage root margins are based on width.
          rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.55)}px 0px`,
        },
      );
      photos?.forEach((photo) => observer?.observe(photo));
    }

    function onResize() {
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(observePhotos);
    }

    observePhotos();
    window.addEventListener("resize", onResize);
    reduceMotion.addEventListener("change", observePhotos);
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(resizeFrame);
      window.removeEventListener("resize", onResize);
      reduceMotion.removeEventListener("change", observePhotos);
    };
  }, []);

  return (
    <ol ref={timelineRef} className="history-timeline">
      {children}
    </ol>
  );
}
