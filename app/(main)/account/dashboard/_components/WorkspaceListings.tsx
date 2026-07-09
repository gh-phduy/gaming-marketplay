"use client";

import React from "react";
import { Store, PackagePlus } from "lucide-react";
import { ListingRow, cyberPrimaryButtonClass } from "./SellerWorkspaceComponents";
import type { WorkspaceTab } from "./useSellerWorkspace";
import type {
  SellerListing,
  SellerListingStatus,
} from "@/components/marketplace/seller-marketplace-store";

/* ==========================================================================
   TYPE DEFINITIONS & INTERFACES
   ========================================================================== */

interface WorkspaceListingsProps {
  listings: SellerListing[];
  handleChangeStatus: (id: string, status: SellerListingStatus) => void;
  handleDeleteListing: (id: string) => void;
  setActiveTab: (tab: WorkspaceTab) => void;
}

/* ==========================================================================
   MAIN COMPONENT: WorkspaceListings
   ========================================================================== */

/**
 * WorkspaceListings Component
 *
 * Renders the tabular listing of the seller's active, draft, and closed products.
 */
export function WorkspaceListings({
  listings,
  handleChangeStatus,
  handleDeleteListing,
  setActiveTab,
}: WorkspaceListingsProps) {
  return (
    <div className="space-y-3">
      {/* Title & Action Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-bold">Product listings</h3>
          <p className="mt-1 text-xs text-steel-500">
            {listings.length} products in seller catalog
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActiveTab("create")}
          className={`${cyberPrimaryButtonClass} h-10 px-4 text-sm`}
        >
          <PackagePlus className="h-4 w-4" />
          Create product
        </button>
      </div>

      {/* Listings Table rows */}
      {listings.map((listing) => (
        <ListingRow
          key={listing.id}
          listing={listing}
          onChangeStatus={handleChangeStatus}
          onDelete={handleDeleteListing}
        />
      ))}

      {/* Empty State warning */}
      {listings.length === 0 ? (
        <div className="rounded-xl border border-dashed border-forest-500/20 bg-black/20 py-12 text-center shadow-[inset_0_0_28px_rgba(70,202,67,0.05)]">
          <Store className="mx-auto h-10 w-10 text-forest-100/70 drop-shadow-[0_0_12px_rgba(70,202,67,0.45)]" />
          <p className="mt-3 text-sm font-bold text-white">
            No products yet
          </p>
        </div>
      ) : null}
    </div>
  );
}
