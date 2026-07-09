"use client";

import React from "react";

export default function PopularGameCardSkeleton() {
  return (
    <div className="relative mx-auto h-[300px] w-[252px] select-none 800:w-full">
      <div className="group absolute top-1/2 left-1/2 flex h-[275px] w-full -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-lg bg-surface-base animate-pulse">
        {/* Media skeleton */}
        <div className="relative flex-1">
          {/* Overlay skeleton */}
          <div className="absolute bottom-0 w-full h-[40px] bg-black/40 px-4 backdrop-blur-md flex items-center justify-between">
            <div className="w-[30px] h-[14px] rounded bg-white/10" />
            <div className="w-[55px] h-[14px] rounded bg-white/10" />
          </div>
        </div>
        {/* Footer skeleton */}
        <div className="flex h-[57px] w-full items-center bg-surface-card px-4">
          <div className="w-[140px] h-[14px] rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
