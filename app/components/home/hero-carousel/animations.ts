// ─── Hero Tabs Indicator ──────────────────────────────────────────────────────

/** Spring for the sliding active-tab pill. */
export const HERO_TABS_INDICATOR_TRANSITION = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

/** Target position/size for the indicator per tab. */
export const HERO_TABS_INDICATOR_ANIMATE = {
  digital: { x: 0, width: "calc((100% - 16px) / 2)" },
  topup: { x: "calc(100% + 4px)", width: "calc((100% - 16px) / 2)" },
} as const;
