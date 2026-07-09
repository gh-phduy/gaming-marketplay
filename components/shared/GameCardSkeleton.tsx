"use client";

import React from "react";

export default function GameCardSkeleton() {
  return (
    <article
      className="relative w-[252px] 800:w-full h-[300px] mx-auto select-none"
      role="status"
      aria-live="polite"
    >
      <div className="w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-[275px] rounded-lg overflow-hidden bg-surface-base flex flex-col animate-pulse">
        {/* Media Container Skeleton */}
        <div className="relative flex-1">
          
          {/* Seller Info Overlay Skeleton */}
          <div className="absolute bottom-0 w-full">
            <div className="w-full relative gap-x-2 bg-surface-card/30 backdrop-blur-xs h-[65px] flex items-center px-4">
              {/* Seller Avatar */}
              <div className="w-[30px] h-[30px] rounded-full bg-white/10" />

              {/* Seller Details */}
              <div className="flex flex-col gap-y-1">
                <div className="w-[70px] h-[12px] rounded bg-white/10" />
                <div className="w-[50px] h-[10px] rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="w-full h-[57px] bg-surface-card flex px-2 justify-between items-center gap-x-4">
          <div className="w-[110px] h-[16px] rounded bg-white/10" />
          <div className="w-[55px] h-[16px] rounded bg-white/10" />
        </div>
      </div>
    </article>
  );
}
