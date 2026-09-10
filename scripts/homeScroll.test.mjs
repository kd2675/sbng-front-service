import assert from "node:assert/strict";
import test from "node:test";

import {
  createHomeWheelGesture,
  getHomeScrollTarget,
} from "../app/homeScroll.ts";

function input(scrollTop, direction = 1, step = 120) {
  return {
    sections: [
      { top: 0, height: 800 },
      { top: 800, height: 1600 },
      { top: 2400, height: 800 },
    ],
    scrollTop,
    viewportHeight: 800,
    documentHeight: 3600,
    direction,
    step,
  };
}

test("homeScroll_shortSection_movesToNextSection", () => {
  assert.deepEqual(getHomeScrollTarget(input(0)), {
    top: 800,
    kind: "section",
    atBoundary: true,
  });
});
test("homeScroll_longSection_keepsScrollingItsContent", () => {
  assert.deepEqual(getHomeScrollTarget(input(800)), {
    top: 920,
    kind: "content",
    atBoundary: false,
  });
});
test("homeScroll_largeWheelAtContentEnd_doesNotSkipRemainingContent", () => {
  assert.deepEqual(getHomeScrollTarget(input(1540, 1, 2000)), {
    top: 1600,
    kind: "content",
    atBoundary: true,
  });
});
test("homeScroll_contentFullyRead_movesToNextSection", () => {
  assert.deepEqual(getHomeScrollTarget(input(1600)), {
    top: 2400,
    kind: "section",
    atBoundary: true,
  });
});
test("homeScroll_upFromNextSection_returnsToPreviousContentEnd", () => {
  assert.deepEqual(getHomeScrollTarget(input(2400, -1)), {
    top: 1600,
    kind: "section",
    atBoundary: true,
  });
});
test("homeScroll_upInsideLongSection_keepsItsEarlierContentReachable", () => {
  assert.deepEqual(getHomeScrollTarget(input(1200, -1)), {
    top: 1080,
    kind: "content",
    atBoundary: false,
  });
});
test("homeScroll_lastSection_keepsFooterReachable", () => {
  assert.deepEqual(getHomeScrollTarget(input(2400)), {
    top: 2800,
    kind: "section",
    atBoundary: true,
  });
});
test("homeScroll_upFromFooter_returnsToLastSection", () => {
  assert.deepEqual(getHomeScrollTarget(input(2800, -1)), {
    top: 2400,
    kind: "section",
    atBoundary: true,
  });
});
test("homeScroll_firstSection_cannotScrollAboveDocument", () => {
  assert.deepEqual(getHomeScrollTarget(input(0, -1)), {
    top: 0,
    kind: "section",
    atBoundary: true,
  });
});

test("homeWheel_repeatedNotches_releasesContentBoundaryWithoutAPause", () => {
  const gesture = createHomeWheelGesture();
  gesture.read(120, 0);
  gesture.consume();
  assert.equal(gesture.read(120, 80), 120);
});
test("homeWheel_fadingMomentum_doesNotStartAnotherSection", () => {
  const gesture = createHomeWheelGesture();
  gesture.read(120, 0);
  gesture.consume();
  assert.deepEqual(
    [100, 80, 60, 40, 20, 6, 6, 6, 6].map((delta, index) =>
      gesture.read(delta, (index + 1) * 16),
    ),
    Array(9).fill(0),
  );
});
test("homeWheel_continuedTrackpadInput_releasesWithoutAPause", () => {
  const gesture = createHomeWheelGesture();
  gesture.read(16, 0);
  gesture.consume();
  assert.deepEqual(
    [16, 16, 16].map((delta, index) => gesture.read(delta, (index + 1) * 16)),
    [0, 0, 48],
  );
});
test("homeWheel_directionReversal_respondsImmediately", () => {
  const gesture = createHomeWheelGesture();
  gesture.read(120, 0);
  gesture.consume();
  assert.equal(gesture.read(-120, 16), -120);
});
test("homeWheel_newGesture_acceptsSmallInput", () => {
  const gesture = createHomeWheelGesture();
  gesture.read(120, 0);
  gesture.consume();
  assert.equal(gesture.read(4, 200), 4);
});
test("homeWheel_trackpadAcceleratesAgain_acceptsRenewedIntent", () => {
  const gesture = createHomeWheelGesture();
  gesture.read(120, 0);
  gesture.consume();
  gesture.read(30, 16);
  assert.deepEqual(
    [12, 24, 36].map((delta, index) => gesture.read(delta, (index + 2) * 16)),
    [0, 0, 60],
  );
});
