"use client";

import { useEffect, useState, ReactElement } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";

interface CarouselProductProps {
  children: ReactElement[];
  className?: string;
}

export default function CarouselProduct({
  children,
  className = "",
}: CarouselProductProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Sử dụng children.length thay vì items cố định
  const itemsLength = children.length;

  useEffect(() => {
    if (!api) return;

    // Set initial position to center
    const centerIndex = Math.floor(itemsLength / 2);
    api.scrollTo(centerIndex);
    setCurrent(centerIndex);

    // Listen for selection changes (khi snap xong)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api, itemsLength]);

  return (
    <div className={`relative overflow-visible ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          loop: true,
          skipSnaps: false,
          duration: 25, // Tăng tốc độ transition để mượt hơn
          startIndex: Math.floor(itemsLength / 2), // Bắt đầu từ giữa
        }}
        className="w-full overflow-visible"
      >
        <div className="carousel-content-wrapper overflow-visible">
          <CarouselContent className="mx-4 overflow-visible">
            {children.map((child, index) => (
              <CarouselItem
                key={index}
                className="basis-auto overflow-visible pl-2 md:pl-4"
              >
                {child}
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
}
