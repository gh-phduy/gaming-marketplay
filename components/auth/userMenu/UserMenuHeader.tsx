"use client";

import Image from "next/image";
import Link from "next/link";
import { MdChevronRight } from "react-icons/md";
import { SheetClose } from "@/components/ui/sheet";
import { FaTrophy } from "react-icons/fa";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface UserMenuHeaderProps {
  user: {
    name: string;
    picture: string;
  };
  buyerRankText: string;
}

/* ==========================================================================
   MAIN COMPONENT: UserMenuHeader
   ========================================================================== */

/**
 * UserMenuHeader Component
 *
 * Renders the top profile overview section in the sidebar drawer,
 * featuring the user's name, avatar icon, rank trophy, and the drawer close trigger.
 */
export function UserMenuHeader({ user, buyerRankText }: UserMenuHeaderProps) {
  return (
    <>
      {/* Floating Chevron Sheet Close Trigger */}
      <SheetClose className="absolute top-1/2 -left-3 z-50 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#3c4761] text-white shadow-lg transition hover:bg-[#4a5676]">
        <MdChevronRight className="text-xl" />
      </SheetClose>

      {/* User Info Link to Dashboard */}
      <Link href="/account/dashboard" className="flex items-center gap-3 transition-opacity hover:opacity-80">
        <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10">
          <Image
            src={user.picture}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="mb-0.5 text-[15px] font-bold text-white">{user.name}</p>
          <div className="flex items-center gap-1.5 text-[12px] text-white/50">
            <span>{buyerRankText}</span>
            <FaTrophy className="text-[10px] text-[#a0aec0]" />
          </div>
        </div>
      </Link>
    </>
  );
}

