"use client";

import { MdLogout } from "react-icons/md";

interface UserMenuFooterProps {
  onLogout: () => void;
  logoutText: string;
}

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
