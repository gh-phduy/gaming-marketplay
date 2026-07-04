"use client";

import { useEffect, useRef, useState } from "react";

interface PriceChartSliderProps {
  minPrice: number;
  maxPrice: number;
  sliderMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export default function PriceChartSlider({
  minPrice,
  maxPrice,
  sliderMax,
  onPriceChange,
}: PriceChartSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  // Calculate percentages for visual slider
  const leftPercent = Math.min((minPrice / sliderMax) * 100, 100);
  const rightPercent = Math.min((maxPrice / sliderMax) * 100, 100);
  const widthPercent = Math.max(rightPercent - leftPercent, 0);

  // Handle Dragging Logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percent = Math.min(Math.max(offsetX / rect.width, 0), 1);
      let newValue = Math.round(percent * sliderMax);

      if (dragging === "min") {
        // Prevent crossing the max handle
        newValue = Math.min(newValue, maxPrice - 1);
        onPriceChange(Math.max(0, newValue), maxPrice);
      } else {
        // Prevent crossing the min handle
        newValue = Math.max(newValue, minPrice + 1);
        onPriceChange(minPrice, Math.min(sliderMax, newValue));
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, minPrice, maxPrice, sliderMax, onPriceChange]);

  return (
    <div className="px-1">
      {/* Market-style Area Chart with Visual Slider */}
      <div className="relative h-16 w-full select-none">
        {/* SVG Area Chart */}
        <svg
          viewBox="0 0 100 40"
          className="absolute bottom-1.5 left-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#46ca43" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#46ca43" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path
            d="M0 40 L0 5 Q 10 20, 30 25 T 50 28 T 80 27 L 100 27 L 100 40 Z"
            fill="url(#chartGradient)"
            stroke="none"
          />
          <path
            d="M0 5 Q 10 20, 30 25 T 50 28 T 80 27 L 100 27"
            fill="none"
            stroke="#5aca5a"
            strokeWidth="2"
          />
        </svg>

        {/* Slider Track Container */}
        <div
          ref={sliderRef}
          className="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-[#3e4654]"
        >
          {/* Active Green Track */}
          <div
            className="absolute inset-y-0 rounded-full bg-[#5aca5a]"
            style={{
              left: `${leftPercent}%`,
              width: `${widthPercent}%`,
            }}
          ></div>

          {/* Left Handle */}
          <div
            className="absolute top-1/2 -ml-2.5 h-5 w-5 -translate-y-1/2 cursor-grab rounded-full bg-[#5aca5a] shadow-md ring-2 ring-white transition-transform hover:scale-110 active:scale-95 active:cursor-grabbing"
            style={{ left: `${leftPercent}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setDragging("min");
            }}
          ></div>

          {/* Right Handle */}
          <div
            className="absolute top-1/2 -ml-2.5 h-5 w-5 -translate-y-1/2 cursor-grab rounded-full bg-[#5aca5a] shadow-md ring-2 ring-white transition-transform hover:scale-110 active:scale-95 active:cursor-grabbing"
            style={{ left: `${rightPercent}%` }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setDragging("max");
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
