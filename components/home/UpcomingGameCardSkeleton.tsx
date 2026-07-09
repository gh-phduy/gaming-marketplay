"use client";

import React from "react";

export default function UpcomingGameCardSkeleton() {
  return (
    <div className="relative mx-auto h-[300px] w-[252px] select-none 800:w-full">
      <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[275px] rounded-lg overflow-hidden bg-surface-base flex flex-col animate-pulse">
        {/* Media skeleton */}
        <div className="relative flex-1">
          {/* Date Badge skeleton */}
          <div className="absolute top-0 left-0 w-[110px] h-[34px] bg-[#957400]/25" />
          
          {/* Overlay skeleton */}
          <div className="absolute bottom-0 w-full h-[65px] bg-surface-card/30 backdrop-blur-xs flex items-center justify-between px-4">
            <div className="w-[20px] h-[20px] rounded bg-white/10" />
            <div className="w-[60px] h-[16px] rounded bg-white/10" />
          </div>
        </div>
        {/* Footer skeleton */}
        <div className="flex h-[57px] w-full items-center bg-surface-card px-2">
          <div className="w-[140px] h-[14px] rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}
