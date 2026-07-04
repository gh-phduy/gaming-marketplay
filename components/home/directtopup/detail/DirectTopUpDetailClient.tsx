"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useDirectTopUp } from "./useDirectTopUp";
import {
  Sidebar,
  GameHero,
  PackageGrid,
  CartSummary,
  FaqList,
} from "./DirectTopUpDetailComponents";
import type { TopUpGameDetail } from "./topup-detail-data";

export function DirectTopUpDetailClient({ game }: { game: TopUpGameDetail }) {
  const {
    selectedPackage,
    setSelectedPackageId,
    handleCheckout,
  } = useDirectTopUp(game);

  return (
    <main
      id="main-content"
      className="w-full bg-[#141b24] px-4 pt-9 pb-14 text-dm-text-primary sm:px-6 lg:px-8"
    >
      <div className="mx-auto grid w-full max-w-[1590px] min-w-0 grid-cols-1 gap-7 lg:grid-cols-[374px_minmax(0,782px)_376px] lg:items-start">
        <Sidebar activeSlug={game.slug} />

        <div className="min-w-0 space-y-5">
          <GameHero game={game} />
          <PackageGrid
            game={game}
            selectedPackageId={selectedPackage.id}
            onSelect={(item) => setSelectedPackageId(item.id)}
          />
        </div>

        <CartSummary
          game={game}
          selectedPackage={selectedPackage}
          onCheckout={handleCheckout}
        />
      </div>

      <div className="mx-auto w-full max-w-[1590px]">
        <FaqList />
      </div>

      <Link
        href="/direct-top-up"
        className="fixed top-1/2 left-5 hidden -translate-y-1/2 text-dm-accent-green/70 transition hover:text-dm-accent-green xl:block"
        aria-label="Back to direct top up"
      >
        <ChevronRight className="size-7 rotate-180" aria-hidden />
      </Link>
    </main>
  );
}
