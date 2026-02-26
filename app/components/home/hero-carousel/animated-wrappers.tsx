"use client";

/**
 * Animated wrapper components for HeroCarousel.
 *
 * Each component owns its AnimatePresence + motion element so the parent
 * component (HeroCarousel) stays focused on layout and data flow.
 *
 * Usage pattern:
 *   <HeroAnimatedTitle activeTab={activeTab} className="...">
 *     {content}
 *   </HeroAnimatedTitle>
 */

import { type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  heroFadeSlideUp,
  heroFadeSlideUpDelayed,
  heroFadeSlideUpSubtle,
  heroFadeSlideFromRight,
} from "./animations";
import type { HeroTab } from "./types";

// ─── Text Copy ─────────────────────────────────────────────────────────────────

export function HeroAnimatedTitle({
  activeTab,
  className,
  children,
}: {
  activeTab: HeroTab;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.h1
        key={`title-${activeTab}`}
        className={className}
        variants={heroFadeSlideUp}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.h1>
    </AnimatePresence>
  );
}

export function HeroAnimatedDescription({
  activeTab,
  className,
  children,
}: {
  activeTab: HeroTab;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.p
        key={`desc-${activeTab}`}
        className={className}
        variants={heroFadeSlideUpDelayed}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.p>
    </AnimatePresence>
  );
}

// ─── Media Row ─────────────────────────────────────────────────────────────────

export function HeroAnimatedSlides({
  activeTab,
  children,
}: {
  activeTab: HeroTab;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`slides-${activeTab}`}
        className="h-full min-w-0"
        variants={heroFadeSlideUpSubtle}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function HeroAnimatedSideBanner({
  activeTab,
  children,
}: {
  activeTab: HeroTab;
  children: ReactNode;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={`side-banner-${activeTab}`}
        className="hidden h-full lg:block"
        variants={heroFadeSlideFromRight}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
