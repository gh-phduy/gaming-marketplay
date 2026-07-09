"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

/* ==========================================================================
   MAIN COMPONENT: DashboardTimeBar
   ========================================================================== */

/**
 * DashboardTimeBar Component
 *
 * Automatically updates and displays localized system clock indicators
 * and exchange rates timestamps.
 */
export function DashboardTimeBar() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");
  const [exchangeRateTime, setExchangeRateTime] = useState<string>("");

  // Setup interval timers to sync timezone parameters
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "shortOffset",
      });
      const dateStr = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);

      const exchangeStr = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      });
      const exchangeTime = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setExchangeRateTime(`${exchangeStr}, ${exchangeTime}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between gap-2 rounded-xl bg-midnight-800 px-6 py-3.5 text-sm sm:flex-row">
      <div className="flex items-center gap-2 text-steel-300">
        <Clock className="h-4 w-4 text-steel-500" />
        <span>
          Time:{" "}
          <span className="font-semibold text-white">
            {currentDate}, {currentTime}
          </span>
        </span>
      </div>
      <span className="text-steel-500">
        last exchange rate updated {exchangeRateTime}
      </span>
    </div>
  );
}
