"use client";

import { Input } from "@/components/ui/input";

interface PriceInputsProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceInputs({ min, max, onChange }: PriceInputsProps) {
  const handleInputChange = (type: "min" | "max", value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;

    if (type === "min") {
      onChange(num, max);
    } else {
      onChange(min, num);
    }
  };

  return (
    <div className="flex items-center gap-3 pt-3">
      <div className="relative flex-1">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400">
          $
        </span>
        <Input
          type="number"
          value={min}
          onChange={(e) => handleInputChange("min", e.target.value)}
          className="no-spinner h-10 border-none bg-midnight-600 pl-7 text-sm font-medium text-white shadow-none focus-visible:ring-0 focus-visible:outline-none"
        />
      </div>
      <span className="text-gray-500">-</span>
      <div className="relative flex-1">
        <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400">
          $
        </span>
        <Input
          type="number"
          value={max}
          onChange={(e) => handleInputChange("max", e.target.value)}
          className="no-spinner h-10 border-none bg-midnight-600 pl-7 text-sm font-medium text-white shadow-none focus-visible:ring-0 focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
