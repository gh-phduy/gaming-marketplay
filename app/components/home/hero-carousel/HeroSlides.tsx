import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { HERO_SLIDES, HERO_SLIDES_TOPUP } from "@/lib/constants/hero";
import type { HeroSlidesProps } from "./types";

/**
 * Main hero slideshow. Keeps embla config local while receiving active tab
 * and pagination state from parent container.
 */
export function HeroSlides({
  setApi,
  current,
  onIndicatorClick,
  activeTab,
}: HeroSlidesProps) {
  const slides = activeTab === "digital" ? HERO_SLIDES : HERO_SLIDES_TOPUP;
  return (
    // overflow-hidden + rounded-3xl clips ALL slides during Embla's
    // CSS-transform-based transition — the only reliable fix for square corners.
    <div className="relative h-full w-full overflow-hidden rounded-3xl">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: true,
          }),
        ]}
        className="h-full w-full"
      >
        <CarouselContent className="h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="h-full">
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.alt || slide.id}
                  fill
                  sizes="(max-width: 499px) 100vw, (max-width: 1199px) 96vw, (min-width: 1920px) 1050px, (min-width: 1640px) 863px, (min-width: 1200px) 760px, 100vw"
                  className="pointer-events-none object-cover"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 h-9 w-9 border-none bg-black/40 text-white shadow-xl backdrop-blur-md transition-all hover:bg-black/60 active:scale-95 min-[500px]:left-6 min-[500px]:h-12 min-[500px]:w-12" />
        <CarouselNext className="right-3 h-9 w-9 border-none bg-black/40 text-white shadow-xl backdrop-blur-md transition-all hover:bg-black/60 active:scale-95 min-[500px]:right-6 min-[500px]:h-12 min-[500px]:w-12" />
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-md min-[500px]:bottom-6 min-[500px]:gap-2 min-[500px]:px-3 min-[500px]:py-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndicatorClick(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-300 min-[500px]:h-1.5",
                current === index
                  ? "w-6 bg-[#ccff00] min-[500px]:w-8"
                  : "w-1.5 bg-white/30 hover:bg-white/60 min-[500px]:w-2",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
