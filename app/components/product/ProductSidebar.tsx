"use client";

import { Separator } from "@base-ui/react";
import SidebarRegionSelector from "./sidebar/SidebarRegionSelector";
import SidebarPriceFilter from "./sidebar/SidebarPriceFilter";
import SidebarProductTypeFilter from "./sidebar/SidebarProductTypeFilter";

export default function ProductSidebar() {
  return (
    <div className="flex w-full shrink-0 flex-col items-center space-y-5 bg-midnight-700 p-4 lg:w-[270px]">
      <SidebarRegionSelector />

      <Separator
        orientation="horizontal"
        className="h-[1px] w-60 bg-gray-700"
      />

      <SidebarPriceFilter />

      <SidebarProductTypeFilter />
      <SidebarProductTypeFilter />
    </div>
  );
}
