"use client";

import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

interface SellerProfileRouteFallbackClientProps {
  sellerRouteKey: string;
}

export default function SellerProfileRouteFallbackClient({
  sellerRouteKey,
}: SellerProfileRouteFallbackClientProps) {
  const decodedSellerName = decodeURIComponent(sellerRouteKey).replace(
    /[-_]+/g,
    " ",
  );

  return (
    <main
      id="main-content"
      className="flex min-h-[calc(100vh-180px)] w-full items-center justify-center bg-midnight-950 px-4 py-16 text-white"
    >
      <section className="w-full max-w-[560px] rounded-lg border border-midnight-700 bg-midnight-800 px-5 py-8 text-center shadow-2xl shadow-black/20 sm:px-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-midnight-700 text-steel-300">
          <SearchX className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-2xl font-bold">Seller profile unavailable</h1>
        <p className="mt-3 text-sm leading-6 text-steel-400">
          We could not find a public seller profile for{" "}
          <span className="font-semibold text-white">{decodedSellerName}</span>.
          The store may be private, renamed, or not published yet.
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-forest-500 px-4 text-sm font-bold text-midnight-950 transition hover:bg-forest-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to marketplace
          </Link>
        </div>
      </section>
    </main>
  );
}
