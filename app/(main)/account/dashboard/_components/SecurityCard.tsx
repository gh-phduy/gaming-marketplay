"use client";

import {
  ShieldCheck,
  Lock,
  Smartphone,
  Mail,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface SecurityCardProps {
  isVerified: boolean;
}

/* ==========================================================================
   MAIN COMPONENT: DashboardSecurityCard
   ========================================================================== */

/**
 * DashboardSecurityCard Component
 *
 * Renders safety parameters scoring and details checklist items (2FA, Email verify, identity check).
 */
export default function DashboardSecurityCard({
  isVerified,
}: SecurityCardProps) {
  const securityItems = [
    {
      id: "email",
      label: "Email Verified",
      icon: Mail,
      isActive: true,
      color: "text-forest-500",
    },
    {
      id: "2fa",
      label: "Two-Factor Auth",
      icon: Smartphone,
      isActive: false,
      color: "text-steel-500",
    },
    {
      id: "identity",
      label: "Identity Verified",
      icon: ShieldCheck,
      isActive: isVerified,
      color: isVerified ? "text-forest-500" : "text-steel-500",
    },
    {
      id: "password",
      label: "Strong Password",
      icon: Lock,
      isActive: true,
      color: "text-forest-500",
    },
  ];

  const activeCount = securityItems.filter((item) => item.isActive).length;
  const securityScore = Math.round((activeCount / securityItems.length) * 100);

  return (
    <div
      id="dashboard-security"
      className="rounded-xl bg-midnight-800 p-5 ring-1 ring-midnight-650"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-steel-500" />
        <h2 className="text-base font-bold text-white">Account Security</h2>
      </div>

      {/* Dynamic circular SVG Security Score */}
      <div className="mt-4 flex items-center gap-3">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="hsl(213, 18%, 26%)"
              strokeWidth="3"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke={securityScore >= 75 ? "#62d676" : "#f97316"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${(securityScore / 100) * 150.8} 150.8`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <span className="absolute text-sm font-bold text-white">
            {securityScore}%
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            {securityScore >= 75 ? "Good" : "Needs Improvement"}
          </p>
          <p className="text-xs text-steel-500">
            {activeCount}/{securityItems.length} checks passed
          </p>
        </div>
      </div>

      {/* Security Checklist items */}
      <div className="mt-4 space-y-2">
        {securityItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              className="group flex w-full items-center justify-between rounded-lg bg-midnight-750/50 px-3 py-2.5 text-sm transition-all hover:bg-midnight-750 hover:ring-1 hover:ring-midnight-600"
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${item.color}`} />
                <span className="text-steel-300">{item.label}</span>
              </div>
              {item.isActive ? (
                <CheckCircle2 className="h-4 w-4 text-forest-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-steel-500 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2FA activation warning CTA */}
      {!securityItems.find((i) => i.id === "2fa")?.isActive && (
        <button
          type="button"
          className="mt-4 w-full rounded-lg bg-gradient-to-r from-forest-500/20 to-midnight-700 py-2.5 text-center text-xs font-semibold text-forest-500 ring-1 ring-forest-500/20 transition-all hover:from-forest-500/30 hover:ring-forest-500/40"
        >
          Enable 2FA for better security
        </button>
      )}
    </div>
  );
}

