"use client";

import { MdLogout } from "react-icons/md";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface UserMenuFooterProps {
  onLogout: () => void;
  logoutText: string;
}

/* ==========================================================================
   MAIN COMPONENT: UserMenuFooter
   ========================================================================== */

/**
 * UserMenuFooter Component
 *
 * Renders the bottom action bar inside the user settings sidebar,
 * providing the logout button trigger.
 */
export function UserMenuFooter({ onLogout, logoutText }: UserMenuFooterProps) {
  return (
    <div className="bg-midnight-600/60 px-5 py-3">
      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 py-3 text-[14px] font-medium text-white/80 transition hover:text-white"
      >
        <MdLogout className="text-[20px] text-[#ef4444]/60" />
        <span>{logoutText}</span>
      </button>
    </div>
  );
}

