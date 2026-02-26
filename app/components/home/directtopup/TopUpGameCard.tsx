"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { TopUpGame } from "@/lib/constants/products";
import { cn } from "@/lib/utils";

interface TopUpGameCardProps {
  game: TopUpGame;
  className?: string;
}

export function TopUpGameCard({ game, className }: TopUpGameCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cn(
        "group relative block overflow-hidden rounded-2xl bg-[#1a1a1f]",
        "h-[375px] w-[375px] shrink-0 cursor-pointer",
        className,
      )}
    >
      <Link
        href={`/direct-top-up/${game.slug}`}
        className="block h-full w-full"
      >
        {/* Cover image */}
        {!imgError ? (
          <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-105">
            <Image
              src={game.coverImage}
              alt={game.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-slate-900" />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Label bar */}
        <div className="absolute right-0 bottom-0 left-0 flex translate-y-full justify-center bg-midnight-800/60 p-5 backdrop-blur-xs transition-transform duration-300 ease-out group-hover:translate-y-0">
          <span className="text-lg font-semibold text-white">{game.name}</span>
        </div>
      </Link>
    </div>
  );
}
