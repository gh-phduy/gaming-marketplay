"use client";

import { useLayoutEffect } from "react";
import { HOME_CATEGORY_SCROLL_KEY } from "./home-scroll-restoration";

const MAX_RESTORE_DURATION = 900;
const STABLE_FRAME_TARGET = 4;
const HEIGHT_TOLERANCE = 4;

export default function HomeScrollRestoration() {
  useLayoutEffect(() => {
    const savedScrollY = window.sessionStorage.getItem(
      HOME_CATEGORY_SCROLL_KEY,
    );

    if (!savedScrollY) return;

    const scrollY = Number(savedScrollY);
    if (!Number.isFinite(scrollY)) {
      window.sessionStorage.removeItem(HOME_CATEGORY_SCROLL_KEY);
      return;
    }

    const body = document.body;
    const previousVisibility = body.style.visibility;
    const previousOpacity = body.style.opacity;
    const previousTransition = body.style.transition;
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    const startTime = performance.now();
    let lastScrollHeight = document.documentElement.scrollHeight;
    let stableFrames = 0;
    let frameId = 0;
    let revealTimer = 0;

    body.style.visibility = "hidden";
    body.style.opacity = "0";
    body.style.transition = "none";
    document.documentElement.style.scrollBehavior = "auto";

    const restoreScroll = () => {
      window.scrollTo({ top: scrollY, left: 0, behavior: "auto" });
    };

    const reveal = () => {
      window.sessionStorage.removeItem(HOME_CATEGORY_SCROLL_KEY);
      restoreScroll();

      body.style.visibility = previousVisibility;
      body.style.transition = "opacity 140ms ease";
      body.style.opacity = previousOpacity || "1";
      document.documentElement.style.scrollBehavior = previousScrollBehavior;

      revealTimer = window.setTimeout(() => {
        body.style.transition = previousTransition;
      }, 160);
    };

    const waitForStableLayout = () => {
      restoreScroll();

      const nextScrollHeight = document.documentElement.scrollHeight;
      if (Math.abs(nextScrollHeight - lastScrollHeight) <= HEIGHT_TOLERANCE) {
        stableFrames += 1;
      } else {
        stableFrames = 0;
        lastScrollHeight = nextScrollHeight;
      }

      const elapsed = performance.now() - startTime;
      if (stableFrames >= STABLE_FRAME_TARGET || elapsed >= MAX_RESTORE_DURATION) {
        reveal();
        return;
      }

      frameId = window.requestAnimationFrame(waitForStableLayout);
    };

    restoreScroll();
    frameId = window.requestAnimationFrame(waitForStableLayout);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(revealTimer);
      body.style.visibility = previousVisibility;
      body.style.opacity = previousOpacity;
      body.style.transition = previousTransition;
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    };
  }, []);

  return null;
}
