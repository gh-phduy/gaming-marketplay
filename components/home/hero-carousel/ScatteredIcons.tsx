import Image from "next/image";
import { SCATTERED_LAYOUTS } from "./scattered-layouts";

interface ScatteredIconsProps {
  categoryId: string;
  heroImages: string[];
  title: string;
}

/**
 * Variant image renderer used for categories listed in `SCATTERED_LAYOUTS`.
 * Renders heroImages as overlapping, individually rotated icons.
 * Each icon retains its natural aspect ratio — `maxSize` only constrains
 * the bounding box, it never squashes the image into a square.
 *
 * Layout positions & rotations are defined per-category in `scattered-layouts.ts`.
 */
export function ScatteredIcons({
  categoryId,
  heroImages,
  title,
}: ScatteredIconsProps) {
  const slots = SCATTERED_LAYOUTS[categoryId];
  if (!slots) return null;

  return (
    <div className="absolute inset-y-0 right-0 z-10 w-[60%]">
      <div className="relative h-full w-full">
        {slots.map((slot, idx) => {
          const src = heroImages[idx];
          if (!src) return null;

          return (
            <div
              key={`${categoryId}-${idx}`}
              className="absolute transition-all duration-300 group-hover:scale-110"
              style={{
                right: slot.right,
                top: slot.top,
                zIndex: slot.z,
                transform: `rotate(${slot.rotate})`,
              }}
            >
              {/*
               * No fixed height wrapper — the Image renders at its natural
               * aspect ratio, bounded only by maxSize on the longest axis.
               */}
              <Image
                src={src}
                alt={`${title} ${idx + 1}`}
                width={slot.maxSize}
                height={slot.maxSize}
                className="object-contain"
                style={{ width: slot.maxSize, height: "auto" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
