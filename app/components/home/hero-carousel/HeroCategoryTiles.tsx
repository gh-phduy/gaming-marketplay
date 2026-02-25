import Image from "next/image";
import Link from "next/link";
import { Monitor, Package, CreditCard, Gamepad2 } from "lucide-react";
import { HERO_CATEGORIES, TOPUP_CATEGORIES } from "@/lib/constants/hero";
import { SCATTERED_LAYOUTS } from "./scattered-layouts";
import { ScatteredIcons } from "./ScatteredIcons";
import { StackedImages } from "./StackedImages";

const ICON_MAP = {
  monitor: Monitor,
  "gamepad-2": Gamepad2,
  "credit-card": CreditCard,
  package: Package,
} as const;

interface HeroCategoryTilesProps {
  activeTab: "digital" | "topup";
}

export function HeroCategoryTiles({ activeTab }: HeroCategoryTilesProps) {
  const isTopup = activeTab === "topup";
  const categories = isTopup ? TOPUP_CATEGORIES : HERO_CATEGORIES;

  if (isTopup) {
    return (
      <div className="grid grid-cols-1 gap-4 1100:grid-cols-3">
        {categories.map((category) => {
          const IconComponent =
            ICON_MAP[category.icon as keyof typeof ICON_MAP] ?? Monitor;
          const isScattered = category.id in SCATTERED_LAYOUTS;

          return (
            <Link
              key={category.id}
              href={category.link}
              className="group relative h-[134px] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-lg backdrop-blur-sm transition-transform hover:scale-[1.01]"
            >
              <div className="relative h-full w-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="520px"
                />
                <div className="absolute inset-0 bg-black/15" />

                <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-center gap-2 px-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/20 ring-1 ring-white/30 backdrop-blur-md">
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="max-w-[62%] text-xs leading-tight font-bold tracking-wide text-white uppercase drop-shadow-lg">
                    {category.title}
                  </h3>
                </div>

                {isScattered ? (
                  <ScatteredIcons
                    categoryId={category.id}
                    heroImages={category.heroImages}
                    title={category.title}
                  />
                ) : (
                  <StackedImages
                    categoryId={category.id}
                    heroImages={category.heroImages}
                    title={category.title}
                    sizes="300px"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {categories.map((category) => {
        const IconComponent =
          ICON_MAP[category.icon as keyof typeof ICON_MAP] ?? Monitor;
        const isScattered = category.id in SCATTERED_LAYOUTS;

        return (
          <Link
            key={category.id}
            href={category.link}
            className="group relative h-[108px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 shadow-lg backdrop-blur-sm transition-transform hover:scale-[1.01] md:h-[120px]"
          >
            <div className="relative h-full w-full">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/15" />

              <div className="absolute inset-y-0 left-0 z-20 flex flex-col justify-center gap-2 px-3 md:px-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/20 ring-1 ring-white/30 backdrop-blur-md md:h-8 md:w-8">
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
                <h3 className="max-w-[62%] text-[11px] leading-tight font-bold tracking-wide text-white uppercase drop-shadow-lg md:text-xs">
                  {category.title}
                </h3>
              </div>

              {isScattered ? (
                <ScatteredIcons
                  categoryId={category.id}
                  heroImages={category.heroImages}
                  title={category.title}
                />
              ) : (
                <StackedImages
                  categoryId={category.id}
                  heroImages={category.heroImages}
                  title={category.title}
                  sizes="(max-width: 1024px) 26vw, 14vw"
                />
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
