/**
 * Scattered icon layout config for hero category tiles.
 *
 * Each key maps to a category `id` from `HERO_CATEGORIES` / `TOPUP_CATEGORIES`.
 * A category present here renders its heroImages as overlapping, rotated icons
 * instead of the default stacked layout.
 *
 * Slot fields
 * ───────────
 * right   – CSS right offset  (e.g. "8px")
 * top     – CSS top offset    (e.g. "6px")
 * rotate  – CSS rotation      (e.g. "12deg" | "-8deg")
 * maxSize – bounding box in px; the image scales to fit while keeping its
 *           natural aspect ratio (use a larger value for bigger icons)
 * z       – z-index within the scattered group
 */
export type ScatteredSlot = {
  right: string;
  top: string;
  rotate: string;
  /** Max width/height constraint in px. Image preserves natural aspect ratio. */
  maxSize: number;
  z: number;
};

export const SCATTERED_LAYOUTS: Record<string, ScatteredSlot[]> = {
  // ── Topup tab ──────────────────────────────────────────────────────────────
  services: [
    { right: "8px", top: "6px", rotate: "12deg", maxSize: 52, z: 5 },
    { right: "62px", top: "4px", rotate: "-8deg", maxSize: 48, z: 4 },
    { right: "22px", top: "62px", rotate: "-14deg", maxSize: 50, z: 3 },
    { right: "76px", top: "58px", rotate: "10deg", maxSize: 46, z: 2 },
    { right: "138px", top: "28px", rotate: "6deg", maxSize: 50, z: 1 },
  ],

  // ── Digital tab ────────────────────────────────────────────────────────────
  "gift-cards": [
    { right: "6px", top: "8px", rotate: "14deg", maxSize: 50, z: 3 },
    { right: "52px", top: "4px", rotate: "-10deg", maxSize: 46, z: 2 },
    { right: "28px", top: "58px", rotate: "-6deg", maxSize: 48, z: 1 },
  ],
  software: [
    { right: "8px", top: "10px", rotate: "-12deg", maxSize: 50, z: 2 },
    { right: "56px", top: "50px", rotate: "8deg", maxSize: 46, z: 1 },
  ],
};
