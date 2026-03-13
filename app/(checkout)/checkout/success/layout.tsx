"use client";

import { ReactNode } from "react";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#0d1117] text-white">{children}</div>;
}
