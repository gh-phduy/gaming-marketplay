"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/* ==========================================================================
   MAIN COMPONENT: PaymentFilters
   ========================================================================== */

/**
 * PaymentFilters Component
 *
 * Renders search inputs for payment methods and a country selector dropdown.
 */
export function PaymentFilters() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {/* Search Input field */}
      <div className="relative flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search by Payments method"
          className="h-10 rounded-md border-[#30363d] bg-midnight-750 pl-10 text-gray-300 placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-[#58a6ff]"
        />
      </div>

      {/* Country selection dropdown menu */}
      <Select defaultValue="vn">
        <SelectTrigger className="min-w-[180px]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="vn">
              <span className="flex items-center gap-2">
                <span className="text-xl">🇻🇳</span> Viet Nam
              </span>
            </SelectItem>
            <SelectItem value="us">
              <span className="flex items-center gap-2">
                <span className="text-xl">🇺🇸</span> USA
              </span>
            </SelectItem>
            <SelectItem value="gb">
              <span className="flex items-center gap-2">
                <span className="text-xl">🇬🇧</span> UK
              </span>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
