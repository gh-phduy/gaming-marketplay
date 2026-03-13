import { useState } from "react";
import Image from "next/image";
import { Monitor, ChevronLeft, ChevronRight } from "lucide-react";
import { FaXbox } from "react-icons/fa6";

interface ProductGalleryProps {
  images?: string[];
  name?: string;
  platform?: string;
}

export default function ProductGallery({
  images = ["/battlefield_6.jpg"],
  name = "Product Image",
  platform = "Xbox Series X/S",
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl sm:rounded-2xl lg:max-w-[780px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          className="object-cover transition-all duration-500"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 780px"
        />
        {/* Gradient overlay for better text/UI visibility */}
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Navigation arrows (only if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/60"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots indicator (only if multiple images) */}
      {images.length > 1 && (
        <div className="absolute top-4 right-4 flex gap-1.5">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                idx === activeIndex ? "w-4 bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div className="absolute right-0 bottom-0 left-0 flex h-11 items-center justify-center gap-2 border-t border-white/8 bg-black/30 px-3 sm:h-[60px] sm:gap-3 sm:px-6">
        <div className="flex items-center gap-2">
          <button className="flex h-9 w-11 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-white/10 active:scale-90">
            <Monitor className="h-4.5 w-4.5 text-gray-400" />
          </button>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/8 p-1 pr-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#107C10] shadow-[0_0_12px_rgba(16,124,16,0.3)]">
              <FaXbox className="h-4 w-4 text-white" />
            </div>
            <span className="text-[14px] font-medium tracking-tight text-white">
              {platform}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
