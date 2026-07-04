"use client";

import React from "react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";

export default function SidebarRegionSelector() {
  return (
    <div className="flex items-center justify-center gap-3 pt-5 text-lg">
      <Switch className="h-8 w-12 cursor-pointer" />
      <span className="text-white">Your region:</span>
      <span className="flex items-center gap-1 text-steel-300">
        <Image
          src="/vn.svg"
          alt="Vietnam"
          width={26}
          height={17}
          className="object-cover"
        />{" "}
        (VN)
      </span>
    </div>
  );
}
