import type { Variants } from "framer-motion";

/**
 * Hero Carousel — Framer Motion animation layer.
 *
 * All enter/exit animations use the Variants pattern:
 *   hidden  → element before entering
 *   visible → settled state (transition embedded here)
 *   exit    → element leaving
 *
 * Components only need:
 *   variants={variant}  initial="hidden"  animate="visible"  exit="exit"
 *
 * Non-enter/exit transitions (layout spring, indicator glide) stay as plain
 * transition objects since they drive continuous/positional motion, not
 * enter-exit lifecycles.
 */

// ─── Enter / Exit Variants ────────────────────────────────────────────────────

/** Heading and text content fading in from below. */
export const heroFadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10 },
};

/** Description line — same shape as title but with a small stagger delay. */
export const heroFadeSlideUpDelayed: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", delay: 0.04 },
  },
  exit: { opacity: 0, y: -10 },
};

/** Slide panel container — subtler vertical offset than copy text. */
export const heroFadeSlideUpSubtle: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8 },
};

/** Side banner — enters/exits horizontally from the trailing edge. */
export const heroFadeSlideFromRight: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: "easeOut" },
  },
  exit: { opacity: 0, x: 10 },
};

// ─── Layout Transitions ───────────────────────────────────────────────────────

/** Spring that drives the hero grid height animation between tabs. */
export const HERO_GRID_TRANSITION = {
  height: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
  layout: { type: "spring", stiffness: 220, damping: 30, mass: 0.9 },
} as const;

/** Spring that keeps the category tiles row in sync during layout shifts. */
export const HERO_CATEGORY_TILES_TRANSITION = {
  type: "spring",
  stiffness: 200,
  damping: 28,
  mass: 0.9,
} as const;

// ─── Tab Indicator ────────────────────────────────────────────────────────────

/** Spring for the sliding active-tab pill. */
export const HERO_TABS_INDICATOR_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

/** Target position/size for the indicator per tab. */
export const HERO_TABS_INDICATOR_ANIMATE = {
  digital: { x: 0, width: "385px" },
  topup: { x: "calc(100% + 4px)", width: "385px" },
} as const;
