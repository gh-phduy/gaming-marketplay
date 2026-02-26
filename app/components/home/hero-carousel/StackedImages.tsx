import Image from "next/image";

interface StackedImagesProps {
  categoryId: string;
  heroImages: string[];
  title: string;
  /** Next.js `sizes` attribute — pass the appropriate breakpoint string for the context. */
  sizes: string;
}

/**
 * Default image renderer for categories without a scattered layout.
 * Images are absolutely positioned and offset horizontally to create
 * layered depth while preserving object-fit containment.
 */
export function StackedImages({
  categoryId,
  heroImages,
  title,
  sizes,
}: StackedImagesProps) {
  const slotWidth = `${100 / heroImages.length}%`;

  return (
    <div className="absolute inset-y-0 right-0 z-10 flex w-[58%] items-end justify-end pr-1">
      <div className="relative h-full w-[124%]">
        {heroImages.map((src, idx) => (
          <div
            key={`${categoryId}-${idx}`}
            className="absolute inset-y-0 right-0 transition-all duration-300 group-hover:scale-105"
            style={{
              width: slotWidth,
              right: `${idx * 10}%`,
              zIndex: idx,
            }}
          >
            <Image
              src={src}
              alt={`${title} hero ${idx + 1}`}
              fill
              className="object-contain object-right"
              sizes={sizes}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
