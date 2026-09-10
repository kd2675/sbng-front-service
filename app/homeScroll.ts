type SectionPosition = { top: number; height: number };

type ScrollInput = {
  sections: readonly SectionPosition[];
  scrollTop: number;
  viewportHeight: number;
  documentHeight: number;
  direction: 1 | -1;
  step: number;
};

const EDGE_TOLERANCE = 2;

// Ignore a gesture's fading momentum, but allow repeated wheel notches and a
// renewed trackpad movement without requiring the user to stop scrolling.
export function createHomeWheelGesture() {
  let lastInputAt = -Infinity;
  let lastDelta = 0;
  let consumed = false;
  let renewedDistance = 0;

  return {
    read(delta: number, now: number) {
      const magnitude = Math.abs(delta);
      const previousMagnitude = Math.abs(lastDelta);
      const newGesture =
        now - lastInputAt > 180 || Math.sign(delta) !== Math.sign(lastDelta);
      lastInputAt = now;
      lastDelta = delta;

      if (newGesture) {
        consumed = false;
        renewedDistance = 0;
      }
      if (!consumed) return delta;

      if (magnitude < 8 || magnitude + 0.5 < previousMagnitude) {
        renewedDistance = 0;
        return 0;
      }
      renewedDistance += magnitude;
      if (renewedDistance < 48) return 0;

      consumed = false;
      const distance = renewedDistance * Math.sign(delta);
      renewedDistance = 0;
      return distance;
    },
    consume() {
      consumed = true;
      renewedDistance = 0;
    },
  };
}

export function getHomeScrollTarget({
  sections,
  scrollTop,
  viewportHeight,
  documentHeight,
  direction,
  step,
}: ScrollInput): {
  top: number;
  kind: "content" | "section";
  atBoundary: boolean;
} {
  const maxTop = Math.max(0, documentHeight - viewportHeight);
  const clamp = (top: number) => Math.max(0, Math.min(maxTop, top));
  const endOf = (section: SectionPosition) =>
    clamp(Math.max(section.top, section.top + section.height - viewportHeight));
  const last = sections[sections.length - 1];
  if (!last)
    return { top: clamp(scrollTop), kind: "section", atBoundary: true };

  // The shared footer remains reachable after the last full-height section.
  if (scrollTop > endOf(last) + EDGE_TOLERANCE) {
    return {
      top: direction > 0 ? maxTop : endOf(last),
      kind: "section",
      atBoundary: true,
    };
  }

  let index = 0;
  sections.forEach((section, candidate) => {
    if (section.top <= scrollTop + EDGE_TOLERANCE) index = candidate;
  });
  const current = sections[index];
  const start = clamp(current.top);
  const end = endOf(current);

  if (direction > 0 && scrollTop < end - EDGE_TOLERANCE) {
    const top = Math.min(end, scrollTop + Math.abs(step));
    return { top, kind: "content", atBoundary: top >= end - EDGE_TOLERANCE };
  }
  if (direction < 0 && scrollTop > start + EDGE_TOLERANCE) {
    const top = Math.max(start, scrollTop - Math.abs(step));
    return { top, kind: "content", atBoundary: top <= start + EDGE_TOLERANCE };
  }

  return {
    top:
      direction > 0
        ? clamp(sections[index + 1]?.top ?? maxTop)
        : index > 0
          ? endOf(sections[index - 1])
          : 0,
    kind: "section",
    atBoundary: true,
  };
}
