"use client";

import { HelpCircle } from "lucide-react";

interface LevelCardProps {
  level: {
    current: "Novice" | "Expert" | "Master" | "Legend";
    progress: number;
  };
  cashback: {
    currentPercent: number;
    maxPercent: number;
  };
}

const levelOrder = ["Novice", "Expert", "Master", "Legend"] as const;

export default function DashboardLevelCard({
  level,
  cashback,
}: LevelCardProps) {
  const currentIndex = levelOrder.indexOf(level.current);
  const nextLevel =
    currentIndex < levelOrder.length - 1
      ? levelOrder[currentIndex + 1]
      : null;

  return (
    <div
      id="dashboard-level"
      className="relative overflow-hidden rounded-xl bg-midnight-750 p-5 ring-1 ring-midnight-650"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />

      <div className="relative flex items-start justify-between">
        <div className="flex items-center gap-4">
          {/* Level Progress Circle */}
          <div className="relative flex h-16 w-16 items-center justify-center">
            <svg
              className="h-16 w-16 -rotate-90"
              viewBox="0 0 64 64"
              aria-label={`Level progress: ${level.progress}%`}
            >
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="hsl(213, 18%, 26%)"
                strokeWidth="4"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="url(#levelGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${(level.progress / 100) * 175.93} 175.93`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient
                  id="levelGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            {/* Level icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {level.progress}%
              </span>
            </div>
          </div>

          {/* Level Text */}
          <div>
            <p className="text-xs text-steel-500">Level</p>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-lg font-bold text-white">
                {level.current}
              </span>
              {nextLevel && (
                <>
                  <span className="text-steel-500">·</span>
                  <span className="text-sm text-steel-500">{nextLevel}</span>
                </>
              )}
            </div>
            {/* Cashback badges */}
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-steel-500">Cashback:</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-forest-500/20 px-2 py-0.5 text-xs font-bold text-forest-500">
                🔄 {cashback.currentPercent}%
              </span>
              <span className="text-steel-500">·</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-midnight-650 px-2 py-0.5 text-xs font-medium text-steel-500">
                🔄 {cashback.maxPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* How it works link */}
        <button
          type="button"
          className="group inline-flex items-center gap-1 text-xs text-steel-500 transition hover:text-white"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">How it works?</span>
        </button>
      </div>
    </div>
  );
}
