import React, { Suspense } from "react";
import SuccessClient from "./_components/SuccessClient";

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] w-full items-center justify-center">
          <div className="h-10 w-10 animate-spin text-[#eac54f]" />
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
