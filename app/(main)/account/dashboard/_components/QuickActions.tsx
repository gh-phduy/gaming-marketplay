"use client";

import {
  ShoppingBag,
  Wallet,
  Settings,
  Ticket,
  Bookmark,
  ShieldCheck,
} from "lucide-react";
import type { QuickAction } from "../dashboard.data";

const iconMap: Record<string, React.ElementType> = {
  "shopping-bag": ShoppingBag,
  wallet: Wallet,
  settings: Settings,
  ticket: Ticket,
  bookmark: Bookmark,
  shield: ShieldCheck,
};

const colorMap: Record<
  string,
  { bg: string; icon: string; hoverBg: string; ring: string }
> = {
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    hoverBg: "hover:bg-blue-500/20",
    ring: "ring-blue-500/20",
  },
  green: {
    bg: "bg-forest-500/10",
    icon: "text-forest-500",
    hoverBg: "hover:bg-forest-500/20",
    ring: "ring-forest-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    hoverBg: "hover:bg-purple-500/20",
    ring: "ring-purple-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    icon: "text-orange-400",
    hoverBg: "hover:bg-orange-500/20",
    ring: "ring-orange-500/20",
  },
  pink: {
    bg: "bg-pink-500/10",
    icon: "text-pink-400",
    hoverBg: "hover:bg-pink-500/20",
    ring: "ring-pink-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    icon: "text-cyan-400",
    hoverBg: "hover:bg-cyan-500/20",
    ring: "ring-cyan-500/20",
  },
};

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function DashboardQuickActions({ actions }: QuickActionsProps) {
  return (
    <div
      id="dashboard-quick-actions"
      className="grid grid-cols-3 gap-2.5 sm:grid-cols-6"
    >
      {actions.map((action) => {
        const IconComponent = iconMap[action.icon] || ShoppingBag;
        const colors = colorMap[action.color] || colorMap.blue;

        return (
          <button
            key={action.id}
            type="button"
            className={`group flex flex-col items-center gap-2 rounded-xl ${colors.bg} ${colors.hoverBg} px-3 py-4 ring-1 ${colors.ring} transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
            >
              <IconComponent className={`h-5 w-5 ${colors.icon}`} />
            </div>
            <span className="text-xs font-semibold text-white">
              {action.label}
            </span>
            <span className="text-[10px] leading-tight text-steel-500">
              {action.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
