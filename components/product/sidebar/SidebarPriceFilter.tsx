"use client";

import { useProductFilter } from "@/contexts/ProductFilterContext";
import PriceChartSlider from "./price-filter/PriceChartSlider";
import PriceInputs from "./price-filter/PriceInputs";
import PriceRangeList from "./price-filter/PriceRangeRadioList";

const SLIDER_MAX = 1450;

const PRICE_RANGES = [
  { min: 0, max: 6, label: "$ 0 - $ 6", count: 14727 },
  { min: 6, max: 30, label: "$ 6 - $ 30", count: 28663 },
  { min: 30, max: 120, label: "$ 30 - $ 120", count: 6387 },
  { min: 120, max: 400, label: "$ 120 - $ 400", count: 196 },
];

export default function SidebarPriceFilter() {
  const { priceRange, setPriceRange } = useProductFilter();

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  return (
    <div className="w-full space-y-5">
      <h3 className="text-xl font-bold text-white">Price</h3>

      <PriceChartSlider
        minPrice={priceRange.min}
        maxPrice={priceRange.max}
        sliderMax={SLIDER_MAX}
        onPriceChange={handlePriceChange}
      />

      <PriceInputs
        min={priceRange.min}
        max={priceRange.max}
        onChange={handlePriceChange}
      />

      <PriceRangeList
        ranges={PRICE_RANGES}
        minPrice={priceRange.min}
        maxPrice={priceRange.max}
        onRangeSelect={handlePriceChange}
      />
    </div>
  );
}
