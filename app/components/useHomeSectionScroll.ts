"use client";

import { useEffect, useState } from "react";

import { createHomeWheelGesture, getHomeScrollTarget } from "../homeScroll";

const WHEEL_THRESHOLD = 48;

export function useHomeSectionScroll(sectionIds: readonly string[]) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wheelGesture = createHomeWheelGesture();
    let frame = 0;
    let switching = false;
    let transitionOrigin = 0;
    let transitionTarget = 0;
    let transitionFrame = 0;
    let lastDirection = 0;
    let accumulatedWheel = 0;

    function update() {
      frame = 0;
      const marker = Math.min(window.innerHeight * 0.4, 240);
      let current = 0;
      elements.forEach((element, index) => {
        if (element.getBoundingClientRect().top <= marker) current = index;
      });
      setActiveIndex(current);
    }
    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }
    function finishTransition() {
      switching = false;
      window.cancelAnimationFrame(transitionFrame);
    }
    function onScrollEnd() {
      // A previous movement can report scrollend after a new one has started.
      if (Math.abs(window.scrollY - transitionTarget) <= 1) finishTransition();
    }
    function startTransition(top: number) {
      finishTransition();
      transitionOrigin = window.scrollY;
      transitionTarget = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          top,
        ),
      );
      switching = true;
      let previousTop = window.scrollY;
      let lastMovedAt = performance.now();
      function watchTransition(now: number) {
        const currentTop = window.scrollY;
        if (Math.abs(currentTop - previousTop) > 0.5) lastMovedAt = now;
        previousTop = currentTop;
        if (
          Math.abs(currentTop - transitionTarget) <= 1 ||
          now - lastMovedAt > 160
        ) {
          finishTransition();
          return;
        }
        transitionFrame = window.requestAnimationFrame(watchTransition);
      }
      transitionFrame = window.requestAnimationFrame(watchTransition);
    }
    function moveTo(top: number) {
      if (Math.abs(window.scrollY - top) <= 2) return;
      startTransition(top);
      window.scrollTo({
        top: transitionTarget,
        behavior: reduceMotion.matches ? "instant" : "smooth",
      });
    }
    function targetFor(direction: 1 | -1, step: number) {
      return getHomeScrollTarget({
        sections: elements.map((element) => {
          const rect = element.getBoundingClientRect();
          return { top: window.scrollY + rect.top, height: rect.height };
        }),
        scrollTop: window.scrollY,
        viewportHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
        direction,
        step,
      });
    }
    function hasNativeScroller(target: EventTarget | null) {
      let element = target instanceof Element ? target : null;
      while (element && element !== document.body) {
        const overflow = getComputedStyle(element).overflowY;
        if (
          (overflow === "auto" || overflow === "scroll") &&
          element.scrollHeight > element.clientHeight + 2
        )
          return true;
        element = element.parentElement;
      }
      return false;
    }
    function onWheel(event: WheelEvent) {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        Math.abs(event.deltaY) <= Math.abs(event.deltaX) ||
        document.querySelector("dialog[open]") ||
        hasNativeScroller(event.target)
      )
        return;

      event.preventDefault();
      const delta =
        event.deltaY *
        (event.deltaMode === 1
          ? 16
          : event.deltaMode === 2
            ? window.innerHeight
            : 1);
      const direction = delta > 0 ? 1 : -1;
      if (direction !== lastDirection) accumulatedWheel = 0;
      lastDirection = direction;
      const distance = wheelGesture.read(delta, performance.now());
      if (switching) {
        wheelGesture.consume();
        if (
          distance &&
          direction !== Math.sign(transitionTarget - transitionOrigin)
        )
          moveTo(transitionOrigin);
        return;
      }
      if (!distance) return;

      const target = targetFor(direction, Math.abs(distance));
      if (target.kind === "content") {
        accumulatedWheel = 0;
        if (target.atBoundary) wheelGesture.consume();
        window.scrollTo({ top: target.top, behavior: "instant" });
        return;
      }
      accumulatedWheel += distance;
      if (Math.abs(accumulatedWheel) < WHEEL_THRESHOLD) return;
      accumulatedWheel = 0;
      wheelGesture.consume();
      moveTo(target.top);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.isComposing ||
        document.querySelector("dialog[open]") ||
        (event.target instanceof Element &&
          event.target.closest(
            "input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='textbox']",
          ))
      )
        return;
      if (
        event.key === " " &&
        event.target instanceof Element &&
        event.target.closest("a,button,[role='button']")
      )
        return;
      const down =
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        (event.key === " " && !event.shiftKey);
      const up =
        event.key === "ArrowUp" ||
        event.key === "PageUp" ||
        (event.key === " " && event.shiftKey);
      if (!down && !up && event.key !== "Home" && event.key !== "End") return;
      event.preventDefault();
      wheelGesture.consume();
      if (event.key === "Home" || event.key === "End") {
        moveTo(
          event.key === "Home"
            ? 0
            : document.documentElement.scrollHeight - window.innerHeight,
        );
        return;
      }
      if (switching) {
        if ((down ? 1 : -1) !== Math.sign(transitionTarget - transitionOrigin))
          moveTo(transitionOrigin);
        return;
      }
      const step = event.key.startsWith("Arrow")
        ? 96
        : window.innerHeight * 0.85;
      const target = targetFor(down ? 1 : -1, step);
      moveTo(target.top);
    }
    function onAnchorClick(event: MouseEvent) {
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element ? event.target.closest("a") : null;
      const href = anchor?.getAttribute("href");
      const index = href?.startsWith("#")
        ? sectionIds.indexOf(href.slice(1))
        : -1;
      if (index < 0) return;
      wheelGesture.consume();
      startTransition(
        window.scrollY + elements[index].getBoundingClientRect().top,
      );
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", schedule);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onAnchorClick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(transitionFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onAnchorClick);
    };
  }, [sectionIds]);

  return activeIndex;
}
